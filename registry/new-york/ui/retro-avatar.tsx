"use client"

/*
 * RetroAvatar on UI SDK Avatar.
 *
 * Crafted moment: none, static. The image replaces the initials the moment
 * it loads, as the Finder swapped in a custom icon.
 */

import * as React from "react"
import {
  Avatar as AvatarPrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
  AvatarImage as AvatarImagePrimitive,
} from "@ui-sdk/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type Common = { className?: string; children?: React.ReactNode }

const retroAvatarVariants = cva(
  [
    "relative inline-flex shrink-0 overflow-hidden",
    "border border-os9-black",
    "shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)]",
  ],
  {
    variants: {
      size: {
        sm: "h-[24px] w-[24px]",
        default: "h-[32px] w-[32px]",
        lg: "h-[48px] w-[48px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function RetroAvatar({
  className,
  size,
  ...props
}: Omit<React.ComponentProps<typeof AvatarPrimitive>, "className" | "children"> &
  Common &
  VariantProps<typeof retroAvatarVariants>) {
  return <AvatarPrimitive className={cn(retroAvatarVariants({ size }), className)} {...props} />
}

function RetroAvatarImage({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AvatarImagePrimitive>, "className"> & {
  className?: string
}) {
  return (
    <AvatarImagePrimitive
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  )
}

function RetroAvatarFallback({
  className,
  delayMs,
  delay = delayMs,
  ...props
}: Omit<React.ComponentProps<typeof AvatarFallbackPrimitive>, "className" | "children"> &
  Common & {
    /** Radix-era name for `delay`. */
    delayMs?: number
  }) {
  return (
    <AvatarFallbackPrimitive
      delay={delay}
      className={cn(
        "flex h-full w-full items-center justify-center",
        "bg-os9-gray-400 text-os9-black",
        "font-[family-name:var(--os9-font-heading)] text-[11px] leading-[1]",
        className
      )}
      {...props}
    />
  )
}

export { RetroAvatar, RetroAvatarImage, RetroAvatarFallback, retroAvatarVariants }
