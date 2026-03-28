"use client"

import { RetroWindow } from "@/registry/new-york/ui/retro-window"

export default function WindowPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroWindow Preview</h1>

      {/* Active window */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Active Window</h2>
        <RetroWindow
          title="Macintosh HD"
          onClose={() => alert("Close clicked")}
          onCollapse={() => alert("Collapse clicked")}
          onZoom={() => alert("Zoom clicked")}
          className="max-w-[480px]"
        >
          <div
            className="bg-os9-white h-[200px] flex items-center justify-center"
            style={{
              border: "1px solid var(--os9-black)",
              boxShadow:
                "inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white)",
            }}
          >
            <p className="text-os9-gray-600 text-[12px] font-[family-name:var(--font-body)]">
              22 items, 4.5 GB available
            </p>
          </div>
        </RetroWindow>
      </section>

      {/* Inactive window */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Inactive / Background Window</h2>
        <RetroWindow
          title="Applications"
          active={false}
          className="max-w-[480px]"
        >
          <div
            className="bg-os9-white h-[200px] flex items-center justify-center"
            style={{
              border: "1px solid var(--os9-black)",
              boxShadow:
                "inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white)",
            }}
          >
            <p className="text-os9-gray-600 text-[12px] font-[family-name:var(--font-body)]">
              14 items, 2.1 GB available
            </p>
          </div>
        </RetroWindow>
      </section>

      {/* Side-by-side comparison */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Active vs Inactive</h2>
        <div className="flex flex-col gap-4 max-w-[480px]">
          <RetroWindow title="Active Window" active>
            <p className="text-[11px] font-[family-name:var(--font-body)] text-os9-black">
              This window is in the foreground and has full chrome with striped
              title bar regions.
            </p>
          </RetroWindow>

          <RetroWindow title="Background Window" active={false}>
            <p className="text-[11px] font-[family-name:var(--font-body)] text-os9-black">
              This window is in the background. The title bar has no stripes and
              control boxes are hidden.
            </p>
          </RetroWindow>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click close, collapse, or zoom boxes on the active windows to test
        handlers.
      </p>
    </main>
  )
}
