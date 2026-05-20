from __future__ import annotations

import json
import random
import sys
from pathlib import Path

from baseline_simulation import build_attractions, demand_profile, simulation_config
from metrics import average_wait, max_queue, queue_variance_over_time, satisfaction, total_completed
from park_entities import SimulationResult


ROOT = Path(__file__).resolve().parents[2]
sys.path.append(str(ROOT / "src" / "model"))

from assumptions import load_yaml_like

OUT = ROOT / "outputs" / "reports" / "optimized_simulation.json"


def product_config(scenario_name: str = "base") -> dict:
    config = load_yaml_like()
    return {**config["product"], **config["scenarios"][scenario_name]}


def risk_config(overrides: dict[str, float] | None = None) -> dict[str, float]:
    config = load_yaml_like()
    risk = {key: float(value) for key, value in config.get("risk_assumptions", {}).items()}
    if overrides:
        risk.update({key: float(value) for key, value in overrides.items()})
    return risk


def _clamp_rate(value: float) -> float:
    return min(1.0, max(0.0, value))


def run(
    visitors: int | None = None,
    park_hours: int | None = None,
    seed: int | None = None,
    scenario_name: str = "base",
    risk_overrides: dict[str, float] | None = None,
) -> SimulationResult:
    config = simulation_config()
    product = product_config(scenario_name)
    risk = risk_config(risk_overrides)
    visitors = int(visitors or config["visitors"])
    park_hours = int(park_hours or config["park_hours"])
    seed = int(seed or config["seed"])
    random.seed(seed)
    attractions = build_attractions(effective_capacity_factor=float(config["operational_capacity_factor"]))
    steps = park_hours * int(60 / config["time_step_minutes"])
    attempts_total = (
        visitors
        * float(config["target_attractions_per_guest"])
        * float(config["selected_attractions_demand_share"])
    )
    profile = demand_profile(
        steps,
        low=float(config["low_demand_multiplier"]),
        peak=float(config["peak_demand_multiplier"]),
    )
    paid_attempt_probability = min(
        1.0,
        visitors
        * float(product["paid_fast_slot_conversion"])
        * float(product["average_slots_per_buyer"])
        / max(1.0, attempts_total),
    )
    paid_slots_sold = 0
    revenue = 0.0
    paid_slot_no_shows = 0
    late_arrivals = 0
    abandoned_slots = 0
    staff_overrides = 0
    downtime_steps = 0
    kiosk_bookings = 0
    effective_no_show_rate = _clamp_rate(float(risk["no_show_rate"]) * (1 - 0.25 * float(risk["kiosk_share"])))
    effective_abandon_rate = _clamp_rate(float(risk["abandon_rate"]))
    effective_late_rate = _clamp_rate(float(risk["late_arrival_rate"]))
    staff_override_rate = _clamp_rate(float(risk["staff_override_rate"]))
    grace_ratio = min(
        1.0,
        float(risk["grace_period_minutes"])
        / max(1.0, float(risk["grace_period_minutes"]) + float(risk["slot_release_after_minutes"])),
    )
    max_fast_slot_capacity_share = min(
        float(product["max_fast_slot_capacity_share"]),
        _clamp_rate(float(risk["paid_capacity_cap"])),
    )
    routing_strength = float(product["routing_strength"]) * _clamp_rate(float(risk["route_compliance_rate"]))
    high_wait_threshold = float(config["high_wait_threshold_minutes"])
    low_wait_threshold = float(config["low_wait_threshold_minutes"])
    standby_penalty_threshold = float(risk["standby_penalty_threshold"])
    downtime_probability = _clamp_rate(float(risk["ride_downtime_probability"]))

    for step in range(steps):
        demand = attempts_total * profile[step] * random.uniform(0.9, 1.1)
        current_waits = {
            attraction.name: 5 * attraction.queue / max(1.0, attraction.capacity_per_step)
            for attraction in attractions
        }
        max_current_wait = max(current_waits.values(), default=0.0)
        fast_slot_demand_factor = min(1.0, max(0.0, max_current_wait - low_wait_threshold) / max(1.0, high_wait_threshold - low_wait_threshold))
        step_paid_attempt_probability = paid_attempt_probability * fast_slot_demand_factor
        adjusted_weights = []
        for attraction in attractions:
            wait = current_waits[attraction.name]
            load_penalty = max(0.2, 1 - routing_strength * wait / max(1.0, high_wait_threshold))
            recommendation_boost = 1 + routing_strength if wait < low_wait_threshold else 1.0
            adjusted_weights.append(attraction.popularity * load_penalty * recommendation_boost)

        standby_penalty_active = max_current_wait > standby_penalty_threshold
        step_capacity_share = max_fast_slot_capacity_share * (0.5 if standby_penalty_active else 1.0)
        step_fast_slot_cap = {
            attraction.name: max(0, int(attraction.capacity_per_step * step_capacity_share))
            for attraction in attractions
        }
        step_fast_slots_sold = {attraction.name: 0 for attraction in attractions}

        for _ in range(int(demand)):
            chosen = random.choices(attractions, weights=adjusted_weights, k=1)[0]
            fast_slot_available = step_fast_slots_sold[chosen.name] < step_fast_slot_cap[chosen.name]
            if random.random() < step_paid_attempt_probability and fast_slot_available:
                paid_slots_sold += 1
                step_fast_slots_sold[chosen.name] += 1
                revenue += float(product["average_fast_slot_price_rub"])
                if random.random() < float(risk["kiosk_share"]):
                    kiosk_bookings += 1
                if random.random() < effective_no_show_rate:
                    paid_slot_no_shows += 1
                    continue
                if random.random() < effective_abandon_rate:
                    abandoned_slots += 1
                    continue
                if random.random() < effective_late_rate:
                    late_arrivals += 1
                    if random.random() < staff_override_rate:
                        staff_overrides += 1
                        chosen.add_priority_demand(1)
                    elif random.random() < grace_ratio:
                        chosen.add_priority_demand(1)
                    else:
                        chosen.add_demand(1)
                    continue
                chosen.add_priority_demand(1)
            else:
                chosen.add_demand(1)
        for attraction in attractions:
            is_down = random.random() < downtime_probability
            if is_down:
                downtime_steps += 1
            attraction.process_step(
                priority_capacity_share=step_capacity_share,
                capacity_multiplier=0.0 if is_down else 1.0,
            )

    completed = total_completed(attractions)
    avg_wait = average_wait(attractions)
    per_guest = completed / visitors
    return SimulationResult(
        mode=f"optimized_{scenario_name}",
        avg_wait_time=round(avg_wait, 2),
        max_queue_length=round(max_queue(attractions), 2),
        attractions_completed_per_visitor=round(per_guest, 2),
        visitor_satisfaction_score=satisfaction(avg_wait, per_guest),
        paid_slots_sold=paid_slots_sold,
        revenue_generated=round(revenue, 2),
        queue_variance=round(queue_variance_over_time(attractions), 2),
        attraction_loads={attraction.name: round(max(attraction.wait_samples), 2) for attraction in attractions},
        assumptions_used={key: round(value, 4) for key, value in risk.items()},
        assumption_labels={key: "assumption" for key in risk},
        risk_outputs={
            "output_label": "model output",
            "paid_slot_no_shows": paid_slot_no_shows,
            "late_arrivals": late_arrivals,
            "abandoned_slots": abandoned_slots,
            "staff_overrides": staff_overrides,
            "downtime_steps": downtime_steps,
            "kiosk_bookings": kiosk_bookings,
            "effective_paid_capacity_share": round(max_fast_slot_capacity_share, 4),
            "effective_routing_strength": round(routing_strength, 4),
        },
    )


def main() -> None:
    result = run()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result.__dict__, ensure_ascii=False, indent=2), encoding="utf-8")
    print(result)


if __name__ == "__main__":
    main()
