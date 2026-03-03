import * as React from "react";
import { cn } from "./lib/utils";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | "warning";

type BadgeSize = "sm" | "default";

const variantClasses: Record<BadgeVariant, string> = {
  default:     "bg-primary text-primary-foreground",
  secondary:   "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outline:     "border border-border bg-transparent text-foreground",
  success:     "bg-success text-success-foreground",
  warning:     "bg-warning text-warning-foreground",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm:      "px-1.5 py-px text-[10px]",
  default: "px-2 py-0.5 text-xs",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function Badge({
  className,
  variant = "default",
  size = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium leading-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
