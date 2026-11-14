"use client"

import * as React from "react"

import type { RetroChatMessage } from "@/registry/new-york/lib/retro-ai"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import {
  RetroMessage,
  RetroMessageActions,
  RetroMessageContent,
  RetroMessageThread,
} from "@/registry/new-york/ui/retro-message"
import { RetroThinking } from "@/registry/new-york/ui/retro-thinking"
import { ComponentDocLayout } from "../_components/component-doc-layout"
import { useRetroChatSimulator } from "../_components/use-retro-chat-simulator"

const USAGE = `import {
  RetroMessageThread,
  RetroMessage,
  RetroMessageActions,
} from "@/components/ui/retro-message"
import { RetroThinking } from "@/components/ui/retro-thinking"
import { RetroToolCall } from "@/components/ui/retro-tool-call"

const { messages, status, regenerate } = useChat()

<RetroMessageThread streaming={status === "streaming"} className="h-[480px]">
  {messages.map((message, i) => {
    const live = i === messages.length - 1 && status === "streaming"
    return (
      <RetroMessage
        key={message.id}
        message={message}
        streaming={live}
        renderTool={(part) => <RetroToolCall part={part} />}
      >
        {message.role === "assistant" && !live && (
          <RetroMessageActions message={message} onRetry={() => regenerate()} />
        )}
      </RetroMessage>
    )
  })}
  {status === "submitted" && <RetroThinking />}
</RetroMessageThread>`

const HISTORY: RetroChatMessage[] = [
  {
    id: "m1",
    role: "user",
    parts: [{ type: "text", text: "My desktop is a mess. Can you tidy it up?" }],
  },
  {
    id: "m2",
    role: "assistant",
    parts: [
      {
        type: "reasoning",
        text: "There are 31 items on the desktop. Screen shots and installers can go into folders; anything opened this week should stay where it is.",
        state: "done",
      },
      {
        type: "tool-searchFiles",
        toolCallId: "call-1",
        state: "output-available",
        input: { folder: "Desktop" },
        output: { count: 31 },
      },
      {
        type: "tool-moveItems",
        toolCallId: "call-2",
        state: "output-available",
        input: { into: "Old Stuff", count: 12 },
      },
      {
        type: "text",
        text: "Done. I moved 12 things you haven't opened since spring into a folder called `Old Stuff`, and left the 6 you used this week where they were.\n\nIf you'd like this to happen every Friday, save this as a script in AppleScript:\n\n```applescript\ntell application \"Finder\"\n  move (every file of desktop whose modification date < ((current date) - 30 * days)) to folder \"Old Stuff\" of desktop\nend tell\n```",
        state: "done",
      },
    ],
  },
]

const REPLIES: Record<string, { reasoning?: string; text: string }> = {
  readme: {
    reasoning:
      "A Read Me for a shareware game should open with what it is, then what it needs, then how to install it. Keep it short; people read these in SimpleText.",
    text: "Here's a start for your Read Me:\n\nBugdom Demo 1.0.2\nA bug's-eye adventure for PowerPC Macs.\n\nYou'll need Mac OS 8.6 or later, 32 MB of free memory and a 3D card. Drag the `Bugdom Demo` folder to your hard disk, then double-click the game to play.\n\nWant me to add a section on keyboard controls?",
  },
  files: {
    text: "The three biggest files on Macintosh HD are:\n\n```\nQuickTime Movies/Riven Intro.mov    412 MB\nDownloads/Netscape Installer          88 MB\nDocuments/Family Photos.sit           61 MB\n```\n\nThe installer is safe to throw away once Netscape is installed. Shall I put it in the Trash?",
  },
}

function LiveDemo() {
  const { messages, status, send, stop, retry, reset } = useRetroChatSimulator({
    initialMessages: HISTORY,
    reply: (prompt) => (prompt.includes("Read Me") ? REPLIES.readme : REPLIES.files),
  })
  const busy = status === "submitted" || status === "streaming"

  /* ⌘-period and Escape stop a reply, as Cancel did */
  React.useEffect(() => {
    if (!busy) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.metaKey && e.key === ".")) {
        e.preventDefault()
        stop()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [busy, stop])

  return (
    <div className="flex max-w-[560px] flex-col gap-2">
      <RetroMessageThread streaming={status === "streaming"} className="h-[420px]">
        {messages.map((message, i) => {
          const last = i === messages.length - 1
          const live = last && message.role === "assistant" && status === "streaming"
          return (
            <RetroMessage key={message.id} message={message} streaming={live}>
              {message.role === "assistant" && !live ? (
                <RetroMessageActions message={message} onRetry={last ? retry : undefined} />
              ) : null}
            </RetroMessage>
          )
        })}
        {status === "submitted" ? <RetroThinking /> : null}
      </RetroMessageThread>
      <div className="flex flex-wrap items-center gap-2">
        <RetroButton size="sm" disabled={busy} onClick={() => send("Write a Read Me for my Bugdom demo.")}>
          Ask for a Read Me
        </RetroButton>
        <RetroButton size="sm" disabled={busy} onClick={() => send("What are the biggest files on my hard disk?")}>
          Ask about big files
        </RetroButton>
        <RetroButton size="sm" disabled={!busy} onClick={stop}>
          Stop
        </RetroButton>
        <RetroButton size="sm" variant="secondary" onClick={reset}>
          Reset
        </RetroButton>
      </div>
    </div>
  )
}

export default function MessagePage() {
  return (
    <ComponentDocLayout
      name="retro-message"
      title="RetroMessage"
      description="Mac OS 9 chat transcript parts: a scrolling message thread, user and assistant messages built from AI SDK-style parts, and copy/retry actions."
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading mb-4 text-[14px]">Conversation</h2>
        <LiveDemo />
        <p className="mt-2 max-w-[560px] text-[9px] text-os9-gray-700">
          Ask something and the reply types in behind the insertion caret. Scroll up while it
          streams and the thread lets go; a New messages button brings you back. ⌘-period or
          Escape stops it. Hover a reply for Copy and Try Again.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading mb-4 text-[14px]">Custom Content</h2>
        <div className="os9-inset flex max-w-[560px] flex-col gap-4 bg-os9-white p-3">
          <RetroMessage from="system">
            <RetroMessageContent>Today, 9:41 AM</RetroMessageContent>
          </RetroMessage>
          <RetroMessage from="user">
            <RetroMessageContent>Is there room on my Zip disk for the photos?</RetroMessageContent>
          </RetroMessage>
          <RetroMessage from="assistant">
            <RetroMessageContent>
              <p>
                Yes. The Zip disk has 61 MB free and the photos come to 48 MB, so you&apos;ll
                have 13 MB to spare.
              </p>
            </RetroMessageContent>
            <RetroMessageActions text="Yes. The Zip disk has 61 MB free and the photos come to 48 MB." alwaysVisible />
          </RetroMessage>
        </div>
      </section>
    </ComponentDocLayout>
  )
}
