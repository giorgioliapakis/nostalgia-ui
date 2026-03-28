"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroBreadcrumb (root <nav>)                                       */
/* ------------------------------------------------------------------ */

function RetroBreadcrumb(
  {
    className,
    ...props
  }: React.ComponentProps<"nav">,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn(
        "font-[family-name:var(--font-sans)] text-[10px] leading-normal select-none",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroBreadcrumb = React.forwardRef(RetroBreadcrumb)
ForwardedRetroBreadcrumb.displayName = "RetroBreadcrumb"

/* ------------------------------------------------------------------ */
/*  RetroBreadcrumbList                                                */
/* ------------------------------------------------------------------ */

function RetroBreadcrumbList(
  {
    className,
    ...props
  }: React.ComponentProps<"ol">,
  ref: React.ForwardedRef<HTMLOListElement>
) {
  return (
    <ol
      ref={ref}
      className={cn(
        "flex flex-row flex-wrap items-center gap-1",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroBreadcrumbList = React.forwardRef(RetroBreadcrumbList)
ForwardedRetroBreadcrumbList.displayName = "RetroBreadcrumbList"

/* ------------------------------------------------------------------ */
/*  RetroBreadcrumbItem                                                */
/* ------------------------------------------------------------------ */

function RetroBreadcrumbItem(
  {
    className,
    ...props
  }: React.ComponentProps<"li">,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  return (
    <li
      ref={ref}
      className={cn("inline-flex items-center", className)}
      {...props}
    />
  )
}

const ForwardedRetroBreadcrumbItem = React.forwardRef(RetroBreadcrumbItem)
ForwardedRetroBreadcrumbItem.displayName = "RetroBreadcrumbItem"

/* ------------------------------------------------------------------ */
/*  RetroBreadcrumbLink                                                */
/* ------------------------------------------------------------------ */

function RetroBreadcrumbLink(
  {
    className,
    ...props
  }: React.ComponentProps<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <a
      ref={ref}
      className={cn(
        "text-[var(--os9-azul)] no-underline hover:underline cursor-pointer",
        "transition-none",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroBreadcrumbLink = React.forwardRef(RetroBreadcrumbLink)
ForwardedRetroBreadcrumbLink.displayName = "RetroBreadcrumbLink"

/* ------------------------------------------------------------------ */
/*  RetroBreadcrumbPage (current / non-clickable)                      */
/* ------------------------------------------------------------------ */

function RetroBreadcrumbPage(
  {
    className,
    ...props
  }: React.ComponentProps<"span">,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "text-[var(--os9-black)] font-bold",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroBreadcrumbPage = React.forwardRef(RetroBreadcrumbPage)
ForwardedRetroBreadcrumbPage.displayName = "RetroBreadcrumbPage"

/* ------------------------------------------------------------------ */
/*  RetroBreadcrumbSeparator                                           */
/* ------------------------------------------------------------------ */

function RetroBreadcrumbSeparator(
  {
    className,
    children,
    ...props
  }: React.ComponentProps<"li">,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(
        "inline-flex items-center text-[var(--os9-gray-700)]",
        className
      )}
      {...props}
    >
      {children ?? ">"}
    </li>
  )
}

const ForwardedRetroBreadcrumbSeparator = React.forwardRef(RetroBreadcrumbSeparator)
ForwardedRetroBreadcrumbSeparator.displayName = "RetroBreadcrumbSeparator"

/* ------------------------------------------------------------------ */
/*  RetroBreadcrumbEllipsis                                            */
/* ------------------------------------------------------------------ */

function RetroBreadcrumbEllipsis(
  {
    className,
    ...props
  }: React.ComponentProps<"span">,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  return (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(
        "text-[var(--os9-gray-700)]",
        className
      )}
      {...props}
    >
      &hellip;
    </span>
  )
}

const ForwardedRetroBreadcrumbEllipsis = React.forwardRef(RetroBreadcrumbEllipsis)
ForwardedRetroBreadcrumbEllipsis.displayName = "RetroBreadcrumbEllipsis"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  ForwardedRetroBreadcrumb as RetroBreadcrumb,
  ForwardedRetroBreadcrumbList as RetroBreadcrumbList,
  ForwardedRetroBreadcrumbItem as RetroBreadcrumbItem,
  ForwardedRetroBreadcrumbLink as RetroBreadcrumbLink,
  ForwardedRetroBreadcrumbPage as RetroBreadcrumbPage,
  ForwardedRetroBreadcrumbSeparator as RetroBreadcrumbSeparator,
  ForwardedRetroBreadcrumbEllipsis as RetroBreadcrumbEllipsis,
}
