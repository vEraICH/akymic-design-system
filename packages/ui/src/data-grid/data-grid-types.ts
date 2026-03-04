import type { ColDef, GridOptions, GridReadyEvent } from "ag-grid-community";

export interface DataGridProps<TData = unknown> {
  /** Column definitions — see AG Grid ColDef docs. */
  columnDefs: ColDef<TData>[];

  /** Row data array. Pass `null` to show loading state. */
  rowData: TData[] | null;

  /** Enable row selection. "single" or "multiple". */
  rowSelection?: "single" | "multiple";

  /** Enable pagination. */
  pagination?: boolean;

  /** Rows per page when pagination is enabled. Default 20. */
  paginationPageSize?: number;

  /** Quick-filter text — filters across all visible columns. */
  quickFilterText?: string;

  /** Apply alternating row background stripes. */
  striped?: boolean;

  /** Grid height. Default "400px". */
  height?: string | number;

  /** Show loading overlay. Shown automatically when rowData is null. */
  loading?: boolean;

  /** Custom empty-state message. Default "No data to display". */
  emptyMessage?: string;

  /** Callback when the grid is ready. Provides access to the Grid API. */
  onGridReady?: (event: GridReadyEvent<TData>) => void;

  /**
   * Escape hatch — pass any AG Grid option directly.
   * Use for advanced features (enterprise modules, row models, etc.)
   * that aren't exposed as first-class DataGrid props.
   */
  gridOptions?: Partial<GridOptions<TData>>;

  /** Additional CSS class for the outer wrapper. */
  className?: string;
}
