"use client"

/*
 * RetroSheet: a Mac OS 9 panel that slides in from an edge of the screen, on
 * UI SDK's dialog.
 *
 * Crafted moment: the slide. The panel glides in from its side (220ms,
 * strong ease-out) and leaves faster (180ms) the way it came. Classic flair
 * and reduced motion: it appears and vanishes at once.
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
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { popupClass } from "@/registry/new-york/lib/retro-motion"

type WithClassName<P> = Omit<P, "className"> & { className?: string }

/* ------------------------------------------------------------------ */
/*  Root, Trigger & Close                                              */
/* ------------------------------------------------------------------ */

function RetroSheet(props: React.ComponentProps<typeof DialogPrimitive>) {
  return <DialogPrimitive {...props} />
}

function RetroSheetTrigger(props: React.ComponentProps<typeof DialogTriggerPrimitive>) {
  return <DialogTriggerPrimitive {...props} />
}

function RetroSheetClose(props: React.ComponentProps<typeof DialogClosePrimitive>) {
  return <DialogClosePrimitive {...props} />
}

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */

/* 220ms in, 180ms out; classic flair and reduced motion skip it */
const sheetMotion = cn(
  "duration-220 ease-[cubic-bezier(0.23,1,0.32,1)] data-ending-style:duration-180",
  "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
)

/* ------------------------------------------------------------------ */
/*  Content variants (slide from edge)                                 */
/* ------------------------------------------------------------------ */

/* Box properties carry `!` so UI SDK's popup reset can't strip them in apps
 * that haven't declared `@layer ui-sdk;` first. */
const sheetContentVariants = cva(
  [
    "fixed! z-50 m-0! p-0! flex flex-col outline-none overflow-visible!",
    "bg-os9-gray-200! text-os9-black!",
    "transition-[translate]",
    sheetMotion,
  ].join(" "),
  {
    variants: {
      side: {
        right: [
          "inset-auto! top-0! bottom-0! right-0! h-full! max-h-none! w-3/4! max-w-sm!",
          "border-0! border-l! border-os9-black!",
          "data-starting-style:translate-x-full data-ending-style:translate-x-full",
        ].join(" "),
        left: [
          "inset-auto! top-0! bottom-0! left-0! h-full! max-h-none! w-3/4! max-w-sm!",
          "border-0! border-r! border-os9-black!",
          "data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
        ].join(" "),
        top: [
          "inset-auto! top-0! left-0! right-0! w-full! max-w-none! h-auto!",
          "border-0! border-b! border-os9-black!",
          "data-starting-style:-translate-y-full data-ending-style:-translate-y-full",
        ].join(" "),
        bottom: [
          "inset-auto! bottom-0! left-0! right-0! w-full! max-w-none! h-auto!",
          "border-0! border-t! border-os9-black!",
          "data-starting-style:translate-y-full data-ending-style:translate-y-full",
        ].join(" "),
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  RetroSheetContent                                                  */
/* ------------------------------------------------------------------ */

type RetroSheetContentProps = WithClassName<React.ComponentProps<typeof DialogContentPrimitive>> &
  VariantProps<typeof sheetContentVariants>

function RetroSheetContent({ side = "right", className, style, children, ...props }: RetroSheetContentProps) {
  return (
    <>
      <DialogBackdropPrimitive
        className={cn(
          "fixed! inset-0! z-50 bg-black/40!",
          "transition-opacity data-starting-style:opacity-0 data-ending-style:opacity-0",
          sheetMotion
        )}
      />
      <DialogContentPrimitive
        className={popupClass(sheetContentVariants({ side }), className)}
        style={{
          boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.6), inset -2px -2px 0 rgba(38,38,38,0.4)",
          ...style,
        }}
        {...props}
      >
        {children}
      </DialogContentPrimitive>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Header (title-bar style with stripes & close box)                  */
/* ------------------------------------------------------------------ */

function RetroSheetHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex h-[19px] items-center bg-os9-gray-400 shrink-0",
        className
      )}
      {...props}
    >
      {/* Close box — far left */}
      <DialogClosePrimitive
        className="relative size-[13px] shrink-0 cursor-default ml-[3px] outline-none focus-visible:os9-focus-ring"
        aria-label="Close"
      >
        {/* Outer bevel frame */}
        <span
          className="absolute inset-[2px] border border-os9-black"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #9a9a9a 0%, #f1f1f1 100%)",
          }}
        />
        {/* Inner shadow overlay */}
        <span
          className="absolute inset-[2px]"
          style={{
            boxShadow:
              "inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(0,0,0,0.15)",
          }}
        />
        {/* Outer pixel frame */}
        <span
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.12)",
          }}
        />
      </DialogClosePrimitive>

      {/* Stripes left */}
      <span
        className="os9-stripes flex-1 min-w-[4px] h-[13px] ml-[4px]"
        style={{
          boxShadow: "inset 1px 0 0 #eee, inset -1px 0 0 #c5c5c5",
        }}
        aria-hidden
      />

      {/* Title (rendered via RetroSheetTitle inside children) */}
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

function RetroSheetTitle({ className, ...props }: WithClassName<React.ComponentProps<typeof DialogTitlePrimitive>>) {
  return (
    <DialogTitlePrimitive
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

function RetroSheetDescription({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof DialogDescriptionPrimitive>>) {
  return (
    <DialogDescriptionPrimitive
      className={cn(
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.3] text-os9-gray-800",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function RetroSheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-[8px] px-[16px] py-[12px]",
        className
      )}
      style={{
        borderTop: "1px solid var(--os9-black)",
        boxShadow:
          "0 -1px 0 rgba(255,255,255,0.6), 0 1px 0 rgba(38,38,38,0.15) inset",
      }}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroSheet,
  RetroSheetTrigger,
  RetroSheetContent,
  RetroSheetHeader,
  RetroSheetTitle,
  RetroSheetDescription,
  RetroSheetFooter,
  RetroSheetClose,
}

export type { RetroSheetContentProps }
