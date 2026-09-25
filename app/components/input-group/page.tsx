import type { Metadata } from "next"
import {
  RetroInputGroup,
  RetroInputGroupAddon,
  RetroInputGroupButton,
  RetroInputGroupInput,
  RetroInputGroupText,
  RetroInputGroupTextarea,
} from "@/registry/new-york/ui/retro-input-group"
import {
  RetroIconDocument,
  RetroIconSearch,
} from "@/registry/new-york/ui/retro-icons"
import { RetroKbd } from "@/registry/new-york/ui/retro-kbd"
import { RetroSpinner } from "@/registry/new-york/ui/retro-spinner"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "A Mac OS 9 inset text well that combines an input or textarea with icons, text, buttons and shortcuts. The whole well takes the focus ring."

export const metadata: Metadata = {
  title: "Input Group",
  description: DESCRIPTION,
}

const USAGE = `
<RetroInputGroup>
  <RetroInputGroupInput placeholder="Search…" />
  <RetroInputGroupAddon>
    <RetroIconSearch size="sm" />
  </RetroInputGroupAddon>
</RetroInputGroup>
`

export default function InputGroupPage() {
  return (
    <ComponentDocLayout
      name="retro-input-group"
      title="RetroInputGroup"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Icon Addon</h2>
        <div className="max-w-[300px]">
          <RetroInputGroup>
            <RetroInputGroupInput placeholder="Find items whose name contains…" aria-label="Find" />
            <RetroInputGroupAddon>
              <RetroIconSearch size="sm" />
            </RetroInputGroupAddon>
          </RetroInputGroup>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Text Addons</h2>
        <div className="flex max-w-[300px] flex-col gap-4">
          <RetroInputGroup>
            <RetroInputGroupAddon>
              <RetroInputGroupText>http://</RetroInputGroupText>
            </RetroInputGroupAddon>
            <RetroInputGroupInput placeholder="www.apple.com" className="pl-[2px]" aria-label="URL" />
          </RetroInputGroup>
          <RetroInputGroup>
            <RetroInputGroupAddon>
              <RetroInputGroupText>$</RetroInputGroupText>
            </RetroInputGroupAddon>
            <RetroInputGroupInput defaultValue="1,299.00" aria-label="Price" />
            <RetroInputGroupAddon align="inline-end">
              <RetroInputGroupText>USD</RetroInputGroupText>
            </RetroInputGroupAddon>
          </RetroInputGroup>
          <RetroInputGroup>
            <RetroInputGroupInput defaultValue="Untitled" aria-label="File name" />
            <RetroInputGroupAddon align="inline-end">
              <RetroInputGroupText>.sit</RetroInputGroupText>
            </RetroInputGroupAddon>
          </RetroInputGroup>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Buttons</h2>
        <div className="flex max-w-[300px] flex-col gap-4">
          <RetroInputGroup>
            <RetroInputGroupInput placeholder="afp://server.local" aria-label="Server" />
            <RetroInputGroupAddon align="inline-end">
              <RetroInputGroupButton>Connect</RetroInputGroupButton>
            </RetroInputGroupAddon>
          </RetroInputGroup>
          <RetroInputGroup>
            <RetroInputGroupInput
              readOnly
              defaultValue="Macintosh HD:System Folder:Preferences"
              aria-label="Path"
            />
            <RetroInputGroupAddon align="inline-end">
              <RetroInputGroupButton size="icon-xs" aria-label="Choose">
                …
              </RetroInputGroupButton>
            </RetroInputGroupAddon>
          </RetroInputGroup>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Keyboard Hint &amp; Loading</h2>
        <div className="flex max-w-[300px] flex-col gap-4">
          <RetroInputGroup>
            <RetroInputGroupAddon>
              <RetroIconSearch size="sm" />
            </RetroInputGroupAddon>
            <RetroInputGroupInput placeholder="Sherlock" aria-label="Sherlock" />
            <RetroInputGroupAddon align="inline-end">
              <RetroKbd size="sm">⌘</RetroKbd>
              <RetroKbd size="sm">F</RetroKbd>
            </RetroInputGroupAddon>
          </RetroInputGroup>
          <RetroInputGroup>
            <RetroInputGroupInput defaultValue="Searching disks…" disabled aria-label="Status" />
            <RetroInputGroupAddon align="inline-end">
              <RetroSpinner size="sm" aria-label="Loading" />
            </RetroInputGroupAddon>
          </RetroInputGroup>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Textarea with Block Addons</h2>
        <div className="max-w-[360px]">
          <RetroInputGroup>
            <RetroInputGroupAddon align="block-start" className="border-b">
              <RetroIconDocument size="sm" />
              <RetroInputGroupText className="font-bold">
                SimpleText — Read Me
              </RetroInputGroupText>
            </RetroInputGroupAddon>
            <RetroInputGroupTextarea
              size="sm"
              placeholder="Type your note…"
              aria-label="Note"
            />
            <RetroInputGroupAddon align="block-end" className="border-t">
              <RetroInputGroupText>0 / 32K</RetroInputGroupText>
              <RetroInputGroupButton className="ml-auto">Save</RetroInputGroupButton>
            </RetroInputGroupAddon>
          </RetroInputGroup>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Invalid</h2>
        <div className="max-w-[300px]">
          <RetroInputGroup>
            <RetroInputGroupAddon>
              <RetroInputGroupText>@</RetroInputGroupText>
            </RetroInputGroupAddon>
            <RetroInputGroupInput aria-invalid defaultValue="steve@@mac.com" aria-label="Email" />
          </RetroInputGroup>
        </div>
      </section>
    </ComponentDocLayout>
  )
}
