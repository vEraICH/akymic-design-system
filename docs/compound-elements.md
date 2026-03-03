# Compound Elements

Compound elements are higher-order DS components that compose multiple primitives (Card, Badge, Tooltip, Dropdown, Skeleton) into opinionated, reusable layout patterns. Unlike atoms or molecules, compound elements encode a full UI pattern — layout decisions, loading states, and accessibility roles are built in.

---

## What Counts as a Compound Element

A component qualifies as a compound element when it:

1. **Composes 3+ primitives** internally with non-trivial coordination
2. **Encodes a layout pattern** — not just wrapping, but opinionated arrangement
3. **Manages its own loading/empty states** without the consumer wiring them
4. **Has a named slot model** — header, body, footer, filters are explicit named zones

Simple wrappers (e.g. `CardHeader`) do not qualify. Dashboard panels, data sections with filter + table + pagination, and form sections with grouped fields do.

---

## Roadmap

| Element | Status | Phase |
|---------|--------|-------|
| DashboardLayout | planned | Phase 1 |
| DashboardPanel | planned | Phase 1 |
| DashboardSkeleton | planned | Phase 1 |
| DataSection _(table + filter + pagination)_ | future | Phase 2 |
| FormSection _(grouped fields + submit)_ | future | Phase 2 |
| PageHeader _(breadcrumb + title + actions)_ | future | Phase 2 |

This document covers **Phase 1: Dashboard Layout**.

---

## Phase 1 — Dashboard Layout

### Concept

A dashboard layout is a fixed or configurable grid of **panels**, where each panel contains one data visualization or metric. Inspired by GitLab's `GlDashboardLayout` + `GlDashboardPanel` pattern, adapted to Akymic's zero-dep, token-first philosophy.

**Key principles (adapted from GitLab's guidelines):**
- One visualization per panel — no multi-chart panels
- Panel title must be a concise sentence fragment: `"Pending reviews this week"` not `"Pending Reviews - Last 30 Days"`
- Panel-level filters are optional and minimal — page-level filters are preferred
- Loading state is built in — consumers pass `loading` prop, not their own skeleton

---

### Phase Boundary

| Feature | Phase 1 | Phase 2 (deferred) |
|---------|---------|-------------------|
| Static CSS Grid layout | ✅ | — |
| `colSpan` / `rowSpan` per panel | ✅ | — |
| Responsive collapse (→ 1 col at `sm`) | ✅ | — |
| Panel header (title, icon, badge, info, actions) | ✅ | — |
| Panel loading state (Skeleton) | ✅ | — |
| Panel empty state | ✅ | — |
| DashboardSkeleton (full layout placeholder) | ✅ | — |
| Drag-to-reorder | ❌ | Phase 2 |
| Resize handles | ❌ | Phase 2 |
| Persisted layout (user-configurable) | ❌ | Phase 2 |

---

## Component Specs

---

### `DashboardLayout`

**Purpose:** Responsive 12-column CSS Grid container. Manages gap, column count, and a title/description header above the grid.

**File:** `packages/ui/src/dashboard-layout.tsx`

#### Anatomy

```
┌─────────────────────────────────────────────────────┐
│  [title]                         [header actions?]  │  ← DashboardLayoutHeader (optional)
│  [description]                                      │
├─────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌───────────────┐   │
│  │  Panel A  │  │  Panel B  │  │    Panel C    │   │  ← CSS Grid
│  └───────────┘  └───────────┘  └───────────────┘   │
│  ┌─────────────────────────────────────────────┐    │
│  │               Panel D (full width)          │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `title` | `string` | — | Optional layout-level heading |
| `description` | `string` | — | Optional subtext below title |
| `columns` | `4 \| 6 \| 8 \| 12` | `12` | Grid column count |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | Gap between panels (`sm`=12px, `md`=16px, `lg`=24px) |
| `loading` | `boolean` | `false` | When true, renders `DashboardSkeleton` instead of children |
| `skeletonCount` | `number` | `4` | Number of skeleton cards when `loading` is true |
| `className` | `string` | — | — |
| `children` | `ReactNode` | — | `DashboardPanel` instances |

#### Responsive behaviour

- `columns` → full column count at `md+`
- `sm` breakpoint → all panels collapse to 1 column, `colSpan` ignored

#### Token mapping

| Token | Role |
|-------|------|
| `--background` | Layout background |
| `--foreground` | Title text |
| `--muted-foreground` | Description text |

#### Usage

```tsx
<DashboardLayout
  title="Engineering Metrics"
  description="Last 30 days · All teams"
  columns={12}
  gap="md"
>
  <DashboardPanel colSpan={4} title="Open PRs" ...>...</DashboardPanel>
  <DashboardPanel colSpan={4} title="Review time p50" ...>...</DashboardPanel>
  <DashboardPanel colSpan={4} title="Merge rate" ...>...</DashboardPanel>
  <DashboardPanel colSpan={12} title="Activity over time" ...>...</DashboardPanel>
</DashboardLayout>
```

---

### `DashboardPanel`

**Purpose:** Individual data panel. Composes Card + Badge + Tooltip + DropdownMenu + Skeleton. Manages its own header anatomy, loading state, and empty state.

**File:** `packages/ui/src/dashboard-panel.tsx`

#### Anatomy

```
┌───────────────────────────────────────────────────┐
│  [icon?] Title text       [badge?] [info?]  [⋯]  │  ← Header
│  Subtitle · filter range                          │  ← Subtitle (optional)
├───────────────────────────────────────────────────┤
│  [filters bar]                                    │  ← Filters slot (optional)
├───────────────────────────────────────────────────┤
│                                                   │
│             Body / visualization                  │  ← Body slot (children)
│                                                   │
└───────────────────────────────────────────────────┘
```

**Header zones (left → right):**
1. `icon` — optional leading icon (16px, `text-muted-foreground`)
2. `title` — required, `text-sm font-medium`
3. `badge` — optional `<Badge>` (use for Beta/Experiment labelling)
4. `info` — optional info icon that reveals a `<Tooltip>` on hover/focus
5. Actions menu — optional `<DropdownMenu>` triggered by `⋯` (More) icon button; hidden when `actions` is empty

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `title` | `string` | required | Panel heading; keep to one sentence fragment |
| `subtitle` | `string` | — | Data range or scope descriptor below the title |
| `icon` | `ReactNode` | — | Leading icon in header, 16×16, decorative (`aria-hidden`) |
| `badge` | `{ label: string; variant?: BadgeVariant }` | — | Rendered via `<Badge>` after title |
| `info` | `string \| ReactNode` | — | Content for the info tooltip. Triggers `<Tooltip>` on an `ⓘ` icon button. |
| `actions` | `DashboardPanelAction[]` | `[]` | Items for the `⋯` dropdown. Empty array hides the menu. |
| `filters` | `ReactNode` | — | Rendered in the filters zone between header and body. State managed by caller. |
| `loading` | `boolean` | `false` | Renders a `<Skeleton>` block in the body instead of children |
| `loadingHeight` | `number \| string` | `"10rem"` | Height of the skeleton block when `loading` is true |
| `empty` | `boolean` | `false` | When true and not loading, renders the `emptyState` slot |
| `emptyState` | `ReactNode` | — | Custom empty state; falls back to DS `<EmptyState>` with generic message |
| `colSpan` | `1–12` | `12` | CSS Grid column span in the parent `DashboardLayout` |
| `rowSpan` | `1–6` | `1` | CSS Grid row span |
| `className` | `string` | — | Applied to the outer card container |
| `bodyClassName` | `string` | — | Applied to the body/visualization wrapper |
| `children` | `ReactNode` | — | The visualization or content |

#### `DashboardPanelAction` type

```ts
interface DashboardPanelAction {
  label: string;
  onSelect: () => void;
  variant?: "default" | "destructive";
  icon?: ReactNode;
  disabled?: boolean;
}
```

#### States

| State | Behaviour |
|-------|-----------|
| Default | Header + body visible |
| Loading | Body replaced by `<Skeleton>` at `loadingHeight`; header still visible |
| Empty | Body replaced by `emptyState` (or default `<EmptyState>`); header still visible |
| Loading + no title yet | Entire header replaced by a skeleton line (future Phase 2 option) |

#### Token mapping

| Token | Role |
|-------|------|
| `--card`, `--card-foreground` | Panel surface + text |
| `--border` | Panel border |
| `--shadow-resting` | Panel elevation (same as Card) |
| `--muted-foreground` | Subtitle, icon, info icon |
| `--accent`, `--accent-foreground` | Actions menu item hover |
| `--popover`, `--popover-foreground` | Info tooltip surface |
| `--primary` | Badge variant (if `primary` used) |

No new tokens required.

#### Usage examples

**Minimal:**
```tsx
<DashboardPanel colSpan={4} title="Open pull requests">
  <StatNumber value={42} />
</DashboardPanel>
```

**Full header:**
```tsx
<DashboardPanel
  colSpan={6}
  title="Pending reviews this week"
  subtitle="Last 7 days · Excluding bots"
  badge={{ label: "Beta", variant: "secondary" }}
  info="Reviews that have been open for more than 24 hours without a response."
  actions={[
    { label: "Download CSV", onSelect: handleDownload },
    { label: "Edit panel", onSelect: handleEdit },
    { label: "Remove", onSelect: handleRemove, variant: "destructive" },
  ]}
>
  <LineChart data={data} />
</DashboardPanel>
```

**Loading state:**
```tsx
<DashboardPanel colSpan={4} title="Merge rate" loading={isLoading} loadingHeight="8rem">
  <BarChart data={data} />
</DashboardPanel>
```

**With filters:**
```tsx
<DashboardPanel
  colSpan={12}
  title="Activity over time"
  filters={
    <Select value={range} onChange={setRange} options={rangeOptions} />
  }
>
  <TimelineChart data={data} />
</DashboardPanel>
```

---

### `DashboardSkeleton`

**Purpose:** Full-layout loading placeholder that mirrors a grid of panels. Used when the entire dashboard is loading before any panel titles are known.

**File:** `packages/ui/src/dashboard-skeleton.tsx`

#### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `count` | `number` | `4` | Number of skeleton panels to render |
| `columns` | `4 \| 6 \| 8 \| 12` | `12` | Must match the target `DashboardLayout` |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | Must match the target `DashboardLayout` |
| `className` | `string` | — | — |

Skeleton panels use a default `colSpan` of 4 for a 12-column grid (3-up), 3 for 6-column (2-up), and 12 for 4-column (1-up). This gives a plausible pre-load appearance without knowing the actual panel layout.

---

## Accessibility

| Attribute / Behaviour | Status | Notes |
|-----------------------|--------|-------|
| `<section>` element per panel | planned | Gives each panel a landmark for AT |
| `aria-label` on each panel `<section>` | planned | Uses the `title` prop value |
| `aria-busy="true"` on body when loading | planned | Announces loading state to screen readers |
| `aria-label="More actions"` on `⋯` button | planned | Icon-only button needs explicit label |
| Info icon button `aria-label` | planned | `"More information about [title]"` |
| Focus ring on header interactive elements | planned | All buttons: `focus-visible:ring-2 focus-visible:ring-ring` |
| `role="status"` on empty state | planned | Announced politely when content arrives |

---

## File Plan

```
packages/ui/src/
  dashboard-layout.tsx     — DashboardLayout + DashboardLayoutHeader
  dashboard-panel.tsx      — DashboardPanel
  dashboard-skeleton.tsx   — DashboardSkeleton
```

All three exported from `packages/ui/src/index.ts`.

---

## Implementation Notes

### CSS Grid approach
`DashboardLayout` renders a `<div>` with:
```css
display: grid;
grid-template-columns: repeat({columns}, minmax(0, 1fr));
gap: {gap};
```
Each `DashboardPanel` applies `grid-column: span {colSpan}` and `grid-row: span {rowSpan}` inline styles (or Tailwind `col-span-*` classes for known values).

Responsive collapse is via a Tailwind `sm:grid-cols-1` override — all `colSpan` values are ignored below `sm`.

### No new dependencies
- Info tooltip → existing `<Tooltip>` from `packages/ui/src/tooltip.tsx`
- Actions menu → existing `<DropdownMenu>` from `packages/ui/src/dropdown.tsx`
- Badge → existing `<Badge>` (assumed available)
- Skeleton → existing `<Skeleton>` from app-template (or promoted to `packages/ui`)
- Empty state → existing `<EmptyState>` from app-template (or promoted)

### Panel title guidance (enforced via prop docs, not code)
- ✅ `"Pending reviews this week"` — sentence fragment, lowercase
- ✅ `"Average time to merge"` — clear metric name
- ❌ `"Open MRs - Last 30 Days"` — avoid dashes + title case
- ❌ `"Showing all open pull requests (excluding drafts)"` — too long

---

## Dependencies on Existing DS Components

| Dependency | Source | Status |
|-----------|--------|--------|
| `Badge` | app-template or packages/ui (to be promoted) | assumed available |
| `Tooltip` | `packages/ui/src/tooltip.tsx` | stable |
| `DropdownMenu` / `DropdownItem` | `packages/ui/src/dropdown.tsx` | stable |
| `Skeleton` | app-template (to be promoted to packages/ui) | assumed available |
| `EmptyState` | app-template (to be promoted to packages/ui) | assumed available |

Promotion of `Skeleton` and `EmptyState` to `packages/ui` should happen in the same iteration as DashboardPanel, since DashboardPanel depends on them directly.

---

## Open Questions (to resolve before implementation)

1. **`Skeleton` + `EmptyState` promotion** — should these move to `packages/ui` in the same PR, or should DashboardPanel import them from a shared path?
   - Assumption: promote both in same iteration.

2. **`Badge` promotion** — Badge is currently app-template only. Promote to `packages/ui` or inline a minimal version?
   - Assumption: promote Badge to `packages/ui` as a dependency.

3. **`colSpan` as Tailwind classes vs inline style** — Tailwind purges dynamic `col-span-{n}` unless safelist is configured.
   - Assumption: use inline `style={{ gridColumn: \`span ${colSpan}\` }}` to avoid purge issues. Document this in implementation notes.

4. **Min panel height** — Should DashboardPanel enforce a `min-h` to prevent zero-height empty panels?
   - Assumption: yes, `min-h-[6rem]` on the body zone.
