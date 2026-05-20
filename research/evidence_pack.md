# Dream Queue AI - Evidence Pack v0.2

Дата: 2026-05-20  
Статус: рабочий исследовательский пакет для сайта, Codex и разговора с парком.  
Проект: Dream Queue AI / майнор.

---

## 0. Executive verdict

В тему есть смысл лезть, но только как в узкий pilot / discovery, а не как в большой продукт, который сразу заменяет операционную систему парка.

Правильная формулировка:

> Dream Queue AI - lightweight operations layer для indoor theme parks, который переводит физическое ожидание в управляемый slot inventory: VQ-слот, маршрут, риск-контроль, операционный сигнал и ограниченную коммерческую возможность.

Неправильная формулировка:

> Мы сделаем AI, который уберет очереди и гарантированно увеличит выручку на X%.

Публичные данные подтверждают категорию, но не дают готового KPI по выручке. Genting/Alibaba показывают operating pattern: ticket-linked VQ, itinerary planning, incentives, crowd prediction, QR validation, group reservations, kiosks and late-window policy. Китайский рынок показывает, что digital reservations and crowd flow tooling важны в high-crowd leisure markets, но app-only и жесткая обязательная запись вызывают backlash. Вендоры accesso, Attractions.io, Lineberty и Disney подтверждают, что VQ - зрелая категория, где ключевое не UI, а правила inventory, validation, no-shows, late arrivals and staff operations.

---

## 1. Вопрос по масштабу: если у «Острова Мечты» меньше аттракционов, есть ли смысл?

Да, но это меняет позиционирование.

Факт: официальный сайт «Острова Мечты» на странице билетов указывает 49 аттракционов и 5 шоу. Страница развлечений говорит о более чем 50 развлечениях. Также у парка уже есть экспресс-вход и VIP-экспресс с персональным сопровождающим и сверхприоритетным доступом. Это не маленькая локация для продукта управления потоками.

Главная мысль: полезность VQ зависит не от общего количества аттракционов, а от четырех вещей:

1. насколько высоки очереди на топовых bottleneck-rides;
2. насколько неравномерно распределяется спрос;
3. есть ли альтернативные зоны, куда можно отправить гостя во время ожидания;
4. можно ли операционно контролировать слот: ticket binding, QR validation, late policy, staff override.

Меньший парк даже может быть лучше для первого пилота:

- меньше интеграций;
- проще объяснить маршрут гостя;
- легче снять baseline до/после;
- меньше операционный риск;
- легче начать с 5-8 аттракционов, а не со всей территории.

Но меньший парк хуже для «магической маршрутизации по сотне вариантов». Поэтому для «Острова Мечты» pitch надо сузить:

> Не full-park AI itinerary.  
> А pilot на 5-8 bottleneck attractions + peak windows + limited fast-slot inventory + operator dashboard + risk controls.

Decision rule:

- Если в пиковые дни хотя бы 5-8 аттракционов регулярно дают ожидание 30+ минут - VQ/prediction/routing имеет смысл тестировать.
- Если почти все очереди редко выше 15-20 минут - полноценный VQ не нужен; тогда ценность скорее в wait-time visibility, express inventory governance and dynamic pricing.
- Если есть существующий экспресс/VIP, но нет прозрачного digital inventory / dashboard / slot policy - есть пространство для lightweight layer.

---

## 2. Evidence map

| Блок | Что подтверждает | Как использовать | Что нельзя утверждать |
|---|---|---|---|
| China smart tourism | Высоконагруженные туристические рынки используют reservations, real-time crowd information, digital scenic platforms, AI/IoT monitoring. | Показывать, что crowd-flow intelligence - не фантазия, а направление рынка. | Не говорить, что Китай доказал именно нашу экономику. |
| Alibaba smart scenic area | Alibaba продает не просто cloud, а digital scenic infrastructure: mini-program entry, Amap, IoT, edge AI, visitor flow, queue visibility. | Обосновать архитектурный паттерн: guest journey + operations + data. | Не копировать facial recognition / масштаб Alibaba. |
| Genting SkyWorlds + Alibaba Cloud | VQ + itinerary planning + incentives + crowd prediction публично внедрялись в theme park. | Использовать как category proof. | Не обещать Genting-like uplift. KPI не раскрыты. |
| Vendors: accesso / Attractions.io / Lineberty | Категория VQ и операционные dashboards уже существует. | Показывать зрелость рынка и учиться risk controls. | Не выдавать vendor claims за независимый аудит. |
| Disney Virtual Queue | VQ требует limited availability, return windows, late policy, group/ticket logic. | Встроить SOP в Dream Queue. | Не говорить, что Disney доказывает revenue uplift. |
| Остров Мечты | Есть 49 аттракционов + 5 шоу, экспресс-вход и VIP-экспресс, планы расширения. | Парк уже понимает priority access; наш вход - scalable digital layer. | Не утверждать, что у них есть постоянная боль без их данных. |

---

## 3. China market: что важно для Dream Queue

### 3.1. Рынок большой и конкурентный

China Daily со ссылкой на competitiveness report по 86 large and extra-large theme parks: 130 млн посетителей в 2023 году и 30.4 млрд юаней operating revenue; по состоянию на октябрь 2024 года в Китае 385 theme parks, около 60% прибыльны. McKinsey писал, что Китай - второй крупнейший рынок тематических парков; проникновение было только 27% населения против 68% в развитых рынках, а рынок мог вырасти с около RMB 40 млрд в 2019 до более RMB 90 млрд к концу 2025 года. TEA Global Experience Index 2024 говорит о стабильном росте global top 25 theme parks и record years у leading internationally branded parks in China.

Use for Dream Queue:

- Это не доказывает московский спрос, но показывает, что theme park operations / digitized guest experience - большая и конкурентная категория.
- В Китае вопрос уже не «нужна ли цифровизация», а «как сделать ее без friction и backlash».

### 3.2. Китайский урок: reservation systems должны быть гибкими

Китай сначала массово внедрил online / real-name reservations, особенно после 2020 года, но в 2023-2024 началась корректировка: нельзя делать one-size-fits-all. Публичные материалы говорят о необходимости сохранять on-site ticketing, упрощать процедуры, учитывать elderly / inbound visitors, уменьшать персональные данные там, где advance booking не обязателен, и бороться со scalping.

Use for Dream Queue:

- Не строить app-only продукт.
- Не требовать обязательной записи на все.
- Сделать hybrid access: app/web + kiosk/staff mode + standby path.
- Minimum PII: ticket ID hash, group size, timestamp, attraction ID.
- Reservations только там, где есть bottleneck or peak-window need.

### 3.3. Smart scenic spot - не только билеты

Китайские smart scenic area кейсы обычно включают:

- digital entry / ticketing;
- real-time visitor flow;
- mini-programs;
- route suggestions;
- parking and facility visibility;
- crowd thresholds;
- AI/video/IoT-based alerts;
- data dashboards for management.

Use for Dream Queue:

> Dream Queue должен звучать не как «очередь в приложении», а как small smart-operations layer: wait-time intelligence + VQ slots + guest guidance + dashboard.

---

## 4. Alibaba pattern

### 4.1. Alibaba Cloud Smart Scenic Area

Alibaba Cloud official smart scenic solution говорит о нескольких слоях:

- Amap / mini-program entry for visitors;
- digital infrastructure for scenic areas;
- IoT + internet applications;
- real-time data collection;
- edge AI analysis;
- visitor flow analysis;
- trajectory tracking;
- boundary alerts;
- real-time guide services;
- visibility into parking, toilets and queue conditions.

Interpretation for Dream Queue:

Alibaba продает не «AI на очереди», а platform thinking: infrastructure + visitor experience + operations + data. Для Dream Queue это значит: не пытаться быть Alibaba Cloud, но перенять архитектуру в lightweight виде.

### 4.2. Universal Beijing Resort + Alibaba

Alibaba Group and Universal Beijing Resort announced a strategic partnership in 2019. Публично описаны:

- Fliggy for tickets and hotels;
- Alipay facial recognition for park entry, lockers, express-lane access and payments;
- Koubei for F&B recommendations and online meal purchases;
- Alipay mini apps for trip planning and parking pain points;
- Alibaba Cloud for technology infrastructure.

Interpretation:

Alibaba мыслит theme park as an integrated guest journey:

> ticket -> entry -> route -> queue -> food -> retail -> payment -> data -> operations.

Для Dream Queue не нужно идти в facial recognition. Наоборот: для пилота в России лучше explicitly avoid biometrics and heavy PII. Но сам pattern важен: очередь не отдельна от маршрута, еды, покупок и operational dashboard.

---

## 5. Genting SkyWorlds + Alibaba Cloud: deeper product logic

### 5.1. Что было организовано публично

Alibaba Cloud customer case говорит, что VQ solution для Genting SkyWorlds:

- интегрирована с reservation system for individual rides;
- использует AI;
- включает 5 algorithm modules:
  - Dynamic VQ Slot Prediction;
  - Dynamic Gamification Management;
  - Itinerary Planning;
  - Incentive Recommendation;
  - Crowd Analysis and Prediction;
- evaluates supply and demand for each attraction;
- shows available VQ slots and waiting period in real time;
- recommends itinerary while visitor waits;
- generates incentives to divert patrons from overcrowded areas to non-ride attractions, eateries and retail malls.

Official Genting VQ rules добавляют операционную часть:

- guest downloads mobile app;
- creates profile;
- links entrance tickets by QR / Ticket ID;
- creates Group Profile by linking group members' tickets;
- selects attractions/shows and preferred time slots;
- scans QR at designated VQ entrance;
- guests without smartphones can use VQ kiosks;
- VQ reservations are linked to entrance tickets;
- VQ subject to availability;
- VQ valid only on selected day/time;
- VQ does not guarantee immediate access;
- QR may be scanned again by a team member for final validation;
- same attraction cannot be booked again until current reservation is fulfilled or expired.

FAQ Genting добавляет:

- each VQ reservation has unique QR code;
- late window is 30 minutes;
- reservation cannot be transferred;
- group reservations use linked tickets;
- booking same attraction again depends on quota and available slots.

### 5.2. What Genting proves / does not prove

Proves:

- VQ + itinerary + incentives + crowd prediction is a real enterprise pattern.
- The product requires strict operations: ticket binding, QR, group handling, late window, kiosks, subject-to-availability rules.
- The value is not only shorter queue, but more time inside park and better crowd distribution.

Does not prove:

- exact revenue uplift;
- exact reduction in average wait time across the park;
- algorithmic accuracy;
- cost of implementation;
- share of guests following recommendations;
- no-show rate;
- paid conversion.

Pitch wording:

> Public evidence from Genting/Alibaba confirms the operating category, not a guaranteed KPI. Dream Queue uses this pattern for a smaller, lower-risk pilot.

---

## 6. Comparable products and startup/vendor landscape

### 6.1. accesso LoQueue

accesso positions LoQueue as virtual queuing where visitors choose ride time and explore the park; dashboards reveal dwell time, per-cap spend and guest-flow patterns. accesso also makes large vendor claims about saved guest minutes and incremental revenue. Treat these as vendor claims unless independently audited.

Takeaway:

- Category exists and has enterprise buyers.
- Operators care about dwell time, per-cap spend and guest-flow, not only wait minutes.

### 6.2. Attractions.io

Attractions.io describes virtual queuing with:

- QR/ticket validation;
- operator app;
- queue open/close/evacuate controls;
- guest compensation;
- throughput, queue numbers and holding capacity;
- no-show and abandon-rate tracking;
- dashboards and alerts.

Takeaway:

- Risk controls are core product, not edge cases.
- Dream Queue should model no-shows, abandonments, late arrivals, and staff overrides.

### 6.3. Lineberty

Lineberty describes digital queue management with:

- phone or terminal booking;
- real-time waiting time;
- notifications;
- high-traffic queue management;
- group management;
- geofencing;
- QR / validation APIs.

Takeaway:

- Kiosk/terminal fallback matters.
- Group management matters.
- Validation APIs matter.

### 6.4. Disney Virtual Queue

Disney's public VQ rules stress limited availability and operational boundaries. Late arrivals may not be accommodated. Virtual queues are not a guarantee; guest assistance is handled through app/kiosks/guest relations.

Takeaway:

- VQ is controlled scarcity, not infinite promise.
- The site must never imply «everyone can skip the line».

---

## 7. «Остров Мечты»: fit and positioning

Public facts:

- Official tickets page: 49 attractions and 5 shows.
- Entertainment page: more than 50 entertainments.
- Park ticket includes unlimited rides/shows.
- Express entry exists as a tariff: standard + accelerated queue.
- VIP-express exists with personal attendant and super-priority access.
- Official news says the park has 47 attractions in 2024 and planned a new outdoor park with 20+ attractions; it also says the park moved to differentiated pricing to redistribute load across days.

Interpretation:

- They already understand paid priority.
- They already experiment with demand shaping via differentiated pricing.
- Dream Queue should not pitch «inventing fast pass».
- Dream Queue should pitch «governed digital inventory and queue-flow intelligence around existing priority logic».

Best angle:

> You already have premium priority access. We propose a scalable digital layer for peak windows: limited VQ / limited paid priority / guest routing / operator dashboard / risk controls, tested on selected bottleneck attractions.

---

## 8. Risk register

| Risk | Evidence / why real | Dream Queue control |
|---|---|---|
| Late arrivals | Genting uses a 30-minute VQ window; Disney says late arrivals may not be accommodated. | Return window, push reminders, expiry, staff override policy. |
| No-shows | VQ vendors track no-shows and abandon rates. | `no_show_rate`, auto-release, safe overbooking cap. |
| QR sharing / fraud | Genting links VQ to entrance tickets and scans QR; final validation by staff. | One-time/dynamic QR, ticket binding, scan each group member or group size. |
| Scalpers / slot hoarding | China had complaints about reservation scalping; authorities urged market cleanup and flexible ticket supply. | No transfer, account/ticket limits, rate limits, abnormal behavior logging. |
| Group mismatch | Genting requires linked group tickets and all group members present. | Group QR with linked tickets; only present linked guests admitted. |
| App exclusion | China stresses offline counters; Genting provides VQ kiosks. | Kiosk/staff mode, printed QR, SMS fallback. |
| Slot scarcity backlash | Disney and Genting stress subject to availability and no guarantee. | Clear availability, rolling release, waitlist, alternative recommendations. |
| Ride downtime | Outdoor/large rides can become unavailable; VQ does not guarantee immediate access. | Pause slots, reassign windows, send compensation/alternative route. |
| Fairness backlash | Paid priority can hurt standby if uncapped. | Paid capacity cap, standby penalty threshold, public fairness language. |
| Route non-compliance | Genting uses incentives to move guests to non-ride/eateries/retail. | `route_compliance_rate`, incentives, measure clicks/visits/redeems. |
| Too much PII | China reservation backlash included convenience/privacy concerns. | Minimum PII, no biometrics, retention policy, aggregate analytics. |
| Staff conflict at entrance | VQ is enforced at the gate, not only in UI. | SOP for expired QR, wrong group, app error, disabled guests, downtime. |

---

## 9. Variables to add to simulation

Add a risk realism layer so the model stops looking like magic.

| Variable | Why |
|---|---|
| `no_show_rate` | Guests who book but do not arrive. |
| `late_arrival_rate` | Guests arriving after return window. |
| `grace_period_minutes` | Park tolerance for late arrivals. |
| `slot_release_after_minutes` | When unused capacity returns to inventory. |
| `route_compliance_rate` | Share of guests who follow recommendations. |
| `kiosk_share` | Guests without app / app unwilling. |
| `staff_override_rate` | Manual cases at gate. |
| `ride_downtime_probability` | Attraction interruption risk. |
| `paid_capacity_cap` | Max capacity share for paid priority. |
| `standby_penalty_threshold` | Maximum acceptable standby degradation. |
| `abandon_rate` | Guests leaving a queue or VQ path. |

Display rule:

- These must be labelled as assumptions.
- Outputs must be labelled as scenario/model outputs.
- Nothing is measured effect until real park data is available.

---

## 10. Pilot proposal for «Остров Мечты»

### 10.1. Pilot scope

Recommended pilot:

- 4-8 weeks;
- 5-8 bottleneck attractions;
- peak days / peak windows only;
- baseline measurement first;
- simple VQ slots;
- limited paid priority cap;
- route recommendations to nearby attractions, shows, F&B and retail;
- operator dashboard;
- QR validation prototype;
- staff SOP.

### 10.2. Data request

Ask for the minimum viable operational dataset:

| Data | Why |
|---|---|
| Hourly attendance by day type | Peak windows. |
| Attraction capacity: seats, cycle time, dispatch interval | True throughput. |
| Wait-time logs or manual observations | Bottleneck identification. |
| Downtime / temporary closures | Simulation realism. |
| Existing express/VIP demand and constraints | Current priority economics. |
| F&B/retail revenue by hour/zone, aggregated | Freed-time monetization proxy. |
| App/site/ticketing capabilities | Integration scope. |
| Queue complaints / NPS / reviews | Guest pain validation. |
| Map/walking times | Routing realism. |
| Staff constraints | Gate validation and SOP feasibility. |

If they cannot share commercial data, start with non-sensitive data:

- manual wait-time observations;
- estimated capacity;
- counts at ride entrances;
- simulated slot inventory;
- prototype QR validation;
- before/after guest survey.

### 10.3. Decision metrics

Pilot is worth scaling only if it improves at least 2-3 of the following:

- max queue on selected rides;
- wait-time predictability;
- guest complaints about queues;
- slot utilization;
- no-show handling;
- operator visibility;
- F&B/retail proxy during wait windows;
- paid priority revenue without unacceptable standby degradation.

---

## 11. Website recommendation

Current site direction is correct as research MVP, but looks too generic / AI-generated because it has broad SaaS blocks, decorative metrics and not enough operator-grade product specificity.

Recommended design direction:

> A + B = Operator Control Room + Map-first Guest Flow.

Visual language:

- dark command-center background;
- abstract indoor park map;
- live routes and slot cards;
- dashboard panels;
- heatmap / bottleneck states;
- clear source labels;
- risk controls visible;
- no cartoon, no Disney-like visuals, no childish theme, no IP copying;
- no generic purple SaaS gradient as main identity.

Hero concept:

> Управлять не очередью, а временем гостя.

Subline:

> Lightweight operations layer для virtual queue, прогноза ожидания и маршрутизации гостей в indoor theme parks.

Main sections:

1. Hero with map + live queue cards.
2. Problem: physical waiting destroys perceived value.
3. Evidence map: Genting, China, vendors, Disney, Dream Island facts.
4. How it works: ticket -> VQ slot -> free wait -> route -> return -> dashboard.
5. Operator dashboard preview.
6. Risk controls.
7. Simulation with assumptions labels.
8. Pilot plan.
9. Source / evidence appendix.

---

## 12. Claims policy for site and pitch

Allowed:

- «Genting/Alibaba confirms the category: VQ + itinerary + incentives + crowd prediction exists in theme park operations.»
- «Dream Queue does not increase ride capacity; it redistributes demand and manages time.»
- «Остров Мечты already has express/VIP priority products; Dream Queue explores scalable digital inventory governance.»
- «China shows the need for hybrid, flexible reservations and anti-scalper controls.»

Not allowed:

- «Alibaba proved that Dream Queue gives X% revenue.»
- «VQ eliminates queues.»
- «All guests will follow route recommendations.»
- «Paid fast slots can be sold without hurting standby.»
- «The simulation is a measured effect.»
- «We know the park's real wait times without their data.»

---

## 13. Recommended repository placement

Add these files:

```text
research/evidence_pack.md
research/risk_register.md
research/pilot_data_request.md
research/claims_policy.md
AGENTS.md
```

Update these areas:

```text
web/src/App.tsx        # copy structure and sections
web/src/styles.css     # design system and layout
configs/*.yaml         # risk assumptions if present
src/simulation/*       # risk variables if model layer exists
README.md              # shorter positioning + evidence links
```

Codex should not invent new data. It should copy the evidence pack into repo, then update UI and docs with strict labels: source, assumption, model output.

---

## 14. Source list

Official / primary and strong sources used:

1. Alibaba Cloud Genting customer case - https://www.alibabacloud.com/en/customers/genting?_p_lc=1
2. Genting SkyWorlds VQ Reservations - https://www.gentingskyworlds.com/en/tickets/vq-reservations.html
3. Genting SkyWorlds FAQ - https://www.gentingskyworlds.com/en/faq.html
4. Alibaba Group + Universal Beijing Resort partnership - https://www.alibabagroup.com/en-US/document-1491572186106822656
5. Alibaba Cloud Smart Scenic Area solution - https://cn.aliyun.com/solution/cutural-tourism/sights
6. China Daily: China theme parks 2023 visitors/revenue - https://govt.chinadaily.com.cn/s/202411/25/WS6743fe6e498eec7e1f7285ae/theme-parks-logged-130-million-visitors-in-2023.html
7. McKinsey Greater China theme parks report - https://www.mckinsey.com.cn/%E4%B8%AD%E5%9B%BD%E4%B8%BB%E9%A2%98%E5%85%AC%E5%9B%AD%E8%BF%8E%E6%9D%A5%E6%96%B0%E6%97%B6%E4%BB%A3/
8. TEA Global Experience Index 2024 official release - https://www.teaconnect.org/news/official-release-2024-tea-global-experience-indextm
9. China Daily: ticket scalping / flexible reservation policy - https://www.chinadaily.com.cn/a/202408/16/WS66bf017ea3104e74fddba5ee.html
10. China government: tourism convenience / offline ticket counters / less PII - https://english.www.gov.cn/news/202403/29/content_WS6606c572c6d0868f4e8e5990.html
11. Hangzhou / West Lake digital scenic spot - https://www.ehangzhou.gov.cn/2024-11/28/c_291799.htm
12. ScienceDirect: Evaluation of smart scenic spot construction in China - https://www.sciencedirect.com/science/article/pii/S2773067023000250
13. accesso LoQueue - https://accesso.com/solutions/virtual-queuing/
14. Attractions.io Virtual Queuing - https://attractions.io/feature-library/virtual-queuing
15. Lineberty Theme Parks - https://en.lineberty.com/theme-parks
16. Disney World Virtual Queues - https://disneyworld.disney.go.com/guest-services/virtual-queue/
17. Остров Мечты tickets page - https://dreamisland.ru/tickets
18. Остров Мечты entertainments page - https://dreamisland.ru/entertainments
19. Остров Мечты outdoor park news - https://dreamisland.ru/news/ostrov-mechty-prezentuet-novyy-otkrytyy-park-na-200-tys-kvadratnykh-metrov-
20. Dream Queue GitHub repo - https://github.com/fedocc/dream-queue
