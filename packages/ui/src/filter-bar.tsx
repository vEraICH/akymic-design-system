import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "./lib/utils";
import { Badge } from "./badge";

export interface FilterChip {
  /** Display label shown inside the badge chip. */
  label: string;
  /** Unique key for this chip. */
  value: string;
  onRemove: () => void;
}

export interface FilterBarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  /** Active filter chips shown alongside the search box. */
  chips?: FilterChip[];
  placeholder?: string;
  className?: string;
}

export function FilterBar({
  search = "",
  onSearchChange,
  chips = [],
  placeholder = "Search…",
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Search input */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.75}
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-8 min-w-[200px] rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "transition-colors"
          )}
        />
      </div>

      {/* Active filter chips */}
      {chips.map((chip) => (
        <Badge key={chip.value} variant="secondary" className="gap-1 pr-1">
          {chip.label}
          <button
            type="button"
            onClick={chip.onRemove}
            className="rounded-sm opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-label={`Remove ${chip.label} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
