"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------------------
 * Size variants
 * -------------------------------------------------------------------------*/

const retroIconVariants = cva("inline-block shrink-0", {
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-8 w-8",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const sizePixels: Record<string, number> = {
  sm: 16,
  default: 32,
  lg: 48,
  xl: 64,
}

/* ---------------------------------------------------------------------------
 * Shared icon props
 * -------------------------------------------------------------------------*/

interface RetroIconProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof retroIconVariants> {}

/* ---------------------------------------------------------------------------
 * Helper: wraps each icon SVG with shared viewBox, sizing, and a11y attrs
 * -------------------------------------------------------------------------*/

function IconShell(
  {
    size = "default",
    className,
    children,
    ...props
  }: RetroIconProps & { children: React.ReactNode },
  ref: React.ForwardedRef<SVGSVGElement>
) {
  const px = sizePixels[size ?? "default"]
  return (
    <svg
      ref={ref}
      width={px}
      height={px}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(retroIconVariants({ size }), className)}
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  )
}

const Shell = React.forwardRef(IconShell)

/* ---------------------------------------------------------------------------
 * 1. RetroIconFolder — Classic manila folder
 * -------------------------------------------------------------------------*/

function RetroIconFolderInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Tab */}
      <path d="M3 8L3 6H13L15 8H3Z" fill="#ffcc66" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Body */}
      <rect x="3" y="8" width="26" height="18" fill="#ffcc66" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Top-left bevel highlight */}
      <line x1="4" y1="9" x2="28" y2="9" stroke="#ffe599" strokeWidth="1" />
      <line x1="4" y1="9" x2="4" y2="25" stroke="#ffe599" strokeWidth="1" />
      {/* Bottom-right shadow */}
      <line x1="28" y1="10" x2="28" y2="25" stroke="#cc9933" strokeWidth="1" />
      <line x1="4" y1="25" x2="28" y2="25" stroke="#cc9933" strokeWidth="1" />
    </Shell>
  )
}

const RetroIconFolder = React.forwardRef(RetroIconFolderInner)
RetroIconFolder.displayName = "RetroIconFolder"

/* ---------------------------------------------------------------------------
 * 2. RetroIconDocument — Page with dog-ear corner fold
 * -------------------------------------------------------------------------*/

function RetroIconDocumentInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Page body */}
      <path
        d="M6 3H21L26 8V29H6V3Z"
        fill="#ffffff"
        stroke="#262626"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Corner fold */}
      <path d="M21 3V8H26" fill="#dddddd" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Text lines */}
      <line x1="9" y1="13" x2="23" y2="13" stroke="#999999" strokeWidth="1" />
      <line x1="9" y1="16" x2="23" y2="16" stroke="#999999" strokeWidth="1" />
      <line x1="9" y1="19" x2="23" y2="19" stroke="#999999" strokeWidth="1" />
      <line x1="9" y1="22" x2="18" y2="22" stroke="#999999" strokeWidth="1" />
    </Shell>
  )
}

const RetroIconDocument = React.forwardRef(RetroIconDocumentInner)
RetroIconDocument.displayName = "RetroIconDocument"

/* ---------------------------------------------------------------------------
 * 3. RetroIconTrash — Trash can with lid and body ribs
 * -------------------------------------------------------------------------*/

function RetroIconTrashInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Lid */}
      <rect x="7" y="5" width="18" height="3" fill="#dddddd" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Lid handle */}
      <rect x="13" y="3" width="6" height="3" fill="#dddddd" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Body */}
      <path
        d="M8 8H24L23 28H9L8 8Z"
        fill="#dddddd"
        stroke="#262626"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Body ribs */}
      <line x1="13" y1="12" x2="13" y2="24" stroke="#999999" strokeWidth="1" />
      <line x1="16" y1="12" x2="16" y2="24" stroke="#999999" strokeWidth="1" />
      <line x1="19" y1="12" x2="19" y2="24" stroke="#999999" strokeWidth="1" />
    </Shell>
  )
}

const RetroIconTrash = React.forwardRef(RetroIconTrashInner)
RetroIconTrash.displayName = "RetroIconTrash"

/* ---------------------------------------------------------------------------
 * 4. RetroIconHardDrive — Drive enclosure with LED and vent
 * -------------------------------------------------------------------------*/

function RetroIconHardDriveInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Drive body */}
      <rect x="3" y="9" width="26" height="14" fill="#dddddd" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Top bevel */}
      <line x1="4" y1="10" x2="28" y2="10" stroke="#ffffff" strokeWidth="1" />
      <line x1="4" y1="10" x2="4" y2="22" stroke="#ffffff" strokeWidth="1" />
      {/* Bottom shadow */}
      <line x1="28" y1="10" x2="28" y2="22" stroke="#999999" strokeWidth="1" />
      <line x1="4" y1="22" x2="28" y2="22" stroke="#999999" strokeWidth="1" />
      {/* LED indicator */}
      <circle cx="25" cy="20" r="1.5" fill="#33cc33" stroke="#262626" strokeWidth="0.5" />
      {/* Vent slits */}
      <line x1="7" y1="14" x2="14" y2="14" stroke="#999999" strokeWidth="0.75" />
      <line x1="7" y1="16" x2="14" y2="16" stroke="#999999" strokeWidth="0.75" />
      <line x1="7" y1="18" x2="14" y2="18" stroke="#999999" strokeWidth="0.75" />
    </Shell>
  )
}

const RetroIconHardDrive = React.forwardRef(RetroIconHardDriveInner)
RetroIconHardDrive.displayName = "RetroIconHardDrive"

/* ---------------------------------------------------------------------------
 * 5. RetroIconFloppy — 3.5" floppy disk
 * -------------------------------------------------------------------------*/

function RetroIconFloppyInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Disk body */}
      <rect x="4" y="3" width="24" height="26" fill="#3366cc" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Metal slide (top center) */}
      <rect x="10" y="3" width="12" height="9" fill="#cccccc" stroke="#999999" strokeWidth="0.5" />
      {/* Slide hole */}
      <rect x="14" y="5" width="4" height="5" fill="#262626" />
      {/* Label area (bottom) */}
      <rect x="7" y="18" width="18" height="9" fill="#ffffff" stroke="#999999" strokeWidth="0.5" />
      {/* Label lines */}
      <line x1="9" y1="21" x2="23" y2="21" stroke="#cccccc" strokeWidth="0.5" />
      <line x1="9" y1="23" x2="23" y2="23" stroke="#cccccc" strokeWidth="0.5" />
      <line x1="9" y1="25" x2="18" y2="25" stroke="#cccccc" strokeWidth="0.5" />
    </Shell>
  )
}

const RetroIconFloppy = React.forwardRef(RetroIconFloppyInner)
RetroIconFloppy.displayName = "RetroIconFloppy"

/* ---------------------------------------------------------------------------
 * 6. RetroIconApplication — Diamond (rotated square) app icon
 * -------------------------------------------------------------------------*/

function RetroIconApplicationInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Diamond shape */}
      <path
        d="M16 3L29 16L16 29L3 16L16 3Z"
        fill="#ccccff"
        stroke="#262626"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Top-left highlight */}
      <path d="M16 5L5 16" stroke="#ffffff" strokeWidth="1" />
      {/* Bottom-right shadow */}
      <path d="M16 27L27 16" stroke="#999999" strokeWidth="1" />
      {/* Center "A" letter hint — small square inside */}
      <rect x="12" y="12" width="8" height="8" fill="none" stroke="#333399" strokeWidth="1" />
      <line x1="14" y1="14" x2="18" y2="14" stroke="#333399" strokeWidth="1" />
    </Shell>
  )
}

const RetroIconApplication = React.forwardRef(RetroIconApplicationInner)
RetroIconApplication.displayName = "RetroIconApplication"

/* ---------------------------------------------------------------------------
 * 7. RetroIconAlert — Yellow triangle with exclamation mark
 * -------------------------------------------------------------------------*/

function RetroIconAlertInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Triangle */}
      <path
        d="M16 3L30 28H2L16 3Z"
        fill="#ffcc00"
        stroke="#262626"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Exclamation mark stem */}
      <rect x="14.5" y="11" width="3" height="9" fill="#262626" />
      {/* Exclamation mark dot */}
      <rect x="14.5" y="22" width="3" height="3" fill="#262626" />
    </Shell>
  )
}

const RetroIconAlert = React.forwardRef(RetroIconAlertInner)
RetroIconAlert.displayName = "RetroIconAlert"

/* ---------------------------------------------------------------------------
 * 8. RetroIconInfo — Blue circle with "i"
 * -------------------------------------------------------------------------*/

function RetroIconInfoInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Circle */}
      <circle cx="16" cy="16" r="13" fill="#333399" stroke="#262626" strokeWidth="1" />
      {/* Highlight arc */}
      <path d="M8 9 A13 13 0 0 1 24 8" stroke="#6666cc" strokeWidth="1" fill="none" />
      {/* "i" dot */}
      <rect x="14" y="8" width="4" height="4" fill="#ffffff" />
      {/* "i" stem */}
      <rect x="14" y="14" width="4" height="11" fill="#ffffff" />
      {/* Serifs */}
      <rect x="11" y="14" width="10" height="2" fill="#ffffff" />
      <rect x="11" y="23" width="10" height="2" fill="#ffffff" />
    </Shell>
  )
}

const RetroIconInfo = React.forwardRef(RetroIconInfoInner)
RetroIconInfo.displayName = "RetroIconInfo"

/* ---------------------------------------------------------------------------
 * 9. RetroIconQuestion — Blue circle with "?"
 * -------------------------------------------------------------------------*/

function RetroIconQuestionInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Circle */}
      <circle cx="16" cy="16" r="13" fill="#333399" stroke="#262626" strokeWidth="1" />
      {/* Highlight arc */}
      <path d="M8 9 A13 13 0 0 1 24 8" stroke="#6666cc" strokeWidth="1" fill="none" />
      {/* "?" top curve */}
      <path
        d="M11 11C11 7 21 7 21 11C21 15 17 14 17 19"
        stroke="#ffffff"
        strokeWidth="3"
        fill="none"
        strokeLinecap="square"
      />
      {/* "?" dot */}
      <rect x="15" y="22" width="4" height="4" fill="#ffffff" />
    </Shell>
  )
}

const RetroIconQuestion = React.forwardRef(RetroIconQuestionInner)
RetroIconQuestion.displayName = "RetroIconQuestion"

/* ---------------------------------------------------------------------------
 * 10. RetroIconStop — Red octagon with raised hand
 * -------------------------------------------------------------------------*/

function RetroIconStopInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Octagon */}
      <path
        d="M11 2L21 2L30 11L30 21L21 30L11 30L2 21L2 11L11 2Z"
        fill="#cc0000"
        stroke="#262626"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Hand — simplified open palm */}
      {/* Palm */}
      <rect x="12" y="14" width="8" height="10" rx="0" fill="#ffffff" />
      {/* Fingers */}
      <rect x="12" y="8" width="2" height="8" fill="#ffffff" />
      <rect x="15" y="7" width="2" height="9" fill="#ffffff" />
      <rect x="18" y="8" width="2" height="8" fill="#ffffff" />
      {/* Thumb */}
      <rect x="10" y="14" width="3" height="5" fill="#ffffff" />
    </Shell>
  )
}

const RetroIconStop = React.forwardRef(RetroIconStopInner)
RetroIconStop.displayName = "RetroIconStop"

/* ---------------------------------------------------------------------------
 * 11. RetroIconNetwork — Two connected computers
 * -------------------------------------------------------------------------*/

function RetroIconNetworkInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Left monitor */}
      <rect x="2" y="6" width="11" height="9" fill="#dddddd" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Left screen */}
      <rect x="4" y="8" width="7" height="5" fill="#ccccff" />
      {/* Left stand */}
      <rect x="5" y="15" width="5" height="2" fill="#dddddd" stroke="#262626" strokeWidth="0.5" />
      {/* Left base */}
      <rect x="3" y="17" width="9" height="2" fill="#dddddd" stroke="#262626" strokeWidth="0.5" />

      {/* Right monitor */}
      <rect x="19" y="6" width="11" height="9" fill="#dddddd" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Right screen */}
      <rect x="21" y="8" width="7" height="5" fill="#ccccff" />
      {/* Right stand */}
      <rect x="22" y="15" width="5" height="2" fill="#dddddd" stroke="#262626" strokeWidth="0.5" />
      {/* Right base */}
      <rect x="20" y="17" width="9" height="2" fill="#dddddd" stroke="#262626" strokeWidth="0.5" />

      {/* Connection line */}
      <line x1="13" y1="23" x2="19" y2="23" stroke="#262626" strokeWidth="1.5" />
      {/* Down from left */}
      <line x1="8" y1="19" x2="8" y2="23" stroke="#262626" strokeWidth="1.5" />
      <line x1="8" y1="23" x2="13" y2="23" stroke="#262626" strokeWidth="1.5" />
      {/* Down from right */}
      <line x1="24" y1="19" x2="24" y2="23" stroke="#262626" strokeWidth="1.5" />
      <line x1="19" y1="23" x2="24" y2="23" stroke="#262626" strokeWidth="1.5" />
      {/* Center hub dot */}
      <circle cx="16" cy="23" r="1.5" fill="#262626" />
    </Shell>
  )
}

const RetroIconNetwork = React.forwardRef(RetroIconNetworkInner)
RetroIconNetwork.displayName = "RetroIconNetwork"

/* ---------------------------------------------------------------------------
 * 12. RetroIconPrinter — Printer with paper output
 * -------------------------------------------------------------------------*/

function RetroIconPrinterInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Paper coming out (top) */}
      <path d="M10 4H22V12H10V4Z" fill="#ffffff" stroke="#262626" strokeWidth="0.75" />
      {/* Text lines on paper */}
      <line x1="12" y1="7" x2="20" y2="7" stroke="#cccccc" strokeWidth="0.5" />
      <line x1="12" y1="9" x2="18" y2="9" stroke="#cccccc" strokeWidth="0.5" />

      {/* Printer body */}
      <rect x="4" y="11" width="24" height="11" fill="#dddddd" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Top bevel */}
      <line x1="5" y1="12" x2="27" y2="12" stroke="#ffffff" strokeWidth="1" />
      <line x1="5" y1="12" x2="5" y2="21" stroke="#ffffff" strokeWidth="1" />
      {/* Bottom shadow */}
      <line x1="27" y1="12" x2="27" y2="21" stroke="#999999" strokeWidth="1" />
      <line x1="5" y1="21" x2="27" y2="21" stroke="#999999" strokeWidth="1" />

      {/* Paper slot */}
      <rect x="8" y="11" width="16" height="2" fill="#444444" />

      {/* Output tray */}
      <path d="M6 22H26L28 27H4L6 22Z" fill="#cccccc" stroke="#262626" strokeWidth="0.75" strokeLinejoin="round" />

      {/* Power LED */}
      <circle cx="24" cy="18" r="1" fill="#33cc33" />
    </Shell>
  )
}

const RetroIconPrinter = React.forwardRef(RetroIconPrinterInner)
RetroIconPrinter.displayName = "RetroIconPrinter"

/* ---------------------------------------------------------------------------
 * 13. RetroIconSearch — Magnifying glass
 * -------------------------------------------------------------------------*/

function RetroIconSearchInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Lens circle */}
      <circle cx="14" cy="14" r="9" fill="#ffffff" stroke="#262626" strokeWidth="2" />
      {/* Glass highlight */}
      <path d="M9 10 A6 6 0 0 1 14 7" stroke="#dddddd" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Handle */}
      <line x1="21" y1="21" x2="28" y2="28" stroke="#262626" strokeWidth="3" strokeLinecap="square" />
      {/* Handle highlight */}
      <line x1="22" y1="22" x2="27" y2="27" stroke="#999999" strokeWidth="1" />
    </Shell>
  )
}

const RetroIconSearch = React.forwardRef(RetroIconSearchInner)
RetroIconSearch.displayName = "RetroIconSearch"

/* ---------------------------------------------------------------------------
 * 14. RetroIconPreferences — Control panel sliders
 * -------------------------------------------------------------------------*/

function RetroIconPreferencesInner(
  { size, className, ...props }: RetroIconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Shell ref={ref} size={size} className={className} {...props}>
      {/* Panel background */}
      <rect x="3" y="3" width="26" height="26" fill="#dddddd" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      {/* Top bevel */}
      <line x1="4" y1="4" x2="28" y2="4" stroke="#ffffff" strokeWidth="1" />
      <line x1="4" y1="4" x2="4" y2="28" stroke="#ffffff" strokeWidth="1" />

      {/* Slider track 1 */}
      <line x1="7" y1="10" x2="25" y2="10" stroke="#999999" strokeWidth="1.5" />
      {/* Slider knob 1 (left position) */}
      <rect x="9" y="7" width="4" height="6" fill="#eeeeee" stroke="#262626" strokeWidth="0.75" />
      <line x1="10" y1="8" x2="10" y2="12" stroke="#ffffff" strokeWidth="0.5" />

      {/* Slider track 2 */}
      <line x1="7" y1="17" x2="25" y2="17" stroke="#999999" strokeWidth="1.5" />
      {/* Slider knob 2 (center position) */}
      <rect x="14" y="14" width="4" height="6" fill="#eeeeee" stroke="#262626" strokeWidth="0.75" />
      <line x1="15" y1="15" x2="15" y2="19" stroke="#ffffff" strokeWidth="0.5" />

      {/* Slider track 3 */}
      <line x1="7" y1="24" x2="25" y2="24" stroke="#999999" strokeWidth="1.5" />
      {/* Slider knob 3 (right position) */}
      <rect x="20" y="21" width="4" height="6" fill="#eeeeee" stroke="#262626" strokeWidth="0.75" />
      <line x1="21" y1="22" x2="21" y2="26" stroke="#ffffff" strokeWidth="0.5" />
    </Shell>
  )
}

const RetroIconPreferences = React.forwardRef(RetroIconPreferencesInner)
RetroIconPreferences.displayName = "RetroIconPreferences"

/* ---------------------------------------------------------------------------
 * Icon map & convenience wrapper
 * -------------------------------------------------------------------------*/

const iconMap = {
  folder: RetroIconFolder,
  document: RetroIconDocument,
  trash: RetroIconTrash,
  "hard-drive": RetroIconHardDrive,
  floppy: RetroIconFloppy,
  application: RetroIconApplication,
  alert: RetroIconAlert,
  info: RetroIconInfo,
  question: RetroIconQuestion,
  stop: RetroIconStop,
  network: RetroIconNetwork,
  printer: RetroIconPrinter,
  search: RetroIconSearch,
  preferences: RetroIconPreferences,
} as const

type RetroIconName = keyof typeof iconMap

interface RetroIconWrapperProps extends RetroIconProps {
  name: RetroIconName
}

const RetroIcon = React.forwardRef<SVGSVGElement, RetroIconWrapperProps>(
  function RetroIcon({ name, ...props }, ref) {
    const IconComponent = iconMap[name]
    return <IconComponent ref={ref} {...props} />
  }
)
RetroIcon.displayName = "RetroIcon"

/* ---------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------*/

export {
  RetroIcon,
  RetroIconFolder,
  RetroIconDocument,
  RetroIconTrash,
  RetroIconHardDrive,
  RetroIconFloppy,
  RetroIconApplication,
  RetroIconAlert,
  RetroIconInfo,
  RetroIconQuestion,
  RetroIconStop,
  RetroIconNetwork,
  RetroIconPrinter,
  RetroIconSearch,
  RetroIconPreferences,
  retroIconVariants,
  iconMap,
}

export type { RetroIconProps, RetroIconName, RetroIconWrapperProps }
