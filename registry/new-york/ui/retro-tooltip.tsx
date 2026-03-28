"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const RetroTooltipProvider = TooltipPrimitive.Provider

const RetroTooltip = TooltipPrimitive.Root

const RetroTooltipTrigger = TooltipPrimitive.Trigger

const RetroTooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50",
        "rounded-[6px] border border-[var(--os9-black)] bg-[#ffffcc]",
        "px-[8px] py-[4px]",
        "shadow-[1px_1px_0_rgba(0,0,0,0.3)]",
        "font-[family-name:var(--font-heading)] text-[10px] text-[var(--os9-black)]",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
RetroTooltipContent.displayName = "RetroTooltipContent"

export {
  RetroTooltipProvider,
  RetroTooltip,
  RetroTooltipTrigger,
  RetroTooltipContent,
}
