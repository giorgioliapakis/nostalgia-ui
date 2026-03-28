import {
  RetroIconFolder,
  RetroIconDocument,
  RetroIconTrash,
  RetroIconHardDrive,
  RetroIconFloppy,
  RetroIconApplication,
  RetroIconAlert,
  RetroIconInfo,
  RetroIconQuestion,
  RetroIconStop,
  RetroIconNetwork,
  RetroIconPrinter,
  RetroIconSearch,
  RetroIconPreferences,
} from "@/registry/new-york/ui/retro-icons"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const allIcons = [
  { name: "Folder", Component: RetroIconFolder },
  { name: "Document", Component: RetroIconDocument },
  { name: "Trash", Component: RetroIconTrash },
  { name: "Hard Drive", Component: RetroIconHardDrive },
  { name: "Floppy", Component: RetroIconFloppy },
  { name: "Application", Component: RetroIconApplication },
  { name: "Alert", Component: RetroIconAlert },
  { name: "Info", Component: RetroIconInfo },
  { name: "Question", Component: RetroIconQuestion },
  { name: "Stop", Component: RetroIconStop },
  { name: "Network", Component: RetroIconNetwork },
  { name: "Printer", Component: RetroIconPrinter },
  { name: "Search", Component: RetroIconSearch },
  { name: "Preferences", Component: RetroIconPreferences },
] as const

const sizes = ["sm", "default", "lg", "xl"] as const

export default function IconsPreview() {
  return (
    <ComponentDocLayout
      name="retro-icons"
      title="RetroIcons"
      description="14 pixel-art SVG icons inspired by Mac OS 9 in sm, default, lg, and xl sizes."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        14 pixel-art SVG icons inspired by Mac OS 9. Each icon supports sm
        (16px), default (32px), lg (48px), and xl (64px) sizes. All are pure SVG
        with no image assets.
      </p>

      {/* All icons at default size */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          All Icons (default size)
        </h2>
        <div className="grid grid-cols-7 gap-6">
          {allIcons.map(({ name, Component }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <Component size="default" />
              <span className="text-os9-gray-700 text-[9px] text-center">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Size comparison */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Size Comparison</h2>
        <div className="space-y-4">
          {sizes.map((size) => (
            <div key={size}>
              <p className="text-os9-gray-700 text-[9px] mb-2 font-bold">
                {size} ({size === "sm" ? "16px" : size === "default" ? "32px" : size === "lg" ? "48px" : "64px"})
              </p>
              <div className="flex items-end gap-4 flex-wrap">
                {allIcons.map(({ name, Component }) => (
                  <Component key={name} size={size} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Icons use a 32x32 viewBox and scale cleanly at all sizes. Use the
        RetroIcon wrapper component with a name prop, or import individual icon
        components directly.
      </p>
    </ComponentDocLayout>
  )
}
