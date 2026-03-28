"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface RetroSkeletonProps extends React.ComponentProps<"div"> {
  /** If true, applies a subtle pulse animation (opacity 0.7 to 1.0). Defaults to true. */
  animate?: boolean
}

function RetroSkeleton(
  { className, animate = true, ...props }: RetroSkeletonProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <>
      <div
        ref={ref}
        className={cn(
          "border border-[var(--os9-gray-600)]",
          animate && "retro-skeleton-pulse",
          className
        )}
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              var(--os9-gray-300),
              var(--os9-gray-300) 2px,
              var(--os9-gray-400) 2px,
              var(--os9-gray-400) 4px
            )
          `,
        }}
        {...props}
      />
      {animate && (
        <style>{`
          @keyframes retro-skeleton-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          .retro-skeleton-pulse {
            animation: retro-skeleton-pulse 1.5s ease-in-out infinite;
          }
        `}</style>
      )}
    </>
  )
}

const ForwardedRetroSkeleton = React.forwardRef(RetroSkeleton)
ForwardedRetroSkeleton.displayName = "RetroSkeleton"

export { ForwardedRetroSkeleton as RetroSkeleton }
export type { RetroSkeletonProps }
