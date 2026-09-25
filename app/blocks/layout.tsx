import type { Metadata } from "next"

import { ComponentsShell } from "../components/_components/components-shell"

export const metadata: Metadata = {
  title: {
    default: "Blocks",
    template: "%s — nostalgia-ui",
  },
  description:
    "Full Mac OS 9 compositions — Finder windows, dialogs, installers and more — installable with the shadcn CLI.",
}

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ComponentsShell>{children}</ComponentsShell>
}
