"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Variants                                                           */
/* ------------------------------------------------------------------ */

/*
 * Mac OS 9 Appearance Manager bevel buttons came in three bevel depths.
 * Each depth adds one more ring of highlight / shadow inside the black
 * frame. The "on" state inverts the rings and darkens the face.
 */
const retroBevelButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-[4px]",
    "border border-os9-black bg-os9-gray-300 text-os9-black",
    "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
    "cursor-pointer select-none whitespace-nowrap",
    "transition-none",
    "focus-visible:os9-focus-ring",
    "active:bg-os9-gray-700 active:text-os9-white",
    "data-[state=on]:bg-os9-gray-700 data-[state=on]:text-os9-white",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-os9-gray-600 disabled:border-os9-gray-600 disabled:[&_svg]:opacity-50",
  ],
  {
    variants: {
      bevel: {
        small: [
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          "active:shadow-[inset_1px_1px_0_var(--os9-gray-800),inset_-1px_-1px_0_var(--os9-gray-500)]",
          "data-[state=on]:shadow-[inset_1px_1px_0_var(--os9-gray-800),inset_-1px_-1px_0_var(--os9-gray-500)]",
        ],
        normal: [
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700),inset_2px_2px_0_var(--os9-gray-200),inset_-2px_-2px_0_var(--os9-gray-500)]",
          "active:shadow-[inset_1px_1px_0_var(--os9-black),inset_-1px_-1px_0_var(--os9-gray-500),inset_2px_2px_0_var(--os9-gray-800),inset_-2px_-2px_0_var(--os9-gray-600)]",
          "data-[state=on]:shadow-[inset_1px_1px_0_var(--os9-black),inset_-1px_-1px_0_var(--os9-gray-500),inset_2px_2px_0_var(--os9-gray-800),inset_-2px_-2px_0_var(--os9-gray-600)]",
        ],
        large: [
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-800),inset_2px_2px_0_var(--os9-white),inset_-2px_-2px_0_var(--os9-gray-700),inset_3px_3px_0_var(--os9-gray-200),inset_-3px_-3px_0_var(--os9-gray-500)]",
          "active:shadow-[inset_1px_1px_0_var(--os9-black),inset_-1px_-1px_0_var(--os9-gray-400),inset_2px_2px_0_var(--os9-black),inset_-2px_-2px_0_var(--os9-gray-500),inset_3px_3px_0_var(--os9-gray-800),inset_-3px_-3px_0_var(--os9-gray-600)]",
          "data-[state=on]:shadow-[inset_1px_1px_0_var(--os9-black),inset_-1px_-1px_0_var(--os9-gray-400),inset_2px_2px_0_var(--os9-black),inset_-2px_-2px_0_var(--os9-gray-500),inset_3px_3px_0_var(--os9-gray-800),inset_-3px_-3px_0_var(--os9-gray-600)]",
        ],
      },
      size: {
        sm: "min-h-[20px] min-w-[20px] px-[4px] py-[2px] text-[10px]",
        default: "min-h-[24px] min-w-[24px] px-[8px] py-[4px]",
        lg: "min-h-[32px] min-w-[32px] px-[10px] py-[6px]",
      },
      iconPosition: {
        left: "flex-row",
        top: "flex-col gap-[4px]",
        right: "flex-row-reverse",
      },
    },
    compoundVariants: [
      { iconPosition: "top", size: "default", className: "min-w-[56px] py-[6px]" },
      { iconPosition: "top", size: "lg", className: "min-w-[72px] py-[8px]" },
    ],
    defaultVariants: {
      bevel: "normal",
      size: "default",
      iconPosition: "left",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  Pop-up menu arrow                                                  */
/* ------------------------------------------------------------------ */

function BevelMenuArrow({ direction }: { direction: "down" | "right" }) {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 7 7"
      aria-hidden="true"
      className={cn(
        "pointer-events-none shrink-0",
        direction === "down"
          ? "absolute right-[4px] bottom-[4px]"
          : "absolute right-[4px] top-1/2 -translate-y-1/2"
      )}
    >
      <path
        d={direction === "down" ? "M0 2H7L3.5 6Z" : "M2 0V7L6 3.5Z"}
        fill="currentColor"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroBevelButton                                                   */
/* ------------------------------------------------------------------ */

interface RetroBevelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroBevelButtonVariants> {
  /** Icon rendered above / beside the label (e.g. a RetroIcon). */
  icon?: React.ReactNode
  /**
   * Makes the button a sticky toggle (aria-pressed). Implied when
   * `pressed` or `defaultPressed` is provided.
   */
  toggle?: boolean
  /** Controlled pressed state (toggle behaviour). */
  pressed?: boolean
  /** Initial pressed state when uncontrolled (toggle behaviour). */
  defaultPressed?: boolean
  /** Fires when the pressed state changes (toggle behaviour). */
  onPressedChange?: (pressed: boolean) => void
  /**
   * Shows the pop-up menu indicator. `true` / "down" draws the arrow in
   * the bottom-right corner; "right" draws a sideways arrow (submenu).
   */
  menu?: boolean | "down" | "right"
}

const RetroBevelButton = React.forwardRef<
  HTMLButtonElement,
  RetroBevelButtonProps
>(function RetroBevelButton(
  {
    className,
    bevel,
    size,
    iconPosition,
    icon,
    toggle,
    pressed: pressedProp,
    defaultPressed,
    onPressedChange,
    menu,
    onClick,
    children,
    type = "button",
    ...props
  },
  ref
) {
  const isToggle =
    toggle || pressedProp !== undefined || defaultPressed !== undefined
  const [uncontrolledPressed, setUncontrolledPressed] = React.useState(
    defaultPressed ?? false
  )
  const isControlled = pressedProp !== undefined
  const pressed = isControlled ? pressedProp : uncontrolledPressed

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || !isToggle) return
    const next = !pressed
    if (!isControlled) setUncontrolledPressed(next)
    onPressedChange?.(next)
  }

  const menuDirection = menu === "right" ? "right" : menu ? "down" : null

  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={isToggle ? pressed : undefined}
      aria-haspopup={menuDirection ? "menu" : undefined}
      data-state={isToggle ? (pressed ? "on" : "off") : undefined}
      className={cn(
        retroBevelButtonVariants({ bevel, size, iconPosition }),
        menuDirection && "pr-[16px]",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {icon ? (
        <span className="inline-flex shrink-0 items-center justify-center">
          {icon}
        </span>
      ) : null}
      {children != null && children !== false ? (
        <span className="inline-flex items-center">{children}</span>
      ) : null}
      {menuDirection ? <BevelMenuArrow direction={menuDirection} /> : null}
    </button>
  )
})
RetroBevelButton.displayName = "RetroBevelButton"

export { RetroBevelButton, retroBevelButtonVariants }
export type { RetroBevelButtonProps }
