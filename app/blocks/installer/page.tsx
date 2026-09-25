import type { Metadata } from "next"

import { BlockDocLayout } from "../_components/block-doc-layout"
import { InstallerDemo } from "./demo"

const description =
  "A multi-step Mac OS installer: Welcome, Read Me, a license with an Agree / Disagree alert, destination disk selection, install progress and a finish screen."

export const metadata: Metadata = {
  title: "Installer",
  description,
}

export default function InstallerPage() {
  return (
    <BlockDocLayout
      name="installer"
      title="Installer"
      description={description}
      exportName="InstallerBlock"
    >
      <InstallerDemo />
    </BlockDocLayout>
  )
}
