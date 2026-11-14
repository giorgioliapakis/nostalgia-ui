"use client"

/*
 * RetroListBox: a Mac OS 9 inset list box on UI SDK's Listbox.
 *
 * Crafted moment: the gliding selection (modern flair, single selection).
 * The azul selection bar slides to the newly chosen row as you click or
 * arrow through the list, and the row's ink flips to white as it arrives.
 * Classic flair, reduced motion and multiple selection paint each selected
 * row in place, as OS 9 did.
 *
 * Keyboard (from UI SDK): arrows, Home/End and type-ahead move the selection;
 * with `multiple`, Shift extends a range, Cmd/Ctrl toggles a row or moves
 * without selecting, Space toggles, Cmd/Ctrl+A selects all.
 */

import * as React from "react"
import {
  Listbox as ListboxPrimitive,
  ListboxItem as ListboxItemPrimitive,
} from "@ui-sdk/react/listbox"

import { cn } from "@/lib/utils"
import { useGlide } from "@/registry/new-york/lib/retro-motion"

/* Unlayered, so it beats the row utilities without !important. */
const LIST_BOX_CSS = `
.os9-list-box[data-glide]:not([data-glide-off]) [role="option"][data-selected] {
  background-color: transparent;
}
.os9-list-box[data-glide-off] > [data-glide-layer] {
  opacity: 0 !important;
  transition: none !important;
}
.os9-list-box[data-glide] [role="option"] { transition: color 0s linear 60ms; }
.os9-list-box[data-glide-off] [role="option"] { transition: none; }
`

/* the selected row that belongs to this list */
function findSelectedRow(root: HTMLElement) {
  return root.querySelector<HTMLElement>('[role="option"][data-selected]')
}
const WATCH_SELECTED = ["data-selected"]

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ListBoxBaseProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  children?: React.ReactNode
  /** Disables the whole list. */
  disabled?: boolean
  /** Slide the selection between rows (single selection, modern flair). Default true. */
  glide?: boolean
}

type ListBoxSingleProps = {
  multiple?: false
  /** Controlled selected value (null = nothing selected). */
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
}

type ListBoxMultipleProps = {
  multiple: true
  /** Controlled selected values. */
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

type RetroListBoxProps = ListBoxBaseProps & (ListBoxSingleProps | ListBoxMultipleProps)

/* ------------------------------------------------------------------ */
/*  RetroListBox                                                       */
/* ------------------------------------------------------------------ */

function RetroListBox({
  className,
  children,
  disabled = false,
  glide = true,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  ref,
  ...props
}: RetroListBoxProps) {
  const glides = glide && !multiple
  const glideRef = useGlide(ref, findSelectedRow, WATCH_SELECTED)

  const shared = {
    ...props,
    ref: glides ? glideRef : ref,
    disabled,
    /* selection follows the keyboard, and a click replaces it (Cmd/Ctrl adds) */
    activation: "automatic" as const,
    "data-glide": glides ? "" : undefined,
    className: cn(
      "os9-list-box group/listbox relative flex flex-col overflow-y-auto",
      "border border-os9-black bg-os9-white text-os9-black",
      "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
      "p-[2px] outline-none",
      "font-[family-name:var(--os9-font-sans)] text-[10px]",
      "has-[:focus-visible]:os9-focus-ring",
      "data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className
    ),
  }

  const content = (
    <>
      <style href="os9-list-box" precedence="default">
        {LIST_BOX_CSS}
      </style>
      {glides && (
        <span
          aria-hidden
          data-glide-layer
          className="pointer-events-none absolute top-0 left-0 bg-os9-azul opacity-0"
        />
      )}
      {children}
    </>
  )

  if (multiple) {
    return (
      <ListboxPrimitive<string, true>
        {...shared}
        multiple
        value={value as string[] | undefined}
        defaultValue={defaultValue as string[] | undefined}
        onValueChange={(next) => (onValueChange as ((v: string[]) => void) | undefined)?.(next)}
      >
        {content}
      </ListboxPrimitive>
    )
  }
  return (
    <ListboxPrimitive<string, false>
      {...shared}
      value={value as string | null | undefined}
      defaultValue={defaultValue as string | null | undefined}
      onValueChange={(next) => (onValueChange as ((v: string | null) => void) | undefined)?.(next)}
    >
      {content}
    </ListboxPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroListBoxItem                                                   */
/* ------------------------------------------------------------------ */

type RetroListBoxItemProps = Omit<
  React.ComponentProps<typeof ListboxItemPrimitive<string>>,
  "className" | "children" | "label"
> & {
  className?: string
  children?: React.ReactNode
  /** Text used for type-ahead when children aren't plain text. */
  textValue?: string
}

function RetroListBoxItem({ className, textValue, ...props }: RetroListBoxItemProps) {
  return (
    <ListboxItemPrimitive
      label={textValue}
      className={cn(
        "relative z-[1] flex h-[16px] shrink-0 items-center gap-[4px] px-[4px]",
        "cursor-default select-none whitespace-nowrap outline-none",
        "data-selected:bg-os9-azul data-selected:text-os9-white",
        /* keyboard cursor: a dotted outline on the focused row */
        "focus-visible:outline-1 focus-visible:outline-dotted focus-visible:-outline-offset-1 focus-visible:outline-os9-black",
        "data-selected:focus-visible:outline-os9-white",
        "data-disabled:text-os9-gray-600",
        className
      )}
      {...props}
    />
  )
}

export { RetroListBox, RetroListBoxItem }
export type { RetroListBoxProps, RetroListBoxItemProps }
