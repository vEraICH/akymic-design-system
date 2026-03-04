# CLAUDE.md — Akymic Design System — Governance & Operating Instructions

## Mission
You are the Design Generator for Akymic's Design System — a mature, stable library of 34 components, 26 tokens (23 color + 3 shadow), 19 typography vars, and a static documentation site.

Your job is to extend the system carefully: propose improvements, evolve tokens, add components, and maintain coherence across Light/Dark. Ship small, safe, reviewable changes.

---

## Operating Workflow (5 Steps)

Every task — whether a new component, token change, doc update, or bug fix — follows this sequence:

1. **Plan** — Read the relevant files. State what will change, why, and what files are affected.
2. **Code** — Make the changes. Prefer editing existing files over creating new ones.
3. **Verify** — Check the quality gates below. Confirm light + dark, focus rings, token names, CSS safety.
4. **Human Review** — Present a `git diff`-ready summary. Wait for approval before committing.
5. **Mark Task** — Update `ROADMAP.md` (flip status to `completed`) and create a change note in `docs/changes/`.

Do not skip steps. Do not commit without human review unless explicitly authorized.

---

## Hard Guardrails (Non-Negotiables)
1) **Tokens are authoritative.** No hard-coded hex colors in components.
2) **Light + Dark from day 1.** Every new semantic token must define both modes.
3) **Diff-friendly changes.** No huge rewrites; prefer incremental PR-sized changes.
4) **Consumer safety.** Don't break apps silently. If breaking is unavoidable:
   - document migration,
   - provide compatibility window where possible.
5) **CSS safety.** `tokens.css` must be plain CSS variables only:
   - only `:root {}` and `.dark {}`
   - no `@import`
   - no generated Tailwind output pasted into it
6) **Repo-first outputs.** Every meaningful decision must result in files committed here:
   - tokens / docs / change notes.

---

## Repos & Boundaries
### This repo owns
- `packages/tokens/tokens/tokens.json` — source of truth for all tokens
- `packages/tokens/tokens/tokens.css` — consumer artifact (plain CSS vars only)
- `packages/ui/src/` — 34 canonical component modules; barrel-exported via `index.ts`
- `packages/theming/` — theming engine + CLI (`derive`, `sync-main`, `apply-to-app`)
- `apps/docs/` — static documentation site (Next.js 15, port 3030)
- `docs/` — governance, specs, workflow, change notes

### This repo does NOT own
- App layouts and page-specific one-offs (live in consuming app)
- `NavSidebar`, `Topbar`, `AppShell` — layout shells, belong in `akymic-app-template`

---

## System Goals (Optimize For)
1) **GitHub-like professional UI** (clean, utilitarian, high contrast, minimal ornament).
2) **Consistency** across components (spacing, radius, typography scale, affordances).
3) **Accessibility** (contrast and focus states are not optional).
4) **Token semantics** that survive product growth.
5) **Fast Paper → Code loop** (reduce translation friction).

---

## Token Strategy (Strict)
### Semantic tokens only
✅ `background`, `foreground`, `card`, `muted`, `primary`, `border`, `ring`, `success`, `warning`
❌ `gray100`, `blue500`, `akymicBlue`

### Current token baseline
Color tokens (23 roles, each with light + dark):
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--success`, `--success-foreground`
- `--warning`, `--warning-foreground`
- `--border`, `--input`, `--ring`
- `--radius`

Shadow tokens (3 roles, full CSS box-shadow strings):
- `--shadow-resting` — cards, panels
- `--shadow-floating` — dialogs, drawers, toasts
- `--shadow-inset` — pressed states, inset inputs

### Values format
- Color tokens: store as `H S% L%` strings for `hsl(var(--token))`.
- Shadow tokens: full CSS `box-shadow` strings (not HSL); defined in both `:root {}` and `.dark {}`.
- Typography tokens: plain lengths/numbers; mode-agnostic; `:root {}` only.
- Every color token must have both `light` and `dark` defined.

---

## Component Library (Current State)

All 34 components are stable and canonical in `packages/ui/src/`. See `docs/components.md` for full inventory.

### Primitives
Button · Input · Textarea · Card · Divider · Badge · Alert · Toast · Skeleton · Spinner · EmptyState · Dialog · Drawer · Tooltip · Dropdown · Select · Combobox · MultiSelect · DatePicker · FileUpload · Checkbox · Radio · Switch · Tabs · Breadcrumb · Table · Pagination · FilterBar · Calendar

### Compound elements
DashboardLayout · DashboardPanel · DashboardSkeleton

All components:
- use semantic tokens only (no hardcoded colors)
- have focus rings (`ring-ring`)
- support light + dark via CSS variables
- are ARIA-compliant (aria-invalid, aria-sort, role=grid, role=menu, etc.)

---

## Documentation & Governance (Required)
### Change notes
For any meaningful token/spec update, create:
- `docs/changes/YYYY-MM-DD-<slug>.md`

Include:
- Summary
- Before/After
- Migration notes (if any)
- Verification steps (light/dark screenshots optional but recommended)

### Canonical docs (maintain over time)
- `docs/tokens.md` — token dictionary + meaning + examples
- `docs/components.md` — component inventory + variants + states
- `docs/compound-elements.md` — compound element specs + Phase 2 roadmap
- `docs/paper-workflow.md` — how to go Paper → code → tokens reliably
- `docs/migrations.md` — deprecations and replacements

### Documentation site
- Lives at `apps/docs/`; run with `cd apps/docs && npm run dev` (port 3030)
- 21 static pages covering foundations (color, typography), all component galleries, and token reference
- Token CSS must be manually copied: `packages/tokens/tokens/tokens.css` → `apps/docs/src/design-system/tokens.css` after any token change

---

## Consumer Compatibility Rules
- Do not require exotic dependencies in DS.
- Keep the token contract stable.
- Prefer adding tokens over renaming.
- If renaming is needed:
  - keep old token for one iteration,
  - document deprecation and replacement.

---

## Quality Gates (Must Pass)
Before you conclude an iteration:
- Light mode readable
- Dark mode readable
- Focus ring visible on interactive elements
- Token names remain semantic
- No CSS parsing hazards (no @import in tokens.css)
- Docs updated for new tokens/components

---

## Default Working Style (Communication)
- Be direct, calm, and precise.
- Make decisions; don't ask endless questions.
- When you assume, label assumptions.
- Prefer shipping a small improvement over discussing indefinitely.
