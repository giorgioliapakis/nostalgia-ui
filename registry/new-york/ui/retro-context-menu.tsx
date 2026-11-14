"use client"

/*
 * RetroContextMenu: the Control-click menu, on UI SDK.
 *
 * Right-click, Control-click, a long press or Shift+F10 on the trigger area
 * opens it at the pointer. It shares every part with RetroDropdownMenu, so
 * the gliding highlight and the selection blink come with it.
 */

import * as React from "react"
import {
  Menu as MenuPrimitive,
  MenuContextTrigger as MenuContextTriggerPrimitive,
  MenuContent as MenuContentPrimitive,
} from "@ui-sdk/react/menu"

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

function RetroContextMenu(props: React.ComponentProps<typeof MenuPrimitive>) {
  return <MenuPrimitive {...props} />
}

/** The area that opens the menu. Renders a div; use `render` to make it another element. */
function RetroContextMenuTrigger(props: React.ComponentProps<typeof MenuContextTriggerPrimitive>) {
  return <MenuContextTriggerPrimitive {...props} />
}

function RetroContextMenuContent({ sideOffset = 0, ...props }: RetroDropdownMenuContentProps) {
  return <RetroMenuPopup primitive={MenuContentPrimitive} sideOffset={sideOffset} {...props} />
}

export {
  RetroContextMenu,
  RetroContextMenuTrigger,
  RetroContextMenuContent,
  RetroDropdownMenuItem as RetroContextMenuItem,
  RetroDropdownMenuSeparator as RetroContextMenuSeparator,
  RetroDropdownMenuSub as RetroContextMenuSub,
  RetroDropdownMenuSubTrigger as RetroContextMenuSubTrigger,
  RetroDropdownMenuSubContent as RetroContextMenuSubContent,
  RetroDropdownMenuCheckboxItem as RetroContextMenuCheckboxItem,
  RetroDropdownMenuGroup as RetroContextMenuGroup,
  RetroDropdownMenuRadioGroup as RetroContextMenuRadioGroup,
  RetroDropdownMenuRadioItem as RetroContextMenuRadioItem,
  RetroDropdownMenuLabel as RetroContextMenuLabel,
  RetroDropdownMenuShortcut as RetroContextMenuShortcut,
}
