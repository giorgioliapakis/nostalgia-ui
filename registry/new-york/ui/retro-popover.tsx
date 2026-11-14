"use client"

/*
 * RetroPopover: a Mac OS 9 floating panel on UI SDK.
 *
 * Crafted moment: pop from trigger. The panel grows out of the control that
 * opened it (scale .95 to 1 from --transform-origin, 140ms) and fades out
 * faster than it came in. Classic flair and reduced motion: it simply appears.
 */

import * as React from "react"
import {
  Popover as PopoverPrimitive,
  PopoverClose as PopoverClosePrimitive,
  PopoverContent as PopoverContentPrimitive,
  PopoverTrigger as PopoverTriggerPrimitive,
} from "@ui-sdk/react/popover"

import { cn } from "@/lib/utils"
import { popupClass } from "@/registry/new-york/lib/retro-motion"

function RetroPopover(props: React.ComponentProps<typeof PopoverPrimitive>) {
  return <PopoverPrimitive {...props} />
}

function RetroPopoverTrigger(props: React.ComponentProps<typeof PopoverTriggerPrimitive>) {
  return <PopoverTriggerPrimitive {...props} />
}

function RetroPopoverClose(props: React.ComponentProps<typeof PopoverClosePrimitive>) {
  return <PopoverClosePrimitive {...props} />
}

function RetroPopoverContent({
  className,
  sideOffset = 4,
  ...props
}: Omit<React.ComponentProps<typeof PopoverContentPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <PopoverContentPrimitive
      sideOffset={sideOffset}
      className={popupClass(
        cn(
          /* Box properties carry `!` so UI SDK's popup reset can't strip them in
           * apps that haven't declared `@layer ui-sdk;` first. */
          "z-50 m-0! p-2! border! border-os9-black! bg-os9-white! text-os9-black! overflow-visible!",
          "shadow-[2px_2px_0_var(--os9-black)] outline-none",
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

export { RetroPopover, RetroPopoverTrigger, RetroPopoverContent, RetroPopoverClose }
