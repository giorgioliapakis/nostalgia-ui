"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroBevelButton } from "@/registry/new-york/ui/retro-bevel-button"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import {
  RetroDropdownMenu,
  RetroDropdownMenuContent,
  RetroDropdownMenuItem,
  RetroDropdownMenuLabel,
  RetroDropdownMenuSeparator,
  RetroDropdownMenuTrigger,
} from "@/registry/new-york/ui/retro-dropdown-menu"
import {
  RetroIconApplication,
  RetroIconDocument,
  RetroIconFolder,
  RetroIconHardDrive,
} from "@/registry/new-york/ui/retro-icons"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import {
  RetroSelect,
  RetroSelectContent,
  RetroSelectItem,
  RetroSelectTrigger,
  RetroSelectValue,
} from "@/registry/new-york/ui/retro-select"
import {
  RetroTreeView,
  type RetroTreeViewColumn,
  type TreeNode,
} from "@/registry/new-york/ui/retro-tree-view"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"

// Spread rather than a literal `asChild` attribute: the shadcn CLI rewrites
// literal `asChild` to Base UI's `render` prop in base-* projects, which
// breaks these Radix-based components.
const AS_CHILD = { asChild: true } as const

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface OpenSaveFile {
  id: string
  name: string
  /** Defaults to "folder" when `children` is set, otherwise "document". */
  type?: "folder" | "document" | "application"
  /** Date Modified. Use an ISO string without a zone (e.g. "2001-10-23T14:32"). */
  modified?: Date | string
  /** Folder contents. */
  children?: OpenSaveFile[]
}

type OpenSaveDialogMode = "open" | "save"

type OpenSaveResult =
  | {
      mode: "open"
      /** The chosen file. */
      file: OpenSaveFile
      /** Folder names from the volume down to the file's folder. */
      path: string[]
    }
  | {
      mode: "save"
      /** The typed file name. */
      name: string
      /** Folder names from the volume down to the destination folder. */
      path: string[]
    }

interface OpenSaveDialogBlockProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RetroWindow>,
    "title" | "children" | "onKeyDown"
  > {
  /** "open" (default) or "save". */
  mode?: OpenSaveDialogMode
  /** Contents of the volume (root folder). */
  files: OpenSaveFile[]
  /** Volume name shown at the root of the location pop-up. Defaults to "Macintosh HD". */
  volumeName?: string
  /** Initial folder, as a list of folder ids from the root. */
  defaultPath?: string[]
  /** Save mode: initial file name. Defaults to "untitled". */
  defaultName?: string
  /** Window title. Defaults to "Open" / "Save". */
  title?: string
  /** Open / Save button, Enter, or double-clicking a document. */
  onConfirm?: (result: OpenSaveResult) => void
  /** Cancel button, Escape or Command-period. */
  onCancel?: () => void
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** "Oct 23, 1999, 2:32 PM" — medium date used in the file list. */
function formatShortDate(value: Date | string | undefined) {
  if (!value) return null
  const d = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(d.getTime())) return null
  const h = d.getHours()
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`
}

function fileType(file: OpenSaveFile) {
  return file.type ?? (file.children ? "folder" : "document")
}

function smallIcon(file: OpenSaveFile) {
  const t = fileType(file)
  if (t === "folder") return <RetroIconFolder size="sm" />
  if (t === "application") return <RetroIconApplication size="sm" />
  return <RetroIconDocument size="sm" />
}

function toNode(file: OpenSaveFile): TreeNode {
  const d = file.modified ? new Date(file.modified) : null
  return {
    id: file.id,
    label: file.name,
    icon: smallIcon(file),
    children: file.children?.map(toNode),
    modified: d && !Number.isNaN(d.getTime()) ? d.getTime() : undefined,
    modifiedText: formatShortDate(file.modified),
  }
}

/** Resolve a path of folder ids to the folder chain. Stops at the first miss. */
function resolvePath(root: OpenSaveFile[], ids: string[]) {
  const chain: OpenSaveFile[] = []
  let level = root
  for (const id of ids) {
    const next = level.find((f) => f.id === id && f.children)
    if (!next) break
    chain.push(next)
    level = next.children!
  }
  return chain
}

function findInTree(files: OpenSaveFile[], id: string): OpenSaveFile | undefined {
  for (const f of files) {
    if (f.id === id) return f
    if (f.children) {
      const hit = findInTree(f.children, id)
      if (hit) return hit
    }
  }
  return undefined
}

/** Path (folder ids) from the given level down to the node's parent folder. */
function parentChain(files: OpenSaveFile[], id: string, trail: string[] = []): string[] | null {
  for (const f of files) {
    if (f.id === id) return trail
    if (f.children) {
      const hit = parentChain(f.children, id, [...trail, f.id])
      if (hit) return hit
    }
  }
  return null
}

function insertFolder(files: OpenSaveFile[], path: string[], folder: OpenSaveFile): OpenSaveFile[] {
  if (path.length === 0) return [...files, folder]
  return files.map((f) =>
    f.id === path[0] && f.children
      ? { ...f, children: insertFolder(f.children, path.slice(1), folder) }
      : f
  )
}

/* ------------------------------------------------------------------ */
/*  Glyphs for the Shortcuts / Favorites / Recent bevel buttons        */
/* ------------------------------------------------------------------ */

function FavoritesGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2.5 3.5H6.5L7.5 4.5H11.5V11.5H2.5Z" fill="var(--os9-gray-300)" stroke="currentColor" />
      <path d="M7 6L7.7 7.6L9.4 7.7L8.1 8.8L8.5 10.4L7 9.5L5.5 10.4L5.9 8.8L4.6 7.7L6.3 7.6Z" fill="currentColor" />
    </svg>
  )
}

function RecentGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <rect x="1.5" y="1.5" width="11" height="11" fill="var(--os9-white)" stroke="currentColor" />
      <path d="M7 3.5V7H10" fill="none" stroke="currentColor" />
    </svg>
  )
}

const MENU_BUTTON_CLS = "h-[22px] min-h-0 w-[34px] min-w-0 px-[4px] py-0"

/* ------------------------------------------------------------------ */
/*  OpenSaveDialogBlock                                                */
/* ------------------------------------------------------------------ */

const OpenSaveDialogBlock = React.forwardRef<HTMLDivElement, OpenSaveDialogBlockProps>(
  function OpenSaveDialogBlock(
    {
      mode = "open",
      files: filesProp,
      volumeName = "Macintosh HD",
      defaultPath = [],
      defaultName = "untitled",
      title,
      onConfirm,
      onCancel,
      className,
      contentClassName,
      ...props
    },
    ref
  ) {
    const id = React.useId()
    const isSave = mode === "save"
    const nameRef = React.useRef<HTMLInputElement>(null)

    // Local copy so New Folder can add to it.
    const [files, setFiles] = React.useState(filesProp)
    const [prevFilesProp, setPrevFilesProp] = React.useState(filesProp)
    if (prevFilesProp !== filesProp) {
      setPrevFilesProp(filesProp)
      setFiles(filesProp)
    }

    const [pathIds, setPathIds] = React.useState<string[]>(defaultPath)
    const chain = React.useMemo(() => resolvePath(files, pathIds), [files, pathIds])
    const current = React.useMemo(
      () => (chain.length ? chain[chain.length - 1].children! : files),
      [chain, files]
    )
    const folderIds = chain.map((f) => f.id)
    const pathNames = [volumeName, ...chain.map((f) => f.name)]

    const [selected, setSelected] = React.useState<string[]>([])
    const [expanded, setExpanded] = React.useState<string[]>([])
    const [name, setName] = React.useState(defaultName)
    const [show, setShow] = React.useState("known")
    const [favorites, setFavorites] = React.useState<string[][]>([])
    const [recent, setRecent] = React.useState<{ file: OpenSaveFile; path: string[] }[]>([])

    const nodes = React.useMemo(() => current.map(toNode), [current])
    const selectedFile = selected[0] ? findInTree(current, selected[0]) : undefined

    const columns = React.useMemo<RetroTreeViewColumn[]>(
      () => [
        { key: "label", header: "Name", width: "minmax(120px,1fr)" },
        {
          key: "modified",
          header: "Date Modified",
          width: "minmax(0,170px)",
          render: (n) => (n.modifiedText as string | null) ?? "—",
        },
      ],
      []
    )

    const navigate = (ids: string[]) => {
      setPathIds(ids)
      setSelected([])
      setExpanded([])
    }

    /** Folder ids (from the root) of a node inside the current list. */
    const idsTo = (fileId: string) => [...folderIds, ...(parentChain(current, fileId) ?? [])]
    const namesFor = (ids: string[]) => [volumeName, ...resolvePath(files, ids).map((f) => f.name)]

    const openFile = (file: OpenSaveFile) => {
      if (fileType(file) === "folder") {
        navigate([...idsTo(file.id), file.id])
        return
      }
      if (isSave) {
        setName(file.name)
        nameRef.current?.focus()
        return
      }
      const path = namesFor(idsTo(file.id))
      setRecent((r) => [{ file, path: idsTo(file.id) }, ...r.filter((x) => x.file.id !== file.id)].slice(0, 5))
      onConfirm?.({ mode: "open", file, path })
    }

    const confirm = () => {
      if (isSave) {
        const trimmed = name.trim()
        if (!trimmed) return
        // A selected folder is the save destination, as in Nav Services.
        if (selectedFile && fileType(selectedFile) === "folder") {
          onConfirm?.({ mode: "save", name: trimmed, path: namesFor([...idsTo(selectedFile.id), selectedFile.id]) })
        } else {
          onConfirm?.({ mode: "save", name: trimmed, path: pathNames })
        }
        return
      }
      if (selectedFile) openFile(selectedFile)
    }

    const newFolder = () => {
      const taken = new Set(current.map((f) => f.name))
      let n = 1
      let folderName = "untitled folder"
      while (taken.has(folderName)) folderName = `untitled folder ${++n}`
      const folder: OpenSaveFile = {
        id: `${id}-folder-${folderIds.join("/")}-${folderName}`,
        name: folderName,
        children: [],
      }
      setFiles((f) => insertFolder(f, folderIds, folder))
      setSelected([folder.id])
    }

    const canConfirm = isSave ? name.trim().length > 0 : !!selectedFile
    const confirmLabel =
      !isSave && selectedFile && fileType(selectedFile) === "folder" ? "Open" : isSave ? "Save" : "Open"

    return (
      <RetroWindow
        ref={ref}
        title={title ?? (isSave ? "Save" : "Open")}
        role="dialog"
        aria-label={title ?? (isSave ? "Save" : "Open")}
        className={cn("w-full max-w-[480px]", className)}
        contentClassName={cn("flex flex-col gap-[10px] p-[12px] max-[420px]:p-[8px]", contentClassName)}
        onKeyDown={(e) => {
          if (e.defaultPrevented) return
          if (e.key === "Escape" || (e.key === "." && (e.metaKey || e.ctrlKey))) {
            e.preventDefault()
            onCancel?.()
          } else if (e.key === "Enter") {
            const t = e.target as HTMLElement
            // Let buttons and pop-ups handle their own Enter.
            if (t.closest("button, [role=combobox], [role=menu]")) return
            e.preventDefault()
            confirm()
          }
        }}
        {...props}
      >
        {/* Save As name field */}
        {isSave && (
          <div className="flex items-center gap-2">
            <RetroLabel size="lg" htmlFor={`${id}-name`} className="shrink-0">
              Name:
            </RetroLabel>
            <RetroInput
              ref={nameRef}
              id={`${id}-name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => e.currentTarget.select()}
              className="min-w-0 flex-1"
              autoComplete="off"
            />
          </div>
        )}

        {/* Location row */}
        <div className="flex items-center gap-2">
          <RetroSelect
            value={String(chain.length)}
            onValueChange={(v) => navigate(folderIds.slice(0, Number(v)))}
          >
            <RetroSelectTrigger aria-label="Location" className="h-[22px] min-w-0 flex-1">
              <span className="flex min-w-0 items-center gap-[6px]">
                {chain.length ? <RetroIconFolder size="sm" /> : <RetroIconHardDrive size="sm" />}
                <span className="truncate">
                  <RetroSelectValue />
                </span>
              </span>
            </RetroSelectTrigger>
            <RetroSelectContent>
              {pathNames
                .map((n, i) => ({ n, i }))
                .reverse()
                .map(({ n, i }) => (
                  <RetroSelectItem key={i} value={String(i)}>
                    {n}
                  </RetroSelectItem>
                ))}
            </RetroSelectContent>
          </RetroSelect>

          <div className="flex shrink-0">
            <RetroDropdownMenu modal={false}>
              <RetroDropdownMenuTrigger {...AS_CHILD}>
                <RetroBevelButton
                  bevel="small"
                  menu
                  aria-label="Shortcuts"
                  title="Shortcuts"
                  icon={<RetroIconHardDrive size="sm" />}
                  className={MENU_BUTTON_CLS}
                />
              </RetroDropdownMenuTrigger>
              <RetroDropdownMenuContent align="end">
                <RetroDropdownMenuLabel>Shortcuts</RetroDropdownMenuLabel>
                <RetroDropdownMenuItem onSelect={() => navigate([])}>
                  {volumeName}
                </RetroDropdownMenuItem>
                <RetroDropdownMenuItem
                  disabled={chain.length === 0}
                  onSelect={() => navigate(folderIds.slice(0, -1))}
                >
                  Enclosing Folder
                </RetroDropdownMenuItem>
              </RetroDropdownMenuContent>
            </RetroDropdownMenu>

            <RetroDropdownMenu modal={false}>
              <RetroDropdownMenuTrigger {...AS_CHILD}>
                <RetroBevelButton
                  bevel="small"
                  menu
                  aria-label="Favorites"
                  title="Favorites"
                  icon={<FavoritesGlyph />}
                  className={cn(MENU_BUTTON_CLS, "-ml-px")}
                />
              </RetroDropdownMenuTrigger>
              <RetroDropdownMenuContent align="end">
                <RetroDropdownMenuItem
                  onSelect={() =>
                    setFavorites((f) =>
                      f.some((p) => p.join("/") === folderIds.join("/")) ? f : [...f, folderIds]
                    )
                  }
                >
                  Add to Favorites
                </RetroDropdownMenuItem>
                <RetroDropdownMenuSeparator />
                {favorites.length === 0 ? (
                  <RetroDropdownMenuItem disabled>No Favorites</RetroDropdownMenuItem>
                ) : (
                  favorites.map((p) => (
                    <RetroDropdownMenuItem key={p.join("/") || "root"} onSelect={() => navigate(p)}>
                      {namesFor(p).at(-1)}
                    </RetroDropdownMenuItem>
                  ))
                )}
              </RetroDropdownMenuContent>
            </RetroDropdownMenu>

            <RetroDropdownMenu modal={false}>
              <RetroDropdownMenuTrigger {...AS_CHILD}>
                <RetroBevelButton
                  bevel="small"
                  menu
                  aria-label="Recent"
                  title="Recent"
                  icon={<RecentGlyph />}
                  className={cn(MENU_BUTTON_CLS, "-ml-px")}
                />
              </RetroDropdownMenuTrigger>
              <RetroDropdownMenuContent align="end">
                {recent.length === 0 ? (
                  <RetroDropdownMenuItem disabled>No Recent Items</RetroDropdownMenuItem>
                ) : (
                  recent.map(({ file, path }) => (
                    <RetroDropdownMenuItem
                      key={file.id}
                      onSelect={() => {
                        navigate(path)
                        setSelected([file.id])
                      }}
                    >
                      {file.name}
                    </RetroDropdownMenuItem>
                  ))
                )}
              </RetroDropdownMenuContent>
            </RetroDropdownMenu>
          </div>
        </div>

        {/* File list */}
        <RetroTreeView
          aria-label={pathNames[pathNames.length - 1]}
          items={nodes}
          columns={columns}
          defaultSort={{ column: "label", direction: "asc" }}
          selected={selected}
          onSelectedChange={(ids) => {
            setSelected(ids)
            const file = ids[0] ? findInTree(current, ids[0]) : undefined
            if (isSave && file && fileType(file) !== "folder") setName(file.name)
          }}
          expanded={expanded}
          onExpandedChange={setExpanded}
          onActivate={(node) => {
            const file = findInTree(current, node.id)
            if (file) openFile(file)
          }}
          className="h-[200px]"
        />

        {/* Show / Format pop-up */}
        <div className="flex items-center gap-2">
          <RetroLabel size="lg" id={`${id}-show`} className="shrink-0">
            {isSave ? "Format:" : "Show:"}
          </RetroLabel>
          <RetroSelect value={show} onValueChange={setShow}>
            <RetroSelectTrigger aria-labelledby={`${id}-show`} className="h-[20px] w-[220px] max-w-full">
              <RetroSelectValue />
            </RetroSelectTrigger>
            <RetroSelectContent>
              {isSave ? (
                <>
                  <RetroSelectItem value="known">SimpleText Document</RetroSelectItem>
                  <RetroSelectItem value="all">Plain Text</RetroSelectItem>
                </>
              ) : (
                <>
                  <RetroSelectItem value="known">All Known Documents</RetroSelectItem>
                  <RetroSelectItem value="all">All Documents</RetroSelectItem>
                </>
              )}
            </RetroSelectContent>
          </RetroSelect>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2 border-t border-os9-gray-500 pt-[8px] shadow-[inset_0_1px_0_var(--os9-white)]">
          {isSave && (
            <RetroButton type="button" onClick={newFolder}>
              New Folder
            </RetroButton>
          )}
          <div className="ml-auto flex items-center gap-3">
            <RetroButton type="button" className="min-w-[70px]" onClick={onCancel}>
              Cancel
            </RetroButton>
            <RetroButton
              type="button"
              isDefault
              disabled={!canConfirm}
              className="min-w-[70px]"
              onClick={confirm}
            >
              {confirmLabel}
            </RetroButton>
          </div>
        </div>
      </RetroWindow>
    )
  }
)
OpenSaveDialogBlock.displayName = "OpenSaveDialogBlock"

export { OpenSaveDialogBlock }
export type {
  OpenSaveDialogBlockProps,
  OpenSaveDialogMode,
  OpenSaveFile,
  OpenSaveResult,
}
