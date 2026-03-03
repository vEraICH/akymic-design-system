import * as React from "react";
import { cn } from "./lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-md border bg-background px-3 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        error
          ? "border-destructive focus-visible:ring-destructive/30"
          : "border-input",
        className
      )}
      aria-invalid={error ? "true" : undefined}
      {...props}
    />
  )
);
Input.displayName = "Input";
