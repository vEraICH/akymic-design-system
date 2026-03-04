# 2026-03-04 — Motion Token System

## Summary
Introduces a governed motion system to the Akymic Design System. Nine semantic CSS variables
(5 duration + 4 easing) replace scattered hardcoded values across all animated components,
ensuring timing is consistent, themeable, and respects `prefers-reduced-motion`. Two dead
`tailwindcss-animate` usages in Dropdown and Tooltip are replaced with a native Tailwind
keyframe (`animate-zoom-in-95`) defined in the config.

## What changed

**Token layer:**
- `packages/tokens/tokens/tokens.json` — added `motion.duration` (5 vars) and `motion.easing` (4 vars)
- `packages/tokens/tokens/tokens.css` — added 9 motion vars to `:root {}`

**Tailwind config:**
- `apps/docs/tailwind.config.ts` — extended `transitionDuration`, `transitionTimingFunction`,
  `keyframes`, and `animation`; generates `duration-{instant,fast,normal,slow,slower}`,
  `ease-{standard,enter,exit,spring}`, `animate-zoom-in-95`, `animate-fade-in`

**Accessibility:**
- `apps/docs/src/app/globals.css` — added `@media (prefers-reduced-motion: reduce)` block

**Components updated (packages/ui/src/):**
- `dropdown.tsx` — `animate-in fade-in-0 zoom-in-95 duration-100` → `animate-zoom-in-95`; `duration-100` → `duration-fast`
- `tooltip.tsx` — `animate-in fade-in-0 zoom-in-95 duration-100` → `animate-zoom-in-95`
- `dialog.tsx` — `duration-200` → `duration-normal`; added `ease-standard` / `ease-enter`
- `drawer.tsx` — `duration-300` → `duration-slow`; `ease-in-out` → `ease-enter` / `ease-standard`
- `toast.tsx` — `duration-300` → `duration-slow`; added `ease-enter`
- `switch.tsx` — `duration-200 ease-in-out` → `duration-normal ease-standard` (×2)
- `checkbox.tsx`, `radio.tsx`, `tabs.tsx`, `breadcrumb.tsx` — `duration-150` → `duration-fast`
- `combobox.tsx`, `select.tsx`, `multi-select.tsx` — `duration-150` → `duration-fast`

## New tokens

| CSS var | Value | Semantic use |
|---|---|---|
| `--duration-instant` | `50ms` | Toggles, immediate feedback |
| `--duration-fast` | `100ms` | Dropdown/Tooltip/micro-interactions |
| `--duration-normal` | `200ms` | Dialog, button state changes, focus rings |
| `--duration-slow` | `300ms` | Drawer, Toast, slide transitions |
| `--duration-slower` | `500ms` | Reserved for complex layout shifts |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | General purpose, slightly decelerated |
| `--ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements arriving (decelerate into place) |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving (accelerate out) |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Subtle overshoot (badges, confirmations) |

## New Tailwind utilities

| Utility | Maps to |
|---|---|
| `duration-instant` | `var(--duration-instant)` |
| `duration-fast` | `var(--duration-fast)` |
| `duration-normal` | `var(--duration-normal)` |
| `duration-slow` | `var(--duration-slow)` |
| `duration-slower` | `var(--duration-slower)` |
| `ease-standard` | `var(--ease-standard)` |
| `ease-enter` | `var(--ease-enter)` |
| `ease-exit` | `var(--ease-exit)` |
| `ease-spring` | `var(--ease-spring)` |
| `animate-zoom-in-95` | Keyframe: `scale(0.95) + opacity:0 → scale(1) + opacity:1` at `--duration-fast` / `--ease-enter` |
| `animate-fade-in` | Keyframe: `opacity:0 → opacity:1` at `--duration-fast` / `--ease-enter` |

## Migration notes

No breaking changes. All Tailwind default `duration-*` classes remain available — the new tokens
extend the existing scale with named aliases that reference CSS vars. Consumer apps should:
1. Copy updated `packages/tokens/tokens/tokens.css` into `src/design-system/tokens.css`
2. Add the `transitionDuration`, `transitionTimingFunction`, `keyframes`, and `animation`
   extensions to their own `tailwind.config.ts`
3. Add the `prefers-reduced-motion` block to their `globals.css`

## Verification steps

1. Open Dialog in light + dark — confirm scale-in animation plays on open
2. Open Drawer — confirm slide-in from correct side
3. Hover over a Tooltip — confirm fade+zoom plays
4. Open a Dropdown — confirm zoom-in-95 plays
5. Toggle a Switch — confirm smooth color + thumb translate
6. Enable OS "Reduce Motion" — confirm all transitions collapse to instant
