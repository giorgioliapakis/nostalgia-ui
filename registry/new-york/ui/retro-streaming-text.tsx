"use client"

/*
 * RetroStreamingText: text that arrives behind a Mac OS 9 insertion caret.
 *
 * Crafted moment: the caret. A 1px black bar leads the text while it types,
 * solid like a real insertion point under the keyboard; when the network
 * stalls it starts blinking at the Finder's rhythm, as if waiting for the
 * next keystroke, and when the reply is done it fades away (classic flair:
 * it simply goes). Network deltas arrive in lumps, so the reveal is paced on
 * requestAnimationFrame: it types at a steady floor speed and speeds up with
 * the backlog, so it never trails the stream by more than about half a
 * second. Classic flair and reduced motion show text the moment it arrives.
 *
 * `useRetroStreamingText` and `RetroCaret` are exported for components that
 * format the text themselves (RetroMessage renders paragraphs and code with
 * the caret inside the last block).
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import { motionOff, useMergedRef } from "@/registry/new-york/lib/retro-motion"

/** Typing speed with no backlog, in characters per second. */
const FLOOR_CPS = 70
/** The backlog drains in about this long, so lag stays under ~0.5s. */
const CATCH_UP_S = 0.22
/** No new characters for this long: the caret starts blinking. */
const IDLE_MS = 530

/** Where the caret is in its life. */
type RetroCaretPhase =
  /** never shown: the text was complete when it mounted */
  | "off"
  /** text is arriving: solid bar */
  | "typing"
  /** streaming, but nothing new for a moment: blinks */
  | "waiting"
  /** the stream finished: fades out */
  | "done"

const CSS = `
@keyframes os9-insertion-blink { 0%, 49.9% { opacity: 1; } 50%, 100% { opacity: 0; } }
.os9-caret { transition: opacity 200ms ease-out; }
.os9-caret[data-phase="waiting"] { animation: os9-insertion-blink 1.06s step-end infinite; }
.os9-caret[data-phase="done"] { opacity: 0; }
[data-flair="classic"] .os9-caret { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .os9-caret { transition: none; }
  .os9-caret[data-phase="waiting"] { animation: none; }
}
`

/* don't cut a surrogate pair (emoji) in half */
function safeEnd(text: string, n: number) {
  const code = text.charCodeAt(n - 1)
  return code >= 0xd800 && code <= 0xdbff ? n + 1 : n
}

/** True when `next` carries on from the first `count` characters of `prev`. */
function continues(prev: string, count: number, next: string) {
  return prev === next || next.startsWith(prev.slice(0, count))
}

/**
 * Paces a growing string for display. Attach `ref` to an element inside the
 * flair scope (it is read to decide whether to animate).
 */
function useRetroStreamingText(text: string, streaming = false) {
  const elRef = React.useRef<HTMLElement | null>(null)

  /* text that was already complete on mount shows at once, with no caret */
  const [everStreamed, setEverStreamed] = React.useState(streaming)
  if (streaming && !everStreamed) setEverStreamed(true)

  /* how much of which string has been revealed */
  const [progress, setProgress] = React.useState(() => ({
    text,
    count: streaming ? 0 : text.length,
  }))
  const countRef = React.useRef(progress.count)
  const textRef = React.useRef(text)
  /* a continuation keeps its place; a different string starts over */
  const count = continues(progress.text, progress.count, text)
    ? progress.count
    : streaming
      ? 0
      : text.length

  React.useEffect(() => {
    /* a different string (not a continuation) starts over */
    const prev = textRef.current
    textRef.current = text
    if (!continues(prev, Math.floor(countRef.current), text)) {
      countRef.current = streaming ? 0 : text.length
    }
    const target = text.length
    countRef.current = Math.min(countRef.current, target)
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000
      last = now
      if (motionOff(elRef.current)) {
        countRef.current = target
      } else {
        const backlog = target - countRef.current
        const rate = Math.max(FLOOR_CPS, backlog / CATCH_UP_S)
        countRef.current = Math.min(target, countRef.current + rate * dt)
      }
      const next = Math.min(target, safeEnd(text, Math.floor(countRef.current)))
      setProgress((p) => (p.text === text && p.count === next ? p : { text, count: next }))
      if (countRef.current < target) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, streaming])

  const caughtUp = count >= text.length

  /* caught up but still streaming: after a beat, the caret waits (blinks) */
  const [idle, setIdle] = React.useState(false)
  React.useEffect(() => {
    if (!streaming || !caughtUp) return
    const timer = window.setTimeout(() => setIdle(true), IDLE_MS)
    return () => {
      window.clearTimeout(timer)
      setIdle(false)
    }
  }, [streaming, caughtUp, text])

  const phase: RetroCaretPhase = !everStreamed
    ? "off"
    : !caughtUp
      ? "typing"
      : streaming
        ? idle
          ? "waiting"
          : "typing"
        : "done"

  return {
    /** the part of `text` to show now */
    shown: caughtUp ? text : text.slice(0, count),
    /** what the caret should do */
    phase,
    /** true while characters are still being revealed or the stream is open */
    active: streaming || !caughtUp,
    ref: elRef,
  }
}

/* ── caret ─────────────────────────────────────────────── */

interface RetroCaretProps extends Omit<React.ComponentProps<"span">, "children"> {
  phase?: RetroCaretPhase
}

/**
 * The OS 9 insertion point: a 1px black bar a line tall. It takes no width
 * (the text after it doesn't move when it goes) and is hidden from screen
 * readers.
 */
function RetroCaret({ phase = "waiting", className, ...props }: RetroCaretProps) {
  if (phase === "off") return null
  return (
    <>
      <style href="os9-caret" precedence="default">
        {CSS}
      </style>
      <span
        aria-hidden="true"
        data-slot="retro-caret"
        data-phase={phase}
        className={cn(
          "os9-caret pointer-events-none relative inline-block h-[1.15em] w-px -mr-px",
          "translate-x-px bg-os9-black align-[-0.2em]",
          className
        )}
        {...props}
      />
    </>
  )
}

/* ── streaming text ────────────────────────────────────── */

interface RetroStreamingTextProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** Everything received so far. Grow it as deltas arrive. */
  text: string
  /** True while more text may still arrive. */
  streaming?: boolean
  /** Show the insertion caret. Default true. */
  caret?: boolean
}

function RetroStreamingText({
  text,
  streaming = false,
  caret = true,
  className,
  ref,
  ...props
}: RetroStreamingTextProps) {
  const { shown, phase, ref: paceRef } = useRetroStreamingText(text, streaming)
  const mergedRef = useMergedRef<HTMLSpanElement>(ref, paceRef as React.Ref<HTMLSpanElement>)
  return (
    <span
      ref={mergedRef}
      data-slot="retro-streaming-text"
      data-streaming={streaming || undefined}
      className={cn("whitespace-pre-wrap [overflow-wrap:anywhere]", className)}
      {...props}
    >
      {shown}
      {caret ? <RetroCaret phase={phase} /> : null}
    </span>
  )
}

export { RetroStreamingText, RetroCaret, useRetroStreamingText }
export type { RetroStreamingTextProps, RetroCaretProps, RetroCaretPhase }
