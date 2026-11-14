"use client"

import * as React from "react"

import { RetroIcon } from "@/registry/new-york/ui/retro-icons"
import { RetroModelPicker, type RetroModel } from "@/registry/new-york/ui/retro-model-picker"
import { RetroPromptInput } from "@/registry/new-york/ui/retro-prompt-input"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "A Mac OS 9 pop-up menu for choosing an AI model, with an icon and a short description per model."

const USAGE = `const models = [
  { id: "quick", name: "Quick", description: "Fast answers for everyday questions", icon: <QuickIcon /> },
  { id: "thorough", name: "Thorough", description: "Thinks longer; better with files and plans" },
]

<RetroModelPicker models={models} value={model} onValueChange={setModel} />`

const MODELS: RetroModel[] = [
  {
    id: "quick",
    name: "Quick",
    description: "Fast answers for everyday questions",
    icon: <RetroIcon name="happy-mac" size="sm" />,
  },
  {
    id: "thorough",
    name: "Thorough",
    description: "Thinks longer; better with files and plans",
    icon: <RetroIcon name="finder" size="sm" />,
  },
  {
    id: "on-device",
    name: "On This Mac",
    description: "Runs locally. Nothing leaves your computer",
    icon: <RetroIcon name="hard-drive" size="sm" />,
  },
  {
    id: "research",
    name: "Research",
    description: "Searches the web; needs a network connection",
    icon: <RetroIcon name="network" size="sm" />,
    disabled: true,
  },
]

export default function ModelPickerPage() {
  const [model, setModel] = React.useState("thorough")
  return (
    <ComponentDocLayout
      name="retro-model-picker"
      title="RetroModelPicker"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic</h2>
        <div className="flex items-center gap-3">
          <RetroModelPicker models={MODELS} value={model} onValueChange={setModel} side="bottom" />
          <span className="text-[10px] text-os9-gray-700">
            Selected: <code className="font-mono">{model}</code>
          </span>
        </div>
        <p className="mt-3 max-w-[520px] text-[10px] leading-[1.5] text-os9-gray-700">
          Arrow keys move the highlight, typing a name jumps to it, and Return chooses.
          Models that aren&apos;t available stay in the list, dimmed.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">In a Composer</h2>
        <div className="max-w-[520px]">
          <RetroPromptInput
            placeholder="Ask about your Mac…"
            toolbar={<RetroModelPicker models={MODELS} defaultValue="quick" />}
          />
        </div>
        <p className="mt-3 max-w-[520px] text-[10px] leading-[1.5] text-os9-gray-700">
          In a prompt input&apos;s <code className="font-mono">toolbar</code> the menu opens
          upward (<code className="font-mono">side=&quot;top&quot;</code>, the default).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">No Selection, Disabled</h2>
        <div className="flex items-center gap-3">
          <RetroModelPicker models={MODELS} side="bottom" />
          <RetroModelPicker models={MODELS} defaultValue="quick" disabled side="bottom" />
        </div>
      </section>
    </ComponentDocLayout>
  )
}
