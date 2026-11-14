"use client"

/*
 * RetroDatePicker: an OS 9 edit text field with a calendar button, on UI SDK's
 * Date Picker. Type a date and press Return (or tab away), or open the
 * calendar and pick one. UI SDK parses what's typed in the page's language
 * and formats it on commit.
 *
 * Crafted moment: pop from trigger. The calendar grows out of the field
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
  DatePickerHint as DatePickerHintPrimitive,
  DatePickerInput as DatePickerInputPrimitive,
  DatePickerTrigger as DatePickerTriggerPrimitive,
  type DatePickerValue,
  type DateMatchers,
} from "@ui-sdk/react/date-picker"

import { cn } from "@/lib/utils"
import {
  RetroCalendarBody,
  fromISODate,
  retroCalendarSurfaceClass,
  toISODate,
} from "@/registry/new-york/ui/retro-calendar"

/* ── shared pieces (also used by retro-date-range-picker) ── */

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
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
}

const retroDateInputClass = cn(
  "h-[24px] w-[110px] px-[5px]",
  "font-[family-name:var(--os9-font-sans)] text-[11px] text-os9-black",
  "border border-os9-black bg-os9-white",
  "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
  "outline-none transition-none placeholder:text-os9-gray-600",
  "focus:shadow-[0_2px_0_0_var(--os9-focus),2px_0_0_0_var(--os9-focus),0_-2px_0_0_var(--os9-focus),-2px_0_0_0_var(--os9-focus),0_0_0_1px_var(--os9-focus)]",
  /* text that isn't a date stays visible, marked, until it's fixed */
  "data-invalid:text-[#cc0000] data-invalid:underline data-invalid:decoration-dotted",
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-os9-gray-200 disabled:text-os9-gray-600"
)

const retroDateTriggerClass = cn(
  "inline-flex items-center justify-center",
  "h-[24px] w-[28px] p-0 -ml-px text-os9-black",
  "border border-os9-black bg-os9-gray-300",
  "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
  "cursor-pointer select-none transition-none outline-none",
  "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
  "data-open:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
  "focus-visible:os9-focus-ring",
  "disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50"
)

/* The popup is the calendar window itself. Box properties carry `!` so UI
 * SDK's popup reset can't strip them in apps that haven't declared
 * `@layer ui-sdk;` first. */
const retroDatePopupClass = cn(
  "z-50 m-0! w-auto! h-auto! max-w-none! overflow-visible! outline-none",
  retroCalendarSurfaceClass,
  "p-4! border! border-os9-black! bg-os9-gray-200! text-os9-black!",
  "shadow-[2px_2px_0_var(--os9-black),inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
  "origin-(--transform-origin) transition-[opacity,scale] duration-140 ease-[cubic-bezier(0.23,1,0.32,1)]",
  "data-starting-style:opacity-0 data-starting-style:scale-95",
  "data-ending-style:opacity-0 data-ending-style:duration-100",
  "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
)

/*
 * The field's placeholder is the locale's format ("MM/DD/YYYY", "TT.MM.JJJJ"),
 * which UI SDK only knows once it has read the page's language. Its hint
 * part, visually hidden, describes the field to screen readers and hands
 * the format to the placeholder.
 */
function SyncFormat({ format, onFormat }: { format: string; onFormat: (f: string) => void }) {
  React.useEffect(() => onFormat(format), [format, onFormat])
  return <>{format}</>
}

function useFormatHint(): [string, React.ReactNode] {
  const [format, setFormat] = React.useState("MM/DD/YYYY")
  const hint = (
    <DatePickerHintPrimitive className="sr-only">
      {(state) => <SyncFormat format={state.placeholder} onFormat={setFormat} />}
    </DatePickerHintPrimitive>
  )
  return [format, hint]
}

/* ── RetroDatePicker ───────────────────────────────────── */

interface RetroDatePickerProps {
  /** The selected date. Pass it (even as `undefined`) with `onChange` to control the picker. */
  value?: Date
  /** The date it starts with, when uncontrolled. */
  defaultValue?: Date
  /** Runs when a date is picked, or a typed one is committed with Return or by leaving the field. */
  onChange?: (date: Date | undefined) => void
  /** Placeholder text when no date is entered. Defaults to the locale's format, like "MM/DD/YYYY". */
  placeholder?: string
  /** The language dates are typed and shown in. Defaults to the page's `lang`. */
  locale?: string
  /** Whether the date picker is disabled */
  disabled?: boolean
  /** The earliest and latest dates that can be picked. */
  min?: Date
  max?: Date
  /** Dates that can't be picked: ISO dates, `{ before }`, `{ weekday: [0, 6] }`… */
  unavailable?: DateMatchers
  /** The name the date submits under in a form, as an ISO date. */
  name?: string
  /** Accessible name of the field. */
  "aria-label"?: string
  /** Additional class names for the root container */
  className?: string
  ref?: React.Ref<HTMLDivElement>
}

function RetroDatePicker(props: RetroDatePickerProps) {
  const {
    value,
    defaultValue,
    onChange,
    placeholder,
    locale,
    disabled = false,
    min,
    max,
    unavailable,
    name,
    "aria-label": ariaLabel = "Date",
    className,
    ref,
  } = props
  const controlled = Object.prototype.hasOwnProperty.call(props, "value")
  const [format, hint] = useFormatHint()

  return (
    <DatePickerPrimitive
      ref={ref}
      {...(controlled
        ? { value: value ? toISODate(value) : null }
        : defaultValue
          ? { defaultValue: toISODate(defaultValue) }
          : {})}
      onValueChange={(next: DatePickerValue) =>
        onChange?.(typeof next === "string" ? fromISODate(next) : undefined)
      }
      locale={locale}
      disabled={disabled}
      min={min ? toISODate(min) : undefined}
      max={max ? toISODate(max) : undefined}
      unavailable={unavailable}
      name={name}
      showOutsideDays
      className={cn("inline-flex items-center", className)}
    >
      <DatePickerInputPrimitive
        aria-label={ariaLabel}
        placeholder={placeholder ?? format}
        className={retroDateInputClass}
      />
      <DatePickerTriggerPrimitive className={retroDateTriggerClass}>
        <CalendarIcon />
      </DatePickerTriggerPrimitive>
      {hint}
      <DatePickerContentPrimitive align="start" sideOffset={4} className={retroDatePopupClass}>
        <RetroCalendarBody />
      </DatePickerContentPrimitive>
    </DatePickerPrimitive>
  )
}

export {
  RetroDatePicker,
  CalendarIcon,
  useFormatHint,
  retroDateInputClass,
  retroDateTriggerClass,
  retroDatePopupClass,
}
export type { RetroDatePickerProps }
