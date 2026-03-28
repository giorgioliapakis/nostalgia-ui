"use client"

import {
  RetroPopover,
  RetroPopoverTrigger,
  RetroPopoverContent,
} from "@/registry/new-york/ui/retro-popover"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroInput } from "@/registry/new-york/ui/retro-input"

export default function PopoverPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroPopover Preview</h1>

      {/* Popover with form content */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Form Content</h2>
        <RetroPopover>
          <RetroPopoverTrigger asChild>
            <RetroButton>Edit Name</RetroButton>
          </RetroPopoverTrigger>
          <RetroPopoverContent className="w-[240px]">
            <div className="flex flex-col gap-2">
              <label className="os9-heading text-[12px]">First Name</label>
              <RetroInput placeholder="Woz" />
              <label className="os9-heading text-[12px] mt-1">Last Name</label>
              <RetroInput placeholder="Wozniak" />
              <div className="flex justify-end gap-2 mt-2">
                <RetroButton variant="default" size="sm">
                  Cancel
                </RetroButton>
                <RetroButton variant="default" size="sm">
                  Save
                </RetroButton>
              </div>
            </div>
          </RetroPopoverContent>
        </RetroPopover>
      </section>

      {/* Simple popover */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Simple Info Popover</h2>
        <RetroPopover>
          <RetroPopoverTrigger asChild>
            <RetroButton>About This Mac</RetroButton>
          </RetroPopoverTrigger>
          <RetroPopoverContent className="w-[200px]">
            <p className="os9-heading text-[12px] mb-1">Mac OS 9.2.2</p>
            <p className="text-[11px] text-os9-gray-700">
              Built-in Memory: 256 MB
            </p>
            <p className="text-[11px] text-os9-gray-700">
              Virtual Memory: 512 MB
            </p>
          </RetroPopoverContent>
        </RetroPopover>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click a button to open the popover. Click outside or press Escape to
        close.
      </p>
    </main>
  )
}
