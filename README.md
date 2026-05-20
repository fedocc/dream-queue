# Dream Queue AI

Исследовательский MVP и пилотное предложение для управления виртуальными слотами, ожиданием, потоками гостей, risk controls и ограниченным priority inventory в indoor theme parks.

Кейс для проверки гипотезы: парк «Остров Мечты» в Москве.

## Проблема

В пиковые дни физическое ожидание может снижать perceived value визита и забирать время, которое гость мог бы провести в других зонах парка. Для «Острова Мечты» это пока pilot hypothesis: ее нужно проверять baseline-измерением, а не выдавать за внутреннюю операционную метрику парка.

## Гипотеза решения

Dream Queue AI объединяет виртуальные очереди, прогноз ожидания, маршрутизацию гостей, risk controls и ограниченный инвентарь быстрых слотов.

Продукт не увеличивает физическую пропускную способность аттракционов. Он управляет временем, slot inventory, route guidance и операционными исключениями. Любая монетизация priority access должна быть ограничена capacity cap и проверена на standby impact.

## Что есть в MVP

1. Анализ review-evidence.
2. Скоринг аттракционов.
3. Финансовая модель.
4. Симуляция очередей.
5. Web-прототип.

## Политика данных

В MVP не используются фейковые отзывы. Работаем только с уже сохраненными локальными файлами, официальными страницами, ручной таблицей и открытыми датасетами. Закрытые API, авторизация, капчи и обход защит не используются.

Все публичные claims и числа делятся на четыре группы:

- Source;
- Assumption;
- Model output;
- Pilot hypothesis.

Подробно это описано в `research/claims_policy.md`, `research/evidence_map.md` и `research/data_audit.md`.

Коммерческая логика применения исследования описана в `research/product_application.md`, а pitch-ready case study по «Острову Мечты» - в `research/ostrov_mechty/case_study.md`.

## Структура проекта

```text
dream-queue-ai/
  research/       Market notes, case study, benchmarks
  data/           Real-sourced seed data and processed CSV outputs
  data/manual/    Manually extended review-evidence table
  notebooks/      Lightweight research notebook placeholders
  src/            Processing, model, simulation, API modules
  web/            React prototype
  outputs/        Charts, reports, pitch assets
  configs/        YAML assumptions and simulation settings
```

## Как запустить

Python-пайплайн запускается в существующем conda environment `ml`:

```bash
conda activate ml
```

Пересобрать таблицы отзывов, review metrics и скоринг аттракционов:

```bash
python src/processing/clean_reviews.py
python src/processing/label_reviews.py
python src/processing/review_metrics.py
python src/processing/pitch_summary.py
python src/processing/score_attractions.py
```

Ручное расширение отзывов делается через `data/manual/reviews_seed_extended.csv`. Правила сбора описаны в `research/manual_review_collection.md`.

Проверить ручной CSV:

```bash
python src/processing/validate_manual_reviews.py
```

Импортировать отзывы из локального DOCX `~/Downloads/майнор.docx`:

```bash
python src/processing/import_docx_reviews.py
```

Запустить финансовые сценарии. Они используют те же assumptions, что simulation layer, и берут wait time, sold slots и revenue из симуляции normal/peak day:

```bash
python src/model/scenario_runner.py
```

Запустить симуляции и обновить графики:

```bash
python src/simulation/baseline_simulation.py
python src/simulation/optimized_simulation.py
python src/simulation/visualization.py
```

Запустить API:

```bash
python src/api/main.py
```

Запустить web-прототип:

```bash
cd web
npm install
npm run dev
```

Если Vite пишет, что порт `5178` занят, нужно открыть URL, который он напечатает в терминале, например `http://127.0.0.1:5179/`.

## Артефакты MVP

Ожидаемые файлы после запуска пайплайна:

- `data/processed/reviews_labeled.csv`
- `outputs/reports/review_metrics.json`
- `outputs/reports/pitch_summary.json`
- `data/processed/attractions_scored.csv`
- `data/processed/benchmark_cases.csv`
- `outputs/reports/financial_scenarios.csv`
- `outputs/reports/simulation_summary.json`
- `outputs/charts/before_after_wait_time.png`
- `outputs/charts/queue_load_by_attraction.png`
- `outputs/charts/revenue_scenarios.png`
- `outputs/charts/visitor_satisfaction.png`

## Важное ограничение

Это исследовательский MVP. Текущая выборка отзывов маленькая, а симуляция и финансовая модель зависят от assumptions. Результаты нельзя выдавать за реальные операционные показатели парка без верифицированных данных посещаемости, capacity и фактических ожиданий.
