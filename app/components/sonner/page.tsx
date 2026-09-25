"use client"

import { RetroToaster, toast } from "@/registry/new-york/ui/retro-sonner"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const USAGE = `
// app/layout.tsx
<RetroToaster />

// anywhere
toast.success("Copy complete", { description: "12 items copied to Macintosh HD." })
`

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export default function SonnerPage() {
  return (
    <ComponentDocLayout
      name="retro-sonner"
      title="RetroToaster"
      description="Sonner toasts rendered as Mac OS 9 alert windows: striped title bar, close box, alert icons and OS9 buttons. Re-exports sonner's toast() so the full API works unchanged."
      usage={USAGE}
    >
      <RetroToaster position="bottom-right" />

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Types</h2>
        <div className="flex flex-wrap gap-3">
          <RetroButton
            onClick={() =>
              toast("Disk First Aid", {
                description: "No repair necessary.",
              })
            }
          >
            Default
          </RetroButton>
          <RetroButton
            onClick={() =>
              toast.success("Copy complete", {
                description: "12 items copied to Macintosh HD.",
              })
            }
          >
            Success
          </RetroButton>
          <RetroButton
            onClick={() =>
              toast.info("Software Update", {
                description: "Mac OS 9.2.2 is available for your computer.",
              })
            }
          >
            Info
          </RetroButton>
          <RetroButton
            onClick={() =>
              toast.warning("Low memory", {
                description:
                  "There is not enough memory to open SimpleText. Try quitting other applications.",
              })
            }
          >
            Warning
          </RetroButton>
          <RetroButton
            onClick={() =>
              toast.error("The application “Finder” has unexpectedly quit.", {
                description: "Error of type 1 occurred.",
              })
            }
          >
            Error
          </RetroButton>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Promise</h2>
        <RetroButton
          onClick={() =>
            toast.promise(wait(2000), {
              loading: "Emptying the Trash…",
              success: "The Trash has been emptied.",
              error: "The Trash could not be emptied.",
            })
          }
        >
          Empty Trash
        </RetroButton>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Action and Cancel</h2>
        <div className="flex flex-wrap gap-3">
          <RetroButton
            onClick={() =>
              toast.warning("Save changes to “Untitled”?", {
                description: "Your changes will be lost if you don’t save them.",
                duration: 10000,
                action: {
                  label: "Save",
                  onClick: () => toast.success("Document saved."),
                },
                cancel: {
                  label: "Don’t Save",
                  onClick: () => toast("Changes discarded."),
                },
              })
            }
          >
            Save Dialog
          </RetroButton>
          <RetroButton
            onClick={() =>
              toast("“Read Me” moved to Trash", {
                action: {
                  label: "Undo",
                  onClick: () => toast.info("“Read Me” put back."),
                },
              })
            }
          >
            With Undo
          </RetroButton>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Title Only</h2>
        <RetroButton onClick={() => toast("Download complete")}>
          Title Only
        </RetroButton>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Mount one <code className="font-mono">&lt;RetroToaster /&gt;</code> near
        the root of your app, then call <code className="font-mono">toast()</code>{" "}
        from anywhere. Pass <code className="font-mono">titleStripe=&#123;false&#125;</code>{" "}
        for a plain window without the striped title bar.
      </p>
    </ComponentDocLayout>
  )
}
