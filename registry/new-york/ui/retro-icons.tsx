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
 * 15-16. RetroIconHappyMac / RetroIconSadMac — compact Macintosh faces
 * -------------------------------------------------------------------------*/

/** Shared compact-Mac case; the face is drawn on top by each icon. */
function CompactMacCase({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Case */}
      <rect x="6.5" y="1.5" width="19" height="25" fill="#dddddd" stroke="#262626" strokeWidth="1" />
      {/* Case bevel */}
      <line x1="7.5" y1="2.5" x2="24.5" y2="2.5" stroke="#ffffff" strokeWidth="1" />
      <line x1="7.5" y1="2.5" x2="7.5" y2="25.5" stroke="#ffffff" strokeWidth="1" />
      <line x1="24.5" y1="3" x2="24.5" y2="25.5" stroke="#999999" strokeWidth="1" />
      {/* Screen bezel + screen */}
      <rect x="9.5" y="4.5" width="13" height="11" fill="#bbbbbb" stroke="#808080" strokeWidth="1" />
      <rect x="10.5" y="5.5" width="11" height="9" fill="#ffffff" stroke="#262626" strokeWidth="1" />
      {/* Floppy slot */}
      <rect x="16" y="20" width="6" height="1" fill="#262626" />
      {/* Foot */}
      <rect x="8.5" y="26.5" width="15" height="3" fill="#bbbbbb" stroke="#262626" strokeWidth="1" />
      {/* Face (pixel grid) */}
      <g fill="#262626" shapeRendering="crispEdges">
        {children}
      </g>
    </>
  )
}

const RetroIconHappyMac = React.forwardRef<SVGSVGElement, RetroIconProps>(
  function RetroIconHappyMac({ size, className, ...props }, ref) {
    return (
      <Shell ref={ref} size={size} className={className} {...props}>
        <CompactMacCase>
          {/* Eyes */}
          <rect x="13" y="7" width="1" height="2" />
          <rect x="18" y="7" width="1" height="2" />
          {/* Nose */}
          <rect x="16" y="7" width="1" height="4" />
          <rect x="15" y="10" width="1" height="1" />
          {/* Smile */}
          <rect x="13" y="12" width="1" height="1" />
          <rect x="14" y="13" width="4" height="1" />
          <rect x="18" y="12" width="1" height="1" />
        </CompactMacCase>
      </Shell>
    )
  }
)
RetroIconHappyMac.displayName = "RetroIconHappyMac"

const RetroIconSadMac = React.forwardRef<SVGSVGElement, RetroIconProps>(
  function RetroIconSadMac({ size, className, ...props }, ref) {
    return (
      <Shell ref={ref} size={size} className={className} {...props}>
        <CompactMacCase>
          {/* X eyes */}
          <rect x="12" y="7" width="1" height="1" />
          <rect x="14" y="7" width="1" height="1" />
          <rect x="13" y="8" width="1" height="1" />
          <rect x="12" y="9" width="1" height="1" />
          <rect x="14" y="9" width="1" height="1" />
          <rect x="17" y="7" width="1" height="1" />
          <rect x="19" y="7" width="1" height="1" />
          <rect x="18" y="8" width="1" height="1" />
          <rect x="17" y="9" width="1" height="1" />
          <rect x="19" y="9" width="1" height="1" />
          {/* Nose */}
          <rect x="16" y="8" width="1" height="3" />
          <rect x="15" y="10" width="1" height="1" />
          {/* Frown */}
          <rect x="14" y="12" width="4" height="1" />
          <rect x="13" y="13" width="1" height="1" />
          <rect x="18" y="13" width="1" height="1" />
        </CompactMacCase>
      </Shell>
    )
  }
)
RetroIconSadMac.displayName = "RetroIconSadMac"

/* ---------------------------------------------------------------------------
 * 17. RetroIconBomb — the system error bomb with lit fuse
 * -------------------------------------------------------------------------*/

const RetroIconBomb = React.forwardRef<SVGSVGElement, RetroIconProps>(
  function RetroIconBomb({ size, className, ...props }, ref) {
    return (
      <Shell ref={ref} size={size} className={className} {...props}>
        {/* Fuse cap */}
        <rect
          x="18.5"
          y="8"
          width="5"
          height="5"
          fill="#808080"
          stroke="#262626"
          strokeWidth="1"
          transform="rotate(45 21 10.5)"
        />
        {/* Bomb body */}
        <circle cx="14" cy="19" r="10" fill="#262626" />
        {/* Highlight */}
        <path d="M8 16 A7 7 0 0 1 12 12" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="square" />
        {/* Fuse */}
        <path d="M22.5 8.5 Q24 4.5 27.5 5" stroke="#996633" strokeWidth="1.5" fill="none" />
        {/* Spark */}
        <g stroke="#ffcc00" strokeWidth="1" strokeLinecap="square">
          <line x1="28.5" y1="1.5" x2="28.5" y2="3" />
          <line x1="28.5" y1="7" x2="28.5" y2="8.5" />
          <line x1="25.5" y1="3" x2="26.5" y2="4" />
          <line x1="30.5" y1="3" x2="30" y2="3.5" />
          <line x1="30.5" y1="5" x2="31.5" y2="5" />
        </g>
        <circle cx="28.5" cy="5" r="1.25" fill="#ff6600" />
      </Shell>
    )
  }
)
RetroIconBomb.displayName = "RetroIconBomb"

/* ---------------------------------------------------------------------------
 * 18. RetroIconUser — Head and shoulders (Multiple Users)
 * -------------------------------------------------------------------------*/

const RetroIconUser = React.forwardRef<SVGSVGElement, RetroIconProps>(
  function RetroIconUser({ size, className, ...props }, ref) {
    return (
      <Shell ref={ref} size={size} className={className} {...props}>
        {/* Shoulders */}
        <path d="M4.5 29.5 Q4.5 19.5 16 19.5 Q27.5 19.5 27.5 29.5 Z" fill="#6666cc" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        {/* Collar */}
        <path d="M13 19.5 L16 23.5 L19 19.5" stroke="#ffffff" strokeWidth="1" fill="none" />
        {/* Head */}
        <circle cx="16" cy="11" r="6.5" fill="#ffcc99" stroke="#262626" strokeWidth="1" />
        {/* Hair */}
        <path
          d="M9.6 10 Q9.5 4.5 16 4.5 Q22.5 4.5 22.4 10 Q19.5 7.5 16 8.5 Q12.5 7.5 9.6 10 Z"
          fill="#663300"
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Eyes */}
        <rect x="13" y="11" width="1.5" height="1.5" fill="#262626" />
        <rect x="17.5" y="11" width="1.5" height="1.5" fill="#262626" />
      </Shell>
    )
  }
)
RetroIconUser.displayName = "RetroIconUser"

/* ---------------------------------------------------------------------------
 * 19. RetroIconMemory — RAM module (DIMM)
 * -------------------------------------------------------------------------*/

const RetroIconMemory = React.forwardRef<SVGSVGElement, RetroIconProps>(
  function RetroIconMemory({ size, className, ...props }, ref) {
    return (
      <Shell ref={ref} size={size} className={className} {...props}>
        {/* Circuit board */}
        <rect x="1.5" y="9.5" width="29" height="13" fill="#339966" stroke="#262626" strokeWidth="1" />
        <line x1="2.5" y1="10.5" x2="29.5" y2="10.5" stroke="#66cc99" strokeWidth="1" />
        {/* Chips */}
        {[4, 10, 16, 22].map((x) => (
          <rect key={x} x={x} y="12" width="5" height="5" fill="#262626" />
        ))}
        {/* Gold contacts */}
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={3 + i * 2.25} y="19" width="1.25" height="3" fill="#ffcc33" />
        ))}
      </Shell>
    )
  }
)
RetroIconMemory.displayName = "RetroIconMemory"

/* ---------------------------------------------------------------------------
 * 20. RetroIconFinder — Two-tone smiling Finder face (Mac OS logo)
 * -------------------------------------------------------------------------*/

const RetroIconFinder = React.forwardRef<SVGSVGElement, RetroIconProps>(
  function RetroIconFinder({ size, className, ...props }, ref) {
    return (
      <Shell ref={ref} size={size} className={className} {...props}>
        {/* Left (light) half */}
        <path d="M3.5 3.5H17L14 17H17.5V28.5H3.5Z" fill="#ccccff" />
        {/* Right (dark) half */}
        <path d="M17 3.5H28.5V28.5H17.5V17H14Z" fill="#6666cc" />
        {/* Profile line */}
        <path d="M17 3.5L14 17H17.5V28.5" stroke="#262626" strokeWidth="1" fill="none" strokeLinejoin="round" />
        {/* Outline */}
        <rect x="3.5" y="3.5" width="25" height="25" stroke="#262626" strokeWidth="1" fill="none" />
        {/* Eyes */}
        <rect x="9" y="8" width="2" height="5" fill="#262626" />
        <rect x="21" y="8" width="2" height="5" fill="#262626" />
        {/* Smile */}
        <path d="M8 21 Q16 26 24 21" stroke="#262626" strokeWidth="1.5" fill="none" />
      </Shell>
    )
  }
)
RetroIconFinder.displayName = "RetroIconFinder"

/* ---------------------------------------------------------------------------
 * 21. RetroIconExtension — System extension puzzle piece
 * -------------------------------------------------------------------------*/

const RetroIconExtension = React.forwardRef<SVGSVGElement, RetroIconProps>(
  function RetroIconExtension({ size, className, ...props }, ref) {
    return (
      <Shell ref={ref} size={size} className={className} {...props}>
        <path
          d="M4.5 10.5H11.5C11.5 5.5 18.5 5.5 18.5 10.5H25.5V15.5C30.5 15.5 30.5 22.5 25.5 22.5V28.5H4.5Z"
          fill="#99cc99"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Bevel */}
        <path d="M5.5 27.5V11.5H12" stroke="#ccffcc" strokeWidth="1" fill="none" />
        <path d="M24.5 23.5V27.5H5.5" stroke="#669966" strokeWidth="1" fill="none" />
      </Shell>
    )
  }
)
RetroIconExtension.displayName = "RetroIconExtension"

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
  "happy-mac": RetroIconHappyMac,
  "sad-mac": RetroIconSadMac,
  bomb: RetroIconBomb,
  user: RetroIconUser,
  memory: RetroIconMemory,
  finder: RetroIconFinder,
  extension: RetroIconExtension,
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
  RetroIconHappyMac,
  RetroIconSadMac,
  RetroIconBomb,
  RetroIconUser,
  RetroIconMemory,
  RetroIconFinder,
  RetroIconExtension,
  retroIconVariants,
  iconMap,
}

export type { RetroIconProps, RetroIconName, RetroIconWrapperProps }
