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


def run(
    visitors: int | None = None,
    park_hours: int | None = None,
    seed: int | None = None,
    scenario_name: str = "base",
) -> SimulationResult:
    config = simulation_config()
    product = product_config(scenario_name)
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
    max_fast_slot_capacity_share = float(product["max_fast_slot_capacity_share"])
    routing_strength = float(product["routing_strength"])
    high_wait_threshold = float(config["high_wait_threshold_minutes"])
    low_wait_threshold = float(config["low_wait_threshold_minutes"])

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

        step_fast_slot_cap = {
            attraction.name: max(0, int(attraction.capacity_per_step * max_fast_slot_capacity_share))
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
                chosen.add_priority_demand(1)
            else:
                chosen.add_demand(1)
        for attraction in attractions:
            attraction.process_step(priority_capacity_share=max_fast_slot_capacity_share)

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
    )


def main() -> None:
    result = run()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result.__dict__, ensure_ascii=False, indent=2), encoding="utf-8")
    print(result)


if __name__ == "__main__":
    main()
