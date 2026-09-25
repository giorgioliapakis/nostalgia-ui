"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { RetroTextarea } from "@/registry/new-york/ui/retro-textarea"

/* ------------------------------------------------------------------ */
/*  RetroInputGroup                                                    */
/*                                                                     */
/*  One inset-bevel text well that hosts an input/textarea plus        */
/*  addons (icons, text, buttons). The well owns the bevel and the     */
/*  focus ring; the inner control is made borderless.                  */
/* ------------------------------------------------------------------ */

const RetroInputGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroInputGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="group"
      data-slot="input-group"
      className={cn(
        "group/input-group relative flex w-full min-w-0 items-center",
        "h-[24px] has-[>textarea]:h-auto",
        "border border-os9-black bg-os9-white text-os9-black",
        // Inset bevel + outer 3D edge (matches RetroInput)
        "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white),-1px_0_0_var(--os9-gray-700),0_-1px_0_var(--os9-gray-700),1px_0_0_var(--os9-white),0_1px_0_var(--os9-white)]",
        // Block addons stack the group vertically
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
        // Focus ring when any inner control is focused
        "has-[[data-slot=input-group-control]:focus]:shadow-[0_2px_0_0_var(--os9-focus),2px_0_0_0_var(--os9-focus),0_-2px_0_0_var(--os9-focus),-2px_0_0_0_var(--os9-focus),0_0_0_1px_var(--os9-focus)]",
        // Invalid
        "has-[[data-slot][aria-invalid=true]]:border-[#cc0000]",
        // Disabled
        "has-[[data-slot=input-group-control]:disabled]:bg-os9-gray-200 has-[[data-slot=input-group-control]:disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
})
RetroInputGroup.displayName = "RetroInputGroup"

/* ------------------------------------------------------------------ */
/*  RetroInputGroupAddon                                               */
/* ------------------------------------------------------------------ */

const retroInputGroupAddonVariants = cva(
  [
    "flex h-auto cursor-text items-center justify-center gap-[4px] select-none",
    "py-[2px] text-os9-gray-800",
    "font-[family-name:var(--os9-font-sans)] text-[10px] leading-none",
    "[&>svg]:pointer-events-none [&>svg]:shrink-0",
    "group-has-[[data-slot=input-group-control]:disabled]/input-group:opacity-50",
  ],
  {
    variants: {
      align: {
        "inline-start": [
          "order-first pl-[6px]",
          "has-[>button]:-ml-px has-[>button]:pl-0",
        ],
        "inline-end": [
          "order-last pr-[6px]",
          "has-[>button]:-mr-px has-[>button]:pr-0",
        ],
        "block-start": [
          "order-first w-full justify-start px-[6px] pt-[5px]",
          "[.border-b]:pb-[5px] [.border-b]:border-os9-gray-500",
          "group-has-[>input]/input-group:pt-[4px]",
        ],
        "block-end": [
          "order-last w-full justify-start px-[6px] pb-[5px]",
          "[.border-t]:pt-[5px] [.border-t]:border-os9-gray-500",
          "group-has-[>input]/input-group:pb-[4px]",
        ],
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

type RetroInputGroupAddonProps = React.ComponentProps<"div"> &
  VariantProps<typeof retroInputGroupAddonVariants>

const RetroInputGroupAddon = React.forwardRef<
  HTMLDivElement,
  RetroInputGroupAddonProps
>(function RetroInputGroupAddon(
  { className, align = "inline-start", onClick, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(retroInputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        // Clicking the addon (but not a button inside it) focuses the field.
        if ((event.target as HTMLElement).closest("button")) return
        event.currentTarget.parentElement
          ?.querySelector<HTMLElement>("[data-slot=input-group-control]")
          ?.focus()
      }}
      {...props}
    />
  )
})
RetroInputGroupAddon.displayName = "RetroInputGroupAddon"

/* ------------------------------------------------------------------ */
/*  RetroInputGroupButton                                              */
/* ------------------------------------------------------------------ */

const retroInputGroupButtonVariants = cva("shrink-0 gap-[4px]", {
  variants: {
    size: {
      xs: "h-[16px] px-[6px] text-[10px] [&>svg]:size-[10px]",
      sm: "h-[20px] px-[8px] text-[10px]",
      "icon-xs": "size-[16px] p-0 [&>svg]:size-[10px]",
      "icon-sm": "size-[20px] p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
})

type RetroInputGroupButtonProps = Omit<
  React.ComponentProps<typeof RetroButton>,
  "size"
> &
  VariantProps<typeof retroInputGroupButtonVariants>

const RetroInputGroupButton = React.forwardRef<
  HTMLButtonElement,
  RetroInputGroupButtonProps
>(function RetroInputGroupButton(
  { className, type = "button", size = "xs", ...props },
  ref
) {
  return (
    <RetroButton
      ref={ref}
      type={type}
      data-size={size}
      size="sm"
      className={cn(retroInputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
})
RetroInputGroupButton.displayName = "RetroInputGroupButton"

/* ------------------------------------------------------------------ */
/*  RetroInputGroupText                                                */
/* ------------------------------------------------------------------ */

const RetroInputGroupText = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(function RetroInputGroupText({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="input-group-text"
      className={cn(
        "flex items-center gap-[4px] text-os9-gray-800",
        "font-[family-name:var(--os9-font-sans)] text-[10px]",
        "[&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
})
RetroInputGroupText.displayName = "RetroInputGroupText"

/* ------------------------------------------------------------------ */
/*  RetroInputGroupInput / RetroInputGroupTextarea                     */
/* ------------------------------------------------------------------ */

/** Strips the standalone bevel/ring so the group well owns them. */
const BARE_CONTROL = [
  "flex-1 min-w-0 border-0 bg-transparent",
  "shadow-none focus:shadow-none focus-visible:shadow-none",
  "disabled:bg-transparent disabled:opacity-100",
]

const RetroInputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof RetroInput>
>(function RetroInputGroupInput({ className, ...props }, ref) {
  return (
    <RetroInput
      ref={ref}
      data-slot="input-group-control"
      className={cn(BARE_CONTROL, "h-[22px] py-0", className)}
      {...props}
    />
  )
})
RetroInputGroupInput.displayName = "RetroInputGroupInput"

const RetroInputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof RetroTextarea>
>(function RetroInputGroupTextarea({ className, ...props }, ref) {
  return (
    <RetroTextarea
      ref={ref}
      data-slot="input-group-control"
      className={cn(BARE_CONTROL, "min-h-[64px] resize-none py-[5px]", className)}
      {...props}
    />
  )
})
RetroInputGroupTextarea.displayName = "RetroInputGroupTextarea"

export {
  RetroInputGroup,
  RetroInputGroupAddon,
  RetroInputGroupButton,
  RetroInputGroupText,
  RetroInputGroupInput,
  RetroInputGroupTextarea,
  retroInputGroupAddonVariants,
  retroInputGroupButtonVariants,
}
