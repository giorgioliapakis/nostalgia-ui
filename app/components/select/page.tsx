import type { Metadata } from "next"
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
import { ComponentDocLayout } from "../_components/component-doc-layout"

export const metadata: Metadata = {
  title: "Select",
  description:
    "A dropdown select control with Mac OS 9 beveled trigger and azul highlight on items.",
}

export default function SelectPreview() {
  return (
    <ComponentDocLayout
      name="retro-select"
      title="RetroSelect"
      description="A dropdown select control with Mac OS 9 beveled trigger and azul highlight on items."
    >
      {/* Basic select */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic Select</h2>
        <div className="flex items-center gap-3">
          <label id="select-demo-1" className="os9-heading text-[12px] text-right shrink-0">
            Category:
          </label>
          <div className="w-[178px]">
            <RetroSelect defaultValue="platinum">
              <RetroSelectTrigger aria-labelledby="select-demo-1">
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
          <label id="select-demo-2" className="os9-heading text-[12px] text-right shrink-0">
            View:
          </label>
          <div className="w-[178px]">
            <RetroSelect>
              <RetroSelectTrigger aria-labelledby="select-demo-2">
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
          <label id="select-demo-3" className="os9-heading text-[12px] text-right shrink-0">
            Font:
          </label>
          <div className="w-[200px]">
            <RetroSelect defaultValue="geneva">
              <RetroSelectTrigger aria-labelledby="select-demo-3">
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
          <label id="select-demo-4" className="os9-heading text-[12px] text-right shrink-0 opacity-50">
            Size:
          </label>
          <div className="w-[178px]">
            <RetroSelect defaultValue="medium" disabled>
              <RetroSelectTrigger aria-labelledby="select-demo-4">
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

      {/* Item-aligned */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Item-aligned Pop-up</h2>
        <div className="flex items-center gap-3">
          <label id="select-demo-5" className="os9-heading text-[12px] text-right shrink-0">
            Speed:
          </label>
          <div className="w-[178px]">
            <RetroSelect defaultValue="normal">
              <RetroSelectTrigger aria-labelledby="select-demo-5">
                <RetroSelectValue />
              </RetroSelectTrigger>
              <RetroSelectContent position="item-aligned">
                <RetroSelectItem value="slow">Slow</RetroSelectItem>
                <RetroSelectItem value="normal">Normal</RetroSelectItem>
                <RetroSelectItem value="fast">Fast</RetroSelectItem>
              </RetroSelectContent>
            </RetroSelect>
          </div>
        </div>
        <p className="text-os9-gray-700 text-[9px] mt-2">
          <code>position=&quot;item-aligned&quot;</code> opens the list over the
          trigger with the chosen item in place, like a classic pop-up menu.
        </p>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Built on UI SDK&apos;s Select. Click any select to open the list, or
        focus it and press Space or an arrow key; type to jump to an item. The
        azul highlight glides between items as you move.
      </p>
    </ComponentDocLayout>
  )
}
