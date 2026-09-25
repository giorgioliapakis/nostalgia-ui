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
/*  Viewport context: lets the arrow buttons scroll the viewport      */
/* ------------------------------------------------------------------ */
const ScrollViewportContext =
  React.createContext<React.RefObject<HTMLDivElement | null> | null>(null)

/** Distance (px) a single arrow click scrolls the viewport. */
const ARROW_SCROLL_STEP = 40

/* ------------------------------------------------------------------ */
/*  ScrollArea arrow button (16x16 raised bevel with centered arrow)  */
/* ------------------------------------------------------------------ */
function ScrollArrowButton({
  direction,
  className,
  onClick,
  onPointerDown,
  ...props
}: React.ComponentProps<"button"> & {
  direction: "up" | "down" | "left" | "right"
}) {
  const viewportRef = React.useContext(ScrollViewportContext)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    // Prefer the viewport registered by RetroScrollArea; fall back to the
    // sibling Radix viewport when the scrollbar is used with a bare Root.
    const viewport =
      viewportRef?.current ??
      event.currentTarget
        .closest("[data-orientation]")
        ?.parentElement?.querySelector<HTMLElement>(
          "[data-radix-scroll-area-viewport]"
        )
    if (!viewport) return
    const delta =
      direction === "up" || direction === "left"
        ? -ARROW_SCROLL_STEP
        : ARROW_SCROLL_STEP
    if (direction === "up" || direction === "down") {
      viewport.scrollBy({ top: delta })
    } else {
      viewport.scrollBy({ left: delta })
    }
  }

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center p-0",
        "size-[16px] shrink-0",
        "border border-os9-black bg-os9-gray-300",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
        "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        className
      )}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        // Stop Radix's scrollbar handler from treating this as a track click
        event.stopPropagation()
      }}
      onClick={handleClick}
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
    </button>
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
        // Padding reserves room for the absolutely-positioned arrow buttons.
        // Radix reads this padding so the thumb never travels over the arrows.
        isVertical
          ? "h-full w-[16px] flex-col py-[16px] border-l border-os9-black"
          : "h-[16px] w-full flex-row px-[16px] border-t border-os9-black",
        className
      )}
      {...props}
    >
      {/* Arrow button: start (up / left) */}
      <ScrollArrowButton
        direction={isVertical ? "up" : "left"}
        className={cn(
          "absolute",
          isVertical ? "top-0 right-0" : "left-0 bottom-0"
        )}
      />

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
      <ScrollArrowButton
        direction={isVertical ? "down" : "right"}
        className={cn(
          "absolute",
          isVertical ? "bottom-0 right-0" : "right-0 bottom-0"
        )}
      />
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
    // OS9 scroll bars are always visible
    type = "always",
    ...props
  }: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
    orientation?: "vertical" | "horizontal" | "both"
  },
  ref: React.ForwardedRef<
    React.ComponentRef<typeof ScrollAreaPrimitive.Root>
  >
) {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const hasVertical = orientation === "vertical" || orientation === "both"
  const hasHorizontal = orientation === "horizontal" || orientation === "both"
  // Always-visible bars would otherwise overlay the last 16px of content
  const reserveSpace = type === "always"

  return (
    <ScrollViewportContext.Provider value={viewportRef}>
      <ScrollAreaPrimitive.Root
        ref={ref}
        type={type}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          ref={viewportRef}
          className={cn(
            "h-full w-full",
            reserveSpace && hasVertical && "pr-[16px]",
            reserveSpace && hasHorizontal && "pb-[16px]"
          )}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>

        {hasVertical && <ForwardedRetroScrollBar orientation="vertical" />}
        {hasHorizontal && <ForwardedRetroScrollBar orientation="horizontal" />}

        <ScrollAreaPrimitive.Corner className="bg-os9-gray-300" />
      </ScrollAreaPrimitive.Root>
    </ScrollViewportContext.Provider>
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
