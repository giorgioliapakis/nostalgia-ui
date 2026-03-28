"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroContextMenu (root)                                            */
/* ------------------------------------------------------------------ */

const RetroContextMenu = ContextMenuPrimitive.Root

RetroContextMenu.displayName = "RetroContextMenu"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuTrigger                                            */
/* ------------------------------------------------------------------ */

const RetroContextMenuTrigger = ContextMenuPrimitive.Trigger

RetroContextMenuTrigger.displayName = "RetroContextMenuTrigger"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuContent                                            */
/* ------------------------------------------------------------------ */

const RetroContextMenuContent = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[160px] p-[2px]",
        "bg-os9-white",
        "border border-os9-black",
        /* Classic OS 9 drop shadow: 2px offset, no blur */
        "shadow-[2px_2px_0_var(--os9-black)]",
        /* Animate in */
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
RetroContextMenuContent.displayName = "RetroContextMenuContent"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuItem                                               */
/* ------------------------------------------------------------------ */

const RetroContextMenuItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "group flex items-center cursor-default select-none",
      "h-[18px] px-[16px]",
      "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      "text-os9-black",
      "outline-none",
      /* Hover / focus highlight */
      "data-[highlighted]:bg-os9-azul data-[highlighted]:text-os9-white",
      /* Disabled */
      "data-[disabled]:text-os9-gray-600 data-[disabled]:pointer-events-none",
      className
    )}
    {...props}
  />
))
RetroContextMenuItem.displayName = "RetroContextMenuItem"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuSeparator                                          */
/* ------------------------------------------------------------------ */

const RetroContextMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn(
      "h-[2px] mx-[4px] my-[2px]",
      /* Two-tone bevel line: dark top, white bottom */
      "border-t border-os9-gray-700",
      "border-b border-b-os9-white",
      className
    )}
    {...props}
  />
))
RetroContextMenuSeparator.displayName = "RetroContextMenuSeparator"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuSub                                                */
/* ------------------------------------------------------------------ */

const RetroContextMenuSub = ContextMenuPrimitive.Sub

RetroContextMenuSub.displayName = "RetroContextMenuSub"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuSubTrigger                                         */
/* ------------------------------------------------------------------ */

const RetroContextMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex items-center cursor-default select-none",
      "h-[18px] px-[16px]",
      "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      "text-os9-black",
      "outline-none",
      /* Hover / focus highlight */
      "data-[highlighted]:bg-os9-azul data-[highlighted]:text-os9-white",
      /* Disabled */
      "data-[disabled]:text-os9-gray-600 data-[disabled]:pointer-events-none",
      className
    )}
    {...props}
  >
    {children}
    {/* Right chevron indicator */}
    <svg
      width="6"
      height="8"
      viewBox="0 0 6 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-auto"
    >
      <path d="M0 0L6 4L0 8V0Z" fill="currentColor" />
    </svg>
  </ContextMenuPrimitive.SubTrigger>
))
RetroContextMenuSubTrigger.displayName = "RetroContextMenuSubTrigger"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuSubContent                                         */
/* ------------------------------------------------------------------ */

const RetroContextMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[160px] p-[2px]",
        "bg-os9-white",
        "border border-os9-black",
        "shadow-[2px_2px_0_var(--os9-black)]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
RetroContextMenuSubContent.displayName = "RetroContextMenuSubContent"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuCheckboxItem                                       */
/* ------------------------------------------------------------------ */

const RetroContextMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex items-center cursor-default select-none",
      "h-[18px] pl-[24px] pr-[16px]",
      "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      "text-os9-black",
      "outline-none",
      "data-[highlighted]:bg-os9-azul data-[highlighted]:text-os9-white",
      "data-[disabled]:text-os9-gray-600 data-[disabled]:pointer-events-none",
      className
    )}
    {...props}
  >
    <span className="absolute left-[6px] flex h-[10px] w-[10px] items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        {/* Checkmark SVG */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8.5L6.5 12L13 4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
RetroContextMenuCheckboxItem.displayName = "RetroContextMenuCheckboxItem"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuRadioGroup                                         */
/* ------------------------------------------------------------------ */

const RetroContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

RetroContextMenuRadioGroup.displayName = "RetroContextMenuRadioGroup"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuRadioItem                                          */
/* ------------------------------------------------------------------ */

const RetroContextMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex items-center cursor-default select-none",
      "h-[18px] pl-[24px] pr-[16px]",
      "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
      "text-os9-black",
      "outline-none",
      "data-[highlighted]:bg-os9-azul data-[highlighted]:text-os9-white",
      "data-[disabled]:text-os9-gray-600 data-[disabled]:pointer-events-none",
      className
    )}
    {...props}
  >
    <span className="absolute left-[6px] flex h-[10px] w-[10px] items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        {/* Dot indicator */}
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4" cy="4" r="3" fill="currentColor" />
        </svg>
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
RetroContextMenuRadioItem.displayName = "RetroContextMenuRadioItem"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuLabel                                              */
/* ------------------------------------------------------------------ */

const RetroContextMenuLabel = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-[16px] py-[2px]",
      "font-[family-name:var(--font-heading)] text-[10px] tracking-[0.42px] leading-[0.98]",
      "text-os9-gray-700",
      className
    )}
    {...props}
  />
))
RetroContextMenuLabel.displayName = "RetroContextMenuLabel"

/* ------------------------------------------------------------------ */
/*  RetroContextMenuShortcut                                           */
/* ------------------------------------------------------------------ */

function RetroContextMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto pl-[16px]",
        "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]",
        "text-os9-gray-700",
        /* Inherit parent highlight color */
        "group-data-[highlighted]:text-os9-white",
        className
      )}
      {...props}
    />
  )
}
RetroContextMenuShortcut.displayName = "RetroContextMenuShortcut"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroContextMenu,
  RetroContextMenuTrigger,
  RetroContextMenuContent,
  RetroContextMenuItem,
  RetroContextMenuSeparator,
  RetroContextMenuSub,
  RetroContextMenuSubTrigger,
  RetroContextMenuSubContent,
  RetroContextMenuCheckboxItem,
  RetroContextMenuRadioGroup,
  RetroContextMenuRadioItem,
  RetroContextMenuLabel,
  RetroContextMenuShortcut,
}
