"use client"

/*
 * RetroTreeView on UI SDK Tree: the Finder's list view, driven by data.
 *
 * Crafted moments:
 *  - The disclosure triangle turns in two hard frames through 45°, like the
 *    1999 Finder's, and inverts with its row when selected. Both flairs.
 *  - Folders unroll: a group morphs its height open and shut (220ms open,
 *    180ms close) instead of pushing every row below in one jump. Classic
 *    flair and reduced motion pop it at once.
 *
 * Arrow keys, Home/End, typeahead, `*` to expand siblings, Alt+arrows for a
 * whole branch, Shift/Cmd selection and Cmd+A come from UI SDK's tree.
 */

import * as React from "react"
import {
  Tree as TreePrimitive,
  TreeGroup as TreeGroupPrimitive,
  TreeItem as TreeItemPrimitive,
  TreeItemIndicator as TreeItemIndicatorPrimitive,
  TreeItemLabel as TreeItemLabelPrimitive,
  type TreeProps,
} from "@ui-sdk/react/tree"

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
  ref?: React.Ref<HTMLDivElement>
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
const INDENT = 16

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

/* 0° → 45° → 90° in two frames, like the 1999 Finder */
function DisclosureTriangle() {
  return (
    <TreeItemIndicatorPrimitive
      // A double-click on the triangle toggles twice; it never opens the item.
      onDoubleClick={(e: React.MouseEvent) => e.stopPropagation()}
      className="group/ind flex size-[12px] shrink-0 items-center justify-center"
    >
      <svg
        width="7"
        height="9"
        viewBox="0 0 7 9"
        aria-hidden="true"
        className={cn(
          "transition-transform duration-[110ms] [transition-timing-function:steps(2,end)]",
          "motion-reduce:transition-none",
          "group-data-expanded/ind:rotate-90"
        )}
      >
        <path
          d="M0.5 0.5L6 4.5L0.5 8.5Z"
          className="fill-os9-gray-600 stroke-os9-black group-data-selected/row:fill-os9-white group-data-selected/row:stroke-os9-white"
          strokeWidth="1"
          strokeLinejoin="miter"
        />
      </svg>
    </TreeItemIndicatorPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroTreeView                                                      */
/* ------------------------------------------------------------------ */

function RetroTreeView({
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
}: RetroTreeViewProps) {
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
    const getValue = (n: TreeNode) => (col?.sortValue ? col.sortValue(n) : n[sort.column])
    return sortTree(items, getValue, sort.direction)
  }, [items, sort, sortItems, cols])

  /* ---- Lookup for onActivate ---- */
  const byId = React.useMemo(() => {
    const map = new Map<string, TreeNode>()
    const walk = (nodes: TreeNode[]) =>
      nodes.forEach((n) => {
        map.set(n.id, n)
        if (n.children) walk(n.children)
      })
    walk(items)
    return map
  }, [items])

  /* ---- Selection: our API is always an array; UI SDK's single is a string ---- */
  const selectionProps = (
    selectionMode === "multiple"
      ? {
          mode: "multiple",
          value: selected,
          onValueChange: (next: string[], details: { reason: string; event?: Event }) => {
            // A plain click selects just that item, as in the Finder; UI SDK
            // toggles it. Shift and Cmd/Ctrl clicks keep UI SDK's behaviour.
            const e = details.event
            if (
              details.reason === "item-press" &&
              e instanceof MouseEvent &&
              !e.shiftKey &&
              !e.metaKey &&
              !e.ctrlKey
            ) {
              const id = (e.target as Element | null)
                ?.closest("[data-tree-id]")
                ?.getAttribute("data-tree-id")
              if (id) return setSelected([id])
            }
            setSelected(next)
          },
        }
      : {
          mode: selectionMode,
          activation: "automatic",
          value: selected[0] ?? null,
          onValueChange: (next: string | null) => setSelected(next ? [next] : []),
        }
  ) as Pick<TreeProps, "mode" | "value" | "onValueChange" | "activation">

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
  const renderNodes = (nodes: TreeNode[]) =>
    nodes.map((node) => {
      const folder = isFolder(node)
      const hasKids = folder && (node.children?.length ?? 0) > 0

      const icon = showIcons
        ? (node.icon ?? (folder ? <RetroTreeViewFolderIcon /> : <RetroTreeViewDocumentIcon />))
        : null

      const labelCell = (
        <span
          className="flex min-w-0 items-center gap-[4px]"
          style={{ paddingLeft: `calc((var(--tree-level, 1) - 1) * ${INDENT}px)` }}
        >
          {hasKids ? (
            <DisclosureTriangle />
          ) : (
            <span className="size-[12px] shrink-0" aria-hidden="true" />
          )}
          {icon && (
            <span className="flex shrink-0 items-center group-data-selected/row:brightness-[0.6]">
              {icon}
            </span>
          )}
          <span className="truncate">{node.label}</span>
        </span>
      )

      return (
        <TreeItemPrimitive
          key={node.id}
          value={node.id}
          label={node.label}
          disabled={node.disabled}
          data-tree-id={node.id}
          className="outline-none"
        >
          <TreeItemLabelPrimitive
            onDoubleClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              if (!node.disabled) onActivate?.(node)
            }}
            style={gridTemplateColumns ? { gridTemplateColumns } : undefined}
            className={cn(
              "group/row h-[18px] cursor-default select-none items-center",
              "font-[family-name:var(--os9-font-sans)] text-[10px] text-os9-black",
              cols ? "grid" : "flex pr-[6px]",
              /* Focus stays on the item; ring only its own row, not nested ones */
              "[[data-slot=tree-item]:focus-visible>&]:shadow-[inset_0_0_0_2px_var(--os9-focus)]",
              "data-selected:bg-os9-azul data-selected:text-os9-white",
              "data-disabled:text-os9-gray-600"
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
                      active && "bg-os9-gray-200 group-data-selected/row:bg-transparent"
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
          </TreeItemLabelPrimitive>
          {hasKids && (
            <TreeGroupPrimitive
              className={cn(
                "h-(--tree-group-height) overflow-hidden",
                "transition-[height] duration-220 ease-[cubic-bezier(0.23,1,0.32,1)]",
                "data-starting-style:h-0 data-ending-style:h-0 data-ending-style:duration-180",
                "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
              )}
            >
              {renderNodes(node.children!)}
            </TreeGroupPrimitive>
          )}
        </TreeItemPrimitive>
      )
    })

  return (
    <div
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
                    className={cn("shrink-0", sort?.direction === "desc" && "rotate-180")}
                  >
                    <path d="M0 4L3.5 0L7 4Z" fill="currentColor" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
      <TreePrimitive
        aria-label={ariaLabel}
        {...selectionProps}
        expanded={expanded}
        onExpandedChange={(next: string[]) => setExpanded(next)}
        expandOnPress={false}
        onAction={(value: string, details: { event?: Event }) => {
          // Enter runs onActivate; a single click only selects (double-click
          // is handled on the row, like the Finder).
          if (!(details.event instanceof KeyboardEvent)) return
          const node = byId.get(value)
          if (node && !node.disabled) onActivate?.(node)
        }}
        className="flex-1 py-[1px] outline-none"
        onClick={(e: React.MouseEvent) => {
          if (e.target !== e.currentTarget) return
          if (selectionMode !== "none" && selected.length) setSelected([])
        }}
      >
        {renderNodes(sortedItems)}
      </TreePrimitive>
    </div>
  )
}

RetroTreeViewFolderIcon.displayName = "RetroTreeViewFolderIcon"
RetroTreeViewDocumentIcon.displayName = "RetroTreeViewDocumentIcon"

export { RetroTreeView, RetroTreeViewFolderIcon, RetroTreeViewDocumentIcon }
