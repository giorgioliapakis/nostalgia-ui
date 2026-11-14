"use client"

/*
 * AI Chat: a Mac OS 9 chat window for an AI assistant.
 *
 * Drive it from the Vercel AI SDK's useChat (pass `messages`, `status`,
 * `onSubmit`, `onStop`, `onToolApproval`), or leave `messages` out and it runs
 * a scripted demo assistant with no backend, including a tool call that asks
 * for approval.
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  isToolPart,
  type RetroChatMessage,
  type RetroChatStatus,
  type RetroMessagePart,
  type RetroToolPart,
} from "@/registry/new-york/lib/retro-ai"
import { RetroApproval } from "@/registry/new-york/ui/retro-approval"
import {
  RetroAssistantIcon,
  RetroMessage,
  RetroMessageActions,
  RetroMessageThread,
} from "@/registry/new-york/ui/retro-message"
import { RetroModelPicker, type RetroModel } from "@/registry/new-york/ui/retro-model-picker"
import { RetroPromptInput } from "@/registry/new-york/ui/retro-prompt-input"
import { RetroSuggestedPrompts } from "@/registry/new-york/ui/retro-suggested-prompts"
import { RetroThinking } from "@/registry/new-york/ui/retro-thinking"
import { RetroToolCall } from "@/registry/new-york/ui/retro-tool-call"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"

/* ------------------------------------------------------------------ */
/*  Demo conversation: a scripted assistant, so the block works with   */
/*  no backend. Pass `messages` to drive the block from useChat.      */
/* ------------------------------------------------------------------ */

type Step =
  | { kind: "pause"; ms: number }
  | { kind: "reasoning"; text: string }
  | { kind: "text"; text: string }
  | { kind: "tool"; name: string; input: unknown; output: unknown; ms?: number }
  | {
      kind: "approval"
      name: string
      input: unknown
      output: unknown
      approved: Step[]
      denied: Step[]
    }

interface Script {
  match: RegExp
  steps: Step[]
}

const DEMO_SCRIPTS: Script[] = [
  {
    match: /tidy|clean|desktop|organi[sz]e/i,
    steps: [
      { kind: "pause", ms: 700 },
      {
        kind: "reasoning",
        text: "The desktop has loose files. I should look at what's there first, group them by kind, and ask before moving anything.",
      },
      {
        kind: "tool",
        name: "listFolder",
        input: { path: "Macintosh HD:Desktop Folder" },
        output: {
          items: 14,
          kinds: { "SimpleText document": 6, "JPEG image": 5, "StuffIt archive": 3 },
        },
        ms: 1100,
      },
      {
        kind: "approval",
        name: "moveFiles",
        input: {
          moves: [
            { kind: "SimpleText document", to: "Documents" },
            { kind: "JPEG image", to: "Pictures" },
            { kind: "StuffIt archive", to: "Downloads" },
          ],
        },
        output: { moved: 14, skipped: 0 },
        approved: [
          { kind: "pause", ms: 300 },
          {
            kind: "text",
            text: "Done. I moved 14 items:\n\n• 6 documents to **Documents**\n• 5 pictures to **Pictures**\n• 3 archives to **Downloads**\n\nYour desktop now just has the hard disk and the Trash. Want me to empty the Trash too?",
          },
        ],
        denied: [
          { kind: "pause", ms: 300 },
          { kind: "text", text: "No problem, I left everything where it was. I can suggest folders instead if you'd rather sort them yourself." },
        ],
      },
    ],
  },
  {
    match: /read ?me|write/i,
    steps: [
      { kind: "pause", ms: 600 },
      {
        kind: "text",
        text: "Here's a short Read Me you can paste into SimpleText:\n\n```\nREAD ME — Kaleidoscope Schemes\n\n1. Drag the schemes onto the Kaleidoscope folder.\n2. Restart your Macintosh.\n3. Choose a scheme in the Kaleidoscope control panel.\n```\n\nKeep it under 32K so SimpleText can open it.",
      },
    ],
  },
  {
    match: /slow|memory|ram|speed/i,
    steps: [
      { kind: "pause", ms: 800 },
      {
        kind: "reasoning",
        text: "Slowness on OS 9 is usually memory: apps get a fixed partition. Check what's running and how much is free.",
      },
      {
        kind: "tool",
        name: "getMemoryUsage",
        input: {},
        output: {
          builtIn: "128 MB",
          virtualMemory: "off",
          largestUnusedBlock: "9.8 MB",
          apps: [
            { name: "Mac OS", used: "41.2 MB" },
            { name: "Netscape Communicator", used: "48.0 MB" },
            { name: "Photoshop", used: "28.5 MB" },
          ],
        },
        ms: 900,
      },
      {
        kind: "text",
        text: "Your Mac has only 9.8 MB free. Two things will help:\n\n• **Quit Netscape** when you're not using it. It's holding 48 MB.\n• **Turn on Virtual Memory** in the Memory control panel, then restart.\n\nPhotoshop will feel faster straight away.",
      },
    ],
  },
]

const DEMO_FALLBACK: Step[] = [
  { kind: "pause", ms: 600 },
  {
    kind: "text",
    text: "I'm a demo assistant, so I only know a few tricks. Try asking me to **tidy your desktop**, **write a Read Me**, or **why your Mac is slow**.",
  },
]

let demoId = 0
const nextId = (p: string) => `${p}-${++demoId}`

function useDemoChat() {
  const [messages, setMessages] = React.useState<RetroChatMessage[]>([])
  const [status, setStatus] = React.useState<RetroChatStatus>("ready")
  const run = React.useRef(0)
  const pendingApproval = React.useRef<((approved: boolean) => void) | null>(null)

  /* edit the last assistant message */
  const patchLast = React.useCallback((fn: (parts: RetroMessagePart[]) => RetroMessagePart[]) => {
    setMessages((all) => {
      const last = all[all.length - 1]
      if (!last || last.role !== "assistant") return all
      return [...all.slice(0, -1), { ...last, parts: fn(last.parts) }]
    })
  }, [])

  const stop = React.useCallback(() => {
    run.current++
    pendingApproval.current = null
    patchLast((parts) =>
      parts.map((p) => {
        if ((p.type === "text" || p.type === "reasoning") && p.state === "streaming") return { ...p, state: "done" }
        /* a tool cut off mid-run reports that it was stopped */
        if (isToolPart(p) && (p.state === "input-streaming" || p.state === "input-available"))
          return { ...p, state: "output-error", errorText: "Stopped." }
        return p
      })
    )
    setStatus("ready")
  }, [patchLast])

  const play = React.useCallback(
    async (steps: Step[], id: number) => {
      const alive = () => run.current === id
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

      /* stream text into a new part in uneven chunks, like a network would */
      const stream = async (type: "text" | "reasoning", text: string) => {
        patchLast((parts) => [...parts, { type, text: "", state: "streaming" }])
        setStatus("streaming")
        let i = 0
        while (i < text.length) {
          if (!alive()) return
          i = Math.min(text.length, i + 3 + Math.floor(Math.random() * 14))
          const slice = text.slice(0, i)
          patchLast((parts) => {
            const copy = [...parts]
            copy[copy.length - 1] = { type, text: slice, state: "streaming" }
            return copy
          })
          await sleep(45 + Math.random() * 70)
        }
        patchLast((parts) => {
          const copy = [...parts]
          copy[copy.length - 1] = { type, text, state: "done" }
          return copy
        })
      }

      const setTool = (toolCallId: string, patch: Partial<RetroToolPart>) =>
        patchLast((parts) => parts.map((p) => (isToolPart(p) && p.toolCallId === toolCallId ? { ...p, ...patch } : p)))

      const queue = [...steps]
      while (queue.length) {
        const step = queue.shift()!
        if (!alive()) return
        if (step.kind === "pause") await sleep(step.ms)
        else if (step.kind === "text" || step.kind === "reasoning") await stream(step.kind, step.text)
        else if (step.kind === "tool") {
          const toolCallId = nextId("call")
          patchLast((parts) => [
            ...parts,
            { type: `tool-${step.name}`, toolCallId, state: "input-available", input: step.input },
          ])
          setStatus("streaming")
          await sleep(step.ms ?? 900)
          if (!alive()) return
          setTool(toolCallId, { state: "output-available", output: step.output })
          await sleep(250)
        } else if (step.kind === "approval") {
          const toolCallId = nextId("call")
          const approvalId = nextId("approval")
          patchLast((parts) => [
            ...parts,
            {
              type: `tool-${step.name}`,
              toolCallId,
              state: "approval-requested",
              input: step.input,
              approval: { id: approvalId },
            },
          ])
          setStatus("ready")
          const approved = await new Promise<boolean>((resolve) => {
            pendingApproval.current = resolve
          })
          if (!alive()) return
          setStatus("streaming")
          if (approved) {
            setTool(toolCallId, { state: "input-available", approval: { id: approvalId, approved: true } })
            await sleep(1000)
            if (!alive()) return
            setTool(toolCallId, { state: "output-available", output: step.output })
            queue.unshift(...step.approved)
          } else {
            setTool(toolCallId, { state: "output-denied", approval: { id: approvalId, approved: false } })
            queue.unshift(...step.denied)
          }
        }
      }
    },
    [patchLast]
  )

  const submit = React.useCallback(
    async (text: string) => {
      const id = ++run.current
      pendingApproval.current = null
      setMessages((all) => [
        ...all,
        { id: nextId("user"), role: "user", parts: [{ type: "text", text }] },
        { id: nextId("assistant"), role: "assistant", parts: [] },
      ])
      setStatus("submitted")
      const script = DEMO_SCRIPTS.find((s) => s.match.test(text))?.steps ?? DEMO_FALLBACK
      await play(script, id)
      if (run.current === id && !pendingApproval.current) setStatus("ready")
    },
    [play]
  )

  const respond = React.useCallback((approved: boolean) => {
    const resolve = pendingApproval.current
    pendingApproval.current = null
    resolve?.(approved)
  }, [])

  return { messages, status, submit, stop, respond }
}

/* ------------------------------------------------------------------ */
/*  Block                                                              */
/* ------------------------------------------------------------------ */

const DEFAULT_MODELS: RetroModel[] = [
  { id: "quick", name: "Quick", description: "Fast answers for everyday questions" },
  { id: "thorough", name: "Thorough", description: "Thinks longer, uses tools" },
]

const DEFAULT_SUGGESTIONS = ["Tidy my desktop", "Write a Read Me", "Why is my Mac slow?"]

/* what an approval card says for a tool, in plain words */
function approvalCopy(part: RetroToolPart) {
  const input = (part.input ?? {}) as { moves?: { kind: string; to: string }[] }
  if (input.moves) {
    return {
      title: "Allow the assistant to move files on your desktop?",
      description: "Items will be moved into folders in your home folder. You can move them back at any time.",
      details: input.moves.map((m) => `${m.kind}s → ${m.to}`),
    }
  }
  return {}
}

interface ToolProps {
  part: RetroToolPart
  onToolApproval?: (part: RetroToolPart, approved: boolean, always: boolean) => void
}

function ToolWithApproval({ part, onToolApproval }: ToolProps) {
  const rowRef = React.useRef<HTMLDivElement>(null)
  const asked = part.approval !== undefined
  return (
    <div className="my-[3px] flex flex-col gap-[6px]">
      <RetroToolCall ref={rowRef} part={part} />
      {asked && (
        <RetroApproval
          part={part}
          anchorRef={rowRef}
          {...approvalCopy(part)}
          onApprove={(always) => onToolApproval?.(part, true, always)}
          onDeny={() => onToolApproval?.(part, false, false)}
        />
      )}
    </div>
  )
}

interface AiChatBlockProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RetroWindow>, "title" | "children" | "onSubmit"> {
  /** Window title. Defaults to "Assistant". */
  title?: string
  /** Messages to show, e.g. from useChat. Leave out to run the built-in demo. */
  messages?: RetroChatMessage[]
  /** Chat status, e.g. from useChat. */
  status?: RetroChatStatus
  /** Runs with the composer's text when the user sends. */
  onSubmit?: (text: string) => void
  /** Stops the current reply (Stop button, ⌘-period, Escape). */
  onStop?: () => void
  /** Runs when the user answers a tool approval. */
  onToolApproval?: (part: RetroToolPart, approved: boolean, always: boolean) => void
  /** Runs when the user asks to regenerate the last reply. */
  onRetry?: () => void
  /** Models for the picker. Pass an empty array to hide it. */
  models?: RetroModel[]
  model?: string
  onModelChange?: (id: string) => void
  /** Starter prompts shown while the conversation is empty. */
  suggestions?: string[]
}

function AiChatBlock({
  title = "Assistant",
  messages: messagesProp,
  status: statusProp,
  onSubmit,
  onStop,
  onToolApproval,
  onRetry,
  models = DEFAULT_MODELS,
  model,
  onModelChange,
  suggestions = DEFAULT_SUGGESTIONS,
  className,
  ...props
}: AiChatBlockProps) {
  const demo = useDemoChat()
  const isDemo = messagesProp === undefined
  const messages = isDemo ? demo.messages : messagesProp
  const status = isDemo ? demo.status : (statusProp ?? "ready")

  const [draft, setDraft] = React.useState("")
  const [modelId, setModelId] = React.useState(model ?? models[0]?.id ?? "")
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const send = (text: string) => (isDemo ? demo.submit(text) : onSubmit?.(text))
  const stop = () => (isDemo ? demo.stop() : onStop?.())
  const answer = (part: RetroToolPart, approved: boolean, always: boolean) => {
    if (isDemo) demo.respond(approved)
    else onToolApproval?.(part, approved, always)
    inputRef.current?.focus()
  }

  const busy = status === "submitted" || status === "streaming"
  const last = messages[messages.length - 1]
  /* "submitted": the reply hasn't produced anything yet */
  const thinking = busy && (!last || last.role !== "assistant" || last.parts.length === 0)

  return (
    <RetroWindow title={title} active className={cn("w-full max-w-[560px]", className)} {...props}>
      <div className="flex h-[520px] flex-col gap-[8px]">
        <RetroMessageThread streaming={busy} className="min-h-0 flex-1">
          {messages.length === 0 ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-[10px] px-4 text-center">
              <RetroAssistantIcon className="size-[32px]" />
              <p className="font-[family-name:var(--os9-font-heading)] text-[12px] text-os9-black">How can I help?</p>
              <RetroSuggestedPrompts
                className="justify-center"
                suggestions={suggestions}
                onSelect={(prompt) => send(prompt)}
              />
            </div>
          ) : (
            messages.map((message, i) => {
              const isLast = i === messages.length - 1
              const streamingThis = isLast && message.role === "assistant" && status === "streaming"
              const finished = message.role === "assistant" && !(isLast && busy) && message.parts.length > 0
              if (message.role === "assistant" && message.parts.length === 0) return null
              return (
                <RetroMessage
                  key={message.id}
                  message={message}
                  streaming={streamingThis}
                  renderTool={(part) => <ToolWithApproval part={part} onToolApproval={answer} />}
                >
                  {finished && hasText(message.parts) && (
                    <RetroMessageActions message={message} onRetry={isLast && onRetry ? onRetry : undefined} />
                  )}
                </RetroMessage>
              )
            })
          )}
          {thinking && <RetroThinking />}
        </RetroMessageThread>

        <RetroPromptInput
          inputRef={inputRef}
          value={draft}
          onValueChange={setDraft}
          onSubmit={send}
          onStop={stop}
          status={status}
          placeholder="Ask anything…"
          toolbar={
            models.length > 0 ? (
              <RetroModelPicker
                models={models}
                value={model ?? modelId}
                onValueChange={(id) => {
                  setModelId(id)
                  onModelChange?.(id)
                }}
              />
            ) : undefined
          }
        />
      </div>
    </RetroWindow>
  )
}

function hasText(parts: RetroMessagePart[]) {
  return parts.some((p) => p.type === "text" && p.text.length > 0)
}

export { AiChatBlock }
export type { AiChatBlockProps }
