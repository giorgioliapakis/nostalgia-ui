import type { Metadata } from "next"

import { HomeDesktop } from "./_components/home-desktop"

export const metadata: Metadata = {
  title: {
    absolute: "nostalgia-ui — Mac OS 9 components for React",
  },
  description:
    "59 Mac OS 9 components for React, installable with the shadcn CLI. Built with Tailwind CSS v4 and Radix UI. Zero image assets.",
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return <HomeDesktop />
}
