"use client"

import { useState } from "react"
import { RetroSlider } from "@/registry/new-york/ui/retro-slider"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function SliderPreview() {
  const [value, setValue] = useState([50])

  return (
    <ComponentDocLayout
      name="retro-slider"
      title="RetroSlider"
      description="A range slider with Mac OS 9 inset track and rectangular beveled thumb."
    >
      {/* Default */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Default</h2>
        <div className="w-[260px]">
          <RetroSlider defaultValue={[50]} />
        </div>
      </section>

      {/* Controlled with value display */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Controlled (value: {value[0]})
        </h2>
        <div className="w-[260px]">
          <RetroSlider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
          />
        </div>
      </section>

      {/* Custom range */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Custom Range (0-10, step 1)</h2>
        <div className="w-[200px]">
          <RetroSlider defaultValue={[3]} min={0} max={10} step={1} />
        </div>
      </section>

      {/* Disabled */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <div className="w-[260px]">
          <RetroSlider defaultValue={[30]} disabled />
        </div>
      </section>

      {/* Full width */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Full Width</h2>
        <div className="w-full max-w-[400px]">
          <RetroSlider defaultValue={[75]} />
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Drag the rectangular thumb to adjust values. The track uses OS9 inset bevel styling.
      </p>
    </ComponentDocLayout>
  )
}
