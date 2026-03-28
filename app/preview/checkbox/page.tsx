"use client"

import { RetroCheckbox } from "@/registry/new-york/ui/retro-checkbox"

export default function CheckboxPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroCheckbox Preview</h1>

      {/* Unchecked */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Unchecked (Default)</h2>
        <div className="flex items-center gap-3">
          <RetroCheckbox id="unchecked" />
          <label
            htmlFor="unchecked"
            className="text-[10px] font-sans select-none cursor-pointer"
          >
            Unchecked checkbox
          </label>
        </div>
      </section>

      {/* Checked */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Checked</h2>
        <div className="flex items-center gap-3">
          <RetroCheckbox id="checked" defaultChecked />
          <label
            htmlFor="checked"
            className="text-[10px] font-sans select-none cursor-pointer"
          >
            Checked checkbox
          </label>
        </div>
      </section>

      {/* Disabled States */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <RetroCheckbox id="disabled-unchecked" disabled />
            <label
              htmlFor="disabled-unchecked"
              className="text-[10px] font-sans select-none cursor-not-allowed opacity-50"
            >
              Disabled (unchecked)
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RetroCheckbox id="disabled-checked" defaultChecked disabled />
            <label
              htmlFor="disabled-checked"
              className="text-[10px] font-sans select-none cursor-not-allowed opacity-50"
            >
              Disabled (checked)
            </label>
          </div>
        </div>
      </section>

      {/* Multiple checkboxes */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Interactive (click to toggle)
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <RetroCheckbox id="option-a" />
            <label
              htmlFor="option-a"
              className="text-[10px] font-sans select-none cursor-pointer"
            >
              Show Desktop Icons
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RetroCheckbox id="option-b" defaultChecked />
            <label
              htmlFor="option-b"
              className="text-[10px] font-sans select-none cursor-pointer"
            >
              Warn before emptying Trash
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RetroCheckbox id="option-c" />
            <label
              htmlFor="option-c"
              className="text-[10px] font-sans select-none cursor-pointer"
            >
              Calculate folder sizes
            </label>
          </div>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Press and hold to see the active/pressed state with inverted bevel.
      </p>
    </main>
  )
}
