"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  RetroPopover,
  RetroPopoverTrigger,
  RetroPopoverContent,
} from "@/registry/new-york/ui/retro-popover"

// Spread rather than a literal `asChild` attribute: the shadcn CLI rewrites
// literal `asChild` to Base UI's `render` prop in base-* projects, which
// breaks these Radix-based components.
const AS_CHILD = { asChild: true } as const

/* ---------------------------------------------------------------------------
 * Helpers
 * --------------------------------------------------------------------------- */

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

/* ---------------------------------------------------------------------------
 * Context
 * --------------------------------------------------------------------------- */

interface ComboboxContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value: string
  onSelect: (value: string) => void
  /** id of the popover content, referenced by the trigger's aria-controls */
  contentId: string
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

/* ---------------------------------------------------------------------------
 * RetroCombobox (root)
 * --------------------------------------------------------------------------- */

interface RetroComboboxProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * Optional list of options. The most reliable source for resolving the
   * selected value's label in the trigger (items inside the popover are not
   * mounted while it is closed).
   */
  items?: RetroComboboxOption[]
  /** Custom resolver for the trigger text. Takes precedence over all labels. */
  displayValue?: (value: string) => React.ReactNode
  children: React.ReactNode
}

const RetroCombobox = React.forwardRef<HTMLDivElement, RetroComboboxProps>(
  function RetroCombobox(
    {
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      items,
      displayValue,
      children,
    },
    ref,
  ) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const contentId = React.useId()

    const isControlledValue = controlledValue !== undefined
    const isControlledOpen = controlledOpen !== undefined

    const value = isControlledValue ? controlledValue : uncontrolledValue
    const open = isControlledOpen ? controlledOpen : uncontrolledOpen

    const setOpen = React.useCallback(
      (next: boolean) => {
        if (!isControlledOpen) setUncontrolledOpen(next)
        onOpenChange?.(next)
      },
      [isControlledOpen, onOpenChange],
    )

    const onSelect = React.useCallback(
      (next: string) => {
        if (!isControlledValue) setUncontrolledValue(next)
        onValueChange?.(next)
        setOpen(false)
      },
      [isControlledValue, onValueChange, setOpen],
    )

    // Labels registered by mounted items (kept in state so the trigger
    // re-renders once they are known).
    const [registeredLabels, setRegisteredLabels] = React.useState<
      Record<string, string>
    >({})

    const registerItem = React.useCallback((itemValue: string, label: string) => {
      setRegisteredLabels((prev) =>
        prev[itemValue] === label ? prev : { ...prev, [itemValue]: label },
      )
    }, [])

    // Labels discoverable synchronously from the JSX tree, so the trigger
    // can show the selected label on first render without opening.
    const childLabels = React.useMemo(() => collectItemLabels(children), [children])

    const getLabel = React.useCallback(
      (itemValue: string) =>
        items?.find((item) => item.value === itemValue)?.label ??
        registeredLabels[itemValue] ??
        childLabels[itemValue],
      [items, registeredLabels, childLabels],
    )

    const ctx = React.useMemo<ComboboxContextValue>(
      () => ({
        open,
        setOpen,
        value,
        onSelect,
        contentId,
        registerItem,
        getLabel,
        displayValue,
      }),
      [open, setOpen, value, onSelect, contentId, registerItem, getLabel, displayValue],
    )

    return (
      <ComboboxContext.Provider value={ctx}>
        <RetroPopover open={open} onOpenChange={setOpen}>
          <div ref={ref} className="relative">
            {children}
          </div>
        </RetroPopover>
      </ComboboxContext.Provider>
    )
  },
)
RetroCombobox.displayName = "RetroCombobox"

/* ---------------------------------------------------------------------------
 * RetroComboboxTrigger
 * --------------------------------------------------------------------------- */

interface RetroComboboxTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string
}

const RetroComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  RetroComboboxTriggerProps
>(function RetroComboboxTrigger({ className, placeholder = "Select...", ...props }, ref) {
  const { value, open, contentId, getLabel, displayValue } = useCombobox()

  const label: React.ReactNode = value
    ? (displayValue?.(value) ?? getLabel(value) ?? value)
    : undefined
  const hasLabel = label != null && label !== ""

  return (
    <RetroPopoverTrigger {...AS_CHILD}>
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={contentId}
        aria-haspopup="listbox"
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
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "truncate px-[5px]",
            !hasLabel && "text-os9-gray-600",
          )}
        >
          {hasLabel ? label : placeholder}
        </span>
        {/* Down chevron */}
        <span
          className={cn(
            "flex h-full items-center justify-center",
            "w-[18px] shrink-0",
            "border-l border-os9-black",
            "bg-os9-gray-300",
            "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          )}
        >
          <svg
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M4 4L0 0H8L4 4Z" fill="currentColor" />
          </svg>
        </span>
      </button>
    </RetroPopoverTrigger>
  )
})
RetroComboboxTrigger.displayName = "RetroComboboxTrigger"

/* ---------------------------------------------------------------------------
 * RetroComboboxContent (popover + cmdk root)
 * --------------------------------------------------------------------------- */

interface RetroComboboxContentProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  /**
   * @deprecated Set `maxHeight` on `RetroComboboxList` instead.
   */
  maxHeight?: number
}

const RetroComboboxContent = React.forwardRef<
  HTMLDivElement,
  RetroComboboxContentProps
>(function RetroComboboxContent(
  { className, children, maxHeight, ...props },
  ref,
) {
  const { value, contentId } = useCombobox()

  return (
    <RetroPopoverContent
      id={contentId}
      className={cn(
        "w-[var(--radix-popover-trigger-width)] p-0",
        className,
      )}
      sideOffset={2}
    >
      <CommandPrimitive
        ref={ref}
        // Highlight the currently selected item when the list opens
        defaultValue={value || undefined}
        loop
        {...props}
      >
        {children}
      </CommandPrimitive>
    </RetroPopoverContent>
  )
})
RetroComboboxContent.displayName = "RetroComboboxContent"

/* ---------------------------------------------------------------------------
 * RetroComboboxInput
 * --------------------------------------------------------------------------- */

const RetroComboboxInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(function RetroComboboxInput({ className, placeholder = "Search...", ...props }, ref) {
  return (
    <div className="p-[3px] border-b border-os9-gray-700">
      <CommandPrimitive.Input
        ref={ref}
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
          className,
        )}
        {...props}
      />
    </div>
  )
})
RetroComboboxInput.displayName = "RetroComboboxInput"

/* ---------------------------------------------------------------------------
 * RetroComboboxEmpty (only renders when no items match)
 * --------------------------------------------------------------------------- */

const RetroComboboxEmpty = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(function RetroComboboxEmpty({ className, children, ...props }, ref) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn(
        "py-4 text-center",
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-normal",
        "text-os9-gray-600",
        className,
      )}
      {...props}
    >
      {children ?? "No results found."}
    </CommandPrimitive.Empty>
  )
})
RetroComboboxEmpty.displayName = "RetroComboboxEmpty"

/* ---------------------------------------------------------------------------
 * RetroComboboxGroup
 * --------------------------------------------------------------------------- */

type RetroComboboxGroupProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Group
>

const RetroComboboxGroup = React.forwardRef<
  HTMLDivElement,
  RetroComboboxGroupProps
>(function RetroComboboxGroup({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "py-[2px]",
        "[&_[cmdk-group-heading]]:px-[6px] [&_[cmdk-group-heading]]:py-[2px]",
        "[&_[cmdk-group-heading]]:font-[family-name:var(--os9-font-heading)] [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.42px] [&_[cmdk-group-heading]]:leading-[0.98]",
        "[&_[cmdk-group-heading]]:text-os9-gray-700 [&_[cmdk-group-heading]]:select-none",
        className,
      )}
      {...props}
    />
  )
})
RetroComboboxGroup.displayName = "RetroComboboxGroup"

/* ---------------------------------------------------------------------------
 * RetroComboboxItem
 * --------------------------------------------------------------------------- */

interface RetroComboboxItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    "value" | "onSelect"
  > {
  value: string
  /** Display label for the item. Falls back to text children. */
  label?: string
}

const RetroComboboxItem = React.forwardRef<
  HTMLDivElement,
  RetroComboboxItemProps
>(function RetroComboboxItem(
  { className, value: itemValue, label, disabled = false, keywords, children, ...props },
  ref,
) {
  const { value: selectedValue, onSelect, registerItem } = useCombobox()

  // Derive a text label from children if label prop is not provided
  const textLabel = label ?? getNodeText(children)

  // Register this item so the trigger can resolve the label from the value
  React.useEffect(() => {
    registerItem(itemValue, textLabel)
  }, [itemValue, textLabel, registerItem])

  const isChecked = selectedValue === itemValue

  return (
    <CommandPrimitive.Item
      ref={ref}
      value={itemValue}
      // Match the search against the visible label as well as the value
      keywords={[textLabel, ...(keywords ?? [])]}
      disabled={disabled}
      onSelect={() => onSelect(itemValue)}
      data-checked={isChecked ? "true" : undefined}
      className={cn(
        "relative flex items-center",
        "h-[18px] w-full px-[14px]",
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-normal",
        "text-os9-black",
        "cursor-pointer select-none outline-none",
        /* Highlighted (keyboard or pointer): OS9 menu highlight */
        "data-[selected=true]:bg-os9-azul data-[selected=true]:text-os9-white",
        isChecked && "font-bold",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:text-os9-gray-600",
        className,
      )}
      {...props}
    >
      {/* Checkmark indicator */}
      <span className="absolute left-[2px] flex h-[8px] w-[8px] items-center justify-center">
        {isChecked && (
          <svg
            width="8"
            height="8"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 8.5L6.5 12L13 4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        )}
      </span>
      {children}
    </CommandPrimitive.Item>
  )
})
RetroComboboxItem.displayName = "RetroComboboxItem"

/** Walk a JSX tree and collect `value -> label` for every RetroComboboxItem. */
function collectItemLabels(
  node: React.ReactNode,
  acc: Record<string, string> = {},
): Record<string, string> {
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

/* ---------------------------------------------------------------------------
 * RetroComboboxList (scrollable container for items)
 * --------------------------------------------------------------------------- */

interface RetroComboboxListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
  maxHeight?: number
}

const RetroComboboxList = React.forwardRef<HTMLDivElement, RetroComboboxListProps>(
  function RetroComboboxList({ className, maxHeight = 200, style, ...props }, ref) {
    return (
      <CommandPrimitive.List
        ref={ref}
        className={cn("overflow-y-auto overflow-x-hidden py-[2px]", className)}
        style={{ maxHeight, ...style }}
        {...props}
      />
    )
  },
)
RetroComboboxList.displayName = "RetroComboboxList"

/* ---------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------- */

export {
  RetroCombobox,
  RetroComboboxTrigger,
  RetroComboboxContent,
  RetroComboboxInput,
  RetroComboboxEmpty,
  RetroComboboxGroup,
  RetroComboboxItem,
  RetroComboboxList,
}
export type {
  RetroComboboxProps,
  RetroComboboxOption,
  RetroComboboxTriggerProps,
  RetroComboboxContentProps,
  RetroComboboxItemProps,
  RetroComboboxListProps,
}
