"use client";

import React, { useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "./lib/utils";
import { PopoverPanel } from "./popover";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select…",
  disabled,
  error,
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SelectProps) {
  const uid = useId();
  const listboxId = `${uid}-listbox`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedOption = options.find((o) => o.value === value);

  function openMenu() {
    if (disabled) return;
    const idx = value ? Math.max(0, options.findIndex((o) => o.value === value)) : 0;
    setActiveIndex(idx);
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function selectOption(opt: SelectOption) {
    if (opt.disabled) return;
    onChange?.(opt.value);
    closeMenu();
  }

  function moveActive(dir: 1 | -1) {
    setActiveIndex((i) => {
      let next = i + dir;
      while (next >= 0 && next < options.length && options[next].disabled) next += dir;
      if (next < 0 || next >= options.length) return i;
      return next;
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveActive(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveActive(-1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < options.length) {
          selectOption(options[activeIndex]);
        }
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Tab":
        closeMenu();
        break;
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          open ? `${uid}-opt-${activeIndex}` : undefined
        }
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={error ? true : undefined}
        disabled={disabled}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-background px-3 text-sm text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
          error
            ? "border-destructive focus-visible:ring-destructive/30"
            : "border-input",
          className
        )}
      >
        <span
          className={cn(
            "flex-1 truncate text-left",
            !selectedOption && "text-muted-foreground"
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      </button>

      <PopoverPanel
        anchorRef={triggerRef}
        open={open}
        onClose={closeMenu}
      >
        <ul
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className="max-h-60 overflow-y-auto py-1"
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              id={`${uid}-opt-${i}`}
              role="option"
              aria-selected={opt.value === value}
              aria-disabled={opt.disabled}
              onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
              onClick={() => selectOption(opt)}
              className={cn(
                "flex cursor-pointer select-none items-center gap-2 px-3 py-1.5 text-sm",
                opt.disabled && "pointer-events-none opacity-40",
                i === activeIndex
                  ? "bg-accent text-accent-foreground"
                  : "text-popover-foreground"
              )}
            >
              <span className="flex-1 truncate">{opt.label}</span>
              {opt.value === value && (
                <Check className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
              )}
            </li>
          ))}
          {options.length === 0 && (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No options
            </li>
          )}
        </ul>
      </PopoverPanel>
    </>
  );
}
