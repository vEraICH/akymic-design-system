import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Input" };

export default function InputPage() {
  return (
    <DocPage>
      <PageHeader
        title="Input"
        description="Text input field for forms. Matches the 36px baseline height used across all form controls. Includes Textarea for multi-line text."
      />

      <DocSection title="States">
        <Preview className="flex-col items-start gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Default</label>
            <input
              readOnly
              placeholder="Placeholder text"
              className="flex h-9 w-72 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Filled</label>
            <input
              readOnly
              defaultValue="john@example.com"
              className="flex h-9 w-72 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Error</label>
            <input
              readOnly
              defaultValue="invalid-email"
              aria-invalid="true"
              className="flex h-9 w-72 rounded-md border border-destructive bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30 focus-visible:ring-offset-2"
            />
            <span className="text-xs text-destructive">Enter a valid email address</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Disabled</label>
            <input
              readOnly
              disabled
              defaultValue="readonly@example.com"
              className="flex h-9 w-72 cursor-not-allowed rounded-md border border-input bg-muted px-3 text-sm text-foreground opacity-50 focus-visible:outline-none"
            />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Form group pattern">
        <Preview className="flex-col items-start">
          <div className="flex w-72 flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Email address</label>
                <span className="text-xs text-muted-foreground">Required</span>
              </div>
              <input
                readOnly
                defaultValue="john@example.com"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <span className="text-xs text-muted-foreground">We&apos;ll never share your email.</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                readOnly
                type="password"
                defaultValue="123"
                aria-invalid="true"
                className="flex h-9 w-full rounded-md border border-destructive bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30"
              />
              <span className="text-xs text-destructive">Must be at least 8 characters.</span>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Textarea">
        <Preview className="flex-col items-start gap-3">
          <textarea
            readOnly
            rows={3}
            placeholder="Write a description…"
            className="w-72 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
          />
          <textarea
            readOnly
            rows={3}
            aria-invalid="true"
            defaultValue="too short"
            className="w-72 rounded-md border border-destructive bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30 resize-none"
          />
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Basic
<Input placeholder="Enter value" />

// Error state
<Input error value={email} onChange={...} />
<span className="text-xs text-destructive">Invalid email</span>

// Disabled
<Input disabled value="readonly" />

// Textarea
<Textarea rows={4} placeholder="Describe your request…" />
<Textarea error rows={3} defaultValue="too short" />`}</Code>
      </DocSection>

      <DocSection title="Input Props">
        <PropsTable rows={[
          { name: "error", type: "boolean", default: "false", description: "Applies destructive border and ring. Also sets aria-invalid automatically." },
          { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction, applies muted background and reduced opacity." },
          { name: "placeholder", type: "string", description: "Placeholder text styled with muted-foreground color." },
          { name: "className", type: "string", description: "Additional classes merged via cn()." },
          { name: "...props", type: "InputHTMLAttributes", description: "All native input props forwarded via forwardRef." },
        ]} />
      </DocSection>
    </DocPage>
  );
}
