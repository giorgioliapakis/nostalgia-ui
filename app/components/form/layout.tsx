import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Form",
  description: "Form components with Mac OS 9 styled labels, descriptions, and validation error messages.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
