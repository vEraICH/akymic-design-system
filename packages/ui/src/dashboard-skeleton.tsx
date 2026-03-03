import * as React from "react";
import { cn } from "./lib/utils";
import { Skeleton } from "./skeleton";

const gapMap: Record<"sm" | "md" | "lg", string> = {
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
};

function defaultColSpan(columns: 4 | 6 | 8 | 12): number {
  if (columns === 12) return 4; // 3-up
  if (columns === 8) return 4;  // 2-up
  if (columns === 6) return 3;  // 2-up
  return 4;                     // 4-col: 1-up (full width)
}

export interface DashboardSkeletonProps {
  count?: number;
  columns?: 4 | 6 | 8 | 12;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export function DashboardSkeleton({
  count = 4,
  columns = 12,
  gap = "md",
  className,
}: DashboardSkeletonProps) {
  const colSpan = defaultColSpan(columns);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: gapMap[gap],
      }}
      className={cn(className)}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{ gridColumn: `span ${colSpan}` }}
          className="rounded-lg border bg-card p-4"
        >
          <Skeleton className="mb-3 h-4 w-2/5" />
          <Skeleton className="h-24 w-full" />
        </div>
      ))}
    </div>
  );
}
