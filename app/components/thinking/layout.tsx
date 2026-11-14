import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thinking",
  description:
    "Mac OS 9 AI thinking states: the watch cursor and a barber pole while a reply is pending, and a collapsible reasoning panel.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
