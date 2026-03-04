# 2026-02-28 — Typography Scale

## Summary
Establishes the type scale contract for the Akymic Design System. Adds 19 new CSS custom
properties covering font families, size steps, weights, line heights, and letter spacing. All future
components (Buttons, Inputs, Navigation, etc.) will reference these tokens rather than hard-coded
values.

---

## What Changed

### `packages/tokens/tokens/tokens.json`
Added `typography` section with five sub-groups:
- `fontSize` — 8 steps: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
- `fontWeight` — 4 steps: normal, medium, semibold, bold
- `lineHeight` — 4 steps: tight, snug, normal, relaxed
- `letterSpacing` — 4 steps: tight, normal, wide, widest
- `fontFamily` — 2 families: sans, mono

### `packages/tokens/tokens/tokens.css`
Appended 19 CSS variables inside `:root {}`. No `.dark {}` changes (typography is mode-agnostic).

```css
--font-sans / --font-mono
--text-xs / --text-sm / --text-base / --text-lg / --text-xl / --text-2xl / --text-3xl / --text-4xl
--font-normal / --font-medium / --font-semibold / --font-bold
--leading-tight / --leading-snug / --leading-normal / --leading-relaxed
--tracking-tight / --tracking-normal / --tracking-wide / --tracking-widest
```

### `docs/tokens.md`
Added **Typography Tokens** section with tables for all five groups, usage guidance, and do/don'ts.

### `docs/components.md`
Typography scale status updated: `planned` → `stable`.

---

## Before / After

| | Before | After |
|---|---|---|
| Typography tokens | None | 19 CSS vars in `:root {}` |
| Font families | Not governed | `--font-sans`, `--font-mono` |
| Size scale | Ad hoc | xs → 4xl (0.75rem → 2.25rem) |
| Weights | Not governed | normal 400 → bold 700 |
| Line heights | Not governed | tight 1.25 → relaxed 1.625 |
| Letter spacing | Not governed | tight −0.025em → widest 0.1em |
| Documentation | No typography section | Full table + do/don'ts |

---

## Migration Notes

No breaking changes. This is a pure addition — no existing tokens were renamed or removed.

Tailwind v3 consumers can optionally map tokens to `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        xs:   'var(--text-xs)',
        sm:   'var(--text-sm)',
        base: 'var(--text-base)',
        lg:   'var(--text-lg)',
        xl:   'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
    },
  },
}
```

This is optional — using `font-size: var(--text-sm)` inline is equally valid.

---

## Consumer Sync

Copy `packages/tokens/tokens/tokens.css` into your app's global CSS import, or run the sync script
if one exists.

---

## Verification Steps

1. Open `tokens.css` — confirm 19 new vars in `:root {}`, `.dark {}` unchanged.
2. In a test component: `font-size: var(--text-sm)` → renders at 14px.
3. In a test component: `font-family: var(--font-mono)` → renders monospace.
4. Confirm `hsl(var(--text-sm))` is NOT used anywhere — size tokens are lengths, not HSL values.
5. Light + dark mode visual inspection — typography should be identical in both modes.

---

## Assumptions

- **A1:** 8-step size scale (xs–4xl) matches Tailwind conventions — familiar to shadcn consumers.
- **A2:** No `--text-*` tokens need light/dark variants (sizes are mode-agnostic).
- **A3:** `--font-sans` and `--font-mono` are the only required families; decorative/display fonts
  are out of scope for this foundation iteration.
- **A4:** Tailwind v3 mapping is optional guidance, not a requirement.
