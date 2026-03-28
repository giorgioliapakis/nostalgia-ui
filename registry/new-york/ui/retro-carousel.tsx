"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselOrientation = "horizontal" | "vertical"

interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: CarouselOrientation
  setApi?: (api: CarouselApi) => void
}

interface CarouselContextValue {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  orientation: CarouselOrientation
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <RetroCarousel />")
  }
  return context
}

/* ------------------------------------------------------------------ */
/*  Arrow SVG paths (filled triangles, 8x8 viewBox)                   */
/* ------------------------------------------------------------------ */

const arrowPaths: Record<string, string> = {
  left: "M6 1 L2 4 L6 7 Z",
  right: "M2 1 L6 4 L2 7 Z",
  up: "M1 6 L4 2 L7 6 Z",
  down: "M1 2 L4 6 L7 2 Z",
}

/* ------------------------------------------------------------------ */
/*  RetroCarousel (root)                                               */
/* ------------------------------------------------------------------ */

const RetroCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  function RetroCarousel(
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((emblaApi: NonNullable<CarouselApi>) => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) return
      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      return () => {
        api.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          orientation,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
RetroCarousel.displayName = "RetroCarousel"

/* ------------------------------------------------------------------ */
/*  RetroCarouselContent                                               */
/* ------------------------------------------------------------------ */

const RetroCarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  function RetroCarouselContent({ className, ...props }, ref) {
    const { carouselRef, orientation } = useCarousel()

    return (
      <div
        ref={carouselRef}
        className={cn(
          /* OS9 inset panel */
          "os9-inset",
          "overflow-hidden"
        )}
      >
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-0" : "-mt-0 flex-col",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
RetroCarouselContent.displayName = "RetroCarouselContent"

/* ------------------------------------------------------------------ */
/*  RetroCarouselItem                                                  */
/* ------------------------------------------------------------------ */

const RetroCarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  function RetroCarouselItem({ className, ...props }, ref) {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-0" : "pt-0",
          className
        )}
        {...props}
      />
    )
  }
)
RetroCarouselItem.displayName = "RetroCarouselItem"

/* ------------------------------------------------------------------ */
/*  RetroCarouselPrevious                                              */
/* ------------------------------------------------------------------ */

const RetroCarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  function RetroCarouselPrevious({ className, ...props }, ref) {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    const direction = orientation === "horizontal" ? "left" : "up"

    return (
      <button
        ref={ref}
        type="button"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        className={cn(
          "absolute z-10",
          "inline-flex items-center justify-center",
          "size-[24px] p-0",
          /* Raised bevel */
          "border border-os9-black bg-os9-gray-300",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          /* Pressed state */
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
          /* Focus */
          "focus-visible:os9-focus-ring",
          "cursor-pointer select-none transition-none",
          /* Disabled */
          "disabled:opacity-50 disabled:pointer-events-none",
          /* Position: centered on the left (horizontal) or top (vertical) */
          orientation === "horizontal"
            ? "top-1/2 left-[4px] -translate-y-1/2"
            : "left-1/2 top-[4px] -translate-x-1/2",
          className
        )}
        aria-label="Previous slide"
        {...props}
      >
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d={arrowPaths[direction]} fill="var(--os9-black)" />
        </svg>
      </button>
    )
  }
)
RetroCarouselPrevious.displayName = "RetroCarouselPrevious"

/* ------------------------------------------------------------------ */
/*  RetroCarouselNext                                                  */
/* ------------------------------------------------------------------ */

const RetroCarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  function RetroCarouselNext({ className, ...props }, ref) {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    const direction = orientation === "horizontal" ? "right" : "down"

    return (
      <button
        ref={ref}
        type="button"
        disabled={!canScrollNext}
        onClick={scrollNext}
        className={cn(
          "absolute z-10",
          "inline-flex items-center justify-center",
          "size-[24px] p-0",
          /* Raised bevel */
          "border border-os9-black bg-os9-gray-300",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          /* Pressed state */
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
          /* Focus */
          "focus-visible:os9-focus-ring",
          "cursor-pointer select-none transition-none",
          /* Disabled */
          "disabled:opacity-50 disabled:pointer-events-none",
          /* Position: centered on the right (horizontal) or bottom (vertical) */
          orientation === "horizontal"
            ? "top-1/2 right-[4px] -translate-y-1/2"
            : "left-1/2 bottom-[4px] -translate-x-1/2",
          className
        )}
        aria-label="Next slide"
        {...props}
      >
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d={arrowPaths[direction]} fill="var(--os9-black)" />
        </svg>
      </button>
    )
  }
)
RetroCarouselNext.displayName = "RetroCarouselNext"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  type CarouselApi,
  RetroCarousel,
  RetroCarouselContent,
  RetroCarouselItem,
  RetroCarouselPrevious,
  RetroCarouselNext,
}
