"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Root & Trigger (pass-through)                                      */
/* ------------------------------------------------------------------ */

const RetroDialog = DialogPrimitive.Root

const RetroDialogTrigger = DialogPrimitive.Trigger

const RetroDialogClose = DialogPrimitive.Close

const RetroDialogPortal = DialogPrimitive.Portal

/* ------------------------------------------------------------------ */
/*  Overlay                                                            */
/* ------------------------------------------------------------------ */

const RetroDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
))
RetroDialogOverlay.displayName = "RetroDialogOverlay"

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const RetroDialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <RetroDialogPortal>
    <RetroDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-[425px] -translate-x-1/2 -translate-y-1/2",
        "flex flex-col",
        "outline-none",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      style={{
        border: "1px solid var(--os9-black)",
        backgroundColor: "var(--os9-gray-200)",
        boxShadow:
          "2px 2px 0 var(--os9-black), inset 2px 2px 0 rgba(255,255,255,0.6), inset -2px -2px 0 rgba(38,38,38,0.4)",
      }}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </RetroDialogPortal>
))
RetroDialogContent.displayName = "RetroDialogContent"

/* ------------------------------------------------------------------ */
/*  Header (title-bar style)                                           */
/* ------------------------------------------------------------------ */

function RetroDialogHeader({
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

      {/* Title (rendered via RetroDialogTitle inside children) */}
      {children}

      {/* Stripes right */}
      <span
        className="os9-stripes flex-1 min-w-[4px] h-[13px]"
        style={{
          boxShadow: "inset 1px 0 0 #eee, inset -1px 0 0 #c5c5c5",
        }}
        aria-hidden
      />

      {/* Close button (X) — small bevel box */}
      <DialogPrimitive.Close
        className="relative size-[13px] shrink-0 cursor-default mr-[4px] ml-[4px]"
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
      </DialogPrimitive.Close>
    </div>
  )
}
RetroDialogHeader.displayName = "RetroDialogHeader"

/* ------------------------------------------------------------------ */
/*  Title                                                              */
/* ------------------------------------------------------------------ */

const RetroDialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "shrink-0 whitespace-nowrap text-[12px] tracking-[0.42px] leading-[0.98]",
      "font-[family-name:var(--font-heading)] text-os9-black",
      "max-w-[60%] overflow-hidden text-ellipsis",
      "px-[4px]",
      className
    )}
    {...props}
  />
))
RetroDialogTitle.displayName = "RetroDialogTitle"

/* ------------------------------------------------------------------ */
/*  Description                                                        */
/* ------------------------------------------------------------------ */

const RetroDialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-[10px] font-[family-name:var(--font-body)] text-os9-gray-700",
      className
    )}
    {...props}
  />
))
RetroDialogDescription.displayName = "RetroDialogDescription"

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function RetroDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-row justify-end gap-2", className)}
      {...props}
    />
  )
}
RetroDialogFooter.displayName = "RetroDialogFooter"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroDialog,
  RetroDialogTrigger,
  RetroDialogContent,
  RetroDialogHeader,
  RetroDialogTitle,
  RetroDialogDescription,
  RetroDialogFooter,
  RetroDialogClose,
}
