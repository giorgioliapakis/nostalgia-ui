"use client"

/*
 * RetroThinking / RetroReasoning: what an assistant shows before and while
 * it thinks.
 *
 * Crafted moments:
 *  - The watch. OS 9's busy cursor was a wristwatch whose hands went round;
 *    here it is a 16px pixel watch whose minute hand sweeps (classic flair
 *    ticks it in eight hard steps, as the cursor did). Beside it a short
 *    barber pole, and after three seconds a quiet count of the seconds, so a
 *    long wait reads as work rather than a hang.
 *  - The reasoning disclosure opens on its own while the model thinks and
 *    closes itself when the answer starts, settling into "Thought for 4
 *    seconds". Open or close it yourself and it leaves your choice alone.
 *    Two-frame triangle and height morph from retro-collapsible.
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import type { RetroReasoningPart } from "@/registry/new-york/lib/retro-ai"
import {
  RetroCollapsible,
  RetroCollapsibleContent,
  RetroCollapsibleTrigger,
} from "@/registry/new-york/ui/retro-collapsible"
import { RetroProgress } from "@/registry/new-york/ui/retro-progress"
import { RetroStreamingText } from "@/registry/new-york/ui/retro-streaming-text"

/* ── the watch ─────────────────────────────────────────── */

const WATCH_CSS = `
@keyframes os9-watch-turn { to { transform: rotate(360deg); } }
.os9-watch-hand { transform-box: view-box; }
.os9-watch[data-running] .os9-watch-minute { animation: os9-watch-turn 1.6s linear infinite; }
.os9-watch[data-running] .os9-watch-hour { animation: os9-watch-turn 19.2s linear infinite; }
[data-flair="classic"] .os9-watch[data-running] .os9-watch-minute,
[data-flair="classic"] .os9-watch[data-running] .os9-watch-hour { animation-timing-function: steps(8, end); }
@media (prefers-reduced-motion: reduce) {
  .os9-watch[data-running] .os9-watch-hand { animation: none; }
}
`

const INK = "var(--os9-black)"
const STRAP = "var(--os9-gray-500)"
const TICK = "var(--os9-gray-600)"

/* drawn on each pixel grid rather than scaled, so no pixel goes soft */
function Watch16() {
  const origin = { transformOrigin: "7.5px 7.5px" }
  return (
    <>
      <rect x="4" y="0" width="7" height="3" fill={INK} />
      <rect x="5" y="0" width="5" height="2" fill={STRAP} />
      <rect x="4" y="13" width="7" height="3" fill={INK} />
      <rect x="5" y="14" width="5" height="2" fill={STRAP} />
      <path d="M4 2h7v1h1v1h1v7h-1v1h-1v1h-7v-1h-1v-1h-1v-7h1v-1h1z" fill={INK} />
      <rect x="13" y="7" width="1" height="1" fill={INK} />
      <path d="M4 3h7v1h1v7h-1v1h-7v-1h-1v-7h1z" fill="var(--os9-white)" />
      <rect x="7" y="3" width="1" height="1" fill={TICK} />
      <rect x="7" y="11" width="1" height="1" fill={TICK} />
      <rect x="3" y="7" width="1" height="1" fill={TICK} />
      <rect x="11" y="7" width="1" height="1" fill={TICK} />
      <rect className="os9-watch-hand os9-watch-hour" style={origin} x="7" y="7" width="3" height="1" fill={INK} />
      <rect className="os9-watch-hand os9-watch-minute" style={origin} x="7" y="4" width="1" height="4" fill={INK} />
    </>
  )
}

function Watch12() {
  const origin = { transformOrigin: "5.5px 5.5px" }
  return (
    <>
      <rect x="3" y="0" width="5" height="2" fill={INK} />
      <rect x="4" y="0" width="3" height="1" fill={STRAP} />
      <rect x="3" y="10" width="5" height="2" fill={INK} />
      <rect x="4" y="11" width="3" height="1" fill={STRAP} />
      <path d="M3 1h5v1h1v1h1v5h-1v1h-1v1h-5v-1h-1v-1h-1v-5h1v-1h1z" fill={INK} />
      <rect x="10" y="5" width="1" height="1" fill={INK} />
      <path d="M3 2h5v1h1v5h-1v1h-5v-1h-1v-5h1z" fill="var(--os9-white)" />
      <rect className="os9-watch-hand os9-watch-hour" style={origin} x="5" y="5" width="2" height="1" fill={INK} />
      <rect className="os9-watch-hand os9-watch-minute" style={origin} x="5" y="3" width="1" height="3" fill={INK} />
    </>
  )
}

interface RetroWatchIconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Pixel size: 16 (default) or 12. */
  size?: 12 | 16
  /** Turn the hands. Default true. */
  running?: boolean
}

/**
 * The OS 9 wristwatch busy cursor as a 16px pixel icon. Use it anywhere
 * something is working: a pending reply, a running tool call.
 */
function RetroWatchIcon({ size = 16, running = true, className, ...props }: RetroWatchIconProps) {
  return (
    <>
      <style href="os9-watch" precedence="default">
        {WATCH_CSS}
      </style>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        shapeRendering="crispEdges"
        data-slot="retro-watch-icon"
        data-running={running || undefined}
        className={cn("os9-watch inline-block shrink-0", className)}
        {...props}
      >
        {size === 16 ? <Watch16 /> : <Watch12 />}
      </svg>
    </>
  )
}

/* ── elapsed seconds ───────────────────────────────────── */

/** Whole seconds since `running` turned on; holds its value once it stops. */
function useElapsedSeconds(running: boolean, since?: number) {
  const [seconds, setSeconds] = React.useState(0)
  React.useEffect(() => {
    if (!running) return
    const start = since ?? Date.now()
    const update = () => setSeconds(Math.max(0, Math.round((Date.now() - start) / 1000)))
    const timer = window.setInterval(update, 250)
    return () => {
      window.clearInterval(timer)
      update()
    }
  }, [running, since])
  return seconds
}

function secondsLabel(n: number) {
  return n === 1 ? "1 second" : `${n} seconds`
}

/* ── thinking (pending) ────────────────────────────────── */

interface RetroThinkingProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Default "Thinking…". */
  label?: React.ReactNode
  /** When the request started (ms since epoch). Defaults to when this mounted. */
  since?: number
  /** Count the seconds after three have passed. Default true. */
  showElapsed?: boolean
}

/**
 * The pending state between Send and the first token. Its watch sits in the
 * same 16px column as RetroMessage's assistant icon, so it lines up in a
 * thread on its own.
 */
function RetroThinking({
  label = "Thinking…",
  since,
  showElapsed = true,
  className,
  ...props
}: RetroThinkingProps) {
  const seconds = useElapsedSeconds(true, since)
  return (
    <div
      role="status"
      data-slot="retro-thinking"
      className={cn(
        "flex items-center gap-2 font-[family-name:var(--os9-font-sans)] text-[12px] leading-[1.5] text-os9-black",
        "transition-[opacity,translate] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "starting:translate-y-1 starting:opacity-0",
        "in-data-[flair=classic]:transition-none motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      <RetroWatchIcon />
      <span>{label}</span>
      <span aria-hidden="true" className="contents">
        <RetroProgress indeterminate aria-label="Working" className="h-[10px] w-[56px]" />
      </span>
      {showElapsed && seconds >= 3 ? (
        <span className="text-[10px] tabular-nums text-os9-gray-700">{seconds} sec</span>
      ) : null}
    </div>
  )
}

/* ── reasoning (disclosure) ────────────────────────────── */

interface RetroReasoningProps
  extends Omit<
    React.ComponentProps<typeof RetroCollapsible>,
    "children" | "open" | "defaultOpen" | "onOpenChange" | "part"
  > {
  /** A reasoning part from a message; supplies `text` and `streaming`. */
  part?: RetroReasoningPart
  /** The reasoning text. Overrides `part.text`. */
  text?: string
  /** The model is still thinking. Defaults to `part.state === "streaming"`. */
  streaming?: boolean
  /** How long it thought, in seconds. Measured while streaming if left out. */
  duration?: number
  /** Controlled open state. Left out, it opens while streaming and closes after. */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Custom content instead of the text. */
  children?: React.ReactNode
}

function RetroReasoning({
  part,
  text: textProp,
  streaming: streamingProp,
  duration,
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
  className,
  ...props
}: RetroReasoningProps) {
  const text = textProp ?? part?.text ?? ""
  const streaming = streamingProp ?? part?.state === "streaming"
  const measured = useElapsedSeconds(streaming)
  const [everStreamed, setEverStreamed] = React.useState(streaming)
  if (streaming && !everStreamed) setEverStreamed(true)

  /* null: follow the stream; a boolean: the reader chose */
  const [chosen, setChosen] = React.useState<boolean | null>(defaultOpen ?? null)
  const open = openProp ?? chosen ?? streaming

  const seconds = duration ?? (everStreamed ? Math.max(1, measured) : undefined)
  const label = streaming
    ? "Thinking…"
    : seconds !== undefined
      ? `Thought for ${secondsLabel(Math.round(seconds))}`
      : "Thought for a moment"

  return (
    <RetroCollapsible
      data-streaming={streaming || undefined}
      open={open}
      onOpenChange={(next) => {
        setChosen(next)
        onOpenChange?.(next)
      }}
      className={cn("flex flex-col", className)}
      {...props}
    >
      <RetroCollapsibleTrigger className="self-start py-[2px] text-os9-gray-800 hover:text-os9-black focus-visible:os9-focus-ring">
        {streaming ? <RetroWatchIcon size={12} className="ml-[2px]" /> : null}
        <span aria-live="polite">{label}</span>
      </RetroCollapsibleTrigger>
      <RetroCollapsibleContent className="pl-3 pt-1 pb-1 text-[11px] leading-[1.5] text-os9-gray-700">
        <div className="border-l border-os9-gray-500 pl-2">
          {children ?? <RetroStreamingText text={text} streaming={streaming} />}
        </div>
      </RetroCollapsibleContent>
    </RetroCollapsible>
  )
}

export { RetroThinking, RetroReasoning, RetroWatchIcon }
export type { RetroThinkingProps, RetroReasoningProps, RetroWatchIconProps }
