"use client"

import * as React from "react"

import { BootScreenBlock } from "@/registry/new-york/blocks/boot-screen"
import { RetroButton } from "@/registry/new-york/ui/retro-button"

export function BootScreenDemo() {
  const [run, setRun] = React.useState(0)
  const [done, setDone] = React.useState(false)

  return (
    <div className="flex flex-col gap-3">
      <BootScreenBlock
        key={run}
        autoPlay
        duration={5000}
        onComplete={() => setDone(true)}
        className="min-h-[400px] border border-os9-black"
      />
      <div className="flex items-center gap-3">
        <RetroButton
          type="button"
          onClick={() => {
            setDone(false)
            setRun((r) => r + 1)
          }}
        >
          Restart
        </RetroButton>
        <span
          aria-live="polite"
          className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black"
        >
          {done ? "onComplete fired." : "Starting up…"}
        </span>
      </div>
    </div>
  )
}
