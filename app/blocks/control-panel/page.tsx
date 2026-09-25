import type { Metadata } from "next"

import { BlockDocLayout } from "../_components/block-doc-layout"
import { ControlPanelDemo } from "./demo"

const description =
  "The Appearance control panel: Themes, Appearance, Fonts, Desktop, Sound and Options tabs built from group boxes, pop-ups, sliders, checkboxes, radio buttons and little-arrows fields."

export const metadata: Metadata = {
  title: "Control Panel",
  description,
}

export default function ControlPanelPage() {
  return (
    <BlockDocLayout
      name="control-panel"
      title="Control Panel"
      description={description}
      exportName="ControlPanelBlock"
    >
      <ControlPanelDemo />
    </BlockDocLayout>
  )
}
