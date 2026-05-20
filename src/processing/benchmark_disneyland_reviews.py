from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
IN = ROOT / "data" / "external" / "disneyland_reviews.csv"
OUT = ROOT / "outputs" / "reports" / "disneyland_benchmark_metrics.json"

QUEUE_KEYWORDS = [
    "queue",
    "queues",
    "line",
    "lines",
    "wait",
    "waiting",
    "waited",
    "long wait",
    "fastpass",
    "fast pass",
]
PRICE_KEYWORDS = [
    "expensive",
    "price",
    "prices",
    "cost",
    "costly",
    "overpriced",
    "ticket",
    "tickets",
    "money",
]
CROWD_KEYWORDS = [
    "crowd",
    "crowds",
    "crowded",
    "busy",
    "packed",
    "too many people",
]
FASTPASS_KEYWORDS = ["fastpass", "fast pass", "lightning lane", "express pass"]
NEGATIVE_KEYWORDS = [
    "bad",
    "terrible",
    "awful",
    "disappointed",
    "disappointing",
    "not worth",
    "waste",
    "too long",
    "overpriced",
]

STOP_WORDS = {
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "was",
    "were",
    "are",
    "you",
    "but",
    "have",
    "had",
    "our",
    "all",
    "from",
    "they",
    "there",
    "very",
    "park",
    "disney",
    "disneyland",
}


def has_any(text: str, keywords: list[str]) -> bool:
    low = text.lower()
    return any(keyword in low for keyword in keywords)


def share(numerator: int, denominator: int) -> float:
    return round(numerator / denominator, 4) if denominator else 0.0


def is_negative(row: dict[str, str]) -> bool:
    try:
        rating = int(float(row.get("Rating", "")))
    except ValueError:
        rating = 0
    text = row.get("Review_Text", "")
    return rating <= 2 or has_any(text, NEGATIVE_KEYWORDS)


def frequent_terms(texts: list[str], limit: int = 15) -> list[dict[str, int | str]]:
    counter: Counter[str] = Counter()
    for text in texts:
        for token in re.findall(r"[A-Za-z]+", text.lower()):
            if len(token) < 3 or token in STOP_WORDS:
                continue
            counter[token] += 1
    return [{"term": term, "count": count} for term, count in counter.most_common(limit)]


def metric_block(rows: list[dict[str, str]]) -> dict[str, object]:
    total = len(rows)
    queue_rows = [row for row in rows if has_any(row.get("Review_Text", ""), QUEUE_KEYWORDS)]
    negative_queue = [row for row in queue_rows if is_negative(row)]
    price_count = sum(has_any(row.get("Review_Text", ""), PRICE_KEYWORDS) for row in rows)
    crowd_count = sum(has_any(row.get("Review_Text", ""), CROWD_KEYWORDS) for row in rows)
    fastpass_count = sum(has_any(row.get("Review_Text", ""), FASTPASS_KEYWORDS) for row in rows)

    return {
        "total_reviews": total,
        "queue_related_count": len(queue_rows),
        "queue_related_share": share(len(queue_rows), total),
        "negative_count_among_queue_related": len(negative_queue),
        "negative_share_among_queue_related": share(len(negative_queue), len(queue_rows)),
        "price_related_count": price_count,
        "price_related_share": share(price_count, total),
        "crowd_related_count": crowd_count,
        "crowd_related_share": share(crowd_count, total),
        "fastpass_related_count": fastpass_count,
        "fastpass_related_share": share(fastpass_count, total),
        "frequent_queue_terms": frequent_terms([row["Review_Text"] for row in queue_rows]),
    }


def main() -> None:
    with IN.open(encoding="latin-1", newline="") as f:
        rows = list(csv.DictReader(f))

    by_branch: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        by_branch[row.get("Branch", "unknown")].append(row)

    metrics = {
        "source_file": str(IN.relative_to(ROOT)),
        "dataset_role": "external benchmark, not Ostrov Mechty evidence",
        "method_note": "Keyword and rating based metrics for comparability with the local review pipeline.",
        "overall": metric_block(rows),
        "by_branch": {branch: metric_block(branch_rows) for branch, branch_rows in sorted(by_branch.items())},
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(metrics, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote Disneyland benchmark metrics to {OUT}")


if __name__ == "__main__":
    main()
