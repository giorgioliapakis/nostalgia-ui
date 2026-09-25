import type { Metadata } from "next"
import { RetroBevelButton } from "@/registry/new-york/ui/retro-bevel-button"
import {
  RetroIconDocument,
  RetroIconFolder,
  RetroIconHardDrive,
  RetroIconNetwork,
  RetroIconPrinter,
  RetroIconTrash,
} from "@/registry/new-york/ui/retro-icons"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "A Mac OS 9 Appearance Manager bevel button: square-ish, icon above or beside the label, three bevel depths, sticky toggle behaviour and an optional pop-up menu arrow."

export const metadata: Metadata = {
  title: "Bevel Button",
  description: DESCRIPTION,
}

const USAGE = `<RetroBevelButton icon={<RetroIconFolder size="default" />} iconPosition="top">
  Folders
</RetroBevelButton>

// Sticky toggle
<RetroBevelButton defaultPressed>Bold</RetroBevelButton>
<RetroBevelButton pressed={on} onPressedChange={setOn}>Bold</RetroBevelButton>

// Pop-up bevel button (pair with RetroDropdownMenuTrigger asChild)
<RetroBevelButton menu>View</RetroBevelButton>`

export default function BevelButtonPage() {
  return (
    <ComponentDocLayout
      name="retro-bevel-button"
      title="RetroBevelButton"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Bevel Depths</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroBevelButton bevel="small">Small bevel</RetroBevelButton>
          <RetroBevelButton bevel="normal">Normal bevel</RetroBevelButton>
          <RetroBevelButton bevel="large">Large bevel</RetroBevelButton>
          <RetroBevelButton disabled>Disabled</RetroBevelButton>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Icon Above Label</h2>
        <div className="flex items-start gap-2 flex-wrap">
          <RetroBevelButton iconPosition="top" icon={<RetroIconHardDrive />}>
            Disk
          </RetroBevelButton>
          <RetroBevelButton iconPosition="top" icon={<RetroIconNetwork />}>
            Network
          </RetroBevelButton>
          <RetroBevelButton iconPosition="top" icon={<RetroIconPrinter />}>
            Printer
          </RetroBevelButton>
          <RetroBevelButton
            iconPosition="top"
            bevel="large"
            size="lg"
            icon={<RetroIconTrash size="lg" />}
          >
            Trash
          </RetroBevelButton>
          <RetroBevelButton iconPosition="top" icon={<RetroIconFolder />} disabled>
            Disabled
          </RetroBevelButton>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Icon Beside Label &amp; Icon Only</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <RetroBevelButton icon={<RetroIconFolder size="sm" />}>New Folder</RetroBevelButton>
          <RetroBevelButton icon={<RetroIconDocument size="sm" />} iconPosition="right">
            Open
          </RetroBevelButton>
          <RetroBevelButton size="sm" bevel="small" aria-label="Trash" icon={<RetroIconTrash size="sm" />} />
          <RetroBevelButton aria-label="Hard disk" icon={<RetroIconHardDrive size="sm" />} />
          <RetroBevelButton size="lg" bevel="large" aria-label="Printer" icon={<RetroIconPrinter />} />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Toggle (Sticky) Behaviour</h2>
        <div className="flex items-center gap-0 flex-wrap">
          <RetroBevelButton bevel="small" size="sm" defaultPressed className="w-[24px] font-bold">
            B
          </RetroBevelButton>
          <RetroBevelButton bevel="small" size="sm" toggle className="w-[24px] -ml-px italic">
            I
          </RetroBevelButton>
          <RetroBevelButton bevel="small" size="sm" toggle className="w-[24px] -ml-px underline">
            U
          </RetroBevelButton>
        </div>
        <div className="flex items-start gap-2 flex-wrap mt-4">
          <RetroBevelButton iconPosition="top" icon={<RetroIconFolder />} defaultPressed>
            Pressed
          </RetroBevelButton>
          <RetroBevelButton iconPosition="top" icon={<RetroIconFolder />} toggle>
            Not pressed
          </RetroBevelButton>
          <RetroBevelButton iconPosition="top" icon={<RetroIconFolder />} defaultPressed disabled>
            Disabled
          </RetroBevelButton>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Pop-up Menu Indicator</h2>
        <div className="flex items-start gap-2 flex-wrap">
          <RetroBevelButton menu>View</RetroBevelButton>
          <RetroBevelButton menu="right">Sort By</RetroBevelButton>
          <RetroBevelButton menu iconPosition="top" icon={<RetroIconDocument />}>
            Recent
          </RetroBevelButton>
          <RetroBevelButton menu aria-label="Favorites" icon={<RetroIconFolder size="sm" />} />
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px]">
        Press and hold to see the inverted bevel. Toggle buttons stay pressed
        (aria-pressed) until clicked again.
      </p>
    </ComponentDocLayout>
  )
}
