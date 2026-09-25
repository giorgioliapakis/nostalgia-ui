import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sonner",
  description:
    "Sonner toasts rendered as Mac OS 9 alert windows: striped title bar, close box, alert icons and OS9 buttons.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
