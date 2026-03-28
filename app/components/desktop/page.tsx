"use client"

import * as React from "react"
import {
  RetroDesktop,
  RetroDesktopMenuBar,
  RetroDesktopArea,
  RetroDesktopIcon,
} from "@/registry/new-york/ui/retro-desktop"
import { RetroIconHardDrive, RetroIconFolder, RetroIconTrash } from "@/registry/new-york/ui/retro-icons"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function DesktopPreview() {
  const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null)

  return (
    <ComponentDocLayout
      name="retro-desktop"
      title="RetroDesktop"
      description="A full Mac OS 9 desktop environment with menu bar, icon area, and selectable desktop icons."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A full desktop environment with menu bar, icon area, and desktop icons.
        Displayed in a fixed-size container below rather than taking the full
        viewport.
      </p>

      {/* Desktop in fixed container */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Desktop Environment</h2>
        <div
          style={{ width: 500, height: 350, position: "relative" }}
          className="border border-os9-black overflow-hidden"
        >
          <RetroDesktop className="!h-full !w-full">
            <RetroDesktopMenuBar>
              <span className="font-bold">File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Special</span>
              <span>Help</span>
            </RetroDesktopMenuBar>
            <RetroDesktopArea wallpaper="pattern">
              <div className="flex flex-col items-end gap-2 p-4">
                <RetroDesktopIcon
                  icon={<RetroIconHardDrive size="default" />}
                  label="Macintosh HD"
                  selected={selectedIcon === "hd"}
                  onSelect={() => setSelectedIcon("hd")}
                />
                <RetroDesktopIcon
                  icon={<RetroIconFolder size="default" />}
                  label="Documents"
                  selected={selectedIcon === "docs"}
                  onSelect={() => setSelectedIcon("docs")}
                />
                <RetroDesktopIcon
                  icon={<RetroIconTrash size="default" />}
                  label="Trash"
                  selected={selectedIcon === "trash"}
                  onSelect={() => setSelectedIcon("trash")}
                />
              </div>
            </RetroDesktopArea>
          </RetroDesktop>
        </div>
      </section>

      {/* Pattern wallpaper vs default */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Wallpaper Variants
        </h2>
        <div className="flex gap-4">
          <div>
            <p className="text-os9-gray-700 text-[9px] mb-1">Default</p>
            <div
              style={{ width: 200, height: 120, position: "relative" }}
              className="border border-os9-black overflow-hidden"
            >
              <RetroDesktop className="!h-full !w-full">
                <RetroDesktopMenuBar showClock={false}>
                  <span className="font-bold">File</span>
                </RetroDesktopMenuBar>
                <RetroDesktopArea wallpaper="default" />
              </RetroDesktop>
            </div>
          </div>
          <div>
            <p className="text-os9-gray-700 text-[9px] mb-1">Pattern</p>
            <div
              style={{ width: 200, height: 120, position: "relative" }}
              className="border border-os9-black overflow-hidden"
            >
              <RetroDesktop className="!h-full !w-full">
                <RetroDesktopMenuBar showClock={false}>
                  <span className="font-bold">File</span>
                </RetroDesktopMenuBar>
                <RetroDesktopArea wallpaper="pattern" />
              </RetroDesktop>
            </div>
          </div>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click icons to select them. The menu bar includes an Apple logo and a
        live clock. The desktop area supports default and pattern wallpapers.
      </p>
    </ComponentDocLayout>
  )
}
