export const metadata = { title: "Components" };

type Status = "stable" | "planned" | "not-started";

const COMPONENTS: { name: string; status: Status; variants: string; notes: string }[] = [
  { name: "Button",           status: "stable",      variants: "default, secondary, ghost, outline, destructive",      notes: "3 sizes · 5 states incl. disabled + focus" },
  { name: "Input",            status: "stable",      variants: "default, error",                                       notes: "Focus ring · disabled state · placeholder" },
  { name: "Card",             status: "stable",      variants: "default, interactive (via className)",                  notes: "CardHeader, CardTitle, CardDescription, CardContent, CardFooter" },
  { name: "Badge",            status: "stable",      variants: "default, secondary, destructive, outline",             notes: "2 sizes (sm, default)" },
  { name: "Divider",          status: "stable",      variants: "horizontal plain, horizontal labeled, vertical",       notes: "self-stretch vertical for flex rows" },
  { name: "NavSidebar",       status: "stable",      variants: "—",                                                    notes: "240px · active via usePathname · user footer" },
  { name: "Topbar",           status: "stable",      variants: "—",                                                    notes: "60px · title + icons + theme toggle + avatar" },
  { name: "AppShell",         status: "stable",      variants: "—",                                                    notes: "Server component layout wrapper" },
  { name: "Textarea",         status: "planned",     variants: "default, error",                                       notes: "Mirrors Input API" },
  { name: "Select",           status: "planned",     variants: "default, error",                                       notes: "Native wrapper first" },
  { name: "Checkbox",         status: "planned",     variants: "—",                                                    notes: "unchecked, checked, indeterminate, disabled" },
  { name: "Radio",            status: "planned",     variants: "—",                                                    notes: "—" },
  { name: "Switch",           status: "planned",     variants: "—",                                                    notes: "—" },
  { name: "Table",            status: "not-started", variants: "—",                                                    notes: "Row stripes · sortable columns · border lines" },
  { name: "Pagination",       status: "not-started", variants: "—",                                                    notes: "Pairs with Table" },
  { name: "Dialog",           status: "not-started", variants: "—",                                                    notes: "Focus trap · --popover + --ring" },
  { name: "Drawer",           status: "not-started", variants: "—",                                                    notes: "Side-anchored dialog" },
  { name: "Tooltip",          status: "not-started", variants: "—",                                                    notes: "--popover · hover-triggered" },
  { name: "Dropdown",         status: "not-started", variants: "—",                                                    notes: "--accent hover" },
  { name: "Alert",            status: "not-started", variants: "info, warning, error, success",                        notes: "Inline · no JS dependency" },
  { name: "Toast",            status: "not-started", variants: "info, warning, error, success",                        notes: "Evaluate sonner" },
  { name: "Empty State",      status: "not-started", variants: "—",                                                    notes: "Illustration slot + CTA" },
  { name: "Skeleton",         status: "not-started", variants: "—",                                                    notes: "Pulse animation" },
  { name: "Breadcrumb",       status: "not-started", variants: "—",                                                    notes: "—" },
  { name: "Tabs",             status: "not-started", variants: "—",                                                    notes: "—" },
];

const STATUS_STYLES: Record<Status, string> = {
  stable:      "bg-primary/10 text-primary",
  planned:     "bg-secondary text-secondary-foreground",
  "not-started": "border border-border text-muted-foreground",
};

const STATUS_LABEL: Record<Status, string> = {
  stable: "stable",
  planned: "planned",
  "not-started": "not started",
};

const stable = COMPONENTS.filter(c => c.status === "stable").length;
const planned = COMPONENTS.filter(c => c.status === "planned").length;

export default function ComponentsPage() {
  return (
    <div className="px-8 py-12 lg:px-16">
      <div className="max-w-5xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Components</p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">Overview</h1>
        <p className="mb-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
          All components use semantic tokens — no hardcoded colors. Every interactive element has visible focus rings.
          Both light and dark modes are supported from day one.
        </p>

        {/* Quick stats */}
        <div className="mb-10 flex gap-6">
          <div>
            <span className="text-2xl font-bold text-foreground">{stable}</span>
            <span className="ml-1.5 text-sm text-muted-foreground">stable</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-foreground">{planned}</span>
            <span className="ml-1.5 text-sm text-muted-foreground">planned</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-foreground">{COMPONENTS.length - stable - planned}</span>
            <span className="ml-1.5 text-sm text-muted-foreground">not started</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Component</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Variants</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COMPONENTS.map((c) => (
                <tr key={c.name} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[c.status]}`}>
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{c.variants}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
