import { RetroTextarea } from "@/registry/new-york/ui/retro-textarea"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function TextareaPreview() {
  return (
    <ComponentDocLayout
      name="retro-textarea"
      title="RetroTextarea"
      description="A multi-line text input with Mac OS 9 inset bevel, focus ring, and disabled styling."
    >
      <div className="space-y-8 max-w-md">
        {/* Default size (Large - Charcoal 12pt) */}
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-700">
            Default size (Large)
          </h2>

          <div className="space-y-2">
            <label className="font-[family-name:var(--font-sans)] text-[10px] block">
              Default
            </label>
            <RetroTextarea placeholder="Type something..." />
          </div>

          <div className="space-y-2">
            <label className="font-[family-name:var(--font-sans)] text-[10px] block">
              Focused (tab or click into field)
            </label>
            <RetroTextarea defaultValue="Active field" autoFocus />
          </div>

          <div className="space-y-2">
            <label className="font-[family-name:var(--font-sans)] text-[10px] block">
              Disabled
            </label>
            <RetroTextarea defaultValue="Cannot edit this content" disabled />
          </div>
        </section>

        {/* Small size (Geneva 10pt) */}
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-700">
            Small size
          </h2>

          <div className="space-y-2">
            <label className="font-[family-name:var(--font-sans)] text-[10px] block">
              Default
            </label>
            <RetroTextarea size="sm" placeholder="Type something..." />
          </div>

          <div className="space-y-2">
            <label className="font-[family-name:var(--font-sans)] text-[10px] block">
              Disabled
            </label>
            <RetroTextarea size="sm" defaultValue="Cannot edit this content" disabled />
          </div>
        </section>
      </div>
    </ComponentDocLayout>
  )
}
