"use client"

import * as React from "react"

import {
  FinderWindowBlock,
  type FinderItem,
} from "@/registry/new-york/blocks/finder-window"

const ITEMS: FinderItem[] = [
  {
    id: "apps",
    label: "Applications (Mac OS 9)",
    modified: "2001-12-05T09:14",
    children: [
      { id: "simpletext", label: "SimpleText", type: "application", size: 684_032, modified: "2001-10-11T12:00" },
      { id: "graphing", label: "Graphing Calculator", type: "application", size: 1_945_600, modified: "2001-06-22T15:30" },
      {
        id: "utilities",
        label: "Utilities",
        modified: "2001-11-02T10:05",
        children: [
          { id: "diskfirstaid", label: "Disk First Aid", type: "application", size: 356_352, modified: "2001-08-14T08:45" },
          { id: "drivesetup", label: "Drive Setup", type: "application", size: 491_520, modified: "2001-08-14T08:45" },
        ],
      },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    modified: "2002-03-18T17:42",
    children: [
      { id: "letter", label: "Letter to Grandma", kind: "SimpleText text document", size: 4_096, modified: "2002-03-18T17:42" },
      { id: "budget", label: "Budget 2002", kind: "AppleWorks spreadsheet", size: 22_528, modified: "2002-02-01T11:20" },
      { id: "empty", label: "Scans", children: [], modified: "2001-12-24T19:03" },
    ],
  },
  {
    id: "system",
    label: "System Folder",
    modified: "2002-01-09T08:00",
    children: [
      { id: "finder", label: "Finder", type: "application", kind: "file", size: 1_536_000, modified: "2001-12-05T09:14" },
      { id: "extensions", label: "Extensions", children: [], modified: "2002-01-09T08:00" },
      { id: "cp", label: "Control Panels", children: [], modified: "2002-01-09T08:00" },
    ],
  },
  { id: "readme", label: "Read Me", kind: "SimpleText text document", size: 12_288, modified: "2001-12-05T09:14" },
  { id: "installer", label: "Mac OS 9.2.2 Update", type: "application", kind: "application program", size: 38_914_048, modified: "2001-12-05T09:14" },
]

export function FinderWindowDemo() {
  const [opened, setOpened] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-start gap-3">
      <FinderWindowBlock
        title="Macintosh HD"
        items={ITEMS}
        defaultExpanded={["documents"]}
        onOpen={(item) => setOpened(item.label)}
      />
      <p
        aria-live="polite"
        className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black"
      >
        {opened
          ? `Opened “${opened}”.`
          : "Double-click an item to open it. Click a column header to sort; drag the size box to resize."}
      </p>
    </div>
  )
}
