"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  RetroDropdownMenu,
  RetroDropdownMenuContent,
  RetroDropdownMenuItem,
  RetroDropdownMenuSeparator,
  RetroDropdownMenuTrigger,
} from "@/registry/new-york/ui/retro-dropdown-menu"

// Spread rather than a literal `asChild` attribute: the shadcn CLI rewrites
// literal `asChild` to Base UI's `render` prop in base-* projects, which
// breaks these Radix-based components.
const AS_CHILD = { asChild: true } as const

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface AppSwitcherApp {
  id: string
  name: string
  /** 16x16 icon. Defaults to a generic application icon. */
  icon?: React.ReactNode
  /** Hidden apps are listed with a dimmed icon. */
  hidden?: boolean
}

export interface RetroAppSwitcherProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "defaultValue" | "children"
  > {
  /** Running applications, in menu order. */
  apps: AppSwitcherApp[]
  /** Controlled frontmost app id. */
  activeApp?: string
  /** Uncontrolled initial frontmost app id. Defaults to the first app. */
  defaultActiveApp?: string
  /** Fired when the user picks an app from the list. */
  onActiveAppChange?: (id: string) => void
  /** "Hide <App>" — receives the frontmost app id. */
  onHide?: (id: string) => void
  /** "Hide Others" — receives the frontmost app id. */
  onHideOthers?: (id: string) => void
  /** "Show All". */
  onShowAll?: () => void
  /** Show the app name next to the icon in the trigger. Defaults to true. */
  showLabel?: boolean
  /** Controlled menu open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/* ------------------------------------------------------------------ */
/*  Default application icon (16x16)                                   */
/* ------------------------------------------------------------------ */

const RetroAppSwitcherDefaultIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(function RetroAppSwitcherDefaultIcon({ className, ...props }, ref) {
  return (
    <svg
      ref={ref}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {/* Classic "generic application" diamond with hand-and-pen feel */}
      <path d="M8 1.5L14.5 8L8 14.5L1.5 8Z" fill="#ccccff" stroke="#262626" />
      <path d="M8 3L13 8" stroke="#ffffff" />
      <path d="M8 13L13 8" stroke="#6666cc" />
      <path d="M6 9.5L9.5 6M7 10.5L10.5 7" stroke="#333399" />
    </svg>
  )
})
RetroAppSwitcherDefaultIcon.displayName = "RetroAppSwitcherDefaultIcon"

/* ------------------------------------------------------------------ */
/*  RetroAppSwitcher                                                   */
/* ------------------------------------------------------------------ */

/**
 * The Application menu at the right end of the Mac OS 9 menu bar.
 * Place it inside RetroDesktopMenuBar / RetroMenuBar with `className="ml-auto"`.
 */
const RetroAppSwitcher = React.forwardRef<HTMLButtonElement, RetroAppSwitcherProps>(
  function RetroAppSwitcher(
    {
      apps,
      activeApp: activeProp,
      defaultActiveApp,
      onActiveAppChange,
      onHide,
      onHideOthers,
      onShowAll,
      showLabel = true,
      open,
      onOpenChange,
      className,
      ...props
    },
    ref
  ) {
    const [internalActive, setInternalActive] = React.useState(
      defaultActiveApp ?? apps[0]?.id
    )
    const activeId = activeProp ?? internalActive
    const active = apps.find((a) => a.id === activeId) ?? apps[0]

    const setActive = (id: string) => {
      if (activeProp === undefined) setInternalActive(id)
      onActiveAppChange?.(id)
    }

    const othersVisible = apps.some((a) => a.id !== active?.id && !a.hidden)
    const anyHidden = apps.some((a) => a.hidden)

    const iconFor = (app: AppSwitcherApp) =>
      app.icon ?? <RetroAppSwitcherDefaultIcon />

    return (
      <RetroDropdownMenu open={open} onOpenChange={onOpenChange} modal={false}>
        <RetroDropdownMenuTrigger {...AS_CHILD}>
          <button
            ref={ref}
            type="button"
            aria-label={`Application menu: ${active?.name ?? "none"}`}
            className={cn(
              "relative flex h-[19px] shrink-0 cursor-default select-none items-center gap-[4px] px-[8px] pt-[1px]",
              /* Divider separating the app menu from the rest of the bar */
              "border-l border-os9-gray-700 shadow-[inset_1px_0_0_var(--os9-white)]",
              "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
              "text-os9-black outline-none whitespace-nowrap",
              "data-[state=open]:bg-os9-azul data-[state=open]:text-os9-white data-[state=open]:shadow-none",
              "focus-visible:bg-os9-azul focus-visible:text-os9-white",
              className
            )}
            {...props}
          >
            {active && (
              <span className="flex size-[16px] items-center justify-center" aria-hidden="true">
                {iconFor(active)}
              </span>
            )}
            {showLabel && active && <span>{active.name}</span>}
          </button>
        </RetroDropdownMenuTrigger>
        <RetroDropdownMenuContent align="end" sideOffset={0} className="min-w-[180px]">
          <RetroDropdownMenuItem
            disabled={!active}
            onSelect={() => active && onHide?.(active.id)}
          >
            Hide {active?.name}
          </RetroDropdownMenuItem>
          <RetroDropdownMenuItem
            disabled={!othersVisible}
            onSelect={() => active && onHideOthers?.(active.id)}
          >
            Hide Others
          </RetroDropdownMenuItem>
          <RetroDropdownMenuItem disabled={!anyHidden} onSelect={() => onShowAll?.()}>
            Show All
          </RetroDropdownMenuItem>
          <RetroDropdownMenuSeparator />
          {apps.map((app) => {
            const isActive = app.id === active?.id
            return (
              <RetroDropdownMenuItem
                key={app.id}
                role="menuitemradio"
                aria-checked={isActive}
                onSelect={() => setActive(app.id)}
                className="relative gap-[6px] pl-[18px]"
              >
                {isActive && (
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="absolute left-[5px]"
                  >
                    <path
                      d="M3 8.5L6.5 12L13 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="square"
                    />
                  </svg>
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-[16px] shrink-0 items-center justify-center",
                    app.hidden && "opacity-40"
                  )}
                >
                  {iconFor(app)}
                </span>
                <span>{app.name}</span>
              </RetroDropdownMenuItem>
            )
          })}
        </RetroDropdownMenuContent>
      </RetroDropdownMenu>
    )
  }
)
RetroAppSwitcher.displayName = "RetroAppSwitcher"

export { RetroAppSwitcher, RetroAppSwitcherDefaultIcon }
