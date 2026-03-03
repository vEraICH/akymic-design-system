# Akymic Design System — Design Decisions

Living document. Records architectural choices, roadmap status, deferred work, and future directions.
Update this whenever a meaningful decision is made.

---

## System Philosophy

**Design reference:** GitHub Primer (token semantics, component quality bar, accessibility standard)
**Technical foundation:** shadcn/ui (copy-paste model, Tailwind, CSS variables)
**Goal:** GitHub-like professional UI — clean, utilitarian, high contrast, minimal ornament.

Four principles:
1. **Tokens are authoritative.** No hard-coded hex colors in components.
2. **Light + Dark from day 1.** Every semantic token defines both modes.
3. **Diff-friendly changes.** Small, PR-sized increments — no big rewrites.
4. **Consumer safety.** Don't break apps silently; document migrations.

---

## Token Architecture

- **Color:** 23 semantic tokens (18 color roles + radius). Stored as `"H S% L%"` for `hsl(var(--token))`.
- **Typography:** 19 mode-agnostic vars (fontSize×8, fontWeight×4, lineHeight×4, letterSpacing×4, fontFamily×2).
- **Shadows:** 3 tokens — `--shadow-resting`, `--shadow-floating`, `--shadow-inset`. Full CSS box-shadow strings, light+dark in `:root`/`.dark`.
- **`tokens.css` rule:** only `:root {}` and `.dark {}`. No `@import`, no Tailwind output.

### Fixed tokens (not themeable)
- `--destructive` / `--destructive-foreground` — red is a universal danger signal; theming it would undermine accessibility semantics.

### Theming engine
- **Input (ThemeManifest):** primary color (hex or HSL), neutral tint (cool/neutral/warm), radius (none/sm/md/lg/full).
- **Output:** full 22-token derived theme, light+dark, contrast-verified (WCAG 2.1 AA).
- **Static themes** stored in `/themes/{name}/` (manifest.json + theme.css). Current: `default`, `indigo`, `symc-main`.
- **Browser apply:** `<style id="akymic-theme-override">` injected into `<head>` — CSS cascade wins over bundled base tokens.

---

## Gap Analysis vs GitHub Primer

| Gap | Impact | Effort | Decision |
|-----|--------|--------|----------|
| 1. Intent tokens (success + warning) | High | Low | **Closed** (2026-03-02) |
| 2. Shadow tokens (floating/resting/inset) | Medium | Low | **Closed** (2026-03-02) |
| 3. Accessibility docs per component | Medium | Writing only | **Closed** (2026-03-03) |
| 4. Component-state tokens (per-variant hover/active/etc.) | Low | High | **Deferred** — revisit when a product team needs to override button hover independently of button rest color |
| 5. Data visualisation palette | None | — | **Skipped** — no chart components planned |

---

## Component Roadmap

### Completed

| # | Area | Date |
|---|------|------|
| 1 | Typography scale | 2026-02-28 |
| 2 | Buttons | 2026-02-28 |
| 3 | Inputs + validation states | 2026-02-28 |
| 4 | Navigation shell (sidebar + topbar) | 2026-03-01 |
| 5 | Cards + badges + dividers | 2026-03-02 |
| 6 | Tables + pagination | 2026-03-02 |
| 7 | Calendar Phase 1 (month view) | 2026-03-02 |
| 8 | Dialogs + drawers | 2026-03-02 |
| 9 | Toast / Alert / Skeleton / EmptyState | 2026-03-02 |
| 10 | Success + warning intent tokens | 2026-03-02 |
| 11 | Shadow tokens | 2026-03-02 |
| 12 | Accessibility documentation | 2026-03-03 |
| 13 | Theming engine (CLI + CSS derivation) | 2026-03-03 |
| 14 | Theme Studio page (app-template) | 2026-03-03 |

### In Progress / Next

| # | Area | Status | Notes |
|---|------|--------|-------|
| 15 | Form components | **stable** (2026-03-03) | PopoverPanel, Select, Combobox, MultiSelect, DatePicker, FileUpload — all zero external deps |

### Backlog (priority order)

| # | Area | Notes |
|---|------|-------|
| 16 | Docs site — component pages | `apps/docs` has foundations (color + typography) but no interactive component demos yet |
| 17 | Calendar Phase 2 — week view | Deferred from AKYD-010; day/agenda view is Phase 3 |
| 18 | Data table improvements | Inline row editing, expandable rows, bulk-select actions |
| 19 | More predefined themes | Add 2-3 more brand themes to stress-test the engine and populate the gallery |
| 20 | Theme engine — automated agent workflow | CLI/script: fetch a URL → extract brand colors automatically → output theme (manual test done with Symphony) |

---

## Form Components Plan (Item 15)

**Goal:** Complete the form primitive layer so any CRUD screen can be built without workarounds.

### Components to build

| Component | Description | Key decisions |
|-----------|-------------|---------------|
| `Select` | Single-value dropdown | Popover-based, keyboard nav (arrow/enter/escape), matches Input size tokens |
| `Combobox` | Searchable select | Extends Select with filter input; supports async option loading pattern |
| `MultiSelect` | Checkbox-style multi-pick | Tag chips inside trigger; clear-all action |
| `DatePicker` | Calendar in a form field | Wraps Calendar Phase 1 in a Popover trigger; outputs ISO date string |
| `FileUpload` | Drag-and-drop + click | Accepts mime types + size limit props; shows file list with remove; no server upload logic |

### Constraints
- Zero external deps (no react-select, no downshift).
- All components reuse existing tokens: `--border`, `--input`, `--ring`, `--muted`, `--accent`, `--primary`.
- Keyboard accessible: every component must be operable without a mouse.
- Each component is a single `.tsx` file in `akymic-app-template/src/components/ui/`.

---

## Key File Paths (quick reference)

| Purpose | Path |
|---------|------|
| Token source of truth | `packages/tokens/tokens/tokens.json` |
| Token CSS artifact | `packages/tokens/tokens/tokens.css` |
| Docs site tokens copy | `apps/docs/src/design-system/tokens.css` |
| App-template tokens copy | `akymic-app-template/src/design-system/tokens.css` (if exists) |
| Theming engine (Node) | `packages/theming/src/` |
| Theming engine (browser) | `akymic-app-template/src/lib/theme-engine.ts` |
| Predefined themes | `themes/{name}/manifest.json` + `theme.css` |
| Theme Studio page | `akymic-app-template/src/app/theme/page.tsx` |
| Change notes | `docs/changes/YYYY-MM-DD-slug.md` |

---

## Conventions

- **Change note file:** `docs/changes/YYYY-MM-DD-<slug>.md` for every token/spec update.
- **AKYD ticket IDs:** sequential, in change note filenames and commit messages.
- **Commit style:** `type(scope): short description` — e.g. `feat(tokens): add success + warning`.
- **No emojis** in source files or commit messages.
