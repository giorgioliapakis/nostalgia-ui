"use client"

import { RetroRadioGroup, RetroRadioGroupItem } from "@/registry/new-york/ui/retro-radio"

export default function RadioPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroRadio Preview</h1>

      {/* Basic radio group */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic Radio Group</h2>
        <RetroRadioGroup defaultValue="option-2">
          <div className="flex items-center gap-2">
            <RetroRadioGroupItem value="option-1" id="r1" />
            <label
              htmlFor="r1"
              className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black cursor-pointer"
            >
              Option One
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RetroRadioGroupItem value="option-2" id="r2" />
            <label
              htmlFor="r2"
              className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black cursor-pointer"
            >
              Option Two (default)
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RetroRadioGroupItem value="option-3" id="r3" />
            <label
              htmlFor="r3"
              className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black cursor-pointer"
            >
              Option Three
            </label>
          </div>
        </RetroRadioGroup>
      </section>

      {/* Disabled state */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <RetroRadioGroup defaultValue="disabled-1" disabled>
          <div className="flex items-center gap-2">
            <RetroRadioGroupItem value="disabled-1" id="d1" />
            <label
              htmlFor="d1"
              className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-600 cursor-not-allowed"
            >
              Disabled selected
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RetroRadioGroupItem value="disabled-2" id="d2" />
            <label
              htmlFor="d2"
              className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-600 cursor-not-allowed"
            >
              Disabled unselected
            </label>
          </div>
        </RetroRadioGroup>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Use arrow keys to navigate between radio items when focused.
      </p>
    </main>
  )
}
