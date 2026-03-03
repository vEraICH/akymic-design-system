"use client";

import React, { useId } from "react";
import { cn } from "./lib/utils";
import { DashboardSkeleton } from "./dashboard-skeleton";

const gapMap: Record<"sm" | "md" | "lg", string> = {
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
};

export interface DashboardLayoutProps {
  title?: string;
  description?: string;
  columns?: 4 | 6 | 8 | 12;
  gap?: "sm" | "md" | "lg";
  loading?: boolean;
  skeletonCount?: number;
  headerActions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function DashboardLayout({
  title,
  description,
  columns = 12,
  gap = "md",
  loading = false,
  skeletonCount = 4,
  headerActions,
  className,
  children,
}: DashboardLayoutProps) {
  const uid = useId();
  // Sanitize uid for use as a CSS ID — remove non-alphanumeric chars
  const gridId = `dl-${uid.replace(/[^a-zA-Z0-9]/g, "")}`;
  const hasHeader = title || description || headerActions;

  return (
    <div className={cn("w-full", className)}>
      {/*
       * Responsive collapse: inline style has higher specificity than Tailwind,
       * so we use a scoped @media rule to override gridTemplateColumns below md.
       */}
      <style>{`@media (max-width: 767px) { #${gridId} { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; } }`}</style>

      {hasHeader && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {headerActions && (
            <div className="flex shrink-0 items-center gap-2">{headerActions}</div>
          )}
        </div>
      )}

      {loading ? (
        <DashboardSkeleton count={skeletonCount} columns={columns} gap={gap} />
      ) : (
        <div
          id={gridId}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: gapMap[gap],
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
