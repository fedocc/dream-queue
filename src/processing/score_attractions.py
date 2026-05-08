from __future__ import annotations

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "data" / "raw" / "attractions" / "attractions_raw.json"
REVIEWS = ROOT / "data" / "processed" / "reviews_labeled.csv"
OUT = ROOT / "data" / "processed" / "attractions_scored.csv"


def load_review_mentions() -> dict[str, int]:
    if not REVIEWS.exists():
        return {}
    mentions: dict[str, int] = {}
    with REVIEWS.open(encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            for name in row["attractions_mentioned"].split(";"):
                if name:
                    mentions[name] = mentions.get(name, 0) + 1
    return mentions


def main() -> None:
    with RAW.open(encoding="utf-8") as f:
        attractions = json.load(f)
    mentions = load_review_mentions()
    max_mentions = max(mentions.values(), default=1)

    rows = []
    for item in attractions:
        type_name = item["type"].lower()
        popularity = 0.9 if item["attraction_name"] in {"Мельница", "Молот судьбы", "Иммерсивный полёт"} else 0.75
        if "детские" in type_name:
            popularity = 0.68
        capacity = 500 if "экстремальные" in type_name else 650
        thrill_level = 5 if "экстремальные" in type_name else 2 if "детские" in type_name else 3
        low_capacity_risk = max(0.0, min(1.0, (850 - capacity) / 500))
        family_appeal = 1.0 if "семейные" in type_name or "детские" in type_name else 0.55
        review_mentions = mentions.get(item["attraction_name"], 0) / max_mentions
        queue_risk = popularity * 0.4 + low_capacity_risk * 0.3 + family_appeal * 0.2 + review_mentions * 0.1
        fastpass_potential = min(1.0, queue_risk * (0.75 + thrill_level / 10))
        rows.append(
            {
                **item,
                "estimated_popularity": round(popularity, 2),
                "estimated_capacity_per_hour": capacity,
                "thrill_level": thrill_level,
                "queue_risk_score": round(queue_risk, 3),
                "fastpass_potential": round(fastpass_potential, 3),
            }
        )

    rows.sort(key=lambda row: row["queue_risk_score"], reverse=True)
    with OUT.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)
    print(f"wrote {len(rows)} scored attractions to {OUT}")


if __name__ == "__main__":
    main()
