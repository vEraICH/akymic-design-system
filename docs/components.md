# Component Inventory

Status legend: `planned` | `in-progress` | `stable` | `deprecated`

---

## Foundations

| Component        | Status  | Notes |
|-----------------|---------|-------|
| Token system    | stable  | See `tokens.md` |
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
| Card      | planned | default, interactive | Uses `--card`, `--card-foreground` |
| Divider   | planned | horizontal, vertical | Uses `--border` |
| Badge     | planned | default, secondary, destructive, outline | — |

---

## Navigation

| Component      | Status  | Notes |
|---------------|---------|-------|
| Topbar        | planned | App shell header |
| Sidebar       | planned | Collapsible nav |
| Breadcrumb    | planned | — |
| Tabs          | planned | — |

---

## Overlay

| Component | Status  | Notes |
|-----------|---------|-------|
| Dialog    | planned | Uses `--popover`, `--ring` for focus trap |
| Drawer    | planned | Side-anchored dialog |
| Tooltip   | planned | Uses `--popover` |
| Dropdown  | planned | Uses `--popover`, `--accent` for hover |

---

## Feedback

| Component    | Status  | Variants |
|-------------|---------|----------|
| Alert        | planned | info, warning, error, success |
| Toast        | planned | info, warning, error, success |
| Empty state  | planned | — |
| Loading / Skeleton | planned | — |

---

## Data Display

| Component  | Status  | Notes |
|-----------|---------|-------|
| Table     | planned | Uses `--muted` for row stripes |
| Pagination | planned | — |

---

## Generation Order

Per CLAUDE.md roadmap:
1. Foundations (tokens, radius, type scale) — **current iteration**
2. Buttons
3. Inputs (text, textarea, select) + validation
4. Navigation shell
5. Cards + sections + dividers
6. Tables + filters + pagination
7. Dialogs + drawers
8. Toast/alerts + empty/loading states
