# AKYD-014 — Shadow tokens: `resting`, `floating`, `inset`

**Date:** 2026-03-02
**Type:** Additive + component update — no API breaking changes
**Components affected:** Card, Dialog, Drawer, Toast

---

## Summary

Closes Gap 2 from the gap-analysis. Adds three semantic shadow tokens and replaces all hard-coded Tailwind shadow utilities in the component library. Shadows now adapt to dark mode — previously all components used the same shadow regardless of theme.

---

## New Tokens

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--shadow-resting` | Cards/panels at rest | `0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.06)` | `0 1px 3px 0 rgb(0 0 0 / 0.35), 0 1px 2px -1px rgb(0 0 0 / 0.25)` |
| `--shadow-floating` | Overlays — Dialog, Drawer, Toast | `0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.08)` | `0 20px 25px -5px rgb(0 0 0 / 0.50), 0 8px 10px -6px rgb(0 0 0 / 0.35)` |
| `--shadow-inset` | Pressed/active states, input depth | `inset 0 1px 2px 0 rgb(0 0 0 / 0.06)` | `inset 0 1px 3px 0 rgb(0 0 0 / 0.30)` |

Shadow tokens store **full CSS `box-shadow` strings**, not HSL components. Use as `box-shadow: var(--shadow-resting)` or via Tailwind utilities.

---

## Tailwind Utilities Added

```ts
// tailwind.config.ts — theme.extend.boxShadow
shadow-resting   → var(--shadow-resting)
shadow-floating  → var(--shadow-floating)
shadow-inset     → var(--shadow-inset)
```

---

## Component Changes

| Component | Before | After |
|-----------|--------|-------|
| Card | `shadow-sm` (Tailwind default, light-only) | `shadow-resting` |
| Dialog panel | `shadow-xl` | `shadow-floating` |
| Drawer panel | `shadow-xl` | `shadow-floating` |
| Toast card | `shadow-lg` | `shadow-floating` |

---

## Files Changed

| File | Change |
|------|--------|
| `packages/tokens/tokens/tokens.json` | +`shadows` section with 3 entries |
| `packages/tokens/tokens/tokens.css` | +3 vars in `:root`, +3 vars in `.dark` |
| `akymic-app-template/src/design-system/tokens.css` | synced |
| `apps/docs/src/design-system/tokens.css` | synced |
| `akymic-app-template/tailwind.config.ts` | +`boxShadow` extension |
| `akymic-app-template/src/components/ui/card.tsx` | shadow-sm → shadow-resting |
| `akymic-app-template/src/components/ui/dialog.tsx` | shadow-xl → shadow-floating |
| `akymic-app-template/src/components/ui/drawer.tsx` | shadow-xl → shadow-floating |
| `akymic-app-template/src/components/ui/toast.tsx` | shadow-lg → shadow-floating |
| `docs/tokens.md` | Shadow Tokens section added |
| `docs/gap-analysis.md` | Gap 2 marked closed |

---

## Migration Notes

No breaking changes. The Tailwind class names changed (`shadow-sm` → `shadow-resting` etc.) only inside DS components — consuming apps that use Card/Dialog/Drawer/Toast directly will pick up the new shadows automatically.

If you use `shadow-xl` or `shadow-lg` directly in your app code for DS-adjacent surfaces (panels, popovers), consider switching to `shadow-floating` for theme-awareness.

---

## Consumer Sync

Copy updated `tokens.css` from `packages/tokens/tokens/tokens.css` into your app's design-system folder.

---

## Verification

1. `npx tsc --noEmit` — passes
2. `npm run build` — passes
3. Light mode: Card has subtle lift; Dialog/Drawer/Toast have strong but clean elevation
4. Dark mode: shadows visibly adapt — higher opacity to read against dark backgrounds
