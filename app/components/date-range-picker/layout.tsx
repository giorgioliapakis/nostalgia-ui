import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Date Range Picker",
  description:
    "Start and end date fields with a two-month Mac OS 9 calendar popover.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
