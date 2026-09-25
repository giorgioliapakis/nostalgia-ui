import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Date Picker",
  description: "A full-featured date picker with typed input and calendar popover in Mac OS 9 styling.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
