"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroTextVariants = cva("text-os9-black", {
  variants: {
    variant: {
      editorial: [
        "font-[family-name:'Apple_Garamond',Georgia,serif]",
        "text-[24px]",
        "font-normal",
        "leading-[1.2]",
      ],
      headline: [
        "font-[family-name:var(--font-heading)]",
        "text-[12px]",
        "tracking-[0.42px]",
        "leading-[0.98]",
      ],
      smallHeadline: [
        "font-[family-name:var(--font-heading)]",
        "text-[10px]",
        "tracking-[0.42px]",
        "leading-[0.98]",
      ],
      body: [
        "font-[family-name:var(--font-sans)]",
        "text-[10px]",
        "leading-[1.3]",
      ],
      bodySmall: [
        "font-[family-name:var(--font-sans)]",
        "text-[9px]",
        "leading-[1.3]",
      ],
      bodyBold: [
        "font-[family-name:var(--font-sans)]",
        "text-[9px]",
        "font-bold",
        "leading-[1.3]",
      ],
      bodySlanted: [
        "font-[family-name:var(--font-sans)]",
        "text-[9px]",
        "italic",
        "leading-[1.3]",
      ],
      mono: [
        "font-[family-name:var(--font-mono)]",
        "text-[10px]",
        "leading-[1.3]",
      ],
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type RetroTextProps = React.ComponentPropsWithoutRef<"p"> &
  VariantProps<typeof retroTextVariants> & {
    as?: React.ElementType
  }

function RetroText(
  { as: Comp = "p", variant, className, ...props }: RetroTextProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <Comp
      className={cn(retroTextVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
}

const ForwardedRetroText = React.forwardRef(RetroText)
ForwardedRetroText.displayName = "RetroText"

export { ForwardedRetroText as RetroText, retroTextVariants }
