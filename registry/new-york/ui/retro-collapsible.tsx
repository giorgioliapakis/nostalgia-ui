"use client"

/*
 * RetroCollapsible on UI SDK Collapsible.
 *
 * Crafted moments:
 *  - The disclosure triangle turns the way the Finder's did, in two hard
 *    frames through 45°, not a smooth spin. Both flairs.
 *  - The content morphs its height open and shut (220ms open, 180ms close)
 *    so whatever sits below slides instead of jumping. Classic flair and
 *    reduced motion pop it open at once.
 */

import * as React from "react"
import {
  Collapsible as CollapsiblePrimitive,
  CollapsiblePanel as CollapsiblePanelPrimitive,
  CollapsibleTrigger as CollapsibleTriggerPrimitive,
} from "@ui-sdk/react/collapsible"

import { cn } from "@/lib/utils"

type Common = { className?: string; children?: React.ReactNode }

function RetroCollapsible({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CollapsiblePrimitive>, "className" | "children"> &
  Common) {
  return <CollapsiblePrimitive className={cn("w-full", className)} {...props} />
}

function RetroCollapsibleTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleTriggerPrimitive>, "className" | "children"> &
  Common) {
  return (
    <CollapsibleTriggerPrimitive
      className={cn(
        "group/collapsible-trigger flex flex-row items-center gap-1 cursor-pointer select-none",
        "os9-heading text-[12px]",
        "focus-visible:os9-focus-ring",
        className
      )}
      {...props}
    >
      {/* Disclosure triangle: 0° → 45° → 90° in two frames */}
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "shrink-0 transition-transform duration-[110ms] [transition-timing-function:steps(2,end)]",
          "motion-reduce:transition-none",
          "group-data-open/collapsible-trigger:rotate-90"
        )}
        aria-hidden="true"
      >
        <path d="M2 1L6 4L2 7Z" fill="var(--os9-black)" />
      </svg>
      {children}
    </CollapsibleTriggerPrimitive>
  )
}

function RetroCollapsibleContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CollapsiblePanelPrimitive>, "className" | "children"> &
  Common) {
  return (
    <CollapsiblePanelPrimitive
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden",
        "transition-[height] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "data-starting-style:h-0 data-ending-style:h-0 data-ending-style:duration-180",
        "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
      )}
      {...props}
    >
      <div className={cn("pl-4 font-[family-name:var(--os9-font-sans)] text-[10px]", className)}>
        {children}
      </div>
    </CollapsiblePanelPrimitive>
  )
}

export { RetroCollapsible, RetroCollapsibleTrigger, RetroCollapsibleContent }
