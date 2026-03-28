"use client"

import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { RetroCheckbox } from "@/registry/new-york/ui/retro-checkbox"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function LabelPreview() {
  return (
    <ComponentDocLayout
      name="retro-label"
      title="RetroLabel"
      description="A form label in Mac OS 9 typography with default and large size variants."
    >
      <div className="space-y-8 max-w-md">
        {/* Default size with input */}
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-700">
            Default size (10px) with input
          </h2>
          <div className="space-y-1">
            <RetroLabel htmlFor="name">Name</RetroLabel>
            <RetroInput id="name" placeholder="Macintosh HD" size="sm" />
          </div>
        </section>

        {/* Large size with input */}
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-700">
            Large size (12px heading font) with input
          </h2>
          <div className="space-y-1">
            <RetroLabel htmlFor="location" size="lg">
              Location
            </RetroLabel>
            <RetroInput id="location" placeholder="/System/Library" />
          </div>
        </section>

        {/* Label with checkbox */}
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-700">
            With checkboxes
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <RetroCheckbox id="desktop-icons" />
              <RetroLabel htmlFor="desktop-icons">
                Show Desktop Icons
              </RetroLabel>
            </div>
            <div className="flex items-center gap-2">
              <RetroCheckbox id="warn-trash" defaultChecked />
              <RetroLabel htmlFor="warn-trash">
                Warn before emptying Trash
              </RetroLabel>
            </div>
            <div className="flex items-center gap-2">
              <RetroCheckbox id="calc-sizes" />
              <RetroLabel htmlFor="calc-sizes">
                Calculate folder sizes
              </RetroLabel>
            </div>
          </div>
        </section>

        {/* Disabled state */}
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-700">
            Disabled
          </h2>
          <div className="space-y-1">
            <RetroLabel
              htmlFor="disabled-input"
              className="text-os9-gray-600 pointer-events-none"
            >
              Startup Disk (disabled)
            </RetroLabel>
            <RetroInput
              id="disabled-input"
              defaultValue="Macintosh HD"
              disabled
            />
          </div>
          <div className="flex items-center gap-2">
            <RetroCheckbox id="disabled-cb" disabled />
            <RetroLabel
              htmlFor="disabled-cb"
              className="text-os9-gray-600 pointer-events-none"
            >
              Disabled checkbox label
            </RetroLabel>
          </div>
        </section>

        {/* Side by side sizes */}
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-700">
            Size comparison
          </h2>
          <div className="flex gap-8 items-start">
            <div className="space-y-1">
              <RetroLabel htmlFor="default-size">Default (10px)</RetroLabel>
              <RetroInput id="default-size" size="sm" defaultValue="Geneva" />
            </div>
            <div className="space-y-1">
              <RetroLabel htmlFor="large-size" size="lg">
                Large (12px)
              </RetroLabel>
              <RetroInput id="large-size" defaultValue="Charcoal" />
            </div>
          </div>
        </section>
      </div>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Labels use cursor: default and are paired with inputs and checkboxes via
        htmlFor.
      </p>
    </ComponentDocLayout>
  )
}
