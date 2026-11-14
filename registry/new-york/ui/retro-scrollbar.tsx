"use client"

/*
 * RetroScrollArea / RetroScrollBar on UI SDK Scroll Area.
 *
 * The browser still scrolls (wheel, touch, keys, find in page); UI SDK sizes
 * and moves the thumb, drags it, and pages when the track is pressed, like a
 * native scrollbar.
 *
 * Crafted moment: the arrow buttons auto-repeat while held, as OS 9's did:
 * one step on press, then a steady scroll after a short pause until the
 * button is released. Nothing else moves; Platinum scrollbars are still.
 */

import * as React from "react"
import {
  ScrollArea as ScrollAreaPrimitive,
  ScrollAreaContent as ScrollAreaContentPrimitive,
  ScrollAreaCorner as ScrollAreaCornerPrimitive,
  ScrollAreaScrollbar as ScrollAreaScrollbarPrimitive,
  ScrollAreaThumb as ScrollAreaThumbPrimitive,
  ScrollAreaViewport as ScrollAreaViewportPrimitive,
} from "@ui-sdk/react/scroll-area"

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

/** Distance (px) a single arrow step scrolls the viewport. */
const ARROW_SCROLL_STEP = 40
/** Hold this long before an arrow starts repeating. */
const REPEAT_DELAY_MS = 300
/** Repeat interval while an arrow is held. */
const REPEAT_EVERY_MS = 50
/** Distance per repeat: smaller than a step, so holding reads as a glide. */
const REPEAT_STEP = 16

/* ------------------------------------------------------------------ */
/*  ScrollArea arrow button (16x16 raised bevel with centered arrow)  */
/* ------------------------------------------------------------------ */
function ScrollArrowButton({
  direction,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  direction: "up" | "down" | "left" | "right"
}) {
  const viewportRef = React.useContext(ScrollViewportContext)
  const timers = React.useRef({ delay: 0, repeat: 0 })

  const stop = React.useCallback(() => {
    window.clearTimeout(timers.current.delay)
    window.clearInterval(timers.current.repeat)
  }, [])
  React.useEffect(() => stop, [stop])

  /*
   * The press is handled natively: UI SDK pages the viewport on a native
   * pointerdown on the scrollbar, so the arrow has to stop the event before
   * it bubbles there, which also keeps it from React's root listener.
   */
  const buttonRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      if (!node) return
      const scrollBy = (target: HTMLElement, distance: number) => {
        const delta = direction === "up" || direction === "left" ? -distance : distance
        if (direction === "up" || direction === "down") target.scrollBy({ top: delta })
        else target.scrollBy({ left: delta })
      }
      const onPointerDown = (event: PointerEvent) => {
        event.stopPropagation()
        if (event.button !== 0) return
        // Keep focus where it was, like a native scrollbar.
        event.preventDefault()
        // Prefer the viewport registered by RetroScrollArea; fall back to the
        // sibling viewport when the scrollbar is used inside a bare ScrollArea.
        const viewport =
          viewportRef?.current ??
          node
            .closest<HTMLElement>('[data-slot="scroll-area"]')
            ?.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]')
        if (!viewport) return
        scrollBy(viewport, ARROW_SCROLL_STEP)
        stop()
        node.setPointerCapture(event.pointerId)
        timers.current.delay = window.setTimeout(() => {
          timers.current.repeat = window.setInterval(
            () => scrollBy(viewport, REPEAT_STEP),
            REPEAT_EVERY_MS
          )
        }, REPEAT_DELAY_MS)
      }
      node.addEventListener("pointerdown", onPointerDown)
      node.addEventListener("pointerup", stop)
      node.addEventListener("pointercancel", stop)
      node.addEventListener("lostpointercapture", stop)
      return () => {
        stop()
        node.removeEventListener("pointerdown", onPointerDown)
        node.removeEventListener("pointerup", stop)
        node.removeEventListener("pointercancel", stop)
        node.removeEventListener("lostpointercapture", stop)
      }
    },
    [direction, viewportRef, stop]
  )

  return (
    <button
      ref={buttonRef}
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
function RetroScrollBar({
  className,
  orientation = "vertical",
  ...props
}: Omit<React.ComponentProps<typeof ScrollAreaScrollbarPrimitive>, "className" | "children"> & {
  className?: string
}) {
  const isVertical = orientation === "vertical"

  return (
    <ScrollAreaScrollbarPrimitive
      orientation={orientation}
      className={cn(
        "flex touch-none select-none bg-os9-white",
        // Padding reserves room for the absolutely-positioned arrow buttons.
        // UI SDK measures the track inside the padding, so the thumb never
        // travels over the arrows.
        isVertical
          ? "w-[16px] flex-col py-[16px] border-l border-os9-black"
          : "h-[16px] flex-row px-[16px] border-t border-os9-black",
        // Opaque, so content scrolling past the end never shows through the track.
        // `type="hover" | "scroll"`: hidden until UI SDK marks it visible
        "not-data-visible:opacity-0",
        className
      )}
      {...props}
    >
      {/* Arrow button: start (up / left) */}
      <ScrollArrowButton
        direction={isVertical ? "up" : "left"}
        className={cn("absolute", isVertical ? "top-0 right-0" : "left-0 bottom-0")}
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
        <ScrollAreaThumbPrimitive
          className={cn(
            isVertical ? "w-full min-h-[20px]" : "h-full min-w-[20px]",
            "bg-os9-gray-300",
            "border border-os9-black",
            "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
            "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
            "data-dragging:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
            "cursor-pointer"
          )}
        />
      </div>

      {/* Arrow button: end (down / right) */}
      <ScrollArrowButton
        direction={isVertical ? "down" : "right"}
        className={cn("absolute", isVertical ? "bottom-0 right-0" : "right-0 bottom-0")}
      />
    </ScrollAreaScrollbarPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroScrollArea                                                   */
/* ------------------------------------------------------------------ */
function RetroScrollArea({
  className,
  children,
  orientation = "vertical",
  // OS9 scroll bars are always visible
  type = "always",
  ...props
}: Omit<React.ComponentProps<typeof ScrollAreaPrimitive>, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
  orientation?: "vertical" | "horizontal" | "both"
}) {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const hasVertical = orientation === "vertical" || orientation === "both"
  const hasHorizontal = orientation === "horizontal" || orientation === "both"
  // Always-visible bars would otherwise overlay the last 16px of content
  const reserveSpace = type === "always"

  return (
    <ScrollViewportContext.Provider value={viewportRef}>
      <ScrollAreaPrimitive
        type={type}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <ScrollAreaViewportPrimitive
          ref={viewportRef}
          className={cn(
            "h-full w-full",
            reserveSpace && hasVertical && "pr-[16px]",
            reserveSpace && hasHorizontal && "pb-[16px]"
          )}
        >
          <ScrollAreaContentPrimitive>{children}</ScrollAreaContentPrimitive>
        </ScrollAreaViewportPrimitive>

        {hasVertical && <RetroScrollBar orientation="vertical" />}
        {hasHorizontal && <RetroScrollBar orientation="horizontal" />}

        <ScrollAreaCornerPrimitive className="bg-os9-gray-300" />
      </ScrollAreaPrimitive>
    </ScrollViewportContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                           */
/* ------------------------------------------------------------------ */
export { RetroScrollArea, RetroScrollBar }
