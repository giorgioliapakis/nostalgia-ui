import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sidebar",
  description: "A collapsible sidebar navigation with Mac OS 9 styling, icon-only collapse, and mobile sheet mode.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
