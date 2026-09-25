"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import {
  RetroIconAlert,
  RetroIconInfo,
  RetroIconStop,
} from "@/registry/new-york/ui/retro-icons"

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
        /* OS9 window frame */
        "border border-os9-black bg-os9-gray-200 shadow-[var(--os9-shadow-window)]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
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
      "font-[family-name:var(--os9-font-heading)] text-os9-black",
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
      "font-[family-name:var(--os9-font-sans)]",
      className
    )}
    {...props}
  />
))
RetroAlertDialogDescription.displayName = "RetroAlertDialogDescription"

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
      "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
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
      "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
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

export type { RetroAlertDialogVariant, RetroAlertDialogBodyProps }
