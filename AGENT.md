# AGENT.md — Akymic Design System

> **Read this file first before modifying any tokens, specs, or docs in this repo.**
> This repo is the governed contract. The consuming app (`akymic-app-template`) reads from it.
> Your job here is to extend the system carefully — not to build features.

---

## 1. What This Repo Is

This repo owns:
- **Token source of truth** — `packages/tokens/tokens/tokens.json`
- **Token consumer artifact** — `packages/tokens/tokens/tokens.css`
- **Component specs** — `docs/components.md`
- **Governance docs** — `docs/tokens.md`, `docs/paper-workflow.md`, `docs/migrations.md`
- **Change notes** — `docs/changes/YYYY-MM-DD-<slug>.md`

It does **not** own app layouts, page-specific components, or anything in `akymic-app-template`.

---

## 2. File Structure

```
packages/
├── tokens/
│   └── tokens/
│       ├── tokens.json          ← SOURCE OF TRUTH. Edit this first.
│       └── tokens.css           ← Consumer artifact. Derive from tokens.json.
└── ui/
    └── src/
        └── README.md            ← Shared promoted components (future; currently minimal)
docs/
├── tokens.md                    ← Token dictionary (human + agent reference)
├── components.md                ← Component inventory + status
├── paper-workflow.md            ← Paper → code → token workflow
├── migrations.md                ← Deprecations and renames
└── changes/
    └── YYYY-MM-DD-<slug>.md     ← One file per meaningful change
AGENT.md                         ← This file
CLAUDE.md                        ← Operational instructions for the Claude agent
```

---

## 3. Token Contract

### Color token format (in `tokens.json`)

```json
{
  "colors": {
    "<token-name>": {
      "light": "H S% L%",
      "dark":  "H S% L%"
    }
  }
}
```

- Values are **HSL components only**: `"221.2 83.2% 53.3%"` — not hex, not `hsl(...)`, not rgb.
- Both `light` and `dark` are **required** for every color token.
- Token names are **semantic** (role-based), never color-descriptive.

### Typography token format (in `tokens.json`)

```json
{
  "typography": {
    "fontSize":      { "sm": { "value": "0.875rem" } },
    "fontWeight":    { "semibold": { "value": "600" } },
    "lineHeight":    { "normal": { "value": "1.5" } },
    "letterSpacing": { "wide": { "value": "0.05em" } },
    "fontFamily":    { "sans": { "value": "ui-sans-serif, ..." } }
  }
}
```

Typography tokens are **mode-agnostic** (no light/dark split). They live in `:root {}` only.

### CSS artifact format (in `tokens.css`)

```css
:root {
  --token-name: H S% L%;          /* color tokens */
  --text-sm: 0.875rem;            /* typography: font size */
  --font-semibold: 600;           /* typography: font weight */
  --leading-normal: 1.5;          /* typography: line height */
  --tracking-wide: 0.05em;        /* typography: letter spacing */
  --font-sans: ui-sans-serif, …;  /* typography: font family */
  --radius: 0.75rem;              /* radius */
}

.dark {
  --token-name: H S% L%;          /* dark mode overrides — color tokens only */
}
```

**CSS safety rules (non-negotiable):**
- Only `:root {}` and `.dark {}` blocks in `tokens.css`
- No `@import`
- No Tailwind output pasted in
- No inline `hsl()` wrappers — raw HSL components only

---

## 4. Current Token List

### Color tokens (14 roles, each with light + dark)

| Token | Tailwind classes | Semantic use |
|---|---|---|
| `--background` | `bg-background` / `text-foreground` | Page canvas |
| `--foreground` | `text-foreground` | Primary text |
| `--card` | `bg-card` / `text-card-foreground` | Elevated containers |
| `--card-foreground` | `text-card-foreground` | Text on card surfaces |
| `--popover` | `bg-popover` / `text-popover-foreground` | Floating overlays |
| `--popover-foreground` | `text-popover-foreground` | Text on popover surfaces |
| `--primary` | `bg-primary` / `text-primary` | Brand blue, CTAs, active states |
| `--primary-foreground` | `text-primary-foreground` | Text/icon on primary bg |
| `--secondary` | `bg-secondary` / `text-secondary` | Subdued actions, badges |
| `--secondary-foreground` | `text-secondary-foreground` | Text on secondary bg |
| `--muted` | `bg-muted` | Sidebar, table stripes, skeleton |
| `--muted-foreground` | `text-muted-foreground` | Captions, help text, placeholders |
| `--accent` | `bg-accent` / `text-accent` | Interactive hover states |
| `--accent-foreground` | `text-accent-foreground` | Text on accent hover |
| `--destructive` | `bg-destructive` / `text-destructive` | Errors, delete actions |
| `--destructive-foreground` | `text-destructive-foreground` | Text on destructive bg |
| `--border` | `border-border` | Layout dividers, separators |
| `--input` | `border-input` | Form field borders |
| `--ring` | `ring-ring` | Focus rings |

### Structural tokens

| Token | CSS var | Value | Use |
|---|---|---|---|
| Radius | `--radius` | `0.75rem` | Base border radius |

### Typography tokens (19 vars, mode-agnostic)

| Group | CSS vars |
|---|---|
| Font size (8) | `--text-xs` `--text-sm` `--text-base` `--text-lg` `--text-xl` `--text-2xl` `--text-3xl` `--text-4xl` |
| Font weight (4) | `--font-normal` `--font-medium` `--font-semibold` `--font-bold` |
| Line height (4) | `--leading-tight` `--leading-snug` `--leading-normal` `--leading-relaxed` |
| Letter spacing (4) | `--tracking-tight` `--tracking-normal` `--tracking-wide` `--tracking-widest` |
| Font family (2) | `--font-sans` `--font-mono` |

---

## 5. How to Add a Token

Follow this sequence exactly:

**Step 1 — Update `tokens.json`:**
```json
{
  "colors": {
    "existing-tokens": "...",
    "new-role": { "light": "H S% L%", "dark": "H S% L%" }
  }
}
```

**Step 2 — Update `tokens.css`:**
```css
:root {
  /* ... existing tokens ... */
  --new-role: H S% L%;
}

.dark {
  /* ... existing dark tokens ... */
  --new-role: H S% L%;
}
```

**Step 3 — Document in `docs/tokens.md`:**
Add a section following the existing format: table of light/dark values + one-line semantic description.

**Step 4 — Create change note:**
`docs/changes/YYYY-MM-DD-<slug>.md` — see §8 for format.

**Step 5 — Sync to consuming app:**
Copy `packages/tokens/tokens/tokens.css` to `akymic-app-template/src/design-system/tokens.css`.

**Token naming rules:**
- ✅ `--sidebar-background`, `--table-header`, `--nav-active`
- ❌ `--gray900`, `--blue500`, `--akymicBlue`, `--surface1`
- Prefer reusing existing tokens over adding new ones
- If renaming: keep old token for one iteration with a deprecation note

---

## 6. How to Modify an Existing Token

1. Update value in `tokens.json`
2. Update value in `tokens.css`
3. Note Before/After in a change note
4. Check WCAG contrast for text tokens: minimum 4.5:1 against their surface
5. Sync `tokens.css` to the consuming app

---

## 7. Component Inventory & Status

| Component | Status | Notes |
|---|---|---|
| Token system | stable | 19 color + 19 typography vars |
| Radius | stable | `0.75rem` |
| Typography scale | stable | 8 sizes, 4 weights, 4 leading, 4 tracking, 2 families |
| **Button** | stable | 5 variants × 3 sizes × 5 states |
| **Input** | stable | default + error state |
| **Card** | stable | CardHeader, CardTitle, CardDescription, CardContent |
| **NavSidebar** | stable | 240px, muted bg, active via usePathname |
| **Topbar** | stable | 60px, search + bell + ThemeToggle + avatar |
| **AppShell** | stable | Server component layout wrapper |
| Textarea | planned | — |
| Select | planned | — |
| Checkbox / Radio / Switch | planned | — |
| Badge | planned | — |
| Divider | planned | — |
| Breadcrumb | planned | — |
| Tabs | planned | — |
| Dialog / Drawer | planned | — |
| Alert / Toast | planned | — |
| Table + Pagination | planned | — |
| Empty state / Skeleton | planned | — |

**Generation order** (what to build next):
1. ~~Foundations~~ — done
2. ~~Buttons~~ — done
3. ~~Inputs~~ — done
4. ~~Navigation shell~~ — done
5. **Cards + dividers** ← next
6. Tables + pagination
7. Dialogs + drawers
8. Toast/alerts + empty/loading states

---

## 8. Change Note Format

Every meaningful change gets a file at `docs/changes/YYYY-MM-DD-<slug>.md`:

```markdown
# YYYY-MM-DD — <Title>

## Summary
One paragraph: what changed and why.

## What changed
- Bullet list of files modified

## Before / After (for token changes)
| Token | Before | After |
|---|---|---|
| `--token` | `old value` | `new value` |

## Migration notes (if breaking)
Instructions for consumers to update.

## Verification steps
1. Step to verify in light mode
2. Step to verify in dark mode
```

---

## 9. Quality Gates

Before completing any iteration, verify:

- [ ] Light mode: text readable on all surfaces
- [ ] Dark mode: text readable on all surfaces
- [ ] Focus ring visible on all interactive elements (`ring-ring`)
- [ ] Token names are semantic (role-based)
- [ ] `tokens.css` has no `@import`, no Tailwind output, only `:root {}` and `.dark {}`
- [ ] `tokens.json` and `tokens.css` are in sync
- [ ] Change note created in `docs/changes/`
- [ ] `docs/components.md` status updated if a component changed

---

## 10. What NOT to Do

| Never | Because |
|---|---|
| Hardcode hex/rgb in tokens.css | Breaks HSL composability |
| Add `@import` to tokens.css | CSS safety rule |
| Add a token without both `light` and `dark` | Dark mode will break |
| Name a token after its color (`--blue600`) | Tokens must survive color changes |
| Rename a token without a deprecation window | Breaking change for consumers |
| Edit `akymic-app-template` component APIs from this repo | Wrong boundary |
| Skip the change note | Governance requires traceability |
