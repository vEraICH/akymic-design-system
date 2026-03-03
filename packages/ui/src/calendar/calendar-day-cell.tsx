import * as React from "react";
import { cn } from "../lib/utils";
import { isToday } from "../lib/calendar-utils";
import { CalendarEventChip } from "./calendar-event-chip";
import { type CalendarDayCellProps } from "./calendar-types";

export function CalendarDayCell({
  date,
  isCurrentMonth,
  isSelected = false,
  events = [],
  maxEvents = 3,
  onClick,
  onEventClick,
  mini = false,
  tabIndex: tabIndexProp,
  onFocus,
  dataDate,
}: CalendarDayCellProps) {
  const today = isToday(date);
  const dayNum = date.getDate();

  const visibleEvents = events.slice(0, maxEvents);
  const overflow = events.length - visibleEvents.length;

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(date);
    }
  }

  if (mini) {
    return (
      <button
        type="button"
        onClick={() => onClick?.(date)}
        onKeyDown={handleKeyDown}
        aria-label={date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        aria-pressed={isSelected}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          !isCurrentMonth && "text-muted-foreground/50",
          isCurrentMonth && !today && !isSelected && "text-foreground hover:bg-accent hover:text-accent-foreground",
          today && !isSelected && "bg-primary text-primary-foreground",
          isSelected && !today && "bg-accent text-accent-foreground",
          isSelected && today && "bg-primary text-primary-foreground ring-2 ring-ring ring-offset-1",
        )}
      >
        {dayNum}
      </button>
    );
  }

  return (
    <div
      role="gridcell"
      tabIndex={tabIndexProp ?? 0}
      onClick={() => onClick?.(date)}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      aria-label={date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      aria-selected={isSelected}
      data-date={dataDate}
      className={cn(
        "group relative flex min-h-[90px] flex-col gap-1 border-b border-r border-border p-1.5",
        "cursor-pointer transition-colors hover:bg-accent/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        isSelected && "bg-accent/20",
      )}
    >
      {/* Day number */}
      <div className="flex items-center justify-end">
        <span
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
            !isCurrentMonth && "text-muted-foreground/50",
            isCurrentMonth && !today && "text-foreground",
            today && "bg-primary text-primary-foreground",
          )}
        >
          {dayNum}
        </span>
      </div>

      {/* Event chips */}
      <div className="flex flex-col gap-0.5">
        {visibleEvents.map((event) => (
          <CalendarEventChip
            key={event.id}
            event={event}
            onClick={onEventClick}
          />
        ))}
        {overflow > 0 && (
          <span className="px-1.5 text-[11px] text-muted-foreground">
            +{overflow} more
          </span>
        )}
      </div>
    </div>
  );
}
