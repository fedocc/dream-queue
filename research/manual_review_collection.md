# Ручное расширение review-evidence

Дата ревизии: 2026-05-08.

## Зачем это нужно

Текущий размер seed dataset пересчитывается пайплайном и лежит в `outputs/reports/review_metrics.json`. Практичная цель перед встречей - держать не меньше 100-200 строк review-evidence с URL и датами.

## Куда добавлять

Файл:

```text
data/manual/reviews_seed_extended.csv
```

Пайплайн автоматически подмешивает этот файл к `data/raw/reviews/*.json`, удаляет дубликаты по `source_url + text` и пишет итог в `data/processed/reviews_clean.csv`.

Если отзывы сохранены в DOCX, их можно импортировать в отдельный файл:

```bash
python src/processing/import_docx_reviews.py
```

Скрипт читает `~/Downloads/майнор.docx`, не импортирует имена авторов и пишет только текстовые review-evidence фрагменты в `data/manual/reviews_from_docx.csv`.

## Поля

| Поле | Что писать |
|---|---|
| `source` | Название источника: `tripadvisor`, `tbank_reviews`, `official_feedback`, другой понятный источник |
| `source_url` | URL страницы, где виден отзыв или фрагмент |
| `date` | Дата публикации отзыва, если видна |
| `visit_date` | Дата визита, если видна |
| `rating` | Рейтинг конкретного отзыва, если виден |
| `platform_rating` | Общий рейтинг площадки, если нужен |
| `platform_reviews_count` | Общее число отзывов на площадке, если видно |
| `captured_at` | Дата ручного внесения, например `2026-05-08` |
| `evidence_type` | `public_review_excerpt` |
| `text` | Короткий фрагмент отзыва |

## Правила

- Не добавлять фейковые отзывы.
- Не массово скрейпить сайты.
- Не обходить авторизацию, капчи и защиту.
- Не собирать персональные данные авторов.
- Не копировать огромные тексты: для анализа достаточно короткого фрагмента с конкретной болью или позитивным наблюдением.
- Сохранять URL для каждой строки.
- Если отзыв не про очереди, его тоже можно добавлять: иначе выборка будет искусственно смещена.

## Баланс выборки

Чтобы не получить только негатив, лучше собирать примерно так:

- 40-50 строк с очередями, ожиданием, толпой;
- 20-30 строк про цену, билет, доплаты, экспресс;
- 20-30 нейтральных или позитивных строк без очередей;
- 10-20 строк с упоминанием конкретных аттракционов.

## Команда пересборки

```bash
conda activate ml
python src/processing/validate_manual_reviews.py
python src/processing/import_docx_reviews.py
python src/processing/clean_reviews.py
python src/processing/label_reviews.py
python src/processing/review_metrics.py
```

После этого смотреть:

```text
outputs/reports/review_metrics.json
```
