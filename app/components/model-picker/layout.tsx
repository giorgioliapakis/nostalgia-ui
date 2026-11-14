import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Model Picker",
  description:
    "A Mac OS 9 pop-up menu for choosing an AI model, with an icon and a short description per model.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
