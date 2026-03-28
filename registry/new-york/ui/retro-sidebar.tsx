"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import {
  RetroSheet,
  RetroSheetContent,
  RetroSheetTitle,
} from "@/registry/new-york/ui/retro-sheet"
import { RetroScrollArea } from "@/registry/new-york/ui/retro-scrollbar"

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SIDEBAR_WIDTH = "240px"
const SIDEBAR_WIDTH_ICON = "48px"
const MOBILE_BREAKPOINT = 768

/* ------------------------------------------------------------------ */
/*  useIsMobile                                                        */
/* ------------------------------------------------------------------ */

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  )

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener("change", onChange)
    setIsMobile(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile ?? false
}

/* ------------------------------------------------------------------ */
/*  Sidebar Context                                                    */
/* ------------------------------------------------------------------ */

interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useRetroSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) {
    throw new Error(
      "useRetroSidebar must be used within a RetroSidebarProvider"
    )
  }
  return ctx
}

/* ------------------------------------------------------------------ */
/*  RetroSidebarProvider                                                */
/* ------------------------------------------------------------------ */

interface RetroSidebarProviderProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function RetroSidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  children,
}: RetroSidebarProviderProps) {
  const isMobile = useIsMobile()
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)

  const open = openProp ?? internalOpen
  const setOpen = React.useCallback(
    (value: boolean) => {
      onOpenChange?.(value)
      setInternalOpen(value)
    },
    [onOpenChange]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev)
    } else {
      setOpen(!open)
    }
  }, [isMobile, open, setOpen])

  // Cmd+B / Ctrl+B keyboard shortcut to toggle
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const value = React.useMemo(
    () => ({ open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar }),
    [open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div
        className="group/sidebar-wrapper flex min-h-svh w-full"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}
RetroSidebarProvider.displayName = "RetroSidebarProvider"

/* ------------------------------------------------------------------ */
/*  RetroSidebar                                                        */
/* ------------------------------------------------------------------ */

interface RetroSidebarProps extends React.ComponentProps<"aside"> {
  side?: "left" | "right"
  contained?: boolean
}

function RetroSidebar(
  {
    side = "left",
    contained = false,
    className,
    children,
    ...props
  }: RetroSidebarProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { open, openMobile, setOpenMobile, isMobile } = useRetroSidebar()

  if (!contained && isMobile) {
    return (
      <RetroSheet open={openMobile} onOpenChange={setOpenMobile}>
        <RetroSheetContent side="left" className="p-0">
          <RetroSheetTitle className="sr-only">Navigation</RetroSheetTitle>
          <div className="flex h-full w-full flex-col bg-os9-gray-300">
            {children}
          </div>
        </RetroSheetContent>
      </RetroSheet>
    )
  }

  // Contained mode: static sidebar in flex flow (for demos/embedded contexts)
  if (contained) {
    return (
      <aside
        ref={ref as React.ForwardedRef<HTMLElement>}
        data-state={open ? "open" : "closed"}
        className={cn(
          "flex flex-col shrink-0",
          "bg-os9-gray-300",
          "transition-[width] duration-150 ease-in-out",
          "overflow-hidden",
          open ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-icon)]",
          className
        )}
        style={{
          borderRight:
            side === "left"
              ? "1px solid var(--os9-black)"
              : undefined,
          borderLeft:
            side === "right"
              ? "1px solid var(--os9-black)"
              : undefined,
          boxShadow:
            side === "left"
              ? "inset -2px 0 0 var(--os9-gray-700), inset -3px 0 0 var(--os9-white)"
              : "inset 2px 0 0 var(--os9-gray-700), inset 3px 0 0 var(--os9-white)",
        }}
        {...props}
      >
        {children}
      </aside>
    )
  }

  return (
    <div
      ref={ref}
      className="group peer hidden shrink-0 md:block"
      data-state={open ? "expanded" : "collapsed"}
      data-side={side}
      style={{
        width: open
          ? "var(--sidebar-width)"
          : "var(--sidebar-width-icon)",
        transition: "width 150ms ease-in-out",
      }}
    >
      {/* Fixed sidebar container — pinned to viewport */}
      <div
        className={cn(
          "fixed inset-y-0 z-10 flex h-svh",
          "transition-[width] duration-150 ease-in-out",
          side === "left" ? "left-0" : "right-0"
        )}
        style={{
          width: open
            ? "var(--sidebar-width)"
            : "var(--sidebar-width-icon)",
        }}
      >
        <aside
          data-state={open ? "open" : "closed"}
          className={cn(
            "flex h-full w-full flex-col",
            "bg-os9-gray-300",
            "overflow-hidden",
            className
          )}
          style={{
            borderRight:
              side === "left"
                ? "1px solid var(--os9-black)"
                : undefined,
            borderLeft:
              side === "right"
                ? "1px solid var(--os9-black)"
                : undefined,
            boxShadow:
              side === "left"
                ? "inset -2px 0 0 var(--os9-gray-700), inset -3px 0 0 var(--os9-white)"
                : "inset 2px 0 0 var(--os9-gray-700), inset 3px 0 0 var(--os9-white)",
          }}
          {...props}
        >
          {children}
        </aside>
      </div>
    </div>
  )
}

const ForwardedRetroSidebar = React.forwardRef(RetroSidebar)
ForwardedRetroSidebar.displayName = "RetroSidebar"

/* ------------------------------------------------------------------ */
/*  RetroSidebarHeader                                                  */
/* ------------------------------------------------------------------ */

function RetroSidebarHeader(
  { className, ...props }: React.ComponentProps<"div">,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn("flex shrink-0 items-center p-2", className)}
      {...props}
    />
  )
}

const ForwardedRetroSidebarHeader = React.forwardRef(RetroSidebarHeader)
ForwardedRetroSidebarHeader.displayName = "RetroSidebarHeader"

/* ------------------------------------------------------------------ */
/*  RetroSidebarContent                                                 */
/* ------------------------------------------------------------------ */

function RetroSidebarContent(
  { className, children, ...props }: React.ComponentProps<"div">,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <RetroScrollArea
      className={cn("min-h-0 flex-1", className)}
    >
      <div ref={ref} className="flex flex-col p-2" {...props}>
        {children}
      </div>
    </RetroScrollArea>
  )
}

const ForwardedRetroSidebarContent = React.forwardRef(RetroSidebarContent)
ForwardedRetroSidebarContent.displayName = "RetroSidebarContent"

/* ------------------------------------------------------------------ */
/*  RetroSidebarFooter                                                  */
/* ------------------------------------------------------------------ */

function RetroSidebarFooter(
  { className, ...props }: React.ComponentProps<"div">,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn("flex shrink-0 items-center p-2", className)}
      style={{
        borderTop: "1px solid var(--os9-gray-700)",
        boxShadow: "inset 0 1px 0 var(--os9-white)",
      }}
      {...props}
    />
  )
}

const ForwardedRetroSidebarFooter = React.forwardRef(RetroSidebarFooter)
ForwardedRetroSidebarFooter.displayName = "RetroSidebarFooter"

/* ------------------------------------------------------------------ */
/*  RetroSidebarMenu                                                    */
/* ------------------------------------------------------------------ */

function RetroSidebarMenu(
  { className, ...props }: React.ComponentProps<"ul">,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  return (
    <ul
      ref={ref}
      className={cn("flex flex-col gap-0.5 list-none p-0 m-0", className)}
      {...props}
    />
  )
}

const ForwardedRetroSidebarMenu = React.forwardRef(RetroSidebarMenu)
ForwardedRetroSidebarMenu.displayName = "RetroSidebarMenu"

/* ------------------------------------------------------------------ */
/*  RetroSidebarMenuItem                                                */
/* ------------------------------------------------------------------ */

function RetroSidebarMenuItem(
  { className, ...props }: React.ComponentProps<"li">,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  return <li ref={ref} className={cn("list-none", className)} {...props} />
}

const ForwardedRetroSidebarMenuItem = React.forwardRef(RetroSidebarMenuItem)
ForwardedRetroSidebarMenuItem.displayName = "RetroSidebarMenuItem"

/* ------------------------------------------------------------------ */
/*  RetroSidebarMenuButton                                              */
/* ------------------------------------------------------------------ */

interface RetroSidebarMenuButtonProps
  extends React.ComponentProps<"button"> {
  isActive?: boolean
  asChild?: boolean
}

function RetroSidebarMenuButton(
  {
    className,
    isActive = false,
    asChild = false,
    children,
    ...props
  }: RetroSidebarMenuButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { open } = useRetroSidebar()
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-active={isActive}
      className={cn(
        "flex w-full items-center gap-2",
        "h-[28px] px-2",
        "font-[family-name:var(--font-sans)] text-[10px] leading-[1.3]",
        "text-os9-black",
        "cursor-pointer select-none",
        "transition-none",
        "hover:bg-os9-lavender",
        "data-[active=true]:bg-os9-azul data-[active=true]:text-os9-white",
        "focus-visible:os9-focus-ring",
        !open && "justify-center px-0",
        className
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : open ? (
        <span className="flex items-center gap-2 min-w-0 truncate">
          {children}
        </span>
      ) : (
        <span className="flex items-center justify-center [&>*:not(:first-child)]:hidden">
          {children}
        </span>
      )}
    </Comp>
  )
}

const ForwardedRetroSidebarMenuButton = React.forwardRef(
  RetroSidebarMenuButton
)
ForwardedRetroSidebarMenuButton.displayName = "RetroSidebarMenuButton"

/* ------------------------------------------------------------------ */
/*  RetroSidebarGroup                                                   */
/* ------------------------------------------------------------------ */

function RetroSidebarGroup(
  { className, ...props }: React.ComponentProps<"div">,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

const ForwardedRetroSidebarGroup = React.forwardRef(RetroSidebarGroup)
ForwardedRetroSidebarGroup.displayName = "RetroSidebarGroup"

/* ------------------------------------------------------------------ */
/*  RetroSidebarGroupLabel                                              */
/* ------------------------------------------------------------------ */

function RetroSidebarGroupLabel(
  { className, ...props }: React.ComponentProps<"div">,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { open } = useRetroSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "font-[family-name:var(--font-heading)] text-[10px] tracking-[0.42px] leading-[0.98]",
        "uppercase text-os9-gray-700",
        "px-2 py-1",
        !open && "sr-only",
        className
      )}
      {...props}
    />
  )
}

const ForwardedRetroSidebarGroupLabel = React.forwardRef(
  RetroSidebarGroupLabel
)
ForwardedRetroSidebarGroupLabel.displayName = "RetroSidebarGroupLabel"

/* ------------------------------------------------------------------ */
/*  RetroSidebarTrigger                                                 */
/* ------------------------------------------------------------------ */

function RetroSidebarTrigger(
  { className, ...props }: React.ComponentProps<"button">,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { open, toggleSidebar } = useRetroSidebar()

  return (
    <button
      ref={ref}
      type="button"
      aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      onClick={toggleSidebar}
      className={cn(
        "inline-flex items-center justify-center",
        "size-[20px] p-0",
        "border border-os9-black bg-os9-gray-300",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
        "cursor-pointer select-none",
        "transition-none",
        "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        "focus-visible:os9-focus-ring",
        className
      )}
      {...props}
    >
      {/* Chevron arrow that flips based on open state */}
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        aria-hidden="true"
        className={cn(
          "transition-transform duration-150",
          !open && "rotate-180"
        )}
      >
        <path d="M5 1L2 4L5 7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  )
}

const ForwardedRetroSidebarTrigger = React.forwardRef(RetroSidebarTrigger)
ForwardedRetroSidebarTrigger.displayName = "RetroSidebarTrigger"

/* ------------------------------------------------------------------ */
/*  RetroSidebarInset                                                   */
/* ------------------------------------------------------------------ */

function RetroSidebarInset(
  { className, ...props }: React.ComponentProps<"main">,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <main
      ref={ref}
      className={cn("relative flex w-full flex-1 flex-col", className)}
      {...props}
    />
  )
}

const ForwardedRetroSidebarInset = React.forwardRef(RetroSidebarInset)
ForwardedRetroSidebarInset.displayName = "RetroSidebarInset"

/* ------------------------------------------------------------------ */
/*  Exports                                                             */
/* ------------------------------------------------------------------ */

export {
  RetroSidebarProvider,
  ForwardedRetroSidebar as RetroSidebar,
  ForwardedRetroSidebarHeader as RetroSidebarHeader,
  ForwardedRetroSidebarContent as RetroSidebarContent,
  ForwardedRetroSidebarFooter as RetroSidebarFooter,
  ForwardedRetroSidebarMenu as RetroSidebarMenu,
  ForwardedRetroSidebarMenuItem as RetroSidebarMenuItem,
  ForwardedRetroSidebarMenuButton as RetroSidebarMenuButton,
  ForwardedRetroSidebarGroup as RetroSidebarGroup,
  ForwardedRetroSidebarGroupLabel as RetroSidebarGroupLabel,
  ForwardedRetroSidebarTrigger as RetroSidebarTrigger,
  ForwardedRetroSidebarInset as RetroSidebarInset,
  useRetroSidebar,
}
