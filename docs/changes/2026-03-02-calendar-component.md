# Calendar Component — Phase 1

**Date:** 2026-03-02
**Scope:** New multi-file component (month view, mini calendar, toolbar, event chips)

---

## Summary

Added a zero-dependency Calendar component built entirely on the native `Date` API and existing DS tokens. No new tokens required — all states map to the existing semantic token set.

---

## Files Added

```
src/lib/calendar-utils.ts
src/components/ui/calendar/
  calendar-types.ts
  calendar-event-chip.tsx
  calendar-day-cell.tsx
  calendar-toolbar.tsx
  calendar-mini-month.tsx
  calendar-month-grid.tsx
  calendar.tsx
  index.ts
```

---

## Component API

```tsx
// Full calendar (controlled or uncontrolled)
<Calendar
  events={events}
  showSidebar
  showViewSwitcher
  onDateClick={(date) => console.log(date)}
  onEventClick={(event) => console.log(event)}
  className="h-[600px]"
/>

// Mini date picker
<CalendarMiniMonth
  selected={selectedDate}
  onSelect={setSelectedDate}
/>

// Standalone event chip
<CalendarEventChip event={event} />
```

---

## Token Mapping

| Element | Token |
|---|---|
| Today circle | `bg-primary text-primary-foreground` |
| Selected cell | `bg-accent/20`, mini: `bg-accent text-accent-foreground` |
| Outside month | `text-muted-foreground/50` |
| Hover cell | `hover:bg-accent/30` |
| Grid lines | `border-border` |
| Day name headers | `text-muted-foreground` |
| Focus ring | `ring-2 ring-ring` |
| Event chips | `bg-{color}/15 text-{color}` |
| View switcher active | `bg-background shadow-sm` |

---

## Event Colors

| Value | Surface | Text |
|---|---|---|
| `primary` | `bg-primary/15` | `text-primary` |
| `secondary` | `bg-secondary border-border` | `text-secondary-foreground` |
| `destructive` | `bg-destructive/15` | `text-destructive` |
| `accent` | `bg-accent` | `text-accent-foreground` |
| `muted` | `bg-muted` | `text-muted-foreground` |

---

## Migration Notes

No breaking changes. Pure addition.

---

## Verification Steps

1. `npx tsc --noEmit` — passes clean
2. `npm run build` — passes clean
3. `/paper-playground` — Calendar section shows mini picker + full month + sidebar variant
4. Light / dark mode — all tokens adapt correctly
5. Click navigation (prev/next/today) — updates displayed month
6. Event chips — correct colors per `CalendarEventColor` variant

---

## Future Phases

- **Phase 2:** Week view — vertical time grid, positioned event blocks, "now" indicator line
- **Phase 3:** Day view + Agenda list view
