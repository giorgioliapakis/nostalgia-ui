"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Variants                                                           */
/* ------------------------------------------------------------------ */

/*
 * The etched frame is a dark 1px line with a white 1px line offset
 * down/right of it: border + inset highlight (top/left) + outer highlight
 * (bottom/right). Primary uses gray-700, secondary the lighter gray-500.
 */
const retroGroupBoxFrameVariants = cva(
  ["border", "shadow-[inset_1px_1px_0_var(--os9-white),1px_1px_0_var(--os9-white)]"],
  {
    variants: {
      variant: {
        primary: "border-os9-gray-700",
        secondary: "border-os9-gray-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  RetroGroupBox                                                      */
/* ------------------------------------------------------------------ */

interface RetroGroupBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof retroGroupBoxFrameVariants> {
  /**
   * Title that interrupts the top border. A string renders as Charcoal
   * text; any ReactNode works (e.g. a RetroCheckbox + label, or a
   * RetroSelect pop-up) for checkbox / pop-up group boxes.
   */
  title?: React.ReactNode
  /** Extra classes for the title plate (set its background here if the
   *  group box sits on something other than the default gray-200). */
  titleClassName?: string
  /** Extra classes for the inner content frame. */
  contentClassName?: string
}

const RetroGroupBox = React.forwardRef<HTMLDivElement, RetroGroupBoxProps>(
  function RetroGroupBox(
    {
      className,
      variant,
      title,
      titleClassName,
      contentClassName,
      children,
      ...props
    },
    ref
  ) {
    const titleId = React.useId()
    const hasTitle = title != null && title !== false
    const isTextTitle = typeof title === "string" || typeof title === "number"

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={hasTitle ? titleId : undefined}
        className={cn("relative", hasTitle ? "pt-[8px]" : "pt-px", className)}
        {...props}
      >
        <div
          className={cn(
            retroGroupBoxFrameVariants({ variant }),
            "px-[10px] pb-[10px]",
            hasTitle ? "pt-[14px]" : "pt-[10px]",
            contentClassName
          )}
        >
          {children}
        </div>

        {hasTitle ? (
          <div
            id={titleId}
            className={cn(
              // Plate masks the etched line behind the title. Override the
              // colour via --retro-group-box-bg or titleClassName.
              "absolute left-[8px] top-0 flex h-[16px] items-center gap-[4px] px-[4px]",
              "bg-[var(--retro-group-box-bg,var(--os9-gray-200))]",
              isTextTitle &&
                "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98] text-os9-black",
              titleClassName
            )}
          >
            {title}
          </div>
        ) : null}
      </div>
    )
  }
)
RetroGroupBox.displayName = "RetroGroupBox"

export { RetroGroupBox, retroGroupBoxFrameVariants }
export type { RetroGroupBoxProps }
