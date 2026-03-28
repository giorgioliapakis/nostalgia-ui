"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"
import { RetroDatePicker } from "@/registry/new-york/ui/retro-date-picker"
import { RetroDateRangePicker } from "@/registry/new-york/ui/retro-date-range-picker"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function DatePickerPreview() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)

  return (
    <ComponentDocLayout
      name="retro-date-picker"
      title="RetroDatePicker"
      description="A full-featured date picker with typed input and calendar popover in Mac OS 9 styling."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        Full-featured date pickers with typed input and calendar popover
        selection. Type a date (MM/DD/YYYY) or click the calendar button.
      </p>

      {/* Single date picker — controlled */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Single Date (Controlled)</h2>
        <RetroDatePicker value={date} onChange={setDate} />
        <p className="text-os9-gray-700 text-[9px] mt-2">
          Selected: {date ? date.toLocaleDateString() : "None"}
        </p>
      </section>

      {/* Single date picker — uncontrolled */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Single Date (Uncontrolled)</h2>
        <RetroDatePicker />
      </section>

      {/* Single date picker — disabled */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <RetroDatePicker disabled />
      </section>

      {/* Date range picker */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Date Range</h2>
        <RetroDateRangePicker value={range} onChange={setRange} />
        <p className="text-os9-gray-700 text-[9px] mt-2">
          From: {range?.from ? range.from.toLocaleDateString() : "None"}
          {" — "}
          To: {range?.to ? range.to.toLocaleDateString() : "None"}
        </p>
      </section>

      {/* Date range picker — disabled */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Date Range (Disabled)</h2>
        <RetroDateRangePicker disabled />
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Type dates directly in MM/DD/YYYY format, or click the calendar icon to
        open the date picker. For ranges, select the start date then the end
        date.
      </p>
    </ComponentDocLayout>
  )
}
