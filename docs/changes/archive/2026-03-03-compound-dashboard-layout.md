# 2026-03-03 — Compound Elements: Dashboard Layout (Phase 1)

## Summary

Implements the first **Compound Elements** category in `packages/ui`. Introduces a responsive 12-column CSS Grid layout system (`DashboardLayout`) with a self-managing panel primitive (`DashboardPanel`) and full-layout skeleton placeholder (`DashboardSkeleton`). Also promotes three previously app-template-only primitives to `packages/ui`: `Badge`, `Skeleton`/`Spinner`, and `EmptyState`.

---

## New Components

### Promoted to `packages/ui`

| Component | File | Notes |
|-----------|------|-------|
| `Badge` | `packages/ui/src/badge.tsx` | 6 variants × 2 sizes |
| `Skeleton` | `packages/ui/src/skeleton.tsx` | `animate` prop; `aria-hidden` |
| `Spinner` | `packages/ui/src/skeleton.tsx` | `role="status"`, 3 sizes |
| `EmptyState` | `packages/ui/src/empty-state.tsx` | icon + title + description + action |

### New compound elements

| Component | File | Notes |
|-----------|------|-------|
| `DashboardLayout` | `packages/ui/src/dashboard-layout.tsx` | 12-col CSS Grid, responsive collapse, optional header |
| `DashboardPanel` | `packages/ui/src/dashboard-panel.tsx` | Panel with header anatomy, loading/empty states |
| `DashboardSkeleton` | `packages/ui/src/dashboard-skeleton.tsx` | Grid-matched loading placeholder |

---

## API Reference

### `DashboardLayout`

```tsx
<DashboardLayout
  title="Engineering Metrics"
  description="Last 30 days · All teams"
  columns={12}
  gap="md"
  loading={isLoading}
  skeletonCount={4}
  headerActions={<Button>Export</Button>}
>
  {panels}
</DashboardLayout>
```

| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | — |
| `description` | `string` | — |
| `columns` | `4 \| 6 \| 8 \| 12` | `12` |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` |
| `loading` | `boolean` | `false` |
| `skeletonCount` | `number` | `4` |
| `headerActions` | `ReactNode` | — |
| `className` | `string` | — |

Gap values: `sm`=12px, `md`=16px, `lg`=24px.

Responsive: below 768px, all panels collapse to 1 column regardless of `colSpan`.

### `DashboardPanel`

```tsx
<DashboardPanel
  colSpan={4}
  title="Open pull requests"
  subtitle="Last 7 days"
  badge={{ label: "Beta", variant: "secondary" }}
  info="Reviews open more than 24h without a response."
  actions={[
    { label: "Download CSV", onSelect: handleDownload },
    { label: "Remove", onSelect: handleRemove, variant: "destructive" },
  ]}
  loading={isLoading}
  loadingHeight="8rem"
>
  <StatNumber value={42} />
</DashboardPanel>
```

| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `subtitle` | `string` | — |
| `icon` | `ReactNode` | — |
| `badge` | `{ label: string; variant?: BadgeVariant }` | — |
| `info` | `string \| ReactNode` | — |
| `actions` | `DashboardPanelAction[]` | `[]` |
| `filters` | `ReactNode` | — |
| `loading` | `boolean` | `false` |
| `loadingHeight` | `number \| string` | `"10rem"` |
| `empty` | `boolean` | `false` |
| `emptyState` | `ReactNode` | — |
| `colSpan` | `number` (1–12) | `12` |
| `rowSpan` | `number` (1–6) | `1` |
| `className` | `string` | — |
| `bodyClassName` | `string` | — |

### `DashboardSkeleton`

| Prop | Type | Default |
|------|------|---------|
| `count` | `number` | `4` |
| `columns` | `4 \| 6 \| 8 \| 12` | `12` |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` |
| `className` | `string` | — |

---

## Token Mapping

No new tokens required. All compound elements use existing tokens:

| Token | Role |
|-------|------|
| `--card`, `--card-foreground` | Panel surface + text |
| `--border` | Panel border + filter separator |
| `--shadow-resting` | Panel elevation |
| `--muted-foreground` | Subtitle, icon, info/actions buttons |
| `--accent`, `--accent-foreground` | Actions menu item hover |
| `--popover`, `--popover-foreground` | Info tooltip surface |
| `--muted` | Skeleton block background |
| `--background`, `--foreground` | Layout header title/description |

---

## Responsive Approach

`DashboardLayout` uses an inline `<style>` block scoped to a `useId()`-generated ID to override `gridTemplateColumns` at `max-width: 767px`. This avoids Tailwind purge issues with dynamic column counts (Tailwind cannot generate `grid-cols-{n}` for arbitrary `n` at build time).

```css
/* Generated per instance */
@media (max-width: 767px) {
  #dl-r0 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
}
```

`DashboardPanel` uses `style={{ gridColumn: "span N", gridRow: "span N" }}` inline styles for the same reason.

---

## Accessibility

| Attribute | Component | Notes |
|-----------|-----------|-------|
| `<section aria-label={title}>` | DashboardPanel | Named landmark per panel |
| `aria-busy="true"` on body | DashboardPanel | Set while `loading=true` |
| `role="status"` on empty state | DashboardPanel | Announced politely on content arrival |
| `aria-label="More actions"` | DashboardPanel | Icon-only `⋯` button |
| `aria-label="More information about {title}"` | DashboardPanel | Icon-only `ⓘ` button |
| `focus-visible:ring-2 focus-visible:ring-ring` | DashboardPanel | All header buttons |

---

## Migration Notes

No breaking changes. All new APIs are additive.

**Promoted primitives** (`Badge`, `Skeleton`, `Spinner`, `EmptyState`) remain in `akymic-app-template/src/components/ui/` unchanged. Apps using those local copies continue to work. To migrate:

```diff
- import { Badge } from "@/components/ui/badge";
+ import { Badge } from "@akymic/ui/badge";
  // or
+ import { Badge } from "@akymic/ui";
```

---

## Verification Steps

1. `cd packages/ui && npx tsc --noEmit` — all types resolve
2. Import `DashboardLayout`, `DashboardPanel`, `DashboardSkeleton` from `@akymic/ui` in a consuming app
3. Confirm `loading={true}` renders DashboardSkeleton skeleton panels
4. Confirm `empty={true}` renders EmptyState in panel body with `role="status"`
5. Confirm responsive collapse at viewport < 768px (all panels 1-col)
6. Confirm `actions` dropdown keyboard nav: Tab to `⋯` → Enter → Arrow keys → Escape
7. Confirm `info` tooltip shows on hover and focus of `ⓘ` button
8. Confirm focus rings visible on all header interactive elements in light + dark mode
