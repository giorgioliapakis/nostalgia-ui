import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Desktop",
  description: "A full Mac OS 9 desktop environment with menu bar, icon area, and selectable desktop icons.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
