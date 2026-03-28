import { RetroSpinner, RetroBeachBall } from "@/registry/new-york/ui/retro-spinner"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function SpinnerPreview() {
  return (
    <ComponentDocLayout
      name="retro-spinner"
      title="RetroSpinner"
      description="Loading spinners in watch cursor and beach ball variants inspired by Mac OS 9."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        Two loading spinner variants inspired by Mac OS 9: the watch cursor
        (with a rotating second hand) and the beach ball (spinning pinwheel).
      </p>

      {/* Watch spinner */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Watch Cursor (RetroSpinner)
        </h2>
        <div className="flex items-end gap-8">
          <div className="flex flex-col items-center gap-2">
            <RetroSpinner size="sm" />
            <span className="text-os9-gray-700 text-[9px]">sm (16px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RetroSpinner size="default" />
            <span className="text-os9-gray-700 text-[9px]">
              default (24px)
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RetroSpinner size="lg" />
            <span className="text-os9-gray-700 text-[9px]">lg (32px)</span>
          </div>
        </div>
      </section>

      {/* Beach ball spinner */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Beach Ball (RetroBeachBall)
        </h2>
        <div className="flex items-end gap-8">
          <div className="flex flex-col items-center gap-2">
            <RetroBeachBall size="sm" />
            <span className="text-os9-gray-700 text-[9px]">sm (16px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RetroBeachBall size="default" />
            <span className="text-os9-gray-700 text-[9px]">
              default (24px)
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RetroBeachBall size="lg" />
            <span className="text-os9-gray-700 text-[9px]">lg (32px)</span>
          </div>
        </div>
      </section>

      {/* Side by side comparison */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Side by Side</h2>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <RetroSpinner size="default" />
            <span className="text-os9-gray-700 text-[9px]">Watch</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RetroBeachBall size="default" />
            <span className="text-os9-gray-700 text-[9px]">Beach Ball</span>
          </div>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        The watch cursor uses a stepped rotation animation (12 steps per
        revolution). The beach ball uses a smooth continuous spin. Both include
        screen-reader-only &quot;Loading...&quot; text.
      </p>
    </ComponentDocLayout>
  )
}
