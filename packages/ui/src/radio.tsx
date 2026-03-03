"use client";

import React, {
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
} from "react";
import { cn } from "./lib/utils";

// ---------------------------------------------------------------------------
// RadioGroup context
// ---------------------------------------------------------------------------

interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error("Radio must be used inside RadioGroup");
  return ctx;
}

// ---------------------------------------------------------------------------
// RadioGroup
// ---------------------------------------------------------------------------

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
  children: React.ReactNode;
}

export function RadioGroup({
  value: controlledValue,
  defaultValue = "",
  onChange,
  disabled,
  name: nameProp,
  className,
  children,
}: RadioGroupProps) {
  const generatedName = useId();
  const name = nameProp ?? generatedName;

  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  function handleChange(v: string) {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  }

  // Arrow key navigation across Radio children
  const groupRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const inputs = Array.from(
      groupRef.current?.querySelectorAll<HTMLInputElement>(
        'input[type="radio"]:not([disabled])'
      ) ?? []
    );
    if (!inputs.length) return;

    const current = document.activeElement as HTMLInputElement;
    const idx = inputs.indexOf(current);

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = inputs[(idx + 1) % inputs.length];
      next.focus();
      handleChange(next.value);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = inputs[(idx - 1 + inputs.length) % inputs.length];
      prev.focus();
      handleChange(prev.value);
    }
  }

  return (
    <RadioGroupContext.Provider value={{ value, onChange: handleChange, disabled, name }}>
      <div
        ref={groupRef}
        role="radiogroup"
        className={cn("flex flex-col gap-2", className)}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Radio
// ---------------------------------------------------------------------------

export interface RadioProps {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, description, disabled: localDisabled, size = "md", className },
  ref
) {
  const { value: groupValue, onChange, disabled: groupDisabled, name } = useRadioGroup();
  const id = useId();
  const disabled = localDisabled ?? groupDisabled;
  const checked = groupValue === value;

  const sizeClasses = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <input
        ref={ref}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        role="radio"
        aria-checked={checked}
        // Roving tabindex: focused item is 0, others -1
        tabIndex={checked ? 0 : -1}
        onChange={() => onChange(value)}
        className={cn(
          sizeClasses,
          "mt-0.5 cursor-pointer appearance-none rounded-full border border-input bg-background",
          "transition-colors duration-150",
          "checked:border-primary checked:bg-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Inner dot via box-shadow
          "checked:shadow-[inset_0_0_0_3px_hsl(var(--background))]"
        )}
      />
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "cursor-pointer select-none font-medium leading-none",
                size === "sm" ? "text-xs" : "text-sm",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {label}
            </label>
          )}
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
      )}
    </div>
  );
});
