# Аудит данных

Дата ревизии: 2026-05-08.

## Правило для MVP

Мы не собираем данные с картографических сервисов и не обходим защиту сайтов. Для этого этапа используем только уже сохраненные локальные файлы, официальные страницы, ручную seed-таблицу и открытые датасеты, которые можно использовать легально.

Фейковые отзывы не используются. Первоначальные demo-отзывы удалены из `data/raw/reviews/` и не должны попадать в аналитику.

## Классы данных

### 1. Факты из источников

Это поля, которые можно проверить по сохраненному источнику или официальной странице:

- название источника;
- URL источника;
- дата публикации, если она видна в источнике;
- рейтинг, если он виден в источнике;
- дата захвата данных;
- название аттракциона и URL официальной страницы;
- видимые на официальной странице ограничения и тарифы.

Файлы:

- `data/raw/reviews/*.json`
- `data/manual/reviews_seed_extended.csv`
- `data/raw/attractions/attractions_raw.json`

### 2. Review-evidence

Это короткие публичные фрагменты отзывов, которые используются как свидетельства проблемы, а не как репрезентативный соцопрос.

Текущая выборка пересчитывается пайплайном. Актуальное число строк лежит в `outputs/reports/review_metrics.json`.

Файлы:

- `data/processed/reviews_clean.csv`
- `data/processed/reviews_labeled.csv`
- `data/processed/queue_mentions.csv`
- `data/manual/reviews_from_docx.csv`

Важно: по этой выборке можно говорить только «в seed-выборке есть повторяющиеся упоминания очередей». Нельзя говорить «такая доля всех гостей жалуется на очереди».

### 3. Assumptions

Это входные гипотезы модели:

- посещаемость в обычный и пиковый день;
- adoption виртуальной очереди;
- conversion в платные fast slots;
- средняя цена fast slot;
- estimated capacity и popularity аттракционов;
- эффект маршрутизации и сглаживания нагрузки.

Файлы:

- `configs/assumptions.yaml`
- `configs/simulation.yaml`
- `research/ostrov_mechty/assumptions.md`

### 4. Model outputs

Это результаты расчетов, а не исходные факты:

- `outputs/reports/review_metrics.json`
- `data/processed/attractions_scored.csv`
- `outputs/reports/financial_scenarios.csv`
- `outputs/reports/simulation_summary.json`
- `outputs/charts/*.png`

Их нужно читать как сценарную оценку при заданных assumptions.

## Как считаются метрики отзывов

Источник: строки `data/processed/reviews_labeled.csv`.

- `total_reviews`: число строк в CSV.
- `queue_related_share`: доля строк, где `mentions_queue == True`.
- `negative_share_among_queue_related`: доля `sentiment == negative` среди строк с `mentions_queue == True`.
- `price_related_share`: доля строк, где `mentions_price == True`.
- `crowd_related_share`: доля строк, где `mentions_crowd == True`.
- `fastpass_related_share`: доля строк, где `mentions_fastpass == True`.
- `attractions_mentioned_count`: счетчик названий из поля `attractions_mentioned`.
- `frequent_queue_terms`: частотность слов в текстах с `mentions_queue == True` после удаления простых стоп-слов.

Скрипт:

```bash
python src/processing/review_metrics.py
```

## Как считаются метрики симуляции

Источник: `src/simulation/baseline_simulation.py`, `src/simulation/optimized_simulation.py`, `src/simulation/metrics.py`.

- `avg_wait_time`: среднее ожидание по всем накопленным samples ожидания за симуляцию.
- `max_queue_length`: максимальная длина очереди среди всех аттракционов и шагов времени.
- `queue_variance`: дисперсия текущих очередей между аттракционами; показывает перекос нагрузки.
- `attractions_completed_per_visitor`: всего завершенных посещений аттракционов / число гостей.
- `paid_slots_sold`: количество купленных быстрых слотов в optimized-сценарии.
- `revenue_generated`: `paid_slots_sold * avg_slot_price`.
- `satisfaction_score`: модельный индекс 0-100 из функции `satisfaction`; в JSON сейчас хранится как `visitor_satisfaction_score`.

## Что нужно сделать дальше

1. Собрать 100-300 отзывов вручную с сохранением URL, даты и source metadata.
2. Разделить отзывы по типу дня: будни, выходные, каникулы, праздники.
3. Добавить поля `review_id`, `author_hash`, `raw_rating`, `source_platform`.
4. Отдельно размечать точные жалобы: очередь, цена, ростовые ограничения, персонал, еда, толпа, доплаты.
5. После 100+ отзывов пересчитать pain metrics и обновить pitch.
6. Не смешивать benchmark-датасеты с отзывами «Острова Мечты»: benchmark нужен только для сравнения порядков величин и проверки методологии.
