import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toast",
  description: "Toast notification popups with Mac OS 9 raised bevel styling and auto-dismiss.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
