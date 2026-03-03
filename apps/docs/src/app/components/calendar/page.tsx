import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Calendar" };

export default function CalendarPage() {
  return (
    <DocPage>
      <PageHeader
        title="Calendar"
        description="Month-view calendar with event chips, mini month sidebar, and a mini month for date pickers. Zero external dependencies — pure Date + Intl.DateTimeFormat."
      />

      <DocSection title="Anatomy">
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-primary/40 bg-primary/5">
                <span className="text-xs font-bold text-primary">T</span>
              </div>
              <span className="text-[11px] text-center text-muted-foreground">Toolbar</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-border bg-muted/30">
                <span className="text-xs font-medium text-muted-foreground">M</span>
              </div>
              <span className="text-[11px] text-center text-muted-foreground">Mini month</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-border bg-background">
                <span className="text-xs text-muted-foreground">31</span>
              </div>
              <span className="text-[11px] text-center text-muted-foreground">Day cell</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex h-10 w-24 items-center rounded-md border-2 border-primary/30 bg-primary/10 px-2">
                <span className="text-[10px] font-medium text-primary truncate">DS Weekly sync</span>
              </div>
              <span className="text-[11px] text-center text-muted-foreground">Event chip</span>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection title="Event colors">
        <Preview className="flex-col items-start gap-2">
          {[
            { color: "primary",     label: "primary",     cls: "bg-primary/15 text-primary" },
            { color: "secondary",   label: "secondary",   cls: "bg-secondary text-secondary-foreground" },
            { color: "accent",      label: "accent",      cls: "bg-accent text-accent-foreground" },
            { color: "muted",       label: "muted",       cls: "bg-muted text-muted-foreground" },
            { color: "destructive", label: "destructive", cls: "bg-destructive/15 text-destructive" },
          ].map(({ label, cls }) => (
            <span key={label} className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${cls}`}>
              DS weekly sync — {label}
            </span>
          ))}
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Calendar, CalendarMiniMonth } from "@/components/ui/calendar";
import type { CalendarEvent } from "@/components/ui/calendar";

// Full month view with events
const events: CalendarEvent[] = [
  { id: "1", title: "DS Weekly sync", date: "2026-03-03", color: "primary" },
  { id: "2", title: "Token review",   date: "2026-03-03", color: "accent"  },
  { id: "3", title: "Deploy",         date: "2026-03-10", color: "destructive" },
];

<Calendar
  events={events}
  showSidebar
  showViewSwitcher
  onDateClick={(date) => console.log(date)}
  className="h-[600px]"
/>

// Mini month (for sidebars / date pickers)
const [selected, setSelected] = useState<Date | undefined>();

<CalendarMiniMonth
  selected={selected}
  onSelect={setSelected}
/>

// Controlled navigation
<Calendar
  date={currentDate}
  onDateClick={handleSelect}
  showSidebar={false}
  showViewSwitcher={false}
/>`}</Code>
      </DocSection>

      <DocSection title="Calendar Props">
        <PropsTable rows={[
          { name: "events", type: "CalendarEvent[]", default: "[]", description: "Array of events to render as chips inside day cells." },
          { name: "date", type: "Date", description: "Controlled current month. If omitted, component manages its own navigation state." },
          { name: "defaultDate", type: "Date", description: "Initial month when uncontrolled. Defaults to today." },
          { name: "onDateClick", type: "(date: Date) => void", description: "Called when a day cell is clicked." },
          { name: "onEventClick", type: "(event: CalendarEvent) => void", description: "Called when an event chip is clicked." },
          { name: "showSidebar", type: "boolean", default: "false", description: "Shows a mini month sidebar on the left (hidden on mobile)." },
          { name: "showViewSwitcher", type: "boolean", default: "true", description: "Shows Month / Week / Day toggle in the toolbar." },
          { name: "className", type: "string", description: "Applied to the root wrapper. Set height explicitly, e.g. h-[600px]." },
        ]} />
      </DocSection>

      <DocSection title="CalendarEvent type">
        <Code>{`interface CalendarEvent {
  id:      string;
  title:   string;
  date:    string;   // "YYYY-MM-DD"
  color?:  "primary" | "secondary" | "accent" | "muted" | "destructive";
}`}</Code>
      </DocSection>

      <DocSection title="Notes">
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li>• <strong className="text-foreground">Phase 1</strong> — month view only. Week and day views show a placeholder (Phase 2 deferred).</li>
          <li>• <strong className="text-foreground">Keyboard navigation</strong> — arrow keys move between days, Enter/Space selects, Tab/Shift+Tab moves between focusable regions.</li>
          <li>• <strong className="text-foreground">No new tokens</strong> — today uses <code className="font-mono text-xs bg-muted rounded px-1">primary</code>, selected uses <code className="font-mono text-xs bg-muted rounded px-1">accent</code>, outside-month days use <code className="font-mono text-xs bg-muted rounded px-1">muted</code>.</li>
          <li>• <strong className="text-foreground">Date utilities</strong> — <code className="font-mono text-xs bg-muted rounded px-1">calendar-utils.ts</code> exports pure functions: <code className="font-mono text-xs bg-muted rounded px-1">getMonthMatrix</code>, <code className="font-mono text-xs bg-muted rounded px-1">isSameDay</code>, <code className="font-mono text-xs bg-muted rounded px-1">addMonths</code>, <code className="font-mono text-xs bg-muted rounded px-1">formatMonthYear</code>.</li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
