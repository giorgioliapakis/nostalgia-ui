"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

const RetroCheckbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(function RetroCheckbox({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        // 12x12px box with OS9 inset bevel
        "group/checkbox peer relative inline-flex h-[12px] w-[12px] shrink-0 items-center justify-center",
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
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Focus ring
        "focus-visible:outline-none focus-visible:os9-focus-ring",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {/* Checkmark (checked) */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="mix-blend-darken group-data-[state=indeterminate]/checkbox:hidden"
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
          className="hidden group-data-[state=indeterminate]/checkbox:block"
        >
          <rect x="0" y="3" width="8" height="2" fill="var(--os9-black)" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
RetroCheckbox.displayName = "RetroCheckbox"

export { RetroCheckbox }
