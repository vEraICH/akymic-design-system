import * as React from "react";
import { cn } from "../lib/utils";
import {
  addDays,
  addMonths,
  formatMonthYear,
  getMonthMatrix,
  getWeekdayLabels,
  isSameDay,
  isSameMonth,
} from "../lib/calendar-utils";
import { CalendarDayCell } from "./calendar-day-cell";
import { type CalendarMonthGridProps, type CalendarEvent } from "./calendar-types";

function eventsForDate(events: CalendarEvent[], date: Date): CalendarEvent[] {
  const iso = toISO(date);
  return events.filter((e) => e.date === iso);
}

function toISO(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function CalendarMonthGrid({
  currentDate,
  events = [],
  selectedDate,
  onDateClick,
  onEventClick,
  maxEventsPerCell = 3,
  onMonthChange,
}: CalendarMonthGridProps) {
  const [focusedDate, setFocusedDate] = React.useState<Date | null>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  // Stores ISO of a date to focus after the month re-renders
  const pendingFocusRef = React.useRef<string | null>(null);

  const matrix = React.useMemo(
    () => getMonthMatrix(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate]
  );

  const weekdays = React.useMemo(() => getWeekdayLabels(), []);

  // Roving tabindex entry point when no date has been keyboard-focused yet
  const initialFocusDate = React.useMemo(() => {
    if (selectedDate) return selectedDate;
    const today = new Date();
    if (isSameMonth(today, currentDate.getMonth(), currentDate.getFullYear())) return today;
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }, [selectedDate, currentDate]);

  // Apply pending cross-month focus after currentDate (and thus cells) update
  React.useEffect(() => {
    if (!pendingFocusRef.current) return;
    const el = gridRef.current?.querySelector<HTMLElement>(`[data-date="${pendingFocusRef.current}"]`);
    if (el) {
      pendingFocusRef.current = null;
      el.focus();
    }
  }, [currentDate]);

  function focusCell(date: Date) {
    setFocusedDate(date);
    const iso = toISO(date);
    requestAnimationFrame(() => {
      const el = gridRef.current?.querySelector<HTMLElement>(`[data-date="${iso}"]`);
      if (el) {
        el.focus();
      } else {
        // Cell is not in current month view — store as pending and navigate month
        pendingFocusRef.current = iso;
        onMonthChange?.(new Date(date.getFullYear(), date.getMonth(), 1));
      }
    });
  }

  function handleGridKeyDown(e: React.KeyboardEvent) {
    const anchor = focusedDate ?? initialFocusDate;
    let next: Date | null = null;

    switch (e.key) {
      case "ArrowLeft":  next = addDays(anchor, -1);  break;
      case "ArrowRight": next = addDays(anchor,  1);  break;
      case "ArrowUp":    next = addDays(anchor, -7);  break;
      case "ArrowDown":  next = addDays(anchor,  7);  break;
      case "PageUp":     next = addMonths(anchor, -1); break;
      case "PageDown":   next = addMonths(anchor,  1); break;
      case "Home":       next = new Date(anchor.getFullYear(), anchor.getMonth(), 1); break;
      case "End":        next = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0); break;
      default: return;
    }

    e.preventDefault();
    focusCell(next);
  }

  const allDates = matrix.flat();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Weekday header row */}
      <div role="row" className="grid grid-cols-7 border-b border-border">
        {weekdays.map((day, i) => (
          <div
            key={i}
            role="columnheader"
            aria-label={day}
            className="flex h-9 items-center justify-center border-r border-border last:border-r-0"
          >
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* 6-week grid */}
      <div
        ref={gridRef}
        role="grid"
        aria-label={formatMonthYear(currentDate)}
        className="grid flex-1 grid-cols-7 grid-rows-6"
        onKeyDown={handleGridKeyDown}
      >
        {allDates.map((date) => {
          const isCurrentMonth = isSameMonth(
            date,
            currentDate.getMonth(),
            currentDate.getFullYear()
          );
          const dayEvents = eventsForDate(events, date);
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          const iso = toISO(date);
          const anchor = focusedDate ?? initialFocusDate;
          const isFocused = isSameDay(date, anchor);

          return (
            <CalendarDayCell
              key={iso}
              date={date}
              isCurrentMonth={isCurrentMonth}
              isSelected={isSelected}
              events={dayEvents}
              maxEvents={maxEventsPerCell}
              onClick={onDateClick}
              onEventClick={onEventClick}
              tabIndex={isFocused ? 0 : -1}
              onFocus={() => setFocusedDate(date)}
              dataDate={iso}
            />
          );
        })}
      </div>
    </div>
  );
}
