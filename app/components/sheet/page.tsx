"use client"

import {
  RetroSheet,
  RetroSheetTrigger,
  RetroSheetContent,
  RetroSheetHeader,
  RetroSheetTitle,
  RetroSheetDescription,
  RetroSheetFooter,
  RetroSheetClose,
} from "@/registry/new-york/ui/retro-sheet"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function SheetPreview() {
  return (
    <ComponentDocLayout
      name="retro-sheet"
      title="RetroSheet"
      description="A slide-in panel from any screen edge with Mac OS 9 window chrome and bevel styling."
    >
      {/* Right side (default) */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Right (default)</h2>
        <RetroSheet>
          <RetroSheetTrigger asChild>
            <RetroButton>Open Right Sheet</RetroButton>
          </RetroSheetTrigger>
          <RetroSheetContent side="right">
            <RetroSheetHeader>
              <RetroSheetTitle>Edit Profile</RetroSheetTitle>
            </RetroSheetHeader>
            <div className="flex flex-col gap-3 px-[16px] py-[16px]">
              <RetroSheetDescription>
                Make changes to your profile here. Click save when you are done.
              </RetroSheetDescription>
              <div className="flex flex-col gap-1">
                <RetroLabel>Name</RetroLabel>
                <RetroInput defaultValue="Woz" />
              </div>
              <div className="flex flex-col gap-1">
                <RetroLabel>Username</RetroLabel>
                <RetroInput defaultValue="@woz" />
              </div>
            </div>
            <RetroSheetFooter>
              <RetroSheetClose asChild>
                <RetroButton variant="default" size="sm">
                  Cancel
                </RetroButton>
              </RetroSheetClose>
              <RetroSheetClose asChild>
                <RetroButton variant="default" size="sm">
                  Save Changes
                </RetroButton>
              </RetroSheetClose>
            </RetroSheetFooter>
          </RetroSheetContent>
        </RetroSheet>
      </section>

      {/* Left side */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Left</h2>
        <RetroSheet>
          <RetroSheetTrigger asChild>
            <RetroButton>Open Left Sheet</RetroButton>
          </RetroSheetTrigger>
          <RetroSheetContent side="left">
            <RetroSheetHeader>
              <RetroSheetTitle>Navigation</RetroSheetTitle>
            </RetroSheetHeader>
            <nav className="flex flex-col gap-2 px-[16px] py-[16px]">
              <RetroSheetDescription>
                Browse the Finder file system.
              </RetroSheetDescription>
              <p className="font-[family-name:var(--font-sans)] text-[10px]">
                Macintosh HD
              </p>
              <p className="font-[family-name:var(--font-sans)] text-[10px] pl-3">
                Applications
              </p>
              <p className="font-[family-name:var(--font-sans)] text-[10px] pl-3">
                System Folder
              </p>
              <p className="font-[family-name:var(--font-sans)] text-[10px] pl-3">
                Documents
              </p>
              <p className="font-[family-name:var(--font-sans)] text-[10px] pl-3">
                Desktop
              </p>
            </nav>
            <RetroSheetFooter>
              <RetroSheetClose asChild>
                <RetroButton variant="default" size="sm">
                  Close
                </RetroButton>
              </RetroSheetClose>
            </RetroSheetFooter>
          </RetroSheetContent>
        </RetroSheet>
      </section>

      {/* Top side */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Top</h2>
        <RetroSheet>
          <RetroSheetTrigger asChild>
            <RetroButton>Open Top Sheet</RetroButton>
          </RetroSheetTrigger>
          <RetroSheetContent side="top">
            <RetroSheetHeader>
              <RetroSheetTitle>System Notification</RetroSheetTitle>
            </RetroSheetHeader>
            <div className="px-[16px] py-[16px]">
              <RetroSheetDescription>
                A new version of the system software is available. Would you like
                to update now?
              </RetroSheetDescription>
            </div>
            <RetroSheetFooter>
              <RetroSheetClose asChild>
                <RetroButton variant="default" size="sm">
                  Not Now
                </RetroButton>
              </RetroSheetClose>
              <RetroSheetClose asChild>
                <RetroButton variant="default" size="sm">
                  Update
                </RetroButton>
              </RetroSheetClose>
            </RetroSheetFooter>
          </RetroSheetContent>
        </RetroSheet>
      </section>

      {/* Bottom side */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Bottom</h2>
        <RetroSheet>
          <RetroSheetTrigger asChild>
            <RetroButton>Open Bottom Sheet</RetroButton>
          </RetroSheetTrigger>
          <RetroSheetContent side="bottom">
            <RetroSheetHeader>
              <RetroSheetTitle>Disk Info</RetroSheetTitle>
            </RetroSheetHeader>
            <div className="px-[16px] py-[16px]">
              <RetroSheetDescription>
                Macintosh HD &mdash; 20 GB capacity, 8.4 GB available.
              </RetroSheetDescription>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex-1 h-[12px] border border-os9-black bg-os9-white">
                  <div
                    className="h-full bg-os9-azul"
                    style={{ width: "58%" }}
                  />
                </div>
                <span className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-800 shrink-0">
                  58% used
                </span>
              </div>
            </div>
            <RetroSheetFooter>
              <RetroSheetClose asChild>
                <RetroButton variant="default" size="sm">
                  OK
                </RetroButton>
              </RetroSheetClose>
            </RetroSheetFooter>
          </RetroSheetContent>
        </RetroSheet>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click a button to open a sheet from each edge. Click outside, press
        Escape, or use the close box to dismiss.
      </p>
    </ComponentDocLayout>
  )
}
