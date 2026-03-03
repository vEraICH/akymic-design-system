import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Card" };

export default function CardPage() {
  return (
    <DocPage>
      <PageHeader
        title="Card"
        description="Elevated container grouping related content. Composed of header, content, and footer sub-components. Uses shadow-resting token for depth."
      />

      <DocSection title="Standard card">
        <Preview>
          <div className="w-72 rounded-lg border border-border bg-card text-card-foreground shadow-resting">
            <div className="flex flex-col gap-1.5 p-5 pb-0">
              <h3 className="text-base font-semibold leading-tight">Project Alpha</h3>
              <p className="text-sm text-muted-foreground">Next.js app connected to the Akymic DS token contract.</p>
            </div>
            <div className="p-5 pt-3">
              <p className="text-sm text-muted-foreground">Last deployed 2 hours ago. All systems nominal.</p>
            </div>
            <div className="flex items-center gap-2 p-5 pt-0">
              <button className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90">Open</button>
              <button className="inline-flex h-8 items-center rounded-md px-3 text-xs font-medium text-foreground hover:bg-accent">Settings</button>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Stat card">
        <Preview>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Projects", value: "12", delta: "+2 this week" },
              { label: "Open Tasks", value: "48", delta: "6 due today" },
            ].map(({ label, value, delta }) => (
              <div key={label} className="rounded-lg border border-border bg-card p-4 shadow-resting">
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="mt-1.5 text-2xl font-bold tracking-tight text-card-foreground">{value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{delta}</p>
              </div>
            ))}
          </div>
        </Preview>
      </DocSection>

      <DocSection title="List card (flush)">
        <Preview>
          <div className="w-72 overflow-hidden rounded-lg border border-border bg-card shadow-resting">
            {["Navigation Shell", "Button Component", "Input Component"].map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-border px-4 py-3 last:border-0">
                <span className="text-sm text-card-foreground">{item}</span>
                <span className="inline-flex items-center rounded-md bg-success px-2 py-0.5 text-xs font-medium text-success-foreground">stable</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-card-foreground">Calendar Phase 2</span>
              <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">planned</span>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Project Alpha</CardTitle>
    <CardDescription>Next.js app with Akymic DS.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Last deployed 2 hours ago.
    </p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button size="sm">Open</Button>
    <Button size="sm" variant="ghost">Settings</Button>
  </CardFooter>
</Card>

// Interactive card (hover shadow)
<Card className="cursor-pointer transition-shadow hover:shadow-md" role="button" tabIndex={0}>
  ...
</Card>`}</Code>
      </DocSection>

      <DocSection title="Props">
        <PropsTable rows={[
          { name: "Card", type: "HTMLDivAttributes", description: "Root container. Applies border, bg-card, rounded-lg, shadow-resting." },
          { name: "CardHeader", type: "HTMLDivAttributes", description: "Top section with flex-col layout and padding." },
          { name: "CardTitle", type: "HTMLHeadingAttributes", description: "Renders as h3. font-semibold text-card-foreground." },
          { name: "CardDescription", type: "HTMLParagraphAttributes", description: "Muted subheading below the title." },
          { name: "CardContent", type: "HTMLDivAttributes", description: "Main content area. Adds px-5 pb-5 padding." },
          { name: "CardFooter", type: "HTMLDivAttributes", description: "Bottom action row. flex items-center px-5 pb-5." },
          { name: "className", type: "string", description: "Merged via cn() on all sub-components." },
        ]} />
      </DocSection>
    </DocPage>
  );
}
