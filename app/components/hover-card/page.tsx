"use client"

import {
  RetroHoverCard,
  RetroHoverCardTrigger,
  RetroHoverCardContent,
} from "@/registry/new-york/ui/retro-hover-card"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function HoverCardPreview() {
  return (
    <ComponentDocLayout
      name="retro-hover-card"
      title="RetroHoverCard"
      description="A hover-triggered popup card with Mac OS 9 raised bevel for previewing link content."
    >
      {/* Basic hover card on a link */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic Link Hover Card</h2>
        <p className="os9-heading text-[12px] leading-[1.6]">
          Visit the{" "}
          <RetroHoverCard>
            <RetroHoverCardTrigger asChild>
              <a
                href="https://support.apple.com"
                target="_blank"
                rel="noreferrer"
                className="text-os9-azul underline cursor-pointer"
              >
                Apple Support
              </a>
            </RetroHoverCardTrigger>
            <RetroHoverCardContent>
              <p className="font-bold mb-1">Apple Support</p>
              <p>
                Get help with your Apple devices and services. Browse manuals,
                tech specs, and troubleshooting articles.
              </p>
            </RetroHoverCardContent>
          </RetroHoverCard>{" "}
          page for troubleshooting.
        </p>
      </section>

      {/* Multiple hover cards in a sentence */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Multiple Inline Hover Cards
        </h2>
        <p className="os9-heading text-[12px] leading-[1.6]">
          Classic Mac OS shipped with{" "}
          <RetroHoverCard>
            <RetroHoverCardTrigger asChild>
              <a
                href="#"
                className="text-os9-azul underline cursor-pointer"
              >
                SimpleText
              </a>
            </RetroHoverCardTrigger>
            <RetroHoverCardContent>
              <p className="font-bold mb-1">SimpleText</p>
              <p>
                A basic text editor included with every Mac. Supported styled
                text, inline images, and even text-to-speech.
              </p>
            </RetroHoverCardContent>
          </RetroHoverCard>
          ,{" "}
          <RetroHoverCard>
            <RetroHoverCardTrigger asChild>
              <a
                href="#"
                className="text-os9-azul underline cursor-pointer"
              >
                Sherlock
              </a>
            </RetroHoverCardTrigger>
            <RetroHoverCardContent>
              <p className="font-bold mb-1">Sherlock</p>
              <p>
                A search utility that could find files on your Mac and search the
                internet. Named after the famous detective.
              </p>
            </RetroHoverCardContent>
          </RetroHoverCard>
          , and{" "}
          <RetroHoverCard>
            <RetroHoverCardTrigger asChild>
              <a
                href="#"
                className="text-os9-azul underline cursor-pointer"
              >
                Finder
              </a>
            </RetroHoverCardTrigger>
            <RetroHoverCardContent>
              <p className="font-bold mb-1">Finder</p>
              <p>
                The graphical file manager and desktop shell. The smiling Mac
                icon was its trademark since 1984.
              </p>
            </RetroHoverCardContent>
          </RetroHoverCard>
          .
        </p>
      </section>

      {/* Hover card with richer content */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Rich Content</h2>
        <p className="os9-heading text-[12px] leading-[1.6]">
          Learn more about the{" "}
          <RetroHoverCard>
            <RetroHoverCardTrigger asChild>
              <a
                href="#"
                className="text-os9-azul underline cursor-pointer"
              >
                Power Macintosh G3
              </a>
            </RetroHoverCardTrigger>
            <RetroHoverCardContent>
              <p className="font-bold mb-1">Power Macintosh G3</p>
              <p className="mb-2">
                Released in 1997, the G3 line brought PowerPC 750 processors
                to the Mac platform.
              </p>
              <div className="border-t border-[var(--os9-gray-600)] pt-1 text-[10px] text-os9-gray-700">
                CPU: 233-366 MHz | RAM: 32-384 MB | OS: Mac OS 8.0-9.2
              </div>
            </RetroHoverCardContent>
          </RetroHoverCard>{" "}
          series.
        </p>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Hover over any blue link to see the hover card appear.
      </p>
    </ComponentDocLayout>
  )
}
