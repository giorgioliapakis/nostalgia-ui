"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const RetroSwitch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      // Rectangular track: 28x14
      "peer inline-flex h-[14px] w-[28px] shrink-0 items-center",
      // Border + inset bevel for depth
      "border border-os9-black",
      "bg-os9-gray-300",
      "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
      // Checked: azul track
      "data-[state=checked]:bg-os9-azul",
      // Disabled
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Focus
      "focus-visible:outline-none focus-visible:os9-focus-ring",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        // Rectangular thumb: 12x12 with raised bevel
        "pointer-events-none block h-[12px] w-[12px]",
        "bg-os9-gray-300",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_#808080]",
        // Slide transition
        "transition-transform duration-100",
        "translate-x-0 data-[state=checked]:translate-x-[14px]"
      )}
    />
  </SwitchPrimitive.Root>
))
RetroSwitch.displayName = "RetroSwitch"

export { RetroSwitch }
