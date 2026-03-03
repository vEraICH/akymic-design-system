import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Dialog & Drawer" };

function DialogMockup({ title, description, footer }: { title: string; description: string; footer?: "confirm" | "destructive" }) {
  return (
    <div className="w-[360px] rounded-lg border border-border bg-background shadow-floating">
      <div className="px-5 pt-5 pb-4">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {footer && (
        <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
          <button className="inline-flex h-8 items-center rounded-md px-3 text-sm font-medium text-foreground hover:bg-accent">Cancel</button>
          <button className={`inline-flex h-8 items-center rounded-md px-3 text-sm font-medium ${footer === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"} hover:opacity-90`}>
            {footer === "destructive" ? "Delete project" : "Save changes"}
          </button>
        </div>
      )}
    </div>
  );
}

function DrawerMockup({ side }: { side: "right" | "bottom" }) {
  if (side === "right") {
    return (
      <div className="flex w-[480px] rounded-lg border border-border overflow-hidden" style={{ height: 200 }}>
        <div className="flex-1 bg-background/50" />
        <div className="w-64 border-l border-border bg-background shadow-floating flex flex-col">
          <div className="px-5 pt-4 pb-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">Project details</p>
            <p className="text-xs text-muted-foreground">Alpha — Last updated 2h ago</p>
          </div>
          <div className="flex-1 px-5 py-3">
            <div className="flex flex-col gap-2">
              {[["Status", "Active"], ["Owner", "Alex Chen"]].map(([l, v]) => (
                <div key={l}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{l}</p>
                  <p className="text-sm text-foreground">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-[480px] flex-col rounded-lg border border-border overflow-hidden" style={{ height: 180 }}>
      <div className="flex-1 bg-background/50" />
      <div className="border-t border-border bg-background shadow-floating">
        <div className="px-5 py-3 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Share with team</p>
          <p className="text-xs text-muted-foreground">Choose how to share this item.</p>
        </div>
        <div className="flex gap-2 px-5 py-3">
          {["Copy link", "Send via email", "Export PDF"].map((a) => (
            <button key={a} className="rounded-md border border-border px-3 py-1.5 text-xs text-foreground hover:bg-accent">{a}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DialogPage() {
  return (
    <DocPage>
      <PageHeader
        title="Dialog & Drawer"
        description="Focus-trapped overlays for confirmations, forms, and detail panels. Both use createPortal, lock body scroll, and restore focus on close."
      />

      <DocSection title="Dialog — variants">
        <Preview className="flex-col items-start gap-4">
          <DialogMockup
            title="Confirm changes"
            description="This will update your profile settings. The change takes effect immediately."
            footer="confirm"
          />
          <DialogMockup
            title="Delete project?"
            description="This action cannot be undone. All data associated with this project will be permanently removed."
            footer="destructive"
          />
        </Preview>
      </DocSection>

      <DocSection title="Drawer — right panel & bottom sheet">
        <Preview className="flex-col items-start gap-4">
          <DrawerMockup side="right" />
          <DrawerMockup side="bottom" />
        </Preview>
      </DocSection>

      <DocSection title="Dialog usage">
        <Code>{`import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogBody, DialogFooter, DialogClose,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger>
    <Button variant="outline">Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm changes</DialogTitle>
      <DialogDescription>
        This will update your profile settings.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose><Button variant="ghost">Cancel</Button></DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</Code>
      </DocSection>

      <DocSection title="Drawer usage">
        <Code>{`import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerTitle, DrawerBody,
  DrawerFooter, DrawerClose,
} from "@/components/ui/drawer";

<Drawer>
  <DrawerTrigger>
    <Button variant="outline">Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Project details</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      {/* content */}
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose><Button variant="ghost">Close</Button></DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}</Code>
      </DocSection>

      <DocSection title="Drawer Props">
        <PropsTable rows={[
          { name: "side", type: '"right" | "left" | "bottom" | "top"', default: '"right"', description: "Which edge the drawer slides in from." },
        ]} />
      </DocSection>

      <DocSection title="Behaviour">
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li>• <strong className="text-foreground">Focus trap</strong> — Tab / Shift+Tab cycles only inside the overlay. Implemented via <code className="rounded bg-muted px-1 font-mono text-xs">use-focus-trap.ts</code>.</li>
          <li>• <strong className="text-foreground">Body scroll lock</strong> — scrollbar width compensated to prevent layout shift.</li>
          <li>• <strong className="text-foreground">Escape to close</strong> — keydown listener attached while overlay is open.</li>
          <li>• <strong className="text-foreground">Return focus</strong> — trigger element receives focus when overlay closes.</li>
          <li>• <strong className="text-foreground">Shadow</strong> — uses <code className="rounded bg-muted px-1 font-mono text-xs">shadow-floating</code> token (theme-aware).</li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
