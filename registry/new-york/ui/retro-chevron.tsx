"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right"
type Variant = "default" | "accent"
type Size = "sm" | "default"

const rotationMap: Record<Direction, string> = {
  up: "rotate(0)",
  right: "rotate(90)",
  down: "rotate(180)",
  left: "rotate(270)",
}

const sizeMap: Record<Size, number> = {
  sm: 6,
  default: 8,
}

interface RetroChevronProps extends React.SVGAttributes<SVGSVGElement> {
  direction?: Direction
  variant?: Variant
  size?: Size
}

function RetroChevron(
  {
    direction = "up",
    variant = "default",
    size = "default",
    className,
    ...props
  }: RetroChevronProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  const px = sizeMap[size]
  const fill =
    variant === "accent"
      ? "var(--os9-azul)"
      : "var(--os9-black)"

  return (
    <svg
      ref={ref}
      width={px}
      height={px}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block shrink-0", className)}
      aria-hidden
      {...props}
    >
      <path
        d="M4 1L7 6H1L4 1Z"
        fill={fill}
        transform={rotationMap[direction]}
        style={{ transformOrigin: "center" }}
      />
    </svg>
  )
}

const ForwardedRetroChevron = React.forwardRef(RetroChevron)
ForwardedRetroChevron.displayName = "RetroChevron"

export { ForwardedRetroChevron as RetroChevron }
export type { RetroChevronProps }
