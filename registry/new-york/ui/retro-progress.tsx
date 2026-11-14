"use client"

/*
 * RetroProgress on UI SDK Progress.
 *
 * Crafted moments:
 *  - Determinate: the fill eases to each new value (500ms, strong ease-out),
 *    so jumpy real-world progress reads as steady work. Classic flair jumps,
 *    as the Finder's copy bar did.
 *  - Indeterminate: the barber pole. A seamless stripe tile scrolls smoothly
 *    in modern flair; classic steps it a stripe at a time. Reduced motion
 *    holds it still.
 */

import * as React from "react"
import {
  Progress as ProgressPrimitive,
  ProgressIndicator as ProgressIndicatorPrimitive,
  ProgressTrack as ProgressTrackPrimitive,
} from "@ui-sdk/react/progress"

import { cn } from "@/lib/utils"

/*
 * A 6px tile of 45° stripes (azul / lighter azul, ~2px each) that repeats
 * without a seam, so the pole can scroll by whole tiles forever.
 */
const TILE = 6
const STRIPES =
  "linear-gradient(45deg, var(--os9-azul) 25%, #4c4cb2 25% 50%, var(--os9-azul) 50% 75%, #4c4cb2 75%)"

const CSS = `
@keyframes os9-barber-pole { from { background-position: 0 0; } to { background-position: ${TILE * 4}px 0; } }
.os9-barber-pole[data-indeterminate] { animation: os9-barber-pole 600ms linear infinite; }
[data-flair="classic"] .os9-barber-pole[data-indeterminate] { animation-timing-function: steps(4, end); }
@media (prefers-reduced-motion: reduce) { .os9-barber-pole[data-indeterminate] { animation: none; } }
`

interface RetroProgressProps
  extends Omit<React.ComponentProps<typeof ProgressPrimitive>, "className" | "children" | "value"> {
  className?: string
  /** Progress value from 0 to 100. Clamped to [0, 100]. */
  value?: number
  /** If true, shows the barber pole: under way, but how far is unknown. */
  indeterminate?: boolean
}

function RetroProgress({ className, value = 0, indeterminate = false, ...props }: RetroProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <ProgressPrimitive
      value={indeterminate ? null : clamped}
      min={0}
      max={100}
      className={cn("relative h-[16px] w-full", className)}
      {...props}
    >
      <style href="os9-progress" precedence="default">
        {CSS}
      </style>
      <ProgressTrackPrimitive
        className={cn(
          "relative h-full w-full overflow-hidden",
          /* Inset bevel track: black border, inner shadow for depth */
          "border border-os9-black bg-os9-gray-500",
          "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]"
        )}
      >
        <ProgressIndicatorPrimitive
          className={cn(
            "os9-barber-pole absolute inset-y-[1px] left-[1px] max-w-[calc(100%-2px)]",
            /* Inner bevel on the fill for the OS 9 3D look */
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.25)]",
            "transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            "in-data-[flair=classic]:transition-none motion-reduce:transition-none",
            "data-indeterminate:w-[calc(100%-2px)]!"
          )}
          style={{ backgroundImage: STRIPES, backgroundSize: `${TILE}px ${TILE}px` }}
        />
      </ProgressTrackPrimitive>
    </ProgressPrimitive>
  )
}

export { RetroProgress }
export type { RetroProgressProps }
