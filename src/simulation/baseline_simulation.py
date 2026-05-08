from __future__ import annotations

import json
import random
import sys
from pathlib import Path

from metrics import average_wait, max_queue, queue_variance_over_time, satisfaction, total_completed
from park_entities import Attraction, SimulationResult


ROOT = Path(__file__).resolve().parents[2]
sys.path.append(str(ROOT / "src" / "model"))

from assumptions import load_yaml_like

ATTRACTIONS = ROOT / "data" / "raw" / "attractions" / "attractions_raw.json"
OUT = ROOT / "outputs" / "reports" / "baseline_simulation.json"


def build_attractions(effective_capacity_factor: float = 1.0) -> list[Attraction]:
    raw = json.loads(ATTRACTIONS.read_text(encoding="utf-8"))
    attractions = []
    for item in raw:
        type_name = item.get("type", "").lower()
        popularity = float(item.get("estimated_popularity") or (0.9 if "экстремальные" in type_name else 0.75))
        if "детские" in type_name:
            popularity = float(item.get("estimated_popularity") or 0.68)
        capacity = int(item.get("estimated_capacity_per_hour") or (500 if "экстремальные" in type_name else 650))
        attractions.append(
            Attraction(
                name=item["attraction_name"],
                popularity=popularity,
                capacity_per_hour=capacity,
                effective_capacity_factor=effective_capacity_factor,
            )
        )
    return attractions


def demand_profile(steps: int, low: float, peak: float) -> list[float]:
    raw = []
    for step in range(steps):
        x = step / max(1, steps - 1)
        distance_from_peak = abs(x - 0.58) / 0.58
        value = low + (peak - low) * max(0.0, 1 - distance_from_peak)
        raw.append(value)
    total = sum(raw) or 1.0
    return [value / total for value in raw]


def simulation_config() -> dict:
    return load_yaml_like()["simulation"]


def run(visitors: int | None = None, park_hours: int | None = None, seed: int | None = None) -> SimulationResult:
    config = simulation_config()
    visitors = int(visitors or config["visitors"])
    park_hours = int(park_hours or config["park_hours"])
    seed = int(seed or config["seed"])
    random.seed(seed)
    attractions = build_attractions(effective_capacity_factor=float(config["operational_capacity_factor"]))
    steps = park_hours * int(60 / config["time_step_minutes"])
    weights = [attraction.popularity for attraction in attractions]
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

    for step in range(steps):
        demand = attempts_total * profile[step] * random.uniform(0.9, 1.1)
        for _ in range(int(demand)):
            chosen = random.choices(attractions, weights=weights, k=1)[0]
            chosen.add_demand(1)
        for attraction in attractions:
            attraction.process_step()

    completed = total_completed(attractions)
    avg_wait = average_wait(attractions)
    per_guest = completed / visitors
    return SimulationResult(
        mode="baseline",
        avg_wait_time=round(avg_wait, 2),
        max_queue_length=round(max_queue(attractions), 2),
        attractions_completed_per_visitor=round(per_guest, 2),
        visitor_satisfaction_score=satisfaction(avg_wait, per_guest),
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
