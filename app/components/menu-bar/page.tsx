"use client"

import * as React from "react"
import {
  RetroMenuBar,
  RetroMenuBarMenu,
  RetroMenuBarTrigger,
  RetroMenuBarContent,
  RetroMenuBarItem,
  RetroMenuBarSeparator,
  RetroMenuBarSub,
  RetroMenuBarSubTrigger,
  RetroMenuBarSubContent,
  RetroMenuBarCheckboxItem,
  RetroMenuBarRadioGroup,
  RetroMenuBarRadioItem,
  RetroMenuBarLabel,
  RetroMenuBarGroup,
  RetroMenuBarShortcut,
} from "@/registry/new-york/ui/retro-menu-bar"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function MenuBarPreview() {
  const [showRulers, setShowRulers] = React.useState(true)
  const [showStatusBar, setShowStatusBar] = React.useState(false)
  const [labelColor, setLabelColor] = React.useState("none")

  return (
    <ComponentDocLayout
      name="retro-menu-bar"
      title="RetroMenuBar"
      description="A horizontal menu bar with Mac OS 9 styling and pull-down menu panels."
    >
      {/* ---- Full-width menu bar ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Default
        </h2>

        <RetroMenuBar className="w-full">
          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>File</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>New</RetroMenuBarItem>
              <RetroMenuBarItem>Open...</RetroMenuBarItem>
              <RetroMenuBarItem>Close</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Save</RetroMenuBarItem>
              <RetroMenuBarItem>Save As...</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Page Setup...</RetroMenuBarItem>
              <RetroMenuBarItem>Print...</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Quit</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>

          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>Edit</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>Undo</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Cut</RetroMenuBarItem>
              <RetroMenuBarItem>Copy</RetroMenuBarItem>
              <RetroMenuBarItem>Paste</RetroMenuBarItem>
              <RetroMenuBarItem>Clear</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Select All</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>

          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>View</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>as Icons</RetroMenuBarItem>
              <RetroMenuBarItem>as Buttons</RetroMenuBarItem>
              <RetroMenuBarItem>as List</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Clean Up</RetroMenuBarItem>
              <RetroMenuBarItem>Arrange</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem disabled>Reset Column Positions</RetroMenuBarItem>
              <RetroMenuBarItem disabled>View Options...</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>
        </RetroMenuBar>
      </section>

      {/* ---- Fixed-width menu bar ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Fixed width (480px)
        </h2>

        <RetroMenuBar className="w-[480px]">
          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>File</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>New Folder</RetroMenuBarItem>
              <RetroMenuBarItem>Open</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Get Info</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>

          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>Edit</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>Undo</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Cut</RetroMenuBarItem>
              <RetroMenuBarItem>Copy</RetroMenuBarItem>
              <RetroMenuBarItem>Paste</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>

          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>View</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>as Icons</RetroMenuBarItem>
              <RetroMenuBarItem>as List</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>
        </RetroMenuBar>
      </section>
      {/* ---- Submenus, checkboxes, radios, shortcuts ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Submenus, checkbox items &amp; shortcuts
        </h2>

        <RetroMenuBar className="w-[480px]">
          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>File</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>
                New Folder <RetroMenuBarShortcut>⌘N</RetroMenuBarShortcut>
              </RetroMenuBarItem>
              <RetroMenuBarItem>
                Open <RetroMenuBarShortcut>⌘O</RetroMenuBarShortcut>
              </RetroMenuBarItem>
              <RetroMenuBarSub>
                <RetroMenuBarSubTrigger>Open Recent</RetroMenuBarSubTrigger>
                <RetroMenuBarSubContent>
                  <RetroMenuBarItem>Read Me</RetroMenuBarItem>
                  <RetroMenuBarItem>SimpleText Notes</RetroMenuBarItem>
                  <RetroMenuBarItem>Budget 1999</RetroMenuBarItem>
                </RetroMenuBarSubContent>
              </RetroMenuBarSub>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>
                Get Info <RetroMenuBarShortcut>⌘I</RetroMenuBarShortcut>
              </RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>

          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>View</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarCheckboxItem
                checked={showRulers}
                onCheckedChange={setShowRulers}
              >
                Show Rulers
              </RetroMenuBarCheckboxItem>
              <RetroMenuBarCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Show Status Bar
              </RetroMenuBarCheckboxItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarGroup>
                <RetroMenuBarLabel>Label</RetroMenuBarLabel>
                <RetroMenuBarRadioGroup
                  value={labelColor}
                  onValueChange={setLabelColor}
                >
                  <RetroMenuBarRadioItem value="none">None</RetroMenuBarRadioItem>
                  <RetroMenuBarRadioItem value="essential">
                    Essential
                  </RetroMenuBarRadioItem>
                  <RetroMenuBarRadioItem value="hot">Hot</RetroMenuBarRadioItem>
                </RetroMenuBarRadioGroup>
              </RetroMenuBarGroup>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>
        </RetroMenuBar>
      </section>
    </ComponentDocLayout>
  )
}
