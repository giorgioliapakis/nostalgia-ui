"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* -------------------------------- Toolbar -------------------------------- */

function RetroToolbar(
  {
    className,
    ...props
  }: React.ComponentProps<"div">,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      role="toolbar"
      ref={ref}
      className={cn(
        "flex flex-row items-center gap-1 px-1",
        "h-[28px]",
        "bg-os9-gray-300",
        "border-b border-b-[var(--os9-gray-700)]",
        "shadow-[0_1px_0_var(--os9-white)]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroToolbar = React.forwardRef(RetroToolbar)
ForwardedRetroToolbar.displayName = "RetroToolbar"

/* ----------------------------- ToolbarButton ----------------------------- */

function RetroToolbarButton(
  {
    className,
    disabled,
    ...props
  }: React.ComponentProps<"button">,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center",
        "size-[24px] p-0",
        "border border-os9-black bg-os9-gray-300",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
        "cursor-pointer select-none",
        "transition-none",
        "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        "focus-visible:os9-focus-ring",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroToolbarButton = React.forwardRef(RetroToolbarButton)
ForwardedRetroToolbarButton.displayName = "RetroToolbarButton"

/* --------------------------- ToolbarSeparator ---------------------------- */

function RetroToolbarSeparator(
  {
    className,
    ...props
  }: React.ComponentProps<"div">,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      ref={ref}
      className={cn(
        "mx-1 h-[16px] w-[2px] shrink-0",
        "border-l border-r border-l-[var(--os9-gray-700)] border-r-[var(--os9-white)]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroToolbarSeparator = React.forwardRef(RetroToolbarSeparator)
ForwardedRetroToolbarSeparator.displayName = "RetroToolbarSeparator"

/* ------------------------------ ToolbarGroup ----------------------------- */

function RetroToolbarGroup(
  {
    className,
    ...props
  }: React.ComponentProps<"div">,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      role="group"
      ref={ref}
      className={cn(
        "flex flex-row items-center gap-0.5",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroToolbarGroup = React.forwardRef(RetroToolbarGroup)
ForwardedRetroToolbarGroup.displayName = "RetroToolbarGroup"

export {
  ForwardedRetroToolbar as RetroToolbar,
  ForwardedRetroToolbarButton as RetroToolbarButton,
  ForwardedRetroToolbarSeparator as RetroToolbarSeparator,
  ForwardedRetroToolbarGroup as RetroToolbarGroup,
}
