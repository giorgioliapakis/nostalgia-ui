import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sheet",
  description:
    "A slide-in panel from any screen edge with Mac OS 9 window chrome and bevel styling.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
