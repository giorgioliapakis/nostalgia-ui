"use client"

/*
 * RetroRadioGroup: OS 9 radio buttons, a gradient-lit 13px circle with a
 * black dot.
 *
 * Crafted moment: none on purpose. The dot moves the instant a choice is
 * made, by click, label or arrow key, the way the Mac drew it.
 *
 * UI SDK gives the group one tab stop and arrow-key selection. Each item
 * renders a <button role="radio">, so <label htmlFor={id}> reaches it.
 */

import * as React from "react"
import {
  Radio as RadioPrimitive,
  RadioGroup as RadioGroupPrimitive,
  RadioIndicator as RadioIndicatorPrimitive,
} from "@ui-sdk/react/radio"

import { cn } from "@/lib/utils"

type RadioGroupPrimitiveProps = React.ComponentProps<typeof RadioGroupPrimitive<string>>
type RadioGroupChangeDetails = Parameters<NonNullable<RadioGroupPrimitiveProps["onValueChange"]>>[1]

type RetroRadioGroupProps = Omit<
  RadioGroupPrimitiveProps,
  "className" | "children" | "value" | "defaultValue" | "onValueChange"
> & {
  className?: string
  children?: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string, details: RadioGroupChangeDetails) => void
}

function RetroRadioGroup({ className, onValueChange, ...props }: RetroRadioGroupProps) {
  return (
    <RadioGroupPrimitive
      className={cn("grid gap-2", className)}
      onValueChange={
        onValueChange && ((value, details) => onValueChange(value ?? "", details))
      }
      {...props}
    />
  )
}

type RetroRadioGroupItemProps = Omit<
  React.ComponentProps<typeof RadioPrimitive>,
  "className" | "children"
> & {
  className?: string
}

function RetroRadioGroupItem({ className, ...props }: RetroRadioGroupItemProps) {
  return (
    <RadioPrimitive
      className={cn(
        "group peer relative inline-flex size-[13px] shrink-0 items-center justify-center rounded-full p-0",
        "border border-os9-black",
        "bg-[linear-gradient(135deg,#f1f1f1_0%,#9a9a9a_100%)]",
        "shadow-[inset_1px_1px_0_rgba(255,255,255,0.5),inset_-1px_-1px_0_rgba(38,38,38,0.25)]",
        "focus-visible:os9-focus-ring focus-visible:rounded-full",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "cursor-pointer",
        className
      )}
      {...props}
    >
      <RadioIndicatorPrimitive className="flex items-center justify-center">
        <span className="block size-[5px] rounded-full bg-os9-black" />
      </RadioIndicatorPrimitive>
    </RadioPrimitive>
  )
}

export { RetroRadioGroup, RetroRadioGroupItem }
