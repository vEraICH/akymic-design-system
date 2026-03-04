# Motion System Sync — App Template Consumer Playground

**Date:** 2026-03-04
**Branch:** feature/motion
**Scope:** `akymic-app-template/` (12 files)

---

## Summary

Synced the motion token system (introduced in the DS on this branch) to the `akymic-app-template` consumer playground. The app template is now a faithful consumer of the DS motion system.

---

## Changes

### Config layer (3 files)

| File | Change |
|------|--------|
| `src/design-system/tokens.css` | Added 9 motion vars: `--duration-instant/fast/normal/slow/slower` + `--ease-standard/enter/exit/spring` in `:root {}` |
| `tailwind.config.ts` | Extended with `transitionDuration`, `transitionTimingFunction`, `keyframes` (`zoom-in-95`, `fade-in`), `animation` |
| `src/app/globals.css` | Appended `@media (prefers-reduced-motion: reduce)` block — collapses all animations/transitions to 0.01ms |

### Component layer — duration normalization (7 files)

Replaced hardcoded Tailwind duration/easing classes with semantic motion tokens:

| File | Before | After |
|------|--------|-------|
| `dialog.tsx` overlay | `duration-200` | `duration-normal ease-standard` |
| `dialog.tsx` panel | `duration-200` | `duration-normal ease-enter` |
| `drawer.tsx` overlay | `duration-300` | `duration-slow ease-standard` |
| `drawer.tsx` panel | `duration-300 ease-in-out` | `duration-slow ease-enter` |
| `toast.tsx` | `duration-300` | `duration-slow ease-enter` |
| `switch.tsx` track | `duration-200` | `duration-normal ease-standard` |
| `switch.tsx` thumb | `duration-200` | `duration-normal ease-standard` |
| `combobox.tsx` chevron | `duration-150` | `duration-fast` |
| `select.tsx` chevron | `duration-150` | `duration-fast` |
| `multi-select.tsx` chevron | `duration-150` | `duration-fast` |

### Component layer — full replacement (2 files)

| File | Reason |
|------|--------|
| `dropdown.tsx` | Old version delegated to `PopoverPanel` (no `createPortal`, no Escape key, no `align` prop, no `animate-zoom-in-95`). Replaced with DS canonical: direct `createPortal`, full keyboard nav (Escape returns focus to trigger, wrapping ArrowUp/Down), `animate-zoom-in-95` entry animation, viewport clamping. |
| `tooltip.tsx` | Old version lacked viewport flip/clamp, had no `className` prop, used inverted `bg-foreground` style, no entry animation, no SSR guard. Replaced with DS canonical: viewport flip on all 4 axes, `animate-zoom-in-95`, `className` prop, SSR-safe `typeof document !== "undefined"`. |

---

## Migration Notes

No breaking changes for app template consumers. The new `DropdownMenu` API adds an optional `align` prop (`"start"` | `"end"`, default `"start"`). The new `Tooltip` API adds an optional `className` prop.

---

## Verification Checklist

- [ ] Dev server starts: `cd akymic-app-template && npm run dev`
- [ ] DevTools → Computed → filter `--duration` — 5 duration + 4 easing vars present
- [ ] Dialog open/close — scale 0.95→1.0 at 200ms (`duration-normal`)
- [ ] Drawer open/close — slide at 300ms (`duration-slow`)
- [ ] Toast fire — slide-up at 300ms (`duration-slow`)
- [ ] Switch toggle — smooth 200ms (`duration-normal`)
- [ ] Dropdown open — `animate-zoom-in-95` entry at 100ms (`duration-fast`)
- [ ] Tooltip hover — `animate-zoom-in-95` entry at 100ms (`duration-fast`)
- [ ] DevTools → Rendering → emulate `prefers-reduced-motion: reduce` → all animations instant
- [ ] Light + dark modes — animations work in both
