"use client"

import {
  RetroSelect,
  RetroSelectTrigger,
  RetroSelectContent,
  RetroSelectItem,
  RetroSelectValue,
  RetroSelectSeparator,
  RetroSelectGroup,
  RetroSelectLabel,
} from "@/registry/new-york/ui/retro-select"

export default function SelectPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroSelect Preview</h1>

      {/* Basic select */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic Select</h2>
        <div className="flex items-center gap-3">
          <label className="os9-heading text-[12px] text-right shrink-0">
            Category:
          </label>
          <div className="w-[178px]">
            <RetroSelect defaultValue="platinum">
              <RetroSelectTrigger>
                <RetroSelectValue placeholder="Choose..." />
              </RetroSelectTrigger>
              <RetroSelectContent>
                <RetroSelectItem value="platinum">
                  Apple Platinum
                </RetroSelectItem>
                <RetroSelectItem value="graphite">Graphite</RetroSelectItem>
                <RetroSelectItem value="blue">Blue</RetroSelectItem>
                <RetroSelectItem value="green">Green</RetroSelectItem>
                <RetroSelectItem value="red">Red</RetroSelectItem>
              </RetroSelectContent>
            </RetroSelect>
          </div>
        </div>
      </section>

      {/* With placeholder */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Placeholder</h2>
        <div className="flex items-center gap-3">
          <label className="os9-heading text-[12px] text-right shrink-0">
            View:
          </label>
          <div className="w-[178px]">
            <RetroSelect>
              <RetroSelectTrigger>
                <RetroSelectValue placeholder="Select a view..." />
              </RetroSelectTrigger>
              <RetroSelectContent>
                <RetroSelectItem value="icons">as Icons</RetroSelectItem>
                <RetroSelectItem value="buttons">as Buttons</RetroSelectItem>
                <RetroSelectItem value="list">as List</RetroSelectItem>
                <RetroSelectSeparator />
                <RetroSelectItem value="window">as Window</RetroSelectItem>
                <RetroSelectItem value="popup">
                  as Pop-up Window
                </RetroSelectItem>
              </RetroSelectContent>
            </RetroSelect>
          </div>
        </div>
      </section>

      {/* With groups */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Grouped Options</h2>
        <div className="flex items-center gap-3">
          <label className="os9-heading text-[12px] text-right shrink-0">
            Font:
          </label>
          <div className="w-[200px]">
            <RetroSelect defaultValue="geneva">
              <RetroSelectTrigger>
                <RetroSelectValue />
              </RetroSelectTrigger>
              <RetroSelectContent>
                <RetroSelectGroup>
                  <RetroSelectLabel>System Fonts</RetroSelectLabel>
                  <RetroSelectItem value="charcoal">Charcoal</RetroSelectItem>
                  <RetroSelectItem value="chicago">Chicago</RetroSelectItem>
                  <RetroSelectItem value="geneva">Geneva</RetroSelectItem>
                  <RetroSelectItem value="monaco">Monaco</RetroSelectItem>
                </RetroSelectGroup>
                <RetroSelectSeparator />
                <RetroSelectGroup>
                  <RetroSelectLabel>Classic Fonts</RetroSelectLabel>
                  <RetroSelectItem value="courier">Courier</RetroSelectItem>
                  <RetroSelectItem value="helvetica">Helvetica</RetroSelectItem>
                  <RetroSelectItem value="times">
                    Times New Roman
                  </RetroSelectItem>
                </RetroSelectGroup>
              </RetroSelectContent>
            </RetroSelect>
          </div>
        </div>
      </section>

      {/* Disabled */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <div className="flex items-center gap-3">
          <label className="os9-heading text-[12px] text-right shrink-0 opacity-50">
            Size:
          </label>
          <div className="w-[178px]">
            <RetroSelect defaultValue="medium" disabled>
              <RetroSelectTrigger>
                <RetroSelectValue />
              </RetroSelectTrigger>
              <RetroSelectContent>
                <RetroSelectItem value="small">Small</RetroSelectItem>
                <RetroSelectItem value="medium">Medium</RetroSelectItem>
                <RetroSelectItem value="large">Large</RetroSelectItem>
              </RetroSelectContent>
            </RetroSelect>
          </div>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click any select to open the dropdown. Hover items to see the azul
        highlight.
      </p>
    </main>
  )
}
