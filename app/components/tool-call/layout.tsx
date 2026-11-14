import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tool Call",
  description:
    "A Mac OS 9 row for an AI tool call: status glyph, tool name and a disclosure triangle revealing its input and output.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
