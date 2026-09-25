"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface IconViewItem {
  id: string
  label: string
  /** Icon artwork, ideally 32x32. */
  icon: React.ReactNode
  disabled?: boolean
}

export interface RetroIconViewProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onSelect" | "defaultValue" | "children"
  > {
  items: IconViewItem[]
  /** Controlled selected ids. */
  selected?: string[]
  defaultSelected?: string[]
  onSelectedChange?: (selected: string[]) => void
  /** Defaults to "multiple" (click, shift-click, cmd/ctrl-click). */
  selectionMode?: "single" | "multiple"
  /** Double-click, Cmd+O / Cmd+Down, or Enter (when not renamable). */
  onOpen?: (item: IconViewItem) => void
  /**
   * Enables inline rename. F2 / Enter on the focused item, or a slow second
   * click on a selected label, turns the label into a text field.
   */
  renamable?: boolean
  onRename?: (item: IconViewItem, label: string) => void
  /** Grid cell width in px. Defaults to 80. */
  cellWidth?: number
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function useControllable<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (next: T) => void] {
  const [internal, setInternal] = React.useState<T>(defaultValue)
  const isControlled = controlled !== undefined
  const value = isControlled ? controlled : internal
  const set = React.useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )
  return [value, set]
}

const EMPTY: string[] = []
/** Delay before a click on a selected label starts rename (OS 9 behaviour). */
const RENAME_DELAY_MS = 600

type Direction = "up" | "down" | "left" | "right"

/**
 * Finds the nearest item in a direction using on-screen geometry, so
 * navigation works with any wrap width.
 */
function findNeighbor(
  els: HTMLElement[],
  from: HTMLElement,
  dir: Direction
): number {
  const a = from.getBoundingClientRect()
  const ax = a.left + a.width / 2
  const ay = a.top + a.height / 2
  let best = -1
  let bestScore = Infinity
  els.forEach((el, i) => {
    if (el === from) return
    const b = el.getBoundingClientRect()
    const bx = b.left + b.width / 2
    const by = b.top + b.height / 2
    const dx = bx - ax
    const dy = by - ay
    const sameRow = Math.abs(dy) < a.height / 2
    let score: number
    switch (dir) {
      case "left":
        if (!sameRow || dx >= 0) return
        score = -dx
        break
      case "right":
        if (!sameRow || dx <= 0) return
        score = dx
        break
      case "up":
        if (dy >= -a.height / 2) return
        score = -dy * 1000 + Math.abs(dx)
        break
      case "down":
        if (dy <= a.height / 2) return
        score = dy * 1000 + Math.abs(dx)
        break
    }
    if (score < bestScore) {
      bestScore = score
      best = i
    }
  })
  return best
}

/* ------------------------------------------------------------------ */
/*  Rename field                                                       */
/* ------------------------------------------------------------------ */

function RenameField({
  initial,
  onCommit,
  onCancel,
}: {
  initial: string
  onCommit: (value: string) => void
  onCancel: () => void
}) {
  const [value, setValue] = React.useState(initial)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const done = React.useRef(false)

  React.useEffect(() => {
    const input = inputRef.current
    if (!input) return
    input.focus()
    input.select()
  }, [])

  const finish = (commit: boolean) => {
    if (done.current) return
    done.current = true
    const next = value.trim()
    if (commit && next && next !== initial) onCommit(next)
    else onCancel()
  }

  return (
    <input
      ref={inputRef}
      value={value}
      aria-label="Rename"
      onChange={(e) => setValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === "Enter") {
          e.preventDefault()
          finish(true)
        } else if (e.key === "Escape") {
          e.preventDefault()
          finish(false)
        }
      }}
      onBlur={() => finish(true)}
      className={cn(
        "w-full min-w-0 px-[2px] text-center",
        "border border-os9-black bg-os9-white text-os9-black",
        "font-[family-name:var(--os9-font-sans)] text-[9px] leading-[1.3]",
        "outline-none shadow-[0_0_0_1px_var(--os9-focus)]"
      )}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroIconView                                                      */
/* ------------------------------------------------------------------ */

const RetroIconView = React.forwardRef<HTMLDivElement, RetroIconViewProps>(
  function RetroIconView(
    {
      items,
      selected: selectedProp,
      defaultSelected = EMPTY,
      onSelectedChange,
      selectionMode = "multiple",
      onOpen,
      renamable = false,
      onRename,
      cellWidth = 80,
      className,
      style,
      onClick,
      ...props
    },
    ref
  ) {
    const [selected, setSelected] = useControllable(
      selectedProp,
      defaultSelected,
      onSelectedChange
    )
    const selectedSet = React.useMemo(() => new Set(selected), [selected])

    const [focusedId, setFocusedId] = React.useState<string | null>(null)
    const [renamingId, setRenamingId] = React.useState<string | null>(null)
    const itemRefs = React.useRef(new Map<string, HTMLDivElement>())
    const anchorRef = React.useRef<string | null>(null)
    const renameTimer = React.useRef(0)

    React.useEffect(() => () => window.clearTimeout(renameTimer.current), [])

    const indexOf = (id: string) => items.findIndex((i) => i.id === id)

    const tabbableId =
      focusedId && indexOf(focusedId) !== -1
        ? focusedId
        : (selected.find((id) => indexOf(id) !== -1) ?? items[0]?.id ?? null)

    const focusItem = (id: string) => {
      setFocusedId(id)
      itemRefs.current.get(id)?.focus()
    }

    const select = (
      item: IconViewItem,
      mods: { shift?: boolean; toggle?: boolean } = {}
    ) => {
      if (item.disabled) return
      if (selectionMode === "multiple" && mods.shift && anchorRef.current) {
        const a = indexOf(anchorRef.current)
        const b = indexOf(item.id)
        if (a !== -1 && b !== -1) {
          const [lo, hi] = a < b ? [a, b] : [b, a]
          const range = items
            .slice(lo, hi + 1)
            .filter((i) => !i.disabled)
            .map((i) => i.id)
          setSelected(mods.toggle ? Array.from(new Set([...selected, ...range])) : range)
          return
        }
      }
      if (selectionMode === "multiple" && mods.toggle) {
        setSelected(
          selectedSet.has(item.id)
            ? selected.filter((id) => id !== item.id)
            : [...selected, item.id]
        )
      } else if (!(selected.length === 1 && selected[0] === item.id)) {
        setSelected([item.id])
      }
      anchorRef.current = item.id
    }

    const startRename = (item: IconViewItem) => {
      if (!renamable || item.disabled) return
      window.clearTimeout(renameTimer.current)
      setRenamingId(item.id)
    }

    const endRename = (item: IconViewItem, label?: string) => {
      setRenamingId(null)
      if (label !== undefined) onRename?.(item, label)
      // Return focus to the item after the input unmounts.
      requestAnimationFrame(() => itemRefs.current.get(item.id)?.focus())
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, item: IconViewItem) => {
      if (e.target !== e.currentTarget) return
      const mod = e.metaKey || e.ctrlKey
      const dirs: Record<string, Direction> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      }

      if (mod && (e.key === "o" || e.key === "O" || e.key === "ArrowDown")) {
        e.preventDefault()
        if (!item.disabled) onOpen?.(item)
        return
      }

      const dir = dirs[e.key]
      if (dir) {
        e.preventDefault()
        const els = items
          .map((i) => itemRefs.current.get(i.id))
          .filter((el): el is HTMLDivElement => !!el)
        const current = itemRefs.current.get(item.id)
        if (!current) return
        const idx = findNeighbor(els, current, dir)
        const target = idx === -1 ? undefined : items[idx]
        if (!target) return
        focusItem(target.id)
        if (e.shiftKey) select(target, { shift: true })
        else if (!mod) select(target)
        return
      }

      switch (e.key) {
        case "Home":
        case "End": {
          e.preventDefault()
          const target = e.key === "Home" ? items[0] : items[items.length - 1]
          if (target) {
            focusItem(target.id)
            select(target)
          }
          return
        }
        case "F2":
          e.preventDefault()
          startRename(item)
          return
        case "Enter":
          e.preventDefault()
          if (renamable) startRename(item)
          else if (!item.disabled) onOpen?.(item)
          return
        case " ":
          e.preventDefault()
          select(item, { toggle: mod })
          return
        case "a":
        case "A":
          if (mod && selectionMode === "multiple") {
            e.preventDefault()
            setSelected(items.filter((i) => !i.disabled).map((i) => i.id))
          }
          return
        case "Escape":
          if (selected.length) {
            e.preventDefault()
            setSelected([])
          }
          return
      }
    }

    return (
      <div
        ref={ref}
        role="listbox"
        aria-multiselectable={selectionMode === "multiple" || undefined}
        aria-orientation="horizontal"
        className={cn(
          "grid content-start gap-y-[8px] p-[8px] bg-os9-white",
          "font-[family-name:var(--os9-font-sans)] text-[9px]",
          className
        )}
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${cellWidth}px, 1fr))`,
          ...style,
        }}
        onClick={(e) => {
          onClick?.(e)
          window.clearTimeout(renameTimer.current)
          if (!e.defaultPrevented && selected.length) setSelected([])
        }}
        {...props}
      >
        {items.map((item) => {
          const isSelected = selectedSet.has(item.id)
          const renaming = renamingId === item.id
          return (
            <div
              key={item.id}
              role="option"
              aria-selected={isSelected}
              aria-disabled={item.disabled || undefined}
              aria-label={item.label}
              tabIndex={item.id === tabbableId ? 0 : -1}
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el)
                else itemRefs.current.delete(item.id)
              }}
              onFocus={(e) => {
                if (e.target === e.currentTarget) setFocusedId(item.id)
              }}
              onKeyDown={(e) => handleKeyDown(e, item)}
              onClick={(e) => {
                e.stopPropagation()
                if (renaming) return
                if (!(e.target as HTMLElement).hasAttribute("data-label")) {
                  window.clearTimeout(renameTimer.current)
                }
                setFocusedId(item.id)
                select(item, {
                  shift: e.shiftKey,
                  toggle: e.metaKey || e.ctrlKey,
                })
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                window.clearTimeout(renameTimer.current)
                if (!item.disabled && !renaming) onOpen?.(item)
              }}
              className={cn(
                "group/icon flex cursor-default select-none flex-col items-center gap-[2px] p-[2px]",
                "outline-none",
                item.disabled && "opacity-50"
              )}
            >
              <span
                className={cn(
                  "flex size-[34px] items-center justify-center",
                  isSelected && "brightness-[0.55]"
                )}
              >
                {item.icon}
              </span>
              {renaming ? (
                <RenameField
                  initial={item.label}
                  onCommit={(label) => endRename(item, label)}
                  onCancel={() => endRename(item)}
                />
              ) : (
                <span
                  data-label=""
                  onClick={(e) => {
                    // Slow second click on an already-selected label → rename.
                    if (
                      renamable &&
                      isSelected &&
                      selected.length === 1 &&
                      !e.shiftKey &&
                      !e.metaKey &&
                      !e.ctrlKey &&
                      e.detail === 1
                    ) {
                      window.clearTimeout(renameTimer.current)
                      renameTimer.current = window.setTimeout(
                        () => startRename(item),
                        RENAME_DELAY_MS
                      )
                    }
                  }}
                  className={cn(
                    "max-w-full px-[3px] text-center leading-[1.3] break-words line-clamp-2",
                    "group-focus-visible/icon:shadow-[0_0_0_2px_var(--os9-focus)]",
                    isSelected
                      ? "bg-os9-azul text-os9-white"
                      : "bg-os9-white text-os9-black"
                  )}
                >
                  {item.label}
                </span>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
RetroIconView.displayName = "RetroIconView"

export { RetroIconView }
