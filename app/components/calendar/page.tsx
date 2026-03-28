"use client"

import * as React from "react"
import { RetroCalendar } from "@/registry/new-york/ui/retro-calendar"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function CalendarPreview() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  )

  return (
    <ComponentDocLayout
      name="retro-calendar"
      title="RetroCalendar"
      description="A date picker calendar with Mac OS 9 styling, supporting single date selection."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A date picker calendar with OS9 styling. Built on react-day-picker.
        Supports single date selection, range selection, and multiple dates.
      </p>

      {/* Single date selection */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Single Date Selection</h2>
        <RetroCalendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
        <p className="text-os9-gray-700 text-[9px] mt-2">
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : "None"}
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
        Click a date to select it. Use the arrow buttons to navigate months.
        Today is underlined.
      </p>
    </ComponentDocLayout>
  )
}
