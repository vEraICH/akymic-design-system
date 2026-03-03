import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Button" };

export default function ButtonPage() {
  return (
    <DocPage>
      <PageHeader
        title="Button"
        description="Triggers an action or navigation. Five variants, three sizes, and full keyboard + focus-ring support."
      />

      <DocSection title="Variants">
        <Preview>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Primary
          </button>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Secondary
          </button>
          <button className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Outline
          </button>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Ghost
          </button>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Destructive
          </button>
        </Preview>
      </DocSection>

      <DocSection title="Sizes">
        <Preview className="items-center">
          <button className="inline-flex h-7 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Small
          </button>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Default
          </button>
          <button className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-base font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Large
          </button>
        </Preview>
      </DocSection>

      <DocSection title="States">
        <Preview>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Default
          </button>
          <button disabled className="inline-flex h-9 cursor-not-allowed items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground opacity-50">
            Disabled
          </button>
          <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Loading
          </button>
          <button disabled className="inline-flex h-9 cursor-not-allowed items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground opacity-50">
            Disabled secondary
          </button>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Button } from "@/components/ui/button";

// Variants
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// Disabled
<Button disabled>Cannot click</Button>`}</Code>
      </DocSection>

      <DocSection title="Props">
        <PropsTable rows={[
          { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive"', default: '"default"', description: "Visual style of the button." },
          { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Height and horizontal padding: sm=28px, default=36px, lg=44px." },
          { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction and reduces opacity to 50%." },
          { name: "className", type: "string", description: "Additional Tailwind classes merged via cn()." },
          { name: "...props", type: "ButtonHTMLAttributes", description: "All native button props are forwarded." },
        ]} />
      </DocSection>
    </DocPage>
  );
}
