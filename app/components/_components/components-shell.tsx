"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NAV_GROUPS, TOTAL_COMPONENTS } from "./nav-data"
import { BLOCKS } from "../../blocks/_components/blocks-data"

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
            <div className="w-full rounded-none bg-os9-white px-1.5 py-1 font-mono text-[9px] leading-[1.4] text-os9-gray-700 break-all select-all"
              style={{
                border: "1px solid var(--os9-gray-700)",
                boxShadow: "inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white)",
              }}
            >
              npx shadcn@latest add https://nostalgia-ui.com/r/retro-button.json
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
                <RetroSidebarMenuItem>
                  <RetroSidebarMenuButton asChild isActive={pathname === "/blocks"}>
                    <Link href="/blocks"><span>Blocks</span></Link>
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
            <RetroSidebarGroup>
              <RetroSidebarGroupLabel>Blocks</RetroSidebarGroupLabel>
              <RetroSidebarMenu>
                {BLOCKS.map((block) => {
                  const href = `/blocks/${block.slug}`
                  return (
                    <RetroSidebarMenuItem key={block.slug}>
                      <RetroSidebarMenuButton asChild isActive={pathname === href}>
                        <Link href={href}>
                          <span>{block.name}</span>
                        </Link>
                      </RetroSidebarMenuButton>
                    </RetroSidebarMenuItem>
                  )
                })}
              </RetroSidebarMenu>
            </RetroSidebarGroup>
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
            <RetroDropdownMenuItem asChild>
              <Link href="/blocks">Blocks</Link>
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
/*  Shell (sidebar provider + sidebar + menu bar)                      */
/* ------------------------------------------------------------------ */

export function ComponentsShell({ children }: { children: React.ReactNode }) {
  return (
    <RetroSidebarProvider defaultOpen={true}>
      <RetroSidebar>
        <SidebarNav />
      </RetroSidebar>

      <RetroSidebarInset className="min-w-0">
        <ComponentsMenuBar />
        {children}
      </RetroSidebarInset>
    </RetroSidebarProvider>
  )
}
