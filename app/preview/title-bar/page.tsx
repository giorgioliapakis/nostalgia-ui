"use client"

import { RetroTitleBar } from "@/registry/new-york/ui/retro-title-bar"

export default function TitleBarPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroTitleBar Preview</h1>

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
    </main>
  )
}
