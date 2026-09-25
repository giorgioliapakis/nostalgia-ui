"use client"

import * as React from "react"

import {
  OpenSaveDialogBlock,
  type OpenSaveDialogMode,
  type OpenSaveFile,
} from "@/registry/new-york/blocks/open-save-dialog"
import {
  RetroRadioGroup,
  RetroRadioGroupItem,
} from "@/registry/new-york/ui/retro-radio"

const FILES: OpenSaveFile[] = [
  {
    id: "documents",
    name: "Documents",
    modified: "2002-03-18T17:42",
    children: [
      { id: "letter", name: "Letter to Grandma", modified: "2002-03-18T17:42" },
      { id: "recipes", name: "Recipes", modified: "2001-11-30T10:12" },
      {
        id: "school",
        name: "School",
        modified: "2002-02-11T08:30",
        children: [
          { id: "essay", name: "History Essay", modified: "2002-02-10T21:05" },
          { id: "notes", name: "Biology Notes", modified: "2002-01-28T16:47" },
        ],
      },
    ],
  },
  {
    id: "apps",
    name: "Applications (Mac OS 9)",
    modified: "2001-12-05T09:14",
    children: [
      { id: "simpletext", name: "SimpleText", type: "application", modified: "2001-10-11T12:00" },
      { id: "calc", name: "Graphing Calculator", type: "application", modified: "2001-06-22T15:30" },
    ],
  },
  { id: "system", name: "System Folder", modified: "2002-01-09T08:00", children: [] },
  { id: "readme", name: "Read Me", modified: "2001-12-05T09:14" },
  { id: "about", name: "About Mac OS 9", modified: "2001-12-05T09:14" },
]

export function OpenSaveDialogDemo() {
  const [mode, setMode] = React.useState<OpenSaveDialogMode>("open")
  const [status, setStatus] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col items-start gap-3">
      <RetroRadioGroup
        value={mode}
        onValueChange={(v) => {
          setMode(v as OpenSaveDialogMode)
          setStatus(null)
        }}
        aria-label="Dialog mode"
        className="flex gap-4 font-[family-name:var(--font-sans)] text-[10px]"
      >
        <label className="flex items-center gap-1.5">
          <RetroRadioGroupItem value="open" /> Open
        </label>
        <label className="flex items-center gap-1.5">
          <RetroRadioGroupItem value="save" /> Save
        </label>
      </RetroRadioGroup>

      <OpenSaveDialogBlock
        key={mode}
        mode={mode}
        files={FILES}
        defaultPath={["documents"]}
        defaultName="My Novel"
        onConfirm={(r) =>
          setStatus(
            r.mode === "open"
              ? `Opened “${r.file.name}” from ${r.path.join(" : ")}.`
              : `Saved “${r.name}” to ${r.path.join(" : ")}.`
          )
        }
        onCancel={() => setStatus("Cancelled.")}
      />

      <p
        aria-live="polite"
        className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black"
      >
        {status ?? "Double-click folders to open them; use the location pop-up to go back up."}
      </p>
    </div>
  )
}
