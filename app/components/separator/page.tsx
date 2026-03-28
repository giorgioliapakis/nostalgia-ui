"use client"

import { RetroSeparator } from "@/registry/new-york/ui/retro-separator"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function SeparatorPreview() {
  return (
    <ComponentDocLayout
      name="retro-separator"
      title="RetroSeparator"
      description="A horizontal or vertical divider line with the classic Mac OS 9 beveled light-and-dark effect."
    >
      {/* Horizontal separator between text blocks */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Horizontal (default)</h2>
        <div className="w-full max-w-[400px]">
          <p className="text-[12px] mb-2">Content above the separator</p>
          <RetroSeparator />
          <p className="text-[12px] mt-2">Content below the separator</p>
        </div>
      </section>

      {/* Multiple horizontal separators */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Multiple Horizontal</h2>
        <div className="w-full max-w-[400px] space-y-3">
          <p className="text-[12px]">Section One</p>
          <RetroSeparator />
          <p className="text-[12px]">Section Two</p>
          <RetroSeparator />
          <p className="text-[12px]">Section Three</p>
        </div>
      </section>

      {/* Vertical separator between inline items */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Vertical</h2>
        <div className="flex items-center h-[24px] gap-3">
          <span className="text-[12px]">File</span>
          <RetroSeparator orientation="vertical" />
          <span className="text-[12px]">Edit</span>
          <RetroSeparator orientation="vertical" />
          <span className="text-[12px]">View</span>
          <RetroSeparator orientation="vertical" />
          <span className="text-[12px]">Help</span>
        </div>
      </section>

      {/* Full width horizontal */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Full Width</h2>
        <RetroSeparator />
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        The classic OS9 beveled line: dark pixel on top (or left), light pixel on bottom (or right).
      </p>
    </ComponentDocLayout>
  )
}
