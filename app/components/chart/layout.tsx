import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chart",
  description: "Chart components wrapping Recharts with Mac OS 9 themed tooltips, legends, and container.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
