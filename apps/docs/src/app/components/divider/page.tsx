import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Divider" };

export default function DividerPage() {
  return (
    <DocPage>
      <PageHeader
        title="Divider"
        description="Visual separator for grouping content. Supports horizontal (with optional label) and vertical orientations."
      />

      <DocSection title="Horizontal">
        <Preview className="flex-col items-stretch gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Plain</span>
            <div className="h-px bg-border" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">With label</span>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">With long label</span>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">continue with</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Vertical">
        <Preview>
          <div className="flex h-8 items-center gap-4">
            <span className="text-sm text-muted-foreground">Item one</span>
            <div className="h-full w-px self-stretch bg-border" />
            <span className="text-sm text-muted-foreground">Item two</span>
            <div className="h-full w-px self-stretch bg-border" />
            <span className="text-sm text-muted-foreground">Item three</span>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="In context — login form">
        <Preview className="flex-col items-stretch">
          <div className="flex w-64 flex-col gap-4">
            <button className="flex h-9 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-90">
              Continue with email
            </button>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <button className="flex h-9 w-full items-center justify-center rounded-md border border-border text-sm font-medium text-foreground hover:bg-accent">
              Continue with GitHub
            </button>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Divider } from "@/components/ui/divider";

// Plain horizontal
<Divider />

// With label
<Divider label="or" />

// Vertical (uses self-stretch in flex containers)
<div className="flex h-8 items-center gap-4">
  <span>Item one</span>
  <Divider orientation="vertical" />
  <span>Item two</span>
</div>`}</Code>
      </DocSection>

      <DocSection title="Props">
        <PropsTable rows={[
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Axis of the separator line." },
          { name: "label", type: "string", description: "Optional text centered in the horizontal divider. Not available for vertical." },
          { name: "className", type: "string", description: "Merged via cn() on the outer wrapper." },
        ]} />
      </DocSection>
    </DocPage>
  );
}
