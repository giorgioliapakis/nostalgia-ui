"use client"

import * as React from "react"
import {
  RetroListBox,
  RetroListBoxItem,
} from "@/registry/new-york/ui/retro-list-box"
import {
  RetroIconApplication,
  RetroIconFolder,
  RetroIconHardDrive,
  RetroIconNetwork,
  RetroIconPrinter,
} from "@/registry/new-york/ui/retro-icons"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const USAGE = `<RetroListBox aria-label="Fonts" defaultValue="geneva" className="h-[120px] w-[180px]">
  <RetroListBoxItem value="charcoal">Charcoal</RetroListBoxItem>
  <RetroListBoxItem value="geneva">Geneva</RetroListBoxItem>
</RetroListBox>

// Multiple selection (Shift = range, Cmd/Ctrl = toggle, Space toggles, Cmd/Ctrl+A)
<RetroListBox multiple value={ids} onValueChange={setIds}>…</RetroListBox>`

const FONTS = [
  "Capitals", "Charcoal", "Chicago", "Courier", "Gadget", "Geneva",
  "Helvetica", "Monaco", "New York", "Palatino", "Sand", "Symbol",
  "Techno", "Textile", "Times",
]

const EXTENSIONS = [
  "Apple CD/DVD Driver", "AppleShare", "Color Picker", "File Sharing Extension",
  "Foreign File Access", "QuickTime", "Sound Manager", "Text Encoding Converter",
  "USB Device Extension",
]

export default function ListBoxPage() {
  const [font, setFont] = React.useState<string | null>("Geneva")
  const [enabled, setEnabled] = React.useState<string[]>(["AppleShare", "QuickTime"])

  return (
    <ComponentDocLayout
      name="retro-list-box"
      title="RetroListBox"
      description="An inset white list box with selectable rows. Single or multiple selection, azul highlight, Arrow/Home/End navigation, type-ahead, and listbox/option semantics. Works controlled or uncontrolled."
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Single Selection</h2>
        <div className="flex items-start gap-4 flex-wrap">
          <RetroListBox
            aria-label="Fonts"
            value={font}
            onValueChange={setFont}
            className="h-[140px] w-[180px]"
          >
            {FONTS.map((f) => (
              <RetroListBoxItem key={f} value={f}>
                {f}
              </RetroListBoxItem>
            ))}
          </RetroListBox>
          <div className="text-[10px] leading-[1.6]">
            <p>
              Selected: <span className="font-bold">{font ?? "none"}</span>
            </p>
            <p className="text-os9-gray-700">
              Focus the list with Tab, then use the arrows, Home/End, or type a
              font name.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Multiple Selection</h2>
        <div className="flex items-start gap-4 flex-wrap">
          <RetroListBox
            multiple
            aria-label="Extensions"
            value={enabled}
            onValueChange={setEnabled}
            className="h-[140px] w-[220px]"
          >
            {EXTENSIONS.map((e) => (
              <RetroListBoxItem key={e} value={e}>
                {e}
              </RetroListBoxItem>
            ))}
          </RetroListBox>
          <div className="flex flex-col gap-2 text-[10px]">
            <p>{enabled.length} selected</p>
            <RetroButton size="sm" onClick={() => setEnabled([...EXTENSIONS])}>
              Select All
            </RetroButton>
            <RetroButton size="sm" onClick={() => setEnabled([])}>
              Select None
            </RetroButton>
          </div>
        </div>
        <p className="mt-3 text-os9-gray-700 text-[9px]">
          Shift-click or Shift-arrow extends the range; Cmd/Ctrl-click or Space
          toggles a row.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Icons &amp; Disabled Rows</h2>
        <RetroListBox
          aria-label="Chooser"
          defaultValue="printer"
          className="h-[110px] w-[200px]"
        >
          <RetroListBoxItem value="appleshare" textValue="AppleShare" className="h-[20px]">
            <RetroIconNetwork size="sm" /> AppleShare
          </RetroListBoxItem>
          <RetroListBoxItem value="printer" textValue="LaserWriter 8" className="h-[20px]">
            <RetroIconPrinter size="sm" /> LaserWriter 8
          </RetroListBoxItem>
          <RetroListBoxItem value="disk" textValue="Macintosh HD" className="h-[20px]">
            <RetroIconHardDrive size="sm" /> Macintosh HD
          </RetroListBoxItem>
          <RetroListBoxItem value="apps" textValue="Applications" className="h-[20px]">
            <RetroIconFolder size="sm" /> Applications
          </RetroListBoxItem>
          <RetroListBoxItem value="fax" textValue="FaxPrint" disabled className="h-[20px]">
            <RetroIconApplication size="sm" /> FaxPrint (unavailable)
          </RetroListBoxItem>
        </RetroListBox>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled List</h2>
        <RetroListBox aria-label="Disabled" disabled defaultValue="b" className="h-[60px] w-[160px]">
          <RetroListBoxItem value="a">Item A</RetroListBoxItem>
          <RetroListBoxItem value="b">Item B</RetroListBoxItem>
          <RetroListBoxItem value="c">Item C</RetroListBoxItem>
        </RetroListBox>
      </section>
    </ComponentDocLayout>
  )
}
