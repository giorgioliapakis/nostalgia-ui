import type { Metadata } from "next"

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Window",
  description:
    "A window container with Mac OS 9 chrome, window shade, resizable size box, footer slot and title-bar dragging.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
