"use client"

import * as React from "react"

import { InstallerBlock } from "@/registry/new-york/blocks/installer"
import { RetroButton } from "@/registry/new-york/ui/retro-button"

export function InstallerDemo() {
  const [run, setRun] = React.useState(0)
  const [status, setStatus] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col items-start gap-3">
      <InstallerBlock
        key={run}
        productName="Mac OS 9.2.2"
        onInstall={(disk) => setStatus(`Installing on “${disk.name}”…`)}
        onDisagree={() => setStatus("You must agree to the license to continue.")}
        onFinish={(action) =>
          setStatus(action === "restart" ? "Restarting…" : "Installer quit.")
        }
      />
      <div className="flex items-center gap-3">
        <RetroButton
          size="sm"
          type="button"
          onClick={() => {
            setRun((r) => r + 1)
            setStatus(null)
          }}
        >
          Start Over
        </RetroButton>
        <p
          aria-live="polite"
          className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black"
        >
          {status ?? "Step through the installer. The license step asks you to agree."}
        </p>
      </div>
    </div>
  )
}
