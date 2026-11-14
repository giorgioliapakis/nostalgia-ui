import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dialog",
  description:
    "A modal dialog window with Mac OS 9 chrome, title bar, and close box.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
