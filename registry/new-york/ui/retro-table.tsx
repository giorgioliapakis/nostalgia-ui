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
      className={cn(className)}
      style={{
        backgroundColor: "var(--os9-gray-400)",
        fontFamily: "var(--font-sans)",
        fontSize: "10px",
        fontWeight: "bold",
      }}
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
      style={
        {
          "--row-bg": "transparent",
          "--row-color": "inherit",
          backgroundColor: "var(--row-bg)",
          color: "var(--row-color)",
        } as React.CSSProperties
      }
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
      className={cn("text-left select-none", className)}
      style={{
        backgroundColor: "var(--os9-gray-400)",
        border: "1px solid #484848",
        padding: "4px 8px",
        fontFamily: "var(--font-sans)",
        fontSize: "10px",
        fontWeight: "bold",
        boxShadow:
          "inset -2px 0 0 #808080, inset 0 -2px 0 #808080, inset 2px 0 0 white, inset 0 2px 0 white",
      }}
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
      className={cn("align-middle", className)}
      style={{
        padding: "4px 8px",
        fontFamily: "var(--font-sans)",
        fontSize: "10px",
        borderBottom: "1px solid var(--os9-gray-400)",
      }}
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
      className={cn("mt-1", className)}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "10px",
        color: "var(--os9-gray-800)",
        padding: "4px",
      }}
      {...props}
    />
  )
}

const ForwardedRetroTableCaption = React.forwardRef(RetroTableCaption)
ForwardedRetroTableCaption.displayName = "RetroTableCaption"

/* ------------------------------------------------------------------ */
/*  Stylesheet (hover + selected styles via CSS)                       */
/* ------------------------------------------------------------------ */

function RetroTableStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          [data-retro-table] tbody tr:hover {
            --row-bg: var(--os9-lavender) !important;
          }
          [data-retro-table] tbody tr[data-state="selected"] {
            --row-bg: var(--os9-azul) !important;
            --row-color: white !important;
          }
          [data-retro-table] thead th:active {
            background-color: var(--os9-gray-600) !important;
            box-shadow:
              inset 2px 0 0 #808080,
              inset 0 2px 0 #808080,
              inset -2px 0 0 white,
              inset 0 -2px 0 white !important;
          }
        `,
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Wrapper that injects styles                                        */
/* ------------------------------------------------------------------ */

function RetroTableRoot(
  { className, ...props }: React.HTMLAttributes<HTMLTableElement>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  return (
    <>
      <RetroTableStyles />
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          data-retro-table=""
          className={cn("w-full caption-bottom", className)}
          style={{
            border: "1px solid var(--os9-black)",
            borderCollapse: "separate",
            borderSpacing: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
          }}
          {...props}
        />
      </div>
    </>
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
