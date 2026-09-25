import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Carousel",
  description: "A slide carousel with Mac OS 9 beveled navigation buttons and inset content area.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
