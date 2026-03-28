"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroCommand (root)                                                */
/* ------------------------------------------------------------------ */

const RetroCommand = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex flex-col overflow-hidden",
      "bg-os9-gray-200",
      "border border-os9-black",
      className
    )}
    style={{
      boxShadow:
        "2px 2px 0 var(--os9-black), inset 2px 2px 0 rgba(255,255,255,0.6), inset -2px -2px 0 rgba(38,38,38,0.4)",
    }}
    {...props}
  />
))
RetroCommand.displayName = "RetroCommand"

/* ------------------------------------------------------------------ */
/*  RetroCommandDialog                                                 */
/* ------------------------------------------------------------------ */

function RetroCommandDialog({
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/40",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-[450px] -translate-x-1/2 -translate-y-1/2",
            "outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          )}
        >
          <RetroCommand
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-[family-name:var(--font-heading)] [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:text-os9-gray-700"
          >
            {children}
          </RetroCommand>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
RetroCommandDialog.displayName = "RetroCommandDialog"

/* ------------------------------------------------------------------ */
/*  RetroCommandInput                                                  */
/* ------------------------------------------------------------------ */

const RetroCommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2 px-2 pt-2 pb-1" cmdk-input-wrapper="">
    {/* Search icon (magnifying glass) */}
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle
        cx="6.5"
        cy="6.5"
        r="5"
        stroke="var(--os9-gray-700)"
        strokeWidth="2"
      />
      <line
        x1="10.5"
        y1="10.5"
        x2="15"
        y2="15"
        stroke="var(--os9-gray-700)"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex-1 bg-os9-white text-os9-black",
        "font-[family-name:var(--font-sans)] text-[10px] leading-normal",
        "placeholder:text-os9-gray-600",
        "border border-os9-black",
        "px-[5px] py-[3px]",
        "outline-none",
        "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
RetroCommandInput.displayName = "RetroCommandInput"

/* ------------------------------------------------------------------ */
/*  RetroCommandList                                                   */
/* ------------------------------------------------------------------ */

const RetroCommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "max-h-[300px] overflow-y-auto overflow-x-hidden p-1",
      className
    )}
    {...props}
  />
))
RetroCommandList.displayName = "RetroCommandList"

/* ------------------------------------------------------------------ */
/*  RetroCommandEmpty                                                  */
/* ------------------------------------------------------------------ */

const RetroCommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn(
      "py-6 text-center",
      "font-[family-name:var(--font-sans)] text-[10px] leading-normal",
      "text-os9-gray-700",
      className
    )}
    {...props}
  />
))
RetroCommandEmpty.displayName = "RetroCommandEmpty"

/* ------------------------------------------------------------------ */
/*  RetroCommandGroup                                                  */
/* ------------------------------------------------------------------ */

const RetroCommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden",
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
      "[&_[cmdk-group-heading]]:font-[family-name:var(--font-heading)] [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.42px] [&_[cmdk-group-heading]]:leading-[0.98]",
      "[&_[cmdk-group-heading]]:text-os9-gray-700",
      className
    )}
    {...props}
  />
))
RetroCommandGroup.displayName = "RetroCommandGroup"

/* ------------------------------------------------------------------ */
/*  RetroCommandItem                                                   */
/* ------------------------------------------------------------------ */

const RetroCommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "group flex items-center gap-2 cursor-pointer select-none",
      "h-[18px] px-2",
      "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      "text-os9-black",
      "outline-none",
      /* Selected highlight: azul bg + white text */
      "data-[selected=true]:bg-os9-azul data-[selected=true]:text-os9-white",
      /* Disabled */
      "data-[disabled=true]:text-os9-gray-600 data-[disabled=true]:pointer-events-none",
      className
    )}
    {...props}
  />
))
RetroCommandItem.displayName = "RetroCommandItem"

/* ------------------------------------------------------------------ */
/*  RetroCommandSeparator                                              */
/* ------------------------------------------------------------------ */

const RetroCommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn(
      "h-[2px] mx-1 my-1",
      "border-t border-os9-gray-700",
      "border-b border-b-os9-white",
      className
    )}
    {...props}
  />
))
RetroCommandSeparator.displayName = "RetroCommandSeparator"

/* ------------------------------------------------------------------ */
/*  RetroCommandShortcut                                               */
/* ------------------------------------------------------------------ */

function RetroCommandShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto",
        "font-[family-name:var(--font-sans)] text-[9px] leading-normal",
        "text-os9-gray-700",
        "group-data-[selected=true]:text-os9-white",
        className
      )}
      {...props}
    />
  )
}
RetroCommandShortcut.displayName = "RetroCommandShortcut"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroCommand,
  RetroCommandDialog,
  RetroCommandInput,
  RetroCommandList,
  RetroCommandEmpty,
  RetroCommandGroup,
  RetroCommandItem,
  RetroCommandSeparator,
  RetroCommandShortcut,
}
