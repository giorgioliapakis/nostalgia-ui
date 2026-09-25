import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Menu Bar",
  description: "A horizontal menu bar with Mac OS 9 styling and pull-down menu panels.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
