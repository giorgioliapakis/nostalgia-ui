import type { Metadata } from "next"

import { BlockDocLayout } from "../_components/block-doc-layout"
import { OpenSaveDialogDemo } from "./demo"

const description =
  "The Navigation Services file dialog: a location pop-up with Shortcuts, Favorites and Recent buttons, a browsable file list, and Open or Save modes with a Name field and New Folder button."

export const metadata: Metadata = {
  title: "Open / Save Dialog",
  description,
}

export default function OpenSaveDialogPage() {
  return (
    <BlockDocLayout
      name="open-save-dialog"
      title="Open / Save Dialog"
      description={description}
      exportName="OpenSaveDialogBlock"
    >
      <OpenSaveDialogDemo />
    </BlockDocLayout>
  )
}
