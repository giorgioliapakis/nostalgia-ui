"use client"

/*
 * RetroSwitch: a 28x14 inset track with a raised square thumb.
 *
 * Crafted moment: the thumb slides across the track (100ms ease-out) and
 * the track turns azul as it lands, so on/off reads as one movement.
 * Classic flair and reduced motion: the thumb jumps.
 */

import * as React from "react"
import {
  Switch as SwitchPrimitive,
  SwitchThumb as SwitchThumbPrimitive,
} from "@ui-sdk/react/switch"

import { cn } from "@/lib/utils"

type RetroSwitchProps = Omit<
  React.ComponentProps<typeof SwitchPrimitive>,
  "className" | "children"
> & {
  className?: string
}

function RetroSwitch({ className, ...props }: RetroSwitchProps) {
  return (
    <SwitchPrimitive
      className={cn(
        // Rectangular track: 28x14
        "peer inline-flex h-[14px] w-[28px] shrink-0 items-center p-0",
        // Border + inset bevel for depth
        "border border-os9-black",
        "bg-os9-gray-300",
        "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        // Checked: azul track
        "data-checked:bg-os9-azul",
        // Disabled
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        // Focus
        "focus-visible:outline-none focus-visible:os9-focus-ring",
        className
      )}
      {...props}
    >
      <SwitchThumbPrimitive
        className={cn(
          // Rectangular thumb: 12x12 with raised bevel
          "pointer-events-none block h-[12px] w-[12px]",
          "bg-os9-gray-300",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_#808080]",
          // Slide
          "transition-transform duration-100 ease-out",
          "in-data-[flair=classic]:transition-none motion-reduce:transition-none",
          "translate-x-0 data-checked:translate-x-[14px]"
        )}
      />
    </SwitchPrimitive>
  )
}

export { RetroSwitch }
