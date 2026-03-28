"use client"

import { RetroTitleBar } from "@/registry/new-york/ui/retro-title-bar"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function TitleBarPreview() {
  return (
    <ComponentDocLayout
      name="retro-title-bar"
      title="RetroTitleBar"
      description="A window title bar with Mac OS 9 striped regions, close box, collapse, and zoom controls."
    >
      {/* Active title bar */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Active Window</h2>
        <div className="flex flex-col gap-4">
          <RetroTitleBar
            title="Untitled"
            onClose={() => alert("Close clicked")}
            onCollapse={() => alert("Collapse clicked")}
            onZoom={() => alert("Zoom clicked")}
          />
          <RetroTitleBar title="Macintosh HD" />
          <RetroTitleBar title="SimpleText — My Document.txt" />
        </div>
      </section>

      {/* Inactive title bar */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Inactive Window</h2>
        <div className="flex flex-col gap-4">
          <RetroTitleBar title="Untitled" active={false} />
          <RetroTitleBar title="Macintosh HD" active={false} />
          <RetroTitleBar title="SimpleText — My Document.txt" active={false} />
        </div>
      </section>

      {/* Long title (ellipsis test) */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Long Title (Ellipsis)</h2>
        <div className="max-w-[300px]">
          <RetroTitleBar title="This Is an Extremely Long Window Title That Should Truncate Gracefully" />
        </div>
      </section>

      {/* Side-by-side comparison */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Active vs Inactive</h2>
        <div className="flex flex-col gap-2">
          <RetroTitleBar title="Active Window" active />
          <RetroTitleBar title="Background Window" active={false} />
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click close, collapse, or zoom boxes on the active title bars to test
        handlers.
      </p>
    </ComponentDocLayout>
  )
}
