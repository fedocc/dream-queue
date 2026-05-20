# Run Report: Operational Risk Assumptions

## Summary

Added operational risk realism to the simulation/model layer. The optimized virtual queue scenario now models no-shows, late arrivals, grace/release handling, route compliance, ride downtime, paid capacity caps, standby protection, kiosk share, staff overrides, and abandonments.

All new operational values are treated as assumptions. Simulation and financial artifacts label results as model outputs or scenario outputs, not measured Dream Island data.

## Files Changed

- `configs/assumptions.yaml`
- `src/simulation/park_entities.py`
- `src/simulation/optimized_simulation.py`
- `src/simulation/visualization.py`
- `src/model/scenario_runner.py`
- `tests/test_risk_simulation.py`
- `outputs/reports/baseline_simulation.json`
- `outputs/reports/optimized_simulation.json`
- `outputs/reports/simulation_summary.json`
- `outputs/reports/financial_scenarios.csv`
- `outputs/charts/*.png`
- `web/src/App.tsx`
- `web/src/components/RevenueChart.tsx`
- `web/src/pages/OperatorDashboard.tsx`
- `web/src/pages/SimulationView.tsx`

## Variables Added

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

## Default Assumptions

- `no_show_rate`: `0.05`
- `late_arrival_rate`: `0.08`
- `grace_period_minutes`: `15`
- `slot_release_after_minutes`: `10`
- `route_compliance_rate`: `0.75`
- `ride_downtime_probability`: `0.01`
- `paid_capacity_cap`: `0.10`
- `standby_penalty_threshold`: `60`
- `kiosk_share`: `0.12`
- `staff_override_rate`: `0.04`
- `abandon_rate`: `0.03`

## How Outputs Changed

- Baseline remains unchanged as a physical-queue reference: average wait `82.0` minutes, max queue `1549.5`.
- Base optimized scenario is now risk-aware: average wait `72.3` minutes, max queue `967.25`, paid slots sold `290`, peak-day fast-slot revenue `145000` RUB.
- Risk outputs are included in optimized results: no-shows, late arrivals, abandoned slots, staff overrides, downtime steps, kiosk bookings, effective paid capacity share, and effective routing strength.
- `simulation_summary.json` now includes a `risk_stress` scenario output. Under bad assumptions, average wait rises to `162.99` minutes, max queue rises to `1685.75`, paid slots fall to `0`, and downtime steps rise to `335`. This shows that VQ/routing benefits can reduce or break under poor operating assumptions.
- Financial scenario outputs are lower than the previous optimistic case because paid inventory is capped and operational risks reduce slot utilization.
- Web simulation numbers were updated without redesign so the prototype no longer shows stale pre-risk model outputs.

## Validation Result

Passed:

- `python3 -m unittest tests/test_risk_simulation.py`
- `python3 src/simulation/baseline_simulation.py`
- `python3 src/simulation/optimized_simulation.py`
- `python3 src/model/scenario_runner.py`
- `python3 src/simulation/visualization.py`
- `cd web && npm run build`

Notes:

- `python` was unavailable on this machine, so validation used `python3`.
- `npm run build` initially failed because `vite` was not installed locally. Running `npm install` in `web/` installed dependencies from the existing lockfile, then the build passed.
- `matplotlib` was unavailable, so `visualization.py` used the existing stdlib PNG fallback.

## Known Limitations

- Risk rates are assumptions for scenario modeling only; they are not measured Dream Island data.
- Ride downtime is modeled as independent per attraction per step, not from real closure logs.
- Late-arrival behavior is simplified into grace, staff override, or standby handling.
- Kiosk share only adjusts booking/no-show behavior and does not model staffing queues at kiosks.
- Paid capacity caps protect standby capacity in the model, but real fairness thresholds require pilot observations.
- Route compliance is a scalar assumption; real guest routing would need walking times, group constraints, and redemption tracking.
- VQ does not increase physical ride capacity. The model can reduce waits or improve distribution only by changing demand timing, routing, slot inventory, and operational enforcement.
