"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

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
          "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98] text-os9-black select-none",
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
          "font-[family-name:var(--font-sans)] text-[9px] text-os9-gray-700 w-8 h-8 flex items-center justify-center select-none",
        week: "flex w-full mt-0.5",
        day: "relative p-0 text-center text-[10px] font-[family-name:var(--font-sans)] w-8 h-8 flex items-center justify-center",
        day_button: cn(
          "inline-flex items-center justify-center w-8 h-8 p-0",
          "cursor-pointer select-none transition-none",
          "font-[family-name:var(--font-sans)] text-[10px] text-os9-black",
          "hover:bg-os9-lavender",
          "focus-visible:os9-focus-ring"
        ),
        selected:
          "!bg-os9-azul !text-os9-white hover:!bg-os9-azul",
        today: "font-bold underline underline-offset-2",
        outside: "text-os9-gray-600",
        disabled: "opacity-50 pointer-events-none",
        hidden: "invisible",
        range_start: "!bg-os9-azul !text-os9-white rounded-none",
        range_middle: "!bg-os9-lavender !text-os9-black rounded-none",
        range_end: "!bg-os9-azul !text-os9-white rounded-none",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...chevronProps }) => (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...chevronProps}
          >
            {orientation === "left" ? (
              <path d="M7 1 L3 5 L7 9 Z" fill="currentColor" />
            ) : (
              <path d="M3 1 L7 5 L3 9 Z" fill="currentColor" />
            )}
          </svg>
        ),
      }}
      {...props}
    />
  )
}

RetroCalendar.displayName = "RetroCalendar"

export { RetroCalendar }
