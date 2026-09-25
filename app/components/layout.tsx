import type { Metadata } from "next"

import { ComponentsShell } from "./_components/components-shell"

export const metadata: Metadata = {
  title: {
    default: "Components",
    template: "%s — nostalgia-ui",
  },
  description:
    "Browse every nostalgia-ui component: Mac OS 9 styled React components for the shadcn CLI.",
}

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ComponentsShell>{children}</ComponentsShell>
}
