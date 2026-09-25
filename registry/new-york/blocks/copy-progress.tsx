"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import {
  RetroIconDocument,
  RetroIconFolder,
} from "@/registry/new-york/ui/retro-icons"
import { RetroProgress } from "@/registry/new-york/ui/retro-progress"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"

/* ------------------------------------------------------------------ */
/*  Flying-paper animation (folder → folder)                           */
/* ------------------------------------------------------------------ */

function CopyAnimation({ active }: { active: boolean }) {
  return (
    <div className="relative h-8 w-[88px] shrink-0" aria-hidden>
      <RetroIconFolder className="absolute left-0 top-0" />
      <RetroIconFolder className="absolute right-0 top-0" />
      {active && (
        <span className="copy-progress-paper absolute left-[20px] top-[4px]">
          <RetroIconDocument size="sm" />
        </span>
      )}
      <style href="copy-progress-block" precedence="default">{`
        @keyframes copy-progress-fly {
          0%   { transform: translate(0, 6px); opacity: 0; }
          15%  { opacity: 1; }
          50%  { transform: translate(24px, -6px); }
          85%  { opacity: 1; }
          100% { transform: translate(48px, 6px); opacity: 0; }
        }
        .copy-progress-paper {
          animation: copy-progress-fly 1.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .copy-progress-paper {
            animation: none;
            transform: translate(24px, -6px);
          }
        }
      `}</style>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  CopyProgressBlock                                                  */
/* ------------------------------------------------------------------ */

interface CopyProgressBlockProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RetroWindow>, "children" | "title"> {
  /** Number of items still to copy. */
  itemsRemaining?: number
  /** Name of the item currently being copied. */
  currentItem?: string
  /**
   * Progress 0–100. Leave undefined (or set `preparing`) for the
   * indeterminate "Preparing to copy…" state.
   */
  progress?: number
  /** Force the indeterminate "Preparing to copy…" state. */
  preparing?: boolean
  /** Called by the Stop button, Escape, or Command-period. */
  onStop?: () => void
  /** Window title. Defaults to "Copy". */
  title?: string
  /** Verb used in the labels. Defaults to "copy" (e.g. "move", "delete"). */
  verb?: string
}

const CopyProgressBlock = React.forwardRef<
  HTMLDivElement,
  CopyProgressBlockProps
>(function CopyProgressBlock(
  {
    itemsRemaining,
    currentItem,
    progress,
    preparing,
    onStop,
    title = "Copy",
    verb = "copy",
    className,
    onKeyDown,
    ...props
  },
  ref
) {
  const isPreparing = preparing ?? progress === undefined
  const Verb = verb.charAt(0).toUpperCase() + verb.slice(1)
  const gerund = `${Verb.replace(/e$/, "")}ing`
  const statusId = React.useId()

  return (
    <RetroWindow
      ref={ref}
      title={title}
      role="dialog"
      aria-label={title}
      aria-describedby={statusId}
      className={cn("w-full max-w-[420px]", className)}
      onKeyDown={(e) => {
        onKeyDown?.(e)
        if (e.defaultPrevented) return
        // Escape and Command-period are the classic Mac "cancel" keys
        if (e.key === "Escape" || (e.key === "." && (e.metaKey || e.ctrlKey))) {
          e.preventDefault()
          onStop?.()
        }
      }}
      {...props}
    >
      <div className="flex items-start gap-3 p-1">
        <CopyAnimation active={!isPreparing} />

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div
            id={statusId}
            aria-live="polite"
            className="flex flex-col gap-1 font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] text-os9-black"
          >
            {isPreparing ? (
              <p>Preparing to {verb}…</p>
            ) : (
              <>
                {itemsRemaining !== undefined && (
                  <p>
                    Items remaining to be {verb === "copy" ? "copied" : `${verb.replace(/e$/, "")}ed`}:{" "}
                    <span className="tabular-nums">
                      {itemsRemaining.toLocaleString("en-US")}
                    </span>
                  </p>
                )}
                {currentItem && (
                  <p className="flex min-w-0 gap-1">
                    <span className="shrink-0">{gerund}:</span>
                    <span className="truncate" title={currentItem}>
                      {currentItem}
                    </span>
                  </p>
                )}
              </>
            )}
          </div>

          <RetroProgress
            value={isPreparing ? 0 : progress}
            indeterminate={isPreparing}
            aria-label={isPreparing ? `Preparing to ${verb}` : `${Verb} progress`}
          />

          <div className="flex justify-end pt-1">
            <RetroButton type="button" onClick={onStop} className="min-w-[70px]">
              Stop
            </RetroButton>
          </div>
        </div>
      </div>
    </RetroWindow>
  )
})
CopyProgressBlock.displayName = "CopyProgressBlock"

export { CopyProgressBlock }
export type { CopyProgressBlockProps }
