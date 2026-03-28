"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroToggleVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
    "cursor-pointer select-none",
    "transition-none",
    "border border-os9-black bg-os9-gray-300 text-os9-black",
    "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_#808080]",
    "data-[state=on]:bg-os9-gray-700 data-[state=on]:text-os9-white",
    "data-[state=on]:shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_var(--os9-white)]",
    "focus-visible:os9-focus-ring",
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

function RetroToggle(
  {
    className,
    size,
    disabled,
    ...props
  }: React.ComponentProps<typeof TogglePrimitive.Root> &
    VariantProps<typeof retroToggleVariants>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <TogglePrimitive.Root
      className={cn(
        retroToggleVariants({ size }),
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    />
  )
}

const ForwardedRetroToggle = React.forwardRef(RetroToggle)
ForwardedRetroToggle.displayName = "RetroToggle"

export { ForwardedRetroToggle as RetroToggle, retroToggleVariants }
