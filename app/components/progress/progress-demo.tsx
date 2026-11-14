"use client"

import * as React from "react"
import { RetroProgress } from "@/registry/new-york/ui/retro-progress"

/* Copies in uneven jumps, like the Finder, then starts over. */
const STEPS = [0, 8, 9, 31, 33, 34, 58, 61, 82, 100]

export function ProgressDemo() {
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    const t = window.setTimeout(
      () => setI((n) => (n + 1) % STEPS.length),
      STEPS[i] === 100 ? 1400 : 650
    )
    return () => window.clearTimeout(t)
  }, [i])
  return (
    <div>
      <span className="text-[10px] text-os9-black mb-1 block">
        Copying “System Folder”… {STEPS[i]}%
      </span>
      <RetroProgress aria-label="Copying System Folder" value={STEPS[i]} />
    </div>
  )
}
