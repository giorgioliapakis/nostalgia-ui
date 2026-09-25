"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  RetroChartContainer,
  type RetroChartConfig,
} from "@/registry/new-york/ui/retro-chart"

const chartConfig = {
  value: {
    label: "Usage",
    color: "#333399",
  },
} satisfies RetroChartConfig

const chartData = [
  { name: "Finder", value: 42 },
  { name: "SimpleText", value: 28 },
  { name: "Netscape", value: 35 },
  { name: "Sherlock", value: 18 },
]

export default function ChartDemo() {
  return (
    <RetroChartContainer config={chartConfig} className="h-[200px] w-full max-w-[400px]">
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="var(--color-value)" />
      </BarChart>
    </RetroChartContainer>
  )
}
