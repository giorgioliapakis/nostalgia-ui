import { RetroAspectRatio } from "@/registry/new-york/ui/retro-aspect-ratio"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function AspectRatioPreview() {
  return (
    <ComponentDocLayout
      name="retro-aspect-ratio"
      title="RetroAspectRatio"
      description="Maintains a fixed width-to-height ratio for media containers with optional OS 9 inset border."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        Maintains a consistent width-to-height ratio for its children. Built on
        Radix UI AspectRatio. Useful for images, videos, and media containers.
      </p>

      {/* 16:9 ratio */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">16:9 Ratio</h2>
        <div className="w-[320px]">
          <RetroAspectRatio ratio={16 / 9}>
            <div className="flex h-full w-full items-center justify-center bg-os9-lavender">
              <span className="os9-heading text-[12px] text-os9-azul">
                16:9
              </span>
            </div>
          </RetroAspectRatio>
        </div>
      </section>

      {/* 4:3 ratio */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">4:3 Ratio</h2>
        <div className="w-[320px]">
          <RetroAspectRatio ratio={4 / 3}>
            <div className="flex h-full w-full items-center justify-center bg-os9-lavender">
              <span className="os9-heading text-[12px] text-os9-azul">
                4:3
              </span>
            </div>
          </RetroAspectRatio>
        </div>
      </section>

      {/* 1:1 ratio */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">1:1 Ratio (Square)</h2>
        <div className="w-[200px]">
          <RetroAspectRatio ratio={1}>
            <div className="flex h-full w-full items-center justify-center bg-os9-lavender">
              <span className="os9-heading text-[12px] text-os9-azul">
                1:1
              </span>
            </div>
          </RetroAspectRatio>
        </div>
      </section>

      {/* Bordered variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Bordered (OS9 inset border)
        </h2>
        <div className="flex gap-6 flex-wrap">
          <div className="w-[320px]">
            <p className="text-os9-gray-700 text-[9px] mb-2">16:9 bordered</p>
            <RetroAspectRatio ratio={16 / 9} bordered>
              <div className="flex h-full w-full items-center justify-center bg-os9-white">
                <span className="os9-heading text-[12px] text-os9-azul">
                  16:9 bordered
                </span>
              </div>
            </RetroAspectRatio>
          </div>
          <div className="w-[200px]">
            <p className="text-os9-gray-700 text-[9px] mb-2">4:3 bordered</p>
            <RetroAspectRatio ratio={4 / 3} bordered>
              <div className="flex h-full w-full items-center justify-center bg-os9-white">
                <span className="os9-heading text-[12px] text-os9-azul">
                  4:3 bordered
                </span>
              </div>
            </RetroAspectRatio>
          </div>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        The bordered prop adds an OS9-style inset border around the content.
      </p>
    </ComponentDocLayout>
  )
}
