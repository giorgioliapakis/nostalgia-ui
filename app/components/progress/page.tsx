import type { Metadata } from "next"
import { RetroProgress } from "@/registry/new-york/ui/retro-progress"
import { ComponentDocLayout } from "../_components/component-doc-layout"
import { ProgressDemo } from "./progress-demo"

export const metadata: Metadata = {
  title: "Progress",
  description:
    "A progress bar with Mac OS 9 candy-stripe pattern in determinate and indeterminate modes.",
}

export default function ProgressPreview() {
  return (
    <ComponentDocLayout
      name="retro-progress"
      title="RetroProgress"
      description="A progress bar with Mac OS 9 candy-stripe pattern in determinate and indeterminate modes."
    >
      {/* Determinate values */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Determinate Values</h2>
        <div className="flex flex-col gap-4 max-w-[320px]">
          <div>
            <span className="text-[10px] text-os9-black mb-1 block">0%</span>
            <RetroProgress aria-label="Example progress" value={0} />
          </div>
          <div>
            <span className="text-[10px] text-os9-black mb-1 block">25%</span>
            <RetroProgress aria-label="Example progress" value={25} />
          </div>
          <div>
            <span className="text-[10px] text-os9-black mb-1 block">50%</span>
            <RetroProgress aria-label="Example progress" value={50} />
          </div>
          <div>
            <span className="text-[10px] text-os9-black mb-1 block">75%</span>
            <RetroProgress aria-label="Example progress" value={75} />
          </div>
          <div>
            <span className="text-[10px] text-os9-black mb-1 block">100%</span>
            <RetroProgress aria-label="Example progress" value={100} />
          </div>
        </div>
      </section>

      {/* Eased fill */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Eased Fill</h2>
        <p className="text-[10px] text-os9-gray-700 mb-3">
          Real progress arrives in jumps; the fill eases to each new value so it
          reads as steady work.
        </p>
        <div className="max-w-[320px]">
          <ProgressDemo />
        </div>
      </section>

      {/* Indeterminate */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Indeterminate</h2>
        <div className="max-w-[320px]">
          <RetroProgress aria-label="Preparing" indeterminate />
        </div>
      </section>

      {/* Edge cases */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Edge Cases (clamped)</h2>
        <div className="flex flex-col gap-4 max-w-[320px]">
          <div>
            <span className="text-[10px] text-os9-black mb-1 block">
              value={"{-20}"} (clamped to 0)
            </span>
            <RetroProgress aria-label="Example progress" value={-20} />
          </div>
          <div>
            <span className="text-[10px] text-os9-black mb-1 block">
              value={"{150}"} (clamped to 100)
            </span>
            <RetroProgress aria-label="Example progress" value={150} />
          </div>
        </div>
      </section>

      {/* Custom width */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Custom Width</h2>
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-[10px] text-os9-black mb-1 block">
              w-[160px] (Figma default)
            </span>
            <RetroProgress aria-label="Example progress" value={60} className="w-[160px]" />
          </div>
          <div>
            <span className="text-[10px] text-os9-black mb-1 block">
              w-full (full width)
            </span>
            <RetroProgress aria-label="Example progress" value={60} />
          </div>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        The candy-stripe fill eases to each new value. Indeterminate mode is a
        barber pole: the stripes scroll smoothly, or a stripe at a time with{" "}
        <code className="font-mono">data-flair=&quot;classic&quot;</code>, and hold
        still with reduced motion.
      </p>
    </ComponentDocLayout>
  )
}
