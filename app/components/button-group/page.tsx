import type { Metadata } from "next"
import {
  RetroButtonGroup,
  RetroButtonGroupSeparator,
  RetroButtonGroupText,
} from "@/registry/new-york/ui/retro-button-group"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "Joins buttons, inputs and labels into one Mac OS 9 control strip with shared borders. Horizontal or vertical, with etched separators and text segments."

export const metadata: Metadata = {
  title: "Button Group",
  description: DESCRIPTION,
}

const USAGE = `
<RetroButtonGroup>
  <RetroButton>Icon</RetroButton>
  <RetroButton>Button</RetroButton>
  <RetroButton>List</RetroButton>
</RetroButtonGroup>
`

export default function ButtonGroupPage() {
  return (
    <ComponentDocLayout
      name="retro-button-group"
      title="RetroButtonGroup"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Horizontal</h2>
        <RetroButtonGroup aria-label="View as">
          <RetroButton>Icon</RetroButton>
          <RetroButton>Button</RetroButton>
          <RetroButton>List</RetroButton>
        </RetroButtonGroup>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Vertical</h2>
        <RetroButtonGroup orientation="vertical" aria-label="Arrange">
          <RetroButton>by Name</RetroButton>
          <RetroButton>by Date</RetroButton>
          <RetroButton>by Size</RetroButton>
          <RetroButton>by Kind</RetroButton>
        </RetroButtonGroup>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Sizes</h2>
        <div className="flex flex-col items-start gap-4">
          <RetroButtonGroup aria-label="Small">
            <RetroButton size="sm">Back</RetroButton>
            <RetroButton size="sm">Forward</RetroButton>
          </RetroButtonGroup>
          <RetroButtonGroup aria-label="Default">
            <RetroButton>Back</RetroButton>
            <RetroButton>Forward</RetroButton>
          </RetroButtonGroup>
          <RetroButtonGroup aria-label="Large">
            <RetroButton size="lg">Back</RetroButton>
            <RetroButton size="lg">Forward</RetroButton>
          </RetroButtonGroup>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Separator</h2>
        <RetroButtonGroup aria-label="Clipboard">
          <RetroButton variant="secondary">Cut</RetroButton>
          <RetroButtonGroupSeparator />
          <RetroButton variant="secondary">Copy</RetroButton>
          <RetroButtonGroupSeparator />
          <RetroButton variant="secondary">Paste</RetroButton>
        </RetroButtonGroup>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Text and Input</h2>
        <div className="flex flex-col items-start gap-4">
          <RetroButtonGroup>
            <RetroButtonGroupText>afp://</RetroButtonGroupText>
            <RetroInput
              size="sm"
              className="h-[24px] w-[180px]"
              placeholder="server.local"
              aria-label="Server address"
            />
            <RetroButton>Connect</RetroButton>
          </RetroButtonGroup>
          <RetroButtonGroup>
            <RetroButtonGroupText asChild>
              <label htmlFor="bg-zoom">Zoom</label>
            </RetroButtonGroupText>
            <RetroButton aria-label="Zoom out">−</RetroButton>
            <RetroInput
              id="bg-zoom"
              size="sm"
              className="h-[24px] w-[52px] text-center"
              defaultValue="100%"
            />
            <RetroButton aria-label="Zoom in">+</RetroButton>
          </RetroButtonGroup>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Nested Groups</h2>
        <RetroButtonGroup>
          <RetroButtonGroup aria-label="Style">
            <RetroButton size="sm" className="font-bold">B</RetroButton>
            <RetroButton size="sm" className="italic">I</RetroButton>
            <RetroButton size="sm" className="underline">U</RetroButton>
          </RetroButtonGroup>
          <RetroButtonGroup aria-label="Alignment">
            <RetroButton size="sm">Left</RetroButton>
            <RetroButton size="sm">Center</RetroButton>
            <RetroButton size="sm">Right</RetroButton>
          </RetroButtonGroup>
        </RetroButtonGroup>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled Segment</h2>
        <RetroButtonGroup aria-label="Navigation">
          <RetroButton disabled>Back</RetroButton>
          <RetroButton>Forward</RetroButton>
          <RetroButton>Home</RetroButton>
        </RetroButtonGroup>
      </section>
    </ComponentDocLayout>
  )
}
