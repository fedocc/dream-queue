from __future__ import annotations

import csv
import sys
from pathlib import Path

from assumptions import load_yaml_like


ROOT = Path(__file__).resolve().parents[2]
sys.path.append(str(ROOT / "src" / "simulation"))

from baseline_simulation import run as run_baseline
from optimized_simulation import run as run_optimized


OUT = ROOT / "outputs" / "reports" / "financial_scenarios.csv"


def round_money(value: float) -> float:
    return round(value, 2)


def scenario_row(config: dict, scenario_name: str) -> dict[str, float | str]:
    park = config["park"]
    product = {**config["product"], **config["scenarios"][scenario_name]}
    effect = config["effect"]

    peak_visitors = int(park["peak_day_visitors"])
    normal_visitors = int(park["normal_day_visitors"])

    peak_baseline = run_baseline(visitors=peak_visitors)
    peak_optimized = run_optimized(visitors=peak_visitors, scenario_name=scenario_name)
    normal_baseline = run_baseline(visitors=normal_visitors)
    normal_optimized = run_optimized(visitors=normal_visitors, scenario_name=scenario_name)

    annual_fast_slot_revenue = (
        peak_optimized.revenue_generated * int(park["peak_days_per_year"])
        + normal_optimized.revenue_generated * int(park["normal_days_per_year"])
    )
    annual_visitors = (
        peak_visitors * int(park["peak_days_per_year"])
        + normal_visitors * int(park["normal_days_per_year"])
    )
    wait_reduction_peak = peak_baseline.avg_wait_time - peak_optimized.avg_wait_time
    wait_reduction_normal = normal_baseline.avg_wait_time - normal_optimized.avg_wait_time
    weighted_wait_reduction = (
        wait_reduction_peak * peak_visitors * int(park["peak_days_per_year"])
        + wait_reduction_normal * normal_visitors * int(park["normal_days_per_year"])
    ) / max(1, annual_visitors)

    additional_attractions_peak = (
        peak_optimized.attractions_completed_per_visitor
        - peak_baseline.attractions_completed_per_visitor
    )
    additional_attractions_normal = (
        normal_optimized.attractions_completed_per_visitor
        - normal_baseline.attractions_completed_per_visitor
    )
    annual_additional_attractions = (
        additional_attractions_peak * peak_visitors * int(park["peak_days_per_year"])
        + additional_attractions_normal * normal_visitors * int(park["normal_days_per_year"])
    )

    # Retail uplift is deliberately conservative: only virtual-queue adopters get the
    # extra-spend assumption, and only when the simulated wait reduction is positive.
    retail_uplift_visitors = annual_visitors * float(product["virtual_queue_adoption"])
    retail_uplift = (
        retail_uplift_visitors
        * float(effect["extra_food_retail_spend_per_guest_rub"])
        if weighted_wait_reduction > 0
        else 0.0
    )

    return {
        "scenario": scenario_name,
        "slot_price_rub": product["average_fast_slot_price_rub"],
        "paid_fast_slot_conversion": product["paid_fast_slot_conversion"],
        "virtual_queue_adoption": product["virtual_queue_adoption"],
        "max_fast_slot_capacity_share": product["max_fast_slot_capacity_share"],
        "peak_day_fast_slots_sold": peak_optimized.paid_slots_sold,
        "normal_day_fast_slots_sold": normal_optimized.paid_slots_sold,
        "daily_fast_slot_revenue_peak": round_money(peak_optimized.revenue_generated),
        "daily_fast_slot_revenue_normal": round_money(normal_optimized.revenue_generated),
        "annual_fast_slot_revenue": round_money(annual_fast_slot_revenue),
        "startup_annual_revenue": round_money(annual_fast_slot_revenue * float(product["startup_revenue_share"])),
        "park_fast_slot_revenue_share": round_money(annual_fast_slot_revenue * float(product["park_revenue_share"])),
        "park_retail_uplift": round_money(retail_uplift),
        "park_annual_uplift": round_money(
            annual_fast_slot_revenue * float(product["park_revenue_share"]) + retail_uplift
        ),
        "peak_avg_wait_baseline": peak_baseline.avg_wait_time,
        "peak_avg_wait_optimized": peak_optimized.avg_wait_time,
        "normal_avg_wait_baseline": normal_baseline.avg_wait_time,
        "normal_avg_wait_optimized": normal_optimized.avg_wait_time,
        "weighted_avg_wait_time_reduction": round(weighted_wait_reduction, 2),
        "annual_additional_attractions_visited": round(annual_additional_attractions, 0),
    }


def main() -> None:
    config = load_yaml_like()
    rows = [scenario_row(config, name) for name in config["scenarios"]]

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)
    print(f"wrote financial scenarios to {OUT}")
    for row in rows:
        print(row)


if __name__ == "__main__":
    main()
