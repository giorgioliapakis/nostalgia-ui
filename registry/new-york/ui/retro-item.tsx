import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroItemGroup                                                     */
/* ------------------------------------------------------------------ */

const RetroItemGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroItemGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
})
RetroItemGroup.displayName = "RetroItemGroup"

/* ------------------------------------------------------------------ */
/*  RetroItemSeparator                                                 */
/* ------------------------------------------------------------------ */

const RetroItemSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroItemSeparator({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      data-slot="item-separator"
      className={cn(
        // 2px etched rule: dark line over light line
        "my-0 h-[2px] w-full shrink-0 border-t border-os9-gray-700 border-b border-b-os9-white",
        className
      )}
      {...props}
    />
  )
})
RetroItemSeparator.displayName = "RetroItemSeparator"

/* ------------------------------------------------------------------ */
/*  RetroItem                                                          */
/* ------------------------------------------------------------------ */

const retroItemVariants = cva(
  [
    "group/item flex flex-wrap items-center",
    "border text-os9-black outline-none transition-none",
    "font-[family-name:var(--os9-font-sans)] text-[10px]",
    "focus-visible:os9-focus-ring",
    // Linked items get the generic lavender hover
    "[a&]:cursor-pointer [a&]:hover:bg-os9-lavender",
    // Selected list row: azul + white, like a Finder selection
    "data-[selected=true]:bg-os9-azul data-[selected=true]:text-os9-white",
    "aria-selected:bg-os9-azul aria-selected:text-os9-white",
  ],
  {
    variants: {
      variant: {
        default: "border-transparent bg-transparent",
        outline: [
          "border-os9-black bg-os9-gray-200",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-500)]",
        ],
        muted: "border-transparent bg-os9-gray-300",
      },
      size: {
        default: "gap-[10px] px-[10px] py-[8px]",
        sm: "gap-[8px] px-[8px] py-[4px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type RetroItemProps = React.ComponentProps<"div"> &
  VariantProps<typeof retroItemVariants> & { asChild?: boolean }

const RetroItem = React.forwardRef<HTMLDivElement, RetroItemProps>(
  function RetroItem(
    { className, variant = "default", size = "default", asChild = false, ...props },
    ref
  ) {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        data-slot="item"
        data-variant={variant}
        data-size={size}
        className={cn(retroItemVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
RetroItem.displayName = "RetroItem"

/* ------------------------------------------------------------------ */
/*  RetroItemMedia                                                     */
/* ------------------------------------------------------------------ */

const retroItemMediaVariants = cva(
  [
    "flex shrink-0 items-center justify-center gap-[6px]",
    "group-has-[[data-slot=item-description]]/item:self-start",
    "[&_svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        /** 32px raised tile, sized for a 16px glyph or RetroIcon size="sm". */
        icon: [
          "size-[32px] border border-os9-black bg-os9-gray-300 text-os9-black",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          "[&_svg:not([class*='size-'])]:size-[16px]",
        ],
        /** Framed thumbnail — square, black 1px frame. */
        image: [
          "size-[40px] overflow-hidden border border-os9-black bg-os9-white",
          "[&_img]:size-full [&_img]:object-cover",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type RetroItemMediaProps = React.ComponentProps<"div"> &
  VariantProps<typeof retroItemMediaVariants>

const RetroItemMedia = React.forwardRef<HTMLDivElement, RetroItemMediaProps>(
  function RetroItemMedia({ className, variant = "default", ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="item-media"
        data-variant={variant}
        className={cn(retroItemMediaVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
RetroItemMedia.displayName = "RetroItemMedia"

/* ------------------------------------------------------------------ */
/*  RetroItemContent / Title / Description                            */
/* ------------------------------------------------------------------ */

const RetroItemContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroItemContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-[3px] [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
})
RetroItemContent.displayName = "RetroItemContent"

const RetroItemTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroItemTitle({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-[6px]",
        "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[1.1]",
        className
      )}
      {...props}
    />
  )
})
RetroItemTitle.displayName = "RetroItemTitle"

const RetroItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function RetroItemDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-balance",
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] text-os9-gray-800",
        "group-data-[selected=true]/item:text-os9-white group-aria-selected/item:text-os9-white",
        "[&>a]:underline [&>a]:underline-offset-2 [&>a:hover]:text-os9-azul",
        className
      )}
      {...props}
    />
  )
})
RetroItemDescription.displayName = "RetroItemDescription"

/* ------------------------------------------------------------------ */
/*  RetroItemActions / Header / Footer                                 */
/* ------------------------------------------------------------------ */

const RetroItemActions = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroItemActions({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-actions"
      className={cn("flex items-center gap-[6px]", className)}
      {...props}
    />
  )
})
RetroItemActions.displayName = "RetroItemActions"

const RetroItemHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroItemHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-[6px]",
        className
      )}
      {...props}
    />
  )
})
RetroItemHeader.displayName = "RetroItemHeader"

const RetroItemFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroItemFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-[6px]",
        className
      )}
      {...props}
    />
  )
})
RetroItemFooter.displayName = "RetroItemFooter"

export {
  RetroItem,
  RetroItemMedia,
  RetroItemContent,
  RetroItemActions,
  RetroItemGroup,
  RetroItemSeparator,
  RetroItemTitle,
  RetroItemDescription,
  RetroItemHeader,
  RetroItemFooter,
  retroItemVariants,
  retroItemMediaVariants,
}
