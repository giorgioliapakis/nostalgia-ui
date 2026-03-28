"use client"

import {
  RetroToastProvider,
  useRetroToast,
} from "@/registry/new-york/ui/retro-toast"
import { RetroButton } from "@/registry/new-york/ui/retro-button"

function ToastDemo() {
  const { toast } = useRetroToast()

  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroToast Preview</h1>

      <section className="flex flex-wrap gap-4">
        <RetroButton
          onClick={() =>
            toast({
              title: "File Saved",
              description: "Document has been saved to disk.",
            })
          }
        >
          Save File
        </RetroButton>

        <RetroButton
          onClick={() =>
            toast({
              title: "Alert",
              description:
                "Something unexpected happened. Please try again.",
            })
          }
        >
          Show Alert
        </RetroButton>

        <RetroButton
          onClick={() =>
            toast({
              title: "Download Complete",
            })
          }
        >
          Title Only
        </RetroButton>

        <RetroButton
          onClick={() =>
            toast({
              description: "Preferences have been updated.",
            })
          }
        >
          Description Only
        </RetroButton>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click a button to trigger a toast. Toasts auto-dismiss after 5 seconds.
      </p>
    </main>
  )
}

export default function ToastPreview() {
  return (
    <RetroToastProvider>
      <ToastDemo />
    </RetroToastProvider>
  )
}
