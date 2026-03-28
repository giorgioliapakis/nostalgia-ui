"use client"

import * as React from "react"
import {
  Group,
  Panel,
  Separator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from "react-resizable-panels"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroResizablePanelGroup                                          */
/* ------------------------------------------------------------------ */
function RetroResizablePanelGroup({
  className,
  ...props
}: GroupProps) {
  return (
    <Group
      className={cn("flex h-full w-full", className)}
      {...props}
    />
  )
}
RetroResizablePanelGroup.displayName = "RetroResizablePanelGroup"

/* ------------------------------------------------------------------ */
/*  RetroResizablePanel                                               */
/* ------------------------------------------------------------------ */
function RetroResizablePanel({
  className,
  ...props
}: PanelProps) {
  return <Panel className={cn(className)} {...props} />
}
RetroResizablePanel.displayName = "RetroResizablePanel"

/* ------------------------------------------------------------------ */
/*  GripDots – 3 small 2x2px squares centered in the handle           */
/* ------------------------------------------------------------------ */
function GripDots({
  orientation,
}: {
  orientation: "horizontal" | "vertical"
}) {
  const isVertical = orientation === "vertical"

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        isVertical ? "flex-col gap-[2px]" : "flex-row gap-[2px]"
      )}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="size-[2px] bg-os9-gray-600"
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroResizableHandle                                              */
/* ------------------------------------------------------------------ */
/**
 * react-resizable-panels v4 sets `aria-orientation` on the Separator div.
 * The value is the *inverse* of the Group orientation:
 *   Group orientation="horizontal" → Separator aria-orientation="vertical"
 *   Group orientation="vertical"   → Separator aria-orientation="horizontal"
 *
 * We use Tailwind's `aria-[orientation=…]` variant to style accordingly:
 *   aria-[orientation=vertical]   → vertical separator bar (3px wide, left/right bevel)
 *   aria-[orientation=horizontal] → horizontal separator bar (3px tall, top/bottom bevel)
 */
function RetroResizableHandle({
  withHandle = true,
  className,
  ...props
}: SeparatorProps & {
  withHandle?: boolean
}) {
  return (
    <Separator
      className={cn(
        "relative flex shrink-0 items-center justify-center",
        "bg-[var(--os9-gray-300)]",
        /*
         * Vertical separator (between side-by-side panels):
         * 3px wide, full height, light left / dark right border
         */
        "aria-[orientation=vertical]:w-[3px]",
        "aria-[orientation=vertical]:border-l",
        "aria-[orientation=vertical]:border-r",
        "aria-[orientation=vertical]:border-l-[var(--os9-white)]",
        "aria-[orientation=vertical]:border-r-[var(--os9-gray-700)]",
        "aria-[orientation=vertical]:cursor-col-resize",
        /*
         * Horizontal separator (between stacked panels):
         * 3px tall, full width, light top / dark bottom border
         */
        "aria-[orientation=horizontal]:h-[3px]",
        "aria-[orientation=horizontal]:border-t",
        "aria-[orientation=horizontal]:border-b",
        "aria-[orientation=horizontal]:border-t-[var(--os9-white)]",
        "aria-[orientation=horizontal]:border-b-[var(--os9-gray-700)]",
        "aria-[orientation=horizontal]:cursor-row-resize",
        /*
         * Darken slightly when actively dragging
         */
        "active:bg-[var(--os9-gray-400)]",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/*
           * Vertical dots (for a vertical separator between side-by-side panels).
           * Shown when parent Separator has aria-orientation="vertical".
           */}
          <span className="hidden [[aria-orientation=vertical]>&]:block">
            <GripDots orientation="vertical" />
          </span>
          {/*
           * Horizontal dots (for a horizontal separator between stacked panels).
           * Shown when parent Separator has aria-orientation="horizontal".
           */}
          <span className="hidden [[aria-orientation=horizontal]>&]:block">
            <GripDots orientation="horizontal" />
          </span>
        </div>
      )}
    </Separator>
  )
}
RetroResizableHandle.displayName = "RetroResizableHandle"

/* ------------------------------------------------------------------ */
/*  Exports                                                           */
/* ------------------------------------------------------------------ */
export {
  RetroResizablePanelGroup,
  RetroResizablePanel,
  RetroResizableHandle,
}
