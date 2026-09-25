import type { Metadata } from "next"
import {
  RetroPlacard,
  RetroPlacardButton,
} from "@/registry/new-york/ui/retro-placard"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"
import {
  RetroDropdownMenu,
  RetroDropdownMenuContent,
  RetroDropdownMenuItem,
  RetroDropdownMenuTrigger,
} from "@/registry/new-york/ui/retro-dropdown-menu"
import {
  RetroIconApplication,
  RetroIconDocument,
  RetroIconFolder,
} from "@/registry/new-york/ui/retro-icons"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "The small raised strip at the bottom-left of a Mac OS 9 window, sharing the row with the horizontal scroll bar. Shows status text (RetroPlacard) or acts as a pop-up (RetroPlacardButton)."

export const metadata: Metadata = {
  title: "Placard",
  description: DESCRIPTION,
}

const USAGE = `<RetroPlacard>12 items, 1.2 GB available</RetroPlacard>

<RetroDropdownMenu>
  <RetroDropdownMenuTrigger asChild>
    <RetroPlacardButton>100%</RetroPlacardButton>
  </RetroDropdownMenuTrigger>
  <RetroDropdownMenuContent>…</RetroDropdownMenuContent>
</RetroDropdownMenu>`

/** Static stand-in for a horizontal scroll bar, used only in this demo. */
function FakeHScrollBar() {
  const arrow = (d: string) => (
    <span className="flex size-[16px] shrink-0 items-center justify-center border border-os9-black bg-os9-gray-300 shadow-[var(--os9-shadow-raised)]">
      <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
        <path d={d} fill="var(--os9-black)" />
      </svg>
    </span>
  )
  return (
    <div className="flex h-[16px] min-w-0 flex-1" aria-hidden="true">
      {arrow("M5 1 L1 3 L5 5 Z")}
      <div className="relative flex-1 border-y border-os9-black bg-os9-gray-600/30">
        <div className="absolute inset-y-0 left-[10%] w-[40px] border-x border-os9-black bg-os9-gray-300 shadow-[var(--os9-shadow-raised)]" />
      </div>
      {arrow("M1 1 L5 3 L1 5 Z")}
    </div>
  )
}

function SizeBox() {
  return (
    <span
      aria-hidden="true"
      className="size-[16px] shrink-0 border border-os9-black bg-os9-gray-300 shadow-[var(--os9-shadow-raised)] bg-[linear-gradient(135deg,transparent_45%,var(--os9-gray-700)_45%,var(--os9-gray-700)_55%,transparent_55%)]"
    />
  )
}

export default function PlacardPage() {
  return (
    <ComponentDocLayout
      name="retro-placard"
      title="RetroPlacard"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Standalone</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroPlacard>12 items, 1.2 GB available</RetroPlacard>
          <RetroPlacard>Page 1 of 4</RetroPlacard>
          <RetroPlacardButton>100%</RetroPlacardButton>
          <RetroPlacardButton popup={false}>Normal</RetroPlacardButton>
          <RetroPlacardButton disabled>50%</RetroPlacardButton>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">In a Finder Window</h2>
        <RetroWindow title="Macintosh HD" className="w-[420px]">
          <div className="-mx-[8px] -mb-[8px] -mt-[8px] flex flex-col">
            <div className="flex h-[120px] items-start gap-6 border-b border-os9-black bg-os9-white p-4 text-[10px]">
              <div className="flex flex-col items-center gap-1">
                <RetroIconFolder />
                <span>System Folder</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RetroIconFolder />
                <span>Applications</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RetroIconDocument />
                <span>Read Me</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RetroIconApplication />
                <span>SimpleText</span>
              </div>
            </div>
            <div className="flex">
              <RetroPlacard className="w-[150px] border-r-0">
                12 items, 1.2 GB available
              </RetroPlacard>
              <FakeHScrollBar />
              <SizeBox />
            </div>
          </div>
        </RetroWindow>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Pop-up Placard (Zoom)</h2>
        <RetroWindow title="Untitled Document" className="w-[420px]">
          <div className="-mx-[8px] -mb-[8px] -mt-[8px] flex flex-col">
            <div className="h-[100px] border-b border-os9-black bg-os9-white p-3 font-[family-name:var(--font-mono)] text-[10px]">
              The quick brown fox jumps over the lazy dog.
            </div>
            <div className="flex">
              <RetroDropdownMenu>
                <RetroDropdownMenuTrigger asChild>
                  <RetroPlacardButton className="w-[56px] border-r-0">
                    100%
                  </RetroPlacardButton>
                </RetroDropdownMenuTrigger>
                <RetroDropdownMenuContent align="start" side="top">
                  <RetroDropdownMenuItem>50%</RetroDropdownMenuItem>
                  <RetroDropdownMenuItem>100%</RetroDropdownMenuItem>
                  <RetroDropdownMenuItem>150%</RetroDropdownMenuItem>
                  <RetroDropdownMenuItem>200%</RetroDropdownMenuItem>
                </RetroDropdownMenuContent>
              </RetroDropdownMenu>
              <RetroPlacard className="w-[70px] border-r-0">Page 1</RetroPlacard>
              <FakeHScrollBar />
              <SizeBox />
            </div>
          </div>
        </RetroWindow>
      </section>
    </ComponentDocLayout>
  )
}
