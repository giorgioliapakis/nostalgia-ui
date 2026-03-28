import { RetroSkeleton } from "@/registry/new-york/ui/retro-skeleton"

export default function SkeletonPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroSkeleton Preview</h1>

      {/* Text line skeletons */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Text Line Skeletons</h2>
        <div className="flex flex-col gap-2 max-w-[320px]">
          <RetroSkeleton className="h-[12px] w-full" />
          <RetroSkeleton className="h-[12px] w-[85%]" />
          <RetroSkeleton className="h-[12px] w-[70%]" />
        </div>
      </section>

      {/* Circle skeleton (avatar placeholder) */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Circle Skeleton (Avatar)
        </h2>
        <div className="flex items-center gap-3">
          <RetroSkeleton className="h-[32px] w-[32px] rounded-full" />
          <div className="flex flex-col gap-2">
            <RetroSkeleton className="h-[12px] w-[120px]" />
            <RetroSkeleton className="h-[10px] w-[80px]" />
          </div>
        </div>
      </section>

      {/* Card skeleton */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Card Skeleton</h2>
        <div className="max-w-[280px] border border-os9-black bg-os9-gray-300 p-3 shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_#808080]">
          {/* Image placeholder */}
          <RetroSkeleton className="h-[120px] w-full mb-3" />
          {/* Title */}
          <RetroSkeleton className="h-[14px] w-[75%] mb-2" />
          {/* Description lines */}
          <RetroSkeleton className="h-[10px] w-full mb-1" />
          <RetroSkeleton className="h-[10px] w-[90%] mb-1" />
          <RetroSkeleton className="h-[10px] w-[60%]" />
        </div>
      </section>

      {/* Without animation */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Without Animation</h2>
        <div className="flex flex-col gap-2 max-w-[320px]">
          <RetroSkeleton className="h-[12px] w-full" animate={false} />
          <RetroSkeleton className="h-[12px] w-[85%]" animate={false} />
          <RetroSkeleton className="h-[12px] w-[70%]" animate={false} />
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        The dithered hatching pattern uses 45-degree diagonal stripes in OS9
        gray tones. The pulse animation oscillates opacity between 0.7 and 1.0.
      </p>
    </main>
  )
}
