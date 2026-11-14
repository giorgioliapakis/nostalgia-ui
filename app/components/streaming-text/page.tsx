"use client"

import * as React from "react"

import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroStreamingText } from "@/registry/new-york/ui/retro-streaming-text"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const USAGE = `import { RetroStreamingText } from "@/components/ui/retro-streaming-text"

// text grows as deltas arrive; streaming stays true until the stream ends
<RetroStreamingText text={text} streaming={status === "streaming"} />`

const REPLY =
  "Sure. Open the Apple menu, choose Control Panels, then Memory. Turn Virtual Memory on and set it to 64 MB more than your built-in memory. You'll need to restart for the change to take effect, so save your work first.\n\nIf Photoshop still says there isn't enough memory, select its icon, choose Get Info from the File menu, and raise the Preferred Size."

/** Feeds the text in lumpy network-sized pieces, with the odd stall. */
function useFakeStream(full: string) {
  const [text, setText] = React.useState("")
  const [streaming, setStreaming] = React.useState(false)
  const run = React.useRef(0)

  React.useEffect(() => () => void (run.current += 1), [])

  const start = async () => {
    const id = ++run.current
    setText("")
    setStreaming(true)
    let i = 0
    await new Promise((r) => setTimeout(r, 500))
    while (i < full.length) {
      const stall = Math.random() < 0.08
      await new Promise((r) => setTimeout(r, stall ? 900 : 40 + Math.random() * 220))
      if (run.current !== id) return
      i = Math.min(full.length, i + 3 + Math.round(Math.random() * 30))
      setText(full.slice(0, i))
    }
    setStreaming(false)
  }

  const stop = () => {
    run.current += 1
    setStreaming(false)
  }

  return { text, streaming, start, stop }
}

export default function StreamingTextPage() {
  const demo = useFakeStream(REPLY)

  return (
    <ComponentDocLayout
      name="retro-streaming-text"
      title="RetroStreamingText"
      description="Text that arrives behind a blinking Mac OS 9 insertion caret, for streamed AI replies."
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading mb-4 text-[14px]">Streaming</h2>
        <div className="os9-inset min-h-[120px] max-w-[480px] bg-os9-white p-3 font-[family-name:var(--os9-font-sans)] text-[12px] leading-[1.5]">
          {demo.text || demo.streaming ? (
            <RetroStreamingText text={demo.text} streaming={demo.streaming} />
          ) : (
            <span className="text-os9-gray-700">Press Stream to start a reply.</span>
          )}
        </div>
        <div className="mt-2 flex gap-2">
          <RetroButton size="sm" onClick={demo.start}>
            Stream
          </RetroButton>
          <RetroButton size="sm" disabled={!demo.streaming} onClick={demo.stop}>
            Stop
          </RetroButton>
        </div>
        <p className="mt-2 max-w-[480px] text-[9px] text-os9-gray-700">
          The network delivers text in lumps; the reveal paces them into steady typing and never
          falls more than about half a second behind. The caret stays solid while text arrives,
          blinks when the stream stalls, and fades away when the reply is done. Classic flair and
          reduced motion show each piece the moment it lands.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading mb-4 text-[14px]">Already Complete</h2>
        <div className="os9-inset max-w-[480px] bg-os9-white p-3 font-[family-name:var(--os9-font-sans)] text-[12px] leading-[1.5]">
          <RetroStreamingText text="Text that was finished when it mounted shows at once, with no caret." />
        </div>
      </section>
    </ComponentDocLayout>
  )
}
