"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import {
  addMonths,
  formatMonthYear,
  getMonthMatrix,
  getWeekdayLabels,
  isSameDay,
  isSameMonth,
} from "../lib/calendar-utils";
import { CalendarDayCell } from "./calendar-day-cell";
import { type CalendarMiniMonthProps } from "./calendar-types";

export function CalendarMiniMonth({
  selected,
  onSelect,
  className,
}: CalendarMiniMonthProps) {
  const [viewDate, setViewDate] = React.useState<Date>(() => {
    const d = selected ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const matrix = React.useMemo(
    () => getMonthMatrix(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const weekdays = React.useMemo(() => getWeekdayLabels(), []);

  function prev() { setViewDate((d) => addMonths(d, -1)); }
  function next() { setViewDate((d) => addMonths(d, 1)); }

  return (
    <div className={cn("w-[224px] select-none", className)}>
      {/* Mini toolbar */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">
          {formatMonthYear(viewDate)}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous month"
            className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next month"
            className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="mb-1 grid grid-cols-7">
        {weekdays.map((d) => (
          <div
            key={d}
            className="flex h-7 w-7 items-center justify-center text-[10px] font-medium text-muted-foreground"
          >
            {d[0]}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {matrix.flat().map((date, i) => (
          <CalendarDayCell
            key={i}
            date={date}
            isCurrentMonth={isSameMonth(date, viewDate.getMonth(), viewDate.getFullYear())}
            isSelected={selected ? isSameDay(date, selected) : false}
            onClick={onSelect}
            mini
          />
        ))}
      </div>
    </div>
  );
}
