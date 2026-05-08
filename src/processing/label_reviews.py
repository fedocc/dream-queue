from __future__ import annotations

import csv
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
IN = ROOT / "data" / "processed" / "reviews_clean.csv"
OUT = ROOT / "data" / "processed" / "reviews_labeled.csv"
QUEUE_MENTIONS_OUT = ROOT / "data" / "processed" / "queue_mentions.csv"

QUEUE_KEYWORDS = [
    "очередь",
    "очереди",
    "очередях",
    "стоять",
    "стояли",
    "постоять",
    "простояли",
    "простоять",
    "ждать",
    "ожидание",
    "толпа",
    "народу много",
    "много народа",
    "много людей",
    "пролезают",
    "queue",
    "waiting",
]
PRICE_KEYWORDS = [
    "дорого",
    "дорогой",
    "дорогим",
    "цена",
    "цены",
    "ценник",
    "стоимость",
    "билет",
    "доплата",
    "доплаты",
    "доплачивать",
    "экспресс",
    "vip",
    "браслет",
    "expensive",
    "fastpass",
]
CROWD_KEYWORDS = ["толпа", "толпы", "народу", "народа", "много народа", "много людей", "многолюдно", "людей много", "crowded"]
FASTPASS_KEYWORDS = ["экспресс", "vip", "браслет", "fastpass", "быстрый слот"]
APP_KEYWORDS = ["приложение", "app"]
CHILDREN_KEYWORDS = ["дети", "детям", "ребенок", "children"]
POSITIVE_KEYWORDS = ["понравилось", "классно", "в восторге", "вернемся", "отлично", "enjoyed"]
NEGATIVE_KEYWORDS = [
    "ужас",
    "ужасное",
    "разочарование",
    "не понравилось",
    "хамство",
    "плохо",
    "не стоит",
    "жуткие",
    "невозможно",
    "долгие",
    "дорогим",
    "дорого",
    "неоправданно",
    "космос",
    "космосом",
    "медленный",
    "длинные",
    "огромные",
    "простояли",
    "too high",
]
ATTRACTIONS = ["Мельница", "Молот судьбы", "Иммерсивный полёт", "Лагуна", "Лава", "Лианы", "Бешеный танец", "На крыльях ветра"]


def has_any(text: str, keywords: list[str]) -> bool:
    low = text.lower()
    return any(keyword.lower() in low for keyword in keywords)


def parse_rating(value: str) -> int | None:
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return None


def sentiment(text: str, rating_value: str) -> str:
    rating = parse_rating(rating_value)
    positive = has_any(text, POSITIVE_KEYWORDS)
    negative = has_any(text, NEGATIVE_KEYWORDS)
    if negative or (rating is not None and rating <= 2):
        return "negative"
    if positive or (rating is not None and rating >= 4):
        return "positive"
    return "neutral"


def mentioned_attractions(text: str) -> str:
    found = [name for name in ATTRACTIONS if name.lower() in text.lower()]
    return ";".join(found)


def main() -> None:
    with IN.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    fields = [
        "source",
        "date",
        "rating",
        "visit_date",
        "source_url",
        "platform_rating",
        "platform_reviews_count",
        "captured_at",
        "evidence_type",
        "text",
        "mentions_queue",
        "mentions_price",
        "mentions_crowd",
        "mentions_fastpass",
        "mentions_app",
        "mentions_children",
        "sentiment",
        "attractions_mentioned",
    ]
    labeled = []
    for row in rows:
        text = row["text"]
        labeled.append(
            {
                **row,
                "mentions_queue": has_any(text, QUEUE_KEYWORDS),
                "mentions_price": has_any(text, PRICE_KEYWORDS),
                "mentions_crowd": has_any(text, CROWD_KEYWORDS),
                "mentions_fastpass": has_any(text, FASTPASS_KEYWORDS),
                "mentions_app": has_any(text, APP_KEYWORDS),
                "mentions_children": has_any(text, CHILDREN_KEYWORDS),
                "sentiment": sentiment(text, row.get("rating", "")),
                "attractions_mentioned": mentioned_attractions(text),
            }
        )

    with OUT.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(labeled)

    queue_rows = [row for row in labeled if row["mentions_queue"]]
    with QUEUE_MENTIONS_OUT.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(queue_rows)

    print(f"wrote {len(labeled)} labeled reviews to {OUT}")
    print(f"queue-related reviews: {len(queue_rows)}")


if __name__ == "__main__":
    main()
