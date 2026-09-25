import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Scrollbar",
  description: "Scroll areas with Mac OS 9 styled scrollbars, beveled thumb, and arrow navigation buttons.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
