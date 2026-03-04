"use client";

import React, {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "./lib/utils";

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type" | "size"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      checked,
      defaultChecked,
      onChange,
      indeterminate = false,
      disabled = false,
      size = "md",
      className,
      ...props
    },
    forwardedRef
  ) {
    const internalRef = useRef<HTMLInputElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLInputElement>) ?? internalRef;

    // Sync indeterminate (not a real HTML attribute, must be set via JS)
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    const sizeClasses = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

    return (
      <input
        {...props}
        ref={ref}
        type="checkbox"
        role="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className={cn(
          sizeClasses,
          "cursor-pointer appearance-none rounded-sm border border-input bg-background",
          "transition-colors duration-fast",
          "checked:border-primary checked:bg-primary",
          "indeterminate:border-primary indeterminate:bg-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Custom checkmark via background-image (inline SVG)
          "checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M2%206l3%203%205-5%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat",
          className
        )}
      />
    );
  }
);

// ---------------------------------------------------------------------------
// CheckboxField — label + optional description wrapper
// ---------------------------------------------------------------------------

export interface CheckboxFieldProps {
  label: string;
  description?: string;
  size?: "sm" | "md";
  checkboxProps?: CheckboxProps;
  className?: string;
}

export function CheckboxField({
  label,
  description,
  size = "md",
  checkboxProps,
  className,
}: CheckboxFieldProps) {
  const id = useId();

  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <Checkbox
        {...checkboxProps}
        id={id}
        size={size}
        className={cn("mt-0.5", checkboxProps?.className)}
      />
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className={cn(
            "cursor-pointer select-none font-medium leading-none",
            size === "sm" ? "text-xs" : "text-sm",
            checkboxProps?.disabled && "cursor-not-allowed opacity-50"
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
    </div>
  );
}
