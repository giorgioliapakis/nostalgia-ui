"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroTableHeader                                                   */
/* ------------------------------------------------------------------ */

function RetroTableHeader(
  { className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  return (
    <thead
      ref={ref}
      className={cn("[&_tr]:border-b-0", className)}
      {...props}
    />
  )
}

const ForwardedRetroTableHeader = React.forwardRef(RetroTableHeader)
ForwardedRetroTableHeader.displayName = "RetroTableHeader"

/* ------------------------------------------------------------------ */
/*  RetroTableBody                                                     */
/* ------------------------------------------------------------------ */

function RetroTableBody(
  { className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

const ForwardedRetroTableBody = React.forwardRef(RetroTableBody)
ForwardedRetroTableBody.displayName = "RetroTableBody"

/* ------------------------------------------------------------------ */
/*  RetroTableFooter                                                   */
/* ------------------------------------------------------------------ */

function RetroTableFooter(
  { className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "bg-os9-gray-400 font-[family-name:var(--font-sans)] text-[10px] font-bold",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroTableFooter = React.forwardRef(RetroTableFooter)
ForwardedRetroTableFooter.displayName = "RetroTableFooter"

/* ------------------------------------------------------------------ */
/*  RetroTableRow                                                      */
/* ------------------------------------------------------------------ */

function RetroTableRow(
  { className, ...props }: React.HTMLAttributes<HTMLTableRowElement>,
  ref: React.ForwardedRef<HTMLTableRowElement>
) {
  return (
    <tr
      ref={ref}
      className={cn("transition-colors", className)}
      {...props}
    />
  )
}

const ForwardedRetroTableRow = React.forwardRef(RetroTableRow)
ForwardedRetroTableRow.displayName = "RetroTableRow"

/* ------------------------------------------------------------------ */
/*  RetroTableHead (th)                                                */
/* ------------------------------------------------------------------ */

function RetroTableHead(
  { className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>,
  ref: React.ForwardedRef<HTMLTableCellElement>
) {
  return (
    <th
      ref={ref}
      className={cn(
        "text-left select-none",
        "bg-os9-gray-400 border border-[#484848] px-[8px] py-[4px]",
        "font-[family-name:var(--font-sans)] text-[10px] font-bold",
        /* Raised bevel */
        "shadow-[inset_-2px_0_0_var(--os9-gray-700),inset_0_-2px_0_var(--os9-gray-700),inset_2px_0_0_var(--os9-white),inset_0_2px_0_var(--os9-white)]",
        /* Pressed bevel while clicking (e.g. sortable headers) */
        "active:bg-os9-gray-600",
        "active:shadow-[inset_2px_0_0_var(--os9-gray-700),inset_0_2px_0_var(--os9-gray-700),inset_-2px_0_0_var(--os9-white),inset_0_-2px_0_var(--os9-white)]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroTableHead = React.forwardRef(RetroTableHead)
ForwardedRetroTableHead.displayName = "RetroTableHead"

/* ------------------------------------------------------------------ */
/*  RetroTableCell (td)                                                */
/* ------------------------------------------------------------------ */

function RetroTableCell(
  { className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>,
  ref: React.ForwardedRef<HTMLTableCellElement>
) {
  return (
    <td
      ref={ref}
      className={cn(
        "align-middle px-[8px] py-[4px]",
        "font-[family-name:var(--font-sans)] text-[10px]",
        "border-b border-b-os9-gray-400",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroTableCell = React.forwardRef(RetroTableCell)
ForwardedRetroTableCell.displayName = "RetroTableCell"

/* ------------------------------------------------------------------ */
/*  RetroTableCaption                                                  */
/* ------------------------------------------------------------------ */

function RetroTableCaption(
  { className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>,
  ref: React.ForwardedRef<HTMLTableCaptionElement>
) {
  return (
    <caption
      ref={ref}
      className={cn(
        "mt-1 p-[4px]",
        "font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-800",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroTableCaption = React.forwardRef(RetroTableCaption)
ForwardedRetroTableCaption.displayName = "RetroTableCaption"

/* ------------------------------------------------------------------ */
/*  RetroTable (root)                                                  */
/* ------------------------------------------------------------------ */

function RetroTableRoot(
  { className, ...props }: React.HTMLAttributes<HTMLTableElement>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  return (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        data-retro-table=""
        className={cn(
          "w-full caption-bottom",
          "border border-os9-black border-separate border-spacing-0",
          "font-[family-name:var(--font-sans)] text-[10px]",
          /* Body row hover (lavender) and selected (azul) highlights */
          "[&_tbody_tr:not([data-state=selected]):hover]:bg-os9-lavender",
          "[&_tbody_tr[data-state=selected]]:bg-os9-azul [&_tbody_tr[data-state=selected]]:text-os9-white",
          className
        )}
        {...props}
      />
    </div>
  )
}

const ForwardedRetroTableRoot = React.forwardRef(RetroTableRoot)
ForwardedRetroTableRoot.displayName = "RetroTable"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  ForwardedRetroTableRoot as RetroTable,
  ForwardedRetroTableHeader as RetroTableHeader,
  ForwardedRetroTableBody as RetroTableBody,
  ForwardedRetroTableRow as RetroTableRow,
  ForwardedRetroTableHead as RetroTableHead,
  ForwardedRetroTableCell as RetroTableCell,
  ForwardedRetroTableCaption as RetroTableCaption,
  ForwardedRetroTableFooter as RetroTableFooter,
}
