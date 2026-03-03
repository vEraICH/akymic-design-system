import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Tooltip & Dropdown" };

// ─── Static mockup helpers ────────────────────────────────────────────────────

function TooltipMockup({ label, placement }: { label: string; placement: string }) {
  const isVertical = placement === "top" || placement === "bottom";
  return (
    <div className={`flex ${isVertical ? "flex-col" : "flex-row"} items-center gap-1`}>
      {(placement === "bottom" || placement === "right") && (
        <div className="inline-flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground">
          Button
        </div>
      )}
      <div className="rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-floating whitespace-nowrap">
        {label}
      </div>
      {(placement === "top" || placement === "left") && (
        <div className="inline-flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground">
          Button
        </div>
      )}
    </div>
  );
}

export default function TooltipPage() {
  return (
    <DocPage>
      <PageHeader
        title="Tooltip & Dropdown"
        description="Tooltip: hover+focus label with 4 placements. Dropdown: click-opened menu with items, separators, section labels, and keyboard navigation. Both use createPortal for correct stacking."
      />

      {/* ── Tooltip ──────────────────────────────────────────────────────── */}
      <DocSection title="Tooltip — placements">
        <Preview className="gap-10 flex-wrap items-center">
          {[
            { placement: "top",    label: "Tooltip on top" },
            { placement: "bottom", label: "Tooltip below" },
            { placement: "left",   label: "Left side" },
            { placement: "right",  label: "Right side" },
          ].map(({ placement, label }) => (
            <div key={placement} className="flex flex-col items-center gap-2">
              <TooltipMockup label={label} placement={placement} />
              <span className="text-[10px] text-muted-foreground">{placement}</span>
            </div>
          ))}
        </Preview>
      </DocSection>

      <DocSection title="Tooltip — on icon button">
        <Preview>
          <div className="flex items-center gap-3">
            {/* Icon button with tooltip indicator */}
            <div className="relative flex flex-col items-center gap-1">
              <div className="rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background shadow-floating whitespace-nowrap">
                Copy to clipboard
              </div>
              <button className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              </button>
            </div>
          </div>
        </Preview>
      </DocSection>

      {/* ── Dropdown ─────────────────────────────────────────────────────── */}
      <DocSection title="Dropdown — standard menu">
        <Preview className="gap-8 flex-wrap items-start">
          {/* Open dropdown mockup */}
          <div className="relative">
            <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-accent">
              Actions
              <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="absolute left-0 top-full mt-1 min-w-[10rem] rounded-md border border-border bg-popover py-1 shadow-floating z-10">
              {[
                { label: "Duplicate", icon: "copy" },
                { label: "Rename",    icon: "pencil" },
                { label: "Share",     icon: "share" },
              ].map(({ label }) => (
                <button key={label} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none">
                  <span className="h-4 w-4 rounded-sm bg-muted/60 flex-shrink-0" />
                  {label}
                </button>
              ))}
              <div className="my-1 border-t border-border" />
              <button className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10">
                <span className="h-4 w-4 rounded-sm bg-destructive/20 flex-shrink-0" />
                Delete
              </button>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Dropdown — with section labels">
        <Preview>
          <div className="min-w-[12rem] rounded-md border border-border bg-popover py-1 shadow-floating">
            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Account</div>
            {["Settings", "Profile"].map((label) => (
              <button key={label} className="flex w-full px-3 py-1.5 text-sm text-popover-foreground hover:bg-accent">{label}</button>
            ))}
            <div className="my-1 border-t border-border" />
            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Danger zone</div>
            <button className="flex w-full px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10">Sign out</button>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Dropdown — with disabled item">
        <Preview>
          <div className="min-w-[12rem] rounded-md border border-border bg-popover py-1 shadow-floating">
            <button className="flex w-full px-3 py-1.5 text-sm text-popover-foreground hover:bg-accent">New file</button>
            <button className="flex w-full px-3 py-1.5 text-sm text-popover-foreground hover:bg-accent">Open</button>
            <button disabled className="flex w-full cursor-not-allowed px-3 py-1.5 text-sm opacity-50 text-popover-foreground">
              Save as… (disabled)
            </button>
            <div className="my-1 border-t border-border" />
            <button className="flex w-full px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10">Close without saving</button>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Tooltip }                                        from "@/components/ui/tooltip";
import { DropdownMenu, DropdownItem, DropdownSeparator,
         DropdownLabel }                                    from "@/components/ui/dropdown";

// Tooltip — wraps any element; show/hide on hover + focus
<Tooltip content="Copy to clipboard" placement="top">
  <button aria-label="Copy">
    <Copy className="h-4 w-4" />
  </button>
</Tooltip>

// placement: "top" | "bottom" | "left" | "right" (default: "top")
// delay: number ms before showing (default: 150)

// DropdownMenu
<DropdownMenu
  trigger={
    <Button variant="outline">
      Actions <ChevronDown className="h-3.5 w-3.5" />
    </Button>
  }
>
  <DropdownItem icon={<Copy className="h-4 w-4" />} onSelect={handleDuplicate}>
    Duplicate
  </DropdownItem>
  <DropdownItem icon={<Pencil className="h-4 w-4" />} onSelect={handleRename}>
    Rename
  </DropdownItem>
  <DropdownItem disabled>Archived (disabled)</DropdownItem>
  <DropdownSeparator />
  <DropdownLabel>Danger zone</DropdownLabel>
  <DropdownItem variant="destructive" icon={<Trash2 className="h-4 w-4" />} onSelect={handleDelete}>
    Delete
  </DropdownItem>
</DropdownMenu>`}</Code>
      </DocSection>

      <DocSection title="Tooltip Props">
        <PropsTable rows={[
          { name: "content",   type: "string",                                    description: "Text shown in the tooltip. Required." },
          { name: "placement", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Which side of the trigger the tooltip appears on." },
          { name: "delay",     type: "number",                   default: "150",  description: "Milliseconds before the tooltip becomes visible. Prevents flash on quick cursor pass." },
          { name: "children",  type: "ReactElement",                              description: "The element to attach to. Must forward its ref and accept aria-describedby." },
        ]} />
      </DocSection>

      <DocSection title="DropdownItem Props">
        <PropsTable rows={[
          { name: "onSelect",  type: "() => void",                               description: "Called when the item is clicked or activated via keyboard. Menu closes automatically." },
          { name: "variant",   type: '"default" | "destructive"',  default: '"default"', description: "destructive renders the item in text-destructive with a red hover tint." },
          { name: "icon",      type: "ReactNode",                                 description: "Optional icon rendered at 16×16 before the label." },
          { name: "disabled",  type: "boolean",                    default: "false", description: "Prevents selection and skips keyboard focus." },
        ]} />
      </DocSection>

      <DocSection title="Keyboard behaviour">
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li>• <strong className="text-foreground">Tooltip</strong> — appears after <code className="rounded bg-muted px-1 font-mono text-xs">delay</code> ms on <code className="rounded bg-muted px-1 font-mono text-xs">mouseenter</code> or <code className="rounded bg-muted px-1 font-mono text-xs">focus</code>; hides on <code className="rounded bg-muted px-1 font-mono text-xs">mouseleave</code> / <code className="rounded bg-muted px-1 font-mono text-xs">blur</code>. Non-interactive — never receives keyboard focus.</li>
          <li>• <strong className="text-foreground">Dropdown</strong> — trigger opens with <code className="rounded bg-muted px-1 font-mono text-xs">Click</code>; first item auto-focused. <code className="rounded bg-muted px-1 font-mono text-xs">↓ ↑</code> move focus, <code className="rounded bg-muted px-1 font-mono text-xs">Home / End</code> jump to first/last, <code className="rounded bg-muted px-1 font-mono text-xs">Enter / Space</code> activates, <code className="rounded bg-muted px-1 font-mono text-xs">Escape</code> closes and returns focus to trigger, <code className="rounded bg-muted px-1 font-mono text-xs">Tab</code> closes.</li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
