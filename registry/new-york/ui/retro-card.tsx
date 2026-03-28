"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroCard                                                          */
/* ------------------------------------------------------------------ */

function RetroCard(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col", className)}
      style={{
        border: "1px solid var(--os9-black)",
        backgroundColor: "var(--os9-gray-200)",
        boxShadow:
          "inset -2px -2px 0 rgba(38,38,38,0.4), inset 2px 2px 0 rgba(255,255,255,0.6)",
      }}
      {...props}
    />
  )
}

const ForwardedRetroCard = React.forwardRef(RetroCard)
ForwardedRetroCard.displayName = "RetroCard"

/* ------------------------------------------------------------------ */
/*  RetroCardHeader                                                    */
/* ------------------------------------------------------------------ */

function RetroCardHeader(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-[2px] px-[10px] py-[8px]", className)}
      style={{
        borderBottom: "1px solid var(--os9-black)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.6), 0 -1px 0 rgba(38,38,38,0.15) inset",
      }}
      {...props}
    />
  )
}

const ForwardedRetroCardHeader = React.forwardRef(RetroCardHeader)
ForwardedRetroCardHeader.displayName = "RetroCardHeader"

/* ------------------------------------------------------------------ */
/*  RetroCardTitle                                                     */
/* ------------------------------------------------------------------ */

function RetroCardTitle(
  { className, ...props }: React.HTMLAttributes<HTMLHeadingElement>,
  ref: React.ForwardedRef<HTMLHeadingElement>
) {
  return (
    <h3
      ref={ref}
      className={cn(
        "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[1.2]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroCardTitle = React.forwardRef(RetroCardTitle)
ForwardedRetroCardTitle.displayName = "RetroCardTitle"

/* ------------------------------------------------------------------ */
/*  RetroCardDescription                                               */
/* ------------------------------------------------------------------ */

function RetroCardDescription(
  { className, ...props }: React.HTMLAttributes<HTMLParagraphElement>,
  ref: React.ForwardedRef<HTMLParagraphElement>
) {
  return (
    <p
      ref={ref}
      className={cn(
        "font-[family-name:var(--font-sans)] text-[10px] leading-[1.3]",
        className
      )}
      style={{ color: "var(--os9-gray-800)" }}
      {...props}
    />
  )
}

const ForwardedRetroCardDescription = React.forwardRef(RetroCardDescription)
ForwardedRetroCardDescription.displayName = "RetroCardDescription"

/* ------------------------------------------------------------------ */
/*  RetroCardContent                                                   */
/* ------------------------------------------------------------------ */

function RetroCardContent(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn("px-[10px] py-[8px]", className)}
      {...props}
    />
  )
}

const ForwardedRetroCardContent = React.forwardRef(RetroCardContent)
ForwardedRetroCardContent.displayName = "RetroCardContent"

/* ------------------------------------------------------------------ */
/*  RetroCardFooter                                                    */
/* ------------------------------------------------------------------ */

function RetroCardFooter(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-[8px] px-[10px] py-[8px]", className)}
      style={{
        borderTop: "1px solid var(--os9-black)",
        boxShadow:
          "0 -1px 0 rgba(255,255,255,0.6), 0 1px 0 rgba(38,38,38,0.15) inset",
      }}
      {...props}
    />
  )
}

const ForwardedRetroCardFooter = React.forwardRef(RetroCardFooter)
ForwardedRetroCardFooter.displayName = "RetroCardFooter"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  ForwardedRetroCard as RetroCard,
  ForwardedRetroCardHeader as RetroCardHeader,
  ForwardedRetroCardTitle as RetroCardTitle,
  ForwardedRetroCardDescription as RetroCardDescription,
  ForwardedRetroCardContent as RetroCardContent,
  ForwardedRetroCardFooter as RetroCardFooter,
}
