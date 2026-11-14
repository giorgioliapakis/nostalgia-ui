"use client"

import * as React from "react"

import type { RetroChatStatus, RetroFilePart } from "@/registry/new-york/lib/retro-ai"
import { RetroBevelButton } from "@/registry/new-york/ui/retro-bevel-button"
import { RetroIcon } from "@/registry/new-york/ui/retro-icons"
import { RetroModelPicker, type RetroModel } from "@/registry/new-york/ui/retro-model-picker"
import { RetroPromptInput } from "@/registry/new-york/ui/retro-prompt-input"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "A Mac OS 9 chat composer: an inset edit field that grows with its text, a default Send button that becomes Stop while a reply streams (⌘-period), and slots for attachments and a model picker."

const USAGE = `const { messages, sendMessage, status, stop } = useChat()

<RetroPromptInput
  status={status}
  onSubmit={(text) => sendMessage({ text })}
  onStop={stop}
  toolbar={<RetroModelPicker models={models} value={model} onValueChange={setModel} />}
/>`

const MODELS: RetroModel[] = [
  {
    id: "quick",
    name: "Quick",
    description: "Fast answers for everyday questions",
    icon: <RetroIcon name="happy-mac" size="sm" />,
  },
  {
    id: "thorough",
    name: "Thorough",
    description: "Thinks longer; better with files and plans",
    icon: <RetroIcon name="finder" size="sm" />,
  },
]

const SAMPLE_FILES: RetroFilePart[] = [
  { type: "file", mediaType: "text/plain", url: "/files/read-me.txt", filename: "Read Me.txt" },
  { type: "file", mediaType: "image/png", url: "/files/desktop.png", filename: "Desktop Picture.png" },
  {
    type: "file",
    mediaType: "application/pdf",
    url: "/files/invoice.pdf",
    filename: "Invoice March 2001 (final).pdf",
  },
]

/* A pretend assistant: "submitted" for a beat, then "streaming", then done. */
function useFakeReply() {
  const [status, setStatus] = React.useState<RetroChatStatus>("ready")
  const timers = React.useRef<number[]>([])
  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }
  React.useEffect(() => clear, [])
  const start = () => {
    clear()
    setStatus("submitted")
    timers.current.push(
      window.setTimeout(() => setStatus("streaming"), 700),
      window.setTimeout(() => setStatus("ready"), 4200)
    )
  }
  const stop = () => {
    clear()
    setStatus("ready")
  }
  return { status, start, stop }
}

function Transcript({ lines }: { lines: string[] }) {
  return (
    <div className="os9-inset mb-2 h-[88px] overflow-y-auto p-2 font-[family-name:var(--os9-font-sans)] text-[12px] leading-[1.5]">
      {lines.length === 0 ? (
        <p className="pt-6 text-center text-[10px] text-os9-gray-700">No messages yet.</p>
      ) : (
        lines.map((line, i) => (
          <p key={i} className={line.startsWith("·") ? "text-center text-[10px] text-os9-gray-700" : ""}>
            {line}
          </p>
        ))
      )}
    </div>
  )
}

function BasicExample() {
  const { status, start, stop } = useFakeReply()
  const [lines, setLines] = React.useState<string[]>([])
  return (
    <div className="max-w-[520px]">
      <Transcript lines={lines} />
      <RetroPromptInput
        status={status}
        placeholder="Ask about your Mac…"
        onSubmit={(text) => {
          setLines((l) => [...l, `You: ${text}`])
          start()
        }}
        onStop={() => {
          stop()
          setLines((l) => [...l, "· Stopped ·"])
        }}
      />
      <p className="mt-2 text-[10px] text-os9-gray-700">
        Status: <code className="font-mono">{status}</code>
      </p>
    </div>
  )
}

function ToolbarExample() {
  const { status, start, stop } = useFakeReply()
  const [draft, setDraft] = React.useState("Tidy my desktop: put the screenshots in one folder")
  const [model, setModel] = React.useState("quick")
  const [files, setFiles] = React.useState<RetroFilePart[]>(SAMPLE_FILES.slice(0, 1))
  const [lines, setLines] = React.useState<string[]>([])

  const attach = () => {
    const next = SAMPLE_FILES.find((f) => !files.some((g) => g.url === f.url))
    if (next) setFiles((fs) => [...fs, next])
  }

  return (
    <div className="max-w-[520px]">
      <Transcript lines={lines} />
      <RetroPromptInput
        value={draft}
        onValueChange={setDraft}
        status={status}
        attachments={files}
        onAttachmentRemove={(_, index) => setFiles((fs) => fs.filter((__, i) => i !== index))}
        onSubmit={(text) => {
          const names = files.map((f) => f.filename).join(", ")
          setLines((l) => [
            ...l,
            `You (${MODELS.find((m) => m.id === model)?.name}): ${text || "(no text)"}${names ? ` [${names}]` : ""}`,
          ])
          setFiles([])
          start()
        }}
        onStop={stop}
        toolbar={
          <>
            <RetroModelPicker models={MODELS} value={model} onValueChange={setModel} />
            <RetroBevelButton
              bevel="small"
              size="sm"
              aria-label="Attach a file"
              disabled={files.length === SAMPLE_FILES.length}
              onClick={attach}
              icon={<RetroIcon name="document" size="sm" />}
              className="h-[20px] min-h-[20px]"
            >
              Attach…
            </RetroBevelButton>
          </>
        }
      />
    </div>
  )
}

export default function PromptInputPage() {
  return (
    <ComponentDocLayout
      name="retro-prompt-input"
      title="RetroPromptInput"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic</h2>
        <BasicExample />
        <p className="mt-3 max-w-[520px] text-[10px] leading-[1.5] text-os9-gray-700">
          Return sends and Shift-Return starts a new line. Press Return and watch the Send
          button: it shows its pressed face for a beat before the message goes, as the Mac
          did for a dialog&apos;s default button. While the reply comes in, Send becomes Stop;
          ⌘-period or Escape presses it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Toolbar and Attachments</h2>
        <ToolbarExample />
        <p className="mt-3 max-w-[520px] text-[10px] leading-[1.5] text-os9-gray-700">
          <code className="font-mono">toolbar</code> holds leading controls such as a model
          picker or an attach button. <code className="font-mono">attachments</code> takes
          file parts and shows them as chips above the field; with files attached, an empty
          draft can still be sent. The field grows to eight lines, then scrolls.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <div className="max-w-[520px]">
          <RetroPromptInput disabled placeholder="Sign in to start a conversation" />
        </div>
      </section>
    </ComponentDocLayout>
  )
}
