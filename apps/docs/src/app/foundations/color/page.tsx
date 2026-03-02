export const metadata = { title: "Color" };

const TOKENS = [
  {
    group: "Surface",
    tokens: [
      { name: "--background",   tailwind: "bg-background",   light: "0 0% 100%",         dark: "222.2 84% 4.9%",   usage: "Page canvas, root backgrounds" },
      { name: "--foreground",   tailwind: "text-foreground",  light: "222.2 84% 4.9%",    dark: "210 40% 98%",       usage: "Primary text color" },
      { name: "--card",         tailwind: "bg-card",          light: "0 0% 100%",         dark: "222.2 84% 4.9%",   usage: "Elevated containers, panels" },
      { name: "--card-foreground", tailwind: "text-card-foreground", light: "222.2 84% 4.9%", dark: "210 40% 98%",  usage: "Text on card surfaces" },
      { name: "--popover",      tailwind: "bg-popover",       light: "0 0% 100%",         dark: "222.2 84% 4.9%",   usage: "Floating overlays — dropdowns, tooltips" },
      { name: "--popover-foreground", tailwind: "text-popover-foreground", light: "222.2 84% 4.9%", dark: "210 40% 98%", usage: "Text on popover surfaces" },
    ],
  },
  {
    group: "Brand",
    tokens: [
      { name: "--primary",            tailwind: "bg-primary",            light: "221.2 83.2% 53.3%", dark: "217.2 91.2% 59.8%", usage: "Brand blue — CTAs, active states, focus" },
      { name: "--primary-foreground", tailwind: "text-primary-foreground", light: "210 40% 98%",      dark: "222.2 84% 4.9%",    usage: "Text/icon on primary background" },
    ],
  },
  {
    group: "Secondary",
    tokens: [
      { name: "--secondary",            tailwind: "bg-secondary",            light: "210 40% 96.1%",     dark: "217.2 32.6% 17.5%", usage: "Secondary buttons, badge backgrounds" },
      { name: "--secondary-foreground", tailwind: "text-secondary-foreground", light: "222.2 47.4% 11.2%", dark: "210 40% 98%",        usage: "Text on secondary background" },
    ],
  },
  {
    group: "Muted & Accent",
    tokens: [
      { name: "--muted",            tailwind: "bg-muted",            light: "210 40% 96.1%",     dark: "217.2 32.6% 17.5%", usage: "Sidebar, table stripes, skeleton — static subdued surface" },
      { name: "--muted-foreground", tailwind: "text-muted-foreground", light: "215.4 16.3% 40%",  dark: "215 20.2% 65.1%",   usage: "Captions, help text, placeholders" },
      { name: "--accent",            tailwind: "bg-accent",            light: "210 40% 96.1%",     dark: "217.2 32.6% 17.5%", usage: "Interactive hover — visually same as muted, semantically distinct" },
      { name: "--accent-foreground", tailwind: "text-accent-foreground", light: "222.2 47.4% 11.2%", dark: "210 40% 98%",       usage: "Text on accent hover" },
    ],
  },
  {
    group: "Destructive",
    tokens: [
      { name: "--destructive",            tailwind: "bg-destructive",            light: "0 84.2% 60.2%", dark: "0 84.2% 60.2%", usage: "Errors, delete actions, danger states" },
      { name: "--destructive-foreground", tailwind: "text-destructive-foreground", light: "210 40% 98%",   dark: "210 40% 98%",   usage: "Text on destructive background" },
    ],
  },
  {
    group: "Border & Form",
    tokens: [
      { name: "--border", tailwind: "border-border", light: "214.3 31.8% 91.4%", dark: "217.2 32.6% 17.5%", usage: "Layout dividers, separators" },
      { name: "--input",  tailwind: "border-input",  light: "214.3 31.8% 91.4%", dark: "217.2 32.6% 17.5%", usage: "Form field borders — kept separate from border for independent styling" },
      { name: "--ring",   tailwind: "ring-ring",     light: "221.2 83.2% 53.3%", dark: "224.3 76.3% 48%",   usage: "Focus rings — must remain visible at all times" },
    ],
  },
];

function Swatch({ hsl, label }: { hsl: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-7 w-7 flex-shrink-0 rounded-md border border-black/10"
        style={{ background: `hsl(${hsl})` }}
      />
      <span className="font-mono text-xs text-muted-foreground">{hsl}</span>
    </div>
  );
}

export default function ColorPage() {
  return (
    <div className="px-8 py-12 lg:px-16">
      <div className="max-w-5xl">
        {/* Header */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Foundations</p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">Color</h1>
        <p className="mb-10 max-w-2xl text-base text-muted-foreground leading-relaxed">
          All colors are semantic tokens stored as HSL components. Every token has a light and dark value —
          the theme switches automatically via the <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">.dark</code> class on <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;html&gt;</code>.
          Use the toggle in the header to preview both modes.
        </p>

        <div className="flex flex-col gap-10">
          {TOKENS.map(({ group, tokens }) => (
            <section key={group}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {group}
              </h2>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Token</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Tailwind class</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Light</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Dark</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {tokens.map((t) => (
                      <tr key={t.name} className="bg-background hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <code className="font-mono text-xs text-foreground">{t.name}</code>
                        </td>
                        <td className="px-4 py-3">
                          <code className="font-mono text-xs text-muted-foreground">{t.tailwind}</code>
                        </td>
                        <td className="px-4 py-3">
                          <Swatch hsl={t.light} label="light" />
                        </td>
                        <td className="px-4 py-3">
                          <Swatch hsl={t.dark} label="dark" />
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{t.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
