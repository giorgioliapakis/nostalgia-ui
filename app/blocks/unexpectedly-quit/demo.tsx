"use client"

import * as React from "react"

import { RetroButton } from "@/registry/new-york/ui/retro-button"
import {
  UnexpectedlyQuitBlock,
  type UnexpectedlyQuitVariant,
} from "@/registry/new-york/blocks/unexpectedly-quit"

export function UnexpectedlyQuitDemo({
  variant,
  appName,
  errorType,
}: {
  variant: UnexpectedlyQuitVariant
  appName?: string
  errorType?: string | number
}) {
  const [open, setOpen] = React.useState(true)

  if (!open) {
    return (
      <div className="flex min-h-[150px] items-center justify-center">
        <RetroButton type="button" onClick={() => setOpen(true)}>
          {variant === "system-error" ? "Crash again" : "Quit unexpectedly again"}
        </RetroButton>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <UnexpectedlyQuitBlock
        variant={variant}
        appName={appName}
        errorType={errorType}
        onOk={() => setOpen(false)}
        onRestart={() => setOpen(false)}
      />
    </div>
  )
}
