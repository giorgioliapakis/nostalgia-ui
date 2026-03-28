"use client"

import { RetroSwitch } from "@/registry/new-york/ui/retro-switch"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function SwitchPreview() {
  return (
    <ComponentDocLayout
      name="retro-switch"
      title="RetroSwitch"
      description="A toggle switch with Mac OS 9 beveled track and sliding thumb indicator."
    >
      {/* Off (Default) */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Off (Default)</h2>
        <div className="flex items-center gap-3">
          <RetroSwitch id="switch-off" />
          <label
            htmlFor="switch-off"
            className="text-[10px] font-sans select-none cursor-pointer"
          >
            File Sharing
          </label>
        </div>
      </section>

      {/* On */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">On</h2>
        <div className="flex items-center gap-3">
          <RetroSwitch id="switch-on" defaultChecked />
          <label
            htmlFor="switch-on"
            className="text-[10px] font-sans select-none cursor-pointer"
          >
            AppleTalk Active
          </label>
        </div>
      </section>

      {/* Disabled States */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <RetroSwitch id="disabled-off" disabled />
            <label
              htmlFor="disabled-off"
              className="text-[10px] font-sans select-none cursor-not-allowed opacity-50"
            >
              Disabled (off)
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RetroSwitch id="disabled-on" defaultChecked disabled />
            <label
              htmlFor="disabled-on"
              className="text-[10px] font-sans select-none cursor-not-allowed opacity-50"
            >
              Disabled (on)
            </label>
          </div>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click each switch to toggle between on and off states.
      </p>
    </ComponentDocLayout>
  )
}
