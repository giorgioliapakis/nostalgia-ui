"use client"

/*
 * RetroToggle: a two-state bevel button that stays pushed in while on.
 *
 * Crafted moment: none on purpose. The bevel inverts the instant it's
 * pressed, like every OS 9 bevel button; motion here would only add lag.
 */

import * as React from "react"
import { Toggle as TogglePrimitive } from "@ui-sdk/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroToggleVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
    "cursor-pointer select-none",
    "transition-none",
    "border border-os9-black bg-os9-gray-300 text-os9-black",
    "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_#808080]",
    "data-pressed:bg-os9-gray-700 data-pressed:text-os9-white",
    "data-pressed:shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_var(--os9-white)]",
    "focus-visible:os9-focus-ring",
    "data-disabled:opacity-50 data-disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        default: "h-[24px] px-[8px] py-[4px]",
        sm: "h-[20px] px-[6px] py-[2px] text-[10px]",
        lg: "h-[30px] px-[12px] py-[4px] text-[12px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type RetroToggleProps = Omit<
  React.ComponentProps<typeof TogglePrimitive>,
  "className" | "children"
> &
  VariantProps<typeof retroToggleVariants> & {
    className?: string
    children?: React.ReactNode
  }

function RetroToggle({ className, size, ...props }: RetroToggleProps) {
  return <TogglePrimitive className={cn(retroToggleVariants({ size }), className)} {...props} />
}

export { RetroToggle, retroToggleVariants }
