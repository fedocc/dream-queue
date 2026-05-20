from __future__ import annotations

import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "src" / "simulation"))

from optimized_simulation import run


class RiskSimulationTests(unittest.TestCase):
    def test_risk_assumptions_are_labeled_in_result(self) -> None:
        result = run(visitors=3000, park_hours=4, scenario_name="base")

        self.assertEqual(result.output_label, "model output")
        self.assertEqual(result.assumption_labels["no_show_rate"], "assumption")
        self.assertEqual(result.assumption_labels["ride_downtime_probability"], "assumption")
        self.assertIn("route_compliance_rate", result.assumptions_used)
        self.assertIn("paid_capacity_cap", result.assumptions_used)

    def test_bad_operational_assumptions_reduce_optimized_benefit(self) -> None:
        base = run(visitors=3000, park_hours=4, scenario_name="base")
        stressed = run(
            visitors=3000,
            park_hours=4,
            scenario_name="base",
            risk_overrides={
                "no_show_rate": 0.25,
                "late_arrival_rate": 0.35,
                "ride_downtime_probability": 0.35,
                "route_compliance_rate": 0.25,
                "staff_override_rate": 0.20,
                "abandon_rate": 0.18,
                "paid_capacity_cap": 0.04,
            },
        )

        self.assertGreater(stressed.avg_wait_time, base.avg_wait_time)
        self.assertLess(stressed.paid_slots_sold, base.paid_slots_sold)
        self.assertGreater(stressed.risk_outputs["downtime_steps"], base.risk_outputs["downtime_steps"])


if __name__ == "__main__":
    unittest.main()
