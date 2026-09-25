"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  RetroDropdownMenu,
  RetroDropdownMenuContent,
  RetroDropdownMenuTrigger,
} from "@/registry/new-york/ui/retro-dropdown-menu"

// Spread rather than a literal `asChild` attribute: the shadcn CLI rewrites
// literal `asChild` to Base UI's `render` prop in base-* projects, which
// breaks these Radix-based components.
const AS_CHILD = { asChild: true } as const

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface ControlStripContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  side: "left" | "right"
  contentId: string
}

const ControlStripContext =
  React.createContext<ControlStripContextValue | null>(null)

function useControlStrip(component: string) {
  const ctx = React.useContext(ControlStripContext)
  if (!ctx) throw new Error(`${component} must be used inside <RetroControlStrip>`)
  return ctx
}

/* ------------------------------------------------------------------ */
/*  RetroControlStripTab                                               */
/* ------------------------------------------------------------------ */

export type RetroControlStripTabProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * The ridged tab at the free end of the strip. Clicking it collapses or
 * expands the strip. Rendered automatically by RetroControlStrip unless you
 * place one yourself (or pass `tab={false}`).
 */
const RetroControlStripTab = React.forwardRef<
  HTMLButtonElement,
  RetroControlStripTabProps
>(function RetroControlStripTab({ className, onClick, ...props }, ref) {
  const { open, setOpen, side, contentId } = useControlStrip("RetroControlStripTab")
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      aria-label={open ? "Collapse Control Strip" : "Expand Control Strip"}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(!open)
      }}
      className={cn(
        "relative flex h-full w-[12px] shrink-0 cursor-default items-center justify-center gap-[1px]",
        "border-os9-black bg-os9-gray-400",
        side === "left" ? "border-l" : "border-r",
        "shadow-[var(--os9-shadow-raised)]",
        "active:bg-os9-gray-600 active:shadow-[var(--os9-shadow-pressed)]",
        "focus-visible:os9-focus-ring focus-visible:z-10",
        className
      )}
      {...props}
    >
      {/* Vertical grip ridges */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="h-[12px] w-[1px] bg-os9-gray-700 shadow-[1px_0_0_var(--os9-white)] mr-[1px]"
        />
      ))}
    </button>
  )
})
RetroControlStripTab.displayName = "RetroControlStripTab"

/* ------------------------------------------------------------------ */
/*  RetroControlStrip                                                  */
/* ------------------------------------------------------------------ */

export interface RetroControlStripProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled expanded state. */
  open?: boolean
  /** Uncontrolled initial state. Defaults to true. */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * Screen edge the strip is anchored to. The tab sits on the opposite end.
   * Defaults to "left" (the classic bottom-left placement).
   */
  side?: "left" | "right"
  /** Render the built-in tab. Defaults to true. */
  tab?: boolean
}

/**
 * Mac OS 9 Control Strip. Position it yourself, e.g.
 * `className="absolute bottom-4 left-0"` or `"fixed bottom-4 left-0"`.
 */
const RetroControlStrip = React.forwardRef<HTMLDivElement, RetroControlStripProps>(
  function RetroControlStrip(
    {
      open: openProp,
      defaultOpen = true,
      onOpenChange,
      side = "left",
      tab = true,
      className,
      children,
      ...props
    },
    ref
  ) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    const open = openProp ?? internalOpen
    const setOpen = React.useCallback(
      (next: boolean) => {
        if (openProp === undefined) setInternalOpen(next)
        onOpenChange?.(next)
      },
      [openProp, onOpenChange]
    )
    const contentId = React.useId()

    const ctx = React.useMemo(
      () => ({ open, setOpen, side, contentId }),
      [open, setOpen, side, contentId]
    )

    // Separate a user-provided tab from modules.
    const childArray = React.Children.toArray(children)
    const userTab = childArray.find(
      (c) => React.isValidElement(c) && c.type === RetroControlStripTab
    )
    const modules = childArray.filter((c) => c !== userTab)
    const tabEl = userTab ?? (tab ? <RetroControlStripTab /> : null)

    return (
      <ControlStripContext.Provider value={ctx}>
        <div
          ref={ref}
          role="group"
          aria-label="Control Strip"
          data-state={open ? "open" : "closed"}
          className={cn(
            "inline-flex h-[24px] items-stretch",
            "border border-os9-black bg-os9-gray-300",
            "shadow-[1px_1px_0_var(--os9-black)]",
            side === "right" && "flex-row-reverse",
            className
          )}
          {...props}
        >
          {/* Collapsible module well: animates grid track 0fr ↔ 1fr */}
          <div
            className={cn(
              "grid transition-[grid-template-columns] duration-200 ease-out motion-reduce:transition-none",
              open ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
            )}
          >
            <div
              id={contentId}
              inert={!open}
              className="flex min-w-0 items-stretch overflow-hidden"
            >
              <div
                className={cn(
                  "flex items-stretch",
                  side === "right" && "flex-row-reverse"
                )}
              >
                {modules}
              </div>
            </div>
          </div>
          {tabEl}
        </div>
      </ControlStripContext.Provider>
    )
  }
)
RetroControlStrip.displayName = "RetroControlStrip"

/* ------------------------------------------------------------------ */
/*  RetroControlStripModule                                            */
/* ------------------------------------------------------------------ */

export interface RetroControlStripModuleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 16x16 icon artwork. */
  icon: React.ReactNode
  /** Accessible name and tooltip. */
  label: string
  /**
   * Pop-up menu contents (RetroDropdownMenuItem, RetroDropdownMenuCheckboxItem,
   * RetroDropdownMenuSeparator, …). When set, the module opens a menu above
   * the strip and shows a small pop-up indicator.
   */
  menu?: React.ReactNode
  /** Props forwarded to the menu content (e.g. `className`, `align`). */
  menuContentProps?: React.ComponentPropsWithoutRef<typeof RetroDropdownMenuContent>
  /** Optional short text shown next to the icon (e.g. a clock readout). */
  text?: React.ReactNode
}

const moduleClasses = cn(
  "group/module relative flex h-full shrink-0 cursor-default items-center gap-[3px] px-[4px]",
  "border-r border-os9-gray-700 shadow-[inset_1px_0_0_var(--os9-white),1px_0_0_var(--os9-white)]",
  "text-os9-black outline-none",
  "active:bg-os9-gray-600 data-[state=open]:bg-os9-gray-600",
  "active:shadow-[var(--os9-shadow-pressed)] data-[state=open]:shadow-[var(--os9-shadow-pressed)]",
  "focus-visible:os9-focus-ring focus-visible:z-10",
  "disabled:opacity-50 disabled:pointer-events-none"
)

const RetroControlStripModule = React.forwardRef<
  HTMLButtonElement,
  RetroControlStripModuleProps
>(function RetroControlStripModule(
  { icon, label, menu, menuContentProps, text, className, ...props },
  ref
) {
  const content = (
    <>
      <span className="flex size-[16px] items-center justify-center" aria-hidden="true">
        {icon}
      </span>
      {text != null && (
        <span className="font-[family-name:var(--os9-font-sans)] text-[10px] whitespace-nowrap">
          {text}
        </span>
      )}
      {menu && (
        /* Pop-up indicator */
        <svg width="5" height="3" viewBox="0 0 5 3" aria-hidden="true" className="self-end mb-[4px]">
          <path d="M0 3L2.5 0L5 3Z" fill="currentColor" />
        </svg>
      )}
    </>
  )

  if (!menu) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        className={cn(moduleClasses, className)}
        {...props}
      >
        {content}
      </button>
    )
  }

  return (
    <RetroDropdownMenu modal={false}>
      <RetroDropdownMenuTrigger {...AS_CHILD}>
        <button
          ref={ref}
          type="button"
          aria-label={label}
          title={label}
          className={cn(moduleClasses, className)}
          {...props}
        >
          {content}
        </button>
      </RetroDropdownMenuTrigger>
      <RetroDropdownMenuContent
        side="top"
        align="start"
        sideOffset={2}
        {...menuContentProps}
      >
        {menu}
      </RetroDropdownMenuContent>
    </RetroDropdownMenu>
  )
})
RetroControlStripModule.displayName = "RetroControlStripModule"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroControlStrip,
  RetroControlStripModule,
  RetroControlStripTab,
  // Short aliases
  RetroControlStrip as ControlStrip,
  RetroControlStripModule as ControlStripModule,
  RetroControlStripTab as ControlStripTab,
}
