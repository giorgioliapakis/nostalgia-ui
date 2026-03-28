"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenu (root)                                           */
/* ------------------------------------------------------------------ */

const RetroDropdownMenu = DropdownMenuPrimitive.Root

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuTrigger                                           */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuTrigger = DropdownMenuPrimitive.Trigger

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuContent                                           */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
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
  </DropdownMenuPrimitive.Portal>
))
RetroDropdownMenuContent.displayName = "RetroDropdownMenuContent"

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuItem                                              */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
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
RetroDropdownMenuItem.displayName = "RetroDropdownMenuItem"

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuSeparator                                         */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
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
RetroDropdownMenuSeparator.displayName = "RetroDropdownMenuSeparator"

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuSub                                               */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuSub = DropdownMenuPrimitive.Sub

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuSubTrigger                                        */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
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
  </DropdownMenuPrimitive.SubTrigger>
))
RetroDropdownMenuSubTrigger.displayName = "RetroDropdownMenuSubTrigger"

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuSubContent                                        */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent
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
  </DropdownMenuPrimitive.Portal>
))
RetroDropdownMenuSubContent.displayName = "RetroDropdownMenuSubContent"

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuCheckboxItem                                      */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
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
      <DropdownMenuPrimitive.ItemIndicator>
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
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
RetroDropdownMenuCheckboxItem.displayName = "RetroDropdownMenuCheckboxItem"

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuRadioGroup                                        */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuRadioItem                                         */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
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
      <DropdownMenuPrimitive.ItemIndicator>
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
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
RetroDropdownMenuRadioItem.displayName = "RetroDropdownMenuRadioItem"

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuLabel                                             */
/* ------------------------------------------------------------------ */

const RetroDropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
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
RetroDropdownMenuLabel.displayName = "RetroDropdownMenuLabel"

/* ------------------------------------------------------------------ */
/*  RetroDropdownMenuShortcut                                          */
/* ------------------------------------------------------------------ */

function RetroDropdownMenuShortcut({
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
RetroDropdownMenuShortcut.displayName = "RetroDropdownMenuShortcut"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroDropdownMenu,
  RetroDropdownMenuTrigger,
  RetroDropdownMenuContent,
  RetroDropdownMenuItem,
  RetroDropdownMenuSeparator,
  RetroDropdownMenuSub,
  RetroDropdownMenuSubTrigger,
  RetroDropdownMenuSubContent,
  RetroDropdownMenuCheckboxItem,
  RetroDropdownMenuRadioGroup,
  RetroDropdownMenuRadioItem,
  RetroDropdownMenuLabel,
  RetroDropdownMenuShortcut,
}
