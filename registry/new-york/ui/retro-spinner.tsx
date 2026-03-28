"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------------------
 * Shared size variants
 * -------------------------------------------------------------------------*/

const spinnerSizeVariants = cva("inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const sizePixels: Record<string, number> = {
  sm: 16,
  default: 24,
  lg: 32,
}

/* ---------------------------------------------------------------------------
 * RetroSpinner — Mac OS 9 watch cursor
 *
 * An animated wristwatch: circle face with hour marks at 12/3/6/9 and a
 * rotating second-hand line. Pure SVG + CSS animation.
 * -------------------------------------------------------------------------*/

interface RetroSpinnerProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof spinnerSizeVariants> {}

const RetroSpinner = React.forwardRef<HTMLDivElement, RetroSpinnerProps>(
  function RetroSpinner({ className, size = "default", ...props }, ref) {
    const px = sizePixels[size ?? "default"]

    return (
      <div
        ref={ref}
        role="status"
        className={cn(spinnerSizeVariants({ size }), className)}
        {...props}
      >
        <svg
          width={px}
          height={px}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Watch band top */}
          <rect x="8" y="0" width="8" height="4" rx="0" fill="#262626" />
          {/* Watch band bottom */}
          <rect x="8" y="20" width="8" height="4" rx="0" fill="#262626" />

          {/* Watch case (outer) */}
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="#cccccc"
            stroke="#262626"
            strokeWidth="1.5"
          />
          {/* Watch face */}
          <circle cx="12" cy="12" r="7.5" fill="#eeeeee" stroke="#262626" strokeWidth="1" />

          {/* Hour marks at 12, 3, 6, 9 */}
          <line x1="12" y1="5.5" x2="12" y2="7" stroke="#262626" strokeWidth="1" />
          <line x1="17" y1="12" x2="18.5" y2="12" stroke="#262626" strokeWidth="1" />
          <line x1="12" y1="17" x2="12" y2="18.5" stroke="#262626" strokeWidth="1" />
          <line x1="5.5" y1="12" x2="7" y2="12" stroke="#262626" strokeWidth="1" />

          {/* Small minute marks at 1,2,4,5,7,8,10,11 (small dots) */}
          <circle cx="14.6" cy="6.2" r="0.4" fill="#808080" />
          <circle cx="16.8" cy="8.4" r="0.4" fill="#808080" />
          <circle cx="16.8" cy="15.6" r="0.4" fill="#808080" />
          <circle cx="14.6" cy="17.8" r="0.4" fill="#808080" />
          <circle cx="9.4" cy="17.8" r="0.4" fill="#808080" />
          <circle cx="7.2" cy="15.6" r="0.4" fill="#808080" />
          <circle cx="7.2" cy="8.4" r="0.4" fill="#808080" />
          <circle cx="9.4" cy="6.2" r="0.4" fill="#808080" />

          {/* Center dot */}
          <circle cx="12" cy="12" r="1" fill="#262626" />

          {/* Hour hand (short, pointing roughly at 10) */}
          <line
            x1="12"
            y1="12"
            x2="12"
            y2="8"
            stroke="#262626"
            strokeWidth="1.5"
            strokeLinecap="square"
          />

          {/* Rotating second hand */}
          <line
            x1="12"
            y1="12"
            x2="12"
            y2="5.5"
            stroke="#262626"
            strokeWidth="0.75"
            strokeLinecap="square"
            className="retro-spinner-hand"
            style={{ transformOrigin: "12px 12px" }}
          />
        </svg>

        <span className="sr-only">Loading...</span>

        <style>{`
          @keyframes retro-spinner-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .retro-spinner-hand {
            animation: retro-spinner-rotate 1.2s steps(12) infinite;
          }
        `}</style>
      </div>
    )
  }
)
RetroSpinner.displayName = "RetroSpinner"

/* ---------------------------------------------------------------------------
 * RetroBeachBall — Mac OS 9 spinning wait cursor
 *
 * A circle divided into colored segments (pinwheel style) that rotates
 * continuously using Tailwind's animate-spin.
 * -------------------------------------------------------------------------*/

interface RetroBeachBallProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof spinnerSizeVariants> {}

const RetroBeachBall = React.forwardRef<HTMLDivElement, RetroBeachBallProps>(
  function RetroBeachBall({ className, size = "default", ...props }, ref) {
    const px = sizePixels[size ?? "default"]
    const r = 10
    const cx = 12
    const cy = 12

    // Build 6 equal pie segments (60 degrees each) for a classic pinwheel
    const colors = [
      "#333399", // azul
      "#cc0000", // red
      "#339933", // green
      "#cc9900", // gold
      "#333399", // azul
      "#cc0000", // red
    ]

    const segments: React.ReactNode[] = []
    for (let i = 0; i < 6; i++) {
      const startAngle = (i * 60 - 90) * (Math.PI / 180)
      const endAngle = ((i + 1) * 60 - 90) * (Math.PI / 180)
      const x1 = cx + r * Math.cos(startAngle)
      const y1 = cy + r * Math.sin(startAngle)
      const x2 = cx + r * Math.cos(endAngle)
      const y2 = cy + r * Math.sin(endAngle)
      segments.push(
        <path
          key={i}
          d={`M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 0,1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`}
          fill={colors[i]}
        />
      )
    }

    return (
      <div
        ref={ref}
        role="status"
        className={cn(spinnerSizeVariants({ size }), className)}
        {...props}
      >
        <svg
          width={px}
          height={px}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="animate-spin"
          style={{ animationDuration: "1s" }}
        >
          {/* Colored segments */}
          {segments}
          {/* Outer ring / border */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#262626"
            strokeWidth="1"
          />
          {/* Small center dot */}
          <circle cx={cx} cy={cy} r="1.5" fill="#262626" />
        </svg>

        <span className="sr-only">Loading...</span>
      </div>
    )
  }
)
RetroBeachBall.displayName = "RetroBeachBall"

/* ---------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------*/

export { RetroSpinner, RetroBeachBall, spinnerSizeVariants }
export type { RetroSpinnerProps, RetroBeachBallProps }
