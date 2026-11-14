"use client"

/*
 * RetroDropdownMenu: a Mac OS 9 pull-down menu on UI SDK.
 *
 * Crafted moments:
 *  - Gliding azul highlight (modern flair): one highlight layer slides
 *    between rows, so pointer and keyboard moves read as one motion. The
 *    row's ink flips to white in one step as the highlight arrives. Classic
 *    flair snaps the highlight row to row, like 1999.
 *  - Menu blink (both flairs): the chosen item flashes three times, then the
 *    command runs and the menu closes, as the Mac OS always did.
 *
 * The parts are shared by RetroContextMenu and RetroMenuBar.
 */

import * as React from "react"
import {
  Menu as MenuPrimitive,
  MenuCheckboxItem as MenuCheckboxItemPrimitive,
  MenuContent as MenuContentPrimitive,
  MenuGroup as MenuGroupPrimitive,
  MenuGroupLabel as MenuGroupLabelPrimitive,
  MenuItem as MenuItemPrimitive,
  MenuItemIndicator as MenuItemIndicatorPrimitive,
  MenuRadioGroup as MenuRadioGroupPrimitive,
  MenuRadioItem as MenuRadioItemPrimitive,
  MenuSeparator as MenuSeparatorPrimitive,
  MenuSub as MenuSubPrimitive,
  MenuSubContent as MenuSubContentPrimitive,
  MenuSubTrigger as MenuSubTriggerPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
} from "@ui-sdk/react/menu"

import { cn } from "@/lib/utils"
import { BLINK_COUNT, BLINK_CYCLE_MS, blinkThen, popupClass, useGlide } from "@/registry/new-york/lib/retro-motion"

/* string class names and plain children, as shadcn-style parts take */
type WithClassName<P> = Omit<P, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
}

/* ------------------------------------------------------------------ */
/*  Shared menu CSS (glide suppression + blink)                        */
/* ------------------------------------------------------------------ */

/* Unlayered, so it beats the row utilities without !important; the blink
 * animation in turn beats both. React hoists it and dedupes it by href. */
const MENU_CSS = `
.os9-menu:not([data-glide-off]) [role^="menuitem"][data-highlighted],
.os9-menu:not([data-glide-off]) [role^="menuitem"][data-popup-open] {
  background-color: transparent;
}
.os9-menu[data-glide-off] > [data-glide-layer],
.os9-menu:has([data-pending]) > [data-glide-layer] {
  opacity: 0 !important;
  transition: none !important;
}
.os9-menu [role^="menuitem"] { transition: color 0s linear 60ms; }
.os9-menu[data-glide-off] [role^="menuitem"] { transition: none; }
@keyframes os9-menu-blink {
  0%, 49.9% { background-color: transparent; color: var(--os9-black); }
  50%, 100% { background-color: var(--os9-azul); color: var(--os9-white); }
}
.os9-menu [data-pending] {
  animation: os9-menu-blink ${BLINK_CYCLE_MS}ms steps(1, end) ${BLINK_COUNT};
}
.os9-menu [data-pending] * { color: inherit !important; }
`

function RetroMenuStyles() {
  return (
    <style href="os9-menu" precedence="default">
      {MENU_CSS}
    </style>
  )
}

/* ------------------------------------------------------------------ */
/*  Root & trigger                                                     */
/* ------------------------------------------------------------------ */

function RetroDropdownMenu(props: React.ComponentProps<typeof MenuPrimitive>) {
  return <MenuPrimitive {...props} />
}

function RetroDropdownMenuTrigger(props: React.ComponentProps<typeof MenuTriggerPrimitive>) {
  return <MenuTriggerPrimitive {...props} />
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

/* OS 9 menus appear at once; modern flair adds a 100ms fade and a 2px drop.
 * Box properties carry `!` so UI SDK's popup reset can't strip them in apps
 * that haven't declared `@layer ui-sdk;` first. */
const retroMenuPopupClass = cn(
  "os9-menu relative z-50 min-w-[160px] p-[2px]! outline-none",
  "bg-os9-white! border! border-os9-black! shadow-[2px_2px_0_var(--os9-black)]",
  "overflow-visible! text-os9-black!",
  "transition-[opacity,translate] duration-100 ease-out",
  "data-starting-style:opacity-0 data-starting-style:-translate-y-[2px]",
  "data-ending-style:opacity-0 data-ending-style:duration-75",
  "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
)

type RetroDropdownMenuContentProps = WithClassName<React.ComponentProps<typeof MenuContentPrimitive>>

function RetroMenuPopup({
  primitive: Primitive,
  className,
  ref,
  children,
  ...props
}: RetroDropdownMenuContentProps & {
  primitive: typeof MenuContentPrimitive | typeof MenuSubContentPrimitive
}) {
  const glideRef = useGlide(ref)
  return (
    <Primitive ref={glideRef} className={popupClass(retroMenuPopupClass, className)} {...props}>
      <RetroMenuStyles />
      <span
        aria-hidden
        data-glide-layer
        className="pointer-events-none absolute top-0 left-0 bg-os9-azul opacity-0"
      />
      {children}
    </Primitive>
  )
}

function RetroDropdownMenuContent({
  align = "start",
  side = "bottom",
  sideOffset = 4,
  ...props
}: RetroDropdownMenuContentProps) {
  return (
    <RetroMenuPopup
      primitive={MenuContentPrimitive}
      align={align}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Items                                                              */
/* ------------------------------------------------------------------ */

const retroMenuRowClass = cn(
  "group relative z-[1] flex items-center cursor-default select-none outline-none",
  "h-[18px] px-[16px]",
  "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
  "text-os9-black",
  "data-highlighted:bg-os9-azul data-highlighted:text-os9-white",
  "data-disabled:text-os9-gray-600 data-disabled:data-highlighted:bg-transparent data-disabled:data-highlighted:text-os9-gray-600"
)

type RetroDropdownMenuItemProps = WithClassName<React.ComponentProps<typeof MenuItemPrimitive>> & {
  /** Skip the selection blink for this item. */
  noBlink?: boolean
}

function RetroDropdownMenuItem({ className, onSelect, noBlink, ...props }: RetroDropdownMenuItemProps) {
  return (
    <MenuItemPrimitive
      className={cn(retroMenuRowClass, className)}
      /* blink, then run the command; the menu closes once this resolves */
      onSelect={noBlink ? onSelect : (event) => blinkThen(() => onSelect?.(event))}
      {...props}
    />
  )
}

const indicatorSlot = "absolute left-[6px] flex size-[10px] items-center justify-center"

function RetroDropdownMenuCheckboxItem({
  className,
  children,
  value,
  ...props
}: WithClassName<Omit<React.ComponentProps<typeof MenuCheckboxItemPrimitive>, "value">> & {
  /** Identifies the item in the menu's onCheckedChange. Defaults to a generated id. */
  value?: string
}) {
  const id = React.useId()
  return (
    <MenuCheckboxItemPrimitive
      value={value ?? id}
      className={cn(retroMenuRowClass, "pl-[24px]", className)}
      {...props}
    >
      <span className={indicatorSlot}>
        <MenuItemIndicatorPrimitive>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8.5L6.5 12L13 4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </MenuItemIndicatorPrimitive>
      </span>
      {children}
    </MenuCheckboxItemPrimitive>
  )
}

/* a GroupLabel must live inside a Group; outside one, fall back to a plain
 * label so a label at the top of a menu still works */
const InGroupContext = React.createContext(false)

function RetroDropdownMenuGroup({
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuGroupPrimitive>>) {
  return (
    <MenuGroupPrimitive {...props}>
      <InGroupContext.Provider value>{children}</InGroupContext.Provider>
    </MenuGroupPrimitive>
  )
}

function RetroDropdownMenuRadioGroup({
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuRadioGroupPrimitive>>) {
  return (
    <MenuRadioGroupPrimitive {...props}>
      <InGroupContext.Provider value>{children}</InGroupContext.Provider>
    </MenuRadioGroupPrimitive>
  )
}

function RetroDropdownMenuRadioItem({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuRadioItemPrimitive>>) {
  return (
    <MenuRadioItemPrimitive className={cn(retroMenuRowClass, "pl-[24px]", className)} {...props}>
      <span className={indicatorSlot}>
        <MenuItemIndicatorPrimitive>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
            <circle cx="4" cy="4" r="3" fill="currentColor" />
          </svg>
        </MenuItemIndicatorPrimitive>
      </span>
      {children}
    </MenuRadioItemPrimitive>
  )
}

const labelClass =
  "px-[16px] py-[2px] font-[family-name:var(--os9-font-heading)] text-[10px] tracking-[0.42px] leading-[0.98] text-os9-gray-700"

function RetroDropdownMenuLabel({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuGroupLabelPrimitive>>) {
  const inGroup = React.useContext(InGroupContext)
  if (inGroup) return <MenuGroupLabelPrimitive className={cn(labelClass, className)} {...props} />
  return <div className={cn(labelClass, className)} {...(props as React.ComponentProps<"div">)} />
}

function RetroDropdownMenuSeparator({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuSeparatorPrimitive>>) {
  return (
    <MenuSeparatorPrimitive
      className={cn(
        "h-[2px] mx-[4px] my-[2px] border-t border-os9-gray-700 border-b border-b-os9-white",
        className
      )}
      {...props}
    />
  )
}

function RetroDropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-auto pl-[16px] font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px]",
        "text-os9-gray-700 group-data-highlighted:text-os9-white",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Submenus                                                           */
/* ------------------------------------------------------------------ */

function RetroDropdownMenuSub(props: React.ComponentProps<typeof MenuSubPrimitive>) {
  return <MenuSubPrimitive {...props} />
}

function RetroDropdownMenuSubTrigger({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuSubTriggerPrimitive>>) {
  return (
    <MenuSubTriggerPrimitive
      className={cn(
        retroMenuRowClass,
        "data-popup-open:bg-os9-azul data-popup-open:text-os9-white",
        className
      )}
      {...props}
    >
      {children}
      <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="ml-auto" aria-hidden>
        <path d="M0 0L6 4L0 8V0Z" fill="currentColor" />
      </svg>
    </MenuSubTriggerPrimitive>
  )
}

function RetroDropdownMenuSubContent({
  align = "start",
  side = "right",
  sideOffset = 0,
  ...props
}: RetroDropdownMenuContentProps) {
  return (
    <RetroMenuPopup
      primitive={MenuSubContentPrimitive}
      align={align}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

export {
  RetroDropdownMenu,
  RetroDropdownMenuTrigger,
  RetroDropdownMenuContent,
  RetroDropdownMenuItem,
  RetroDropdownMenuSeparator,
  RetroDropdownMenuSub,
  RetroDropdownMenuSubTrigger,
  RetroDropdownMenuSubContent,
  RetroDropdownMenuCheckboxItem,
  RetroDropdownMenuGroup,
  RetroDropdownMenuRadioGroup,
  RetroDropdownMenuRadioItem,
  RetroDropdownMenuLabel,
  RetroDropdownMenuShortcut,
  RetroMenuPopup,
  RetroMenuStyles,
  retroMenuPopupClass,
  retroMenuRowClass,
}
export type { RetroDropdownMenuContentProps, RetroDropdownMenuItemProps }
