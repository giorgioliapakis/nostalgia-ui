"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroBadgeVariants = cva(
  [
    "inline-flex items-center whitespace-nowrap",
    "font-[family-name:var(--font-heading)] text-[9px] leading-[1]",
    "px-2 py-0.5",
    "border border-os9-black",
    "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_#808080]",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-os9-gray-300 text-os9-black",
        accent: "bg-os9-lavender text-os9-black",
        azul: "bg-os9-azul text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function RetroBadge(
  {
    className,
    variant,
    ...props
  }: React.ComponentProps<"span"> &
    VariantProps<typeof retroBadgeVariants>,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  return (
    <span
      className={cn(retroBadgeVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
}

const ForwardedRetroBadge = React.forwardRef(RetroBadge)
ForwardedRetroBadge.displayName = "RetroBadge"

export { ForwardedRetroBadge as RetroBadge, retroBadgeVariants }
