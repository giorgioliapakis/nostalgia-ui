"use client"

import * as React from "react"

import type { RetroToolPart } from "@/registry/new-york/lib/retro-ai"
import { RetroApproval, RetroApprovalDialog } from "@/registry/new-york/ui/retro-approval"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroToolCall } from "@/registry/new-york/ui/retro-tool-call"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const USAGE = `import { RetroApproval } from "@/components/ui/retro-approval"

// a tool part in state "approval-requested", from useChat
<RetroApproval
  part={part}
  title="Allow the assistant to move 12 files?"
  description="They'll go from the Desktop into “Old Stuff”."
  details={["Read Me → Old Stuff", "Budget 1999.xls → Old Stuff"]}
  anchorRef={toolRowRef}
  onApprove={(always) =>
    addToolApprovalResponse({ id: part.approval.id, approved: true })
  }
  onDeny={() => addToolApprovalResponse({ id: part.approval.id, approved: false })}
/>`

const FILES = [
  "Read Me → Old Stuff",
  "Budget 1999.xls → Old Stuff",
  "Photos → Old Stuff",
  "untitled folder → Old Stuff",
  "untitled folder 2 → Old Stuff",
  "Netscape Installer → Old Stuff",
  "SimpleText copy → Old Stuff",
  "Screen Shot 1 → Old Stuff",
  "Screen Shot 2 → Old Stuff",
  "Screen Shot 3 → Old Stuff",
  "Picture 1 → Old Stuff",
  "Bugdom Demo → Old Stuff",
]

const REQUEST: RetroToolPart = {
  type: "tool-moveFiles",
  toolCallId: "call_move",
  state: "approval-requested",
  input: { from: "Desktop Folder", to: "Old Stuff", files: 12 },
  approval: { id: "ap_move" },
}

/** The whole flow: the row asks, the card answers, the call runs. */
function InlineDemo() {
  const [part, setPart] = React.useState<RetroToolPart>(REQUEST)
  const [run, setRun] = React.useState(0)
  const [last, setLast] = React.useState<string>("")
  const rowRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (part.state !== "approval-responded" || !part.approval?.approved) return
    const t = window.setTimeout(
      () => setPart((p) => ({ ...p, state: "output-available", output: { moved: 12, to: "Macintosh HD:Old Stuff" } })),
      1800
    )
    return () => window.clearTimeout(t)
  }, [part])

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="os9-inset flex w-full flex-col gap-2 p-3">
        <p className="m-0 font-[family-name:var(--os9-font-sans)] text-[12px] leading-[1.5]">
          I&apos;ll move the 12 loose files on your Desktop into a folder called “Old Stuff”.
        </p>
        <RetroToolCall ref={rowRef} part={part} />
        <RetroApproval
          key={run}
          part={part}
          anchorRef={rowRef}
          title="Allow the assistant to move 12 files?"
          description="They'll go from the Desktop into “Old Stuff”. You can move them back at any time."
          details={FILES}
          onApprove={(always) => {
            setLast(always ? "onApprove(true)" : "onApprove(false)")
            setPart((p) => ({ ...p, state: "approval-responded", approval: { id: "ap_move", approved: true } }))
          }}
          onDeny={() => {
            setLast("onDeny()")
            setPart((p) => ({ ...p, state: "output-denied", approval: { id: "ap_move", approved: false } }))
          }}
        />
      </div>
      <div className="flex items-center gap-3">
        <RetroButton
          size="sm"
          onClick={() => {
            setPart(REQUEST)
            setLast("")
            setRun((r) => r + 1)
          }}
        >
          Ask Again
        </RetroButton>
        <span className="font-[family-name:var(--os9-font-mono)] text-[10px] text-os9-gray-700">{last}</span>
      </div>
    </div>
  )
}

function DialogDemo() {
  const [open, setOpen] = React.useState(false)
  const [last, setLast] = React.useState("")
  return (
    <div className="flex items-center gap-3">
      <RetroButton onClick={() => setOpen(true)}>Empty the Trash…</RetroButton>
      <RetroApprovalDialog
        open={open}
        onOpenChange={setOpen}
        title="Allow the assistant to empty the Trash?"
        description="The Trash contains 48 items, using 112.4 MB of disk space. This can't be undone."
        onApprove={(always) => setLast(always ? "onApprove(true)" : "onApprove(false)")}
        onDeny={() => setLast("onDeny()")}
      />
      <span className="font-[family-name:var(--os9-font-mono)] text-[10px] text-os9-gray-700">{last}</span>
    </div>
  )
}

export default function ApprovalPage() {
  return (
    <ComponentDocLayout
      name="retro-approval"
      title="RetroApproval"
      description="A Mac OS 9 caution alert in the transcript that asks before an AI tool runs. Hold Option for Always Allow; once answered it collapses to a one-line receipt."
      usage={USAGE}
    >
      <section className="mb-8 max-w-[520px]">
        <h2 className="os9-heading text-[14px] mb-4">In the Transcript</h2>
        <InlineDemo />
        <p className="mt-3 text-os9-gray-700 text-[10px] leading-[1.5]">
          The alert grows out of the tool row that asked, as a trail of zoom rects. It takes focus:
          Return allows, Escape doesn&apos;t, and holding Option turns Allow into Always Allow.
        </p>
      </section>

      <section className="mb-8 max-w-[520px]">
        <h2 className="os9-heading text-[14px] mb-4">Answered</h2>
        <div className="flex flex-col gap-2">
          <RetroApproval
            status="allowed"
            title="Allow the assistant to rename “untitled folder”?"
            onApprove={() => {}}
            onDeny={() => {}}
          />
          <RetroApproval
            status="denied"
            title="Allow the assistant to erase “Zip 100”?"
            onApprove={() => {}}
            onDeny={() => {}}
          />
        </div>
      </section>

      <section className="mb-8 max-w-[520px]">
        <h2 className="os9-heading text-[14px] mb-4">As a Modal</h2>
        <p className="mb-3 text-os9-gray-700 text-[10px] leading-[1.5]">
          RetroApprovalDialog asks the same question as a blocking alert, for apps that must stop
          until it&apos;s answered.
        </p>
        <DialogDemo />
      </section>
    </ComponentDocLayout>
  )
}
