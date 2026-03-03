"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { addMonths } from "../lib/calendar-utils";
import { CalendarToolbar } from "./calendar-toolbar";
import { CalendarMiniMonth } from "./calendar-mini-month";
import { CalendarMonthGrid } from "./calendar-month-grid";
import { type CalendarProps, type CalendarView } from "./calendar-types";

export function Calendar({
  date: controlledDate,
  defaultDate,
  view: controlledView,
  defaultView = "month",
  events = [],
  onDateClick,
  onEventClick,
  showSidebar = false,
  showViewSwitcher = true,
  className,
}: CalendarProps) {
  const isControlledDate = controlledDate !== undefined;
  const isControlledView = controlledView !== undefined;

  const [internalDate, setInternalDate] = React.useState<Date>(
    () => defaultDate ?? new Date()
  );
  const [internalView, setInternalView] = React.useState<CalendarView>(defaultView);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

  const currentDate = isControlledDate ? controlledDate : internalDate;
  const view = isControlledView ? controlledView : internalView;

  function setDate(d: Date) {
    if (!isControlledDate) setInternalDate(d);
  }

  function setView(v: CalendarView) {
    if (!isControlledView) setInternalView(v);
  }

  function handlePrev() {
    setDate(addMonths(currentDate, -1));
  }

  function handleNext() {
    setDate(addMonths(currentDate, 1));
  }

  function handleToday() {
    setDate(new Date());
  }

  function handleDateClick(date: Date) {
    setSelectedDate(date);
    onDateClick?.(date);
  }

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-border bg-background",
        className
      )}
    >
      {/* Toolbar */}
      <CalendarToolbar
        currentDate={currentDate}
        view={view}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        onViewChange={showViewSwitcher ? setView : undefined}
        showViewSwitcher={showViewSwitcher}
      />

      <div className="flex flex-1 overflow-hidden border-t border-border">
        {/* Optional sidebar */}
        {showSidebar && (
          <div className="hidden flex-shrink-0 flex-col gap-6 border-r border-border p-4 md:flex">
            <CalendarMiniMonth
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setDate(new Date(date.getFullYear(), date.getMonth(), 1));
                onDateClick?.(date);
              }}
            />
          </div>
        )}

        {/* Main view */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {view === "month" && (
            <CalendarMonthGrid
              currentDate={currentDate}
              events={events}
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
              onEventClick={onEventClick}
              onMonthChange={setDate}
            />
          )}
          {view !== "month" && (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              {view === "week" ? "Week" : "Day"} view — coming in Phase 2
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
