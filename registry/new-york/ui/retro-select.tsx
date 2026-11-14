"use client"

/*
 * RetroSelect: a Mac OS 9 pop-up menu on UI SDK.
 *
 * Crafted moment: the gliding azul highlight (modern flair). One highlight
 * layer slides between options, so pointer and keyboard moves read as one
 * motion, and the option's ink flips to white as it arrives, exactly like
 * the menus. Classic flair (and reduced motion) snaps row to row.
 */

import * as React from "react"
import {
  Select as SelectPrimitive,
  SelectContent as SelectContentPrimitive,
  SelectGroup as SelectGroupPrimitive,
  SelectGroupLabel as SelectGroupLabelPrimitive,
  SelectItem as SelectItemPrimitive,
  SelectItemIcon as SelectItemIconPrimitive,
  SelectItemIndicator as SelectItemIndicatorPrimitive,
  SelectSeparator as SelectSeparatorPrimitive,
  SelectTrigger as SelectTriggerPrimitive,
  SelectValue as SelectValuePrimitive,
  SelectValueIcon as SelectValueIconPrimitive,
  type SelectProps as SelectPrimitiveProps,
} from "@ui-sdk/react/select"

import { cn } from "@/lib/utils"
import { popupClass, useGlide } from "@/registry/new-york/lib/retro-motion"

/* string class names and plain children, as shadcn-style parts take */
type WithClassName<P> = Omit<P, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
}

/* ------------------------------------------------------------------ */
/*  Glide CSS                                                          */
/* ------------------------------------------------------------------ */

/* Unlayered, so it beats the option utilities without !important.
 * React hoists it and dedupes it by href. */
const SELECT_CSS = `
.os9-select:not([data-glide-off]) [role="option"][data-highlighted] {
  background-color: transparent;
}
.os9-select[data-glide-off] > [data-glide-layer] {
  opacity: 0 !important;
  transition: none !important;
}
.os9-select [role="option"] { transition: color 0s linear 60ms; }
.os9-select[data-glide-off] [role="option"] { transition: none; }
`

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

type RetroSelectProps = Omit<
  SelectPrimitiveProps<string, false>,
  "value" | "defaultValue" | "onValueChange" | "multiple"
> & {
  /** The selected value. `""` selects nothing. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

/* Keeps the string API: "" (or nothing) means no selection. */
function RetroSelect({ value, defaultValue, onValueChange, ...props }: RetroSelectProps) {
  return (
    <SelectPrimitive<string, false>
      {...(value !== undefined
        ? { value: value === "" ? null : value }
        : { defaultValue: defaultValue === "" || defaultValue === undefined ? null : defaultValue })}
      onValueChange={(next) => onValueChange?.(next ?? "")}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Trigger & value                                                    */
/* ------------------------------------------------------------------ */

function RetroSelectTrigger({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof SelectTriggerPrimitive>>) {
  return (
    <SelectTriggerPrimitive
      className={cn(
        "inline-flex items-center justify-between",
        "h-[20px] w-full",
        "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "border border-os9-black bg-os9-gray-300",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
        "cursor-pointer select-none",
        "focus-visible:os9-focus-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-open:bg-os9-gray-800 data-open:text-os9-white",
        "data-open:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        className
      )}
      {...props}
    >
      <span className="truncate px-2">{children}</span>
      <span
        className={cn(
          "flex h-full items-center justify-center",
          "w-[20px] shrink-0",
          "border-l border-os9-black"
        )}
      >
        <span className="flex flex-col items-center gap-[1px]">
          <svg width="8" height="4" viewBox="0 0 8 4" fill="none" aria-hidden>
            <path d="M4 0L8 4H0L4 0Z" fill="currentColor" />
          </svg>
          <svg width="8" height="4" viewBox="0 0 8 4" fill="none" aria-hidden>
            <path d="M4 4L0 0H8L4 4Z" fill="currentColor" />
          </svg>
        </span>
      </span>
    </SelectTriggerPrimitive>
  )
}

/* The selected option's label, led by its RetroSelectItemIcon when it has one. */
function RetroSelectValue({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof SelectValuePrimitive>>) {
  return (
    <>
      <SelectValueIconPrimitive className="mr-[6px] inline-flex align-middle" />
      <SelectValuePrimitive className={className} {...props} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type RetroSelectContentProps = WithClassName<React.ComponentProps<typeof SelectContentPrimitive>> & {
  /** `"item-aligned"` places the selected option over the trigger, like a classic pop-up menu. */
  position?: "popper" | "item-aligned"
}

/* OS 9 menus appear at once; modern flair adds a 100ms fade and a 2px drop.
 * Box properties carry `!` so UI SDK's popup reset can't strip them in apps
 * that haven't declared `@layer ui-sdk;` first. */
function RetroSelectContent({
  className,
  children,
  position = "popper",
  side = "bottom",
  align = "start",
  sideOffset = 1,
  ref,
  ...props
}: RetroSelectContentProps) {
  const glideRef = useGlide(ref)
  return (
    <SelectContentPrimitive
      ref={glideRef}
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignItemWithTrigger={position === "item-aligned"}
      className={popupClass(
        cn(
          "os9-select relative z-50 flex flex-col gap-px outline-none",
          "min-w-(--anchor-width)! max-h-[min(var(--available-height),320px)]!",
          "m-0! p-[2px]! border! border-os9-black! bg-os9-gray-300! text-os9-black!",
          "overflow-x-hidden! overflow-y-auto! shadow-[2px_2px_0_var(--os9-black)]",
          "transition-[opacity,translate] duration-100 ease-out",
          "data-starting-style:opacity-0 data-starting-style:-translate-y-[2px]",
          "data-ending-style:opacity-0 data-ending-style:duration-75",
          "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
        ),
        className
      )}
      {...props}
    >
      <style href="os9-select" precedence="default">
        {SELECT_CSS}
      </style>
      <span
        aria-hidden
        data-glide-layer
        className="pointer-events-none absolute top-0 left-0 bg-os9-azul opacity-0"
      />
      {children}
    </SelectContentPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  Items                                                              */
/* ------------------------------------------------------------------ */

function RetroSelectItem({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof SelectItemPrimitive<string>>>) {
  return (
    <SelectItemPrimitive
      className={cn(
        "relative z-[1] flex shrink-0 items-center",
        "h-[18px] w-full px-[14px]",
        "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black whitespace-nowrap",
        "cursor-pointer select-none outline-none",
        "data-highlighted:bg-os9-azul data-highlighted:text-os9-white",
        "data-disabled:pointer-events-none data-disabled:text-os9-gray-700",
        className
      )}
      {...props}
    >
      <span className="absolute left-[2px] flex h-[8px] w-[8px] items-center justify-center">
        <SelectItemIndicatorPrimitive>
          <svg width="8" height="8" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8.5L6.5 12L13 4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </SelectItemIndicatorPrimitive>
      </span>
      {children}
    </SelectItemPrimitive>
  )
}

/* An icon or swatch before an option's label; the trigger shows it too. */
function RetroSelectItemIcon({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof SelectItemIconPrimitive>>) {
  return (
    <SelectItemIconPrimitive
      className={cn("mr-[6px] inline-flex shrink-0 items-center", className)}
      {...props}
    />
  )
}

function RetroSelectGroup({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof SelectGroupPrimitive>>) {
  return <SelectGroupPrimitive className={cn("flex flex-col gap-px", className)} {...props} />
}

function RetroSelectLabel({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof SelectGroupLabelPrimitive>>) {
  return (
    <SelectGroupLabelPrimitive
      className={cn(
        "px-[14px] py-[2px]",
        "font-[family-name:var(--os9-font-heading)] text-[10px] tracking-[0.42px] leading-[0.98]",
        "text-os9-gray-700",
        className
      )}
      {...props}
    />
  )
}

function RetroSelectSeparator({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof SelectSeparatorPrimitive>>) {
  return (
    <SelectSeparatorPrimitive
      className={cn("h-[2px] shrink-0 bg-os9-gray-600", className)}
      {...props}
    />
  )
}

export {
  RetroSelect,
  RetroSelectGroup,
  RetroSelectValue,
  RetroSelectTrigger,
  RetroSelectContent,
  RetroSelectItem,
  RetroSelectItemIcon,
  RetroSelectSeparator,
  RetroSelectLabel,
}
export type { RetroSelectProps, RetroSelectContentProps }
