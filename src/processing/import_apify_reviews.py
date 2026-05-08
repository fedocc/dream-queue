from __future__ import annotations

import json
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
APIFY_DIR = ROOT / "data" / "raw" / "reviews" / "apify"
OUT = ROOT / "data" / "raw" / "reviews" / "apify_normalized.json"


def first_present(item: dict[str, Any], keys: list[str]) -> Any:
    for key in keys:
        if key in item and item[key] not in {None, ""}:
            return item[key]
    return ""


def normalize_item(item: dict[str, Any], source: str, source_file: Path) -> dict[str, Any] | None:
    text = first_present(item, ["text", "reviewText", "comment", "description", "content"])
    if not text:
        return None
    rating = first_present(item, ["rating", "stars", "reviewRating"])
    date = first_present(item, ["date", "publishedAt", "createdAt", "reviewDate"])
    source_url = first_present(item, ["url", "placeUrl", "businessUrl", "sourceUrl"])
    author = first_present(item, ["author", "authorName", "userName", "name"])
    return {
        "source": source,
        "source_url": source_url,
        "date": str(date),
        "rating": str(rating),
        "captured_at": "2026-05-08",
        "evidence_type": "apify_review",
        "author": str(author),
        "source_file": source_file.name,
        "text": " ".join(str(text).split()),
    }


def main() -> None:
    rows: list[dict[str, Any]] = []
    for path in sorted(APIFY_DIR.glob("*.json")):
        if path.name == OUT.name:
            continue
        source = "yandex_maps" if path.name.startswith("yandex") else "2gis" if path.name.startswith("two_gis") else "apify"
        items = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(items, list):
            continue
        for item in items:
            if isinstance(item, dict):
                normalized = normalize_item(item, source, path)
                if normalized:
                    rows.append(normalized)

    OUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {len(rows)} normalized Apify reviews to {OUT}")


if __name__ == "__main__":
    main()

