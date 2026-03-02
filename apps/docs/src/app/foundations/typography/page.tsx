export const metadata = { title: "Typography" };

const TYPE_SCALE = [
  { token: "--text-xs",   tailwind: "text-xs",   rem: "0.75rem",  px: "12", role: "Labels, badges, section overlines" },
  { token: "--text-sm",   tailwind: "text-sm",   rem: "0.875rem", px: "14", role: "UI default body, button text, nav items" },
  { token: "--text-base", tailwind: "text-base", rem: "1rem",     px: "16", role: "Comfortable reading body text" },
  { token: "--text-lg",   tailwind: "text-lg",   rem: "1.125rem", px: "18", role: "Card titles, section leads" },
  { token: "--text-xl",   tailwind: "text-xl",   rem: "1.25rem",  px: "20", role: "Page section headings" },
  { token: "--text-2xl",  tailwind: "text-2xl",  rem: "1.5rem",   px: "24", role: "Page headings, dialog titles" },
  { token: "--text-3xl",  tailwind: "text-3xl",  rem: "1.875rem", px: "30", role: "Page hero headings" },
  { token: "--text-4xl",  tailwind: "text-4xl",  rem: "2.25rem",  px: "36", role: "Display / marketing" },
];

const WEIGHTS = [
  { token: "--font-normal",   tailwind: "font-normal",   value: "400", label: "Normal",   sample: "The quick brown fox" },
  { token: "--font-medium",   tailwind: "font-medium",   value: "500", label: "Medium",   sample: "The quick brown fox" },
  { token: "--font-semibold", tailwind: "font-semibold", value: "600", label: "Semibold", sample: "The quick brown fox" },
  { token: "--font-bold",     tailwind: "font-bold",     value: "700", label: "Bold",     sample: "The quick brown fox" },
];

const LEADING = [
  { token: "--leading-tight",   tailwind: "leading-tight",   value: "1.25",  label: "Tight",   use: "Large display, headings" },
  { token: "--leading-snug",    tailwind: "leading-snug",    value: "1.375", label: "Snug",    use: "Card titles, compact UI" },
  { token: "--leading-normal",  tailwind: "leading-normal",  value: "1.5",   label: "Normal",  use: "Body / UI default" },
  { token: "--leading-relaxed", tailwind: "leading-relaxed", value: "1.625", label: "Relaxed", use: "Long-form reading" },
];

export default function TypographyPage() {
  return (
    <div className="px-8 py-12 lg:px-16">
      <div className="max-w-4xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Foundations</p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">Typography</h1>
        <p className="mb-12 max-w-2xl text-base text-muted-foreground leading-relaxed">
          19 mode-agnostic tokens covering size, weight, line height, letter spacing, and family.
          In practice, use Tailwind utilities — they map directly to these token values.
        </p>

        {/* Font families */}
        <section className="mb-12">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Font Families</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-5">
              <p className="mb-1 font-mono text-xs text-muted-foreground">--font-sans · font-sans</p>
              <p className="mt-3 text-2xl font-medium text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
                Aa Bb Cc 0–9
              </p>
              <p className="mt-2 text-sm text-muted-foreground">ui-sans-serif, system-ui, -apple-system…</p>
              <p className="mt-1 text-xs text-muted-foreground">Use for all UI text</p>
            </div>
            <div className="rounded-lg border border-border p-5">
              <p className="mb-1 font-mono text-xs text-muted-foreground">--font-mono · font-mono</p>
              <p className="mt-3 text-2xl font-medium text-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                Aa Bb Cc 0–9
              </p>
              <p className="mt-2 text-sm text-muted-foreground">ui-monospace, SFMono-Regular…</p>
              <p className="mt-1 text-xs text-muted-foreground">Use for code, tokens, shortcuts</p>
            </div>
          </div>
        </section>

        {/* Type scale */}
        <section className="mb-12">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Size Scale</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Token</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Tailwind</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">rem</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">px</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground w-1/2">Specimen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {TYPE_SCALE.map((s) => (
                  <tr key={s.token} className="bg-background hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3"><code className="font-mono text-xs text-foreground">{s.token}</code></td>
                    <td className="px-4 py-3"><code className="font-mono text-xs text-muted-foreground">{s.tailwind}</code></td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.rem}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.px}</td>
                    <td className="px-4 py-3">
                      <span
                        className="font-semibold text-foreground leading-none"
                        style={{ fontSize: `var(${s.token})` }}
                      >
                        {s.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Font weight */}
        <section className="mb-12">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Font Weight</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {WEIGHTS.map((w) => (
              <div key={w.token} className="flex items-baseline justify-between rounded-lg border border-border px-5 py-4">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{w.tailwind} · {w.value}</p>
                  <p className="mt-2 text-xl text-foreground" style={{ fontWeight: w.value }}>{w.sample}</p>
                </div>
                <span className="text-xs text-muted-foreground">{w.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Line height */}
        <section>
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Line Height</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Token</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Tailwind</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Value</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {LEADING.map((l) => (
                  <tr key={l.token} className="bg-background hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3"><code className="font-mono text-xs text-foreground">{l.token}</code></td>
                    <td className="px-4 py-3"><code className="font-mono text-xs text-muted-foreground">{l.tailwind}</code></td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{l.value}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{l.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
