"use client"

import * as React from "react"

import { CopyProgressBlock } from "@/registry/new-york/blocks/copy-progress"
import { RetroButton } from "@/registry/new-york/ui/retro-button"

const FILES = [
  "Read Me",
  "Extensions",
  "Control Panels",
  "AppleScript Guide.pdf",
  "Desktop Pictures",
  "QuickTime™ Player",
  "Sherlock 2",
  "Stickies",
]

export function CopyProgressDemo() {
  const [progress, setProgress] = React.useState<number | undefined>(undefined)
  const [running, setRunning] = React.useState(true)

  React.useEffect(() => {
    if (!running) return
    const prepare = setTimeout(() => setProgress(0), 1200)
    const tick = setInterval(() => {
      setProgress((p) => (p === undefined ? p : p >= 100 ? 0 : p + 2))
    }, 120)
    return () => {
      clearTimeout(prepare)
      clearInterval(tick)
    }
  }, [running])

  if (!running) {
    return (
      <div className="flex min-h-[120px] items-center justify-center">
        <RetroButton
          type="button"
          onClick={() => {
            setProgress(undefined)
            setRunning(true)
          }}
        >
          Copy again
        </RetroButton>
      </div>
    )
  }

  const index = progress === undefined ? 0 : Math.min(FILES.length - 1, Math.floor((progress / 100) * FILES.length))

  return (
    <div className="flex justify-center">
      <CopyProgressBlock
        progress={progress}
        itemsRemaining={FILES.length - index}
        currentItem={FILES[index]}
        onStop={() => setRunning(false)}
      />
    </div>
  )
}
