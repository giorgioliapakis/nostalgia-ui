"use client"

/*
 * RetroMessage: the transcript side of a Mac OS 9 AI chat.
 *
 *   <RetroMessageThread streaming={status === "streaming"}>   white inset well
 *     <RetroMessage message={m} streaming renderTool={…}>    parts, in order
 *       <RetroMessageActions message={m} onRetry={…} />      Copy, Try Again
 *     </RetroMessage>
 *   </RetroMessageThread>
 *
 * Crafted moments:
 *  - The thread holds the end in view while a reply types, and lets go the
 *    moment you scroll up to read. If more arrives while you're up there, a
 *    small "New messages" bevel button rises from the bottom edge and takes
 *    you back (UI SDK Scroll Area's stick-to-end, with a Platinum scrollbar).
 *  - Copy answers in place: the button reads "Copied" with a check for a
 *    moment, at the same width, so nothing beside it moves.
 *
 * Messages enter with the family's fade and 4px rise (160ms; classic and
 * reduced motion: instant). Text streams through RetroStreamingText's paced
 * reveal with the insertion caret in the last paragraph or code block.
 * Text formatting is deliberately small: blank lines make paragraphs, single
 * newlines stay, `inline code` and fenced ``` blocks render in Monaco, **bold** is bold.
 */

import * as React from "react"
import {
  createScrollAreaController,
  ScrollArea as ScrollAreaPrimitive,
  ScrollAreaContent as ScrollAreaContentPrimitive,
  ScrollAreaScrollToEnd as ScrollAreaScrollToEndPrimitive,
  ScrollAreaViewport as ScrollAreaViewportPrimitive,
} from "@ui-sdk/react/scroll-area"

import { cn } from "@/lib/utils"
import {
  isToolPart,
  messageText,
  toolNameOf,
  type RetroChatMessage,
  type RetroChatRole,
  type RetroFilePart,
  type RetroMessagePart,
  type RetroToolPart,
} from "@/registry/new-york/lib/retro-ai"
import { useMergedRef } from "@/registry/new-york/lib/retro-motion"
import { RetroBevelButton } from "@/registry/new-york/ui/retro-bevel-button"
import { RetroIconDocument } from "@/registry/new-york/ui/retro-icons"
import { RetroScrollBar } from "@/registry/new-york/ui/retro-scrollbar"
import { RetroCaret, useRetroStreamingText } from "@/registry/new-york/ui/retro-streaming-text"
import { RetroReasoning, RetroWatchIcon } from "@/registry/new-york/ui/retro-thinking"

/** The family's entrance: fade and rise 4px, 160ms. */
const ENTER =
  "transition-[opacity,translate] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] starting:translate-y-1 starting:opacity-0 in-data-[flair=classic]:transition-none motion-reduce:transition-none"

/* ── pixel glyphs ──────────────────────────────────────── */

/** The assistant's avatar: a 16px compact Macintosh with a happy face. */
function RetroAssistantIcon({ className, ...props }: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      shapeRendering="crispEdges"
      className={cn("inline-block shrink-0", className)}
      {...props}
    >
      <rect x="3" y="0" width="11" height="14" fill="var(--os9-black)" />
      <rect x="4" y="1" width="9" height="12" fill="var(--os9-gray-300)" />
      <rect x="4" y="1" width="9" height="1" fill="var(--os9-white)" />
      <rect x="5" y="2" width="7" height="6" fill="var(--os9-black)" />
      <rect x="6" y="3" width="5" height="4" fill="var(--os9-white)" />
      <rect x="7" y="4" width="1" height="1" fill="var(--os9-black)" />
      <rect x="9" y="4" width="1" height="1" fill="var(--os9-black)" />
      <rect x="7" y="6" width="3" height="1" fill="var(--os9-black)" />
      <rect x="9" y="10" width="3" height="1" fill="var(--os9-black)" />
      <rect x="4" y="14" width="9" height="2" fill="var(--os9-black)" />
      <rect x="5" y="14" width="7" height="1" fill="var(--os9-gray-500)" />
    </svg>
  )
}

function Glyph({ children, size = 12 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
      className="inline-block shrink-0"
    >
      {children}
    </svg>
  )
}

const CopyGlyph = () => (
  <Glyph>
    <rect x="1" y="1" width="7" height="8" fill="var(--os9-white)" stroke="currentColor" strokeWidth="1" transform="translate(-.5 -.5)" />
    <rect x="4" y="4" width="7" height="8" fill="var(--os9-white)" stroke="currentColor" strokeWidth="1" transform="translate(.5 -.5)" />
    <rect x="6" y="6" width="3" height="1" fill="currentColor" />
    <rect x="6" y="8" width="3" height="1" fill="currentColor" />
  </Glyph>
)

const CheckGlyph = () => (
  <Glyph>
    <path d="M1 6h2v1h1v1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v2h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1z" fill="currentColor" />
  </Glyph>
)

const RetryGlyph = () => (
  <Glyph>
    <path
      d="M4 2h4v1h-4zM3 3h1v1h-1zM2 4h1v4h-1zM3 8h1v1h-1zM4 9h4v1h-4zM8 8h1v1h-1zM9 5h1v3h-1zM8 0h1v5h-1zM9 1h1v3h-1zM10 2h1v1h-1z"
      fill="currentColor"
    />
  </Glyph>
)

const StopGlyph = () => (
  <Glyph>
    <path d="M4 0h4v1h1v1h1v1h1v1h1v4h-1v1h-1v1h-1v1h-1v1h-4v-1h-1v-1h-1v-1h-1v-1h-1v-4h1v-1h1v-1h1v-1h1z" fill="var(--os9-black)" />
    <path d="M4 1h4v1h1v1h1v1h1v4h-1v1h-1v1h-1v1h-4v-1h-1v-1h-1v-1h-1v-4h1v-1h1v-1h1z" fill="#cc0000" />
    <rect x="3" y="5" width="6" height="2" fill="var(--os9-white)" />
  </Glyph>
)

const CautionGlyph = () => (
  <Glyph>
    <path d="M5 0h2v2h1v3h1v3h1v2h1v2h-11v-2h1v-2h1v-3h1v-3h1z" fill="var(--os9-black)" />
    <path d="M5 2h2v3h1v3h1v2h1v1h-9v-1h1v-2h1v-3h1z" fill="#ffcc00" />
    <rect x="5" y="4" width="2" height="4" fill="var(--os9-black)" />
    <rect x="5" y="9" width="2" height="1" fill="var(--os9-black)" />
  </Glyph>
)

const DownGlyph = () => (
  <Glyph size={8}>
    <path d="M3 0h2v4h2v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h2z" fill="currentColor" />
  </Glyph>
)

/* ── thread ────────────────────────────────────────────── */

type ScrollController = ReturnType<typeof createScrollAreaController>

interface RetroMessageThreadContextValue {
  /** Scroll to the newest message and follow it again (call after Send). */
  scrollToEnd: (behavior?: "instant" | "smooth") => void
}

const ThreadContext = React.createContext<RetroMessageThreadContextValue | null>(null)

/** The enclosing thread's controls, e.g. to scroll to the end after Send. */
function useRetroMessageThread() {
  const context = React.useContext(ThreadContext)
  if (!context) throw new Error("useRetroMessageThread must be used inside <RetroMessageThread>")
  return context
}

interface RetroMessageThreadProps extends Omit<React.ComponentProps<"div">, "children"> {
  children?: React.ReactNode
  /**
   * A reply is streaming. The log is marked aria-busy meanwhile, so screen
   * readers read the finished reply once instead of every word.
   */
  streaming?: boolean
  /** Accessible name of the log. Default "Conversation". */
  label?: string
  /** Text of the button that jumps back down. Default "New messages". */
  jumpLabel?: string
  /** Classes for the inner column (padding, gap, max width). */
  contentClassName?: string
  /** Drive the scroll position from outside (`createScrollAreaController()`). */
  controller?: ScrollController
}

function RetroMessageThread({
  children,
  streaming = false,
  label = "Conversation",
  jumpLabel = "New messages",
  contentClassName,
  controller: controllerProp,
  className,
  ...props
}: RetroMessageThreadProps) {
  const [ownController] = React.useState(createScrollAreaController)
  const controller = controllerProp ?? ownController
  /* content arrived while the reader was scrolled up */
  const [hasNew, setHasNew] = React.useState(false)

  const contentRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return
      let height = node.offsetHeight
      const observer = new ResizeObserver(() => {
        const next = node.offsetHeight
        if (next > height && !controller.isSticking() && !controller.isAtEnd()) setHasNew(true)
        height = next
      })
      observer.observe(node)
      return () => observer.disconnect()
    },
    [controller]
  )

  const context = React.useMemo<RetroMessageThreadContextValue>(
    () => ({
      scrollToEnd: (behavior = "smooth") => {
        setHasNew(false)
        controller.scrollToEnd({ behavior })
      },
    }),
    [controller]
  )

  return (
    <ThreadContext.Provider value={context}>
      <div
        data-slot="retro-message-thread"
        className={cn("os9-inset relative flex min-h-0 flex-col bg-os9-white", className)}
        {...props}
      >
        <ScrollAreaPrimitive
          stickToEnd
          type="always"
          controller={controller}
          className="relative min-h-0 flex-1 overflow-hidden"
        >
          <ScrollAreaViewportPrimitive
            role="log"
            aria-label={label}
            aria-live="polite"
            aria-busy={streaming || undefined}
            onScroll={() => {
              if (hasNew && (controller.isSticking() || controller.isAtEnd())) setHasNew(false)
            }}
            className="h-full w-full pr-[16px] focus-visible:os9-focus-ring"
          >
            <ScrollAreaContentPrimitive>
              <div
                ref={contentRef}
                data-slot="retro-message-thread-content"
                className={cn("flex flex-col gap-4 p-3", contentClassName)}
              >
                {children}
              </div>
            </ScrollAreaContentPrimitive>
          </ScrollAreaViewportPrimitive>
          <RetroScrollBar orientation="vertical" />
          {hasNew ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center pr-[16px]">
              <ScrollAreaScrollToEndPrimitive
                onClick={() => setHasNew(false)}
                render={
                  <RetroBevelButton
                    bevel="small"
                    size="sm"
                    icon={<DownGlyph />}
                    className={cn("pointer-events-auto not-data-visible:hidden", ENTER)}
                  />
                }
              >
                {jumpLabel}
              </ScrollAreaScrollToEndPrimitive>
            </div>
          ) : null}
        </ScrollAreaPrimitive>
      </div>
    </ThreadContext.Provider>
  )
}

/* ── message ───────────────────────────────────────────── */

const MessageContext = React.createContext<RetroChatRole>("assistant")

interface RetroMessageProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** The message to render; its parts render in order. */
  message?: RetroChatMessage
  /** Who wrote it, for custom content without `message`. Default "assistant". */
  from?: RetroChatRole
  /**
   * This message is the reply still arriving. Parts without their own
   * `state` take the last one as streaming.
   */
  streaming?: boolean
  /** Renders a tool part (e.g. `(part) => <RetroToolCall part={part} />`). */
  renderTool?: (part: RetroToolPart, index: number) => React.ReactNode
  /** Replace the assistant's icon, or `false` for none. */
  avatar?: React.ReactNode | false
  /** Extra content after the parts, such as RetroMessageActions. */
  children?: React.ReactNode
}

function RetroMessage({
  message,
  from: fromProp,
  streaming = false,
  renderTool,
  avatar,
  className,
  children,
  ...props
}: RetroMessageProps) {
  const from = message?.role ?? fromProp ?? "assistant"
  return (
    <MessageContext.Provider value={from}>
      <div
        data-slot="retro-message"
        data-from={from}
        data-streaming={streaming || undefined}
        className={cn(
          "group/message flex min-w-0",
          from === "assistant" && "items-start gap-2",
          ENTER,
          className
        )}
        {...props}
      >
        {from === "assistant" && avatar !== false ? (
          <span className="flex h-[18px] shrink-0 items-center">
            {avatar ?? <RetroAssistantIcon />}
          </span>
        ) : null}
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col gap-1",
            from === "user" && "items-end",
            from === "system" && "items-center"
          )}
        >
          {message ? (
            <RetroMessageContent>
              <RetroMessageParts
                parts={message.parts}
                streaming={streaming}
                renderTool={renderTool}
              />
            </RetroMessageContent>
          ) : null}
          {children}
        </div>
      </div>
    </MessageContext.Provider>
  )
}

/** The body of a message: prose for the assistant, a lavender box for the user. */
function RetroMessageContent({ className, ...props }: React.ComponentProps<"div">) {
  const from = React.useContext(MessageContext)
  return (
    <div
      data-slot="retro-message-content"
      data-from={from}
      className={cn(
        "flex min-w-0 flex-col gap-2 font-[family-name:var(--os9-font-sans)] [overflow-wrap:anywhere]",
        from === "assistant" && "w-full text-[12px] leading-[1.5] text-os9-black",
        from === "user" &&
          "max-w-[80%] border border-os9-black bg-os9-lavender px-2 py-1 text-[12px] leading-[1.5] text-os9-black",
        from === "system" && "text-center text-[10px] leading-[1.4] text-os9-gray-700",
        className
      )}
      {...props}
    />
  )
}

/* ── parts ─────────────────────────────────────────────── */

function RetroMessageParts({
  parts,
  streaming,
  renderTool,
}: {
  parts: RetroMessagePart[]
  streaming: boolean
  renderTool?: (part: RetroToolPart, index: number) => React.ReactNode
}) {
  const last = parts.length - 1
  return parts.map((part, i) => {
    if (isToolPart(part)) {
      return (
        <React.Fragment key={part.toolCallId}>
          {renderTool ? renderTool(part, i) : <DefaultToolRow part={part} />}
        </React.Fragment>
      )
    }
    const partStreaming =
      "state" in part && part.state
        ? part.state === "streaming"
        : streaming && i === last
    switch (part.type) {
      case "text":
        return <RetroMessageText key={i} text={part.text} streaming={partStreaming} />
      case "reasoning":
        return <RetroReasoning key={i} text={part.text} streaming={partStreaming} />
      case "file":
        return <FilePart key={i} part={part} />
      default:
        return null
    }
  })
}

/* fenced code: ``` or ```lang on a line of its own */
const FENCE = /^\s*```\s*([\w+#.-]*)\s*$/

type Block =
  | { kind: "p"; text: string }
  | { kind: "code"; lang: string; code: string }

function parseBlocks(text: string): Block[] {
  const blocks: Block[] = []
  let para: string[] = []
  let code: { lang: string; lines: string[] } | null = null
  const flush = () => {
    if (para.length) blocks.push({ kind: "p", text: para.join("\n") })
    para = []
  }
  for (const line of text.split("\n")) {
    const fence = FENCE.exec(line)
    if (code) {
      if (fence && !fence[1]) {
        blocks.push({ kind: "code", lang: code.lang, code: code.lines.join("\n") })
        code = null
      } else code.lines.push(line)
    } else if (fence) {
      flush()
      code = { lang: fence[1], lines: [] }
    } else if (line.trim() === "") flush()
    else para.push(line)
  }
  flush()
  /* still streaming inside a fence: show what has arrived */
  if (code) blocks.push({ kind: "code", lang: code.lang, code: code.lines.join("\n") })
  return blocks
}

/* `code` and **bold**; anything else stays plain text */
function inline(text: string) {
  return text.split(/(`[^`\n]+`|\*\*[^*\n]+\*\*)/g).map((piece, i) =>
    i % 2 === 0 ? (
      piece
    ) : piece.startsWith("`") ? (
      <code
        key={i}
        className="bg-os9-gray-200 px-[3px] font-[family-name:var(--os9-font-mono)] text-[11px] outline outline-1 -outline-offset-1 outline-os9-gray-400"
      >
        {piece.slice(1, -1)}
      </code>
    ) : (
      <strong key={i} className="font-bold">
        {piece.slice(2, -2)}
      </strong>
    )
  )
}

interface RetroMessageTextProps extends Omit<React.ComponentProps<"div">, "children"> {
  text: string
  /** More text may still arrive: pace the reveal and show the caret. */
  streaming?: boolean
}

/**
 * Message text: paragraphs on blank lines, single newlines kept, `inline
 * code` and fenced blocks in Monaco. No markdown dependency.
 */
function RetroMessageText({ text, streaming = false, className, ref, ...props }: RetroMessageTextProps) {
  const { shown, phase, ref: paceRef } = useRetroStreamingText(text, streaming)
  const mergedRef = useMergedRef<HTMLDivElement>(ref, paceRef as React.Ref<HTMLDivElement>)
  const blocks = parseBlocks(shown)
  const caret = <RetroCaret phase={phase} />
  if (blocks.length === 0) blocks.push({ kind: "p", text: "" })
  const last = blocks.length - 1

  return (
    <div
      ref={mergedRef}
      data-slot="retro-message-text"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {blocks.map((block, i) =>
        block.kind === "p" ? (
          <p key={i} className="whitespace-pre-wrap">
            {inline(block.text)}
            {i === last ? caret : null}
          </p>
        ) : (
          <div key={i} className="os9-inset relative min-w-0">
            {block.lang ? (
              <div className="border-b border-os9-gray-400 px-2 py-[2px] font-[family-name:var(--os9-font-heading)] text-[10px] text-os9-gray-700">
                {block.lang}
              </div>
            ) : null}
            <pre className="overflow-x-auto px-2 py-[6px] font-[family-name:var(--os9-font-mono)] text-[10px] leading-[1.5] text-os9-black">
              <code>
                {block.code}
                {i === last ? caret : null}
              </code>
            </pre>
          </div>
        )
      )}
    </div>
  )
}

function FilePart({ part }: { part: RetroFilePart }) {
  if (part.mediaType.startsWith("image/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={part.url}
        alt={part.filename ?? "Attached picture"}
        className="max-h-48 max-w-full self-start border border-os9-black"
      />
    )
  }
  return (
    <a
      href={part.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 self-start text-[11px] underline focus-visible:os9-focus-ring"
    >
      <RetroIconDocument size="sm" />
      {part.filename ?? "Attachment"}
    </a>
  )
}

const TOOL_STATE: Record<RetroToolPart["state"], { label: string; icon: React.ReactNode }> = {
  "input-streaming": { label: "Preparing…", icon: <RetroWatchIcon size={12} /> },
  "input-available": { label: "Running…", icon: <RetroWatchIcon size={12} /> },
  "approval-requested": { label: "Waiting for you", icon: <CautionGlyph /> },
  "approval-responded": { label: "Running…", icon: <RetroWatchIcon size={12} /> },
  "output-available": { label: "Done", icon: <CheckGlyph /> },
  "output-error": { label: "Error", icon: <StopGlyph /> },
  "output-denied": { label: "Not allowed", icon: <StopGlyph /> },
}

/** A plain row for tool parts when no `renderTool` is given. */
function DefaultToolRow({ part }: { part: RetroToolPart }) {
  const { label, icon } = TOOL_STATE[part.state]
  return (
    <div data-slot="retro-message-tool" data-state={part.state} className="flex items-center gap-[6px]">
      {icon}
      <span className="font-[family-name:var(--os9-font-mono)] text-[10px]">{toolNameOf(part)}</span>
      <span className="text-[10px] text-os9-gray-700">
        {part.state === "output-error" && part.errorText ? part.errorText : label}
      </span>
    </div>
  )
}

/* ── actions ───────────────────────────────────────────── */

const COPIED_MS = 1600

interface RetroMessageActionsProps extends Omit<React.ComponentProps<"div">, "onCopy"> {
  /** The message whose text Copy copies. */
  message?: RetroChatMessage
  /** Text to copy instead of the message's. */
  text?: string
  /** Called after copying, with the text. */
  onCopy?: (text: string) => void
  /** Shows Try Again. */
  onRetry?: () => void
  /** Keep them visible rather than showing on hover and focus. */
  alwaysVisible?: boolean
}

/**
 * Copy and Try Again under a reply. They show while the pointer is over the
 * message or focus is inside it, and always on touch screens. Pass more
 * buttons as children.
 */
function RetroMessageActions({
  message,
  text,
  onCopy,
  onRetry,
  alwaysVisible = false,
  className,
  children,
  ...props
}: RetroMessageActionsProps) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef(0)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    const value = text ?? (message ? messageText(message) : "")
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    onCopy?.(value)
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS)
  }

  return (
    <div
      data-slot="retro-message-actions"
      data-always-visible={alwaysVisible || undefined}
      className={cn(
        "flex items-center gap-1",
        "opacity-0 transition-opacity duration-120 ease-out",
        "group-hover/message:opacity-100 group-focus-within/message:opacity-100",
        "data-always-visible:opacity-100 [@media(hover:none)]:opacity-100",
        "in-data-[flair=classic]:transition-none motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      <RetroBevelButton bevel="small" size="sm" onClick={copy} icon={copied ? <CheckGlyph /> : <CopyGlyph />}>
        {/* both labels share one cell, so the button keeps its width */}
        <span className="grid">
          <span className={cn("col-start-1 row-start-1", copied && "invisible")}>Copy</span>
          <span aria-hidden={!copied} className={cn("col-start-1 row-start-1", !copied && "invisible")}>
            Copied
          </span>
        </span>
      </RetroBevelButton>
      <span role="status" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
      {onRetry ? (
        <RetroBevelButton bevel="small" size="sm" onClick={onRetry} icon={<RetryGlyph />}>
          Try Again
        </RetroBevelButton>
      ) : null}
      {children}
    </div>
  )
}

export {
  RetroMessageThread,
  RetroMessage,
  RetroMessageContent,
  RetroMessageText,
  RetroMessageActions,
  RetroAssistantIcon,
  useRetroMessageThread,
}
export type {
  RetroMessageThreadProps,
  RetroMessageProps,
  RetroMessageTextProps,
  RetroMessageActionsProps,
}
