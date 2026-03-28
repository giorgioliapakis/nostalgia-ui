"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuViewport                                        */
/* ------------------------------------------------------------------ */

const ForwardedRetroNavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>
>(function RetroNavigationMenuViewport({ className, ...props }, ref) {
  return (
    <div className="absolute left-0 top-full flex w-full justify-start">
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className={cn(
          "relative mt-0 w-full overflow-hidden",
          "h-[var(--radix-navigation-menu-viewport-height)]",
          "origin-top",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      />
    </div>
  )
})
ForwardedRetroNavigationMenuViewport.displayName = "RetroNavigationMenuViewport"

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenu (root)                                         */
/* ------------------------------------------------------------------ */

function RetroNavigationMenu(
  {
    className,
    children,
    ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Root>,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        "relative z-10",
        "flex items-center",
        "bg-os9-gray-300",
        "border-b border-os9-black",
        /* Inner bevel: white highlight top, dark shadow bottom */
        "shadow-[inset_0_1px_0_var(--os9-white),inset_0_-1px_0_#808080]",
        className
      )}
      {...props}
    >
      {children}
      <ForwardedRetroNavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
}

const ForwardedRetroNavigationMenu = React.forwardRef(RetroNavigationMenu)
ForwardedRetroNavigationMenu.displayName = "RetroNavigationMenu"

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuList                                            */
/* ------------------------------------------------------------------ */

function RetroNavigationMenuList(
  {
    className,
    ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.List>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(
        "flex items-center gap-[2px] list-none px-[8px]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroNavigationMenuList = React.forwardRef(RetroNavigationMenuList)
ForwardedRetroNavigationMenuList.displayName = "RetroNavigationMenuList"

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuItem                                            */
/* ------------------------------------------------------------------ */

function RetroNavigationMenuItem(
  props: React.ComponentProps<typeof NavigationMenuPrimitive.Item>
) {
  return <NavigationMenuPrimitive.Item {...props} />
}

RetroNavigationMenuItem.displayName = "RetroNavigationMenuItem"

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuTrigger                                         */
/* ------------------------------------------------------------------ */

function RetroNavigationMenuTrigger(
  {
    className,
    children,
    ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex items-center cursor-pointer select-none whitespace-nowrap",
        "px-[8px] py-[4px]",
        "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "outline-none",
        /* Active / open state */
        "data-[state=open]:bg-os9-azul data-[state=open]:text-os9-white",
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Trigger>
  )
}

const ForwardedRetroNavigationMenuTrigger = React.forwardRef(RetroNavigationMenuTrigger)
ForwardedRetroNavigationMenuTrigger.displayName = "RetroNavigationMenuTrigger"

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuContent                                         */
/* ------------------------------------------------------------------ */

function RetroNavigationMenuContent(
  {
    className,
    ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "absolute top-0 left-0 w-full",
        "p-[8px]",
        "bg-os9-white",
        "border border-os9-black",
        /* Classic OS 9 drop shadow: 2px offset, no blur */
        "shadow-[2px_2px_0_var(--os9-black)]",
        /* Animate in/out */
        "data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in-0",
        "data-[motion=from-end]:animate-in data-[motion=from-end]:fade-in-0",
        "data-[motion=to-start]:animate-out data-[motion=to-start]:fade-out-0",
        "data-[motion=to-end]:animate-out data-[motion=to-end]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroNavigationMenuContent = React.forwardRef(RetroNavigationMenuContent)
ForwardedRetroNavigationMenuContent.displayName = "RetroNavigationMenuContent"

/* ------------------------------------------------------------------ */
/*  RetroNavigationMenuLink                                            */
/* ------------------------------------------------------------------ */

function RetroNavigationMenuLink(
  {
    className,
    ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      className={cn(
        "block cursor-default select-none",
        "px-[8px] py-[2px]",
        "font-[family-name:var(--font-body)] text-[10px] tracking-[0.42px] leading-[1.4]",
        "text-os9-black",
        "outline-none",
        /* Hover highlight */
        "hover:bg-os9-lavender",
        "focus:bg-os9-lavender",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroNavigationMenuLink = React.forwardRef(RetroNavigationMenuLink)
ForwardedRetroNavigationMenuLink.displayName = "RetroNavigationMenuLink"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  ForwardedRetroNavigationMenu as RetroNavigationMenu,
  ForwardedRetroNavigationMenuList as RetroNavigationMenuList,
  RetroNavigationMenuItem,
  ForwardedRetroNavigationMenuTrigger as RetroNavigationMenuTrigger,
  ForwardedRetroNavigationMenuContent as RetroNavigationMenuContent,
  ForwardedRetroNavigationMenuLink as RetroNavigationMenuLink,
  ForwardedRetroNavigationMenuViewport as RetroNavigationMenuViewport,
}
