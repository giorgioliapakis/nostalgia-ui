"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroAlert                                                         */
/* ------------------------------------------------------------------ */

const retroAlertVariants = cva(
  [
    "relative w-full",
    "border border-os9-black p-[12px]",
    "shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_#808080]",
    "text-os9-black",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-os9-gray-300",
          "border-l-[3px] border-l-os9-gray-300",
        ],
        warning: [
          "bg-[#ffffcc]",
          "border-l-[3px] border-l-[#ffffcc]",
        ],
        destructive: [
          "bg-[#ffcccc]",
          "border-l-[3px] border-l-[#ffcccc]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function RetroAlert(
  {
    className,
    variant,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof retroAlertVariants>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(retroAlertVariants({ variant }), className)}
      {...props}
    />
  )
}

const ForwardedRetroAlert = React.forwardRef(RetroAlert)
ForwardedRetroAlert.displayName = "RetroAlert"

/* ------------------------------------------------------------------ */
/*  RetroAlertTitle                                                    */
/* ------------------------------------------------------------------ */

function RetroAlertTitle(
  { className, ...props }: React.HTMLAttributes<HTMLHeadingElement>,
  ref: React.ForwardedRef<HTMLHeadingElement>
) {
  return (
    <h5
      ref={ref}
      className={cn(
        "font-[family-name:var(--font-heading)] text-[12px] font-bold leading-[1.2] tracking-[0.42px]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroAlertTitle = React.forwardRef(RetroAlertTitle)
ForwardedRetroAlertTitle.displayName = "RetroAlertTitle"

/* ------------------------------------------------------------------ */
/*  RetroAlertDescription                                              */
/* ------------------------------------------------------------------ */

function RetroAlertDescription(
  { className, ...props }: React.HTMLAttributes<HTMLParagraphElement>,
  ref: React.ForwardedRef<HTMLParagraphElement>
) {
  return (
    <p
      ref={ref}
      className={cn(
        "font-[family-name:var(--font-sans)] text-[10px] leading-[1.4] mt-[4px]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroAlertDescription = React.forwardRef(RetroAlertDescription)
ForwardedRetroAlertDescription.displayName = "RetroAlertDescription"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  ForwardedRetroAlert as RetroAlert,
  ForwardedRetroAlertTitle as RetroAlertTitle,
  ForwardedRetroAlertDescription as RetroAlertDescription,
  retroAlertVariants,
}
