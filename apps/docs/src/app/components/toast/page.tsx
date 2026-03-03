import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Toast" };

function ToastDemo({ variant, title, description }: { variant: string; title: string; description: string }) {
  const styles: Record<string, string> = {
    default:     "border-border bg-background text-foreground",
    info:        "border-primary/20 bg-background text-foreground [&_.icon]:text-primary",
    success:     "border-success/20 bg-background text-foreground [&_.icon]:text-success",
    warning:     "border-warning/20 bg-background text-foreground [&_.icon]:text-warning",
    destructive: "border-destructive/20 bg-background text-foreground [&_.icon]:text-destructive",
  };

  const icons: Record<string, React.ReactNode> = {
    default: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    info: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    success: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    warning: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    destructive: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  };

  return (
    <div className={`flex w-80 items-start gap-3 rounded-lg border px-4 py-3 shadow-floating ${styles[variant]}`}>
      <div className="icon mt-0.5 flex-shrink-0">{icons[variant]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <button className="flex-shrink-0 text-muted-foreground hover:text-foreground">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  );
}

export default function ToastPage() {
  return (
    <DocPage>
      <PageHeader
        title="Toast"
        description="Imperative notification system. Stacks up to 5 toasts, auto-dismisses after 4 seconds. Pauses on hover and focus."
      />

      <DocSection title="Variants">
        <Preview className="flex-col items-start gap-3">
          <ToastDemo variant="default"     title="Profile saved"            description="Your changes have been applied." />
          <ToastDemo variant="info"        title="Deploy started"           description="Estimated time: ~2 minutes." />
          <ToastDemo variant="success"     title="Changes saved"            description="Your profile has been updated." />
          <ToastDemo variant="warning"     title="Rate limit approaching"   description="You have 10 API calls remaining." />
          <ToastDemo variant="destructive" title="Build failed"             description="webpack: Module not found." />
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { toast } from "@/components/ui/toast";

// In your root layout — mount once
import { Toaster } from "@/components/ui/toast";
<Toaster />

// Imperative API — call from anywhere
toast("Profile saved", { description: "Changes applied." });
toast.info("Deploy started", { description: "ETA ~2 minutes." });
toast.success("Saved", { description: "Profile updated." });
toast.warning("Rate limit", { description: "10 calls remaining." });
toast.error("Build failed", { description: "Module not found." });

// Persistent (no auto-dismiss)
toast("Action required", {
  description: "Review pending changes.",
  duration: 0,
});`}</Code>
      </DocSection>

      <DocSection title="API">
        <PropsTable rows={[
          { name: "toast(title, options?)", type: "function", description: "Shows a default toast. Returns void." },
          { name: "toast.info(title, options?)", type: "function", description: "Blue info variant with Info icon." },
          { name: "toast.success(title, options?)", type: "function", description: "Green success variant with CheckCircle icon." },
          { name: "toast.warning(title, options?)", type: "function", description: "Amber warning variant with AlertTriangle icon." },
          { name: "toast.error(title, options?)", type: "function", description: "Red destructive variant with XCircle icon." },
          { name: "options.description", type: "string", description: "Secondary text below the title." },
          { name: "options.duration", type: "number", default: "4000", description: "Auto-dismiss delay in ms. Set to 0 for persistent." },
        ]} />
      </DocSection>

      <DocSection title="Behaviour notes">
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li>• Mounted once via <code className="rounded bg-muted px-1 font-mono text-xs">&lt;Toaster /&gt;</code> in the root layout — not per-page.</li>
          <li>• Max 5 toasts visible at once; older ones are pushed out.</li>
          <li>• Auto-dismiss timer pauses when the toast region is hovered or focused (keyboard accessibility).</li>
          <li>• Module-level pub/sub — no React context required. Safe to call from server actions via useTransition callbacks.</li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
