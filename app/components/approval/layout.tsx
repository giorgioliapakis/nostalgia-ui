import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Approval",
  description:
    "A Mac OS 9 caution alert in the transcript that asks before an AI tool runs, with Option for Always Allow.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
