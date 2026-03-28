"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroNavButtonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "size-[16px] p-0",
    "border border-os9-black bg-os9-gray-300",
    "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
    "cursor-pointer select-none",
    "transition-none",
    "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
    "focus-visible:os9-focus-ring",
  ],
  {
    variants: {
      direction: {
        left: "",
        right: "",
        up: "",
        down: "",
      },
    },
    defaultVariants: {
      direction: "left",
    },
  }
)

/* Simple filled triangles pointing in each direction within a 6x6 viewBox */
const arrowPaths: Record<string, string> = {
  left: "M5 1 L1 3 L5 5 Z",
  right: "M1 1 L5 3 L1 5 Z",
  up: "M1 5 L3 1 L5 5 Z",
  down: "M1 1 L3 5 L5 1 Z",
}

function RetroNavButton(
  {
    className,
    direction = "left",
    disabled,
    ...props
  }: React.ComponentProps<"button"> &
    VariantProps<typeof retroNavButtonVariants>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const dir = direction ?? "left"

  return (
    <button
      className={cn(
        retroNavButtonVariants({ direction }),
        disabled && [
          "opacity-50",
          "pointer-events-none",
        ],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={arrowPaths[dir]} fill="currentColor" />
      </svg>
    </button>
  )
}

const ForwardedRetroNavButton = React.forwardRef(RetroNavButton)
ForwardedRetroNavButton.displayName = "RetroNavButton"

export { ForwardedRetroNavButton as RetroNavButton, retroNavButtonVariants }
