# Run Report

## Summary

Combined the completed design-system and evidence-integration work after resolving the merge. The frontend keeps the dark operator control-room foundation, map-first hero surface, queue heat states, slot inventory visuals, and dashboard/card primitives from `feat/design-system`, while preserving the evidence-backed narrative, softened claims, provenance labels, and evidence map from `feat/evidence-integration`.

## Design-System Work Preserved

- Dark command-center background and custom CSS map composition.
- Abstract indoor park flow map with route lines, heat-state nodes, and VQ slot inventory blocks.
- Shared card, panel, chart, KPI, source, alert, and pilot checklist styling.
- Restrained teal, green, amber, and red operational states instead of generic purple AI gradients.
- Evidence/provenance pill styling integrated into the dark visual foundation.

## Evidence-Integration Work Preserved

- Dream Queue AI is framed as a research MVP and focused pilot proposal, not a proven production product.
- Genting/Alibaba are framed as category evidence, not proof of Dream Queue economics.
- China market evidence supports hybrid reservations, offline fallback, anti-scalper controls, and minimum PII.
- Vendor and Disney evidence are treated as category and operating-pattern evidence, not audited KPI proof.
- Dream Island relevance remains a 4-8 week pilot on 5-8 bottleneck attractions and peak windows, with baseline measurement first.
- Public-facing numbers remain labelled as Source, Assumption, Model output, or Pilot hypothesis where needed.

## Files Covered By The Merge

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

## Build Result Before This Conflict Resolution

Both branches previously reported the same local dependency issue:

- Initial `npm run build` failed because `vite` was not installed in `web/node_modules`.
- After `npm install` in `web`, `npm run build` passed in both branch reports.

See `MERGE_REPORT.md` for the build result after the conflict resolution commit.
