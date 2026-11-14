"use client"

/*
 * RetroToggleGroup: a row of joined OS 9 bevel buttons.
 *
 * Crafted moment: the sliding pressed slab. With type="single" one
 * pushed-in slab slides to the button you chose (180ms, strong ease-out),
 * so the row reads as one control with one state, not separate buttons.
 * The label ink flips in one step as the slab arrives. Classic flair and
 * reduced motion: the slab snaps. With type="multiple" each button pushes
 * in on its own, instantly.
 *
 * Layering: each button paints its raised face on a ::before (z-0), the
 * slab sits above those faces (z-1), labels sit above it (z-2) and the
 * focus ring above everything (z-3), so the slab never hides behind a
 * neighbour while it travels. Until the slab has measured (and on the
 * server) the pressed button paints its own pushed-in face.
 *
 * Built on UI SDK's ToggleGroup: one tab stop, arrow keys between buttons.
 * The Radix-shaped API stays: type="single" takes a string value,
 * type="multiple" a string[].
 */

import * as React from "react"
import { Toggle as TogglePrimitive, ToggleGroup as ToggleGroupPrimitive } from "@ui-sdk/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const retroToggleGroupVariants = cva(
  [
    "group/tgi relative -ml-px first:ml-0 inline-flex items-center justify-center whitespace-nowrap",
    "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
    "cursor-pointer select-none outline-none text-os9-black",
    /* the raised face */
    "before:absolute before:inset-0 before:z-0 before:border before:border-os9-black before:bg-os9-gray-300",
    "before:shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_#808080]",
    /* the pushed-in face, painted by the button itself unless the slab is on */
    "data-pressed:before:bg-os9-gray-700",
    "data-pressed:before:shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_var(--os9-white)]",
    "group-data-[slab=on]/tg:data-pressed:before:bg-os9-gray-300",
    "group-data-[slab=on]/tg:data-pressed:before:shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_#808080]",
    /* focus ring above everything */
    "after:pointer-events-none after:absolute after:inset-0 after:z-[3] focus-visible:after:shadow-[0_0_0_2px_var(--os9-focus)]",
    "data-disabled:opacity-50 data-disabled:pointer-events-none",
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

const SLAB_TRANSITION = "transform 180ms cubic-bezier(0.23, 1, 0.32, 1), width 180ms cubic-bezier(0.23, 1, 0.32, 1)"

/** Keeps the slab under the pressed button; marks the group data-slab="on" once placed. */
function useSlab(enabled: boolean) {
  return React.useCallback(
    (root: HTMLDivElement | null) => {
      if (!root || !enabled) return
      const slab = root.querySelector<HTMLElement>(":scope > [data-tg-slab]")
      if (!slab) return
      let shown = false

      const place = () => {
        const item = Array.from(
          root.querySelectorAll<HTMLElement>('[data-slot="toggle"][data-pressed]')
        ).find((el) => el.closest('[data-slot="toggle-group"]') === root)
        if (!item) {
          shown = false
          slab.style.opacity = "0"
          root.setAttribute("data-slab", "on")
          return
        }
        /* rects, not offsets: buttons have fractional widths */
        const box = root.getBoundingClientRect()
        const r = item.getBoundingClientRect()
        const left = r.left - box.left - root.clientLeft
        const top = r.top - box.top - root.clientTop
        const style = slab.style
        if (!shown) style.transition = "none"
        style.transform = `translate(${left}px, ${top}px)`
        style.width = `${r.width}px`
        style.height = `${r.height}px`
        style.opacity = "1"
        if (!shown) {
          void slab.offsetWidth // commit the snap before re-enabling the slide
          style.transition = SLAB_TRANSITION
        }
        shown = true
        root.setAttribute("data-slab", "on")
      }

      place()
      const mutations = new MutationObserver(place)
      mutations.observe(root, { subtree: true, attributes: true, attributeFilter: ["data-pressed"] })
      const resize = new ResizeObserver(place)
      resize.observe(root)
      return () => {
        mutations.disconnect()
        resize.disconnect()
        root.removeAttribute("data-slab")
      }
    },
    [enabled]
  )
}

type ToggleGroupPrimitiveProps = React.ComponentProps<typeof ToggleGroupPrimitive<string>>

type RetroToggleGroupBaseProps = Omit<
  ToggleGroupPrimitiveProps,
  "className" | "children" | "value" | "defaultValue" | "onValueChange" | "multiple"
> &
  VariantProps<typeof retroToggleGroupVariants> & {
    className?: string
    children?: React.ReactNode
  }

type RetroToggleGroupProps = RetroToggleGroupBaseProps &
  (
    | {
        type?: "single"
        value?: string
        defaultValue?: string
        /** "" when the pressed button is released */
        onValueChange?: (value: string) => void
      }
    | {
        type: "multiple"
        value?: string[]
        defaultValue?: string[]
        onValueChange?: (value: string[]) => void
      }
  )

const toList = (v: string | string[] | undefined) =>
  v === undefined ? undefined : Array.isArray(v) ? v : v ? [v] : []

function RetroToggleGroup({
  className,
  size,
  children,
  type = "single",
  value,
  defaultValue,
  onValueChange,
  ref,
  ...props
}: RetroToggleGroupProps) {
  const single = type !== "multiple"
  const slabRef = useSlab(single)
  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node
      return slabRef(node)
    },
    [ref, slabRef]
  )

  return (
    <ToggleGroupPrimitive
      ref={mergedRef}
      multiple={!single}
      value={toList(value)}
      defaultValue={toList(defaultValue)}
      onValueChange={(next) => {
        if (!onValueChange) return
        if (single) (onValueChange as (v: string) => void)(next[0] ?? "")
        else (onValueChange as (v: string[]) => void)(next)
      }}
      className={cn("group/tg relative isolate inline-flex flex-row items-center", className)}
      {...props}
    >
      {single && (
        <span
          aria-hidden
          data-tg-slab=""
          className={cn(
            "pointer-events-none absolute left-0 top-0 z-[1] opacity-0",
            "border border-os9-black bg-os9-gray-700",
            "shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_var(--os9-white)]",
            "in-data-[flair=classic]:transition-none! motion-reduce:transition-none!",
            "group-data-disabled/tg:opacity-50!"
          )}
        />
      )}
      <ToggleGroupContext.Provider value={{ size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

type RetroToggleGroupItemProps = Omit<
  React.ComponentProps<typeof TogglePrimitive>,
  "className" | "children"
> &
  VariantProps<typeof retroToggleGroupVariants> & {
    className?: string
    children?: React.ReactNode
  }

function RetroToggleGroupItem({ className, size, children, ...props }: RetroToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext)
  const resolvedSize = size ?? context.size

  return (
    <TogglePrimitive
      className={cn(retroToggleGroupVariants({ size: resolvedSize }), className)}
      {...props}
    >
      <span
        className={cn(
          "relative z-[2] flex h-full items-center gap-[6px]",
          "group-data-pressed/tgi:text-os9-white",
          /* with the slab, the ink flips as it arrives */
          "transition-[color] duration-0 group-data-[slab=on]/tg:delay-90",
          "in-data-[flair=classic]:delay-0! motion-reduce:delay-0!"
        )}
      >
        {children}
      </span>
    </TogglePrimitive>
  )
}

export { RetroToggleGroup, RetroToggleGroupItem, retroToggleGroupVariants }
