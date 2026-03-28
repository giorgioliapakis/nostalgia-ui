"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroTitleBar } from "@/registry/new-york/ui/retro-title-bar"

/* ------------------------------------------------------------------ */
/*  RetroWindow                                                        */
/* ------------------------------------------------------------------ */

export interface RetroWindowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Window title displayed in the title bar. */
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

const RetroWindow = React.forwardRef<HTMLDivElement, RetroWindowProps>(
  (
    {
      title,
      active = true,
      onClose,
      onCollapse,
      onZoom,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        style={{
          border: "1px solid var(--os9-black)",
          backgroundColor: "var(--os9-gray-200)",
          boxShadow: active
            ? "var(--os9-shadow-window)"
            : undefined,
        }}
        {...props}
      >
        {/* Title bar */}
        <RetroTitleBar
          title={title}
          active={active}
          onClose={onClose}
          onCollapse={onCollapse}
          onZoom={onZoom}
        />

        {/* Content area */}
        <div
          className="flex-1"
          style={{
            padding: "8px",
            boxShadow: "-1px -1px 0 rgba(38,38,38,0.4)",
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)
RetroWindow.displayName = "RetroWindow"

export { RetroWindow }
