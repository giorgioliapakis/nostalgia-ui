import { RetroInput } from "@/registry/new-york/ui/retro-input"

export default function InputPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98] mb-6">
        retro-input
      </h1>

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
            <RetroInput placeholder="Type something..." />
          </div>

          <div className="space-y-2">
            <label className="font-[family-name:var(--font-sans)] text-[10px] block">
              With value (click to see focus ring)
            </label>
            <RetroInput defaultValue="10" />
          </div>

          <div className="space-y-2">
            <label className="font-[family-name:var(--font-sans)] text-[10px] block">
              Focused (tab or click into field)
            </label>
            <RetroInput defaultValue="Active field" autoFocus />
          </div>

          <div className="space-y-2">
            <label className="font-[family-name:var(--font-sans)] text-[10px] block">
              Disabled
            </label>
            <RetroInput defaultValue="Cannot edit" disabled />
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
            <RetroInput size="sm" placeholder="Type something..." />
          </div>

          <div className="space-y-2">
            <label className="font-[family-name:var(--font-sans)] text-[10px] block">
              With value (click to see focus ring)
            </label>
            <RetroInput size="sm" defaultValue="10" />
          </div>

          <div className="space-y-2">
            <label className="font-[family-name:var(--font-sans)] text-[10px] block">
              Disabled
            </label>
            <RetroInput size="sm" defaultValue="Cannot edit" disabled />
          </div>
        </section>

        {/* Side by side comparison */}
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-sans)] text-[10px] text-os9-gray-700">
            Side by side
          </h2>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <RetroInput defaultValue="Large" />
            </div>
            <div className="flex-1">
              <RetroInput size="sm" defaultValue="Small" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
