"use client"

/*
 * RetroDialog: a Mac OS 9 movable-modal window on UI SDK.
 *
 * Crafted moment: zoom rects. The window grows out of the button that opened
 * it as a trail of outlines, then appears; closing flies the outlines back to
 * the button, as the Finder did. Modern flair eases the rects, classic steps
 * them, reduced motion skips them.
 *
 * No dimmed backdrop: OS 9 never darkened the desktop behind a window.
 */

import * as React from "react"
import {
  Dialog as DialogPrimitive,
  DialogBackdrop as DialogBackdropPrimitive,
  DialogClose as DialogClosePrimitive,
  DialogContent as DialogContentPrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogTitle as DialogTitlePrimitive,
  DialogTrigger as DialogTriggerPrimitive,
} from "@ui-sdk/react/dialog"

import { cn } from "@/lib/utils"
import { ZOOM_CONTENT_CLASS, popupClass, useMergedRef, useZoomRects } from "@/registry/new-york/lib/retro-motion"

type ZoomContextValue = ReturnType<typeof useZoomRects>

const ZoomContext = React.createContext<ZoomContextValue | null>(null)

function useZoom() {
  const ctx = React.useContext(ZoomContext)
  if (!ctx) throw new Error("RetroDialog parts must be inside <RetroDialog>")
  return ctx
}

function RetroDialog({ onOpenChange, ...props }: React.ComponentProps<typeof DialogPrimitive>) {
  const zoom = useZoomRects()
  return (
    <ZoomContext.Provider value={zoom}>
      <DialogPrimitive
        onOpenChange={(open, details) => {
          onOpenChange?.(open, details)
          /* closing: the window vanishes at once and the rects fly home */
          zoom.onOpenChange(open)
        }}
        {...props}
      />
    </ZoomContext.Provider>
  )
}

function RetroDialogTrigger({ ref, ...props }: React.ComponentProps<typeof DialogTriggerPrimitive>) {
  const { triggerRef } = useZoom()
  return <DialogTriggerPrimitive ref={useMergedRef(ref, triggerRef)} {...props} />
}

function RetroDialogClose(props: React.ComponentProps<typeof DialogClosePrimitive>) {
  return <DialogClosePrimitive {...props} />
}

/* Box properties carry `!` so UI SDK's popup reset can't strip them in apps
 * that haven't declared `@layer ui-sdk;` first. */
const retroDialogContentClass = cn(
  "fixed! inset-auto! left-1/2! top-1/2! m-0! p-0! w-[calc(100%-2rem)]! max-w-[425px]! h-auto! max-h-[calc(100dvh-2rem)]!",
  "-translate-x-1/2 -translate-y-1/2 flex flex-col outline-none overflow-visible!",
  "border! border-os9-black! bg-os9-gray-200! text-os9-black! shadow-[var(--os9-shadow-window)]"
)

function RetroDialogContent({
  className,
  children,
  ref,
  ...props
}: Omit<React.ComponentProps<typeof DialogContentPrimitive>, "className"> & {
  className?: string
}) {
  const { contentRef } = useZoom()
  return (
    <>
      {/* OS 9 never dimmed the desktop behind a window */}
      <DialogBackdropPrimitive className="fixed! inset-0! z-50 bg-transparent!" />
      <DialogContentPrimitive
        ref={useMergedRef(ref, contentRef)}
        className={popupClass(
          cn(
            "z-50",
            retroDialogContentClass,
            /* appear in one frame once the zoom rects land; vanish at once on close */
            ZOOM_CONTENT_CLASS
          ),
          className
        )}
        {...props}
      >
        {children}
      </DialogContentPrimitive>
    </>
  )
}

const stripes = "os9-stripes flex-1 min-w-[4px] h-[13px]"
const stripeShadow = { boxShadow: "inset 1px 0 0 #eee, inset -1px 0 0 #c5c5c5" }

function RetroDialogHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative flex h-[19px] items-center bg-os9-gray-400", className)} {...props}>
      <span className={cn(stripes, "ml-[4px]")} style={stripeShadow} aria-hidden />
      {children}
      <span className={stripes} style={stripeShadow} aria-hidden />
      <DialogClosePrimitive
        className="relative size-[13px] shrink-0 cursor-default mx-[4px] outline-none focus-visible:os9-focus-ring"
        aria-label="Close"
      >
        <span
          className="absolute inset-[2px] border border-os9-black"
          style={{ backgroundImage: "linear-gradient(135deg, #9a9a9a 0%, #f1f1f1 100%)" }}
        />
        <span
          className="absolute inset-[2px]"
          style={{ boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(0,0,0,0.15)" }}
        />
      </DialogClosePrimitive>
    </div>
  )
}

function RetroDialogTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DialogTitlePrimitive>, "className"> & { className?: string }) {
  return (
    <DialogTitlePrimitive
      className={cn(
        "shrink-0 whitespace-nowrap px-[4px] text-[12px] tracking-[0.42px] leading-[0.98]",
        "font-[family-name:var(--os9-font-heading)] text-os9-black",
        "max-w-[60%] overflow-hidden text-ellipsis",
        className
      )}
      {...props}
    />
  )
}

function RetroDialogDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DialogDescriptionPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <DialogDescriptionPrimitive
      className={cn("text-[10px] font-[family-name:var(--os9-font-sans)] text-os9-gray-700", className)}
      {...props}
    />
  )
}

function RetroDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-row justify-end gap-2", className)} {...props} />
}

export {
  retroDialogContentClass,
  RetroDialog,
  RetroDialogTrigger,
  RetroDialogContent,
  RetroDialogHeader,
  RetroDialogTitle,
  RetroDialogDescription,
  RetroDialogFooter,
  RetroDialogClose,
}
