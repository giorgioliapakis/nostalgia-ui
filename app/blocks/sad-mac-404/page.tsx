import type { Metadata } from "next"

import { SadMac404Block } from "@/registry/new-york/blocks/sad-mac-404"
import { BlockDocLayout } from "../_components/block-doc-layout"

const description =
  "A full-page not-found screen: the Sad Mac, hex error codes and a Restart button that links home. Comes in the classic black and a platinum light variant."

export const metadata: Metadata = {
  title: "Sad Mac 404",
  description,
}

export default function SadMac404Page() {
  return (
    <BlockDocLayout
      name="sad-mac-404"
      title="Sad Mac 404"
      description={description}
      exportName="SadMac404Block"
    >
      <div className="flex flex-col gap-6">
        <SadMac404Block
          code={404}
          homeHref="/blocks"
          className="min-h-[380px] border border-os9-black"
        />
        <SadMac404Block
          code="0000DEAD"
          homeHref="/blocks"
          variant="light"
          message="Light variant with a custom code."
          className="min-h-[380px] border border-os9-black"
        />
      </div>
    </BlockDocLayout>
  )
}
