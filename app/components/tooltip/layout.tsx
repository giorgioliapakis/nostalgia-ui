import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tooltip",
  description:
    "A Mac OS 9 Balloon Help tooltip that pops from its trigger on hover or focus.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
