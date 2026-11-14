"use client"

/*
 * RetroDrawer: a Mac OS 9 panel that rises from the bottom edge, on UI SDK's
 * drawer.
 *
 * Crafted moment: it follows the hand. Grab the sheet (or its grip) and it
 * tracks the pointer; let go and it springs home or, flung far enough, away.
 * UI SDK drives the motion; with reduced motion it fades instead of sliding.
 */

import * as React from "react"
import {
  Drawer as DrawerPrimitive,
  DrawerBackdrop as DrawerBackdropPrimitive,
  DrawerClose as DrawerClosePrimitive,
  DrawerContent as DrawerContentPrimitive,
  DrawerDescription as DrawerDescriptionPrimitive,
  DrawerTitle as DrawerTitlePrimitive,
  DrawerTrigger as DrawerTriggerPrimitive,
} from "@ui-sdk/react/drawer"

import { cn } from "@/lib/utils"
import { popupClass } from "@/registry/new-york/lib/retro-motion"

type WithClassName<P> = Omit<P, "className"> & { className?: string }

/* ------------------------------------------------------------------ */
/*  Root, Trigger & Close                                              */
/* ------------------------------------------------------------------ */

function RetroDrawer(props: React.ComponentProps<typeof DrawerPrimitive>) {
  return <DrawerPrimitive {...props} />
}

function RetroDrawerTrigger(props: React.ComponentProps<typeof DrawerTriggerPrimitive>) {
  return <DrawerTriggerPrimitive {...props} />
}

function RetroDrawerClose(props: React.ComponentProps<typeof DrawerClosePrimitive>) {
  return <DrawerClosePrimitive {...props} />
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

function RetroDrawerContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DrawerContentPrimitive>, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <>
      {/* the drawer drives the backdrop's opacity as it moves */}
      <DrawerBackdropPrimitive className="fixed! inset-0! z-50 bg-black/40!" />
      <DrawerContentPrimitive
        className={popupClass(
          cn(
            /* Box properties carry `!` so UI SDK's popup reset can't strip them
             * in apps that haven't declared `@layer ui-sdk;` first. The drawer
             * positions and translates the sheet itself. */
            "z-50 m-0! p-0! w-full! h-auto! max-h-[calc(100dvh-6rem)]! flex flex-col outline-none",
            /* OS9 panel bevel */
            "border! border-os9-black! bg-os9-gray-200! text-os9-black!",
            "shadow-[inset_2px_2px_0_rgba(255,255,255,0.6),inset_-2px_-2px_0_rgba(38,38,38,0.4)]"
          ),
          className
        )}
        {...props}
      >
        {/* Pull grip: the whole sheet drags, this shows where to grab */}
        <div className="mx-auto mt-2 mb-1 flex justify-center" aria-hidden>
          <span
            className="block h-[4px] w-[40px]"
            style={{
              backgroundColor: "var(--os9-gray-400)",
              border: "1px solid var(--os9-black)",
              boxShadow:
                "inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(38,38,38,0.4)",
            }}
          />
        </div>
        {children}
      </DrawerContentPrimitive>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

function RetroDrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-4 text-center", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function RetroDrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Title                                                              */
/* ------------------------------------------------------------------ */

function RetroDrawerTitle({ className, ...props }: WithClassName<React.ComponentProps<typeof DrawerTitlePrimitive>>) {
  return (
    <DrawerTitlePrimitive
      className={cn(
        "text-[12px] tracking-[0.42px] leading-[0.98]",
        "font-[family-name:var(--os9-font-heading)] text-os9-black",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Description                                                        */
/* ------------------------------------------------------------------ */

function RetroDrawerDescription({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof DrawerDescriptionPrimitive>>) {
  return (
    <DrawerDescriptionPrimitive
      className={cn(
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.3] text-os9-gray-700",
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
  RetroDrawer,
  RetroDrawerTrigger,
  RetroDrawerClose,
  RetroDrawerContent,
  RetroDrawerHeader,
  RetroDrawerFooter,
  RetroDrawerTitle,
  RetroDrawerDescription,
}
