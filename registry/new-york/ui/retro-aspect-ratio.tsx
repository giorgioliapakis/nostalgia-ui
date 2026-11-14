"use client"

/*
 * RetroAspectRatio: a box that keeps a width-to-height ratio.
 *
 * No behaviour to borrow, so no primitive: CSS `aspect-ratio` on the outer
 * box, with children laid out in an inner box that fills it. Crafted
 * moment: none, static.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

interface RetroAspectRatioProps extends React.ComponentProps<"div"> {
  /** Width divided by height, e.g. `16 / 9`. Defaults to 1. */
  ratio?: number
  /** When true, wraps the content in an OS9-style inset border. Defaults to false. */
  bordered?: boolean
}

function RetroAspectRatio({
  className,
  ratio = 1,
  bordered = false,
  style,
  children,
  ...props
}: RetroAspectRatioProps) {
  const box = (
    <div className="relative w-full" style={{ aspectRatio: ratio }} data-slot="aspect-ratio">
      <div className={cn("absolute inset-0", className)} style={style} {...props}>
        {children}
      </div>
    </div>
  )

  if (!bordered) return box

  return (
    <div
      className="border border-[var(--os9-black)] bg-[var(--os9-white)]"
      style={{
        boxShadow: "inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white)",
      }}
    >
      {box}
    </div>
  )
}

export { RetroAspectRatio }
export type { RetroAspectRatioProps }
