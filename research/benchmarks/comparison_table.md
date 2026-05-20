# Сравнение аналогов

| Пример | Механика | Что доказывает | Ограничение | Чем отличается Dream Queue AI |
|---|---|---|---|---|
| Disney Premier Access | Платный быстрый проход: пакет или один аттракцион со слотом | Paid priority access is a known category | Не доказывает Dream Queue revenue uplift или отсутствие standby impact | Проверяем governed priority inventory с capacity cap |
| Universal Express | Платный проход в отдельную очередь на participating rides | Premium queue access is a known product pattern | Обычно это дорогой дневной pass; не заменяет VQ risk controls | Тестируем более узкие слоты на конкретные bottlenecks |
| Genting SkyWorlds + Alibaba Cloud | AI-powered Virtual Queue, itinerary planning, crowd prediction, incentives | VQ + routing + incentives + crowd prediction exists in theme-park operations | KPI, revenue uplift, wait reduction, no-show rate and implementation cost are not disclosed | Начинаем с легкого pilot layer: baseline, analytics, simulation, dashboard, slot policy |
| accesso / Attractions.io / Lineberty | Virtual queue, operator controls, QR/ticket validation, dashboards, group handling, terminal fallback | Similar vendors confirm the category and common control surface | Vendor KPI claims are not independent audited facts unless separately verified | Используем feature-pattern evidence, not vendor KPI promises |

## Главный вывод

Обычный express-pass уже понятен рынку. Более интересная гипотеза для `Острова Мечты`:

> Не продавать еще один дорогой VIP-пропуск, а проверить управляемый слой между обычным билетом и экспрессом: бесплатные virtual slots + ограниченные paid priority slots на конкретные bottleneck attractions.

## Открытые данные для benchmark

Отдельный список открытых источников лежит в `research/benchmarks/open_datasets.md`.

Эти данные нельзя смешивать с отзывами «Острова Мечты». Их роль - проверить методику расчета метрик и сравнить порядки величин на более крупных публичных наборах.
