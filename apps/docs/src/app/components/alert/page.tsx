import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Alert" };

function AlertDemo({
  variant,
  title,
  children,
}: {
  variant: "default" | "info" | "success" | "warning" | "destructive";
  title: string;
  children: string;
}) {
  const styles = {
    default:     "border-border bg-muted/40 text-foreground [&_svg]:text-foreground",
    info:        "border-primary/20 bg-primary/8 text-primary",
    success:     "border-success/20 bg-success/10 text-success",
    warning:     "border-warning/20 bg-warning/10 text-warning",
    destructive: "border-destructive/20 bg-destructive/10 text-destructive",
  }[variant];

  const icons: Record<string, React.ReactNode> = {
    default: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    info: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
    success: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    warning: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    destructive: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
  };

  return (
    <div className={`flex gap-3 rounded-lg border p-4 ${styles}`}>
      <div className="mt-0.5 flex-shrink-0">{icons[variant]}</div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-sm opacity-90">{children}</p>
      </div>
    </div>
  );
}

export default function AlertPage() {
  return (
    <DocPage>
      <PageHeader
        title="Alert"
        description="Inline contextual messages for system feedback. Five semantic variants. No JavaScript dependency — purely declarative."
      />

      <DocSection title="Variants">
        <Preview className="flex-col items-stretch gap-3">
          <AlertDemo variant="default" title="Heads up">
            You can now export your data directly from the dashboard settings.
          </AlertDemo>
          <AlertDemo variant="info" title="New release available">
            Version 2.4 is ready to install. Review the changelog before updating.
          </AlertDemo>
          <AlertDemo variant="success" title="Deploy complete">
            Your application was deployed successfully to production.
          </AlertDemo>
          <AlertDemo variant="warning" title="Storage at 85%">
            You&apos;re approaching your storage limit. Consider removing unused assets.
          </AlertDemo>
          <AlertDemo variant="destructive" title="Payment failed">
            We couldn&apos;t process your payment. Please update your billing details.
          </AlertDemo>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Alert } from "@/components/ui/alert";

<Alert variant="default" title="Heads up">
  Your changes have been saved.
</Alert>

<Alert variant="info" title="New release">
  Version 2.4 is available.
</Alert>

<Alert variant="success" title="Deploy complete">
  Application is live on production.
</Alert>

<Alert variant="warning" title="Storage at 85%">
  Consider removing unused assets.
</Alert>

<Alert variant="destructive" title="Payment failed">
  Update your billing details to continue.
</Alert>

// Dismissible
<Alert
  variant="info"
  title="Tip"
  onDismiss={() => setVisible(false)}
>
  You can drag components to reorder them.
</Alert>`}</Code>
      </DocSection>

      <DocSection title="Props">
        <PropsTable rows={[
          { name: "variant", type: '"default" | "info" | "success" | "warning" | "destructive"', default: '"default"', description: "Semantic intent. Drives border color, background tint, and icon." },
          { name: "title", type: "string", description: "Bold heading text rendered inside the alert." },
          { name: "onDismiss", type: "() => void", description: "When provided, renders an ✕ button that calls this handler." },
          { name: "children", type: "ReactNode", description: "Body content below the title." },
          { name: "className", type: "string", description: "Additional classes merged via cn()." },
        ]} />
      </DocSection>

      <DocSection title="Token mapping">
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Variant</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Border</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Background</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Text + icon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {[
                ["default",     "border",      "muted/40",      "foreground"],
                ["info",        "primary/20",  "primary/8",     "primary"],
                ["success",     "success/20",  "success/10",    "success"],
                ["warning",     "warning/20",  "warning/10",    "warning"],
                ["destructive", "destructive/20", "destructive/10", "destructive"],
              ].map(([v, border, bg, text]) => (
                <tr key={v}>
                  <td className="px-4 py-2.5"><code className="font-mono text-xs">{v}</code></td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{border}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{bg}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>
    </DocPage>
  );
}
