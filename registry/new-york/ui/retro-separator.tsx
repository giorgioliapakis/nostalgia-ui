"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function RetroSeparator(
  {
    className,
    orientation = "horizontal",
    decorative = true,
    ...props
  }: React.ComponentProps<typeof SeparatorPrimitive.Root>,
  ref: React.ForwardedRef<React.ComponentRef<typeof SeparatorPrimitive.Root>>
) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
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

const ForwardedRetroSeparator = React.forwardRef(RetroSeparator)
ForwardedRetroSeparator.displayName = "RetroSeparator"

export { ForwardedRetroSeparator as RetroSeparator }
