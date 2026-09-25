"use client"

import * as React from "react"
import { DayPicker, type ChevronProps } from "react-day-picker"

import { cn } from "@/lib/utils"

/**
 * OS9 solid-triangle chevron. Only `className` and `orientation` are used —
 * rdp's other props (size, disabled) are not valid SVG attributes.
 */
function RetroCalendarChevron({ className, orientation }: ChevronProps) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {orientation === "left" ? (
        <path d="M7 1 L3 5 L7 9 Z" fill="currentColor" />
      ) : orientation === "up" ? (
        <path d="M1 7 L5 3 L9 7 Z" fill="currentColor" />
      ) : orientation === "down" ? (
        <path d="M1 3 L5 7 L9 3 Z" fill="currentColor" />
      ) : (
        <path d="M3 1 L7 5 L3 9 Z" fill="currentColor" />
      )}
    </svg>
  )
}

function RetroCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-4",
        "border border-os9-black bg-os9-gray-200",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
        className
      )}
      classNames={{
        months: "relative flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        month_caption:
          "flex justify-center items-center h-[28px] px-10",
        caption_label:
          "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98] text-os9-black select-none",
        nav: cn(
          "absolute top-0 left-0 right-0 z-10",
          "flex justify-between items-center h-[28px] px-1"
        ),
        button_previous: cn(
          "inline-flex items-center justify-center",
          "size-[24px] p-0",
          "border border-os9-black bg-os9-gray-300",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          "cursor-pointer select-none transition-none",
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
          "focus-visible:os9-focus-ring"
        ),
        button_next: cn(
          "inline-flex items-center justify-center",
          "size-[24px] p-0",
          "border border-os9-black bg-os9-gray-300",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          "cursor-pointer select-none transition-none",
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
          "focus-visible:os9-focus-ring"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "font-[family-name:var(--os9-font-sans)] text-[9px] text-os9-gray-700 w-8 h-8 flex items-center justify-center select-none",
        week: "flex w-full mt-0.5",
        day: "relative p-0 text-center text-[10px] font-[family-name:var(--os9-font-sans)] w-8 h-8 flex items-center justify-center",
        day_button: cn(
          "inline-flex items-center justify-center w-8 h-8 p-0",
          "cursor-pointer select-none transition-none",
          "font-[family-name:var(--os9-font-sans)] text-[10px] text-os9-black",
          "hover:bg-os9-lavender",
          "focus-visible:os9-focus-ring"
        ),
        /*
         * In rdp v9, modifier classNames (selected, today, range_*, outside)
         * land on the day cell, while day_button sets its own text/hover
         * colours. Target the child button so modifier styling wins.
         */
        selected:
          "[&>button]:!bg-os9-azul [&>button]:!text-os9-white [&>button:hover]:!bg-os9-azul",
        today: "[&>button]:font-bold [&>button]:underline [&>button]:underline-offset-2",
        outside: "[&>button]:text-os9-gray-600",
        disabled: "opacity-50 pointer-events-none",
        hidden: "invisible",
        /* `&&` doubles specificity so range styles beat `selected` (also applied) */
        range_start:
          "[&&>button]:!bg-os9-azul [&&>button]:!text-os9-white rounded-none",
        range_middle:
          "[&&>button]:!bg-os9-lavender [&&>button]:!text-os9-black [&&>button:hover]:!bg-os9-lavender rounded-none",
        range_end:
          "[&&>button]:!bg-os9-azul [&&>button]:!text-os9-white rounded-none",
        ...classNames,
      }}
      components={{
        Chevron: RetroCalendarChevron,
      }}
      {...props}
    />
  )
}

RetroCalendar.displayName = "RetroCalendar"

export { RetroCalendar }
