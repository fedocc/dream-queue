from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class FinancialInputs:
    peak_day_visitors: int
    normal_day_visitors: int
    peak_days_per_year: int
    normal_days_per_year: int
    paid_fast_slot_conversion: float
    average_fast_slot_price_rub: float
    average_slots_per_buyer: float
    park_revenue_share: float
    startup_revenue_share: float
    extra_food_retail_spend_per_guest_rub: float


def daily_fast_slot_revenue(visitors: int, inputs: FinancialInputs) -> float:
    return (
        visitors
        * inputs.paid_fast_slot_conversion
        * inputs.average_fast_slot_price_rub
        * inputs.average_slots_per_buyer
    )


def annual_metrics(inputs: FinancialInputs) -> dict[str, float]:
    peak_revenue = daily_fast_slot_revenue(inputs.peak_day_visitors, inputs) * inputs.peak_days_per_year
    normal_revenue = daily_fast_slot_revenue(inputs.normal_day_visitors, inputs) * inputs.normal_days_per_year
    annual_fast_slot_revenue = peak_revenue + normal_revenue
    annual_visitors = inputs.peak_day_visitors * inputs.peak_days_per_year + inputs.normal_day_visitors * inputs.normal_days_per_year
    retail_uplift = annual_visitors * inputs.extra_food_retail_spend_per_guest_rub
    return {
        "daily_fast_slot_revenue_peak": daily_fast_slot_revenue(inputs.peak_day_visitors, inputs),
        "daily_fast_slot_revenue_normal": daily_fast_slot_revenue(inputs.normal_day_visitors, inputs),
        "annual_fast_slot_revenue": annual_fast_slot_revenue,
        "startup_annual_revenue": annual_fast_slot_revenue * inputs.startup_revenue_share,
        "park_annual_uplift": annual_fast_slot_revenue * inputs.park_revenue_share + retail_uplift,
    }
