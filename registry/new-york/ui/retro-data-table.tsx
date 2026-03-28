"use client"

import * as React from "react"
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type Table as TanstackTable,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import {
  RetroTable,
  RetroTableBody,
  RetroTableCell,
  RetroTableHead,
  RetroTableHeader,
  RetroTableRow,
} from "@/registry/new-york/ui/retro-table"

/* ------------------------------------------------------------------ */
/*  Sort arrow SVGs                                                    */
/* ------------------------------------------------------------------ */

function SortAscIcon({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="4"
      viewBox="0 0 6 4"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 0L6 4H0z" />
    </svg>
  )
}

function SortDescIcon({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="4"
      viewBox="0 0 6 4"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 4L0 0h6z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroDataTableColumnHeader                                         */
/* ------------------------------------------------------------------ */

interface RetroDataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  className?: string
}

function RetroDataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: RetroDataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const sorted = column.getIsSorted()

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 cursor-pointer select-none",
        "font-[family-name:var(--font-heading)] text-[10px] font-bold",
        className
      )}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {title}
      <span className="inline-flex flex-col gap-px">
        <SortAscIcon
          className={cn(
            sorted === "asc" ? "opacity-100" : "opacity-30"
          )}
        />
        <SortDescIcon
          className={cn(
            sorted === "desc" ? "opacity-100" : "opacity-30"
          )}
        />
      </span>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroDataTableToolbar                                              */
/* ------------------------------------------------------------------ */

interface RetroDataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: TanstackTable<TData>
  filterColumn?: string
  filterPlaceholder?: string
}

function RetroDataTableToolbar<TData>({
  table,
  filterColumn,
  filterPlaceholder = "Filter...",
  className,
  children,
  ...props
}: RetroDataTableToolbarProps<TData>) {
  const column = filterColumn ? table.getColumn(filterColumn) : undefined

  return (
    <div
      className={cn("flex items-center gap-2 pb-2", className)}
      {...props}
    >
      {column && (
        <input
          type="text"
          placeholder={filterPlaceholder}
          value={(column.getFilterValue() as string) ?? ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className={cn(
            "w-full max-w-[200px]",
            "border border-os9-black bg-os9-white text-os9-black",
            "placeholder:text-os9-gray-600",
            "font-[family-name:var(--font-sans)] text-[10px] leading-normal",
            "px-[5px] py-[3px]",
            "outline-none",
            "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white),-1px_0_0_var(--os9-gray-700),0_-1px_0_var(--os9-gray-700),1px_0_0_var(--os9-white),0_1px_0_var(--os9-white)]",
            "focus:shadow-[0_2px_0_0_var(--os9-focus),2px_0_0_0_var(--os9-focus),0_-2px_0_0_var(--os9-focus),-2px_0_0_0_var(--os9-focus),0_0_0_1px_var(--os9-focus)]"
          )}
        />
      )}
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroDataTablePagination                                           */
/* ------------------------------------------------------------------ */

interface RetroDataTablePaginationProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: TanstackTable<TData>
  showRowSelection?: boolean
  pageSizes?: number[]
}

/** Shared OS9 button base styles */
const os9BtnBase = [
  "inline-flex items-center justify-center",
  "h-[20px] px-2",
  "font-[family-name:var(--font-heading)] text-[10px] tracking-[0.42px] leading-[0.98]",
  "border border-os9-black bg-os9-gray-300 text-os9-black",
  "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
  "cursor-pointer select-none",
  "active:bg-os9-gray-800 active:text-os9-white",
  "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
] as const

const os9BtnDisabled = [
  "pointer-events-none",
  "text-os9-gray-600",
  "border-os9-gray-600",
  "shadow-[inset_1px_1px_0_var(--os9-gray-300),inset_-1px_-1px_0_var(--os9-gray-400)]",
] as const

function RetroDataTablePagination<TData>({
  table,
  showRowSelection = false,
  pageSizes,
  className,
  ...props
}: RetroDataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 pt-2",
        "font-[family-name:var(--font-sans)] text-[10px]",
        className
      )}
      {...props}
    >
      {/* Left: row selection info */}
      <div className="flex-1 text-os9-gray-800">
        {showRowSelection && (
          <span>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected
          </span>
        )}
      </div>

      {/* Center: page size selector */}
      {pageSizes && pageSizes.length > 0 && (
        <div className="flex items-center gap-1">
          <span className="text-os9-gray-800">Rows:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className={cn(
              "h-[18px] px-1",
              "border border-os9-black bg-os9-gray-300 text-os9-black",
              "font-[family-name:var(--font-sans)] text-[10px]",
              "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
              "cursor-pointer outline-none"
            )}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Right: page info + buttons */}
      <div className="flex items-center gap-2">
        <span className="text-os9-gray-800">
          Page {pageIndex + 1} of {pageCount || 1}
        </span>

        <button
          type="button"
          className={cn(
            os9BtnBase,
            !table.getCanPreviousPage() && os9BtnDisabled
          )}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>

        <button
          type="button"
          className={cn(
            os9BtnBase,
            !table.getCanNextPage() && os9BtnDisabled
          )}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroDataTable                                                     */
/* ------------------------------------------------------------------ */

interface RetroDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterColumn?: string
  filterPlaceholder?: string
  showToolbar?: boolean
  showPagination?: boolean
  showRowSelection?: boolean
  pageSizes?: number[]
  pageSize?: number
  className?: string
}

function RetroDataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder,
  showToolbar = true,
  showPagination = true,
  showRowSelection = false,
  pageSizes,
  pageSize = 10,
  className,
}: RetroDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  return (
    <div className={cn(className)}>
      {showToolbar && filterColumn && (
        <RetroDataTableToolbar
          table={table}
          filterColumn={filterColumn}
          filterPlaceholder={filterPlaceholder}
        />
      )}

      <RetroTable>
        <RetroTableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <RetroTableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <RetroTableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </RetroTableHead>
              ))}
            </RetroTableRow>
          ))}
        </RetroTableHeader>
        <RetroTableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <RetroTableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <RetroTableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </RetroTableCell>
                ))}
              </RetroTableRow>
            ))
          ) : (
            <RetroTableRow>
              <RetroTableCell
                colSpan={columns.length}
                style={{ textAlign: "center", padding: "16px 8px" }}
              >
                No results.
              </RetroTableCell>
            </RetroTableRow>
          )}
        </RetroTableBody>
      </RetroTable>

      {showPagination && (
        <RetroDataTablePagination
          table={table}
          showRowSelection={showRowSelection}
          pageSizes={pageSizes}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroDataTable,
  RetroDataTableColumnHeader,
  RetroDataTableToolbar,
  RetroDataTablePagination,
}
