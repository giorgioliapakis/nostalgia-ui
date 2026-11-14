"use client"

/*
 * RetroToolbar: a Mac OS 9 application toolbar on UI SDK.
 *
 * One tab stop; arrow keys move between buttons, Home / End jump to the
 * ends. Disabled buttons stay reachable (aria-disabled) so a tooltip can say
 * why, but they never press.
 *
 * Crafted moment: none, it's still. The bevel inverts the instant a button
 * is pressed, like OS 9; nothing eases.
 */

import * as React from "react"
import {
  Toolbar as ToolbarPrimitive,
  ToolbarButton as ToolbarButtonPrimitive,
  ToolbarGroup as ToolbarGroupPrimitive,
  ToolbarSeparator as ToolbarSeparatorPrimitive,
} from "@ui-sdk/react/toolbar"

import { cn } from "@/lib/utils"

type WithClassName<P> = Omit<P, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
}

/* -------------------------------- Toolbar -------------------------------- */

function RetroToolbar({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof ToolbarPrimitive>>) {
  return (
    <ToolbarPrimitive
      className={cn(
        "flex flex-row items-center gap-1 px-1",
        "h-[28px]",
        "data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-[28px] data-[orientation=vertical]:flex-col data-[orientation=vertical]:py-1 data-[orientation=vertical]:px-0",
        "bg-os9-gray-300",
        "border-b border-b-[var(--os9-gray-700)]",
        "shadow-[0_1px_0_var(--os9-white)]",
        className
      )}
      {...props}
    />
  )
}

/* ----------------------------- ToolbarButton ----------------------------- */

function RetroToolbarButton({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof ToolbarButtonPrimitive>>) {
  return (
    <ToolbarButtonPrimitive
      className={cn(
        "inline-flex items-center justify-center",
        "size-[24px] p-0",
        "border border-os9-black bg-os9-gray-300 text-os9-black",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
        "cursor-pointer select-none",
        "transition-none",
        "not-data-disabled:active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        "focus-visible:os9-focus-ring outline-none",
        "data-disabled:opacity-50 data-disabled:cursor-default",
        className
      )}
      {...props}
    />
  )
}

/* --------------------------- ToolbarSeparator ---------------------------- */

function RetroToolbarSeparator({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof ToolbarSeparatorPrimitive>>) {
  return (
    <ToolbarSeparatorPrimitive
      className={cn(
        "shrink-0",
        /* runs across the toolbar: vertical in a row, horizontal in a column */
        "mx-1 h-[16px] w-[2px] border-l border-r border-l-[var(--os9-gray-700)] border-r-[var(--os9-white)]",
        "data-[orientation=horizontal]:mx-0 data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-[2px] data-[orientation=horizontal]:w-[16px]",
        "data-[orientation=horizontal]:border-x-0 data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-b data-[orientation=horizontal]:border-t-[var(--os9-gray-700)] data-[orientation=horizontal]:border-b-[var(--os9-white)]",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------ ToolbarGroup ----------------------------- */

function RetroToolbarGroup({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof ToolbarGroupPrimitive>>) {
  return (
    <ToolbarGroupPrimitive
      className={cn(
        "flex flex-row items-center gap-0.5",
        "data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

export { RetroToolbar, RetroToolbarButton, RetroToolbarSeparator, RetroToolbarGroup }
