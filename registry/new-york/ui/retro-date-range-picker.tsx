"use client"

import * as React from "react"
import { format, parse, isValid } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { CalendarIcon } from "@/registry/new-york/ui/retro-date-picker"
import { RetroCalendar } from "@/registry/new-york/ui/retro-calendar"
import {
  RetroPopover,
  RetroPopoverTrigger,
  RetroPopoverContent,
} from "@/registry/new-york/ui/retro-popover"

// Spread rather than a literal `asChild` attribute: the shadcn CLI rewrites
// literal `asChild` to Base UI's `render` prop in base-* projects, which
// breaks these Radix-based components.
const AS_CHILD = { asChild: true } as const

interface RetroDateRangePickerProps {
  /** The selected date range (controlled) */
  value?: DateRange
  /** Callback when the date range changes */
  onChange?: (range: DateRange | undefined) => void
  /** Placeholder text for each field */
  placeholder?: { from?: string; to?: string }
  /** Whether the picker is disabled */
  disabled?: boolean
  /** Number of months to display (default 2) */
  numberOfMonths?: number
  /** Additional class names */
  className?: string
}

const DATE_FORMAT = "MM/dd/yyyy"

const RetroDateRangePicker = React.forwardRef<
  HTMLDivElement,
  RetroDateRangePickerProps
>(function RetroDateRangePicker(
  {
    value,
    onChange,
    placeholder,
    disabled = false,
    numberOfMonths = 2,
    className,
  },
  ref
) {
  const [open, setOpen] = React.useState(false)
  const [internalRange, setInternalRange] = React.useState<
    DateRange | undefined
  >(undefined)
  const [fromInput, setFromInput] = React.useState("")
  const [toInput, setToInput] = React.useState("")

  const isControlled = value !== undefined
  const selectedRange = isControlled ? value : internalRange

  // Depend on timestamps (not object identity) so an inline `value` prop
  // doesn't reset the inputs on every parent render while the user types.
  const fromTime = selectedRange?.from?.getTime()
  const toTime = selectedRange?.to?.getTime()

  // Sync input text with range
  React.useEffect(() => {
    setFromInput(fromTime !== undefined ? format(new Date(fromTime), DATE_FORMAT) : "")
  }, [fromTime])
  React.useEffect(() => {
    setToInput(toTime !== undefined ? format(new Date(toTime), DATE_FORMAT) : "")
  }, [toTime])

  function commitRange(range: DateRange | undefined) {
    if (!isControlled) {
      setInternalRange(range)
    }
    onChange?.(range)
  }

  function handleCalendarSelect(range: DateRange | undefined) {
    commitRange(range)
    // Close when both dates are selected
    if (range?.from && range?.to) {
      setOpen(false)
    }
  }

  function parseInput(text: string): Date | undefined {
    if (text.trim() === "") return undefined
    const parsed = parse(text, DATE_FORMAT, new Date())
    if (isValid(parsed) && parsed.getFullYear() > 1900 && parsed.getFullYear() < 2100) {
      return parsed
    }
    return undefined
  }

  function handleFromCommit() {
    const parsed = parseInput(fromInput)
    if (parsed) {
      if (parsed.getTime() === fromTime) {
        setFromInput(format(parsed, DATE_FORMAT))
        return
      }
      commitRange({ from: parsed, to: selectedRange?.to })
    } else if (fromInput.trim() === "") {
      if (fromTime === undefined) return
      commitRange(
        selectedRange?.to ? { from: undefined, to: selectedRange.to } : undefined
      )
    } else {
      setFromInput(selectedRange?.from ? format(selectedRange.from, DATE_FORMAT) : "")
    }
  }

  function handleToCommit() {
    const parsed = parseInput(toInput)
    if (parsed) {
      if (parsed.getTime() === toTime) {
        setToInput(format(parsed, DATE_FORMAT))
        return
      }
      commitRange({ from: selectedRange?.from, to: parsed })
    } else if (toInput.trim() === "") {
      if (toTime === undefined) return
      commitRange(
        selectedRange?.from ? { from: selectedRange.from, to: undefined } : undefined
      )
    } else {
      setToInput(selectedRange?.to ? format(selectedRange.to, DATE_FORMAT) : "")
    }
  }

  const inputClasses = cn(
    "h-[24px] w-[110px] px-[5px]",
    "font-[family-name:var(--os9-font-sans)] text-[11px] text-os9-black",
    "border border-os9-black bg-os9-white",
    "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
    "outline-none transition-none",
    "focus:shadow-[0_2px_0_0_var(--os9-focus),2px_0_0_0_var(--os9-focus),0_-2px_0_0_var(--os9-focus),-2px_0_0_0_var(--os9-focus),0_0_0_1px_var(--os9-focus)]",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-os9-gray-200 disabled:text-os9-gray-600"
  )

  return (
    <RetroPopover open={open} onOpenChange={setOpen}>
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-0", className)}
      >
        {/* From date input */}
        <input
          type="text"
          value={fromInput}
          onChange={(e) => setFromInput(e.target.value)}
          onBlur={handleFromCommit}
          onKeyDown={(e) => e.key === "Enter" && handleFromCommit()}
          placeholder={placeholder?.from ?? "MM/DD/YYYY"}
          disabled={disabled}
          aria-label="Start date"
          className={inputClasses}
        />

        {/* Separator */}
        <span
          className={cn(
            "inline-flex items-center justify-center",
            "h-[24px] w-[28px]",
            "font-[family-name:var(--os9-font-sans)] text-[11px] text-os9-gray-700",
            "select-none"
          )}
        >
          &ndash;
        </span>

        {/* To date input */}
        <input
          type="text"
          value={toInput}
          onChange={(e) => setToInput(e.target.value)}
          onBlur={handleToCommit}
          onKeyDown={(e) => e.key === "Enter" && handleToCommit()}
          placeholder={placeholder?.to ?? "MM/DD/YYYY"}
          disabled={disabled}
          aria-label="End date"
          className={inputClasses}
        />

        {/* Calendar trigger */}
        <RetroPopoverTrigger {...AS_CHILD}>
          <button
            type="button"
            disabled={disabled}
            aria-label="Choose date range"
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
          mode="range"
          selected={selectedRange}
          onSelect={handleCalendarSelect}
          numberOfMonths={numberOfMonths}
          defaultMonth={selectedRange?.from}
          autoFocus
        />
      </RetroPopoverContent>
    </RetroPopover>
  )
})
RetroDateRangePicker.displayName = "RetroDateRangePicker"

export { RetroDateRangePicker }
export type { RetroDateRangePickerProps }
