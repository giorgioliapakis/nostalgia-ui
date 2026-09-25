import type { Metadata } from "next"
import {
  RetroEmpty,
  RetroEmptyContent,
  RetroEmptyDescription,
  RetroEmptyHeader,
  RetroEmptyMedia,
  RetroEmptyTitle,
} from "@/registry/new-york/ui/retro-empty"
import {
  RetroIconFolder,
  RetroIconNetwork,
  RetroIconPrinter,
  RetroIconSearch,
  RetroIconTrash,
} from "@/registry/new-york/ui/retro-icons"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "An empty state for folders, lists and search results: icon, title, description and actions, in the quiet style of an empty Mac OS 9 Finder window."

export const metadata: Metadata = {
  title: "Empty",
  description: DESCRIPTION,
}

const USAGE = `
<RetroEmpty>
  <RetroEmptyHeader>
    <RetroEmptyMedia><RetroIconFolder size="lg" /></RetroEmptyMedia>
    <RetroEmptyTitle>This folder is empty</RetroEmptyTitle>
    <RetroEmptyDescription>Drag items here to add them.</RetroEmptyDescription>
  </RetroEmptyHeader>
  <RetroEmptyContent>
    <RetroButton>New Folder</RetroButton>
  </RetroEmptyContent>
</RetroEmpty>
`

/** Minimal Finder-style window frame for the demos. */
function DemoWindow({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="os9-window w-full max-w-[420px]">
      <div className="flex h-[20px] items-center gap-2 px-[6px]">
        <div className="os9-stripes h-[11px] flex-1" aria-hidden />
        <span className="os9-heading shrink-0 text-[12px]">{title}</span>
        <div className="os9-stripes h-[11px] flex-1" aria-hidden />
      </div>
      <div className="mx-[6px] mb-[6px] border border-os9-black bg-os9-white shadow-[inset_1px_1px_0_var(--os9-gray-700)]">
        {children}
      </div>
    </div>
  )
}

export default function EmptyPage() {
  return (
    <ComponentDocLayout
      name="retro-empty"
      title="RetroEmpty"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Empty Folder</h2>
        <DemoWindow title="Documents">
          <RetroEmpty>
            <RetroEmptyHeader>
              <RetroEmptyMedia>
                <RetroIconFolder size="lg" />
              </RetroEmptyMedia>
              <RetroEmptyTitle>This folder is empty</RetroEmptyTitle>
              <RetroEmptyDescription>
                Drag files here from the desktop, or create a new folder to get
                organised.
              </RetroEmptyDescription>
            </RetroEmptyHeader>
            <RetroEmptyContent>
              <RetroButton>New Folder</RetroButton>
            </RetroEmptyContent>
          </RetroEmpty>
        </DemoWindow>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Empty Trash</h2>
        <DemoWindow title="Trash">
          <RetroEmpty>
            <RetroEmptyHeader>
              <RetroEmptyMedia>
                <RetroIconTrash size="lg" />
              </RetroEmptyMedia>
              <RetroEmptyTitle>The Trash is empty</RetroEmptyTitle>
              <RetroEmptyDescription>
                Items you throw away stay here until you choose Empty Trash
                from the Special menu.
              </RetroEmptyDescription>
            </RetroEmptyHeader>
          </RetroEmpty>
        </DemoWindow>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Icon Media Variant</h2>
        <DemoWindow title="Chooser">
          <RetroEmpty>
            <RetroEmptyHeader>
              <RetroEmptyMedia variant="icon">
                <RetroIconPrinter />
              </RetroEmptyMedia>
              <RetroEmptyTitle>No printers found</RetroEmptyTitle>
              <RetroEmptyDescription>
                Check that your printer is switched on and AppleTalk is active.
              </RetroEmptyDescription>
            </RetroEmptyHeader>
            <RetroEmptyContent className="flex-row justify-center">
              <RetroButton variant="primary">Try Again</RetroButton>
              <RetroButton>Cancel</RetroButton>
            </RetroEmptyContent>
          </RetroEmpty>
        </DemoWindow>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">No Search Results</h2>
        <DemoWindow title="Sherlock">
          <RetroEmpty>
            <RetroEmptyHeader>
              <RetroEmptyMedia variant="icon">
                <RetroIconSearch />
              </RetroEmptyMedia>
              <RetroEmptyTitle>No items found</RetroEmptyTitle>
              <RetroEmptyDescription>
                Nothing matched &ldquo;Kaleidoscope&rdquo;. Try a different
                name, or search your hard disk contents.
              </RetroEmptyDescription>
            </RetroEmptyHeader>
            <RetroEmptyContent>
              <RetroInput size="sm" placeholder="Search again…" aria-label="Search" />
            </RetroEmptyContent>
          </RetroEmpty>
        </DemoWindow>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Link</h2>
        <DemoWindow title="Network Browser">
          <RetroEmpty>
            <RetroEmptyHeader>
              <RetroEmptyMedia>
                <RetroIconNetwork size="lg" />
              </RetroEmptyMedia>
              <RetroEmptyTitle>No servers available</RetroEmptyTitle>
              <RetroEmptyDescription>
                Connect to a server by address, or read about{" "}
                <a href="#">File Sharing</a>.
              </RetroEmptyDescription>
            </RetroEmptyHeader>
          </RetroEmpty>
        </DemoWindow>
      </section>
    </ComponentDocLayout>
  )
}
