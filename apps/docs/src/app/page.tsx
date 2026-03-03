import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Overview" };

const SECTIONS = [
  {
    href: "/foundations/color",
    label: "Foundations",
    description: "19 semantic color tokens, typography scale, spacing, and radius — all light/dark aware.",
  },
  {
    href: "/components",
    label: "Components",
    description: "Production-ready primitives: Button, Input, Card, Badge, Divider, Navigation Shell, and more.",
  },
  {
    href: "/foundations/color",
    label: "Tokens",
    description: "Browse every token value — HSL values, Tailwind class mapping, and semantic usage.",
  },
];

const STATS = [
  { value: "19", label: "color tokens" },
  { value: "19", label: "typography vars" },
  { value: "11", label: "components" },
  { value: "2", label: "themes" },
];

export default function HomePage() {
  return (
    <div className="px-8 py-16 lg:px-16">
      <div className="max-w-3xl">
        {/* Eyebrow */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          Akymic Design System
        </p>

        {/* Hero */}
        <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight text-foreground">
          Design with precision.<br />Build with confidence.
        </h1>
        <p className="mb-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
          A token-driven, shadcn-compatible component library for Next.js.
          Every decision documented. Every token semantic. Both light and dark from day one.
        </p>

        {/* CTAs */}
        <div className="mb-16 flex flex-wrap gap-3">
          <Link
            href="/components"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore components <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/foundations/color"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            View color tokens
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-4 gap-6 border-y border-border py-8">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold tracking-tight text-foreground">{value}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {SECTIONS.map(({ href, label, description }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col gap-2 rounded-lg border border-border p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-sm text-muted-foreground leading-snug">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
