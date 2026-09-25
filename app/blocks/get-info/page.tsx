import type { Metadata } from "next"

import { BlockDocLayout } from "../_components/block-doc-layout"
import { GetInfoDemo } from "./demo"

const description =
  "The Finder Get Info window: icon and name, a Show pop-up for General Information, Sharing and Memory, label, comments and Locked / Stationery Pad checkboxes."

export const metadata: Metadata = {
  title: "Get Info",
  description,
}

export default function GetInfoPage() {
  return (
    <BlockDocLayout
      name="get-info"
      title="Get Info"
      description={description}
      exportName="GetInfoBlock"
    >
      <GetInfoDemo />
    </BlockDocLayout>
  )
}
