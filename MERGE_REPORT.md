# Merge Report

## Conflicts Found

- `RUN_REPORT.md`
- `web/src/App.tsx`
- `web/src/styles.css`

## Conflict Resolution

### `RUN_REPORT.md`

Combined the design-system run report and the evidence-integration run report into one clear summary. The file now records both the dark operator control-room visual foundation and the evidence-backed narrative changes, and points to this merge report for the post-resolution build result.

### `web/src/App.tsx`

Preserved the design-system layout and map-first command surface from `feat/design-system`. Integrated evidence-safe wording from `feat/evidence-integration`, including:

- hero copy framing Dream Queue AI as a pilot/research MVP, not a proven product;
- `Model output` label on the hero dashboard scenario;
- `Source`, `Assumption`, `Model output`, and `Pilot hypothesis` provenance legend;
- evidence map section describing what public evidence does and does not prove;
- model and revenue sections labelled as scenario/model output, not measured Dream Island performance;
- Genting/Alibaba wording limited to category evidence, not economics.

### `web/src/styles.css`

Kept the dark command-center design tokens, dashboard cards, map visuals, queue heat states, and responsive layout from `feat/design-system`. Preserved the evidence/provenance classes from `feat/evidence-integration` and adapted them to the dark visual foundation.

## Build Result

Initial build attempt failed because `vite` was missing from `web/node_modules`:

```text
sh: vite: command not found
```

Ran `npm install` in `web` using the existing package lock, then reran:

```text
npm run build
```

Result:

```text
vite v7.3.3 building client environment for production...
✓ 1578 modules transformed.
✓ built in 616ms
```

## Next Merge Safety

It is safe to merge `feat/risk-simulation` next from the current frontend/build perspective. The next merge should still inspect risk-model conflicts carefully because this merge intentionally did not change simulation formulas.

