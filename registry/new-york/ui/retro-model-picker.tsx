"use client"

/*
 * RetroModelPicker: a compact pop-up menu for choosing an AI model, sized
 * for a composer toolbar. The trigger shows the model's icon and name; the
 * menu lists each model with a 16px icon, its name and a one-line
 * description. Built on RetroSelect, so arrows, Home/End, typeahead (on the
 * name only), Return and disabled models all behave like a pop-up menu.
 *
 * Crafted moment: the gliding azul highlight, inherited from RetroSelect.
 * One highlight slides between the two-line rows, and both the name and the
 * description flip to white as it arrives. Classic flair snaps row to row.
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  RetroSelect,
  RetroSelectContent,
  RetroSelectItem,
  RetroSelectItemIcon,
  RetroSelectTrigger,
  RetroSelectValue,
} from "@/registry/new-york/ui/retro-select"

type RetroModel = {
  id: string
  name: string
  /** One line under the name, e.g. "Fast answers for everyday tasks". */
  description?: string
  /** A 16px icon. */
  icon?: React.ReactNode
  disabled?: boolean
}

type RetroModelPickerProps = {
  models: RetroModel[]
  value?: string
  defaultValue?: string
  onValueChange?: (id: string) => void
  disabled?: boolean
  /** Shown when nothing is selected. */
  placeholder?: string
  /** Which way the menu opens. `"top"` suits a composer at the bottom of a chat. */
  side?: "top" | "bottom"
  align?: "start" | "center" | "end"
  /** Classes for the trigger. */
  className?: string
  /** Classes for the menu. */
  contentClassName?: string
  /** Names the trigger for screen readers ("Model: Fast"). */
  "aria-label"?: string
}

/* the description's ink flips with the row's, on the same 60ms delay */
const ROW_CSS = `
.os9-model-row .os9-model-desc { transition: color 0s linear 60ms; }
.os9-select[data-glide-off] .os9-model-row .os9-model-desc { transition: none; }
`

function RetroModelPicker({
  models,
  value,
  defaultValue,
  onValueChange,
  disabled,
  placeholder = "Choose a Model",
  side = "top",
  align = "start",
  className,
  contentClassName,
  "aria-label": ariaLabel = "Model",
}: RetroModelPickerProps) {
  /* items on the root give the trigger its label before the menu has opened */
  const items = React.useMemo(
    () => models.map((m) => ({ value: m.id, label: m.name, disabled: m.disabled })),
    [models]
  )
  const [inner, setInner] = React.useState(defaultValue ?? "")
  const current = models.find((m) => m.id === (value ?? inner))

  return (
    <RetroSelect
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => {
        setInner(next)
        onValueChange?.(next)
      }}
      disabled={disabled}
    >
      <RetroSelectTrigger
        aria-label={`${ariaLabel}: ${current?.name ?? placeholder}`}
        className={cn("w-auto max-w-[220px] min-w-[120px] shrink", className)}
      >
        <span className="inline-flex min-w-0 items-center">
          <RetroSelectValue placeholder={placeholder} className="truncate" />
        </span>
      </RetroSelectTrigger>
      <RetroSelectContent
        side={side}
        align={align}
        className={cn("w-[260px]! max-w-[calc(100vw-16px)]!", contentClassName)}
      >
        <style href="os9-model-picker" precedence="default">
          {ROW_CSS}
        </style>
        {models.map((model) => (
          <RetroSelectItem
            key={model.id}
            value={model.id}
            label={model.name}
            disabled={model.disabled}
            className="os9-model-row group h-auto min-h-[18px] items-start py-[4px] pr-[10px] whitespace-normal"
          >
            {model.icon && (
              <RetroSelectItemIcon className="mt-px mr-[8px] size-[16px] [&>svg]:size-[16px]">
                {model.icon}
              </RetroSelectItemIcon>
            )}
            <span className="flex min-w-0 flex-col gap-[3px]">
              <span className="truncate leading-[16px]">{model.name}</span>
              {model.description && (
                <span
                  className={cn(
                    "os9-model-desc",
                    "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[13px] tracking-normal",
                    "text-os9-gray-700 group-data-highlighted:text-os9-white",
                    "group-data-disabled:text-os9-gray-600"
                  )}
                >
                  {model.description}
                </span>
              )}
            </span>
          </RetroSelectItem>
        ))}
      </RetroSelectContent>
    </RetroSelect>
  )
}

export { RetroModelPicker }
export type { RetroModelPickerProps, RetroModel }
