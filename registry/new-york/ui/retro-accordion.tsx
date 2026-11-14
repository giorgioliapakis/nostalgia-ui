"use client"

/*
 * RetroAccordion on UI SDK Accordion.
 *
 * Crafted moments:
 *  - The disclosure triangle turns in two hard frames through 45°, the way
 *    the Finder's did. Both flairs.
 *  - Sections morph their height open and shut (220ms open, 180ms close), so
 *    the sections below slide rather than jump. Classic flair and reduced
 *    motion pop them at once.
 *
 * Keeps the shadcn API: `type="single" | "multiple"`, `collapsible`, and a
 * string value in single mode (UI SDK itself always uses an array).
 */

import * as React from "react"
import {
  Accordion as AccordionPrimitive,
  AccordionHeader as AccordionHeaderPrimitive,
  AccordionItem as AccordionItemPrimitive,
  AccordionPanel as AccordionPanelPrimitive,
  AccordionTrigger as AccordionTriggerPrimitive,
} from "@ui-sdk/react/accordion"

import { cn } from "@/lib/utils"

type Common = { className?: string; children?: React.ReactNode }

/* ------------------------------------------------------------------ */
/*  RetroAccordion (root)                                              */
/* ------------------------------------------------------------------ */

type AccordionBaseProps = Omit<
  React.ComponentProps<typeof AccordionPrimitive>,
  "className" | "children" | "value" | "defaultValue" | "onValueChange" | "multiple" | "collapsible"
> &
  Common

type RetroAccordionSingleProps = AccordionBaseProps & {
  type?: "single"
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Whether the open item can be closed again. Defaults to false. */
  collapsible?: boolean
}

type RetroAccordionMultipleProps = AccordionBaseProps & {
  type: "multiple"
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  collapsible?: never
}

type RetroAccordionProps = RetroAccordionSingleProps | RetroAccordionMultipleProps

const toArray = (v: string | string[] | undefined) =>
  v === undefined ? undefined : Array.isArray(v) ? v : v ? [v] : []

function RetroAccordion({
  className,
  type = "single",
  value,
  defaultValue,
  onValueChange,
  collapsible,
  ...props
}: RetroAccordionProps) {
  const multiple = type === "multiple"
  return (
    <AccordionPrimitive
      multiple={multiple}
      collapsible={multiple ? undefined : (collapsible ?? false)}
      value={toArray(value)}
      defaultValue={toArray(defaultValue)}
      onValueChange={
        onValueChange &&
        ((next: string[]) => {
          if (multiple) (onValueChange as (v: string[]) => void)(next)
          else (onValueChange as (v: string) => void)(next[0] ?? "")
        })
      }
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroAccordionItem                                                 */
/* ------------------------------------------------------------------ */

function RetroAccordionItem({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AccordionItemPrimitive>, "className" | "children"> & Common) {
  return (
    <AccordionItemPrimitive
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

/* ------------------------------------------------------------------ */
/*  RetroAccordionTrigger                                              */
/* ------------------------------------------------------------------ */

function RetroAccordionTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof AccordionTriggerPrimitive>, "className" | "children"> &
  Common) {
  return (
    <AccordionHeaderPrimitive className="m-0 flex">
      <AccordionTriggerPrimitive
        className={cn(
          "group/accordion-trigger",
          "flex w-full flex-row items-center justify-between",
          "py-[6px]",
          "cursor-pointer select-none",
          "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px]",
          "text-os9-black",
          "hover:bg-[var(--os9-lavender)]",
          "focus-visible:os9-focus-ring",
          "transition-none",
          "data-disabled:cursor-default data-disabled:text-os9-gray-600 data-disabled:hover:bg-transparent",
          "[&>svg]:shrink-0",
          className
        )}
        {...props}
      >
        <span className="flex items-center gap-[6px]">
          {/* Disclosure triangle: 0° → 45° → 90° in two frames */}
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="currentColor"
            aria-hidden="true"
            className={cn(
              "transition-transform duration-[110ms] [transition-timing-function:steps(2,end)]",
              "motion-reduce:transition-none",
              /* Scoped to this trigger so nested accordions rotate independently */
              "group-data-open/accordion-trigger:rotate-90"
            )}
          >
            <polygon points="1,0 7,4 1,8" />
          </svg>
          {children}
        </span>
      </AccordionTriggerPrimitive>
    </AccordionHeaderPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroAccordionContent                                              */
/* ------------------------------------------------------------------ */

function RetroAccordionContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof AccordionPanelPrimitive>, "className" | "children"> & Common) {
  return (
    <AccordionPanelPrimitive
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden",
        "font-[family-name:var(--os9-font-sans)] text-[10px]",
        "text-os9-black",
        "transition-[height] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "data-starting-style:h-0 data-ending-style:h-0 data-ending-style:duration-180",
        "in-data-[flair=classic]:transition-none motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      <div className="pb-[8px] pl-[16px] pr-0 pt-0">{children}</div>
    </AccordionPanelPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export { RetroAccordion, RetroAccordionItem, RetroAccordionTrigger, RetroAccordionContent }
export type { RetroAccordionProps }
