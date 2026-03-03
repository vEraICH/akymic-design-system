"use client";

import React, { useId, useRef, useState, useMemo } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "./lib/utils";
import { PopoverPanel } from "./popover";
import { type SelectOption } from "./select";

export interface ComboboxProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results",
  disabled,
  error,
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: ComboboxProps) {
  const uid = useId();
  const listboxId = `${uid}-listbox`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedOption = options.find((o) => o.value === value);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  function openMenu() {
    if (disabled) return;
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
    // Focus search input on next tick after portal renders
    requestAnimationFrame(() => searchRef.current?.focus());
  }

  function closeMenu() {
    setOpen(false);
    setQuery("");
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
      while (next >= 0 && next < filtered.length && filtered[next].disabled) next += dir;
      if (next < 0 || next >= filtered.length) return i;
      return next;
    });
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (["Enter", " ", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      openMenu();
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filtered.length) {
          selectOption(filtered[activeIndex]);
        }
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
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={error ? true : undefined}
        disabled={disabled}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
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
        {/* Search input */}
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <Search className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleSearchKeyDown}
            placeholder={searchPlaceholder}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-autocomplete="list"
            aria-controls={listboxId}
          />
        </div>

        {/* Options list */}
        <ul
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className="max-h-52 overflow-y-auto py-1"
        >
          {filtered.map((opt, i) => (
            <li
              key={opt.value}
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
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              {emptyMessage}
            </li>
          )}
        </ul>
      </PopoverPanel>
    </>
  );
}
