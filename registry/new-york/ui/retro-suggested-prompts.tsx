"use client"

/*
 * RetroSuggestedPrompts: starter prompts for an empty chat, as a wrapping
 * row of bevel buttons. Choosing one hands its prompt to `onSelect`; fill
 * the composer with it, or send it straight away.
 *
 * Crafted moment: the buttons arrive one after another, each fading in and
 * rising 4px, 30ms apart, so the row reads as a set being laid out rather
 * than a block popping in. Modern flair only; classic flair and reduced
 * motion show the row at once. Remount it (change its `key`) to replay.
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroBevelButton } from "@/registry/new-york/ui/retro-bevel-button"

/* Shared with the other AI components; deduped by href. */
const RISE_CSS = `
@keyframes os9-ai-rise { from { opacity: 0; transform: translateY(4px); } }
.os9-ai-rise { animation: os9-ai-rise 160ms cubic-bezier(0.23, 1, 0.32, 1) both; }
[data-flair="classic"] .os9-ai-rise { animation: none; }
@media (prefers-reduced-motion: reduce) { .os9-ai-rise { animation: none; } }
`

const STAGGER_MS = 30

type RetroSuggestion =
  | string
  | {
      /** What the button says. */
      label: string
      /** What `onSelect` receives; defaults to `label`. */
      prompt?: string
      /** A 16px icon before the label. */
      icon?: React.ReactNode
      disabled?: boolean
    }

type RetroSuggestedPromptsProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  suggestions: RetroSuggestion[]
  /** Fires with the chosen suggestion's prompt. */
  onSelect?: (prompt: string) => void
  disabled?: boolean
  /** Bevel depth of the buttons. */
  bevel?: "small" | "normal" | "large"
}

function RetroSuggestedPrompts({
  suggestions,
  onSelect,
  disabled,
  bevel = "small",
  className,
  "aria-label": ariaLabel = "Suggestions",
  ...props
}: RetroSuggestedPromptsProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      data-slot="suggested-prompts"
      className={cn("flex flex-wrap gap-[6px]", className)}
      {...props}
    >
      <style href="os9-ai-rise" precedence="default">
        {RISE_CSS}
      </style>
      {suggestions.map((suggestion, index) => {
        const item = typeof suggestion === "string" ? { label: suggestion } : suggestion
        const prompt = ("prompt" in item && item.prompt) || item.label
        return (
          <RetroBevelButton
            key={`${item.label}-${index}`}
            data-slot="suggested-prompt"
            bevel={bevel}
            icon={"icon" in item ? item.icon : undefined}
            disabled={disabled || ("disabled" in item && item.disabled)}
            onClick={() => onSelect?.(prompt)}
            style={{ animationDelay: `${index * STAGGER_MS}ms` }}
            className="os9-ai-rise max-w-full min-w-0 justify-start [&>span:last-child]:min-w-0"
          >
            <span className="truncate">{item.label}</span>
          </RetroBevelButton>
        )
      })}
    </div>
  )
}

export { RetroSuggestedPrompts }
export type { RetroSuggestedPromptsProps, RetroSuggestion }
