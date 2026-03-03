"use client";

import React, {
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface DropdownContextValue {
  close: () => void;
}

const DropdownContext = createContext<DropdownContextValue>({ close: () => {} });

// ---------------------------------------------------------------------------
// DropdownMenu
// ---------------------------------------------------------------------------

export interface DropdownMenuProps {
  trigger: React.ReactElement;
  className?: string;
  align?: "start" | "end";
  children: React.ReactNode;
}

export function DropdownMenu({
  trigger,
  className,
  align = "start",
  children,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();

  const close = useCallback(() => setOpen(false), []);

  // Position the menu below the trigger
  function computePos() {
    if (!triggerRef.current || !menuRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = menuRef.current.offsetWidth;
    let left =
      align === "end"
        ? rect.right - menuWidth + window.scrollX
        : rect.left + window.scrollX;
    const top = rect.bottom + 4 + window.scrollY;
    // Clamp to viewport
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
    setPos({ top, left });
  }

  function toggle() {
    setOpen((prev) => {
      if (!prev) {
        // Will position after paint
        requestAnimationFrame(() => computePos());
      }
      return !prev;
    });
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Auto-focus first item on open
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      const first = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])');
      first?.focus();
    });
  }, [open]);

  // Arrow key + Escape navigation in menu
  function handleMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ?? []
    );
    const current = document.activeElement as HTMLElement;
    const idx = items.indexOf(current);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      // Return focus to trigger
      triggerRef.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  const clonedTrigger = isValidElement(trigger)
    ? React.cloneElement(trigger as React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement>; "aria-haspopup"?: boolean | "menu"; "aria-expanded"?: boolean }>, {
        ref: triggerRef,
        "aria-haspopup": "menu" as const,
        "aria-expanded": open,
        "aria-controls": open ? triggerId : undefined,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          toggle();
          (trigger as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onClick?.(e);
        },
      })
    : trigger;

  return (
    <DropdownContext.Provider value={{ close }}>
      {clonedTrigger}
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            id={triggerId}
            role="menu"
            aria-orientation="vertical"
            onKeyDown={handleMenuKeyDown}
            style={{ position: "absolute", top: pos.top, left: pos.left, zIndex: 9999 }}
            className={cn(
              "min-w-[10rem] rounded-md border border-border bg-popover p-1 shadow-floating",
              "animate-in fade-in-0 zoom-in-95 duration-100",
              className
            )}
          >
            {children}
          </div>,
          document.body
        )}
    </DropdownContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// DropdownItem
// ---------------------------------------------------------------------------

export interface DropdownItemProps {
  onSelect?: () => void;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  function DropdownItem(
    { onSelect, variant = "default", icon, disabled = false, className, children },
    ref
  ) {
    const { close } = useContext(DropdownContext);

    function activate() {
      if (disabled) return;
      onSelect?.();
      close();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    }

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? undefined : -1}
        aria-disabled={disabled || undefined}
        onClick={activate}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
          "outline-none transition-colors duration-100",
          "focus-visible:bg-accent focus-visible:text-accent-foreground",
          "hover:bg-accent hover:text-accent-foreground",
          variant === "destructive"
            ? "text-destructive focus-visible:text-destructive hover:text-destructive"
            : "text-foreground",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          className
        )}
      >
        {icon && (
          <span className="h-4 w-4 shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </div>
    );
  }
);

// ---------------------------------------------------------------------------
// DropdownSeparator
// ---------------------------------------------------------------------------

export function DropdownSeparator({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      className={cn("-mx-1 my-1 border-t border-border", className)}
    />
  );
}

// ---------------------------------------------------------------------------
// DropdownLabel
// ---------------------------------------------------------------------------

export function DropdownLabel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}
