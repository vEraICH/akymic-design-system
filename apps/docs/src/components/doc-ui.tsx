import { cn } from "@/lib/utils";

// ── Page-level structure ────────────────────────────────────────────────────

export function PageHeader({
  eyebrow = "Components",
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function DocSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mb-10", className)}>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

// ── Preview box ────────────────────────────────────────────────────────────

export function Preview({
  label,
  children,
  className,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {label && (
        <div className="border-b border-border bg-muted/40 px-4 py-2">
          <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
        </div>
      )}
      <div
        className={cn(
          "flex flex-wrap items-start gap-3 bg-background p-6",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

// ── Code snippet ───────────────────────────────────────────────────────────

export function Code({ children }: { children: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <pre className="overflow-x-auto bg-muted/60 p-4 text-[12.5px] leading-relaxed text-foreground">
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}

// ── Props table ────────────────────────────────────────────────────────────

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
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
          {rows.map((r) => (
            <tr key={r.name} className="bg-background">
              <td className="px-4 py-3">
                <code className="font-mono text-xs text-foreground">{r.name}</code>
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-xs text-muted-foreground">{r.type}</code>
              </td>
              <td className="px-4 py-3">
                {r.default ? (
                  <code className="font-mono text-xs text-muted-foreground">{r.default}</code>
                ) : (
                  <span className="text-xs text-muted-foreground/50">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Page wrapper ───────────────────────────────────────────────────────────

export function DocPage({ children }: { children: React.ReactNode }) {
  return (
    <article className="px-8 py-12 lg:px-16">
      <div className="max-w-4xl">{children}</div>
    </article>
  );
}
