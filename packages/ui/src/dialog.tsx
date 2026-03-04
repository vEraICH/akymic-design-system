"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "./lib/utils";
import { useLockBodyScroll } from "./hooks/use-lock-body-scroll";
import { useFocusTrap } from "./hooks/use-focus-trap";

// ── Context ────────────────────────────────────────────────────────────────────

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue>({
  open: false,
  onOpenChange: () => {},
});

function useDialog() {
  return React.useContext(DialogContext);
}

// ── Root ───────────────────────────────────────────────────────────────────────

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: DialogProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen! : internalOpen;

  function handleOpenChange(val: boolean) {
    if (!isControlled) setInternalOpen(val);
    onOpenChange?.(val);
  }

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

// ── Trigger ────────────────────────────────────────────────────────────────────

export function DialogTrigger({ children }: { children: React.ReactElement }) {
  const { onOpenChange } = useDialog();
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      onOpenChange(true);
    },
  });
}

// ── Close ──────────────────────────────────────────────────────────────────────

export function DialogClose({ children }: { children: React.ReactElement }) {
  const { onOpenChange } = useDialog();
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      onOpenChange(false);
    },
  });
}

// ── Content (portal + overlay + panel) ────────────────────────────────────────

export interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  /** Hide the default X close button */
  hideClose?: boolean;
}

export function DialogContent({ children, className, hideClose = false }: DialogContentProps) {
  const { open, onOpenChange } = useDialog();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const prevFocusRef = React.useRef<HTMLElement | null>(null);

  // Animation state
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
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Escape to close
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
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "transition-opacity duration-normal ease-standard",
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
          "relative z-10 w-full max-w-md rounded-lg border border-border bg-background shadow-floating",
          "transition-all duration-normal ease-enter",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className
        )}
      >
        {/* Default close button */}
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

export function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5 px-6 pb-4 pt-6", className)}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-base font-semibold leading-tight text-foreground", className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function DialogBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-6 py-2", className)}>
      {children}
    </div>
  );
}

export function DialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-end gap-2 px-6 pb-6 pt-4", className)}>
      {children}
    </div>
  );
}
