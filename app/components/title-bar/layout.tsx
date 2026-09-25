import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Title Bar",
  description: "A window title bar with Mac OS 9 striped regions, close box, collapse, and zoom controls.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
