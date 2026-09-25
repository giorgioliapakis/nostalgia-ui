import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toggle",
  description: "A pressable toggle button with Mac OS 9 raised and pressed bevel states.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
