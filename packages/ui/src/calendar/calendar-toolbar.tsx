import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../button";
import { formatMonthYear } from "../lib/calendar-utils";
import { type CalendarToolbarProps, type CalendarView } from "./calendar-types";

const VIEWS: { value: CalendarView; label: string }[] = [
  { value: "month", label: "Month" },
  { value: "week",  label: "Week" },
  { value: "day",   label: "Day" },
];

export function CalendarToolbar({
  currentDate,
  view,
  onPrev,
  onNext,
  onToday,
  onViewChange,
  showViewSwitcher = true,
}: CalendarToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      {/* Left: Today + nav arrows */}
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          aria-label="Previous month"
          className="h-7 w-7"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          aria-label="Next month"
          className="h-7 w-7"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Center: Month + year */}
      <h2 className="text-sm font-semibold tracking-tight text-foreground">
        {formatMonthYear(currentDate)}
      </h2>

      {/* Right: View switcher */}
      {showViewSwitcher && onViewChange ? (
        <div className="flex items-center rounded-md border border-border bg-muted p-0.5">
          {VIEWS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onViewChange(value)}
              className={cn(
                "rounded px-2.5 py-1 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                view === value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      ) : (
        /* Spacer to keep heading centered when no switcher */
        <div className="w-[calc(56px+8px+8px+56px)]" />
      )}
    </div>
  );
}
