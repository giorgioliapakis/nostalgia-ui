"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroLabelVariants = cva(
  [
    "font-[family-name:var(--font-sans)]",
    "text-os9-black",
    "cursor-default select-none",
    "peer-disabled:text-os9-gray-600 peer-disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        default: "text-[10px] leading-normal",
        lg: "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const RetroLabel = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof retroLabelVariants>
>(({ className, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(retroLabelVariants({ size }), className)}
    {...props}
  />
))
RetroLabel.displayName = "RetroLabel"

export { RetroLabel, retroLabelVariants }
