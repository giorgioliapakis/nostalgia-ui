import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Suggested Prompts",
  description:
    "A row of Mac OS 9 bevel buttons offering starter prompts for an AI chat.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
