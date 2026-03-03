import { DocPage, PageHeader, DocSection, Preview, Code } from "@/components/doc-ui";

export const metadata = { title: "Navigation Shell" };

export default function NavigationPage() {
  return (
    <DocPage>
      <PageHeader
        title="Navigation Shell"
        description="App-level layout primitives: a 240px sidebar (NavSidebar), a 60px topbar (Topbar), and the AppShell wrapper that composes them. Zero JavaScript dependencies — active state via CSS class, not client-side routing."
      />

      <DocSection title="Anatomy">
        <div className="rounded-lg border border-border bg-card p-5 overflow-hidden">
          {/* Shell mockup */}
          <div className="flex rounded-md border border-border overflow-hidden" style={{ height: 220 }}>
            {/* Sidebar */}
            <div className="w-44 flex-shrink-0 flex flex-col border-r border-border bg-muted/40">
              {/* Logo */}
              <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-primary/80" />
                <span className="text-xs font-bold text-foreground tracking-tight">Akymic</span>
              </div>
              {/* Nav items */}
              <div className="flex-1 px-2 py-2 flex flex-col gap-0.5">
                {[
                  { label: "Overview", active: true },
                  { label: "Tokens", active: false },
                  { label: "Components", active: false },
                  { label: "Settings", active: false },
                ].map(({ label, active }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${
                      active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <div className={`h-3.5 w-3.5 rounded-sm ${active ? "bg-primary/60" : "bg-muted-foreground/30"}`} />
                    {label}
                  </div>
                ))}
              </div>
              {/* User footer */}
              <div className="px-3 py-2.5 border-t border-border flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-secondary" />
                <div>
                  <p className="text-[10px] font-medium text-foreground">Alex Chen</p>
                  <p className="text-[9px] text-muted-foreground">alex@akymic.com</p>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col">
              {/* Topbar */}
              <div className="h-10 border-b border-border bg-background flex items-center justify-between px-4">
                <span className="text-xs font-semibold text-foreground">Overview</span>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-muted" />
                  <div className="h-5 w-5 rounded-full bg-secondary" />
                </div>
              </div>
              {/* Page content placeholder */}
              <div className="flex-1 p-4 flex flex-col gap-2">
                <div className="h-3 w-32 rounded bg-muted animate-pulse" />
                <div className="h-3 w-48 rounded bg-muted animate-pulse" />
                <div className="mt-2 h-16 w-full rounded-md border border-border bg-muted/20" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="mt-4 flex gap-6">
            {[
              { label: "NavSidebar", sub: "240px · muted bg" },
              { label: "Topbar", sub: "60px · background" },
              { label: "AppShell", sub: "layout wrapper" },
            ].map(({ label, sub }) => (
              <div key={label}>
                <p className="text-xs font-semibold text-foreground">{label}</p>
                <p className="text-[11px] text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </DocSection>

      <DocSection title="NavSidebar">
        <Preview className="flex-col items-stretch p-0">
          <div className="w-60 flex flex-col rounded-lg border border-border bg-muted/40 overflow-hidden">
            {/* Logo row */}
            <div className="px-4 py-3.5 border-b border-border flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground">Akymic</span>
            </div>
            {/* Section label */}
            <div className="px-4 pt-4 pb-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Foundations</span>
            </div>
            {/* Nav items */}
            <div className="px-2 pb-2 flex flex-col gap-0.5">
              {[
                { label: "Overview", active: false },
                { label: "Color", active: true },
                { label: "Typography", active: false },
              ].map(({ label, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm ${
                    active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <div className={`h-1.5 w-1.5 rounded-full ${active ? "bg-primary" : "bg-transparent"}`} />
                  {label}
                </div>
              ))}
            </div>
            {/* User footer */}
            <div className="mt-auto px-3 py-3 border-t border-border flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-secondary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">Alex Chen</p>
                <p className="text-[11px] text-muted-foreground truncate">alex@akymic.com</p>
              </div>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Topbar">
        <Preview className="flex-col items-stretch p-0">
          <div className="flex h-14 w-full items-center justify-between border border-border bg-background px-5 rounded-lg">
            <span className="text-sm font-semibold text-foreground">Color</span>
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
              </button>
              <div className="h-7 w-7 rounded-full bg-secondary ml-1" />
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`// app/layout.tsx — no AppShell here (keeps paper-playground clean)

// app/dashboard/layout.tsx — opt-in per section
import { AppShell } from "@/components/app-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppShell title="Overview">{children}</AppShell>;
}

// AppShell composes NavSidebar + Topbar automatically
// NavSidebar uses usePathname() to highlight the active route`}</Code>
      </DocSection>

      <DocSection title="NavSidebar Props">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Prop</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Type</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { prop: "—", type: "—", desc: "No required props. Navigation items and user info are hardcoded in the component; customize by editing nav-sidebar.tsx." },
              ].map(({ prop, type, desc }) => (
                <tr key={prop} className="bg-background">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{type}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Topbar Props">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Prop</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Type</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Default</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { prop: "title", type: "string", def: '""', desc: "Page title displayed in the center-left of the topbar." },
              ].map(({ prop, type, def, desc }) => (
                <tr key={prop} className="bg-background">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{def}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Token mapping">
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li>• <strong className="text-foreground">Sidebar background</strong> — <code className="rounded bg-muted px-1 font-mono text-xs">bg-muted/40</code> (subtle warm surface distinct from page canvas)</li>
          <li>• <strong className="text-foreground">Active item</strong> — <code className="rounded bg-muted px-1 font-mono text-xs">bg-primary/10 text-primary</code> (tinted, not filled — preserves legibility)</li>
          <li>• <strong className="text-foreground">Hover item</strong> — <code className="rounded bg-muted px-1 font-mono text-xs">hover:bg-accent</code></li>
          <li>• <strong className="text-foreground">Topbar background</strong> — <code className="rounded bg-muted px-1 font-mono text-xs">bg-background</code> (same as page, separated by a <code className="rounded bg-muted px-1 font-mono text-xs">border-b</code>)</li>
          <li>• <strong className="text-foreground">No new tokens required</strong> — shell maps entirely to existing semantic tokens.</li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
