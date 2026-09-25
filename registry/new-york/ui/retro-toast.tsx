"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Toast Types                                                        */
/* ------------------------------------------------------------------ */

type ToastEntry = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
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

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

// Actions are stable, so components that only fire toasts never re-render
// when the toast list changes. The list lives in its own context.
const RetroToastContext = React.createContext<ToastContextValue | null>(null)
const RetroToastStateContext = React.createContext<ToastEntry[] | null>(null)

function useRetroToast(): ToastContextValue {
  const ctx = React.useContext(RetroToastContext)
  if (!ctx) {
    throw new Error("useRetroToast must be used within a <RetroToastProvider>")
  }
  return ctx
}

/** Reactive list of the currently visible toasts. */
function useRetroToasts(): ToastEntry[] {
  const toasts = React.useContext(RetroToastStateContext)
  if (!toasts) {
    throw new Error("useRetroToasts must be used within a <RetroToastProvider>")
  }
  return toasts
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

let counter = 0

/** setTimeout overflows above this; treat larger durations as persistent. */
const MAX_TIMEOUT = 2_147_483_647

type ToastTimer = {
  handle: ReturnType<typeof setTimeout> | null
  remaining: number
  startedAt: number
  hovered: boolean
  focused: boolean
}

function RetroToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastEntry[]>([])
  const toastsRef = React.useRef<ToastEntry[]>(toasts)
  const timersRef = React.useRef(new Map<string, ToastTimer>())

  React.useEffect(() => {
    toastsRef.current = toasts
  }, [toasts])

  const clearTimer = React.useCallback((id: string) => {
    const timer = timersRef.current.get(id)
    if (timer?.handle) clearTimeout(timer.handle)
    timersRef.current.delete(id)
  }, [])

  const dismiss = React.useCallback(
    (id: string) => {
      clearTimer(id)
      setToasts((prev) => prev.filter((t) => t.id !== id))
    },
    [clearTimer]
  )

  const runTimer = React.useCallback(
    (id: string) => {
      const timer = timersRef.current.get(id)
      if (!timer || timer.handle || timer.hovered || timer.focused) return
      timer.startedAt = Date.now()
      timer.handle = setTimeout(() => dismiss(id), timer.remaining)
    },
    [dismiss]
  )

  const pauseTimer = React.useCallback(
    (id: string, reason: "hovered" | "focused") => {
      const timer = timersRef.current.get(id)
      if (!timer) return
      timer[reason] = true
      if (timer.handle) {
        clearTimeout(timer.handle)
        timer.handle = null
        timer.remaining = Math.max(
          0,
          timer.remaining - (Date.now() - timer.startedAt)
        )
      }
    },
    []
  )

  const resumeTimer = React.useCallback(
    (id: string, reason: "hovered" | "focused") => {
      const timer = timersRef.current.get(id)
      if (!timer) return
      timer[reason] = false
      runTimer(id)
    },
    [runTimer]
  )

  const toast = React.useCallback(
    (opts: Omit<ToastEntry, "id">) => {
      const id = `retro-toast-${++counter}`
      const duration = opts.duration ?? 5000
      setToasts((prev) => [...prev, { ...opts, id, duration }])
      // Non-finite (e.g. Infinity) or huge durations = persistent toast
      if (Number.isFinite(duration) && duration <= MAX_TIMEOUT) {
        timersRef.current.set(id, {
          handle: null,
          remaining: Math.max(0, duration),
          startedAt: 0,
          hovered: false,
          focused: false,
        })
        runTimer(id)
      }
      return id
    },
    [runTimer]
  )

  // Clear all pending timers on unmount
  React.useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((timer) => {
        if (timer.handle) clearTimeout(timer.handle)
      })
      timers.clear()
    }
  }, [])

  const actions = React.useMemo<ToastContextValue>(
    () => ({
      toast,
      dismiss,
      get toasts() {
        return toastsRef.current
      },
    }),
    [toast, dismiss]
  )

  return (
    <RetroToastContext.Provider value={actions}>
      <RetroToastStateContext.Provider value={toasts}>
        {children}
        <RetroToastViewport>
          {toasts.map((t) => (
            <RetroToast
              key={t.id}
              onMouseEnter={() => pauseTimer(t.id, "hovered")}
              onMouseLeave={() => resumeTimer(t.id, "hovered")}
              onFocus={() => pauseTimer(t.id, "focused")}
              onBlur={(event) => {
                // Ignore focus moving between elements inside the toast
                if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  return
                }
                resumeTimer(t.id, "focused")
              }}
            >
              {/* Mini title bar stripe */}
              <div
                className="os9-stripes mb-[4px] h-[3px] w-full"
                style={{
                  boxShadow:
                    "inset 1px 0 0 #eee, inset -1px 0 0 #c5c5c5",
                }}
                aria-hidden
              />

              <div className="flex items-start gap-[6px]">
                <div className="flex-1 min-w-0">
                  {t.title && <RetroToastTitle>{t.title}</RetroToastTitle>}
                  {t.description && (
                    <RetroToastDescription>{t.description}</RetroToastDescription>
                  )}
                </div>
                <RetroToastClose onClick={() => dismiss(t.id)} />
              </div>
            </RetroToast>
          ))}
        </RetroToastViewport>
      </RetroToastStateContext.Provider>
    </RetroToastContext.Provider>
  )
}
RetroToastProvider.displayName = "RetroToastProvider"

/* ------------------------------------------------------------------ */
/*  RetroToastViewport                                                 */
/* ------------------------------------------------------------------ */

/**
 * Persistent live region. It is always mounted so screen readers announce
 * toasts as they are appended to the list.
 */
function RetroToastViewportInner(
  { className, ...props }: React.HTMLAttributes<HTMLOListElement>,
  ref: React.ForwardedRef<HTMLOListElement>
) {
  return (
    <div
      role="region"
      aria-label="Notifications"
      className={cn(
        "fixed bottom-0 right-0 z-50 p-[16px]",
        "pointer-events-none",
        className
      )}
    >
      <ol
        ref={ref}
        aria-live="polite"
        className="flex flex-col gap-2 list-none m-0 p-0"
        {...props}
      />
    </div>
  )
}

const RetroToastViewport = React.forwardRef(RetroToastViewportInner)
RetroToastViewport.displayName = "RetroToastViewport"

/* ------------------------------------------------------------------ */
/*  RetroToast                                                         */
/* ------------------------------------------------------------------ */

function RetroToastInner(
  { className, ...props }: React.HTMLAttributes<HTMLLIElement>,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  return (
    <li
      ref={ref}
      className={cn(
        "pointer-events-auto w-[300px] p-[8px]",
        "border border-os9-black bg-os9-gray-200",
        "shadow-[2px_2px_0_var(--os9-black),inset_2px_2px_0_rgba(255,255,255,0.6),inset_-2px_-2px_0_rgba(38,38,38,0.4)]",
        "animate-in slide-in-from-right-full fade-in-0 duration-200",
        className
      )}
      {...props}
    />
  )
}

const RetroToast = React.forwardRef(RetroToastInner)
RetroToast.displayName = "RetroToast"

/* ------------------------------------------------------------------ */
/*  RetroToastTitle                                                    */
/* ------------------------------------------------------------------ */

function RetroToastTitleInner(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "font-[family-name:var(--os9-font-heading)] text-[12px] font-bold leading-[1.2] tracking-[0.42px] text-os9-black",
        className
      )}
      {...props}
    />
  )
}

const RetroToastTitle = React.forwardRef(RetroToastTitleInner)
RetroToastTitle.displayName = "RetroToastTitle"

/* ------------------------------------------------------------------ */
/*  RetroToastDescription                                              */
/* ------------------------------------------------------------------ */

function RetroToastDescriptionInner(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] mt-[2px] text-os9-black",
        className
      )}
      {...props}
    />
  )
}

const RetroToastDescription = React.forwardRef(RetroToastDescriptionInner)
RetroToastDescription.displayName = "RetroToastDescription"

/* ------------------------------------------------------------------ */
/*  RetroToastClose                                                    */
/* ------------------------------------------------------------------ */

function RetroToastCloseInner(
  { className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Close"
      className={cn(
        "relative size-[13px] shrink-0 cursor-default",
        className
      )}
      {...props}
    >
      {/* Bevel frame */}
      <span
        className="absolute inset-[2px] border border-os9-black"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #9a9a9a 0%, #f1f1f1 100%)",
        }}
      />
      {/* Inner shadow */}
      <span
        className="absolute inset-[2px]"
        style={{
          boxShadow:
            "inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(0,0,0,0.15)",
        }}
      />
      {/* Outer pixel highlights */}
      <span
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.12)",
        }}
      />
    </button>
  )
}

const RetroToastClose = React.forwardRef(RetroToastCloseInner)
RetroToastClose.displayName = "RetroToastClose"

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
