import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dropdown Menu",
  description: "A dropdown menu with Mac OS 9 styling, submenus, checkbox items, radio items, and shortcuts.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
