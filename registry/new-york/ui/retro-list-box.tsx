"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface ListBoxContextValue {
  selected: ReadonlySet<string>
  activeId: string | null
  disabled: boolean
  select: (value: string, id: string, mode: "replace" | "toggle" | "range") => void
}

const ListBoxContext = React.createContext<ListBoxContextValue | null>(null)

function useListBoxContext() {
  const ctx = React.useContext(ListBoxContext)
  if (!ctx) {
    throw new Error("RetroListBoxItem must be used inside <RetroListBox>")
  }
  return ctx
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ListBoxBaseProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> & {
  /** Disables the whole list. */
  disabled?: boolean
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

type RetroListBoxProps = ListBoxBaseProps &
  (ListBoxSingleProps | ListBoxMultipleProps)

function toArray(v: string | string[] | null | undefined): string[] {
  if (v == null) return []
  return Array.isArray(v) ? v : [v]
}

const TYPEAHEAD_TIMEOUT = 600

/* ------------------------------------------------------------------ */
/*  RetroListBox                                                       */
/* ------------------------------------------------------------------ */

const RetroListBox = React.forwardRef<HTMLDivElement, RetroListBoxProps>(
  function RetroListBox(props, forwardedRef) {
    const {
      className,
      children,
      disabled = false,
      multiple = false,
      value: valueProp,
      defaultValue,
      onValueChange,
      onKeyDown,
      onFocus,
      ...rest
    } = props

    const rootRef = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(forwardedRef, () => rootRef.current!, [])

    const isControlled = valueProp !== undefined
    const [uncontrolled, setUncontrolled] = React.useState<string[]>(() =>
      toArray(defaultValue)
    )
    const selectedList = isControlled ? toArray(valueProp) : uncontrolled
    const selected = React.useMemo(() => new Set(selectedList), [selectedList])

    const [activeId, setActiveId] = React.useState<string | null>(null)
    const anchorRef = React.useRef<string | null>(null)
    const typeahead = React.useRef<{
      query: string
      timer?: ReturnType<typeof setTimeout>
    }>({ query: "" })

    React.useEffect(() => {
      const t = typeahead.current
      return () => clearTimeout(t.timer)
    }, [])

    const getOptions = React.useCallback(() => {
      const root = rootRef.current
      if (!root) return []
      return Array.from(
        root.querySelectorAll<HTMLElement>(
          '[role="option"]:not([aria-disabled="true"])'
        )
      )
    }, [])

    const emit = (next: string[]) => {
      if (!isControlled) setUncontrolled(next)
      if (multiple) {
        ;(onValueChange as ((v: string[]) => void) | undefined)?.(next)
      } else {
        ;(onValueChange as ((v: string | null) => void) | undefined)?.(
          next[0] ?? null
        )
      }
    }

    const select = (
      value: string,
      id: string,
      mode: "replace" | "toggle" | "range"
    ) => {
      if (disabled) return
      setActiveId(id)
      document.getElementById(id)?.scrollIntoView({ block: "nearest" })

      if (!multiple) {
        anchorRef.current = value
        if (selectedList[0] !== value || selectedList.length !== 1) emit([value])
        return
      }

      if (mode === "toggle") {
        anchorRef.current = value
        emit(
          selected.has(value)
            ? selectedList.filter((v) => v !== value)
            : [...selectedList, value]
        )
        return
      }

      if (mode === "range" && anchorRef.current !== null) {
        const values = getOptions().map((el) => el.dataset.value ?? "")
        const a = values.indexOf(anchorRef.current)
        const b = values.indexOf(value)
        if (a !== -1 && b !== -1) {
          const [start, end] = a < b ? [a, b] : [b, a]
          emit(values.slice(start, end + 1))
          return
        }
      }

      anchorRef.current = value
      emit([value])
    }

    const moveTo = (el: HTMLElement | undefined, extend: boolean) => {
      if (!el) return
      select(el.dataset.value ?? "", el.id, extend && multiple ? "range" : "replace")
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented || disabled) return

      const options = getOptions()
      if (options.length === 0) return
      const index = options.findIndex((el) => el.id === activeId)
      const extend = event.shiftKey

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          moveTo(options[index === -1 ? 0 : Math.min(index + 1, options.length - 1)], extend)
          return
        case "ArrowUp":
          event.preventDefault()
          moveTo(options[index === -1 ? 0 : Math.max(index - 1, 0)], extend)
          return
        case "Home":
          event.preventDefault()
          moveTo(options[0], extend)
          return
        case "End":
          event.preventDefault()
          moveTo(options[options.length - 1], extend)
          return
        case " ":
          if (multiple && index !== -1) {
            event.preventDefault()
            const el = options[index]
            select(el.dataset.value ?? "", el.id, "toggle")
          }
          return
        case "a":
          if (multiple && (event.metaKey || event.ctrlKey)) {
            event.preventDefault()
            emit(options.map((el) => el.dataset.value ?? ""))
            return
          }
          break
      }

      // Type-ahead: printable single characters without modifiers
      if (
        event.key.length === 1 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        const t = typeahead.current
        clearTimeout(t.timer)
        t.query += event.key.toLowerCase()
        t.timer = setTimeout(() => {
          t.query = ""
        }, TYPEAHEAD_TIMEOUT)

        const labelOf = (el: HTMLElement) =>
          (el.dataset.textValue ?? el.textContent ?? "").trim().toLowerCase()
        // Repeating the same letter cycles through matches
        const cycling =
          t.query.length > 1 && t.query.split("").every((c) => c === t.query[0])
        const needle = cycling ? t.query[0] : t.query
        const start = cycling || t.query.length === 1 ? index + 1 : Math.max(index, 0)
        const ordered = [...options.slice(start), ...options.slice(0, start)]
        const match = ordered.find((el) => labelOf(el).startsWith(needle))
        if (match) {
          event.preventDefault()
          moveTo(match, false)
        }
      }
    }

    const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
      onFocus?.(event)
      if (event.target !== event.currentTarget || activeId !== null) return
      // Put the keyboard cursor on the first selected option (or the first)
      const options = getOptions()
      const first =
        options.find((el) => selected.has(el.dataset.value ?? "")) ?? options[0]
      if (first) setActiveId(first.id)
    }

    const ctx: ListBoxContextValue = { selected, activeId, disabled, select }

    return (
      <ListBoxContext.Provider value={ctx}>
        <div
          ref={rootRef}
          role="listbox"
          tabIndex={disabled ? -1 : 0}
          aria-multiselectable={multiple || undefined}
          aria-disabled={disabled || undefined}
          aria-activedescendant={activeId ?? undefined}
          data-disabled={disabled ? "" : undefined}
          className={cn(
            "group/listbox relative flex flex-col overflow-y-auto",
            "border border-os9-black bg-os9-white text-os9-black",
            "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
            "p-[2px] outline-none",
            "font-[family-name:var(--os9-font-sans)] text-[10px]",
            "focus-visible:os9-focus-ring",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          {...rest}
        >
          {children}
        </div>
      </ListBoxContext.Provider>
    )
  }
)
RetroListBox.displayName = "RetroListBox"

/* ------------------------------------------------------------------ */
/*  RetroListBoxItem                                                   */
/* ------------------------------------------------------------------ */

interface RetroListBoxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  /** Unique value identifying this option. */
  value: string
  /** Disables this option. */
  disabled?: boolean
  /** Text used for type-ahead when children aren't plain text. */
  textValue?: string
}

const RetroListBoxItem = React.forwardRef<HTMLDivElement, RetroListBoxItemProps>(
  function RetroListBoxItem(
    { className, value, disabled = false, textValue, onClick, children, ...props },
    ref
  ) {
    const ctx = useListBoxContext()
    const id = React.useId()
    const isSelected = ctx.selected.has(value)
    const isActive = ctx.activeId === id
    const isDisabled = disabled || ctx.disabled

    return (
      <div
        ref={ref}
        id={id}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled || undefined}
        data-value={value}
        data-text-value={textValue}
        data-selected={isSelected ? "" : undefined}
        data-active={isActive ? "" : undefined}
        data-disabled={isDisabled ? "" : undefined}
        className={cn(
          "flex h-[16px] shrink-0 items-center gap-[4px] px-[4px]",
          "cursor-default select-none whitespace-nowrap",
          "data-[selected]:bg-os9-azul data-[selected]:text-os9-white",
          // Keyboard cursor: dotted outline while the list has keyboard focus
          "group-focus-visible/listbox:data-[active]:outline-1 group-focus-visible/listbox:data-[active]:outline-dotted",
          "group-focus-visible/listbox:data-[active]:-outline-offset-1 group-focus-visible/listbox:data-[active]:outline-os9-black",
          "group-focus-visible/listbox:data-[active]:data-[selected]:outline-os9-white",
          "data-[disabled]:text-os9-gray-600",
          className
        )}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented || isDisabled) return
          const mode =
            event.shiftKey ? "range" : event.metaKey || event.ctrlKey ? "toggle" : "replace"
          ctx.select(value, id, mode)
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
RetroListBoxItem.displayName = "RetroListBoxItem"

export { RetroListBox, RetroListBoxItem }
export type { RetroListBoxProps, RetroListBoxItemProps }
