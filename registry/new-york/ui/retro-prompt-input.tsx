"use client"

/*
 * RetroPromptInput: the chat composer. An inset edit field that grows with
 * the draft (one line up to `maxRows`, then it scrolls), a leading toolbar
 * slot for a model picker or an attach button, an attachments row above the
 * field, and the default Send button, which becomes Stop while a reply is on
 * its way.
 *
 *   Return          send            Shift-Return   new line
 *   ⌘-period, Esc   stop a reply    (IME composition is never interrupted)
 *
 * Crafted moment: the key presses the button. When Return sends, the Send
 * button shows its pressed face for a beat before the message goes and the
 * field clears, the way the Mac flashed a dialog's default button when you
 * hit Return; ⌘-period and Escape do the same to Stop. It is OS 9's own
 * feedback, so it plays in both flairs.
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import type { RetroChatStatus, RetroFilePart } from "@/registry/new-york/lib/retro-ai"
import { useMergedRef } from "@/registry/new-york/lib/retro-motion"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroTextarea } from "@/registry/new-york/ui/retro-textarea"

/* ------------------------------------------------------------------ */
/*  Shared CSS                                                         */
/* ------------------------------------------------------------------ */

/* Entering items fade and rise 4px (modern flair only). Shared by the AI
 * components; React hoists it and dedupes it by href. */
const RISE_CSS = `
@keyframes os9-ai-rise { from { opacity: 0; transform: translateY(4px); } }
.os9-ai-rise { animation: os9-ai-rise 160ms cubic-bezier(0.23, 1, 0.32, 1) both; }
[data-flair="classic"] .os9-ai-rise { animation: none; }
@media (prefers-reduced-motion: reduce) { .os9-ai-rise { animation: none; } }
`

/* ------------------------------------------------------------------ */
/*  Geometry                                                           */
/* ------------------------------------------------------------------ */

const LINE_PX = 18
const PAD_Y_PX = 4
const BORDER_PX = 1
/* how long the button holds its pressed face before the command runs
 * (the Mac held it for 8 ticks, ~133ms) */
const FLASH_MS = 120

/* the button's pressed face, held by data-flash while a key presses it */
const SEND_FLASH =
  "data-flash:bg-os9-gray-800 data-flash:text-os9-white data-flash:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white),0_0_0_2px_var(--os9-gray-300),0_0_0_5px_var(--os9-black)]"
const STOP_FLASH =
  "data-flash:bg-os9-gray-800 data-flash:text-os9-white data-flash:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]"

/* ------------------------------------------------------------------ */
/*  RetroPromptInput                                                   */
/* ------------------------------------------------------------------ */

type RetroPromptInputProps = Omit<
  React.ComponentProps<"form">,
  "onSubmit" | "children" | "defaultValue"
> & {
  /** The draft (controlled). Pair with `onValueChange`. */
  value?: string
  /** The initial draft when uncontrolled. */
  defaultValue?: string
  /** Fires on every edit, and with `""` when a sent draft clears. */
  onValueChange?: (value: string) => void
  /** Fires with the trimmed draft when Send is pressed (button or Return). */
  onSubmit?: (text: string) => void
  /** Fires when Stop is pressed (button, ⌘-period or Escape). */
  onStop?: () => void
  /** `useChat` status. `"submitted"` and `"streaming"` turn Send into Stop. */
  status?: RetroChatStatus
  disabled?: boolean
  placeholder?: string
  /** Leading controls on the button row: a model picker, an attach button. */
  toolbar?: React.ReactNode
  /** Files shown as chips above the field. They let an empty draft send. */
  attachments?: RetroFilePart[]
  /** Shows a remove box on each chip. */
  onAttachmentRemove?: (attachment: RetroFilePart, index: number) => void
  /** Lines the field grows to before it scrolls. */
  maxRows?: number
  autoFocus?: boolean
  /** Ref to the edit field, e.g. to focus it after filling a suggestion. */
  inputRef?: React.Ref<HTMLTextAreaElement>
  /** Accessible name of the edit field. */
  inputLabel?: string
  sendLabel?: string
  stopLabel?: string
}

function RetroPromptInput({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onSubmit,
  onStop,
  status = "ready",
  disabled = false,
  placeholder = "Send a message…",
  toolbar,
  attachments,
  onAttachmentRemove,
  maxRows = 8,
  autoFocus,
  inputRef,
  inputLabel = "Message",
  sendLabel = "Send",
  stopLabel = "Stop",
  className,
  ...props
}: RetroPromptInputProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const draft = valueProp ?? inner
  const busy = status === "submitted" || status === "streaming"
  const hasFiles = (attachments?.length ?? 0) > 0
  const canSend = !disabled && !busy && (draft.trim().length > 0 || hasFiles)

  const fieldRef = React.useRef<HTMLTextAreaElement>(null)
  const mergedFieldRef = useMergedRef(fieldRef, inputRef)

  /* which button a key is pressing right now */
  const [flash, setFlash] = React.useState<"send" | "stop" | null>(null)
  const flashTimer = React.useRef(0)
  React.useEffect(() => () => window.clearTimeout(flashTimer.current), [])

  const setDraft = (next: string) => {
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
  }

  /* ── grow with the draft, then scroll ── */
  const fit = React.useCallback(() => {
    const el = fieldRef.current
    if (!el) return
    const max = maxRows * LINE_PX + PAD_Y_PX * 2 + BORDER_PX * 2
    el.style.height = "auto"
    const needed = el.scrollHeight + BORDER_PX * 2
    el.style.height = `${Math.min(needed, max)}px`
    el.style.overflowY = needed > max ? "auto" : "hidden"
  }, [maxRows])

  React.useLayoutEffect(fit, [fit, draft])

  React.useEffect(() => {
    const el = fieldRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    let width = el.offsetWidth
    const observer = new ResizeObserver(() => {
      if (el.offsetWidth === width) return
      width = el.offsetWidth
      fit()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [fit])

  /* ── send & stop ── */
  const press = (which: "send" | "stop", run: () => void) => {
    setFlash(which)
    flashTimer.current = window.setTimeout(() => {
      setFlash(null)
      run()
    }, FLASH_MS)
  }

  const commit = (text: string) => {
    onSubmit?.(text)
    setDraft("")
    /* Send is about to become Stop; keep focus in the field, not on body */
    fieldRef.current?.focus()
  }

  const send = (byKey: boolean) => {
    if (!canSend || flash) return
    const text = draft.trim()
    if (byKey) press("send", () => commit(text))
    else commit(text)
  }

  const stop = (byKey: boolean) => {
    if (!busy || disabled || flash) return
    if (byKey) press("stop", () => onStop?.())
    else onStop?.()
  }

  /* ⌘-period cancels from anywhere on the page while a reply is coming,
   * like it did in every OS 9 app; Escape only from the composer itself */
  const stopRef = React.useRef(stop)
  React.useEffect(() => {
    stopRef.current = stop
  })
  React.useEffect(() => {
    if (!busy || disabled) return
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "." && !event.isComposing) {
        event.preventDefault()
        stopRef.current(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [busy, disabled])

  const onFieldKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    /* 229: Safari reports the key that ends an IME composition with this */
    if (event.nativeEvent.isComposing || event.keyCode === 229) return
    if (event.key === "Enter" && !event.shiftKey && !event.altKey) {
      event.preventDefault()
      send(true)
    } else if (event.key === "Escape" && busy) {
      event.preventDefault()
      stop(true)
    }
  }

  const removeAttachment = (attachment: RetroFilePart, index: number) => {
    onAttachmentRemove?.(attachment, index)
    fieldRef.current?.focus()
  }

  return (
    <form
      data-slot="prompt-input"
      data-status={status}
      data-disabled={disabled || undefined}
      onSubmit={(event) => {
        event.preventDefault()
        send(false)
      }}
      className={cn(
        "flex flex-col gap-[6px] p-[8px]",
        "border border-os9-black bg-os9-gray-200",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-500)]",
        className
      )}
      {...props}
    >
      <style href="os9-ai-rise" precedence="default">
        {RISE_CSS}
      </style>

      {hasFiles && (
        <ul aria-label="Attachments" className="flex flex-wrap gap-[4px]">
          {attachments!.map((file, index) => (
            <li key={`${file.url}-${index}`} className="os9-ai-rise flex min-w-0">
              <RetroPromptInputAttachment
                attachment={file}
                disabled={disabled}
                onRemove={
                  onAttachmentRemove ? () => removeAttachment(file, index) : undefined
                }
              />
            </li>
          ))}
        </ul>
      )}

      <RetroTextarea
        ref={mergedFieldRef}
        data-slot="prompt-input-field"
        rows={1}
        value={draft}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={flash !== null}
        autoFocus={autoFocus}
        aria-label={inputLabel}
        aria-keyshortcuts={busy ? "Meta+Period Escape" : undefined}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onFieldKeyDown}
        className={cn(
          "block min-h-0 resize-none overflow-hidden",
          "font-[family-name:var(--os9-font-sans)] text-[12px] leading-[18px] tracking-normal",
          "px-[6px] py-[4px] [overflow-wrap:anywhere]"
        )}
      />

      <div className="flex items-center gap-[6px]">
        <div
          data-slot="prompt-input-toolbar"
          className="flex min-w-0 flex-1 items-center gap-[4px]"
        >
          {toolbar}
        </div>
        {busy ? (
          <RetroButton
            type="button"
            data-slot="prompt-input-stop"
            data-flash={flash === "stop" ? "" : undefined}
            aria-keyshortcuts="Meta+Period Escape"
            disabled={disabled}
            onClick={() => stop(false)}
            /* the margin keeps Send's ring footprint, so nothing moves */
            className={cn("m-[5px] min-w-[64px] shrink-0", STOP_FLASH)}
          >
            {stopLabel}
          </RetroButton>
        ) : (
          <RetroButton
            type="submit"
            isDefault
            data-slot="prompt-input-send"
            data-flash={flash === "send" ? "" : undefined}
            disabled={!canSend}
            className={cn("min-w-[64px] shrink-0", SEND_FLASH)}
          >
            {sendLabel}
          </RetroButton>
        )}
      </div>
    </form>
  )
}

/* ------------------------------------------------------------------ */
/*  Attachment chip                                                    */
/* ------------------------------------------------------------------ */

function DocumentGlyph({ image }: { image: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
      shapeRendering="crispEdges"
      className="shrink-0"
    >
      <path d="M1.5 0.5H7.5L10.5 3.5V11.5H1.5Z" fill="var(--os9-white)" stroke="currentColor" />
      <path d="M7.5 0.5V3.5H10.5" fill="none" stroke="currentColor" />
      {image ? (
        <>
          <path d="M3 10L5 7L6.5 8.5L7.5 7.5L9 10Z" fill="currentColor" />
          <rect x="3" y="4" width="2" height="2" fill="currentColor" />
        </>
      ) : (
        <path d="M3 5.5H8M3 7.5H9M3 9.5H7" stroke="currentColor" />
      )}
    </svg>
  )
}

type RetroPromptInputAttachmentProps = Omit<React.ComponentProps<"span">, "children"> & {
  attachment: RetroFilePart
  /** Shows the remove box. */
  onRemove?: () => void
  disabled?: boolean
}

/* A small file chip: a document glyph, the name, and a close-box style
 * remove button. Rendered by RetroPromptInput for `attachments`, exported
 * for custom rows. */
function RetroPromptInputAttachment({
  attachment,
  onRemove,
  disabled,
  className,
  ...props
}: RetroPromptInputAttachmentProps) {
  const name = attachment.filename ?? "Untitled"
  return (
    <span
      data-slot="prompt-input-attachment"
      title={name}
      className={cn(
        "inline-flex h-[20px] max-w-[200px] min-w-0 items-center gap-[4px] pl-[4px]",
        onRemove ? "pr-[3px]" : "pr-[6px]",
        "border border-os9-black bg-os9-white text-os9-black",
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-none",
        className
      )}
      {...props}
    >
      <DocumentGlyph image={attachment.mediaType.startsWith("image/")} />
      <span className="min-w-0 truncate">{name}</span>
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${name}`}
          disabled={disabled}
          onClick={onRemove}
          className={cn(
            "ml-[2px] flex size-[12px] shrink-0 items-center justify-center",
            "border border-os9-black bg-os9-gray-300 text-os9-black",
            "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-600)]",
            "cursor-pointer outline-none focus-visible:os9-focus-ring",
            "active:bg-os9-gray-800 active:text-os9-white active:shadow-none",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true" shapeRendering="crispEdges">
            <path
              d="M0 0h1v1H0zM5 0h1v1H5zM1 1h1v1H1zM4 1h1v1H4zM2 2h2v2H2zM1 4h1v1H1zM4 4h1v1H4zM0 5h1v1H0zM5 5h1v1H5z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}
    </span>
  )
}

export { RetroPromptInput, RetroPromptInputAttachment }
export type { RetroPromptInputProps, RetroPromptInputAttachmentProps }
