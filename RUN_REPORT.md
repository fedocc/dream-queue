# Run Report

## Summary

Combined the completed design-system, evidence-integration, and risk-simulation work. The frontend keeps the dark operator control-room foundation, map-first hero surface, queue heat states, slot inventory visuals, and dashboard/card primitives from `feat/design-system`, while preserving the evidence-backed narrative, softened claims, provenance labels, and evidence map from `feat/evidence-integration`.

The simulation/model layer now includes operational risk realism from `feat/risk-simulation`: no-shows, late arrivals, grace/release handling, route compliance, ride downtime, paid capacity caps, standby protection, kiosk share, staff overrides, and abandonments.

All operational values are assumptions. Simulation and financial artifacts label results as model outputs or scenario outputs, not measured Dream Island data.

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

## Risk-Simulation Work Preserved

- Added `risk_assumptions` to `configs/assumptions.yaml`.
- Updated optimized simulation logic for no-shows, late arrivals, grace/release handling, route compliance, downtime, paid capacity caps, standby protection, kiosk share, staff overrides, and abandonments.
- Added `tests/test_risk_simulation.py`.
- Updated report/chart outputs and frontend model numbers to risk-aware scenario outputs.

## Risk Variables Added

- `no_show_rate`
- `late_arrival_rate`
- `grace_period_minutes`
- `slot_release_after_minutes`
- `route_compliance_rate`
- `ride_downtime_probability`
- `paid_capacity_cap`
- `standby_penalty_threshold`
- `kiosk_share`
- `staff_override_rate`
- `abandon_rate`

## Risk-Aware Base Outputs

- Baseline remains a physical-queue reference: average wait `82.0` minutes, max queue `1549.5`.
- Base optimized scenario is risk-aware: average wait `72.3` minutes, max queue `967.25`, paid slots sold `290`, peak-day fast-slot revenue `145000` RUB.
- `simulation_summary.json` includes a `risk_stress` scenario output showing that VQ/routing benefits can reduce or break under poor operating assumptions.

## Validation Notes

Before the risk merge, `MERGE_REPORT.md` recorded a passing frontend build after dependency install. The risk branch also reported passing:

- `python3 -m unittest tests/test_risk_simulation.py`
- `python3 src/simulation/baseline_simulation.py`
- `python3 src/simulation/optimized_simulation.py`
- `python3 src/model/scenario_runner.py`
- `python3 src/simulation/visualization.py`
- `cd web && npm run build`
