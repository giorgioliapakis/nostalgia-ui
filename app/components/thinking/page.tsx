"use client"

import * as React from "react"

import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroReasoning, RetroThinking, RetroWatchIcon } from "@/registry/new-york/ui/retro-thinking"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const USAGE = `import { RetroThinking, RetroReasoning } from "@/components/ui/retro-thinking"

// after Send, before the first token
{status === "submitted" && <RetroThinking />}

// a reasoning part: opens while streaming, closes when the answer starts
<RetroReasoning part={part} />`

const REASONING =
  "They want to free up space before installing Mac OS 9.2. The System Folder is 410 MB, mostly Extensions and old Fonts. Disabled extensions in Extensions (Disabled) can go, and so can the printer drivers for printers they don't have. I shouldn't touch anything Apple installs as part of the base system."

function useFakeReasoning() {
  const [text, setText] = React.useState("")
  const [streaming, setStreaming] = React.useState(false)
  const run = React.useRef(0)
  React.useEffect(() => () => void (run.current += 1), [])

  const start = async () => {
    const id = ++run.current
    setText("")
    setStreaming(true)
    let i = 0
    while (i < REASONING.length) {
      await new Promise((r) => setTimeout(r, 60 + Math.random() * 180))
      if (run.current !== id) return
      i = Math.min(REASONING.length, i + 4 + Math.round(Math.random() * 18))
      setText(REASONING.slice(0, i))
    }
    setStreaming(false)
  }
  return { text, streaming, start }
}

export default function ThinkingPage() {
  const [pending, setPending] = React.useState(true)
  const reasoning = useFakeReasoning()

  return (
    <ComponentDocLayout
      name="retro-thinking"
      title="RetroThinking"
      description="Mac OS 9 AI thinking states: the watch cursor and a barber pole while a reply is pending, and a collapsible reasoning panel."
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading mb-4 text-[14px]">Thinking</h2>
        <div className="os9-inset flex min-h-[48px] max-w-[480px] items-center bg-os9-white p-3">
          {pending ? <RetroThinking /> : null}
        </div>
        <div className="mt-2 flex gap-2">
          <RetroButton size="sm" onClick={() => setPending((p) => !p)}>
            {pending ? "Stop" : "Start"}
          </RetroButton>
        </div>
        <p className="mt-2 max-w-[480px] text-[9px] text-os9-gray-700">
          Shown between Send and the first token. After three seconds it counts the wait. The
          watch sits in the same 16px column as the assistant&apos;s icon in RetroMessage.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading mb-4 text-[14px]">Watch Icon</h2>
        <div className="flex items-center gap-4">
          <RetroWatchIcon />
          <RetroWatchIcon size={12} />
          <RetroWatchIcon running={false} />
        </div>
        <p className="mt-2 max-w-[480px] text-[9px] text-os9-gray-700">
          The OS 9 busy cursor at 16 and 12 pixels, and stopped. Classic flair ticks the hands
          in eight steps.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading mb-4 text-[14px]">Reasoning</h2>
        <div className="os9-inset flex min-h-[64px] max-w-[480px] flex-col gap-2 bg-os9-white p-3 font-[family-name:var(--os9-font-sans)] text-[12px]">
          {reasoning.text || reasoning.streaming ? (
            <RetroReasoning key="live" text={reasoning.text} streaming={reasoning.streaming} />
          ) : (
            <span className="text-os9-gray-700">Press Think to stream some reasoning.</span>
          )}
        </div>
        <div className="mt-2 flex gap-2">
          <RetroButton size="sm" disabled={reasoning.streaming} onClick={reasoning.start}>
            Think
          </RetroButton>
        </div>
        <p className="mt-2 max-w-[480px] text-[9px] text-os9-gray-700">
          Opens itself while the model thinks and closes when it&apos;s done. Open or close it
          yourself and it leaves your choice alone.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading mb-4 text-[14px]">Finished</h2>
        <div className="os9-inset max-w-[480px] bg-os9-white p-3 font-[family-name:var(--os9-font-sans)] text-[12px]">
          <RetroReasoning
            duration={4}
            text="The printer is a StyleWriter II on the modem port. AppleTalk should be off for that port, and the StyleWriter driver needs to be chosen in the Chooser."
          />
        </div>
      </section>
    </ComponentDocLayout>
  )
}
