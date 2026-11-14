"use client"

/*
 * RetroNavigationMenu: a Mac OS 9 navigation bar with drop-down link panels,
 * on UI SDK's navigation menu (the disclosure navigation pattern: buttons
 * that show groups of ordinary links).
 *
 * Crafted moment: the panel morph. One white panel hangs under the open
 * title; moving to the next title keeps the panel and morphs its size and
 * position to the new links (220ms, house ease-out) while the links
 * cross-fade. Opening pops the panel down from the title (fade + 95% scale,
 * 120ms). Classic flair and reduced motion swap panels at once.
 */

import * as React from "react"
import {
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuContent as NavigationMenuContentPrimitive,
  NavigationMenuItem as NavigationMenuItemPrimitive,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList as NavigationMenuListPrimitive,
  NavigationMenuTrigger as NavigationMenuTriggerPrimitive,
  NavigationMenuViewport as NavigationMenuViewportPrimitive,
} from "@ui-sdk/react/navigation-menu"

import { cn } from "@/lib/utils"
import { popupClass } from "@/registry/new-york/lib/retro-motion"

type WithClassName<P> = Omit<P, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
}

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuViewport                                        */
/* ------------------------------------------------------------------ */

/* The panel chrome (border, white bg, 2px drop shadow) lives on the viewport:
 * it clips the contents as they cross-fade, which would cut off a shadow on
 * the content. It takes the open content's size from UI SDK's
 * --viewport-width / --viewport-height. Box properties carry `!` against
 * UI SDK's popup reset. */
function RetroNavigationMenuViewport({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 0,
  ...props
}: WithClassName<React.ComponentProps<typeof NavigationMenuViewportPrimitive>>) {
  return (
    <NavigationMenuViewportPrimitive
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={popupClass(
        cn(
          "relative z-50 m-0! p-0! overflow-hidden!",
          "w-(--viewport-width)! h-(--viewport-height)!",
          "bg-os9-white! border! border-os9-black! text-os9-black!",
          /* Classic OS 9 drop shadow: 2px offset, no blur */
          "shadow-[2px_2px_0_var(--os9-black)]",
          "origin-top",
          "[transition:opacity_120ms_ease-out,scale_120ms_ease-out,width_220ms_cubic-bezier(0.23,1,0.32,1),height_220ms_cubic-bezier(0.23,1,0.32,1),left_220ms_cubic-bezier(0.23,1,0.32,1),top_220ms_cubic-bezier(0.23,1,0.32,1)]",
          "data-starting-style:opacity-0 data-starting-style:scale-y-95",
          "data-ending-style:opacity-0 data-ending-style:scale-y-95 data-ending-style:[transition-duration:75ms]",
          "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
        ),
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenu (root)                                         */
/* ------------------------------------------------------------------ */

function RetroNavigationMenu({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof NavigationMenuPrimitive>>) {
  return (
    <NavigationMenuPrimitive
      className={cn(
        "relative z-10",
        "flex items-center",
        "bg-os9-gray-300",
        "border-b border-os9-black",
        /* Inner bevel: white highlight top, dark shadow bottom */
        "shadow-[inset_0_1px_0_var(--os9-white),inset_0_-1px_0_var(--os9-gray-700)]",
        className
      )}
      {...props}
    >
      {children}
      <RetroNavigationMenuViewport />
    </NavigationMenuPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuList                                            */
/* ------------------------------------------------------------------ */

function RetroNavigationMenuList({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof NavigationMenuListPrimitive>>) {
  return (
    <NavigationMenuListPrimitive
      className={cn("m-0 flex items-center gap-[2px] list-none px-[8px]", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuItem                                            */
/* ------------------------------------------------------------------ */

function RetroNavigationMenuItem(
  props: WithClassName<React.ComponentProps<typeof NavigationMenuItemPrimitive>>
) {
  return <NavigationMenuItemPrimitive {...props} />
}

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuTrigger                                         */
/* ------------------------------------------------------------------ */

function RetroNavigationMenuTrigger({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof NavigationMenuTriggerPrimitive>>) {
  return (
    <NavigationMenuTriggerPrimitive
      className={cn(
        "flex items-center cursor-pointer select-none whitespace-nowrap",
        "px-[8px] py-[4px]",
        "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "outline-none focus-visible:os9-focus-ring",
        /* Open: azul title with white ink, flipped in one step */
        "data-open:bg-os9-azul data-open:text-os9-white",
        "data-disabled:text-os9-gray-600 data-disabled:cursor-default",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuContent                                         */
/* ------------------------------------------------------------------ */

function RetroNavigationMenuContent({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof NavigationMenuContentPrimitive>>) {
  return (
    <NavigationMenuContentPrimitive
      className={popupClass(
        cn(
          /* pinned to the panel's corner, at its own width */
          "absolute! top-0! left-0! w-max p-[8px]! m-0!",
          /* links cross-fade as the panel switches */
          "transition-opacity duration-100 ease-linear",
          "data-starting-style:opacity-0 data-ending-style:opacity-0",
          "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
        ),
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuLink                                            */
/* ------------------------------------------------------------------ */

function RetroNavigationMenuLink({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof NavigationMenuLinkPrimitive>>) {
  return (
    <NavigationMenuLinkPrimitive
      className={cn(
        "block cursor-default select-none",
        "px-[8px] py-[2px]",
        "font-[family-name:var(--os9-font-sans)] text-[10px] tracking-[0.42px] leading-[1.4]",
        "text-os9-black no-underline",
        "outline-none",
        /* Hover / keyboard highlight */
        "hover:bg-os9-lavender focus-visible:bg-os9-lavender",
        "data-current:font-bold",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroNavigationMenu,
  RetroNavigationMenuList,
  RetroNavigationMenuItem,
  RetroNavigationMenuTrigger,
  RetroNavigationMenuContent,
  RetroNavigationMenuLink,
  RetroNavigationMenuViewport,
}
