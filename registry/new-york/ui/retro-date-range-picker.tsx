"use client"

/*
 * RetroDateRangePicker: two OS 9 edit text fields and a calendar button, on
 * UI SDK's Date Picker in range mode. The calendar stays open after the
 * start is picked, previews the range in lavender as the pointer or arrow
 * keys move, and closes once the end is picked. Typed dates commit on Return
 * or when the field is left; an end before the start is marked invalid.
 *
 * Crafted moment: pop from trigger. The calendar grows out of the fields
 * (scale .95 to 1 from --transform-origin, 140ms) and fades out faster than
 * it came in. Classic flair and reduced motion: it simply appears.
 *
 * Next.js with `cacheComponents`: UI SDK reads today's date while rendering,
 * which fails the prerender. Wrap the picker in <Suspense>.
 */

import * as React from "react"
import {
  DatePicker as DatePickerPrimitive,
  DatePickerContent as DatePickerContentPrimitive,
  DatePickerInput as DatePickerInputPrimitive,
  DatePickerTrigger as DatePickerTriggerPrimitive,
  type DatePickerValue,
  type DateMatchers,
} from "@ui-sdk/react/date-picker"

import { cn } from "@/lib/utils"
import {
  RetroCalendarBody,
  fromISODate,
  toISODate,
  type DateRange,
} from "@/registry/new-york/ui/retro-calendar"
import {
  CalendarIcon,
  retroDateInputClass,
  retroDatePopupClass,
  retroDateTriggerClass,
  useFormatHint,
} from "@/registry/new-york/ui/retro-date-picker"

interface RetroDateRangePickerProps {
  /** The selected range. Pass it (even as `undefined`) with `onChange` to control the picker. */
  value?: DateRange
  /** The range it starts with, when uncontrolled. */
  defaultValue?: DateRange
  /** Runs once both ends are set, or with `undefined` when either is cleared. */
  onChange?: (range: DateRange | undefined) => void
  /** Placeholder text for each field. Defaults to the locale's format, like "MM/DD/YYYY". */
  placeholder?: { from?: string; to?: string }
  /** The language dates are typed and shown in. Defaults to the page's `lang`. */
  locale?: string
  /** Whether the picker is disabled */
  disabled?: boolean
  /** Number of months to display (default 2) */
  numberOfMonths?: number
  /** The earliest and latest dates that can be picked. */
  min?: Date
  max?: Date
  /** Dates that can't be picked or, without `allowUnavailable`, spanned. */
  unavailable?: DateMatchers
  /** The fewest and most days a range can span, counting both ends. */
  minDays?: number
  maxDays?: number
  /** The names the ends submit under in a form, as ISO dates. */
  startName?: string
  endName?: string
  /** Additional class names */
  className?: string
  ref?: React.Ref<HTMLDivElement>
}

const toRangeValue = (range: DateRange | undefined): DatePickerValue =>
  range?.from && range.to ? [toISODate(range.from), toISODate(range.to)] : null

function RetroDateRangePicker(props: RetroDateRangePickerProps) {
  const {
    value,
    defaultValue,
    onChange,
    placeholder,
    locale,
    disabled = false,
    numberOfMonths = 2,
    min,
    max,
    unavailable,
    minDays,
    maxDays,
    startName,
    endName,
    className,
    ref,
  } = props
  const controlled = Object.prototype.hasOwnProperty.call(props, "value")
  /* the popup lines up with the whole row of fields, not just the button */
  const [field, setField] = React.useState<HTMLDivElement | null>(null)
  const [format, hint] = useFormatHint()

  return (
    <DatePickerPrimitive
      ref={ref}
      mode="range"
      {...(controlled
        ? { value: toRangeValue(value) }
        : defaultValue
          ? { defaultValue: toRangeValue(defaultValue) }
          : {})}
      onValueChange={(next: DatePickerValue) =>
        onChange?.(
          Array.isArray(next) ? { from: fromISODate(next[0]), to: fromISODate(next[1]) } : undefined
        )
      }
      months={numberOfMonths}
      locale={locale}
      disabled={disabled}
      min={min ? toISODate(min) : undefined}
      max={max ? toISODate(max) : undefined}
      unavailable={unavailable}
      minDays={minDays}
      maxDays={maxDays}
      startName={startName}
      endName={endName}
      showOutsideDays
      className={cn("inline-flex", className)}
    >
      <div ref={setField} className="inline-flex items-center gap-0">
        <DatePickerInputPrimitive
          aria-label="Start date"
          placeholder={placeholder?.from ?? format}
          className={retroDateInputClass}
        />
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center",
            "h-[24px] w-[28px]",
            "font-[family-name:var(--os9-font-sans)] text-[11px] text-os9-gray-700",
            "select-none"
          )}
        >
          &ndash;
        </span>
        <DatePickerInputPrimitive
          end
          aria-label="End date"
          placeholder={placeholder?.to ?? format}
          className={retroDateInputClass}
        />
        <DatePickerTriggerPrimitive aria-label="Choose date range" className={retroDateTriggerClass}>
          <CalendarIcon />
        </DatePickerTriggerPrimitive>
      </div>
      {hint}
      <DatePickerContentPrimitive
        anchor={field}
        align="start"
        sideOffset={4}
        className={retroDatePopupClass}
      >
        <RetroCalendarBody months={numberOfMonths} />
      </DatePickerContentPrimitive>
    </DatePickerPrimitive>
  )
}

export { RetroDateRangePicker }
export type { RetroDateRangePickerProps }
