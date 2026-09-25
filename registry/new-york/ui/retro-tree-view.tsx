"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

/** A node in the tree. Extra keys are available to columns by `key`. */
export interface TreeNode {
  id: string
  label: string
  /** Custom icon. Defaults to a folder (if `children` is set) or document. */
  icon?: React.ReactNode
  /** Child nodes. An empty array still renders the node as a folder. */
  children?: TreeNode[]
  /** Disabled nodes can be focused but not selected or activated. */
  disabled?: boolean
  /** Arbitrary column values (e.g. `modified`, `size`, `kind`). */
  [column: string]: unknown
}

export interface RetroTreeViewColumn {
  /**
   * Node key to display. The column with key `"label"` is the tree column
   * (disclosure triangle + icon + label). If no column has key `"label"`, a
   * "Name" column is prepended automatically.
   */
  key: string
  header: React.ReactNode
  /** Grid track width: number (px) or any CSS track, e.g. "minmax(0,1fr)". */
  width?: number | string
  align?: "left" | "right"
  /** Defaults to true. */
  sortable?: boolean
  /** Custom cell renderer. */
  render?: (node: TreeNode) => React.ReactNode
  /** Value used for sorting. Defaults to `node[key]`. */
  sortValue?: (node: TreeNode) => string | number | null | undefined
}

export type RetroTreeViewSortDirection = "asc" | "desc"

export interface RetroTreeViewSort {
  column: string
  direction: RetroTreeViewSortDirection
}

export interface RetroTreeViewProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onSelect" | "defaultValue" | "children"
  > {
  items: TreeNode[]
  /** Optional column definitions. When set, a Finder-style header row renders. */
  columns?: RetroTreeViewColumn[]
  /** Controlled sort. */
  sort?: RetroTreeViewSort | null
  defaultSort?: RetroTreeViewSort | null
  onSortChange?: (sort: RetroTreeViewSort) => void
  /** Set false to keep `items` order even when a sort column is active. */
  sortItems?: boolean

  /** Controlled expanded node ids. */
  expanded?: string[]
  defaultExpanded?: string[]
  onExpandedChange?: (expanded: string[]) => void

  /** Controlled selected node ids. */
  selected?: string[]
  defaultSelected?: string[]
  onSelectedChange?: (selected: string[]) => void
  /** Defaults to "single". */
  selectionMode?: "none" | "single" | "multiple"

  /** Enter / double-click on a node. */
  onActivate?: (node: TreeNode) => void
  /** Show node icons. Defaults to true. */
  showIcons?: boolean
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

interface FlatNode {
  node: TreeNode
  level: number
  parentId: string | null
  posinset: number
  setsize: number
}

const EMPTY: string[] = []
const INDENT = 16
const TYPEAHEAD_MS = 500

function isFolder(node: TreeNode) {
  return Array.isArray(node.children)
}

function compareValues(a: unknown, b: unknown) {
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1
  if (typeof a === "number" && typeof b === "number") return a - b
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  })
}

function sortTree(
  nodes: TreeNode[],
  getValue: (node: TreeNode) => unknown,
  direction: RetroTreeViewSortDirection
): TreeNode[] {
  const factor = direction === "asc" ? 1 : -1
  return [...nodes]
    .sort((a, b) => {
      const va = getValue(a)
      const vb = getValue(b)
      // Empty values ("—") always sink to the bottom, like Finder.
      if (va == null || vb == null) return compareValues(va, vb)
      return factor * compareValues(va, vb)
    })
    .map((n) =>
      n.children ? { ...n, children: sortTree(n.children, getValue, direction) } : n
    )
}

function trackWidth(width: number | string | undefined, isLabel: boolean) {
  if (typeof width === "number") return `${width}px`
  if (width) return width
  return isLabel ? "minmax(0,1fr)" : "120px"
}

/* ------------------------------------------------------------------ */
/*  Default icons (16x16)                                              */
/* ------------------------------------------------------------------ */

const RetroTreeViewFolderIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(function RetroTreeViewFolderIcon({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M1.5 4.5V3.5H6.5L7.5 4.5Z" fill="#ffcc66" stroke="#262626" />
      <rect x="1.5" y="4.5" width="13" height="9" fill="#ffcc66" stroke="#262626" />
      <path d="M2.5 12.5V5.5H13.5" fill="none" stroke="#ffe599" />
      <path d="M13.5 5.5V12.5H2.5" fill="none" stroke="#cc9933" />
    </svg>
  )
})

const RetroTreeViewDocumentIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(function RetroTreeViewDocumentIcon({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M3.5 1.5H10.5L13.5 4.5V14.5H3.5Z" fill="#ffffff" stroke="#262626" />
      <path d="M10.5 1.5V4.5H13.5" fill="#dddddd" stroke="#262626" />
      <path d="M5 7.5H12M5 9.5H12M5 11.5H10" stroke="#999999" />
    </svg>
  )
})

/* ------------------------------------------------------------------ */
/*  Disclosure triangle                                                */
/* ------------------------------------------------------------------ */

function DisclosureTriangle({
  expanded,
  onToggle,
}: {
  expanded: boolean
  onToggle: (e: React.MouseEvent) => void
}) {
  return (
    <span
      aria-hidden="true"
      onClick={onToggle}
      onDoubleClick={(e) => e.stopPropagation()}
      className="flex size-[12px] shrink-0 items-center justify-center"
    >
      <svg
        width="7"
        height="9"
        viewBox="0 0 7 9"
        className={cn(
          "transition-transform duration-150 ease-out motion-reduce:transition-none",
          expanded && "rotate-90"
        )}
      >
        <path
          d="M0.5 0.5L6 4.5L0.5 8.5Z"
          className="fill-os9-gray-600 stroke-os9-black group-data-[selected]/row:fill-os9-white group-data-[selected]/row:stroke-os9-white"
          strokeWidth="1"
          strokeLinejoin="miter"
        />
      </svg>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroTreeView                                                      */
/* ------------------------------------------------------------------ */

const RetroTreeView = React.forwardRef<HTMLDivElement, RetroTreeViewProps>(
  function RetroTreeView(
    {
      items,
      columns,
      sort: sortProp,
      defaultSort = null,
      onSortChange,
      sortItems = true,
      expanded: expandedProp,
      defaultExpanded = EMPTY,
      onExpandedChange,
      selected: selectedProp,
      defaultSelected = EMPTY,
      onSelectedChange,
      selectionMode = "single",
      onActivate,
      showIcons = true,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) {
    const [expanded, setExpanded] = useControllable(
      expandedProp,
      defaultExpanded,
      onExpandedChange
    )
    const [selected, setSelected] = useControllable(
      selectedProp,
      defaultSelected,
      onSelectedChange
    )
    const [sort, setSort] = useControllable<RetroTreeViewSort | null>(
      sortProp,
      defaultSort,
      onSortChange as ((s: RetroTreeViewSort | null) => void) | undefined
    )

    const expandedSet = React.useMemo(() => new Set(expanded), [expanded])
    const selectedSet = React.useMemo(() => new Set(selected), [selected])

    /* ---- Columns ---- */
    const cols = React.useMemo<RetroTreeViewColumn[] | null>(() => {
      if (!columns) return null
      if (columns.some((c) => c.key === "label")) return columns
      return [{ key: "label", header: "Name" }, ...columns]
    }, [columns])

    const gridTemplateColumns = cols
      ? cols.map((c) => trackWidth(c.width, c.key === "label")).join(" ")
      : undefined

    /* ---- Sorting ---- */
    const sortedItems = React.useMemo(() => {
      if (!sort || !sortItems) return items
      const col = cols?.find((c) => c.key === sort.column)
      const getValue = (n: TreeNode) =>
        col?.sortValue ? col.sortValue(n) : n[sort.column]
      return sortTree(items, getValue, sort.direction)
    }, [items, sort, sortItems, cols])

    /* ---- Flatten visible nodes ---- */
    const visible = React.useMemo(() => {
      const out: FlatNode[] = []
      const walk = (nodes: TreeNode[], level: number, parentId: string | null) => {
        nodes.forEach((node, i) => {
          out.push({ node, level, parentId, posinset: i + 1, setsize: nodes.length })
          if (node.children && expandedSet.has(node.id)) {
            walk(node.children, level + 1, node.id)
          }
        })
      }
      walk(sortedItems, 1, null)
      return out
    }, [sortedItems, expandedSet])

    const indexById = React.useMemo(() => {
      const map = new Map<string, number>()
      visible.forEach((f, i) => map.set(f.node.id, i))
      return map
    }, [visible])

    /* ---- Roving focus ---- */
    const [focusedId, setFocusedId] = React.useState<string | null>(null)
    const itemRefs = React.useRef(new Map<string, HTMLDivElement>())
    const anchorRef = React.useRef<string | null>(null)
    const pendingFocus = React.useRef(false)

    const tabbableId =
      focusedId && indexById.has(focusedId)
        ? focusedId
        : (selected.find((id) => indexById.has(id)) ?? visible[0]?.node.id ?? null)

    React.useEffect(() => {
      if (!pendingFocus.current || !tabbableId) return
      pendingFocus.current = false
      itemRefs.current.get(tabbableId)?.focus()
    }, [tabbableId])

    const moveFocus = (id: string) => {
      pendingFocus.current = true
      setFocusedId(id)
      if (id === tabbableId) itemRefs.current.get(id)?.focus()
    }

    /* ---- Expansion ---- */
    const setNodeExpanded = (id: string, open: boolean) => {
      if (expandedSet.has(id) === open) return
      setExpanded(open ? [...expanded, id] : expanded.filter((x) => x !== id))
    }

    /* ---- Selection ---- */
    const selectRange = (fromId: string, toId: string, additive: boolean) => {
      const a = indexById.get(fromId) ?? 0
      const b = indexById.get(toId) ?? 0
      const [lo, hi] = a < b ? [a, b] : [b, a]
      const range = visible
        .slice(lo, hi + 1)
        .filter((f) => !f.node.disabled)
        .map((f) => f.node.id)
      setSelected(
        additive ? Array.from(new Set([...selected, ...range])) : range
      )
    }

    const selectNode = (
      node: TreeNode,
      mods: { shift?: boolean; toggle?: boolean } = {}
    ) => {
      if (selectionMode === "none" || node.disabled) return
      if (selectionMode === "single") {
        if (!(selected.length === 1 && selected[0] === node.id)) {
          setSelected([node.id])
        }
        anchorRef.current = node.id
        return
      }
      if (mods.shift && anchorRef.current && indexById.has(anchorRef.current)) {
        selectRange(anchorRef.current, node.id, !!mods.toggle)
        return
      }
      if (mods.toggle) {
        setSelected(
          selectedSet.has(node.id)
            ? selected.filter((x) => x !== node.id)
            : [...selected, node.id]
        )
      } else {
        setSelected([node.id])
      }
      anchorRef.current = node.id
    }

    /* ---- Type-ahead ---- */
    const typeahead = React.useRef({ buffer: "", timer: 0 })
    React.useEffect(() => {
      const t = typeahead.current
      return () => window.clearTimeout(t.timer)
    }, [])

    const handleTypeahead = (char: string, fromIndex: number) => {
      const t = typeahead.current
      window.clearTimeout(t.timer)
      t.buffer += char.toLowerCase()
      t.timer = window.setTimeout(() => {
        t.buffer = ""
      }, TYPEAHEAD_MS)
      const n = visible.length
      // A repeated single character cycles; otherwise search from current.
      const start = t.buffer.length === 1 ? fromIndex + 1 : fromIndex
      for (let i = 0; i < n; i++) {
        const f = visible[(start + i) % n]
        if (f.node.label.toLowerCase().startsWith(t.buffer)) return f.node
      }
      return null
    }

    /* ---- Keyboard ---- */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, flat: FlatNode) => {
      const { node } = flat
      const index = indexById.get(node.id) ?? 0
      const hasKids = isFolder(node) && (node.children?.length ?? 0) > 0
      const isOpen = expandedSet.has(node.id)
      const mod = e.metaKey || e.ctrlKey

      const goTo = (target: TreeNode | undefined, extend = false) => {
        if (!target) return
        e.preventDefault()
        moveFocus(target.id)
        if (extend && selectionMode === "multiple") {
          if (!anchorRef.current) anchorRef.current = node.id
          selectRange(anchorRef.current, target.id, false)
        } else if (!mod) {
          selectNode(target)
        }
      }

      switch (e.key) {
        case "ArrowDown":
          goTo(visible[index + 1]?.node, e.shiftKey)
          return
        case "ArrowUp":
          goTo(visible[index - 1]?.node, e.shiftKey)
          return
        case "Home":
          goTo(visible[0]?.node, e.shiftKey)
          return
        case "End":
          goTo(visible[visible.length - 1]?.node, e.shiftKey)
          return
        case "ArrowRight":
          e.preventDefault()
          if (!hasKids) return
          if (!isOpen) setNodeExpanded(node.id, true)
          else goTo(visible[index + 1]?.node)
          return
        case "ArrowLeft":
          e.preventDefault()
          if (hasKids && isOpen) {
            setNodeExpanded(node.id, false)
          } else if (flat.parentId) {
            goTo(visible[indexById.get(flat.parentId) ?? 0]?.node)
          }
          return
        case "Enter":
          e.preventDefault()
          if (!node.disabled) onActivate?.(node)
          return
        case " ":
          e.preventDefault()
          selectNode(node, { toggle: mod || selectionMode === "multiple" })
          return
        case "*": {
          e.preventDefault()
          const siblings = visible
            .filter(
              (f) =>
                f.parentId === flat.parentId &&
                (f.node.children?.length ?? 0) > 0
            )
            .map((f) => f.node.id)
          setExpanded(Array.from(new Set([...expanded, ...siblings])))
          return
        }
        case "a":
        case "A":
          if (mod && selectionMode === "multiple") {
            e.preventDefault()
            setSelected(visible.filter((f) => !f.node.disabled).map((f) => f.node.id))
            return
          }
          break
      }

      if (e.key.length === 1 && !mod && !e.altKey && e.key !== " ") {
        const match = handleTypeahead(e.key, index)
        if (match) goTo(match)
      }
    }

    /* ---- Header ---- */
    const handleHeaderClick = (col: RetroTreeViewColumn) => {
      if (col.sortable === false) return
      if (sort?.column === col.key) {
        setSort({ column: col.key, direction: sort.direction === "asc" ? "desc" : "asc" })
      } else {
        setSort({ column: col.key, direction: "asc" })
      }
    }

    /* ---- Render ---- */
    const renderNodes = (nodes: TreeNode[], level: number, parentId: string | null) =>
      nodes.map((node, i) => {
        const flat: FlatNode = {
          node,
          level,
          parentId,
          posinset: i + 1,
          setsize: nodes.length,
        }
        const folder = isFolder(node)
        const hasKids = folder && (node.children?.length ?? 0) > 0
        const isOpen = hasKids && expandedSet.has(node.id)
        const isSelected = selectedSet.has(node.id)

        const icon = showIcons
          ? (node.icon ?? (folder ? <RetroTreeViewFolderIcon /> : <RetroTreeViewDocumentIcon />))
          : null

        const labelCell = (
          <span
            className="flex min-w-0 items-center gap-[4px]"
            style={{ paddingLeft: (level - 1) * INDENT }}
          >
            {hasKids ? (
              <DisclosureTriangle
                expanded={isOpen}
                onToggle={(e) => {
                  e.stopPropagation()
                  setNodeExpanded(node.id, !isOpen)
                  moveFocus(node.id)
                }}
              />
            ) : (
              <span className="size-[12px] shrink-0" aria-hidden="true" />
            )}
            {icon && (
              <span
                className={cn(
                  "flex shrink-0 items-center",
                  isSelected && "brightness-[0.6]"
                )}
              >
                {icon}
              </span>
            )}
            <span className="truncate">{node.label}</span>
          </span>
        )

        return (
          <div
            key={node.id}
            role="treeitem"
            aria-level={level}
            aria-posinset={flat.posinset}
            aria-setsize={flat.setsize}
            aria-expanded={hasKids ? isOpen : undefined}
            aria-selected={selectionMode === "none" ? undefined : isSelected}
            aria-disabled={node.disabled || undefined}
            aria-label={node.label}
            tabIndex={node.id === tabbableId ? 0 : -1}
            ref={(el) => {
              if (el) itemRefs.current.set(node.id, el)
              else itemRefs.current.delete(node.id)
            }}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return
              handleKeyDown(e, flat)
            }}
            onFocus={(e) => {
              if (e.target === e.currentTarget) setFocusedId(node.id)
            }}
            className="group/item outline-none"
          >
            <div
              data-selected={isSelected || undefined}
              onClick={(e) => {
                e.stopPropagation()
                moveFocus(node.id)
                selectNode(node, {
                  shift: e.shiftKey,
                  toggle: e.metaKey || e.ctrlKey,
                })
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                if (!node.disabled) onActivate?.(node)
              }}
              style={gridTemplateColumns ? { gridTemplateColumns } : undefined}
              className={cn(
                "group/row h-[18px] cursor-default select-none items-center",
                "font-[family-name:var(--os9-font-sans)] text-[10px] text-os9-black",
                cols ? "grid" : "flex pr-[6px]",
                "group-focus-visible/item:shadow-[inset_0_0_0_2px_var(--os9-focus)]",
                isSelected && "bg-os9-azul text-os9-white",
                node.disabled && "text-os9-gray-600"
              )}
            >
              {cols ? (
                cols.map((col) => {
                  const active = sort?.column === col.key
                  return (
                    <span
                      key={col.key}
                      className={cn(
                        "flex h-full min-w-0 items-center px-[4px]",
                        col.align === "right" && "justify-end",
                        active && !isSelected && "bg-os9-gray-200"
                      )}
                    >
                      {col.key === "label" ? (
                        labelCell
                      ) : (
                        <span className="truncate">
                          {col.render
                            ? col.render(node)
                            : node[col.key] == null
                              ? "—"
                              : String(node[col.key])}
                        </span>
                      )}
                    </span>
                  )
                })
              ) : (
                <span className="flex min-w-0 items-center px-[4px]">{labelCell}</span>
              )}
            </div>
            {isOpen && node.children && (
              <div
                role="group"
                className="animate-in fade-in-0 duration-150 motion-reduce:animate-none"
              >
                {renderNodes(node.children, level + 1, node.id)}
              </div>
            )}
          </div>
        )
      })

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col overflow-auto os9-inset",
          "font-[family-name:var(--os9-font-sans)] text-[10px]",
          className
        )}
        {...props}
      >
        {cols && (
          <div
            className="sticky top-0 z-10 grid shrink-0 bg-os9-gray-300"
            style={{ gridTemplateColumns }}
          >
            {cols.map((col) => {
              const active = sort?.column === col.key
              const sortable = col.sortable !== false
              return (
                <button
                  key={col.key}
                  type="button"
                  disabled={!sortable}
                  onClick={() => handleHeaderClick(col)}
                  aria-label={
                    sortable
                      ? `Sort by ${typeof col.header === "string" ? col.header : col.key}`
                      : undefined
                  }
                  aria-pressed={sortable ? active : undefined}
                  className={cn(
                    "flex h-[18px] min-w-0 items-center gap-[4px] px-[6px] cursor-default",
                    "border-r border-b border-os9-black last:border-r-0",
                    "font-[family-name:var(--os9-font-sans)] text-[10px] text-os9-black",
                    "focus-visible:os9-focus-ring focus-visible:relative focus-visible:z-10",
                    col.align === "right" && "justify-end",
                    active
                      ? "bg-os9-gray-500 shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-gray-400)]"
                      : "bg-os9-gray-300 shadow-[var(--os9-shadow-raised)] enabled:active:bg-os9-gray-500"
                  )}
                >
                  <span className="truncate">{col.header}</span>
                  {active && (
                    <svg
                      width="7"
                      height="4"
                      viewBox="0 0 7 4"
                      aria-hidden="true"
                      className={cn(
                        "shrink-0",
                        sort?.direction === "desc" && "rotate-180"
                      )}
                    >
                      <path d="M0 4L3.5 0L7 4Z" fill="currentColor" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        )}
        <div
          role="tree"
          aria-label={ariaLabel}
          aria-multiselectable={selectionMode === "multiple" || undefined}
          className="flex-1 py-[1px]"
          onClick={() => {
            if (selectionMode !== "none" && selected.length) setSelected([])
          }}
        >
          {renderNodes(sortedItems, 1, null)}
        </div>
      </div>
    )
  }
)
RetroTreeView.displayName = "RetroTreeView"
RetroTreeViewFolderIcon.displayName = "RetroTreeViewFolderIcon"
RetroTreeViewDocumentIcon.displayName = "RetroTreeViewDocumentIcon"

export { RetroTreeView, RetroTreeViewFolderIcon, RetroTreeViewDocumentIcon }
