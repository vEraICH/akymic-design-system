"use client";

import React, {
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "./lib/utils";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TabsContextValue {
  activeTab: string;
  onTabChange: (value: string) => void;
  variant: "line" | "pill";
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs compound components must be used inside <Tabs>");
  return ctx;
}

// ---------------------------------------------------------------------------
// Tabs (root)
// ---------------------------------------------------------------------------

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: "line" | "pill";
  className?: string;
  children: React.ReactNode;
}

export function Tabs({
  value: controlledValue,
  defaultValue = "",
  onChange,
  variant = "line",
  className,
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeTab = isControlled ? controlledValue : internalValue;
  const baseId = useId();

  function handleTabChange(v: string) {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  }

  return (
    <TabsContext.Provider
      value={{ activeTab, onTabChange: handleTabChange, variant, baseId }}
    >
      <div className={cn("flex flex-col", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// TabsList
// ---------------------------------------------------------------------------

export interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export function TabsList({ className, children }: TabsListProps) {
  const { variant } = useTabsContext();
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const triggers = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])'
      ) ?? []
    );
    if (!triggers.length) return;

    const current = document.activeElement as HTMLButtonElement;
    const idx = triggers.indexOf(current);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      triggers[(idx + 1) % triggers.length].focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      triggers[(idx - 1 + triggers.length) % triggers.length].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      triggers[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      triggers[triggers.length - 1].focus();
    }
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn(
        "flex",
        variant === "line"
          ? "border-b border-border gap-0"
          : "gap-1 rounded-lg bg-muted p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TabsTrigger
// ---------------------------------------------------------------------------

export interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ value, disabled = false, className, children }, ref) {
    const { activeTab, onTabChange, variant, baseId } = useTabsContext();
    const isSelected = activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`${baseId}-tab-${value}`}
        aria-controls={`${baseId}-panel-${value}`}
        aria-selected={isSelected}
        disabled={disabled}
        tabIndex={isSelected ? 0 : -1}
        onClick={() => !disabled && onTabChange(value)}
        className={cn(
          "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium",
          "transition-colors duration-fast",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variant === "line"
            ? [
                "h-9 border-b-2 px-4",
                isSelected
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              ]
            : [
                "h-8 rounded-md px-3",
                isSelected
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              ],
          className
        )}
      >
        {children}
      </button>
    );
  }
);

// ---------------------------------------------------------------------------
// TabsContent
// ---------------------------------------------------------------------------

export interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function TabsContent({ value, className, children }: TabsContentProps) {
  const { activeTab, baseId } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn(
        "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </div>
  );
}
