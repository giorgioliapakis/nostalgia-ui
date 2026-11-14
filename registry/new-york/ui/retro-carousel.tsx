"use client"

/*
 * RetroCarousel: slides in an OS 9 inset well with beveled arrow buttons, on
 * UI SDK's Carousel. It scrolls natively, so swipes, trackpads and the
 * arrow keys (with the well focused) all page it.
 *
 * Crafted moment: the page turn. The arrows, keys and swipes settle the
 * slides a page at a time on UI SDK's spring, with no overshoot; reduced
 * motion jumps straight there.
 */

import * as React from "react"
import {
  Carousel as CarouselPrimitive,
  CarouselContent as CarouselContentPrimitive,
  CarouselItem as CarouselItemPrimitive,
  CarouselNext as CarouselNextPrimitive,
  CarouselPrevious as CarouselPreviousPrimitive,
  CarouselViewport as CarouselViewportPrimitive,
  createCarouselController,
  type CarouselAlign,
  type CarouselController,
  type CarouselOrientation,
} from "@ui-sdk/react/carousel"

import { cn } from "@/lib/utils"

/** The carousel's controller: `next()`, `previous()`, `setPage(n)`, `getPage()`… */
type CarouselApi = CarouselController

/** The handful of Embla options that map onto UI SDK's carousel. */
type CarouselOptions = {
  loop?: boolean
  align?: CarouselAlign
  /** The slide to start on, from 0. */
  startIndex?: number
  dragFree?: boolean
  skipSnaps?: boolean
  /** How many slides one page holds, or "auto" to fit as many as show. */
  slidesToScroll?: number | "auto"
}

type RetroCarouselProps = Omit<
  React.ComponentProps<typeof CarouselPrimitive>,
  "className" | "children" | "orientation"
> & {
  className?: string
  children?: React.ReactNode
  orientation?: CarouselOrientation
  /** Embla-style options, kept for compatibility. UI SDK's own props win. */
  opts?: CarouselOptions
  /** Receives the carousel's controller once, like Embla's `setApi`. */
  setApi?: (api: CarouselApi) => void
}

const OrientationContext = React.createContext<CarouselOrientation>("horizontal")

/* ── RetroCarousel (root) ──────────────────────────────── */

function RetroCarousel({
  orientation = "horizontal",
  opts,
  setApi,
  controller,
  className,
  children,
  "aria-label": ariaLabel = "Slides",
  ...props
}: RetroCarouselProps) {
  const [ownController] = React.useState(() => createCarouselController())
  const api = controller ?? ownController

  React.useEffect(() => {
    setApi?.(api)
  }, [api, setApi])

  return (
    <OrientationContext.Provider value={orientation}>
      <CarouselPrimitive
        orientation={orientation}
        controller={api}
        loop={opts?.loop}
        align={opts?.align}
        defaultPage={opts?.startIndex !== undefined ? opts.startIndex + 1 : undefined}
        dragFree={opts?.dragFree}
        skipSnaps={opts?.skipSnaps}
        slidesPerPage={opts?.slidesToScroll}
        aria-label={ariaLabel}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </CarouselPrimitive>
    </OrientationContext.Provider>
  )
}

/* ── RetroCarouselContent: the inset well and its strip ── */

function RetroCarouselContent({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CarouselContentPrimitive>, "className"> & {
  className?: string
}) {
  const orientation = React.useContext(OrientationContext)
  return (
    <CarouselViewportPrimitive
      className={cn(
        "os9-inset outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "focus-visible:os9-focus-ring"
      )}
    >
      <CarouselContentPrimitive
        className={cn("flex", orientation === "vertical" && "flex-col", className)}
        {...props}
      />
    </CarouselViewportPrimitive>
  )
}

/* ── RetroCarouselItem ─────────────────────────────────── */

function RetroCarouselItem({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CarouselItemPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <CarouselItemPrimitive
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  )
}

/* ── arrows ────────────────────────────────────────────── */

const arrowPaths = {
  left: "M6 1 L2 4 L6 7 Z",
  right: "M2 1 L6 4 L2 7 Z",
  up: "M1 6 L4 2 L7 6 Z",
  down: "M1 2 L4 6 L7 2 Z",
} as const

const arrowButtonClass = cn(
  "absolute z-10",
  "inline-flex items-center justify-center",
  "size-[24px] p-0",
  /* Raised bevel */
  "border border-os9-black bg-os9-gray-300",
  "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
  /* Pressed state */
  "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
  "outline-none focus-visible:os9-focus-ring",
  "cursor-pointer select-none transition-none",
  /* At the end there's no page that way: dimmed, still focusable (UI SDK) */
  "data-disabled:cursor-default data-disabled:opacity-50",
  "data-disabled:active:shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]"
)

function Arrow({ direction }: { direction: keyof typeof arrowPaths }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
      <path d={arrowPaths[direction]} fill="var(--os9-black)" />
    </svg>
  )
}

type StepButtonProps<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  "className" | "children"
> & {
  className?: string
  children?: React.ReactNode
}

function RetroCarouselPrevious({
  className,
  children,
  ...props
}: StepButtonProps<typeof CarouselPreviousPrimitive>) {
  const orientation = React.useContext(OrientationContext)
  return (
    <CarouselPreviousPrimitive
      aria-label="Previous slide"
      className={cn(
        arrowButtonClass,
        orientation === "horizontal"
          ? "top-1/2 left-[4px] -translate-y-1/2"
          : "left-1/2 top-[4px] -translate-x-1/2",
        className
      )}
      {...props}
    >
      {children ?? <Arrow direction={orientation === "horizontal" ? "left" : "up"} />}
    </CarouselPreviousPrimitive>
  )
}

function RetroCarouselNext({
  className,
  children,
  ...props
}: StepButtonProps<typeof CarouselNextPrimitive>) {
  const orientation = React.useContext(OrientationContext)
  return (
    <CarouselNextPrimitive
      aria-label="Next slide"
      className={cn(
        arrowButtonClass,
        orientation === "horizontal"
          ? "top-1/2 right-[4px] -translate-y-1/2"
          : "left-1/2 bottom-[4px] -translate-x-1/2",
        className
      )}
      {...props}
    >
      {children ?? <Arrow direction={orientation === "horizontal" ? "right" : "down"} />}
    </CarouselNextPrimitive>
  )
}

export {
  type CarouselApi,
  type CarouselOptions,
  type RetroCarouselProps,
  RetroCarousel,
  RetroCarouselContent,
  RetroCarouselItem,
  RetroCarouselPrevious,
  RetroCarouselNext,
}
