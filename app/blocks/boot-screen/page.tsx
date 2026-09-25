import type { Metadata } from "next"

import { BootScreenBlock } from "@/registry/new-york/blocks/boot-screen"
import { BlockDocLayout } from "../_components/block-doc-layout"
import { BootScreenDemo } from "./demo"

const description =
  "The Mac OS startup screen: Happy Mac, “Welcome to Mac OS” and a progress bar, with extension icons marching along the bottom. Controlled via progress, or autoPlay with onComplete. Respects prefers-reduced-motion."

export const metadata: Metadata = {
  title: "Boot Screen",
  description,
}

export default function BootScreenPage() {
  return (
    <BlockDocLayout
      name="boot-screen"
      title="Boot Screen"
      description={description}
      exportName="BootScreenBlock"
    >
      <div className="flex flex-col gap-8">
        <BootScreenDemo />
        <BootScreenBlock
          progress={60}
          className="min-h-[320px] border border-os9-black"
        />
      </div>
    </BlockDocLayout>
  )
}
