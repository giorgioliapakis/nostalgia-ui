import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sonner",
  description:
    "Toasts rendered as Mac OS 9 alert windows, with sonner's toast() API: striped title bar, close box, alert icons, OS9 buttons and Undo.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
