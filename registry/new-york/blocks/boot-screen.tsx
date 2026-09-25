"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  RetroIconExtension,
  RetroIconFloppy,
  RetroIconHappyMac,
  RetroIconHardDrive,
  RetroIconMemory,
  RetroIconNetwork,
  RetroIconPreferences,
  RetroIconPrinter,
  RetroIconSearch,
} from "@/registry/new-york/ui/retro-icons"
import { RetroProgress } from "@/registry/new-york/ui/retro-progress"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BootScreenBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Controlled progress 0–100. Ignored when `autoPlay` is set. */
  progress?: number
  /** Animate from 0 to 100 on mount, then call `onComplete`. */
  autoPlay?: boolean
  /** Duration of the autoPlay sequence in ms. Defaults to 4000. */
  duration?: number
  /** Called once when progress reaches 100 (autoPlay or controlled). */
  onComplete?: () => void
  /** Headline in the welcome box. Defaults to "Welcome to Mac OS". */
  message?: string
  /** Extension icons that march along the bottom as progress advances. */
  extensions?: React.ReactNode[]
}

const DEFAULT_EXTENSIONS: React.ReactNode[] = [
  <RetroIconExtension key="ext" />,
  <RetroIconMemory key="mem" />,
  <RetroIconNetwork key="net" />,
  <RetroIconPrinter key="print" />,
  <RetroIconPreferences key="prefs" />,
  <RetroIconHardDrive key="hd" />,
  <RetroIconFloppy key="floppy" />,
  <RetroIconSearch key="search" />,
  <RetroIconExtension key="ext2" />,
  <RetroIconMemory key="mem2" />,
]

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )
}

/**
 * Drives progress 0 → 100 over `duration`. With reduced motion the bar
 * advances in four discrete steps instead of a continuous sweep.
 */
function useAutoProgress(enabled: boolean, duration: number, reduced: boolean) {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    if (!enabled) return
    const start = performance.now()
    let frame = 0
    let timer: ReturnType<typeof setTimeout> | undefined

    if (reduced) {
      let step = 0
      const tick = () => {
        step += 1
        setValue(Math.min(100, step * 25))
        if (step < 4) timer = setTimeout(tick, duration / 4)
      }
      timer = setTimeout(tick, duration / 4)
    } else {
      const loop = (now: number) => {
        const pct = Math.min(100, ((now - start) / duration) * 100)
        setValue(pct)
        if (pct < 100) frame = requestAnimationFrame(loop)
      }
      frame = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(frame)
      if (timer) clearTimeout(timer)
    }
  }, [enabled, duration, reduced])

  return value
}

/* ------------------------------------------------------------------ */
/*  BootScreenBlock                                                    */
/* ------------------------------------------------------------------ */

const BootScreenBlock = React.forwardRef<HTMLDivElement, BootScreenBlockProps>(
  function BootScreenBlock(
    {
      progress,
      autoPlay = false,
      duration = 4000,
      onComplete,
      message = "Welcome to Mac OS",
      extensions = DEFAULT_EXTENSIONS,
      className,
      ...props
    },
    ref
  ) {
    const reduced = usePrefersReducedMotion()
    const auto = useAutoProgress(autoPlay, duration, reduced)
    const value = Math.min(100, Math.max(0, autoPlay ? auto : (progress ?? 0)))
    const shown = Math.floor((value / 100) * extensions.length)

    // Fire onComplete once per run when we hit 100
    const onCompleteRef = React.useRef(onComplete)
    React.useEffect(() => {
      onCompleteRef.current = onComplete
    })
    const completed = React.useRef(false)
    React.useEffect(() => {
      if (value >= 100 && !completed.current) {
        completed.current = true
        onCompleteRef.current?.()
      } else if (value < 100) {
        completed.current = false
      }
    }, [value])

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-os9-gray-400 px-4 pb-20 pt-10",
          className
        )}
        {...props}
      >
        {/* Welcome box */}
        <div className="w-full max-w-[280px] border border-os9-black bg-os9-gray-200 p-[3px] shadow-[var(--os9-shadow-window)]">
          <div className="flex flex-col items-center gap-3 border border-os9-gray-600 px-5 pb-5 pt-5 shadow-[inset_1px_1px_0_var(--os9-white)]">
            <RetroIconHappyMac size="xl" />
            <p className="os9-heading text-center text-[14px] text-os9-black">
              {message}
            </p>
            <RetroProgress
              value={value}
              aria-label="Starting up"
              className="h-[12px]"
            />
            <p className="sr-only" aria-live="polite">
              {value >= 100 ? "Startup complete" : ""}
            </p>
          </div>
        </div>

        {/* Extension parade */}
        <div
          className="absolute inset-x-3 bottom-3 flex flex-wrap-reverse content-start gap-1"
          aria-hidden
        >
          {extensions.slice(0, shown).map((icon, i) => (
            <span
              key={i}
              className={cn(
                "flex size-8 items-center justify-center",
                !reduced && "boot-screen-ext"
              )}
            >
              {icon}
            </span>
          ))}
        </div>

        <style href="boot-screen-block" precedence="default">{`
          @keyframes boot-screen-ext-in {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: none; }
          }
          .boot-screen-ext { animation: boot-screen-ext-in 180ms steps(3) both; }
          @media (prefers-reduced-motion: reduce) {
            .boot-screen-ext { animation: none; }
          }
        `}</style>
      </div>
    )
  }
)
BootScreenBlock.displayName = "BootScreenBlock"

export { BootScreenBlock }
export type { BootScreenBlockProps }
