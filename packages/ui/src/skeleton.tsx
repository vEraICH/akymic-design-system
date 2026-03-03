import * as React from "react";
import { cn } from "./lib/utils";

// ── Skeleton block ─────────────────────────────────────────────────────────────

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pulse animation (default true) */
  animate?: boolean;
}

export function Skeleton({ className, animate = true, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-md bg-muted",
        animate && "animate-pulse",
        className
      )}
      {...props}
    />
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────────

export type SpinnerSize = "sm" | "default" | "lg";

const spinnerSizes: Record<SpinnerSize, string> = {
  sm:      "h-4 w-4 border-2",
  default: "h-6 w-6 border-2",
  lg:      "h-9 w-9 border-[3px]",
};

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  /** Accessible label (default "Loading…") */
  label?: string;
}

export function Spinner({ size = "default", className, label = "Loading\u2026" }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn("inline-flex", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "animate-spin rounded-full border-border border-t-foreground",
          spinnerSizes[size]
        )}
      />
    </span>
  );
}
