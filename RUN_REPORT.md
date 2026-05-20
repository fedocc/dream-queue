# Run Report

## Summary

Redesigned the frontend landing page as a serious operator control-room pilot proposal for Dream Queue AI. The page now frames the project as a research MVP and focused indoor theme park discovery pilot, with virtual queue slots, wait prediction, guest routing, risk controls, and limited governed priority inventory.

The redesign keeps the scope narrow: 4-8 weeks, 5-8 bottleneck attractions, peak windows, baseline measurement first, QR validation, operator dashboard, and before/after analysis.

## Files Changed

- `web/src/App.tsx`
- `web/src/styles.css`
- `RUN_REPORT.md`

## Sections Added / Changed

- Hero: new headline around managing guest time, not skipping or eliminating queues.
- Hero visual: custom abstract indoor park map with route paths, heat nodes, slot inventory, operator alerts, and model-output metrics.
- Problem: capacity is fixed; opportunity is timing, routing, governance, visibility, and fairness.
- Evidence map: Genting/Alibaba, China smart tourism, comparable vendors, Disney/category patterns, and Dream Island pilot fit.
- How it works: ticket/group, VQ slot, freed waiting time, route/incentive, QR validation, operator dashboard.
- Simulation/model: uses current risk-aware outputs and visible stress framing.
- Risk controls: late arrivals, no-shows, QR fraud, scalpers, app exclusion, downtime, fairness, route compliance, minimum PII, staff SOP.
- Pilot proposal: narrow measured discovery pilot rather than platform replacement.
- Data request / next step: asks for real park data and discovery/pilot validation, not product purchase.

## Visual Decisions

- Dark command-center foundation with restrained teal, green, amber, and red operational states.
- Custom CSS/SVG map instead of stock images or IP-like visuals.
- Dashboard panels use compact operational labels, evidence badges, slot inventory blocks, route paths, and alert cards.
- Mobile layout collapses to single-column sections with stable map, metric, risk, and data request panels.

## Claims / Provenance Safeguards

- Every material model number is labelled or adjacent to `Model output`.
- Pilot framing is labelled as `Pilot hypothesis` and assumption-led.
- Genting/Alibaba are described as category evidence, not economics proof.
- Simulation values are explicitly stated as local scenario outputs, not measured Dream Island data.
- The page avoids claims that VQ eliminates queues, guarantees revenue uplift, or proves Dream Island has a confirmed queue problem.
- Risk stress output remains visible to show that benefits can break under poor assumptions.

## Build / Test Result

- `cd web && npm run build` passed.
- `python3 -m unittest tests/test_risk_simulation.py` passed.

## Known Issues

- No browser screenshot review was performed in this run.
- Existing unused demo page/component files remain in `web/src/pages` and `web/src/components`; the landing page entrypoint does not import them.

## Manual Review Steps

1. Start the local web server with `cd web && npm run dev`.
2. Review desktop hero at `http://127.0.0.1:5178`.
3. Check mobile widths around 390px and 720px for map, hero text, risk cards, and data request layout.
4. Verify public-facing copy still follows `research/claims_policy.md`.
5. Confirm no section implies measured Dream Island performance or guaranteed queue/revenue outcomes.
