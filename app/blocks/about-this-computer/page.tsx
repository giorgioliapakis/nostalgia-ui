import type { Metadata } from "next"

import { AboutThisComputerBlock } from "@/registry/new-york/blocks/about-this-computer"
import {
  RetroIconApplication,
  RetroIconDocument,
  RetroIconFinder,
  RetroIconNetwork,
} from "@/registry/new-york/ui/retro-icons"
import { BlockDocLayout } from "../_components/block-doc-layout"

const description =
  "The About This Computer window: Mac OS version, built-in and virtual memory, and a proportional memory bar for every running application."

export const metadata: Metadata = {
  title: "About This Computer",
  description,
}

export default function AboutThisComputerPage() {
  return (
    <BlockDocLayout
      name="about-this-computer"
      title="About This Computer"
      description={description}
      exportName="AboutThisComputerBlock"
    >
      <div className="flex flex-col items-center gap-8">
        <AboutThisComputerBlock
          version="9.2.2"
          totalMemory={512}
          virtualMemory={513}
          largestUnusedBlock={318.4}
          apps={[
            { name: "Mac OS", memory: 61.2, used: 54.9, icon: <RetroIconFinder size="sm" /> },
            { name: "Internet Explorer", memory: 48, used: 31.2, icon: <RetroIconNetwork size="sm" /> },
            { name: "Photoshop 5.5", memory: 64, used: 58.7, icon: <RetroIconApplication size="sm" /> },
            { name: "SimpleText", memory: 1, used: 0.5, icon: <RetroIconDocument size="sm" /> },
          ]}
        />
        <AboutThisComputerBlock
          version="9.0.4"
          totalMemory={64}
          virtualMemory={false}
          className="max-w-[360px]"
        />
      </div>
    </BlockDocLayout>
  )
}
