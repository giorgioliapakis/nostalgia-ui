"use client"

/*
 * retro-motion: the shared motion layer for nostalgia-ui.
 *
 * Flair decides how much modern motion a component plays:
 *
 *   modern  (default) glides, eased zoom rects, height morphs, pop-ins
 *   classic           period-accurate: instant highlights, stepped zoom rects,
 *                     content that appears without easing
 *
 * Set it on any ancestor, usually <html> or <body>: data-flair="classic".
 * CSS reads it with Tailwind's `in-data-[flair=classic]:` variant; JS reads it
 * with getFlair(el) at the moment it animates, so it can change live.
 * prefers-reduced-motion always wins over both.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/* ── popup classes ─────────────────────────────────────── */

/**
 * `cn` for top-layer popup parts. UI SDK resets box properties on popups
 * inside `@layer ui-sdk`, so our defaults carry `!`. A consumer's plain
 * `p-4` or `w-[300px]` would lose to them (and, in apps without
 * `@layer ui-sdk;`, to the reset too), so any consumer class that conflicts
 * with a guarded default is promoted to `!` and wins.
 */
export function popupClass(base: string, className?: string) {
  if (!className) return base
  const guarded = base.split(/\s+/).filter((t) => t.endsWith("!")).map((t) => t.slice(0, -1))
  const promoted = className
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => {
      if (t.endsWith("!") || t.startsWith("!")) return t
      const bare = t.replace(/^(?:[^[\]:]+:)+/, "") // md:p-4 conflicts like p-4
      const conflicts = guarded.some((g) => !cn(g, bare).split(" ").includes(g))
      return conflicts ? `${t}!` : t
    })
  return cn(base, promoted.join(" "))
}

/* ── flair ─────────────────────────────────────────────── */

export type Flair = "modern" | "classic"

export function getFlair(el: Element | null | undefined): Flair {
  const host = el?.closest<HTMLElement>("[data-flair]")
  return host?.dataset.flair === "classic" ? "classic" : "modern"
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/** True when JS choreography should jump to its end state. */
export function motionOff(el: Element | null | undefined) {
  return prefersReducedMotion() || getFlair(el) === "classic"
}

/* ── easing ────────────────────────────────────────────── */

/** Strong ease-out: fast start, long settle. The house curve for entrances. */
export const EASE_OUT_STRONG = "cubic-bezier(0.23, 1, 0.32, 1)"

/* ── refs ──────────────────────────────────────────────── */

export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.RefObject<T | null>).current = node
    }
  }
}

/** A stable merged ref callback (an unstable one re-runs on every render). */
export function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => mergeRefs(...refs), refs)
}

/* ── menu blink ────────────────────────────────────────── */

/*
 * The Mac OS flashed a chosen menu item before running it. Menus return
 * blinkThen(fn) from an item's onSelect: UI SDK marks the item data-pending
 * and keeps the menu open until the promise settles, the CSS blinks the
 * pending row, then the command runs and the menu closes.
 */
export const BLINK_CYCLE_MS = 80
export const BLINK_COUNT = 3

export function blinkThen<T>(fn?: () => T): Promise<T | undefined> {
  const ms = prefersReducedMotion() ? 0 : BLINK_CYCLE_MS * BLINK_COUNT
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms)).then(() => fn?.())
}

/* ── gliding highlight ─────────────────────────────────── */

/*
 * One highlight layer that slides to whichever row is highlighted, instead
 * of each row painting its own, so pointer and keyboard moves read as one
 * continuous motion. Put <span data-glide-layer> as the first child of the
 * container and pass the hook's ref to the container. In classic flair (or
 * reduced motion) the container gets data-glide-off and rows paint
 * themselves as before.
 */
export const GLIDE_MS = 150

const GLIDE_TRANSITION = `transform ${GLIDE_MS}ms ${EASE_OUT_STRONG}, width ${GLIDE_MS}ms ${EASE_OUT_STRONG}, height ${GLIDE_MS}ms ${EASE_OUT_STRONG}, opacity 100ms linear`

/** The highlighted row that belongs to this container (not a nested submenu). */
export function findHighlightedRow(root: HTMLElement) {
  const own = (selector: string) =>
    Array.from(root.querySelectorAll<HTMLElement>(selector)).find(
      (el) => (el.closest('[role="menu"],[role="listbox"]') ?? root) === root
    )
  return (
    own("[data-highlighted]:not([data-disabled])") ?? own("[data-popup-open]") ?? null
  )
}

export function useGlide<T extends HTMLElement>(
  forwardedRef: React.Ref<T> | undefined,
  find: (root: HTMLElement) => HTMLElement | null = findHighlightedRow,
  watch: string[] = ["data-highlighted", "data-popup-open"]
) {
  const watchKey = watch.join(",")
  return React.useCallback(
    (node: T | null) => {
      mergeRefs(forwardedRef)(node)
      if (!node) return
      const layer = node.querySelector<HTMLElement>(":scope > [data-glide-layer]")
      if (!layer) return

      let shown = false
      let hideTimer = 0

      const place = () => {
        const off = motionOff(node)
        node.toggleAttribute("data-glide-off", off)
        if (off) {
          shown = false
          return
        }
        const row = find(node)
        if (!row) {
          /* grace period so crossing a separator keeps the glide alive */
          if (shown && !hideTimer) {
            hideTimer = window.setTimeout(() => {
              hideTimer = 0
              shown = false
              layer.style.opacity = "0"
            }, 90)
          }
          return
        }
        window.clearTimeout(hideTimer)
        hideTimer = 0

        let top = 0
        let left = 0
        let el: HTMLElement | null = row
        while (el && el !== node) {
          top += el.offsetTop
          left += el.offsetLeft
          el = el.offsetParent as HTMLElement | null
        }
        const style = layer.style
        if (!shown) style.transition = "none"
        style.transform = `translate(${left}px, ${top}px)`
        style.width = `${row.offsetWidth}px`
        style.height = `${row.offsetHeight}px`
        if (!shown) {
          void layer.offsetWidth // commit the snap before re-enabling the glide
          style.transition = GLIDE_TRANSITION
        }
        style.opacity = "1"
        shown = true
      }

      place()
      const observer = new MutationObserver(place)
      observer.observe(node, {
        subtree: true,
        attributes: true,
        attributeFilter: watchKey.split(","),
      })
      node.addEventListener("focusin", place)
      node.addEventListener("focusout", place)
      return () => {
        observer.disconnect()
        node.removeEventListener("focusin", place)
        node.removeEventListener("focusout", place)
        window.clearTimeout(hideTimer)
      }
    },
    [forwardedRef, find, watchKey]
  )
}

/* ── zoom rects ────────────────────────────────────────── */

/*
 * When a window opened from an icon, the Finder drew a trail of outline
 * rectangles growing from the icon to the window, then showed the window;
 * closing played it backwards. playZoomRects flies a few 1px outlines
 * between two rects (Web Animations API, appended to <body>, removed after).
 *
 *   modern   eased, 240ms        classic   steps(7), 210ms
 */
const ZOOM_TRAIL = 4
const ZOOM_TRAIL_GAP_MS = 28

export function zoomDuration(source: Element | null | undefined) {
  if (prefersReducedMotion() || !source) return 0
  return getFlair(source) === "classic" ? 210 : 240
}

/** Plays the rects and resolves when the leading rect lands. */
export function playZoomRects(
  from: DOMRect,
  to: DOMRect,
  source: Element | null | undefined
): Promise<void> {
  const duration = zoomDuration(source)
  if (!duration) return Promise.resolve()
  const classic = getFlair(source) === "classic"
  const easing = classic ? "steps(7, end)" : EASE_OUT_STRONG

  const box = (r: DOMRect) => ({
    transform: `translate(${r.left}px, ${r.top}px)`,
    width: `${r.width}px`,
    height: `${r.height}px`,
  })

  for (let i = 0; i < ZOOM_TRAIL; i++) {
    const el = document.createElement("div")
    el.setAttribute("aria-hidden", "true")
    Object.assign(el.style, {
      position: "fixed",
      left: "0",
      top: "0",
      zIndex: "2147483647",
      pointerEvents: "none",
      boxSizing: "border-box",
      border: "1px solid var(--os9-black, #262626)",
      opacity: "0",
    })
    document.body.appendChild(el)
    const fade = i === 0 ? 1 : 1 - i / (ZOOM_TRAIL + 1)
    const anim = el.animate(
      [
        { ...box(from), opacity: fade },
        { ...box(to), opacity: fade },
      ],
      { duration, delay: i * ZOOM_TRAIL_GAP_MS, easing, fill: "both" }
    )
    anim.onfinish = () => el.remove()
    anim.oncancel = () => el.remove()
  }
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration))
}

/*
 * useZoomRects wires zoom rects to a popup that opens from a trigger:
 * pass `triggerRef` to the trigger and `contentRef` to the popup content,
 * and call `onOpenChange(open)` from the root's onOpenChange. The content
 * should hide until --os9-zoom-delay with:
 *   transition-opacity duration-0 [transition-delay:var(--os9-zoom-delay,0ms)]
 *   data-starting-style:opacity-0 data-ending-style:opacity-0
 *   data-ending-style:[transition-delay:0ms]
 */
export function useZoomRects<C extends HTMLElement = HTMLElement>() {
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const contentNode = React.useRef<C | null>(null)

  const contentRef = React.useCallback((node: C | null) => {
    contentNode.current = node
    if (!node) return
    const trigger = triggerRef.current
    const delay = trigger?.isConnected ? zoomDuration(trigger) : 0
    /* +1 frame: top-layer content is only laid out after mount */
    node.style.setProperty("--os9-zoom-delay", `${delay ? delay + 16 : 0}ms`)
    if (trigger && delay) {
      requestAnimationFrame(() =>
        playZoomRects(trigger.getBoundingClientRect(), node.getBoundingClientRect(), trigger)
      )
    }
  }, [])

  const onOpenChange = React.useCallback((open: boolean) => {
    const trigger = triggerRef.current
    const content = contentNode.current
    if (!open && trigger?.isConnected && content) {
      void playZoomRects(content.getBoundingClientRect(), trigger.getBoundingClientRect(), trigger)
    }
  }, [])

  return { triggerRef, contentRef, onOpenChange }
}

/** Classes for content that waits for its zoom rects (see useZoomRects). */
export const ZOOM_CONTENT_CLASS =
  "transition-opacity duration-0 [transition-delay:var(--os9-zoom-delay,0ms)] data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:[transition-delay:0ms]"
