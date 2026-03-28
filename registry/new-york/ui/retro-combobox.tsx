"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  RetroPopover,
  RetroPopoverTrigger,
  RetroPopoverContent,
} from "@/registry/new-york/ui/retro-popover"

/* ---------------------------------------------------------------------------
 * Context
 * --------------------------------------------------------------------------- */

interface ComboboxContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  search: string
  setSearch: (search: string) => void
  value: string
  onSelect: (value: string) => void
  /** Map of value -> label so the trigger can display the selected label */
  registerItem: (value: string, label: string) => void
  getLabel: (value: string) => string | undefined
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
      children,
    },
    ref,
  ) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const [search, setSearch] = React.useState("")

    const isControlledValue = controlledValue !== undefined
    const isControlledOpen = controlledOpen !== undefined

    const value = isControlledValue ? controlledValue : uncontrolledValue
    const open = isControlledOpen ? controlledOpen : uncontrolledOpen

    const setOpen = React.useCallback(
      (next: boolean) => {
        if (!isControlledOpen) setUncontrolledOpen(next)
        onOpenChange?.(next)
        // Reset search when closing
        if (!next) setSearch("")
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

    // Label registry so the trigger can show the selected item's label
    const labelsRef = React.useRef<Map<string, string>>(new Map())

    const registerItem = React.useCallback((itemValue: string, label: string) => {
      labelsRef.current.set(itemValue, label)
    }, [])

    const getLabel = React.useCallback((itemValue: string) => {
      return labelsRef.current.get(itemValue)
    }, [])

    const ctx = React.useMemo<ComboboxContextValue>(
      () => ({ open, setOpen, search, setSearch, value, onSelect, registerItem, getLabel }),
      [open, setOpen, search, value, onSelect, registerItem, getLabel],
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
  const { value, getLabel } = useCombobox()

  const label = value ? getLabel(value) : undefined

  return (
    <RetroPopoverTrigger asChild>
      <button
        ref={ref}
        type="button"
        role="combobox"
        className={cn(
          "inline-flex items-center justify-between",
          "h-[22px] w-full",
          "font-[family-name:var(--font-sans)] text-[10px] leading-normal",
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
            !label && "text-os9-gray-600",
          )}
        >
          {label ?? placeholder}
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
 * RetroComboboxContent
 * --------------------------------------------------------------------------- */

interface RetroComboboxContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum height of the scrollable item list, in px. Defaults to 200. */
  maxHeight?: number
}

const RetroComboboxContent = React.forwardRef<
  HTMLDivElement,
  RetroComboboxContentProps
>(function RetroComboboxContent({ className, children, maxHeight = 200, ...props }, ref) {
  return (
    <RetroPopoverContent
      className={cn(
        "w-[var(--radix-popover-trigger-width)] p-0",
        className,
      )}
      sideOffset={2}
    >
      <div ref={ref} {...props}>
        {children}
      </div>
    </RetroPopoverContent>
  )
})
RetroComboboxContent.displayName = "RetroComboboxContent"

/* ---------------------------------------------------------------------------
 * RetroComboboxInput
 * --------------------------------------------------------------------------- */

const RetroComboboxInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function RetroComboboxInput({ className, placeholder = "Search...", ...props }, ref) {
  const { search, setSearch } = useCombobox()

  return (
    <div className="p-[3px] border-b border-os9-gray-700">
      <input
        ref={ref}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full",
          "h-[18px]",
          "font-[family-name:var(--font-sans)] text-[10px] leading-normal",
          "text-os9-black",
          "border border-os9-black bg-os9-white",
          "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
          "placeholder:text-os9-gray-600",
          "outline-none",
          "px-[4px] py-0",
          className,
        )}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        {...props}
      />
    </div>
  )
})
RetroComboboxInput.displayName = "RetroComboboxInput"

/* ---------------------------------------------------------------------------
 * RetroComboboxEmpty
 * --------------------------------------------------------------------------- */

const RetroComboboxEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function RetroComboboxEmpty({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "py-4 text-center",
        "font-[family-name:var(--font-sans)] text-[10px] leading-normal",
        "text-os9-gray-600",
        className,
      )}
      {...props}
    >
      {children ?? "No results found."}
    </div>
  )
})
RetroComboboxEmpty.displayName = "RetroComboboxEmpty"

/* ---------------------------------------------------------------------------
 * RetroComboboxGroup
 * --------------------------------------------------------------------------- */

interface RetroComboboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string
}

const RetroComboboxGroup = React.forwardRef<
  HTMLDivElement,
  RetroComboboxGroupProps
>(function RetroComboboxGroup({ className, heading, children, ...props }, ref) {
  return (
    <div ref={ref} role="group" className={cn("py-[2px]", className)} {...props}>
      {heading && (
        <div
          className={cn(
            "px-[6px] py-[2px]",
            "font-[family-name:var(--font-heading)] text-[10px] tracking-[0.42px] leading-[0.98]",
            "text-os9-gray-700",
            "select-none",
          )}
        >
          {heading}
        </div>
      )}
      {children}
    </div>
  )
})
RetroComboboxGroup.displayName = "RetroComboboxGroup"

/* ---------------------------------------------------------------------------
 * RetroComboboxItem
 * --------------------------------------------------------------------------- */

interface RetroComboboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value: string
  /** Display label for the item. Falls back to text children. */
  label?: string
  disabled?: boolean
}

const RetroComboboxItem = React.forwardRef<
  HTMLDivElement,
  RetroComboboxItemProps
>(function RetroComboboxItem(
  { className, value: itemValue, label, disabled = false, children, ...props },
  ref,
) {
  const { value: selectedValue, onSelect, search, registerItem } = useCombobox()

  // Derive a text label from children if label prop is not provided
  const textLabel = label ?? (typeof children === "string" ? children : "")

  // Register this item so the trigger can resolve the label from the value
  React.useEffect(() => {
    registerItem(itemValue, textLabel)
  }, [itemValue, textLabel, registerItem])

  // Filter: hide items that don't match the search
  const matches =
    search === "" ||
    textLabel.toLowerCase().includes(search.toLowerCase()) ||
    itemValue.toLowerCase().includes(search.toLowerCase())

  if (!matches) return null

  const isSelected = selectedValue === itemValue

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-selected={isSelected ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "relative flex items-center",
        "h-[18px] w-full px-[14px]",
        "font-[family-name:var(--font-sans)] text-[10px] leading-normal",
        "text-os9-black",
        "cursor-pointer select-none outline-none",
        "hover:bg-os9-azul hover:text-os9-white",
        isSelected && "font-bold",
        disabled && "pointer-events-none text-os9-gray-600",
        className,
      )}
      onClick={() => {
        if (!disabled) onSelect(itemValue)
      }}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onSelect(itemValue)
        }
      }}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {/* Checkmark indicator */}
      <span className="absolute left-[2px] flex h-[8px] w-[8px] items-center justify-center">
        {isSelected && (
          <svg
            width="8"
            height="8"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
    </div>
  )
})
RetroComboboxItem.displayName = "RetroComboboxItem"

/* ---------------------------------------------------------------------------
 * RetroComboboxList (scrollable container for items)
 * --------------------------------------------------------------------------- */

interface RetroComboboxListProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number
}

const RetroComboboxList = React.forwardRef<HTMLDivElement, RetroComboboxListProps>(
  function RetroComboboxList({ className, maxHeight = 200, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="listbox"
        className={cn("overflow-y-auto py-[2px]", className)}
        style={{ maxHeight }}
        {...props}
      >
        {children}
      </div>
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
