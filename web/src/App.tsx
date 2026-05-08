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
  priceShare: "21.6%",
  fastpassShare: "5.5%",
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
    parkUplift: "30.3 млн ₽",
  },
  {
    name: "Base",
    label: "Базовый",
    price: "500 ₽",
    conversion: "5%",
    slots: 469,
    revenue: "21.1 млн ₽",
    parkUplift: "63.3 млн ₽",
  },
  {
    name: "Aggressive",
    label: "Агрессивный",
    price: "700 ₽",
    conversion: "10%",
    slots: 840,
    revenue: "52.9 млн ₽",
    parkUplift: "109.8 млн ₽",
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
  "wait-time и throughput данные",
  "дашборд + симуляция + финмодель",
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
            <h1>Очереди стоят парку денег.</h1>
            <p>
              Dream Queue AI показывает, где гости теряют время, как перераспределить спрос между
              аттракционами и сколько может дать ограниченный инвентарь быстрых слотов без замены
              существующей инфраструктуры.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#simulation">
                Смотреть модель
                <ArrowRight size={17} />
              </a>
              <a className="secondaryButton" href="#evidence">Открыть evidence</a>
            </div>
          </div>

          <div className="commandSurface" aria-label="Превью дашборда оператора">
            <div className="surfaceHeader">
              <div>
                <span>Пиковый день</span>
                <strong>Прогноз нагрузки очередей</strong>
              </div>
              <div className="liveBadge">Модель</div>
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
          <span>Платные быстрые слоты</span>
          <span>Дашборд оператора</span>
        </div>
      </section>

      <section className="section evidenceSection" id="evidence">
        <div className="sectionIntro">
          <div className="sectionMeta">
            <span className="sectionLabel">01 / Данные</span>
            <p>
              Мы расширили seed-выборку до 328 публичных review-evidence строк. Это не репрезентативный
              опрос всех гостей, но уже достаточный сигнал для pitch.
            </p>
          </div>
          <h2>Отзывы стали не финальным доказательством, а картой болей.</h2>
        </div>
        <div className="evidenceGrid">
          <EvidenceStat value={reviewMetrics.total.toString()} label="строк отзывов в выборке" />
          <EvidenceStat value={reviewMetrics.queueShare} label="упоминают очереди или ожидание" />
          <EvidenceStat value={reviewMetrics.priceShare} label="связаны с ценой, билетом или доплатой" />
          <EvidenceStat value={reviewMetrics.fastpassShare} label="упоминают экспресс-доступ" />
        </div>
        <div className="quoteBand">
          <div>
            <Sparkles size={19} />
            <strong>Продуктовый вывод</strong>
          </div>
          <p>
            Начинать пилот нужно с выбранных bottleneck-аттракционов и peak windows, где ожидание
            бьет по perceived value билета и создает пространство для free virtual queue + limited paid slots.
          </p>
        </div>
      </section>

      <section className="section benchmarkSection">
        <div className="benchmarkPanel">
          <span className="sectionLabel">02 / Доказательство категории</span>
          <h2>Genting SkyWorlds + Alibaba Cloud уже доказали категорию.</h2>
          <p>
            Их публичный кейс описывает virtual queue, планирование маршрута, прогноз crowding
            и стимулы для перераспределения гостей между аттракционами, едой и retail. Для «Острова Мечты»
            мы предлагаем не enterprise rebuild, а легкий pilot layer поверх текущей инфраструктуры.
          </p>
        </div>
        <div className="benchmarkChecks">
          <CheckItem icon={<Route size={18} />} text="Маршруты и слоты вместо хаотичного ожидания" />
          <CheckItem icon={<Gauge size={18} />} text="Оператор видит bottlenecks до пика" />
          <CheckItem icon={<CircleDollarSign size={18} />} text="Priority inventory становится управляемой выручкой" />
        </div>
      </section>

      <section className="section simulationSection" id="simulation">
        <div className="sectionIntro">
          <div className="sectionMeta">
            <span className="sectionLabel">03 / Симуляция</span>
            <p>
              Сценарная модель на assumptions, а не измеренные данные парка. Показывает механику:
              спрос перераспределяется, а быстрые слоты ограничены capacity.
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
            <span className="sectionLabel">04 / Экономика</span>
            <p>
              Финмодель запускает normal и peak day симуляции. Если очереди нет, спрос на платное
              ускорение честно падает до нуля.
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
                <div><dt>Uplift парка</dt><dd>{scenario.parkUplift}</dd></div>
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
            <span className="sectionLabel">05 / Продукт</span>
            <p>Пилотный слой поверх текущей инфраструктуры: сначала аналитика и дашборд, потом интеграция.</p>
          </div>
          <h2>Что именно получает парк.</h2>
        </div>
        <div className="productGrid">
          <ProductTile icon={<Database size={20} />} title="Карта bottlenecks" text="Аттракционы и временные окна, где ожидание сильнее всего портит perceived value." />
          <ProductTile icon={<Route size={20} />} title="Маршрутизация гостей" text="Рекомендации маршрута и бесплатные виртуальные слоты, чтобы гость не стоял физически весь визит." />
          <ProductTile icon={<Gauge size={20} />} title="Дашборд оператора" text="Прогноз загрузки, перекос очередей, инвентарь слотов и действия для операционной команды." />
          <ProductTile icon={<TrendingUp size={20} />} title="Модель выручки" text="Ограниченные платные быстрые слоты с capacity guardrails и прозрачным revenue share." />
        </div>
      </section>

      <section className="section pilotSection" id="pilot">
        <div className="pilotCopy">
          <span className="sectionLabel">06 / Пилот</span>
          <h2>Легкий пилот без замены билетной системы.</h2>
          <p>
            Мы приходим не с готовой истиной про парк, а с проверяемой гипотезой, benchmark аналогом
            и работающим пайплайном. Для точности нужны реальные wait-time, attendance и throughput данные.
          </p>
          <a className="primaryButton" href="mailto:hello@dreamqueue.ai?subject=Dream%20Queue%20AI%20pilot">
            Запросить pilot brief
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
        <span>Research MVP. All outputs are scenario-based until verified with park operations data.</span>
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
    <DashboardCard title="Индекс качества визита" note="условная proxy-оценка">
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
