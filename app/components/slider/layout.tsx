import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Slider",
  description: "A range slider with Mac OS 9 inset track and rectangular beveled thumb.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
