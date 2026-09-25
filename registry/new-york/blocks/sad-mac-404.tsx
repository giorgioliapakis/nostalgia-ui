import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroButton } from "@/registry/new-york/ui/retro-button"

// Spread rather than a literal `asChild` attribute: the shadcn CLI rewrites
// literal `asChild` to Base UI's `render` prop in base-* projects, which
// breaks these Radix-based components.
const AS_CHILD = { asChild: true } as const

/* ------------------------------------------------------------------ */
/*  Sad Mac artwork — pixel-grid SVG, no image assets                  */
/* ------------------------------------------------------------------ */

function SadMacArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 32"
      width={96}
      height={128}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* Case */}
      <rect x="0.5" y="0.5" width="23" height="26" fill="var(--os9-white)" stroke="var(--os9-black)" />
      {/* Screen */}
      <rect x="3.5" y="3.5" width="17" height="13" fill="var(--os9-white)" stroke="var(--os9-black)" />
      <g fill="var(--os9-black)">
        {/* X eyes */}
        <rect x="7" y="6" width="1" height="1" />
        <rect x="9" y="6" width="1" height="1" />
        <rect x="8" y="7" width="1" height="1" />
        <rect x="7" y="8" width="1" height="1" />
        <rect x="9" y="8" width="1" height="1" />
        <rect x="14" y="6" width="1" height="1" />
        <rect x="16" y="6" width="1" height="1" />
        <rect x="15" y="7" width="1" height="1" />
        <rect x="14" y="8" width="1" height="1" />
        <rect x="16" y="8" width="1" height="1" />
        {/* Nose */}
        <rect x="12" y="7" width="1" height="4" />
        <rect x="11" y="10" width="1" height="1" />
        {/* Frown */}
        <rect x="9" y="12" width="6" height="1" />
        <rect x="8" y="13" width="1" height="1" />
        <rect x="15" y="13" width="1" height="1" />
        {/* Floppy slot */}
        <rect x="13" y="21" width="7" height="1" />
        {/* Logo badge */}
        <rect x="4" y="21" width="2" height="2" />
      </g>
      {/* Foot */}
      <rect x="2.5" y="26.5" width="19" height="4" fill="var(--os9-white)" stroke="var(--os9-black)" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  SadMac404Block                                                     */
/* ------------------------------------------------------------------ */

interface SadMac404BlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Error code shown on the second line (zero-padded to 8 characters). Defaults to 404. */
  code?: string | number
  /** Where the Restart button links to. Defaults to "/". */
  homeHref?: string
  /** "dark" is the classic black screen; "light" sits on a platinum background. */
  variant?: "dark" | "light"
  /** Short explanation below the codes. Pass `null` to hide. */
  message?: React.ReactNode
  /** Label for the home link. Defaults to "Restart". */
  restartLabel?: string
}

function toHexLine(value: string | number) {
  return String(value).toUpperCase().padStart(8, "0").slice(-8)
}

const SadMac404Block = React.forwardRef<HTMLDivElement, SadMac404BlockProps>(
  function SadMac404Block(
    {
      code = 404,
      homeHref = "/",
      variant = "dark",
      message = "The page you were looking for could not be found.",
      restartLabel = "Restart",
      className,
      ...props
    },
    ref
  ) {
    const dark = variant === "dark"
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-dvh w-full flex-col items-center justify-center gap-6 px-6 py-10 text-center",
          dark ? "bg-os9-black text-os9-white" : "bg-os9-gray-200 text-os9-black",
          className
        )}
        {...props}
      >
        <SadMacArt className="h-auto w-[72px] sm:w-[96px]" />

        <h1 className="sr-only">Page not found (error {String(code)})</h1>

        <div
          aria-hidden
          className="font-[family-name:var(--os9-font-heading)] text-[14px] leading-[1.4] tracking-[2px] tabular-nums"
        >
          <div>0000000F</div>
          <div>{toHexLine(code)}</div>
        </div>

        {message !== null && (
          <p
            className={cn(
              "max-w-[320px] font-[family-name:var(--os9-font-sans)] text-[11px] leading-[1.5]",
              dark ? "text-os9-gray-600" : "text-os9-gray-800"
            )}
          >
            {message}
          </p>
        )}

        <RetroButton {...AS_CHILD} className="min-w-[90px] no-underline">
          <a href={homeHref}>{restartLabel}</a>
        </RetroButton>
      </div>
    )
  }
)
SadMac404Block.displayName = "SadMac404Block"

export { SadMac404Block }
export type { SadMac404BlockProps }
