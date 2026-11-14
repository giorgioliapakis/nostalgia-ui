"use client"

/*
 * RetroTooltip renders Balloon Help.
 *
 * Crafted moment: the balloon grows out of the thing it explains (scale from
 * --transform-origin, 140ms) and its tail points at it. Once one balloon is
 * open, moving along a row of controls swaps balloons instantly
 * (UI SDK's data-instant), so a toolbar reads like one balloon following the
 * pointer, the way Balloon Help felt with "Show Balloons" on.
 * Classic flair: balloons appear at once.
 */

import * as React from "react"
import {
  Tooltip as TooltipPrimitive,
  TooltipArrow as TooltipArrowPrimitive,
  TooltipContent as TooltipContentPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "@ui-sdk/react/tooltip"

import { cn } from "@/lib/utils"
import { popupClass } from "@/registry/new-york/lib/retro-motion"

/* UI SDK groups tooltips without a provider; kept so shadcn-shaped code compiles */
function RetroTooltipProvider({ children }: { children?: React.ReactNode; delayDuration?: number }) {
  return <>{children}</>
}

function RetroTooltip({ delay = 400, ...props }: React.ComponentProps<typeof TooltipPrimitive>) {
  return <TooltipPrimitive delay={delay} {...props} />
}

function RetroTooltipTrigger(props: React.ComponentProps<typeof TooltipTriggerPrimitive>) {
  return <TooltipTriggerPrimitive {...props} />
}

function RetroTooltipContent({
  className,
  children,
  sideOffset = 9,
  ...props
}: Omit<React.ComponentProps<typeof TooltipContentPrimitive>, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <TooltipContentPrimitive
      sideOffset={sideOffset}
      /* a span, so a tooltip can live inside a <p> (popups render in place) */
      render={<span />}
      className={popupClass(
        cn(
          "relative z-50 block max-w-[220px]! overflow-visible! m-0!",
          /* Balloon Help: the one place OS 9 used round corners. Box properties
           * carry `!` so UI SDK's popup reset can't strip them in apps that
           * haven't declared `@layer ui-sdk;` first. */
          "rounded-[6px] border! border-os9-black! bg-[#ffffcc]! px-[8px]! py-[4px]! text-os9-black!",
          "shadow-[1px_1px_0_rgba(0,0,0,0.3)]",
          "font-[family-name:var(--os9-font-heading)] text-[10px] leading-[1.3]",
          "origin-(--transform-origin) transition-[opacity,scale] duration-140 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "data-starting-style:opacity-0 data-starting-style:scale-90",
          "data-ending-style:opacity-0 data-ending-style:duration-75",
          "data-instant:transition-none in-data-[flair=classic]:transition-none",
          "motion-reduce:data-starting-style:scale-100"
        ),
        className
      )}
      {...props}
    >
      <TooltipArrowPrimitive
        render={<span />}
        className={cn(
          "absolute block size-[8px] rotate-45 bg-[#ffffcc] border-os9-black",
          "-translate-x-1/2 left-(--arrow-offset)",
          "in-data-[side=top]:-bottom-[5px] in-data-[side=top]:border-r in-data-[side=top]:border-b",
          "in-data-[side=bottom]:-top-[5px] in-data-[side=bottom]:border-l in-data-[side=bottom]:border-t",
          "in-data-[side=left]:hidden in-data-[side=right]:hidden"
        )}
      />
      {children}
    </TooltipContentPrimitive>
  )
}

export { RetroTooltipProvider, RetroTooltip, RetroTooltipTrigger, RetroTooltipContent }
