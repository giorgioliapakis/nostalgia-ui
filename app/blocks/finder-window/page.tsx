import type { Metadata } from "next"

import { BlockDocLayout } from "../_components/block-doc-layout"
import { FinderWindowDemo } from "./demo"

const description =
  "A Finder window with a sortable list view (Name, Date Modified, Size, Kind), disclosure triangles, an icon view toggle, a status placard and a size box."

export const metadata: Metadata = {
  title: "Finder Window",
  description,
}

export default function FinderWindowPage() {
  return (
    <BlockDocLayout
      name="finder-window"
      title="Finder Window"
      description={description}
      exportName="FinderWindowBlock"
    >
      <FinderWindowDemo />
    </BlockDocLayout>
  )
}
