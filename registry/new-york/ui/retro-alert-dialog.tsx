"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Root & Trigger                                                     */
/* ------------------------------------------------------------------ */

const RetroAlertDialog = AlertDialogPrimitive.Root

const RetroAlertDialogTrigger = AlertDialogPrimitive.Trigger

/* ------------------------------------------------------------------ */
/*  Portal + Overlay                                                   */
/* ------------------------------------------------------------------ */

const RetroAlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
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
RetroAlertDialogOverlay.displayName = "RetroAlertDialogOverlay"

/* ------------------------------------------------------------------ */
/*  OS9 Caution Icon (yellow triangle with "!")                        */
/* ------------------------------------------------------------------ */

function CautionIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Yellow triangle */}
      <path
        d="M16 2L1 29h30L16 2z"
        fill="#FFD600"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Exclamation mark body */}
      <rect x="14.5" y="10" width="3" height="11" rx="0.5" fill="#000" />
      {/* Exclamation mark dot */}
      <rect x="14.5" y="23" width="3" height="3" rx="0.5" fill="#000" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const RetroAlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <RetroAlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2",
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
    </AlertDialogPrimitive.Content>
  </AlertDialogPrimitive.Portal>
))
RetroAlertDialogContent.displayName = "RetroAlertDialogContent"

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
RetroAlertDialogHeader.displayName = "RetroAlertDialogHeader"

/* ------------------------------------------------------------------ */
/*  Title                                                              */
/* ------------------------------------------------------------------ */

const RetroAlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
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
RetroAlertDialogTitle.displayName = "RetroAlertDialogTitle"

/* ------------------------------------------------------------------ */
/*  Description                                                        */
/* ------------------------------------------------------------------ */

const RetroAlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-[10px] leading-[1.4] text-os9-black",
      "font-[family-name:var(--font-body)]",
      className
    )}
    {...props}
  />
))
RetroAlertDialogDescription.displayName = "RetroAlertDialogDescription"

/* ------------------------------------------------------------------ */
/*  Body (content area with icon + description)                        */
/* ------------------------------------------------------------------ */

function RetroAlertDialogBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex gap-3 px-4 py-3", className)}
      style={{
        boxShadow: "-1px -1px 0 rgba(38,38,38,0.4)",
      }}
      {...props}
    >
      {/* Caution icon area */}
      <div className="flex-shrink-0 pt-0.5">
        <CautionIcon />
      </div>
      {/* Description content */}
      <div className="flex-1 flex flex-col justify-center">{children}</div>
    </div>
  )
}
RetroAlertDialogBody.displayName = "RetroAlertDialogBody"

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
RetroAlertDialogFooter.displayName = "RetroAlertDialogFooter"

/* ------------------------------------------------------------------ */
/*  Action Button (primary style)                                      */
/* ------------------------------------------------------------------ */

const RetroAlertDialogAction = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap",
      "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      "cursor-pointer select-none transition-none",
      "h-[24px] px-4 py-0",
      "border-[2px] border-os9-black bg-os9-gray-300 text-os9-black",
      "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
      "active:bg-os9-gray-800 active:text-os9-white",
      "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
      "focus-visible:os9-focus-ring",
      className
    )}
    {...props}
  />
))
RetroAlertDialogAction.displayName = "RetroAlertDialogAction"

/* ------------------------------------------------------------------ */
/*  Cancel Button (secondary style)                                    */
/* ------------------------------------------------------------------ */

const RetroAlertDialogCancel = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap",
      "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      "cursor-pointer select-none transition-none",
      "h-[24px] px-4 py-0",
      "border border-os9-black bg-os9-gray-300 text-os9-black",
      "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
      "active:bg-os9-gray-800 active:text-os9-white",
      "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
      "focus-visible:os9-focus-ring",
      className
    )}
    {...props}
  />
))
RetroAlertDialogCancel.displayName = "RetroAlertDialogCancel"

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
