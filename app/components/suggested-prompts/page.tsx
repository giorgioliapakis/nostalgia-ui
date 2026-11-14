"use client"

import * as React from "react"

import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroIcon } from "@/registry/new-york/ui/retro-icons"
import { RetroPromptInput } from "@/registry/new-york/ui/retro-prompt-input"
import {
  RetroSuggestedPrompts,
  type RetroSuggestion,
} from "@/registry/new-york/ui/retro-suggested-prompts"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION = "A row of Mac OS 9 bevel buttons offering starter prompts for an AI chat."

const USAGE = `<RetroSuggestedPrompts
  suggestions={[
    "Tidy my desktop",
    { label: "Write a Read Me", prompt: "Write a Read Me for my HyperCard stack", icon: <DocIcon /> },
  ]}
  onSelect={(prompt) => setDraft(prompt)}
/>`

const PLAIN = [
  "Tidy my desktop",
  "Find last week's invoices",
  "Why is my Mac slow?",
  "Fix extension conflicts",
]

const WITH_ICONS: RetroSuggestion[] = [
  {
    label: "Tidy my desktop",
    prompt: "Tidy my desktop: put screenshots in one folder and move old downloads to the Trash.",
    icon: <RetroIcon name="folder" size="sm" />,
  },
  {
    label: "Find a file",
    prompt: "Find the Word document I was editing on Tuesday afternoon.",
    icon: <RetroIcon name="search" size="sm" />,
  },
  {
    label: "Write a Read Me",
    prompt: "Write a short Read Me for my HyperCard stack, with install steps.",
    icon: <RetroIcon name="document" size="sm" />,
  },
  {
    label: "Free up memory",
    prompt: "Which extensions can I turn off to free up memory?",
    icon: <RetroIcon name="memory" size="sm" />,
  },
  {
    label: "Set up printing",
    prompt: "Help me set up my LaserWriter on the network.",
    icon: <RetroIcon name="printer" size="sm" />,
  },
]

export default function SuggestedPromptsPage() {
  const [replay, setReplay] = React.useState(0)
  const [picked, setPicked] = React.useState<string | null>(null)
  const [draft, setDraft] = React.useState("")
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  return (
    <ComponentDocLayout
      name="retro-suggested-prompts"
      title="RetroSuggestedPrompts"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Basic</h2>
        <RetroSuggestedPrompts key={replay} suggestions={PLAIN} onSelect={setPicked} />
        <div className="mt-3 flex items-center gap-3">
          <RetroButton size="sm" onClick={() => setReplay((r) => r + 1)}>
            Replay
          </RetroButton>
          <span className="text-[10px] text-os9-gray-700">
            Chose: <code className="font-mono">{picked ?? "nothing yet"}</code>
          </span>
        </div>
        <p className="mt-3 max-w-[520px] text-[10px] leading-[1.5] text-os9-gray-700">
          The buttons arrive one after another, 30ms apart. Classic flair and reduced motion
          show them at once.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Icons, Filling a Composer</h2>
        <div className="max-w-[520px]">
          <RetroSuggestedPrompts
            suggestions={WITH_ICONS}
            onSelect={(prompt) => {
              setDraft(prompt)
              inputRef.current?.focus()
            }}
            className="mb-3"
          />
          <RetroPromptInput
            value={draft}
            onValueChange={setDraft}
            inputRef={inputRef}
            placeholder="Choose a suggestion or type your own…"
          />
        </div>
        <p className="mt-3 max-w-[520px] text-[10px] leading-[1.5] text-os9-gray-700">
          Give a suggestion a <code className="font-mono">prompt</code> when the text it sends
          is longer than its label.
        </p>
      </section>
    </ComponentDocLayout>
  )
}
