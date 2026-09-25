"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface RetroSkeletonProps extends React.ComponentProps<"div"> {
  /** If true, applies a subtle pulse animation (opacity 0.7 to 1.0). Defaults to true. */
  animate?: boolean
}

function RetroSkeleton(
  { className, animate = true, children, ...props }: RetroSkeletonProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "border border-[var(--os9-gray-600)]",
        /* Diagonal stripe fill */
        "bg-[repeating-linear-gradient(45deg,var(--os9-gray-300),var(--os9-gray-300)_2px,var(--os9-gray-400)_2px,var(--os9-gray-400)_4px)]",
        animate && "retro-skeleton-pulse",
        className
      )}
      {...props}
    >
      {children}
      {/*
        Pulse keyframes (kept inline so the component stays self-contained).
        React 19 hoists this <style> into <head> and dedupes it by `href`, so
        the skeleton renders as a single element (no stray siblings that
        break :last-child / space-y-* layouts).
      */}
      {animate && (
        <style href="retro-skeleton" precedence="default">{`
          @keyframes retro-skeleton-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          .retro-skeleton-pulse {
            animation: retro-skeleton-pulse 1.5s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .retro-skeleton-pulse { animation: none; }
          }
        `}</style>
      )}
    </div>
  )
}

const ForwardedRetroSkeleton = React.forwardRef(RetroSkeleton)
ForwardedRetroSkeleton.displayName = "RetroSkeleton"

export { ForwardedRetroSkeleton as RetroSkeleton }
export type { RetroSkeletonProps }
