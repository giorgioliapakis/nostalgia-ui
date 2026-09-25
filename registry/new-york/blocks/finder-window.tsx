"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroBevelButton } from "@/registry/new-york/ui/retro-bevel-button"
import {
  RetroIconApplication,
  RetroIconDocument,
  RetroIconFolder,
} from "@/registry/new-york/ui/retro-icons"
import {
  RetroIconView,
  type IconViewItem,
} from "@/registry/new-york/ui/retro-icon-view"
import { RetroPlacard } from "@/registry/new-york/ui/retro-placard"
import {
  RetroTreeView,
  type RetroTreeViewColumn,
  type TreeNode,
} from "@/registry/new-york/ui/retro-tree-view"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type FinderItemType = "folder" | "document" | "application"

interface FinderItem {
  id: string
  /** File or folder name. */
  label: string
  /** Picks the default icons. Inferred from `children` when omitted. */
  type?: FinderItemType
  /** Kind column text, e.g. "SimpleText text document". Defaults per type. */
  kind?: string
  /** Size in bytes. Folders show "—". */
  size?: number
  /**
   * Last modified. Pass a Date or an ISO string without a time zone
   * (e.g. "1999-10-23T14:32") so server and client format it identically.
   */
  modified?: Date | string
  /** 32px icon for icon view. */
  icon?: React.ReactNode
  /** 16px icon for list view. */
  smallIcon?: React.ReactNode
  /** Folder contents. An empty array still makes the item a folder. */
  children?: FinderItem[]
}

type FinderView = "list" | "icon"

interface FinderWindowBlockProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RetroWindow>,
    "title" | "children" | "resizable"
  > {
  /** Folder name shown in the title bar. Defaults to "Macintosh HD". */
  title?: string
  /** Top-level contents of the folder. */
  items: FinderItem[]
  /** Controlled view. */
  view?: FinderView
  /** Uncontrolled initial view. Defaults to "list". */
  defaultView?: FinderView
  onViewChange?: (view: FinderView) => void
  /** Double-click / Enter on an item. */
  onOpen?: (item: FinderItem) => void
  /** Free space shown in the header, e.g. "1.2 GB". Defaults to "1.2 GB". */
  available?: string
  /** Initially expanded folder ids (list view). */
  defaultExpanded?: string[]
  /** Show the size box. Defaults to true. */
  resizable?: boolean
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function toDate(value: Date | string | undefined) {
  if (!value) return null
  const d = typeof value === "string" ? new Date(value) : value
  return Number.isNaN(d.getTime()) ? null : d
}

/** "Sat, Oct 23, 1999, 2:32 PM" — Finder's long date format. */
function formatFinderDate(value: Date | string | undefined) {
  const d = toDate(value)
  if (!d) return null
  const h = d.getHours()
  const m = String(d.getMinutes()).padStart(2, "0")
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${h % 12 || 12}:${m} ${h >= 12 ? "PM" : "AM"}`
}

/** Finder-style sizes: "4K", "312K", "1.2 MB". */
function formatFinderSize(bytes: number | undefined) {
  if (bytes == null) return null
  const k = bytes / 1024
  if (k < 1000) return `${Math.max(1, Math.round(k))}K`
  const mb = k / 1024
  if (mb < 1000) return `${mb.toFixed(1).replace(/\.0$/, "")} MB`
  return `${(mb / 1024).toFixed(1).replace(/\.0$/, "")} GB`
}

function itemType(item: FinderItem): FinderItemType {
  return item.type ?? (item.children ? "folder" : "document")
}

const DEFAULT_KIND: Record<FinderItemType, string> = {
  folder: "folder",
  document: "document",
  application: "application program",
}

function defaultIcon(type: FinderItemType, size: "sm" | "default") {
  if (type === "folder") return <RetroIconFolder size={size} />
  if (type === "application") return <RetroIconApplication size={size} />
  return <RetroIconDocument size={size} />
}

function toTreeNode(item: FinderItem): TreeNode {
  const type = itemType(item)
  return {
    id: item.id,
    label: item.label,
    icon: item.smallIcon ?? defaultIcon(type, "sm"),
    children: item.children?.map(toTreeNode),
    modified: toDate(item.modified)?.getTime(),
    modifiedText: formatFinderDate(item.modified),
    size: type === "folder" ? undefined : item.size,
    kind: item.kind ?? DEFAULT_KIND[type],
  }
}

function indexItems(items: FinderItem[], map = new Map<string, FinderItem>()) {
  for (const item of items) {
    map.set(item.id, item)
    if (item.children) indexItems(item.children, map)
  }
  return map
}

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function ListViewGlyph() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" aria-hidden="true">
      <path d="M0 0.5H2M0 4.5H2M0 8.5H2M4 0.5H12M4 4.5H12M4 8.5H12" stroke="currentColor" />
    </svg>
  )
}

function IconViewGlyph() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" aria-hidden="true">
      <path d="M0.5 0.5H4.5V4.5H0.5ZM7.5 0.5H11.5V4.5H7.5ZM0.5 5.5H4.5V9.5H0.5ZM7.5 5.5H11.5V9.5H7.5Z" fill="none" stroke="currentColor" />
    </svg>
  )
}

/** Decorative Platinum horizontal scroll bar (inactive: no thumb). */
function HorizontalScrollBar() {
  const arrow = (dir: "left" | "right") => (
    <span
      className={cn(
        "flex w-[15px] shrink-0 items-center justify-center bg-os9-gray-300 shadow-[var(--os9-shadow-raised)]",
        dir === "left" ? "border-r border-os9-black" : "border-l border-os9-black"
      )}
    >
      <svg width="4" height="7" viewBox="0 0 4 7" className={dir === "left" ? "rotate-180" : undefined}>
        <path d="M0 0L4 3.5L0 7Z" fill="var(--os9-gray-600)" />
      </svg>
    </span>
  )
  return (
    <div aria-hidden="true" className="flex h-full min-w-[40px] flex-1">
      {arrow("left")}
      <span className="flex-1 bg-os9-gray-300 shadow-[inset_1px_1px_0_var(--os9-gray-500)]" />
      {arrow("right")}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FinderWindowBlock                                                  */
/* ------------------------------------------------------------------ */

const FinderWindowBlock = React.forwardRef<HTMLDivElement, FinderWindowBlockProps>(
  function FinderWindowBlock(
    {
      title = "Macintosh HD",
      items,
      view: viewProp,
      defaultView = "list",
      onViewChange,
      onOpen,
      available = "1.2 GB",
      defaultExpanded,
      resizable = true,
      className,
      contentClassName,
      ...props
    },
    ref
  ) {
    const [internalView, setInternalView] = React.useState<FinderView>(defaultView)
    const view = viewProp ?? internalView
    const setView = (next: FinderView) => {
      if (viewProp === undefined) setInternalView(next)
      onViewChange?.(next)
    }

    const [selected, setSelected] = React.useState<string[]>([])

    const byId = React.useMemo(() => indexItems(items), [items])
    const treeItems = React.useMemo(() => items.map(toTreeNode), [items])
    const iconItems = React.useMemo<IconViewItem[]>(
      () =>
        items.map((item) => ({
          id: item.id,
          label: item.label,
          icon: item.icon ?? defaultIcon(itemType(item), "default"),
        })),
      [items]
    )

    /* Drop the widest columns when the window gets narrow. */
    const bodyRef = React.useRef<HTMLDivElement>(null)
    const [bodyWidth, setBodyWidth] = React.useState<number | null>(null)
    React.useEffect(() => {
      const el = bodyRef.current
      if (!el) return
      const ro = new ResizeObserver(([entry]) => setBodyWidth(entry.contentRect.width))
      ro.observe(el)
      return () => ro.disconnect()
    }, [])
    const showDate = bodyWidth === null || bodyWidth >= 380
    const showKind = bodyWidth === null || bodyWidth >= 520

    const columns = React.useMemo<RetroTreeViewColumn[]>(() => {
      const cols: RetroTreeViewColumn[] = [
        { key: "label", header: "Name", width: "minmax(120px,1fr)" },
      ]
      if (showDate)
        cols.push({
          key: "modified",
          header: "Date Modified",
          width: 176,
          render: (n) => (n.modifiedText as string | null) ?? "—",
        })
      cols.push({
        key: "size",
        header: "Size",
        width: 64,
        align: "right",
        render: (n) => formatFinderSize(n.size as number | undefined) ?? "—",
      })
      if (showKind) cols.push({ key: "kind", header: "Kind", width: 150 })
      return cols
    }, [showDate, showKind])

    const count = items.length
    const selectedCount = selected.filter((id) => byId.has(id)).length

    return (
      <RetroWindow
        ref={ref}
        title={title}
        resizable={resizable}
        minWidth={240}
        minHeight={180}
        className={cn("h-[380px] w-full max-w-[640px]", className)}
        contentClassName={cn("flex flex-col p-0", contentClassName)}
        footer={
          <div className="flex h-[15px] items-stretch">
            <RetroPlacard className="h-[15px] border-y-0 border-l-0">
              {selectedCount > 0
                ? `${selectedCount} of ${count} selected`
                : `${count} ${count === 1 ? "item" : "items"}`}
            </RetroPlacard>
            <HorizontalScrollBar />
          </div>
        }
        {...props}
      >
        {/* Header strip: view buttons + item count / free space */}
        <div className="flex h-[22px] shrink-0 items-center gap-2 border-b border-os9-black px-[4px] shadow-[inset_0_-1px_0_var(--os9-gray-500)]">
          <div role="group" aria-label="View" className="flex shrink-0">
            <RetroBevelButton
              bevel="small"
              size="sm"
              aria-label="as List"
              title="as List"
              pressed={view === "list"}
              onPressedChange={() => setView("list")}
              icon={<ListViewGlyph />}
              className="h-[16px] min-h-0 w-[20px] min-w-0 px-0 py-0"
            />
            <RetroBevelButton
              bevel="small"
              size="sm"
              aria-label="as Icons"
              title="as Icons"
              pressed={view === "icon"}
              onPressedChange={() => setView("icon")}
              icon={<IconViewGlyph />}
              className="-ml-px h-[16px] min-h-0 w-[20px] min-w-0 px-0 py-0"
            />
          </div>
          <p className="min-w-0 flex-1 truncate pr-[44px] text-center font-[family-name:var(--os9-font-sans)] text-[10px] text-os9-black max-[420px]:pr-0">
            {count} {count === 1 ? "item" : "items"}, {available} available
          </p>
        </div>

        {/* Body */}
        <div ref={bodyRef} className="min-h-0 flex-1">
          {view === "list" ? (
            <RetroTreeView
              aria-label={title}
              items={treeItems}
              columns={columns}
              defaultSort={{ column: "label", direction: "asc" }}
              defaultExpanded={defaultExpanded}
              selectionMode="multiple"
              selected={selected}
              onSelectedChange={setSelected}
              onActivate={(node) => {
                const item = byId.get(node.id)
                if (item) onOpen?.(item)
              }}
              className="h-full border-0 shadow-none"
            />
          ) : (
            <RetroIconView
              aria-label={title}
              items={iconItems}
              selected={selected}
              onSelectedChange={setSelected}
              onOpen={(icon) => {
                const item = byId.get(icon.id)
                if (item) onOpen?.(item)
              }}
              className="h-full overflow-auto border-0 bg-os9-white shadow-none"
            />
          )}
        </div>
      </RetroWindow>
    )
  }
)
FinderWindowBlock.displayName = "FinderWindowBlock"

export { FinderWindowBlock, formatFinderDate, formatFinderSize }
export type { FinderWindowBlockProps, FinderItem, FinderItemType, FinderView }
