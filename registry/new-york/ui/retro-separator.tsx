"use client"

/*
 * RetroSeparator: the OS 9 etched groove (dark line over a white one).
 *
 * Crafted moment: none, static.
 */

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@ui-sdk/react/separator"

import { cn } from "@/lib/utils"

type RetroSeparatorProps = Omit<
  React.ComponentProps<typeof SeparatorPrimitive>,
  "className" | "children"
> & {
  className?: string
}

function RetroSeparator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: RetroSeparatorProps) {
  return (
    <SeparatorPrimitive
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal"
          ? "h-[2px] w-full border-t border-b border-t-[var(--os9-gray-700)] border-b-[var(--os9-white)]"
          : "w-[2px] self-stretch border-l border-r border-l-[var(--os9-gray-700)] border-r-[var(--os9-white)]",
        className
      )}
      {...props}
    />
  )
}

export { RetroSeparator }
