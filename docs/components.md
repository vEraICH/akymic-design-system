# Component Inventory

Status legend: `planned` | `in-progress` | `stable` | `deprecated`

---

## Foundations

| Component        | Status  | Notes |
|-----------------|---------|-------|
| Token system    | stable  | See `tokens.md`; includes success + warning tokens (2026-03-02) |
| Radius scale    | stable  | `--radius: 0.75rem` |
| Typography scale | stable  | See `tokens.md#typography-tokens` |
| Spacing scale   | planned | Next iteration |

---

## Interactive Components

| Component  | Status  | Variants | Sizes | States |
|-----------|---------|----------|-------|--------|
| Button    | planned | primary, secondary, ghost, destructive, outline | sm, md, lg | default, hover, active, disabled, focus |
| Input     | planned | default, error | sm, md | default, focus, disabled, error |
| Textarea  | planned | default, error | — | default, focus, disabled, error |
| Select    | planned | default, error | sm, md | default, focus, disabled, error |
| Checkbox  | planned | — | sm, md | unchecked, checked, indeterminate, disabled |
| Radio     | planned | — | sm, md | unchecked, checked, disabled |
| Switch    | planned | — | sm, md | off, on, disabled |

---

## Layout / Containment

| Component  | Status  | Variants | Notes |
|-----------|---------|----------|-------|
| Card      | stable  | default, interactive (via className) | CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| Divider   | stable  | horizontal (plain + labeled), vertical | Uses `--border` |
| Badge     | stable  | default, secondary, destructive, outline, success, warning | sizes: sm, default |

---

## Navigation

| Component      | Status  | Notes |
|---------------|---------|-------|
| Topbar        | stable  | 60px header — title, search, bell, theme toggle, avatar |
| Sidebar       | stable  | 240px — logo, 2 nav sections, user footer, active state via `usePathname` |
| AppShell      | stable  | Opt-in layout wrapper (server component) combining Topbar + Sidebar |
| Breadcrumb    | planned | — |
| Tabs          | planned | — |

---

## Overlay

| Component | Status  | Notes |
|-----------|---------|-------|
| Dialog    | stable  | DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose |
| Drawer    | stable  | Same anatomy as Dialog + `side` prop (right/left/bottom/top) |
| Tooltip   | planned | Uses `--popover` |
| Dropdown  | planned | Uses `--popover`, `--accent` for hover |

---

## Feedback

| Component    | Status  | Variants |
|-------------|---------|----------|
| Alert        | stable  | default, info, success, warning, destructive |
| Toast        | stable  | default, info, success, warning, destructive |
| Empty state  | stable  | — |
| Loading / Skeleton | stable | spinner (sm/default/lg), skeleton (block) |

---

## Data Display

| Component  | Status  | Notes |
|-----------|---------|-------|
| Table     | stable  | TableHeader, TableBody (striped prop), TableRow, TableHead (sortable), TableCell |
| Pagination | stable  | page / pageCount / onPageChange |
| FilterBar  | stable  | search input with icon |

---

---

## Accessibility

Keyboard maps and ARIA notes for all interactive stable components.
Legend: ✅ implemented · ⚠️ partial · ❌ not implemented (known gap)

---

### Button

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| Native `<button>` element | ✅ | Receives focus via Tab by default |
| `focus-visible:ring-2 focus-visible:ring-ring` | ✅ | 2px ring on keyboard focus, offset 2px |
| `disabled` attribute | ✅ | `pointer-events-none opacity-50`; excluded from tab order |
| Enter / Space to activate | ✅ | Browser native for `<button>` |

**ARIA:** No custom ARIA needed. Callers should pass `aria-label` when button content is icon-only.

---

### Input

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| Native `<input>` element | ✅ | Focusable, Tab order, type-specific behaviour |
| `focus-visible:ring-2 focus-visible:ring-ring` | ✅ | Ring on focus |
| `disabled` attribute | ✅ | Excluded from tab order |
| `aria-invalid` on error | ✅ | Automatically set to `"true"` when `error` prop is true |

**Callers should** add `aria-describedby` pointing to the adjacent error message element for full WCAG compliance.

---

### Textarea

Same accessibility profile as Input. `aria-invalid` is also wired to the `error` prop.

---

### Dialog

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `role="dialog"` | ✅ | On the panel element |
| `aria-modal="true"` | ✅ | Signals modal to assistive tech |
| Focus trap (Tab / Shift+Tab) | ✅ | `useFocusTrap` — cycles through all focusable children |
| Focus on open | ✅ | First focusable element receives focus on mount |
| Escape to close | ✅ | `keydown` listener on `document` while open |
| Overlay click to close | ✅ | `onClick` on backdrop div |
| Close button `aria-label="Close"` | ✅ | Default X button |
| Body scroll lock | ✅ | `useLockBodyScroll` active while open |
| `aria-labelledby` | ⚠️ | `DialogTitle` renders an `<h2>` but the panel does not auto-wire `aria-labelledby`. Callers should add `aria-labelledby` pointing to the title's `id` for strict compliance. |
| Return focus on close | ✅ | `document.activeElement` captured on open; restored after close animation completes |

**Tab cycle:** Tab → next focusable → ... → last focusable → wraps to first. Shift+Tab reverses.

---

### Drawer

Same accessibility profile as Dialog (`role="dialog"`, `aria-modal`, focus trap, Escape, overlay click, scroll lock).

Additional: Escape closes regardless of which `side` the drawer is anchored to.

Same `aria-labelledby` and return-focus gaps as Dialog.

---

### Toast

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `role="status"` | ✅ | On each toast card |
| `aria-live="polite"` | ✅ | Screen readers announce new toasts without interrupting |
| Dismiss button `aria-label="Dismiss"` | ✅ | Keyboard focusable, ring visible |
| Auto-dismiss (4s default) | ✅ | Duration configurable; `duration: 0` for persistent |
| Max 5 stacked | ✅ | Oldest removed when limit exceeded |
| Pause on hover/focus | ✅ | `onMouseEnter`/`onMouseLeave` + `onFocus`/`onBlur` set a `paused` state; auto-dismiss timer restarts from full duration on unpause |

**Announcement:** `aria-live="polite"` means the toast text is read after the user's current interaction completes, not mid-sentence. Use `aria-live="assertive"` (via a custom wrapper) only for critical errors.

---

### Calendar

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| Day cells focusable | ✅ | Roving tabindex — focused/initial date has `tabIndex={0}`, all others `-1` |
| `aria-label` on day cells | ✅ | Full date string: `"March 15, 2026"` |
| `aria-selected` on day cells | ✅ | Reflects selected state (`aria-pressed` on mini-month buttons) |
| Enter / Space to select | ✅ | `onKeyDown` handler on day cells |
| Prev/Next month buttons `aria-label` | ✅ | `"Previous month"` / `"Next month"` |
| Arrow key navigation between days | ✅ | Left/Right (±1 day), Up/Down (±7 days), PageUp/Down (±1 month), Home/End (first/last of month); cross-month nav supported |
| `role="grid"` / `role="gridcell"` | ✅ | `role="grid"` on grid container, `role="gridcell"` on each day cell, `role="columnheader"` on weekday headers |

**Note:** Grid uses flat CSS Grid layout (no `role="row"` wrappers on data rows) — avoids known browser bug where `display: contents` strips ARIA roles from row wrappers. All dates are reachable via arrow keys and Tab.

---

### Table (sortable headers)

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| Native `<table>` / `<th>` / `<td>` | ✅ | Semantic HTML; screen readers announce headers |
| `<th>` sort click | ✅ | Mouse click supported |
| Sortable `<th>` keyboard access | ✅ | `tabIndex={0}`, `onKeyDown` (Enter/Space → `onSort`), focus ring via `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring` |
| Sort state announced | ✅ | `aria-sort="ascending"` / `"descending"` / `"none"` on `<th>` when `sortable` is true |

---

## Generation Order

Per CLAUDE.md roadmap:
1. Foundations (tokens, radius, type scale) — **stable**
2. Buttons — **stable**
3. Inputs (text, textarea, select) + validation — **stable**
4. Navigation shell — **stable** (2026-03-01)
5. Cards + dividers + badges — **stable** (2026-03-02)
6. Tables + filters + pagination — **stable** (2026-03-02)
7. Dialogs + drawers — **stable** (2026-03-02)
8. Toast/alerts + empty/loading states — **stable** (2026-03-02)
9. Success + warning intent tokens — **stable** (2026-03-02)
