import { RetroChevron } from "@/registry/new-york/ui/retro-chevron"

const directions = ["up", "down", "left", "right"] as const

export default function ChevronPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroChevron Preview</h1>

      {/* Default variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Default Variant</h2>
        <div className="flex items-center gap-4">
          {directions.map((dir) => (
            <div key={dir} className="flex flex-col items-center gap-2">
              <RetroChevron direction={dir} />
              <span className="os9-body text-[9px]">{dir}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Accent variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Accent Variant</h2>
        <div className="flex items-center gap-4">
          {directions.map((dir) => (
            <div key={dir} className="flex flex-col items-center gap-2">
              <RetroChevron direction={dir} variant="accent" />
              <span className="os9-body text-[9px]">{dir}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Small size */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Small Size (6x6)</h2>
        <div className="flex items-center gap-4">
          {directions.map((dir) => (
            <div key={dir} className="flex flex-col items-center gap-2">
              <RetroChevron direction={dir} size="sm" />
              <span className="os9-body text-[9px]">{dir}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Small + Accent */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Small Size + Accent Variant
        </h2>
        <div className="flex items-center gap-4">
          {directions.map((dir) => (
            <div key={dir} className="flex flex-col items-center gap-2">
              <RetroChevron direction={dir} variant="accent" size="sm" />
              <span className="os9-body text-[9px]">{dir}</span>
            </div>
          ))}
        </div>
      </section>

      {/* All variants comparison */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">All Combinations</h2>
        <div className="flex items-center gap-6">
          {directions.map((dir) => (
            <div key={dir} className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <RetroChevron direction={dir} />
                <RetroChevron direction={dir} variant="accent" />
                <RetroChevron direction={dir} size="sm" />
                <RetroChevron direction={dir} variant="accent" size="sm" />
              </div>
              <span className="os9-body text-[9px]">{dir}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
