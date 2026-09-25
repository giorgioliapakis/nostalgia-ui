import type { Metadata } from "next"

import { CopyProgressBlock } from "@/registry/new-york/blocks/copy-progress"
import { BlockDocLayout } from "../_components/block-doc-layout"
import { CopyProgressDemo } from "./demo"

const description =
  "The Finder “Copy” progress window: items remaining, the file being copied, a progress bar and Stop. Leave progress undefined for the indeterminate “Preparing to copy…” state."

export const metadata: Metadata = {
  title: "Copy Progress",
  description,
}

export default function CopyProgressPage() {
  return (
    <BlockDocLayout
      name="copy-progress"
      title="Copy Progress"
      description={description}
      exportName="CopyProgressBlock"
    >
      <div className="flex flex-col items-center gap-8">
        <CopyProgressDemo />
        <CopyProgressBlock />
        <CopyProgressBlock
          title="Move"
          verb="move"
          itemsRemaining={1}
          currentItem="A very long file name that will not fit in the window.sit"
          progress={82}
        />
      </div>
    </BlockDocLayout>
  )
}
