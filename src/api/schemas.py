from __future__ import annotations

from dataclasses import dataclass


@dataclass
class AttractionStatus:
    name: str
    wait_minutes: int
    free_slot: str
    fast_slot_price_rub: int
    load: str

