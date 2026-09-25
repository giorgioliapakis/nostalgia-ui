import type { Metadata } from "next"

import { SadMac404Block } from "@/registry/new-york/blocks/sad-mac-404"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main>
      <SadMac404Block code={404} homeHref="/" />
    </main>
  )
}
