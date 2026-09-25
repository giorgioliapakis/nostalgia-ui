import type { Metadata } from "next"
import {
  RetroField,
  RetroFieldContent,
  RetroFieldDescription,
  RetroFieldError,
  RetroFieldGroup,
  RetroFieldLabel,
  RetroFieldLegend,
  RetroFieldSeparator,
  RetroFieldSet,
  RetroFieldTitle,
} from "@/registry/new-york/ui/retro-field"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { RetroTextarea } from "@/registry/new-york/ui/retro-textarea"
import { RetroCheckbox } from "@/registry/new-york/ui/retro-checkbox"
import { RetroSwitch } from "@/registry/new-york/ui/retro-switch"
import {
  RetroRadioGroup,
  RetroRadioGroupItem,
} from "@/registry/new-york/ui/retro-radio"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "Composable form layout primitives: labels, descriptions, errors, fieldsets and group boxes with Mac OS 9 styling. Works with any form library."

export const metadata: Metadata = {
  title: "Field",
  description: DESCRIPTION,
}

const USAGE = `
<RetroFieldSet>
  <RetroFieldLegend>Sharing Setup</RetroFieldLegend>
  <RetroFieldGroup>
    <RetroField>
      <RetroFieldLabel htmlFor="owner">Owner Name</RetroFieldLabel>
      <RetroInput id="owner" />
      <RetroFieldDescription>Shown to other users on the network.</RetroFieldDescription>
    </RetroField>
  </RetroFieldGroup>
</RetroFieldSet>
`

export default function FieldPage() {
  return (
    <ComponentDocLayout
      name="retro-field"
      title="RetroField"
      description={DESCRIPTION}
      usage={USAGE}
    >
      {/* Basic */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic Field</h2>
        <div className="max-w-[320px]">
          <RetroField>
            <RetroFieldLabel htmlFor="field-computer-name">
              Computer Name
            </RetroFieldLabel>
            <RetroInput id="field-computer-name" defaultValue="Macintosh HD" />
            <RetroFieldDescription>
              Other computers on the network see this name.
            </RetroFieldDescription>
          </RetroField>
        </div>
      </section>

      {/* Fieldset + group */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Fieldset with Group</h2>
        <div className="max-w-[360px]">
          <RetroFieldSet>
            <RetroFieldLegend>Sharing Setup</RetroFieldLegend>
            <RetroFieldDescription>
              Network identity for this Macintosh.
            </RetroFieldDescription>
            <RetroFieldGroup>
              <RetroField>
                <RetroFieldLabel htmlFor="field-owner">Owner Name</RetroFieldLabel>
                <RetroInput id="field-owner" defaultValue="Steve" />
              </RetroField>
              <RetroField>
                <RetroFieldLabel htmlFor="field-password">
                  Owner Password
                </RetroFieldLabel>
                <RetroInput id="field-password" type="password" defaultValue="applesauce" />
                <RetroFieldDescription>
                  Must be at least 8 characters.
                </RetroFieldDescription>
              </RetroField>
              <RetroField>
                <RetroFieldLabel htmlFor="field-notes">Notes</RetroFieldLabel>
                <RetroTextarea id="field-notes" size="sm" placeholder="Anything else…" />
              </RetroField>
            </RetroFieldGroup>
          </RetroFieldSet>
        </div>
      </section>

      {/* Group box */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Group Box Variant</h2>
        <div className="max-w-[360px]">
          <RetroFieldSet variant="group">
            <RetroFieldLegend>Memory</RetroFieldLegend>
            <RetroFieldGroup>
              <RetroField orientation="horizontal">
                <RetroCheckbox id="field-vm" defaultChecked />
                <RetroFieldLabel htmlFor="field-vm">Virtual Memory</RetroFieldLabel>
              </RetroField>
              <RetroField orientation="horizontal">
                <RetroCheckbox id="field-ramdisk" />
                <RetroFieldLabel htmlFor="field-ramdisk">RAM Disk</RetroFieldLabel>
              </RetroField>
            </RetroFieldGroup>
          </RetroFieldSet>
        </div>
      </section>

      {/* Horizontal with content */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Horizontal Orientation</h2>
        <div className="max-w-[400px]">
          <RetroFieldGroup>
            <RetroField orientation="horizontal">
              <RetroFieldContent>
                <RetroFieldLabel htmlFor="field-sound">Alert Sounds</RetroFieldLabel>
                <RetroFieldDescription>
                  Play the system alert when an error occurs.
                </RetroFieldDescription>
              </RetroFieldContent>
              <RetroSwitch id="field-sound" defaultChecked />
            </RetroField>
            <RetroFieldSeparator />
            <RetroField orientation="horizontal">
              <RetroCheckbox id="field-labels" defaultChecked />
              <RetroFieldContent>
                <RetroFieldLabel htmlFor="field-labels">
                  Show label colors
                </RetroFieldLabel>
                <RetroFieldDescription>
                  Tint icons in the Finder with their label color.
                </RetroFieldDescription>
              </RetroFieldContent>
            </RetroField>
          </RetroFieldGroup>
        </div>
      </section>

      {/* Radio group + choice cards */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Choice Cards</h2>
        <div className="max-w-[360px]">
          <RetroFieldSet>
            <RetroFieldLegend variant="label">Startup Disk</RetroFieldLegend>
            <RetroRadioGroup defaultValue="hd" className="flex flex-col gap-[6px]">
              <RetroFieldLabel htmlFor="field-disk-hd">
                <RetroField orientation="horizontal">
                  <RetroRadioGroupItem value="hd" id="field-disk-hd" />
                  <RetroFieldContent>
                    <RetroFieldTitle>Macintosh HD</RetroFieldTitle>
                    <RetroFieldDescription>Mac OS 9.2.2</RetroFieldDescription>
                  </RetroFieldContent>
                </RetroField>
              </RetroFieldLabel>
              <RetroFieldLabel htmlFor="field-disk-cd">
                <RetroField orientation="horizontal">
                  <RetroRadioGroupItem value="cd" id="field-disk-cd" />
                  <RetroFieldContent>
                    <RetroFieldTitle>Install CD</RetroFieldTitle>
                    <RetroFieldDescription>Mac OS 9.1 Install</RetroFieldDescription>
                  </RetroFieldContent>
                </RetroField>
              </RetroFieldLabel>
            </RetroRadioGroup>
          </RetroFieldSet>
        </div>
      </section>

      {/* Errors */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Validation Errors</h2>
        <div className="max-w-[320px]">
          <RetroFieldGroup>
            <RetroField data-invalid="true">
              <RetroFieldLabel htmlFor="field-email">Email</RetroFieldLabel>
              <RetroInput id="field-email" aria-invalid defaultValue="steve@" />
              <RetroFieldError>Enter a complete email address.</RetroFieldError>
            </RetroField>
            <RetroField data-invalid="true">
              <RetroFieldLabel htmlFor="field-name">File Name</RetroFieldLabel>
              <RetroInput id="field-name" aria-invalid defaultValue=":Untitled:" />
              <RetroFieldError
                errors={[
                  { message: "Name cannot contain a colon (:)." },
                  { message: "Name must be 31 characters or fewer." },
                ]}
              />
            </RetroField>
          </RetroFieldGroup>
        </div>
      </section>

      {/* Separator with text */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Separator with Label</h2>
        <div className="max-w-[320px]">
          <RetroFieldGroup>
            <RetroField>
              <RetroFieldLabel htmlFor="field-server">Server Address</RetroFieldLabel>
              <RetroInput id="field-server" placeholder="afp://" />
            </RetroField>
            <RetroFieldSeparator>or</RetroFieldSeparator>
            <RetroField orientation="horizontal">
              <RetroButton type="button">Browse Network…</RetroButton>
            </RetroField>
          </RetroFieldGroup>
        </div>
      </section>
    </ComponentDocLayout>
  )
}
