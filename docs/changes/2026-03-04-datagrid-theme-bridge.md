# Change Note: DataGrid Theme Bridge (AKYD-085, Iteration 1)

**Date:** 2026-03-04
**Type:** New component (foundation)

---

## Summary

Introduced the AG Grid → Akymic token bridge — the foundational layer for the `<DataGrid>` component. This maps all AG Grid CSS custom properties (`--ag-*`) to existing Akymic design tokens, enabling automatic light/dark theming with zero new tokens.

## What changed

- **`docs/dgrid-plan.md`** — Research summary: AG Grid evaluation, Table vs DataGrid decision framework, token mapping reference, component API design
- **`packages/ui/src/data-grid/akymic-ag-theme.ts`** — JS theme configuration using AG Grid's `themeQuartz.withParams()` API for spacing, sizing, and non-CSS parameters
- **`packages/ui/src/data-grid/data-grid.css`** — CSS variable bridge mapping 25+ `--ag-*` vars to Akymic tokens; includes striped row support and `prefers-reduced-motion`
- **`packages/ui/src/data-grid/index.ts`** — Barrel export
- **`packages/ui/package.json`** — `ag-grid-community` and `ag-grid-react` added as peer dependencies; `"./data-grid"` sub-path export added

## Token mapping (key entries)

| Akymic Token | AG Grid Variable | Purpose |
|---|---|---|
| `--background` | `--ag-background-color` | Grid body |
| `--foreground` | `--ag-foreground-color` | Text |
| `--muted` | `--ag-header-background-color` | Header bg |
| `--border` | `--ag-border-color` | Borders |
| `--primary` | `--ag-accent-color` | Selection |
| `--ring` | `--ag-range-selection-border-color` | Focus |
| `--destructive` | `--ag-invalid-color` | Errors |

## No new tokens

All AG Grid visuals map to the existing 23 color + 3 shadow + 9 motion + 19 typography tokens.

## Architecture

- **Peer dependency pattern** — AG Grid is NOT bundled with `@akymic/ui`. Consumers install it themselves. Non-DataGrid users see zero bundle impact.
- **Sub-path export** — `@akymic/ui/data-grid` keeps DataGrid isolated from the main barrel.

## Verification

- [ ] Light mode: header bg matches `--muted`, text uses `--foreground`
- [ ] Dark mode: all colors invert via `.dark` cascade
- [ ] No hardcoded hex/rgb values in bridge files
- [ ] `prefers-reduced-motion` collapses transition duration
