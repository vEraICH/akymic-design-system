import * as React from "react";
import { cn } from "./lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "resize-y transition-colors",
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
Textarea.displayName = "Textarea";
