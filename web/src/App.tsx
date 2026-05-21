import { createRoot } from "react-dom/client";
import "./styles.css";

const evidenceRows = [
  {
    signal: "Genting / Alibaba",
    supports:
      "Category evidence for virtual queue slots, itinerary planning, incentives, crowd prediction, ticket-linked QR validation, group reservations, kiosks, availability limits, and late-window rules.",
    doesNotProve:
      "Dream Queue economics, revenue uplift, wait-time reduction, model accuracy, no-show rate, compliance, or implementation cost.",
  },
  {
    signal: "China smart tourism",
    supports:
      "Hybrid and flexible reservation patterns: offline fallback, reduced PII burden, anti-scalper controls, and visitor-flow tooling.",
    doesNotProve:
      "Moscow demand, Dream Island operating pain, or the commercial result of this pilot.",
  },
  {
    signal: "Vendor category",
    supports:
      "Virtual queue, operator tooling, QR/ticket validation, group handling, no-show tracking, and terminal fallback are mature category patterns.",
    doesNotProve:
      "Our product-market fit or any vendor KPI unless independently audited.",
  },
  {
    signal: "Disney operating rules",
    supports:
      "Slot scarcity, return windows, group/ticket logic, operating exceptions, and no immediate-access guarantee.",
    doesNotProve:
      "Queue elimination, Dream Queue revenue, or guest compliance in a different park.",
  },
  {
    signal: "Dream Island scope",
    supports:
      "A focused pilot conversation around selected bottlenecks, existing priority-access patterns, and baseline measurement.",
    doesNotProve:
      "Confirmed internal queue pain, exact wait times, throughput, no-shows, paid conversion, or standby impact.",
  },
];

const problemPoints = [
  {
    title: "Capacity stays physical.",
    text: "The software does not create ride seats or dispatches. It controls how scarce access windows are offered and enforced.",
  },
  {
    title: "Demand becomes visible.",
    text: "Timing, routing, slot inventory, late arrivals, no-shows, and downtime become operating signals instead of scattered symptoms.",
  },
  {
    title: "The pilot tests value.",
    text: "Baseline observations come first, then the park can compare whether managed flow improves predictability without fairness tradeoffs.",
  },
];

const workflow = [
  ["01", "Ticket/group", "Bind a slot to a valid ticket or linked group."],
  ["02", "VQ slot", "Offer limited return windows where capacity rules allow it."],
  ["03", "Free waiting time", "Move part of the wait from a physical line into a managed window."],
  ["04", "Route/incentive", "Suggest a cafe, retail, show, or lower-pressure zone while guests wait."],
  ["05", "QR validation", "Validate ticket, group, return window, and exception at the entrance."],
  ["06", "Operator view", "Track slot use, pressure, downtime, overrides, and standby protection."],
];

const modelRows = [
  ["Baseline", "82 min", "1,550", "Reference scenario before managed VQ flow."],
  ["Base VQ", "72 min", "967", "Benefit can appear under configured assumptions."],
  ["Risk stress", "163 min", "1,686", "Bad assumptions can break the benefit; stress remains visible."],
];

const assumptions = ["no-show 5%", "late arrivals 8%", "route compliance 75%", "paid cap 10%", "kiosk share 12%"];

const riskGroups = [
  {
    title: "Access control",
    items: ["ticket-linked QR", "group validation", "non-transferable slots"],
  },
  {
    title: "Operational exceptions",
    items: ["no-shows", "late arrivals", "downtime", "staff override"],
  },
  {
    title: "Fairness & trust",
    items: ["paid capacity cap", "offline/kiosk fallback", "minimum PII", "standby threshold"],
  },
];

const pilotSteps = [
  ["01", "Observe", "Baseline waits, throughput, downtime, peak windows, staff constraints."],
  ["02", "Simulate", "Use measured inputs to test slot inventory, routing, paid cap, and risk stress."],
  ["03", "Pilot", "Run 4-8 weeks on 5-8 bottleneck attractions with QR validation and operator view."],
  ["04", "Decide", "Compare before/after evidence and decide whether to scale, narrow, or stop."],
];

const dataRequest = [
  "hourly attendance",
  "throughput/cycle time",
  "wait observations",
  "downtime",
  "express/VIP constraints",
  "F&B/retail proxy if shareable",
  "app/kiosk/ticketing feasibility",
  "staff constraints",
];

function App() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Dream Queue home">Dream Queue</a>
        <nav className="primaryNav" aria-label="Primary navigation">
          <a href="#problem">Problem</a>
          <a href="#evidence">Evidence</a>
          <a href="#how">How it works</a>
          <a href="#model">Model</a>
          <a href="#pilot">Pilot</a>
        </nav>
        <a className="headerCta" href="#data">Data request</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="metadata">Research MVP · 4-8 week pilot · 5-8 bottleneck attractions · baseline first</p>
          <h1>Turn wait time into a managed flow.</h1>
          <p className="lede">
            Dream Queue is a pilot layer for virtual queue slots, guest routing, and operational risk
            controls in indoor theme parks.
          </p>
          <div className="heroActions" aria-label="Hero actions">
            <a className="button primary" href="#pilot">Review pilot scope</a>
            <a className="button secondary" href="#evidence">Open evidence map</a>
          </div>
        </div>
        <FlowMap />
      </section>

      <section className="section" id="problem">
        <SectionHeader eyebrow="Problem" title="Physical capacity is fixed. The lever is flow." />
        <div className="editorialColumns">
          {problemPoints.map((point) => (
            <article className="textPoint" key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="evidence">
        <SectionHeader eyebrow="Evidence" title="Category signals are useful only when their limits stay visible." />
        <div className="provenanceNote">
          <span>Source</span>
          <span>Assumption</span>
          <span>Model output</span>
          <span>Pilot hypothesis</span>
        </div>
        <div className="ledger" role="table" aria-label="Evidence ledger">
          <div className="ledgerHead" role="row">
            <span role="columnheader">Signal</span>
            <span role="columnheader">What it supports</span>
            <span role="columnheader">What it does not prove</span>
          </div>
          {evidenceRows.map((row) => (
            <div className="ledgerRow" role="row" key={row.signal}>
              <strong role="cell">{row.signal}</strong>
              <p role="cell">{row.supports}</p>
              <p role="cell">{row.doesNotProve}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="how">
        <SectionHeader eyebrow="How it works" title="A small operating loop, not a full enterprise platform." />
        <ol className="stepFlow">
          {workflow.map(([number, title, text]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section modelSection" id="model">
        <SectionHeader eyebrow="Model" title="The base scenario improves. The stress scenario is the warning." />
        <p className="modelWarning">
          <span>Model output</span>
          These values are local simulation outputs under configured assumptions, not measured Dream
          Island performance.
        </p>
        <div className="comparisonTable" role="table" aria-label="Simulation comparison">
          <div className="comparisonHead" role="row">
            <span role="columnheader">Scenario</span>
            <span role="columnheader">Avg wait</span>
            <span role="columnheader">Max queue</span>
            <span role="columnheader">Meaning</span>
          </div>
          {modelRows.map(([scenario, wait, queue, meaning]) => (
            <div className="comparisonRow" role="row" key={scenario}>
              <strong role="cell">{scenario}</strong>
              <span role="cell" className="metricValue">{wait}</span>
              <span role="cell" className="metricValue">{queue}</span>
              <p role="cell">{meaning}</p>
            </div>
          ))}
        </div>
        <p className="assumptionLine">
          <span>Assumptions</span>
          {assumptions.join(" · ")}
        </p>
      </section>

      <section className="section" id="risk">
        <SectionHeader eyebrow="Risk controls" title="Virtual queue is controlled scarcity plus staff enforcement." />
        <div className="riskBands">
          {riskGroups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section pilotSection" id="pilot">
        <SectionHeader eyebrow="Pilot" title="A narrow discovery pilot keeps the claim honest." />
        <div className="timeline">
          {pilotSteps.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="pilotMeta">
          4-8 weeks · 5-8 bottleneck attractions · peak windows · baseline first · QR validation ·
          operator dashboard · before/after analysis
        </p>
      </section>

      <section className="section dataSection" id="data">
        <div>
          <SectionHeader eyebrow="Data request" title="Run discovery with real park data." />
          <p className="dataIntro">
            The next step is practical: collect the minimum inputs needed to measure the baseline,
            simulate risk, and decide whether a pilot is worth running.
          </p>
        </div>
        <ul className="dataList">
          {dataRequest.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <a className="button primary finalCta" href="mailto:hello@dreamqueue.ai?subject=Dream%20Queue%20pilot%20data%20request">
          Run discovery with real park data
        </a>
      </section>

      <footer className="footer">
        <span>Dream Queue</span>
        <span>Research MVP and pilot proposal. Scenario outputs are not measured park performance.</span>
      </footer>
    </main>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="sectionHeader">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function FlowMap() {
  return (
    <figure className="flowMap" aria-label="Abstract indoor park flow map">
      <svg viewBox="0 0 760 520" role="img" aria-labelledby="flowTitle flowDesc">
        <title id="flowTitle">Indoor park flow map</title>
        <desc id="flowDesc">
          Entrance, bottleneck ride, open slot, cafe route, QR return window, and one risk marker.
        </desc>
        <path className="mapShell" d="M77 263C77 121 196 58 349 58h111c141 0 224 83 224 198 0 129-95 205-248 205H298C168 461 77 390 77 263Z" />
        <path className="mapAtrium" d="M222 259c0-77 65-124 151-124h51c79 0 129 48 129 121 0 78-59 127-145 127h-51c-81 0-135-50-135-124Z" />
        <path className="route mainRoute" d="M112 285C176 246 230 233 297 247c73 15 104 68 177 52 57-12 100-60 167-61" />
        <path className="route cafeRoute" d="M316 326C379 368 473 378 560 337" />
        <path className="route returnRoute" d="M176 195C244 141 352 122 459 149" />
        <g className="node entrance" transform="translate(114 287)">
          <circle r="17" />
          <text x="27" y="-3">Entrance</text>
          <text x="27" y="15">ticket-linked</text>
        </g>
        <g className="node bottleneck" transform="translate(307 249)">
          <circle r="19" />
          <text x="29" y="-3">Bottleneck ride</text>
          <text x="29" y="15">standby pressure</text>
        </g>
        <g className="node openSlot" transform="translate(641 238)">
          <circle r="18" />
          <text x="-132" y="-5">Open slot</text>
          <text x="-132" y="14">limited return window</text>
        </g>
        <g className="node cafe" transform="translate(565 337)">
          <circle r="16" />
          <text x="-154" y="-5">Suggested cafe / retail route</text>
          <text x="-154" y="14">pilot hypothesis</text>
        </g>
        <g className="node qr" transform="translate(462 150)">
          <circle r="16" />
          <text x="26" y="-5">QR return window</text>
          <text x="26" y="14">staff validation</text>
        </g>
        <g className="riskMarker" transform="translate(226 375)">
          <path d="M0-19 18 15h-36Z" />
          <text x="30" y="3">late arrival risk</text>
        </g>
      </svg>
      <figcaption>
        Flow map: entrance, bottleneck ride, open slot, suggested cafe/retail route, QR return
        window, and one operational risk marker.
      </figcaption>
    </figure>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
