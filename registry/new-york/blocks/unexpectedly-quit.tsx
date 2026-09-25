"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroIconBomb, RetroIconStop } from "@/registry/new-york/ui/retro-icons"

/* ------------------------------------------------------------------ */
/*  UnexpectedlyQuitBlock                                              */
/* ------------------------------------------------------------------ */

type UnexpectedlyQuitVariant = "quit" | "system-error"

interface UnexpectedlyQuitBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * "quit" — the application unexpectedly quit (Stop icon, OK button).
   * "system-error" — "Sorry, a system error occurred." (bomb, Restart button).
   */
  variant?: UnexpectedlyQuitVariant
  /** Name of the application that crashed. */
  appName?: string
  /**
   * Error description. For "quit" this is the error type (e.g. `1`, `-1`,
   * `"unimplemented trap"`); for "system-error" it is shown on its own line.
   * Defaults to `1` / `"unimplemented trap"`.
   */
  errorType?: string | number
  /** Called when OK is clicked (or Return/Enter is pressed) in the "quit" variant. */
  onOk?: () => void
  /** Called when Restart is clicked (or Return/Enter is pressed) in the "system-error" variant. */
  onRestart?: () => void
  /** Show the (always disabled) Resume button in the "system-error" variant. Defaults to true. */
  showResume?: boolean
}

const UnexpectedlyQuitBlock = React.forwardRef<
  HTMLDivElement,
  UnexpectedlyQuitBlockProps
>(function UnexpectedlyQuitBlock(
  {
    variant = "quit",
    appName = "SimpleText",
    errorType,
    onOk,
    onRestart,
    showResume = true,
    className,
    onKeyDown,
    ...props
  },
  ref
) {
  const messageId = React.useId()
  const isSystemError = variant === "system-error"
  const error = errorType ?? (isSystemError ? "unimplemented trap" : 1)
  const onDefault = isSystemError ? onRestart : onOk

  return (
    <div
      ref={ref}
      role="alertdialog"
      aria-modal="false"
      aria-describedby={messageId}
      aria-label={isSystemError ? "System error" : `${appName} has unexpectedly quit`}
      onKeyDown={(e) => {
        onKeyDown?.(e)
        if (e.defaultPrevented) return
        // Return/Enter activates the default button from anywhere in the alert
        if (e.key === "Enter" && e.target === e.currentTarget) {
          e.preventDefault()
          onDefault?.()
        }
      }}
      tabIndex={-1}
      className={cn(
        "w-full max-w-[420px] outline-none",
        /* Modal frame: black line, platinum bevel band, inner line */
        "border border-os9-black bg-os9-gray-200 p-[3px] shadow-[var(--os9-shadow-window)]",
        className
      )}
      {...props}
    >
      <div className="border border-os9-gray-600 shadow-[inset_1px_1px_0_var(--os9-white)]">
        <div className="flex gap-4 px-4 pb-3 pt-4 max-[380px]:gap-3 max-[380px]:px-3">
          <div className="shrink-0 pt-0.5">
            {isSystemError ? <RetroIconBomb /> : <RetroIconStop />}
          </div>

          <div
            id={messageId}
            className="min-w-0 flex-1 font-[family-name:var(--os9-font-heading)] text-[12px] leading-[1.35] tracking-[0.42px] text-os9-black"
          >
            {isSystemError ? (
              <>
                <p>Sorry, a system error occurred.</p>
                <p className="mt-3 break-words">&ldquo;{appName}&rdquo;</p>
                <p className="mt-1 break-words">{String(error)}</p>
              </>
            ) : (
              <p className="break-words">
                The application &ldquo;{appName}&rdquo; has unexpectedly quit,
                because an error of type {String(error)} occurred.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 px-4 pb-4">
          {isSystemError && showResume && (
            <RetroButton type="button" disabled className="min-w-[70px]">
              Resume
            </RetroButton>
          )}
          <RetroButton
            type="button"
            isDefault
            className="min-w-[70px]"
            onClick={onDefault}
          >
            {isSystemError ? "Restart" : "OK"}
          </RetroButton>
        </div>
      </div>
    </div>
  )
})
UnexpectedlyQuitBlock.displayName = "UnexpectedlyQuitBlock"

export { UnexpectedlyQuitBlock }
export type { UnexpectedlyQuitBlockProps, UnexpectedlyQuitVariant }
