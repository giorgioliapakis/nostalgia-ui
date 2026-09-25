"use client"

import * as React from "react"

import {
  RetroTreeView,
  type RetroTreeViewColumn,
  type TreeNode,
} from "@/registry/new-york/ui/retro-tree-view"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const files: TreeNode[] = [
  {
    id: "apps",
    label: "Applications",
    modified: "1999-10-26",
    size: null,
    kind: "folder",
    children: [
      { id: "simpletext", label: "SimpleText", modified: "1999-08-02", size: 96, kind: "application program" },
      { id: "ie", label: "Internet Explorer", modified: "1999-09-17", size: 8200, kind: "application program" },
      {
        id: "quicktime",
        label: "QuickTime Folder",
        modified: "1999-09-01",
        size: null,
        kind: "folder",
        children: [
          { id: "qtplayer", label: "QuickTime Player", modified: "1999-09-01", size: 1400, kind: "application program" },
          { id: "pictview", label: "PictureViewer", modified: "1999-09-01", size: 350, kind: "application program" },
        ],
      },
    ],
  },
  {
    id: "docs",
    label: "Documents",
    modified: "1999-10-28",
    size: null,
    kind: "folder",
    children: [
      { id: "letter", label: "Letter to Steve", modified: "1999-10-28", size: 12, kind: "SimpleText document" },
      { id: "budget", label: "Budget 2000", modified: "1999-10-18", size: 48, kind: "AppleWorks document" },
      { id: "empty", label: "Empty Folder", modified: "1999-10-03", size: null, kind: "folder", children: [] },
    ],
  },
  {
    id: "system",
    label: "System Folder",
    modified: "1999-10-26",
    size: null,
    kind: "folder",
    children: [
      { id: "finder", label: "Finder", modified: "1999-10-26", size: 1600, kind: "file" },
      { id: "systemfile", label: "System", modified: "1999-10-26", size: 9800, kind: "suitcase" },
    ],
  },
  { id: "readme", label: "Read Me", modified: "1999-10-23", size: 20, kind: "SimpleText document" },
]

function formatSize(node: TreeNode) {
  return typeof node.size === "number"
    ? node.size >= 1000
      ? `${(node.size / 1000).toFixed(1)} MB`
      : `${node.size}K`
    : "—"
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** Deterministic formatter (no locale / timezone → no hydration mismatch). */
function formatDate(node: TreeNode) {
  if (typeof node.modified !== "string") return "—"
  const [y, m, d] = node.modified.split("-").map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

const columns: RetroTreeViewColumn[] = [
  { key: "label", header: "Name" },
  { key: "modified", header: "Date Modified", width: 150, render: formatDate },
  { key: "size", header: "Size", width: 70, align: "right", render: formatSize },
  { key: "kind", header: "Kind", width: 140 },
]

export default function TreeViewPreview() {
  const [expanded, setExpanded] = React.useState<string[]>(["apps"])
  const [selected, setSelected] = React.useState<string[]>([])
  const [activated, setActivated] = React.useState<string | null>(null)

  return (
    <ComponentDocLayout
      name="retro-tree-view"
      title="RetroTreeView"
      description="A Finder list view / Folder List tree with disclosure triangles, sortable column headers, multi-select and full keyboard navigation."
      usage={`
<RetroTreeView
  aria-label="Macintosh HD"
  items={items}
  columns={[
    { key: "label", header: "Name" },
    { key: "modified", header: "Date Modified", width: 150 },
    { key: "size", header: "Size", width: 70, align: "right" },
    { key: "kind", header: "Kind", width: 140 },
  ]}
  defaultSort={{ column: "label", direction: "asc" }}
  selectionMode="multiple"
  onActivate={(node) => open(node)}
/>`}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">Finder List View</h2>
        <p className="text-[10px] text-os9-gray-700 mb-3">
          Click a column header to sort (click again to reverse). Shift- and
          Cmd/Ctrl-click to extend the selection. Use arrow keys, Home/End,
          type-ahead, and Enter to open.
        </p>
        <RetroTreeView
          aria-label="Macintosh HD"
          items={files}
          columns={columns}
          defaultSort={{ column: "label", direction: "asc" }}
          expanded={expanded}
          onExpandedChange={setExpanded}
          selected={selected}
          onSelectedChange={setSelected}
          selectionMode="multiple"
          onActivate={(node) => setActivated(node.label)}
          className="h-[260px] max-w-[640px]"
        />
        <p className="mt-2 text-[10px] text-os9-gray-700">
          Selected: {selected.length ? selected.join(", ") : "none"} · Last
          opened: {activated ?? "none"}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">Folder List (no columns)</h2>
        <RetroTreeView
          aria-label="Folders"
          items={files}
          defaultExpanded={["docs"]}
          defaultSelected={["letter"]}
          className="h-[200px] w-[260px]"
        />
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">Without icons</h2>
        <RetroTreeView
          aria-label="Outline"
          items={files}
          showIcons={false}
          defaultExpanded={["system"]}
          className="w-[260px]"
        />
      </section>
    </ComponentDocLayout>
  )
}
