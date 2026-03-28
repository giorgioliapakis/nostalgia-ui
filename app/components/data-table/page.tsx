"use client"

import {
  RetroDataTable,
  RetroDataTableColumnHeader,
} from "@/registry/new-york/ui/retro-data-table"
import { type ColumnDef } from "@tanstack/react-table"
import { ComponentDocLayout } from "../_components/component-doc-layout"

interface FileEntry {
  name: string
  size: string
  kind: string
  modified: string
}

const columns: ColumnDef<FileEntry>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <RetroDataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <RetroDataTableColumnHeader column={column} title="Size" />
    ),
  },
  {
    accessorKey: "kind",
    header: ({ column }) => (
      <RetroDataTableColumnHeader column={column} title="Kind" />
    ),
  },
  {
    accessorKey: "modified",
    header: ({ column }) => (
      <RetroDataTableColumnHeader column={column} title="Date Modified" />
    ),
  },
]

const files: FileEntry[] = [
  {
    name: "SimpleText",
    size: "248 KB",
    kind: "Application",
    modified: "Jan 15, 2001",
  },
  {
    name: "ReadMe.txt",
    size: "4 KB",
    kind: "SimpleText Document",
    modified: "Mar 22, 2001",
  },
  {
    name: "System Folder",
    size: "--",
    kind: "Folder",
    modified: "Feb 10, 2001",
  },
  {
    name: "AppleWorks 6",
    size: "12.4 MB",
    kind: "Application",
    modified: "Dec 3, 2000",
  },
  {
    name: "Desktop DB",
    size: "1.2 MB",
    kind: "System File",
    modified: "Mar 28, 2001",
  },
]

export default function DataTablePreview() {
  return (
    <ComponentDocLayout
      name="retro-data-table"
      title="RetroDataTable"
      description="A data table with sortable columns, filtering, and pagination in Mac OS 9 Finder list style."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A data table component with sorting, filtering, and pagination. Built on
        TanStack Table with OS9-styled headers and controls.
      </p>

      {/* Basic data table with filter and pagination */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          File Listing with Filter
        </h2>
        <div className="w-[600px]">
          <RetroDataTable
            columns={columns}
            data={files}
            filterColumn="name"
            filterPlaceholder="Filter by name..."
            showPagination
            showToolbar
          />
        </div>
      </section>

      {/* Minimal table (no toolbar, no pagination) */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Minimal (No Toolbar)</h2>
        <div className="w-[600px]">
          <RetroDataTable
            columns={columns}
            data={files}
            showToolbar={false}
            showPagination={false}
          />
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click column headers to sort. Type in the filter field to search. Sort
        indicators show ascending/descending state.
      </p>
    </ComponentDocLayout>
  )
}
