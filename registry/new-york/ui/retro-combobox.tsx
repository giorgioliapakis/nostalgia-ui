"use client"

/*
 * RetroCombobox: a Mac OS 9 searchable pop-up on UI SDK's Combobox. A button
 * shows the current choice; its popup holds a search field over the list.
 *
 * Crafted moment: the gliding azul highlight (modern flair). One highlight
 * layer slides between options as you type, arrow or point, and the row's
 * ink flips to white as it arrives, exactly like the menus. Classic flair
 * (and reduced motion) snaps row to row.
 */

import * as React from "react"
import {
  Combobox as ComboboxPrimitive,
  ComboboxContent as ComboboxContentPrimitive,
  ComboboxEmpty as ComboboxEmptyPrimitive,
  ComboboxGroup as ComboboxGroupPrimitive,
  ComboboxGroupLabel as ComboboxGroupLabelPrimitive,
  ComboboxInput as ComboboxInputPrimitive,
  ComboboxItem as ComboboxItemPrimitive,
  ComboboxItemIndicator as ComboboxItemIndicatorPrimitive,
  ComboboxList as ComboboxListPrimitive,
  ComboboxSeparator as ComboboxSeparatorPrimitive,
  ComboboxTrigger as ComboboxTriggerPrimitive,
} from "@ui-sdk/react/combobox"

import { cn } from "@/lib/utils"
import { popupClass, useGlide, useMergedRef } from "@/registry/new-york/lib/retro-motion"

/* string class names and plain children, as shadcn-style parts take */
type WithClassName<P> = Omit<P, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
}

/* ------------------------------------------------------------------ */
/*  Glide CSS                                                          */
/* ------------------------------------------------------------------ */

/* Unlayered, so it beats the option utilities without !important. */
const COMBOBOX_CSS = `
.os9-combobox:not([data-glide-off]) [role="option"][data-highlighted] {
  background-color: transparent;
}
.os9-combobox[data-glide-off] > [data-glide-layer] {
  opacity: 0 !important;
  transition: none !important;
}
.os9-combobox [role="option"] { transition: color 0s linear 60ms; }
.os9-combobox[data-glide-off] [role="option"] { transition: none; }
`

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

interface RetroComboboxOption {
  value: string
  label: string
}

/** Extract plain text from a React node (strings, numbers, nested elements). */
function getNodeText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join("")
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children)
  }
  return ""
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface ComboboxContextValue {
  value: string
  /** The trigger button: the popup anchors to it and focus returns to it. */
  trigger: HTMLButtonElement | null
  setTrigger: (node: HTMLButtonElement | null) => void
  /** Register an item's label so the trigger can display it */
  registerItem: (value: string, label: string) => void
  getLabel: (value: string) => string | undefined
  displayValue?: (value: string) => React.ReactNode
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null)

function useCombobox() {
  const ctx = React.useContext(ComboboxContext)
  if (!ctx) {
    throw new Error("Combobox compound components must be used within <RetroCombobox>")
  }
  return ctx
}

/* ------------------------------------------------------------------ */
/*  RetroCombobox (root)                                               */
/* ------------------------------------------------------------------ */

interface RetroComboboxProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Disables the trigger. */
  disabled?: boolean
  /** The name the value submits under in a form. */
  name?: string
  /**
   * Optional list of options. The most reliable source for resolving the
   * selected value's label in the trigger (items inside the popup are not
   * mounted while it is closed).
   */
  items?: RetroComboboxOption[]
  /** Custom resolver for the trigger text. Takes precedence over all labels. */
  displayValue?: (value: string) => React.ReactNode
  className?: string
  ref?: React.Ref<HTMLDivElement>
  children: React.ReactNode
}

function RetroCombobox({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled,
  name,
  items,
  displayValue,
  className,
  ref,
  children,
}: RetroComboboxProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [query, setQuery] = React.useState("")
  const [trigger, setTrigger] = React.useState<HTMLButtonElement | null>(null)

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen

  // Labels registered by mounted items (kept in state so the trigger
  // re-renders once they are known).
  const [registeredLabels, setRegisteredLabels] = React.useState<Record<string, string>>({})

  const registerItem = React.useCallback((itemValue: string, label: string) => {
    setRegisteredLabels((prev) => (prev[itemValue] === label ? prev : { ...prev, [itemValue]: label }))
  }, [])

  // Labels discoverable synchronously from the JSX tree, so the trigger
  // can show the selected label on first render without opening.
  const childLabels = React.useMemo(() => collectItemLabels(children), [children])

  const getLabel = React.useCallback(
    (itemValue: string) =>
      items?.find((item) => item.value === itemValue)?.label ??
      registeredLabels[itemValue] ??
      childLabels[itemValue],
    [items, registeredLabels, childLabels]
  )

  const ctx = React.useMemo<ComboboxContextValue>(
    () => ({ value, trigger, setTrigger, registerItem, getLabel, displayValue }),
    [value, trigger, registerItem, getLabel, displayValue]
  )

  return (
    <ComboboxContext.Provider value={ctx}>
      <ComboboxPrimitive<string, false>
        value={value === "" ? null : value}
        onValueChange={(next) => {
          if (controlledValue === undefined) setUncontrolledValue(next ?? "")
          onValueChange?.(next ?? "")
        }}
        open={open}
        onOpenChange={(next) => {
          /* the search starts empty each time the list opens */
          if (next) setQuery("")
          if (controlledOpen === undefined) setUncontrolledOpen(next)
          onOpenChange?.(next)
        }}
        onOpenChangeComplete={(next) => {
          if (!next) trigger?.focus()
        }}
        query={query}
        onQueryChange={setQuery}
        itemToLabel={(v) => getLabel(v) ?? v}
        /* highlight the chosen item (or the first) when the list opens */
        autoHighlight="always"
        disabled={disabled}
        name={name}
      >
        <div ref={ref} className={cn("relative", className)}>
          {children}
        </div>
      </ComboboxPrimitive>
    </ComboboxContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroComboboxTrigger                                               */
/* ------------------------------------------------------------------ */

type RetroComboboxTriggerProps = WithClassName<React.ComponentProps<typeof ComboboxTriggerPrimitive>> & {
  placeholder?: string
}

function RetroComboboxTrigger({
  className,
  placeholder = "Select...",
  ref,
  ...props
}: RetroComboboxTriggerProps) {
  const { value, setTrigger, getLabel, displayValue } = useCombobox()

  const label: React.ReactNode = value ? (displayValue?.(value) ?? getLabel(value) ?? value) : undefined
  const hasLabel = label != null && label !== ""

  return (
    <ComboboxTriggerPrimitive
      ref={useMergedRef(ref, setTrigger)}
      type="button"
      className={cn(
        "inline-flex items-center justify-between",
        "h-[22px] w-full",
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-normal",
        "text-os9-black",
        "border border-os9-black bg-os9-white",
        "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white),-1px_0_0_var(--os9-gray-700),0_-1px_0_var(--os9-gray-700),1px_0_0_var(--os9-white),0_1px_0_var(--os9-white)]",
        "cursor-pointer select-none",
        "focus-visible:os9-focus-ring",
        "disabled:pointer-events-none disabled:opacity-50 disabled:bg-os9-gray-200 disabled:text-os9-gray-600",
        className
      )}
      {...props}
    >
      <span className={cn("truncate px-[5px]", !hasLabel && "text-os9-gray-600")}>
        {hasLabel ? label : placeholder}
      </span>
      {/* Down chevron */}
      <span
        className={cn(
          "flex h-full items-center justify-center",
          "w-[18px] shrink-0",
          "border-l border-os9-black",
          "bg-os9-gray-300",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]"
        )}
      >
        <svg width="8" height="4" viewBox="0 0 8 4" fill="none" aria-hidden>
          <path d="M4 4L0 0H8L4 4Z" fill="currentColor" />
        </svg>
      </span>
    </ComboboxTriggerPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroComboboxContent (the popup)                                   */
/* ------------------------------------------------------------------ */

type RetroComboboxContentProps = WithClassName<React.ComponentProps<typeof ComboboxContentPrimitive>> & {
  /**
   * @deprecated Set `maxHeight` on `RetroComboboxList` instead.
   */
  maxHeight?: number
}

/* Appears with a 100ms fade (modern flair), at once in classic. Box
 * properties carry `!` so UI SDK's popup reset can't strip them in apps
 * that haven't declared `@layer ui-sdk;` first. */
function RetroComboboxContent({
  className,
  children,
  maxHeight: _maxHeight,
  sideOffset = 2,
  align = "start",
  ...props
}: RetroComboboxContentProps) {
  const { trigger } = useCombobox()
  return (
    <ComboboxContentPrimitive
      anchor={trigger}
      sideOffset={sideOffset}
      align={align}
      className={popupClass(
        cn(
          "z-50 flex flex-col outline-none",
          "w-(--anchor-width)! m-0! p-0! border! border-os9-black! bg-os9-white! text-os9-black!",
          "overflow-hidden! shadow-[2px_2px_0_var(--os9-black)]",
          "transition-opacity duration-100 ease-out",
          "data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:duration-75",
          "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
        ),
        className
      )}
      {...props}
    >
      {children}
    </ComboboxContentPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroComboboxInput                                                 */
/* ------------------------------------------------------------------ */

function RetroComboboxInput({
  className,
  placeholder = "Search...",
  ...props
}: WithClassName<React.ComponentProps<typeof ComboboxInputPrimitive>>) {
  return (
    <div className="p-[3px] border-b border-os9-gray-700">
      <ComboboxInputPrimitive
        autoFocus
        aria-label={placeholder}
        placeholder={placeholder}
        className={cn(
          "w-full",
          "h-[18px]",
          "font-[family-name:var(--os9-font-sans)] text-[10px] leading-normal",
          "text-os9-black",
          "border border-os9-black bg-os9-white",
          "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
          "placeholder:text-os9-gray-600",
          "outline-none",
          "px-[4px] py-0",
          className
        )}
        {...props}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroComboboxEmpty (only renders when no items match)              */
/* ------------------------------------------------------------------ */

/* Place it next to RetroComboboxList, not inside it. */
function RetroComboboxEmpty({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof ComboboxEmptyPrimitive>>) {
  return (
    <ComboboxEmptyPrimitive
      className={cn(
        /* stays mounted as a live region; only takes room while empty */
        "text-center data-empty:py-4 data-loading:py-4",
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-normal",
        "text-os9-gray-600",
        className
      )}
      {...props}
    >
      {children ?? "No results found."}
    </ComboboxEmptyPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroComboboxGroup                                                 */
/* ------------------------------------------------------------------ */

const groupLabelClass = cn(
  "px-[6px] py-[2px] select-none",
  "font-[family-name:var(--os9-font-heading)] text-[10px] tracking-[0.42px] leading-[0.98]",
  "text-os9-gray-700"
)

type RetroComboboxGroupProps = WithClassName<React.ComponentProps<typeof ComboboxGroupPrimitive>> & {
  /** The group's label. */
  heading?: React.ReactNode
}

function RetroComboboxGroup({ className, heading, children, ...props }: RetroComboboxGroupProps) {
  return (
    <ComboboxGroupPrimitive className={cn("py-[2px]", className)} {...props}>
      {heading != null && (
        <ComboboxGroupLabelPrimitive className={groupLabelClass}>{heading}</ComboboxGroupLabelPrimitive>
      )}
      {children}
    </ComboboxGroupPrimitive>
  )
}

function RetroComboboxSeparator({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof ComboboxSeparatorPrimitive>>) {
  return (
    <ComboboxSeparatorPrimitive
      className={cn("h-[2px] mx-[2px] my-[2px] border-t border-os9-gray-700 border-b border-b-os9-white", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroComboboxItem                                                  */
/* ------------------------------------------------------------------ */

type RetroComboboxItemProps = WithClassName<
  Omit<React.ComponentProps<typeof ComboboxItemPrimitive<string>>, "value" | "label">
> & {
  value: string
  /** Display label for the item. Falls back to text children. */
  label?: string
}

function RetroComboboxItem({ className, value: itemValue, label, keywords, children, ...props }: RetroComboboxItemProps) {
  const { registerItem } = useCombobox()

  // Derive a text label from children if label prop is not provided
  const textLabel = label ?? getNodeText(children)

  // Register this item so the trigger can resolve the label from the value
  React.useEffect(() => {
    registerItem(itemValue, textLabel)
  }, [itemValue, textLabel, registerItem])

  return (
    <ComboboxItemPrimitive
      value={itemValue}
      label={textLabel}
      // Match the search against the value as well as the visible label
      keywords={[itemValue, ...(keywords ?? [])]}
      className={cn(
        "relative z-[1] flex shrink-0 items-center",
        "h-[18px] w-full px-[14px]",
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-normal",
        "text-os9-black whitespace-nowrap",
        "cursor-pointer select-none outline-none",
        /* Highlighted (keyboard or pointer): OS9 menu highlight */
        "data-highlighted:bg-os9-azul data-highlighted:text-os9-white",
        "data-selected:font-bold",
        "data-disabled:pointer-events-none data-disabled:text-os9-gray-600",
        className
      )}
      {...props}
    >
      {/* Checkmark indicator */}
      <span className="absolute left-[2px] flex h-[8px] w-[8px] items-center justify-center">
        <ComboboxItemIndicatorPrimitive>
          <svg width="8" height="8" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8.5L6.5 12L13 4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </ComboboxItemIndicatorPrimitive>
      </span>
      {children}
    </ComboboxItemPrimitive>
  )
}

/** Walk a JSX tree and collect `value -> label` for every RetroComboboxItem. */
function collectItemLabels(node: React.ReactNode, acc: Record<string, string> = {}): Record<string, string> {
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement<{ children?: React.ReactNode }>(child)) return
    if (child.type === RetroComboboxItem) {
      const { value, label, children } = child.props as RetroComboboxItemProps
      acc[value] = label ?? getNodeText(children)
      return
    }
    collectItemLabels(child.props.children, acc)
  })
  return acc
}

/* ------------------------------------------------------------------ */
/*  RetroComboboxList (scrollable container for items)                 */
/* ------------------------------------------------------------------ */

type RetroComboboxListProps = WithClassName<React.ComponentProps<typeof ComboboxListPrimitive>> & {
  maxHeight?: number
  style?: React.CSSProperties
}

function RetroComboboxList({ className, maxHeight = 200, style, children, ref, ...props }: RetroComboboxListProps) {
  const glideRef = useGlide(ref)
  return (
    <ComboboxListPrimitive
      ref={glideRef}
      className={cn("os9-combobox relative overflow-y-auto overflow-x-hidden py-[2px]", className)}
      style={{ maxHeight, ...style }}
      {...props}
    >
      <style href="os9-combobox" precedence="default">
        {COMBOBOX_CSS}
      </style>
      <span
        aria-hidden
        data-glide-layer
        className="pointer-events-none absolute top-0 left-0 bg-os9-azul opacity-0"
      />
      {children}
    </ComboboxListPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroCombobox,
  RetroComboboxTrigger,
  RetroComboboxContent,
  RetroComboboxInput,
  RetroComboboxEmpty,
  RetroComboboxGroup,
  RetroComboboxItem,
  RetroComboboxList,
  RetroComboboxSeparator,
}
export type {
  RetroComboboxProps,
  RetroComboboxOption,
  RetroComboboxTriggerProps,
  RetroComboboxContentProps,
  RetroComboboxItemProps,
  RetroComboboxListProps,
}
