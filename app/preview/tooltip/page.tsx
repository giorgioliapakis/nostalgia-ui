"use client"

import { RetroButton } from "@/registry/new-york/ui/retro-button"
import {
  RetroTooltipProvider,
  RetroTooltip,
  RetroTooltipTrigger,
  RetroTooltipContent,
} from "@/registry/new-york/ui/retro-tooltip"

export default function TooltipPreview() {
  return (
    <RetroTooltipProvider delayDuration={300}>
      <main className="min-h-screen bg-os9-gray-200 p-8">
        <h1 className="os9-heading text-[18px] mb-8">
          RetroTooltip Preview
        </h1>

        {/* Basic tooltip on a button */}
        <section className="mb-8">
          <h2 className="os9-heading text-[14px] mb-4">Button Tooltip</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <RetroTooltip>
              <RetroTooltipTrigger asChild>
                <RetroButton>Hover Me</RetroButton>
              </RetroTooltipTrigger>
              <RetroTooltipContent>
                This is a standard button.
              </RetroTooltipContent>
            </RetroTooltip>

            <RetroTooltip>
              <RetroTooltipTrigger asChild>
                <RetroButton variant="primary">Save</RetroButton>
              </RetroTooltipTrigger>
              <RetroTooltipContent>
                Save the current document to disk.
              </RetroTooltipContent>
            </RetroTooltip>

            <RetroTooltip>
              <RetroTooltipTrigger asChild>
                <RetroButton disabled>Disabled</RetroButton>
              </RetroTooltipTrigger>
              <RetroTooltipContent>
                This action is currently unavailable.
              </RetroTooltipContent>
            </RetroTooltip>
          </div>
        </section>

        {/* Tooltip on inline text */}
        <section className="mb-8">
          <h2 className="os9-heading text-[14px] mb-4">Inline Text Tooltip</h2>
          <p className="os9-heading text-[12px] leading-relaxed">
            Welcome to{" "}
            <RetroTooltip>
              <RetroTooltipTrigger asChild>
                <span className="underline decoration-dotted cursor-help">
                  Balloon Help
                </span>
              </RetroTooltipTrigger>
              <RetroTooltipContent>
                Balloon Help was introduced in System 7 to provide
                contextual tips for interface elements.
              </RetroTooltipContent>
            </RetroTooltip>
            . Hover the underlined terms to learn more about{" "}
            <RetroTooltip>
              <RetroTooltipTrigger asChild>
                <span className="underline decoration-dotted cursor-help">
                  Mac OS 9
                </span>
              </RetroTooltipTrigger>
              <RetroTooltipContent>
                Mac OS 9, released in 1999, was the last major release
                of the classic Macintosh operating system.
              </RetroTooltipContent>
            </RetroTooltip>
            .
          </p>
        </section>

        {/* Tooltip positioning */}
        <section className="mb-8">
          <h2 className="os9-heading text-[14px] mb-4">Positioning</h2>
          <div className="flex items-center gap-6 flex-wrap">
            <RetroTooltip>
              <RetroTooltipTrigger asChild>
                <RetroButton>Top</RetroButton>
              </RetroTooltipTrigger>
              <RetroTooltipContent side="top">
                Appears above the trigger.
              </RetroTooltipContent>
            </RetroTooltip>

            <RetroTooltip>
              <RetroTooltipTrigger asChild>
                <RetroButton>Bottom</RetroButton>
              </RetroTooltipTrigger>
              <RetroTooltipContent side="bottom">
                Appears below the trigger.
              </RetroTooltipContent>
            </RetroTooltip>

            <RetroTooltip>
              <RetroTooltipTrigger asChild>
                <RetroButton>Left</RetroButton>
              </RetroTooltipTrigger>
              <RetroTooltipContent side="left">
                Appears to the left.
              </RetroTooltipContent>
            </RetroTooltip>

            <RetroTooltip>
              <RetroTooltipTrigger asChild>
                <RetroButton>Right</RetroButton>
              </RetroTooltipTrigger>
              <RetroTooltipContent side="right">
                Appears to the right.
              </RetroTooltipContent>
            </RetroTooltip>
          </div>
        </section>

        <p className="text-os9-gray-700 text-[9px] mt-8">
          Hover over buttons and underlined text to see OS9 Balloon Help
          style tooltips.
        </p>
      </main>
    </RetroTooltipProvider>
  )
}
