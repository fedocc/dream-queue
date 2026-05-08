from __future__ import annotations

import csv
import json
import re
from collections import Counter
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[2]
IN = ROOT / "data" / "processed" / "reviews_labeled.csv"
OUT = ROOT / "outputs" / "reports" / "review_metrics.json"

STOP_WORDS = {
    "а",
    "без",
    "бы",
    "в",
    "во",
    "все",
    "для",
    "до",
    "за",
    "и",
    "из",
    "к",
    "как",
    "ко",
    "на",
    "но",
    "о",
    "об",
    "от",
    "по",
    "при",
    "с",
    "со",
    "так",
    "то",
    "у",
    "что",
    "это",
    "the",
    "and",
    "for",
    "with",
}


def as_bool(value: str) -> bool:
    return value.strip().lower() == "true"


def share(numerator: int, denominator: int) -> float:
    return round(numerator / denominator, 4) if denominator else 0.0


def queue_terms(texts: Iterable[str], limit: int = 15) -> list[dict[str, int | str]]:
    counter: Counter[str] = Counter()
    for text in texts:
        for token in re.findall(r"[A-Za-zА-Яа-яЁё]+", text.lower()):
            if len(token) < 3 or token in STOP_WORDS:
                continue
            counter[token] += 1
    return [{"term": term, "count": count} for term, count in counter.most_common(limit)]


def attraction_counts(rows: list[dict[str, str]]) -> dict[str, int]:
    counter: Counter[str] = Counter()
    for row in rows:
        for name in row.get("attractions_mentioned", "").split(";"):
            name = name.strip()
            if name:
                counter[name] += 1
    return dict(counter)


def main() -> None:
    with IN.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    total_reviews = len(rows)
    queue_related = [row for row in rows if as_bool(row.get("mentions_queue", ""))]
    negative_queue = [row for row in queue_related if row.get("sentiment") == "negative"]

    metrics = {
        "source_file": str(IN.relative_to(ROOT)),
        "total_reviews": total_reviews,
        "queue_related_count": len(queue_related),
        "queue_related_share": share(len(queue_related), total_reviews),
        "negative_count_among_queue_related": len(negative_queue),
        "negative_share_among_queue_related": share(len(negative_queue), len(queue_related)),
        "price_related_count": sum(as_bool(row.get("mentions_price", "")) for row in rows),
        "price_related_share": share(sum(as_bool(row.get("mentions_price", "")) for row in rows), total_reviews),
        "crowd_related_count": sum(as_bool(row.get("mentions_crowd", "")) for row in rows),
        "crowd_related_share": share(sum(as_bool(row.get("mentions_crowd", "")) for row in rows), total_reviews),
        "fastpass_related_count": sum(as_bool(row.get("mentions_fastpass", "")) for row in rows),
        "fastpass_related_share": share(sum(as_bool(row.get("mentions_fastpass", "")) for row in rows), total_reviews),
        "attractions_mentioned_count": attraction_counts(rows),
        "frequent_queue_terms": queue_terms(row["text"] for row in queue_related),
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(metrics, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote review metrics to {OUT}")


if __name__ == "__main__":
    main()
