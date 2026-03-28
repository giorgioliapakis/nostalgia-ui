"use client"

import {
  RetroAlertDialog,
  RetroAlertDialogTrigger,
  RetroAlertDialogContent,
  RetroAlertDialogHeader,
  RetroAlertDialogTitle,
  RetroAlertDialogDescription,
  RetroAlertDialogBody,
  RetroAlertDialogFooter,
  RetroAlertDialogAction,
  RetroAlertDialogCancel,
} from "@/registry/new-york/ui/retro-alert-dialog"
import { RetroButton } from "@/registry/new-york/ui/retro-button"

export default function AlertDialogPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">
        RetroAlertDialog Preview
      </h1>

      {/* "Are you sure?" confirmation */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Confirmation Dialog</h2>
        <RetroAlertDialog>
          <RetroAlertDialogTrigger asChild>
            <RetroButton>Move to Trash</RetroButton>
          </RetroAlertDialogTrigger>
          <RetroAlertDialogContent>
            <RetroAlertDialogHeader>
              <RetroAlertDialogTitle>Confirm</RetroAlertDialogTitle>
            </RetroAlertDialogHeader>
            <RetroAlertDialogBody>
              <RetroAlertDialogDescription>
                Are you sure you want to move &ldquo;Important Document&rdquo;
                to the Trash? This action cannot be undone.
              </RetroAlertDialogDescription>
            </RetroAlertDialogBody>
            <RetroAlertDialogFooter>
              <RetroAlertDialogCancel>Cancel</RetroAlertDialogCancel>
              <RetroAlertDialogAction>OK</RetroAlertDialogAction>
            </RetroAlertDialogFooter>
          </RetroAlertDialogContent>
        </RetroAlertDialog>
      </section>

      {/* Disk erase warning */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Destructive Action</h2>
        <RetroAlertDialog>
          <RetroAlertDialogTrigger asChild>
            <RetroButton>Erase Disk</RetroButton>
          </RetroAlertDialogTrigger>
          <RetroAlertDialogContent>
            <RetroAlertDialogHeader>
              <RetroAlertDialogTitle>Warning</RetroAlertDialogTitle>
            </RetroAlertDialogHeader>
            <RetroAlertDialogBody>
              <RetroAlertDialogDescription>
                Completely erase disk &ldquo;Macintosh HD&rdquo;? All data will
                be permanently destroyed.
              </RetroAlertDialogDescription>
            </RetroAlertDialogBody>
            <RetroAlertDialogFooter>
              <RetroAlertDialogCancel>Cancel</RetroAlertDialogCancel>
              <RetroAlertDialogAction>Erase</RetroAlertDialogAction>
            </RetroAlertDialogFooter>
          </RetroAlertDialogContent>
        </RetroAlertDialog>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click a button to open the alert dialog. Use Cancel or the action
        button to close.
      </p>
    </main>
  )
}
