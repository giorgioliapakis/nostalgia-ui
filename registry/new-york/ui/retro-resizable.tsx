"use client"

/*
 * RetroResizable: panes split by an OS 9 beveled divider with grip dots, on
 * UI SDK's Resizable (the WAI-ARIA window splitter). Drag a divider, or
 * focus it and use the arrow keys (Shift for bigger steps, Home and End to
 * the limits, Enter to collapse a collapsible pane and bring it back).
 *
 * Crafted moment: the divider settles. Drags track the pointer one to one,
 * but a key step or a collapse eases the panes to their new sizes (160ms,
 * strong ease-out) instead of jumping, so a keyboard user sees where the
 * divider went. Classic flair and reduced motion: it jumps.
 */

import * as React from "react"
import {
  Resizable as ResizablePrimitive,
  ResizableHandle as ResizableHandlePrimitive,
  ResizablePanel as ResizablePanelPrimitive,
} from "@ui-sdk/react/resizable"

import { cn } from "@/lib/utils"

/* Panels size by flex-basis (from --resizable-panel-size); ease it except
 * while a divider is being dragged. Scoped to direct children so a nested
 * group follows its own drag state. */
const CSS = `
.os9-resizable:not([data-dragging]) > [data-slot="resizable-panel"] {
  transition: flex-basis 160ms cubic-bezier(0.23, 1, 0.32, 1);
}
[data-flair="classic"] .os9-resizable > [data-slot="resizable-panel"] { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .os9-resizable > [data-slot="resizable-panel"] { transition: none; }
}
`

/* ── RetroResizablePanelGroup ──────────────────────────── */

function RetroResizablePanelGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ResizablePrimitive>, "className"> & {
  className?: string
}) {
  return (
    <>
      <style href="os9-resizable" precedence="default">
        {CSS}
      </style>
      <ResizablePrimitive className={cn("os9-resizable h-full w-full", className)} {...props} />
    </>
  )
}

/* ── RetroResizablePanel ───────────────────────────────── */

function RetroResizablePanel({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ResizablePanelPrimitive>, "className"> & {
  className?: string
}) {
  return <ResizablePanelPrimitive className={className} {...props} />
}

/* ── GripDots: three 2×2 squares across the divider ────── */

function GripDots() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none flex items-center justify-center gap-[2px]",
        /* a horizontal group has an upright divider, so the dots stack */
        "group-data-[orientation=horizontal]/handle:flex-col",
        "group-data-[orientation=vertical]/handle:flex-row"
      )}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-[2px] bg-os9-gray-600" />
      ))}
    </span>
  )
}

/* ── RetroResizableHandle ──────────────────────────────── */

/**
 * UI SDK puts the group's direction on the handle as `data-orientation`:
 *   horizontal group → an upright divider, 3px wide, light left / dark right
 *   vertical group   → a flat divider, 3px tall, light top / dark bottom
 */
function RetroResizableHandle({
  withHandle = true,
  className,
  children,
  "aria-label": ariaLabel = "Resize",
  ...props
}: Omit<React.ComponentProps<typeof ResizableHandlePrimitive>, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
  /** Show the grip dots. */
  withHandle?: boolean
}) {
  return (
    <ResizableHandlePrimitive
      aria-label={ariaLabel}
      className={cn(
        "group/handle relative flex shrink-0 items-center justify-center",
        "bg-os9-gray-300 outline-none",
        "data-[orientation=horizontal]:w-[3px] data-[orientation=horizontal]:self-stretch",
        "data-[orientation=horizontal]:border-x data-[orientation=horizontal]:border-l-os9-white data-[orientation=horizontal]:border-r-os9-gray-700",
        "data-[orientation=vertical]:h-[3px] data-[orientation=vertical]:w-full",
        "data-[orientation=vertical]:border-y data-[orientation=vertical]:border-t-os9-white data-[orientation=vertical]:border-b-os9-gray-700",
        /* darkens while dragged, like a grabbed OS 9 splitter */
        "data-dragging:bg-os9-gray-400",
        "focus-visible:os9-focus-ring focus-visible:z-10",
        "data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children ?? (withHandle && <GripDots />)}
    </ResizableHandlePrimitive>
  )
}

export { RetroResizablePanelGroup, RetroResizablePanel, RetroResizableHandle }
