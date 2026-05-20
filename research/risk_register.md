# Risk Register

Dream Queue must make operational risk visible. Virtual queue is controlled scarcity and staff-enforced inventory, not a magic queue removal layer.

| Risk | Why it matters | Control / product response | Provenance |
|---|---|---|---|
| Late arrivals | Return windows fail if guests arrive outside the operational tolerance. Genting uses a late window; Disney warns late arrivals may not be accommodated. | Return window, reminders, expiry, grace period, staff override SOP. | Source + assumption |
| No-shows | Booked guests may not arrive, wasting capacity. Vendors track no-show and abandon behavior. | `no_show_rate`, auto-release, conservative overbooking cap. | Assumption |
| QR sharing / fraud | Slots must be bound to valid entry entitlement. Genting links VQ to entrance tickets and uses QR validation. | One-time or dynamic QR, ticket binding, scan each group member or validate group size. | Source + assumption |
| Scalpers / slot hoarding | Reservation systems can attract arbitrage and public backlash. China policy materials discuss reservation scalping and flexible ticket supply. | Non-transferable slots, ticket/account limits, rate limits, abnormal behavior logs. | Source + assumption |
| Group mismatch | Groups may reserve for more guests than are present or eligible. Genting uses linked group tickets. | Linked ticket groups, present-member validation, partial-admission rules. | Source + assumption |
| App exclusion | App-only systems exclude guests without smartphones or guests unwilling to use apps. China guidance and Genting VQ kiosks support offline fallback. | Kiosk/staff mode, printed QR, SMS fallback, standby path. | Source |
| Slot scarcity backlash | Guests may treat VQ as a promise if availability is not clearly limited. Disney and Genting stress limited availability and no immediate-access guarantee. | Clear availability language, rolling release, waitlist, alternatives. | Source |
| Ride downtime | Temporary closures can invalidate return windows and create crowd displacement. | Pause slots, reassign windows, alternatives, compensation workflow. | Assumption |
| Fairness backlash | Paid priority can worsen standby experience if uncapped. | `paid_capacity_cap`, standby penalty threshold, public fairness language. | Assumption |
| Route non-compliance | Guest routing only works if enough guests follow recommendations. | `route_compliance_rate`, incentives, redemption tracking, map-based prompts. | Assumption |
| Too much PII | Heavy identity systems create privacy and adoption risk. China reservation guidance emphasizes convenience and reduced data burden. | Minimum PII, ticket ID hash, no biometrics, short retention, aggregate analytics. | Source + assumption |
| Staff conflict at entrance | Enforcement happens at the gate, not only in UI. | SOP for expired QR, wrong group, app error, accessibility cases, downtime. | Assumption |

## Simulation Variables To Add Later

When the risk realism model is implemented, prefer conservative defaults and label each as an assumption:

- `no_show_rate`
- `late_arrival_rate`
- `grace_period_minutes`
- `slot_release_after_minutes`
- `route_compliance_rate`
- `kiosk_share`
- `staff_override_rate`
- `ride_downtime_probability`
- `paid_capacity_cap`
- `standby_penalty_threshold`
- `abandon_rate`

Outputs that use these variables must be labelled as scenario/model outputs until validated with pilot data.

