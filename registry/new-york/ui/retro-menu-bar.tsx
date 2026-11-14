"use client"

/*
 * RetroMenuBar: a Mac OS 9 menu bar on UI SDK.
 *
 * Its menus are RetroDropdownMenu's parts, so they look and behave the same:
 * the gliding azul highlight and the selection blink come with them.
 *
 * Crafted moment: the title switch. Once a menu is open, sliding along the
 * bar (or pressing Left / Right) moves the azul title highlight and swaps
 * the menu at once, with no fade between them, as the Mac OS did. The first
 * menu still drops in with the dropdown's 100ms fade in modern flair.
 */

import * as React from "react"
import {
  Menu as MenuPrimitive,
  MenuContent as MenuContentPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
} from "@ui-sdk/react/menu"
import { Menubar as MenubarPrimitive } from "@ui-sdk/react/menubar"

import { cn } from "@/lib/utils"
import { useMergedRef } from "@/registry/new-york/lib/retro-motion"
import {
  RetroDropdownMenuCheckboxItem,
  RetroDropdownMenuGroup,
  RetroDropdownMenuItem,
  RetroDropdownMenuLabel,
  RetroDropdownMenuRadioGroup,
  RetroDropdownMenuRadioItem,
  RetroDropdownMenuSeparator,
  RetroDropdownMenuShortcut,
  RetroDropdownMenuSub,
  RetroDropdownMenuSubContent,
  RetroDropdownMenuSubTrigger,
  RetroMenuPopup,
  type RetroDropdownMenuContentProps,
} from "@/registry/new-york/ui/retro-dropdown-menu"

type WithClassName<P> = Omit<P, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
}

/* While menus switch, both the outgoing and the incoming menu skip their
 * enter/exit transitions. Unlayered + important, so it beats the popup's
 * transition utilities. */
const MENU_BAR_CSS = `
[data-os9-menubar-switching] .os9-menu { transition: none !important; }
`

/* Marks the bar as "switching" for a moment, long enough to cover the
 * popups' 100ms enter / 75ms exit. */
const SwitchContext = React.createContext<((open: boolean, switching: boolean) => void) | null>(null)

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

function RetroMenuBar({
  className,
  ref,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof MenubarPrimitive>>) {
  const barRef = React.useRef<HTMLDivElement | null>(null)
  const mergedRef = useMergedRef(ref, barRef)
  const timer = React.useRef(0)

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const markSwitch = React.useCallback((open: boolean, switching: boolean) => {
    const bar = barRef.current
    if (!bar) return
    /* a menu opening while the bar already shows one, or one giving way */
    if (!switching && !(open && bar.hasAttribute("data-open"))) return
    bar.setAttribute("data-os9-menubar-switching", "")
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => bar.removeAttribute("data-os9-menubar-switching"), 200)
  }, [])

  return (
    <MenubarPrimitive
      ref={mergedRef}
      className={cn(
        "flex h-[20px] items-center gap-[6px] px-[8px]",
        "bg-os9-gray-300",
        "border-b border-os9-black",
        /* Inner bevel: white highlight top, dark shadow bottom */
        "shadow-[inset_0_1px_0_var(--os9-white),inset_0_-1px_0_var(--os9-gray-700)]",
        className
      )}
      {...props}
    >
      <style href="os9-menubar" precedence="default">
        {MENU_BAR_CSS}
      </style>
      <SwitchContext.Provider value={markSwitch}>{children}</SwitchContext.Provider>
    </MenubarPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  Menu & title                                                       */
/* ------------------------------------------------------------------ */

function RetroMenuBarMenu({ onOpenChange, ...props }: React.ComponentProps<typeof MenuPrimitive>) {
  const markSwitch = React.useContext(SwitchContext)
  return (
    <MenuPrimitive
      {...props}
      onOpenChange={(open, details) => {
        markSwitch?.(open, details.reason === "submenu-switch")
        onOpenChange?.(open, details)
      }}
    />
  )
}

/* The title: azul with white ink while its menu is open (or it has focus),
 * flipping in one step, like OS 9. */
function RetroMenuBarTrigger({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuTriggerPrimitive>>) {
  return (
    <MenuTriggerPrimitive
      className={cn(
        "flex items-center cursor-pointer select-none whitespace-nowrap",
        "h-[20px] px-[8px] pt-[2px]",
        "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "outline-none",
        "data-open:bg-os9-azul data-open:text-os9-white",
        "focus-visible:bg-os9-azul focus-visible:text-os9-white",
        "aria-disabled:text-os9-gray-600 aria-disabled:focus-visible:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

function RetroMenuBarContent({
  align = "start",
  alignOffset = -4,
  side = "bottom",
  sideOffset = 0,
  ...props
}: RetroDropdownMenuContentProps) {
  return (
    <RetroMenuPopup
      primitive={MenuContentPrimitive}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroMenuBar,
  RetroMenuBarMenu,
  RetroMenuBarTrigger,
  RetroMenuBarContent,
  RetroDropdownMenuItem as RetroMenuBarItem,
  RetroDropdownMenuSeparator as RetroMenuBarSeparator,
  RetroDropdownMenuGroup as RetroMenuBarGroup,
  RetroDropdownMenuLabel as RetroMenuBarLabel,
  RetroDropdownMenuSub as RetroMenuBarSub,
  RetroDropdownMenuSubTrigger as RetroMenuBarSubTrigger,
  RetroDropdownMenuSubContent as RetroMenuBarSubContent,
  RetroDropdownMenuCheckboxItem as RetroMenuBarCheckboxItem,
  RetroDropdownMenuRadioGroup as RetroMenuBarRadioGroup,
  RetroDropdownMenuRadioItem as RetroMenuBarRadioItem,
  RetroDropdownMenuShortcut as RetroMenuBarShortcut,
}
