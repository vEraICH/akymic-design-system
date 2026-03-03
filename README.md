# Akymic Design System

A complete, production-ready design system for Next.js + Tailwind CSS + TypeScript applications. 34 components, 23 semantic tokens, full light/dark mode, zero runtime dependencies beyond React.

**Docs site:** `apps/docs/` — run `npm run dev` from that directory → `http://localhost:3001`
**App template:** `akymic-app-template/` — full working Next.js app with all components wired up

---

## For AI Agents (Claude Code, Copilot, Gemini, Codex)

> **If you are an AI agent working on a new web app that should use this design system, read this section first.**

### How to use this DS in a new project

1. **Copy tokens** — copy `packages/tokens/tokens/tokens.css` into your project at `src/design-system/tokens.css` and import it in your root layout.
2. **Copy components** — copy files from `akymic-app-template/src/components/ui/` into your project's component directory. Each file is self-contained.
3. **Configure Tailwind** — extend `tailwind.config.ts` with the token-mapped colors and shadows shown in the [Tailwind config section](#tailwind-config) below.
4. **Use semantic tokens only** — never use hardcoded hex colors. Always use `bg-primary`, `text-foreground`, `border-border`, etc.

### Non-negotiable conventions

- **No hardcoded colors.** Every color must come from a CSS variable: `hsl(var(--token-name))`.
- **Light + dark from day one.** Every token has both modes. Theme switches via `.dark` class on `<html>`.
- **Import paths:** `@/components/ui/<component-name>` (adjust alias to match your project).
- **No external UI libraries.** All components are self-contained TSX. No Radix, no shadcn, no Headless UI.
- **Focus rings are mandatory.** All interactive elements use `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript strict |
| Icons | lucide-react |
| Fonts | Inter (sans), JetBrains Mono (mono) via Google Fonts |
| Theme | next-themes (`ThemeProvider` + `.dark` class) |

---

## Token Reference

All tokens live in `packages/tokens/tokens/tokens.css`. Values are `H S% L%` for use as `hsl(var(--token))`.

### Color tokens

```css
/* ── Surface ── */
--background          /* Page canvas */
--foreground          /* Primary text */
--card                /* Elevated containers */
--card-foreground
--popover             /* Floating overlays: dropdowns, tooltips */
--popover-foreground

/* ── Brand ── */
--primary             /* CTAs, active states, focus rings — blue 221° */
--primary-foreground

/* ── Secondary / Muted / Accent ── */
--secondary           /* Subdued buttons, badge backgrounds */
--secondary-foreground
--muted               /* Sidebar, table stripes, skeletons */
--muted-foreground    /* Captions, placeholders — must stay ≥4.5:1 */
--accent              /* Interactive hover surface */
--accent-foreground

/* ── Intent ── */
--success             /* Confirmations, completed states — green 142° */
--success-foreground
--warning             /* Caution, advisory — amber 43° */
--warning-foreground
--destructive         /* Errors, delete actions — red 0° */
--destructive-foreground

/* ── Form / Structure ── */
--border              /* Layout dividers */
--input               /* Form field borders */
--ring                /* Focus rings — kept at primary hue */
--radius              /* Base border-radius: 0.5rem */
```

### Shadow tokens

```css
--shadow-resting      /* Cards, panels */
--shadow-floating     /* Dialogs, dropdowns, toasts */
--shadow-inset        /* Pressed states */
```

### Typography tokens (mode-agnostic, in `:root` only)

```css
/* Font sizes: --text-xs through --text-4xl */
/* Font weights: --font-normal/medium/semibold/bold */
/* Line heights: --leading-tight/snug/normal/relaxed */
/* Letter spacing: --tracking-tight/normal/wide/widest */
/* Families: --font-sans (Inter), --font-mono (JetBrains Mono) */
```

---

## Tailwind Config

Add to `tailwind.config.ts` `theme.extend`:

```ts
colors: {
  background:  "hsl(var(--background))",
  foreground:  "hsl(var(--foreground))",
  card:        { DEFAULT: "hsl(var(--card))",        foreground: "hsl(var(--card-foreground))" },
  popover:     { DEFAULT: "hsl(var(--popover))",     foreground: "hsl(var(--popover-foreground))" },
  primary:     { DEFAULT: "hsl(var(--primary))",     foreground: "hsl(var(--primary-foreground))" },
  secondary:   { DEFAULT: "hsl(var(--secondary))",   foreground: "hsl(var(--secondary-foreground))" },
  muted:       { DEFAULT: "hsl(var(--muted))",       foreground: "hsl(var(--muted-foreground))" },
  accent:      { DEFAULT: "hsl(var(--accent))",      foreground: "hsl(var(--accent-foreground))" },
  success:     { DEFAULT: "hsl(var(--success))",     foreground: "hsl(var(--success-foreground))" },
  warning:     { DEFAULT: "hsl(var(--warning))",     foreground: "hsl(var(--warning-foreground))" },
  destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
  border: "hsl(var(--border))",
  input:  "hsl(var(--input))",
  ring:   "hsl(var(--ring))",
},
borderRadius: {
  lg: "var(--radius)",
  md: "calc(var(--radius) - 2px)",
  sm: "calc(var(--radius) - 4px)",
},
boxShadow: {
  resting:  "var(--shadow-resting)",
  floating: "var(--shadow-floating)",
  inset:    "var(--shadow-inset)",
},
```

---

## Component Inventory

All 34 components are in `akymic-app-template/src/components/ui/` (primitives) and `packages/ui/src/` (compound elements + promoted primitives). Every component:
- Uses only semantic tokens
- Has visible focus rings
- Supports light + dark mode
- Has controlled + uncontrolled variants where applicable
- Has no external dependencies beyond React + lucide-react

### Navigation

```tsx
import { NavSidebar }        from "@/components/ui/nav-sidebar";
import { Topbar }            from "@/components/ui/topbar";
import { AppShell }          from "@/components/app-shell";
// AppShell wraps NavSidebar (240px, muted bg) + Topbar (60px, bg-background)
// Use per-section layout, not root layout, to keep playground pages unaffected
<AppShell title="Page title">{children}</AppShell>
```

### Buttons & Badges

```tsx
import { Button } from "@/components/ui/button";
// variants: "default" | "secondary" | "ghost" | "outline" | "destructive"
// sizes: "default" | "sm" | "lg" | "icon"
<Button variant="default" size="sm">Save</Button>
<Button variant="destructive">Delete</Button>
<Button disabled>Disabled</Button>

import { Badge } from "@/components/ui/badge";
// variants: "default" | "secondary" | "outline" | "success" | "warning" | "destructive"
// sizes: "default" | "sm"
<Badge variant="success">Stable</Badge>
<Badge variant="warning" size="sm">Beta</Badge>
```

### Form inputs

```tsx
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// error prop applies destructive border; disabled prop applies muted styles
<Input placeholder="Email" error={hasError} />
<Textarea rows={4} disabled />
```

### Selection controls

```tsx
import { Checkbox, CheckboxField }   from "@/components/ui/checkbox";
import { RadioGroup, Radio }          from "@/components/ui/radio";
import { Switch, SwitchField }        from "@/components/ui/switch";

<CheckboxField label="Accept terms" checked={v} onChange={setV} />
<RadioGroup value={plan} onChange={setPlan}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="yearly"  label="Yearly"  />
</RadioGroup>
<SwitchField label="Notifications" checked={on} onChange={setOn} />
```

### Popover-based form controls

```tsx
import { Select }      from "@/components/ui/select";
import { Combobox }    from "@/components/ui/combobox";       // searchable
import { MultiSelect } from "@/components/ui/multi-select";
import { DatePicker }  from "@/components/ui/date-picker";
import { FileUpload }  from "@/components/ui/file-upload";

<Select value={v} onChange={setV} placeholder="Choose…"
  options={[{ value: "a", label: "Option A" }]} />

<Combobox value={v} onChange={setV} placeholder="Search…" options={opts} />

<MultiSelect value={tags} onChange={setTags} options={opts} maxDisplay={3} />

<DatePicker value={date} onChange={setDate} clearable />

<FileUpload value={files} onChange={setFiles} accept=".pdf,.png" maxSize={5_000_000} maxFiles={3} />
```

### Card, Divider

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";

<Card>
  <CardHeader><CardTitle>Title</CardTitle><CardDescription>Sub</CardDescription></CardHeader>
  <CardContent>…</CardContent>
  <CardFooter><Button>Action</Button></CardFooter>
</Card>

<Divider />                           // horizontal
<Divider label="or" />               // labeled
<Divider orientation="vertical" />   // vertical (use in flex rows)
```

### Feedback: Alert, Toast, Skeleton, EmptyState

```tsx
import { Alert }      from "@/components/ui/alert";
// variants: "default" | "info" | "success" | "warning" | "destructive"
<Alert variant="warning" onDismiss={() => setVisible(false)}>Watch out.</Alert>

import { toast }      from "@/components/ui/toast";
// Mount <Toaster /> once in root layout
toast.success("Saved!");
toast.error("Failed.");
toast("Default message");

import { Skeleton, Spinner } from "@/components/ui/skeleton";
<Skeleton className="h-4 w-32" />          // compose freely
<Spinner size="sm" />                       // "sm" | "default" | "lg"

import { EmptyState } from "@/components/ui/empty-state";
import { Inbox }      from "lucide-react";
<EmptyState icon={<Inbox className="h-5 w-5" />} title="No notifications"
  description="You're all caught up." />
```

### Overlays: Dialog, Drawer, Tooltip, Dropdown

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader,
         DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
         DrawerTitle, DrawerBody, DrawerFooter, DrawerClose }        from "@/components/ui/drawer";
// Drawer: side prop = "right" | "left" | "bottom" | "top"

import { Tooltip } from "@/components/ui/tooltip";
// placement: "top" | "bottom" | "left" | "right" — default "top"
<Tooltip content="Copy" placement="top">
  <button>…</button>
</Tooltip>

import { DropdownMenu, DropdownItem, DropdownSeparator, DropdownLabel } from "@/components/ui/dropdown";
<DropdownMenu trigger={<Button variant="outline">Actions</Button>}>
  <DropdownItem onSelect={handleEdit}>Edit</DropdownItem>
  <DropdownSeparator />
  <DropdownItem variant="destructive" onSelect={handleDelete}>Delete</DropdownItem>
</DropdownMenu>
```

### Data: Table, Pagination, Calendar

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { FilterBar }  from "@/components/ui/filter-bar";
import { Pagination } from "@/components/ui/pagination";
// TableHead: sortable + sortDirection ("asc"|"desc"|false) + onSort
// TableBody: striped (alternates bg-background / bg-muted/40)

import { Calendar, CalendarMiniMonth, type CalendarEvent } from "@/components/ui/calendar";
// Calendar: events, showSidebar, showViewSwitcher, onDateClick, className="h-[600px]"
// CalendarMiniMonth: selected (Date), onSelect — for date pickers / sidebars
```

### Navigation patterns: Tabs, Breadcrumb

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// variant: "line" (underline) | "pill" (filled bg) — default "line"
<Tabs defaultValue="overview" variant="line">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview" className="pt-4">…</TabsContent>
</Tabs>

import { BreadcrumbList } from "@/components/ui/breadcrumb";
// Convenience array API — last segment is auto-marked as current page
<BreadcrumbList segments={[
  { label: "Home",       href: "/" },
  { label: "Components", href: "/components" },
  { label: "Tabs" },    // no href → aria-current="page"
]} />
```

### Compound Elements: DashboardLayout, DashboardPanel, DashboardSkeleton

Higher-order components that compose Card, Badge, Tooltip, DropdownMenu, Skeleton, and EmptyState into a complete, responsive dashboard grid. Loading states, empty states, and accessibility are built in.

```tsx
import { DashboardLayout }   from "@/components/ui/dashboard-layout";
import { DashboardPanel }    from "@/components/ui/dashboard-panel";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeleton";

// Full dashboard — loading=true renders DashboardSkeleton automatically
<DashboardLayout
  title="Engineering Overview"
  description="Last 30 days · All repositories"
  columns={12}          // 4 | 6 | 8 | 12
  gap="md"              // "sm" | "md" | "lg"
  loading={isLoading}
  skeletonCount={7}
  headerActions={<Button onClick={refresh}>Refresh</Button>}
>
  {/* colSpan/rowSpan use CSS Grid inline styles — safe from Tailwind purge */}
  <DashboardPanel colSpan={3} title="Open pull requests">
    <Stat value="42" delta="+5 this week" />
  </DashboardPanel>

  <DashboardPanel
    colSpan={3}
    title="Average merge time"
    subtitle="Median · excluding drafts"
    badge={{ label: "Beta", variant: "secondary" }}
    info="Median time from PR open to first merge commit."
    actions={[
      { label: "Download CSV", onSelect: handleDownload },
      { label: "Remove",       onSelect: handleRemove, variant: "destructive" },
    ]}
    loading={isFetching}
    loadingHeight="8rem"
  >
    <Stat value="2.4h" />
  </DashboardPanel>

  <DashboardPanel
    colSpan={6}
    title="Upcoming deployments"
    empty={!hasDeployments}
    emptyState={<EmptyState icon={<CalendarX2 />} title="Nothing scheduled" />}
  >
    <DeploymentList data={deployments} />
  </DashboardPanel>

  <DashboardPanel colSpan={12} title="Recent merges">
    <MergeList data={merges} />
  </DashboardPanel>
</DashboardLayout>
```

**Key rules:**
- One visualization per panel — no multi-chart panels
- Panel `title` must be a concise sentence fragment, lowercase, no dashes
- Use `subtitle` for date range / scope; use `badge` for Beta/Experiment labels
- Below 768px, all panels collapse to 1 column regardless of `colSpan`
- No new tokens required — maps to `--card`, `--border`, `--shadow-resting`, `--muted`

See `docs/compound-elements.md` for full spec and Phase 2 roadmap (drag-to-reorder, resize handles).

---

## File Structure

```
akymic-design-system/
├── packages/
│   ├── tokens/
│   │   └── tokens/
│   │       ├── tokens.json        ← source of truth (edit here)
│   │       └── tokens.css         ← consumer artifact (plain CSS vars only)
│   └── ui/
│       └── src/                   ← @akymic/ui — promoted + compound components
│           ├── badge.tsx          ← Badge (6 variants × 2 sizes)
│           ├── skeleton.tsx       ← Skeleton + Spinner
│           ├── empty-state.tsx    ← EmptyState
│           ├── dashboard-layout.tsx   ← DashboardLayout (12-col CSS Grid)
│           ├── dashboard-panel.tsx    ← DashboardPanel (full panel primitive)
│           ├── dashboard-skeleton.tsx ← DashboardSkeleton (loading placeholder)
│           ├── checkbox.tsx · radio.tsx · switch.tsx · tabs.tsx
│           ├── breadcrumb.tsx · tooltip.tsx · dropdown.tsx
│           └── index.ts           ← barrel export
├── apps/
│   └── docs/                      ← documentation site (Next.js static export)
│       └── src/app/components/    ← one page per component family
└── docs/
    ├── tokens.md                  ← token dictionary
    ├── components.md              ← component inventory + variants
    ├── compound-elements.md       ← compound element specs + roadmap
    ├── gap-analysis.md            ← gap tracking vs GitHub Primer
    ├── design_decision.md         ← architecture decisions
    └── changes/                   ← per-iteration change notes

akymic-app-template/               ← companion consuming app (sibling repo)
└── src/
    ├── components/ui/             ← all 34 components live here (incl. compound)
    ├── lib/                       ← calendar-utils, cn, theme-engine, etc.
    ├── hooks/                     ← use-focus-trap, use-lock-body-scroll
    └── app/
        ├── compound/              ← live compound elements demo (engineering dashboard)
        ├── paper-playground/      ← visual sandbox (all components rendered)
        └── theme/                 ← Theme Studio (live token customisation)
```

---

## Using This DS in a New Project — Step-by-Step

```bash
# 1. Scaffold a Next.js app
npx create-next-app@latest my-app --typescript --tailwind --app

# 2. Copy tokens
cp path/to/akymic-design-system/packages/tokens/tokens/tokens.css \
   my-app/src/design-system/tokens.css

# 3. Import tokens in root layout
# In app/layout.tsx:
# import "@/design-system/tokens.css";

# 4. Copy the components you need
cp path/to/akymic-app-template/src/components/ui/button.tsx    my-app/src/components/ui/
cp path/to/akymic-app-template/src/components/ui/card.tsx      my-app/src/components/ui/
# ... etc.

# 5. Add cn() utility (required by most components)
cp path/to/akymic-app-template/src/lib/utils.ts  my-app/src/lib/

# 6. Extend tailwind.config.ts with the token colors (see Tailwind Config above)

# 7. Install lucide-react (icons used by several components)
npm install lucide-react

# 8. Install next-themes (for ThemeToggle and dark mode)
npm install next-themes
```

---

## Agent Prompt Snippet

If you are an AI agent starting a new project with this DS, add this to your project's `CLAUDE.md`:

```markdown
## Design System
This project uses the Akymic Design System.
Read the full spec at:
https://raw.githubusercontent.com/YOUR_ORG/akymic-design-system/main/README.md

Rules:
- Use only semantic token classes: bg-primary, text-foreground, border-border, etc.
- Import components from @/components/ui/<name>
- Never use hardcoded hex colors
- Every interactive element must have focus-visible:ring-2 focus-visible:ring-ring
- Use shadow-resting for cards, shadow-floating for dialogs/dropdowns
```

---

## Governance

- Token source of truth: `packages/tokens/tokens/tokens.json`
- To add a token: add to `tokens.json` → update `tokens.css` → extend Tailwind config → document in `docs/tokens.md`
- Change notes: `docs/changes/YYYY-MM-DD-slug.md` for every meaningful update
- Breaking changes: keep old token for one iteration, document in `docs/migrations.md`
