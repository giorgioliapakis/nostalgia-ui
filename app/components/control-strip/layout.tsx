import type { Metadata } from "next"

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Control Strip",
  description:
    "The Mac OS 9 Control Strip: a collapsible bottom-left strip of module buttons with pop-up menus.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
