from __future__ import annotations

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = ROOT / "data" / "raw" / "reviews"
MANUAL_SEED = ROOT / "data" / "manual" / "reviews_seed_extended.csv"
DOCX_REVIEWS = ROOT / "data" / "manual" / "reviews_from_docx.csv"
OUT = ROOT / "data" / "processed" / "reviews_clean.csv"


def normalize_text(text: str) -> str:
    return " ".join(text.strip().split())


def normalize_row(row: dict[str, str]) -> dict[str, str]:
    return {
        "source": row.get("source", ""),
        "source_url": row.get("source_url", ""),
        "date": row.get("date", ""),
        "visit_date": row.get("visit_date", ""),
        "rating": row.get("rating", ""),
        "platform_rating": row.get("platform_rating", ""),
        "platform_reviews_count": row.get("platform_reviews_count", ""),
        "captured_at": row.get("captured_at", ""),
        "evidence_type": row.get("evidence_type", ""),
        "text": normalize_text(row.get("text", "")),
    }


def dedupe_rows(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    seen: set[tuple[str, str]] = set()
    unique = []
    for row in rows:
        key = (row.get("source_url", "").strip(), row.get("text", "").strip().lower())
        if not key[1] or key in seen:
            continue
        seen.add(key)
        unique.append(row)
    return unique


def main() -> None:
    rows = []
    for path in sorted(RAW_DIR.glob("*.json")):
        with path.open(encoding="utf-8") as f:
            rows.extend(normalize_row(row) for row in json.load(f))

    for csv_path in [MANUAL_SEED, DOCX_REVIEWS]:
        if csv_path.exists():
            with csv_path.open(encoding="utf-8", newline="") as f:
                rows.extend(normalize_row(row) for row in csv.DictReader(f))

    rows = dedupe_rows(rows)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    fields = [
        "source",
        "source_url",
        "date",
        "visit_date",
        "rating",
        "platform_rating",
        "platform_reviews_count",
        "captured_at",
        "evidence_type",
        "text",
    ]
    with OUT.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)
    print(f"wrote {len(rows)} reviews to {OUT}")


if __name__ == "__main__":
    main()
