# Run Report

## Summary

Integrated the evidence-backed narrative across docs and frontend copy. The repo now frames Dream Queue AI as a research MVP and focused pilot proposal, with clearer separation between public sources, assumptions, model outputs, and pilot hypotheses.

## Files Changed

- `README.md`
- `project_brief.md`
- `research/evidence_map.md`
- `research/benchmarks/comparison_table.md`
- `research/pitch_strategy.md`
- `research/product_application.md`
- `research/site_storyline.md`
- `web/src/App.tsx`
- `web/src/styles.css`
- `web/src/components/AttractionCard.tsx`
- `web/src/components/QueueTimeline.tsx`
- `web/src/components/RevenueChart.tsx`
- `web/src/pages/GuestView.tsx`
- `web/src/pages/OperatorDashboard.tsx`
- `web/src/pages/SimulationView.tsx`

## Claims Added

- Dream Queue AI is a research MVP and pilot proposal, not a proven production product.
- Public evidence from Genting/Alibaba confirms the operating category, not Dream Queue economics.
- China market evidence supports hybrid reservations, offline fallback, anti-scalper controls, and minimum PII.
- accesso, Attractions.io, Lineberty, and Disney support category and operating-pattern evidence, while vendor KPI claims remain unaudited.
- Dream Island relevance should be a focused 4-8 week pilot on 5-8 bottleneck attractions and peak windows, with baseline measurement first.
- Public-facing numbers should be labelled as Source, Assumption, Model output, or Pilot hypothesis.

## Claims Removed Or Softened

- Softened "queues cost the park money" into a pilot hypothesis about opportunity cost.
- Softened "revenue management system" into queue-flow intelligence, risk controls, and governed priority inventory.
- Replaced unqualified revenue/uplift phrasing with scenario/model-output language.
- Added "not measured park performance" caveats to frontend simulation and revenue views.
- Reframed Genting/Alibaba from proof of economics to proof of an operating pattern.

## Remaining Evidence Gaps

- Real Dream Island wait-time logs or manual baseline observations.
- Attraction throughput: seats, cycle time, dispatch interval, and downtime.
- Existing express/VIP demand, constraints, and standby impact.
- No-show, late-arrival, group mismatch, and staff override rates.
- Guest route-compliance rate and response to incentives.
- Aggregated F&B/retail proxy during wait windows, if shareable.
- App, kiosk, QR, ticket-binding, and staff SOP feasibility.

## Build Result

Initial `npm run build` failed because `vite` was not installed in `web/node_modules`.

After running `npm install` in `web`, `npm run build` passed:

```text
vite v7.3.3 building client environment for production...
✓ 1578 modules transformed.
✓ built in 632ms
```
