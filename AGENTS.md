# Dream Queue AI Agent Context

## Mission

Dream Queue AI is a research MVP and pilot proposal for indoor theme park operations. Treat it as an evidence-backed discovery artifact, not as a proven production product.

The product position is:

> A lightweight operations layer for virtual queue slots, wait prediction, guest routing, risk controls, and limited priority inventory in indoor theme parks.

The current case-study target is Dream Island / "Остров Мечты" in Moscow. The near-term proposal should stay narrow: a 4-8 week pilot on 5-8 bottleneck attractions and peak windows, with baseline measurement before claims.

## Required Reading

Before changing product copy, simulation logic, site structure, or positioning, read:

- `research/evidence_pack.md`
- `research/claims_policy.md`
- `research/risk_register.md`
- `research/pilot_data_request.md`
- Existing files in the area you will edit

For frontend tasks, also read:

- `web/src/App.tsx`
- `web/src/styles.css`
- `web/package.json`

For simulation/model tasks, also inspect:

- `configs/*.yaml`
- `src/model/*`
- `src/simulation/*`
- `outputs/reports/*`

## Claim Policy

Every public-facing claim must be one of:

- `source`: supported directly by a listed source or existing repo evidence.
- `assumption`: an explicit modeling or pilot assumption.
- `model output`: produced by the local simulation or financial model.
- `pilot hypothesis`: a proposal to test with real park data.

Use provenance labels in the website and docs when a number or claim could be mistaken for measured park performance.

## Do Not Say

- Do not claim Alibaba or Genting proved Dream Queue revenue uplift.
- Do not claim virtual queue eliminates queues.
- Do not present simulation output as measured park data.
- Do not invent sources, KPIs, wait times, conversion rates, or operational data.
- Do not imply paid priority capacity can grow without standby impact.
- Do not claim Dream Island has a confirmed queue problem beyond public evidence and pilot hypotheses.

## Safe Positioning

Allowed framing:

- Genting/Alibaba confirms the category: VQ + itinerary planning + incentives + crowd prediction exists in theme park operations.
- Dream Queue does not increase physical ride capacity; it manages time, slot inventory, routing, and operational risk.
- Dream Island already has express/VIP priority products; Dream Queue explores governed digital inventory and queue-flow intelligence around that existing pattern.
- China smart tourism evidence supports hybrid, flexible reservations, offline fallback, and anti-scalper controls.

## Design Direction

Use the direction:

> Operator Control Room + Map-first Guest Flow.

The product should feel like a serious operations product for an indoor theme park:

- dark command-center background;
- abstract indoor park map, routes, bottlenecks, and slot inventory;
- queue heat and risk indicators;
- operator dashboard panels;
- source/evidence badges;
- calm premium typography and strong contrast.

Avoid:

- childish amusement-park visuals;
- Disney, Genting, Dream Island, or other copied IP/style;
- generic purple-blue AI/SaaS gradients as the main identity;
- stock-image filler;
- emoji-heavy copy;
- fake dashboard metrics without provenance.

## Technical Guidance

- Inspect files before editing.
- Keep each chat scoped to its assigned area.
- Do not rewrite the website in context/setup tasks.
- Do not change simulation formulas in documentation/content tasks.
- Do not change research claims without checking `research/evidence_pack.md`.
- Prefer small, focused changes over broad refactors.
- Follow existing project patterns unless a task explicitly asks for a redesign.
- Run available checks after changes:
  - web: `cd web && npm run build`
  - simulation/model: run the relevant Python entry points from `README.md`
- If a check cannot be run, state why in the final response.

## Recommended Task Split

Use separate chats or tightly scoped sessions:

- `DQ-00 Context and guardrails`: durable repo context only.
- `DQ-01 Design system`: visual style, tokens, CSS, layout primitives only.
- `DQ-02 Frontend redesign`: full landing page redesign using the design system.
- `DQ-03 Risk realism model`: no-show, late arrivals, compliance, downtime, paid cap.
- `DQ-04 Evidence copy and docs`: claims, source labels, "what Genting proves / does not prove".
- `DQ-05 Final QA and evidence audit`: build, mobile sanity, overclaim audit, visual quality.

## Done Criteria For Context Tasks

- `AGENTS.md` exists at repo root.
- `research/evidence_pack.md` contains the current evidence pack.
- `research/claims_policy.md`, `research/risk_register.md`, and `research/pilot_data_request.md` exist.
- No unrelated frontend, business logic, simulation, or generated-output changes.

