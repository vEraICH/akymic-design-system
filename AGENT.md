# AGENT.md — Akymic Design System

> **Read this file first before modifying any tokens, specs, or docs in this repo.**
> This repo is the governed contract. The consuming app (`akymic-app-template`) reads from it.
> Your job here is to extend the system carefully — not to build features.

---

## 1. What This Repo Is

This repo owns:
- **Token source of truth** — `packages/tokens/tokens/tokens.json`
- **Token consumer artifact** — `packages/tokens/tokens/tokens.css`
- **Component specs** — `docs/components.md`
- **Governance docs** — `docs/tokens.md`, `docs/paper-workflow.md`, `docs/migrations.md`
- **Change notes** — `docs/changes/YYYY-MM-DD-<slug>.md`

It does **not** own app layouts, page-specific components, or anything in `akymic-app-template`.

---

## 2. File Structure

```
packages/
├── tokens/
│   └── tokens/
│       ├── tokens.json          ← SOURCE OF TRUTH. Edit this first.
│       └── tokens.css           ← Consumer artifact. Derive from tokens.json.
└── ui/
    └── src/
        ├── index.ts             ← Barrel export for all @akymic/ui components
        ├── badge.tsx            ← Badge (6 variants × 2 sizes)
        ├── skeleton.tsx         ← Skeleton + Spinner
        ├── empty-state.tsx      ← EmptyState
        ├── dashboard-layout.tsx ← DashboardLayout — 12-col CSS Grid container
        ├── dashboard-panel.tsx  ← DashboardPanel — panel primitive (compound)
        ├── dashboard-skeleton.tsx ← DashboardSkeleton — loading placeholder
        ├── checkbox.tsx · radio.tsx · switch.tsx
        ├── tabs.tsx · breadcrumb.tsx
        ├── tooltip.tsx · dropdown.tsx
            ├── button.tsx · input.tsx · textarea.tsx
        ├── card.tsx · divider.tsx
        ├── alert.tsx · toast.tsx · skeleton.tsx · empty-state.tsx
        ├── dialog.tsx · drawer.tsx · popover.tsx
        ├── table.tsx · pagination.tsx · filter-bar.tsx
        ├── select.tsx · combobox.tsx · multi-select.tsx
        ├── date-picker.tsx · file-upload.tsx
        ├── checkbox.tsx · radio.tsx · switch.tsx · tabs.tsx
        ├── breadcrumb.tsx · tooltip.tsx · dropdown.tsx · badge.tsx
        ├── dashboard-layout.tsx · dashboard-panel.tsx · dashboard-skeleton.tsx
        ├── calendar/          ← Calendar, MiniMonth, MonthGrid, Toolbar, DayCell, EventChip
        ├── hooks/             ← use-focus-trap.ts, use-lock-body-scroll.ts
        └── lib/               ← utils.ts, calendar-utils.ts
docs/
├── tokens.md                    ← Token dictionary (human + agent reference)
├── components.md                ← Component inventory + status
├── compound-elements.md         ← Compound element specs + Phase 2 roadmap
├── paper-workflow.md            ← Paper → code → token workflow
├── migrations.md                ← Deprecations and renames
└── changes/
    └── YYYY-MM-DD-<slug>.md     ← One file per meaningful change
AGENT.md                         ← This file
CLAUDE.md                        ← Operational instructions for the Claude agent
```

---

## 3. Token Contract

### Color token format (in `tokens.json`)

```json
{
  "colors": {
    "<token-name>": {
      "light": "H S% L%",
      "dark":  "H S% L%"
    }
  }
}
```

- Values are **HSL components only**: `"221.2 83.2% 53.3%"` — not hex, not `hsl(...)`, not rgb.
- Both `light` and `dark` are **required** for every color token.
- Token names are **semantic** (role-based), never color-descriptive.

### Typography token format (in `tokens.json`)

```json
{
  "typography": {
    "fontSize":      { "sm": { "value": "0.875rem" } },
    "fontWeight":    { "semibold": { "value": "600" } },
    "lineHeight":    { "normal": { "value": "1.5" } },
    "letterSpacing": { "wide": { "value": "0.05em" } },
    "fontFamily":    { "sans": { "value": "ui-sans-serif, ..." } }
  }
}
```

Typography tokens are **mode-agnostic** (no light/dark split). They live in `:root {}` only.

### CSS artifact format (in `tokens.css`)

```css
:root {
  --token-name: H S% L%;          /* color tokens */
  --text-sm: 0.875rem;            /* typography: font size */
  --font-semibold: 600;           /* typography: font weight */
  --leading-normal: 1.5;          /* typography: line height */
  --tracking-wide: 0.05em;        /* typography: letter spacing */
  --font-sans: ui-sans-serif, …;  /* typography: font family */
  --radius: 0.75rem;              /* radius */
}

.dark {
  --token-name: H S% L%;          /* dark mode overrides — color tokens only */
}
```

**CSS safety rules (non-negotiable):**
- Only `:root {}` and `.dark {}` blocks in `tokens.css`
- No `@import`
- No Tailwind output pasted in
- No inline `hsl()` wrappers — raw HSL components only

---

## 4. Current Token List

### Color tokens (14 roles, each with light + dark)

| Token | Tailwind classes | Semantic use |
|---|---|---|
| `--background` | `bg-background` / `text-foreground` | Page canvas |
| `--foreground` | `text-foreground` | Primary text |
| `--card` | `bg-card` / `text-card-foreground` | Elevated containers |
| `--card-foreground` | `text-card-foreground` | Text on card surfaces |
| `--popover` | `bg-popover` / `text-popover-foreground` | Floating overlays |
| `--popover-foreground` | `text-popover-foreground` | Text on popover surfaces |
| `--primary` | `bg-primary` / `text-primary` | Brand blue, CTAs, active states |
| `--primary-foreground` | `text-primary-foreground` | Text/icon on primary bg |
| `--secondary` | `bg-secondary` / `text-secondary` | Subdued actions, badges |
| `--secondary-foreground` | `text-secondary-foreground` | Text on secondary bg |
| `--muted` | `bg-muted` | Sidebar, table stripes, skeleton |
| `--muted-foreground` | `text-muted-foreground` | Captions, help text, placeholders |
| `--accent` | `bg-accent` / `text-accent` | Interactive hover states |
| `--accent-foreground` | `text-accent-foreground` | Text on accent hover |
| `--destructive` | `bg-destructive` / `text-destructive` | Errors, delete actions |
| `--destructive-foreground` | `text-destructive-foreground` | Text on destructive bg |
| `--border` | `border-border` | Layout dividers, separators |
| `--input` | `border-input` | Form field borders |
| `--ring` | `ring-ring` | Focus rings |

### Structural tokens

| Token | CSS var | Value | Use |
|---|---|---|---|
| Radius | `--radius` | `0.75rem` | Base border radius |

### Typography tokens (19 vars, mode-agnostic)

| Group | CSS vars |
|---|---|
| Font size (8) | `--text-xs` `--text-sm` `--text-base` `--text-lg` `--text-xl` `--text-2xl` `--text-3xl` `--text-4xl` |
| Font weight (4) | `--font-normal` `--font-medium` `--font-semibold` `--font-bold` |
| Line height (4) | `--leading-tight` `--leading-snug` `--leading-normal` `--leading-relaxed` |
| Letter spacing (4) | `--tracking-tight` `--tracking-normal` `--tracking-wide` `--tracking-widest` |
| Font family (2) | `--font-sans` `--font-mono` |

---

## 5. How to Add a Token

Follow this sequence exactly:

**Step 1 — Update `tokens.json`:**
```json
{
  "colors": {
    "existing-tokens": "...",
    "new-role": { "light": "H S% L%", "dark": "H S% L%" }
  }
}
```

**Step 2 — Update `tokens.css`:**
```css
:root {
  /* ... existing tokens ... */
  --new-role: H S% L%;
}

.dark {
  /* ... existing dark tokens ... */
  --new-role: H S% L%;
}
```

**Step 3 — Document in `docs/tokens.md`:**
Add a section following the existing format: table of light/dark values + one-line semantic description.

**Step 4 — Create change note:**
`docs/changes/YYYY-MM-DD-<slug>.md` — see §8 for format.

**Step 5 — Sync to consuming app:**
Copy `packages/tokens/tokens/tokens.css` to `akymic-app-template/src/design-system/tokens.css`.

**Token naming rules:**
- ✅ `--sidebar-background`, `--table-header`, `--nav-active`
- ❌ `--gray900`, `--blue500`, `--akymicBlue`, `--surface1`
- Prefer reusing existing tokens over adding new ones
- If renaming: keep old token for one iteration with a deprecation note

---

## 6. How to Modify an Existing Token

1. Update value in `tokens.json`
2. Update value in `tokens.css`
3. Note Before/After in a change note
4. Check WCAG contrast for text tokens: minimum 4.5:1 against their surface
5. Sync `tokens.css` to the consuming app

---

## 7. Component Inventory & Status

### Foundations & tokens
| Component | Status | Notes |
|---|---|---|
| Token system | stable | 23 semantic tokens — 18 color roles + radius + success/warning (2026-03-02) |
| Shadow tokens | stable | `--shadow-resting` / `--shadow-floating` / `--shadow-inset` (2026-03-02) |
| Typography scale | stable | 19 mode-agnostic vars in `:root` only |

### Primitives (in `packages/ui/src/`)
| Component | Status | Notes |
|---|---|---|
| Button | stable | 5 variants × 4 sizes (sm/default/lg/icon) × 5 states |
| Input / Textarea | stable | error + disabled states; `aria-invalid` wired |
| Card / Divider | stable | CardHeader/Title/Description/Content/Footer |
| Badge | stable | 6 variants × 2 sizes |
| Alert | stable | 5 variants; optional dismiss |
| Toast | stable | Imperative API; auto-dismiss 4s; max 5 stacked; `<Toaster />` |
| Skeleton / Spinner | stable | animate-pulse + spinner 3 sizes |
| EmptyState | stable | icon + title + description + action |
| Dialog / Drawer | stable | Focus trap, body scroll lock, portal, return focus |
| Tooltip | stable | Portal, viewport-aware flip, `aria-describedby` |
| Dropdown | stable | `role=menu`, arrow-key nav, portal |
| Select / Combobox | stable | Popover-based, ARIA combobox, keyboard nav |
| MultiSelect | stable | Tag chips, maxDisplay overflow, clear-all |
| DatePicker | stable | CalendarMiniMonth in popover, clearable |
| FileUpload | stable | Drag-and-drop, maxSize, maxFiles, dedup |
| Checkbox / Radio / Switch | stable | Accessible, roving tabindex on RadioGroup |
| Tabs / Breadcrumb | stable | Roving tabindex, arrow-key nav |
| Table + Pagination | stable | Sortable headers (`aria-sort`), striped rows, FilterBar |
| Calendar | stable | Zero deps, event chips, arrow-key nav, `role=grid` |

### App-specific (in `akymic-app-template/src/`, not in `packages/ui/`)
| Component | Notes |
|---|---|
| NavSidebar / Topbar / AppShell | 240px sidebar + 60px topbar + server-compatible wrapper; app-layout pattern, not a DS primitive |

### Compound elements (in `packages/ui/src/`)
| Component | Status | Notes |
|---|---|---|
| DashboardLayout | stable | 12-col CSS Grid, responsive collapse, loading→DashboardSkeleton |
| DashboardPanel | stable | `<section>` landmark, header anatomy (icon/title/badge/info/actions), colSpan/rowSpan |
| DashboardSkeleton | stable | Grid-matched loading placeholder |

See `docs/compound-elements.md` for full spec and Phase 2 roadmap (drag-to-reorder, resize handles, DataSection, FormSection, PageHeader).

**Generation order (completed):**
1. ~~Foundations~~ (tokens, radius, typography)
2. ~~Buttons~~
3. ~~Inputs + validation~~
4. ~~Navigation shell~~
5. ~~Cards + dividers + badges~~
6. ~~Tables + pagination~~
7. ~~Dialogs + drawers~~
8. ~~Toast / alerts / empty / loading~~
9. ~~Success + warning tokens~~
10. ~~Checkbox, Radio, Switch, Tabs, Breadcrumb, Tooltip, Dropdown~~
11. ~~Compound elements — DashboardLayout + DashboardPanel + DashboardSkeleton~~

---

## 8. Change Note Format

Every meaningful change gets a file at `docs/changes/YYYY-MM-DD-<slug>.md`:

```markdown
# YYYY-MM-DD — <Title>

## Summary
One paragraph: what changed and why.

## What changed
- Bullet list of files modified

## Before / After (for token changes)
| Token | Before | After |
|---|---|---|
| `--token` | `old value` | `new value` |

## Migration notes (if breaking)
Instructions for consumers to update.

## Verification steps
1. Step to verify in light mode
2. Step to verify in dark mode
```

---

## 9. Quality Gates

Before completing any iteration, verify:

- [ ] Light mode: text readable on all surfaces
- [ ] Dark mode: text readable on all surfaces
- [ ] Focus ring visible on all interactive elements (`ring-ring`)
- [ ] Token names are semantic (role-based)
- [ ] `tokens.css` has no `@import`, no Tailwind output, only `:root {}` and `.dark {}`
- [ ] `tokens.json` and `tokens.css` are in sync
- [ ] Change note created in `docs/changes/`
- [ ] `docs/components.md` status updated if a component changed
- [ ] If adding a compound element: `docs/compound-elements.md` updated; component added to `packages/ui/src/` with barrel export

---

## 10. What NOT to Do

| Never | Because |
|---|---|
| Hardcode hex/rgb in tokens.css | Breaks HSL composability |
| Add `@import` to tokens.css | CSS safety rule |
| Add a token without both `light` and `dark` | Dark mode will break |
| Name a token after its color (`--blue600`) | Tokens must survive color changes |
| Rename a token without a deprecation window | Breaking change for consumers |
| Add app-specific layout components (NavSidebar, AppShell) to `packages/ui` | Wrong boundary — app layouts belong in consuming apps |
| Skip the change note | Governance requires traceability |
