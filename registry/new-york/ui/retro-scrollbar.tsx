"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Arrow SVG paths (filled triangles, 6x6 viewBox)                   */
/* ------------------------------------------------------------------ */
const arrowPaths: Record<string, string> = {
  up: "M1 5 L3 1 L5 5 Z",
  down: "M1 1 L3 5 L5 1 Z",
  left: "M5 1 L1 3 L5 5 Z",
  right: "M1 1 L5 3 L1 5 Z",
}

/* ------------------------------------------------------------------ */
/*  ScrollArea arrow button (16x16 raised bevel with centered arrow)  */
/* ------------------------------------------------------------------ */
function ScrollArrowButton({
  direction,
  className,
  ...props
}: React.ComponentProps<"div"> & { direction: "up" | "down" | "left" | "right" }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "size-[16px] shrink-0",
        "border border-os9-black bg-os9-gray-300",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
        "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        className
      )}
      {...props}
    >
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={arrowPaths[direction]} fill="var(--os9-black)" />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroScrollBar                                                    */
/* ------------------------------------------------------------------ */
function RetroScrollBar(
  {
    className,
    orientation = "vertical",
    ...props
  }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ref: React.ForwardedRef<
    React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
  >
) {
  const isVertical = orientation === "vertical"

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none",
        isVertical
          ? "h-full w-[16px] flex-col border-l border-os9-black"
          : "h-[16px] w-full flex-row border-t border-os9-black",
        className
      )}
      {...props}
    >
      {/* Arrow button: start (up / left) */}
      <ScrollArrowButton direction={isVertical ? "up" : "left"} />

      {/* Track */}
      <div
        className={cn(
          "relative flex-1",
          "bg-os9-gray-600/30",
          "border-x border-os9-black",
          isVertical ? "border-x" : "border-y border-x-0"
        )}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb
          className={cn(
            "relative flex-1",
            isVertical ? "!w-full min-h-[20px]" : "!h-full min-w-[20px]",
            "bg-os9-gray-300",
            "border border-os9-black",
            "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
            "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
            "cursor-pointer"
          )}
        />
      </div>

      {/* Arrow button: end (down / right) */}
      <ScrollArrowButton direction={isVertical ? "down" : "right"} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

const ForwardedRetroScrollBar = React.forwardRef(RetroScrollBar)
ForwardedRetroScrollBar.displayName = "RetroScrollBar"

/* ------------------------------------------------------------------ */
/*  RetroScrollArea                                                   */
/* ------------------------------------------------------------------ */
function RetroScrollArea(
  {
    className,
    children,
    orientation = "vertical",
    ...props
  }: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
    orientation?: "vertical" | "horizontal" | "both"
  },
  ref: React.ForwardedRef<
    React.ComponentRef<typeof ScrollAreaPrimitive.Root>
  >
) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full">
        {children}
      </ScrollAreaPrimitive.Viewport>

      {(orientation === "vertical" || orientation === "both") && (
        <ForwardedRetroScrollBar orientation="vertical" />
      )}
      {(orientation === "horizontal" || orientation === "both") && (
        <ForwardedRetroScrollBar orientation="horizontal" />
      )}

      <ScrollAreaPrimitive.Corner className="bg-os9-gray-300" />
    </ScrollAreaPrimitive.Root>
  )
}

const ForwardedRetroScrollArea = React.forwardRef(RetroScrollArea)
ForwardedRetroScrollArea.displayName = "RetroScrollArea"

/* ------------------------------------------------------------------ */
/*  Exports                                                           */
/* ------------------------------------------------------------------ */
export {
  ForwardedRetroScrollArea as RetroScrollArea,
  ForwardedRetroScrollBar as RetroScrollBar,
}
