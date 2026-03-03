import * as React from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "./lib/utils";

// ── Outer wrapper ──────────────────────────────────────────────────────────────

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full table-fixed caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

// ── Sections ───────────────────────────────────────────────────────────────────

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("border-b border-border bg-muted/50", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Apply alternating row background stripes. */
  striped?: boolean;
}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, striped, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(
        "[&_tr:last-child]:border-0",
        striped && "[&>tr:nth-child(even)]:bg-muted/20",
        className
      )}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t border-border bg-muted/50 font-medium", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// ── Rows ───────────────────────────────────────────────────────────────────────

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-border transition-colors",
      "hover:bg-muted/30",
      "data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// ── Cells ──────────────────────────────────────────────────────────────────────

export type SortDirection = "asc" | "desc" | false;

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Show a sort icon and make the header clickable. */
  sortable?: boolean;
  /** Current sort direction. Pass `false` (default) for unsorted. */
  sortDirection?: SortDirection;
  onSort?: () => void;
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection = false, onSort, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-4 text-left align-middle text-xs font-semibold text-muted-foreground",
        sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
        sortable && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        className
      )}
      tabIndex={sortable ? 0 : undefined}
      onClick={sortable ? onSort : undefined}
      onKeyDown={sortable ? (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSort?.(); }
      } : undefined}
      aria-sort={
        sortable
          ? sortDirection === "asc" ? "ascending"
            : sortDirection === "desc" ? "descending"
            : "none"
          : undefined
      }
      {...props}
    >
      {sortable ? (
        <span className="inline-flex items-center gap-1">
          {children}
          <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center">
            <SortIcon direction={sortDirection} />
          </span>
        </span>
      ) : (
        children
      )}
    </th>
  )
);
TableHead.displayName = "TableHead";

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "asc")
    return <ChevronUp className="h-3.5 w-3.5" strokeWidth={2} />;
  if (direction === "desc")
    return <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />;
  return <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" strokeWidth={1.75} />;
}

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-4 py-3 align-middle text-sm", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-xs text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
