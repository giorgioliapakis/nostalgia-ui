"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroMenuBar (root)                                                */
/* ------------------------------------------------------------------ */

function RetroMenuBar(
  {
    className,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Root>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        "flex h-[20px] items-center gap-[6px] px-[8px]",
        "bg-os9-gray-300",
        "border-b border-os9-black",
        /* Inner bevel: white highlight top, dark shadow bottom */
        "shadow-[inset_0_1px_0_var(--os9-white),inset_0_-1px_0_var(--os9-gray-700)]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroMenuBar = React.forwardRef(RetroMenuBar)
ForwardedRetroMenuBar.displayName = "RetroMenuBar"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarMenu                                                   */
/* ------------------------------------------------------------------ */

function RetroMenuBarMenu(
  props: React.ComponentProps<typeof MenubarPrimitive.Menu>
) {
  return <MenubarPrimitive.Menu {...props} />
}

RetroMenuBarMenu.displayName = "RetroMenuBarMenu"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarTrigger                                                */
/* ------------------------------------------------------------------ */

function RetroMenuBarTrigger(
  {
    className,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Trigger>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex items-center cursor-pointer select-none whitespace-nowrap",
        "h-[20px] px-[8px] pt-[2px]",
        "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "outline-none",
        /* Active / open state */
        "data-[state=open]:bg-os9-azul data-[state=open]:text-os9-white",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroMenuBarTrigger = React.forwardRef(RetroMenuBarTrigger)
ForwardedRetroMenuBarTrigger.displayName = "RetroMenuBarTrigger"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarContent                                                */
/* ------------------------------------------------------------------ */

function RetroMenuBarContent(
  {
    className,
    align = "start",
    alignOffset = -4,
    sideOffset = 0,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Content>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[160px] py-[2px]",
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
    </MenubarPrimitive.Portal>
  )
}

const ForwardedRetroMenuBarContent = React.forwardRef(RetroMenuBarContent)
ForwardedRetroMenuBarContent.displayName = "RetroMenuBarContent"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarItem                                                   */
/* ------------------------------------------------------------------ */

function RetroMenuBarItem(
  {
    className,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Item>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "flex items-center cursor-default select-none",
        "px-[16px] py-[2px]",
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
  )
}

const ForwardedRetroMenuBarItem = React.forwardRef(RetroMenuBarItem)
ForwardedRetroMenuBarItem.displayName = "RetroMenuBarItem"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarSeparator                                              */
/* ------------------------------------------------------------------ */

function RetroMenuBarSeparator(
  {
    className,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Separator>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn(
        "h-[2px] mx-[4px] my-[2px]",
        /* Two-tone bevel line: dark top, white bottom */
        "border-t border-os9-gray-600",
        "border-b border-b-os9-white",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroMenuBarSeparator = React.forwardRef(RetroMenuBarSeparator)
ForwardedRetroMenuBarSeparator.displayName = "RetroMenuBarSeparator"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  ForwardedRetroMenuBar as RetroMenuBar,
  RetroMenuBarMenu,
  ForwardedRetroMenuBarTrigger as RetroMenuBarTrigger,
  ForwardedRetroMenuBarContent as RetroMenuBarContent,
  ForwardedRetroMenuBarItem as RetroMenuBarItem,
  ForwardedRetroMenuBarSeparator as RetroMenuBarSeparator,
}
