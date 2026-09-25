import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calendar",
  description: "A date picker calendar with Mac OS 9 styling, supporting single date selection.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
