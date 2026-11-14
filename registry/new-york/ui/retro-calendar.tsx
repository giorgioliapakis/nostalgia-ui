"use client"

/*
 * RetroCalendar: a Mac OS 9 month grid on UI SDK's Calendar.
 *
 * Crafted moment: none, it's a static grid. Days answer the pointer at once
 * (lavender hover, azul selection) the way the OS 9 Date & Time panel did,
 * and a range previews in lavender as the pointer or arrow keys move toward
 * its end.
 *
 * Dates go in and out as `Date` objects (local midnight), like before; UI SDK
 * works in ISO strings underneath. `RetroCalendarBody` is the styled
 * navigation and grids on their own, for use inside a UI SDK Date Picker.
 *
 * Next.js with `cacheComponents`: UI SDK reads today's date while rendering,
 * which fails the prerender. Wrap the component in <Suspense>, or pass `today`.
 */

import * as React from "react"
import {
  Calendar as CalendarPrimitive,
  CalendarDay,
  CalendarGrid,
  CalendarHeading,
  CalendarNext,
  CalendarPrevious,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  type CalendarOptions,
  type CalendarValue,
  type DateMatchers,
} from "@ui-sdk/react/calendar"

import { cn } from "@/lib/utils"

/* ── dates ─────────────────────────────────────────────── */

type ISODate = `${number}-${number}-${number}`

/** A date range; `to` is missing while only the start is known. */
type DateRange = { from: Date | undefined; to?: Date | undefined }

const pad = (n: number) => String(n).padStart(2, "0")

/** A Date's local calendar day as an ISO date, like "2026-10-16". */
function toISODate(date: Date): ISODate {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` as ISODate
}

/** An ISO date as a Date at local midnight. */
function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

function toISOMonth(month: Date | string): string {
  return typeof month === "string" ? month.slice(0, 7) : toISODate(month).slice(0, 7)
}

function toISO(date: Date | string): ISODate {
  return (typeof date === "string" ? date : toISODate(date)) as ISODate
}

/* ── glyphs ────────────────────────────────────────────── */

/** OS9 solid-triangle chevron. */
function RetroCalendarChevron({ orientation }: { orientation: "left" | "right" }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      {orientation === "left" ? (
        <path d="M7 1 L3 5 L7 9 Z" fill="currentColor" />
      ) : (
        <path d="M3 1 L7 5 L3 9 Z" fill="currentColor" />
      )}
    </svg>
  )
}

/* ── classes ───────────────────────────────────────────── */

const retroCalendarSurfaceClass = cn(
  "relative p-4 text-os9-black",
  "border border-os9-black bg-os9-gray-200",
  "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]"
)

const navButtonClass = cn(
  "pointer-events-auto inline-flex items-center justify-center",
  "size-[24px] p-0 text-os9-black",
  "border border-os9-black bg-os9-gray-300",
  "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
  "cursor-pointer select-none transition-none outline-none",
  "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
  "focus-visible:os9-focus-ring",
  "data-disabled:pointer-events-none data-disabled:opacity-50"
)

const dayClass = cn(
  "size-8 p-0 text-center align-middle",
  "font-[family-name:var(--os9-font-sans)] text-[10px] text-os9-black",
  "cursor-pointer select-none transition-none outline-none",
  "hover:bg-os9-lavender focus-visible:os9-focus-ring focus-visible:relative",
  "data-outside:text-os9-gray-600",
  "data-today:font-bold data-today:underline data-today:underline-offset-2",
  /* selection, and a range's ends */
  "data-selected:bg-os9-azul data-selected:text-os9-white",
  /* a range's middle, chosen or previewed, is lavender with black ink */
  "data-range-middle:bg-os9-lavender data-range-middle:text-os9-black",
  "data-selected:data-range-middle:bg-os9-lavender data-selected:data-range-middle:text-os9-black",
  "data-preview:data-range-middle:bg-os9-lavender",
  "data-disabled:cursor-default data-disabled:opacity-50 data-disabled:hover:bg-transparent"
)

/* ── body: navigation and grids ────────────────────────── */

function RetroCalendarBody({ months = 1 }: { months?: number }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex h-[28px] items-center justify-between px-1">
        <CalendarPrevious className={navButtonClass}>
          <RetroCalendarChevron orientation="left" />
        </CalendarPrevious>
        <CalendarNext className={navButtonClass}>
          <RetroCalendarChevron orientation="right" />
        </CalendarNext>
      </div>
      {/* Names the grids for screen readers; each grid shows its own caption */}
      <CalendarHeading className="sr-only" />
      <div className="relative flex flex-col gap-4 sm:flex-row">
        {Array.from({ length: months }, (_, offset) => (
          <CalendarGrid
            key={offset}
            offset={offset}
            className="border-separate border-spacing-x-0 border-spacing-y-[2px]"
          >
            {(grid) => (
              <>
                <caption
                  aria-hidden="true"
                  className={cn(
                    "h-[28px] px-10 pb-[10px] align-middle leading-[28px]",
                    "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] text-os9-black select-none"
                  )}
                >
                  {grid.label}
                </caption>
                <CalendarWeekdays>
                  {(index) => (
                    <CalendarWeekday
                      index={index}
                      className="size-8 p-0 text-center align-middle font-[family-name:var(--os9-font-sans)] text-[9px] font-normal text-os9-gray-700 select-none"
                    />
                  )}
                </CalendarWeekdays>
                <CalendarWeeks>
                  {(cell) => <CalendarDay value={cell.date} className={dayClass} />}
                </CalendarWeeks>
              </>
            )}
          </CalendarGrid>
        ))}
      </div>
    </>
  )
}

/* ── RetroCalendar ─────────────────────────────────────── */

type PassThrough = Pick<
  CalendarOptions,
  | "locale"
  | "weekStartsOn"
  | "weekdayFormat"
  | "monthFormat"
  | "fixedWeeks"
  | "timeZone"
  | "minDays"
  | "maxDays"
  | "allowUnavailable"
  | "readOnly"
  | "pageBy"
>

type RetroCalendarBaseProps = PassThrough & {
  className?: string
  style?: React.CSSProperties
  id?: string
  "aria-label"?: string
  /** How many months show side by side. */
  numberOfMonths?: number
  /** The first month shown, when uncontrolled. Defaults to the selection's month, else today's. */
  defaultMonth?: Date
  /** The first month shown. Pass it with `onMonthChange` to control it. */
  month?: Date
  onMonthChange?: (month: Date) => void
  /** Show the days of the months before and after at the edges. */
  showOutsideDays?: boolean
  /** Turn the whole calendar off: nothing can be focused or picked. */
  disabled?: boolean
  /** Dates that can't be picked: ISO dates, `{ from, to }`, `{ weekday: [0, 6] }`, `{ before }`, `{ after }`, a function, or a list. */
  unavailable?: DateMatchers
  /** The earliest and latest dates that can be picked. */
  min?: Date | string
  max?: Date | string
  /** Today's date, for the underline and the starting month. */
  today?: Date | string
  /** In single mode, keep the selected date when it's pressed again. */
  required?: boolean
  /** Focus the selected day (or today) when the calendar mounts. */
  autoFocus?: boolean
}

type RetroCalendarSingleProps = RetroCalendarBaseProps & {
  mode?: "single"
  selected?: Date | undefined
  defaultSelected?: Date
  onSelect?: (date: Date | undefined) => void
}

type RetroCalendarMultipleProps = RetroCalendarBaseProps & {
  mode: "multiple"
  selected?: Date[] | undefined
  defaultSelected?: Date[]
  onSelect?: (dates: Date[] | undefined) => void
}

type RetroCalendarRangeProps = RetroCalendarBaseProps & {
  mode: "range"
  selected?: DateRange | undefined
  defaultSelected?: DateRange
  /** Runs once both ends are picked; the range previews in between. */
  onSelect?: (range: DateRange | undefined) => void
}

type RetroCalendarProps =
  | RetroCalendarSingleProps
  | RetroCalendarMultipleProps
  | RetroCalendarRangeProps

type AnySelection = Date | Date[] | DateRange | undefined

function toCalendarValue(mode: "single" | "multiple" | "range", selected: AnySelection): CalendarValue {
  if (mode === "multiple") return Array.isArray(selected) ? selected.map(toISODate) : []
  if (mode === "range") {
    const range = selected as DateRange | undefined
    return range?.from && range.to ? [toISODate(range.from), toISODate(range.to)] : null
  }
  return selected instanceof Date ? toISODate(selected) : null
}

function fromCalendarValue(mode: "single" | "multiple" | "range", value: CalendarValue): AnySelection {
  if (mode === "multiple") return Array.isArray(value) ? value.map(fromISODate) : undefined
  if (mode === "range") {
    return Array.isArray(value) && value.length === 2
      ? { from: fromISODate(value[0]), to: fromISODate(value[1]) }
      : undefined
  }
  return typeof value === "string" ? fromISODate(value) : undefined
}

function RetroCalendar(props: RetroCalendarProps) {
  const {
    mode = "single",
    selected,
    defaultSelected,
    onSelect,
    numberOfMonths = 1,
    defaultMonth,
    month,
    onMonthChange,
    showOutsideDays = true,
    min,
    max,
    today,
    required,
    autoFocus,
    className,
    ...rest
  } = props
  const controlled = Object.prototype.hasOwnProperty.call(props, "selected")
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!autoFocus) return
    /* the day holding the grid's tab stop: the selection, else today */
    const frame = requestAnimationFrame(() =>
      rootRef.current?.querySelector<HTMLElement>('[data-slot="calendar-day"][tabindex="0"]')?.focus()
    )
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CalendarPrimitive
      ref={rootRef}
      mode={mode}
      {...(controlled
        ? { value: toCalendarValue(mode, selected) }
        : defaultSelected !== undefined
          ? { defaultValue: toCalendarValue(mode, defaultSelected) }
          : {})}
      onValueChange={(value) =>
        (onSelect as ((s: AnySelection) => void) | undefined)?.(fromCalendarValue(mode, value))
      }
      deselectable={mode === "single" && !required}
      months={numberOfMonths}
      defaultMonth={defaultMonth ? toISOMonth(defaultMonth) : undefined}
      month={month ? toISOMonth(month) : undefined}
      onMonthChange={onMonthChange ? (next) => onMonthChange(fromISODate(`${next}-01`)) : undefined}
      showOutsideDays={showOutsideDays}
      min={min ? toISO(min) : undefined}
      max={max ? toISO(max) : undefined}
      today={today ? toISO(today) : undefined}
      className={cn("inline-block", retroCalendarSurfaceClass, className)}
      {...rest}
    >
      <RetroCalendarBody months={numberOfMonths} />
    </CalendarPrimitive>
  )
}

export {
  RetroCalendar,
  RetroCalendarBody,
  retroCalendarSurfaceClass,
  toISODate,
  fromISODate,
}
export type { RetroCalendarProps, DateRange }
