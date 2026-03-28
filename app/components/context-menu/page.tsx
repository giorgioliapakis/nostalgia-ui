"use client"

import { useState } from "react"
import {
  RetroContextMenu,
  RetroContextMenuTrigger,
  RetroContextMenuContent,
  RetroContextMenuItem,
  RetroContextMenuSeparator,
  RetroContextMenuSub,
  RetroContextMenuSubTrigger,
  RetroContextMenuSubContent,
  RetroContextMenuCheckboxItem,
  RetroContextMenuRadioGroup,
  RetroContextMenuRadioItem,
  RetroContextMenuLabel,
  RetroContextMenuShortcut,
} from "@/registry/new-york/ui/retro-context-menu"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function ContextMenuPreview() {
  const [showGrid, setShowGrid] = useState(true)
  const [showRulers, setShowRulers] = useState(false)
  const [viewMode, setViewMode] = useState("icons")

  return (
    <ComponentDocLayout
      name="retro-context-menu"
      title="RetroContextMenu"
      description="A right-click context menu with Mac OS 9 styling, submenus, checkbox and radio items."
    >
      {/* ---- Right-click demo area ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Right-click the area below
        </h2>

        <RetroContextMenu>
          <RetroContextMenuTrigger asChild>
            <div
              className={
                "flex items-center justify-center " +
                "w-[480px] h-[240px] " +
                "border border-os9-black bg-os9-gray-300 " +
                "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)] " +
                "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] text-os9-gray-700 " +
                "select-none cursor-default"
              }
            >
              Right-click here
            </div>
          </RetroContextMenuTrigger>

          <RetroContextMenuContent>
            <RetroContextMenuItem>
              New Folder
              <RetroContextMenuShortcut>&#8984;N</RetroContextMenuShortcut>
            </RetroContextMenuItem>
            <RetroContextMenuItem>
              Open
              <RetroContextMenuShortcut>&#8984;O</RetroContextMenuShortcut>
            </RetroContextMenuItem>
            <RetroContextMenuItem>Get Info</RetroContextMenuItem>

            <RetroContextMenuSeparator />

            <RetroContextMenuItem>
              Cut
              <RetroContextMenuShortcut>&#8984;X</RetroContextMenuShortcut>
            </RetroContextMenuItem>
            <RetroContextMenuItem>
              Copy
              <RetroContextMenuShortcut>&#8984;C</RetroContextMenuShortcut>
            </RetroContextMenuItem>
            <RetroContextMenuItem>
              Paste
              <RetroContextMenuShortcut>&#8984;V</RetroContextMenuShortcut>
            </RetroContextMenuItem>

            <RetroContextMenuSeparator />

            {/* Sub-menu */}
            <RetroContextMenuSub>
              <RetroContextMenuSubTrigger>
                Sort By
              </RetroContextMenuSubTrigger>
              <RetroContextMenuSubContent>
                <RetroContextMenuItem>Name</RetroContextMenuItem>
                <RetroContextMenuItem>Date Modified</RetroContextMenuItem>
                <RetroContextMenuItem>Size</RetroContextMenuItem>
                <RetroContextMenuItem>Kind</RetroContextMenuItem>
              </RetroContextMenuSubContent>
            </RetroContextMenuSub>

            <RetroContextMenuSeparator />

            {/* Checkbox items */}
            <RetroContextMenuLabel>Display</RetroContextMenuLabel>
            <RetroContextMenuCheckboxItem
              checked={showGrid}
              onCheckedChange={setShowGrid}
            >
              Show Grid
            </RetroContextMenuCheckboxItem>
            <RetroContextMenuCheckboxItem
              checked={showRulers}
              onCheckedChange={setShowRulers}
            >
              Show Rulers
            </RetroContextMenuCheckboxItem>

            <RetroContextMenuSeparator />

            {/* Radio items */}
            <RetroContextMenuLabel>View</RetroContextMenuLabel>
            <RetroContextMenuRadioGroup
              value={viewMode}
              onValueChange={setViewMode}
            >
              <RetroContextMenuRadioItem value="icons">
                as Icons
              </RetroContextMenuRadioItem>
              <RetroContextMenuRadioItem value="list">
                as List
              </RetroContextMenuRadioItem>
              <RetroContextMenuRadioItem value="columns">
                as Columns
              </RetroContextMenuRadioItem>
            </RetroContextMenuRadioGroup>

            <RetroContextMenuSeparator />

            <RetroContextMenuItem disabled>
              Empty Trash...
            </RetroContextMenuItem>
          </RetroContextMenuContent>
        </RetroContextMenu>
      </section>
    </ComponentDocLayout>
  )
}
