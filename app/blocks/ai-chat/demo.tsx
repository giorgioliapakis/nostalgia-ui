"use client"

import * as React from "react"

import { AiChatBlock } from "@/registry/new-york/blocks/ai-chat"
import { RetroButton } from "@/registry/new-york/ui/retro-button"

export function AiChatDemo() {
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-3">
      <AiChatBlock key={run} />
      <RetroButton size="sm" type="button" onClick={() => setRun((r) => r + 1)}>
        New Conversation
      </RetroButton>
    </div>
  )
}
