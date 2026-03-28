"use client"

import {
  RetroToolbar,
  RetroToolbarButton,
  RetroToolbarSeparator,
  RetroToolbarGroup,
} from "@/registry/new-york/ui/retro-toolbar"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function ToolbarPreview() {
  return (
    <ComponentDocLayout
      name="retro-toolbar"
      title="RetroToolbar"
      description="An application toolbar with Mac OS 9 beveled buttons, separators, and grouped controls."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A toolbar component with beveled buttons, separators, and groups. Used
        for application toolbars with icon or text buttons.
      </p>

      {/* Basic toolbar */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic Toolbar</h2>
        <div className="w-[500px] border border-os9-black">
          <RetroToolbar>
            <RetroToolbarGroup>
              <RetroToolbarButton aria-label="Back">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </RetroToolbarButton>
              <RetroToolbarButton aria-label="Forward">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </RetroToolbarButton>
            </RetroToolbarGroup>

            <RetroToolbarSeparator />

            <RetroToolbarGroup>
              <RetroToolbarButton aria-label="List view">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <rect x="1" y="1" width="8" height="2" />
                  <rect x="1" y="4" width="8" height="2" />
                  <rect x="1" y="7" width="8" height="2" />
                </svg>
              </RetroToolbarButton>
              <RetroToolbarButton aria-label="Icon view">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <rect x="1" y="1" width="3" height="3" />
                  <rect x="6" y="1" width="3" height="3" />
                  <rect x="1" y="6" width="3" height="3" />
                  <rect x="6" y="6" width="3" height="3" />
                </svg>
              </RetroToolbarButton>
            </RetroToolbarGroup>

            <RetroToolbarSeparator />

            <RetroToolbarButton aria-label="Search">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="4.5" cy="4.5" r="3" stroke="currentColor" strokeWidth="1.5" />
                <line x1="7" y1="7" x2="9" y2="9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </RetroToolbarButton>
          </RetroToolbar>
        </div>
      </section>

      {/* Text buttons */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Text Button Toolbar</h2>
        <div className="w-[500px] border border-os9-black">
          <RetroToolbar>
            <RetroToolbarButton className="w-auto px-2 text-[9px] font-[family-name:var(--font-heading)]">
              B
            </RetroToolbarButton>
            <RetroToolbarButton className="w-auto px-2 text-[9px] font-[family-name:var(--font-heading)] italic">
              I
            </RetroToolbarButton>
            <RetroToolbarButton className="w-auto px-2 text-[9px] font-[family-name:var(--font-heading)] underline">
              U
            </RetroToolbarButton>
            <RetroToolbarSeparator />
            <RetroToolbarButton className="w-auto px-2 text-[9px] font-[family-name:var(--font-heading)]">
              L
            </RetroToolbarButton>
            <RetroToolbarButton className="w-auto px-2 text-[9px] font-[family-name:var(--font-heading)]">
              C
            </RetroToolbarButton>
            <RetroToolbarButton className="w-auto px-2 text-[9px] font-[family-name:var(--font-heading)]">
              R
            </RetroToolbarButton>
          </RetroToolbar>
        </div>
      </section>

      {/* With disabled buttons */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Disabled Buttons</h2>
        <div className="w-[300px] border border-os9-black">
          <RetroToolbar>
            <RetroToolbarButton aria-label="Cut">
              <span className="text-[8px]">Cut</span>
            </RetroToolbarButton>
            <RetroToolbarButton aria-label="Copy">
              <span className="text-[8px]">Copy</span>
            </RetroToolbarButton>
            <RetroToolbarButton disabled aria-label="Paste">
              <span className="text-[8px]">Paste</span>
            </RetroToolbarButton>
            <RetroToolbarSeparator />
            <RetroToolbarButton disabled aria-label="Undo">
              <span className="text-[8px]">Undo</span>
            </RetroToolbarButton>
          </RetroToolbar>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Press and hold buttons to see the active/pressed bevel state. Disabled
        buttons appear at 50% opacity. Separators provide visual grouping.
      </p>
    </ComponentDocLayout>
  )
}
