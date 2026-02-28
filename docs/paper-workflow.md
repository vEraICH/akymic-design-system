# Paper.design → Code → Tokens Workflow

This document describes how design decisions made in Paper.design become governed, consumable tokens in this repo.

---

## Overview

```
Paper.design (visual canvas)
        ↓
  Design Proposal (markdown)
        ↓
  tokens.json (source of truth)
        ↓
  tokens.css (consumer artifact)
        ↓
  App global stylesheet
```

---

## Step 1: Design in Paper

- Use the Akymic design system file in Paper.design as the canvas.
- Map all colors to semantic token names (e.g., `primary`, `muted-foreground`) — never use raw hex values in Paper components.
- Define both light and dark variants for every new component.

---

## Step 2: Identify Token Needs

When a Paper design introduces a color or style role not covered by existing tokens:

1. Check `docs/tokens.md` — does an existing token fit semantically?
2. If yes, use it. Don't add tokens for aesthetic variation alone.
3. If no existing token fits, propose a new semantic token:
   - Name it for its **role**, not its appearance (`--sidebar-background`, not `--gray900`)
   - Define both `light` and `dark` values
   - Add it to `tokens.json` and `tokens.css`
   - Document it in `docs/tokens.md`

---

## Step 3: Update tokens.json

`packages/tokens/tokens/tokens.json` is the source of truth.

```json
{
  "colors": {
    "new-token": { "light": "H S% L%", "dark": "H S% L%" }
  }
}
```

Rules:
- Values are HSL components only: `"210 40% 96.1%"`
- No hex, no rgb, no named colors
- Both `light` and `dark` are required for every color token

---

## Step 4: Update tokens.css

`packages/tokens/tokens/tokens.css` must stay in sync with `tokens.json`.

Rules (CSS safety — non-negotiable):
- Only `:root {}` and `.dark {}` blocks
- No `@import`
- No Tailwind output pasted in
- Plain CSS custom properties only

Add to `:root` and `.dark`:
```css
--new-token: H S% L%;
```

---

## Step 5: Document

- Update `docs/tokens.md` with the new token entry
- Create a change note in `docs/changes/YYYY-MM-DD-<slug>.md`

---

## Step 6: Consumer Sync

The consuming Next.js app imports `tokens.css` (or a copy of it) into its global stylesheet.

After any token update:
1. Copy `packages/tokens/tokens/tokens.css` into the app's global styles, **or**
2. Run the sync script (if configured)

Verify in both light and dark modes that:
- Text is readable on all surfaces
- Focus rings are visible
- No visual regressions on existing components

---

## Naming Conventions

| Pattern | Example | Use |
|---------|---------|-----|
| `--{role}` | `--primary` | Global semantic role |
| `--{role}-foreground` | `--primary-foreground` | Text/icon on top of `--{role}` |
| `--{component}-{role}` | `--sidebar-background` | Component-scoped (use sparingly) |

Avoid:
- Color-descriptive names: `--blue500`, `--gray100`
- Brand-name tokens: `--akymicBlue`
- Context-less tokens: `--surface1`, `--level2`

---

## Checklist: New Token

- [ ] Token name is semantic (role-based, not color-based)
- [ ] `light` value defined in `tokens.json`
- [ ] `dark` value defined in `tokens.json`
- [ ] `:root` entry added to `tokens.css`
- [ ] `.dark` entry added to `tokens.css`
- [ ] Documented in `docs/tokens.md`
- [ ] Change note created
- [ ] Contrast verified (text tokens ≥ 4.5:1 on their surface)
