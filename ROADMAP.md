# Akymic Design System — Roadmap

> Living document. Edit rows, add rows, or change the Status column directly.
> Completed tasks link to their change note in `docs/changes/`.
>
> **Status values:** `not-started` · `in-progress` · `completed` · `deferred` · `failed`

---

## Foundations

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-001 | Color token system — 14 semantic roles (light + dark) | completed | 19 color vars in `tokens.json` + `tokens.css` | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| AKYD-002 | Radius token (`--radius: 0.75rem`) | completed | Part of token baseline | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| AKYD-003 | `--muted-foreground` light contrast fix (46.9% → 40% L) | completed | WCAG AA compliance | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| AKYD-004 | `--destructive` dark contrast fix (30.6% → 60.2% L) | completed | Readable as error text on dark bg | [2026-02-28-fix-dark-destructive](docs/changes/2026-02-28-fix-dark-destructive.md) |
| AKYD-005 | Typography scale — 19 vars (size, weight, leading, tracking, family) | completed | `--text-*`, `--font-*`, `--leading-*`, `--tracking-*` | [2026-02-28-typography-scale](docs/changes/2026-02-28-typography-scale.md) |
| AKYD-006 | Spacing scale token | not-started | `--space-*` vars mirroring Tailwind scale | — |

---

## Components — Interactive

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-007 | Button — 5 variants × 3 sizes × 5 states | completed | `ui/button.tsx`; shipped in initial app-template setup | — |
| AKYD-008 | Input — default + error state | completed | `ui/input.tsx`; shipped in initial app-template setup | — |
| AKYD-009 | Textarea — default + error | completed | `ui/textarea.tsx`; mirrors Input API exactly | — |
| AKYD-010 | Select — default + error | completed | Popover-based custom select, ARIA combobox pattern; `ui/select.tsx` | [2026-03-03-form-components](docs/changes/2026-03-03-form-components.md) |
| AKYD-011 | Checkbox | completed | `ui/checkbox.tsx`; indeterminate state, group support | [2026-03-03-checkbox-radio-switch-tabs](docs/changes/2026-03-03-checkbox-radio-switch-tabs.md) |
| AKYD-012 | Radio | completed | `ui/radio.tsx`; RadioGroup with roving tabindex | [2026-03-03-checkbox-radio-switch-tabs](docs/changes/2026-03-03-checkbox-radio-switch-tabs.md) |
| AKYD-013 | Switch | completed | `ui/switch.tsx`; aria-checked, size variants | [2026-03-03-checkbox-radio-switch-tabs](docs/changes/2026-03-03-checkbox-radio-switch-tabs.md) |
| AKYD-013a | Combobox | completed | `ui/combobox.tsx`; searchable select, keyboard nav | [2026-03-03-form-components](docs/changes/2026-03-03-form-components.md) |
| AKYD-013b | MultiSelect | completed | `ui/multi-select.tsx`; tag chips, maxDisplay overflow, clear-all | [2026-03-03-form-components](docs/changes/2026-03-03-form-components.md) |
| AKYD-013c | DatePicker | completed | `ui/date-picker.tsx`; CalendarMiniMonth in popover, clearable | [2026-03-03-form-components](docs/changes/2026-03-03-form-components.md) |
| AKYD-013d | FileUpload | completed | `ui/file-upload.tsx`; drag-and-drop, maxSize, maxFiles, dedup | [2026-03-03-form-components](docs/changes/2026-03-03-form-components.md) |

---

## Components — Layout & Containment

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-014 | Card — CardHeader, CardTitle, CardDescription, CardContent, CardFooter | completed | `ui/card.tsx` | [2026-03-02-cards-dividers-badges](docs/changes/2026-03-02-cards-dividers-badges.md) |
| AKYD-015 | Badge — 4 variants × 2 sizes | completed | `ui/badge.tsx` | [2026-03-02-cards-dividers-badges](docs/changes/2026-03-02-cards-dividers-badges.md) |
| AKYD-016 | Divider — horizontal (plain + labeled), vertical | completed | `ui/divider.tsx` | [2026-03-02-cards-dividers-badges](docs/changes/2026-03-02-cards-dividers-badges.md) |

---

## Components — Navigation

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-017 | AppShell — server-safe layout wrapper | completed | `components/app-shell.tsx` | [2026-03-01-navigation-shell](docs/changes/2026-03-01-navigation-shell.md) |
| AKYD-018 | NavSidebar — 240px, 2 sections, active state via `usePathname` | completed | `ui/nav-sidebar.tsx` | [2026-03-01-navigation-shell](docs/changes/2026-03-01-navigation-shell.md) |
| AKYD-019 | Topbar — title, icons, theme toggle, avatar | completed | `ui/topbar.tsx` | [2026-03-01-navigation-shell](docs/changes/2026-03-01-navigation-shell.md) |
| AKYD-020 | Breadcrumb | completed | `ui/breadcrumb.tsx`; aria-current, separator slot | [2026-03-03-checkbox-radio-switch-tabs](docs/changes/2026-03-03-checkbox-radio-switch-tabs.md) |
| AKYD-021 | Tabs | completed | `ui/tabs.tsx`; roving tabindex, arrow-key nav, panel association | [2026-03-03-checkbox-radio-switch-tabs](docs/changes/2026-03-03-checkbox-radio-switch-tabs.md) |

---

## Components — Data Display

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-022 | Table — columns, row stripes, sorting affordance | completed | `ui/table.tsx`; composable primitives + striped + sortable | [2026-03-02-table-pagination-filterbar](docs/changes/2026-03-02-table-pagination-filterbar.md) |
| AKYD-023 | Pagination | completed | `ui/pagination.tsx`; 7-slot range, ellipsis, ARIA | [2026-03-02-table-pagination-filterbar](docs/changes/2026-03-02-table-pagination-filterbar.md) |
| AKYD-024 | Filter bar — search input + badge chips | completed | `ui/filter-bar.tsx`; controlled, chip × removal | [2026-03-02-table-pagination-filterbar](docs/changes/2026-03-02-table-pagination-filterbar.md) |
| AKYD-024a | Calendar — month view, events, keyboard nav | completed | Zero deps; `ui/calendar/`; arrow-key nav, role=grid, event chips | [2026-03-02-calendar](docs/changes/2026-03-02-calendar.md) |

---

## Components — Overlay

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-025 | Dialog | completed | Focus trap, body scroll lock, portal, return focus; `ui/dialog.tsx` | [2026-03-02-dialogs-drawers](docs/changes/2026-03-02-dialogs-drawers.md) |
| AKYD-026 | Drawer | completed | Side-anchored; same a11y pattern as Dialog; `ui/drawer.tsx` | [2026-03-02-dialogs-drawers](docs/changes/2026-03-02-dialogs-drawers.md) |
| AKYD-027 | Tooltip | completed | Portal, viewport-aware flip, `aria-describedby`; `ui/tooltip.tsx` | [2026-03-03-checkbox-radio-switch-tabs](docs/changes/2026-03-03-checkbox-radio-switch-tabs.md) |
| AKYD-028 | Dropdown menu | completed | `role=menu`, arrow-key nav, portal; `ui/dropdown.tsx` | [2026-03-03-checkbox-radio-switch-tabs](docs/changes/2026-03-03-checkbox-radio-switch-tabs.md) |

---

## Components — Feedback

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-029 | Alert — info, warning, error, success | completed | 5 variants; optional dismiss; `ui/alert.tsx` | [2026-03-02-toast-alerts-empty-loading](docs/changes/2026-03-02-toast-alerts-empty-loading.md) |
| AKYD-030 | Toast — info, warning, error, success | completed | Imperative API; auto-dismiss 4s; max 5 stacked; `<Toaster />`; `ui/toast.tsx` | [2026-03-02-toast-alerts-empty-loading](docs/changes/2026-03-02-toast-alerts-empty-loading.md) |
| AKYD-031 | Empty state | completed | icon + title + description + action; `ui/empty-state.tsx` | [2026-03-02-toast-alerts-empty-loading](docs/changes/2026-03-02-toast-alerts-empty-loading.md) |
| AKYD-032 | Skeleton / Loading | completed | animate-pulse + Spinner (3 sizes); `ui/skeleton.tsx` | [2026-03-02-toast-alerts-empty-loading](docs/changes/2026-03-02-toast-alerts-empty-loading.md) |

---

## Compound Elements

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-076 | DashboardLayout — 12-col CSS Grid container | completed | Responsive collapse at 767px; loading→DashboardSkeleton; `ui/dashboard-layout.tsx` | [2026-03-03-compound-elements](docs/changes/2026-03-03-compound-elements.md) |
| AKYD-077 | DashboardPanel — panel primitive | completed | `<section>` landmark; header: icon/title/badge/info/actions; colSpan/rowSpan | [2026-03-03-compound-elements](docs/changes/2026-03-03-compound-elements.md) |
| AKYD-078 | DashboardSkeleton — grid-matched loading placeholder | completed | defaultColSpan mapping; used by DashboardLayout loading state | [2026-03-03-compound-elements](docs/changes/2026-03-03-compound-elements.md) |

---

## App Template

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-033 | Next.js 15 + Tailwind + next-themes setup | completed | Initial `akymic-app-template` repo | — |
| AKYD-034 | Token sync script | completed | `scripts/sync-tokens.sh` + `.ps1` | — |
| AKYD-035 | Dashboard page with AppShell | completed | `app/page.tsx` — greeting, stats, activity | [2026-03-01-navigation-shell](docs/changes/2026-03-01-navigation-shell.md) |
| AKYD-036 | Paper playground — Button + Input showcase | completed | `app/paper-playground/page.tsx` | — |
| AKYD-037 | Paper playground — Badge + Divider + Card showcase | completed | Added 2026-03-02 | [2026-03-02-cards-dividers-badges](docs/changes/2026-03-02-cards-dividers-badges.md) |
| AKYD-038 | DS Showcase link on dashboard | completed | Card + link from index → `/paper-playground` | — |
| AKYD-039 | Paper playground — Table + Pagination + FilterBar showcase | completed | Added to `/paper-playground`; interactive + striped demo | [2026-03-02-table-pagination-filterbar](docs/changes/2026-03-02-table-pagination-filterbar.md) |
| AKYD-040 | Table + Pagination demo page | not-started | Standalone page with full CRUD-style table | — |
| AKYD-041 | Forms demo page | not-started | Textarea, Select, Checkbox, Radio, Switch | — |

---

## Paper Artboards (Design Specs)

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-042 | Type Scale Specimen (light) | completed | Existing in Paper file | — |
| AKYD-043 | Button Component — Light | completed | Existing in Paper file | — |
| AKYD-044 | Button Component — Dark | completed | Existing in Paper file | — |
| AKYD-045 | Input Component — Light | completed | Existing in Paper file | — |
| AKYD-046 | Input Component — Dark | completed | Existing in Paper file | — |
| AKYD-047 | Navigation Shell — Light | deferred | Paper MCP weekly limit; retry ~2026-03-07 | — |
| AKYD-048 | Navigation Shell — Dark | deferred | Paper MCP weekly limit; retry ~2026-03-07 | — |
| AKYD-049 | Cards + Dividers + Badges — Light | not-started | After MCP limit resets | — |
| AKYD-050 | Cards + Dividers + Badges — Dark | not-started | After MCP limit resets | — |
| AKYD-051 | Table Component — Light | not-started | After Table code ships | — |
| AKYD-052 | Table Component — Dark | not-started | After Table code ships | — |

---

## Documentation Site (`apps/docs/`)

> A static public-facing site — the designer communication tool.
> Reference: [primer.style/product](https://primer.style/product/)
> Lives in this repo at `apps/docs/`. Stack: Next.js + static export (`output: 'export'`), deployable to GitHub Pages or Vercel.
> Audience: human designers. Distinct from `akymic-app-template` (which is for developers + agents).

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-053 | Site scaffold — Next.js static export, routing, token import, light/dark toggle | completed | `apps/docs/`; DocLayout sidebar + topbar; 4 pages live | — |
| AKYD-054 | Foundations — Color page: token palette browser (light + dark swatches, HSL values, Tailwind class) | completed | All 19 tokens grouped by role; both swatches always visible | — |
| AKYD-055 | Foundations — Typography page: type scale specimen, weight + leading examples | completed | Size scale, weight scale, leading table, font family preview | — |
| AKYD-056 | Foundations — Spacing + Radius page | not-started | Visual scale with pixel values | — |
| AKYD-057 | Components — Overview page: all components with status table | completed | Stable / planned / not-started counts; full inventory table | — |
| AKYD-058 | Components — Button gallery: all variants, sizes, states | completed | Live rendered + code snippet per variant | — |
| AKYD-059 | Components — Input gallery: states + form group example | completed | Alert, Card, Divider, Input, Textarea pages live | — |
| AKYD-060 | Components — Card gallery: standard, stat, list, interactive patterns | completed | — | — |
| AKYD-061 | Components — Badge + Divider gallery | completed | — | — |
| AKYD-062 | Components — Navigation Shell gallery (`/components/navigation`) | completed | — | — |
| AKYD-063 | Components — Table, Pagination, Filter bar gallery | completed | — | — |
| AKYD-064 | Components — Overlay gallery (Dialog, Drawer, Tooltip, Dropdown) | completed | Dialog, Toast pages live | — |
| AKYD-065 | Components — Feedback gallery (Alert, Toast, Empty state, Skeleton) | completed | Skeleton, Calendar pages live | — |
| AKYD-065a | Components — Checkbox, Radio, Switch gallery | completed | `/components/checkbox` page | — |
| AKYD-065b | Components — Tabs gallery | completed | `/components/tabs` page | — |
| AKYD-065c | Components — Tooltip gallery | completed | `/components/tooltip` page | — |
| AKYD-065d | Components — Compound elements gallery | completed | `/components/compound` page | — |
| AKYD-066 | Deploy — GitHub Pages or Vercel static hosting | not-started | Set up CI to publish on push to `main` | — |

---

## Governance & DX

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-067 | `docs/tokens.md` — token dictionary | completed | Full reference with do/don't | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| AKYD-068 | `docs/components.md` — component inventory | completed | Updated each iteration | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| AKYD-069 | `docs/paper-workflow.md` — Paper → code → token workflow | completed | — | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| AKYD-070 | `docs/migrations.md` — deprecation log | completed | Empty; ready for first entry | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| AKYD-071 | `docs/changes/` — per-iteration change notes | completed | 6 notes filed | — |
| AKYD-072 | `AGENT.md` (DS repo) — agent-native DS contract | completed | Token format, workflow, quality gates | — |
| AKYD-073 | `AGENT.md` (app-template) — agent-native build guide | completed | Component APIs, patterns, hard rules | — |
| AKYD-074 | Automated token validation (CI lint) | not-started | Check HSL format, required light+dark | — |
| AKYD-075 | Storybook or alternative component explorer | not-started | Evaluate: Storybook vs Histoire vs custom | — |
| AKYD-079 | Success + warning tokens | completed | `--success`, `--success-foreground`, `--warning`, `--warning-foreground`; both modes | [2026-03-02-success-warning-tokens](docs/changes/2026-03-02-success-warning-tokens.md) |
| AKYD-080 | Shadow tokens | completed | `--shadow-resting`, `--shadow-floating`, `--shadow-inset`; full CSS box-shadow strings | [2026-03-02-shadow-tokens](docs/changes/2026-03-02-shadow-tokens.md) |
| AKYD-081 | Accessibility fixes — all 5 gaps | completed | aria-invalid, return focus, toast pause, calendar grid roles, table aria-sort | [2026-03-03-accessibility-fixes](docs/changes/2026-03-03-accessibility-fixes.md) |
| AKYD-082 | Theming engine + Theme Studio | completed | CLI: derive, sync-main, apply-to-app; live preview in app | [2026-03-03-theming-engine](docs/changes/2026-03-03-theming-engine.md) |
| AKYD-083 | Full primitive migration to packages/ui | completed | All 34 components canonical in `packages/ui/src/`; barrel export | [2026-03-04-full-primitive-migration](docs/changes/2026-03-04-full-primitive-migration.md) |
