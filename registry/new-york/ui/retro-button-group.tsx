import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroButtonGroup                                                   */
/*                                                                     */
/*  Joins adjacent controls (RetroButton, RetroInput, RetroSelect…)    */
/*  into one strip. Neighbours overlap by 1px so each pair shares a    */
/*  single black border, exactly like an OS9 segmented control.        */
/* ------------------------------------------------------------------ */

const retroButtonGroupVariants = cva(
  [
    "flex w-fit items-stretch",
    // Focused / pressed children rise above neighbours so their ring and
    // borders are never clipped by the overlap.
    "[&>*]:relative [&>*:focus-visible]:z-10 [&>*:active]:z-10",
    // Nested groups sit apart rather than fusing.
    "has-[>[data-slot=button-group]]:gap-[8px] [&>[data-slot=button-group]]:m-0",
  ],
  {
    variants: {
      orientation: {
        horizontal: [
          "flex-row",
          "[&>*:not(:first-child)]:-ml-px",
          "[&>[data-slot=button-group]:not(:first-child)]:ml-0!",
          "[&>[data-slot=button-group-separator]]:ml-0! [&>[data-slot=button-group-separator]+*]:ml-0!",
        ],
        vertical: [
          "flex-col",
          "[&>*:not(:first-child)]:-mt-px",
          "[&>[data-slot=button-group]:not(:first-child)]:mt-0!",
          "[&>[data-slot=button-group-separator]]:mt-0! [&>[data-slot=button-group-separator]+*]:mt-0!",
        ],
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

type RetroButtonGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof retroButtonGroupVariants>

const RetroButtonGroup = React.forwardRef<HTMLDivElement, RetroButtonGroupProps>(
  function RetroButtonGroup(
    { className, orientation = "horizontal", ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="button-group"
        data-orientation={orientation}
        className={cn(retroButtonGroupVariants({ orientation }), className)}
        {...props}
      />
    )
  }
)
RetroButtonGroup.displayName = "RetroButtonGroup"

/* ------------------------------------------------------------------ */
/*  RetroButtonGroupText                                               */
/* ------------------------------------------------------------------ */

type RetroButtonGroupTextProps = React.ComponentProps<"div"> & {
  asChild?: boolean
}

const RetroButtonGroupText = React.forwardRef<
  HTMLDivElement,
  RetroButtonGroupTextProps
>(function RetroButtonGroupText({ className, asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      ref={ref}
      data-slot="button-group-text"
      className={cn(
        "flex items-center gap-[6px] whitespace-nowrap px-[8px]",
        "border border-os9-black bg-os9-gray-200 text-os9-black",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-500)]",
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-none",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
})
RetroButtonGroupText.displayName = "RetroButtonGroupText"

/* ------------------------------------------------------------------ */
/*  RetroButtonGroupSeparator                                          */
/* ------------------------------------------------------------------ */

type RetroButtonGroupSeparatorProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}

const RetroButtonGroupSeparator = React.forwardRef<
  HTMLDivElement,
  RetroButtonGroupSeparatorProps
>(function RetroButtonGroupSeparator(
  { className, orientation = "vertical", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      data-slot="button-group-separator"
      data-orientation={orientation}
      className={cn(
        "relative z-[1] shrink-0 self-stretch",
        // Etched groove: dark line + light line, drawn over the shared border.
        orientation === "vertical"
          ? "w-[2px] border-l border-os9-gray-700 border-r border-r-os9-white"
          : "h-[2px] border-t border-os9-gray-700 border-b border-b-os9-white",
        className
      )}
      {...props}
    />
  )
})
RetroButtonGroupSeparator.displayName = "RetroButtonGroupSeparator"

export {
  RetroButtonGroup,
  RetroButtonGroupSeparator,
  RetroButtonGroupText,
  retroButtonGroupVariants,
}
