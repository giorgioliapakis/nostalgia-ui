import type { Metadata } from "next"
import { RetroFolderTag } from "@/registry/new-york/ui/retro-folder-tag"
import {
  RetroIconDocument,
  RetroIconFolder,
  RetroIconHardDrive,
} from "@/registry/new-york/ui/retro-icons"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "The Mac OS 9 folder tag: the tab of a pop-up window, holding a small icon and the folder name. Active and inactive states, and tabs that sit on top of or hang below their window."

export const metadata: Metadata = {
  title: "Folder Tag",
  description: DESCRIPTION,
}

const USAGE = `<RetroFolderTag icon={<RetroIconFolder size="sm" />}>Documents</RetroFolderTag>
<RetroFolderTag active={false}>Applications</RetroFolderTag>
<RetroFolderTag side="top">Downloads</RetroFolderTag>`

export default function FolderTagPage() {
  return (
    <ComponentDocLayout
      name="retro-folder-tag"
      title="RetroFolderTag"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">States</h2>
        <div className="flex items-end gap-4 flex-wrap border-b border-os9-black pb-0">
          <RetroFolderTag icon={<RetroIconFolder size="sm" />}>Active</RetroFolderTag>
          <RetroFolderTag active={false} icon={<RetroIconFolder size="sm" />}>
            Inactive
          </RetroFolderTag>
          <RetroFolderTag size="sm" icon={<RetroIconFolder size="sm" />}>
            Small
          </RetroFolderTag>
          <RetroFolderTag>No icon</RetroFolderTag>
          <RetroFolderTag disabled icon={<RetroIconFolder size="sm" />}>
            Disabled
          </RetroFolderTag>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Pop-up Window</h2>
        <div className="flex flex-col items-start">
          <RetroFolderTag className="ml-[12px]" icon={<RetroIconFolder size="sm" />}>
            Documents
          </RetroFolderTag>
          <div className="os9-window w-[360px] p-[8px]">
            <div className="flex h-[100px] items-start gap-6 border border-os9-black bg-os9-white p-4 text-[10px] shadow-[var(--os9-shadow-inset)]">
              <div className="flex flex-col items-center gap-1">
                <RetroIconDocument />
                <span>Letter</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RetroIconDocument />
                <span>Budget</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RetroIconFolder />
                <span>Old Stuff</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Docked at the Screen Edge</h2>
        <p className="mb-3 text-[10px] text-os9-gray-700">
          Collapsed pop-up windows line up as tags along the bottom of the
          desktop. Click one to pop its window open.
        </p>
        <div className="relative h-[80px] w-[480px] border border-os9-black bg-os9-lavender">
          <div className="absolute inset-x-0 bottom-0 flex items-end gap-[6px] px-[12px]">
            <RetroFolderTag icon={<RetroIconFolder size="sm" />} className="mb-0">
              Documents
            </RetroFolderTag>
            <RetroFolderTag active={false} icon={<RetroIconFolder size="sm" />} className="mb-0">
              Applications
            </RetroFolderTag>
            <RetroFolderTag active={false} icon={<RetroIconHardDrive size="sm" />} className="mb-0">
              Macintosh HD
            </RetroFolderTag>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Hanging Below (side=&quot;top&quot;)</h2>
        <div className="flex flex-col items-start">
          <div className="os9-window h-[60px] w-[360px]" />
          <RetroFolderTag side="top" className="ml-[12px]" icon={<RetroIconFolder size="sm" />}>
            Downloads
          </RetroFolderTag>
        </div>
      </section>
    </ComponentDocLayout>
  )
}
