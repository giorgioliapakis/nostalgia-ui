"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

const RetroRadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn("grid gap-2", className)}
    ref={ref}
    {...props}
  />
))
RetroRadioGroup.displayName = "RetroRadioGroup"

const RetroRadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "group peer relative size-[13px] shrink-0 rounded-full",
      "border border-os9-black",
      "bg-[linear-gradient(135deg,#f1f1f1_0%,#9a9a9a_100%)]",
      "shadow-[inset_1px_1px_0_rgba(255,255,255,0.5),inset_-1px_-1px_0_rgba(38,38,38,0.25)]",
      "focus-visible:os9-focus-ring focus-visible:rounded-full",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "cursor-pointer",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <span className="block size-[5px] rounded-full bg-os9-black" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RetroRadioGroupItem.displayName = "RetroRadioGroupItem"

export { RetroRadioGroup, RetroRadioGroupItem }
