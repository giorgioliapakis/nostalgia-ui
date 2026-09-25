"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Press-and-hold repeat                                              */
/* ------------------------------------------------------------------ */

/** Delay before auto-repeat kicks in, then the repeat interval (ms). */
const REPEAT_DELAY = 400
const REPEAT_INTERVAL = 60

/**
 * Returns pointer handlers that fire `action` once on press, then keep
 * firing while held. Always calls the latest `action`, and clears its
 * timers on release, cancel, blur and unmount.
 */
function useAutoRepeat(action: (() => void) | undefined, disabled: boolean) {
  const actionRef = React.useRef(action)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  React.useLayoutEffect(() => {
    actionRef.current = action
  })

  const stop = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
    timeoutRef.current = null
    intervalRef.current = null
  }, [])

  React.useEffect(() => stop, [stop])
  React.useEffect(() => {
    if (disabled) stop()
  }, [disabled, stop])

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || event.button !== 0) return
    // Keep focus on whatever owns it (e.g. the number field input)
    event.preventDefault()
    stop()
    actionRef.current?.()
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        actionRef.current?.()
      }, REPEAT_INTERVAL)
    }, REPEAT_DELAY)
  }

  // Keyboard activation (Enter / Space) produces a click with detail 0;
  // pointer presses were already handled in onPointerDown.
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && event.detail === 0) actionRef.current?.()
  }

  return {
    onPointerDown,
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    onBlur: stop,
    onClick,
  }
}

/* ------------------------------------------------------------------ */
/*  Arrow half                                                         */
/* ------------------------------------------------------------------ */

function LittleArrowButton({
  direction,
  onStep,
  disabled,
  label,
  tabIndex,
}: {
  direction: "up" | "down"
  onStep?: () => void
  disabled: boolean
  label: string
  tabIndex?: number
}) {
  const handlers = useAutoRepeat(onStep, disabled)

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      tabIndex={tabIndex}
      data-direction={direction}
      className={cn(
        "flex flex-1 items-center justify-center p-0",
        "bg-os9-gray-300 text-os9-black",
        "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
        "active:bg-os9-gray-700 active:text-os9-white",
        "active:shadow-[inset_1px_1px_0_var(--os9-gray-800),inset_-1px_-1px_0_var(--os9-gray-500)]",
        "cursor-pointer select-none touch-none transition-none",
        "focus-visible:relative focus-visible:z-10 focus-visible:os9-focus-ring",
        "disabled:cursor-not-allowed disabled:text-os9-gray-600",
        direction === "up" && "border-b border-os9-black"
      )}
      {...handlers}
    >
      <svg width="7" height="4" viewBox="0 0 7 4" aria-hidden="true">
        <path
          d={direction === "up" ? "M3.5 0L7 4H0Z" : "M0 0H7L3.5 4Z"}
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroLittleArrows                                                  */
/* ------------------------------------------------------------------ */

interface RetroLittleArrowsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Called on press of the up arrow, and repeatedly while held. */
  onIncrement?: () => void
  /** Called on press of the down arrow, and repeatedly while held. */
  onDecrement?: () => void
  /** Disables both arrows. */
  disabled?: boolean
  /** Disables only the up arrow (e.g. value is at max). */
  incrementDisabled?: boolean
  /** Disables only the down arrow (e.g. value is at min). */
  decrementDisabled?: boolean
  /** Accessible label for the up arrow. */
  incrementLabel?: string
  /** Accessible label for the down arrow. */
  decrementLabel?: string
  /**
   * Tab index for both arrow buttons. Pass -1 when the arrows accompany a
   * field that already handles ArrowUp / ArrowDown (as RetroNumberField does).
   */
  buttonTabIndex?: number
}

const RetroLittleArrows = React.forwardRef<
  HTMLDivElement,
  RetroLittleArrowsProps
>(function RetroLittleArrows(
  {
    className,
    onIncrement,
    onDecrement,
    disabled = false,
    incrementDisabled = false,
    decrementDisabled = false,
    incrementLabel = "Increment",
    decrementLabel = "Decrement",
    buttonTabIndex,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      role="group"
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "inline-flex h-[23px] w-[13px] shrink-0 flex-col",
        "border border-os9-black bg-os9-gray-300",
        "shadow-[1px_1px_0_rgba(38,38,38,0.3)]",
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <LittleArrowButton
        direction="up"
        label={incrementLabel}
        onStep={onIncrement}
        disabled={disabled || incrementDisabled}
        tabIndex={buttonTabIndex}
      />
      <LittleArrowButton
        direction="down"
        label={decrementLabel}
        onStep={onDecrement}
        disabled={disabled || decrementDisabled}
        tabIndex={buttonTabIndex}
      />
    </div>
  )
})
RetroLittleArrows.displayName = "RetroLittleArrows"

/* ------------------------------------------------------------------ */
/*  RetroNumberField                                                   */
/* ------------------------------------------------------------------ */

function decimalsOf(n: number) {
  if (!Number.isFinite(n)) return 0
  const s = String(n)
  const e = s.indexOf("e-")
  if (e !== -1) return parseInt(s.slice(e + 2), 10)
  const dot = s.indexOf(".")
  return dot === -1 ? 0 : s.length - dot - 1
}

interface RetroNumberFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type" | "min" | "max" | "step" | "size"
  > {
  /** Controlled value. */
  value?: number
  /** Initial value when uncontrolled. Defaults to `min` or 0. */
  defaultValue?: number
  /** Fires with the committed, clamped value. */
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  /** Amount per arrow press / ArrowUp / ArrowDown. PageUp/Down use step × 10. */
  step?: number
  /** Custom display formatting (e.g. units). Parsing uses parseFloat. */
  formatValue?: (value: number) => string
  /** Classes for the wrapper (the input + arrows row). */
  className?: string
  /** Classes for the inset text input. */
  inputClassName?: string
  /** Field text size. "default" = Charcoal 12px, "sm" = Geneva 10px. */
  size?: "default" | "sm"
}

const RetroNumberField = React.forwardRef<
  HTMLInputElement,
  RetroNumberFieldProps
>(function RetroNumberField(
  {
    value: valueProp,
    defaultValue,
    onValueChange,
    min,
    max,
    step = 1,
    formatValue,
    className,
    inputClassName,
    size = "default",
    disabled,
    readOnly,
    onKeyDown,
    onBlur,
    onFocus,
    ...props
  },
  ref
) {
  const precision = decimalsOf(step)
  const clamp = React.useCallback(
    (n: number) => {
      let next = n
      if (min !== undefined) next = Math.max(min, next)
      if (max !== undefined) next = Math.min(max, next)
      return Number(next.toFixed(precision))
    },
    [min, max, precision]
  )

  const [uncontrolled, setUncontrolled] = React.useState(() =>
    clamp(defaultValue ?? min ?? 0)
  )
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : uncontrolled

  /** Text being typed; null when not editing (the formatted value shows). */
  const [draft, setDraft] = React.useState<string | null>(null)

  const format = (n: number) =>
    formatValue ? formatValue(n) : n.toFixed(precision)

  const commit = (n: number) => {
    const next = clamp(n)
    if (!isControlled) setUncontrolled(next)
    if (next !== value) onValueChange?.(next)
  }

  const stepBy = (delta: number) => {
    if (disabled || readOnly) return
    // Step from whatever is typed, if it parses; otherwise the last value
    const typed = draft === null ? NaN : parseFloat(draft)
    setDraft(null)
    commit((Number.isNaN(typed) ? value : typed) + delta)
  }

  const commitDraft = () => {
    if (draft === null) return
    const parsed = parseFloat(draft)
    setDraft(null)
    if (!Number.isNaN(parsed)) commit(parsed)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault()
        stepBy(step)
        break
      case "ArrowDown":
        event.preventDefault()
        stepBy(-step)
        break
      case "PageUp":
        event.preventDefault()
        stepBy(step * 10)
        break
      case "PageDown":
        event.preventDefault()
        stepBy(-step * 10)
        break
      case "Home":
        if (min !== undefined) {
          event.preventDefault()
          setDraft(null)
          commit(min)
        }
        break
      case "End":
        if (max !== undefined) {
          event.preventDefault()
          setDraft(null)
          commit(max)
        }
        break
      case "Enter":
        commitDraft()
        break
      case "Escape":
        setDraft(null)
        break
    }
  }

  const atMin = min !== undefined && value <= min
  const atMax = max !== undefined && value >= max

  return (
    <div
      className={cn("inline-flex items-center gap-[3px]", className)}
      data-disabled={disabled ? "" : undefined}
    >
      <input
        ref={ref}
        type="text"
        inputMode={precision > 0 ? "decimal" : "numeric"}
        autoComplete="off"
        role="spinbutton"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={format(value)}
        disabled={disabled}
        readOnly={readOnly}
        value={draft ?? format(value)}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={(event) => {
          onFocus?.(event)
          event.currentTarget.select()
        }}
        onBlur={(event) => {
          commitDraft()
          onBlur?.(event)
        }}
        className={cn(
          "w-[56px] min-w-0 text-right",
          "border border-os9-black bg-os9-white text-os9-black",
          "outline-none transition-none",
          "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white),-1px_0_0_var(--os9-gray-700),0_-1px_0_var(--os9-gray-700),1px_0_0_var(--os9-white),0_1px_0_var(--os9-white)]",
          "focus:shadow-[0_2px_0_0_var(--os9-focus),2px_0_0_0_var(--os9-focus),0_-2px_0_0_var(--os9-focus),-2px_0_0_0_var(--os9-focus),0_0_0_1px_var(--os9-focus)]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-os9-gray-200 disabled:text-os9-gray-600",
          size === "sm"
            ? "h-[19px] px-[4px] font-[family-name:var(--os9-font-sans)] text-[10px] leading-normal"
            : "h-[22px] px-[5px] font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
          inputClassName
        )}
        {...props}
      />
      <RetroLittleArrows
        aria-hidden="true"
        buttonTabIndex={-1}
        disabled={disabled || readOnly}
        incrementDisabled={atMax}
        decrementDisabled={atMin}
        onIncrement={() => stepBy(step)}
        onDecrement={() => stepBy(-step)}
      />
    </div>
  )
})
RetroNumberField.displayName = "RetroNumberField"

export { RetroLittleArrows, RetroNumberField }
export type { RetroLittleArrowsProps, RetroNumberFieldProps }
