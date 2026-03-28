"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"

import { cn } from "@/lib/utils"

const RetroSelect = SelectPrimitive.Root

const RetroSelectGroup = SelectPrimitive.Group

const RetroSelectValue = SelectPrimitive.Value

const RetroSelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-between",
      "h-[20px] w-full",
      "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      "text-os9-black",
      "border border-os9-black bg-os9-gray-300",
      "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
      "cursor-pointer select-none",
      "focus-visible:os9-focus-ring",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=open]:bg-os9-gray-800 data-[state=open]:text-os9-white",
      "data-[state=open]:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
      className
    )}
    {...props}
  >
    <span className="truncate px-2">{children}</span>
    <span
      className={cn(
        "flex h-full items-center justify-center",
        "w-[20px] shrink-0",
        "border-l border-os9-black",
      )}
    >
      <span className="flex flex-col items-center gap-[1px]">
        {/* Up chevron */}
        <svg
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 0L8 4H0L4 0Z" fill="currentColor" />
        </svg>
        {/* Down chevron */}
        <svg
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 4L0 0H8L4 4Z" fill="currentColor" />
        </svg>
      </span>
    </span>
  </SelectPrimitive.Trigger>
))
RetroSelectTrigger.displayName = "RetroSelectTrigger"

const RetroSelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 overflow-hidden",
        "border border-os9-black bg-os9-gray-300",
        "shadow-[2px_2px_0_var(--os9-black)]",
        "py-[2px] px-[2px]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-px data-[side=top]:-translate-y-px",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "flex flex-col gap-px",
          position === "popper" &&
            "w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
RetroSelectContent.displayName = "RetroSelectContent"

const RetroSelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex items-center",
      "h-[18px] w-full px-[14px]",
      "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      "text-os9-black",
      "cursor-pointer select-none outline-none",
      "data-[highlighted]:bg-os9-azul data-[highlighted]:text-os9-white",
      "data-[disabled]:pointer-events-none data-[disabled]:text-os9-gray-700",
      className
    )}
    {...props}
  >
    <span className="absolute left-[2px] flex h-[8px] w-[8px] items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        {/* Checkmark SVG */}
        <svg
          width="8"
          height="8"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8.5L6.5 12L13 4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
RetroSelectItem.displayName = "RetroSelectItem"

const RetroSelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("h-[2px] bg-os9-gray-600", className)}
    {...props}
  />
))
RetroSelectSeparator.displayName = "RetroSelectSeparator"

const RetroSelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "px-[14px] py-[2px]",
      "font-[family-name:var(--font-heading)] text-[10px] tracking-[0.42px] leading-[0.98]",
      "text-os9-gray-700",
      className
    )}
    {...props}
  />
))
RetroSelectLabel.displayName = "RetroSelectLabel"

export {
  RetroSelect,
  RetroSelectGroup,
  RetroSelectValue,
  RetroSelectTrigger,
  RetroSelectContent,
  RetroSelectItem,
  RetroSelectSeparator,
  RetroSelectLabel,
}
