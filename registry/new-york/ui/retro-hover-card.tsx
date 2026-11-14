"use client"

/*
 * RetroHoverCard: a Mac OS 9 preview panel that opens while the pointer (or
 * keyboard focus) rests on a link, on UI SDK.
 *
 * Crafted moment: pop from trigger. The card grows out of the link it
 * previews (scale .95 to 1 from --transform-origin, 140ms) and fades out
 * faster than it came in. Classic flair and reduced motion: it simply appears.
 */

import * as React from "react"
import {
  HoverCard as HoverCardPrimitive,
  HoverCardContent as HoverCardContentPrimitive,
  HoverCardTrigger as HoverCardTriggerPrimitive,
} from "@ui-sdk/react/hover-card"

import { cn } from "@/lib/utils"
import { popupClass } from "@/registry/new-york/lib/retro-motion"

function RetroHoverCard({
  openDelay,
  delay = openDelay ?? 700,
  closeDelay = 300,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive> & {
  /** shadcn-shaped alias for `delay` */
  openDelay?: number
}) {
  return <HoverCardPrimitive delay={delay} closeDelay={closeDelay} {...props} />
}

function RetroHoverCardTrigger(props: React.ComponentProps<typeof HoverCardTriggerPrimitive>) {
  return <HoverCardTriggerPrimitive {...props} />
}

function RetroHoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: Omit<React.ComponentProps<typeof HoverCardContentPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <HoverCardContentPrimitive
      align={align}
      sideOffset={sideOffset}
      className={popupClass(
        cn(
          /* Box properties carry `!` so UI SDK's popup reset can't strip them in
           * apps that haven't declared `@layer ui-sdk;` first. */
          "z-50 m-0! max-w-[300px]! p-[8px]! border! border-os9-black! bg-os9-white! text-os9-black! overflow-visible!",
          "shadow-[2px_2px_0_var(--os9-black)] outline-none",
          "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[1.3]",
          "origin-(--transform-origin) transition-[opacity,scale] duration-140 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "data-starting-style:opacity-0 data-starting-style:scale-95",
          "data-ending-style:opacity-0 data-ending-style:duration-100",
          "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
        ),
        className
      )}
      {...props}
    />
  )
}

export { RetroHoverCard, RetroHoverCardTrigger, RetroHoverCardContent }
