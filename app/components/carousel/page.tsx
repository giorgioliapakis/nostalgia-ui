"use client"

import {
  RetroCarousel,
  RetroCarouselContent,
  RetroCarouselItem,
  RetroCarouselPrevious,
  RetroCarouselNext,
} from "@/registry/new-york/ui/retro-carousel"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function CarouselPreview() {
  const slides = [
    { label: "Slide 1", bg: "bg-os9-lavender" },
    { label: "Slide 2", bg: "bg-[#ffcc66]" },
    { label: "Slide 3", bg: "bg-[#ccffcc]" },
    { label: "Slide 4", bg: "bg-[#ffcccc]" },
  ]

  return (
    <ComponentDocLayout
      name="retro-carousel"
      title="RetroCarousel"
      description="A slide carousel with Mac OS 9 beveled navigation buttons and inset content area."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A carousel/slider component with OS9-styled navigation buttons and inset
        panel content area. Built on Embla Carousel.
      </p>

      {/* Horizontal carousel */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Horizontal Carousel</h2>
        <div className="w-[400px]">
          <RetroCarousel>
            <RetroCarouselContent>
              {slides.map((slide) => (
                <RetroCarouselItem key={slide.label}>
                  <div
                    className={`flex h-[200px] items-center justify-center ${slide.bg}`}
                  >
                    <span className="os9-heading text-[14px]">
                      {slide.label}
                    </span>
                  </div>
                </RetroCarouselItem>
              ))}
            </RetroCarouselContent>
            <RetroCarouselPrevious />
            <RetroCarouselNext />
          </RetroCarousel>
        </div>
      </section>

      {/* Vertical carousel */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Vertical Carousel</h2>
        <div className="w-[300px]">
          <RetroCarousel orientation="vertical">
            <RetroCarouselContent className="h-[180px]">
              {slides.map((slide) => (
                <RetroCarouselItem key={slide.label}>
                  <div
                    className={`flex h-[180px] items-center justify-center ${slide.bg}`}
                  >
                    <span className="os9-heading text-[14px]">
                      {slide.label}
                    </span>
                  </div>
                </RetroCarouselItem>
              ))}
            </RetroCarouselContent>
            <RetroCarouselPrevious />
            <RetroCarouselNext />
          </RetroCarousel>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click the arrow buttons or use keyboard arrow keys to navigate slides.
        Buttons disable at the start and end of the carousel.
      </p>
    </ComponentDocLayout>
  )
}
