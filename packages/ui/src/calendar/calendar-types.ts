export type CalendarView = "month" | "week" | "day";

export type CalendarEventColor =
  | "primary"
  | "secondary"
  | "destructive"
  | "accent"
  | "muted";

export interface CalendarEvent {
  id: string;
  title: string;
  /** ISO date string, e.g. "2026-03-15" */
  date: string;
  color?: CalendarEventColor;
  allDay?: boolean;
}

// ── Component prop interfaces ──────────────────────────────────────────────────

export interface CalendarEventChipProps {
  event: CalendarEvent;
  onClick?: (event: CalendarEvent) => void;
  className?: string;
}

export interface CalendarDayCellProps {
  date: Date;
  /** Whether this cell is in the currently displayed month */
  isCurrentMonth: boolean;
  isSelected?: boolean;
  events?: CalendarEvent[];
  maxEvents?: number;
  onClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  /** Mini-calendar mode: smaller cells, no event chips */
  mini?: boolean;
  /** Roving tabindex — controlled by parent grid */
  tabIndex?: number;
  /** Called when cell receives focus — used to sync focusedDate in parent */
  onFocus?: () => void;
  /** ISO date string for data-date attribute used by grid keyboard nav */
  dataDate?: string;
}

export interface CalendarToolbarProps {
  currentDate: Date;
  view: CalendarView;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange?: (view: CalendarView) => void;
  showViewSwitcher?: boolean;
}

export interface CalendarMiniMonthProps {
  /** Currently selected date */
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export interface CalendarMonthGridProps {
  currentDate: Date;
  events?: CalendarEvent[];
  selectedDate?: Date;
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  maxEventsPerCell?: number;
  /** Called when arrow-key navigation crosses a month boundary */
  onMonthChange?: (date: Date) => void;
}

export interface CalendarProps {
  /** Controlled current date (month shown) */
  date?: Date;
  defaultDate?: Date;
  /** Controlled view */
  view?: CalendarView;
  defaultView?: CalendarView;
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  showSidebar?: boolean;
  showViewSwitcher?: boolean;
  className?: string;
}
