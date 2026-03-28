"use client"

import { useState } from "react"
import {
  RetroDropdownMenu,
  RetroDropdownMenuTrigger,
  RetroDropdownMenuContent,
  RetroDropdownMenuItem,
  RetroDropdownMenuSeparator,
  RetroDropdownMenuSub,
  RetroDropdownMenuSubTrigger,
  RetroDropdownMenuSubContent,
  RetroDropdownMenuCheckboxItem,
  RetroDropdownMenuRadioGroup,
  RetroDropdownMenuRadioItem,
  RetroDropdownMenuLabel,
  RetroDropdownMenuShortcut,
} from "@/registry/new-york/ui/retro-dropdown-menu"
import { RetroButton } from "@/registry/new-york/ui/retro-button"

export default function DropdownMenuPreview() {
  const [showToolbar, setShowToolbar] = useState(true)
  const [showStatusBar, setShowStatusBar] = useState(false)
  const [viewMode, setViewMode] = useState("icons")

  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">
        RetroDropdownMenu Preview
      </h1>

      {/* Basic dropdown */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic Dropdown</h2>
        <RetroDropdownMenu>
          <RetroDropdownMenuTrigger asChild>
            <RetroButton>File</RetroButton>
          </RetroDropdownMenuTrigger>
          <RetroDropdownMenuContent>
            <RetroDropdownMenuItem>
              New
              <RetroDropdownMenuShortcut>&#8984;N</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuItem>
              Open...
              <RetroDropdownMenuShortcut>&#8984;O</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuItem>Close</RetroDropdownMenuItem>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuItem>
              Save
              <RetroDropdownMenuShortcut>&#8984;S</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuItem>Save As...</RetroDropdownMenuItem>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuItem>Page Setup...</RetroDropdownMenuItem>
            <RetroDropdownMenuItem>
              Print...
              <RetroDropdownMenuShortcut>&#8984;P</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuItem>
              Quit
              <RetroDropdownMenuShortcut>&#8984;Q</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
          </RetroDropdownMenuContent>
        </RetroDropdownMenu>
      </section>

      {/* With submenus */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Submenus</h2>
        <RetroDropdownMenu>
          <RetroDropdownMenuTrigger asChild>
            <RetroButton>Edit</RetroButton>
          </RetroDropdownMenuTrigger>
          <RetroDropdownMenuContent>
            <RetroDropdownMenuItem>
              Undo
              <RetroDropdownMenuShortcut>&#8984;Z</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuItem>
              Cut
              <RetroDropdownMenuShortcut>&#8984;X</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuItem>
              Copy
              <RetroDropdownMenuShortcut>&#8984;C</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuItem>
              Paste
              <RetroDropdownMenuShortcut>&#8984;V</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuSub>
              <RetroDropdownMenuSubTrigger>
                Find
              </RetroDropdownMenuSubTrigger>
              <RetroDropdownMenuSubContent>
                <RetroDropdownMenuItem>
                  Find...
                  <RetroDropdownMenuShortcut>&#8984;F</RetroDropdownMenuShortcut>
                </RetroDropdownMenuItem>
                <RetroDropdownMenuItem>Find Next</RetroDropdownMenuItem>
                <RetroDropdownMenuItem>Find Previous</RetroDropdownMenuItem>
                <RetroDropdownMenuSeparator />
                <RetroDropdownMenuItem>Replace...</RetroDropdownMenuItem>
              </RetroDropdownMenuSubContent>
            </RetroDropdownMenuSub>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuItem>
              Select All
              <RetroDropdownMenuShortcut>&#8984;A</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
          </RetroDropdownMenuContent>
        </RetroDropdownMenu>
      </section>

      {/* Checkbox and radio items */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Checkbox &amp; Radio Items
        </h2>
        <RetroDropdownMenu>
          <RetroDropdownMenuTrigger asChild>
            <RetroButton>View</RetroButton>
          </RetroDropdownMenuTrigger>
          <RetroDropdownMenuContent>
            <RetroDropdownMenuLabel>Panels</RetroDropdownMenuLabel>
            <RetroDropdownMenuCheckboxItem
              checked={showToolbar}
              onCheckedChange={setShowToolbar}
            >
              Show Toolbar
            </RetroDropdownMenuCheckboxItem>
            <RetroDropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Show Status Bar
            </RetroDropdownMenuCheckboxItem>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuLabel>View As</RetroDropdownMenuLabel>
            <RetroDropdownMenuRadioGroup
              value={viewMode}
              onValueChange={setViewMode}
            >
              <RetroDropdownMenuRadioItem value="icons">
                as Icons
              </RetroDropdownMenuRadioItem>
              <RetroDropdownMenuRadioItem value="list">
                as List
              </RetroDropdownMenuRadioItem>
              <RetroDropdownMenuRadioItem value="columns">
                as Columns
              </RetroDropdownMenuRadioItem>
            </RetroDropdownMenuRadioGroup>
          </RetroDropdownMenuContent>
        </RetroDropdownMenu>
      </section>

      {/* With disabled items */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled Items</h2>
        <RetroDropdownMenu>
          <RetroDropdownMenuTrigger asChild>
            <RetroButton>Special</RetroButton>
          </RetroDropdownMenuTrigger>
          <RetroDropdownMenuContent>
            <RetroDropdownMenuItem>Empty Trash...</RetroDropdownMenuItem>
            <RetroDropdownMenuItem disabled>Eject</RetroDropdownMenuItem>
            <RetroDropdownMenuItem disabled>Burn Disc...</RetroDropdownMenuItem>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuItem>Restart</RetroDropdownMenuItem>
            <RetroDropdownMenuItem>Shut Down</RetroDropdownMenuItem>
          </RetroDropdownMenuContent>
        </RetroDropdownMenu>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click a button to open the dropdown menu. Hover items to see the azul
        highlight.
      </p>
    </main>
  )
}
