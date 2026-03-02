# Akymic Design System — Roadmap

> Living document. Edit rows, add rows, or change the Status column directly.
> Completed tasks link to their change note in `docs/changes/`.
>
> **Status values:** `not-started` · `in-progress` · `completed` · `deferred` · `failed`

---

## Foundations

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| Color token system — 14 semantic roles (light + dark) | completed | 19 color vars in `tokens.json` + `tokens.css` | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| Radius token (`--radius: 0.75rem`) | completed | Part of token baseline | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| `--muted-foreground` light contrast fix (46.9% → 40% L) | completed | WCAG AA compliance | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| `--destructive` dark contrast fix (30.6% → 60.2% L) | completed | Readable as error text on dark bg | [2026-02-28-fix-dark-destructive](docs/changes/2026-02-28-fix-dark-destructive.md) |
| Typography scale — 19 vars (size, weight, leading, tracking, family) | completed | `--text-*`, `--font-*`, `--leading-*`, `--tracking-*` | [2026-02-28-typography-scale](docs/changes/2026-02-28-typography-scale.md) |
| Spacing scale token | not-started | `--space-*` vars mirroring Tailwind scale | — |

---

## Components — Interactive

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| Button — 5 variants × 3 sizes × 5 states | completed | `ui/button.tsx`; shipped in initial app-template setup | — |
| Input — default + error state | completed | `ui/input.tsx`; shipped in initial app-template setup | — |
| Textarea — default + error | not-started | Mirror Input API; `error` prop | — |
| Select — default + error | not-started | Native `<select>` wrapper first | — |
| Checkbox | not-started | — | — |
| Radio | not-started | — | — |
| Switch | not-started | — | — |

---

## Components — Layout & Containment

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| Card — CardHeader, CardTitle, CardDescription, CardContent, CardFooter | completed | `ui/card.tsx` | [2026-03-02-cards-dividers-badges](docs/changes/2026-03-02-cards-dividers-badges.md) |
| Badge — 4 variants × 2 sizes | completed | `ui/badge.tsx` | [2026-03-02-cards-dividers-badges](docs/changes/2026-03-02-cards-dividers-badges.md) |
| Divider — horizontal (plain + labeled), vertical | completed | `ui/divider.tsx` | [2026-03-02-cards-dividers-badges](docs/changes/2026-03-02-cards-dividers-badges.md) |

---

## Components — Navigation

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| AppShell — server-safe layout wrapper | completed | `components/app-shell.tsx` | [2026-03-01-navigation-shell](docs/changes/2026-03-01-navigation-shell.md) |
| NavSidebar — 240px, 2 sections, active state via `usePathname` | completed | `ui/nav-sidebar.tsx` | [2026-03-01-navigation-shell](docs/changes/2026-03-01-navigation-shell.md) |
| Topbar — title, icons, theme toggle, avatar | completed | `ui/topbar.tsx` | [2026-03-01-navigation-shell](docs/changes/2026-03-01-navigation-shell.md) |
| Breadcrumb | not-started | — | — |
| Tabs | not-started | — | — |

---

## Components — Overlay

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| Dialog | not-started | Focus trap; uses `--popover` + `--ring` | — |
| Drawer | not-started | Side-anchored dialog variant | — |
| Tooltip | not-started | Hover-triggered; uses `--popover` | — |
| Dropdown menu | not-started | Uses `--popover` + `--accent` for hover | — |

---

## Components — Data Display

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| Table — columns, row stripes, sorting affordance | not-started | `--muted` stripes; `--border` lines | — |
| Pagination | not-started | Pairs with Table | — |
| Filter bar — search input + badge chips | not-started | Pairs with Table | — |

---

## Components — Feedback

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| Alert — info, warning, error, success | not-started | Inline; no JS dependency | — |
| Toast — info, warning, error, success | not-started | Requires state; evaluate `sonner` | — |
| Empty state | not-started | Illustration slot + CTA action | — |
| Skeleton / Loading | not-started | Pulse animation; mirrors real layouts | — |

---

## App Template

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| Next.js 15 + Tailwind + next-themes setup | completed | Initial `akymic-app-template` repo | — |
| Token sync script | completed | `scripts/sync-tokens.sh` + `.ps1` | — |
| Dashboard page with AppShell | completed | `app/page.tsx` — greeting, stats, activity | [2026-03-01-navigation-shell](docs/changes/2026-03-01-navigation-shell.md) |
| Paper playground — Button + Input showcase | completed | `app/paper-playground/page.tsx` | — |
| Paper playground — Badge + Divider + Card showcase | completed | Added 2026-03-02 | [2026-03-02-cards-dividers-badges](docs/changes/2026-03-02-cards-dividers-badges.md) |
| DS Showcase link on dashboard | completed | Card + link from index → `/paper-playground` | — |
| Table + Pagination demo page | not-started | Pairs with Table component work | — |
| Forms demo page | not-started | Textarea, Select, Checkbox, Radio, Switch | — |

---

## Paper Artboards (Design Specs)

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| Type Scale Specimen (light) | completed | Existing in Paper file | — |
| Button Component — Light | completed | Existing in Paper file | — |
| Button Component — Dark | completed | Existing in Paper file | — |
| Input Component — Light | completed | Existing in Paper file | — |
| Input Component — Dark | completed | Existing in Paper file | — |
| Navigation Shell — Light | deferred | Paper MCP weekly limit; retry ~2026-03-07 | — |
| Navigation Shell — Dark | deferred | Paper MCP weekly limit; retry ~2026-03-07 | — |
| Cards + Dividers + Badges — Light | not-started | After MCP limit resets | — |
| Cards + Dividers + Badges — Dark | not-started | After MCP limit resets | — |
| Table Component — Light | not-started | After Table code ships | — |
| Table Component — Dark | not-started | After Table code ships | — |

---

## Documentation Site (`apps/docs/`)

> A static public-facing site — the designer communication tool.
> Reference: [primer.style/product](https://primer.style/product/)
> Lives in this repo at `apps/docs/`. Stack: Next.js + static export (`output: 'export'`), deployable to GitHub Pages or Vercel.
> Audience: human designers. Distinct from `akymic-app-template` (which is for developers + agents).

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| Site scaffold — Next.js static export, routing, token import, light/dark toggle | completed | `apps/docs/`; DocLayout sidebar + topbar; 4 pages live | — |
| Foundations — Color page: token palette browser (light + dark swatches, HSL values, Tailwind class) | completed | All 19 tokens grouped by role; both swatches always visible | — |
| Foundations — Typography page: type scale specimen, weight + leading examples | completed | Size scale, weight scale, leading table, font family preview | — |
| Foundations — Spacing + Radius page | not-started | Visual scale with pixel values | — |
| Components — Overview page: all components with status table | completed | Stable / planned / not-started counts; full inventory table | — |
| Components — Button gallery: all variants, sizes, states | not-started | Live rendered + code snippet per variant | — |
| Components — Input gallery: states + form group example | not-started | — | — |
| Components — Card gallery: standard, stat, list, interactive patterns | not-started | — | — |
| Components — Badge + Divider gallery | not-started | — | — |
| Components — Navigation Shell gallery (AppShell screenshot / embed) | not-started | — | — |
| Components — Table, Pagination, Filter bar gallery | not-started | Depends on Table component shipping | — |
| Components — Overlay gallery (Dialog, Drawer, Tooltip, Dropdown) | not-started | Depends on Overlay components shipping | — |
| Components — Feedback gallery (Alert, Toast, Empty state, Skeleton) | not-started | Depends on Feedback components shipping | — |
| Deploy — GitHub Pages or Vercel static hosting | not-started | Set up CI to publish on push to `main` | — |

---

## Governance & DX

| Task | Status | Notes | Change Note |
|------|--------|-------|-------------|
| `docs/tokens.md` — token dictionary | completed | Full reference with do/don't | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| `docs/components.md` — component inventory | completed | Updated each iteration | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| `docs/paper-workflow.md` — Paper → code → token workflow | completed | — | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| `docs/migrations.md` — deprecation log | completed | Empty; ready for first entry | [2026-02-28-baseline-audit](docs/changes/2026-02-28-baseline-audit.md) |
| `docs/changes/` — per-iteration change notes | completed | 5 notes filed | — |
| `AGENT.md` (DS repo) — agent-native DS contract | completed | Token format, workflow, quality gates | — |
| `AGENT.md` (app-template) — agent-native build guide | completed | Component APIs, patterns, hard rules | — |
| Automated token validation (CI lint) | not-started | Check HSL format, required light+dark | — |
| Storybook or alternative component explorer | not-started | Evaluate: Storybook vs Histoire vs custom | — |
