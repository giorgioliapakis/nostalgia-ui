"use client"

/*
 * RetroCheckbox: the OS 9 12px beveled check box.
 *
 * Crafted moment: none on purpose. OS 9 drew the check the instant the
 * mouse came up, and the box answers the press itself with an inverted
 * bevel while held. The check and the mixed dash appear without easing in
 * both flairs.
 *
 * UI SDK renders a <button role="checkbox"> plus a hidden native checkbox
 * for forms. A button is labelable, so <label htmlFor={id}> still works.
 */

import * as React from "react"
import {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator as CheckboxIndicatorPrimitive,
} from "@ui-sdk/react/checkbox"

import { cn } from "@/lib/utils"

type RetroCheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive>,
  "className" | "children"
> & {
  className?: string
}

function RetroCheckbox({ className, ...props }: RetroCheckboxProps) {
  return (
    <CheckboxPrimitive
      className={cn(
        // 12x12px box with OS9 inset bevel
        "group/checkbox peer relative inline-flex h-[12px] w-[12px] shrink-0 items-center justify-center p-0",
        // Border
        "border border-os9-black",
        // Background: gray-300 default, gray-700 when active/pressed
        "bg-os9-gray-300 active:bg-os9-gray-700",
        // Inner shadow bevel: white highlight top-left, gray shadow bottom-right (default)
        // Outer drop shadow per Figma: 0.5px 0.5px
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700),0.5px_0.5px_0_0_rgba(38,38,38,0.3)]",
        // Active state: inverted inner shadows (darker top-left, lighter bottom-right)
        "active:shadow-[inset_1px_1px_0_#404040,inset_-1px_-1px_0_#c0c0c0,0.5px_0.5px_0_0_rgba(38,38,38,0.3)]",
        // Disabled state
        "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:active:bg-os9-gray-300",
        // Focus ring
        "focus-visible:outline-none focus-visible:os9-focus-ring",
        className
      )}
      {...props}
    >
      <CheckboxIndicatorPrimitive className="flex items-center justify-center">
        {/* Checkmark (checked) */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="mix-blend-darken group-data-indeterminate/checkbox:hidden"
        >
          <path
            d="M3 8.5L6.5 12L13 4"
            stroke="var(--os9-black)"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
        {/* Dash (indeterminate / mixed) */}
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="hidden group-data-indeterminate/checkbox:block"
        >
          <rect x="0" y="3" width="8" height="2" fill="var(--os9-black)" />
        </svg>
      </CheckboxIndicatorPrimitive>
    </CheckboxPrimitive>
  )
}

export { RetroCheckbox }
