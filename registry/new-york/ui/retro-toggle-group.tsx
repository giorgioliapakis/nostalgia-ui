"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroToggleGroupVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
    "cursor-pointer select-none",
    "transition-none",
    "border border-os9-black bg-os9-gray-300 text-os9-black",
    "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_#808080]",
    "data-[state=on]:bg-os9-gray-700 data-[state=on]:text-os9-white",
    "data-[state=on]:shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_var(--os9-white)]",
    "focus-visible:os9-focus-ring",
  ],
  {
    variants: {
      size: {
        default: "h-[24px] px-[8px] py-[4px]",
        sm: "h-[20px] px-[6px] py-[2px] text-[10px]",
        lg: "h-[30px] px-[12px] py-[4px] text-[12px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type ToggleGroupContextValue = VariantProps<typeof retroToggleGroupVariants>

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "default",
})

function RetroToggleGroup(
  {
    className,
    size,
    children,
    ...props
  }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof retroToggleGroupVariants>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn("inline-flex flex-row items-center", className)}
      ref={ref}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

const ForwardedRetroToggleGroup = React.forwardRef(RetroToggleGroup)
ForwardedRetroToggleGroup.displayName = "RetroToggleGroup"

function RetroToggleGroupItem(
  {
    className,
    size,
    disabled,
    children,
    ...props
  }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof retroToggleGroupVariants>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const context = React.useContext(ToggleGroupContext)
  const resolvedSize = size ?? context.size

  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        retroToggleGroupVariants({ size: resolvedSize }),
        "-ml-px first:ml-0",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

const ForwardedRetroToggleGroupItem = React.forwardRef(RetroToggleGroupItem)
ForwardedRetroToggleGroupItem.displayName = "RetroToggleGroupItem"

export {
  ForwardedRetroToggleGroup as RetroToggleGroup,
  ForwardedRetroToggleGroupItem as RetroToggleGroupItem,
  retroToggleGroupVariants,
}
