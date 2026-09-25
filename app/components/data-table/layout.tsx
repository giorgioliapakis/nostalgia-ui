import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Data Table",
  description: "A data table with sortable columns, filtering, and pagination in Mac OS 9 Finder list style.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
