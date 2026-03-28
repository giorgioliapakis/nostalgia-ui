"use client"

import {
  RetroToastProvider,
  useRetroToast,
} from "@/registry/new-york/ui/retro-toast"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

function ToastDemo() {
  const { toast } = useRetroToast()

  return (
    <ComponentDocLayout
      name="retro-toast"
      title="RetroToast"
      description="Toast notification popups with Mac OS 9 raised bevel styling and auto-dismiss."
    >
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
    </ComponentDocLayout>
  )
}

export default function ToastPreview() {
  return (
    <RetroToastProvider>
      <ToastDemo />
    </RetroToastProvider>
  )
}
