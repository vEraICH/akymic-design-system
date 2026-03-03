export const metadata = { title: "Components" };

type Status = "stable" | "planned" | "not-started";

const COMPONENTS: { name: string; status: Status; variants: string; notes: string }[] = [
  // Navigation
  { name: "NavSidebar",   status: "stable",      variants: "—",                                                              notes: "240px · active via usePathname · user footer" },
  { name: "Topbar",       status: "stable",      variants: "—",                                                              notes: "60px · title + icons + theme toggle + avatar" },
  { name: "AppShell",     status: "stable",      variants: "—",                                                              notes: "Server component layout wrapper (NavSidebar + Topbar)" },
  // Basics
  { name: "Button",       status: "stable",      variants: "default, secondary, ghost, outline, destructive",                notes: "3 sizes · 5 states incl. disabled + loading + focus" },
  { name: "Badge",        status: "stable",      variants: "default, secondary, outline, success, warning, destructive",    notes: "2 sizes (sm, default)" },
  { name: "Input",        status: "stable",      variants: "default, error, disabled",                                      notes: "Focus ring · placeholder · pairs with FormGroup label" },
  { name: "Textarea",     status: "stable",      variants: "default, error, disabled",                                      notes: "Auto-resize optional · mirrors Input API" },
  { name: "Card",         status: "stable",      variants: "default, interactive (via className)",                          notes: "CardHeader, CardTitle, CardDescription, CardContent, CardFooter" },
  { name: "Divider",      status: "stable",      variants: "horizontal plain, horizontal labeled, vertical",                notes: "self-stretch vertical for flex rows" },
  // Feedback
  { name: "Alert",        status: "stable",      variants: "default, info, success, warning, destructive",                 notes: "Inline · optional dismiss · no JS dependency" },
  { name: "Toast",        status: "stable",      variants: "default, info, success, warning, destructive",                 notes: "Imperative API · auto-dismiss 4s · max 5 stacked · <Toaster />" },
  { name: "Skeleton",     status: "stable",      variants: "—",                                                             notes: "animate-pulse · compose freely with h-* w-* className" },
  { name: "Spinner",      status: "stable",      variants: "sm, default, lg",                                              notes: "Exported from skeleton.tsx" },
  { name: "EmptyState",   status: "stable",      variants: "—",                                                             notes: "icon + title + description + optional action CTA" },
  // Overlays
  { name: "Dialog",       status: "stable",      variants: "confirm, destructive",                                         notes: "Focus trap · body scroll lock · portal · shadow-floating" },
  { name: "Drawer",       status: "stable",      variants: "right, left, bottom, top",                                     notes: "Same API as Dialog + side prop · slide animation 300ms" },
  // Data
  { name: "Table",        status: "stable",      variants: "standard, sortable headers, striped rows",                     notes: "TableHead sortable prop · TableBody striped prop" },
  { name: "Pagination",   status: "stable",      variants: "—",                                                             notes: "Pairs with Table · page/pageCount/onPageChange" },
  { name: "Calendar",     status: "stable",      variants: "full month view, mini month",                                  notes: "Zero external deps · event chips · Phase 2 (week/day) deferred" },
  // Form controls
  { name: "Select",       status: "stable",      variants: "default, error, disabled",                                     notes: "Popover-based · ARIA combobox · keyboard navigation" },
  { name: "Combobox",     status: "stable",      variants: "default, error, disabled",                                     notes: "Extends Select with searchable input inside dropdown" },
  { name: "MultiSelect",  status: "stable",      variants: "default, disabled",                                            notes: "Tag chips · maxDisplay overflow · clear-all" },
  { name: "DatePicker",   status: "stable",      variants: "default, error, disabled",                                     notes: "CalendarMiniMonth in popover · clearable · Intl.DateTimeFormat" },
  { name: "FileUpload",   status: "stable",      variants: "idle, drag-over, with files",                                  notes: "Drag-and-drop · maxSize · maxFiles · dedup by filename" },
  { name: "Checkbox",     status: "stable",      variants: "unchecked, checked, indeterminate, disabled",                  notes: "CheckboxField convenience wrapper · ARIA role=checkbox" },
  { name: "Radio",        status: "stable",      variants: "—",                                                             notes: "RadioGroup + Radio · arrow-key navigation · ARIA radiogroup" },
  { name: "Switch",       status: "stable",      variants: "off, on, disabled",                                            notes: "SwitchField convenience wrapper · ARIA role=switch · slide animation" },
  // Planned
  { name: "Tooltip",      status: "stable",      variants: "top, bottom, left, right",                                   notes: "hover+focus · delay prop · aria-describedby · portal" },
  { name: "Dropdown",     status: "stable",      variants: "default, with labels, with disabled items",                    notes: "role=menu · arrow-key nav · DropdownItem/Separator/Label · portal" },
  { name: "Tabs",         status: "stable",      variants: "line, pill",                                                   notes: "Roving tabindex · arrow-key nav · TabsList/Trigger/Content · controlled+uncontrolled" },
  { name: "Breadcrumb",   status: "stable",      variants: "basic, with ellipsis, custom separator",                      notes: "BreadcrumbList convenience API · aria-current=page · BreadcrumbEllipsis" },
];

const STATUS_STYLES: Record<Status, string> = {
  stable:        "bg-primary/10 text-primary",
  planned:       "bg-secondary text-secondary-foreground",
  "not-started": "border border-border text-muted-foreground",
};

const STATUS_LABEL: Record<Status, string> = {
  stable:        "stable",
  planned:       "planned",
  "not-started": "not started",
};

const stable  = COMPONENTS.filter(c => c.status === "stable").length;
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
