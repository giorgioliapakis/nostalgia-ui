"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroTextVariants = cva("text-os9-black", {
  variants: {
    variant: {
      editorial: [
        "font-[family-name:'Apple_Garamond',Georgia,serif]",
        "text-[24px]",
        "font-normal",
        "leading-[1.2]",
      ],
      headline: [
        "font-[family-name:var(--os9-font-heading)]",
        "text-[12px]",
        "tracking-[0.42px]",
        "leading-[0.98]",
      ],
      smallHeadline: [
        "font-[family-name:var(--os9-font-heading)]",
        "text-[10px]",
        "tracking-[0.42px]",
        "leading-[0.98]",
      ],
      body: [
        "font-[family-name:var(--os9-font-sans)]",
        "text-[10px]",
        "leading-[1.3]",
      ],
      bodySmall: [
        "font-[family-name:var(--os9-font-sans)]",
        "text-[9px]",
        "leading-[1.3]",
      ],
      bodyBold: [
        "font-[family-name:var(--os9-font-sans)]",
        "text-[9px]",
        "font-bold",
        "leading-[1.3]",
      ],
      bodySlanted: [
        "font-[family-name:var(--os9-font-sans)]",
        "text-[9px]",
        "italic",
        "leading-[1.3]",
      ],
      mono: [
        "font-[family-name:var(--os9-font-mono)]",
        "text-[10px]",
        "leading-[1.3]",
      ],
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type RetroTextProps = React.ComponentPropsWithoutRef<"p"> &
  VariantProps<typeof retroTextVariants> & {
    as?: React.ElementType
  }

function RetroText(
  { as: Comp = "p", variant, className, ...props }: RetroTextProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <Comp
      className={cn(retroTextVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
}

const ForwardedRetroText = React.forwardRef(RetroText)
ForwardedRetroText.displayName = "RetroText"

/* ------------------------------------------------------------------ */
/*  shadcn-typography-style primitives                                 */
/*  Semantic elements with the OS9 type scale baked in: Charcoal for   */
/*  headings, Geneva for prose, Monaco for code.                       */
/* ------------------------------------------------------------------ */

const HEADING = "font-[family-name:var(--os9-font-heading)] text-os9-black tracking-[0.42px] scroll-m-20"

const RetroH1 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<"h1">>(
  function RetroH1({ className, ...props }, ref) {
    return (
      <h1
        ref={ref}
        className={cn(HEADING, "text-[24px] leading-[1.1] text-balance", className)}
        {...props}
      />
    )
  }
)
RetroH1.displayName = "RetroH1"

const RetroH2 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<"h2">>(
  function RetroH2({ className, ...props }, ref) {
    return (
      <h2
        ref={ref}
        className={cn(
          HEADING,
          "pb-[4px] text-[18px] leading-[1.15] first:mt-0",
          // Etched rule under section headings (dark line + light line)
          "border-b border-os9-gray-700 shadow-[0_1px_0_var(--os9-white)]",
          className
        )}
        {...props}
      />
    )
  }
)
RetroH2.displayName = "RetroH2"

const RetroH3 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<"h3">>(
  function RetroH3({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn(HEADING, "text-[14px] leading-[1.2]", className)}
        {...props}
      />
    )
  }
)
RetroH3.displayName = "RetroH3"

const RetroH4 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<"h4">>(
  function RetroH4({ className, ...props }, ref) {
    return (
      <h4
        ref={ref}
        className={cn(HEADING, "text-[12px] leading-[1.2]", className)}
        {...props}
      />
    )
  }
)
RetroH4.displayName = "RetroH4"

const RetroP = React.forwardRef<HTMLParagraphElement, React.ComponentProps<"p">>(
  function RetroP({ className, ...props }, ref) {
    return (
      <p
        ref={ref}
        className={cn(
          "font-[family-name:var(--os9-font-sans)] text-[11px] leading-[1.6] text-os9-black",
          "[&:not(:first-child)]:mt-[10px]",
          className
        )}
        {...props}
      />
    )
  }
)
RetroP.displayName = "RetroP"

const RetroLead = React.forwardRef<HTMLParagraphElement, React.ComponentProps<"p">>(
  function RetroLead({ className, ...props }, ref) {
    return (
      <p
        ref={ref}
        className={cn(
          "font-[family-name:var(--os9-font-sans)] text-[14px] leading-[1.5] text-os9-gray-800",
          className
        )}
        {...props}
      />
    )
  }
)
RetroLead.displayName = "RetroLead"

const RetroBlockquote = React.forwardRef<
  HTMLQuoteElement,
  React.ComponentProps<"blockquote">
>(function RetroBlockquote({ className, ...props }, ref) {
  return (
    <blockquote
      ref={ref}
      className={cn(
        "mt-[12px] border-l-[3px] border-os9-gray-600 pl-[12px]",
        "font-[family-name:var(--os9-font-sans)] text-[11px] leading-[1.6] italic text-os9-gray-800",
        className
      )}
      {...props}
    />
  )
})
RetroBlockquote.displayName = "RetroBlockquote"

type RetroListProps = React.ComponentProps<"ul"> & {
  /** Render a numbered <ol> instead of a bulleted <ul>. */
  ordered?: boolean
}

const RetroList = React.forwardRef<HTMLUListElement, RetroListProps>(
  function RetroList({ className, ordered = false, ...props }, ref) {
    const Comp = (ordered ? "ol" : "ul") as "ul"
    return (
      <Comp
        ref={ref}
        className={cn(
          "my-[10px] ml-[20px]",
          ordered ? "list-decimal" : "list-[square]",
          "font-[family-name:var(--os9-font-sans)] text-[11px] leading-[1.6] text-os9-black",
          "[&>li]:mt-[3px] marker:text-os9-gray-700",
          className
        )}
        {...props}
      />
    )
  }
)
RetroList.displayName = "RetroList"

const RetroInlineCode = React.forwardRef<HTMLElement, React.ComponentProps<"code">>(
  function RetroInlineCode({ className, ...props }, ref) {
    return (
      <code
        ref={ref}
        className={cn(
          "relative px-[3px] py-[1px]",
          "border border-os9-gray-500 bg-os9-white",
          "font-[family-name:var(--os9-font-mono)] text-[10px] text-os9-black",
          className
        )}
        {...props}
      />
    )
  }
)
RetroInlineCode.displayName = "RetroInlineCode"

const RetroLarge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function RetroLarge({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "font-[family-name:var(--os9-font-heading)] text-[14px] tracking-[0.42px] leading-[1.2] text-os9-black",
          className
        )}
        {...props}
      />
    )
  }
)
RetroLarge.displayName = "RetroLarge"

const RetroSmall = React.forwardRef<HTMLElement, React.ComponentProps<"small">>(
  function RetroSmall({ className, ...props }, ref) {
    return (
      <small
        ref={ref}
        className={cn(
          "font-[family-name:var(--os9-font-sans)] text-[9px] leading-none font-bold text-os9-black",
          className
        )}
        {...props}
      />
    )
  }
)
RetroSmall.displayName = "RetroSmall"

const RetroMuted = React.forwardRef<HTMLParagraphElement, React.ComponentProps<"p">>(
  function RetroMuted({ className, ...props }, ref) {
    return (
      <p
        ref={ref}
        className={cn(
          "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] text-os9-gray-700",
          className
        )}
        {...props}
      />
    )
  }
)
RetroMuted.displayName = "RetroMuted"

export {
  ForwardedRetroText as RetroText,
  retroTextVariants,
  RetroH1,
  RetroH2,
  RetroH3,
  RetroH4,
  RetroP,
  RetroLead,
  RetroBlockquote,
  RetroList,
  RetroInlineCode,
  RetroLarge,
  RetroSmall,
  RetroMuted,
}
