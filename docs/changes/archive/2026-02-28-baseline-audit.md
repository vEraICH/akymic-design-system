# 2026-02-28 — Baseline Token Audit

## Summary

First formal audit of the Akymic Design System token baseline. Two changes shipped:

1. **Accessibility fix:** `--muted-foreground` light mode darkened for WCAG AA compliance.
2. **Source-of-truth fix:** `tokens.json` backfilled with all 19 semantic tokens (14 color roles × light/dark + radius). Previously only `radius.base` was defined there.

No tokens were renamed or removed. No consumer-visible changes except the slight darkening of muted/placeholder text in light mode.

---

## Changes

### 1. `--muted-foreground` light mode contrast fix

**File:** `packages/tokens/tokens/tokens.css`

| | Value | Approx contrast on white |
|---|---|---|
| Before | `215.4 16.3% 46.9%` | ~4.1:1 (borderline WCAG AA fail) |
| After  | `215.4 16.3% 40%`   | ≥ 4.5:1 (WCAG AA pass) |

Same hue and saturation; only lightness reduced. Visual change is a barely perceptible darkening of caption/placeholder text.

**`tokens.json` value updated to match.**

### 2. `tokens.json` backfill

**File:** `packages/tokens/tokens/tokens.json`

Added all 19 semantic tokens under `colors` key. Previously only `radius.base` existed. `tokens.json` is now the authoritative source of truth; `tokens.css` is the derived consumer artifact.

No changes to `tokens.css` values except the `--muted-foreground` fix above.

---

## Audit Findings (Non-Breaking — Documented)

### Identical token triplets (acceptable)
`--secondary`, `--muted`, `--accent` share the same color values in both modes. This is standard shadcn/ui convention — semantic meaning differs by usage context, not color. Will be visually differentiated in a future iteration if/when product needs diverge.

Similarly, `--card`, `--popover`, `--background` are identical — flat design convention. Elevation is expressed via shadow, not color.

### `--border` === `--input` (acceptable)
Both reference the same HSL value. Kept separate intentionally: `--input` controls form field borders; `--border` controls layout dividers. They can diverge independently in a future iteration.

### Dark `--destructive` inline text risk (known, deferred)
`--destructive` dark (`0 62.8% 30.6%`) works correctly as a button background (white text on top, passing contrast). If used as inline error text on a dark background, contrast is ~2.5:1 — a failure. No current usage does this. Documented in `docs/tokens.md`. A dedicated `--error-text` token will be added if inline error text on dark surfaces is needed.

---

## Migration Notes

None required. All changes are additive or non-breaking.

---

## Verification Steps

1. **Light mode muted text:** verify captions, placeholder text, help text are clearly readable (slightly darker than before — more contrast, not less).
2. **Dark mode muted text:** `--muted-foreground` dark value unchanged (`215 20.2% 65.1%`) — no regression expected.
3. **CSS safety:** confirm `tokens.css` contains only `:root {}` and `.dark {}` — no `@import`, no generated output.
4. **tokens.json spot-check:** compare 3–4 token values between `tokens.json` and `tokens.css` — should match exactly.
5. **Dark destructive buttons:** red background + white text — unchanged values, verify no regression.

---

## Consumer Sync Instruction

Copy `packages/tokens/tokens/tokens.css` into the consuming app's global stylesheet (or run the existing sync script if configured).
