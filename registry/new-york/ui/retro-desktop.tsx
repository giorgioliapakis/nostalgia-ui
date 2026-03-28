"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroDesktop (root)                                                */
/* ------------------------------------------------------------------ */

const RetroDesktop = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-screen w-screen flex-col overflow-hidden",
        "bg-os9-gray-200",
        className
      )}
      {...props}
    />
  )
})
RetroDesktop.displayName = "RetroDesktop"

/* ------------------------------------------------------------------ */
/*  RetroDesktopMenuBar                                                */
/* ------------------------------------------------------------------ */

interface RetroDesktopMenuBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Show a live clock on the far right. Defaults to true. */
  showClock?: boolean
}

const RetroDesktopMenuBar = React.forwardRef<
  HTMLDivElement,
  RetroDesktopMenuBarProps
>(({ className, showClock = true, children, ...props }, ref) => {
  const [time, setTime] = React.useState<string>("")

  React.useEffect(() => {
    if (!showClock) return

    const formatTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const ampm = hours >= 12 ? "PM" : "AM"
      const h = hours % 12 || 12
      const m = minutes.toString().padStart(2, "0")
      return `${h}:${m} ${ampm}`
    }

    setTime(formatTime())

    const interval = setInterval(() => {
      setTime(formatTime())
    }, 60_000)

    return () => clearInterval(interval)
  }, [showClock])

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-[20px] shrink-0 items-center px-[8px]",
        "bg-os9-gray-300",
        "border-b border-os9-black",
        /* Inner bevel: white highlight top, dark shadow bottom */
        "shadow-[inset_0_1px_0_var(--os9-white),inset_0_-1px_0_var(--os9-gray-700)]",
        className
      )}
      {...props}
    >
      {/* Apple logo */}
      <span
        className="flex shrink-0 items-center pr-[8px]"
        aria-label="Apple menu"
      >
        <svg
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M9.5 4.8C9.5 4.8 8.2 3.6 6.8 3.6C5.9 3.6 5.3 4.0 4.8 4.0C4.3 4.0 3.6 3.6 2.8 3.6C1.4 3.6 0 4.9 0 7.1C0 8.4 0.5 9.8 1.1 10.7C1.7 11.5 2.2 12.1 2.9 12.1C3.5 12.1 3.9 11.7 4.7 11.7C5.6 11.7 5.8 12.1 6.5 12.1C7.2 12.1 7.7 11.4 8.2 10.7C8.7 10.0 8.9 9.3 8.9 9.2C8.9 9.2 7.3 8.5 7.3 6.7C7.3 5.2 8.5 4.5 8.6 4.4L9.5 4.8ZM6.3 3.0C6.7 2.5 7.0 1.8 7.0 1.1C7.0 1.0 7.0 0.8 7.0 0.7C6.3 0.8 5.5 1.2 5.1 1.7C4.7 2.2 4.4 2.8 4.4 3.5C4.4 3.6 4.4 3.8 4.4 3.8C4.5 3.8 4.5 3.8 4.6 3.8C5.2 3.8 5.9 3.4 6.3 3.0Z"
            fill="currentColor"
          />
        </svg>
      </span>

      {/* Menu items (children) */}
      <div
        className={cn(
          "flex flex-1 items-center gap-[6px]",
          "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
          "text-os9-black"
        )}
      >
        {children}
      </div>

      {/* Clock */}
      {showClock && time && (
        <span
          className={cn(
            "shrink-0 pl-[8px]",
            "font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
            "text-os9-black"
          )}
        >
          {time}
        </span>
      )}
    </div>
  )
})
RetroDesktopMenuBar.displayName = "RetroDesktopMenuBar"

/* ------------------------------------------------------------------ */
/*  RetroDesktopArea                                                   */
/* ------------------------------------------------------------------ */

interface RetroDesktopAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Wallpaper variant.
   * - "default" — plain os9-gray-200
   * - "pattern" — subtle repeating dot pattern
   */
  wallpaper?: "default" | "pattern"
}

const RetroDesktopArea = React.forwardRef<
  HTMLDivElement,
  RetroDesktopAreaProps
>(({ className, wallpaper = "default", style, ...props }, ref) => {
  const patternStyle: React.CSSProperties | undefined =
    wallpaper === "pattern"
      ? {
          backgroundImage:
            "radial-gradient(circle, var(--os9-gray-400) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
          ...style,
        }
      : style

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex-1 overflow-hidden",
        "bg-os9-gray-200",
        className
      )}
      style={patternStyle}
      {...props}
    />
  )
})
RetroDesktopArea.displayName = "RetroDesktopArea"

/* ------------------------------------------------------------------ */
/*  RetroDesktopIcon                                                   */
/* ------------------------------------------------------------------ */

interface RetroDesktopIconProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** The icon content — a ReactNode rendered in the 32x32 icon area. */
  icon: React.ReactNode
  /** The label displayed below the icon. */
  label: string
  /** Whether the icon is currently selected. */
  selected?: boolean
  /** Called when the icon is clicked / selected. */
  onSelect?: () => void
  /** Called when the icon is double-clicked. */
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>
}

const RetroDesktopIcon = React.forwardRef<HTMLDivElement, RetroDesktopIconProps>(
  (
    {
      icon,
      label,
      selected = false,
      onSelect,
      onDoubleClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-selected={selected}
        className={cn(
          "flex w-[72px] cursor-default flex-col items-center gap-[2px] p-[4px]",
          "outline-none",
          /* Focus ring */
          "focus-visible:ring-2 focus-visible:ring-os9-focus focus-visible:ring-offset-1",
          className
        )}
        onClick={(e) => {
          onSelect?.()
          props.onClick?.(e)
        }}
        onDoubleClick={onDoubleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onSelect?.()
          }
          props.onKeyDown?.(e)
        }}
        {...props}
      >
        {/* Icon area */}
        <div
          className={cn(
            "flex h-[32px] w-[32px] items-center justify-center",
            selected && "border border-os9-azul bg-os9-azul/20"
          )}
        >
          {icon}
        </div>

        {/* Label */}
        <span
          className={cn(
            "max-w-full px-[2px] text-center",
            "font-[family-name:var(--font-sans)] text-[9px] leading-[1.3]",
            "line-clamp-2",
            selected
              ? "bg-os9-azul text-os9-white"
              : "text-os9-black hover:bg-os9-lavender"
          )}
        >
          {label}
        </span>
      </div>
    )
  }
)
RetroDesktopIcon.displayName = "RetroDesktopIcon"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroDesktop,
  RetroDesktopMenuBar,
  RetroDesktopArea,
  RetroDesktopIcon,
}

export type { RetroDesktopMenuBarProps, RetroDesktopAreaProps, RetroDesktopIconProps }
