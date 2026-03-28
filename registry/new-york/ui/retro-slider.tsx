"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function RetroSlider(
  {
    className,
    defaultValue,
    ...props
  }: React.ComponentProps<typeof SliderPrimitive.Root>,
  ref: React.ForwardedRef<React.ComponentRef<typeof SliderPrimitive.Root>>
) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      defaultValue={defaultValue}
      className={cn(
        "relative flex w-full touch-none select-none items-center py-[8px]",
        className
      )}
      {...props}
    >
      {/* Track: thin inset line */}
      <SliderPrimitive.Track
        className={cn(
          "relative h-[4px] w-full",
          "border border-os9-black",
          "bg-os9-gray-300",
          "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]"
        )}
      >
        {/* Range: filled portion, slightly darker */}
        <SliderPrimitive.Range
          className={cn(
            "absolute h-full",
            "bg-os9-gray-400"
          )}
        />
      </SliderPrimitive.Track>

      {/* Thumb: rectangular raised bevel (OS9 style) */}
      <SliderPrimitive.Thumb
        className={cn(
          "block w-[12px] h-[20px]",
          "border border-os9-black",
          "bg-os9-gray-300",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          "cursor-pointer",
          "focus-visible:os9-focus-ring",
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      />
    </SliderPrimitive.Root>
  )
}

const ForwardedRetroSlider = React.forwardRef(RetroSlider)
ForwardedRetroSlider.displayName = "RetroSlider"

export { ForwardedRetroSlider as RetroSlider }
