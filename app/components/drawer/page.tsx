"use client"

import {
  RetroDrawer,
  RetroDrawerTrigger,
  RetroDrawerContent,
  RetroDrawerHeader,
  RetroDrawerTitle,
  RetroDrawerDescription,
  RetroDrawerFooter,
  RetroDrawerClose,
} from "@/registry/new-york/ui/retro-drawer"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function DrawerPreview() {
  return (
    <ComponentDocLayout
      name="retro-drawer"
      title="RetroDrawer"
      description="A bottom drawer panel with Mac OS 9 styling that slides up from the screen edge."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A bottom drawer/sheet component with OS9 styling. Slides up from the
        bottom with a pull handle. Built on Vaul.
      </p>

      {/* Basic drawer */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic Drawer</h2>
        <RetroDrawer>
          <RetroDrawerTrigger asChild>
            <RetroButton>Open Drawer</RetroButton>
          </RetroDrawerTrigger>
          <RetroDrawerContent>
            <RetroDrawerHeader>
              <RetroDrawerTitle>System Information</RetroDrawerTitle>
              <RetroDrawerDescription>
                Details about your Macintosh and its current configuration.
              </RetroDrawerDescription>
            </RetroDrawerHeader>
            <div className="px-4 pb-2">
              <div className="space-y-1 text-[10px] font-[family-name:var(--font-sans)]">
                <p>
                  <strong>Computer:</strong> Power Macintosh G3
                </p>
                <p>
                  <strong>Memory:</strong> 256 MB
                </p>
                <p>
                  <strong>System:</strong> Mac OS 9.2.2
                </p>
                <p>
                  <strong>Virtual Memory:</strong> On
                </p>
              </div>
            </div>
            <RetroDrawerFooter>
              <RetroDrawerClose asChild>
                <RetroButton>OK</RetroButton>
              </RetroDrawerClose>
            </RetroDrawerFooter>
          </RetroDrawerContent>
        </RetroDrawer>
      </section>

      {/* Drawer with confirmation */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Confirmation Drawer</h2>
        <RetroDrawer>
          <RetroDrawerTrigger asChild>
            <RetroButton>Empty Trash</RetroButton>
          </RetroDrawerTrigger>
          <RetroDrawerContent>
            <RetroDrawerHeader>
              <RetroDrawerTitle>Empty Trash</RetroDrawerTitle>
              <RetroDrawerDescription>
                Are you sure you want to permanently remove all items in the
                Trash? This cannot be undone.
              </RetroDrawerDescription>
            </RetroDrawerHeader>
            <RetroDrawerFooter>
              <RetroDrawerClose asChild>
                <RetroButton>Cancel</RetroButton>
              </RetroDrawerClose>
              <RetroDrawerClose asChild>
                <RetroButton>OK</RetroButton>
              </RetroDrawerClose>
            </RetroDrawerFooter>
          </RetroDrawerContent>
        </RetroDrawer>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click a button to open the drawer. Drag the pull handle or click outside
        to dismiss. The drawer slides up from the bottom edge.
      </p>
    </ComponentDocLayout>
  )
}
