import * as React from "react"
import { renderElement, type RenderProp } from "@ui-sdk/react/primitive"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Default-button ring. OS 9 marks the button that Return/Enter activates
 * with a thick black ring separated from the face by a platinum gap. It is
 * drawn with outer box-shadows (so it never changes the button's box) plus a
 * matching margin so it does not overlap neighbours. Class strings are
 * written out in full so Tailwind can detect them.
 *
 * Crafted moment: none beyond the classic pressed state (the face inverts
 * while held). Composition uses `render`, not `asChild`:
 * `<RetroButton render={<Link href="/x" />}>Open</RetroButton>`. The file has
 * no hooks and no "use client", so a Server Component can pass `render`.
 */

const retroButtonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
    "cursor-pointer select-none",
    "transition-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "border border-os9-black bg-os9-gray-300 text-os9-black",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          "active:bg-os9-gray-800 active:text-os9-white",
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        ],
        primary: [
          "border-[2px] border-os9-black bg-os9-gray-300 text-os9-black",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          "active:bg-os9-gray-800 active:text-os9-white",
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        ],
        secondary: [
          "border-y border-x-0 border-os9-black bg-os9-gray-300 text-os9-black",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(128,128,128,0.5)]",
          "active:bg-os9-gray-800 active:text-os9-white",
          "active:shadow-[inset_0_1px_0_rgba(38,38,38,0.4),inset_0_-1px_0_rgba(133,133,133,1)]",
        ],
      },
      size: {
        default: "h-[24px] px-4 py-0",
        sm: "h-[20px] px-2 py-0 text-[10px]",
        lg: "h-[30px] px-6 py-0 text-[12px]",
      },
      /**
       * Default (Return-key) button: adds the thick outer ring. Must come
       * after "variant" so its shadows win the tailwind-merge.
       */
      isDefault: {
        false: "focus-visible:os9-focus-ring",
        true: [
          "m-[5px]",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700),0_0_0_2px_var(--os9-gray-300),0_0_0_5px_var(--os9-black)]",
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white),0_0_0_2px_var(--os9-gray-300),0_0_0_5px_var(--os9-black)]",
          "focus-visible:outline-none focus-visible:shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700),0_0_0_2px_var(--os9-focus),0_0_0_5px_var(--os9-black)]",
          "focus-visible:active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white),0_0_0_2px_var(--os9-focus),0_0_0_5px_var(--os9-black)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isDefault: false,
    },
  }
)

type RetroButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof retroButtonVariants> & {
    /** Render a different element (e.g. a link) with the button's look. */
    render?: RenderProp
  }

function RetroButton({
  className,
  variant,
  size,
  isDefault = false,
  disabled,
  render,
  onClick,
  ...props
}: RetroButtonProps) {
  /* aria-disabled looks disabled but stays focusable and hoverable (so a
   * tooltip can explain why); presses are ignored */
  const softDisabled = props["aria-disabled"] === true || props["aria-disabled"] === "true"
  return renderElement(
    "button",
    {
      className: cn(
        retroButtonVariants({ variant, size, isDefault }),
        disabled && "pointer-events-none",
        (disabled || softDisabled) && [
          "text-os9-gray-600",
          "border-os9-gray-600",
          isDefault
            ? "shadow-[inset_1px_1px_0_var(--os9-gray-300),inset_-1px_-1px_0_var(--os9-gray-400),0_0_0_2px_var(--os9-gray-300),0_0_0_5px_var(--os9-gray-600)]"
            : "shadow-[inset_1px_1px_0_var(--os9-gray-300),inset_-1px_-1px_0_var(--os9-gray-400)]",
        ],
        className
      ),
      disabled,
      "data-default": isDefault ? "" : undefined,
      onClick: softDisabled ? (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault() : onClick,
      ...props,
    },
    render
  )
}

export { RetroButton, retroButtonVariants }
export type { RetroButtonProps }
