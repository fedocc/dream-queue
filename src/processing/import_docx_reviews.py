from __future__ import annotations

import csv
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[2]
DEFAULT_DOCX = Path.home() / "Downloads" / "майнор.docx"
OUT = ROOT / "data" / "manual" / "reviews_from_docx.csv"

SOURCE = "yandex_reviews_docx"
SOURCE_URL = "https://reviews.yandex.ru/product/park-razvlechenii-ostrov-mechty--64749272"
CAPTURED_AT = "2026-05-08"
EVIDENCE_TYPE = "public_review_excerpt"

FIELDS = [
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

PARK_KEYWORDS = [
    "аттракц",
    "очеред",
    "парк",
    "остров",
    "билет",
    "экспресс",
    "скороход",
    "народу",
    "дет",
    "молот судьбы",
    "мельница",
    "трансильвания",
    "смурф",
    "черепаш",
]

UI_PATTERNS = [
    r"^ещ[её]$",
    r"^\d+$",
    r"^\d+\s+\d+$",
    r"^рекомендации для вас$",
    r"^знаток города",
    r"^в списке ваших близких",
    r"^оставляет отзывы",
    r"^пишет о",
    r"^много отзывов",
    r"^разбирается в",
    r"^часто пишет",
]


def normalize_text(text: str) -> str:
    return " ".join(text.strip().split())


def docx_paragraphs(path: Path) -> list[str]:
    with ZipFile(path) as archive:
        xml = archive.read("word/document.xml")
    root = ET.fromstring(xml)
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    paragraphs = []
    for para in root.findall(".//w:p", ns):
        text = normalize_text("".join(t.text or "" for t in para.findall(".//w:t", ns)))
        if text:
            paragraphs.append(text)
    return paragraphs


def is_ui_text(text: str) -> bool:
    low = text.lower()
    return any(re.search(pattern, low) for pattern in UI_PATTERNS)


def is_review_excerpt(text: str) -> bool:
    low = text.lower()
    if len(text) < 80 or len(text) > 1200:
        return False
    if is_ui_text(text):
        return False
    return any(keyword in low for keyword in PARK_KEYWORDS)


def dedupe(texts: list[str]) -> list[str]:
    seen: set[str] = set()
    unique = []
    for text in texts:
        key = text.lower()
        if key in seen:
            continue
        seen.add(key)
        unique.append(text)
    return unique


def main() -> None:
    if not DEFAULT_DOCX.exists():
        raise SystemExit(f"DOCX file not found: {DEFAULT_DOCX}")

    candidates = [text for text in docx_paragraphs(DEFAULT_DOCX) if is_review_excerpt(text)]
    candidates = dedupe(candidates)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDS)
        writer.writeheader()
        for text in candidates:
            writer.writerow(
                {
                    "source": SOURCE,
                    "source_url": SOURCE_URL,
                    "date": "",
                    "visit_date": "",
                    "rating": "",
                    "platform_rating": "",
                    "platform_reviews_count": "",
                    "captured_at": CAPTURED_AT,
                    "evidence_type": EVIDENCE_TYPE,
                    "text": text,
                }
            )

    print(f"read DOCX: {DEFAULT_DOCX}")
    print(f"wrote {len(candidates)} review excerpts to {OUT}")


if __name__ == "__main__":
    main()
