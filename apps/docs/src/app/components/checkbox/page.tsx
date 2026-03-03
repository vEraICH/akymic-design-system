import { DocPage, PageHeader, DocSection, Preview, PropsTable, Code } from "@/components/doc-ui";

export const metadata = { title: "Checkbox, Radio & Switch" };

export default function CheckboxPage() {
  return (
    <DocPage>
      <PageHeader
        title="Checkbox, Radio & Switch"
        description="Selection controls for boolean toggles (Checkbox, Switch) and mutually exclusive choices (RadioGroup). All keyboard accessible, ARIA-compliant, zero dependencies."
      />

      {/* ── Checkbox ──────────────────────────────────────────────────────── */}
      <DocSection title="Checkbox — states">
        <Preview className="gap-6 flex-wrap">
          {/* unchecked */}
          <div className="flex flex-col items-center gap-2">
            <button
              role="checkbox"
              aria-checked="false"
              className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-input bg-background"
            />
            <span className="text-[10px] text-muted-foreground">unchecked</span>
          </div>
          {/* checked */}
          <div className="flex flex-col items-center gap-2">
            <button
              role="checkbox"
              aria-checked="true"
              className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-primary bg-primary text-primary-foreground"
            >
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2 6 5 9 10 3" />
              </svg>
            </button>
            <span className="text-[10px] text-muted-foreground">checked</span>
          </div>
          {/* indeterminate */}
          <div className="flex flex-col items-center gap-2">
            <button
              role="checkbox"
              aria-checked="mixed"
              className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-primary bg-primary text-primary-foreground"
            >
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <line x1="2" y1="6" x2="10" y2="6" />
              </svg>
            </button>
            <span className="text-[10px] text-muted-foreground">indeterminate</span>
          </div>
          {/* disabled */}
          <div className="flex flex-col items-center gap-2">
            <button
              role="checkbox"
              aria-checked="false"
              disabled
              className="inline-flex h-4 w-4 cursor-not-allowed items-center justify-center rounded-sm border border-input bg-background opacity-50"
            />
            <span className="text-[10px] text-muted-foreground">disabled</span>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Checkbox — with label (CheckboxField)">
        <Preview className="flex-col items-start gap-3">
          {[
            { label: "Send me product updates", desc: "We'll email you about new features.", checked: false },
            { label: "Accept terms and conditions", desc: undefined, checked: true },
            { label: "Disabled option", desc: undefined, checked: false, disabled: true },
          ].map(({ label, desc, checked, disabled }) => (
            <label
              key={label}
              className={`flex cursor-pointer items-start gap-2.5 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <button
                role="checkbox"
                aria-checked={checked}
                disabled={disabled}
                className={`mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border transition-colors
                  ${checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background"}`}
              >
                {checked && (
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                )}
              </button>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground leading-none">{label}</span>
                {desc && <span className="text-xs text-muted-foreground">{desc}</span>}
              </div>
            </label>
          ))}
        </Preview>
      </DocSection>

      {/* ── Radio ─────────────────────────────────────────────────────────── */}
      <DocSection title="Radio — RadioGroup">
        <Preview className="gap-10 flex-wrap">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Notification frequency</span>
            {[
              { value: "realtime", label: "Real-time",     desc: "Notify me immediately",    checked: false },
              { value: "daily",    label: "Daily digest",  desc: "Once per day summary",     checked: false },
              { value: "weekly",   label: "Weekly digest", desc: "Once per week summary",    checked: true  },
            ].map(({ label, desc, checked }) => (
              <label key={label} className="flex cursor-pointer items-start gap-2.5">
                <button
                  role="radio"
                  aria-checked={checked}
                  className={`mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-colors
                    ${checked ? "border-primary bg-primary" : "border-input bg-background"}`}
                >
                  {checked && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
                </button>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground leading-none">{label}</span>
                  <span className="text-xs text-muted-foreground">{desc}</span>
                </div>
              </label>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Disabled group</span>
            {["Option A", "Option B"].map((label, i) => (
              <label key={label} className="flex cursor-not-allowed items-start gap-2.5 opacity-50">
                <button role="radio" aria-checked={i === 0} disabled className={`mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${i === 0 ? "border-primary bg-primary" : "border-input bg-background"}`}>
                  {i === 0 && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
                </button>
                <span className="text-sm font-medium text-foreground leading-none">{label}</span>
              </label>
            ))}
          </div>
        </Preview>
      </DocSection>

      {/* ── Switch ────────────────────────────────────────────────────────── */}
      <DocSection title="Switch — states">
        <Preview className="gap-8 flex-wrap">
          {[
            { label: "off", on: false, disabled: false },
            { label: "on",  on: true,  disabled: false },
            { label: "disabled off", on: false, disabled: true },
            { label: "disabled on",  on: true,  disabled: true },
          ].map(({ label, on, disabled }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <button
                role="switch"
                aria-checked={on}
                disabled={disabled}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full border-2 border-transparent transition-colors
                  ${on ? "bg-primary" : "bg-input"}
                  ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${on ? "translate-x-4" : "translate-x-0"}`} />
              </button>
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </Preview>
      </DocSection>

      <DocSection title="Switch — SwitchField">
        <Preview className="flex-col items-stretch gap-4 max-w-xs">
          {[
            { label: "Email notifications", desc: "Receive emails about account activity.", on: false },
            { label: "Marketing emails",    desc: undefined,                                on: true },
            { label: "Analytics tracking",  desc: "Share usage data to improve the product.", on: false, disabled: true },
          ].map(({ label, desc, on, disabled }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <label className={`flex flex-col gap-0.5 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                <span className="text-sm font-medium text-foreground leading-none">{label}</span>
                {desc && <span className="text-xs text-muted-foreground">{desc}</span>}
              </label>
              <button
                role="switch"
                aria-checked={on}
                disabled={disabled}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full border-2 border-transparent transition-colors
                  ${on ? "bg-primary" : "bg-input"}
                  ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${on ? "translate-x-4" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <Code>{`import { Checkbox, CheckboxField } from "@/components/ui/checkbox";
import { RadioGroup, Radio }          from "@/components/ui/radio";
import { Switch, SwitchField }        from "@/components/ui/switch";

// Checkbox — controlled
const [agreed, setAgreed] = useState(false);
<Checkbox checked={agreed} onChange={setAgreed} aria-label="Accept terms" />

// CheckboxField — with label and description
<CheckboxField
  label="Send me product updates"
  description="We'll email you about new features."
  checked={agreed}
  onChange={setAgreed}
/>

// Indeterminate (e.g. select-all)
<Checkbox indeterminate aria-label="Select all" />

// RadioGroup — arrow keys cycle options
const [plan, setPlan] = useState("weekly");
<RadioGroup value={plan} onChange={setPlan} aria-label="Billing period">
  <Radio value="monthly" label="Monthly" description="Billed every month" />
  <Radio value="yearly"  label="Yearly"  description="Save 20% annually"  />
</RadioGroup>

// Switch — controlled
const [enabled, setEnabled] = useState(false);
<Switch checked={enabled} onChange={setEnabled} aria-label="Enable notifications" />

// SwitchField — with label and description
<SwitchField
  label="Email notifications"
  description="Receive emails about account activity."
  checked={enabled}
  onChange={setEnabled}
/>`}</Code>
      </DocSection>

      <DocSection title="Checkbox Props">
        <PropsTable rows={[
          { name: "checked",         type: "boolean",                    description: "Controlled checked state." },
          { name: "defaultChecked",  type: "boolean",    default: "false", description: "Initial state when uncontrolled." },
          { name: "onChange",        type: "(checked: boolean) => void", description: "Called with the new value on toggle." },
          { name: "indeterminate",   type: "boolean",    default: "false", description: "Shows a dash instead of a check. Used for select-all patterns." },
          { name: "disabled",        type: "boolean",    default: "false", description: "Prevents interaction, applies muted styles." },
        ]} />
      </DocSection>

      <DocSection title="Radio / RadioGroup Props">
        <PropsTable rows={[
          { name: "value (group)",   type: "string",                    description: "Controlled selected value for the group." },
          { name: "onChange (group)",type: "(value: string) => void",   description: "Called when a radio in the group is selected." },
          { name: "disabled (group)",type: "boolean",    default: "false", description: "Disables all radios in the group." },
          { name: "value (radio)",   type: "string",                    description: "The value this radio represents. Required." },
          { name: "label",           type: "string",                    description: "Visible label text. Required." },
          { name: "description",     type: "string",                    description: "Optional help text below the label." },
          { name: "disabled (radio)",type: "boolean",    default: "false", description: "Disables this radio independently." },
        ]} />
      </DocSection>

      <DocSection title="Switch Props">
        <PropsTable rows={[
          { name: "checked",         type: "boolean",                    description: "Controlled on/off state." },
          { name: "defaultChecked",  type: "boolean",    default: "false", description: "Initial state when uncontrolled." },
          { name: "onChange",        type: "(checked: boolean) => void", description: "Called with the new value on toggle." },
          { name: "disabled",        type: "boolean",    default: "false", description: "Prevents interaction, applies muted styles." },
        ]} />
      </DocSection>

      <DocSection title="Keyboard behaviour">
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li>• <strong className="text-foreground">Checkbox</strong> — <code className="rounded bg-muted px-1 font-mono text-xs">Space</code> toggles.</li>
          <li>• <strong className="text-foreground">RadioGroup</strong> — <code className="rounded bg-muted px-1 font-mono text-xs">ArrowDown / ArrowRight</code> selects next; <code className="rounded bg-muted px-1 font-mono text-xs">ArrowUp / ArrowLeft</code> selects previous. Wraps at boundaries. Disabled options are skipped.</li>
          <li>• <strong className="text-foreground">Switch</strong> — <code className="rounded bg-muted px-1 font-mono text-xs">Space</code> or <code className="rounded bg-muted px-1 font-mono text-xs">Enter</code> toggles. Uses <code className="rounded bg-muted px-1 font-mono text-xs">role="switch"</code> with <code className="rounded bg-muted px-1 font-mono text-xs">aria-checked</code>.</li>
          <li>• All three have visible <code className="rounded bg-muted px-1 font-mono text-xs">focus-visible</code> rings using the <code className="rounded bg-muted px-1 font-mono text-xs">--ring</code> token.</li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
