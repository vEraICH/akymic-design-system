"use client";

import React from "react";
import { cn } from "./lib/utils";

// ---------------------------------------------------------------------------
// Breadcrumb (nav wrapper)
// ---------------------------------------------------------------------------

export interface BreadcrumbProps {
  className?: string;
  children: React.ReactNode;
}

export function Breadcrumb({ className, children }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex items-center flex-wrap gap-1">{children}</ol>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbItem
// ---------------------------------------------------------------------------

export interface BreadcrumbItemProps {
  className?: string;
  children: React.ReactNode;
}

export function BreadcrumbItem({ className, children }: BreadcrumbItemProps) {
  return (
    <li className={cn("flex items-center gap-1", className)}>{children}</li>
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbLink
// ---------------------------------------------------------------------------

export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  current?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function BreadcrumbLink({
  href,
  current = false,
  className,
  children,
  ...props
}: BreadcrumbLinkProps) {
  return (
    <a
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "text-sm transition-colors duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm",
        current
          ? "font-medium text-foreground pointer-events-none"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbSeparator
// ---------------------------------------------------------------------------

export interface BreadcrumbSeparatorProps {
  className?: string;
}

export function BreadcrumbSeparator({ className }: BreadcrumbSeparatorProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("text-muted-foreground select-none", className)}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4.5 2.5L7.5 6L4.5 9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbEllipsis
// ---------------------------------------------------------------------------

export interface BreadcrumbEllipsisProps {
  className?: string;
}

export function BreadcrumbEllipsis({ className }: BreadcrumbEllipsisProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("text-muted-foreground select-none text-sm", className)}
    >
      &hellip;
    </span>
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbList — convenience wrapper from segments array
// ---------------------------------------------------------------------------

export interface BreadcrumbSegment {
  label: string;
  href: string;
}

export interface BreadcrumbListProps {
  segments: BreadcrumbSegment[];
  className?: string;
}

export function BreadcrumbList({ segments, className }: BreadcrumbListProps) {
  return (
    <Breadcrumb className={className}>
      {segments.map((seg, i) => {
        const isCurrent = i === segments.length - 1;
        return (
          <BreadcrumbItem key={seg.href}>
            <BreadcrumbLink href={seg.href} current={isCurrent}>
              {seg.label}
            </BreadcrumbLink>
            {!isCurrent && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
