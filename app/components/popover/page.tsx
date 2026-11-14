"use client"

import {
  RetroPopover,
  RetroPopoverTrigger,
  RetroPopoverContent,
  RetroPopoverClose,
} from "@/registry/new-york/ui/retro-popover"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function PopoverPreview() {
  return (
    <ComponentDocLayout
      name="retro-popover"
      title="RetroPopover"
      description="A click-triggered popup panel with Mac OS 9 raised bevel for forms and information."
    >
      {/* Popover with form content */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Form Content</h2>
        <RetroPopover>
          <RetroPopoverTrigger render={<RetroButton />}>Edit Name</RetroPopoverTrigger>
          <RetroPopoverContent className="w-[240px]">
            <div className="flex flex-col gap-2">
              <label className="os9-heading text-[12px]">First Name</label>
              <RetroInput placeholder="Woz" />
              <label className="os9-heading text-[12px] mt-1">Last Name</label>
              <RetroInput placeholder="Wozniak" />
              <div className="flex justify-end gap-2 mt-2">
                <RetroPopoverClose render={<RetroButton variant="default" size="sm" />}>
                  Cancel
                </RetroPopoverClose>
                <RetroPopoverClose render={<RetroButton variant="default" size="sm" />}>
                  Save
                </RetroPopoverClose>
              </div>
            </div>
          </RetroPopoverContent>
        </RetroPopover>
      </section>

      {/* Simple popover */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Simple Info Popover</h2>
        <RetroPopover>
          <RetroPopoverTrigger render={<RetroButton />}>About This Mac</RetroPopoverTrigger>
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
        Click a button and the popover grows out of it. Click outside or press
        Escape to close. With classic flair or reduced motion it appears at once.
      </p>
    </ComponentDocLayout>
  )
}
