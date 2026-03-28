"use client"

import {
  RetroChartContainer,
  RetroChartTooltip,
  RetroChartTooltipContent,
  RetroChartLegend,
  RetroChartLegendContent,
  type RetroChartConfig,
} from "@/registry/new-york/ui/retro-chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const chartData = [
  { name: "System", files: 1240 },
  { name: "Apps", files: 860 },
  { name: "Docs", files: 2100 },
  { name: "Media", files: 540 },
  { name: "Other", files: 320 },
]

const chartConfig: RetroChartConfig = {
  files: {
    label: "Files",
    color: "#333399",
  },
}

export default function ChartPreview() {
  return (
    <ComponentDocLayout
      name="retro-chart"
      title="RetroChart"
      description="Chart components wrapping Recharts with Mac OS 9 themed tooltips, legends, and container."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        Chart components styled with OS9 aesthetics. Wraps Recharts with
        OS9-themed tooltips, legends, and container styling. Uses Geneva 9px for
        axis labels and Balloon Help style for tooltips.
      </p>

      {/* Bar chart */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Bar Chart — Disk Usage by Folder
        </h2>
        <div className="w-[480px]">
          <RetroChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <RetroChartTooltip content={<RetroChartTooltipContent />} />
              <RetroChartLegend content={<RetroChartLegendContent />} />
              <Bar dataKey="files" fill="var(--color-files)" />
            </BarChart>
          </RetroChartContainer>
        </div>
      </section>

      {/* Multi-series bar chart */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Multi-Series Bar Chart
        </h2>
        <div className="w-[480px]">
          <RetroChartContainer
            config={{
              created: { label: "Created", color: "#333399" },
              deleted: { label: "Deleted", color: "#cc0000" },
            }}
          >
            <BarChart
              data={[
                { month: "Jan", created: 45, deleted: 12 },
                { month: "Feb", created: 62, deleted: 18 },
                { month: "Mar", created: 38, deleted: 25 },
                { month: "Apr", created: 71, deleted: 8 },
              ]}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <RetroChartTooltip content={<RetroChartTooltipContent />} />
              <RetroChartLegend content={<RetroChartLegendContent />} />
              <Bar dataKey="created" fill="var(--color-created)" />
              <Bar dataKey="deleted" fill="var(--color-deleted)" />
            </BarChart>
          </RetroChartContainer>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Hover over bars to see the OS9 Balloon Help tooltip. The legend uses
        square indicators consistent with OS9 design.
      </p>
    </ComponentDocLayout>
  )
}
