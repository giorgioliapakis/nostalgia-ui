import type { Metadata } from "next"

import { BlockDocLayout } from "../_components/block-doc-layout"
import { UnexpectedlyQuitDemo } from "./demo"

const description =
  "The classic “has unexpectedly quit” Stop alert, plus the “Sorry, a system error occurred” bomb alert with Restart. Return activates the default button."

export const metadata: Metadata = {
  title: "Unexpectedly Quit",
  description,
}

export default function UnexpectedlyQuitPage() {
  return (
    <BlockDocLayout
      name="unexpectedly-quit"
      title="Unexpectedly Quit"
      description={description}
      exportName="UnexpectedlyQuitBlock"
    >
      <div className="flex flex-col gap-8">
        <UnexpectedlyQuitDemo variant="quit" appName="SimpleText" errorType={1} />
        <UnexpectedlyQuitDemo
          variant="system-error"
          appName="Finder"
          errorType="unimplemented trap"
        />
      </div>
    </BlockDocLayout>
  )
}
