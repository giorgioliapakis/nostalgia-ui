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

type ToastContextValue = {
  toasts: ToastEntry[]
  toast: (opts: Omit<ToastEntry, "id">) => string
  dismiss: (id: string) => void
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const RetroToastContext = React.createContext<ToastContextValue | null>(null)

function useRetroToast(): ToastContextValue {
  const ctx = React.useContext(RetroToastContext)
  if (!ctx) {
    throw new Error("useRetroToast must be used within a <RetroToastProvider>")
  }
  return ctx
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

let counter = 0

function RetroToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastEntry[]>([])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = React.useCallback(
    (opts: Omit<ToastEntry, "id">) => {
      const id = `retro-toast-${++counter}`
      const duration = opts.duration ?? 5000
      setToasts((prev) => [...prev, { ...opts, id, duration }])
      setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss]
  )

  const value = React.useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss]
  )

  return (
    <RetroToastContext.Provider value={value}>
      {children}
      <RetroToastViewport>
        {toasts.map((t) => (
          <RetroToast key={t.id}>
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
    </RetroToastContext.Provider>
  )
}
RetroToastProvider.displayName = "RetroToastProvider"

/* ------------------------------------------------------------------ */
/*  RetroToastViewport                                                 */
/* ------------------------------------------------------------------ */

function RetroToastViewportInner(
  { className, ...props }: React.HTMLAttributes<HTMLOListElement>,
  ref: React.ForwardedRef<HTMLOListElement>
) {
  return (
    <ol
      ref={ref}
      className={cn(
        "fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-[16px]",
        "pointer-events-none",
        className
      )}
      {...props}
    />
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
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-auto w-[300px] p-[8px]",
        "border border-os9-black bg-os9-gray-200",
        "animate-in slide-in-from-right-full fade-in-0 duration-200",
        className
      )}
      style={{
        boxShadow:
          "2px 2px 0 var(--os9-black), inset 2px 2px 0 rgba(255,255,255,0.6), inset -2px -2px 0 rgba(38,38,38,0.4)",
      }}
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
        "font-[family-name:var(--font-heading)] text-[12px] font-bold leading-[1.2] tracking-[0.42px] text-os9-black",
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
        "font-[family-name:var(--font-sans)] text-[10px] leading-[1.4] mt-[2px] text-os9-black",
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
}
