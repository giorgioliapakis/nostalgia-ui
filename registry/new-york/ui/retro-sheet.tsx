"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Root & Trigger (pass-through)                                      */
/* ------------------------------------------------------------------ */

const RetroSheet = DialogPrimitive.Root

const RetroSheetTrigger = DialogPrimitive.Trigger

const RetroSheetClose = DialogPrimitive.Close

const RetroSheetPortal = DialogPrimitive.Portal

/* ------------------------------------------------------------------ */
/*  Overlay                                                            */
/* ------------------------------------------------------------------ */

const RetroSheetOverlay = React.forwardRef<
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
RetroSheetOverlay.displayName = "RetroSheetOverlay"

/* ------------------------------------------------------------------ */
/*  Content variants (slide from edge)                                 */
/* ------------------------------------------------------------------ */

const sheetContentVariants = cva(
  [
    "fixed z-50 flex flex-col outline-none",
    "bg-os9-gray-200",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
  ].join(" "),
  {
    variants: {
      side: {
        right: [
          "inset-y-0 right-0 h-full w-3/4 max-w-sm",
          "border-l border-os9-black",
          "data-[state=open]:slide-in-from-right",
          "data-[state=closed]:slide-out-to-right",
        ].join(" "),
        left: [
          "inset-y-0 left-0 h-full w-3/4 max-w-sm",
          "border-r border-os9-black",
          "data-[state=open]:slide-in-from-left",
          "data-[state=closed]:slide-out-to-left",
        ].join(" "),
        top: [
          "inset-x-0 top-0 w-full h-auto",
          "border-b border-os9-black",
          "data-[state=open]:slide-in-from-top",
          "data-[state=closed]:slide-out-to-top",
        ].join(" "),
        bottom: [
          "inset-x-0 bottom-0 w-full h-auto",
          "border-t border-os9-black",
          "data-[state=open]:slide-in-from-bottom",
          "data-[state=closed]:slide-out-to-bottom",
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

interface RetroSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetContentVariants> {}

const RetroSheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  RetroSheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <RetroSheetPortal>
    <RetroSheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(sheetContentVariants({ side }), className)}
      style={{
        boxShadow:
          "inset 2px 2px 0 rgba(255,255,255,0.6), inset -2px -2px 0 rgba(38,38,38,0.4)",
      }}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </RetroSheetPortal>
))
RetroSheetContent.displayName = "RetroSheetContent"

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
      <DialogPrimitive.Close
        className="relative size-[13px] shrink-0 cursor-default ml-[3px]"
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
RetroSheetHeader.displayName = "RetroSheetHeader"

/* ------------------------------------------------------------------ */
/*  Title                                                              */
/* ------------------------------------------------------------------ */

const RetroSheetTitle = React.forwardRef<
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
RetroSheetTitle.displayName = "RetroSheetTitle"

/* ------------------------------------------------------------------ */
/*  Description                                                        */
/* ------------------------------------------------------------------ */

const RetroSheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "font-[family-name:var(--font-sans)] text-[10px] leading-[1.3] text-os9-gray-800",
      className
    )}
    {...props}
  />
))
RetroSheetDescription.displayName = "RetroSheetDescription"

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
RetroSheetFooter.displayName = "RetroSheetFooter"

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
