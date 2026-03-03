import { DocPage, PageHeader, DocSection, Preview, Code, PropsTable } from "@/components/doc-ui";

export const metadata = { title: "Dashboard Layout" };

export default function CompoundPage() {
  return (
    <DocPage>
      <PageHeader
        eyebrow="Compound Elements"
        title="Dashboard Layout"
        description="Higher-order components that compose Card, Badge, Tooltip, DropdownMenu, Skeleton, and EmptyState into a complete, accessible dashboard grid. Loading states, empty states, panel headers, and responsive collapse are all built in — no consumer wiring required."
      />

      {/* ── Concept ──────────────────────────────────────────────────────────── */}
      <DocSection title="What are compound elements?">
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            A <strong className="text-foreground">compound element</strong> qualifies when it:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Composes 3+ primitives internally with non-trivial coordination</li>
            <li>Encodes a full layout pattern — not just wrapping, but opinionated arrangement</li>
            <li>Manages its own loading and empty states without consumer wiring</li>
            <li>Has a named slot model — header, body, filters are explicit zones</li>
          </ul>
          <p>
            Simple wrappers like <code className="rounded bg-muted px-1.5 py-0.5 text-[12px] text-foreground">CardHeader</code> do not qualify.
            Dashboard panels, data sections with filter + table + pagination, and
            form sections with grouped fields do.
          </p>
        </div>
      </DocSection>

      {/* ── DashboardLayout ──────────────────────────────────────────────────── */}
      <DocSection title="DashboardLayout">
        <div className="mb-4 text-sm text-muted-foreground leading-relaxed">
          A responsive 12-column CSS Grid container. Manages gap, column count, an
          optional title/description header, and a loading state that swaps in
          <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-[12px] text-foreground">DashboardSkeleton</code>
          when <code className="rounded bg-muted px-1.5 py-0.5 text-[12px] text-foreground">loading=true</code>.
        </div>

        {/* Anatomy diagram */}
        <Preview label="Anatomy">
          <div className="w-full">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-base font-semibold text-foreground">Engineering Overview</div>
                <div className="text-sm text-muted-foreground">Last 30 days · All repositories</div>
              </div>
              <button className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                ↻ Refresh
              </button>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-12 gap-4">
              {/* 4 span panels */}
              {[
                "Open PRs",
                "Merge time",
                "CI pass rate",
                "Failures",
              ].map((label) => (
                <div
                  key={label}
                  style={{ gridColumn: "span 3" }}
                  className="rounded-lg border bg-card p-4"
                >
                  <div className="mb-2 h-3 w-2/3 rounded bg-muted" />
                  <div className="h-8 w-1/2 rounded bg-muted" />
                </div>
              ))}
              {/* 6 span panels */}
              <div style={{ gridColumn: "span 6" }} className="rounded-lg border bg-card p-4">
                <div className="mb-2 h-3 w-2/5 rounded bg-muted" />
                <div className="h-20 w-full rounded bg-muted" />
              </div>
              <div style={{ gridColumn: "span 6" }} className="rounded-lg border bg-card p-4">
                <div className="mb-2 h-3 w-2/5 rounded bg-muted" />
                <div className="h-20 w-full rounded bg-muted" />
              </div>
              {/* Full-width panel */}
              <div style={{ gridColumn: "span 12" }} className="rounded-lg border bg-card p-4">
                <div className="mb-2 h-3 w-1/4 rounded bg-muted" />
                <div className="h-14 w-full rounded bg-muted" />
              </div>
            </div>
          </div>
        </Preview>

        <div className="mt-4">
          <Code>{`<DashboardLayout
  title="Engineering Overview"
  description="Last 30 days · All repositories"
  columns={12}
  gap="md"
  loading={isLoading}
  skeletonCount={7}
  headerActions={<Button onClick={refresh}>Refresh</Button>}
>
  <DashboardPanel colSpan={3} title="Open PRs">...</DashboardPanel>
  <DashboardPanel colSpan={3} title="Merge time">...</DashboardPanel>
  <DashboardPanel colSpan={3} title="CI pass rate">...</DashboardPanel>
  <DashboardPanel colSpan={3} title="Failures">...</DashboardPanel>
  <DashboardPanel colSpan={6} title="Top contributors">...</DashboardPanel>
  <DashboardPanel colSpan={6} title="Deployments">...</DashboardPanel>
  <DashboardPanel colSpan={12} title="Recent merges">...</DashboardPanel>
</DashboardLayout>`}</Code>
        </div>

        <div className="mt-4">
          <PropsTable rows={[
            { name: "title",          type: "string",              description: "Optional layout-level heading rendered above the grid." },
            { name: "description",    type: "string",              description: "Optional subtext below the title." },
            { name: "columns",        type: "4 | 6 | 8 | 12",      default: "12",     description: "Grid column count. All panels span within this total." },
            { name: "gap",            type: '"sm" | "md" | "lg"',  default: '"md"',   description: "Gap between panels. sm=12px, md=16px, lg=24px." },
            { name: "loading",        type: "boolean",             default: "false",  description: "When true, renders DashboardSkeleton instead of children." },
            { name: "skeletonCount",  type: "number",              default: "4",      description: "Number of skeleton panels when loading is true." },
            { name: "headerActions",  type: "ReactNode",           description: "Slot for buttons or controls right-aligned in the header row." },
            { name: "className",      type: "string",              description: "Applied to the outer wrapper div." },
          ]} />
        </div>

        <div className="mt-4 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          <strong className="text-foreground">Responsive:</strong>{" "}
          Below 768px all panels collapse to a single column regardless of{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[12px] text-foreground">colSpan</code>.
          This is implemented via a scoped{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[12px] text-foreground">&lt;style&gt;</code>{" "}
          block keyed to a <code className="rounded bg-muted px-1 py-0.5 text-[12px] text-foreground">useId()</code>{" "}
          — necessary because inline styles override Tailwind responsive utilities.
        </div>
      </DocSection>

      {/* ── DashboardPanel anatomy ───────────────────────────────────────────── */}
      <DocSection title="DashboardPanel — anatomy">
        <div className="mb-4 text-sm text-muted-foreground leading-relaxed">
          Each panel is a <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-[12px] text-foreground">&lt;section aria-label=&#123;title&#125;&gt;</code> with
          a structured header, an optional filters zone, and a body slot.
          The header composes up to five elements from left to right: icon, title,
          badge, info tooltip trigger, and actions dropdown trigger.
        </div>

        <Preview label="Full header anatomy">
          <div className="w-full max-w-md">
            <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
              {/* Header */}
              <div className="flex flex-col gap-1 px-4 pb-3 pt-4">
                <div className="flex items-center gap-2">
                  {/* Icon */}
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                      <circle cx="8" cy="8" r="6" fillOpacity={0.2} stroke="currentColor" strokeWidth={1.5} fill="none" />
                      <circle cx="8" cy="8" r="2" />
                    </svg>
                  </span>
                  {/* Title */}
                  <span className="flex-1 text-sm font-medium text-card-foreground">
                    Pending reviews this week
                  </span>
                  {/* Badge */}
                  <span className="inline-flex items-center rounded-md bg-secondary px-1.5 py-px text-[10px] font-medium text-secondary-foreground">
                    Beta
                  </span>
                  {/* Info button */}
                  <button className="rounded-sm text-muted-foreground hover:text-foreground focus-visible:ring-2">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Actions button */}
                  <button className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM14 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                  </button>
                </div>
                {/* Subtitle */}
                <p className="text-xs text-muted-foreground">Last 7 days · Excluding bots</p>
              </div>
              {/* Filters zone */}
              <div className="border-t border-border px-4 py-2">
                <select className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground">
                  <option>Last 7 days</option>
                </select>
              </div>
              {/* Body */}
              <div className="min-h-[6rem] px-4 pb-4">
                <div className="pt-3 text-3xl font-bold tracking-tight text-foreground">24</div>
                <div className="text-xs text-muted-foreground">+3 from last week</div>
              </div>
            </div>

            {/* Annotation labels */}
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                ["icon",     "16×16 decorative, aria-hidden"],
                ["title",    "text-sm font-medium, required"],
                ["badge",    "<Badge size='sm'>, optional"],
                ["info ⓘ",  "Tooltip trigger, aria-label"],
                ["⋯ button", "DropdownMenu trigger, aria-label"],
                ["subtitle", "text-xs muted-foreground"],
                ["filters",  "border-t zone, slot for selects"],
                ["body",     "min-h-[6rem], children slot"],
              ].map(([label, note]) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[11px] text-foreground">{label}</code>
                  <span className="text-[11px] text-muted-foreground">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </Preview>
      </DocSection>

      {/* ── DashboardPanel states ─────────────────────────────────────────────── */}
      <DocSection title="DashboardPanel — states">
        <Preview label="default / loading / empty">
          <div className="grid w-full grid-cols-3 gap-4">
            {/* Default */}
            <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
              <div className="px-4 pb-2 pt-4">
                <span className="text-sm font-medium text-card-foreground">Open pull requests</span>
              </div>
              <div className="min-h-[6rem] px-4 pb-4">
                <div className="text-3xl font-bold tracking-tight text-foreground">42</div>
                <div className="text-xs text-muted-foreground">+5 from last week</div>
              </div>
            </div>

            {/* Loading */}
            <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
              <div className="px-4 pb-2 pt-4">
                <span className="text-sm font-medium text-card-foreground">Average merge time</span>
              </div>
              <div aria-busy="true" className="min-h-[6rem] px-4 pb-4">
                <div className="mt-1 h-24 w-full animate-pulse rounded-md bg-muted" />
              </div>
            </div>

            {/* Empty */}
            <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
              <div className="px-4 pb-2 pt-4">
                <span className="text-sm font-medium text-card-foreground">Deployments</span>
              </div>
              <div className="min-h-[6rem] px-4 pb-4">
                <div role="status" className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-6 text-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-foreground">No deployments</p>
                  <p className="text-[11px] text-muted-foreground">Nothing scheduled</p>
                </div>
              </div>
            </div>
          </div>
        </Preview>

        <div className="mt-4">
          <Code>{`{/* Default */}
<DashboardPanel colSpan={4} title="Open pull requests">
  <Stat value="42" delta="+5 from last week" />
</DashboardPanel>

{/* Loading — body replaced by Skeleton at loadingHeight */}
<DashboardPanel
  colSpan={4}
  title="Average merge time"
  loading={isLoading}
  loadingHeight="6rem"
>
  <Stat value="2.4h" />
</DashboardPanel>

{/* Empty — body replaced by EmptyState (custom or default) */}
<DashboardPanel
  colSpan={4}
  title="Deployments"
  empty={!hasDeployments}
  emptyState={
    <EmptyState
      icon={<CalendarX2 />}
      title="No deployments scheduled"
      description="Create a release to get started."
    />
  }
>
  <DeploymentList data={deployments} />
</DashboardPanel>`}</Code>
        </div>
      </DocSection>

      {/* ── DashboardPanel props ──────────────────────────────────────────────── */}
      <DocSection title="DashboardPanel props">
        <PropsTable rows={[
          { name: "title",         type: "string",                              description: "Panel heading. Required. Keep to one sentence fragment — lowercase, no dashes." },
          { name: "subtitle",      type: "string",                              description: "Data range or scope below the title. Rendered in text-xs muted-foreground." },
          { name: "icon",          type: "ReactNode",                           description: "16×16 decorative icon in the header. aria-hidden." },
          { name: "badge",         type: "{ label: string; variant? }",         description: "Rendered as a <Badge size='sm'> after the title. Use for Beta or Experiment labels." },
          { name: "info",          type: "string",                              description: "Content for the ⓘ tooltip. Triggers Tooltip on hover/focus of an icon button." },
          { name: "actions",       type: "DashboardPanelAction[]",   default: "[]",      description: "Items for the ⋯ dropdown. Empty array hides the menu entirely." },
          { name: "filters",       type: "ReactNode",                           description: "Rendered in a bordered zone between header and body. State managed by caller." },
          { name: "loading",       type: "boolean",                  default: "false",   description: "Renders a Skeleton block in the body instead of children." },
          { name: "loadingHeight", type: 'number | string',           default: '"10rem"', description: "Height of the Skeleton block when loading is true." },
          { name: "empty",         type: "boolean",                  default: "false",   description: "When true and not loading, renders the emptyState slot." },
          { name: "emptyState",    type: "ReactNode",                           description: "Custom empty state. Falls back to a generic EmptyState if not provided." },
          { name: "colSpan",       type: "number",                   default: "12",      description: "CSS Grid column span (1–12) in the parent DashboardLayout." },
          { name: "rowSpan",       type: "number",                   default: "1",       description: "CSS Grid row span (1–6)." },
          { name: "className",     type: "string",                              description: "Applied to the outer <section> element." },
          { name: "bodyClassName", type: "string",                              description: "Applied to the body wrapper div." },
        ]} />
      </DocSection>

      {/* ── DashboardPanelAction ─────────────────────────────────────────────── */}
      <DocSection title="DashboardPanelAction type">
        <Code>{`interface DashboardPanelAction {
  label:     string;
  onSelect:  () => void;
  variant?:  "default" | "destructive";  // destructive renders red text
  icon?:     ReactNode;
  disabled?: boolean;
}`}</Code>
        <div className="mt-4">
          <Code>{`actions={[
  { label: "Download CSV",  onSelect: handleDownload, icon: <Download /> },
  { label: "View details",  onSelect: handleView },
  { label: "Remove panel",  onSelect: handleRemove, variant: "destructive", icon: <Trash2 /> },
]}`}</Code>
        </div>
      </DocSection>

      {/* ── DashboardSkeleton ─────────────────────────────────────────────────── */}
      <DocSection title="DashboardSkeleton">
        <div className="mb-4 text-sm text-muted-foreground leading-relaxed">
          Full-layout loading placeholder. Used when the entire dashboard is loading
          before any panel titles are known. Rendered automatically by
          <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-[12px] text-foreground">DashboardLayout</code>
          when <code className="rounded bg-muted px-1.5 py-0.5 text-[12px] text-foreground">loading=true</code>,
          but can also be used standalone.
        </div>

        <Preview label="12-col skeleton (4 panels × colSpan 3)">
          <div className="w-full">
            <div className="grid grid-cols-12 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{ gridColumn: "span 3" }}
                  className="rounded-lg border bg-card p-4"
                >
                  <div className="mb-3 h-4 w-2/5 animate-pulse rounded bg-muted" />
                  <div className="h-24 w-full animate-pulse rounded-md bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </Preview>

        <div className="mt-4">
          <Code>{`// Used automatically via DashboardLayout loading prop:
<DashboardLayout loading={isLoading} skeletonCount={4} columns={12}>
  {panels}
</DashboardLayout>

// Or standalone:
import { DashboardSkeleton } from "@/components/ui/dashboard-skeleton";

<DashboardSkeleton count={4} columns={12} gap="md" />`}</Code>
        </div>

        <div className="mt-4">
          <PropsTable rows={[
            { name: "count",   type: "number",         default: "4",    description: "Number of skeleton panels to render." },
            { name: "columns", type: "4 | 6 | 8 | 12", default: "12",   description: "Must match the target DashboardLayout columns prop." },
            { name: "gap",     type: '"sm" | "md" | "lg"', default: '"md"', description: "Must match the target DashboardLayout gap prop." },
            { name: "className", type: "string",                          description: "Applied to the grid wrapper div." },
          ]} />
        </div>

        <div className="mt-4 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          <strong className="text-foreground">Default colSpan per skeleton panel:</strong>{" "}
          12-col → 4 (3-up), 8-col → 4 (2-up), 6-col → 3 (2-up), 4-col → 4 (1-up).
          These are fixed defaults chosen to give a plausible pre-load appearance.
        </div>
      </DocSection>

      {/* ── Token mapping ────────────────────────────────────────────────────── */}
      <DocSection title="Token mapping">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Token</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Role in compound elements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["--card, --card-foreground", "Panel surface and text"],
                ["--border",                  "Panel border and filters zone separator"],
                ["--shadow-resting",           "Panel elevation (same as Card)"],
                ["--muted-foreground",         "Subtitle, icon, info and actions button idle state"],
                ["--accent, --accent-foreground", "Actions button hover; DropdownItem hover"],
                ["--popover, --popover-foreground", "Info tooltip surface"],
                ["--muted",                   "Skeleton block background"],
                ["--background, --foreground", "Layout header title and description text"],
              ].map(([token, role]) => (
                <tr key={token} className="bg-background">
                  <td className="px-4 py-3">
                    <code className="font-mono text-xs text-foreground">{token}</code>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          No new tokens were required. All compound elements map exclusively to the existing token set.
        </p>
      </DocSection>

      {/* ── Accessibility ─────────────────────────────────────────────────────── */}
      <DocSection title="Accessibility">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Attribute / Behaviour</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Component</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["<section aria-label={title}>",       "DashboardPanel", "Named landmark — AT users can navigate between panels"],
                ["aria-busy=\"true\" on body",          "DashboardPanel", "Set on body wrapper while loading=true; removed when loaded"],
                ["role=\"status\" on empty state",      "DashboardPanel", "Announced politely by screen readers when content arrives"],
                ["aria-label=\"More actions\"",         "DashboardPanel", "Icon-only ⋯ button has explicit text label"],
                ["aria-label=\"More information…\"",   "DashboardPanel", "Icon-only ⓘ button: \"More information about {title}\""],
                ["focus-visible:ring-2 ring-ring",      "DashboardPanel", "All header buttons have keyboard focus ring"],
                ["Tooltip: aria-describedby",           "DashboardPanel", "Injected onto ⓘ trigger by <Tooltip>"],
                ["DropdownMenu: aria-haspopup, arrow keys", "DashboardPanel", "Full keyboard nav inherited from <DropdownMenu>"],
              ].map(([attr, component, note]) => (
                <tr key={attr} className="bg-background">
                  <td className="px-4 py-3">
                    <code className="font-mono text-xs text-foreground">{attr}</code>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{component}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* ── Panel title guidance ─────────────────────────────────────────────── */}
      <DocSection title="Panel title guidance">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-success/30 bg-success/5 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-success">Do</p>
            <ul className="space-y-1.5 text-sm text-foreground">
              {[
                "Pending reviews this week",
                "Average time to merge",
                "Open pull requests",
                "CI pass rate",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="text-success">✓</span> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-destructive">Don&apos;t</p>
            <ul className="space-y-1.5 text-sm text-foreground">
              {[
                "Open MRs - Last 30 Days",
                "Showing all open pull requests (excluding drafts)",
                "PR_Count_Weekly",
                "Statistics",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="text-destructive">✗</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Keep titles to one concise sentence fragment. Lowercase, no dashes, no date ranges in the title
          (use <code className="rounded bg-muted px-1.5 py-0.5 text-[12px] text-foreground">subtitle</code> for that).
        </p>
      </DocSection>
    </DocPage>
  );
}
