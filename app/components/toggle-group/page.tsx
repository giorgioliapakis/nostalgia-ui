"use client"

import { useState } from "react"
import {
  RetroToggleGroup,
  RetroToggleGroupItem,
} from "@/registry/new-york/ui/retro-toggle-group"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function ToggleGroupPreview() {
  const [align, setAlign] = useState("left")
  const [formats, setFormats] = useState<string[]>(["bold"])

  return (
    <ComponentDocLayout
      name="retro-toggle-group"
      title="RetroToggleGroup"
      description="A group of toggle buttons with Mac OS 9 bevel in single or multiple selection modes."
    >
      {/* Single select */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Single Select (Alignment)
        </h2>
        <RetroToggleGroup
          type="single"
          value={align}
          onValueChange={(v) => {
            if (v) setAlign(v)
          }}
        >
          <RetroToggleGroupItem value="left">Left</RetroToggleGroupItem>
          <RetroToggleGroupItem value="center">Center</RetroToggleGroupItem>
          <RetroToggleGroupItem value="right">Right</RetroToggleGroupItem>
        </RetroToggleGroup>
        <p className="text-os9-gray-700 text-[10px] mt-2">
          Selected: {align}
        </p>
      </section>

      {/* Multi select */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Multi Select (Text Formatting)
        </h2>
        <RetroToggleGroup
          type="multiple"
          value={formats}
          onValueChange={setFormats}
        >
          <RetroToggleGroupItem value="bold">B</RetroToggleGroupItem>
          <RetroToggleGroupItem value="italic">I</RetroToggleGroupItem>
          <RetroToggleGroupItem value="underline">U</RetroToggleGroupItem>
          <RetroToggleGroupItem value="strike">S</RetroToggleGroupItem>
        </RetroToggleGroup>
        <p className="text-os9-gray-700 text-[10px] mt-2">
          Active: {formats.length > 0 ? formats.join(", ") : "none"}
        </p>
      </section>

      {/* Size variants */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Size Comparison</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-os9-gray-700 text-[10px] w-[50px]">sm</span>
            <RetroToggleGroup type="single" defaultValue="a" size="sm">
              <RetroToggleGroupItem value="a">One</RetroToggleGroupItem>
              <RetroToggleGroupItem value="b">Two</RetroToggleGroupItem>
              <RetroToggleGroupItem value="c">Three</RetroToggleGroupItem>
            </RetroToggleGroup>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-os9-gray-700 text-[10px] w-[50px]">
              default
            </span>
            <RetroToggleGroup type="single" defaultValue="a">
              <RetroToggleGroupItem value="a">One</RetroToggleGroupItem>
              <RetroToggleGroupItem value="b">Two</RetroToggleGroupItem>
              <RetroToggleGroupItem value="c">Three</RetroToggleGroupItem>
            </RetroToggleGroup>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-os9-gray-700 text-[10px] w-[50px]">lg</span>
            <RetroToggleGroup type="single" defaultValue="a" size="lg">
              <RetroToggleGroupItem value="a">One</RetroToggleGroupItem>
              <RetroToggleGroupItem value="b">Two</RetroToggleGroupItem>
              <RetroToggleGroupItem value="c">Three</RetroToggleGroupItem>
            </RetroToggleGroup>
          </div>
        </div>
      </section>

      {/* Disabled */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <RetroToggleGroup type="single" defaultValue="a" disabled>
          <RetroToggleGroupItem value="a">On</RetroToggleGroupItem>
          <RetroToggleGroupItem value="b">Off</RetroToggleGroupItem>
        </RetroToggleGroup>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click items to toggle. Single mode allows one active item; multiple mode
        allows many.
      </p>
    </ComponentDocLayout>
  )
}
