"use client"

import * as React from "react"

import { RetroToggleGroup, RetroToggleGroupItem } from "@/registry/new-york/ui/retro-toggle-group"

type Flair = "modern" | "classic"
const KEY = "os9-flair"

function readFlair(): Flair {
  if (typeof document === "undefined") return "modern"
  return document.documentElement.dataset.flair === "classic" ? "classic" : "modern"
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-flair"] })
  return () => observer.disconnect()
}

/**
 * Switches the whole site between modern flair (the default refinements) and
 * classic (OS 9 as it shipped: instant menus, no glide, stepped motion).
 * Sets `data-flair` on <html>; the root layout restores it before paint.
 */
export function FlairToggle({ className }: { className?: string }) {
  const flair = React.useSyncExternalStore(subscribe, readFlair, () => "modern" as Flair)

  const set = (next: Flair) => {
    const root = document.documentElement
    if (next === "classic") root.setAttribute("data-flair", "classic")
    else root.removeAttribute("data-flair")
    try {
      localStorage.setItem(KEY, next)
    } catch {}
  }

  return (
    <RetroToggleGroup
      size="sm"
      aria-label="Motion flair"
      value={flair}
      onValueChange={(next) => next && set(next as Flair)}
      className={className}
    >
      <RetroToggleGroupItem value="modern">Modern</RetroToggleGroupItem>
      <RetroToggleGroupItem value="classic">Classic</RetroToggleGroupItem>
    </RetroToggleGroup>
  )
}
