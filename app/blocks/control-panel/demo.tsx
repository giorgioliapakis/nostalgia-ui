"use client"

import * as React from "react"

import {
  CONTROL_PANEL_DEFAULT_SETTINGS,
  ControlPanelBlock,
  type ControlPanelSettings,
} from "@/registry/new-york/blocks/control-panel"

export function ControlPanelDemo() {
  const [settings, setSettings] = React.useState<ControlPanelSettings>(
    CONTROL_PANEL_DEFAULT_SETTINGS
  )

  return (
    <div className="flex flex-wrap items-start gap-4">
      <ControlPanelBlock onChange={setSettings} className="flex-[1_1_420px]" />
      <pre
        aria-live="polite"
        aria-label="Current settings"
        className="os9-inset max-h-[380px] min-w-0 flex-[0_1_260px] overflow-auto p-2 font-mono text-[9px] leading-[1.5] text-os9-black"
      >
        {JSON.stringify(settings, null, 2)}
      </pre>
    </div>
  )
}
