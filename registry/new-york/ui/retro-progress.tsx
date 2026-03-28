"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface RetroProgressProps extends React.ComponentProps<"div"> {
  /** Progress value from 0 to 100. Clamped to [0, 100]. */
  value?: number
  /** If true, shows an animated indeterminate state. */
  indeterminate?: boolean
}

function RetroProgress(
  { className, value = 0, indeterminate = false, ...props }: RetroProgressProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative h-[16px] w-full",
        // Inset bevel track: black border, inner shadow for depth
        "border border-os9-black",
        "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        "bg-os9-gray-500",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Fill bar */}
      <div
        className={cn(
          "absolute inset-y-[1px] left-[1px]",
          "transition-none",
          indeterminate && "retro-progress-indeterminate"
        )}
        style={{
          width: indeterminate
            ? "calc(100% - 2px)"
            : clampedValue === 0
              ? 0
              : `calc(${clampedValue}% - 2px)`,
          // Candy-stripe diagonal pattern:
          // Alternating azul (#333399) and a slightly lighter azul (#4c4cb2)
          // with a horizontal banding overlay for the OS9 3D gradient effect
          background: `
            repeating-linear-gradient(
              45deg,
              var(--os9-azul),
              var(--os9-azul) 2px,
              #4c4cb2 2px,
              #4c4cb2 4px
            )
          `,
          backgroundSize: indeterminate ? "28px 28px" : undefined,
          // Inner bevel on the fill for 3D depth matching the Figma gradient
          boxShadow: clampedValue > 0 || indeterminate
            ? "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.25)"
            : "none",
        }}
      />
      {/* Keyframe animation for the indeterminate stripe movement */}
      {indeterminate && (
        <style>{`
          @keyframes retro-progress-stripe {
            from { background-position: 0 0; }
            to { background-position: 28px 0; }
          }
          .retro-progress-indeterminate {
            animation: retro-progress-stripe 0.6s linear infinite;
          }
        `}</style>
      )}
    </div>
  )
}

const ForwardedRetroProgress = React.forwardRef(RetroProgress)
ForwardedRetroProgress.displayName = "RetroProgress"

export { ForwardedRetroProgress as RetroProgress }
export type { RetroProgressProps }
