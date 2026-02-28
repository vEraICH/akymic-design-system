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

**Known risk (dark mode):** `--destructive` dark (`0 62.8% 30.6%`) is a very dark red. It works correctly as a button background (white foreground on top), but is insufficient contrast (~2.5:1) if used as inline text color on dark backgrounds. **Do not use `--destructive` as a text color on dark surfaces** — use `--destructive-foreground` or a dedicated error text token (future iteration).

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

## Do / Don't

| Do | Don't |
|----|-------|
| `color: hsl(var(--foreground))` | `color: #1e293b` |
| `background: hsl(var(--muted))` | `background: #f1f5f9` |
| Add new semantic tokens when a new role emerges | Re-use `--primary` for decorative color |
| Use `--muted-foreground` for captions | Use `--muted` (the bg token) as text color |
