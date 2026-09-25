import type { Metadata } from "next"

import { HomeDesktop } from "./_components/home-desktop"
import { TOTAL_COMPONENTS } from "./components/_components/nav-data"

export const metadata: Metadata = {
  title: {
    absolute: "nostalgia-ui — Mac OS 9 components for React",
  },
  description:
    `${TOTAL_COMPONENTS} Mac OS 9 components for React, installable with the shadcn CLI. Built with Tailwind CSS v4 and Radix UI. Zero image assets.`,
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return <HomeDesktop />
}
