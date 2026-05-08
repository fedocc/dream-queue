from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


def attraction_statuses() -> list[dict]:
    return [
        {"name": "Мельница", "wait_minutes": 42, "free_slot": "16:20", "fast_slot_price_rub": 490, "load": "high"},
        {"name": "Молот судьбы", "wait_minutes": 35, "free_slot": "16:05", "fast_slot_price_rub": 590, "load": "high"},
        {"name": "Иммерсивный полёт", "wait_minutes": 24, "free_slot": "15:45", "fast_slot_price_rub": 490, "load": "medium"},
    ]


def simulation_summary() -> dict:
    path = ROOT / "outputs" / "reports" / "simulation_summary.json"
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return {"error": "run src/simulation/visualization.py first"}
