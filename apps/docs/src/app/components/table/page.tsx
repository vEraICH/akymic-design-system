import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Table" };

const ROWS = [
  { name: "Alex Chen",   role: "Designer",  status: "active",   joined: "Jan 10, 2025" },
  { name: "Jordan Kim",  role: "Engineer",  status: "active",   joined: "Feb 15, 2025" },
  { name: "Sam Rivera",  role: "PM",        status: "inactive", joined: "Mar 1, 2025"  },
  { name: "Morgan Lee",  role: "Designer",  status: "active",   joined: "Apr 5, 2025"  },
];

export default function TablePage() {
  return (
    <DocPage>
      <PageHeader
        title="Table"
        description="Data grid with optional sortable columns, striped rows, and keyboard-accessible sort headers. Pairs with FilterBar and Pagination."
      />

      <DocSection title="Standard table">
        <Preview className="flex-col items-stretch p-0 overflow-hidden">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Name</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Role</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ROWS.map((r) => (
                  <tr key={r.name} className="bg-background hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{r.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.role}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${r.status === "active" ? "bg-secondary text-secondary-foreground" : "border border-border text-muted-foreground"}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{r.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Sortable headers">
        <Preview className="flex-col items-stretch p-0">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {(
                    [
                      { label: "Name",   sorted: "asc"  },
                      { label: "Role",   sorted: false  },
                      { label: "Joined", sorted: false  },
                    ] as { label: string; sorted: "asc" | "desc" | false }[]
                  ).map(({ label, sorted }) => (
                    <th key={label} className="px-4 py-2.5 text-left">
                      <button className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
                        {label}
                        <svg className={`h-3 w-3 ${sorted ? "text-primary" : "opacity-40"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          {sorted === "asc"
                            ? <polyline points="18 15 12 9 6 15"/>
                            : sorted === "desc"
                            ? <polyline points="6 9 12 15 18 9"/>
                            : <><polyline points="18 15 12 9 6 15" className="opacity-50"/><polyline points="6 14 12 20 18 14" className="opacity-50"/></>
                          }
                        </svg>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ROWS.slice(0, 3).map((r) => (
                  <tr key={r.name} className="bg-background">
                    <td className="px-4 py-3 font-medium text-foreground">{r.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.role}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Striped rows">
        <Preview className="flex-col items-stretch p-0">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Token</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Role</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Light</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["--primary",     "Interactive actions",  "221 83% 53%"],
                  ["--secondary",   "Subdued surfaces",     "210 40% 96%"],
                  ["--muted",       "Disabled / empty",     "210 40% 96%"],
                  ["--destructive", "Error / danger",       "0 84.2% 60.2%"],
                ].map(([token, role, light], i) => (
                  <tr key={token} className={i % 2 === 0 ? "bg-background" : "bg-muted/40"}>
                    <td className="px-4 py-2.5"><code className="font-mono text-xs">{token}</code></td>
                    <td className="px-4 py-2.5 text-muted-foreground">{role}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{light}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import {
  Table, TableHeader, TableBody,
  TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { FilterBar } from "@/components/ui/filter-bar";
import { Pagination } from "@/components/ui/pagination";

// With search, sort, paginate
<FilterBar
  search={search}
  onSearchChange={setSearch}
  placeholder="Search by name…"
/>

<Table>
  <TableHeader>
    <TableRow>
      <TableHead
        sortable
        sortDirection={sortKey === "name" ? sortOrder : false}
        onSort={() => handleSort("name")}
      >
        Name
      </TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody striped>
    {rows.map((row) => (
      <TableRow key={row.id}>
        <TableCell className="font-medium">{row.name}</TableCell>
        <TableCell>
          <Badge variant={row.active ? "secondary" : "outline"}>
            {row.status}
          </Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

<Pagination
  page={page}
  pageCount={pageCount}
  onPageChange={setPage}
/>`}</Code>
      </DocSection>

      <DocSection title="TableHead Props">
        <PropsTable rows={[
          { name: "sortable", type: "boolean", default: "false", description: "Renders column header as a button with sort icon." },
          { name: "sortDirection", type: '"asc" | "desc" | false', default: "false", description: "Current sort state. false means unsorted." },
          { name: "onSort", type: "() => void", description: "Called when header is clicked or activated via keyboard." },
        ]} />
      </DocSection>

      <DocSection title="TableBody Props">
        <PropsTable rows={[
          { name: "striped", type: "boolean", default: "false", description: "Alternates row background between bg-background and bg-muted/40." },
        ]} />
      </DocSection>
    </DocPage>
  );
}
