# Что работает под капотом

Дата: 2026-05-20.

## Коротко

Под капотом сейчас не нейросеть и не black-box ML. Это прозрачный research pipeline:

1. очистка и разметка отзывов;
2. расчет review metrics;
3. сценарная симуляция очередей;
4. финансовая модель;
5. dashboard, который показывает outputs.

Это хорошо для презентации, потому что можно объяснить каждую цифру. Но это нельзя называть production AI optimizer.

## 1. Разметка отзывов

Файл: `src/processing/label_reviews.py`.

Что делает:

- берет очищенные отзывы из `data/processed/reviews_clean.csv`;
- ищет ключевые слова про очереди, цену, толпу, fastpass, приложение и детей;
- определяет простой sentiment по рейтингу и словам;
- ищет упоминания выбранных аттракционов;
- записывает результат в `data/processed/reviews_labeled.csv`.

Пример логики:

- `mentions_queue=True`, если текст содержит "очередь", "ждать", "ожидание", "queue", "waiting" и похожие слова;
- `mentions_price=True`, если текст содержит "дорого", "цена", "билет", "доплата", "expensive";
- `sentiment=negative`, если рейтинг низкий или есть негативные слова.

Это rule-based labeling. Его плюс - прозрачность. Минус - он хуже понимает сарказм, контекст и сложные формулировки.

## 2. Метрики отзывов

Файл: `src/processing/review_metrics.py`.

Что считает:

- `total_reviews`;
- `queue_related_share`;
- `negative_share_among_queue_related`;
- `price_related_share`;
- `crowd_related_share`;
- `fastpass_related_share`;
- `attractions_mentioned_count`;
- `frequent_queue_terms`.

Главная цифра сейчас:

- 328 отзывов;
- 96 queue-related;
- 29.3% queue-related share;
- 31.2% negative среди queue-related.

Как это объяснить:

> Мы не просим GPT придумать вывод. Мы считаем доли по CSV: если в строке стоит `mentions_queue=True`, она попадает в queue-related count.

## 3. Симуляция очередей

Файлы:

- `src/simulation/baseline_simulation.py`;
- `src/simulation/optimized_simulation.py`;
- `src/simulation/park_entities.py`;
- `src/simulation/metrics.py`.

Тип модели:

> дискретная имитационная модель с шагом 5 минут.

Как она работает:

1. Берутся аттракционы из `data/raw/attractions/attractions_raw.json`.
2. Для каждого аттракциона есть estimated popularity и estimated capacity per hour.
3. День делится на 5-минутные шаги.
4. Спрос распределяется по аттракционам с учетом popularity и профиля дня.
5. У каждого аттракциона есть очередь и capacity per step.
6. На каждом шаге часть гостей обслуживается, остаток остается в очереди.
7. Из истории очередей считаются среднее ожидание, максимум очереди и variance.

Baseline:

- гости идут по популярности аттракционов;
- нет платных быстрых слотов;
- нет routing/recommendation механики.

Optimized:

- часть спроса может купить быстрый слот;
- быстрые слоты ограничены долей capacity;
- routing снижает вес перегруженных аттракционов и повышает вес менее загруженных;
- fast-slot demand появляется сильнее, когда wait time высокий.

## 4. Satisfaction score

Файл: `src/simulation/metrics.py`.

Это простой индекс 0-100:

```text
78 - avg_wait_minutes * 0.35 + attractions_per_guest * 4.5
```

Он нужен не как реальная NPS-модель, а как удобная synthetic metric для сравнения baseline и optimized сценариев.

## 5. Финансовая модель

Файл: `src/model/financial_model.py`.

Прямая логика:

```text
daily_fast_slot_revenue =
visitors * paid_fast_slot_conversion * average_fast_slot_price_rub * average_slots_per_buyer
```

Годовая логика:

- считаем fast-slot revenue в peak days и normal days;
- считаем долю стартапа;
- считаем долю парка;
- добавляем retail uplift через extra food/retail spend per guest.

Все входные assumptions лежат в `configs/assumptions.yaml`.

## 6. Benchmark Disneyland

Файл: `src/processing/benchmark_disneyland_reviews.py`.

Зачем он нужен:

- показать, что методика review metrics применима не только к 328 отзывам;
- проверить те же признаки на 42k открытых отзывов Disneyland;
- не смешивать benchmark с данными "Острова Мечты".

Важно:

> Disneyland benchmark не доказывает проблемы "Острова Мечты". Он доказывает, что наш подход можно масштабировать на большой открытый датасет из той же индустрии.

Что получилось после прогона:

- reviews: 42 656;
- queue-related share: 52.1%;
- negative среди queue-related: 33.3%;
- price-related share: 37.4%;
- crowd-related share: 25.6%;
- fastpass-related share: 17.2%.

Сравнение с "Островом Мечты":

| Метрика | Остров Мечты seed evidence | Disneyland benchmark |
|---|---:|---:|
| Reviews | 328 | 42 656 |
| Queue-related share | 29.3% | 52.1% |
| Negative among queue-related | 31.2% | 33.3% |
| Price-related share | 21.6% | 37.4% |
| Crowd-related share | 7.3% | 25.6% |
| Fastpass-related share | 5.5% | 17.2% |

Как это презентовать:

> Внешний benchmark не заменяет локальные отзывы. Он нужен, чтобы показать: очереди, цена, толпы и fastpass - нормальные измеримые темы в индустрии парков, а наш pipeline умеет считать эти темы на большом датасете.

## Достаточно ли этого для презентации

Да, если честно позиционировать:

> Это не production AI и не точный прогноз. Это research MVP, который показывает pipeline от evidence к decision metrics.

Что лучше добавить перед показом:

1. Один слайд "Что под капотом".
2. Один слайд "Что является фактом, что assumption, что output".
3. Один benchmark: Disneyland Reviews на 42k строк.
4. Четкий caveat: модель станет реальной только после данных парка.
