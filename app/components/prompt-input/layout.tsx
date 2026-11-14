import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prompt Input",
  description:
    "A Mac OS 9 chat composer: an inset edit field that grows with its text, a default Send button that becomes Stop while a reply streams (⌘-period), and slots for attachments and a model picker.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
