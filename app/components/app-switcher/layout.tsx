import type { Metadata } from "next"

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "App Switcher",
  description:
    "The Mac OS 9 Application menu: shows the frontmost app at the right end of the menu bar with Hide, Hide Others, Show All and a running-apps list.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
