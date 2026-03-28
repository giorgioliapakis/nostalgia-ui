"use client"

import {
  RetroSidebarProvider,
  RetroSidebar,
  RetroSidebarHeader,
  RetroSidebarContent,
  RetroSidebarMenu,
  RetroSidebarMenuItem,
  RetroSidebarMenuButton,
  RetroSidebarGroup,
  RetroSidebarGroupLabel,
  RetroSidebarTrigger,
  RetroSidebarInset,
} from "@/registry/new-york/ui/retro-sidebar"
import {
  RetroIconFolder,
  RetroIconDocument,
  RetroIconHardDrive,
  RetroIconPreferences,
  RetroIconTrash,
} from "@/registry/new-york/ui/retro-icons"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function SidebarPreview() {
  return (
    <ComponentDocLayout
      name="retro-sidebar"
      title="RetroSidebar"
      description="A collapsible sidebar navigation with Mac OS 9 styling, icon-only collapse, and mobile sheet mode."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A collapsible sidebar navigation with OS9 styling. Supports grouped menu
        items, active states, and a toggle trigger. The sidebar is pinned to the
        viewport and scrolls independently from the main content. On mobile, it
        renders as a slide-in sheet.
      </p>

      <p className="text-os9-gray-700 text-[10px] mb-6">
        The sidebar you see on the left of this page is a live instance of
        RetroSidebar. Click the chevron button or press Cmd+B / Ctrl+B to
        collapse it. When collapsed, only icons are visible.
      </p>

      {/* Code example */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Usage</h2>
        <div
          className="border border-os9-black bg-os9-white p-4 font-mono text-[10px] whitespace-pre overflow-x-auto"
          style={{
            boxShadow:
              "inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white)",
          }}
        >
{`<RetroSidebarProvider defaultOpen>
  <RetroSidebar>
    <RetroSidebarHeader>
      <RetroSidebarTrigger />
      <span>Finder</span>
    </RetroSidebarHeader>
    <RetroSidebarContent>
      <RetroSidebarGroup>
        <RetroSidebarGroupLabel>Favorites</RetroSidebarGroupLabel>
        <RetroSidebarMenu>
          <RetroSidebarMenuItem>
            <RetroSidebarMenuButton isActive>
              <Icon /> Macintosh HD
            </RetroSidebarMenuButton>
          </RetroSidebarMenuItem>
        </RetroSidebarMenu>
      </RetroSidebarGroup>
    </RetroSidebarContent>
  </RetroSidebar>
  <RetroSidebarInset>
    {/* Main content */}
  </RetroSidebarInset>
</RetroSidebarProvider>`}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Features</h2>
        <ul className="list-none p-0 m-0 flex flex-col gap-1">
          {[
            "Fixed to viewport — sidebar stays pinned while content scrolls",
            "Independent scroll — sidebar content scrolls separately",
            "Collapse to icons — toggle with button or Cmd+B / Ctrl+B",
            "Mobile sheet — renders as a slide-in overlay on small screens",
            "OS9 bevels — authentic Mac OS 9 border styling",
            "Grouped navigation — organize items with labels",
            "Active state — azul highlight for the current item",
          ].map((feature) => (
            <li
              key={feature}
              className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black pl-3"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' x='1' y='1' fill='%23333399'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 4px",
              }}
            >
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        The active item is highlighted in azul. Click the toggle button or press
        Cmd+B to collapse. When collapsed, only icons are visible.
      </p>
    </ComponentDocLayout>
  )
}
