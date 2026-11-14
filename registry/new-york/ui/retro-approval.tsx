"use client"

/*
 * RetroApproval: an OS 9 caution alert that sits in the transcript (not a
 * modal) and asks whether the assistant may run a tool.
 *
 *   ⚠  Allow the assistant to move 12 files?
 *      They'll go from the Desktop into “Old Stuff”.
 *      ▸ Show Details
 *                                   [Don't Allow]  ((Allow))
 *
 * Holding Option turns Allow into Always Allow, as Option did to Finder
 * commands. Return allows and Escape (or ⌘-period) doesn't, while the card
 * has focus; it takes focus when it appears. Once answered, the alert's frame
 * morphs down into a one-line receipt: "Allowed" or "Denied".
 *
 * Crafted moment: the entrance. Given an `anchorRef` (usually the tool row
 * that asked), zoom rects fly from it to the card, the way an OS 9 alert grew
 * out of whatever raised it; without one the card fades up 4px in 160ms.
 * Classic flair steps the rects and drops the fade; reduced motion shows the
 * card at once.
 *
 * RetroApprovalDialog asks the same question as a blocking modal alert.
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import type { RetroToolPart } from "@/registry/new-york/lib/retro-ai"
import {
  EASE_OUT_STRONG,
  motionOff,
  playZoomRects,
  prefersReducedMotion,
  useMergedRef,
} from "@/registry/new-york/lib/retro-motion"
import {
  RetroAlertDialog,
  RetroAlertDialogAction,
  RetroAlertDialogBody,
  RetroAlertDialogCancel,
  RetroAlertDialogContent,
  RetroAlertDialogDescription,
  RetroAlertDialogFooter,
  RetroAlertDialogTitle,
} from "@/registry/new-york/ui/retro-alert-dialog"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import {
  RetroCollapsible,
  RetroCollapsibleContent,
  RetroCollapsibleTrigger,
} from "@/registry/new-york/ui/retro-collapsible"
import { RetroIconAlert } from "@/registry/new-york/ui/retro-icons"
import { RetroToolStatusIcon, toolTitle } from "@/registry/new-york/ui/retro-tool-call"

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */

type RetroApprovalStatus = "pending" | "allowed" | "denied"

/** Reads the answer off a tool part, if the part has one yet. */
function approvalStatusOf(part: RetroToolPart | undefined): RetroApprovalStatus | undefined {
  if (!part) return undefined
  if (part.state === "approval-requested") return "pending"
  if (part.state === "output-denied") return "denied"
  if (part.approval?.approved === true) return "allowed"
  if (part.approval?.approved === false) return "denied"
  return undefined
}

/** True while Option (Alt) is held anywhere in the window. */
function useOptionKey(active = true) {
  const [held, setHeld] = React.useState(false)
  React.useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => setHeld(e.altKey)
    const onBlur = () => setHeld(false)
    window.addEventListener("keydown", onKey)
    window.addEventListener("keyup", onKey)
    window.addEventListener("blur", onBlur)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("keyup", onKey)
      window.removeEventListener("blur", onBlur)
    }
  }, [active])
  return active && held
}

/** "Allow" and "Always Allow" share one cell, so the button never changes width. */
function AllowLabel({ always }: { always: boolean }) {
  return (
    <span className="grid justify-items-center">
      <span className={cn("col-start-1 row-start-1", always && "invisible")}>Allow</span>
      <span className={cn("col-start-1 row-start-1", !always && "invisible")}>Always Allow</span>
    </span>
  )
}

/** "Show Details" disclosure over a list (or any node) of what will happen. */
function ApprovalDetails({ details }: { details: React.ReactNode | string[] }) {
  const [open, setOpen] = React.useState(false)
  return (
    <RetroCollapsible open={open} onOpenChange={setOpen} className="mt-1">
      <RetroCollapsibleTrigger className="text-[11px] -ml-px">
        {open ? "Hide Details" : "Show Details"}
      </RetroCollapsibleTrigger>
      <RetroCollapsibleContent className="pl-0 pt-1.5 text-[11px]">
        {Array.isArray(details) ? (
          <ul className="os9-inset m-0 max-h-[132px] list-none overflow-auto px-2 py-1.5 leading-[1.5]">
            {details.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span aria-hidden="true" className="text-os9-gray-700">
                  •
                </span>
                <span className="min-w-0 break-words">{line}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="os9-inset max-h-[132px] overflow-auto px-2 py-1.5 leading-[1.5]">{details}</div>
        )}
      </RetroCollapsibleContent>
    </RetroCollapsible>
  )
}

const ENTER_CSS = `
@keyframes os9-approval-rise { from { opacity: 0; transform: translateY(4px); } }
.os9-approval-enter { animation: os9-approval-rise 160ms cubic-bezier(0.23, 1, 0.32, 1) both; }
[data-flair="classic"] .os9-approval-enter { animation: none; }
@media (prefers-reduced-motion: reduce) { .os9-approval-enter { animation: none; } }
`

/* ------------------------------------------------------------------ */
/*  RetroApproval (inline)                                             */
/* ------------------------------------------------------------------ */

interface RetroApprovalProps
  extends Omit<React.ComponentProps<"div">, "title" | "children" | "onKeyDown" | "part"> {
  /** The tool call asking for permission. Its approval state sets the status when `status` isn't given. */
  part?: RetroToolPart
  /** The question. Defaults to “Allow the assistant to use <tool>?” when a part is given. */
  title?: React.ReactNode
  description?: React.ReactNode
  /** What will happen, behind a “Show Details” disclosure. An array renders as a list. */
  details?: React.ReactNode | string[]
  /** `always` is true when the person held Option (Always Allow). */
  onApprove: (always: boolean) => void
  onDeny: () => void
  /** Controls the card: pending shows the alert, allowed/denied the receipt. */
  status?: RetroApprovalStatus
  /** Zoom rects fly from this element (e.g. the tool row) when the card appears. */
  anchorRef?: React.RefObject<HTMLElement | null>
  /** Take focus when the card appears, so Return and Escape answer it. Default true. */
  autoFocus?: boolean
}

function RetroApproval({
  part,
  title,
  description,
  details,
  onApprove,
  onDeny,
  status: statusProp,
  anchorRef,
  autoFocus = true,
  className,
  ref,
  ...props
}: RetroApprovalProps) {
  /* the person's answer shows at once, before the app catches up */
  const [answer, setAnswer] = React.useState<"allowed" | "always" | "denied" | null>(null)
  const external = statusProp ?? approvalStatusOf(part) ?? "pending"
  const status: RetroApprovalStatus =
    external === "pending" && answer ? (answer === "denied" ? "denied" : "allowed") : external
  const pending = status === "pending"
  const always = useOptionKey(pending)

  const frameRef = React.useRef<HTMLDivElement | null>(null)
  const mergedRef = useMergedRef(ref, frameRef)
  const question = title ?? (part ? `Allow the assistant to use “${toolTitle(part)}”?` : "Allow this action?")
  const titleId = React.useId()
  const descId = React.useId()

  /* ── entrance: zoom rects from the anchor, else fade + rise ── */
  const mountedPending = React.useRef(pending)
  React.useLayoutEffect(() => {
    const el = frameRef.current
    if (!el || !mountedPending.current) return
    const anchor = anchorRef?.current
    if (anchor?.isConnected && !prefersReducedMotion()) {
      el.style.opacity = "0"
      const raf = requestAnimationFrame(() => {
        void playZoomRects(anchor.getBoundingClientRect(), el.getBoundingClientRect(), anchor).then(() => {
          el.style.opacity = ""
        })
      })
      return () => {
        cancelAnimationFrame(raf)
        el.style.opacity = ""
      }
    }
    el.classList.add("os9-approval-enter")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (autoFocus && mountedPending.current) frameRef.current?.focus({ preventScroll: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── answered: the frame morphs from the alert's height to the receipt's ── */
  const cardHeight = React.useRef(0)
  const hadFocus = React.useRef(false)
  React.useEffect(() => {
    const el = frameRef.current
    if (!el || !pending) return
    const ro = new ResizeObserver(() => {
      cardHeight.current = el.offsetHeight
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [pending])

  React.useLayoutEffect(() => {
    const el = frameRef.current
    const from = cardHeight.current
    if (!el || pending) return
    /* the buttons are gone: keep focus on the receipt rather than dropping it to <body> */
    if (hadFocus.current) el.focus({ preventScroll: true })
    hadFocus.current = false
    if (!from || motionOff(el)) return
    const to = el.offsetHeight
    cardHeight.current = 0
    const anim = el.animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration: 180,
      easing: EASE_OUT_STRONG,
    })
    return () => anim.cancel()
  }, [pending])

  const decide = (allow: boolean, alwaysAllow = false) => {
    if (!pending) return
    const el = frameRef.current
    if (el) {
      cardHeight.current = el.offsetHeight
      hadFocus.current = el.contains(document.activeElement)
    }
    if (allow) {
      setAnswer(alwaysAllow ? "always" : "allowed")
      onApprove(alwaysAllow)
    } else {
      setAnswer("denied")
      onDeny()
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!pending) return
    const cancel = e.key === "Escape" || (e.key === "." && (e.metaKey || e.ctrlKey))
    if (cancel) {
      e.preventDefault()
      e.stopPropagation()
      decide(false)
      return
    }
    /* Return answers, unless a button inside the card has focus (it answers itself) */
    const target = e.target as HTMLElement
    const onAllow = target.closest("[data-approval-allow]")
    if (e.key === "Enter" && !e.shiftKey && (onAllow || !target.closest("button, a, input, textarea, select"))) {
      e.preventDefault()
      decide(true, e.altKey)
    }
  }

  return (
    <div
      ref={mergedRef}
      tabIndex={-1}
      role={pending ? "alertdialog" : "status"}
      aria-labelledby={pending ? titleId : undefined}
      aria-describedby={pending && description ? descId : undefined}
      data-retro-approval=""
      data-status={status}
      onKeyDown={onKeyDown}
      className={cn(
        "w-full overflow-hidden border border-os9-black bg-os9-gray-200 text-os9-black outline-none",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-500)]",
        pending && "focus-visible:os9-focus-ring",
        className
      )}
      {...props}
    >
      <style href="os9-approval" precedence="default">
        {ENTER_CSS}
      </style>
      {pending ? (
        <div className="flex gap-3 p-3 pr-2 pb-1.5">
          <RetroIconAlert className="mt-px" />
          <div className="flex min-w-0 flex-1 flex-col">
            <p
              id={titleId}
              className="m-0 font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[1.3]"
            >
              {question}
            </p>
            {description && (
              <p
                id={descId}
                className="m-0 mt-1 font-[family-name:var(--os9-font-sans)] text-[12px] leading-[1.5]"
              >
                {description}
              </p>
            )}
            {details != null && <ApprovalDetails details={details} />}
            <div className="mt-1.5 flex flex-wrap items-center justify-end gap-x-2">
              <RetroButton type="button" onClick={() => decide(false)}>
                Don&apos;t Allow
              </RetroButton>
              <RetroButton
                type="button"
                isDefault
                data-approval-allow=""
                onClick={(e) => decide(true, e.altKey || always)}
              >
                <AllowLabel always={always} />
              </RetroButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[24px] min-w-0 items-center gap-[6px] px-[6px]">
          <RetroToolStatusIcon status={status === "denied" ? "denied" : "done"} />
          <span className="shrink-0 font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-none">
            {status === "denied" ? "Denied" : answer === "always" ? "Always Allowed" : "Allowed"}
          </span>
          <span className="min-w-0 truncate font-[family-name:var(--os9-font-sans)] text-[10px] leading-none text-os9-gray-800">
            {question}
          </span>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroApprovalDialog (modal)                                        */
/* ------------------------------------------------------------------ */

interface RetroApprovalDialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  part?: RetroToolPart
  title?: React.ReactNode
  description?: React.ReactNode
  details?: React.ReactNode | string[]
  onApprove: (always: boolean) => void
  onDeny: () => void
  className?: string
}

/**
 * The same question as a blocking alert, on RetroAlertDialog. Return allows,
 * Escape doesn't, Option turns Allow into Always Allow.
 */
function RetroApprovalDialog({
  open,
  defaultOpen,
  onOpenChange,
  part,
  title,
  description,
  details,
  onApprove,
  onDeny,
  className,
}: RetroApprovalDialogProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen ?? false)
  const shown = open ?? isOpen
  const always = useOptionKey(shown)
  const allowRef = React.useRef<HTMLButtonElement | null>(null)
  const question = title ?? (part ? `Allow the assistant to use “${toolTitle(part)}”?` : "Allow this action?")

  return (
    <RetroAlertDialog
      open={shown}
      onOpenChange={(next, details) => {
        setIsOpen(next)
        onOpenChange?.(next)
        if (next) return
        const value = details.returnValue
        if (value === "always" || value === "confirm") onApprove(value === "always")
        else onDeny()
      }}
    >
      <RetroAlertDialogContent
        className={className}
        initialFocus={() => allowRef.current}
        onKeyDown={(e) => {
          /* Option-Return doesn't press a focused button natively: answer Always Allow */
          if (e.key === "Enter" && e.altKey && !(e.target as HTMLElement).closest("[data-slot=alert-dialog-close]:not([data-approval-allow])")) {
            e.preventDefault()
            allowRef.current?.click()
          }
        }}
      >
        <RetroAlertDialogBody className="pt-4">
          <RetroAlertDialogTitle className="max-w-none whitespace-normal px-0 leading-[1.3]">
            {question}
          </RetroAlertDialogTitle>
          {description && (
            <RetroAlertDialogDescription className="mt-1.5 text-[12px] leading-[1.5]">
              {description}
            </RetroAlertDialogDescription>
          )}
          {details != null && <ApprovalDetails details={details} />}
        </RetroAlertDialogBody>
        <RetroAlertDialogFooter className="justify-end">
          <RetroAlertDialogCancel>Don&apos;t Allow</RetroAlertDialogCancel>
          <RetroAlertDialogAction ref={allowRef} data-approval-allow="" value={always ? "always" : "confirm"}>
            <AllowLabel always={always} />
          </RetroAlertDialogAction>
        </RetroAlertDialogFooter>
      </RetroAlertDialogContent>
    </RetroAlertDialog>
  )
}

export { RetroApproval, RetroApprovalDialog, approvalStatusOf }
export type { RetroApprovalProps, RetroApprovalDialogProps, RetroApprovalStatus }
