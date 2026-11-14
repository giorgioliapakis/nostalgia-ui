"use client"

/*
 * RetroToolCall: one AI tool call as a single Platinum row, on UI SDK
 * Collapsible.
 *
 *   [▸] [⌚] Search Files                                 Running…
 *       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  (barber pole)
 *
 * Expanding the row morphs its height open to show the call's Input and
 * Output as pretty-printed JSON in inset wells (or the error text).
 *
 * Crafted moment: the status flip. When a call settles, its watch turns
 * edge-on and comes back as the check (or stop sign), in two hard frames,
 * the same way the disclosure triangle turns. It plays in both flairs, as
 * OS 9 itself would have; reduced motion swaps the glyph at once.
 *
 * Also exported: RetroToolCallGroup (consecutive calls sharing borders),
 * RetroToolChips (compact inline bevel chips for dense layouts),
 * RetroToolStatusIcon (the glyphs) and the toolStatus / toolTitle helpers.
 */

import * as React from "react"
import {
  Collapsible as CollapsiblePrimitive,
  CollapsiblePanel as CollapsiblePanelPrimitive,
  CollapsibleTrigger as CollapsibleTriggerPrimitive,
} from "@ui-sdk/react/collapsible"

import { cn } from "@/lib/utils"
import { toolNameOf, type RetroToolPart } from "@/registry/new-york/lib/retro-ai"
import { RetroProgress } from "@/registry/new-york/ui/retro-progress"

/* ------------------------------------------------------------------ */
/*  Status                                                             */
/* ------------------------------------------------------------------ */

/** What a tool call looks like to the person reading the transcript. */
type RetroToolStatus = "running" | "waiting" | "done" | "error" | "denied"

function toolStatus(part: RetroToolPart): RetroToolStatus {
  switch (part.state) {
    case "approval-requested":
      return "waiting"
    case "approval-responded":
      return part.approval?.approved === false ? "denied" : "running"
    case "output-available":
      return "done"
    case "output-error":
      return "error"
    case "output-denied":
      return "denied"
    default:
      return "running"
  }
}

const STATUS_WORDS: Record<RetroToolStatus, string> = {
  running: "Running…",
  waiting: "Waiting for you",
  done: "Done",
  error: "Failed",
  denied: "Denied",
}

/** `searchFiles` / `search_files` / `search-files` → `Search Files`. */
function prettifyToolName(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_\-.]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/** The human title for a tool call: its tool name, prettified. */
function toolTitle(part: RetroToolPart) {
  return prettifyToolName(toolNameOf(part))
}

/* ------------------------------------------------------------------ */
/*  Glyphs: 16px, 1px pixel strokes                                    */
/* ------------------------------------------------------------------ */

const GLYPH_CSS = `
@keyframes os9-tool-tick { to { transform: rotate(360deg); } }
.os9-tool-hand { transform-box: view-box; transform-origin: 8px 8px; animation: os9-tool-tick 1.6s steps(8, end) infinite; }
@keyframes os9-tool-flip-out { 0% { transform: scaleX(0.35); } 50%, 100% { opacity: 0; } }
@keyframes os9-tool-flip-in { 0% { opacity: 0; } 50% { opacity: 1; transform: scaleX(0.35); } 100% { opacity: 1; transform: none; } }
.os9-tool-flip-out { animation: os9-tool-flip-out 120ms step-end both; }
.os9-tool-flip-in { animation: os9-tool-flip-in 120ms step-end both; }
@keyframes os9-tool-rise { from { opacity: 0; transform: translateY(4px); } }
.os9-tool-enter { animation: os9-tool-rise 160ms cubic-bezier(0.23, 1, 0.32, 1) both; }
[data-flair="classic"] .os9-tool-enter { animation: none; }
@media (prefers-reduced-motion: reduce) {
  .os9-tool-hand, .os9-tool-flip-out, .os9-tool-flip-in, .os9-tool-enter { animation: none; }
  .os9-tool-flip-out { display: none; }
}
`

function GlyphStyle() {
  return (
    <style href="os9-tool-call" precedence="default">
      {GLYPH_CSS}
    </style>
  )
}

function Svg({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={cn("block shrink-0", className)}
    >
      {children}
    </svg>
  )
}

/** The OS 9 watch: strap, round face, a hand that ticks round in eighths. */
function WatchGlyph() {
  return (
    <Svg>
      <path d="M5 0h6v3H5zM5 13h6v3H5z" fill="var(--os9-black)" />
      <path d="M5 2h6v1h1v1h1v1h1v6h-1v1h-1v1h-1v1H5v-1H4v-1H3v-1H2V5h1V4h1V3h1z" fill="var(--os9-black)" />
      <path d="M5 3h6v1h1v1h1v6h-1v1h-1v1H5v-1H4v-1H3V5h1V4h1z" fill="var(--os9-white)" />
      <path d="M14 7h1v2h-1z" fill="var(--os9-black)" />
      <path d="M8 8h3v1H8z" fill="var(--os9-black)" />
      <g className="os9-tool-hand">
        <path d="M8 4h1v5H8z" fill="var(--os9-black)" />
      </g>
    </Svg>
  )
}

function CheckGlyph() {
  return (
    <Svg>
      <path
        d="M2 8h2v1h1v1h1v1h1V9h1V8h1V7h1V6h1V5h1V4h1V3h2v2h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1H9v1H8v1H6v-1H5v-1H4v-1H3v-1H2z"
        fill="var(--os9-black)"
      />
    </Svg>
  )
}

/** Caution: the yellow triangle with a black outline. */
function CautionGlyph() {
  return (
    <Svg>
      <path
        d="M7 1h2v2h1v2h1v2h1v2h1v2h1v2h1v2H1v-2h1v-2h1V9h1V7h1V5h1V3h1z"
        fill="var(--os9-black)"
      />
      <path d="M7 3h2v2h1v2h1v2h1v2h1v3H3v-3h1V9h1V7h1V5h1z" fill="#ffcc00" />
      <path d="M7 6h2v4H7zM7 11h2v2H7z" fill="var(--os9-black)" />
    </Svg>
  )
}

/** Stop: the red octagon with a raised white hand. */
function StopGlyph() {
  return (
    <Svg>
      <path d="M5 0h6v1h1v1h1v1h1v1h1v1h1v6h-1v1h-1v1h-1v1h-1v1h-1v1H5v-1H4v-1H3v-1H2v-1H1v-1H0V5h1V4h1V3h1V2h1V1h1z" fill="var(--os9-black)" />
      <path d="M5 1h6v1h1v1h1v1h1v1h1v6h-1v1h-1v1h-1v1h-1v1H5v-1H4v-1H3v-1H2v-1H1V5h1V4h1V3h1V2h1z" fill="#cc0000" />
      <path d="M5 4h1v3h1V3h1v4h1V4h1v4h1V7h1v3h-1v1h-1v1H6v-1H5z" fill="var(--os9-white)" />
    </Svg>
  )
}

/** Denied: a circle struck through. */
function DeniedGlyph() {
  return (
    <Svg>
      <path
        d="M5 1h6v1h2v2h1v2h1v4h-1v2h-1v2h-2v1H5v-1H3v-2H2v-2H1V6h1V4h1V2h2zM5 3v1H4v2H3v4h1v1h1v-1h1V9h1V8h1V7h1V6h1V5h1V4h1V3h-1V2H6v1zM11 5v1h-1v1H9v1H8v1H7v1H6v1H5v1h1v1h4v-1h2v-2h1V6h-1V5z"
        fill="var(--os9-black)"
        fillRule="evenodd"
      />
    </Svg>
  )
}

const GLYPHS: Record<RetroToolStatus, () => React.ReactElement> = {
  running: WatchGlyph,
  waiting: CautionGlyph,
  done: CheckGlyph,
  error: StopGlyph,
  denied: DeniedGlyph,
}

interface RetroToolStatusIconProps {
  status: RetroToolStatus
  className?: string
}

/**
 * The 16px status glyph. When `status` changes after mount, the old glyph
 * turns edge-on and the new one comes back in two frames (both flairs).
 */
function RetroToolStatusIcon({ status, className }: RetroToolStatusIconProps) {
  const [shown, setShown] = React.useState(status)
  const [leaving, setLeaving] = React.useState<RetroToolStatus | null>(null)

  /* adjust state while rendering: remember the glyph we're flipping away from */
  if (status !== shown) {
    setLeaving(shown)
    setShown(status)
  }

  React.useEffect(() => {
    if (!leaving) return
    const t = window.setTimeout(() => setLeaving(null), 140)
    return () => window.clearTimeout(t)
  }, [leaving, shown])

  const Glyph = GLYPHS[shown]
  const Old = leaving ? GLYPHS[leaving] : null
  return (
    <span className={cn("relative inline-grid size-4 shrink-0 place-items-center", className)} aria-hidden="true">
      <GlyphStyle />
      {Old && (
        <span key={`out-${leaving}-${shown}`} className="os9-tool-flip-out col-start-1 row-start-1">
          <Old />
        </span>
      )}
      <span key={`in-${shown}`} className={cn("col-start-1 row-start-1", Old && "os9-tool-flip-in")}>
        <Glyph />
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

function formatValue(value: unknown): string {
  if (value === undefined) return ""
  if (typeof value === "string") return value
  try {
    return JSON.stringify(value, null, 2) ?? String(value)
  } catch {
    return String(value)
  }
}

/** A labelled inset well holding Monaco text. */
function Well({ label, children, tone }: { label: string; children: React.ReactNode; tone?: "error" | "muted" }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-[family-name:var(--os9-font-heading)] text-[11px] tracking-[0.42px] leading-none text-os9-gray-800">
        {label}
      </span>
      <pre
        className={cn(
          "os9-inset m-0 max-h-[180px] overflow-auto px-2 py-1.5",
          "font-[family-name:var(--os9-font-mono)] text-[10px] leading-[1.5] whitespace-pre-wrap break-words",
          tone === "muted" ? "text-os9-gray-700" : "text-os9-black"
        )}
      >
        {children}
      </pre>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroToolCall                                                      */
/* ------------------------------------------------------------------ */

type RetroToolCallProps = Omit<
  React.ComponentProps<typeof CollapsiblePrimitive>,
  "className" | "children" | "render" | "part" | "title"
> & {
  /** The tool call, as the AI SDK streams it. */
  part: RetroToolPart
  /** Overrides the default title (the tool name, prettified). */
  title?: React.ReactNode
  /** An optional 16px icon shown before the title, e.g. a pixel folder for a file tool. */
  icon?: React.ReactNode
  className?: string
}

function RetroToolCall({ part, title, icon, className, ...props }: RetroToolCallProps) {
  const status = toolStatus(part)
  const running = status === "running"
  const name = toolNameOf(part)
  const hasInput = part.input !== undefined
  const hasOutput = part.output !== undefined

  return (
    <CollapsiblePrimitive
      data-retro-tool-call=""
      data-status={status}
      className={cn(
        "os9-tool-enter w-full border border-os9-black bg-os9-gray-200 text-os9-black",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-500)]",
        className
      )}
      {...props}
    >
      <GlyphStyle />
      <CollapsibleTriggerPrimitive
        className={cn(
          "group/tool flex h-[24px] w-full min-w-0 cursor-pointer select-none items-center gap-[6px] px-[6px] text-left",
          "hover:bg-os9-lavender/50 focus-visible:os9-focus-ring outline-none"
        )}
      >
        {/* Disclosure triangle: 0° → 45° → 90° in two frames */}
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          aria-hidden="true"
          shapeRendering="crispEdges"
          className={cn(
            "shrink-0 transition-transform duration-[110ms] [transition-timing-function:steps(2,end)]",
            "motion-reduce:transition-none group-data-open/tool:rotate-90"
          )}
        >
          <path d="M2 1L6 4L2 7Z" fill="var(--os9-black)" />
        </svg>
        <RetroToolStatusIcon status={status} />
        {icon && <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">{icon}</span>}
        <span className="min-w-0 flex-1 truncate font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-none">
          {title ?? toolTitle(part)}
        </span>
        <span
          className={cn(
            "shrink-0 font-[family-name:var(--os9-font-sans)] text-[10px] leading-none",
            status === "waiting" ? "font-bold text-os9-black" : "text-os9-gray-800"
          )}
        >
          {STATUS_WORDS[status]}
        </span>
      </CollapsibleTriggerPrimitive>

      {/* The barber pole slides in under the row while the call runs */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-180 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "in-data-[flair=classic]:transition-none motion-reduce:transition-none",
          running ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
        aria-hidden={!running}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-[6px] pb-[5px] pl-[20px]">
            {running && (
              <RetroProgress indeterminate aria-label={`${toolTitle(part)} running`} className="h-[7px]" />
            )}
          </div>
        </div>
      </div>

      <CollapsiblePanelPrimitive
        className={cn(
          "h-(--collapsible-panel-height) overflow-hidden",
          "transition-[height] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "data-starting-style:h-0 data-ending-style:h-0 data-ending-style:duration-180",
          "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
        )}
      >
        <div className="flex flex-col gap-2 border-t border-os9-gray-500 px-[8px] pt-[6px] pb-[8px] pl-[20px]">
          <span className="font-[family-name:var(--os9-font-mono)] text-[10px] leading-none text-os9-gray-700">
            {name}
            {part.toolCallId ? ` · ${part.toolCallId}` : ""}
          </span>
          <Well label="Input" tone={hasInput ? undefined : "muted"}>
            {hasInput ? formatValue(part.input) : part.state === "input-streaming" ? "Receiving…" : "None"}
          </Well>
          {status === "error" ? (
            <Well label="Error" tone="error">
              {part.errorText || "The tool failed without saying why."}
            </Well>
          ) : status === "denied" ? (
            <Well label="Output" tone="muted">
              {part.approval?.reason
                ? `Not run. ${part.approval.reason}`
                : "Not run: you didn’t allow it."}
            </Well>
          ) : (
            <Well label="Output" tone={hasOutput ? undefined : "muted"}>
              {hasOutput
                ? formatValue(part.output)
                : status === "waiting"
                  ? "Waits for your answer."
                  : "Waiting for the result…"}
            </Well>
          )}
        </div>
      </CollapsiblePanelPrimitive>
    </CollapsiblePrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroToolCallGroup                                                 */
/* ------------------------------------------------------------------ */

/** Stacks consecutive tool calls so neighbours share one border. */
function RetroToolCallGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      className={cn(
        "flex w-full flex-col",
        "[&>[data-retro-tool-call]+[data-retro-tool-call]]:border-t-0",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroToolChips                                                     */
/* ------------------------------------------------------------------ */

interface RetroToolChipsProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  parts: RetroToolPart[]
  /** Makes each chip a button, e.g. to scroll to or expand the full call. */
  onSelect?: (part: RetroToolPart) => void
}

const chipClass = cn(
  "os9-tool-enter inline-flex h-[20px] max-w-full items-center gap-1 pl-[3px] pr-[6px]",
  "border border-os9-black bg-os9-gray-300 text-os9-black",
  "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
  "font-[family-name:var(--os9-font-mono)] text-[10px] leading-none"
)

/** Compact inline bevel chips: status glyph + tool name, for dense layouts. */
function RetroToolChips({ parts, onSelect, className, ...props }: RetroToolChipsProps) {
  return (
    <div role="list" className={cn("flex flex-wrap items-center gap-1", className)} {...props}>
      {parts.map((part) => {
        const status = toolStatus(part)
        const label = `${toolTitle(part)}: ${STATUS_WORDS[status]}`
        const inner = (
          <>
            <RetroToolStatusIcon status={status} />
            <span className="truncate">{toolNameOf(part)}</span>
          </>
        )
        return (
          <span role="listitem" key={part.toolCallId} className="inline-flex max-w-full">
            {onSelect ? (
              <button
                type="button"
                title={label}
                aria-label={label}
                onClick={() => onSelect(part)}
                className={cn(
                  chipClass,
                  "cursor-pointer select-none focus-visible:os9-focus-ring outline-none",
                  "active:bg-os9-gray-800 active:text-os9-white",
                  "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]"
                )}
              >
                {inner}
              </button>
            ) : (
              <span title={label} aria-label={label} role="img" className={chipClass}>
                {inner}
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

export {
  RetroToolCall,
  RetroToolCallGroup,
  RetroToolChips,
  RetroToolStatusIcon,
  toolStatus,
  toolTitle,
  prettifyToolName,
}
export type { RetroToolCallProps, RetroToolChipsProps, RetroToolStatus, RetroToolStatusIconProps }
