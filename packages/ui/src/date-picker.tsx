"use client";

import React, { useRef, useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { cn } from "./lib/utils";
import { PopoverPanel } from "./popover";
import { CalendarMiniMonth } from "./calendar/calendar-mini-month";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  clearable?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date…",
  disabled,
  error,
  clearable = true,
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: DatePickerProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  function openMenu() {
    if (disabled) return;
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleSelect(date: Date) {
    onChange?.(date);
    closeMenu();
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange?.(undefined);
  }

  return (
    <>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={ariaLabel ?? (value ? formatDate(value) : placeholder)}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={error ? true : undefined}
        disabled={disabled}
        onClick={() => (open ? closeMenu() : openMenu())}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-background px-3 text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
          error
            ? "border-destructive focus-visible:ring-destructive/30"
            : "border-input",
          className
        )}
      >
        <div className="flex flex-1 items-center gap-2">
          <CalendarDays className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <span className={cn(!value && "text-muted-foreground")}>
            {value ? formatDate(value) : placeholder}
          </span>
        </div>
        {clearable && value && (
          <span
            role="button"
            aria-label="Clear date"
            onClick={handleClear}
            className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </span>
        )}
      </button>

      <PopoverPanel
        anchorRef={triggerRef}
        open={open}
        onClose={closeMenu}
        matchWidth={false}
        className="p-3"
      >
        <CalendarMiniMonth
          selected={value}
          onSelect={handleSelect}
        />
      </PopoverPanel>
    </>
  );
}
