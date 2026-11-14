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
        A bottom drawer with OS9 styling. It rises from the bottom edge and
        follows your pointer: drag the sheet down and let go to dismiss it, or
        release early and it springs back. Built on UI SDK&apos;s drawer.
      </p>

      {/* Basic drawer */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic Drawer</h2>
        <RetroDrawer>
          <RetroDrawerTrigger render={<RetroButton />}>Open Drawer</RetroDrawerTrigger>
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
              <RetroDrawerClose render={<RetroButton />}>OK</RetroDrawerClose>
            </RetroDrawerFooter>
          </RetroDrawerContent>
        </RetroDrawer>
      </section>

      {/* Drawer with confirmation */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Confirmation Drawer</h2>
        <RetroDrawer>
          <RetroDrawerTrigger render={<RetroButton />}>Empty Trash</RetroDrawerTrigger>
          <RetroDrawerContent>
            <RetroDrawerHeader>
              <RetroDrawerTitle>Empty Trash</RetroDrawerTitle>
              <RetroDrawerDescription>
                Are you sure you want to permanently remove all items in the
                Trash? This cannot be undone.
              </RetroDrawerDescription>
            </RetroDrawerHeader>
            <RetroDrawerFooter>
              <RetroDrawerClose render={<RetroButton />}>Cancel</RetroDrawerClose>
              <RetroDrawerClose render={<RetroButton />}>OK</RetroDrawerClose>
            </RetroDrawerFooter>
          </RetroDrawerContent>
        </RetroDrawer>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click a button to open the drawer. Drag it down, click outside, or press
        Escape to dismiss.
      </p>
    </ComponentDocLayout>
  )
}
