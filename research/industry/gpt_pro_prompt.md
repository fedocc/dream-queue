# Prompt для GPT Pro / Deep Research

Скопируй этот prompt, если нужно быстро добрать внешний research и источники.

```text
Ты выступаешь как market research analyst для B2B SaaS/AI startup в сфере theme parks, amusement parks, leisure venues и queue management.

Контекст:
Мы делаем исследовательский MVP Dream Queue AI для парка развлечений "Остров Мечты" в Москве. Идея: анализировать отзывы и операционные данные, моделировать очереди, virtual queue / fast-slot inventory, прогнозировать перегрузки и показывать парку экономический эффект: дополнительная выручка, меньше недовольства гостей, лучшее распределение потоков.

Важно:
- Не предлагай scraping закрытых источников, обход капчи, авторизацию или закрытые API.
- Используй только публичные источники, официальные страницы, пресс-релизы, open datasets и открытые отчеты.
- Явно разделяй facts, assumptions и speculation.
- Не используй фейковые отзывы.
- Нужны ссылки на источники.

Что нужно исследовать:
1. Какие решения для управления очередями уже используются в парках развлечений и leisure venues:
   - Disney Lightning Lane / Virtual Queue;
   - Universal Express Pass;
   - Six Flags Flash Pass;
   - accesso LoQueue;
   - Alibaba Cloud + Genting SkyWorlds AI-powered Virtual Queue;
   - другие релевантные кейсы.
2. Какие value propositions у таких решений:
   - снижение физического ожидания;
   - guest satisfaction;
   - paid priority access;
   - crowd distribution;
   - staff/capacity planning;
   - secondary spending: food, retail, merch.
3. Есть ли публичные данные или утверждения об ROI, revenue uplift, guest satisfaction uplift, wait-time reduction.
4. Какие бизнес-модели используются:
   - SaaS;
   - ticketing add-on;
   - revenue share;
   - enterprise implementation;
   - hybrid.
5. Какие риски и причины, почему парк может НЕ купить такое решение:
   - интеграции;
   - fairness backlash;
   - существующие вендоры;
   - отсутствие данных;
   - operational complexity;
   - privacy / security.
6. Какой минимальный пилот мог бы продать маленький startup без большой enterprise-интеграции.
7. Какие открытые datasets/API можно использовать для benchmarking очередей без нарушения правил.
8. Дай итоговый go/no-go вывод: стоит ли продолжать Dream Queue AI как coursework/startup MVP, и при каких условиях это может стать реальным бизнесом.

Формат ответа:
- Executive summary на 10 строк.
- Таблица игроков: компания/продукт, что делает, business model, доказательства ценности, источник.
- Отдельно: что применимо к "Острову Мечты", а что нет.
- Финансовая логика: какие метрики нужны, чтобы посчитать ROI.
- 3 варианта positioning для стартапа.
- 10 вопросов для customer discovery с операционным директором парка.
- Ссылки на все источники.
```
