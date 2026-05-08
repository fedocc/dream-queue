# Открытые датасеты для benchmark

Дата ревизии: 2026-05-08.

Цель benchmark - не заменить данные «Острова Мечты», а проверить методологию на более крупных открытых данных: отзывы, wait times, очереди и ценность priority access.

## Подходящие источники

| Источник | Что дает | Как использовать в MVP | Ограничение |
|---|---|---|---|
| Kaggle Disneyland Reviews | 42 000 отзывов по Disneyland California, Hong Kong и Paris; поля `Review_ID`, `Rating`, `Year_Month`, `Reviewer_Location`, `Review_Text`, `Disneyland_Branch`; лицензия CC0 | Проверить словари queue/price/crowd/fastpass на большой выборке отзывов | Это Disneyland, не российский indoor-парк |
| Queue-Times API | Live wait times и статусы аттракционов для 80+ парков; обновление примерно каждые 5 минут; бесплатный доступ с требованием attribution | Взять несколько парков как benchmark для распределения wait times и peak/off-peak паттернов | Это не исторический bulk download; нужно соблюдать attribution и лимиты |
| Minitab Amusement park wait time data | Учебный датасет про причины долгого ожидания по категориям Personnel, Machine, Maintenance, Methods, Management, Environment | Использовать как пример cause-and-effect структуры для операционных причин очередей | Это учебный набор, не реальные guest reviews |
| Theme Park Shark public methodology/articles | Публикует агрегированные wait-time findings и методологию, но сами данные proprietary | Использовать только как публичный benchmark порядков величин и структуры метрик | Сырые данные не открыты |

## Что не делаем

- Не скрейпим закрытые или защищенные страницы.
- Не обходим авторизацию, капчи и rate limits.
- Не подмешиваем benchmark-отзывы к отзывам «Острова Мечты».
- Не выдаем зарубежные wait-time паттерны за данные московского парка.

## Практический следующий шаг

1. Скачать Kaggle Disneyland Reviews вручную через Kaggle UI или Kaggle API с учетом лицензии.
2. Положить файл в `data/external/`, не смешивая с `data/raw/reviews/`.
3. Прогнать те же словари queue/price/crowd/fastpass и сравнить доли с seed-выборкой.
4. Для wait-time benchmark использовать Queue-Times API только точечно и с attribution `Powered by Queue-Times.com`.

## Источники

- Kaggle Disneyland Reviews: `https://www.kaggle.com/datasets/arushchillar/disneyland-reviews`
- Queue-Times API: `https://queue-times.com/pages/api`
- Minitab Amusement park wait time data: `https://support.minitab.com/en-us/datasets/quality-tools-data-sets/amusement-park-wait-times/`
- Theme Park Shark methodology: `https://themeparkshark.com/data/`
