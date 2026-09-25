import type { Metadata } from "next"
import { RetroGroupBox } from "@/registry/new-york/ui/retro-group-box"
import { RetroCheckbox } from "@/registry/new-york/ui/retro-checkbox"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import {
  RetroRadioGroup,
  RetroRadioGroupItem,
} from "@/registry/new-york/ui/retro-radio"
import {
  RetroSelect,
  RetroSelectContent,
  RetroSelectItem,
  RetroSelectTrigger,
  RetroSelectValue,
} from "@/registry/new-york/ui/retro-select"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "Mac OS 9 group boxes: an etched frame whose title interrupts the top border. Primary (dark etch) and secondary (light etch) variants, with plain text, checkbox or pop-up menu titles."

export const metadata: Metadata = {
  title: "Group Box",
  description: DESCRIPTION,
}

const USAGE = `<RetroGroupBox title="Startup Disk">…</RetroGroupBox>
<RetroGroupBox variant="secondary" title="Options">…</RetroGroupBox>

// Checkbox title
<RetroGroupBox title={<><RetroCheckbox id="x" /><RetroLabel htmlFor="x">Use Sounds</RetroLabel></>}>
  …
</RetroGroupBox>

// On a non-default background, match the title plate:
<RetroGroupBox title="…" titleClassName="bg-os9-gray-300" />`

function CheckRow({ id, label, defaultChecked }: { id: string; label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center gap-[6px]">
      <RetroCheckbox id={id} defaultChecked={defaultChecked} />
      <RetroLabel htmlFor={id}>{label}</RetroLabel>
    </div>
  )
}

export default function GroupBoxPage() {
  return (
    <ComponentDocLayout
      name="retro-group-box"
      title="RetroGroupBox"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Primary &amp; Secondary</h2>
        <div className="flex items-start gap-6 flex-wrap">
          <RetroGroupBox title="Primary Group" className="w-[220px]">
            <div className="flex flex-col gap-[6px]">
              <CheckRow id="gb-p1" label="Show hard disks" defaultChecked />
              <CheckRow id="gb-p2" label="Show removable media" defaultChecked />
              <CheckRow id="gb-p3" label="Show connected servers" />
            </div>
          </RetroGroupBox>
          <RetroGroupBox variant="secondary" title="Secondary Group" className="w-[220px]">
            <div className="flex flex-col gap-[6px]">
              <CheckRow id="gb-s1" label="Always snap to grid" />
              <CheckRow id="gb-s2" label="Show icon preview" defaultChecked />
            </div>
          </RetroGroupBox>
          <RetroGroupBox className="w-[160px]">
            <p className="text-[10px]">Untitled group box — no title interrupts the frame.</p>
          </RetroGroupBox>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Checkbox Title</h2>
        <RetroGroupBox
          className="w-[300px]"
          title={
            <>
              <RetroCheckbox id="gb-sounds" defaultChecked />
              <RetroLabel htmlFor="gb-sounds" size="lg">
                Play sound effects
              </RetroLabel>
            </>
          }
        >
          <RetroRadioGroup defaultValue="all">
            <div className="flex items-center gap-[6px]">
              <RetroRadioGroupItem value="all" id="gb-r1" />
              <RetroLabel htmlFor="gb-r1">For all actions</RetroLabel>
            </div>
            <div className="flex items-center gap-[6px]">
              <RetroRadioGroupItem value="menus" id="gb-r2" />
              <RetroLabel htmlFor="gb-r2">For menus only</RetroLabel>
            </div>
          </RetroRadioGroup>
        </RetroGroupBox>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Pop-up Title</h2>
        <RetroGroupBox
          className="w-[300px]"
          contentClassName="pt-[18px]"
          title={
            <RetroSelect defaultValue="appearance">
              <RetroSelectTrigger className="w-[140px]" aria-label="Section">
                <RetroSelectValue />
              </RetroSelectTrigger>
              <RetroSelectContent>
                <RetroSelectItem value="appearance">Appearance</RetroSelectItem>
                <RetroSelectItem value="fonts">Fonts</RetroSelectItem>
                <RetroSelectItem value="desktop">Desktop</RetroSelectItem>
              </RetroSelectContent>
            </RetroSelect>
          }
        >
          <div className="flex flex-col gap-[6px]">
            <CheckRow id="gb-pop1" label="Smooth all fonts on screen" defaultChecked />
            <CheckRow id="gb-pop2" label="System-wide platinum appearance" defaultChecked />
          </div>
        </RetroGroupBox>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Nested in a Control Panel</h2>
        <RetroWindow title="General Controls" className="w-[360px]">
          <div className="flex flex-col gap-3 p-[4px]">
            <RetroGroupBox title="Desktop">
              <div className="flex flex-col gap-[6px]">
                <CheckRow id="gb-w1" label="Show Desktop when in background" defaultChecked />
                <CheckRow id="gb-w2" label="Show Launcher at system startup" />
              </div>
            </RetroGroupBox>
            <RetroGroupBox variant="secondary" title="Shut Down Warning">
              <CheckRow id="gb-w3" label="Warn me if computer was shut down improperly" defaultChecked />
            </RetroGroupBox>
          </div>
        </RetroWindow>
      </section>
    </ComponentDocLayout>
  )
}
