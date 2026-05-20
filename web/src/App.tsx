import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  Clock3,
  Database,
  Gauge,
  Landmark,
  LineChart,
  SearchCheck,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import "./styles.css";

const reviewMetrics = {
  total: 328,
  queueShare: "29.3%",
  queueNegativeShare: "31.2%",
  priceShare: "21.6%",
  fastpassShare: "5.5%",
};

const disneylandBenchmark = {
  total: "42 656",
  queueShare: "52.1%",
  queueNegativeShare: "33.3%",
};

const simulation = {
  baselineWait: 82.0,
  optimizedWait: 74.18,
  baselineMaxQueue: 1549.5,
  optimizedMaxQueue: 1066.0,
  baselineVariance: 102106.98,
  optimizedVariance: 10484.87,
  paidSlots: 469,
  peakRevenue: 234500,
};

const scenarios = [
  {
    name: "Conservative",
    label: "Консервативный",
    price: "300 ₽",
    conversion: "2%",
    slots: 189,
    revenue: "5.1 млн ₽",
    parkUplift: "18.5 млн ₽",
  },
  {
    name: "Base",
    label: "Базовый",
    price: "500 ₽",
    conversion: "5%",
    slots: 469,
    revenue: "21.1 млн ₽",
    parkUplift: "42.7 млн ₽",
  },
  {
    name: "Aggressive",
    label: "Агрессивный",
    price: "700 ₽",
    conversion: "10%",
    slots: 840,
    revenue: "52.9 млн ₽",
    parkUplift: "80.4 млн ₽",
  },
];

const queueLoads = [
  ["Мельница", 395, 283],
  ["Молот судьбы", 374, 284],
  ["Бешеный танец", 413, 282],
  ["Лава", 75, 118],
  ["Лагуна", 69, 128],
];

const pilotSteps = [
  "4-8 недель",
  "5-8 выбранных аттракционов",
  "данные по ожиданию и пропускной способности",
  "дашборд + симуляция + финмодель",
];

const dataSources = [
  {
    title: "Отзывы",
    value: "328",
    label: "Source",
    text: "локально сохраненных строк review-evidence по «Острову Мечты»",
  },
  {
    title: "Публичные факты",
    value: "8",
    label: "Source",
    text: "официальных страниц и публичных описаний",
  },
  {
    title: "Внешний ориентир",
    value: "42 656",
    label: "Source",
    text: "отзывов Disneyland Reviews для проверки методики",
  },
  {
    title: "Расчеты модели",
    value: "3",
    label: "Model output",
    text: "сценария экономики: conservative, base, aggressive",
  },
];

const provenanceLabels = [
  ["Source", "подтверждено публичным источником или repo artifact"],
  ["Assumption", "вход модели или пилота до данных парка"],
  ["Model output", "результат локальной симуляции или финмодели"],
  ["Pilot hypothesis", "тезис для проверки в 4-8 недель пилота"],
];

const evidenceMap = [
  {
    title: "Genting / Alibaba",
    proves: "VQ + itinerary + incentives + crowd prediction is a real operating pattern.",
    limit: "Не раскрывает revenue uplift, wait reduction, accuracy, no-show rate or implementation cost.",
  },
  {
    title: "China market lesson",
    proves: "Reservations need hybrid access, offline fallback, anti-scalper controls and lower PII burden.",
    limit: "Не доказывает московский спрос или экономику Dream Island.",
  },
  {
    title: "Similar vendors",
    proves: "accesso, Attractions.io and Lineberty show mature VQ, validation, dashboard and group-control patterns.",
    limit: "Vendor KPI claims are not independent audited facts.",
  },
  {
    title: "Dream Island fit",
    proves: "Public facts support many attractions/shows and existing express/VIP priority products.",
    limit: "Не знаем real wait times, no-shows, throughput, conversion or standby impact without park data.",
  },
];

function formatRub(value: number) {
  return value.toLocaleString("ru-RU");
}

function App() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Dream Queue AI">
          <span className="brandMark">DQ</span>
          <span>Dream Queue AI</span>
        </a>
        <nav className="topnav" aria-label="Primary navigation">
          <a href="#evidence">Данные</a>
          <a href="#simulation">Модель</a>
          <a href="#revenue">Экономика</a>
          <a href="#pilot">Пилот</a>
        </nav>
        <a className="navCta" href="#pilot">
          Пилот
          <ArrowRight size={16} />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="heroGrid">
          <div className="heroCopy">
            <div className="eyebrow">
              <Landmark size={16} />
              Кейс: Остров Мечты, Москва
            </div>
            <h1>Пилотный слой управления временем гостя.</h1>
            <p>
              Research MVP для indoor theme parks: virtual queue slots, wait prediction,
              guest routing, risk controls и ограниченный priority inventory. Для «Острова Мечты»
              это предложение пилота, а не доказанный production product.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#simulation">
                Смотреть модель
                <ArrowRight size={17} />
              </a>
              <a className="secondaryButton" href="#evidence">Открыть данные</a>
            </div>
          </div>

          <div className="commandSurface" aria-label="Превью дашборда оператора">
            <div className="surfaceHeader">
              <div>
                <span>Пиковый день</span>
                <strong>Сценарий нагрузки очередей</strong>
              </div>
              <div className="liveBadge">Model output</div>
            </div>
            <div className="surfaceMetrics">
              <Metric icon={<Clock3 size={17} />} label="Ожидание" value={`${simulation.optimizedWait} мин`} />
              <Metric icon={<Users size={17} />} label="Быстрые слоты" value={simulation.paidSlots.toString()} />
              <Metric icon={<CircleDollarSign size={17} />} label="Выручка" value={`${formatRub(simulation.peakRevenue)} ₽`} />
            </div>
            <div className="loadStack">
              {queueLoads.map(([name, before, after]) => (
                <LoadPair key={name} name={String(name)} before={Number(before)} after={Number(after)} />
              ))}
            </div>
          </div>
        </div>
        <div className="heroStrip">
          <span>Виртуальная очередь</span>
          <span>Прогноз ожидания</span>
          <span>Маршруты гостей</span>
          <span>Risk controls</span>
          <span>Provenance labels</span>
        </div>
      </section>

      <section className="section evidenceSection" id="evidence">
        <div className="sectionIntro">
          <div className="sectionMeta">
            <span className="sectionLabel">01 / Данные</span>
            <p>
              Мы разделили исходные отзывы, публичные факты, допущения и расчетные результаты,
              чтобы каждая метрика имела понятное происхождение.
            </p>
          </div>
          <h2>Сначала показываем provenance, потом выводы.</h2>
        </div>
        <div className="sourceGrid">
          {dataSources.map((source) => (
            <article className="sourceCard" key={source.title}>
              <span>{source.title}</span>
              <strong>{source.value}</strong>
              <em>{source.label}</em>
              <p>{source.text}</p>
            </article>
          ))}
        </div>
        <div className="provenanceLegend" aria-label="Provenance labels">
          {provenanceLabels.map(([label, text]) => (
            <div key={label}>
              <span className="provenanceChip">{label}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="methodNote">
          <SearchCheck size={18} />
          <p>
            Локальные отзывы показывают ранние сигналы по «Острову Мечты». Датасет Disneyland
            не заменяет эти данные, а проверяет ту же методику на большой открытой выборке парков.
          </p>
        </div>
        <div className="evidenceGrid">
          <EvidenceStat value={reviewMetrics.total.toString()} label="строк отзывов в выборке" />
          <EvidenceStat value={reviewMetrics.queueShare} label="упоминают очереди или ожидание" />
          <EvidenceStat value={reviewMetrics.queueNegativeShare} label="негатив среди отзывов про очереди" />
          <EvidenceStat value={reviewMetrics.priceShare} label="связаны с ценой, билетом или доплатой" />
        </div>
        <div className="quoteBand">
          <div>
            <Sparkles size={19} />
            <strong>Продуктовый вывод</strong>
          </div>
          <p>
            Начинать пилот нужно с выбранных bottleneck attractions и пиковых временных окон.
            Review-evidence дает ранний сигнал, а реальную силу проблемы должны подтвердить baseline
            observations, throughput data and staff constraints.
          </p>
        </div>
      </section>

      <section className="section benchmarkDataSection">
        <div className="sectionIntro compactIntro">
          <div className="sectionMeta">
            <span className="sectionLabel">02 / Внешний ориентир</span>
            <p>
              Внешний датасет нужен не как доказательство по Москве, а как проверка, что pipeline
              масштабируется на большую выборку из той же индустрии.
            </p>
          </div>
          <h2>Ту же методику прогнали на Disneyland Reviews.</h2>
        </div>
        <div className="benchmarkCompare">
          <BenchmarkColumn
            title="Остров Мечты"
            note="локальная выборка отзывов"
            total={reviewMetrics.total.toString()}
            queue={reviewMetrics.queueShare}
            negative={reviewMetrics.queueNegativeShare}
          />
          <BenchmarkColumn
            title="Disneyland"
            note="внешний открытый датасет"
            total={disneylandBenchmark.total}
            queue={disneylandBenchmark.queueShare}
            negative={disneylandBenchmark.queueNegativeShare}
          />
        </div>
      </section>

      <section className="section benchmarkSection">
        <div className="benchmarkPanel">
          <span className="sectionLabel">03 / Доказательство категории</span>
          <h2>Genting / Alibaba подтверждают категорию, не экономику Dream Queue.</h2>
          <p>
            Их публичный кейс описывает virtual queue, планирование маршрута, прогноз crowding
            и стимулы для перераспределения гостей. Он не раскрывает guaranteed revenue uplift,
            wait-time reduction, accuracy, no-show rate or implementation cost.
          </p>
        </div>
        <div className="benchmarkChecks">
          <CheckItem icon={<Route size={18} />} text="Ticket-linked VQ, QR validation, group logic and return windows are Source-backed patterns" />
          <CheckItem icon={<Gauge size={18} />} text="China lesson: hybrid reservations, kiosk/staff fallback, anti-scalper controls and minimum PII" />
          <CheckItem icon={<CircleDollarSign size={18} />} text="Priority inventory is a pilot hypothesis until capacity, conversion and standby impact are measured" />
        </div>
      </section>

      <section className="section evidenceMapSection">
        <div className="sectionIntro compactIntro">
          <div className="sectionMeta">
            <span className="sectionLabel">04 / Evidence map</span>
            <p>Что можно использовать в pitch и где заканчивается публичное evidence.</p>
          </div>
          <h2>What we know / what we do not know.</h2>
        </div>
        <div className="evidenceMapGrid">
          {evidenceMap.map((item) => (
            <article className="evidenceMapCard" key={item.title}>
              <h3>{item.title}</h3>
              <dl>
                <div><dt>What we know</dt><dd>{item.proves}</dd></div>
                <div><dt>What we do not know</dt><dd>{item.limit}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="section simulationSection" id="simulation">
        <div className="sectionIntro">
          <div className="sectionMeta">
            <span className="sectionLabel">05 / Симуляция</span>
            <p>
              <span className="provenanceChip inline">Model output</span> Сценарная модель на допущениях,
              а не измеренные данные парка. Показывает механику:
              спрос перераспределяется, а быстрые слоты ограничены пропускной способностью.
            </p>
          </div>
          <h2>Модель пикового дня: меньше худшая очередь, ниже перекос нагрузки.</h2>
        </div>
        <div className="simulationGrid">
          <KpiCard
            icon={<Clock3 size={18} />}
            label="Среднее ожидание"
            before={`${simulation.baselineWait} мин`}
            after={`${simulation.optimizedWait} мин`}
            delta="-7.8 мин"
          />
          <KpiCard
            icon={<BarChart3 size={18} />}
            label="Максимальная очередь"
            before={simulation.baselineMaxQueue.toString()}
            after={simulation.optimizedMaxQueue.toString()}
            delta="-31%"
          />
          <KpiCard
            icon={<LineChart size={18} />}
            label="Перекос нагрузки"
            before="102 107"
            after="10 485"
            delta="-90%"
          />
        </div>
        <div className="chartsGrid">
          <WaitChart />
          <QueueLoadChart />
        </div>
      </section>

      <section className="section revenueSection" id="revenue">
        <div className="sectionIntro">
          <div className="sectionMeta">
            <span className="sectionLabel">06 / Экономика</span>
            <p>
              <span className="provenanceChip inline">Model output</span> Финмодель сравнивает обычный и пиковый день
              under assumptions. Это не measured park revenue и не обещание uplift.
            </p>
          </div>
          <h2>Деньги считаются из проданных слотов, а не из красивой константы.</h2>
        </div>
        <div className="scenarioGrid">
          {scenarios.map((scenario) => (
            <article className={scenario.name === "Base" ? "scenarioCard featured" : "scenarioCard"} key={scenario.name}>
              <span>{scenario.label}</span>
              <strong>{scenario.revenue}</strong>
              <dl>
                <div><dt>Цена слота</dt><dd>{scenario.price}</dd></div>
                <div><dt>Конверсия</dt><dd>{scenario.conversion}</dd></div>
                <div><dt>Слоты в пик</dt><dd>{scenario.slots}</dd></div>
                <div><dt>Сценарный эффект</dt><dd>{scenario.parkUplift}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <div className="chartsGrid revenueCharts">
          <RevenueScenarioChart />
          <SatisfactionChart />
        </div>
      </section>

      <section className="section productSection">
        <div className="sectionIntro">
          <div className="sectionMeta">
            <span className="sectionLabel">07 / Продукт</span>
            <p>Пилотный слой поверх текущей инфраструктуры: сначала baseline, аналитика и дашборд, потом интеграция.</p>
          </div>
          <h2>Что именно получает парк.</h2>
        </div>
        <div className="productGrid">
          <ProductTile icon={<Database size={20} />} title="Карта узких мест" text="Аттракционы и временные окна, где ожидание сильнее всего снижает ощущаемую ценность визита." />
          <ProductTile icon={<Route size={20} />} title="Маршрутизация гостей" text="Рекомендации маршрута и бесплатные виртуальные слоты, чтобы часть ожидания переносилась из физической очереди в управляемое окно." />
          <ProductTile icon={<Gauge size={20} />} title="Дашборд оператора" text="Прогноз загрузки, перекос очередей, инвентарь слотов и действия для операционной команды." />
          <ProductTile icon={<TrendingUp size={20} />} title="Модель выручки" text="Сценарии paid priority и freed-time proxy считаются отдельно от Source evidence и требуют проверки на данных парка." />
        </div>
      </section>

      <section className="section pilotSection" id="pilot">
        <div className="pilotCopy">
          <span className="sectionLabel">08 / Пилот</span>
          <h2>Легкий пилот без замены билетной системы.</h2>
          <p>
            Мы приходим не с готовой истиной про парк, а с проверяемой гипотезой, внешним ориентиром
            и работающим пайплайном. Для точности нужны реальные данные по ожиданию, посещаемости
            и пропускной способности.
          </p>
          <a className="primaryButton" href="mailto:hello@dreamqueue.ai?subject=Dream%20Queue%20AI%20pilot">
            Запросить описание пилота
            <ArrowRight size={17} />
          </a>
        </div>
        <div className="pilotChecklist">
          {pilotSteps.map((step) => (
            <div key={step}>
              <ShieldCheck size={18} />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>Dream Queue AI</span>
        <span>Исследовательский MVP. Все расчетные эффекты остаются сценариями до проверки на операционных данных парка.</span>
      </footer>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="surfaceMetric">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function LoadPair({ name, before, after }: { name: string; before: number; after: number }) {
  const max = 420;
  return (
    <div className="loadPair">
      <div className="loadPairTop">
        <span>{name}</span>
        <b>{after} мин</b>
      </div>
      <div className="loadBars">
        <i className="before" style={{ width: `${(before / max) * 100}%` }} />
        <i className="after" style={{ width: `${(after / max) * 100}%` }} />
      </div>
    </div>
  );
}

function EvidenceStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="evidenceStat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function BenchmarkColumn({ title, note, total, queue, negative }: { title: string; note: string; total: string; queue: string; negative: string }) {
  return (
    <article className="benchmarkColumn">
      <div>
        <span>{note}</span>
        <h3>{title}</h3>
      </div>
      <dl>
        <div><dt>Отзывы</dt><dd>{total}</dd></div>
        <div><dt>Про очереди</dt><dd>{queue}</dd></div>
        <div><dt>Негатив среди отзывов про очереди</dt><dd>{negative}</dd></div>
      </dl>
    </article>
  );
}

function CheckItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="checkItem">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function KpiCard({ icon, label, before, after, delta }: { icon: React.ReactNode; label: string; before: string; after: string; delta: string }) {
  return (
    <article className="kpiCard">
      <div className="kpiHeader">
        {icon}
        <span>{label}</span>
      </div>
      <div className="kpiFlow">
        <div>
          <span>Было</span>
          <strong>{before}</strong>
        </div>
        <ArrowRight size={18} />
        <div>
          <span>Стало</span>
          <strong>{after}</strong>
        </div>
      </div>
      <div className="kpiDelta">{delta}</div>
    </article>
  );
}

function DashboardCard({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="dashboardCard">
      <div className="dashboardCardHeader">
        <h3>{title}</h3>
        {note ? <span>{note}</span> : null}
      </div>
      {children}
    </section>
  );
}

function WaitChart() {
  const max = 90;
  return (
    <DashboardCard title="Среднее ожидание" note="минуты, пиковый день">
      <div className="barComparison">
        <ChartBar label="Без продукта" value={simulation.baselineWait} max={max} tone="danger" suffix="мин" />
        <ChartBar label="С продуктом" value={simulation.optimizedWait} max={max} tone="success" suffix="мин" />
      </div>
    </DashboardCard>
  );
}

function QueueLoadChart() {
  const max = 420;
  return (
    <DashboardCard title="Загрузка по аттракционам" note="пиковое ожидание, минуты">
      <div className="queueChart">
        {queueLoads.map(([name, before, after]) => (
          <div className="queueChartRow" key={String(name)}>
            <span>{name}</span>
            <div className="queueChartBars">
              <i className="danger" style={{ width: `${(Number(before) / max) * 100}%` }} />
              <i className="success" style={{ width: `${(Number(after) / max) * 100}%` }} />
            </div>
            <b>{after} мин</b>
          </div>
        ))}
      </div>
      <div className="chartLegend">
        <span><i className="danger" /> без продукта</span>
        <span><i className="success" /> с продуктом</span>
      </div>
    </DashboardCard>
  );
}

function RevenueScenarioChart() {
  const values = [5.1, 21.1, 52.9];
  const max = 55;
  return (
    <DashboardCard title="Выручка от быстрых слотов" note="млн ₽ в год">
      <div className="verticalBars">
        {scenarios.map((scenario, index) => (
          <div className="verticalBarItem" key={scenario.name}>
            <div className="verticalBarTrack">
              <i style={{ height: `${(values[index] / max) * 100}%` }} />
            </div>
            <strong>{values[index]}</strong>
            <span>{scenario.label}</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

function SatisfactionChart() {
  return (
    <DashboardCard title="Индекс качества визита" note="условная оценка модели">
      <div className="scoreGaugeGrid">
        <ScoreGauge label="Без продукта" value={58.3} />
        <ScoreGauge label="С продуктом" value={61.1} highlight />
      </div>
    </DashboardCard>
  );
}

function ChartBar({ label, value, max, tone, suffix }: { label: string; value: number; max: number; tone: "danger" | "success"; suffix: string }) {
  return (
    <div className="chartBarRow">
      <div>
        <span>{label}</span>
        <strong>{value.toLocaleString("ru-RU")}{suffix}</strong>
      </div>
      <div className="chartBarTrack">
        <i className={tone} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}

function ScoreGauge({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={highlight ? "scoreGauge highlight" : "scoreGauge"}>
      <div className="scoreRing" style={{ background: `conic-gradient(#2b8058 ${value * 3.6}deg, #e2dccf 0deg)` }}>
        <span>{value}</span>
      </div>
      <strong>{label}</strong>
    </div>
  );
}

function ProductTile({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <article className="productTile">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
