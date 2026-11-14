"use client"

/*
 * RetroTabs on UI SDK Tabs.
 *
 * Crafted moment: none, on purpose. OS 9 tabs are folder tabs: the chosen
 * one changes face and joins the panel below it, at once. A sliding
 * indicator would read as a modern underline, not a Platinum tab, so the
 * swap stays instant in both flairs. Arrow keys, Home/End and roving focus
 * come from UI SDK.
 */

import * as React from "react"
import {
  Tabs as TabsPrimitive,
  TabsList as TabsListPrimitive,
  TabsPanel as TabsPanelPrimitive,
  TabsTab as TabsTabPrimitive,
} from "@ui-sdk/react/tabs"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Context – shares the "size" prop across subcomponents              */
/* ------------------------------------------------------------------ */

type RetroTabsSize = "lg" | "sm"

const SizeContext = React.createContext<RetroTabsSize>("lg")

type Common = { className?: string; children?: React.ReactNode }

/* ------------------------------------------------------------------ */
/*  RetroTabs (root)                                                   */
/* ------------------------------------------------------------------ */

function RetroTabs({
  className,
  size = "lg",
  ...props
}: Omit<React.ComponentProps<typeof TabsPrimitive>, "className" | "children"> &
  Common & {
    size?: RetroTabsSize
  }) {
  return (
    <SizeContext.Provider value={size}>
      <TabsPrimitive className={cn("flex flex-col", className)} {...props} />
    </SizeContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroTabsList                                                      */
/* ------------------------------------------------------------------ */

function RetroTabsList({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsListPrimitive>, "className" | "children"> & Common) {
  return (
    <TabsListPrimitive
      className={cn(
        "relative flex items-end pl-[4px]",
        /* The 1px bottom border across the full tab bar */
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-os9-black",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroTabsTrigger                                                   */
/* ------------------------------------------------------------------ */

const retroTabsTriggerVariants = cva(
  [
    "relative z-[1] cursor-pointer select-none whitespace-nowrap",
    "transition-none",
    "focus-visible:os9-focus-ring focus-visible:z-[2]",
    "data-disabled:opacity-50 data-disabled:cursor-default data-disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        lg: [
          "h-[22px] px-[12px]",
          "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        ],
        sm: [
          "h-[16px] px-[10px]",
          "font-[family-name:var(--os9-font-sans)] text-[10px] tracking-[0.8px] leading-normal",
        ],
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

function RetroTabsTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof TabsTabPrimitive>, "className" | "children"> & Common) {
  const size = React.useContext(SizeContext)

  return (
    <TabsTabPrimitive
      className={cn(
        retroTabsTriggerVariants({ size }),
        /* ----- Inactive state (default) ----- */
        "border-t border-x border-os9-black border-b-0",
        "bg-os9-gray-400 text-os9-black",
        /* Inactive top bevel: dark line at top, subtle inner highlight */
        "shadow-[inset_1px_1px_0_var(--os9-gray-500),inset_-1px_0_0_var(--os9-gray-500)]",
        /* Top border sits at baseline, inactive tabs have a bottom line */
        "mb-px",

        /* ----- Selected state ----- */
        "data-selected:bg-os9-gray-200 data-selected:text-os9-black",
        "data-selected:border-t data-selected:border-x data-selected:border-os9-black",
        "data-selected:border-b-0",
        /* Selected bevel: white inner highlight top-left, gray shadow bottom-right */
        "data-selected:shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_0_0_var(--os9-gray-700)]",
        /* Selected tab grows 1px taller so bottom edge covers the bar line */
        "data-selected:mb-0 data-selected:pb-px",
        /* Selected tab sits above the bottom border */
        "data-selected:z-[2]",

        className
      )}
      {...props}
    >
      {children}
    </TabsTabPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroTabsContent                                                   */
/* ------------------------------------------------------------------ */

function RetroTabsContent({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsPanelPrimitive>, "className" | "children"> & Common) {
  return (
    <TabsPanelPrimitive
      className={cn(
        "border border-os9-black border-t-0",
        "bg-os9-gray-200",
        "p-3",
        /* Raised inner bevel matching the OS9 panel look */
        "shadow-[inset_1px_0_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700),inset_0_1px_0_var(--os9-gray-200)]",
        "focus-visible:os9-focus-ring",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export { RetroTabs, RetroTabsList, RetroTabsTrigger, RetroTabsContent }
