# Table · Pagination · FilterBar — 2026-03-02

## Summary
Added three new data-display components to `akymic-app-template`:

| Component | File | Category |
|-----------|------|----------|
| Table (composable primitives) | `ui/table.tsx` | Data display |
| Pagination | `ui/pagination.tsx` | Data display |
| FilterBar | `ui/filter-bar.tsx` | Data display |

---

## Table (`ui/table.tsx`)

### Exports
`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`, `TableFooter`

Also exports the `SortDirection` type (`"asc" | "desc" | false`).

### Notable props
| Prop | Component | Type | Notes |
|------|-----------|------|-------|
| `striped` | `TableBody` | `boolean` | Applies `bg-muted/20` to even rows |
| `sortable` | `TableHead` | `boolean` | Shows sort icon, adds hover state |
| `sortDirection` | `TableHead` | `SortDirection` | Controls icon state |
| `onSort` | `TableHead` | `() => void` | Called on header click |

### Anatomy
```
<div overflow-auto>              ← Table scroll wrapper
  <table>                       ← Table
    <thead bg-muted/50>         ← TableHeader
      <tr>                      ← TableRow
        <th sortable?>          ← TableHead (with optional SortIcon)
    <tbody striped?>            ← TableBody
      <tr hover:bg-muted/30>    ← TableRow
        <td>                    ← TableCell
    <tfoot>                     ← TableFooter (optional)
    <caption>                   ← TableCaption (optional)
```

### Tokens used
`--border`, `--muted`, `--muted-foreground`, `--foreground`, `--accent`

---

## Pagination (`ui/pagination.tsx`)

### Props
```ts
interface PaginationProps {
  page: number;        // current 1-based page
  pageCount: number;   // total pages
  onPageChange: (page: number) => void;
  className?: string;
}
```

### Behavior
- Shows at most 7 slots: uses ellipsis (`…`) when `pageCount > 7`
- Active page uses `variant="default"` Button; others use `variant="ghost"`
- Previous / Next buttons disabled at boundaries
- Full keyboard + ARIA support (`role="navigation"`, `aria-current="page"`, `aria-label`)

### Tokens used
Inherits from `Button` — `--primary`, `--primary-foreground`, `--ring`

---

## FilterBar (`ui/filter-bar.tsx`)

### Props
```ts
interface FilterBarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  chips?: FilterChip[];       // active filter chips with × remove button
  placeholder?: string;
  className?: string;
}

interface FilterChip {
  label: string;
  value: string;
  onRemove: () => void;
}
```

### Behavior
- Search input with a leading Search icon (16×16, 1.75 stroke)
- Active filters rendered as `Badge variant="secondary"` with an × button
- Controlled component — no internal state; parent owns `search` and `chips`

### Tokens used
`--input`, `--background`, `--foreground`, `--muted-foreground`, `--ring`, `--secondary`

---

## Paper Playground update

The `/paper-playground` page now has a **Table** section with two examples:

1. **Interactive** — 12-row team directory with live search, sortable column headers (Name, Role, Joined), and 5-row pagination
2. **Striped rows** — token reference table using the `striped` prop on `TableBody`

---

## Migration notes
No breaking changes. No new tokens required. All three components follow the existing composable pattern.

## Verification
- `npx tsc --noEmit` passes in `akymic-app-template`
- `/paper-playground` — Table section visible, search + sort + pagination functional
