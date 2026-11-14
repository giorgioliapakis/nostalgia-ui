"use client"

/*
 * RetroToast: small OS 9 notification windows in the bottom-right corner, on
 * UI SDK's Toast. Wrap the app in <RetroToastProvider>, then call
 * `useRetroToast().toast({ title, description })`. Timers pause while the
 * pointer or focus is on a toast, a toast swipes away to the right, Escape
 * closes the focused one, and F6 jumps to the newest from the keyboard.
 *
 * Crafted moment: the column settles. A new toast slides in from the right
 * edge (200ms, strong ease-out); when one closes it fades and the toasts
 * above it glide down into the gap instead of jumping. Classic flair: toasts
 * simply appear and the column snaps. Reduced motion: fades only.
 *
 * For sonner-style toast() calls, typed alerts and Undo, use retro-sonner.
 */

import * as React from "react"
import {
  Toast as ToastPrimitive,
  ToastClose as ToastClosePrimitive,
  ToastDescription as ToastDescriptionPrimitive,
  ToastRegion as ToastRegionPrimitive,
  ToastTitle as ToastTitlePrimitive,
  createToaster,
  type ToastData,
  type Toaster,
} from "@ui-sdk/react/toast"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Toast Types                                                        */
/* ------------------------------------------------------------------ */

type ToastEntry = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  /** How long it shows, in ms. `Infinity` keeps it until it's closed. Default 5000. */
  duration?: number
}

type ToastActions = {
  toast: (opts: Omit<ToastEntry, "id">) => string
  dismiss: (id: string) => void
}

type ToastContextValue = ToastActions & {
  /**
   * Snapshot of the current toasts (read at access time). Reading it does not
   * subscribe the component to updates — use `useRetroToasts()` for that.
   */
  readonly toasts: ToastEntry[]
}

type RetroToaster = Toaster<React.ReactNode>

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

// Actions are stable, so components that only fire toasts never re-render
// when the toast list changes. The list is read with useRetroToasts().
const RetroToastContext = React.createContext<
  (ToastContextValue & { toaster: RetroToaster }) | null
>(null)

function useToastContext(hook: string) {
  const ctx = React.useContext(RetroToastContext)
  if (!ctx) throw new Error(`${hook} must be used within a <RetroToastProvider>`)
  return ctx
}

function useRetroToast(): ToastContextValue {
  return useToastContext("useRetroToast")
}

const toEntries = (items: readonly ToastData<React.ReactNode>[]): ToastEntry[] =>
  /* UI SDK keeps newest first; the list reads oldest first, as before */
  items
    .map(({ id, title, description, duration }) => ({ id, title, description, duration }))
    .reverse()

/** Reactive list of the currently visible toasts, oldest first. */
function useRetroToasts(): ToastEntry[] {
  const { toaster } = useToastContext("useRetroToasts")
  const subscribe = React.useCallback((fn: () => void) => toaster.subscribe(fn), [toaster])
  const snapshot = React.useCallback(() => toaster.toasts(), [toaster])
  const items = React.useSyncExternalStore(subscribe, snapshot, snapshot)
  return React.useMemo(() => toEntries(items), [items])
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

function RetroToastProvider({ children }: { children: React.ReactNode }) {
  const [toaster] = React.useState(() => createToaster<React.ReactNode>({ duration: 5000 }))

  React.useEffect(() => () => void toaster.dismiss(), [toaster])

  const value = React.useMemo(
    () => ({
      toaster,
      toast: ({ title, description, duration }: Omit<ToastEntry, "id">) =>
        toaster({ title, description, ...(duration !== undefined ? { duration } : {}) }),
      dismiss: (id: string) => toaster.dismiss(id),
      get toasts() {
        return toEntries(toaster.toasts())
      },
    }),
    [toaster]
  )

  return (
    <RetroToastContext.Provider value={value}>
      {children}
      <RetroToastViewport />
    </RetroToastContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroToastViewport                                                 */
/* ------------------------------------------------------------------ */

/* A column in the corner, always laid out (UI SDK's expanded stack), so a
 * closing toast's neighbours can glide into its place. */
const CSS = `
.os9-toast-column {
  position: fixed; inset: auto; right: 16px; bottom: 16px; z-index: 50;
  margin: 0; padding: 0; border: 0; background: transparent; overflow: visible;
  width: 300px; max-width: calc(100vw - 32px);
  height: calc(var(--toast-stack-height) + (var(--toast-count) - 1) * 8px);
}
.os9-toast-column > ol, .os9-toast-column > ul { margin: 0; padding: 0; list-style: none; }
.os9-toast-column [data-slot="toast"] {
  position: absolute; inset-inline: 0; bottom: 0;
  height: var(--toast-height);
  translate: var(--toast-swipe-x, 0px) calc(-1 * (var(--toast-offset) + var(--toast-index) * 8px));
  transition:
    translate 240ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 200ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
}
.os9-toast-column [data-slot="toast"][data-starting-style] {
  translate: calc(100% + 24px) calc(-1 * (var(--toast-offset) + var(--toast-index) * 8px));
  opacity: 0;
}
.os9-toast-column [data-slot="toast"][data-ending-style] { opacity: 0; transition-duration: 150ms; }
.os9-toast-column [data-slot="toast"][data-swiping] { transition: none; }
[data-flair="classic"] .os9-toast-column [data-slot="toast"] { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .os9-toast-column [data-slot="toast"] { transition: opacity 150ms; }
  .os9-toast-column [data-slot="toast"][data-starting-style] {
    translate: 0 calc(-1 * (var(--toast-offset) + var(--toast-index) * 8px));
  }
}
`

type RetroToastViewportProps = {
  className?: string
  /** Accessible name of the region. */
  "aria-label"?: string
  /** Renders each toast; defaults to the standard OS 9 toast. */
  children?: (toast: ToastData<React.ReactNode>) => React.ReactNode
  /** The queue to show; defaults to the provider's. */
  toaster?: RetroToaster
}

function DefaultToast() {
  return (
    <RetroToast>
      {/* Mini title bar stripe */}
      <div
        className="os9-stripes mb-[4px] h-[3px] w-full"
        style={{ boxShadow: "inset 1px 0 0 #eee, inset -1px 0 0 #c5c5c5" }}
        aria-hidden
      />
      <div className="flex items-start gap-[6px]">
        <div className="min-w-0 flex-1">
          <RetroToastTitle />
          <RetroToastDescription />
        </div>
        <RetroToastClose />
      </div>
    </RetroToast>
  )
}

/**
 * The notifications region. It is always mounted, so screen readers announce
 * toasts as they arrive. <RetroToastProvider> renders one for you.
 */
function RetroToastViewport({
  className,
  "aria-label": ariaLabel = "Notifications",
  children,
  toaster,
}: RetroToastViewportProps) {
  const ctx = React.useContext(RetroToastContext)
  const queue = toaster ?? ctx?.toaster
  if (!queue) throw new Error("RetroToastViewport needs a `toaster` or a <RetroToastProvider>")
  return (
    <>
      <style href="os9-toast-column" precedence="default">
        {CSS}
      </style>
      <ToastRegionPrimitive
        toaster={queue}
        side="bottom"
        align="end"
        maxVisible={5}
        expanded
        aria-label={ariaLabel}
        className={cn("os9-toast-column", className)}
      >
        {(item) => (children ? children(item) : <DefaultToast />)}
      </ToastRegionPrimitive>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroToast                                                         */
/* ------------------------------------------------------------------ */

function RetroToast({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToastPrimitive>, "className"> & { className?: string }) {
  return (
    <ToastPrimitive
      className={cn(
        "pointer-events-auto w-full p-[8px] text-os9-black",
        "border border-os9-black bg-os9-gray-200",
        "shadow-[2px_2px_0_var(--os9-black),inset_2px_2px_0_rgba(255,255,255,0.6),inset_-2px_-2px_0_rgba(38,38,38,0.4)]",
        "outline-none focus-visible:os9-focus-ring",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroToastTitle / RetroToastDescription                            */
/*  Empty, they show the toast's own title and description.            */
/* ------------------------------------------------------------------ */

function RetroToastTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToastTitlePrimitive>, "className"> & { className?: string }) {
  return (
    <ToastTitlePrimitive
      className={cn(
        "font-[family-name:var(--os9-font-heading)] text-[12px] font-bold leading-[1.2] tracking-[0.42px] text-os9-black",
        className
      )}
      {...props}
    />
  )
}

function RetroToastDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToastDescriptionPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ToastDescriptionPrimitive
      className={cn(
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] mt-[2px] text-os9-black",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroToastClose: the OS 9 close box                                */
/* ------------------------------------------------------------------ */

function RetroToastClose({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToastClosePrimitive>, "className" | "children"> & {
  className?: string
}) {
  return (
    <ToastClosePrimitive
      aria-label="Close"
      className={cn(
        "relative size-[13px] shrink-0 cursor-default p-0 outline-none",
        "focus-visible:os9-focus-ring",
        className
      )}
      {...props}
    >
      {/* Bevel frame */}
      <span
        className="absolute inset-[2px] border border-os9-black"
        style={{ backgroundImage: "linear-gradient(135deg, #9a9a9a 0%, #f1f1f1 100%)" }}
      />
      {/* Inner shadow */}
      <span
        className="absolute inset-[2px]"
        style={{
          boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(0,0,0,0.15)",
        }}
      />
      {/* Outer pixel highlights */}
      <span
        className="absolute inset-0"
        style={{
          boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.12)",
        }}
      />
    </ToastClosePrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroToastProvider,
  RetroToast,
  RetroToastTitle,
  RetroToastDescription,
  RetroToastClose,
  RetroToastViewport,
  useRetroToast,
  useRetroToasts,
}
export type { ToastEntry, RetroToastViewportProps }
