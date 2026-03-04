# Change Note: DataGrid Complete (AKYD-085)

**Date:** 2026-03-04
**Type:** New component — full delivery

---

## Summary

Delivered `<DataGrid>` — the first rich, third-party-backed component in the Akymic Design System. Wraps AG Grid Community (MIT) with an Akymic token bridge that maps all visuals to existing design tokens. Includes wrapper component, documentation site page, governance updates, and app template integration.

## Iteration recap

1. **Theme bridge** — `akymic-ag-theme.ts` + `data-grid.css` mapping 25+ `--ag-*` vars to Akymic tokens
2. **Wrapper component** — `<DataGrid>` with 12 props + `gridOptions` escape hatch
3. **Docs page** — `/components/data-grid` with 7 live examples + token mapping reference + props table
4. **Governance** — ROADMAP, CLAUDE.md, components.md updated; app template demo added

## Key architecture decisions

- **Peer dependency** — AG Grid declared optional in `peerDependencies`. Non-users see zero bundle impact.
- **Sub-path export** — `@akymic/ui/data-grid` keeps AG Grid isolated from main barrel.
- **No new tokens** — All 25+ AG Grid CSS vars map to existing Akymic tokens.
- **Dark mode automatic** — CSS bridge uses `var(--token)` which resolves under `.dark {}`.
- **`gridOptions` escape hatch** — Enterprise features accessible without wrapper changes.

## Files added/modified

### DS repo (`akymic-design-system`)
- `packages/ui/src/data-grid/` — 4 files (theme, CSS, component, types, barrel)
- `packages/ui/package.json` — peer deps + sub-path export
- `apps/docs/src/app/components/data-grid/page.tsx` — docs page
- `apps/docs/src/components/doc-layout.tsx` — nav entry
- `apps/docs/package.json` — AG Grid deps
- `apps/docs/src/design-system/data-grid.css` — theme CSS copy
- `apps/docs/src/app/globals.css` — CSS import
- `docs/dgrid-plan.md` — research doc
- `docs/components.md` — inventory update
- `ROADMAP.md` — AKYD-085 completed
- `CLAUDE.md` — 34→35 components, DataGrid in list

### App template (`akymic-app-template`)
- `src/components/ui/data-grid/` — 4 files (copied from DS)
- `src/design-system/data-grid.css` — theme CSS copy
- `src/app/globals.css` — CSS import
- `src/app/paper-playground/page.tsx` — DataGrid demo section
- `package.json` — AG Grid deps

## Verification

- [ ] Light mode: headers match `--muted`, text readable, borders consistent
- [ ] Dark mode: all colors invert via `.dark` cascade
- [ ] Focus ring: visible on cells/headers via `--ring`
- [ ] No new tokens introduced
- [ ] Non-DataGrid consumers: zero size increase
- [ ] `prefers-reduced-motion`: transition duration collapsed
- [ ] Docs site: `/components/data-grid` renders with live grids
