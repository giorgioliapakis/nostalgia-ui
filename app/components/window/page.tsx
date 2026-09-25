"use client"

import * as React from "react"

import { RetroWindow } from "@/registry/new-york/ui/retro-window"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const insetStyle: React.CSSProperties = {
  border: "1px solid var(--os9-black)",
  boxShadow:
    "inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white)",
}

export default function WindowPreview() {
  const [shaded, setShaded] = React.useState(false)
  const [size, setSize] = React.useState<{ width: number; height: number } | null>(null)
  const [pos, setPos] = React.useState({ x: 24, y: 24 })

  return (
    <ComponentDocLayout
      name="retro-window"
      title="RetroWindow"
      description="A window container with Mac OS 9 chrome, title bar with stripes, control boxes, window shade, resizable size box, footer slot and title-bar dragging."
    >
      {/* Active window */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Active Window</h2>
        <RetroWindow
          title="Macintosh HD"
          onClose={() => alert("Close clicked")}
          onCollapse={(e) => {
            // preventDefault() opts out of the built-in window shade
            e.preventDefault()
            alert("Collapse clicked")
          }}
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
            <p className="text-os9-gray-600 text-[12px] font-[family-name:var(--font-sans)]">
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
            <p className="text-os9-gray-600 text-[12px] font-[family-name:var(--font-sans)]">
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
            <p className="text-[11px] font-[family-name:var(--font-sans)] text-os9-black">
              This window is in the foreground and has full chrome with striped
              title bar regions.
            </p>
          </RetroWindow>

          <RetroWindow title="Background Window" active={false}>
            <p className="text-[11px] font-[family-name:var(--font-sans)] text-os9-black">
              This window is in the background. The title bar has no stripes and
              control boxes are hidden.
            </p>
          </RetroWindow>
        </div>
      </section>

      {/* Window shade */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">Window Shade</h2>
        <p className="text-os9-gray-700 text-[10px] mb-3">
          Click the collapse box (far right) or double-click the title bar to
          roll the window up to just its title bar. Controlled via{" "}
          <code className="font-mono">collapsed</code> /{" "}
          <code className="font-mono">onCollapsedChange</code>, or uncontrolled
          with <code className="font-mono">defaultCollapsed</code>.
        </p>
        <RetroWindow
          title="Control Panels"
          collapsed={shaded}
          onCollapsedChange={setShaded}
          className="max-w-[480px]"
        >
          <div className="bg-os9-white h-[120px] flex items-center justify-center" style={insetStyle}>
            <p className="text-os9-gray-600 text-[12px] font-[family-name:var(--font-sans)]">
              31 items, 4.5 GB available
            </p>
          </div>
        </RetroWindow>
        <p className="mt-2 text-os9-gray-700 text-[10px]">
          State: {shaded ? "collapsed" : "expanded"}
        </p>
      </section>

      {/* Resizable + footer */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">Resizable with Footer</h2>
        <p className="text-os9-gray-700 text-[10px] mb-3">
          Drag the size box in the bottom-right corner. The{" "}
          <code className="font-mono">footer</code> slot holds placards or a
          horizontal scrollbar and sits beside the size box.
        </p>
        <div className="h-[320px]">
          <RetroWindow
            title="Documents"
            resizable
            minWidth={200}
            minHeight={120}
            onResize={setSize}
            className="h-[200px] w-[360px]"
            contentClassName="p-0"
            footer={
              <div className="flex h-[15px] items-center px-[6px] font-[family-name:var(--font-sans)] text-[9px] text-os9-black bg-os9-gray-300 shadow-[var(--os9-shadow-raised)]">
                12 items, 4.5 GB available
              </div>
            }
          >
            <div className="h-full bg-os9-white p-2 text-[10px] font-[family-name:var(--font-sans)]">
              {size ? `${size.width} × ${size.height}` : "Drag the size box →"}
            </div>
          </RetroWindow>
        </div>
      </section>

      {/* Draggable */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">Draggable</h2>
        <p className="text-os9-gray-700 text-[10px] mb-3">
          Drag the title bar to move the window. Position is applied as a
          translate transform.
        </p>
        <div className="relative h-[240px] max-w-[560px] overflow-hidden border border-os9-black bg-os9-gray-400">
          <RetroWindow
            title="Drag Me"
            draggable
            resizable
            defaultPosition={{ x: 24, y: 24 }}
            onPositionChange={setPos}
            className="absolute left-0 top-0 w-[240px]"
          >
            <p className="text-[10px] font-[family-name:var(--font-sans)] text-os9-black">
              Offset: {pos.x}, {pos.y}
            </p>
          </RetroWindow>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click close, collapse, or zoom boxes on the active windows to test
        handlers.
      </p>
    </ComponentDocLayout>
  )
}
