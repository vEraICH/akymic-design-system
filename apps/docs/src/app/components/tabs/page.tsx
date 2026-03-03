import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Tabs & Breadcrumb" };

export default function TabsPage() {
  return (
    <DocPage>
      <PageHeader
        title="Tabs & Breadcrumb"
        description="Tabs: keyboard-navigable tab panels with line and pill variants. Breadcrumb: accessible page-path navigation with separator, ellipsis, and a convenience array API."
      />

      {/* ── Tabs — line ──────────────────────────────────────────────────── */}
      <DocSection title="Tabs — line variant">
        <Preview className="flex-col items-stretch p-0 overflow-hidden">
          <div className="flex flex-col px-4 pt-4">
            {/* TabsList */}
            <div className="flex border-b border-border gap-0">
              {[
                { label: "Overview", active: true },
                { label: "Activity", active: false },
                { label: "Settings", active: false },
                { label: "Disabled", active: false, disabled: true },
              ].map(({ label, active, disabled }) => (
                <button
                  key={label}
                  role="tab"
                  aria-selected={active}
                  disabled={disabled}
                  className={[
                    "inline-flex items-center justify-center whitespace-nowrap border-b-2 px-4 py-2.5 -mb-px text-sm font-medium transition-colors",
                    active
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                    disabled ? "cursor-not-allowed opacity-50" : "",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* TabsContent */}
            <div role="tabpanel" className="py-4">
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <p>Overview content — token coverage, component count, adoption metrics.</p>
                <div className="flex gap-3 pt-1">
                  <div className="rounded-md border border-border bg-card px-4 py-3">
                    <p className="text-xs text-muted-foreground">Components</p>
                    <p className="text-xl font-bold text-foreground">31</p>
                  </div>
                  <div className="rounded-md border border-border bg-card px-4 py-3">
                    <p className="text-xs text-muted-foreground">Tokens</p>
                    <p className="text-xl font-bold text-foreground">23</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Preview>
      </DocSection>

      {/* ── Tabs — pill ──────────────────────────────────────────────────── */}
      <DocSection title="Tabs — pill variant">
        <Preview className="flex-col items-start gap-3">
          {/* TabsList */}
          <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
            {[
              { label: "Day",   active: false },
              { label: "Week",  active: true  },
              { label: "Month", active: false },
              { label: "Year",  active: false },
            ].map(({ label, active }) => (
              <button
                key={label}
                role="tab"
                aria-selected={active}
                className={[
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-background text-foreground shadow-resting"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="text-sm text-muted-foreground">
            Weekly view — 5 events this week
          </div>
        </Preview>
      </DocSection>

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <DocSection title="Breadcrumb — basic">
        <Preview>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm">
              {[
                { label: "Home",       current: false },
                { label: "Components", current: false },
                { label: "Breadcrumb", current: true  },
              ].map(({ label, current }, i, arr) => (
                <li key={label} className="flex items-center gap-1">
                  {current ? (
                    <span aria-current="page" className="font-medium text-foreground">{label}</span>
                  ) : (
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{label}</a>
                  )}
                  {i < arr.length - 1 && (
                    <svg className="h-3.5 w-3.5 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Preview>
      </DocSection>

      <DocSection title="Breadcrumb — with ellipsis">
        <Preview>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm">
              <li className="flex items-center gap-1">
                <a href="#" className="text-muted-foreground hover:text-foreground">Home</a>
                <svg className="h-3.5 w-3.5 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </li>
              <li role="presentation" aria-label="More pages" className="flex items-center gap-1 text-muted-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
                </svg>
                <svg className="h-3.5 w-3.5 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </li>
              <li className="flex items-center gap-1">
                <a href="#" className="text-muted-foreground hover:text-foreground">Components</a>
                <svg className="h-3.5 w-3.5 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </li>
              <li>
                <span aria-current="page" className="font-medium text-foreground">Tabs</span>
              </li>
            </ol>
          </nav>
        </Preview>
      </DocSection>

      <DocSection title="Breadcrumb — custom separator">
        <Preview className="flex-col items-start gap-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm">
              {["Dashboard", "Settings", "Profile"].map((label, i, arr) => (
                <li key={label} className="flex items-center gap-1">
                  {i === arr.length - 1 ? (
                    <span aria-current="page" className="font-medium text-foreground">{label}</span>
                  ) : (
                    <>
                      <a href="#" className="text-muted-foreground hover:text-foreground">{label}</a>
                      <span aria-hidden="true" className="text-muted-foreground/50 select-none">/</span>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbEllipsis, BreadcrumbList,
} from "@/components/ui/breadcrumb";

// Tabs — controlled
const [tab, setTab] = useState("overview");

<Tabs value={tab} onChange={setTab} variant="line">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview" className="pt-4">...</TabsContent>
  <TabsContent value="activity" className="pt-4">...</TabsContent>
</Tabs>

// Tabs — uncontrolled with pill variant
<Tabs defaultValue="week" variant="pill">
  <TabsList>
    <TabsTrigger value="day">Day</TabsTrigger>
    <TabsTrigger value="week">Week</TabsTrigger>
    <TabsTrigger value="month">Month</TabsTrigger>
  </TabsList>
  <TabsContent value="week" className="pt-4">...</TabsContent>
</Tabs>

// Breadcrumb — from array (convenience)
<BreadcrumbList segments={[
  { label: "Home",       href: "/" },
  { label: "Components", href: "/components" },
  { label: "Tabs" },           // no href → current page
]} />

// Breadcrumb — manual (with ellipsis)
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbEllipsis />
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink current>Tabs</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>`}</Code>
      </DocSection>

      <DocSection title="Tabs Props">
        <PropsTable rows={[
          { name: "value",        type: "string",                  description: "Controlled active tab value." },
          { name: "defaultValue", type: "string",   default: '""', description: "Initial tab when uncontrolled." },
          { name: "onChange",     type: "(value: string) => void", description: "Called when the active tab changes." },
          { name: "variant",      type: '"line" | "pill"', default: '"line"', description: "line: underline indicator. pill: filled background on active tab." },
        ]} />
      </DocSection>

      <DocSection title="TabsTrigger Props">
        <PropsTable rows={[
          { name: "value",    type: "string",  description: "The value this trigger activates. Required." },
          { name: "disabled", type: "boolean", default: "false", description: "Prevents selection and skips keyboard focus." },
        ]} />
      </DocSection>

      <DocSection title="BreadcrumbLink Props">
        <PropsTable rows={[
          { name: "href",    type: "string",  description: "Link destination. Omit for plain text (e.g. current page)." },
          { name: "current", type: "boolean", default: "false", description: "Renders as a <span aria-current='page'> instead of <a>. Applies text-foreground + font-medium." },
        ]} />
      </DocSection>

      <DocSection title="Keyboard behaviour">
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li>• <strong className="text-foreground">Tabs</strong> — <code className="rounded bg-muted px-1 font-mono text-xs">←  →</code> move between tabs, <code className="rounded bg-muted px-1 font-mono text-xs">Home / End</code> jump to first/last. Activating a tab also moves keyboard focus to it. Disabled tabs are skipped.</li>
          <li>• <strong className="text-foreground">Roving tabindex</strong> — only the active tab has <code className="rounded bg-muted px-1 font-mono text-xs">tabIndex=0</code>; all others use <code className="rounded bg-muted px-1 font-mono text-xs">tabIndex=-1</code>. Tab key moves directly to the panel.</li>
          <li>• <strong className="text-foreground">Breadcrumb</strong> — standard links, fully keyboard accessible. Current page is a <code className="rounded bg-muted px-1 font-mono text-xs">&lt;span&gt;</code> with <code className="rounded bg-muted px-1 font-mono text-xs">aria-current="page"</code>; separators and ellipsis have <code className="rounded bg-muted px-1 font-mono text-xs">aria-hidden</code>.</li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
