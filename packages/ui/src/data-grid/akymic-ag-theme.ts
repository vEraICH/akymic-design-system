/**
 * Akymic AG Grid Theme Bridge
 *
 * Maps AG Grid's CSS custom properties to Akymic design tokens.
 * Import the companion `data-grid.css` to activate the CSS variable bridge.
 *
 * AG Grid v33+ uses Theming API with `themeQuartz` as the base theme.
 * We apply Akymic-specific overrides via CSS custom properties so that
 * light/dark mode works automatically through the existing `.dark {}` cascade.
 */

import { themeQuartz } from "ag-grid-community";

/**
 * Pre-configured AG Grid theme that inherits all Akymic design tokens.
 *
 * Usage: pass to `<AgGridReact theme={akymicAgTheme} />` or use
 * the `<DataGrid>` wrapper which applies this automatically.
 *
 * The actual color mapping happens in `data-grid.css` via `--ag-*` vars.
 * This JS theme object sets non-CSS parameters (spacing, icons, etc.)
 * that can't be expressed as CSS custom properties.
 */
export const akymicAgTheme = themeQuartz.withParams({
  // Spacing & sizing
  headerHeight: 40,
  rowHeight: 44,
  gridSize: 6,
  cellHorizontalPadding: 16,

  // Borders
  wrapperBorderRadius: 0, // outer wrapper radius handled by DataGrid container
  rowBorder: true,
  columnBorder: false,
  sidePanelBorder: true,
  headerColumnResizeHandleColor: "hsl(var(--border))",

  // Selection
  cellSelectionBorder: false,
  rangeSelectionBorderStyle: "solid" as const,

  // Input
  inputBorderRadius: 6,
});
