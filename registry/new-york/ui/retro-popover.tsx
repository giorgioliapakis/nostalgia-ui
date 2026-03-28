"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const RetroPopover = PopoverPrimitive.Root

const RetroPopoverTrigger = PopoverPrimitive.Trigger

const RetroPopoverAnchor = PopoverPrimitive.Anchor

const RetroPopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50",
        "bg-os9-white border border-os9-black",
        "shadow-[2px_2px_0_var(--os9-black)]",
        "p-2",
        "outline-none",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
RetroPopoverContent.displayName = "RetroPopoverContent"

export {
  RetroPopover,
  RetroPopoverTrigger,
  RetroPopoverContent,
  RetroPopoverAnchor,
}
