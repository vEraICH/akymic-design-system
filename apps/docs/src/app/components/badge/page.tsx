import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Badge" };

export default function BadgePage() {
  return (
    <DocPage>
      <PageHeader
        title="Badge"
        description="Compact status labels for metadata, version numbers, categories, and pipeline states."
      />

      <DocSection title="Variants">
        <Preview className="items-center">
          <span className="inline-flex items-center rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">Default</span>
          <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">Secondary</span>
          <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs font-medium text-foreground">Outline</span>
          <span className="inline-flex items-center rounded-md bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground">Destructive</span>
          <span className="inline-flex items-center rounded-md bg-success px-2 py-0.5 text-xs font-medium text-success-foreground">Success</span>
          <span className="inline-flex items-center rounded-md bg-warning px-2 py-0.5 text-xs font-medium text-warning-foreground">Warning</span>
        </Preview>
      </DocSection>

      <DocSection title="Sizes">
        <Preview className="items-center">
          <span className="inline-flex items-center rounded px-1.5 py-px text-[10px] font-medium leading-tight bg-primary text-primary-foreground">sm</span>
          <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground">default</span>
        </Preview>
      </DocSection>

      <DocSection title="In context">
        <Preview className="flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Navigation Shell</span>
            <span className="inline-flex items-center rounded-md bg-success px-2 py-0.5 text-xs font-medium text-success-foreground">stable</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Calendar Phase 2</span>
            <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs font-medium text-foreground">planned</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">API v2.4.1</span>
            <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">New</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Payment module</span>
            <span className="inline-flex items-center rounded-md bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground">breaking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Storage usage</span>
            <span className="inline-flex items-center rounded-md bg-warning px-2 py-0.5 text-xs font-medium text-warning-foreground">85%</span>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Badge } from "@/components/ui/badge";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>

// Small size
<Badge size="sm">New</Badge>`}</Code>
      </DocSection>

      <DocSection title="Props">
        <PropsTable rows={[
          { name: "variant", type: '"default" | "secondary" | "outline" | "destructive" | "success" | "warning"', default: '"default"', description: "Color intent of the badge." },
          { name: "size", type: '"sm" | "default"', default: '"default"', description: "Controls font size and padding. sm is tighter for dense UIs." },
          { name: "className", type: "string", description: "Additional classes merged via cn()." },
          { name: "...props", type: "HTMLSpanAttributes", description: "All native span attributes forwarded." },
        ]} />
      </DocSection>
    </DocPage>
  );
}
