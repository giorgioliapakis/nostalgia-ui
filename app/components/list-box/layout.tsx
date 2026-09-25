import type { Metadata } from "next"

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "List Box",
  description:
    "A Mac OS 9 inset list box with single or multiple selection, azul highlight, keyboard navigation and type-ahead.",
}

export default function ListBoxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
