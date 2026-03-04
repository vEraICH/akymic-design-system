"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  {
    label: "Getting Started",
    items: [{ href: "/", label: "Overview" }],
  },
  {
    label: "Foundations",
    items: [
      { href: "/foundations/color", label: "Color" },
      { href: "/foundations/typography", label: "Typography" },
      { href: "/foundations/motion", label: "Motion" },
      { href: "/foundations/spacing", label: "Spacing & Radius" },
    ],
  },
  {
    label: "Components",
    items: [
      { href: "/components", label: "Overview" },
      { href: "/components/button", label: "Button" },
      { href: "/components/badge", label: "Badge" },
      { href: "/components/input", label: "Input" },
      { href: "/components/card", label: "Card" },
      { href: "/components/divider", label: "Divider" },
      { href: "/components/alert", label: "Alert" },
      { href: "/components/toast", label: "Toast" },
      { href: "/components/dialog", label: "Dialog & Drawer" },
      { href: "/components/form", label: "Form Controls" },
      { href: "/components/table", label: "Table" },
      { href: "/components/calendar", label: "Calendar" },
      { href: "/components/skeleton", label: "Skeleton & States" },
      { href: "/components/navigation", label: "Navigation Shell" },
      { href: "/components/checkbox",   label: "Checkbox, Radio & Switch" },
      { href: "/components/tooltip",    label: "Tooltip & Dropdown" },
      { href: "/components/tabs",       label: "Tabs & Breadcrumb" },
    ],
  },
  {
    label: "Compound Elements",
    items: [
      { href: "/components/compound", label: "Dashboard Layout" },
    ],
  },
];

export function DocLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Topbar */}
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-primary text-[11px] font-bold text-primary-foreground">
            A
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Akymic DS
          </span>
        </Link>
        <ThemeToggle />
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 flex-shrink-0 overflow-y-auto border-r border-border bg-background lg:block">
          <nav className="flex flex-col gap-0.5 px-4 py-6">
            {NAV.map((section, si) => (
              <div key={section.label} className={cn("flex flex-col gap-0.5", si > 0 && "mt-5")}>
                <span className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {section.label}
                </span>
                {section.items.map(({ href, label }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "rounded-md px-2 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
