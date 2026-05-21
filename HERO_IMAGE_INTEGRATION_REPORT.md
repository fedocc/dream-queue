# Hero Image Integration Report

## Image file used

- Source file: `/Users/fedornikonov/Downloads/ChatGPT Image 21 мая 2026 г., 08_51_49.png`
- Note: the exact requested filename `amusement_park_visitor_guide_infographic.png` was not present in `Downloads`; this file was the matching amusement-park visitor-guide infographic.

## Project copy location

- Copied to: `web/public/images/dream-queue-hero-infographic.png`
- Referenced from React as: `/images/dream-queue-hero-infographic.png`

## Hero changes

- Removed the abstract inline flow-map SVG from the hero.
- Added a real infographic image as the main hero illustration.
- Added Russian alt text and a short Russian caption.
- Kept the existing two-column hero structure with mobile stacking.
- Added stable image width/height, aspect ratio, bordered framing, and responsive sizing.

## Russian localization changes

- Translated visible site navigation, hero copy, section headings, CTA buttons, table headers, row meanings, risk labels, pilot steps, data request items, and footer text into Russian.
- Simplified model and operations terminology for a Russian-speaking business audience.
- Preserved claim-safety framing: model values are labeled as model calculations, not measured Dream Island data.
- Updated model rows to:
  - `Без Dream Queue`
  - `С Dream Queue`
  - `Стресс-сценарий`
- Added visual emphasis for the model rows:
  - neutral for `Без Dream Queue`
  - green/accent for `С Dream Queue`
  - amber/warning for `Стресс-сценарий`

## Validation result

- `cd /Users/fedornikonov/dq-frontend/web && npm run build` passed.
- `cd /Users/fedornikonov/dq-frontend && python3 -m unittest tests/test_risk_simulation.py` passed.
