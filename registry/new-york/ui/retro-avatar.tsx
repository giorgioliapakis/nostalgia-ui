"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

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

function RetroAvatar(
  {
    className,
    size,
    ...props
  }: React.ComponentProps<typeof AvatarPrimitive.Root> &
    VariantProps<typeof retroAvatarVariants>,
  ref: React.ForwardedRef<React.ComponentRef<typeof AvatarPrimitive.Root>>
) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(retroAvatarVariants({ size }), className)}
      {...props}
    />
  )
}

const ForwardedRetroAvatar = React.forwardRef(RetroAvatar)
ForwardedRetroAvatar.displayName = "RetroAvatar"

function RetroAvatarImage(
  {
    className,
    ...props
  }: React.ComponentProps<typeof AvatarPrimitive.Image>,
  ref: React.ForwardedRef<React.ComponentRef<typeof AvatarPrimitive.Image>>
) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  )
}

const ForwardedRetroAvatarImage = React.forwardRef(RetroAvatarImage)
ForwardedRetroAvatarImage.displayName = "RetroAvatarImage"

function RetroAvatarFallback(
  {
    className,
    ...props
  }: React.ComponentProps<typeof AvatarPrimitive.Fallback>,
  ref: React.ForwardedRef<React.ComponentRef<typeof AvatarPrimitive.Fallback>>
) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center",
        "bg-os9-gray-400 text-os9-black",
        "font-[family-name:var(--font-heading)] text-[11px] leading-[1]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroAvatarFallback = React.forwardRef(RetroAvatarFallback)
ForwardedRetroAvatarFallback.displayName = "RetroAvatarFallback"

export {
  ForwardedRetroAvatar as RetroAvatar,
  ForwardedRetroAvatarImage as RetroAvatarImage,
  ForwardedRetroAvatarFallback as RetroAvatarFallback,
  retroAvatarVariants,
}
