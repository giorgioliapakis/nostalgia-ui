"use client"

import * as React from "react"
import { format, parse, isValid } from "date-fns"

import { cn } from "@/lib/utils"
import { RetroCalendar } from "@/registry/new-york/ui/retro-calendar"
import {
  RetroPopover,
  RetroPopoverTrigger,
  RetroPopoverContent,
} from "@/registry/new-york/ui/retro-popover"

interface RetroDatePickerProps {
  /** The selected date (controlled) */
  value?: Date
  /** Callback when the date changes */
  onChange?: (date: Date | undefined) => void
  /** Placeholder text when no date is selected */
  placeholder?: string
  /** Date display format (date-fns format string) */
  displayFormat?: string
  /** Whether the date picker is disabled */
  disabled?: boolean
  /** Additional class names for the root container */
  className?: string
}

const CalendarIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(function CalendarIcon(props, ref) {
  return (
    <svg
      ref={ref}
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Outer frame */}
      <rect x="1" y="2" width="10" height="9" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Top bar (header) */}
      <rect x="1" y="2" width="10" height="3" fill="currentColor" />
      {/* Calendar pins */}
      <rect x="3" y="1" width="1" height="2" fill="currentColor" />
      <rect x="8" y="1" width="1" height="2" fill="currentColor" />
      {/* Grid dots (day cells) */}
      <rect x="3" y="7" width="1" height="1" fill="currentColor" />
      <rect x="5" y="7" width="1" height="1" fill="currentColor" />
      <rect x="7" y="7" width="1" height="1" fill="currentColor" />
      <rect x="3" y="9" width="1" height="1" fill="currentColor" />
      <rect x="5" y="9" width="1" height="1" fill="currentColor" />
      <rect x="7" y="9" width="1" height="1" fill="currentColor" />
    </svg>
  )
})
CalendarIcon.displayName = "CalendarIcon"

const DATE_FORMAT = "MM/dd/yyyy"

const RetroDatePicker = React.forwardRef<HTMLDivElement, RetroDatePickerProps>(
  function RetroDatePicker(
    {
      value,
      onChange,
      placeholder = "MM/DD/YYYY",
      displayFormat = DATE_FORMAT,
      disabled = false,
      className,
    },
    ref
  ) {
    const [open, setOpen] = React.useState(false)
    const [internalDate, setInternalDate] = React.useState<Date | undefined>(
      undefined
    )
    const [inputValue, setInputValue] = React.useState("")

    const isControlled = value !== undefined
    const selectedDate = isControlled ? value : internalDate

    // Sync input text with the selected date
    React.useEffect(() => {
      if (selectedDate) {
        setInputValue(format(selectedDate, displayFormat))
      } else {
        setInputValue("")
      }
    }, [selectedDate, displayFormat])

    function commitDate(date: Date | undefined) {
      if (!isControlled) {
        setInternalDate(date)
      }
      onChange?.(date)
    }

    function handleCalendarSelect(date: Date | undefined) {
      commitDate(date)
      setOpen(false)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      setInputValue(e.target.value)
    }

    function handleInputCommit() {
      if (inputValue.trim() === "") {
        commitDate(undefined)
        return
      }
      const parsed = parse(inputValue, DATE_FORMAT, new Date())
      if (isValid(parsed) && parsed.getFullYear() > 1900 && parsed.getFullYear() < 2100) {
        commitDate(parsed)
      } else {
        // Reset to last valid value
        setInputValue(selectedDate ? format(selectedDate, displayFormat) : "")
      }
    }

    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === "Enter") {
        handleInputCommit()
      }
    }

    return (
      <RetroPopover open={open} onOpenChange={setOpen}>
        <div
          ref={ref}
          className={cn("inline-flex items-center", className)}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputCommit}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "h-[24px] w-[110px] px-[5px]",
              "font-[family-name:var(--font-sans)] text-[11px] text-os9-black",
              "border border-os9-black bg-os9-white",
              "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
              "outline-none transition-none",
              "focus:shadow-[0_2px_0_0_var(--os9-focus),2px_0_0_0_var(--os9-focus),0_-2px_0_0_var(--os9-focus),-2px_0_0_0_var(--os9-focus),0_0_0_1px_var(--os9-focus)]",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-os9-gray-200 disabled:text-os9-gray-600"
            )}
          />
          <RetroPopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              className={cn(
                "inline-flex items-center justify-center",
                "h-[24px] w-[28px] p-0 -ml-px",
                "border border-os9-black bg-os9-gray-300",
                "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
                "cursor-pointer select-none transition-none",
                "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
                "focus-visible:os9-focus-ring",
                "disabled:pointer-events-none disabled:opacity-50"
              )}
            >
              <CalendarIcon />
            </button>
          </RetroPopoverTrigger>
        </div>
        <RetroPopoverContent className="w-auto p-0" align="start">
          <RetroCalendar
            mode="single"
            selected={selectedDate}
            onSelect={handleCalendarSelect}
            month={selectedDate}
            initialFocus
          />
        </RetroPopoverContent>
      </RetroPopover>
    )
  }
)
RetroDatePicker.displayName = "RetroDatePicker"

export { RetroDatePicker, CalendarIcon }
export type { RetroDatePickerProps }
