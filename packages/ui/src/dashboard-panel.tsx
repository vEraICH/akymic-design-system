"use client";

import React from "react";
import { cn } from "./lib/utils";
import { Badge, type BadgeVariant } from "./badge";
import { Skeleton } from "./skeleton";
import { EmptyState } from "./empty-state";
import { Tooltip } from "./tooltip";
import { DropdownMenu, DropdownItem } from "./dropdown";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DashboardPanelAction {
  label: string;
  onSelect: () => void;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DashboardPanelProps {
  /** Panel heading — keep to one sentence fragment */
  title: string;
  /** Data range or scope descriptor below the title */
  subtitle?: string;
  /** Leading icon in the header, 16×16, decorative */
  icon?: React.ReactNode;
  /** Rendered as a `<Badge>` after the title */
  badge?: { label: string; variant?: BadgeVariant };
  /** Content for the info tooltip; triggers a `ⓘ` icon button */
  info?: string | React.ReactNode;
  /** Items for the `⋯` actions dropdown. Empty hides the menu. */
  actions?: DashboardPanelAction[];
  /** Rendered between header and body; state managed by caller */
  filters?: React.ReactNode;
  /** When true, renders a Skeleton in the body instead of children */
  loading?: boolean;
  /** Height of the skeleton block when loading */
  loadingHeight?: number | string;
  /** When true and not loading, renders the emptyState slot */
  empty?: boolean;
  /** Custom empty state; falls back to a generic <EmptyState> */
  emptyState?: React.ReactNode;
  /** CSS Grid column span in the parent DashboardLayout (1–12) */
  colSpan?: number;
  /** CSS Grid row span (1–6) */
  rowSpan?: number;
  className?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Icons (inline, zero-dep)
// ---------------------------------------------------------------------------

function InfoCircleIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EllipsisIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM14 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// DashboardPanel
// ---------------------------------------------------------------------------

export function DashboardPanel({
  title,
  subtitle,
  icon,
  badge,
  info,
  actions = [],
  filters,
  loading = false,
  loadingHeight = "10rem",
  empty = false,
  emptyState,
  colSpan = 12,
  rowSpan = 1,
  className,
  bodyClassName,
  children,
}: DashboardPanelProps) {
  const height =
    typeof loadingHeight === "number" ? `${loadingHeight}px` : loadingHeight;

  return (
    <section
      aria-label={title}
      style={{ gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}` }}
      className={cn(
        "overflow-hidden rounded-lg border bg-card text-card-foreground shadow-resting",
        className
      )}
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1 px-4 pb-3 pt-4">
        <div className="flex min-w-0 items-center gap-2">
          {icon && (
            <span
              aria-hidden="true"
              className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground"
            >
              {icon}
            </span>
          )}

          <span className="flex-1 min-w-0 truncate text-sm font-medium text-card-foreground">
            {title}
          </span>

          {badge && (
            <Badge variant={badge.variant} size="sm" className="shrink-0">
              {badge.label}
            </Badge>
          )}

          {info && (
            <Tooltip content={info}>
              <button
                type="button"
                aria-label={`More information about ${title}`}
                className={cn(
                  "shrink-0 rounded-sm text-muted-foreground hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <InfoCircleIcon />
              </button>
            </Tooltip>
          )}

          {actions.length > 0 && (
            <DropdownMenu
              align="end"
              trigger={
                <button
                  type="button"
                  aria-label="More actions"
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-sm",
                    "text-muted-foreground hover:bg-accent hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  <EllipsisIcon />
                </button>
              }
            >
              {actions.map((action) => (
                <DropdownItem
                  key={action.label}
                  onSelect={action.onSelect}
                  variant={action.variant}
                  icon={action.icon}
                  disabled={action.disabled}
                >
                  {action.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      {filters && (
        <div className="border-t border-border px-4 py-2">{filters}</div>
      )}

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div
        aria-busy={loading ? "true" : undefined}
        className={cn("min-h-[6rem] px-4 pb-4", bodyClassName)}
      >
        {loading ? (
          <Skeleton style={{ height }} className="w-full" />
        ) : empty ? (
          <div role="status">
            {emptyState ?? (
              <EmptyState
                title="No data available"
                description="There is nothing to show here yet."
              />
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
