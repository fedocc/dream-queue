from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MANUAL_SEED = ROOT / "data" / "manual" / "reviews_seed_extended.csv"
TARGET_LOW = 100
TARGET_HIGH = 200


def main() -> None:
    if not MANUAL_SEED.exists():
        raise SystemExit(f"manual review file not found: {MANUAL_SEED}")

    with MANUAL_SEED.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    non_empty = [row for row in rows if row.get("text", "").strip()]
    missing_url = [idx for idx, row in enumerate(non_empty, start=2) if not row.get("source_url", "").strip()]
    missing_source = [idx for idx, row in enumerate(non_empty, start=2) if not row.get("source", "").strip()]
    missing_evidence_type = [idx for idx, row in enumerate(non_empty, start=2) if not row.get("evidence_type", "").strip()]

    keys = [
        (row.get("source_url", "").strip(), row.get("text", "").strip().lower())
        for row in non_empty
    ]
    duplicates = [key for key, count in Counter(keys).items() if key[1] and count > 1]

    print(f"manual review rows: {len(non_empty)}")
    print(f"remaining to {TARGET_LOW}: {max(0, TARGET_LOW - len(non_empty))}")
    print(f"remaining to {TARGET_HIGH}: {max(0, TARGET_HIGH - len(non_empty))}")

    if missing_url:
        print(f"rows with missing source_url: {missing_url}")
    if missing_source:
        print(f"rows with missing source: {missing_source}")
    if missing_evidence_type:
        print(f"rows with missing evidence_type: {missing_evidence_type}")
    if duplicates:
        print(f"duplicate source_url + text pairs: {len(duplicates)}")

    if missing_url or missing_source or missing_evidence_type or duplicates:
        raise SystemExit(1)

    print("manual review file looks OK")


if __name__ == "__main__":
    main()
