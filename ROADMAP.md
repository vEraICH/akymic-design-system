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
| AKYD-009 | Textarea — default + error | not-started | Mirror Input API; `error` prop | — |
| AKYD-010 | Select — default + error | not-started | Native `<select>` wrapper first | — |
| AKYD-011 | Checkbox | not-started | — | — |
| AKYD-012 | Radio | not-started | — | — |
| AKYD-013 | Switch | not-started | — | — |

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
| AKYD-020 | Breadcrumb | not-started | — | — |
| AKYD-021 | Tabs | not-started | — | — |

---

## Components — Data Display

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-022 | Table — columns, row stripes, sorting affordance | completed | `ui/table.tsx`; composable primitives + striped + sortable | [2026-03-02-table-pagination-filterbar](docs/changes/2026-03-02-table-pagination-filterbar.md) |
| AKYD-023 | Pagination | completed | `ui/pagination.tsx`; 7-slot range, ellipsis, ARIA | [2026-03-02-table-pagination-filterbar](docs/changes/2026-03-02-table-pagination-filterbar.md) |
| AKYD-024 | Filter bar — search input + badge chips | completed | `ui/filter-bar.tsx`; controlled, chip × removal | [2026-03-02-table-pagination-filterbar](docs/changes/2026-03-02-table-pagination-filterbar.md) |

---

## Components — Overlay

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-025 | Dialog | not-started | Focus trap; uses `--popover` + `--ring` | — |
| AKYD-026 | Drawer | not-started | Side-anchored dialog variant | — |
| AKYD-027 | Tooltip | not-started | Hover-triggered; uses `--popover` | — |
| AKYD-028 | Dropdown menu | not-started | Uses `--popover` + `--accent` for hover | — |

---

## Components — Feedback

| Task ID | Task | Status | Notes | Change Note |
|---------|------|--------|-------|-------------|
| AKYD-029 | Alert — info, warning, error, success | not-started | Inline; no JS dependency | — |
| AKYD-030 | Toast — info, warning, error, success | not-started | Requires state; evaluate `sonner` | — |
| AKYD-031 | Empty state | not-started | Illustration slot + CTA action | — |
| AKYD-032 | Skeleton / Loading | not-started | Pulse animation; mirrors real layouts | — |

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
| AKYD-058 | Components — Button gallery: all variants, sizes, states | not-started | Live rendered + code snippet per variant | — |
| AKYD-059 | Components — Input gallery: states + form group example | not-started | — | — |
| AKYD-060 | Components — Card gallery: standard, stat, list, interactive patterns | not-started | — | — |
| AKYD-061 | Components — Badge + Divider gallery | not-started | — | — |
| AKYD-062 | Components — Navigation Shell gallery (AppShell screenshot / embed) | not-started | — | — |
| AKYD-063 | Components — Table, Pagination, Filter bar gallery | not-started | Depends on Table component shipping | — |
| AKYD-064 | Components — Overlay gallery (Dialog, Drawer, Tooltip, Dropdown) | not-started | Depends on Overlay components shipping | — |
| AKYD-065 | Components — Feedback gallery (Alert, Toast, Empty state, Skeleton) | not-started | Depends on Feedback components shipping | — |
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
