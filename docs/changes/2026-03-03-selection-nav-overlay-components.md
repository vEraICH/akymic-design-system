# 2026-03-03 — Selection, Navigation & Overlay Components

## Summary

Implemented 7 components (+ 1 utility) in `packages/ui/src/`, converting static doc-page mockups into real, consumable React components. All components are fully typed, accessible, and zero-dependency (React + React-DOM only, plus `clsx` + `tailwind-merge` for class composition).

---

## Components Added

### Selection Controls

| Component | File | Props |
|-----------|------|-------|
| `Checkbox` | `checkbox.tsx` | `checked`, `defaultChecked`, `onChange(boolean)`, `indeterminate`, `disabled`, `size: "sm" \| "md"` |
| `CheckboxField` | `checkbox.tsx` | `label`, `description`, `size`, `checkboxProps` |
| `RadioGroup` | `radio.tsx` | `value`, `defaultValue`, `onChange(string)`, `disabled`, `name` |
| `Radio` | `radio.tsx` | `value`, `label`, `description`, `disabled`, `size: "sm" \| "md"` |
| `Switch` | `switch.tsx` | `checked`, `defaultChecked`, `onChange(boolean)`, `disabled`, `size: "sm" \| "md"` |
| `SwitchField` | `switch.tsx` | `label`, `description`, `size`, `switchProps` |

### Navigation

| Component | File | Props |
|-----------|------|-------|
| `Tabs` | `tabs.tsx` | `value`, `defaultValue`, `onChange(string)`, `variant: "line" \| "pill"` |
| `TabsList` | `tabs.tsx` | — |
| `TabsTrigger` | `tabs.tsx` | `value`, `disabled` |
| `TabsContent` | `tabs.tsx` | `value` |
| `Breadcrumb` | `breadcrumb.tsx` | — (`<nav aria-label>` wrapper) |
| `BreadcrumbItem` | `breadcrumb.tsx` | — (`<li>` wrapper) |
| `BreadcrumbLink` | `breadcrumb.tsx` | `href`, `current` |
| `BreadcrumbSeparator` | `breadcrumb.tsx` | — |
| `BreadcrumbEllipsis` | `breadcrumb.tsx` | — |
| `BreadcrumbList` | `breadcrumb.tsx` | `segments: { label, href }[]` |

### Overlays

| Component | File | Props |
|-----------|------|-------|
| `Tooltip` | `tooltip.tsx` | `content`, `placement: "top" \| "bottom" \| "left" \| "right"`, `delay` (default 150ms) |
| `DropdownMenu` | `dropdown.tsx` | `trigger`, `align: "start" \| "end"` |
| `DropdownItem` | `dropdown.tsx` | `onSelect`, `variant: "default" \| "destructive"`, `icon`, `disabled` |
| `DropdownSeparator` | `dropdown.tsx` | — |
| `DropdownLabel` | `dropdown.tsx` | — |

### Utility

| Export | File |
|--------|------|
| `cn(...)` | `lib/utils.ts` |

---

## Token Mapping

No new tokens introduced. Components map to existing semantic tokens:

| Token | Used by |
|-------|---------|
| `--primary`, `--primary-foreground` | Checkbox/Radio checked, Switch on, TabsTrigger active (line) |
| `--input` | Checkbox/Radio/Switch unchecked border |
| `--background` | Switch thumb, Checkbox/Radio bg |
| `--muted`, `--muted-foreground` | TabsList pill bg, inactive triggers, BreadcrumbLink |
| `--accent`, `--accent-foreground` | DropdownItem hover, TabsTrigger pill active |
| `--popover`, `--popover-foreground` | Tooltip, Dropdown panel |
| `--border` | Tooltip border, Dropdown border, BreadcrumbSeparator |
| `--ring` | All focus rings |
| `--destructive`, `--destructive-foreground` | DropdownItem destructive variant |

---

## Accessibility Summary

All interactive elements pass these gates:
- `role` attribute on every interactive primitive
- `aria-checked` / `aria-selected` / `aria-expanded` / `aria-controls` / `aria-labelledby` / `aria-describedby` wired
- `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` on all keyboard-focusable elements
- Roving tabindex on RadioGroup and TabsList
- Arrow key + Home/End navigation in RadioGroup, TabsList, DropdownMenu
- Escape returns focus to trigger in DropdownMenu
- Portal-based overlays (Tooltip, Dropdown) avoid z-index stacking issues
- Tooltip/Dropdown positions flip when near viewport edge

---

## Package Changes

### `packages/ui/package.json`
- Added `peerDependencies`: `react >= 18`, `react-dom >= 18`
- Added `dependencies`: `clsx ^2.1.0`, `tailwind-merge ^2.2.0`
- Added `main`, `types`, `exports` fields

### `packages/ui/tsconfig.json`
- New file: strict TypeScript, `jsx: react-jsx`, `moduleResolution: bundler`

### `packages/ui/src/index.ts`
- New barrel export for all 7 component families + `cn` utility

---

## Migration Notes

No breaking changes. These are all new additions to an empty `packages/ui/src/` directory.

Consumer apps can begin importing from `@akymic/ui` once the monorepo workspace link is set up:
```json
// app/package.json
{
  "dependencies": {
    "@akymic/ui": "workspace:*"
  }
}
```

---

## Verification Steps

1. `cd packages/ui && npx tsc --noEmit` — passes with no errors
2. Components are importable: `import { Checkbox, RadioGroup, Tabs, Tooltip } from "@akymic/ui"`
3. All focus rings visible in keyboard navigation (light + dark)
4. `docs/components.md` — all 7 components show `stable`
