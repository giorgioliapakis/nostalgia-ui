"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Placards sit at the bottom-left of a document window, sharing the
 * 16px-tall row with the horizontal scroll bar. They are a raised gray
 * strip holding Geneva 9px status text, or a pop-up (PlacardButton).
 */

const placardBase = [
  "inline-flex h-[16px] shrink-0 items-center gap-[4px] px-[6px]",
  "border border-os9-black bg-os9-gray-300 text-os9-black",
  "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
  "font-[family-name:var(--os9-font-sans)] text-[9px] leading-none whitespace-nowrap",
  "select-none",
]

/* ------------------------------------------------------------------ */
/*  RetroPlacard                                                       */
/* ------------------------------------------------------------------ */

type RetroPlacardProps = React.HTMLAttributes<HTMLDivElement>

const RetroPlacard = React.forwardRef<HTMLDivElement, RetroPlacardProps>(
  function RetroPlacard({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="status"
        className={cn(placardBase, "cursor-default overflow-hidden", className)}
        {...props}
      />
    )
  }
)
RetroPlacard.displayName = "RetroPlacard"

/* ------------------------------------------------------------------ */
/*  RetroPlacardButton                                                 */
/* ------------------------------------------------------------------ */

interface RetroPlacardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Draws the pop-up arrow at the right edge. Defaults to true — a
   * placard button is almost always a pop-up (zoom level, page, etc.).
   */
  popup?: boolean
}

/**
 * Clickable placard (a pop-up). Forwards all props, so it works as
 * `<DropdownMenuTrigger asChild><RetroPlacardButton>…` — Radix's
 * data-state="open" keeps the pressed look while the menu is open.
 */
const RetroPlacardButton = React.forwardRef<
  HTMLButtonElement,
  RetroPlacardButtonProps
>(function RetroPlacardButton(
  { className, popup = true, children, type = "button", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        placardBase,
        "cursor-pointer transition-none",
        "active:bg-os9-gray-700 active:text-os9-white",
        "active:shadow-[inset_1px_1px_0_var(--os9-gray-800),inset_-1px_-1px_0_var(--os9-gray-500)]",
        "data-[state=open]:bg-os9-gray-700 data-[state=open]:text-os9-white",
        "data-[state=open]:shadow-[inset_1px_1px_0_var(--os9-gray-800),inset_-1px_-1px_0_var(--os9-gray-500)]",
        "focus-visible:os9-focus-ring",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-os9-gray-600",
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      {popup ? (
        <svg
          width="7"
          height="4"
          viewBox="0 0 7 4"
          aria-hidden="true"
          className="ml-auto shrink-0"
        >
          <path d="M0 0H7L3.5 4Z" fill="currentColor" />
        </svg>
      ) : null}
    </button>
  )
})
RetroPlacardButton.displayName = "RetroPlacardButton"

export { RetroPlacard, RetroPlacardButton }
export type { RetroPlacardProps, RetroPlacardButtonProps }
