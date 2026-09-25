"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroMenuBar (root)                                                */
/* ------------------------------------------------------------------ */

function RetroMenuBar(
  {
    className,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Root>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        "flex h-[20px] items-center gap-[6px] px-[8px]",
        "bg-os9-gray-300",
        "border-b border-os9-black",
        /* Inner bevel: white highlight top, dark shadow bottom */
        "shadow-[inset_0_1px_0_var(--os9-white),inset_0_-1px_0_var(--os9-gray-700)]",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroMenuBar = React.forwardRef(RetroMenuBar)
ForwardedRetroMenuBar.displayName = "RetroMenuBar"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarMenu                                                   */
/* ------------------------------------------------------------------ */

function RetroMenuBarMenu(
  props: React.ComponentProps<typeof MenubarPrimitive.Menu>
) {
  return <MenubarPrimitive.Menu {...props} />
}

RetroMenuBarMenu.displayName = "RetroMenuBarMenu"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarTrigger                                                */
/* ------------------------------------------------------------------ */

function RetroMenuBarTrigger(
  {
    className,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Trigger>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex items-center cursor-pointer select-none whitespace-nowrap",
        "h-[20px] px-[8px] pt-[2px]",
        "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "outline-none",
        /* Active / open state */
        "data-[state=open]:bg-os9-azul data-[state=open]:text-os9-white",
        /* Keyboard navigation highlight */
        "data-[highlighted]:bg-os9-azul data-[highlighted]:text-os9-white",
        "focus-visible:bg-os9-azul focus-visible:text-os9-white",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroMenuBarTrigger = React.forwardRef(RetroMenuBarTrigger)
ForwardedRetroMenuBarTrigger.displayName = "RetroMenuBarTrigger"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarContent                                                */
/* ------------------------------------------------------------------ */

function RetroMenuBarContent(
  {
    className,
    align = "start",
    alignOffset = -4,
    sideOffset = 0,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Content>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[160px] py-[2px]",
          "bg-os9-white",
          "border border-os9-black",
          /* Classic OS 9 drop shadow: 2px offset, no blur */
          "shadow-[2px_2px_0_var(--os9-black)]",
          /* Animate in */
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

const ForwardedRetroMenuBarContent = React.forwardRef(RetroMenuBarContent)
ForwardedRetroMenuBarContent.displayName = "RetroMenuBarContent"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarItem                                                   */
/* ------------------------------------------------------------------ */

function RetroMenuBarItem(
  {
    className,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Item>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "group flex items-center cursor-default select-none",
        "h-[18px] px-[16px]",
        "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "outline-none",
        /* Hover / focus highlight */
        "data-[highlighted]:bg-os9-azul data-[highlighted]:text-os9-white",
        /* Disabled */
        "data-[disabled]:text-os9-gray-600 data-[disabled]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroMenuBarItem = React.forwardRef(RetroMenuBarItem)
ForwardedRetroMenuBarItem.displayName = "RetroMenuBarItem"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarSeparator                                              */
/* ------------------------------------------------------------------ */

function RetroMenuBarSeparator(
  {
    className,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Separator>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn(
        "h-[2px] mx-[4px] my-[2px]",
        /* Two-tone bevel line: dark top, white bottom */
        "border-t border-os9-gray-700",
        "border-b border-b-os9-white",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroMenuBarSeparator = React.forwardRef(RetroMenuBarSeparator)
ForwardedRetroMenuBarSeparator.displayName = "RetroMenuBarSeparator"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarGroup                                                  */
/* ------------------------------------------------------------------ */

const RetroMenuBarGroup = MenubarPrimitive.Group

/* ------------------------------------------------------------------ */
/*  RetroMenuBarLabel                                                  */
/* ------------------------------------------------------------------ */

const RetroMenuBarLabel = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>
>(function RetroMenuBarLabel({ className, ...props }, ref) {
  return (
    <MenubarPrimitive.Label
      ref={ref}
      className={cn(
        "px-[16px] py-[2px]",
        "font-[family-name:var(--font-heading)] text-[10px] tracking-[0.42px] leading-[0.98]",
        "text-os9-gray-700",
        className
      )}
      {...props}
    />
  )
})
RetroMenuBarLabel.displayName = "RetroMenuBarLabel"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarSub                                                    */
/* ------------------------------------------------------------------ */

const RetroMenuBarSub = MenubarPrimitive.Sub

/* ------------------------------------------------------------------ */
/*  RetroMenuBarSubTrigger                                             */
/* ------------------------------------------------------------------ */

const RetroMenuBarSubTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger>
>(function RetroMenuBarSubTrigger({ className, children, ...props }, ref) {
  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex items-center cursor-default select-none",
        "h-[18px] px-[16px]",
        "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "outline-none",
        /* Hover / focus highlight */
        "data-[highlighted]:bg-os9-azul data-[highlighted]:text-os9-white",
        /* Keep parent highlighted while its submenu is open */
        "data-[state=open]:bg-os9-azul data-[state=open]:text-os9-white",
        /* Disabled */
        "data-[disabled]:text-os9-gray-600 data-[disabled]:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
      {/* Right chevron indicator */}
      <svg
        width="6"
        height="8"
        viewBox="0 0 6 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-auto"
        aria-hidden="true"
      >
        <path d="M0 0L6 4L0 8V0Z" fill="currentColor" />
      </svg>
    </MenubarPrimitive.SubTrigger>
  )
})
RetroMenuBarSubTrigger.displayName = "RetroMenuBarSubTrigger"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarSubContent                                             */
/* ------------------------------------------------------------------ */

const RetroMenuBarSubContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(function RetroMenuBarSubContent({ className, ...props }, ref) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent
        ref={ref}
        className={cn(
          "z-50 min-w-[160px] p-[2px]",
          "bg-os9-white",
          "border border-os9-black",
          "shadow-[2px_2px_0_var(--os9-black)]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
})
RetroMenuBarSubContent.displayName = "RetroMenuBarSubContent"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarCheckboxItem                                           */
/* ------------------------------------------------------------------ */

const RetroMenuBarCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(function RetroMenuBarCheckboxItem(
  { className, children, checked, ...props },
  ref
) {
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        "group relative flex items-center cursor-default select-none",
        "h-[18px] pl-[24px] pr-[16px]",
        "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "outline-none",
        "data-[highlighted]:bg-os9-azul data-[highlighted]:text-os9-white",
        "data-[disabled]:text-os9-gray-600 data-[disabled]:pointer-events-none",
        className
      )}
      {...props}
    >
      <span className="absolute left-[6px] flex h-[10px] w-[10px] items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          {/* Checkmark SVG */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 8.5L6.5 12L13 4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
})
RetroMenuBarCheckboxItem.displayName = "RetroMenuBarCheckboxItem"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarRadioGroup                                             */
/* ------------------------------------------------------------------ */

const RetroMenuBarRadioGroup = MenubarPrimitive.RadioGroup

/* ------------------------------------------------------------------ */
/*  RetroMenuBarRadioItem                                              */
/* ------------------------------------------------------------------ */

const RetroMenuBarRadioItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(function RetroMenuBarRadioItem({ className, children, ...props }, ref) {
  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn(
        "group relative flex items-center cursor-default select-none",
        "h-[18px] pl-[24px] pr-[16px]",
        "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "outline-none",
        "data-[highlighted]:bg-os9-azul data-[highlighted]:text-os9-white",
        "data-[disabled]:text-os9-gray-600 data-[disabled]:pointer-events-none",
        className
      )}
      {...props}
    >
      <span className="absolute left-[6px] flex h-[10px] w-[10px] items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          {/* Dot indicator */}
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="4" cy="4" r="3" fill="currentColor" />
          </svg>
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
})
RetroMenuBarRadioItem.displayName = "RetroMenuBarRadioItem"

/* ------------------------------------------------------------------ */
/*  RetroMenuBarShortcut                                               */
/* ------------------------------------------------------------------ */

function RetroMenuBarShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto pl-[16px]",
        "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]",
        "text-os9-gray-700",
        /* Inherit parent highlight color */
        "group-data-[highlighted]:text-os9-white",
        className
      )}
      {...props}
    />
  )
}
RetroMenuBarShortcut.displayName = "RetroMenuBarShortcut"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  ForwardedRetroMenuBar as RetroMenuBar,
  RetroMenuBarMenu,
  ForwardedRetroMenuBarTrigger as RetroMenuBarTrigger,
  ForwardedRetroMenuBarContent as RetroMenuBarContent,
  ForwardedRetroMenuBarItem as RetroMenuBarItem,
  ForwardedRetroMenuBarSeparator as RetroMenuBarSeparator,
  RetroMenuBarGroup,
  RetroMenuBarLabel,
  RetroMenuBarSub,
  RetroMenuBarSubTrigger,
  RetroMenuBarSubContent,
  RetroMenuBarCheckboxItem,
  RetroMenuBarRadioGroup,
  RetroMenuBarRadioItem,
  RetroMenuBarShortcut,
}
