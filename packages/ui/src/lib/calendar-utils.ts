// Pure date math helpers — no React, no external deps

/** Returns a matrix of Date objects for the calendar month view (6 rows × 7 cols). */
export function getMonthMatrix(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Week starts on Sunday (0); adjust to Monday (1)
  const startOffset = (firstDay.getDay() + 6) % 7; // 0=Mon … 6=Sun
  const endOffset = (7 - ((lastDay.getDay() + 1) % 7)) % 7;

  const days: Date[] = [];

  // Previous month tail
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i));
  }
  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  // Next month head
  for (let i = 1; i <= endOffset; i++) {
    days.push(new Date(year, month + 1, i));
  }
  // Pad to full 6-week grid
  while (days.length < 42) {
    const last = days[days.length - 1];
    days.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }

  const matrix: Date[][] = [];
  for (let row = 0; row < 6; row++) {
    matrix.push(days.slice(row * 7, row * 7 + 7));
  }
  return matrix;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function isSameMonth(date: Date, month: number, year: number): boolean {
  return date.getMonth() === month && date.getFullYear() === year;
}

export function addMonths(date: Date, delta: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + delta, 1);
  return d;
}

export function addDays(date: Date, delta: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + delta);
  return d;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatMonthYear(date: Date, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(date);
}

export function formatDay(date: Date, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
}

/** Short weekday names starting from Monday. */
export function getWeekdayLabels(locale = "en-US"): string[] {
  // Use a known Monday (2024-01-01 is a Monday)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, 1 + i);
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d);
  });
}
