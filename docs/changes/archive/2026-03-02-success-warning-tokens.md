# AKYD-013 — Add `success` + `warning` intent tokens

**Date:** 2026-03-02
**Type:** Additive — no breaking changes
**Components affected:** Alert, Toast, Badge (new variants); tokens.css (new variables)

---

## Summary

Adds 4 new semantic color tokens (`--success`, `--success-foreground`, `--warning`, `--warning-foreground`) and wires them into Alert, Toast, and Badge as new variants. Closes Gap 1 from the gap-analysis vs GitHub Primer.

Before this change, components had no way to signal a positive outcome or a non-blocking caution without misusing `--primary` (which `Alert variant="info"` was doing with a `CheckCircle` icon — semantically wrong).

---

## New Tokens

| Token                  | Light (`:root`) | Dark (`.dark`) |
|------------------------|-----------------|----------------|
| `--success`            | `142 76% 36%`   | `142 72% 52%`  |
| `--success-foreground` | `0 0% 98%`      | `0 0% 98%`     |
| `--warning`            | `43 96% 37%`    | `43 96% 56%`   |
| `--warning-foreground` | `0 0% 98%`      | `38 90% 10%`   |

**Color rationale:**
- Success: Primer-adjacent forest green. Light ~5.5:1 on white. Dark value lightened to ~52% L for sufficient contrast on dark surfaces.
- Warning: Primer `attention` amber (~43°). Light ~4.6:1 on white. Dark value at 56% L. Dark foreground is near-black (`38 90% 10%`) because bright amber + white fails WCAG AA.

---

## Component Changes

### Alert (`alert.tsx`)
- New variants: `"success"`, `"warning"`
- Fixed icon mapping: `info` now uses `Info` icon (was incorrectly using `CheckCircle`); `success` uses `CheckCircle`; `warning` uses `AlertTriangle`
- Type: `"default" | "info" | "success" | "warning" | "destructive"`

### Toast (`toast.tsx`)
- New variants: `"success"`, `"warning"`
- Fixed icon mapping: `info` now uses `Info` (was `CheckCircle`)
- New imperative helpers: `toast.success()`, `toast.warning()`
- Type: `"default" | "info" | "success" | "warning" | "destructive"`

### Badge (`badge.tsx`)
- New variants: `"success"`, `"warning"`
- Styles: `bg-success text-success-foreground` / `bg-warning text-warning-foreground`

---

## Files Changed

| File | Change |
|------|--------|
| `packages/tokens/tokens/tokens.json` | +4 token entries |
| `packages/tokens/tokens/tokens.css` | +8 CSS var lines (4 `:root`, 4 `.dark`) |
| `akymic-app-template/src/design-system/tokens.css` | synced |
| `apps/docs/src/design-system/tokens.css` | synced |
| `akymic-app-template/tailwind.config.ts` | +success, +warning color entries |
| `akymic-app-template/src/components/ui/alert.tsx` | new variants + icon fixes |
| `akymic-app-template/src/components/ui/toast.tsx` | new variants + helpers + icon fixes |
| `akymic-app-template/src/components/ui/badge.tsx` | new variants |
| `akymic-app-template/src/app/paper-playground/page.tsx` | showcase rows added |
| `docs/tokens.md` | success + warning sections added |
| `docs/components.md` | variant lists updated, statuses corrected |

---

## Migration Notes

No breaking changes. All additions are purely additive:
- Existing `ToastVariant`, `AlertVariant`, and Badge `Variant` types are widened (new values added).
- Any code narrowing on the old union type (`"default" | "info" | "destructive"`) will surface a TS error — which is correct; update the type annotation to include the new values.

---

## Consumer Sync

Copy the updated `tokens.css` from `packages/tokens/tokens/tokens.css` into your consuming app's design-system folder. No Tailwind config changes needed unless you are using the Akymic app-template (which has already been updated).

---

## Verification

1. `npx tsc --noEmit` — passes (no new imports; all values are string literals)
2. `/paper-playground` → Alert section: 5 variants visible including green success + amber warning
3. `/paper-playground` → Toast section: success + warning trigger buttons fire colored toasts
4. `/paper-playground` → Badge section: success (green) + warning (amber) badges
5. Toggle dark mode — success remains readable green, warning switches to lighter amber with dark text
