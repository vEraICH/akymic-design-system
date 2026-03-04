"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "./lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────────

export type ToastVariant = "default" | "info" | "success" | "warning" | "destructive";

export interface ToastOptions {
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss duration in ms. 0 = persistent. Default: 4000 */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
  title: string;
}

// ── Module-level store ─────────────────────────────────────────────────────────

type Listener = (items: ToastItem[]) => void;

let _items: ToastItem[] = [];
const _listeners = new Set<Listener>();

function _notify() {
  _listeners.forEach((fn) => fn([..._items]));
}

function _add(title: string, opts: ToastOptions = {}): string {
  const id = Math.random().toString(36).slice(2, 9);
  const item: ToastItem = { title, variant: "default", duration: 4000, ...opts, id };
  _items = [item, ..._items].slice(0, 5);
  _notify();
  return id;
}

function _remove(id: string) {
  _items = _items.filter((t) => t.id !== id);
  _notify();
}

function _subscribe(fn: Listener): () => void {
  _listeners.add(fn);
  fn([..._items]);
  return () => { _listeners.delete(fn); };
}

// ── Public imperative API ──────────────────────────────────────────────────────

export function toast(title: string, opts?: ToastOptions) {
  return _add(title, opts);
}
toast.info = (title: string, opts?: Omit<ToastOptions, "variant">) =>
  _add(title, { ...opts, variant: "info" });
toast.success = (title: string, opts?: Omit<ToastOptions, "variant">) =>
  _add(title, { ...opts, variant: "success" });
toast.warning = (title: string, opts?: Omit<ToastOptions, "variant">) =>
  _add(title, { ...opts, variant: "warning" });
toast.error = (title: string, opts?: Omit<ToastOptions, "variant">) =>
  _add(title, { ...opts, variant: "destructive" });
toast.dismiss = (id: string) => _remove(id);

// ── Single toast card ──────────────────────────────────────────────────────────

const variantStyles: Record<ToastVariant, string> = {
  default:     "border-border bg-background text-foreground",
  info:        "border-primary/20 bg-primary/10 text-primary",
  success:     "border-success/20 bg-success/10 text-success",
  warning:     "border-warning/20 bg-warning/10 text-warning",
  destructive: "border-destructive/20 bg-destructive/10 text-destructive",
};

const variantIcons: Record<ToastVariant, React.ElementType | null> = {
  default:     null,
  info:        Info,
  success:     CheckCircle,
  warning:     AlertTriangle,
  destructive: AlertCircle,
};

interface ToastCardProps {
  item: ToastItem;
  onDismiss: () => void;
}

function ToastCard({ item, onDismiss }: ToastCardProps) {
  const [visible, setVisible] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  // Enter animation
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Auto-dismiss — pauses on hover or focus
  React.useEffect(() => {
    if (!item.duration || paused) return;
    const t = setTimeout(onDismiss, item.duration);
    return () => clearTimeout(t);
  }, [item.duration, onDismiss, paused]);

  const Icon = variantIcons[item.variant ?? "default"];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex w-80 items-start gap-3 rounded-lg border px-4 py-3 shadow-floating",
        "transition-all duration-slow ease-enter",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2",
        variantStyles[item.variant ?? "default"]
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {Icon && <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} />}
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-sm font-medium leading-snug">{item.title}</p>
        {item.description && (
          <p className="text-xs opacity-80">{item.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="ml-auto flex h-5 w-5 flex-shrink-0 items-center justify-center rounded opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ── Toaster (mount in layout) ──────────────────────────────────────────────────

export function Toaster() {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const unsub = _subscribe(setItems);
    return () => unsub();
  }, []);

  if (!isMounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      aria-label="Notifications"
      className="fixed bottom-4 right-4 z-[100] flex flex-col-reverse gap-2"
    >
      {items.map((item) => (
        <ToastCard
          key={item.id}
          item={item}
          onDismiss={() => _remove(item.id)}
        />
      ))}
    </div>,
    document.body
  );
}
