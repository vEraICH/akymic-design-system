# Akymic DS — Gap Analysis vs GitHub Primer

**Date:** 2026-03-02
**Reference:** GitHub Primer design system (primer.style)
**Baseline:** Akymic DS current state (shadcn/ui token model + Tailwind)

---

## Context

Akymic DS uses shadcn/ui as its **technical foundation** (copy-paste model, Tailwind, CSS variables)
and GitHub Primer as its **design reference** (token semantics, component quality bar, accessibility standard).

This document records the gaps between our current state and the Primer reference, with a
recommended closure order.

---

## Gap 1 — Intent tokens: `success` + `warning`

**Priority:** High impact, Low effort — close next.

### What Primer has
Explicit functional color tokens for every intent:
- `--fgColor-success`, `--bgColor-success`
- `--fgColor-attention`, `--bgColor-attention` (warning/caution)
- `--fgColor-danger`, `--bgColor-danger` (destructive — we have this)
- `--fgColor-accent`, `--bgColor-accent` (info/primary — we have this)

### What we have
14 shadcn-baseline tokens. No `success` or `warning` semantic role.
Workarounds in current components:
- `Alert variant="info"` uses `bg-primary/10 text-primary` — semantically wrong for success states
- `toast.info()` / `toast.error()` — no `toast.success()` or `toast.warning()`
- `Badge` has no success/warning variant

### What closing it unlocks
- `Alert`: `variant="success"` and `variant="warning"` become real
- `Toast`: `toast.success()` and `toast.warning()` map to correct tokens
- `Badge`: `variant="success"` for status indicators (active, passing, online)
- Future: form validation success state, pipeline stage chips, CI status badges

### Work required
1. Add to `packages/tokens/tokens/tokens.json`:
   - `success` / `success-foreground` (light + dark)
   - `warning` / `warning-foreground` (light + dark)
2. Add to `packages/tokens/tokens/tokens.css` (`:root {}` + `.dark {}`)
3. Update `Alert` — add `success` and `warning` variants
4. Update `Toast` — add `toast.success()` and `toast.warning()`
5. Update `Badge` — add `success` and `warning` variants
6. Sync `tokens.css` into `apps/docs` design-system folder
7. Change note + docs update

---

## Gap 2 — Shadow tokens: `floating`, `resting`, `inset`

**Priority:** Medium impact, Low effort — close after Gap 1.

### What Primer has
- `--shadow-floating` — overlays, dropdowns, dialogs
- `--shadow-resting` — cards, panels at rest
- `--shadow-inset` — pressed/active states, inputs

### What we have
Hard-coded Tailwind shadow utilities: `shadow-xl` (Dialog, Drawer), nothing on Card.
These do not adapt to dark mode — dark surfaces typically need reduced or no shadow.

### What closing it unlocks
- Dialog/Drawer elevation feels intentional and theme-aware
- Cards can carry `resting` shadow and switch to `floating` on hover
- Dark mode can suppress or shift shadows independently from light mode
- One token change propagates to all uses across the component library

### Work required
1. Add `--shadow-floating`, `--shadow-resting`, `--shadow-inset` to tokens
2. Replace hard-coded shadow utilities in Dialog, Drawer, Card

---

## Gap 3 — Accessibility documentation per component

**Priority:** Medium impact, No code — close as governance hygiene.

### What Primer has
Every component page has a dedicated accessibility tab covering:
- Full keyboard navigation map (Tab, Shift+Tab, Enter, Space, Arrow keys, Escape, Home, End)
- ARIA roles, attributes, and live region patterns
- Screen reader announcement behaviour
- Known limitations

### What we have
No keyboard maps or ARIA notes in `docs/components.md`.
The implementations are largely correct (Dialog focus trap, Drawer Escape, Calendar arrow nav)
but undocumented — consumers have to read source code to understand keyboard behaviour.

### Work required
Extend `docs/components.md` with a keyboard + ARIA section per interactive component:
Button, Input, Textarea, Dialog, Drawer, Toast, Calendar, Table (sortable headers).

---

## Gap 4 — Component-state tokens

**Priority:** Low — revisit when customer theming is required.

### What Primer has
Per-component, per-variant, per-state tokens:
- `--button-primary-bgColor-rest`
- `--button-primary-bgColor-hover`
- `--button-primary-bgColor-active`
- `--button-primary-bgColor-disabled`
- (× each variant: primary, danger, outline, invisible)

### What we have
Tailwind modifiers: `bg-primary hover:bg-primary/90`.
Functionally identical at current scale.

### Why we defer
Migrating to per-state tokens would add ~40 tokens and require rewriting every component's
class list. The payoff — independent override of hover vs rest colour — is only needed when
external teams need customer-facing theme overrides. We don't have that requirement yet.

### Trigger to revisit
A product team needs to override button hover independently of button rest colour.

---

## Gap 5 — Data visualisation palette

**Priority:** Skip — not on roadmap.

### What Primer has
Named palettes for charts and data viz:
- auburn, blue, coral, cyan, green, lemon, lime, olive, orange, pine, pink, plum, purple, red, teal

### Decision
No chart components planned. Defer indefinitely.

---

## Summary

| Gap | Impact | Effort | Status |
|-----|--------|--------|--------|
| 1. Intent tokens (success + warning) | High | Low | **Closed** (2026-03-02) |
| 2. Shadow tokens | Medium | Low | **Closed** (2026-03-02) |
| 3. Accessibility docs | Medium | None (writing only) | **Closed** (2026-03-03) — see components.md#accessibility |
| 4. Component-state tokens | Low | High | Defer — revisit on customer theming need |
| 5. Data viz palette | None | — | Skip |
