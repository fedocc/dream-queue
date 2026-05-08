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
    price: "300 ₽",
    conversion: "2%",
    slots: 189,
    revenue: "5.1 млн ₽",
    parkUplift: "30.3 млн ₽",
  },
  {
    name: "Base",
    price: "500 ₽",
    conversion: "5%",
    slots: 469,
    revenue: "21.1 млн ₽",
    parkUplift: "63.3 млн ₽",
  },
  {
    name: "Aggressive",
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
  "dashboard + simulation + revenue model",
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
          <a href="#evidence">Evidence</a>
          <a href="#simulation">Simulation</a>
          <a href="#revenue">Revenue</a>
          <a href="#pilot">Pilot</a>
        </nav>
        <a className="navCta" href="#pilot">
          Pilot brief
          <ArrowRight size={16} />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="heroGrid">
          <div className="heroCopy">
            <div className="eyebrow">
              <Landmark size={16} />
              Case study: Остров Мечты, Москва
            </div>
            <h1>Очереди стоят парку денег.</h1>
            <p>
              Dream Queue AI показывает, где гости теряют время, как перераспределить demand между
              аттракционами и сколько может дать ограниченный fast-slot inventory без замены
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

          <div className="commandSurface" aria-label="Operator dashboard preview">
            <div className="surfaceHeader">
              <div>
                <span>Peak-day control room</span>
                <strong>Queue load forecast</strong>
              </div>
              <div className="liveBadge">Model run</div>
            </div>
            <div className="surfaceMetrics">
              <Metric icon={<Clock3 size={17} />} label="Avg wait" value={`${simulation.optimizedWait} мин`} />
              <Metric icon={<Users size={17} />} label="Fast slots" value={simulation.paidSlots.toString()} />
              <Metric icon={<CircleDollarSign size={17} />} label="Peak revenue" value={`${formatRub(simulation.peakRevenue)} ₽`} />
            </div>
            <div className="loadStack">
              {queueLoads.map(([name, before, after]) => (
                <LoadPair key={name} name={String(name)} before={Number(before)} after={Number(after)} />
              ))}
            </div>
          </div>
        </div>
        <div className="heroStrip">
          <span>Virtual queue</span>
          <span>Wait-time forecast</span>
          <span>Guest routing</span>
          <span>Paid fast slots</span>
          <span>Operator dashboard</span>
        </div>
      </section>

      <section className="section evidenceSection" id="evidence">
        <div className="sectionIntro">
          <span className="sectionLabel">01 / Evidence</span>
          <h2>Отзывы стали не финальным доказательством, а картой болей.</h2>
          <p>
            Мы расширили seed dataset до 328 публичных review-evidence строк. Это не репрезентативный
            опрос всех гостей, но уже достаточный signal для pitch: очередь, цена и экспресс регулярно
            появляются в одном пользовательском контексте.
          </p>
        </div>
        <div className="evidenceGrid">
          <EvidenceStat value={reviewMetrics.total.toString()} label="review-evidence строк" />
          <EvidenceStat value={reviewMetrics.queueShare} label="упоминают очереди или ожидание" />
          <EvidenceStat value={reviewMetrics.priceShare} label="связаны с ценой, билетом или доплатой" />
          <EvidenceStat value={reviewMetrics.fastpassShare} label="упоминают экспресс / fastpass" />
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
          <span className="sectionLabel">02 / Category proof</span>
          <h2>Genting SkyWorlds + Alibaba Cloud уже доказали категорию.</h2>
          <p>
            Их публичный кейс описывает AI-powered Virtual Queue, itinerary planning, crowd prediction
            и incentives для перераспределения гостей в rides, eateries и retail. Для «Острова Мечты»
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
          <span className="sectionLabel">03 / Simulation</span>
          <h2>Peak-day модель: меньше худшая очередь, ниже перекос нагрузки.</h2>
          <p>
            Это scenario model на assumptions, а не измеренные данные парка. Она нужна, чтобы показать
            механику: спрос перераспределяется, fast slots ограничены capacity, платные слоты появляются
            только при заметном ожидании.
          </p>
        </div>
        <div className="simulationGrid">
          <ComparisonCard
            icon={<Clock3 size={18} />}
            label="Avg wait"
            before={`${simulation.baselineWait} мин`}
            after={`${simulation.optimizedWait} мин`}
          />
          <ComparisonCard
            icon={<BarChart3 size={18} />}
            label="Max queue"
            before={simulation.baselineMaxQueue.toString()}
            after={simulation.optimizedMaxQueue.toString()}
          />
          <ComparisonCard
            icon={<LineChart size={18} />}
            label="Queue variance"
            before="102 107"
            after="10 485"
          />
        </div>
        <div className="chartsGrid">
          <ChartFrame title="Wait time before / after" src="/charts/before_after_wait_time.png" compact />
          <ChartFrame title="Queue load by attraction" src="/charts/queue_load_by_attraction.png" />
        </div>
      </section>

      <section className="section revenueSection" id="revenue">
        <div className="sectionIntro">
          <span className="sectionLabel">04 / Revenue model</span>
          <h2>Деньги считаются из проданных слотов, а не из красивой константы.</h2>
          <p>
            Финмодель запускает normal и peak day симуляции. На normal day fast-slot revenue может быть нулевой:
            если очереди нет, нет и честного спроса на ускорение. В base-сценарии annual fast-slot revenue
            оценивается в 21.1 млн ₽.
          </p>
        </div>
        <div className="scenarioGrid">
          {scenarios.map((scenario) => (
            <article className={scenario.name === "Base" ? "scenarioCard featured" : "scenarioCard"} key={scenario.name}>
              <span>{scenario.name}</span>
              <strong>{scenario.revenue}</strong>
              <dl>
                <div><dt>Slot price</dt><dd>{scenario.price}</dd></div>
                <div><dt>Conversion</dt><dd>{scenario.conversion}</dd></div>
                <div><dt>Peak slots</dt><dd>{scenario.slots}</dd></div>
                <div><dt>Park uplift</dt><dd>{scenario.parkUplift}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <div className="chartsGrid revenueCharts">
          <ChartFrame title="Annual fast-slot revenue" src="/charts/revenue_scenarios.png" />
          <ChartFrame title="Visitor satisfaction proxy" src="/charts/visitor_satisfaction.png" />
        </div>
      </section>

      <section className="section productSection">
        <div className="sectionIntro">
          <span className="sectionLabel">05 / Product layer</span>
          <h2>Что именно получает парк.</h2>
        </div>
        <div className="productGrid">
          <ProductTile icon={<Database size={20} />} title="Bottleneck map" text="Аттракционы и временные окна, где ожидание сильнее всего портит perceived value." />
          <ProductTile icon={<Route size={20} />} title="Guest routing" text="Рекомендации маршрута и free virtual slots, чтобы гость не стоял физически весь визит." />
          <ProductTile icon={<Gauge size={20} />} title="Operator dashboard" text="Load forecast, queue variance, slot inventory и действия для операционной команды." />
          <ProductTile icon={<TrendingUp size={20} />} title="Revenue model" text="Ограниченные paid fast slots с capacity guardrails и прозрачным revenue share." />
        </div>
      </section>

      <section className="section pilotSection" id="pilot">
        <div className="pilotCopy">
          <span className="sectionLabel">06 / Pilot ask</span>
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

function ComparisonCard({ icon, label, before, after }: { icon: React.ReactNode; label: string; before: string; after: string }) {
  return (
    <article className="comparisonCard">
      <div>
        {icon}
        <span>{label}</span>
      </div>
      <strong>{before}</strong>
      <ArrowRight size={18} />
      <strong>{after}</strong>
    </article>
  );
}

function ChartFrame({ title, src, compact = false }: { title: string; src: string; compact?: boolean }) {
  return (
    <figure className={compact ? "chartFrame compact" : "chartFrame"}>
      <figcaption>{title}</figcaption>
      <img src={src} alt={title} />
    </figure>
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
