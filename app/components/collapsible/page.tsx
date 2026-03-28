"use client"

import {
  RetroCollapsible,
  RetroCollapsibleTrigger,
  RetroCollapsibleContent,
} from "@/registry/new-york/ui/retro-collapsible"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function CollapsiblePreview() {
  return (
    <ComponentDocLayout
      name="retro-collapsible"
      title="RetroCollapsible"
      description="A disclosure widget with Mac OS 9 triangle toggle for expanding and collapsing content."
    >
      {/* Basic collapsible */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic</h2>
        <RetroCollapsible>
          <RetroCollapsibleTrigger>System Information</RetroCollapsibleTrigger>
          <RetroCollapsibleContent>
            <p className="pt-1">Mac OS 9.2.2</p>
            <p>PowerPC G3 &ndash; 400 MHz</p>
            <p>Built-in Memory: 256 MB</p>
          </RetroCollapsibleContent>
        </RetroCollapsible>
      </section>

      {/* Default open */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Default Open</h2>
        <RetroCollapsible defaultOpen>
          <RetroCollapsibleTrigger>Network Settings</RetroCollapsibleTrigger>
          <RetroCollapsibleContent>
            <p className="pt-1">TCP/IP: Ethernet</p>
            <p>IP Address: 192.168.1.42</p>
            <p>AppleTalk: Active</p>
          </RetroCollapsibleContent>
        </RetroCollapsible>
      </section>

      {/* Multiple nested */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Multiple Sections</h2>
        <div className="flex flex-col gap-2">
          <RetroCollapsible>
            <RetroCollapsibleTrigger>Extensions</RetroCollapsibleTrigger>
            <RetroCollapsibleContent>
              <p className="pt-1">AppleScript</p>
              <p>ColorSync</p>
              <p>OpenTransport</p>
            </RetroCollapsibleContent>
          </RetroCollapsible>

          <RetroCollapsible>
            <RetroCollapsibleTrigger>Control Panels</RetroCollapsibleTrigger>
            <RetroCollapsibleContent>
              <p className="pt-1">Appearance</p>
              <p>Date &amp; Time</p>
              <p>Sound</p>
              <p>Monitors</p>
            </RetroCollapsibleContent>
          </RetroCollapsible>

          <RetroCollapsible>
            <RetroCollapsibleTrigger>Startup Items</RetroCollapsibleTrigger>
            <RetroCollapsibleContent>
              <p className="pt-1">Finder</p>
              <p>Extensions Manager</p>
            </RetroCollapsibleContent>
          </RetroCollapsible>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click the disclosure triangle to expand or collapse each section.
      </p>
    </ComponentDocLayout>
  )
}
