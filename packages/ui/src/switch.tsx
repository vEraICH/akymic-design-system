"use client";

import React, { forwardRef, useId, useState } from "react";
import { cn } from "./lib/utils";

// ---------------------------------------------------------------------------
// Switch
// ---------------------------------------------------------------------------

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  className?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    disabled = false,
    size = "md",
    className,
    ...ariaProps
  },
  ref
) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  function toggle() {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  }

  const trackSize = size === "sm" ? "h-5 w-9" : "h-6 w-11";
  const thumbSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const thumbTranslate = size === "sm"
    ? checked ? "translate-x-[18px]" : "translate-x-[3px]"
    : checked ? "translate-x-[22px]" : "translate-x-[4px]";

  return (
    <button
      {...ariaProps}
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={cn(
        trackSize,
        "relative inline-flex cursor-pointer items-center rounded-full border-2 border-transparent",
        "transition-colors duration-normal ease-standard",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-input",
        className
      )}
    >
      <span
        className={cn(
          thumbSize,
          "pointer-events-none block rounded-full bg-background shadow-sm ring-0",
          "transition-transform duration-normal ease-standard",
          thumbTranslate
        )}
      />
    </button>
  );
});

// ---------------------------------------------------------------------------
// SwitchField — label + description wrapper
// ---------------------------------------------------------------------------

export interface SwitchFieldProps {
  label: string;
  description?: string;
  size?: "sm" | "md";
  switchProps?: SwitchProps;
  className?: string;
}

export function SwitchField({
  label,
  description,
  size = "md",
  switchProps,
  className,
}: SwitchFieldProps) {
  const id = useId();

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className={cn(
            "cursor-pointer select-none font-medium leading-none",
            size === "sm" ? "text-xs" : "text-sm",
            switchProps?.disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label}
        </label>
        {description && (
          <p
            className={cn(
              "mt-0.5 text-muted-foreground",
              size === "sm" ? "text-xs" : "text-sm"
            )}
          >
            {description}
          </p>
        )}
      </div>
      <Switch {...switchProps} id={id} size={size} />
    </div>
  );
}
