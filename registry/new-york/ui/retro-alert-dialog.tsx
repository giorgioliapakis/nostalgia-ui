"use client"

/*
 * RetroAlertDialog: a Mac OS 9 alert (Caution / Stop / Note) on UI SDK.
 *
 * Crafted moment: zoom rects. The alert grows out of the button that raised
 * it as a trail of outlines, then appears; answering it flies the outlines
 * back. Modern flair eases the rects, classic steps them, reduced motion
 * skips them.
 *
 * No dimmed backdrop: OS 9 never darkened the desktop behind a window. An
 * outside click leaves the alert open; Escape and the buttons answer it.
 */

import * as React from "react"
import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogBackdrop as AlertDialogBackdropPrimitive,
  AlertDialogClose as AlertDialogClosePrimitive,
  AlertDialogContent as AlertDialogContentPrimitive,
  AlertDialogDescription as AlertDialogDescriptionPrimitive,
  AlertDialogTitle as AlertDialogTitlePrimitive,
  AlertDialogTrigger as AlertDialogTriggerPrimitive,
} from "@ui-sdk/react/alert-dialog"

import { cn } from "@/lib/utils"
import { ZOOM_CONTENT_CLASS, popupClass, useMergedRef, useZoomRects } from "@/registry/new-york/lib/retro-motion"
import {
  RetroIconAlert,
  RetroIconInfo,
  RetroIconStop,
} from "@/registry/new-york/ui/retro-icons"

type WithClassName<P> = Omit<P, "className"> & { className?: string }

/* ------------------------------------------------------------------ */
/*  Root & Trigger                                                     */
/* ------------------------------------------------------------------ */

type ZoomContextValue = ReturnType<typeof useZoomRects>

const ZoomContext = React.createContext<ZoomContextValue | null>(null)

function useZoom() {
  const ctx = React.useContext(ZoomContext)
  if (!ctx) throw new Error("RetroAlertDialog parts must be inside <RetroAlertDialog>")
  return ctx
}

function RetroAlertDialog({ onOpenChange, ...props }: React.ComponentProps<typeof AlertDialogPrimitive>) {
  const zoom = useZoomRects()
  return (
    <ZoomContext.Provider value={zoom}>
      <AlertDialogPrimitive
        onOpenChange={(open, details) => {
          onOpenChange?.(open, details)
          /* closing: the alert vanishes at once and the rects fly home */
          zoom.onOpenChange(open)
        }}
        {...props}
      />
    </ZoomContext.Provider>
  )
}

function RetroAlertDialogTrigger({ ref, ...props }: React.ComponentProps<typeof AlertDialogTriggerPrimitive>) {
  const { triggerRef } = useZoom()
  return <AlertDialogTriggerPrimitive ref={useMergedRef(ref, triggerRef)} {...props} />
}

/* ------------------------------------------------------------------ */
/*  Alert icons (Caution / Stop / Note)                                */
/* ------------------------------------------------------------------ */

type RetroAlertDialogVariant = "caution" | "stop" | "note"

const alertIcons: Record<
  RetroAlertDialogVariant,
  React.ComponentType<{ className?: string }>
> = {
  caution: RetroIconAlert,
  stop: RetroIconStop,
  note: RetroIconInfo,
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

function RetroAlertDialogContent({
  className,
  children,
  ref,
  ...props
}: WithClassName<React.ComponentProps<typeof AlertDialogContentPrimitive>>) {
  const { contentRef } = useZoom()
  return (
    <>
      {/* OS 9 never dimmed the desktop behind a window */}
      <AlertDialogBackdropPrimitive className="fixed! inset-0! z-50 bg-transparent!" />
      <AlertDialogContentPrimitive
        ref={useMergedRef(ref, contentRef)}
        className={popupClass(
          cn(
            /* Box properties carry `!` so UI SDK's popup reset can't strip them
             * in apps that haven't declared `@layer ui-sdk;` first. */
            "fixed! inset-auto! left-1/2! top-1/2! z-50 m-0! p-0! w-[calc(100%-2rem)]! max-w-[420px]! h-auto! max-h-[calc(100dvh-2rem)]!",
            "-translate-x-1/2 -translate-y-1/2 flex flex-col outline-none overflow-visible!",
            /* OS9 window frame */
            "border! border-os9-black! bg-os9-gray-200! text-os9-black! shadow-[var(--os9-shadow-window)]",
            /* appear in one frame once the zoom rects land; vanish at once on close */
            ZOOM_CONTENT_CLASS
          ),
          className
        )}
        {...props}
      >
        {children}
      </AlertDialogContentPrimitive>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Header (OS9 title bar style)                                       */
/* ------------------------------------------------------------------ */

function RetroAlertDialogHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex h-[19px] items-center bg-os9-gray-400",
        className
      )}
      {...props}
    >
      {/* Stripes left */}
      <span
        className="os9-stripes flex-1 min-w-[4px] h-[13px] ml-[4px]"
        style={{
          boxShadow: "inset 1px 0 0 #eee, inset -1px 0 0 #c5c5c5",
        }}
        aria-hidden
      />

      {/* Title (rendered via RetroAlertDialogTitle inside children) */}
      {children}

      {/* Stripes right */}
      <span
        className="os9-stripes flex-1 min-w-[4px] h-[13px] mr-[4px]"
        style={{
          boxShadow: "inset 1px 0 0 #eee, inset -1px 0 0 #c5c5c5",
        }}
        aria-hidden
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Title                                                              */
/* ------------------------------------------------------------------ */

function RetroAlertDialogTitle({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof AlertDialogTitlePrimitive>>) {
  return (
    <AlertDialogTitlePrimitive
      className={cn(
        "shrink-0 whitespace-nowrap text-[12px] tracking-[0.42px] leading-[0.98]",
        "font-[family-name:var(--os9-font-heading)] text-os9-black",
        "max-w-[60%] overflow-hidden text-ellipsis",
        "px-[4px]",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Description                                                        */
/* ------------------------------------------------------------------ */

function RetroAlertDialogDescription({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof AlertDialogDescriptionPrimitive>>) {
  return (
    <AlertDialogDescriptionPrimitive
      className={cn(
        "text-[10px] leading-[1.4] text-os9-black",
        "font-[family-name:var(--os9-font-sans)]",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Body (content area with icon + description)                        */
/* ------------------------------------------------------------------ */

interface RetroAlertDialogBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Which OS9 alert icon to show: caution (default), stop, or note. */
  variant?: RetroAlertDialogVariant
  /** Custom icon — overrides the variant icon. Pass `null` to hide it. */
  icon?: React.ReactNode
}

function RetroAlertDialogBody({
  className,
  children,
  variant = "caution",
  icon,
  ...props
}: RetroAlertDialogBodyProps) {
  const Icon = alertIcons[variant]
  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3 shadow-[-1px_-1px_0_rgba(38,38,38,0.4)]",
        className
      )}
      {...props}
    >
      {/* Alert icon area */}
      {icon !== null && (
        <div className="flex-shrink-0 pt-0.5">
          {icon !== undefined ? icon : <Icon />}
        </div>
      )}
      {/* Description content */}
      <div className="flex-1 flex flex-col justify-center">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function RetroAlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-4 pb-3",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Action & Cancel                                                    */
/* ------------------------------------------------------------------ */

const alertButtonClass = cn(
  "inline-flex items-center justify-center whitespace-nowrap",
  "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
  "cursor-pointer select-none transition-none",
  "h-[24px] px-4 py-0",
  "bg-os9-gray-300 text-os9-black",
  "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
  "active:bg-os9-gray-800 active:text-os9-white",
  "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
  "data-pending:cursor-progress",
  "focus-visible:os9-focus-ring"
)

/** The default answer: a heavy 2px border, and it reports `value="confirm"`. */
function RetroAlertDialogAction({
  className,
  value = "confirm",
  ...props
}: WithClassName<React.ComponentProps<typeof AlertDialogClosePrimitive>>) {
  return (
    <AlertDialogClosePrimitive
      value={value}
      className={cn(alertButtonClass, "border-[2px] border-os9-black", className)}
      {...props}
    />
  )
}

function RetroAlertDialogCancel({
  className,
  value = "cancel",
  ...props
}: WithClassName<React.ComponentProps<typeof AlertDialogClosePrimitive>>) {
  return (
    <AlertDialogClosePrimitive
      value={value}
      className={cn(alertButtonClass, "border border-os9-black", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroAlertDialog,
  RetroAlertDialogTrigger,
  RetroAlertDialogContent,
  RetroAlertDialogHeader,
  RetroAlertDialogTitle,
  RetroAlertDialogDescription,
  RetroAlertDialogBody,
  RetroAlertDialogFooter,
  RetroAlertDialogAction,
  RetroAlertDialogCancel,
}

export type { RetroAlertDialogVariant, RetroAlertDialogBodyProps }
