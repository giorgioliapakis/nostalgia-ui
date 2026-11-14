"use client"

import * as React from "react"
import { RetroCalendar, type DateRange } from "@/registry/new-york/ui/retro-calendar"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function CalendarPreview() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  )
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)
  const [dates, setDates] = React.useState<Date[]>([])

  return (
    <ComponentDocLayout
      name="retro-calendar"
      title="RetroCalendar"
      description="A month calendar with Mac OS 9 styling, supporting single dates, ranges and multiple dates."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A month calendar with OS9 styling, built on UI SDK&apos;s Calendar.
        Supports single dates, ranges and multiple dates, and takes and
        returns plain <code className="font-mono">Date</code> objects.
      </p>

      {/* Single date selection */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Single Date Selection</h2>
        <RetroCalendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
        {/* server and browser format dates in their own locales */}
        <p className="text-os9-gray-700 text-[9px] mt-2" suppressHydrationWarning>
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : "None"}
        </p>
      </section>

      {/* Range */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Range, Two Months</h2>
        <RetroCalendar
          mode="range"
          numberOfMonths={2}
          selected={range}
          onSelect={setRange}
        />
        <p className="text-os9-gray-700 text-[9px] mt-2">
          {range?.from && range.to
            ? `${range.from.toLocaleDateString()} – ${range.to.toLocaleDateString()}`
            : "Pick a start, then an end"}
        </p>
      </section>

      {/* Multiple, with weekends unavailable */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Multiple, Weekends Unavailable
        </h2>
        <RetroCalendar
          mode="multiple"
          unavailable={{ weekday: [0, 6] }}
          selected={dates}
          onSelect={(next) => setDates(next ?? [])}
        />
        <p className="text-os9-gray-700 text-[9px] mt-2">
          {dates.length} {dates.length === 1 ? "day" : "days"} selected
        </p>
      </section>

      {/* Default (no selection) */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Default (No Preselection)
        </h2>
        <RetroCalendar mode="single" />
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click a date to select it, and click it again to clear it. Use the
        arrow buttons to change months, or focus a day and use the arrow keys
        (Page Up and Page Down change months). Today is underlined.
      </p>
    </ComponentDocLayout>
  )
}
