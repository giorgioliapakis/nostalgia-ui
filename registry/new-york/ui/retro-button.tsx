"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroButtonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
    "cursor-pointer select-none",
    "transition-none",
    "focus-visible:os9-focus-ring",
  ],
  {
    variants: {
      variant: {
        default: [
          "border border-os9-black bg-os9-gray-300 text-os9-black",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          "active:bg-os9-gray-800 active:text-os9-white",
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        ],
        primary: [
          "border-[2px] border-os9-black bg-os9-gray-300 text-os9-black",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          "active:bg-os9-gray-800 active:text-os9-white",
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        ],
        secondary: [
          "border-y border-x-0 border-os9-black bg-os9-gray-300 text-os9-black",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(128,128,128,0.5)]",
          "active:bg-os9-gray-800 active:text-os9-white",
          "active:shadow-[inset_0_1px_0_rgba(38,38,38,0.4),inset_0_-1px_0_rgba(133,133,133,1)]",
        ],
      },
      size: {
        default: "h-[24px] px-4 py-0",
        sm: "h-[20px] px-2 py-0 text-[10px]",
        lg: "h-[30px] px-6 py-0 text-[12px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function RetroButton(
  {
    className,
    variant,
    size,
    asChild = false,
    disabled,
    ...props
  }: React.ComponentProps<"button"> &
    VariantProps<typeof retroButtonVariants> & {
      asChild?: boolean
    },
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        retroButtonVariants({ variant, size }),
        disabled && [
          "pointer-events-none",
          "text-os9-gray-600",
          "border-os9-gray-600",
          "shadow-[inset_1px_1px_0_var(--os9-gray-300),inset_-1px_-1px_0_var(--os9-gray-400)]",
        ],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    />
  )
}

const ForwardedRetroButton = React.forwardRef(RetroButton)
ForwardedRetroButton.displayName = "RetroButton"

export { ForwardedRetroButton as RetroButton, retroButtonVariants }
