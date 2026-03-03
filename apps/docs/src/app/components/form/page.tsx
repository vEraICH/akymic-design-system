import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Form Controls" };

export default function FormPage() {
  return (
    <DocPage>
      <PageHeader
        title="Form Controls"
        description="Popover-based form primitives: Select, Combobox, MultiSelect, DatePicker, and FileUpload. All keyboard accessible, zero external dependencies."
      />

      <DocSection title="Select">
        <Preview className="flex-col items-start gap-6">
          {/* Closed trigger */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Closed</span>
            <button className="flex h-9 w-52 items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-sm">
              <span className="text-muted-foreground">Choose a role…</span>
              <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
          {/* Open with options */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Open</span>
            <div className="relative">
              <button className="flex h-9 w-52 items-center justify-between gap-2 rounded-md border border-primary bg-background px-3 text-sm ring-1 ring-primary">
                <span className="text-muted-foreground">Choose a role…</span>
                <svg className="h-4 w-4 rotate-180 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-52 rounded-md border border-border bg-popover shadow-floating z-10">
                <ul className="py-1">
                  {[
                    { label: "Designer", selected: false, active: true },
                    { label: "Engineer", selected: true,  active: false },
                    { label: "Product Manager", selected: false, active: false },
                  ].map(({ label, selected, active }) => (
                    <li key={label} className={`flex cursor-pointer items-center justify-between px-3 py-1.5 text-sm ${active ? "bg-accent text-accent-foreground" : "text-popover-foreground"}`}>
                      <span>{label}</span>
                      {selected && <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Error */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Error state</span>
            <button className="flex h-9 w-52 items-center justify-between gap-2 rounded-md border border-destructive bg-background px-3 text-sm">
              <span className="text-muted-foreground">Required field</span>
              <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Combobox (searchable)">
        <Preview className="flex-col items-start gap-2">
          <div className="relative">
            <button className="flex h-9 w-64 items-center justify-between gap-2 rounded-md border border-primary bg-background px-3 text-sm ring-1 ring-primary">
              <span className="text-muted-foreground">Search country…</span>
              <svg className="h-4 w-4 rotate-180 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="absolute left-0 top-full mt-1 w-64 rounded-md border border-border bg-popover shadow-floating z-10">
              <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <span className="text-sm text-muted-foreground">Type to filter…</span>
              </div>
              <ul className="py-1">
                {["United States", "United Kingdom", "Canada"].map((c, i) => (
                  <li key={c} className={`flex cursor-pointer items-center justify-between px-3 py-1.5 text-sm ${i === 0 ? "bg-accent text-accent-foreground" : "text-popover-foreground"}`}>
                    <span>{c}</span>
                    {i === 1 && <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="MultiSelect">
        <Preview className="flex-col items-start gap-2">
          <button className="flex min-h-9 w-72 items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm">
            <div className="flex flex-1 flex-wrap gap-1">
              {["React", "TypeScript", "Tailwind CSS"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-0.5 rounded-sm bg-secondary px-1.5 py-0.5 text-[12px] font-medium text-secondary-foreground">
                  {tag}
                  <svg className="ml-0.5 h-3 w-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </span>
              ))}
            </div>
            <svg className="h-4 w-4 flex-shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </Preview>
      </DocSection>

      <DocSection title="DatePicker">
        <Preview className="flex-col items-start gap-3">
          <button className="flex h-9 w-52 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm">
            <svg className="h-4 w-4 flex-shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span className="text-muted-foreground">Pick a date…</span>
          </button>
          <button className="flex h-9 w-52 items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-sm">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 flex-shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span className="text-foreground">Mar 15, 2026</span>
            </div>
            <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </Preview>
      </DocSection>

      <DocSection title="FileUpload">
        <Preview>
          <div className="flex w-80 flex-col gap-2">
            <div className="flex flex-col items-center gap-2 rounded-md border-2 border-dashed border-border px-4 py-6 text-center hover:border-primary/60">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
              </div>
              <p className="text-sm font-medium text-foreground">Drop files here or click to browse</p>
              <p className="text-[11.5px] text-muted-foreground">Accepts .pdf, .png, .jpg · Max 5 MB · Up to 3 files</p>
            </div>
            <div className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2">
              <svg className="h-4 w-4 flex-shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-foreground">design-spec.pdf</p>
                <p className="text-[11px] text-muted-foreground">2.4 MB</p>
              </div>
              <button className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-accent">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Select }      from "@/components/ui/select";
import { Combobox }    from "@/components/ui/combobox";
import { MultiSelect } from "@/components/ui/multi-select";
import { DatePicker }  from "@/components/ui/date-picker";
import { FileUpload }  from "@/components/ui/file-upload";

// Select
const [role, setRole] = useState<string>();
<Select
  value={role}
  onChange={setRole}
  placeholder="Choose a role…"
  options={[
    { value: "designer",  label: "Designer" },
    { value: "engineer",  label: "Engineer" },
  ]}
/>

// Combobox (searchable)
<Combobox
  value={country}
  onChange={setCountry}
  placeholder="Search country…"
  options={countries}
/>

// MultiSelect
<MultiSelect
  value={skills}
  onChange={setSkills}
  placeholder="Select skills…"
  options={skillOptions}
  maxDisplay={3}
/>

// DatePicker
<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Pick a date…"
  clearable
/>

// FileUpload
<FileUpload
  value={files}
  onChange={setFiles}
  accept=".pdf,.png"
  maxSize={5 * 1024 * 1024}
  maxFiles={3}
/>`}</Code>
      </DocSection>

      <DocSection title="Common Props">
        <PropsTable rows={[
          { name: "value", type: "string | string[] | Date | File[]", description: "Controlled value. Type depends on component." },
          { name: "onChange", type: "function", description: "Called with the new value whenever selection changes." },
          { name: "placeholder", type: "string", description: "Text shown when no value is selected." },
          { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction, applies muted styles." },
          { name: "error", type: "boolean", default: "false", description: "Applies destructive border. Not on FileUpload." },
          { name: "options", type: "SelectOption[]", description: "Select / Combobox / MultiSelect only. Each item: { value, label, disabled? }." },
          { name: "maxDisplay", type: "number", default: "3", description: "MultiSelect only. Max tags shown before +N overflow chip." },
          { name: "clearable", type: "boolean", default: "true", description: "DatePicker only. Shows ✕ button when a date is selected." },
          { name: "accept", type: "string", description: "FileUpload only. MIME types or file extensions, e.g. '.pdf,.png'." },
          { name: "maxSize", type: "number", description: "FileUpload only. Max bytes per file. Oversized files are skipped with an error message." },
          { name: "maxFiles", type: "number", description: "FileUpload only. Drops zone disables after this many files are selected." },
        ]} />
      </DocSection>
    </DocPage>
  );
}
