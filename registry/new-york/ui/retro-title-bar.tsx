"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Title Bar Control Box (close / zoom / collapse)                   */
/* ------------------------------------------------------------------ */

type ControlBoxVariant = "close" | "zoom" | "collapse"

interface ControlBoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ControlBoxVariant
  active?: boolean
}

/**
 * 13x13 beveled control box used in the title bar.
 *
 * - Close box: empty square
 * - Zoom box: nested-squares icon (small square inset top-left)
 * - Collapse box: horizontal line icon
 *
 * When the parent title bar is inactive, the box renders as a flat
 * transparent square with no gradient or icon.
 */
const ControlBox = React.forwardRef<HTMLButtonElement, ControlBoxProps>(
  ({ variant, active = true, className, ...props }, ref) => {
    if (!active) {
      return (
        <button
          ref={ref}
          type="button"
          className={cn("size-[13px] shrink-0", className)}
          aria-hidden
          tabIndex={-1}
          disabled
          {...props}
        />
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "relative size-[13px] shrink-0 cursor-default",
          className
        )}
        {...props}
      >
        {/* Outer bevel frame */}
        <span
          className="absolute inset-[2px] border border-os9-black"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #9a9a9a 0%, #f1f1f1 100%)",
          }}
        />

        {/* Inner shadow overlay */}
        <span
          className="absolute inset-[2px]"
          style={{
            boxShadow:
              "inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(0,0,0,0.15)",
          }}
        />

        {/* Variant-specific icon */}
        {variant === "collapse" && (
          /* Horizontal line across the middle */
          <span className="absolute left-[2px] right-[2px] top-[6px] h-px border-t border-os9-black" />
        )}

        {variant === "zoom" && (
          /* Small nested square in the top-left quadrant */
          <span className="absolute left-[2px] top-[2px] size-[5px] border border-os9-black" />
        )}

        {/* Outer pixel frame (top-left highlight, bottom-right shadow) */}
        <span
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.12)",
          }}
        />
      </button>
    )
  }
)
ControlBox.displayName = "ControlBox"

/* ------------------------------------------------------------------ */
/*  Stripe Region                                                      */
/* ------------------------------------------------------------------ */

/** The striped filler between control boxes and the title. */
function StripeRegion({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "flex-1 min-w-[4px] h-[13px]",
        active && "os9-stripes"
      )}
      style={
        active
          ? {
              /* Edge highlights matching Figma's bar picker */
              boxShadow:
                "inset 1px 0 0 #eee, inset -1px 0 0 #c5c5c5",
            }
          : undefined
      }
      aria-hidden
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroTitleBar                                                      */
/* ------------------------------------------------------------------ */

export interface RetroTitleBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Window title displayed in the center of the bar. */
  title: string
  /** Whether the window is in active/focused state. Defaults to true. */
  active?: boolean
  /** Callback when the close box is clicked. */
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  /** Callback when the collapse box is clicked. */
  onCollapse?: React.MouseEventHandler<HTMLButtonElement>
  /** Callback when the zoom box is clicked. */
  onZoom?: React.MouseEventHandler<HTMLButtonElement>
}

function RetroTitleBar(
  {
    title,
    active = true,
    onClose,
    onCollapse,
    onZoom,
    className,
    ...props
  }: RetroTitleBarProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-[19px] items-center",
        active ? "bg-os9-gray-400" : "bg-os9-gray-300",
        className
      )}
      {...props}
    >
      {/* Close box — far left */}
      <ControlBox
        variant="close"
        active={active}
        onClick={onClose}
        className="absolute left-[3px] top-[3px]"
        aria-label="Close"
      />

      {/* Inner layout: stripes + title + stripes + zoom box */}
      <div className="flex items-center gap-[4px] absolute left-[17px] right-[17px] top-[3px]">
        <StripeRegion active={active} />

        {/* Title */}
        <span
          className={cn(
            "shrink-0 whitespace-nowrap text-[12px] tracking-[0.42px] leading-[0.98]",
            "font-[family-name:var(--font-heading)] text-os9-black",
            "max-w-[60%] overflow-hidden text-ellipsis",
            !active && "opacity-50"
          )}
        >
          {title}
        </span>

        <StripeRegion active={active} />

        {/* Zoom box — sits next to right stripe region */}
        <ControlBox
          variant="zoom"
          active={active}
          onClick={onZoom}
          aria-label="Zoom"
        />
      </div>

      {/* Collapse box — far right */}
      <ControlBox
        variant="collapse"
        active={active}
        onClick={onCollapse}
        className="absolute right-[4px] top-[3px]"
        aria-label="Collapse"
      />
    </div>
  )
}

const ForwardedRetroTitleBar = React.forwardRef(RetroTitleBar)
ForwardedRetroTitleBar.displayName = "RetroTitleBar"

export { ForwardedRetroTitleBar as RetroTitleBar }
