"use client"

import * as React from "react"

import type { RetroToolPart } from "@/registry/new-york/lib/retro-ai"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroIconFolder } from "@/registry/new-york/ui/retro-icons"
import {
  RetroToolCall,
  RetroToolCallGroup,
  RetroToolChips,
} from "@/registry/new-york/ui/retro-tool-call"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const USAGE = `import { RetroToolCall, RetroToolCallGroup } from "@/components/ui/retro-tool-call"

// inside a message, for each tool part from useChat
<RetroToolCallGroup>
  {toolParts.map((part) => (
    <RetroToolCall key={part.toolCallId} part={part} />
  ))}
</RetroToolCallGroup>

// dense layouts
<RetroToolChips parts={toolParts} onSelect={(part) => scrollTo(part.toolCallId)} />`

const SEARCH_INPUT = { query: "Read Me", in: "Macintosh HD", kind: "document" }
const SEARCH_OUTPUT = {
  matches: [
    { name: "Read Me", path: "Macintosh HD:Applications:SimpleText:Read Me" },
    { name: "Read Me First!", path: "Macintosh HD:Desktop Folder:Read Me First!" },
  ],
  searched: 14212,
}

const STATES: { label: string; part: RetroToolPart }[] = [
  {
    label: "Running",
    part: { type: "tool-searchFiles", toolCallId: "call_01", state: "input-available", input: SEARCH_INPUT },
  },
  {
    label: "Waiting for you",
    part: {
      type: "tool-moveFiles",
      toolCallId: "call_02",
      state: "approval-requested",
      input: { files: 12, from: "Desktop Folder", to: "Old Stuff" },
      approval: { id: "ap_02" },
    },
  },
  {
    label: "Done",
    part: {
      type: "tool-searchFiles",
      toolCallId: "call_03",
      state: "output-available",
      input: SEARCH_INPUT,
      output: SEARCH_OUTPUT,
    },
  },
  {
    label: "Failed",
    part: {
      type: "tool-emptyTrash",
      toolCallId: "call_04",
      state: "output-error",
      input: { secure: false },
      errorText: "The Trash can't be emptied because “Budget 1999.xls” is in use.",
    },
  },
  {
    label: "Denied",
    part: {
      type: "tool-eraseDisk",
      toolCallId: "call_05",
      state: "output-denied",
      input: { disk: "Zip 100" },
      approval: { id: "ap_05", approved: false },
    },
  },
]

/** Plays one call from streaming input to its result, then holds. */
function useSimulatedCall(): [RetroToolPart, () => void] {
  const [step, setStep] = React.useState(0)
  const [run, setRun] = React.useState(0)
  React.useEffect(() => {
    setStep(0)
    const timers = [
      window.setTimeout(() => setStep(1), 700),
      window.setTimeout(() => setStep(2), 2600),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [run])
  const part: RetroToolPart =
    step === 0
      ? { type: "tool-listFolder", toolCallId: "call_sim", state: "input-streaming", input: { path: "Desktop" } }
      : step === 1
        ? { type: "tool-listFolder", toolCallId: "call_sim", state: "input-available", input: { path: "Desktop Folder" } }
        : {
            type: "tool-listFolder",
            toolCallId: "call_sim",
            state: "output-available",
            input: { path: "Desktop Folder" },
            output: { items: ["Read Me", "Budget 1999.xls", "Photos", "untitled folder", "untitled folder 2"], count: 5 },
          }
  return [part, () => setRun((r) => r + 1)]
}

export default function ToolCallPage() {
  const [simulated, replay] = useSimulatedCall()
  const [picked, setPicked] = React.useState<string | null>(null)

  return (
    <ComponentDocLayout
      name="retro-tool-call"
      title="RetroToolCall"
      description="A Mac OS 9 row for an AI tool call: status glyph, tool name and a disclosure triangle revealing its input and output. Takes the AI SDK's tool part as-is."
      usage={USAGE}
    >
      <section className="mb-8 max-w-[520px]">
        <h2 className="os9-heading text-[14px] mb-4">Live</h2>
        <div className="flex flex-col items-start gap-3">
          <RetroToolCall part={simulated} />
          <RetroButton size="sm" onClick={replay}>
            Run Again
          </RetroButton>
        </div>
        <p className="mt-3 text-os9-gray-700 text-[10px] leading-[1.5]">
          The barber pole runs under the row while the call works. When the result lands, the watch
          turns edge-on and comes back as the check, in two frames, like the disclosure triangle.
        </p>
      </section>

      <section className="mb-8 max-w-[520px]">
        <h2 className="os9-heading text-[14px] mb-4">States</h2>
        <div className="flex flex-col gap-2">
          {STATES.map(({ label, part }) => (
            <RetroToolCall key={label} part={part} defaultOpen={label === "Failed"} />
          ))}
        </div>
      </section>

      <section className="mb-8 max-w-[520px]">
        <h2 className="os9-heading text-[14px] mb-4">Group</h2>
        <p className="mb-3 text-os9-gray-700 text-[10px] leading-[1.5]">
          Consecutive calls stack with shared borders. A custom title and icon replace the prettified
          tool name.
        </p>
        <RetroToolCallGroup>
          <RetroToolCall
            part={{
              type: "tool-listFolder",
              toolCallId: "g1",
              state: "output-available",
              input: { path: "Desktop Folder" },
              output: { count: 23 },
            }}
            title="Looked in Desktop Folder"
            icon={<RetroIconFolder size="sm" />}
          />
          <RetroToolCall part={STATES[2].part} />
          <RetroToolCall
            part={{
              type: "dynamic-tool",
              toolName: "create_folder",
              toolCallId: "g3",
              state: "input-available",
              input: { name: "Old Stuff", in: "Macintosh HD" },
            }}
          />
        </RetroToolCallGroup>
      </section>

      <section className="mb-8 max-w-[520px]">
        <h2 className="os9-heading text-[14px] mb-4">Chips</h2>
        <RetroToolChips
          parts={STATES.map((s) => s.part)}
          onSelect={(part) => setPicked(part.toolCallId)}
        />
        <p className="mt-3 text-os9-gray-700 text-[10px] leading-[1.5]">
          {picked ? `Picked ${picked}.` : "Compact chips for dense layouts. Pass onSelect to make them buttons."}
        </p>
      </section>
    </ComponentDocLayout>
  )
}
