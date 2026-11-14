import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Drawer",
  description:
    "A bottom drawer panel with Mac OS 9 styling that slides up from the screen edge.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
