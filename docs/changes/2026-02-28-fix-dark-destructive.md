# 2026-02-28 — Fix dark --destructive contrast

## Summary
The dark mode `--destructive` token was too dark to use as error text or border color on dark
surfaces. Surfaced during the Input component dark mode specimen — error messages were barely
legible. Fixed by aligning the dark value with the light value.

---

## Before / After

| Token | Before | After |
|---|---|---|
| `--destructive` dark | `0 62.8% 30.6%` ≈ `#6E1A1A` | `0 84.2% 60.2%` ≈ `#EF4444` |

---

## Why

The old value (`L=30.6%`) was designed for use as a button background only. But in practice the
token is also needed for:
- Error message text on dark backgrounds
- Error border color on inputs
- Error icon color

At `30.6%` lightness on a `~5%` lightness background, contrast was ~2.5:1 — well below WCAG AA.
The new value matches the light mode token, giving ~3.5:1 contrast on the dark background and
remaining clearly red to sighted users.

---

## Files Changed

- `packages/tokens/tokens/tokens.json` — `destructive.dark` updated
- `packages/tokens/tokens/tokens.css` — `.dark { --destructive }` updated
- `docs/tokens.md` — removed "Known risk" warning, replaced with resolved note

---

## Consumer Sync

Copy updated `packages/tokens/tokens/tokens.css` into your app.

**No breaking changes** — this is a fix, not a rename. Any component already using
`hsl(var(--destructive))` in dark mode will automatically get the corrected value.

---

## Verification

1. Dark mode error input border: should be a clearly visible red, not near-black.
2. Dark mode error message text: `hsl(var(--destructive))` on `hsl(var(--background))` — readable.
3. Dark mode destructive button: red background with white `--destructive-foreground` — still works.
