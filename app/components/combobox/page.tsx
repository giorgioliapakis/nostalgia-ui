"use client"

import * as React from "react"
import {
  RetroCombobox,
  RetroComboboxTrigger,
  RetroComboboxContent,
  RetroComboboxInput,
  RetroComboboxEmpty,
  RetroComboboxItem,
  RetroComboboxList,
} from "@/registry/new-york/ui/retro-combobox"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const apps = [
  { value: "simpletext", label: "SimpleText" },
  { value: "appleworks", label: "AppleWorks" },
  { value: "sherlock", label: "Sherlock" },
  { value: "itunes", label: "iTunes" },
  { value: "internet-explorer", label: "Internet Explorer" },
  { value: "netscape", label: "Netscape Navigator" },
  { value: "stuffit", label: "StuffIt Expander" },
  { value: "photoshop", label: "Adobe Photoshop" },
  { value: "quarkxpress", label: "QuarkXPress" },
  { value: "hypercard", label: "HyperCard" },
]

export default function ComboboxPreview() {
  const [value, setValue] = React.useState("")

  return (
    <ComponentDocLayout
      name="retro-combobox"
      title="RetroCombobox"
      description="A searchable dropdown select with Mac OS 9 styling and typeahead filtering."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A searchable dropdown (combobox) with OS9 styling, built on UI SDK&apos;s
        Combobox. Type to filter the list of items; the azul highlight glides
        between matches.
      </p>

      {/* Basic combobox */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Select an Application
        </h2>
        <div className="w-[240px]">
          <RetroCombobox value={value} onValueChange={setValue}>
            <RetroComboboxTrigger placeholder="Choose application..." />
            <RetroComboboxContent>
              <RetroComboboxInput placeholder="Search applications..." />
              <RetroComboboxEmpty>No application found.</RetroComboboxEmpty>
              <RetroComboboxList>
                {apps.map((app) => (
                  <RetroComboboxItem key={app.value} value={app.value}>
                    {app.label}
                  </RetroComboboxItem>
                ))}
              </RetroComboboxList>
            </RetroComboboxContent>
          </RetroCombobox>
        </div>
        <p className="text-os9-gray-700 text-[9px] mt-2">
          Selected: {value || "None"}
        </p>
      </section>

      {/* Uncontrolled */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Uncontrolled (with default value)
        </h2>
        <div className="w-[240px]">
          <RetroCombobox defaultValue="sherlock">
            <RetroComboboxTrigger placeholder="Choose application..." />
            <RetroComboboxContent>
              <RetroComboboxInput />
              <RetroComboboxEmpty>No results.</RetroComboboxEmpty>
              <RetroComboboxList>
                {apps.map((app) => (
                  <RetroComboboxItem key={app.value} value={app.value}>
                    {app.label}
                  </RetroComboboxItem>
                ))}
              </RetroComboboxList>
            </RetroComboboxContent>
          </RetroCombobox>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click the trigger to open. Type to filter. Click an item or press Enter
        to select. Selected items show a checkmark.
      </p>
    </ComponentDocLayout>
  )
}
