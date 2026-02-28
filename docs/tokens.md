# Token Dictionary

All tokens are stored as HSL components (`H S% L%`) for use with `hsl(var(--token))`.
Source of truth: `packages/tokens/tokens/tokens.json`
Consumer artifact: `packages/tokens/tokens/tokens.css`

---

## Surface Tokens

### `--background`
| Mode  | Value         |
|-------|---------------|
| Light | `0 0% 100%`   |
| Dark  | `222.2 84% 4.9%` |

The page/app canvas. Use for root-level backgrounds.

### `--foreground`
| Mode  | Value            |
|-------|------------------|
| Light | `222.2 84% 4.9%` |
| Dark  | `210 40% 98%`    |

Primary text color. High contrast against `--background` in both modes.

---

## Card / Popover Tokens

### `--card` / `--card-foreground`
| Token             | Light             | Dark              |
|-------------------|-------------------|-------------------|
| `--card`          | `0 0% 100%`       | `222.2 84% 4.9%`  |
| `--card-foreground` | `222.2 84% 4.9%` | `210 40% 98%`    |

Use for elevated containers (cards, panels). Currently identical to `--background` — flat design convention. Both tokens exist so card surfaces can be differentiated in a future iteration without changing all consumers.

### `--popover` / `--popover-foreground`
| Token                  | Light             | Dark              |
|------------------------|-------------------|-------------------|
| `--popover`            | `0 0% 100%`       | `222.2 84% 4.9%`  |
| `--popover-foreground` | `222.2 84% 4.9%`  | `210 40% 98%`     |

Use for floating overlays: dropdowns, tooltips, command palettes. Identical to `--card` — distinguishable in the future via elevation shadows rather than color.

---

## Interactive Tokens

### `--primary` / `--primary-foreground`
| Token                | Light              | Dark               |
|----------------------|--------------------|--------------------|
| `--primary`          | `221.2 83.2% 53.3%` | `217.2 91.2% 59.8%` |
| `--primary-foreground` | `210 40% 98%`   | `222.2 84% 4.9%`   |

Brand blue. Use for primary CTAs, active states, checked controls. `--primary-foreground` is the text/icon color on top of `--primary`.

### `--secondary` / `--secondary-foreground`
| Token                  | Light              | Dark               |
|------------------------|--------------------|--------------------|
| `--secondary`          | `210 40% 96.1%`    | `217.2 32.6% 17.5%` |
| `--secondary-foreground` | `222.2 47.4% 11.2%` | `210 40% 98%`  |

Use for secondary/ghost-style buttons, badge backgrounds. Visually subdued relative to `--primary`.

---

## Muted / Subtle Tokens

### `--muted` / `--muted-foreground`
| Token              | Light              | Dark               |
|--------------------|--------------------|--------------------|
| `--muted`          | `210 40% 96.1%`    | `217.2 32.6% 17.5%` |
| `--muted-foreground` | `215.4 16.3% 40%` | `215 20.2% 65.1%`  |

Use `--muted` for subtle backgrounds: table row stripes, code block backgrounds, skeleton loaders.
Use `--muted-foreground` for de-emphasized text: captions, placeholder text, metadata, help text.

**Contrast:** Light `--muted-foreground` (`40%` L) on `--background` (white) ≥ 4.5:1 — WCAG AA compliant.

### `--accent` / `--accent-foreground`
| Token              | Light              | Dark               |
|--------------------|--------------------|--------------------|
| `--accent`         | `210 40% 96.1%`    | `217.2 32.6% 17.5%` |
| `--accent-foreground` | `222.2 47.4% 11.2%` | `210 40% 98%`  |

Use for hover states on menu items, subtle highlights. Visually identical to `--muted` — semantic distinction: `--muted` = static subdued surface; `--accent` = interactive hover surface.

---

## Destructive Tokens

### `--destructive` / `--destructive-foreground`
| Token                    | Light           | Dark            |
|--------------------------|-----------------|-----------------|
| `--destructive`          | `0 84.2% 60.2%` | `0 62.8% 30.6%` |
| `--destructive-foreground` | `210 40% 98%` | `210 40% 98%`   |

Use for error states, destructive actions (delete buttons, error banners).

**Dark mode:** `--destructive` dark is now `0 84.2% 60.2%` — same as light mode. Bright red, readable as error text, error border, and destructive button background on dark surfaces.

---

## Border / Form Tokens

### `--border`
| Mode  | Value                   |
|-------|-------------------------|
| Light | `214.3 31.8% 91.4%`     |
| Dark  | `217.2 32.6% 17.5%`     |

Default separator/divider color. Use for `border-color` on layout dividers, section boundaries.

### `--input`
| Mode  | Value                   |
|-------|-------------------------|
| Light | `214.3 31.8% 91.4%`     |
| Dark  | `217.2 32.6% 17.5%`     |

Border color of form inputs (text fields, selects, checkboxes). Currently identical to `--border` — kept separate so input field borders can be styled independently without touching layout borders.

### `--ring`
| Mode  | Value                   |
|-------|-------------------------|
| Light | `221.2 83.2% 53.3%`     |
| Dark  | `224.3 76.3% 48%`       |

Focus ring color. **Must remain visible** — do not reduce contrast. Apply as `box-shadow: 0 0 0 2px hsl(var(--ring))` or via Tailwind `ring` utilities.

---

## Radius Token

### `--radius`
| Value    |
|----------|
| `0.75rem` |

Base border radius. Use as `border-radius: var(--radius)`. Scale for sub-components: `calc(var(--radius) - 2px)` for inner elements, `calc(var(--radius) + 4px)` for dialogs.

---

## Typography Tokens

Typography tokens are mode-agnostic — no light/dark split needed. They live in `:root {}` only.

### Font Families

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `fontFamily.sans` | `--font-sans` | `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| `fontFamily.mono` | `--font-mono` | `ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace` |

Use `--font-sans` for all UI text. Use `--font-mono` for code, tokens, keyboard shortcuts, and technical labels.

---

### Font Size Scale

| Token | CSS Variable | rem | px | Role |
|-------|------------|-----|-----|------|
| `fontSize.xs` | `--text-xs` | `0.75rem` | 12px | Labels, badges, overlines |
| `fontSize.sm` | `--text-sm` | `0.875rem` | 14px | Body / UI default |
| `fontSize.base` | `--text-base` | `1rem` | 16px | Comfortable reading body |
| `fontSize.lg` | `--text-lg` | `1.125rem` | 18px | Card titles, section leads |
| `fontSize.xl` | `--text-xl` | `1.25rem` | 20px | Page section headings |
| `fontSize.2xl` | `--text-2xl` | `1.5rem` | 24px | Dialog titles, hero sub |
| `fontSize.3xl` | `--text-3xl` | `1.875rem` | 30px | Page hero heading |
| `fontSize.4xl` | `--text-4xl` | `2.25rem` | 36px | Display / marketing |

Usage: `font-size: var(--text-sm)`. Do not wrap with `hsl()` — these are length values, not HSL components.

---

### Font Weight

| Token | CSS Variable | Value | Use |
|-------|-------------|-------|-----|
| `fontWeight.normal` | `--font-normal` | `400` | Body text |
| `fontWeight.medium` | `--font-medium` | `500` | Emphasis, interactive labels |
| `fontWeight.semibold` | `--font-semibold` | `600` | Headings, strong labels |
| `fontWeight.bold` | `--font-bold` | `700` | Display, marketing, hero text |

Usage: `font-weight: var(--font-semibold)`.

---

### Line Height

| Token | CSS Variable | Value | Use |
|-------|------------|-------|-----|
| `lineHeight.tight` | `--leading-tight` | `1.25` | Large display text, headings |
| `lineHeight.snug` | `--leading-snug` | `1.375` | Card titles, compact UI |
| `lineHeight.normal` | `--leading-normal` | `1.5` | Body / UI default |
| `lineHeight.relaxed` | `--leading-relaxed` | `1.625` | Long-form reading, help text |

Usage: `line-height: var(--leading-normal)`.

---

### Letter Spacing

| Token | CSS Variable | Value | Use |
|-------|------------|-------|-----|
| `letterSpacing.tight` | `--tracking-tight` | `-0.025em` | Large display headlines |
| `letterSpacing.normal` | `--tracking-normal` | `0em` | Body / UI default |
| `letterSpacing.wide` | `--tracking-wide` | `0.05em` | Small caps, overlines |
| `letterSpacing.widest` | `--tracking-widest` | `0.1em` | All-caps labels, badges |

Usage: `letter-spacing: var(--tracking-wide)`.

---

### Typography Do / Don't

| Do | Don't |
|----|-------|
| `font-size: var(--text-sm)` | `font-size: 14px` |
| `font-family: var(--font-mono)` for code | `font-family: monospace` directly |
| `font-weight: var(--font-semibold)` for headings | `font-weight: 600` hardcoded |
| Pair `--text-3xl` with `--leading-tight` for hero | Use `--leading-relaxed` on large display text |
| Use `--text-xs` minimum; avoid smaller sizes | Go below 12px (0.75rem) |

---

## Do / Don't

| Do | Don't |
|----|-------|
| `color: hsl(var(--foreground))` | `color: #1e293b` |
| `background: hsl(var(--muted))` | `background: #f1f5f9` |
| Add new semantic tokens when a new role emerges | Re-use `--primary` for decorative color |
| Use `--muted-foreground` for captions | Use `--muted` (the bg token) as text color |
