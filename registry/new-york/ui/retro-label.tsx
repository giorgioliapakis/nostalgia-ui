"use client"

/*
 * RetroLabel: Charcoal/Geneva label text.
 *
 * Crafted moment: none, static.
 *
 * Built on UI SDK's Label, a native <label> that also names controls a
 * plain label can't reach (a radio group, a slider) by htmlFor, and moves
 * focus into them on press.
 */

import * as React from "react"
import { Label as LabelPrimitive } from "@ui-sdk/react/label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroLabelVariants = cva(
  [
    "font-[family-name:var(--os9-font-sans)]",
    "text-os9-black",
    "cursor-default select-none",
    "peer-disabled:text-os9-gray-600 peer-disabled:pointer-events-none",
    "peer-data-disabled:text-os9-gray-600 peer-data-disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        default: "text-[10px] leading-normal",
        lg: "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type RetroLabelProps = Omit<
  React.ComponentProps<typeof LabelPrimitive>,
  "className" | "children"
> &
  VariantProps<typeof retroLabelVariants> & {
    className?: string
    children?: React.ReactNode
  }

function RetroLabel({ className, size, ...props }: RetroLabelProps) {
  return <LabelPrimitive className={cn(retroLabelVariants({ size }), className)} {...props} />
}

export { RetroLabel, retroLabelVariants }
