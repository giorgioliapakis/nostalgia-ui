"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroPagination (nav wrapper)                                     */
/* ------------------------------------------------------------------ */

function RetroPagination(
  { className, ...props }: React.ComponentProps<"nav">,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      ref={ref}
      {...props}
    />
  )
}

const ForwardedRetroPagination = React.forwardRef(RetroPagination)
ForwardedRetroPagination.displayName = "RetroPagination"

/* ------------------------------------------------------------------ */
/*  RetroPaginationContent (flex row)                                 */
/* ------------------------------------------------------------------ */

function RetroPaginationContent(
  { className, ...props }: React.ComponentProps<"ul">,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  return (
    <ul
      className={cn(
        "flex flex-row items-center gap-1",
        className
      )}
      ref={ref}
      {...props}
    />
  )
}

const ForwardedRetroPaginationContent = React.forwardRef(RetroPaginationContent)
ForwardedRetroPaginationContent.displayName = "RetroPaginationContent"

/* ------------------------------------------------------------------ */
/*  RetroPaginationItem (li wrapper)                                  */
/* ------------------------------------------------------------------ */

function RetroPaginationItem(
  { className, ...props }: React.ComponentProps<"li">,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  return <li className={cn("", className)} ref={ref} {...props} />
}

const ForwardedRetroPaginationItem = React.forwardRef(RetroPaginationItem)
ForwardedRetroPaginationItem.displayName = "RetroPaginationItem"

/* ------------------------------------------------------------------ */
/*  RetroPaginationLink (page number button)                          */
/* ------------------------------------------------------------------ */

type RetroPaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<"a">

const ForwardedRetroPaginationLink = React.forwardRef<
  HTMLAnchorElement,
  RetroPaginationLinkProps
>(function RetroPaginationLink({ className, isActive, ...props }, ref) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center",
        "min-w-[28px] h-[24px] px-1.5",
        "font-[family-name:var(--font-sans)] text-[10px] leading-[1]",
        "border border-os9-black",
        "cursor-pointer select-none",
        "transition-none",
        "focus-visible:os9-focus-ring",
        isActive
          ? [
              "bg-os9-gray-800 text-os9-white",
              "font-[family-name:var(--font-heading)]",
              "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
            ]
          : [
              "bg-os9-gray-300 text-os9-black",
              "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
              "hover:bg-os9-gray-400",
              "active:bg-os9-gray-800 active:text-os9-white",
              "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
            ],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
ForwardedRetroPaginationLink.displayName = "RetroPaginationLink"

/* ------------------------------------------------------------------ */
/*  RetroPaginationPrevious                                           */
/* ------------------------------------------------------------------ */

function RetroPaginationPrevious(
  { className, ...props }: React.ComponentProps<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <ForwardedRetroPaginationLink
      aria-label="Go to previous page"
      className={cn("px-2.5", className)}
      ref={ref}
      {...props}
    >
      {"\u003C"} Previous
    </ForwardedRetroPaginationLink>
  )
}

const ForwardedRetroPaginationPrevious = React.forwardRef(RetroPaginationPrevious)
ForwardedRetroPaginationPrevious.displayName = "RetroPaginationPrevious"

/* ------------------------------------------------------------------ */
/*  RetroPaginationNext                                               */
/* ------------------------------------------------------------------ */

function RetroPaginationNext(
  { className, ...props }: React.ComponentProps<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <ForwardedRetroPaginationLink
      aria-label="Go to next page"
      className={cn("px-2.5", className)}
      ref={ref}
      {...props}
    >
      Next {"\u003E"}
    </ForwardedRetroPaginationLink>
  )
}

const ForwardedRetroPaginationNext = React.forwardRef(RetroPaginationNext)
ForwardedRetroPaginationNext.displayName = "RetroPaginationNext"

/* ------------------------------------------------------------------ */
/*  RetroPaginationEllipsis                                           */
/* ------------------------------------------------------------------ */

function RetroPaginationEllipsis(
  { className, ...props }: React.ComponentProps<"span">,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center",
        "min-w-[28px] h-[24px]",
        "font-[family-name:var(--font-sans)] text-[10px] leading-[1]",
        "text-os9-black select-none",
        className
      )}
      ref={ref}
      {...props}
    >
      ...
    </span>
  )
}

const ForwardedRetroPaginationEllipsis = React.forwardRef(RetroPaginationEllipsis)
ForwardedRetroPaginationEllipsis.displayName = "RetroPaginationEllipsis"

/* ------------------------------------------------------------------ */
/*  Exports                                                           */
/* ------------------------------------------------------------------ */

export {
  ForwardedRetroPagination as RetroPagination,
  ForwardedRetroPaginationContent as RetroPaginationContent,
  ForwardedRetroPaginationItem as RetroPaginationItem,
  ForwardedRetroPaginationLink as RetroPaginationLink,
  ForwardedRetroPaginationPrevious as RetroPaginationPrevious,
  ForwardedRetroPaginationNext as RetroPaginationNext,
  ForwardedRetroPaginationEllipsis as RetroPaginationEllipsis,
}
