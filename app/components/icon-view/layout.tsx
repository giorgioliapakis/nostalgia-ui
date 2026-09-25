import type { Metadata } from "next"

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Icon View",
  description:
    "A Finder icon view grid with click, shift and command selection, arrow-key navigation, open on double-click and inline rename.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
