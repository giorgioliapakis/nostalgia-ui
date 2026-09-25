import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroKbd — a single raised keycap                                  */
/* ------------------------------------------------------------------ */

const retroKbdVariants = cva(
  [
    "pointer-events-none inline-flex w-fit shrink-0 items-center justify-center gap-[2px] select-none",
    "border border-os9-black bg-os9-gray-300 text-os9-black",
    // Keycap bevel: bright top-left, dark bottom-right, and a thicker base
    // edge so the key reads as sitting proud of the surface.
    "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-2px_0_var(--os9-gray-600)]",
    "font-[family-name:var(--os9-font-heading)] tracking-[0.42px] leading-none whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Inside a tooltip / highlighted menu the cap stays legible.
    "[[data-slot=tooltip-content]_&]:bg-os9-white",
  ],
  {
    variants: {
      size: {
        default: "h-[18px] min-w-[18px] px-[4px] pb-[1px] text-[11px] [&_svg]:size-[10px]",
        sm: "h-[14px] min-w-[14px] px-[3px] pb-[1px] text-[9px] [&_svg]:size-[8px]",
        lg: "h-[24px] min-w-[24px] px-[6px] pb-[2px] text-[13px] [&_svg]:size-[12px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type RetroKbdProps = React.ComponentProps<"kbd"> &
  VariantProps<typeof retroKbdVariants>

const RetroKbd = React.forwardRef<HTMLElement, RetroKbdProps>(
  function RetroKbd({ className, size, ...props }, ref) {
    return (
      <kbd
        ref={ref}
        data-slot="kbd"
        className={cn(retroKbdVariants({ size }), className)}
        {...props}
      />
    )
  }
)
RetroKbd.displayName = "RetroKbd"

/* ------------------------------------------------------------------ */
/*  RetroKbdGroup — a chord of keycaps                                 */
/* ------------------------------------------------------------------ */

const RetroKbdGroup = React.forwardRef<HTMLElement, React.ComponentProps<"kbd">>(
  function RetroKbdGroup({ className, ...props }, ref) {
    return (
      <kbd
        ref={ref}
        data-slot="kbd-group"
        className={cn(
          "inline-flex items-center gap-[3px]",
          "font-[family-name:var(--os9-font-sans)] text-[10px] text-os9-gray-700",
          className
        )}
        {...props}
      />
    )
  }
)
RetroKbdGroup.displayName = "RetroKbdGroup"

/* ------------------------------------------------------------------ */
/*  Modifier glyphs                                                    */
/* ------------------------------------------------------------------ */

/**
 * Mac modifier glyphs. Use them as `<RetroKbd>{RETRO_KBD_KEYS.command}</RetroKbd>`
 * so the symbols stay consistent across menus, tooltips and docs.
 */
const RETRO_KBD_KEYS = {
  command: "⌘", // ⌘
  option: "⌥", // ⌥
  shift: "⇧", // ⇧
  control: "⌃", // ⌃
  capsLock: "⇪", // ⇪
  return: "↩", // ↩
  enter: "⌤", // ⌤
  delete: "⌫", // ⌫
  forwardDelete: "⌦", // ⌦
  escape: "⎋", // ⎋
  tab: "⇥", // ⇥
  up: "↑", // ↑
  down: "↓", // ↓
  left: "←", // ←
  right: "→", // →
  power: "⏻", // ⏻
} as const

export { RetroKbd, RetroKbdGroup, RETRO_KBD_KEYS, retroKbdVariants }
