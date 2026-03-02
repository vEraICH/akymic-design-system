# Akymic Design System — Roadmap

> Living document. Status is updated after each iteration.
> To adjust: edit rows, add rows, or change the Status column.
>
> **Status values:** `done` · `next` · `planned` · `deferred` · `in-progress`

---

## Foundations

| Task | Status | Notes |
|------|--------|-------|
| Color token system — 14 semantic roles (light + dark) | done | `tokens.json` + `tokens.css` |
| Radius token (`--radius: 0.75rem`) | done | Part of token baseline |
| `--muted-foreground` light contrast fix (46.9% → 40% L) | done | WCAG AA compliance |
| `--destructive` dark contrast fix (30.6% → 60.2% L) | done | Readable on dark bg |
| Typography scale — 19 vars (size, weight, leading, tracking, family) | done | `--text-*`, `--font-*`, `--leading-*`, `--tracking-*` |
| Spacing scale token | planned | `--space-*` vars mirroring Tailwind scale |

---

## Components — Interactive

| Task | Status | Notes |
|------|--------|-------|
| Button — 5 variants × 3 sizes × 5 states | done | `ui/button.tsx` |
| Input — default + error state | done | `ui/input.tsx` |
| Textarea — default + error | planned | Mirrors Input API; `error` prop |
| Select — default + error | planned | Native `<select>` wrapper first |
| Checkbox | planned | — |
| Radio | planned | — |
| Switch | planned | — |

---

## Components — Layout & Containment

| Task | Status | Notes |
|------|--------|-------|
| Card — CardHeader, CardTitle, CardDescription, CardContent, CardFooter | done | `ui/card.tsx` |
| Badge — 4 variants × 2 sizes | done | `ui/badge.tsx` |
| Divider — horizontal (plain + labeled), vertical | done | `ui/divider.tsx` |

---

## Components — Navigation

| Task | Status | Notes |
|------|--------|-------|
| AppShell — server-safe layout wrapper | done | `components/app-shell.tsx` |
| NavSidebar — 240px, 2 sections, active state | done | `ui/nav-sidebar.tsx` |
| Topbar — title, icons, theme toggle, avatar | done | `ui/topbar.tsx` |
| Breadcrumb | planned | — |
| Tabs | planned | — |

---

## Components — Overlay

| Task | Status | Notes |
|------|--------|-------|
| Dialog | planned | Focus trap; `--popover` + `--ring` |
| Drawer | planned | Side-anchored dialog |
| Tooltip | planned | `--popover`; hover-triggered |
| Dropdown menu | planned | `--popover` + `--accent` hover |

---

## Components — Data Display

| Task | Status | Notes |
|------|--------|-------|
| Table — sortable columns, row stripes | next | `--muted` stripes; `--border` lines |
| Pagination | next | Pairs with Table |
| Filter bar | next | Search input + badge filters |

---

## Components — Feedback

| Task | Status | Notes |
|------|--------|-------|
| Alert — info, warning, error, success | planned | Inline; no JS dependency |
| Toast — info, warning, error, success | planned | Requires state; consider `sonner` |
| Empty state | planned | Illustration slot + action |
| Skeleton / Loading | planned | Pulse animation; mirrors real layouts |

---

## App Template

| Task | Status | Notes |
|------|--------|-------|
| Initial Next.js 15 + Tailwind + next-themes setup | done | `akymic-app-template` |
| Token sync from DS repo | done | `scripts/sync-tokens.sh` + `.ps1` |
| Dashboard page with AppShell | done | `app/page.tsx` |
| DS Showcase link on dashboard | done | Links to `/paper-playground` |
| Paper playground — Button + Input showcase | done | `app/paper-playground/page.tsx` |
| Paper playground — Badge + Divider + Card showcase | done | Added 2026-03-02 |
| AGENT.md — agent-native guide for app development | done | Root of `akymic-app-template` |
| Table + Pagination demo page | planned | Pairs with component work |
| Forms demo page (all input types + validation) | planned | Textarea, Select, Checkbox, etc. |

---

## Paper Artboards (Design Specs)

| Task | Status | Notes |
|------|--------|-------|
| Type Scale Specimen (light) | done | Existing in Paper file |
| Button Component — Light | done | Existing in Paper file |
| Button Component — Dark | done | Existing in Paper file |
| Input Component — Light | done | Existing in Paper file |
| Input Component — Dark | done | Existing in Paper file |
| Navigation Shell — Light | deferred | MCP weekly limit; resets ~2026-03-07 |
| Navigation Shell — Dark | deferred | MCP weekly limit; resets ~2026-03-07 |
| Cards + Dividers + Badges — Light | planned | After MCP limit resets |
| Cards + Dividers + Badges — Dark | planned | After MCP limit resets |
| Table Component — Light | planned | After Table code is done |
| Table Component — Dark | planned | After Table code is done |

---

## Governance & DX

| Task | Status | Notes |
|------|--------|-------|
| `docs/tokens.md` — token dictionary | done | Full reference with do/don't |
| `docs/components.md` — component inventory | done | Auto-updated each iteration |
| `docs/paper-workflow.md` — Paper → code → token workflow | done | — |
| `docs/migrations.md` — deprecation log | done | Empty; ready for first entry |
| `docs/changes/` — per-iteration change notes | done | 4 notes filed so far |
| `AGENT.md` (DS repo) — agent-native DS contract | done | Token format, workflow, quality gates |
| `AGENT.md` (app-template) — agent-native build guide | done | Component APIs, patterns, rules |
| `ROADMAP.md` — this file | done | — |
| Automated token validation (CI lint) | planned | Check HSL format, required light+dark |
| Storybook or alternative component explorer | planned | Evaluate: Storybook vs Histoire vs custom |
