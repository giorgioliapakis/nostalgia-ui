"use client"

/*
 * RetroToaster: notifications as Mac OS 9 alert windows, on UI SDK's Toast.
 * Mount one <RetroToaster /> near the root, then call toast() from anywhere,
 * with the same calls as sonner: toast(), toast.success/info/warning/error/
 * loading, toast.promise(), toast.dismiss(), and `action` / `cancel` buttons
 * with `onClick`.
 *
 * Crafted moment: act, then Undo. Don't ask "Are you sure?" for something
 * that can be undone: do it, then offer Undo in an alert that slides in from
 * the corner (modern) or simply appears (classic). Newer alerts stack in
 * front with the older ones peeking out behind; hovering or focusing the
 * stack fans it out, and an alert swipes away toward its edge. F6 reaches
 * the newest alert from the keyboard.
 */

import * as React from "react"
import {
  Toast as ToastPrimitive,
  ToastAction as ToastActionPrimitive,
  ToastClose as ToastClosePrimitive,
  ToastDescription as ToastDescriptionPrimitive,
  ToastRegion as ToastRegionPrimitive,
  ToastTitle as ToastTitlePrimitive,
  createToaster,
  type ToastData,
  type ToastDismissDetails,
  type ToastOptions,
  type ToastType,
  type Toaster,
} from "@ui-sdk/react/toast"

import { cn } from "@/lib/utils"
import { retroButtonVariants } from "@/registry/new-york/ui/retro-button"
import {
  RetroIconAlert,
  RetroIconInfo,
  RetroIconStop,
} from "@/registry/new-york/ui/retro-icons"
import { RetroSpinner } from "@/registry/new-york/ui/retro-spinner"

/* ------------------------------------------------------------------ */
/*  Success glyph                                                      */
/*  retro-icons has no "OK" icon, so draw one in the same visual       */
/*  language as RetroIconInfo (azul disc, white pixel glyph).          */
/* ------------------------------------------------------------------ */

function RetroSonnerSuccessIcon() {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="h-8 w-8 shrink-0"
    >
      <circle cx="16" cy="16" r="13" fill="var(--os9-azul)" stroke="var(--os9-black)" strokeWidth="1" />
      <path d="M8 9 A13 13 0 0 1 24 8" stroke="var(--os9-focus)" strokeWidth="1" fill="none" />
      <path
        d="M9.5 16.5L14 21L22.5 11.5"
        stroke="var(--os9-white)"
        strokeWidth="3.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  toast(): sonner's call shape on a UI SDK toaster                   */
/* ------------------------------------------------------------------ */

type RetroToastAction = {
  label: React.ReactNode
  /** sonner's name for the handler. Return a Promise to keep the toast open, pending, until it settles. */
  onClick?: (event: Event | undefined) => unknown
  /** UI SDK's name for the handler; wins over `onClick`. */
  onAction?: (event: Event | undefined) => unknown
  /** Makes the action a link. */
  href?: string
  /** Whether pressing it dismisses the toast. Default true. */
  dismiss?: boolean
}

type RetroToastCancel = {
  label: React.ReactNode
  onClick?: (event: Event | undefined) => void
  onCancel?: (event: Event | undefined) => void
}

type RetroToastOptions = Omit<ToastOptions<React.ReactNode>, "action" | "cancel"> & {
  action?: RetroToastAction
  cancel?: RetroToastCancel
  /** Replaces the type's icon for this toast. */
  icon?: React.ReactNode
  /** Runs when the toast times out (sonner). */
  onAutoClose?: () => void
}

type ToastMessage = React.ReactNode

/** The queue <RetroToaster /> shows by default. */
const retroToaster: Toaster<React.ReactNode> = createToaster<React.ReactNode>()

/* <RetroToaster duration> sets this; a toast's own duration wins */
let toasterDuration: number | undefined

function adapt(options?: RetroToastOptions): ToastOptions<React.ReactNode> | undefined {
  if (!options) return toasterDuration !== undefined ? { duration: toasterDuration } : undefined
  const { action, cancel, icon, onAutoClose, onDismiss, data, duration, ...rest } = options
  return {
    ...rest,
    duration: duration ?? toasterDuration,
    data: icon !== undefined ? { ...(data as object | undefined), icon } : data,
    action: action && {
      label: action.label,
      href: action.href,
      dismiss: action.dismiss,
      onAction: action.onAction ?? action.onClick,
    },
    cancel: cancel && {
      label: cancel.label,
      onCancel: cancel.onCancel ?? cancel.onClick,
    },
    onDismiss:
      onDismiss || onAutoClose
        ? (details: ToastDismissDetails) => {
            onDismiss?.(details)
            if (details.reason === "timeout") onAutoClose?.()
          }
        : undefined,
  }
}

type PromiseMessages<Value> = {
  loading: ToastMessage
  success?: ToastMessage | ((value: Value) => ToastMessage)
  error?: ToastMessage | ((error: unknown) => ToastMessage)
}

function show(type: ToastType | undefined, message: ToastMessage, options?: RetroToastOptions) {
  return retroToaster(message, { ...adapt(options), ...(type ? { type } : {}) })
}

const toast = Object.assign(
  (message: ToastMessage, options?: RetroToastOptions) => show(undefined, message, options),
  {
    message: (message: ToastMessage, options?: RetroToastOptions) => show(undefined, message, options),
    success: (message: ToastMessage, options?: RetroToastOptions) => show("success", message, options),
    info: (message: ToastMessage, options?: RetroToastOptions) => show("info", message, options),
    warning: (message: ToastMessage, options?: RetroToastOptions) => show("warning", message, options),
    error: (message: ToastMessage, options?: RetroToastOptions) => show("error", message, options),
    loading: (message: ToastMessage, options?: RetroToastOptions) => show("loading", message, options),
    /** A loading toast that turns into success or error when the promise settles. */
    promise: <Value,>(
      promise: Promise<Value> | (() => Promise<Value>),
      messages: PromiseMessages<Value>,
      options?: RetroToastOptions
    ) => retroToaster.promise(promise, messages, adapt(options)),
    /** Changes a toast that's still showing. Returns whether it was. */
    update: (id: string, options: RetroToastOptions) =>
      retroToaster.update(id, adapt(options) ?? {}),
    /** Closes one toast, or every toast without an id. */
    dismiss: (id?: string) => retroToaster.dismiss(id),
  }
)

/* ------------------------------------------------------------------ */
/*  The stack                                                          */
/* ------------------------------------------------------------------ */

const CSS = `
.os9-toaster {
  position: fixed; inset: auto; z-index: 60; margin: 0; padding: 0;
  border: 0; background: transparent; overflow: visible;
  width: var(--os9-toaster-width, 356px); max-width: calc(100vw - 32px);
  height: var(--toast-front-height);
  transition: height 320ms cubic-bezier(0.23, 1, 0.32, 1);
}
.os9-toaster[data-side="bottom"] { bottom: 20px; }
.os9-toaster[data-side="top"] { top: 20px; }
.os9-toaster[data-align="end"] { right: 20px; }
.os9-toaster[data-align="start"] { left: 20px; }
.os9-toaster[data-align="center"] { left: 50%; translate: -50% 0; }
.os9-toaster[data-expanded] {
  height: calc(var(--toast-stack-height) + (var(--toast-count) - 1) * 8px);
}

.os9-toast {
  --dir: -1;
  --y: calc(var(--dir) * var(--toast-index) * 6px);
  position: absolute; inset-inline: 0; bottom: 0;
  z-index: calc(100 - var(--toast-index));
  height: var(--toast-height);
  overflow: hidden;
  translate: var(--toast-swipe-x, 0px) calc(var(--y) + var(--toast-swipe-y, 0px));
  transition:
    translate 320ms cubic-bezier(0.23, 1, 0.32, 1),
    height 320ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 200ms;
  user-select: none;
}
.os9-toaster[data-side="top"] .os9-toast { --dir: 1; bottom: auto; top: 0; }
.os9-toast:not([data-front]):not([data-expanded]) { height: var(--toast-front-height); }
.os9-toast:not([data-front]):not([data-expanded]) > * { opacity: 0; }
.os9-toast[data-expanded] {
  --y: calc(var(--dir) * (var(--toast-offset) + var(--toast-index) * 8px));
}
/* slides in from its corner; centered stacks rise from their edge */
.os9-toaster[data-align="end"] .os9-toast[data-starting-style] { translate: calc(100% + 24px) var(--y); }
.os9-toaster[data-align="start"] .os9-toast[data-starting-style] { translate: calc(-100% - 24px) var(--y); }
.os9-toaster[data-align="center"] .os9-toast[data-starting-style] {
  translate: 0 calc(var(--dir) * -1 * (100% + 24px));
}
.os9-toast[data-ending-style] { opacity: 0; transition-duration: 160ms; }
.os9-toast[data-swiping] { transition: none; }

[data-flair="classic"] .os9-toaster,
[data-flair="classic"] .os9-toast { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .os9-toaster { transition: none; }
  .os9-toast { transition: opacity 150ms; }
  .os9-toaster .os9-toast[data-starting-style] { translate: 0 var(--y); opacity: 0; }
}
`

/**
 * Title stripe painted as a background layer, so the close box can sit in
 * it without an extra element.
 */
const STRIPE_BG =
  "[background:repeating-linear-gradient(to_bottom,var(--os9-gray-600)_0_1px,transparent_1px_2px)_22px_4px/calc(100%-44px)_7px_no-repeat,var(--os9-gray-200)]"

const DEFAULT_ICONS: Partial<Record<ToastType, React.ReactNode>> = {
  success: <RetroSonnerSuccessIcon />,
  info: <RetroIconInfo />,
  warning: <RetroIconAlert />,
  error: <RetroIconStop />,
  loading: <RetroSpinner size="lg" aria-label="Loading" />,
}

/* ------------------------------------------------------------------ */
/*  RetroToaster                                                       */
/* ------------------------------------------------------------------ */

type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

type RetroToasterProps = {
  /** Which corner or edge the alerts stack in. */
  position?: ToasterPosition
  /** Keep the stack fanned out instead of only on hover and focus. */
  expand?: boolean
  /** How many alerts show at once; the rest wait their turn. */
  visibleToasts?: number
  /** How long toasts show by default, in ms. */
  duration?: number
  /** Paint the striped title bar across the top of each toast. */
  titleStripe?: boolean
  /** Show the close box in the title bar. */
  closeButton?: boolean
  /** Replace the icon for a type, like `{ success: <MyIcon /> }`. */
  icons?: Partial<Record<ToastType, React.ReactNode>>
  /** The keyboard shortcut that focuses the newest alert, or `null` for none. */
  hotkey?: string | null
  /** Show another queue than the one `toast()` adds to (from `createToaster()`). */
  toaster?: Toaster<React.ReactNode>
  /** Accessible name of the notifications region. */
  "aria-label"?: string
  className?: string
  /** Class names for every toast. */
  toastClassName?: string
}

function RetroToaster({
  position = "bottom-right",
  expand,
  visibleToasts = 3,
  duration,
  titleStripe = true,
  closeButton = true,
  icons,
  hotkey,
  toaster = retroToaster,
  "aria-label": ariaLabel = "Notifications",
  className,
  toastClassName,
}: RetroToasterProps) {
  const [side, edge] = position.split("-") as ["top" | "bottom", "left" | "center" | "right"]
  const align = edge === "left" ? "start" : edge === "right" ? "end" : "center"

  React.useEffect(() => {
    toasterDuration = duration
    return () => {
      toasterDuration = undefined
    }
  }, [duration])

  return (
    <>
      <style href="os9-toaster" precedence="default">
        {CSS}
      </style>
      <ToastRegionPrimitive
        toaster={toaster}
        side={side}
        align={align}
        maxVisible={visibleToasts}
        expanded={expand}
        {...(hotkey !== undefined ? { shortcut: hotkey } : {})}
        aria-label={ariaLabel}
        className={cn("os9-toaster", className)}
      >
        {(item: ToastData<React.ReactNode>) => {
          const custom = (item.data as { icon?: React.ReactNode } | undefined)?.icon
          const icon = custom !== undefined ? custom : { ...DEFAULT_ICONS, ...icons }[item.type]
          return (
            <ToastPrimitive
              className={cn(
                "os9-toast text-os9-black",
                "border border-os9-black bg-os9-gray-200",
                "shadow-[2px_2px_0_var(--os9-black),inset_2px_2px_0_rgba(255,255,255,0.6),inset_-2px_-2px_0_rgba(38,38,38,0.4)]",
                "font-[family-name:var(--os9-font-sans)] text-[10px]",
                "outline-none focus-visible:os9-focus-ring",
                titleStripe && STRIPE_BG,
                toastClassName
              )}
            >
              <div
                className={cn(
                  "grid grid-cols-[auto_1fr_auto_auto] items-start gap-y-[10px] p-[10px]",
                  titleStripe && "pt-[18px]"
                )}
              >
                {icon && (
                  <div className="col-start-1 row-start-1 mr-[10px] flex size-[32px] shrink-0 items-center justify-center [&>svg]:size-[32px]">
                    {icon}
                  </div>
                )}
                <div className="col-span-3 col-start-2 row-start-1 flex min-w-0 flex-col gap-[3px] self-center">
                  <ToastTitlePrimitive className="font-[family-name:var(--os9-font-heading)] text-[12px] font-bold leading-[1.2] tracking-[0.42px]" />
                  <ToastDescriptionPrimitive className="font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] text-os9-black" />
                </div>
                {item.cancel && (
                  <ToastClosePrimitive
                    action={item.cancel.onCancel}
                    className={cn(
                      retroButtonVariants({ variant: "default", size: "sm" }),
                      "col-start-3 row-start-2 mr-[8px] min-w-[58px]"
                    )}
                  >
                    {item.cancel.label}
                  </ToastClosePrimitive>
                )}
                {item.action && (
                  <ToastActionPrimitive
                    className={cn(
                      retroButtonVariants({ variant: "primary", size: "sm" }),
                      "col-start-4 row-start-2 min-w-[58px] data-pending:cursor-progress data-pending:opacity-70"
                    )}
                  />
                )}
              </div>
              {/* OS9 close box: small raised square, knocked out of the title stripe. */}
              {closeButton && item.dismissible !== false && (
                <ToastClosePrimitive
                  aria-label="Close"
                  className={cn(
                    "absolute left-[8px] top-[2px] size-[11px] cursor-default p-0",
                    "border border-os9-black bg-os9-gray-300",
                    "shadow-[0_0_0_2px_var(--os9-gray-200),inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
                    "active:bg-os9-gray-700",
                    "active:shadow-[0_0_0_2px_var(--os9-gray-200),inset_1px_1px_0_var(--os9-gray-800),inset_-1px_-1px_0_var(--os9-gray-500)]",
                    "outline-none focus-visible:os9-focus-ring"
                  )}
                />
              )}
            </ToastPrimitive>
          )
        }}
      </ToastRegionPrimitive>
    </>
  )
}

export { RetroToaster, toast, retroToaster }
export type { RetroToasterProps, RetroToastOptions, RetroToastAction, RetroToastCancel }
