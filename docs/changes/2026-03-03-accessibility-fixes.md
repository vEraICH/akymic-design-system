# AKYD-016 — Accessibility Fixes: All 5 Known Gaps Closed (2026-03-03)

## Summary

Five keyboard/ARIA gaps identified during the Gap 3 accessibility audit (AKYD-015) have been fixed in code. All previously ❌ rows in `docs/components.md` are now ✅.

---

## Fixes

### Gap A — `aria-invalid` not wired in Input / Textarea

**Files:** `input.tsx`, `textarea.tsx`

**Before:** `aria-invalid` was absent; screen readers could not announce validation errors.
**After:** `aria-invalid={error ? "true" : undefined}` added before the `{...props}` spread so callers cannot accidentally override it.

---

### Gap B — Dialog / Drawer did not return focus to trigger on close

**Files:** `dialog.tsx`, `drawer.tsx`

**Before:** Focus was lost to `<body>` after closing a modal, breaking the keyboard flow.
**After:** `prevFocusRef` captures `document.activeElement` on open. On close, `prev.focus()` is called after the exit animation completes (200 ms for Dialog, 300 ms for Drawer) to avoid race conditions with the unmount.

---

### Gap C — Toast auto-dismiss did not pause on hover / focus

**File:** `toast.tsx` (`ToastCard` component)

**Before:** The 4 s auto-dismiss timer ran unconditionally; keyboard / pointer users who needed extra reading time would have the toast dismissed mid-read.
**After:** `paused` state added to `ToastCard`. `onMouseEnter`/`onMouseLeave` and `onFocus`/`onBlur` toggle it. The `useEffect` timer depends on `paused`, so it clears immediately on pause and restarts from the full configured duration on unpause.

**Trade-off:** Timer resets to full duration on unpause (rather than resuming from remaining time). This is simpler and ensures users always get the full configured read time after interacting with the toast.

---

### Gap D — Calendar lacked arrow key navigation and ARIA grid roles

**Files:** `calendar-utils.ts`, `calendar-types.ts`, `calendar-day-cell.tsx`, `calendar-month-grid.tsx`, `calendar.tsx`

**Before:** Calendar used `role="button"` on day cells with no arrow-key handling. All dates were reachable only via Tab. No `role="grid"` / `role="gridcell"` structure.

**After:**
- `addDays(date, delta)` utility added to `calendar-utils.ts`.
- `CalendarMonthGrid` now manages a roving tabindex: only the focused or initial anchor date receives `tabIndex={0}`; all others receive `-1`.
- `handleGridKeyDown` on the grid container handles:
  - `ArrowLeft` / `ArrowRight` — ±1 day
  - `ArrowUp` / `ArrowDown` — ±7 days
  - `PageUp` / `PageDown` — ±1 month
  - `Home` / `End` — first / last day of current month
- **Cross-month navigation:** When the target date is not in the current month view, `pendingFocusRef` stores the ISO date string and `onMonthChange` triggers a month transition. A `useEffect([currentDate])` then queries and focuses the newly rendered cell.
- `role="grid"` on the grid container, `role="gridcell"` on each day cell, `role="columnheader"` on weekday header cells.
- `aria-pressed` replaced with `aria-selected` on non-mini day cells (correct role for grid cells).
- Mini-month buttons retain `aria-pressed` (correct for toggle buttons).

**Architecture note:** Row wrappers do NOT use `role="row"` because the grid uses `display: grid` with flat children. Adding `display: contents` to `role="row"` divs would strip their ARIA roles in several browsers. The flat structure is compliant: `role="grid"` > `role="gridcell"` is valid without explicit `role="row"` ancestors.

---

### Gap E — Sortable `<th>` was not keyboard accessible and lacked `aria-sort`

**File:** `table.tsx` (`TableHead` component)

**Before:** Sortable headers had `onClick` only. Keyboard users could not focus or activate them. Screen readers received no sort direction information.

**After:** When `sortable` is true:
- `tabIndex={0}` — header enters tab order.
- `onKeyDown` — Enter and Space trigger `onSort()`.
- `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring` — visible focus ring.
- `aria-sort="ascending"` / `"descending"` / `"none"` — screen readers can announce sort state.

---

## Migration Notes

No breaking changes. All additions are additive or fix incorrect/missing attributes.

Callers of `TableHead` who pass `sortable` will now see their header receive `tabIndex`, `aria-sort`, and keyboard handlers automatically — no API changes required.

---

## Verification

1. `npx tsc --noEmit` — passes
2. `npm run build` — passes
3. Input / Textarea: inspect element with error prop → `aria-invalid="true"` present
4. Dialog / Drawer: open → close → verify trigger element regains focus
5. Toast: hover or focus a toast → auto-dismiss pauses; move away → it resumes
6. Calendar: Tab into grid → arrow keys navigate days → PageUp/Down changes month → focus follows
7. Table: Tab to a sortable `<th>` → Enter/Space sorts → `aria-sort` attribute updates
