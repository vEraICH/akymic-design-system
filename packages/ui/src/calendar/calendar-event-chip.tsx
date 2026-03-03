import * as React from "react";
import { cn } from "../lib/utils";
import { type CalendarEventChipProps, type CalendarEventColor } from "./calendar-types";

const colorClasses: Record<CalendarEventColor, string> = {
  primary:     "bg-primary/15 text-primary",
  secondary:   "bg-secondary text-secondary-foreground border border-border",
  destructive: "bg-destructive/15 text-destructive",
  accent:      "bg-accent text-accent-foreground",
  muted:       "bg-muted text-muted-foreground",
};

export function CalendarEventChip({ event, onClick, className }: CalendarEventChipProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(event)}
      className={cn(
        "w-full truncate rounded px-1.5 py-0.5 text-left text-[11px] font-medium leading-[18px]",
        "transition-opacity hover:opacity-80",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        colorClasses[event.color ?? "primary"],
        className
      )}
      title={event.title}
    >
      {event.title}
    </button>
  );
}
