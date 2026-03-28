"use client"

import {
  RetroDialog,
  RetroDialogTrigger,
  RetroDialogContent,
  RetroDialogHeader,
  RetroDialogTitle,
  RetroDialogDescription,
  RetroDialogFooter,
  RetroDialogClose,
} from "@/registry/new-york/ui/retro-dialog"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function DialogPreview() {
  return (
    <ComponentDocLayout
      name="retro-dialog"
      title="RetroDialog"
      description="A modal dialog window with Mac OS 9 chrome, title bar, and close box."
    >
      {/* Basic dialog */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic Dialog</h2>
        <RetroDialog>
          <RetroDialogTrigger asChild>
            <RetroButton>Open Dialog</RetroButton>
          </RetroDialogTrigger>
          <RetroDialogContent>
            <RetroDialogHeader>
              <RetroDialogTitle>About This Mac</RetroDialogTitle>
            </RetroDialogHeader>
            <div className="p-4">
              <RetroDialogDescription>
                Mac OS 9.2.2 &mdash; Built-in Memory: 256 MB. Virtual Memory is
                on. Largest Unused Block: 180 MB.
              </RetroDialogDescription>
              <RetroDialogFooter className="mt-4">
                <RetroDialogClose asChild>
                  <RetroButton variant="default" size="sm">
                    OK
                  </RetroButton>
                </RetroDialogClose>
              </RetroDialogFooter>
            </div>
          </RetroDialogContent>
        </RetroDialog>
      </section>

      {/* Confirmation dialog */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Confirmation Dialog</h2>
        <RetroDialog>
          <RetroDialogTrigger asChild>
            <RetroButton>Empty Trash</RetroButton>
          </RetroDialogTrigger>
          <RetroDialogContent>
            <RetroDialogHeader>
              <RetroDialogTitle>Empty Trash</RetroDialogTitle>
            </RetroDialogHeader>
            <div className="p-4">
              <RetroDialogDescription>
                Are you sure you want to permanently remove the items in the
                Trash? This action cannot be undone.
              </RetroDialogDescription>
              <RetroDialogFooter className="mt-4">
                <RetroDialogClose asChild>
                  <RetroButton variant="default" size="sm">
                    Cancel
                  </RetroButton>
                </RetroDialogClose>
                <RetroDialogClose asChild>
                  <RetroButton variant="default" size="sm">
                    OK
                  </RetroButton>
                </RetroDialogClose>
              </RetroDialogFooter>
            </div>
          </RetroDialogContent>
        </RetroDialog>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click a button to open the dialog. Click the close box, press Escape,
        or click outside to dismiss.
      </p>
    </ComponentDocLayout>
  )
}
