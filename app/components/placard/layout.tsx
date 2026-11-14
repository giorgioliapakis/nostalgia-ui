import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Placard",
  description:
    "The small raised strip at the bottom-left of a Mac OS 9 window, sharing the row with the horizontal scroll bar. Shows status text (RetroPlacard) or acts as a pop-up (RetroPlacardButton).",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
