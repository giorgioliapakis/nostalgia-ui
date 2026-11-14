"use client"

import * as React from "react"
import type { DateRange } from "@/registry/new-york/ui/retro-calendar"
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
        Date pickers with a typed field and a calendar popover, built on UI
        SDK&apos;s Date Picker. Type a date in your language&apos;s order (like
        10/16/2026) and press Return, or click the calendar button.
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
        Typed dates commit on Return or when you leave the field; text that
        isn&apos;t a date stays marked until it&apos;s fixed. In the calendar,
        arrow keys move by day and week, Page Up and Page Down by month, and
        Escape closes it. For ranges, pick the start, watch the range preview,
        then pick the end.
      </p>
    </ComponentDocLayout>
  )
}
