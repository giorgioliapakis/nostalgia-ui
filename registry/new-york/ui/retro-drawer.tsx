"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

function RetroDrawer({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  )
}
RetroDrawer.displayName = "RetroDrawer"

/* ------------------------------------------------------------------ */
/*  Pass-through primitives                                            */
/* ------------------------------------------------------------------ */

const RetroDrawerTrigger = DrawerPrimitive.Trigger

const RetroDrawerPortal = DrawerPrimitive.Portal

const RetroDrawerClose = DrawerPrimitive.Close

/* ------------------------------------------------------------------ */
/*  Overlay                                                            */
/* ------------------------------------------------------------------ */

const RetroDrawerOverlay = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(function RetroDrawerOverlay({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black/40", className)}
      {...props}
    />
  )
})
RetroDrawerOverlay.displayName = "RetroDrawerOverlay"

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const RetroDrawerContent = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(function RetroDrawerContent({ className, children, ...props }, ref) {
  return (
    <RetroDrawerPortal>
      <RetroDrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col",
          "outline-none",
          className
        )}
        style={{
          border: "1px solid var(--os9-black)",
          backgroundColor: "var(--os9-gray-200)",
          boxShadow:
            "inset 2px 2px 0 rgba(255,255,255,0.6), inset -2px -2px 0 rgba(38,38,38,0.4)",
        }}
        {...props}
      >
        {/* Pull handle */}
        <div className="mx-auto mt-2 mb-1 flex justify-center">
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
      </DrawerPrimitive.Content>
    </RetroDrawerPortal>
  )
})
RetroDrawerContent.displayName = "RetroDrawerContent"

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
RetroDrawerHeader.displayName = "RetroDrawerHeader"

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
RetroDrawerFooter.displayName = "RetroDrawerFooter"

/* ------------------------------------------------------------------ */
/*  Title                                                              */
/* ------------------------------------------------------------------ */

const RetroDrawerTitle = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(function RetroDrawerTitle({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn(
        "text-[12px] tracking-[0.42px] leading-[0.98]",
        "font-[family-name:var(--font-heading)] text-os9-black",
        className
      )}
      {...props}
    />
  )
})
RetroDrawerTitle.displayName = "RetroDrawerTitle"

/* ------------------------------------------------------------------ */
/*  Description                                                        */
/* ------------------------------------------------------------------ */

const RetroDrawerDescription = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(function RetroDrawerDescription({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn(
        "font-[family-name:var(--font-sans)] text-[10px] leading-[1.3] text-os9-gray-700",
        className
      )}
      {...props}
    />
  )
})
RetroDrawerDescription.displayName = "RetroDrawerDescription"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroDrawer,
  RetroDrawerTrigger,
  RetroDrawerPortal,
  RetroDrawerClose,
  RetroDrawerOverlay,
  RetroDrawerContent,
  RetroDrawerHeader,
  RetroDrawerFooter,
  RetroDrawerTitle,
  RetroDrawerDescription,
}
