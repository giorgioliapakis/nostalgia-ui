import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alert Dialog",
  description:
    "A modal confirmation dialog with Mac OS 9 window chrome for destructive or important actions.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
