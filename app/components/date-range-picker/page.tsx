"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"

import { RetroDateRangePicker } from "@/registry/new-york/ui/retro-date-range-picker"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function DateRangePickerPreview() {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)

  return (
    <ComponentDocLayout
      name="retro-date-range-picker"
      title="RetroDateRangePicker"
      description="Start and end date fields with a two-month Mac OS 9 calendar popover. Type dates directly or pick them from the calendar."
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Default</h2>
        <RetroDateRangePicker value={range} onChange={setRange} />
        <p className="mt-2 text-[10px] text-os9-gray-700">
          {range?.from
            ? `${range.from.toLocaleDateString()} – ${range.to?.toLocaleDateString() ?? "…"}`
            : "No range selected"}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Single Month</h2>
        <RetroDateRangePicker numberOfMonths={1} />
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Custom Placeholders</h2>
        <RetroDateRangePicker placeholder={{ from: "Check in", to: "Check out" }} />
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <RetroDateRangePicker disabled />
      </section>
    </ComponentDocLayout>
  )
}
