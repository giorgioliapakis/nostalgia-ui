"use client"

/*
 * Docs-only: fakes a streaming assistant so the AI component pages can show
 * real timing (a pause before the first token, lumpy network deltas, the odd
 * stall) without a model. Not part of the registry.
 */

import * as React from "react"

import type {
  RetroChatMessage,
  RetroChatStatus,
  RetroMessagePart,
} from "@/registry/new-york/lib/retro-ai"

export interface SimulatedReply {
  reasoning?: string
  text: string
}

interface Options {
  initialMessages?: RetroChatMessage[]
  /** What the assistant says to a prompt. */
  reply: (prompt: string) => SimulatedReply
  /** Pause between Send and the first token, ms. */
  thinkMs?: number
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const between = (a: number, b: number) => a + Math.random() * (b - a)

/** Lumpy chunks, like a network stream: 2–28 characters at a time. */
function chunk(text: string) {
  const out: string[] = []
  let i = 0
  while (i < text.length) {
    const n = Math.round(between(2, 28))
    out.push(text.slice(i, i + n))
    i += n
  }
  return out
}

let seq = 0
const nextId = () => `sim-${Date.now().toString(36)}-${seq++}`

export function useRetroChatSimulator({ initialMessages = [], reply, thinkMs = 1400 }: Options) {
  const [messages, setMessages] = React.useState<RetroChatMessage[]>(initialMessages)
  const [status, setStatus] = React.useState<RetroChatStatus>("ready")
  const run = React.useRef(0)

  React.useEffect(() => () => void (run.current += 1), [])

  const patchLast = (fn: (parts: RetroMessagePart[]) => RetroMessagePart[]) =>
    setMessages((all) => {
      const last = all[all.length - 1]
      if (!last || last.role !== "assistant") return all
      return [...all.slice(0, -1), { ...last, parts: fn(last.parts) }]
    })

  const stream = async (prompt: string) => {
    const id = ++run.current
    const alive = () => run.current === id
    setStatus("submitted")
    await sleep(thinkMs)
    if (!alive()) return
    const { reasoning, text } = reply(prompt)
    setMessages((all) => [...all, { id: nextId(), role: "assistant", parts: [] }])
    setStatus("streaming")

    const streamPart = async (type: "reasoning" | "text", body: string) => {
      patchLast((parts) => [...parts, { type, text: "", state: "streaming" }])
      let acc = ""
      for (const piece of chunk(body)) {
        /* now and then the network stalls, so the caret waits */
        await sleep(Math.random() < 0.06 ? between(700, 1100) : between(30, 200))
        if (!alive()) return false
        acc += piece
        const snapshot = acc
        patchLast((parts) =>
          parts.map((p, i) => (i === parts.length - 1 && p.type === type ? { ...p, text: snapshot } : p))
        )
      }
      patchLast((parts) =>
        parts.map((p, i) => (i === parts.length - 1 && p.type === type ? { ...p, state: "done" } : p))
      )
      return true
    }

    if (reasoning && !(await streamPart("reasoning", reasoning))) return
    if (!(await streamPart("text", text))) return
    if (alive()) setStatus("ready")
  }

  const send = (prompt: string) => {
    if (!prompt.trim()) return
    setMessages((all) => [
      ...all,
      { id: nextId(), role: "user", parts: [{ type: "text", text: prompt }] },
    ])
    void stream(prompt)
  }

  /** ⌘-period: stop where it is; whatever arrived stays. */
  const stop = () => {
    run.current += 1
    patchLast((parts) =>
      parts.map((p) => (p.type === "text" || p.type === "reasoning" ? { ...p, state: "done" } : p))
    )
    setStatus("ready")
  }

  /** Try Again: drop the last reply and ask the same thing again. */
  const retry = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user")
    if (!lastUser) return
    const text = lastUser.parts.find((p) => p.type === "text")
    run.current += 1
    setMessages((all) => (all[all.length - 1]?.role === "assistant" ? all.slice(0, -1) : all))
    void stream(text && "text" in text ? text.text : "")
  }

  const reset = () => {
    run.current += 1
    setMessages(initialMessages)
    setStatus("ready")
  }

  return { messages, status, send, stop, retry, reset }
}
