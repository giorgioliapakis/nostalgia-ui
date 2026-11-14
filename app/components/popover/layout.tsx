import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Popover",
  description:
    "A click-triggered popup panel with Mac OS 9 raised bevel for forms and information.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
