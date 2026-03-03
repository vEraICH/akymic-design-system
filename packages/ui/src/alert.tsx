import * as React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "./lib/utils";

export type AlertVariant = "default" | "info" | "success" | "warning" | "destructive";

const variantStyles: Record<AlertVariant, string> = {
  default:     "border-border bg-muted/50 text-foreground",
  info:        "border-primary/20 bg-primary/10 text-primary",
  success:     "border-success/20 bg-success/10 text-success",
  warning:     "border-warning/20 bg-warning/10 text-warning",
  destructive: "border-destructive/20 bg-destructive/10 text-destructive",
};

const variantIcons: Record<AlertVariant, React.ElementType> = {
  default:     Info,
  info:        Info,
  success:     CheckCircle,
  warning:     AlertTriangle,
  destructive: AlertCircle,
};

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: React.ReactNode;
  /** Show an X button to dismiss (caller manages visibility) */
  onDismiss?: () => void;
  /** Override the default icon or pass null to hide it */
  icon?: React.ReactNode | null;
  className?: string;
}

export function Alert({
  variant = "default",
  title,
  children,
  onDismiss,
  icon,
  className,
}: AlertProps) {
  const DefaultIcon = variantIcons[variant];
  const resolvedIcon = icon === null ? null : icon ?? <DefaultIcon className="h-4 w-4 flex-shrink-0" strokeWidth={2} />;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3",
        variantStyles[variant],
        className
      )}
    >
      {resolvedIcon && <span className="mt-0.5">{resolvedIcon}</span>}
      <div className="flex flex-1 flex-col gap-1">
        {title && (
          <p className="text-sm font-semibold leading-snug">{title}</p>
        )}
        {children && (
          <div className="text-sm opacity-90">{children}</div>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="ml-auto flex h-5 w-5 flex-shrink-0 items-center justify-center rounded opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export function AlertTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm font-semibold leading-snug", className)}>{children}</p>;
}

export function AlertDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("text-sm opacity-90", className)}>{children}</div>;
}
