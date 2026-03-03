# AKYD-015 — Accessibility documentation pass (Gap 3)

**Date:** 2026-03-03
**Type:** Documentation only — no code changes
**Scope:** Button, Input, Textarea, Dialog, Drawer, Toast, Calendar, Table

---

## Summary

Adds a dedicated `## Accessibility` section to `docs/components.md` covering keyboard navigation maps and ARIA annotations for all 8 stable interactive components. Closes Gap 3 from the gap-analysis.

Also surfaces 5 known gaps for future resolution (see below).

---

## What Was Documented

| Component | Key behaviours confirmed |
|-----------|--------------------------|
| Button | Native `<button>`, focus ring, `disabled`, Enter/Space |
| Input | Native `<input>`, focus ring, `disabled`; `aria-invalid` gap noted |
| Textarea | Same profile as Input |
| Dialog | `role="dialog"`, `aria-modal`, focus trap (Tab/Shift+Tab), Escape, overlay click, body scroll lock |
| Drawer | Same as Dialog; all four sides |
| Toast | `role="status"`, `aria-live="polite"`, dismiss button; hover-pause gap noted |
| Calendar | `tabIndex` on cells, `aria-label` (full date), `aria-pressed`, Enter/Space; arrow-nav and grid-role gaps noted |
| Table | Semantic HTML confirmed; sortable `<th>` keyboard gap documented |

---

## Known Gaps Surfaced

| # | Component | Gap | Severity |
|---|-----------|-----|----------|
| A | Input / Textarea | `aria-invalid` not set internally on `error` prop | Medium |
| B | Dialog / Drawer | Focus not returned to trigger on close | Medium |
| C | Toast | Auto-dismiss does not pause on hover/focus | Low |
| D | Calendar | No arrow key navigation; no `role="grid"` / `role="gridcell"` | High (planned Phase 2) |
| E | Table `TableHead` | Sortable columns not keyboard accessible; no `aria-sort` | High (planned next) |

Gap E (Table sorting) is the highest-priority actionable item — it's a small code change in `table.tsx`. Recommended as the next implementation task.

---

## Files Changed

| File | Change |
|------|--------|
| `docs/components.md` | +`## Accessibility` section |
| `docs/gap-analysis.md` | Gap 3 marked closed |
| `docs/changes/2026-03-03-accessibility-docs.md` | This file |
