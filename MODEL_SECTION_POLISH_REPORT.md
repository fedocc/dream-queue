# Model Section Polish Report

Date: 2026-05-21

## Scope

- Updated only the Russian model comparison section layout.
- Replaced the wide comparison table with compact scenario cards.
- Kept model values unchanged:
  - Без Dream Queue: 82 мин, 1 550
  - С Dream Queue: 72 мин, 967
  - Стресс-сценарий: 163 мин, 1 686

## Visual changes

- Added balanced scenario cards with aligned metric groups.
- Added subtle left-edge and background accents:
  - neutral for `Без Dream Queue`
  - green for `С Dream Queue`
  - amber for `Стресс-сценарий`
- Applied tabular numbers and `white-space: nowrap` to metric values.
- Moved assumptions into a compact connected metadata block below the cards.
- Tightened spacing and mobile behavior for the section.

## Files changed

- `web/src/App.tsx`
- `web/src/styles.css`
- `MODEL_SECTION_POLISH_REPORT.md`

## Validation

- `cd web && npm run build`: passed.
- `python3 -m unittest tests/test_risk_simulation.py`: passed, 2 tests.

## Push

- Commit command requested: `git commit -m "Polish Russian model comparison layout"`.
- Push requested by latest user instruction after the initial no-push line.
