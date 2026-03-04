"use client";

import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  className?: string;
  children: React.ReactElement;
}

// ---------------------------------------------------------------------------
// Position calculation
// ---------------------------------------------------------------------------

function calcPosition(
  triggerRect: DOMRect,
  tooltipEl: HTMLDivElement,
  placement: TooltipPlacement,
  gap = 8
): { top: number; left: number; actualPlacement: TooltipPlacement } {
  const ttWidth = tooltipEl.offsetWidth;
  const ttHeight = tooltipEl.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const margin = 8;

  let top = 0;
  let left = 0;
  let actualPlacement = placement;

  // Compute ideal position
  if (placement === "top") {
    top = triggerRect.top - ttHeight - gap;
    left = triggerRect.left + triggerRect.width / 2 - ttWidth / 2;
    // Flip if not enough room above
    if (top < margin) {
      top = triggerRect.bottom + gap;
      actualPlacement = "bottom";
    }
  } else if (placement === "bottom") {
    top = triggerRect.bottom + gap;
    left = triggerRect.left + triggerRect.width / 2 - ttWidth / 2;
    if (top + ttHeight > vh - margin) {
      top = triggerRect.top - ttHeight - gap;
      actualPlacement = "top";
    }
  } else if (placement === "left") {
    top = triggerRect.top + triggerRect.height / 2 - ttHeight / 2;
    left = triggerRect.left - ttWidth - gap;
    if (left < margin) {
      left = triggerRect.right + gap;
      actualPlacement = "right";
    }
  } else {
    top = triggerRect.top + triggerRect.height / 2 - ttHeight / 2;
    left = triggerRect.right + gap;
    if (left + ttWidth > vw - margin) {
      left = triggerRect.left - ttWidth - gap;
      actualPlacement = "left";
    }
  }

  // Clamp to viewport
  left = Math.max(margin, Math.min(left, vw - ttWidth - margin));
  top = Math.max(margin, Math.min(top, vh - ttHeight - margin));

  return { top, left, actualPlacement };
}

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

export function Tooltip({
  content,
  placement = "top",
  delay = 150,
  className,
  children,
}: TooltipProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
      // Position after paint
      requestAnimationFrame(() => {
        if (triggerRef.current && tooltipRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          const { top, left } = calcPosition(rect, tooltipRef.current, placement);
          setPos({ top: top + window.scrollY, left: left + window.scrollX });
        }
      });
    }, delay);
  }, [delay, placement]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  if (!isValidElement(children)) return children as React.ReactElement;

  // Inject ref + aria + event handlers onto the trigger
  const trigger = cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>, {
    ref: triggerRef,
    "aria-describedby": visible ? id : undefined,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      show();
      (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      hide();
      (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      show();
      (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      hide();
      (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onBlur?.(e);
    },
  });

  return (
    <>
      {trigger}
      {visible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            id={id}
            role="tooltip"
            style={{ position: "absolute", top: pos.top, left: pos.left, zIndex: 9999 }}
            className={cn(
              "pointer-events-none max-w-xs rounded-md px-2.5 py-1.5",
              "bg-popover text-popover-foreground text-xs shadow-md",
              "border border-border",
              "animate-zoom-in-95",
              className
            )}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}
