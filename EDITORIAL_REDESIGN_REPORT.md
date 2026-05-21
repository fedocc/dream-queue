# Editorial Redesign Report

## What was wrong with the previous visual direction

The previous site was functionally clear but visually over-weighted toward a generated control-room pattern. It used too many dashboard cards, badges, metric panels, icon blocks, and dark SaaS surfaces. The hero had several competing ideas at once: control surface, metric rail, slot inventory, alerts, and badges. That made the page feel busy and less credible as a calm B2B pilot proposal.

Metric presentation also had wrapping risk because numbers lived inside small cards. The visual hierarchy relied on repeated widgets instead of editorial spacing, table structure, and a single memorable motif.

## What changed

- Reframed the page as an editorial B2B pilot brief with a warm, restrained palette.
- Replaced the dashboard-heavy hero with one custom abstract indoor-park flow map.
- Removed KPI cards, slot bars, alert widgets, and icon-heavy section cards from the hero.
- Converted the evidence section into a ledger/table with clear "supports" and "does not prove" columns.
- Converted the model section into one comparison table with visible risk-stress output.
- Grouped risk controls into three categories instead of nine separate cards.
- Changed the pilot section into a simple timeline with controlled dark contrast.
- Rebuilt spacing, typography, separators, and responsive behavior for a calmer hierarchy.
- Added tabular, non-wrapping metric styles for model values.

## Files changed

- `web/src/App.tsx`
- `web/src/styles.css`
- `EDITORIAL_REDESIGN_REPORT.md`

## Claims and provenance safeguards preserved

- Dream Queue remains framed as a research MVP and pilot proposal.
- Genting/Alibaba remains category evidence only, not proof of Dream Queue economics.
- China smart-tourism evidence remains limited to hybrid access, flexible reservations, offline fallback, anti-scalper controls, and minimum PII.
- Vendor category evidence is treated as maturity signal, not product-market-fit proof.
- Disney operating rules are used for scarcity and operations framing, not queue elimination.
- Dream Island relevance is framed as a focused pilot conversation, not confirmed internal pain.
- Model outputs are explicitly labelled as local simulation outputs, not measured Dream Island performance.
- Risk stress remains visible: 163 min average wait and max queue 1,686.
- The copy avoids guaranteed revenue uplift, queue elimination, and invented park data.

## Validation result

- `cd web && npm run build` passed.
- `python3 -m unittest tests/test_risk_simulation.py` passed.

## Manual review checklist

- Confirm the first viewport communicates: pilot software for managing guest flow and virtual queue slots in a theme park.
- Confirm the flow map is the single memorable visual motif.
- Check desktop, tablet, and mobile spacing for the hero, evidence ledger, model table, and final CTA.
- Verify sticky navigation anchors land cleanly below the header.
- Verify metric values do not wrap awkwardly.
- Confirm the site does not imply measured Dream Island performance or guaranteed commercial results.
- Confirm the visual direction feels calm, premium, human, and not dashboard-heavy.
