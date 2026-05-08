from __future__ import annotations

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
REVIEW_METRICS = ROOT / "outputs" / "reports" / "review_metrics.json"
SIMULATION_SUMMARY = ROOT / "outputs" / "reports" / "simulation_summary.json"
FINANCIAL_SCENARIOS = ROOT / "outputs" / "reports" / "financial_scenarios.csv"
OUT = ROOT / "outputs" / "reports" / "pitch_summary.json"


def pct(value: float) -> float:
    return round(value * 100, 1)


def read_financial_scenarios() -> list[dict[str, str]]:
    with FINANCIAL_SCENARIOS.open(encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def main() -> None:
    review = json.loads(REVIEW_METRICS.read_text(encoding="utf-8"))
    simulation = json.loads(SIMULATION_SUMMARY.read_text(encoding="utf-8"))
    financial = read_financial_scenarios()

    baseline = simulation["baseline"]
    optimized = simulation["optimized"]

    summary = {
        "case": "Остров Мечты",
        "positioning": "Пилотный слой управления очередями, guest flow и fast-slot revenue.",
        "review_evidence": {
            "total_reviews": review["total_reviews"],
            "queue_related_count": review["queue_related_count"],
            "queue_related_share_percent": pct(review["queue_related_share"]),
            "negative_share_among_queue_related_percent": pct(review["negative_share_among_queue_related"]),
            "price_related_share_percent": pct(review["price_related_share"]),
            "crowd_related_share_percent": pct(review["crowd_related_share"]),
            "fastpass_related_share_percent": pct(review["fastpass_related_share"]),
            "top_attractions_mentioned": review["attractions_mentioned_count"],
            "top_queue_terms": review["frequent_queue_terms"][:8],
            "caveat": "Review-evidence is a seed dataset, not a representative survey of all park visitors.",
        },
        "simulation": {
            "baseline_avg_wait_time": baseline["avg_wait_time"],
            "optimized_avg_wait_time": optimized["avg_wait_time"],
            "baseline_max_queue_length": baseline["max_queue_length"],
            "optimized_max_queue_length": optimized["max_queue_length"],
            "baseline_queue_variance": baseline["queue_variance"],
            "optimized_queue_variance": optimized["queue_variance"],
            "paid_slots_sold": optimized["paid_slots_sold"],
            "revenue_generated": optimized["revenue_generated"],
            "caveat": "Simulation is a scenario model based on assumptions, not measured park operations.",
        },
        "financial_scenarios": financial,
        "pilot_offer": {
            "duration_weeks": "4-8",
            "scope": "5-8 selected attractions",
            "deliverables": [
                "bottleneck map",
                "operator dashboard prototype",
                "baseline vs optimized simulation",
                "fast-slot revenue model",
                "integration plan",
            ],
            "data_needed_from_park": [
                "hourly attendance",
                "actual wait-time samples",
                "ride throughput/capacity",
                "express access sales",
                "event and holiday calendar",
            ],
        },
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote pitch summary to {OUT}")


if __name__ == "__main__":
    main()
