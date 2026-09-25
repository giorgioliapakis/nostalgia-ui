import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Context Menu",
  description: "A right-click context menu with Mac OS 9 styling, submenus, checkbox and radio items.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
