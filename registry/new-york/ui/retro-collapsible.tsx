"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import { cn } from "@/lib/utils"

// Spread rather than a literal `asChild` attribute: the shadcn CLI rewrites
// literal `asChild` to Base UI's `render` prop in base-* projects, which
// breaks these Radix-based components.
const AS_CHILD = { asChild: true } as const

const RetroCollapsible = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> &
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root {...AS_CHILD} {...props}>
    <div ref={ref} className={cn("w-full", className)} />
  </CollapsiblePrimitive.Root>
))
RetroCollapsible.displayName = "RetroCollapsible"

const RetroCollapsibleTrigger = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      "flex flex-row items-center gap-1 cursor-pointer select-none",
      "os9-heading text-[12px]",
      "focus-visible:os9-focus-ring",
      className
    )}
    {...props}
  >
    {/* Disclosure triangle */}
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "shrink-0 transition-transform duration-150",
        "[[data-state=open]>&]:rotate-90"
      )}
      aria-hidden="true"
    >
      <path d="M2 1L6 4L2 7Z" fill="var(--os9-black)" />
    </svg>
    {children}
  </CollapsiblePrimitive.Trigger>
))
RetroCollapsibleTrigger.displayName = "RetroCollapsibleTrigger"

const RetroCollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      "pl-4 font-[family-name:var(--os9-font-sans)] text-[10px]",
      "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      "overflow-hidden",
      className
    )}
    {...props}
  />
))
RetroCollapsibleContent.displayName = "RetroCollapsibleContent"

export { RetroCollapsible, RetroCollapsibleTrigger, RetroCollapsibleContent }
