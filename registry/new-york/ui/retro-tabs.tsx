"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Context – shares the "size" prop across subcomponents              */
/* ------------------------------------------------------------------ */

type RetroTabsSize = "lg" | "sm"

const SizeContext = React.createContext<RetroTabsSize>("lg")

/* ------------------------------------------------------------------ */
/*  RetroTabs (root)                                                   */
/* ------------------------------------------------------------------ */

function RetroTabs(
  {
    className,
    size = "lg",
    ...props
  }: React.ComponentProps<typeof TabsPrimitive.Root> & {
    size?: RetroTabsSize
  },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <SizeContext.Provider value={size}>
      <TabsPrimitive.Root
        ref={ref}
        className={cn("flex flex-col", className)}
        {...props}
      />
    </SizeContext.Provider>
  )
}

const ForwardedRetroTabs = React.forwardRef(RetroTabs)
ForwardedRetroTabs.displayName = "RetroTabs"

/* ------------------------------------------------------------------ */
/*  RetroTabsList                                                      */
/* ------------------------------------------------------------------ */

function RetroTabsList(
  {
    className,
    ...props
  }: React.ComponentProps<typeof TabsPrimitive.List>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <TabsPrimitive.List
      ref={ref}
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

const ForwardedRetroTabsList = React.forwardRef(RetroTabsList)
ForwardedRetroTabsList.displayName = "RetroTabsList"

/* ------------------------------------------------------------------ */
/*  RetroTabsTrigger                                                   */
/* ------------------------------------------------------------------ */

const retroTabsTriggerVariants = cva(
  [
    "relative z-[1] cursor-pointer select-none whitespace-nowrap",
    "transition-none",
    "focus-visible:os9-focus-ring focus-visible:z-[2]",
  ],
  {
    variants: {
      size: {
        lg: [
          "h-[22px] px-[12px]",
          "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        ],
        sm: [
          "h-[16px] px-[10px]",
          "font-[family-name:var(--font-sans)] text-[10px] tracking-[0.8px] leading-normal",
        ],
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

function RetroTabsTrigger(
  {
    className,
    children,
    ...props
  }: React.ComponentProps<typeof TabsPrimitive.Trigger>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const size = React.useContext(SizeContext)

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        retroTabsTriggerVariants({ size }),
        /* ----- Inactive state (default) ----- */
        "border-t border-x border-os9-black border-b-0",
        "bg-os9-gray-400 text-os9-black",
        /* Inactive top bevel: dark line at top, subtle inner highlight */
        "shadow-[inset_1px_1px_0_var(--os9-gray-500),inset_-1px_0_0_var(--os9-gray-500)]",
        /* Top border sits at baseline, inactive tabs have a bottom line */
        "mb-px",

        /* ----- Active state (data-state=active) ----- */
        "data-[state=active]:bg-os9-gray-200 data-[state=active]:text-os9-black",
        "data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-os9-black",
        "data-[state=active]:border-b-0",
        /* Active bevel: white inner highlight top-left, gray shadow bottom-right */
        "data-[state=active]:shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_0_0_var(--os9-gray-700)]",
        /* Active tab grows 1px taller so bottom edge covers the bar line */
        "data-[state=active]:mb-0 data-[state=active]:pb-px",
        /* Active tab sits above the bottom border */
        "data-[state=active]:z-[2]",

        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

const ForwardedRetroTabsTrigger = React.forwardRef(RetroTabsTrigger)
ForwardedRetroTabsTrigger.displayName = "RetroTabsTrigger"

/* ------------------------------------------------------------------ */
/*  RetroTabsContent                                                   */
/* ------------------------------------------------------------------ */

function RetroTabsContent(
  {
    className,
    ...props
  }: React.ComponentProps<typeof TabsPrimitive.Content>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <TabsPrimitive.Content
      ref={ref}
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

const ForwardedRetroTabsContent = React.forwardRef(RetroTabsContent)
ForwardedRetroTabsContent.displayName = "RetroTabsContent"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  ForwardedRetroTabs as RetroTabs,
  ForwardedRetroTabsList as RetroTabsList,
  ForwardedRetroTabsTrigger as RetroTabsTrigger,
  ForwardedRetroTabsContent as RetroTabsContent,
}
