"use client";

import { useState } from "react";

const DURATIONS = [
  {
    token: "--duration-instant",
    tailwind: "duration-instant",
    value: "50ms",
    use: "Icon swaps, toggle ticks, micro-feedback",
    ms: 50,
  },
  {
    token: "--duration-fast",
    tailwind: "duration-fast",
    value: "100ms",
    use: "Hover states, tooltips, dropdown open",
    ms: 100,
  },
  {
    token: "--duration-normal",
    tailwind: "duration-normal",
    value: "200ms",
    use: "Default — button presses, panel slides, focus rings",
    ms: 200,
  },
  {
    token: "--duration-slow",
    tailwind: "duration-slow",
    value: "300ms",
    use: "Modal/drawer enter, page-level transitions",
    ms: 300,
  },
  {
    token: "--duration-slower",
    tailwind: "duration-slower",
    value: "500ms",
    use: "Complex layout shifts, skeleton-to-content fades",
    ms: 500,
  },
];

const EASINGS = [
  {
    token: "--ease-standard",
    tailwind: "ease-standard",
    value: "cubic-bezier(0.2, 0, 0, 1)",
    use: "Default — balanced deceleration for most transitions",
  },
  {
    token: "--ease-enter",
    tailwind: "ease-enter",
    value: "cubic-bezier(0, 0, 0.2, 1)",
    use: "Elements arriving — modals, toasts, tooltips",
  },
  {
    token: "--ease-exit",
    tailwind: "ease-exit",
    value: "cubic-bezier(0.4, 0, 1, 1)",
    use: "Elements departing — dismiss, close, collapse",
  },
  {
    token: "--ease-spring",
    tailwind: "ease-spring",
    value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    use: "Playful overshoot — toggles, checkmarks, drag-drop",
  },
];

function DurationDemo({ ms, tailwind }: { ms: number; tailwind: string }) {
  const [running, setRunning] = useState(false);

  function replay() {
    setRunning(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setRunning(true)));
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`absolute left-0 top-0 h-full rounded-full bg-primary transition-[width] ease-standard ${tailwind}`}
          style={{ width: running ? "100%" : "0%" }}
        />
      </div>
      <button
        onClick={replay}
        className="shrink-0 rounded border border-border px-2 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-fast ease-standard"
      >
        Play
      </button>
    </div>
  );
}

function EasingDemo({ tailwind }: { tailwind: string }) {
  const [running, setRunning] = useState(false);

  function replay() {
    setRunning(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setRunning(true)));
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-muted">
        <div
          className={`absolute top-1 h-5 w-5 rounded bg-primary transition-[left] duration-slow ${tailwind}`}
          style={{ left: running ? "calc(100% - 1.5rem)" : "0.25rem" }}
        />
      </div>
      <button
        onClick={replay}
        className="shrink-0 rounded border border-border px-2 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-fast ease-standard"
      >
        Play
      </button>
    </div>
  );
}

function KeyframeDemo() {
  const [zoomKey, setZoomKey] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-border p-5">
        <div className="mb-3 flex items-center justify-between">
          <code className="font-mono text-xs text-muted-foreground">animate-zoom-in-95</code>
          <button
            onClick={() => setZoomKey((k) => k + 1)}
            className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-fast ease-standard"
          >
            Replay
          </button>
        </div>
        <div className="flex h-20 items-center justify-center">
          <div
            key={zoomKey}
            className="animate-zoom-in-95 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Popover / Dropdown
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Scales from 95% opacity 0 → full. Used for popovers and dropdowns.
        </p>
      </div>

      <div className="rounded-lg border border-border p-5">
        <div className="mb-3 flex items-center justify-between">
          <code className="font-mono text-xs text-muted-foreground">animate-fade-in</code>
          <button
            onClick={() => setFadeKey((k) => k + 1)}
            className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-fast ease-standard"
          >
            Replay
          </button>
        </div>
        <div className="flex h-20 items-center justify-center">
          <div
            key={fadeKey}
            className="animate-fade-in rounded-lg border border-border bg-card px-4 py-2 text-sm text-card-foreground shadow-floating"
          >
            Toast / Overlay
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Fades from opacity 0 → 1. Used for toasts and overlay reveals.
        </p>
      </div>
    </div>
  );
}

export default function MotionPage() {
  return (
    <div className="px-8 py-12 lg:px-16">
      <div className="max-w-4xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Foundations</p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">Motion</h1>
        <p className="mb-12 max-w-2xl text-base text-muted-foreground leading-relaxed">
          9 mode-agnostic tokens governing animation timing and easing across all components.
          Use Tailwind utilities — they map directly to these token values.
        </p>

        {/* Duration */}
        <section className="mb-12">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Duration</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Token</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Tailwind</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Value</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground w-1/3">Semantic use</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground w-1/4">Live demo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {DURATIONS.map((d) => (
                  <tr key={d.token} className="bg-background hover:bg-muted/30 transition-colors duration-fast">
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs text-foreground">{d.token}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs text-muted-foreground">{d.tailwind}</code>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{d.value}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{d.use}</td>
                    <td className="px-4 py-3">
                      <DurationDemo ms={d.ms} tailwind={d.tailwind} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Easing */}
        <section className="mb-12">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Easing</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Token</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Tailwind</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Value</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground w-1/4">Semantic use</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground w-1/4">Live demo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {EASINGS.map((e) => (
                  <tr key={e.token} className="bg-background hover:bg-muted/30 transition-colors duration-fast">
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs text-foreground">{e.token}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs text-muted-foreground">{e.tailwind}</code>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{e.value}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{e.use}</td>
                    <td className="px-4 py-3">
                      <EasingDemo tailwind={e.tailwind} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Keyframe animations */}
        <section className="mb-12">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Keyframe Animations</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Two pre-composed animations ship as Tailwind utilities. Both use{" "}
            <code className="font-mono text-xs">duration-fast</code> +{" "}
            <code className="font-mono text-xs">ease-enter</code> so they respect motion tokens automatically.
          </p>
          <KeyframeDemo />
        </section>

        {/* Accessibility */}
        <section>
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Accessibility</h2>
          <div className="rounded-lg border border-border p-6">
            <h3 className="mb-3 text-sm font-semibold text-foreground">prefers-reduced-motion</h3>
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              All duration tokens collapse to <code className="font-mono text-xs">0.01ms</code> when a user enables
              "Reduce motion" in their OS accessibility settings. This effectively disables all transitions
              without removing them from code — components stay functional, just instant.
            </p>
            <div className="overflow-hidden rounded-md bg-muted/50 p-4">
              <pre className="font-mono text-xs text-foreground leading-relaxed whitespace-pre">{`@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-instant: 0.01ms;
    --duration-fast:    0.01ms;
    --duration-normal:  0.01ms;
    --duration-slow:    0.01ms;
    --duration-slower:  0.01ms;
  }
}`}</pre>
            </div>
            <div className="mt-5 rounded-lg border border-border bg-background p-4">
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">How to test in DevTools</p>
              <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                <li>Open Chrome/Edge DevTools → Rendering tab (three-dot menu → More tools)</li>
                <li>Find "Emulate CSS media feature prefers-reduced-motion"</li>
                <li>Set to <strong>reduce</strong> — all motion token transitions become instant</li>
                <li>Verify all interactive elements remain usable without animation</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
