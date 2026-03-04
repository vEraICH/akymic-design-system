"use client";

import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
  type GridReadyEvent,
} from "ag-grid-community";
import { cn } from "../lib/utils";
import { akymicAgTheme } from "./akymic-ag-theme";
import type { DataGridProps } from "./data-grid-types";

// Register AG Grid community modules once
ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * DataGrid — Akymic wrapper around AG Grid.
 *
 * Provides a fully themed, accessible data grid with virtualization,
 * sorting, filtering, pagination, and row selection out of the box.
 * Auto-applies the Akymic theme bridge — consumers never configure
 * AG Grid themes directly.
 *
 * For simple tabular data (<100 rows), prefer the lightweight `<Table>`.
 *
 * @example
 * ```tsx
 * <DataGrid
 *   columnDefs={[
 *     { field: "name", headerName: "Name" },
 *     { field: "email", headerName: "Email" },
 *     { field: "role", headerName: "Role" },
 *   ]}
 *   rowData={users}
 *   pagination
 *   paginationPageSize={25}
 * />
 * ```
 */
export function DataGrid<TData = unknown>({
  columnDefs,
  rowData,
  rowSelection,
  pagination = false,
  paginationPageSize = 20,
  quickFilterText,
  striped = false,
  height = "400px",
  loading = false,
  emptyMessage = "No data to display",
  onGridReady,
  gridOptions,
  className,
}: DataGridProps<TData>) {
  const defaultColDef = React.useMemo<ColDef<TData>>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      minWidth: 100,
    }),
    []
  );

  const handleGridReady = React.useCallback(
    (event: GridReadyEvent<TData>) => {
      // Auto-size columns to fit the grid width
      event.api.sizeColumnsToFit();
      onGridReady?.(event);
    },
    [onGridReady]
  );

  const isLoading = loading || rowData === null;

  const resolvedHeight =
    typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn(
        "akymic-data-grid overflow-hidden rounded-lg border border-border",
        striped && "ag-data-grid-striped",
        className
      )}
      style={{ height: resolvedHeight }}
    >
      <AgGridReact<TData>
        theme={akymicAgTheme}
        columnDefs={columnDefs}
        rowData={rowData ?? []}
        defaultColDef={defaultColDef}
        rowSelection={
          rowSelection
            ? {
                mode: rowSelection === "single" ? "singleRow" : "multiRow",
                checkboxes: rowSelection === "multiple",
                headerCheckbox: rowSelection === "multiple",
              }
            : undefined
        }
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        quickFilterText={quickFilterText}
        animateRows={false}
        loading={isLoading}
        overlayNoRowsTemplate={`<span class="text-sm text-muted-foreground">${emptyMessage}</span>`}
        onGridReady={handleGridReady}
        {...gridOptions}
      />
    </div>
  );
}

DataGrid.displayName = "DataGrid";
