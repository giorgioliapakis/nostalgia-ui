"use client"

import * as React from "react"
import { RetroToaster, toast } from "@/registry/new-york/ui/retro-sonner"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const USAGE = `
// app/layout.tsx
<RetroToaster />

// anywhere
toast.success("Copy complete", { description: "12 items copied to Macintosh HD." })

// act, then offer Undo
moveToTrash("Read Me")
toast("“Read Me” moved to Trash", {
  action: { label: "Undo", onClick: () => putBack("Read Me") },
})
`

const FILES = ["Read Me", "SimpleText Notes", "Budget 1999", "Scrapbook File"]

/* Act, then Undo: the file goes at once; the toast offers it back. */
function TrashDemo() {
  const [files, setFiles] = React.useState(FILES)

  function trash(name: string) {
    setFiles((list) => list.filter((f) => f !== name))
    toast(`“${name}” moved to Trash`, {
      description: "You can put it back for a few seconds.",
      duration: 6000,
      action: {
        label: "Undo",
        onClick: () =>
          setFiles((list) =>
            list.includes(name) ? list : FILES.filter((f) => f === name || list.includes(f))
          ),
      },
    })
  }

  return (
    <div className="w-[300px]">
      <ul className="os9-inset bg-os9-white p-[2px]">
        {files.map((name) => (
          <li
            key={name}
            className="flex items-center justify-between gap-2 px-[6px] py-[3px] text-[11px] hover:bg-os9-lavender"
          >
            <span>{name}</span>
            <RetroButton size="sm" onClick={() => trash(name)}>
              Move to Trash
            </RetroButton>
          </li>
        ))}
        {files.length === 0 && (
          <li className="px-[6px] py-[6px] text-[11px] text-os9-gray-700">
            The folder is empty.
          </li>
        )}
      </ul>
      <div className="mt-2">
        <RetroButton size="sm" onClick={() => setFiles(FILES)}>
          Reset
        </RetroButton>
      </div>
    </div>
  )
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export default function SonnerPage() {
  return (
    <ComponentDocLayout
      name="retro-sonner"
      title="RetroToaster"
      description="Toasts rendered as Mac OS 9 alert windows: striped title bar, close box, alert icons and OS9 buttons. Built on UI SDK's Toast, with sonner's toast() call shape."
      usage={USAGE}
    >
      <RetroToaster position="bottom-right" />

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Act, Then Undo</h2>
        <p className="text-os9-gray-700 text-[10px] mb-3 max-w-[460px]">
          Don&apos;t ask &ldquo;Are you sure?&rdquo; for something that can be
          undone. Do it at once, then offer Undo for a few seconds.
        </p>
        <TrashDemo />
      </section>

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
        from anywhere. Alerts stack in the corner; hover the stack to fan it
        out, swipe an alert toward the edge to dismiss it, or press F6 to
        reach the newest one from the keyboard. Pass{" "}
        <code className="font-mono">titleStripe=&#123;false&#125;</code> for a
        plain window without the striped title bar.
      </p>
    </ComponentDocLayout>
  )
}
