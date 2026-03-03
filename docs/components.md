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
| Checkbox  | stable  | — | sm, md | unchecked, checked, indeterminate, disabled |
| Radio     | stable  | — | sm, md | unchecked, checked, disabled |
| Switch    | stable  | — | sm, md | off, on, disabled |

---

## Layout / Containment

| Component  | Status  | Variants | Notes |
|-----------|---------|----------|-------|
| Card      | stable  | default, interactive (via className) | CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| Divider   | stable  | horizontal (plain + labeled), vertical | Uses `--border` |
| Badge     | stable  | default, secondary, destructive, outline, success, warning | sizes: sm, default; promoted to `packages/ui` (2026-03-03) |

---

## Navigation

| Component      | Status  | Notes |
|---------------|---------|-------|
| Topbar        | stable  | 60px header — title, search, bell, theme toggle, avatar |
| Sidebar       | stable  | 240px — logo, 2 nav sections, user footer, active state via `usePathname` |
| AppShell      | stable  | Opt-in layout wrapper (server component) combining Topbar + Sidebar |
| Breadcrumb    | stable  | Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbEllipsis, BreadcrumbList |
| Tabs          | stable  | Tabs, TabsList, TabsTrigger, TabsContent; variants: line, pill |

---

## Overlay

| Component | Status  | Notes |
|-----------|---------|-------|
| Dialog    | stable  | DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose |
| Drawer    | stable  | Same anatomy as Dialog + `side` prop (right/left/bottom/top) |
| Tooltip   | stable  | Portal-based; placement: top/bottom/left/right; delay prop; viewport-aware flip |
| Dropdown  | stable  | Portal-based; DropdownMenu, DropdownItem, DropdownSeparator, DropdownLabel; keyboard nav |

---

## Feedback

| Component    | Status  | Variants |
|-------------|---------|----------|
| Alert        | stable  | default, info, success, warning, destructive |
| Toast        | stable  | default, info, success, warning, destructive |
| Empty state  | stable  | — | promoted to `packages/ui` (2026-03-03) |
| Loading / Skeleton | stable | spinner (sm/default/lg), skeleton (block) | promoted to `packages/ui` (2026-03-03) |

---

## Data Display

| Component  | Status  | Notes |
|-----------|---------|-------|
| Table     | stable  | TableHeader, TableBody (striped prop), TableRow, TableHead (sortable), TableCell |
| Pagination | stable  | page / pageCount / onPageChange |
| FilterBar  | stable  | search input with icon |

---

---

## Compound Elements

Compound elements are higher-order components that compose multiple primitives into opinionated, reusable layout patterns. They represent full UI patterns rather than atoms or molecules, and are the primary vehicle for the DS's **dashboard layout** concept.

See `docs/compound-elements.md` for full specs, anatomy, and API.

| Component | Status | Notes |
|-----------|--------|-------|
| DashboardLayout | stable | 12-col CSS Grid container; responsive collapse (→1 col below 768px); gap + column control; `"use client"` |
| DashboardPanel | stable | Panel primitive: header (title/icon/badge/info/actions) + optional subtitle/filters + body + loading/empty states; `"use client"` |
| DashboardSkeleton | stable | Full-layout loading placeholder; matches panel grid positions |

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

### Checkbox

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `role="checkbox"` | ✅ | On `<input type="checkbox">` |
| `aria-checked="mixed"` | ✅ | Set when `indeterminate` prop is true |
| `indeterminate` state | ✅ | Wired via `inputRef.current.indeterminate` (JS only, not HTML attribute) |
| `disabled` attribute | ✅ | `pointer-events-none opacity-50` |
| Space to toggle | ✅ | Browser native for `<input type="checkbox">` |
| `focus-visible` ring | ✅ | `focus-visible:ring-2 focus-visible:ring-ring` |

---

### Radio / RadioGroup

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `role="radiogroup"` | ✅ | On `<RadioGroup>` wrapper |
| `role="radio"` | ✅ | On `<input type="radio">` |
| `aria-checked` | ✅ | Reflects `checked` state |
| Arrow key navigation | ✅ | Up/Left → previous, Down/Right → next; wraps; skips disabled |
| Roving tabindex | ✅ | Focused/selected item has `tabIndex=0`; all others `-1` |
| `focus-visible` ring | ✅ | `focus-visible:ring-2 focus-visible:ring-ring` |

---

### Switch

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `role="switch"` | ✅ | On `<button>` element |
| `aria-checked` | ✅ | Reflects checked state |
| Space / Enter to toggle | ✅ | Handled in `onKeyDown` |
| `disabled` attribute | ✅ | `pointer-events-none opacity-50` |
| `focus-visible` ring | ✅ | `focus-visible:ring-2 focus-visible:ring-ring` |
| Slide animation | ✅ | `translate-x` transition 200ms |

---

### Tabs

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `role="tablist"` | ✅ | On `<TabsList>` |
| `role="tab"` | ✅ | On `<TabsTrigger>` |
| `role="tabpanel"` | ✅ | On `<TabsContent>` |
| `aria-selected` | ✅ | Reflects active state on each trigger |
| `aria-controls` | ✅ | Each trigger points to its panel id |
| `aria-labelledby` | ✅ | Each panel points to its trigger id |
| Arrow keys (Left/Right) | ✅ | Navigate between enabled triggers |
| Home / End | ✅ | Jump to first/last trigger |
| Roving tabindex | ✅ | Active trigger has `tabIndex=0`; others `-1` |
| `disabled` triggers | ✅ | Skipped in keyboard nav |

---

### Breadcrumb

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `<nav aria-label="Breadcrumb">` | ✅ | Semantic landmark |
| `<ol>` list structure | ✅ | Screen readers announce item count |
| `aria-current="page"` | ✅ | On the current/last `BreadcrumbLink` |
| `aria-hidden` on separators | ✅ | Chevron SVG is decorative |
| Focus ring on links | ✅ | `focus-visible:ring-2 focus-visible:ring-ring` |

---

### Tooltip

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `role="tooltip"` | ✅ | On the tooltip element |
| `aria-describedby` | ✅ | Injected onto trigger when visible |
| Show on hover + focus | ✅ | `onMouseEnter` + `onFocus` with configurable delay |
| Hide on leave + blur | ✅ | `onMouseLeave` + `onBlur` |
| Portal render | ✅ | `createPortal(document.body)` — no z-index stacking issues |
| Viewport-aware placement | ✅ | Flips axis when tooltip would overflow viewport |

---

### Dropdown

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `role="menu"` | ✅ | On menu container |
| `role="menuitem"` | ✅ | On `<DropdownItem>` |
| `role="separator"` | ✅ | On `<DropdownSeparator>` |
| `aria-haspopup="menu"` | ✅ | Injected onto trigger |
| `aria-expanded` | ✅ | Reflects open state on trigger |
| Arrow keys (Up/Down) | ✅ | Navigate between enabled items |
| Home / End | ✅ | Jump to first/last item |
| Escape to close | ✅ | Returns focus to trigger |
| Tab to close | ✅ | Closes without stealing focus |
| Click outside to close | ✅ | `pointerdown` listener on document |
| Auto-focus first item | ✅ | On open via `requestAnimationFrame` |
| Enter / Space to activate | ✅ | `onKeyDown` in `DropdownItem` |
| Portal render | ✅ | `createPortal(document.body)` |

---

### DashboardPanel

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `<section>` element per panel | ✅ | Each panel is a named landmark |
| `aria-label` on each `<section>` | ✅ | Uses the `title` prop value |
| `aria-busy="true"` on body when loading | ✅ | Set on body wrapper while `loading=true` |
| `aria-label="More actions"` on `⋯` button | ✅ | Icon-only button has explicit label |
| Info button `aria-label` | ✅ | `"More information about [title]"` |
| `role="status"` on empty state | ✅ | Announced politely when content arrives |
| Focus ring on header interactive elements | ✅ | All buttons: `focus-visible:ring-2 focus-visible:ring-ring` |

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
10. Checkbox, Radio, Switch, Tabs, Breadcrumb, Tooltip, Dropdown — **stable** (2026-03-03)
11. Compound elements — DashboardLayout + DashboardPanel + DashboardSkeleton — **stable** (2026-03-03; see `docs/compound-elements.md`)
