"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  RetroSidebarProvider,
  RetroSidebar,
  RetroSidebarHeader,
  RetroSidebarContent,
  RetroSidebarFooter,
  RetroSidebarMenu,
  RetroSidebarMenuItem,
  RetroSidebarMenuButton,
  RetroSidebarGroup,
  RetroSidebarGroupLabel,
  RetroSidebarTrigger,
  RetroSidebarInset,
  useRetroSidebar,
} from "@/registry/new-york/ui/retro-sidebar"
import {
  RetroDropdownMenu,
  RetroDropdownMenuTrigger,
  RetroDropdownMenuContent,
  RetroDropdownMenuItem,
  RetroDropdownMenuSeparator,
} from "@/registry/new-york/ui/retro-dropdown-menu"

const MENU_TRIGGER_CLS =
  "bg-transparent border-none cursor-default select-none px-[4px] py-0 outline-none font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98] text-os9-black data-[state=open]:bg-os9-azul data-[state=open]:text-os9-white"

/* ------------------------------------------------------------------ */
/*  Component Navigation Data                                          */
/* ------------------------------------------------------------------ */

interface NavItem {
  name: string
  slug: string
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Getting Started",
    items: [
      { name: "Theme Provider", slug: "theme-provider" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    label: "Form Controls",
    items: [
      { name: "Button", slug: "button" },
      { name: "Checkbox", slug: "checkbox" },
      { name: "Combobox", slug: "combobox" },
      { name: "Date Picker", slug: "date-picker" },
      { name: "Form", slug: "form" },
      { name: "Input", slug: "input" },
      { name: "Input OTP", slug: "input-otp" },
      { name: "Label", slug: "label" },
      { name: "Radio", slug: "radio" },
      { name: "Select", slug: "select" },
      { name: "Slider", slug: "slider" },
      { name: "Switch", slug: "switch" },
      { name: "Textarea", slug: "textarea" },
      { name: "Toggle", slug: "toggle" },
      { name: "Toggle Group", slug: "toggle-group" },
    ],
  },
  {
    label: "Layout",
    items: [
      { name: "Accordion", slug: "accordion" },
      { name: "Aspect Ratio", slug: "aspect-ratio" },
      { name: "Card", slug: "card" },
      { name: "Carousel", slug: "carousel" },
      { name: "Collapsible", slug: "collapsible" },
      { name: "Resizable", slug: "resizable" },
      { name: "Separator", slug: "separator" },
      { name: "Skeleton", slug: "skeleton" },
      { name: "Tabs", slug: "tabs" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { name: "Breadcrumb", slug: "breadcrumb" },
      { name: "Chevron", slug: "chevron" },
      { name: "Menu Bar", slug: "menu-bar" },
      { name: "Nav Button", slug: "nav-button" },
      { name: "Navigation Menu", slug: "navigation-menu" },
      { name: "Pagination", slug: "pagination" },
      { name: "Sidebar", slug: "sidebar" },
      { name: "Toolbar", slug: "toolbar" },
    ],
  },
  {
    label: "Data Display",
    items: [
      { name: "Avatar", slug: "avatar" },
      { name: "Badge", slug: "badge" },
      { name: "Data Table", slug: "data-table" },
      { name: "Progress", slug: "progress" },
      { name: "Scrollbar", slug: "scrollbar" },
      { name: "Table", slug: "table" },
    ],
  },
  {
    label: "Overlays",
    items: [
      { name: "Alert Dialog", slug: "alert-dialog" },
      { name: "Context Menu", slug: "context-menu" },
      { name: "Dialog", slug: "dialog" },
      { name: "Drawer", slug: "drawer" },
      { name: "Dropdown Menu", slug: "dropdown-menu" },
      { name: "Hover Card", slug: "hover-card" },
      { name: "Popover", slug: "popover" },
      { name: "Sheet", slug: "sheet" },
      { name: "Tooltip", slug: "tooltip" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { name: "Alert", slug: "alert" },
      { name: "Command", slug: "command" },
      { name: "Spinner", slug: "spinner" },
      { name: "Toast", slug: "toast" },
    ],
  },
  {
    label: "OS9 Special",
    items: [
      { name: "Desktop", slug: "desktop" },
      { name: "Icons", slug: "icons" },
      { name: "Title Bar", slug: "title-bar" },
      { name: "Window", slug: "window" },
    ],
  },
  {
    label: "Visualization",
    items: [
      { name: "Chart", slug: "chart" },
    ],
  },
]

const TOTAL_COMPONENTS = NAV_GROUPS.reduce(
  (sum, group) => sum + group.items.length,
  0
)

/* ------------------------------------------------------------------ */
/*  Sidebar Nav (child component — reads sidebar context)              */
/* ------------------------------------------------------------------ */

function SidebarNav() {
  const pathname = usePathname()
  const { open } = useRetroSidebar()

  return (
    <>
      <RetroSidebarHeader className={open ? "flex-col items-start gap-2" : "items-center justify-center"}>
        {open ? (
          <>
            <div className="flex w-full items-center justify-between">
              <Link
                href="/"
                className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98] text-os9-black no-underline hover:underline"
              >
                nostalgia-ui
              </Link>
              <RetroSidebarTrigger />
            </div>
            <div className="w-full rounded-none bg-os9-white px-1.5 py-1 font-[family-name:var(--font-sans)] text-[9px] text-os9-gray-700"
              style={{
                border: "1px solid var(--os9-gray-700)",
                boxShadow: "inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white)",
              }}
            >
              npx shadcn@latest add &quot;https://nostalgia-ui.vercel.app/r&quot;
            </div>
          </>
        ) : (
          <RetroSidebarTrigger />
        )}
      </RetroSidebarHeader>

      {open && (
        <>
          <RetroSidebarContent>
            <RetroSidebarGroup>
              <RetroSidebarMenu>
                <RetroSidebarMenuItem>
                  <RetroSidebarMenuButton asChild isActive={pathname === "/components"}>
                    <Link href="/components"><span>Overview</span></Link>
                  </RetroSidebarMenuButton>
                </RetroSidebarMenuItem>
                <RetroSidebarMenuItem>
                  <RetroSidebarMenuButton asChild isActive={pathname === "/components/all"}>
                    <Link href="/components/all"><span>All Components</span></Link>
                  </RetroSidebarMenuButton>
                </RetroSidebarMenuItem>
              </RetroSidebarMenu>
            </RetroSidebarGroup>
            {NAV_GROUPS.map((group) => (
              <RetroSidebarGroup key={group.label}>
                <RetroSidebarGroupLabel>{group.label}</RetroSidebarGroupLabel>
                <RetroSidebarMenu>
                  {group.items.map((item) => {
                    const href = `/components/${item.slug}`
                    const isActive = pathname === href

                    return (
                      <RetroSidebarMenuItem key={item.slug}>
                        <RetroSidebarMenuButton
                          asChild
                          isActive={isActive}
                        >
                          <Link href={href}>
                            <span>{item.name}</span>
                          </Link>
                        </RetroSidebarMenuButton>
                      </RetroSidebarMenuItem>
                    )
                  })}
                </RetroSidebarMenu>
              </RetroSidebarGroup>
            ))}
          </RetroSidebarContent>

          <RetroSidebarFooter className="flex-col items-start gap-1.5">
            <span className="inline-flex items-center bg-os9-gray-400 px-1.5 py-0.5 font-[family-name:var(--font-sans)] text-[9px] text-os9-black"
              style={{
                border: "1px solid var(--os9-gray-700)",
                boxShadow: "inset 1px 1px 0 var(--os9-white), inset -1px -1px 0 var(--os9-gray-700)",
              }}
            >
              {TOTAL_COMPONENTS} Components
            </span>
            <Link
              href="https://github.com/giorgioliapakis/nostalgia-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-sans)] text-[9px] text-os9-black underline hover:text-os9-azul"
            >
              GitHub
            </Link>
          </RetroSidebarFooter>
        </>
      )}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Menu Bar                                                            */
/* ------------------------------------------------------------------ */

function ComponentsMenuBar() {
  return (
    <div
      className="sticky top-0 z-10 flex h-[28px] shrink-0 items-center px-[8px] bg-os9-gray-300 border-b border-os9-black"
      style={{
        boxShadow:
          "inset 0 1px 0 var(--os9-white), inset 0 -1px 0 var(--os9-gray-700)",
      }}
    >
      {/* Computer icon — links home */}
      <Link href="/" className="flex shrink-0 items-center pr-[8px]" aria-label="Home">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="1" y="1" width="12" height="9" rx="0" fill="currentColor" />
          <rect x="2.5" y="2.5" width="9" height="6" rx="0" fill="var(--os9-gray-200)" />
          <rect x="5" y="10.5" width="4" height="1.5" rx="0" fill="currentColor" />
          <rect x="3.5" y="12" width="7" height="1" rx="0" fill="currentColor" />
        </svg>
      </Link>

      {/* Mobile sidebar trigger */}
      <div className="md:hidden pr-[4px]">
        <RetroSidebarTrigger />
      </div>

      <div className="flex flex-1 items-center gap-[2px]">
        <RetroDropdownMenu>
          <RetroDropdownMenuTrigger className={MENU_TRIGGER_CLS}>
            <span className="font-bold">File</span>
          </RetroDropdownMenuTrigger>
          <RetroDropdownMenuContent align="start" sideOffset={2}>
            <RetroDropdownMenuItem asChild>
              <Link href="/">Home</Link>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuItem asChild>
              <Link href="/components">Components Overview</Link>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuItem asChild>
              <a href="https://github.com/giorgioliapakis/nostalgia-ui" target="_blank" rel="noopener noreferrer">GitHub</a>
            </RetroDropdownMenuItem>
          </RetroDropdownMenuContent>
        </RetroDropdownMenu>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Layout                                                              */
/* ------------------------------------------------------------------ */

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RetroSidebarProvider defaultOpen={true}>
      <RetroSidebar>
        <SidebarNav />
      </RetroSidebar>

      <RetroSidebarInset>
        <ComponentsMenuBar />
        {children}
      </RetroSidebarInset>
    </RetroSidebarProvider>
  )
}
