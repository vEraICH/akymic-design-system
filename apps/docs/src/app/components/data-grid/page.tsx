"use client";

import { useState } from "react";
import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import "@/design-system/data-grid.css";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// ── Theme ────────────────────────────────────────────────────────────────────
// Inline version of akymicAgTheme for the docs site
const akymicAgTheme = themeQuartz.withParams({
  headerHeight: 40,
  rowHeight: 44,
  gridSize: 6,
  cellHorizontalPadding: 16,
  wrapperBorderRadius: 0,
  rowBorder: true,
  columnBorder: false,
  sidePanelBorder: true,
  headerColumnResizeHandleColor: "hsl(var(--border))",
  cellSelectionBorder: false,
  rangeSelectionBorderStyle: "solid" as const,
  inputBorderRadius: 6,
});

// ── Sample data ──────────────────────────────────────────────────────────────

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "on-leave";
  salary: number;
  joined: string;
}

const DEPARTMENTS = ["Engineering", "Design", "Marketing", "Sales", "Product", "HR"];
const ROLES = ["Senior Engineer", "Designer", "Marketing Lead", "Account Exec", "Product Manager", "HR Specialist", "Staff Engineer", "Design Lead", "Growth Analyst", "Sales Director"];
const FIRST_NAMES = ["Alex", "Jordan", "Sam", "Morgan", "Taylor", "Casey", "Riley", "Quinn", "Avery", "Dakota", "Reese", "Finley", "Blair", "Emerson", "Rowan", "Sage", "Hayden", "Phoenix", "River", "Atlas"];
const LAST_NAMES = ["Chen", "Kim", "Rivera", "Lee", "Patel", "Johnson", "Williams", "Brown", "Garcia", "Martinez", "Anderson", "Thomas", "Jackson", "White", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Hall"];
const STATUSES: Employee["status"][] = ["active", "active", "active", "active", "inactive", "on-leave"];

function generateEmployees(count: number): Employee[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[i % LAST_NAMES.length]}`,
    email: `${FIRST_NAMES[i % FIRST_NAMES.length].toLowerCase()}.${LAST_NAMES[i % LAST_NAMES.length].toLowerCase()}@acme.co`,
    role: ROLES[i % ROLES.length],
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    status: STATUSES[i % STATUSES.length],
    salary: 65000 + Math.floor((i * 7919) % 80000),
    joined: `${2023 + (i % 3)}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
  }));
}

const EMPLOYEES = generateEmployees(50);

// ── Column defs ──────────────────────────────────────────────────────────────

const basicColumns: ColDef<Employee>[] = [
  { field: "name", headerName: "Name", flex: 1.5 },
  { field: "email", headerName: "Email", flex: 2 },
  { field: "role", headerName: "Role", flex: 1.5 },
  { field: "department", headerName: "Department", flex: 1 },
];

const paginatedColumns: ColDef<Employee>[] = [
  { field: "id", headerName: "#", width: 70, sortable: true },
  { field: "name", headerName: "Name", flex: 1.5 },
  { field: "role", headerName: "Role", flex: 1.5 },
  { field: "department", headerName: "Department", flex: 1 },
  {
    field: "salary",
    headerName: "Salary",
    flex: 1,
    valueFormatter: (p) => p.value != null ? `$${p.value.toLocaleString()}` : "",
  },
];

const selectionColumns: ColDef<Employee>[] = [
  { field: "name", headerName: "Name", flex: 1.5 },
  { field: "email", headerName: "Email", flex: 2 },
  { field: "department", headerName: "Department", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

const rendererColumns: ColDef<Employee>[] = [
  { field: "name", headerName: "Name", flex: 1.5 },
  { field: "role", headerName: "Role", flex: 1.5 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    cellRenderer: (params: { value: string }) => {
      const v = params.value;
      const cls =
        v === "active"
          ? "bg-secondary text-secondary-foreground"
          : v === "on-leave"
          ? "bg-primary/10 text-primary"
          : "border border-border text-muted-foreground";
      return `<span class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${cls}">${v}</span>`;
    },
  },
  {
    field: "salary",
    headerName: "Salary",
    flex: 1,
    valueFormatter: (p) => p.value != null ? `$${p.value.toLocaleString()}` : "",
  },
];

// ── Token mapping data ───────────────────────────────────────────────────────

const TOKEN_MAP = [
  ["--background", "--ag-background-color", "Grid body bg"],
  ["--foreground", "--ag-foreground-color", "Primary text"],
  ["--card", "--ag-header-background-color", "Header bg"],
  ["--muted", "--ag-chrome-background-color", "Chrome areas"],
  ["--muted-foreground", "--ag-secondary-foreground-color", "Subdued text"],
  ["--border", "--ag-border-color", "All borders"],
  ["--primary", "--ag-accent-color", "Selection accent"],
  ["--ring", "--ag-range-selection-border-color", "Focus ring"],
  ["--font-sans", "--ag-font-family", "Font family"],
  ["--text-sm", "--ag-font-size", "Font size"],
  ["--radius", "--ag-border-radius", "Corner radius"],
  ["--shadow-resting", "--ag-card-shadow", "Panel shadows"],
  ["--destructive", "--ag-invalid-color", "Validation errors"],
  ["--duration-fast", "--ag-transition-duration", "Animations"],
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DataGridPage() {
  const [quickFilter, setQuickFilter] = useState("");

  return (
    <DocPage>
      <PageHeader
        title="DataGrid"
        description="High-performance data grid powered by AG Grid Community. Provides virtualization, column resizing, inline editing, and complex filtering — all themed via Akymic tokens. Use DataGrid for 100+ row datasets or when you need built-in grid state management."
      />

      {/* ── When to use ────────────────────────────────────────────── */}
      <DocSection title="When to use DataGrid vs Table">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Criterion</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Table</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">DataGrid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Row count", "< 100", "100+ / needs virtualization"],
                ["State management", "Consumer manages all", "Grid manages internally"],
                ["Features", "Display, simple sort", "Resize, edit, complex filter"],
                ["Bundle impact", "Zero JS overhead", "~150-200KB gzipped"],
                ["SSR", "Yes (pure HTML)", "No (client-only)"],
              ].map(([criterion, table, grid]) => (
                <tr key={criterion} className="bg-background">
                  <td className="px-4 py-3 font-medium text-foreground">{criterion}</td>
                  <td className="px-4 py-3 text-muted-foreground">{table}</td>
                  <td className="px-4 py-3 text-muted-foreground">{grid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* ── Basic ──────────────────────────────────────────────────── */}
      <DocSection title="Basic example">
        <Preview label="50-row sortable grid" className="flex-col items-stretch p-0">
          <div className="akymic-data-grid overflow-hidden rounded-lg border border-border" style={{ height: 400 }}>
            <AgGridReact<Employee>
              theme={akymicAgTheme}
              columnDefs={basicColumns}
              rowData={EMPLOYEES}
              defaultColDef={{ sortable: true, resizable: true, filter: true, minWidth: 100 }}
              animateRows={false}
            />
          </div>
        </Preview>
        <div className="mt-3">
          <Code>{`import { DataGrid } from "@/components/ui/data-grid";

<DataGrid
  columnDefs={[
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "role", headerName: "Role", flex: 1.5 },
    { field: "department", headerName: "Department", flex: 1 },
  ]}
  rowData={employees}
/>`}</Code>
        </div>
      </DocSection>

      {/* ── Pagination ─────────────────────────────────────────────── */}
      <DocSection title="Pagination">
        <Preview label="Paginated with 10 rows per page" className="flex-col items-stretch p-0">
          <div className="akymic-data-grid overflow-hidden rounded-lg border border-border" style={{ height: 500 }}>
            <AgGridReact<Employee>
              theme={akymicAgTheme}
              columnDefs={paginatedColumns}
              rowData={EMPLOYEES}
              defaultColDef={{ sortable: true, resizable: true, filter: true, minWidth: 80 }}
              pagination
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 20, 50]}
              animateRows={false}
            />
          </div>
        </Preview>
        <div className="mt-3">
          <Code>{`<DataGrid
  columnDefs={columns}
  rowData={employees}
  pagination
  paginationPageSize={10}
/>`}</Code>
        </div>
      </DocSection>

      {/* ── Quick filter ───────────────────────────────────────────── */}
      <DocSection title="Quick filter">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search across all columns..."
            value={quickFilter}
            onChange={(e) => setQuickFilter(e.target.value)}
            className="h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <Preview label="Type to filter rows" className="flex-col items-stretch p-0">
          <div className="akymic-data-grid overflow-hidden rounded-lg border border-border" style={{ height: 350 }}>
            <AgGridReact<Employee>
              theme={akymicAgTheme}
              columnDefs={basicColumns}
              rowData={EMPLOYEES}
              defaultColDef={{ sortable: true, resizable: true, filter: true, minWidth: 100 }}
              quickFilterText={quickFilter}
              animateRows={false}
            />
          </div>
        </Preview>
        <div className="mt-3">
          <Code>{`const [search, setSearch] = useState("");

<Input value={search} onChange={e => setSearch(e.target.value)} />
<DataGrid
  columnDefs={columns}
  rowData={employees}
  quickFilterText={search}
/>`}</Code>
        </div>
      </DocSection>

      {/* ── Row selection ──────────────────────────────────────────── */}
      <DocSection title="Row selection">
        <Preview label="Multi-select with checkboxes" className="flex-col items-stretch p-0">
          <div className="akymic-data-grid overflow-hidden rounded-lg border border-border" style={{ height: 350 }}>
            <AgGridReact<Employee>
              theme={akymicAgTheme}
              columnDefs={selectionColumns}
              rowData={EMPLOYEES.slice(0, 15)}
              defaultColDef={{ sortable: true, resizable: true, filter: true, minWidth: 100 }}
              rowSelection={{
                mode: "multiRow",
                checkboxes: true,
                headerCheckbox: true,
              }}
              animateRows={false}
            />
          </div>
        </Preview>
        <div className="mt-3">
          <Code>{`<DataGrid
  columnDefs={columns}
  rowData={employees}
  rowSelection="multiple"
/>`}</Code>
        </div>
      </DocSection>

      {/* ── Custom cell renderers ──────────────────────────────────── */}
      <DocSection title="Custom cell renderers">
        <Preview label="Status badge in cell" className="flex-col items-stretch p-0">
          <div className="akymic-data-grid overflow-hidden rounded-lg border border-border" style={{ height: 350 }}>
            <AgGridReact<Employee>
              theme={akymicAgTheme}
              columnDefs={rendererColumns}
              rowData={EMPLOYEES.slice(0, 12)}
              defaultColDef={{ sortable: true, resizable: true, filter: true, minWidth: 100 }}
              animateRows={false}
            />
          </div>
        </Preview>
        <div className="mt-3">
          <Code>{`const columns = [
  { field: "name" },
  {
    field: "status",
    cellRenderer: (params) => {
      const badge = params.value === "active"
        ? "bg-secondary text-secondary-foreground"
        : "border border-border text-muted-foreground";
      return \`<span class="... \${badge}">\${params.value}</span>\`;
    },
  },
];`}</Code>
        </div>
      </DocSection>

      {/* ── Token mapping ──────────────────────────────────────────── */}
      <DocSection title="Token mapping reference">
        <p className="mb-4 text-sm text-muted-foreground">
          The Akymic theme bridge maps AG Grid&apos;s CSS custom properties to existing design tokens.
          No new tokens are introduced. Dark mode works automatically via the <code className="text-xs">.dark</code> cascade.
        </p>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Akymic Token</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">AG Grid Variable</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {TOKEN_MAP.map(([akymic, ag, purpose]) => (
                <tr key={ag} className="bg-background">
                  <td className="px-4 py-2.5"><code className="font-mono text-xs">{akymic}</code></td>
                  <td className="px-4 py-2.5"><code className="font-mono text-xs text-muted-foreground">{ag}</code></td>
                  <td className="px-4 py-2.5 text-muted-foreground">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* ── Props table ────────────────────────────────────────────── */}
      <DocSection title="DataGrid Props">
        <PropsTable rows={[
          { name: "columnDefs", type: "ColDef<TData>[]", description: "Column definitions. See AG Grid ColDef docs." },
          { name: "rowData", type: "TData[] | null", description: "Row data array. null triggers loading overlay." },
          { name: "rowSelection", type: '"single" | "multiple"', description: "Enable row selection mode." },
          { name: "pagination", type: "boolean", default: "false", description: "Enable pagination controls." },
          { name: "paginationPageSize", type: "number", default: "20", description: "Rows per page when pagination is enabled." },
          { name: "quickFilterText", type: "string", description: "Quick-filter text — filters across all visible columns." },
          { name: "striped", type: "boolean", default: "false", description: "Apply alternating row background stripes." },
          { name: "height", type: "string | number", default: '"400px"', description: "Grid container height." },
          { name: "loading", type: "boolean", default: "false", description: "Show loading overlay. Auto-shown when rowData is null." },
          { name: "emptyMessage", type: "string", default: '"No data to display"', description: "Message shown when rowData is empty." },
          { name: "onGridReady", type: "(event: GridReadyEvent) => void", description: "Callback when grid initializes. Provides Grid API access." },
          { name: "gridOptions", type: "Partial<GridOptions>", description: "Escape hatch — pass any AG Grid option directly." },
          { name: "className", type: "string", description: "Additional CSS class for the outer wrapper." },
        ]} />
      </DocSection>

      {/* ── Bundle size ────────────────────────────────────────────── */}
      <DocSection title="Bundle size">
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <p className="mb-2 font-medium text-foreground">AG Grid Community adds ~150-200KB gzipped (tree-shaken) to your bundle.</p>
          <ul className="list-inside list-disc space-y-1">
            <li>DataGrid uses a <strong>peer dependency</strong> pattern — non-users pay zero cost</li>
            <li>AG Grid is imported via <code className="text-xs">@akymic/ui/data-grid</code>, separate from the main barrel</li>
            <li>Use AG Grid&apos;s modular imports to reduce bundle size further</li>
            <li>For simple tables (&lt;100 rows), prefer the lightweight <code className="text-xs">&lt;Table&gt;</code> component</li>
          </ul>
        </div>
      </DocSection>
    </DocPage>
  );
}
