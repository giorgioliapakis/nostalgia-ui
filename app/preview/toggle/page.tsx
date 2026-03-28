"use client"

import { useState } from "react"
import { RetroToggle } from "@/registry/new-york/ui/retro-toggle"

export default function TogglePreview() {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(true)

  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroToggle Preview</h1>

      {/* Unpressed / Pressed states */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">States</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroToggle pressed={false} onPressedChange={() => {}}>
            Unpressed
          </RetroToggle>
          <RetroToggle pressed={true} onPressedChange={() => {}}>
            Pressed
          </RetroToggle>
        </div>
      </section>

      {/* Interactive */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Interactive</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroToggle pressed={bold} onPressedChange={setBold}>
            B
          </RetroToggle>
          <RetroToggle pressed={italic} onPressedChange={setItalic}>
            I
          </RetroToggle>
        </div>
        <p className="text-os9-gray-700 text-[10px] mt-2">
          Bold: {bold ? "on" : "off"} / Italic: {italic ? "on" : "off"}
        </p>
      </section>

      {/* Size variants */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Size Comparison</h2>
        <div className="flex items-end gap-4 flex-wrap">
          <RetroToggle size="sm">Small</RetroToggle>
          <RetroToggle size="default">Default</RetroToggle>
          <RetroToggle size="lg">Large</RetroToggle>
        </div>
      </section>

      {/* Disabled */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroToggle disabled>Disabled Off</RetroToggle>
          <RetroToggle disabled pressed={true} onPressedChange={() => {}}>
            Disabled On
          </RetroToggle>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click toggles to switch between pressed and unpressed states.
      </p>
    </main>
  )
}
