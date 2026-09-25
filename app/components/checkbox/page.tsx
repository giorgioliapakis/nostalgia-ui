import type { Metadata } from "next"
import { RetroCheckbox } from "@/registry/new-york/ui/retro-checkbox"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export const metadata: Metadata = {
  title: "Checkbox",
  description:
    "A checkbox input with Mac OS 9 beveled box, checkmark indicator and indeterminate dash.",
}

export default function CheckboxPreview() {
  return (
    <ComponentDocLayout
      name="retro-checkbox"
      title="RetroCheckbox"
      description="A checkbox input with Mac OS 9 beveled box, checkmark indicator and indeterminate dash."
    >
      {/* Unchecked */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Unchecked (Default)</h2>
        <div className="flex items-center gap-3">
          <RetroCheckbox id="unchecked" />
          <label
            htmlFor="unchecked"
            className="text-[10px] font-sans select-none cursor-pointer"
          >
            Unchecked checkbox
          </label>
        </div>
      </section>

      {/* Checked */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Checked</h2>
        <div className="flex items-center gap-3">
          <RetroCheckbox id="checked" defaultChecked />
          <label
            htmlFor="checked"
            className="text-[10px] font-sans select-none cursor-pointer"
          >
            Checked checkbox
          </label>
        </div>
      </section>

      {/* Indeterminate */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Indeterminate</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <RetroCheckbox id="indeterminate" defaultChecked="indeterminate" />
            <label
              htmlFor="indeterminate"
              className="text-[10px] font-sans select-none cursor-pointer"
            >
              Extensions (some enabled)
            </label>
          </div>
          <div className="ml-[20px] flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <RetroCheckbox id="ext-appletalk" defaultChecked />
              <label
                htmlFor="ext-appletalk"
                className="text-[10px] font-sans select-none cursor-pointer"
              >
                AppleTalk
              </label>
            </div>
            <div className="flex items-center gap-3">
              <RetroCheckbox id="ext-quicktime" />
              <label
                htmlFor="ext-quicktime"
                className="text-[10px] font-sans select-none cursor-pointer"
              >
                QuickTime
              </label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RetroCheckbox
              id="indeterminate-disabled"
              checked="indeterminate"
              disabled
            />
            <label
              htmlFor="indeterminate-disabled"
              className="text-[10px] font-sans select-none cursor-not-allowed opacity-50"
            >
              Disabled (indeterminate)
            </label>
          </div>
        </div>
        <p className="text-os9-gray-700 text-[9px] mt-3">
          Pass <code className="font-mono">checked=&quot;indeterminate&quot;</code>{" "}
          (or <code className="font-mono">defaultChecked</code>) to show the
          mixed-state dash, e.g. for a &ldquo;select all&rdquo; parent.
        </p>
      </section>

      {/* Disabled States */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <RetroCheckbox id="disabled-unchecked" disabled />
            <label
              htmlFor="disabled-unchecked"
              className="text-[10px] font-sans select-none cursor-not-allowed opacity-50"
            >
              Disabled (unchecked)
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RetroCheckbox id="disabled-checked" defaultChecked disabled />
            <label
              htmlFor="disabled-checked"
              className="text-[10px] font-sans select-none cursor-not-allowed opacity-50"
            >
              Disabled (checked)
            </label>
          </div>
        </div>
      </section>

      {/* Multiple checkboxes */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Interactive (click to toggle)
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <RetroCheckbox id="option-a" />
            <label
              htmlFor="option-a"
              className="text-[10px] font-sans select-none cursor-pointer"
            >
              Show Desktop Icons
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RetroCheckbox id="option-b" defaultChecked />
            <label
              htmlFor="option-b"
              className="text-[10px] font-sans select-none cursor-pointer"
            >
              Warn before emptying Trash
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RetroCheckbox id="option-c" />
            <label
              htmlFor="option-c"
              className="text-[10px] font-sans select-none cursor-pointer"
            >
              Calculate folder sizes
            </label>
          </div>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Press and hold to see the active/pressed state with inverted bevel.
      </p>
    </ComponentDocLayout>
  )
}
