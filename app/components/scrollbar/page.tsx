"use client"

import {
  RetroScrollArea,
  RetroScrollBar,
} from "@/registry/new-york/ui/retro-scrollbar"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function ScrollbarPreview() {
  return (
    <ComponentDocLayout
      name="retro-scrollbar"
      title="RetroScrollbar"
      description="Scroll areas with Mac OS 9 styled scrollbars, beveled thumb, and arrow navigation buttons."
    >
      {/* Vertical scroll area */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Vertical Scroll</h2>
        <div className="os9-inset w-[320px]">
          <RetroScrollArea className="h-[200px]" orientation="vertical">
            <div className="p-2 text-[10px] font-sans leading-[14px]">
              <p className="mb-2 font-bold">Welcome to Macintosh</p>
              <p className="mb-2">
                This window demonstrates the classic Mac OS 9 scrollbar with
                raised bevel thumb, arrow navigation buttons, and an inset
                beveled track.
              </p>
              <p className="mb-2">
                System 7 introduced the Platinum appearance, which was refined
                through Mac OS 8 and reached its final form in Mac OS 9. The
                scrollbar is one of the most recognizable elements of the
                classic Mac interface.
              </p>
              <p className="mb-2">
                Key features of the OS 9 scrollbar include 16-pixel-wide tracks,
                raised bevel thumb indicators, and navigation arrow buttons at
                both ends of the track.
              </p>
              <p className="mb-2">
                The thumb uses a light highlight on the top and left edges with
                a darker shadow on the bottom and right edges, creating the
                signature 3D raised appearance.
              </p>
              <p className="mb-2">
                When pressed, the bevel inverts: the highlight moves to the
                bottom-right and the shadow to the top-left, giving tactile
                feedback.
              </p>
              <p className="mb-2">
                The track background uses a subtle pattern to distinguish the
                scrollable gutter from the rest of the window chrome.
              </p>
              <p className="mb-2">
                Arrow buttons sit at each end of the scrollbar, each a 16x16
                pixel square with its own raised bevel and a centered triangular
                arrow glyph.
              </p>
              <p className="mb-2">
                This implementation is built on top of Radix UI ScrollArea for
                accessible, cross-browser scroll behavior while faithfully
                reproducing the Mac OS 9 visual style.
              </p>
              <p className="mb-2">
                Nostalgic yet functional - these scrollbars bring the warmth of
                late-90s desktop computing to modern web applications.
              </p>
              <p>
                Try scrolling to see the thumb move along the track. Resize the
                container to watch it adapt.
              </p>
            </div>
          </RetroScrollArea>
        </div>
      </section>

      {/* Horizontal scroll area */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Horizontal Scroll</h2>
        <div className="os9-inset w-[320px]">
          <RetroScrollArea className="h-auto" orientation="horizontal">
            <div className="flex gap-3 p-2 w-[800px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 size-[60px] os9-raised flex items-center justify-center text-[9px] font-sans"
                >
                  Item {i + 1}
                </div>
              ))}
            </div>
          </RetroScrollArea>
        </div>
      </section>

      {/* Both directions */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Both Directions
        </h2>
        <div className="os9-inset w-[320px]">
          <RetroScrollArea className="h-[200px]" orientation="both">
            <div className="w-[600px] p-2 text-[10px] font-sans leading-[14px]">
              <p className="mb-2 font-bold">Large Content Area</p>
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i} className="mb-1 whitespace-nowrap">
                  Line {i + 1}: This line is intentionally wide to demonstrate
                  horizontal scrolling alongside vertical scrolling in the
                  classic Mac OS 9 style.
                </p>
              ))}
            </div>
          </RetroScrollArea>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Scroll areas use Radix UI ScrollArea with OS 9 styled scrollbars,
        arrow buttons, and beveled thumb.
      </p>
    </ComponentDocLayout>
  )
}
