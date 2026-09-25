"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroAppSwitcher } from "@/registry/new-york/ui/retro-app-switcher"
import {
  RetroControlStrip,
  RetroControlStripModule,
} from "@/registry/new-york/ui/retro-control-strip"
import {
  RetroDesktopArea,
  RetroDesktopIcon,
  RetroDesktopMenuBar,
} from "@/registry/new-york/ui/retro-desktop"
import {
  RetroDropdownMenuRadioGroup,
  RetroDropdownMenuRadioItem,
} from "@/registry/new-york/ui/retro-dropdown-menu"
import {
  RetroIconApplication,
  RetroIconDocument,
  RetroIconFinder,
  RetroIconFolder,
  RetroIconHardDrive,
  RetroIconTrash,
} from "@/registry/new-york/ui/retro-icons"
import {
  RetroMenuBar,
  RetroMenuBarContent,
  RetroMenuBarItem,
  RetroMenuBarMenu,
  RetroMenuBarRadioGroup,
  RetroMenuBarRadioItem,
  RetroMenuBarSeparator,
  RetroMenuBarShortcut,
  RetroMenuBarTrigger,
} from "@/registry/new-york/ui/retro-menu-bar"
import { RetroTextarea } from "@/registry/new-york/ui/retro-textarea"
import {
  RetroTreeView,
  type RetroTreeViewColumn,
  type TreeNode,
} from "@/registry/new-york/ui/retro-tree-view"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"

/* ------------------------------------------------------------------ */
/*  Types & data                                                       */
/* ------------------------------------------------------------------ */

type ShellWindowId = "finder" | "note"

interface DesktopShellBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Startup disk name: the hard disk icon and Finder window title. Defaults to "Macintosh HD". */
  title?: string
  /** Contents of the Finder window (Finder list view nodes). */
  finderItems?: TreeNode[]
  /** Text of the SimpleText "Read Me" note. */
  noteText?: string
  /** Extra windows or content rendered on the desktop, above the icons. */
  children?: React.ReactNode
}

const DEFAULT_ITEMS: TreeNode[] = [
  {
    id: "apps",
    label: "Applications",
    kind: "folder",
    children: [
      { id: "simpletext", label: "SimpleText", size: "668K", kind: "application program" },
      { id: "calc", label: "Graphing Calculator", size: "1.9 MB", kind: "application program" },
    ],
  },
  {
    id: "docs",
    label: "Documents",
    kind: "folder",
    children: [
      { id: "letter", label: "Letter to Grandma", size: "4K", kind: "SimpleText document" },
      { id: "budget", label: "Budget 2002", size: "22K", kind: "AppleWorks document" },
    ],
  },
  { id: "system", label: "System Folder", kind: "folder", children: [] },
  { id: "readme", label: "Read Me", size: "12K", kind: "SimpleText document" },
]

const DEFAULT_NOTE = `Welcome to Mac OS 9!

Drag windows by their title bars. Click a window to bring it to the front, or double-click its title bar to roll it up.

Double-click the hard disk icon to reopen the Finder window.`

const COLUMNS: RetroTreeViewColumn[] = [
  { key: "label", header: "Name", width: "minmax(120px,1fr)" },
  { key: "size", header: "Size", width: 56, align: "right", sortable: false },
  { key: "kind", header: "Kind", width: 130 },
]

/* ------------------------------------------------------------------ */
/*  Control Strip glyphs (16x16)                                       */
/* ------------------------------------------------------------------ */

function SpeakerGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 6.5H5.5L9.5 3.5V12.5L5.5 9.5H2.5Z" fill="var(--os9-gray-300)" stroke="var(--os9-black)" />
      <path d="M11.5 6C12.2 6.8 12.2 9.2 11.5 10M13 4.5C14.5 6.5 14.5 9.5 13 11.5" fill="none" stroke="var(--os9-black)" />
    </svg>
  )
}

function MonitorGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="9" fill="var(--os9-gray-300)" stroke="var(--os9-black)" />
      <rect x="3.5" y="4.5" width="9" height="5" fill="var(--os9-azul)" />
      <path d="M5.5 13.5H10.5" stroke="var(--os9-black)" />
    </svg>
  )
}

function NetworkGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1.5" y="2.5" width="5" height="4" fill="var(--os9-white)" stroke="var(--os9-black)" />
      <rect x="9.5" y="9.5" width="5" height="4" fill="var(--os9-white)" stroke="var(--os9-black)" />
      <path d="M4 6.5V11.5H9.5M12 9.5V4.5H6.5" fill="none" stroke="var(--os9-black)" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Clock (client-only, avoids hydration mismatch)                     */
/* ------------------------------------------------------------------ */

function MenuBarClock() {
  const [time, setTime] = React.useState("")
  React.useEffect(() => {
    const format = () => {
      const d = new Date()
      const h = d.getHours()
      return `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`
    }
    const update = () => setTime(format())
    const first = setTimeout(update, 0)
    const timer = setInterval(update, 15_000)
    return () => {
      clearTimeout(first)
      clearInterval(timer)
    }
  }, [])
  return (
    <span className="min-w-[52px] shrink-0 text-right tabular-nums @max-[420px]:hidden" aria-live="off">
      {time}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  DesktopShellBlock                                                  */
/* ------------------------------------------------------------------ */

const DesktopShellBlock = React.forwardRef<HTMLDivElement, DesktopShellBlockProps>(
  function DesktopShellBlock(
    {
      title = "Macintosh HD",
      finderItems = DEFAULT_ITEMS,
      noteText = DEFAULT_NOTE,
      className,
      children,
      ...props
    },
    ref
  ) {
    /* Window stack: last id is frontmost. */
    const [stack, setStack] = React.useState<ShellWindowId[]>(["finder", "note"])
    const bringToFront = (id: ShellWindowId) =>
      setStack((s) => (s[s.length - 1] === id ? s : [...s.filter((x) => x !== id), id]))
    const close = (id: ShellWindowId) => setStack((s) => s.filter((x) => x !== id))

    const [hidden, setHidden] = React.useState<ShellWindowId[]>([])
    const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null)
    const [finderView, setFinderView] = React.useState("list")
    const [volume, setVolume] = React.useState("4")
    const [depth, setDepth] = React.useState("millions")
    const [appleTalk, setAppleTalk] = React.useState("on")

    const visible = stack.filter((id) => !hidden.includes(id))
    const front = visible[visible.length - 1] as ShellWindowId | undefined
    const activeApp = front === "note" ? "simpletext" : "finder"

    const open = (id: ShellWindowId) => {
      setHidden((h) => h.filter((x) => x !== id))
      bringToFront(id)
    }

    const iconAction: Record<string, () => void> = {
      hd: () => open("finder"),
      readme: () => open("note"),
    }

    const windowFrame = (id: ShellWindowId) => ({
      style: { zIndex: 10 + stack.indexOf(id) },
      onPointerDownCapture: () => bringToFront(id),
      onFocusCapture: () => bringToFront(id),
    })

    return (
      <div
        ref={ref}
        className={cn(
          "@container relative flex h-full min-h-[420px] w-full flex-col overflow-hidden bg-os9-gray-200",
          className
        )}
        {...props}
      >
        {/* ---------------- Menu bar ---------------- */}
        <RetroDesktopMenuBar showClock={false} className="relative z-[100] pr-0">
          <RetroMenuBar className="h-[19px] min-w-0 gap-0 overflow-hidden border-0 bg-transparent px-0 shadow-none">
            <RetroMenuBarMenu>
              <RetroMenuBarTrigger className="h-[19px] px-[7px] font-bold">File</RetroMenuBarTrigger>
              <RetroMenuBarContent>
                <RetroMenuBarItem disabled>
                  New Folder<RetroMenuBarShortcut>⌘N</RetroMenuBarShortcut>
                </RetroMenuBarItem>
                <RetroMenuBarItem
                  disabled={!selectedIcon || !iconAction[selectedIcon]}
                  onSelect={() => selectedIcon && iconAction[selectedIcon]?.()}
                >
                  Open<RetroMenuBarShortcut>⌘O</RetroMenuBarShortcut>
                </RetroMenuBarItem>
                <RetroMenuBarItem disabled={!front} onSelect={() => front && close(front)}>
                  Close Window<RetroMenuBarShortcut>⌘W</RetroMenuBarShortcut>
                </RetroMenuBarItem>
                <RetroMenuBarSeparator />
                <RetroMenuBarItem disabled>
                  Get Info<RetroMenuBarShortcut>⌘I</RetroMenuBarShortcut>
                </RetroMenuBarItem>
                <RetroMenuBarItem disabled>
                  Find…<RetroMenuBarShortcut>⌘F</RetroMenuBarShortcut>
                </RetroMenuBarItem>
              </RetroMenuBarContent>
            </RetroMenuBarMenu>

            <RetroMenuBarMenu>
              <RetroMenuBarTrigger className="h-[19px] px-[7px]">Edit</RetroMenuBarTrigger>
              <RetroMenuBarContent>
                <RetroMenuBarItem disabled>
                  Undo<RetroMenuBarShortcut>⌘Z</RetroMenuBarShortcut>
                </RetroMenuBarItem>
                <RetroMenuBarSeparator />
                <RetroMenuBarItem disabled>
                  Cut<RetroMenuBarShortcut>⌘X</RetroMenuBarShortcut>
                </RetroMenuBarItem>
                <RetroMenuBarItem disabled>
                  Copy<RetroMenuBarShortcut>⌘C</RetroMenuBarShortcut>
                </RetroMenuBarItem>
                <RetroMenuBarItem disabled>
                  Paste<RetroMenuBarShortcut>⌘V</RetroMenuBarShortcut>
                </RetroMenuBarItem>
                <RetroMenuBarSeparator />
                <RetroMenuBarItem disabled>
                  Select All<RetroMenuBarShortcut>⌘A</RetroMenuBarShortcut>
                </RetroMenuBarItem>
              </RetroMenuBarContent>
            </RetroMenuBarMenu>

            <RetroMenuBarMenu>
              <RetroMenuBarTrigger className="h-[19px] px-[7px]">View</RetroMenuBarTrigger>
              <RetroMenuBarContent>
                <RetroMenuBarRadioGroup value={finderView} onValueChange={setFinderView}>
                  <RetroMenuBarRadioItem value="list">as List</RetroMenuBarRadioItem>
                  <RetroMenuBarRadioItem value="plain">as Plain List</RetroMenuBarRadioItem>
                </RetroMenuBarRadioGroup>
              </RetroMenuBarContent>
            </RetroMenuBarMenu>

            <RetroMenuBarMenu>
              <RetroMenuBarTrigger className="h-[19px] px-[7px] @max-[480px]:hidden">Special</RetroMenuBarTrigger>
              <RetroMenuBarContent>
                <RetroMenuBarItem disabled>Empty Trash…</RetroMenuBarItem>
                <RetroMenuBarItem disabled>
                  Eject<RetroMenuBarShortcut>⌘E</RetroMenuBarShortcut>
                </RetroMenuBarItem>
                <RetroMenuBarSeparator />
                <RetroMenuBarItem>Sleep</RetroMenuBarItem>
                <RetroMenuBarItem>Restart</RetroMenuBarItem>
                <RetroMenuBarItem>Shut Down</RetroMenuBarItem>
              </RetroMenuBarContent>
            </RetroMenuBarMenu>

            <RetroMenuBarMenu>
              <RetroMenuBarTrigger className="h-[19px] px-[7px] @max-[480px]:hidden">Help</RetroMenuBarTrigger>
              <RetroMenuBarContent>
                <RetroMenuBarItem>
                  Mac Help<RetroMenuBarShortcut>⌘?</RetroMenuBarShortcut>
                </RetroMenuBarItem>
                <RetroMenuBarItem>Show Balloons</RetroMenuBarItem>
              </RetroMenuBarContent>
            </RetroMenuBarMenu>
          </RetroMenuBar>

          <div className="ml-auto flex h-full shrink-0 items-center gap-[8px]">
            <MenuBarClock />
            <RetroAppSwitcher
              apps={[
                { id: "finder", name: "Finder", icon: <RetroIconFinder size="sm" /> },
                {
                  id: "simpletext",
                  name: "SimpleText",
                  icon: <RetroIconApplication size="sm" />,
                  hidden: hidden.includes("note"),
                },
              ]}
              activeApp={activeApp}
              onActiveAppChange={(app) => open(app === "simpletext" ? "note" : "finder")}
              onHide={(app) =>
                setHidden((h) => [...h, app === "simpletext" ? "note" : "finder"])
              }
              onHideOthers={(app) => setHidden(app === "simpletext" ? ["finder"] : ["note"])}
              onShowAll={() => setHidden([])}
              className="@max-[560px]:[&>span:last-child]:hidden"
            />
          </div>
        </RetroDesktopMenuBar>

        {/* ---------------- Desktop ---------------- */}
        <RetroDesktopArea
          style={{
            backgroundColor: "var(--os9-lavender)",
            backgroundImage: "radial-gradient(var(--os9-focus) 0.7px, transparent 0.7px)",
            backgroundSize: "4px 4px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedIcon(null)
          }}
        >
          {/* Icons along the right edge */}
          <div className="absolute right-[8px] top-[8px] z-[1] flex flex-col items-center gap-[6px]">
            {[
              { id: "hd", label: title, icon: <RetroIconHardDrive /> },
              { id: "docs", label: "Documents", icon: <RetroIconFolder /> },
              { id: "readme", label: "Read Me", icon: <RetroIconDocument /> },
            ].map((icon) => (
              <RetroDesktopIcon
                key={icon.id}
                icon={icon.icon}
                label={icon.label}
                selected={selectedIcon === icon.id}
                onSelect={() => setSelectedIcon(icon.id)}
                onDoubleClick={() => iconAction[icon.id]?.()}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "o") {
                    e.preventDefault()
                    iconAction[icon.id]?.()
                  }
                }}
              />
            ))}
          </div>
          <RetroDesktopIcon
            icon={<RetroIconTrash />}
            label="Trash"
            selected={selectedIcon === "trash"}
            onSelect={() => setSelectedIcon("trash")}
            className="absolute bottom-[8px] right-[8px] z-[1]"
          />

          {/* Finder window */}
          {visible.includes("finder") && (
            <div className="absolute left-[16px] top-[16px]" {...windowFrame("finder")}>
              <RetroWindow
                title={title}
                active={front === "finder"}
                draggable
                resizable
                minWidth={220}
                minHeight={140}
                onClose={() => close("finder")}
                contentClassName="flex flex-col p-0"
                className="h-[260px] w-[min(440px,calc(100cqw-120px))] min-w-[220px]"
              >
                <p className="shrink-0 border-b border-os9-black py-[3px] text-center font-[family-name:var(--os9-font-sans)] text-[10px] text-os9-black">
                  {finderItems.length} items, 1.2 GB available
                </p>
                <RetroTreeView
                  aria-label={title}
                  items={finderItems}
                  columns={finderView === "list" ? COLUMNS : undefined}
                  defaultSort={{ column: "label", direction: "asc" }}
                  className="min-h-0 flex-1 border-0 pb-[15px] shadow-none"
                  onActivate={(node) => {
                    if (node.id === "readme") open("note")
                  }}
                />
              </RetroWindow>
            </div>
          )}

          {/* SimpleText note */}
          {visible.includes("note") && (
            <div
              className="absolute left-[max(24px,min(260px,calc(100cqw-380px)))] top-[120px]"
              {...windowFrame("note")}
            >
              <RetroWindow
                title="Read Me"
                active={front === "note"}
                draggable
                resizable
                minWidth={200}
                minHeight={120}
                onClose={() => close("note")}
                contentClassName="flex p-0"
                className="h-[220px] w-[min(340px,calc(100cqw-120px))] min-w-[200px]"
              >
                <RetroTextarea
                  aria-label="Read Me"
                  size="sm"
                  defaultValue={noteText}
                  className="h-full min-h-0 resize-none border-0 pb-[18px] shadow-none focus:shadow-none"
                />
              </RetroWindow>
            </div>
          )}

          {children}

          {/* Control Strip */}
          <RetroControlStrip className="absolute bottom-[12px] left-0 z-[90]">
            <RetroControlStripModule
              icon={<SpeakerGlyph />}
              label="Sound Volume"
              menu={
                <RetroDropdownMenuRadioGroup value={volume} onValueChange={setVolume}>
                  {["0", "1", "2", "3", "4", "5", "6", "7"].map((v) => (
                    <RetroDropdownMenuRadioItem key={v} value={v}>
                      {v === "0" ? "Mute" : `Level ${v}`}
                    </RetroDropdownMenuRadioItem>
                  ))}
                </RetroDropdownMenuRadioGroup>
              }
            />
            <RetroControlStripModule
              icon={<MonitorGlyph />}
              label="Monitor Bit Depth"
              menu={
                <RetroDropdownMenuRadioGroup value={depth} onValueChange={setDepth}>
                  <RetroDropdownMenuRadioItem value="256">256 Colors</RetroDropdownMenuRadioItem>
                  <RetroDropdownMenuRadioItem value="thousands">Thousands</RetroDropdownMenuRadioItem>
                  <RetroDropdownMenuRadioItem value="millions">Millions</RetroDropdownMenuRadioItem>
                </RetroDropdownMenuRadioGroup>
              }
            />
            <RetroControlStripModule
              icon={<NetworkGlyph />}
              label="AppleTalk"
              menu={
                <RetroDropdownMenuRadioGroup value={appleTalk} onValueChange={setAppleTalk}>
                  <RetroDropdownMenuRadioItem value="on">AppleTalk Active</RetroDropdownMenuRadioItem>
                  <RetroDropdownMenuRadioItem value="off">AppleTalk Inactive</RetroDropdownMenuRadioItem>
                </RetroDropdownMenuRadioGroup>
              }
            />
          </RetroControlStrip>
        </RetroDesktopArea>
      </div>
    )
  }
)
DesktopShellBlock.displayName = "DesktopShellBlock"

export { DesktopShellBlock }
export type { DesktopShellBlockProps }
