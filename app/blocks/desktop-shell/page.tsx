import type { Metadata } from "next"

import { BlockDocLayout } from "../_components/block-doc-layout"
import { DesktopShellDemo } from "./demo"

const description =
  "A full Mac OS 9 desktop that fills its container: menu bar with clock and Application menu, desktop icons, overlapping draggable windows with click-to-front, and the Control Strip."

export const metadata: Metadata = {
  title: "Desktop Shell",
  description,
}

export default function DesktopShellPage() {
  return (
    <BlockDocLayout
      name="desktop-shell"
      title="Desktop Shell"
      description={description}
      exportName="DesktopShellBlock"
    >
      <DesktopShellDemo />
    </BlockDocLayout>
  )
}
