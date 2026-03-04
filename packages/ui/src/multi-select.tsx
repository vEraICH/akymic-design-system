"use client";

import React, { useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "./lib/utils";
import { PopoverPanel } from "./popover";
import { type SelectOption } from "./select";

export interface MultiSelectProps {
  options: SelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  maxDisplay?: number;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  maxDisplay = 3,
  disabled,
  error,
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: MultiSelectProps) {
  const uid = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = useMemo(
    () => options.filter((o) => value.includes(o.value)),
    [options, value]
  );

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
    requestAnimationFrame(() => searchRef.current?.focus());
  }

  function closeMenu() {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }

  function toggleOption(opt: SelectOption) {
    if (opt.disabled) return;
    const isSelected = value.includes(opt.value);
    const next = isSelected
      ? value.filter((v) => v !== opt.value)
      : [...value, opt.value];
    onChange?.(next);
  }

  function removeTag(optValue: string, e: React.MouseEvent) {
    e.stopPropagation();
    onChange?.(value.filter((v) => v !== optValue));
  }

  function clearAll(e: React.MouseEvent) {
    e.stopPropagation();
    onChange?.([]);
  }

  function moveActive(dir: 1 | -1) {
    setActiveIndex((i) => {
      let next = i + dir;
      while (next >= 0 && next < filtered.length && filtered[next].disabled) next += dir;
      if (next < 0 || next >= filtered.length) return i;
      return next;
    });
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
          toggleOption(filtered[activeIndex]);
        }
        break;
      case "Tab":
        closeMenu();
        break;
    }
  }

  // Tags to display in the trigger
  const visibleTags = selected.slice(0, maxDisplay);
  const overflowCount = selected.length - maxDisplay;

  return (
    <>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={error ? true : undefined}
        disabled={disabled}
        onClick={() => (open ? closeMenu() : openMenu())}
        className={cn(
          "flex min-h-9 w-full items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5 text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
          error
            ? "border-destructive focus-visible:ring-destructive/30"
            : "border-input",
          className
        )}
      >
        {/* Tags */}
        <div className="flex flex-1 flex-wrap gap-1">
          {selected.length === 0 && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          {visibleTags.map((opt) => (
            <span
              key={opt.value}
              className="inline-flex items-center gap-0.5 rounded-sm bg-secondary px-1.5 py-0.5 text-[12px] font-medium text-secondary-foreground"
            >
              {opt.label}
              <span
                role="button"
                aria-label={`Remove ${opt.label}`}
                onClick={(e) => removeTag(opt.value, e)}
                className="ml-0.5 rounded-sm hover:bg-accent hover:text-accent-foreground"
              >
                <X className="h-3 w-3" />
              </span>
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-[12px] font-medium text-muted-foreground">
              +{overflowCount}
            </span>
          )}
        </div>

        {/* Right side controls */}
        <div className="ml-auto flex flex-shrink-0 items-center gap-1">
          {selected.length > 0 && (
            <span
              role="button"
              aria-label="Clear all"
              onClick={clearAll}
              className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-fast",
              open && "rotate-180"
            )}
          />
        </div>
      </button>

      <PopoverPanel
        anchorRef={triggerRef}
        open={open}
        onClose={closeMenu}
      >
        {/* Search */}
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
          />
        </div>

        {/* Options */}
        <ul role="listbox" className="max-h-52 overflow-y-auto py-1">
          {filtered.map((opt, i) => {
            const isSelected = value.includes(opt.value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled}
                onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
                onClick={() => toggleOption(opt)}
                className={cn(
                  "flex cursor-pointer select-none items-center gap-2.5 px-3 py-1.5 text-sm",
                  opt.disabled && "pointer-events-none opacity-40",
                  i === activeIndex
                    ? "bg-accent text-accent-foreground"
                    : "text-popover-foreground"
                )}
              >
                {/* Checkbox indicator */}
                <div
                  className={cn(
                    "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-input bg-background"
                  )}
                >
                  {isSelected && (
                    <Check className="h-2.5 w-2.5 text-primary-foreground" strokeWidth={3} />
                  )}
                </div>
                <span className="flex-1 truncate">{opt.label}</span>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No results
            </li>
          )}
        </ul>

        {/* Footer: selected count + clear */}
        {selected.length > 0 && (
          <div className="flex items-center justify-between border-t border-border px-3 py-2">
            <span className="text-[11.5px] text-muted-foreground">
              {selected.length} selected
            </span>
            <button
              type="button"
              onClick={() => onChange?.([])}
              className="text-[11.5px] text-muted-foreground hover:text-destructive"
            >
              Clear all
            </button>
          </div>
        )}
      </PopoverPanel>
    </>
  );
}
