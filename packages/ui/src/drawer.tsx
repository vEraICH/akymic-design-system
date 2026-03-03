"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "./lib/utils";
import { useLockBodyScroll } from "./hooks/use-lock-body-scroll";
import { useFocusTrap } from "./hooks/use-focus-trap";

// ── Types ──────────────────────────────────────────────────────────────────────

export type DrawerSide = "right" | "left" | "bottom" | "top";

// ── Context ────────────────────────────────────────────────────────────────────

interface DrawerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DrawerContext = React.createContext<DrawerContextValue>({
  open: false,
  onOpenChange: () => {},
});

function useDrawer() {
  return React.useContext(DrawerContext);
}

// ── Root ───────────────────────────────────────────────────────────────────────

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Drawer({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: DrawerProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen! : internalOpen;

  function handleOpenChange(val: boolean) {
    if (!isControlled) setInternalOpen(val);
    onOpenChange?.(val);
  }

  return (
    <DrawerContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DrawerContext.Provider>
  );
}

// ── Trigger ────────────────────────────────────────────────────────────────────

export function DrawerTrigger({ children }: { children: React.ReactElement }) {
  const { onOpenChange } = useDrawer();
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      onOpenChange(true);
    },
  });
}

// ── Close ──────────────────────────────────────────────────────────────────────

export function DrawerClose({ children }: { children: React.ReactElement }) {
  const { onOpenChange } = useDrawer();
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      onOpenChange(false);
    },
  });
}

// ── Content ────────────────────────────────────────────────────────────────────

const sideBase: Record<DrawerSide, string> = {
  right:  "right-0 top-0 h-full w-full max-w-sm border-l",
  left:   "left-0 top-0 h-full w-full max-w-sm border-r",
  bottom: "bottom-0 left-0 w-full max-h-[85vh] border-t rounded-t-xl",
  top:    "top-0 left-0 w-full max-h-[85vh] border-b rounded-b-xl",
};

const hiddenTranslate: Record<DrawerSide, string> = {
  right:  "translate-x-full",
  left:   "-translate-x-full",
  bottom: "translate-y-full",
  top:    "-translate-y-full",
};

export interface DrawerContentProps {
  children: React.ReactNode;
  side?: DrawerSide;
  className?: string;
  hideClose?: boolean;
}

export function DrawerContent({
  children,
  side = "right",
  className,
  hideClose = false,
}: DrawerContentProps) {
  const { open, onOpenChange } = useDrawer();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const prevFocusRef = React.useRef<HTMLElement | null>(null);

  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const prev = prevFocusRef.current;
      prevFocusRef.current = null;
      const t = setTimeout(() => {
        setMounted(false);
        prev?.focus();
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  useLockBodyScroll(open);
  useFocusTrap(contentRef, open && mounted);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="presentation"
      aria-hidden={!visible}
      className={cn(
        "fixed inset-0 z-50",
        "transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute z-10 flex flex-col bg-background shadow-floating",
          "transition-transform duration-300 ease-in-out",
          sideBase[side],
          visible ? "translate-x-0 translate-y-0" : hiddenTranslate[side],
          className
        )}
      >
        {!hideClose && (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className={cn(
              "absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground",
              "hover:bg-accent hover:text-foreground transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}

// ── Anatomy parts ──────────────────────────────────────────────────────────────

export function DrawerHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5 border-b border-border px-6 pb-4 pt-6", className)}>
      {children}
    </div>
  );
}

export function DrawerTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-base font-semibold leading-tight text-foreground", className)}>
      {children}
    </h2>
  );
}

export function DrawerDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function DrawerBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex-1 overflow-y-auto px-6 py-4", className)}>
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-end gap-2 border-t border-border px-6 pb-6 pt-4", className)}>
      {children}
    </div>
  );
}
