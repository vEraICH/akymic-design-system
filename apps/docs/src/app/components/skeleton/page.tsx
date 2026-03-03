import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Skeleton & States" };

export default function SkeletonPage() {
  return (
    <DocPage>
      <PageHeader
        title="Skeleton & States"
        description="Loading placeholders (Skeleton), activity indicators (Spinner), and zero-data screens (EmptyState) — the full suite of non-data UI states."
      />

      <DocSection title="Skeleton — card placeholder">
        <Preview>
          <div className="flex w-60 flex-col gap-3">
            <div className="h-36 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="flex gap-2 pt-1">
              <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
              <div className="h-8 w-16 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Skeleton — list rows">
        <Preview>
          <div className="flex w-80 flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-9 w-9 flex-shrink-0 animate-pulse rounded-full bg-muted" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Spinner">
        <Preview className="items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <svg className="h-4 w-4 animate-spin text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span className="text-[10px] text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="h-6 w-6 animate-spin text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span className="text-[10px] text-muted-foreground">default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="h-9 w-9 animate-spin text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span className="text-[10px] text-muted-foreground">lg</span>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="EmptyState">
        <Preview className="flex-col items-start gap-6">
          <div className="flex w-56 flex-col items-center gap-2 rounded-lg border border-border bg-card py-8 px-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <p className="text-sm font-semibold text-foreground">No notifications</p>
            <p className="text-xs text-muted-foreground">You&apos;re all caught up. New notifications will appear here.</p>
          </div>
          <div className="flex w-56 flex-col items-center gap-2 rounded-lg border border-border bg-card py-8 px-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <p className="text-sm font-semibold text-foreground">No results</p>
            <p className="text-xs text-muted-foreground">Try adjusting your search or filter.</p>
            <button className="mt-1 inline-flex h-7 items-center rounded-md border border-border px-3 text-xs font-medium text-foreground hover:bg-accent">
              Clear filters
            </button>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Skeleton, Spinner } from "@/components/ui/skeleton";
import { EmptyState }         from "@/components/ui/empty-state";

// Skeleton — compose freely
<div className="flex flex-col gap-3">
  <Skeleton className="h-36 w-full" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>

// Spinner sizes
<Spinner size="sm" />
<Spinner />            // default
<Spinner size="lg" />

// EmptyState
import { Inbox } from "lucide-react";

<EmptyState
  icon={<Inbox className="h-5 w-5" />}
  title="No notifications"
  description="You're all caught up."
/>

// With action CTA
<EmptyState
  icon={<Search className="h-5 w-5" />}
  title="No results"
  description="Try adjusting your filters."
  action={<Button size="sm" variant="outline">Clear filters</Button>}
/>`}</Code>
      </DocSection>

      <DocSection title="Skeleton Props">
        <PropsTable rows={[
          { name: "className", type: "string", description: "Controls size and shape. Set h-* and w-* (and rounded-full for circular avatars). animate-pulse is always applied." },
        ]} />
      </DocSection>

      <DocSection title="Spinner Props">
        <PropsTable rows={[
          { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "sm=16px, default=24px, lg=36px." },
          { name: "className", type: "string", description: "Override color with text-* utility. Defaults to text-primary." },
        ]} />
      </DocSection>

      <DocSection title="EmptyState Props">
        <PropsTable rows={[
          { name: "icon", type: "ReactNode", description: "Icon rendered in a muted circle. Use lucide-react icons at h-5 w-5." },
          { name: "title", type: "string", description: "Bold heading text." },
          { name: "description", type: "string", description: "Supporting text below the title." },
          { name: "action", type: "ReactNode", description: "Optional CTA element (Button, Link, etc.) rendered below the description." },
        ]} />
      </DocSection>
    </DocPage>
  );
}
