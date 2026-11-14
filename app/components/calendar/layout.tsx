import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calendar",
  description: "A month calendar with Mac OS 9 styling, supporting single dates, ranges and multiple dates.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
