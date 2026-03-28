"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroTextareaVariants = cva(
  [
    "w-full",
    "border border-os9-black bg-os9-white text-os9-black",
    "placeholder:text-os9-gray-600",
    "transition-none",
    "outline-none",
    "min-h-[80px] resize-vertical",
    // Default inset bevel: inner shadow top-left gray, outer shadow for 3D effect
    "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white),-1px_0_0_var(--os9-gray-700),0_-1px_0_var(--os9-gray-700),1px_0_0_var(--os9-white),0_1px_0_var(--os9-white)]",
    // Focus: OS9 blue ring matching Figma's active text field
    "focus:shadow-[0_2px_0_0_var(--os9-focus),2px_0_0_0_var(--os9-focus),0_-2px_0_0_var(--os9-focus),-2px_0_0_0_var(--os9-focus),0_0_0_1px_var(--os9-focus)]",
    // Disabled
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-os9-gray-200 disabled:text-os9-gray-600",
  ],
  {
    variants: {
      size: {
        default: [
          "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
          "p-[5px]",
        ],
        sm: [
          "font-[family-name:var(--font-sans)] text-[10px] leading-normal",
          "px-[5px] py-[3px]",
        ],
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type RetroTextareaProps = Omit<React.ComponentProps<"textarea">, "size"> &
  VariantProps<typeof retroTextareaVariants>

function RetroTextarea(
  {
    className,
    size,
    ...props
  }: RetroTextareaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <textarea
      className={cn(retroTextareaVariants({ size }), className)}
      ref={ref}
      {...props}
    />
  )
}

const ForwardedRetroTextarea = React.forwardRef(RetroTextarea)
ForwardedRetroTextarea.displayName = "RetroTextarea"

export { ForwardedRetroTextarea as RetroTextarea, retroTextareaVariants }
