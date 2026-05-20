import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Blocks,
  CircleDollarSign,
  Clock3,
  Database,
  Gauge,
  Landmark,
  MapPinned,
  QrCode,
  Route,
  ShieldCheck,
  Ticket,
  Users,
} from "lucide-react";
import "./styles.css";

const simulation = {
  baselineWait: 82.0,
  optimizedWait: 72.3,
  stressWait: 162.99,
  baselineMaxQueue: 1549.5,
  optimizedMaxQueue: 967.25,
  stressMaxQueue: 1685.75,
  baselineVariance: 102106.98,
  optimizedVariance: 5432.35,
  paidSlots: 290,
  peakRevenue: 145000,
  riskOutputs: {
    noShows: 16,
    lateArrivals: 19,
    abandonedSlots: 7,
    downtimeSteps: 7,
    kioskBookings: 31,
    routingStrength: "0.3375",
  },
};

const assumptions = [
  ["no_show_rate", "5%"],
  ["late_arrival_rate", "8%"],
  ["route_compliance_rate", "75%"],
  ["ride_downtime_probability", "1%"],
  ["paid_capacity_cap", "10%"],
  ["kiosk_share", "12%"],
];

const provenanceLabels = [
  ["Source", "Public source or repo research artifact."],
  ["Assumption", "Model or pilot input before park data exists."],
  ["Model output", "Local simulation or financial model result."],
  ["Pilot hypothesis", "Claim to test in a 4-8 week pilot."],
];

const evidenceBlocks = [
  {
    label: "Source",
    title: "Genting / Alibaba",
    know: "Public materials describe VQ, itinerary planning, incentive recommendations, crowd analysis, ticket-linked QR validation, group booking, kiosks, availability limits, and late-window rules.",
    limit: "They do not disclose revenue uplift, wait-time reduction, model accuracy, no-show rate, recommendation compliance, or implementation cost.",
  },
  {
    label: "Source",
    title: "China smart tourism",
    know: "High-crowd leisure markets use reservations, real-time visitor-flow tools, offline counters, simplified procedures, reduced PII burden, and anti-scalper controls.",
    limit: "This does not prove Moscow demand or Dream Island economics. It informs access design and risk controls.",
  },
  {
    label: "Source",
    title: "Comparable vendors",
    know: "accesso, Attractions.io, Lineberty, and Disney show virtual queue, validation, group logic, dashboards, and operating rules are mature category patterns.",
    limit: "Vendor KPI claims are treated as vendor claims unless independently audited.",
  },
  {
    label: "Pilot hypothesis",
    title: "Dream Island scope",
    know: "Public facts support many attractions/shows and existing express/VIP priority products, which makes a focused priority-inventory discussion credible.",
    limit: "Real wait times, throughput, no-shows, paid conversion, and standby impact require baseline measurement.",
  },
];

const workflow = [
  {
    icon: <Ticket size={20} />,
    title: "Ticket / group",
    text: "Bind a slot to a valid ticket or linked group entitlement.",
  },
  {
    icon: <Clock3 size={20} />,
    title: "VQ slot",
    text: "Offer limited return windows only where capacity and fairness rules allow it.",
  },
  {
    icon: <Route size={20} />,
    title: "Freed waiting time",
    text: "Move part of the wait from a physical line into a managed time window.",
  },
  {
    icon: <MapPinned size={20} />,
    title: "Route / incentive",
    text: "Guide guests toward lower-pressure zones, shows, food, or retail while they wait.",
  },
  {
    icon: <QrCode size={20} />,
    title: "QR validation",
    text: "Validate the right ticket, group, return window, and exception at the gate.",
  },
  {
    icon: <Gauge size={20} />,
    title: "Operator dashboard",
    text: "Show slot inventory, heat, downtime, late arrivals, and staff override needs.",
  },
];

const riskControls = [
  ["Late arrivals", "Return window, reminders, expiry, grace period, staff override SOP.", "Source + assumption"],
  ["No-shows", "Auto-release and conservative overbooking cap around measured utilization.", "Assumption"],
  ["QR sharing / fraud", "Ticket binding, one-time or dynamic QR, group-size validation.", "Source + assumption"],
  ["Scalpers / hoarding", "Non-transferable slots, account limits, rate limits, anomaly logs.", "Source + assumption"],
  ["App exclusion", "App/web plus kiosk, staff mode, printed QR, and standby path.", "Source"],
  ["Ride downtime", "Pause slots, reassign windows, alternatives, compensation workflow.", "Assumption"],
  ["Fairness / standby impact", "Paid capacity cap and standby penalty threshold stay visible.", "Assumption"],
  ["Route non-compliance", "Track compliance, test incentives, avoid assuming all guests follow.", "Assumption"],
  ["Minimum PII", "Ticket ID hash, group size, timestamp, attraction ID; no biometrics.", "Source + assumption"],
  ["Staff override / SOP", "Rules for expired QR, wrong group, app error, accessibility, downtime.", "Assumption"],
];

const pilotPlan = [
  "4-8 week discovery pilot",
  "5-8 bottleneck attractions",
  "Peak windows first",
  "Baseline measurement before optimization claims",
  "Simple VQ slot inventory",
  "Governed paid priority cap only if park wants a monetization test",
  "QR validation and entrance SOP",
  "Operator dashboard and before/after analysis",
];

const dataRequest = [
  "Hourly attendance by day type",
  "Throughput, cycle time, seats, dispatch interval",
  "Wait-time logs or manual observations",
  "Downtime and temporary closure logs",
  "Existing express/VIP demand and constraints",
  "Aggregated F&B/retail proxy if shareable",
  "App, kiosk, ticketing, and QR feasibility",
  "Staff constraints at attraction entrances",
];

const mapNodes = [
  { id: "A1", label: "High wait", load: "hot", x: 17, y: 28 },
  { id: "B4", label: "Slot open", load: "watch", x: 60, y: 18 },
  { id: "C2", label: "Low load", load: "clear", x: 76, y: 66 },
  { id: "D7", label: "Risk", load: "hot", x: 32, y: 72 },
  { id: "K1", label: "Kiosk", load: "neutral", x: 47, y: 48 },
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
          <a href="#problem">Problem</a>
          <a href="#evidence">Evidence</a>
          <a href="#model">Model</a>
          <a href="#pilot">Pilot</a>
        </nav>
        <a className="navCta" href="#data">
          Data request
          <ArrowRight size={16} />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="heroGrid">
          <div className="heroCopy">
            <div className="eyebrow">
              <Landmark size={16} />
              Research MVP / indoor theme park pilot
            </div>
            <h1>Manage guest time without pretending queues disappear.</h1>
            <p>
              Dream Queue AI is a lightweight operations layer for virtual queue slots,
              wait prediction, guest routing, risk controls, and limited governed priority
              inventory. For Dream Island, it is a focused pilot proposal, not a proven
              production product.
            </p>
            <div className="heroProof">
              <EvidenceBadge label="Pilot hypothesis" />
              <span>4-8 weeks, 5-8 bottleneck attractions, peak windows, baseline first.</span>
            </div>
            <div className="heroActions">
              <a className="primaryButton" href="#pilot">
                Review pilot scope
                <ArrowRight size={17} />
              </a>
              <a className="secondaryButton" href="#evidence">Open evidence map</a>
            </div>
          </div>

          <div className="commandSurface" aria-label="Operator control room visual">
            <div className="surfaceHeader">
              <div>
                <span>Control room / peak window</span>
                <strong>Map-first guest flow</strong>
              </div>
              <EvidenceBadge label="Model output" />
            </div>
            <IndoorParkMap />
            <div className="alertRail">
              <OperatorAlert tone="risk" title="Standby protection" text="Paid cap holds at 10%; stress scenario can break benefits." />
              <OperatorAlert tone="open" title="Hybrid access" text="31 kiosk bookings in base model output; app-only is avoided." />
            </div>
            <div className="surfaceMetrics">
              <Metric icon={<Clock3 size={17} />} label="Avg wait scenario" value={`${simulation.optimizedWait} min`} />
              <Metric icon={<Users size={17} />} label="Fast slots sold" value={simulation.paidSlots.toString()} />
              <Metric icon={<CircleDollarSign size={17} />} label="Peak slot revenue" value={`${formatRub(simulation.peakRevenue)} RUB`} />
            </div>
          </div>
        </div>
        <div className="heroStrip">
          <span><b>VQ</b> controlled return windows</span>
          <span><b>ETA</b> scenario wait prediction</span>
          <span><b>Route</b> guest flow nudges</span>
          <span><b>Slots</b> governed priority inventory</span>
          <span><b>Risk</b> provenance and SOP</span>
        </div>
      </section>

      <section className="section problemSection" id="problem">
        <SectionIntro
          kicker="01 / Problem"
          eyebrow="Queues are unmanaged guest time"
          title="Physical capacity is fixed. The operating lever is timing, routing, visibility, and slot governance."
        />
        <div className="problemGrid">
          <ProblemCard icon={<Blocks size={22} />} title="Capacity is not created by software" text="Dream Queue does not increase ride seats, dispatches, or physical throughput. It makes scarce access windows explicit and controllable." />
          <ProblemCard icon={<Clock3 size={22} />} title="Waiting time can be organized" text="A guest can stand in a line, hold a return window, follow a route, or receive a fallback. The pilot measures which pattern works." />
          <ProblemCard icon={<ShieldCheck size={22} />} title="Fairness is an operating constraint" text="Paid priority inventory needs caps, standby thresholds, exception handling, and public language that avoids false promises." />
        </div>
      </section>

      <section className="section evidenceSection" id="evidence">
        <SectionIntro
          kicker="02 / Evidence map"
          eyebrow="Category evidence, not economics proof"
          title="The pitch separates public evidence, assumptions, model outputs, and pilot hypotheses."
        />
        <div className="provenanceLegend" aria-label="Provenance labels">
          {provenanceLabels.map(([label, text]) => (
            <div key={label}>
              <span className="provenanceChip">{label}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="evidenceMapGrid">
          {evidenceBlocks.map((item) => (
            <article className="evidenceMapCard" key={item.title}>
              <EvidenceBadge label={item.label} />
              <h3>{item.title}</h3>
              <dl>
                <div><dt>What it supports</dt><dd>{item.know}</dd></div>
                <div><dt>What it does not prove</dt><dd>{item.limit}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="section workSection" id="works">
        <SectionIntro
          kicker="03 / How it works"
          eyebrow="A controlled queue operating loop"
          title="Dream Queue turns access into slot inventory, route guidance, validation, and operator action."
        />
        <div className="workflowGrid">
          {workflow.map((step, index) => (
            <article className="workflowStep" key={step.title}>
              <div className="stepIndex">{String(index + 1).padStart(2, "0")}</div>
              <div className="stepIcon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section modelSection" id="model">
        <SectionIntro
          kicker="04 / Simulation"
          eyebrow="Risk-aware scenario output"
          title="The model shows how benefits can appear under base assumptions and break under bad operating assumptions."
        />
        <div className="modelNotice">
          <AlertTriangle size={18} />
          <p>
            <span className="provenanceChip inline">Model output</span>
            These are local simulation outputs from configured assumptions, not measured Dream
            Island performance. Stress output is intentionally visible because VQ/routing is fragile
            when downtime, no-shows, late arrivals, and compliance assumptions go bad.
          </p>
        </div>
        <div className="simulationGrid">
          <KpiCard label="Average wait" before={`${simulation.baselineWait} min`} after={`${simulation.optimizedWait} min`} stress={`${simulation.stressWait} min`} />
          <KpiCard label="Max queue length" before={simulation.baselineMaxQueue.toString()} after={simulation.optimizedMaxQueue.toString()} stress={simulation.stressMaxQueue.toString()} />
          <KpiCard label="Queue variance" before={simulation.baselineVariance.toLocaleString("ru-RU")} after={simulation.optimizedVariance.toLocaleString("ru-RU")} stress="7,933.63" />
        </div>
        <div className="chartsGrid">
          <WaitModelChart />
          <RiskOutputPanel />
        </div>
        <div className="assumptionGrid">
          {assumptions.map(([name, value]) => (
            <div className="assumptionPill" key={name}>
              <span>{name}</span>
              <strong>{value}</strong>
              <em>Assumption</em>
            </div>
          ))}
        </div>
      </section>

      <section className="section riskSection" id="risk">
        <SectionIntro
          kicker="05 / Risk controls"
          eyebrow="Risk realism stays visible"
          title="Virtual queue is controlled scarcity plus staff enforcement, not a magic queue-removal layer."
        />
        <div className="riskGrid">
          {riskControls.map(([risk, control, label]) => (
            <article className="riskCard" key={risk}>
              <div>
                <AlertTriangle size={17} />
                <EvidenceBadge label={label} />
              </div>
              <h3>{risk}</h3>
              <p>{control}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section pilotSection" id="pilot">
        <div className="pilotCopy">
          <span className="sectionLabel">06 / Pilot proposal</span>
          <h2>Start with a narrow discovery pilot, not a platform replacement.</h2>
          <p>
            The next credible step is a measured pilot around bottleneck attractions and peak
            windows. Baseline observations come before claims; paid priority is optional and capped
            only if the park wants to test monetization.
          </p>
          <div className="pilotBadges">
            <EvidenceBadge label="Pilot hypothesis" />
            <EvidenceBadge label="Assumption-led setup" />
          </div>
        </div>
        <div className="pilotChecklist">
          {pilotPlan.map((step) => (
            <div key={step}>
              <ShieldCheck size={18} />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section dataSection" id="data">
        <SectionIntro
          kicker="07 / Data request"
          eyebrow="Discovery with real park data"
          title="The CTA is not to buy a product. It is to run a controlled discovery/pilot with measured inputs."
        />
        <div className="dataLayout">
          <div className="dataRequestGrid">
            {dataRequest.map((item) => (
              <div className="dataRequestItem" key={item}>
                <Database size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <aside className="ctaPanel">
            <EvidenceBadge label="Next step" />
            <h3>Run discovery with real park data.</h3>
            <p>
              Validate demand shape, throughput, wait observations, downtime, current priority
              constraints, and staff SOP before making optimization or commercial claims.
            </p>
            <a className="primaryButton" href="mailto:hello@dreamqueue.ai?subject=Dream%20Queue%20AI%20discovery%20pilot">
              Request pilot data checklist
              <ArrowRight size={17} />
            </a>
          </aside>
        </div>
      </section>

      <footer className="footer">
        <span>Dream Queue AI</span>
        <span>Research MVP and pilot proposal. Scenario outputs are not measured Dream Island data.</span>
      </footer>
    </main>
  );
}

function IndoorParkMap() {
  return (
    <div className="parkFlowMap" aria-hidden="true">
      <svg viewBox="0 0 620 340" role="img" aria-label="Abstract indoor park map with routes and queue heat">
        <defs>
          <linearGradient id="routeGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#51b9c3" stopOpacity="0.15" />
            <stop offset="52%" stopColor="#51b9c3" />
            <stop offset="100%" stopColor="#88d8b0" />
          </linearGradient>
          <filter id="routeGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path className="mapHall" d="M68 80 C142 28 275 34 365 68 C485 113 531 210 474 275 C417 339 253 317 155 268 C63 222 17 130 68 80Z" />
        <path className="mapHall inner" d="M173 111 C231 78 345 86 405 129 C463 171 460 240 399 268 C337 296 219 270 171 224 C127 181 124 139 173 111Z" />
        <path className="mapRoute primary" d="M106 95 C167 147 228 181 293 177 C367 174 424 145 504 199" />
        <path className="mapRoute secondary" d="M198 257 C247 206 311 164 391 124" />
        <path className="mapRoute warning" d="M111 225 C181 214 234 226 300 270" />
      </svg>
      {mapNodes.map((node) => (
        <div
          className={`mapNode ${node.load}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          key={node.id}
        >
          <strong>{node.id}</strong>
          <span>{node.label}</span>
        </div>
      ))}
      <div className="slotTray">
        <span>VQ slot inventory</span>
        <i />
        <i />
        <i className="limited" />
        <i className="closed" />
      </div>
      <div className="mapLegend">
        <span><i className="hot" /> queue heat</span>
        <span><i className="clear" /> route target</span>
        <span><i className="watch" /> limited slots</span>
      </div>
    </div>
  );
}

function SectionIntro({ kicker, eyebrow, title }: { kicker: string; eyebrow: string; title: string }) {
  return (
    <div className="sectionIntro">
      <div className="sectionMeta">
        <span className="sectionLabel">{kicker}</span>
        <p>{eyebrow}</p>
      </div>
      <h2>{title}</h2>
    </div>
  );
}

function EvidenceBadge({ label }: { label: string }) {
  return <span className="evidenceBadge">{label}</span>;
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

function OperatorAlert({ tone, title, text }: { tone: "risk" | "open"; title: string; text: string }) {
  return (
    <div className={`operatorAlert ${tone}`}>
      {tone === "risk" ? <AlertTriangle size={17} /> : <BadgeCheck size={17} />}
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

function ProblemCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <article className="problemCard">
      <div className="cardIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function KpiCard({ label, before, after, stress }: { label: string; before: string; after: string; stress: string }) {
  return (
    <article className="kpiCard">
      <div className="kpiHeader">
        <BarChart3 size={18} />
        <span>{label}</span>
      </div>
      <div className="kpiColumns">
        <div><span>Baseline</span><strong>{before}</strong></div>
        <div><span>Base VQ</span><strong>{after}</strong></div>
        <div><span>Risk stress</span><strong>{stress}</strong></div>
      </div>
      <EvidenceBadge label="Model output" />
    </article>
  );
}

function WaitModelChart() {
  const max = 170;
  const rows = [
    ["Baseline", simulation.baselineWait, "danger"],
    ["Base VQ", simulation.optimizedWait, "success"],
    ["Risk stress", simulation.stressWait, "warning"],
  ] as const;

  return (
    <section className="dashboardCard">
      <div className="dashboardCardHeader">
        <h3>Average wait scenario</h3>
        <span>minutes, configured model output</span>
      </div>
      <div className="barComparison">
        {rows.map(([label, value, tone]) => (
          <div className="chartBarRow" key={label}>
            <div>
              <span>{label}</span>
              <strong>{value.toLocaleString("ru-RU")} min</strong>
            </div>
            <div className="chartBarTrack">
              <i className={tone} style={{ width: `${(value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RiskOutputPanel() {
  const outputs = [
    ["Paid no-shows", simulation.riskOutputs.noShows],
    ["Late arrivals", simulation.riskOutputs.lateArrivals],
    ["Abandoned slots", simulation.riskOutputs.abandonedSlots],
    ["Downtime steps", simulation.riskOutputs.downtimeSteps],
    ["Kiosk bookings", simulation.riskOutputs.kioskBookings],
    ["Routing strength", simulation.riskOutputs.routingStrength],
  ];

  return (
    <section className="dashboardCard">
      <div className="dashboardCardHeader">
        <h3>Risk outputs in base scenario</h3>
        <span>risk realism layer remains visible</span>
      </div>
      <div className="riskOutputList">
        {outputs.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
