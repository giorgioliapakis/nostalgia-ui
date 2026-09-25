"use client"

import * as React from "react"

import { RetroIconView, type IconViewItem } from "@/registry/new-york/ui/retro-icon-view"
import {
  RetroIconApplication,
  RetroIconDocument,
  RetroIconFolder,
  RetroIconHardDrive,
  RetroIconPrinter,
  RetroIconTrash,
} from "@/registry/new-york/ui/retro-icons"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const initialItems: IconViewItem[] = [
  { id: "hd", label: "Macintosh HD", icon: <RetroIconHardDrive size="default" /> },
  { id: "apps", label: "Applications", icon: <RetroIconFolder size="default" /> },
  { id: "docs", label: "Documents", icon: <RetroIconFolder size="default" /> },
  { id: "system", label: "System Folder", icon: <RetroIconFolder size="default" /> },
  { id: "simpletext", label: "SimpleText", icon: <RetroIconApplication size="default" /> },
  { id: "readme", label: "Read Me", icon: <RetroIconDocument size="default" /> },
  { id: "letter", label: "Letter to Steve", icon: <RetroIconDocument size="default" /> },
  { id: "printer", label: "LaserWriter 8", icon: <RetroIconPrinter size="default" /> },
  { id: "trash", label: "Trash", icon: <RetroIconTrash size="default" /> },
]

export default function IconViewPreview() {
  const [items, setItems] = React.useState(initialItems)
  const [selected, setSelected] = React.useState<string[]>(["docs"])
  const [opened, setOpened] = React.useState<string | null>(null)

  return (
    <ComponentDocLayout
      name="retro-icon-view"
      title="RetroIconView"
      description="A Finder icon view grid with click, shift and command selection, arrow-key navigation, open on double-click and inline rename."
      usage={`
<RetroIconView
  aria-label="Macintosh HD"
  items={items}
  onOpen={(item) => open(item)}
  renamable
  onRename={(item, label) => rename(item.id, label)}
/>`}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">Finder Icon View</h2>
        <p className="text-[10px] text-os9-gray-700 mb-3">
          Click to select, Shift-click for a range, Cmd/Ctrl-click to toggle.
          Arrow keys move through the grid. Double-click or Cmd+O opens. Press
          Return or F2 (or click a selected label again) to rename.
        </p>
        <RetroIconView
          aria-label="Macintosh HD"
          items={items}
          selected={selected}
          onSelectedChange={setSelected}
          onOpen={(item) => setOpened(item.label)}
          renamable
          onRename={(item, label) =>
            setItems((prev) =>
              prev.map((i) => (i.id === item.id ? { ...i, label } : i))
            )
          }
          className="os9-inset min-h-[200px] max-w-[480px]"
        />
        <p className="mt-2 text-[10px] text-os9-gray-700">
          Selected: {selected.length ? selected.join(", ") : "none"} · Last
          opened: {opened ?? "none"}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">Single selection, wide cells</h2>
        <RetroIconView
          aria-label="Applications"
          items={initialItems.slice(0, 5)}
          selectionMode="single"
          cellWidth={96}
          className="os9-inset max-w-[480px]"
        />
      </section>
    </ComponentDocLayout>
  )
}
