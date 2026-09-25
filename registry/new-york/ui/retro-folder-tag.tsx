"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * The folder tag is the tab that sticks out of a Mac OS 9 pop-up window
 * (a folder dragged to the bottom of the screen). It is a raised strip,
 * open on the edge that joins the window, holding a small icon and the
 * folder name. `side` names that open edge: "bottom" for a tab sitting on
 * top of its window (the usual case), "top" for a tab hanging below one.
 *
 * The tag overlaps its window by 1px on the open edge so an active tag
 * merges with the window frame beneath it.
 */
const retroFolderTagVariants = cva(
  [
    "relative inline-flex max-w-full items-center gap-[6px]",
    "border-x border-os9-black",
    "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
    "whitespace-nowrap select-none transition-none",
    "focus-visible:z-10 focus-visible:os9-focus-ring",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-os9-gray-600",
  ],
  {
    variants: {
      side: {
        bottom: [
          "border-t -mb-px",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_0_0_var(--os9-gray-700)]",
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-800),inset_-1px_0_0_var(--os9-gray-500)]",
        ],
        top: [
          "border-b -mt-px",
          "shadow-[inset_1px_0_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          "active:shadow-[inset_1px_0_0_var(--os9-gray-800),inset_-1px_-1px_0_var(--os9-gray-500)]",
        ],
      },
      active: {
        true: "z-[1] bg-os9-gray-200 text-os9-black",
        false: "bg-os9-gray-300 text-os9-gray-800",
      },
      size: {
        sm: "h-[18px] px-[8px] text-[10px]",
        default: "h-[22px] px-[12px]",
      },
    },
    defaultVariants: {
      side: "bottom",
      active: true,
      size: "default",
    },
  }
)

interface RetroFolderTagProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title">,
    VariantProps<typeof retroFolderTagVariants> {
  /** Small (16px) icon before the name, e.g. <RetroIconFolder size="sm" />. */
  icon?: React.ReactNode
}

const RetroFolderTag = React.forwardRef<HTMLButtonElement, RetroFolderTagProps>(
  function RetroFolderTag(
    { className, side, active, size, icon, children, type = "button", ...props },
    ref
  ) {
    const isActive = active ?? true
    return (
      <button
        ref={ref}
        type={type}
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          retroFolderTagVariants({ side, active: isActive, size }),
          "cursor-pointer active:bg-os9-gray-700 active:text-os9-white",
          className
        )}
        {...props}
      >
        {icon ? (
          <span className="inline-flex shrink-0 items-center">{icon}</span>
        ) : null}
        <span className="truncate">{children}</span>
      </button>
    )
  }
)
RetroFolderTag.displayName = "RetroFolderTag"

export { RetroFolderTag, retroFolderTagVariants }
export type { RetroFolderTagProps }
