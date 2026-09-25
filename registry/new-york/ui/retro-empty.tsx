import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroEmpty — the "This folder is empty" state                      */
/* ------------------------------------------------------------------ */

const RetroEmpty = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function RetroEmpty({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="empty"
        className={cn(
          "flex min-w-0 flex-1 flex-col items-center justify-center gap-[14px]",
          "p-[24px] text-center text-os9-black text-balance",
          className
        )}
        {...props}
      />
    )
  }
)
RetroEmpty.displayName = "RetroEmpty"

/* ------------------------------------------------------------------ */
/*  RetroEmptyHeader                                                   */
/* ------------------------------------------------------------------ */

const RetroEmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroEmptyHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="empty-header"
      className={cn(
        "flex max-w-[320px] flex-col items-center gap-[6px] text-center",
        className
      )}
      {...props}
    />
  )
})
RetroEmptyHeader.displayName = "RetroEmptyHeader"

/* ------------------------------------------------------------------ */
/*  RetroEmptyMedia                                                    */
/* ------------------------------------------------------------------ */

const retroEmptyMediaVariants = cva(
  "mb-[4px] flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Bare media — drop a 32px/48px RetroIcon straight in. */
        default: "bg-transparent",
        /** Icon sitting in a small raised tile, like a Finder icon well. */
        icon: [
          "size-[44px] p-[4px]",
          "border border-os9-black bg-os9-gray-300 text-os9-black",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type RetroEmptyMediaProps = React.ComponentProps<"div"> &
  VariantProps<typeof retroEmptyMediaVariants>

const RetroEmptyMedia = React.forwardRef<HTMLDivElement, RetroEmptyMediaProps>(
  function RetroEmptyMedia({ className, variant = "default", ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="empty-icon"
        data-variant={variant}
        className={cn(retroEmptyMediaVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
RetroEmptyMedia.displayName = "RetroEmptyMedia"

/* ------------------------------------------------------------------ */
/*  RetroEmptyTitle                                                    */
/* ------------------------------------------------------------------ */

const RetroEmptyTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroEmptyTitle({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="empty-title"
      className={cn(
        "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[1.1]",
        className
      )}
      {...props}
    />
  )
})
RetroEmptyTitle.displayName = "RetroEmptyTitle"

/* ------------------------------------------------------------------ */
/*  RetroEmptyDescription                                              */
/* ------------------------------------------------------------------ */

const RetroEmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function RetroEmptyDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="empty-description"
      className={cn(
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] text-os9-gray-800",
        "[&>a]:underline [&>a]:underline-offset-2 [&>a:hover]:text-os9-azul",
        className
      )}
      {...props}
    />
  )
})
RetroEmptyDescription.displayName = "RetroEmptyDescription"

/* ------------------------------------------------------------------ */
/*  RetroEmptyContent                                                  */
/* ------------------------------------------------------------------ */

const RetroEmptyContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroEmptyContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-[320px] min-w-0 flex-col items-center gap-[8px] text-balance",
        "font-[family-name:var(--os9-font-sans)] text-[10px]",
        className
      )}
      {...props}
    />
  )
})
RetroEmptyContent.displayName = "RetroEmptyContent"

export {
  RetroEmpty,
  RetroEmptyHeader,
  RetroEmptyMedia,
  RetroEmptyTitle,
  RetroEmptyDescription,
  RetroEmptyContent,
  retroEmptyMediaVariants,
}
