"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

import { cn } from "@/lib/utils"

interface RetroAspectRatioProps
  extends React.ComponentProps<typeof AspectRatioPrimitive.Root> {
  /** When true, wraps the content in an OS9-style inset border. Defaults to false. */
  bordered?: boolean
}

function RetroAspectRatio(
  { className, bordered = false, children, ...props }: RetroAspectRatioProps,
  ref: React.ForwardedRef<React.ComponentRef<typeof AspectRatioPrimitive.Root>>
) {
  if (bordered) {
    return (
      <div
        className="border border-[var(--os9-black)] bg-[var(--os9-white)]"
        style={{
          boxShadow:
            "inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white)",
        }}
      >
        <AspectRatioPrimitive.Root
          ref={ref}
          className={cn(className)}
          {...props}
        >
          {children}
        </AspectRatioPrimitive.Root>
      </div>
    )
  }

  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      className={cn(className)}
      {...props}
    >
      {children}
    </AspectRatioPrimitive.Root>
  )
}

const ForwardedRetroAspectRatio = React.forwardRef(RetroAspectRatio)
ForwardedRetroAspectRatio.displayName = "RetroAspectRatio"

export { ForwardedRetroAspectRatio as RetroAspectRatio }
export type { RetroAspectRatioProps }
