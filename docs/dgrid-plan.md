# DataGrid — AG Grid Integration Plan

> **Status:** In progress
> **Task ID:** AKYD-085
> **Date:** 2026-03-04

---

## Why AG Grid?

Akymic's existing `<Table>` is ideal for simple, stateless tabular data (<100 rows). However, production apps frequently need:

- **Virtualization** for 1,000+ row datasets
- **Column resizing, reordering, and pinning**
- **Built-in sorting, filtering, and pagination state**
- **Inline cell editing with validation**
- **Custom cell renderers** (badges, buttons, progress bars)

Building all of this from scratch would take months and produce an inferior result. **AG Grid Community (MIT license)** provides all of the above with full ARIA support and keyboard navigation.

---

## Architecture: Peer Dependency + Token Bridge

### Zero cost for non-users

AG Grid is declared as a **peer dependency** in `@akymic/ui`. Consumers who don't use `<DataGrid>` never install or bundle AG Grid. The main `@akymic/ui` barrel export does NOT include DataGrid — it has its own sub-path export: `@akymic/ui/data-grid`.

### Token bridge (no hardcoded colors)

AG Grid v33+ exposes `--ag-*` CSS custom properties. The Akymic token bridge maps every visual to existing tokens:

| Akymic Token | AG Grid Variable | Purpose |
|---|---|---|
| `--background` | `--ag-background-color` | Grid body bg |
| `--foreground` | `--ag-foreground-color` | Primary text |
| `--card` | `--ag-header-background-color` | Header bg |
| `--muted` | `--ag-chrome-background-color` | Chrome areas |
| `--muted-foreground` | `--ag-secondary-foreground-color` | Subdued text |
| `--border` | `--ag-border-color` | All borders |
| `--primary` | `--ag-accent-color` | Selection accent |
| `--muted` (30%) | `--ag-row-hover-color` | Row hover |
| `--ring` | `--ag-range-selection-border-color` | Focus ring |
| `--font-sans` | `--ag-font-family` | Font family |
| `--text-sm` | `--ag-font-size` | Base font size |
| `--radius` | `--ag-border-radius` | Corner radius |
| `--shadow-resting` | `--ag-card-shadow` | Panel shadows |
| `--destructive` | `--ag-invalid-color` | Validation errors |
| `--duration-fast` | `--ag-transition-duration` | Animations |

**No new tokens required.** Dark mode works automatically — the CSS references `var(--token)` which resolves differently under `.dark {}`.

---

## Table vs DataGrid Decision Framework

| Criterion | Table | DataGrid |
|---|---|---|
| Row count | < 100 | 100+ / needs virtualization |
| State management | Consumer manages all | Grid manages internally |
| Features | Display, simple sort | Resize, inline edit, complex filter |
| Bundle impact | Zero JS overhead | ~150-200KB gzipped (tree-shaken) |
| SSR | Yes (pure HTML) | No (client-only) |
| Dependencies | None | `ag-grid-community`, `ag-grid-react` |

**Rule of thumb:** If your data fits on one screen and sorting is the only interaction, use `<Table>`. For anything more, use `<DataGrid>`.

---

## AG Grid Community (MIT) — Feature Summary

**Free (Community):**
- Client-side + Infinite row models
- Sorting (single/multi), filtering (text/number/date/set), pagination
- Column resizing, reordering, pinning
- Row selection (single/multi/checkbox)
- Cell editing with validation
- Custom cell renderers (React components)
- Column virtualization (100k+ rows)
- Keyboard navigation + full ARIA
- CSS custom property theming
- Modular imports for bundle control

**Enterprise (paid, accessible via `gridOptions` escape hatch):**
- Row grouping + aggregation + pivoting
- Master/detail views
- Server-side row model
- Excel export + clipboard
- Integrated charting
- Tool panels + context menus

---

## Component API

```typescript
interface DataGridProps<TData> {
  columnDefs: ColDef<TData>[];
  rowData: TData[] | null;
  rowSelection?: "single" | "multiple";
  pagination?: boolean;
  paginationPageSize?: number;
  quickFilterText?: string;
  striped?: boolean;
  height?: string | number;        // default "400px"
  loading?: boolean;
  emptyMessage?: string;
  onGridReady?: (event: GridReadyEvent<TData>) => void;
  gridOptions?: Partial<GridOptions<TData>>;  // escape hatch
  className?: string;
}
```

### Design decisions
- `"use client"` — AG Grid is client-only
- Auto-applies `akymicAgTheme` — consumers never configure AG Grid themes
- Modular AG Grid imports for bundle control
- Default column behavior: `sortable: true`, `resizable: true`, `filter: true`
- `gridOptions` escape hatch — advanced users access any AG Grid feature
- Border wrapper: `rounded-lg border border-border overflow-hidden` for consistent DS styling

---

## Verification

1. Light mode — grid headers match Akymic Table muted bg; text readable; borders consistent
2. Dark mode — all colors invert via `.dark` cascade; no hardcoded values leak
3. Focus ring — visible on cells/headers, uses `--ring` token
4. Token names — no new tokens; all AG Grid vars trace to existing Akymic tokens
5. Bundle — non-DataGrid consumers see zero size increase (peer dep pattern)
6. Accessibility — AG Grid's built-in ARIA + keyboard nav; `prefers-reduced-motion` respected
