"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroTitleBar } from "@/registry/new-york/ui/retro-title-bar"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface RetroWindowSize {
  width: number
  height: number
}

export interface RetroWindowPosition {
  x: number
  y: number
}

export interface RetroWindowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Window title displayed in the title bar. */
  title: string
  /** Whether the window is in active/focused state. Defaults to true. */
  active?: boolean
  /** Callback when the close box is clicked. */
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * Callback when the collapse box is clicked. Call `event.preventDefault()`
   * to suppress the built-in window-shade toggle.
   */
  onCollapse?: React.MouseEventHandler<HTMLButtonElement>
  /** Callback when the zoom box is clicked. */
  onZoom?: React.MouseEventHandler<HTMLButtonElement>

  /* ---- Window shade ---- */
  /** Controlled window-shade state (only the title bar is shown). */
  collapsed?: boolean
  /** Uncontrolled initial window-shade state. Defaults to false. */
  defaultCollapsed?: boolean
  /** Fired when the collapse box or a title-bar double-click toggles the shade. */
  onCollapsedChange?: (collapsed: boolean) => void

  /* ---- Resize ---- */
  /** Show a size box in the bottom-right corner. Defaults to false. */
  resizable?: boolean
  /** Minimum size while resizing. Defaults to 160 x 80. */
  minWidth?: number
  minHeight?: number
  /** Fired continuously while resizing. */
  onResize?: (size: RetroWindowSize) => void

  /* ---- Drag ---- */
  /** Allow dragging the window by its title bar (uses a translate transform). */
  draggable?: boolean
  /** Initial drag offset. Defaults to { x: 0, y: 0 }. */
  defaultPosition?: RetroWindowPosition
  /** Fired continuously while dragging. */
  onPositionChange?: (position: RetroWindowPosition) => void

  /* ---- Slots ---- */
  /** Bottom row, e.g. a placard or horizontal scrollbar. Sits beside the size box. */
  footer?: React.ReactNode
  /** Extra classes for the content area (default has 8px padding). */
  contentClassName?: string
}

/* ------------------------------------------------------------------ */
/*  Size box                                                           */
/* ------------------------------------------------------------------ */

function SizeBox({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative size-[15px] shrink-0 cursor-nwse-resize touch-none",
        "border-l border-t border-os9-black bg-os9-gray-300",
        "shadow-[var(--os9-shadow-raised)]",
        className
      )}
      {...props}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        className="absolute left-0 top-0"
        aria-hidden="true"
      >
        {/* Two overlapping squares — the Platinum grow box */}
        <rect x="2.5" y="2.5" width="5" height="5" fill="var(--os9-gray-300)" stroke="var(--os9-gray-700)" />
        <rect x="4.5" y="4.5" width="6" height="6" fill="var(--os9-gray-300)" stroke="var(--os9-gray-700)" />
        <path d="M5 10V5H10" fill="none" stroke="var(--os9-white)" />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroWindow                                                        */
/* ------------------------------------------------------------------ */

const RetroWindow = React.forwardRef<HTMLDivElement, RetroWindowProps>(
  function RetroWindow(
    {
      title,
      active = true,
      onClose,
      onCollapse,
      onZoom,
      collapsed: collapsedProp,
      defaultCollapsed = false,
      onCollapsedChange,
      resizable = false,
      minWidth = 160,
      minHeight = 80,
      onResize,
      draggable = false,
      defaultPosition,
      onPositionChange,
      footer,
      contentClassName,
      className,
      style,
      children,
      ...props
    },
    ref
  ) {
    const rootRef = React.useRef<HTMLDivElement | null>(null)
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    /* ---- Window shade ---- */
    const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed)
    const collapsed = collapsedProp ?? internalCollapsed
    const toggleCollapsed = () => {
      const next = !collapsed
      if (collapsedProp === undefined) setInternalCollapsed(next)
      onCollapsedChange?.(next)
    }

    /* ---- Resize ---- */
    const [size, setSize] = React.useState<RetroWindowSize | null>(null)
    const resizeRef = React.useRef<{
      x: number
      y: number
      width: number
      height: number
      pointerId: number
    } | null>(null)

    const onResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
      const el = rootRef.current
      if (!el || e.button !== 0) return
      e.preventDefault()
      e.stopPropagation()
      e.currentTarget.setPointerCapture(e.pointerId)
      resizeRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: el.offsetWidth,
        height: el.offsetHeight,
        pointerId: e.pointerId,
      }
    }
    const onResizeMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const start = resizeRef.current
      if (!start || start.pointerId !== e.pointerId) return
      const next = {
        width: Math.max(minWidth, Math.round(start.width + e.clientX - start.x)),
        height: Math.max(minHeight, Math.round(start.height + e.clientY - start.y)),
      }
      setSize(next)
      onResize?.(next)
    }
    const onResizeEnd = (e: React.PointerEvent<HTMLDivElement>) => {
      if (resizeRef.current?.pointerId !== e.pointerId) return
      resizeRef.current = null
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
    }

    /* ---- Drag ---- */
    const [position, setPosition] = React.useState<RetroWindowPosition>(
      defaultPosition ?? { x: 0, y: 0 }
    )
    const dragRef = React.useRef<{
      x: number
      y: number
      origin: RetroWindowPosition
      pointerId: number
    } | null>(null)

    const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggable || e.button !== 0) return
      // Let the control boxes handle their own clicks.
      if ((e.target as HTMLElement).closest("button")) return
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      dragRef.current = {
        x: e.clientX,
        y: e.clientY,
        origin: position,
        pointerId: e.pointerId,
      }
    }
    const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const start = dragRef.current
      if (!start || start.pointerId !== e.pointerId) return
      const next = {
        x: start.origin.x + e.clientX - start.x,
        y: start.origin.y + e.clientY - start.y,
      }
      setPosition(next)
      onPositionChange?.(next)
    }
    const onDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragRef.current?.pointerId !== e.pointerId) return
      dragRef.current = null
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
    }

    /* ---- Style ---- */
    const mergedStyle: React.CSSProperties = { ...style }
    if (size) {
      mergedStyle.width = size.width
      mergedStyle.height = size.height
    }
    if (collapsed) {
      mergedStyle.height = "auto"
      mergedStyle.minHeight = 0
    }
    if (draggable && (position.x !== 0 || position.y !== 0)) {
      mergedStyle.transform = `translate(${position.x}px, ${position.y}px)`
    }

    const showSizeBox = resizable && !collapsed

    return (
      <div
        ref={setRefs}
        data-state={collapsed ? "collapsed" : "expanded"}
        className={cn(
          "relative flex flex-col border border-os9-black bg-os9-gray-200",
          active && "shadow-[var(--os9-shadow-window)]",
          className
        )}
        style={mergedStyle}
        {...props}
      >
        {/* Title bar */}
        <RetroTitleBar
          title={title}
          active={active}
          onClose={onClose}
          onCollapse={(e) => {
            onCollapse?.(e)
            if (!e.defaultPrevented) toggleCollapsed()
          }}
          onZoom={onZoom}
          onDoubleClick={(e) => {
            if ((e.target as HTMLElement).closest("button")) return
            toggleCollapsed()
          }}
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
          onLostPointerCapture={onDragEnd}
          className={cn("shrink-0", draggable && "touch-none select-none")}
        />

        {!collapsed && (
          <>
            {/* Content area */}
            <div
              className={cn(
                "min-h-0 flex-1 p-[8px] shadow-[-1px_-1px_0_rgba(38,38,38,0.4)]",
                contentClassName
              )}
            >
              {children}
            </div>

            {/* Footer row (+ size box) */}
            {footer ? (
              <div className="flex shrink-0 items-stretch border-t border-os9-black">
                <div className="min-w-0 flex-1">{footer}</div>
                {showSizeBox && (
                  <SizeBox
                    className="border-t-0"
                    onPointerDown={onResizeStart}
                    onPointerMove={onResizeMove}
                    onPointerUp={onResizeEnd}
                    onPointerCancel={onResizeEnd}
                    onLostPointerCapture={onResizeEnd}
                  />
                )}
              </div>
            ) : (
              showSizeBox && (
                <div className="absolute bottom-0 right-0">
                  <SizeBox
                    onPointerDown={onResizeStart}
                    onPointerMove={onResizeMove}
                    onPointerUp={onResizeEnd}
                    onPointerCancel={onResizeEnd}
                    onLostPointerCapture={onResizeEnd}
                  />
                </div>
              )
            )}
          </>
        )}
      </div>
    )
  }
)
RetroWindow.displayName = "RetroWindow"

export { RetroWindow }
