import type { Metadata } from "next"

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Little Arrows",
  description:
    "The Mac OS 9 little arrows stepper and a number field that pairs an inset text field with it: min/max/step, keyboard stepping and press-and-hold repeat.",
}

export default function LittleArrowsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
