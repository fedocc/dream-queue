# Как теперь считаем деньги

Дата: 2026-05-20.

## Почему старая формула была неполной

Раньше в pitch было слишком много акцента на прямую продажу быстрых слотов:

```text
visitors * paid_fast_slot_conversion * average_fast_slot_price * average_slots_per_buyer
```

Эта формула корректна только для отдельного revenue stream: если парк продает быстрые слоты поштучно или как явный premium add-on.

Для «Острова Мечты» это может быть неполной логикой, потому что гость чаще платит за входной билет или более высокий тариф/скипасс. Тогда главный экономический эффект не обязательно в продаже нового слота, а в том, что человек не стоит физически в очереди и проводит это время в кафе, магазинах, игровых/развлекательных зонах.

## Новая логика

Теперь финмодель разделяет два потока:

1. **Прямой fast-slot revenue** - optional поток, если есть доплата за быстрый проход.
2. **Secondary spend uplift** - основной поток для гипотезы про виртуальную очередь: высвобожденное физическое ожидание может перейти в еду, напитки, retail и другие траты.

## Формула secondary spend

```text
virtual_queue_guests =
annual_visitors * virtual_queue_adoption

freed_wait_hours =
virtual_queue_guests * freed_physical_wait_minutes_per_virtual_queue_guest / 60

park_retail_uplift =
freed_wait_hours * spend_per_freed_wait_hour_rub * freed_wait_spend_capture_rate
```

Что означает:

- `annual_visitors` - сценарная годовая посещаемость;
- `virtual_queue_adoption` - доля гостей, которые реально используют виртуальную очередь;
- `freed_physical_wait_minutes_per_virtual_queue_guest` - сколько минут физического ожидания переносится из очереди в свободное время по парку;
- `spend_per_freed_wait_hour_rub` - сколько рублей потенциально можно потратить за час свободного времени в кафе/магазинах;
- `freed_wait_spend_capture_rate` - какая доля этого потенциала реально конвертируется в выручку.

Все эти параметры являются assumptions. Их нельзя выдавать за факты парка.

## Текущие assumptions

Файл: `configs/assumptions.yaml`.

```yaml
freed_physical_wait_minutes_per_virtual_queue_guest: 30
spend_per_freed_wait_hour_rub: 250
freed_wait_spend_capture_rate: 0.35
```

Это не реальные данные «Острова Мечты». Это аккуратные входные гипотезы, которые надо заменить фактическими POS/attendance/wait-time данными после пилота.

## Base scenario после пересчета

По текущей модели:

- annual fast-slot revenue: 21.1 млн ₽;
- доля парка от fast-slot revenue: 17.9 млн ₽;
- freed physical wait hours: 283 500 часов;
- park retail uplift: 24.8 млн ₽;
- park annual uplift: 42.7 млн ₽.

Правильная формулировка:

> В base scenario модель показывает 42.7 млн ₽ потенциального годового эффекта для парка. Это не прогноз, а сценарий при заданных assumptions. Существенная часть эффекта теперь считается через высвобожденное время гостей, которое может перейти в кафе, retail и другие зоны.

## Что надо спросить у парка для проверки

Чтобы заменить assumptions фактами, нужны:

- средний spend per visitor в кафе/магазинах;
- spend по часам дня;
- посещаемость по дням и часам;
- среднее время физического ожидания на выбранных аттракционах;
- доля гостей, которые уже покупают более дорогой тариф/скипасс;
- продажи быстрых проходов, если они есть;
- доля гостей, которые уходят из очереди или не успевают на аттракционы;
- загрузка кафе/магазинов в пиковые часы.

## Почему Genting/Alibaba поддерживает эту логику

В публичном кейсе Alibaba Cloud для Genting SkyWorlds ценность VQ описана не только как сокращение очереди, но и как перераспределение людей. Система рекомендует маршруты, показывает доступные VQ-слоты и предлагает активности, которыми гости могут заняться во время ожидания. Отдельно упоминается перенаправление гостей из перегруженных зон в non-ride attractions, eateries и retail malls.

Это ближе к нашей новой логике:

> Деньги появляются не только из платного прохода, а из управления временем гостя внутри парка.

## Источники

- Alibaba Cloud customer case, Genting: https://www.alibabacloud.com/customers/genting
- Alibaba Cloud / Genting SkyWorlds press release: https://www.rwgenting.com/content/dam/approved/rw-genting/web/images/press-releases/PRESS%20RELEASE_AlibabaCloud-Brings-a-Unique-Tech-Fuelled-Experience-to-Genting-Skyworlds-Theme-Park_280622.pdf
- Universal Orlando Virtual Line: https://www.universalorlando.com/web/en/us/plan-your-visit/virtual-line/
- Disney World Virtual Queue: https://disneyworld.disney.go.com/guest-services/virtual-queue/
