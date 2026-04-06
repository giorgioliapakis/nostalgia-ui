"use client"

import {
  RetroResizablePanelGroup,
  RetroResizablePanel,
  RetroResizableHandle,
} from "@/registry/new-york/ui/retro-resizable"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function ResizablePreview() {
  return (
    <ComponentDocLayout
      name="retro-resizable"
      title="RetroResizable"
      description="Resizable panel layouts with Mac OS 9 styled drag handles and grip dot indicators."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        Resizable panel layouts with OS9-styled drag handles. Supports
        horizontal and vertical orientations with grip dot indicators. Built on
        react-resizable-panels.
      </p>

      {/* Horizontal */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Horizontal Layout</h2>
        <div className="w-[500px] h-[200px] border border-os9-black">
          <RetroResizablePanelGroup orientation="horizontal">
            <RetroResizablePanel defaultSize={30} minSize={15}>
              <div className="flex h-full items-center justify-center bg-os9-gray-300 p-4">
                <span className="os9-heading text-[10px]">Panel A</span>
              </div>
            </RetroResizablePanel>
            <RetroResizableHandle />
            <RetroResizablePanel defaultSize={70} minSize={20}>
              <div className="flex h-full items-center justify-center bg-os9-gray-200 p-4">
                <span className="os9-heading text-[10px]">Panel B</span>
              </div>
            </RetroResizablePanel>
          </RetroResizablePanelGroup>
        </div>
      </section>

      {/* Vertical */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Vertical Layout</h2>
        <div className="w-[400px] h-[300px] border border-os9-black">
          <RetroResizablePanelGroup orientation="vertical">
            <RetroResizablePanel defaultSize={40} minSize={15}>
              <div className="flex h-full items-center justify-center bg-os9-gray-300 p-4">
                <span className="os9-heading text-[10px]">Top Panel</span>
              </div>
            </RetroResizablePanel>
            <RetroResizableHandle />
            <RetroResizablePanel defaultSize={60} minSize={15}>
              <div className="flex h-full items-center justify-center bg-os9-gray-200 p-4">
                <span className="os9-heading text-[10px]">Bottom Panel</span>
              </div>
            </RetroResizablePanel>
          </RetroResizablePanelGroup>
        </div>
      </section>

      {/* Three panels */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Three-Panel Layout</h2>
        <div className="w-[600px] h-[200px] border border-os9-black">
          <RetroResizablePanelGroup orientation="horizontal">
            <RetroResizablePanel defaultSize={25} minSize={10}>
              <div className="flex h-full items-center justify-center bg-os9-lavender p-4">
                <span className="os9-heading text-[10px]">Sidebar</span>
              </div>
            </RetroResizablePanel>
            <RetroResizableHandle />
            <RetroResizablePanel defaultSize={50} minSize={20}>
              <div className="flex h-full items-center justify-center bg-os9-gray-200 p-4">
                <span className="os9-heading text-[10px]">Content</span>
              </div>
            </RetroResizablePanel>
            <RetroResizableHandle />
            <RetroResizablePanel defaultSize={25} minSize={10}>
              <div className="flex h-full items-center justify-center bg-os9-lavender p-4">
                <span className="os9-heading text-[10px]">Inspector</span>
              </div>
            </RetroResizablePanel>
          </RetroResizablePanelGroup>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Drag the handles between panels to resize. The grip dots indicate
        draggable areas. Handles darken when being dragged.
      </p>
    </ComponentDocLayout>
  )
}
