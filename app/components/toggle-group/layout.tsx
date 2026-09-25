import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toggle Group",
  description: "A group of toggle buttons with Mac OS 9 bevel in single or multiple selection modes.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
