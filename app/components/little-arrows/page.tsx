"use client"

import * as React from "react"
import {
  RetroLittleArrows,
  RetroNumberField,
} from "@/registry/new-york/ui/retro-little-arrows"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import { RetroGroupBox } from "@/registry/new-york/ui/retro-group-box"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const USAGE = `<RetroLittleArrows
  onIncrement={() => setN((n) => n + 1)}
  onDecrement={() => setN((n) => n - 1)}
/>

<RetroNumberField defaultValue={12} min={9} max={72} aria-label="Size" />
<RetroNumberField value={v} onValueChange={setV} min={0} max={1} step={0.05} />`

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export default function LittleArrowsPage() {
  const [month, setMonth] = React.useState(0)
  const [volume, setVolume] = React.useState(0.5)
  const [hours, setHours] = React.useState(9)
  const [minutes, setMinutes] = React.useState(41)

  return (
    <ComponentDocLayout
      name="retro-little-arrows"
      title="RetroLittleArrows"
      description="The Mac OS 9 little arrows stepper, plus RetroNumberField: an inset field with little arrows, min/max/step clamping, ArrowUp/ArrowDown/PageUp/PageDown/Home/End keys, spinbutton semantics and press-and-hold auto-repeat."
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Little Arrows</h2>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-[4px]">
            <span className="os9-heading text-[12px] w-[80px]">
              {MONTHS[month]}
            </span>
            <RetroLittleArrows
              incrementLabel="Next month"
              decrementLabel="Previous month"
              onIncrement={() => setMonth((m) => (m + 1) % 12)}
              onDecrement={() => setMonth((m) => (m + 11) % 12)}
            />
          </div>
          <div className="flex items-center gap-[4px]">
            <span className="text-[10px] text-os9-gray-700">Disabled</span>
            <RetroLittleArrows disabled />
          </div>
        </div>
        <p className="mt-3 text-os9-gray-700 text-[9px]">
          Press and hold an arrow to auto-repeat.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Number Field</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <RetroLabel htmlFor="nf-size" size="lg" className="w-[90px]">
              Font Size:
            </RetroLabel>
            <RetroNumberField id="nf-size" defaultValue={12} min={9} max={72} />
          </div>
          <div className="flex items-center gap-2">
            <RetroLabel htmlFor="nf-volume" size="lg" className="w-[90px]">
              Volume:
            </RetroLabel>
            <RetroNumberField
              id="nf-volume"
              value={volume}
              onValueChange={setVolume}
              min={0}
              max={1}
              step={0.05}
            />
            <span className="text-[10px] text-os9-gray-700">
              controlled: {volume}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <RetroLabel htmlFor="nf-mem" size="lg" className="w-[90px]">
              Memory:
            </RetroLabel>
            <RetroNumberField
              id="nf-mem"
              defaultValue={4096}
              min={1024}
              step={256}
              formatValue={(n) => `${n} K`}
              inputClassName="w-[80px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <RetroLabel htmlFor="nf-small" className="w-[90px]">
              Small:
            </RetroLabel>
            <RetroNumberField id="nf-small" size="sm" defaultValue={3} min={1} max={10} />
          </div>
          <div className="flex items-center gap-2">
            <RetroLabel htmlFor="nf-disabled" size="lg" className="w-[90px]">
              Disabled:
            </RetroLabel>
            <RetroNumberField id="nf-disabled" defaultValue={8} disabled />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Date &amp; Time Style</h2>
        <RetroGroupBox title="Current Time" className="w-[260px]">
          <div className="flex items-center gap-[4px]">
            <RetroNumberField
              aria-label="Hours"
              value={hours}
              onValueChange={setHours}
              min={0}
              max={23}
              formatValue={(n) => String(n).padStart(2, "0")}
              inputClassName="w-[32px] text-center"
            />
            <span className="os9-heading text-[12px]">:</span>
            <RetroNumberField
              aria-label="Minutes"
              value={minutes}
              onValueChange={setMinutes}
              min={0}
              max={59}
              formatValue={(n) => String(n).padStart(2, "0")}
              inputClassName="w-[32px] text-center"
            />
          </div>
        </RetroGroupBox>
      </section>
    </ComponentDocLayout>
  )
}
