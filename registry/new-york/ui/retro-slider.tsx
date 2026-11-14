"use client"

/*
 * RetroSlider: a thin inset track with rectangular raised thumbs.
 *
 * Crafted moment: an eased fill. When the value moves without a hand on
 * the thumb (arrow keys, Page Up/Down, a value set from code) the thumb and
 * the filled range glide to it (150ms, strong ease-out), so a jump reads as
 * movement instead of teleporting. While dragging (data-dragging) there is
 * no transition at all: the thumb tracks the pointer 1:1.
 * Classic flair and reduced motion: always instant.
 *
 * The public API keeps the array shape: value / defaultValue are number[]
 * (one entry per thumb) and onValueChange / onValueCommit receive number[].
 */

import * as React from "react"
import {
  Slider as SliderPrimitive,
  SliderControl as SliderControlPrimitive,
  SliderIndicator as SliderIndicatorPrimitive,
  SliderThumb as SliderThumbPrimitive,
  SliderTrack as SliderTrackPrimitive,
} from "@ui-sdk/react/slider"

import { cn } from "@/lib/utils"

type SliderPrimitiveProps = React.ComponentProps<typeof SliderPrimitive<number[]>>
type SliderChangeDetails = Parameters<NonNullable<SliderPrimitiveProps["onValueChange"]>>[1]
type SliderCommitDetails = Parameters<NonNullable<SliderPrimitiveProps["onValueCommit"]>>[1]

type RetroSliderProps = Omit<
  SliderPrimitiveProps,
  "className" | "children" | "value" | "defaultValue" | "onValueChange" | "onValueCommit"
> & {
  className?: string
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[], details: SliderChangeDetails) => void
  onValueCommit?: (value: number[], details: SliderCommitDetails) => void
}

const toArray = (v: number | number[]) => (Array.isArray(v) ? v : [v])

/* glide when the value moves on its own; never while a thumb is dragged */
const GLIDE =
  "duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] in-data-dragging:transition-none in-data-[flair=classic]:transition-none motion-reduce:transition-none"

function RetroSlider({
  className,
  defaultValue,
  value,
  min = 0,
  onValueChange,
  onValueCommit,
  "aria-label": ariaLabel,
  ...props
}: RetroSliderProps) {
  // One thumb per value (supports range sliders)
  const thumbCount = (value ?? defaultValue ?? [min]).length
  const thumbLabel = (i: number) =>
    thumbCount === 1
      ? ariaLabel
      : thumbCount === 2
        ? `${ariaLabel ?? "Value"} ${i === 0 ? "minimum" : "maximum"}`
        : `${ariaLabel ?? "Value"} ${i + 1}`

  return (
    <SliderPrimitive<number[]>
      defaultValue={defaultValue ?? (value ? undefined : [min])}
      value={value}
      min={min}
      onValueChange={onValueChange && ((v, d) => onValueChange(toArray(v), d))}
      onValueCommit={onValueCommit && ((v, d) => onValueCommit(toArray(v), d))}
      aria-label={thumbCount > 1 ? ariaLabel : undefined}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SliderControlPrimitive className="flex w-full items-center py-[8px] data-disabled:pointer-events-none">
        {/* Track: thin inset line */}
        <SliderTrackPrimitive
          className={cn(
            "relative h-[4px] w-full",
            "border border-os9-black",
            "bg-os9-gray-300",
            "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]"
          )}
        >
          {/* Range: filled portion, slightly darker */}
          <SliderIndicatorPrimitive
            className={cn("h-full bg-os9-gray-400", "transition-[left,width]", GLIDE)}
          />

          {/* Thumb: rectangular raised bevel (OS9 style) */}
          {Array.from({ length: thumbCount }, (_, i) => (
            <SliderThumbPrimitive
              key={i}
              index={i}
              aria-label={thumbLabel(i)}
              className={cn(
                "block w-[12px] h-[20px]",
                // keep the thumb inside the track at both ends, as OS 9 did
                "data-[orientation=horizontal]:[translate:calc(50%-var(--slider-thumb-position))_-50%]!",
                "border border-os9-black",
                "bg-os9-gray-300",
                "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
                "cursor-pointer",
                "has-focus-visible:os9-focus-ring",
                "data-dragging:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
                "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
                "data-disabled:cursor-not-allowed",
                "transition-[left]",
                GLIDE
              )}
            />
          ))}
        </SliderTrackPrimitive>
      </SliderControlPrimitive>
    </SliderPrimitive>
  )
}

export { RetroSlider }
