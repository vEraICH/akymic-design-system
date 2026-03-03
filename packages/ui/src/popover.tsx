"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";

export interface PopoverPanelProps {
  /** Ref to the anchor element the panel positions itself below */
  anchorRef: { current: HTMLElement | null };
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** Gap (px) between anchor bottom and panel top. Default 4. */
  sideOffset?: number;
  /** Apply anchor width as panel min-width. Default true. */
  matchWidth?: boolean;
}

export function PopoverPanel({
  anchorRef,
  open,
  onClose,
  children,
  className,
  sideOffset = 4,
  matchWidth = true,
}: PopoverPanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  const measure = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Clamp left so the panel doesn't overflow the right edge of the viewport
    const clampedLeft = Math.min(rect.left, window.innerWidth - 8);
    setPanelStyle({
      position: "fixed",
      top: rect.bottom + sideOffset,
      left: clampedLeft,
      ...(matchWidth ? { minWidth: rect.width } : {}),
    });
  }, [anchorRef, sideOffset, matchWidth]);

  // Re-measure on open and on scroll/resize
  useEffect(() => {
    if (!open) return;
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open, measure]);

  // Click-outside to close
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      if (
        contentRef.current?.contains(target) ||
        anchorRef.current?.contains(target)
      )
        return;
      onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, anchorRef]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        if (anchorRef.current instanceof HTMLElement) {
          anchorRef.current.focus();
        }
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={contentRef}
      style={panelStyle}
      className={cn(
        "z-50 overflow-hidden rounded-md border border-border bg-popover shadow-floating",
        className
      )}
    >
      {children}
    </div>,
    document.body
  );
}
