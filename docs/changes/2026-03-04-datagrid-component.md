# Change Note: DataGrid Wrapper Component (AKYD-085, Iteration 2)

**Date:** 2026-03-04
**Type:** New component

---

## Summary

Shipped `<DataGrid>` — a React wrapper around AG Grid Community that auto-applies the Akymic token bridge. Consumers get a fully themed, accessible data grid with virtualization, sorting, filtering, pagination, and row selection out of the box.

## What changed

- **`packages/ui/src/data-grid/data-grid.tsx`** — Main `<DataGrid>` component (`"use client"`). Registers AG Grid community modules once, applies `akymicAgTheme`, provides sensible defaults (sortable, resizable, filterable columns), wraps in Akymic-styled container.
- **`packages/ui/src/data-grid/data-grid-types.ts`** — TypeScript interfaces: `DataGridProps<TData>` with 12 props + `gridOptions` escape hatch.
- **`packages/ui/src/data-grid/index.ts`** — Updated barrel to re-export `DataGrid`, `DataGridProps`, and key AG Grid types (`ColDef`, `GridReadyEvent`, `GridOptions`).

## Component API

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `columnDefs` | `ColDef<TData>[]` | required | Column definitions |
| `rowData` | `TData[] \| null` | required | Data; `null` triggers loading |
| `rowSelection` | `"single" \| "multiple"` | — | Enable row selection |
| `pagination` | `boolean` | `false` | Enable pagination |
| `paginationPageSize` | `number` | `20` | Rows per page |
| `quickFilterText` | `string` | — | Quick filter across all columns |
| `striped` | `boolean` | `false` | Alternating row backgrounds |
| `height` | `string \| number` | `"400px"` | Grid height |
| `loading` | `boolean` | `false` | Show loading overlay |
| `emptyMessage` | `string` | `"No data to display"` | Empty state text |
| `onGridReady` | `(event) => void` | — | Grid API access |
| `gridOptions` | `Partial<GridOptions>` | — | Escape hatch |
| `className` | `string` | — | Outer wrapper class |

## Design decisions

1. **Sub-path export only** — `@akymic/ui/data-grid` isolates AG Grid from the main barrel. Non-users pay zero bundle cost.
2. **`gridOptions` escape hatch** — Advanced users access any AG Grid feature without the wrapper being a bottleneck.
3. **Auto-size on ready** — `sizeColumnsToFit()` called on `gridReady` for immediate polish.
4. **Consistent container** — `rounded-lg border border-border overflow-hidden` matches DS styling.

## Migration

None. This is a new, additive component.
