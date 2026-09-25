"use client"

import * as React from "react"

import {
  RetroControlStrip,
  RetroControlStripModule,
} from "@/registry/new-york/ui/retro-control-strip"
import {
  RetroDropdownMenuCheckboxItem,
  RetroDropdownMenuItem,
  RetroDropdownMenuLabel,
  RetroDropdownMenuRadioGroup,
  RetroDropdownMenuRadioItem,
  RetroDropdownMenuSeparator,
} from "@/registry/new-york/ui/retro-dropdown-menu"
import { ComponentDocLayout } from "../_components/component-doc-layout"

/* 16x16 module icons, drawn inline */
function SpeakerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 6.5H5.5L9.5 2.5V13.5L5.5 9.5H2.5Z" fill="#dddddd" stroke="#262626" />
      <path d="M11.5 5.5Q13 8 11.5 10.5M12.5 3.5Q15.5 8 12.5 12.5" fill="none" stroke="#262626" />
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="10" fill="#dddddd" stroke="#262626" />
      <rect x="3.5" y="3.5" width="9" height="6" fill="#333399" stroke="#262626" />
      <path d="M5.5 11.5V13.5H10.5V11.5M3.5 14.5H12.5" fill="none" stroke="#262626" />
    </svg>
  )
}

function NetworkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="5.5" y="1.5" width="5" height="4" fill="#ccccff" stroke="#262626" />
      <rect x="1.5" y="10.5" width="5" height="4" fill="#ccccff" stroke="#262626" />
      <rect x="9.5" y="10.5" width="5" height="4" fill="#ccccff" stroke="#262626" />
      <path d="M8 5.5V8M4 10.5V8H12V10.5" fill="none" stroke="#262626" />
    </svg>
  )
}

function CDIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="#eeeeee" stroke="#262626" />
      <circle cx="8" cy="8" r="2" fill="#ffffff" stroke="#262626" />
      <path d="M4 5Q5 3.5 7 3" fill="none" stroke="#6666cc" />
    </svg>
  )
}

export default function ControlStripPreview() {
  const [volume, setVolume] = React.useState("5")
  const [depth, setDepth] = React.useState("thousands")
  const [appleTalk, setAppleTalk] = React.useState(true)
  const [log, setLog] = React.useState<string>("—")

  return (
    <ComponentDocLayout
      name="retro-control-strip"
      title="RetroControlStrip"
      description="The Mac OS 9 Control Strip: a collapsible bottom-left strip of module buttons with pop-up menus."
      usage={`
<RetroControlStrip className="absolute bottom-4 left-0">
  <RetroControlStripModule
    icon={<SpeakerIcon />}
    label="Sound Volume"
    menu={<RetroDropdownMenuItem>Mute</RetroDropdownMenuItem>}
  />
  <RetroControlStripModule icon={<CDIcon />} label="Eject" onClick={eject} />
</RetroControlStrip>`}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">On the desktop</h2>
        <p className="text-[10px] text-os9-gray-700 mb-3">
          Click the ridged tab to collapse or expand the strip. Modules with a
          small triangle open a pop-up menu.
        </p>
        <div
          className="relative h-[220px] max-w-[560px] border border-os9-black"
          style={{
            backgroundColor: "var(--os9-gray-400)",
            backgroundImage:
              "radial-gradient(circle, var(--os9-gray-500) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        >
          <RetroControlStrip className="absolute bottom-4 left-0">
            <RetroControlStripModule
              icon={<SpeakerIcon />}
              label="Sound Volume"
              menu={
                <>
                  <RetroDropdownMenuLabel>Volume</RetroDropdownMenuLabel>
                  <RetroDropdownMenuRadioGroup value={volume} onValueChange={setVolume}>
                    {["7", "5", "3", "1", "0"].map((v) => (
                      <RetroDropdownMenuRadioItem key={v} value={v}>
                        {v === "0" ? "Mute" : `Level ${v}`}
                      </RetroDropdownMenuRadioItem>
                    ))}
                  </RetroDropdownMenuRadioGroup>
                </>
              }
            />
            <RetroControlStripModule
              icon={<MonitorIcon />}
              label="Monitor Bit Depth"
              menu={
                <RetroDropdownMenuRadioGroup value={depth} onValueChange={setDepth}>
                  <RetroDropdownMenuRadioItem value="256">256 Colors</RetroDropdownMenuRadioItem>
                  <RetroDropdownMenuRadioItem value="thousands">Thousands</RetroDropdownMenuRadioItem>
                  <RetroDropdownMenuRadioItem value="millions">Millions</RetroDropdownMenuRadioItem>
                </RetroDropdownMenuRadioGroup>
              }
            />
            <RetroControlStripModule
              icon={<NetworkIcon />}
              label="AppleTalk Switch"
              menu={
                <>
                  <RetroDropdownMenuCheckboxItem
                    checked={appleTalk}
                    onCheckedChange={(c) => setAppleTalk(c === true)}
                  >
                    AppleTalk Active
                  </RetroDropdownMenuCheckboxItem>
                  <RetroDropdownMenuSeparator />
                  <RetroDropdownMenuItem onSelect={() => setLog("Opened AppleTalk")}>
                    Open AppleTalk…
                  </RetroDropdownMenuItem>
                </>
              }
            />
            <RetroControlStripModule
              icon={<CDIcon />}
              label="Eject CD"
              onClick={() => setLog("CD ejected")}
            />
          </RetroControlStrip>
        </div>
        <p className="mt-2 text-[10px] text-os9-gray-700">
          Volume: {volume} · Depth: {depth} · AppleTalk:{" "}
          {appleTalk ? "on" : "off"} · Last action: {log}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">Collapsed by default, right side</h2>
        <div className="relative h-[80px] max-w-[560px] border border-os9-black bg-os9-gray-300">
          <RetroControlStrip side="right" defaultOpen={false} className="absolute bottom-2 right-0">
            <RetroControlStripModule icon={<SpeakerIcon />} label="Sound" />
            <RetroControlStripModule icon={<CDIcon />} label="Eject CD" />
          </RetroControlStrip>
        </div>
      </section>
    </ComponentDocLayout>
  )
}
