"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroAccordion (root)                                              */
/* ------------------------------------------------------------------ */

function RetroAccordion(
  {
    className,
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Root>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

const ForwardedRetroAccordion = React.forwardRef(RetroAccordion)
ForwardedRetroAccordion.displayName = "RetroAccordion"

/* ------------------------------------------------------------------ */
/*  RetroAccordionItem                                                 */
/* ------------------------------------------------------------------ */

function RetroAccordionItem(
  {
    className,
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Item>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        /* Bevel separator: 1px dark + 1px light */
        "border-b border-b-[var(--os9-gray-700)]",
        "shadow-[0_1px_0_var(--os9-white)]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroAccordionItem = React.forwardRef(RetroAccordionItem)
ForwardedRetroAccordionItem.displayName = "RetroAccordionItem"

/* ------------------------------------------------------------------ */
/*  RetroAccordionTrigger                                              */
/* ------------------------------------------------------------------ */

function RetroAccordionTrigger(
  {
    className,
    children,
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Trigger>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex w-full flex-row items-center justify-between",
          "py-[6px]",
          "cursor-pointer select-none",
          "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]",
          "text-os9-black",
          "hover:bg-[var(--os9-lavender)]",
          "focus-visible:os9-focus-ring",
          "transition-none",
          "[&>svg]:shrink-0",
          className
        )}
        {...props}
      >
        <span className="flex items-center gap-[6px]">
          {/* Disclosure triangle */}
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="currentColor"
            aria-hidden="true"
            className={cn(
              "transition-transform duration-150",
              "[[data-state=open]>&]:rotate-90"
            )}
          >
            <polygon points="1,0 7,4 1,8" />
          </svg>
          {children}
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

const ForwardedRetroAccordionTrigger = React.forwardRef(RetroAccordionTrigger)
ForwardedRetroAccordionTrigger.displayName = "RetroAccordionTrigger"

/* ------------------------------------------------------------------ */
/*  RetroAccordionContent                                              */
/* ------------------------------------------------------------------ */

function RetroAccordionContent(
  {
    className,
    children,
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Content>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden",
        "font-[family-name:var(--font-sans)] text-[10px]",
        "text-os9-black",
        /* Collapse/expand animation via data-state */
        "data-[state=open]:animate-accordion-down",
        "data-[state=closed]:animate-accordion-up",
        className
      )}
      {...props}
    >
      <div className="pb-[8px] pl-[16px] pr-0 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  )
}

const ForwardedRetroAccordionContent = React.forwardRef(RetroAccordionContent)
ForwardedRetroAccordionContent.displayName = "RetroAccordionContent"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  ForwardedRetroAccordion as RetroAccordion,
  ForwardedRetroAccordionItem as RetroAccordionItem,
  ForwardedRetroAccordionTrigger as RetroAccordionTrigger,
  ForwardedRetroAccordionContent as RetroAccordionContent,
}
