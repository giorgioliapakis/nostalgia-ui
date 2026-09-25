"use client"

import * as React from "react"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"

import { cn } from "@/lib/utils"
import { retroButtonVariants } from "@/registry/new-york/ui/retro-button"
import {
  RetroIconAlert,
  RetroIconInfo,
  RetroIconStop,
} from "@/registry/new-york/ui/retro-icons"
import { RetroSpinner } from "@/registry/new-york/ui/retro-spinner"

/* ------------------------------------------------------------------ */
/*  Success glyph                                                      */
/*  retro-icons has no "OK" icon, so draw one in the same visual       */
/*  language as RetroIconInfo (azul disc, white pixel glyph).          */
/* ------------------------------------------------------------------ */

function RetroSonnerSuccessIcon() {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="h-8 w-8 shrink-0"
    >
      <circle cx="16" cy="16" r="13" fill="var(--os9-azul)" stroke="var(--os9-black)" strokeWidth="1" />
      <path d="M8 9 A13 13 0 0 1 24 8" stroke="var(--os9-focus)" strokeWidth="1" fill="none" />
      <path
        d="M9.5 16.5L14 21L22.5 11.5"
        stroke="var(--os9-white)"
        strokeWidth="3.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Classes                                                            */
/* ------------------------------------------------------------------ */

/**
 * Title stripe painted as a background layer so it never fights sonner's
 * own ::before/::after hit-areas (used for swipe + hover gaps).
 */
const STRIPE_BG =
  "[background:repeating-linear-gradient(to_bottom,var(--os9-gray-600)_0_1px,transparent_1px_2px)_22px_4px/calc(100%-44px)_7px_no-repeat,var(--os9-gray-200)]"

function toastClassNames(titleStripe: boolean): NonNullable<ToasterProps["toastOptions"]>["classNames"] {
  return {
    toast: cn(
      // sonner positions the <li>; we only paint it. (Unstyled toasts get no
      // width from sonner, so pin it to the toaster width variable.)
      "w-[var(--width)] text-os9-black",
      "grid grid-cols-[auto_1fr_auto_auto] items-start gap-y-[10px]",
      "p-[10px]",
      "border border-os9-black bg-os9-gray-200",
      "shadow-[2px_2px_0_var(--os9-black),inset_2px_2px_0_rgba(255,255,255,0.6),inset_-2px_-2px_0_rgba(38,38,38,0.4)]",
      "font-[family-name:var(--os9-font-sans)] text-[10px]",
      "focus-visible:outline-none",
      titleStripe && ["pt-[18px]", STRIPE_BG]
    ),
    icon: cn(
      "relative col-start-1 row-start-1 mr-[10px]",
      "flex size-[32px] shrink-0 items-center justify-center",
      "[&>svg]:size-[32px]"
    ),
    content: "col-start-2 col-span-3 row-start-1 flex min-w-0 flex-col gap-[3px] self-center",
    title:
      "font-[family-name:var(--os9-font-heading)] text-[12px] font-bold leading-[1.2] tracking-[0.42px]",
    description:
      "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] text-os9-black",
    actionButton: cn(
      retroButtonVariants({ variant: "primary", size: "sm" }),
      "col-start-4 row-start-2 min-w-[58px]"
    ),
    cancelButton: cn(
      retroButtonVariants({ variant: "default", size: "sm" }),
      "col-start-3 row-start-2 mr-[8px] min-w-[58px]"
    ),
    // OS9 close box: small raised square, knocked out of the title stripe.
    closeButton: cn(
      "absolute left-[8px] top-[2px] size-[11px] cursor-default p-0",
      "border border-os9-black bg-os9-gray-300",
      "shadow-[0_0_0_2px_var(--os9-gray-200),inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
      "active:bg-os9-gray-700",
      "active:shadow-[0_0_0_2px_var(--os9-gray-200),inset_1px_1px_0_var(--os9-gray-800),inset_-1px_-1px_0_var(--os9-gray-500)]",
      "focus-visible:os9-focus-ring"
    ),
  }
}

/* ------------------------------------------------------------------ */
/*  RetroToaster                                                       */
/* ------------------------------------------------------------------ */

type RetroToasterProps = ToasterProps & {
  /** Paint the striped title bar across the top of each toast. */
  titleStripe?: boolean
}

function RetroToaster({
  titleStripe = true,
  closeButton = true,
  toastOptions,
  icons,
  className,
  ...props
}: RetroToasterProps) {
  const base = toastClassNames(titleStripe)

  return (
    <Sonner
      theme="light"
      className={cn("toaster group", className)}
      closeButton={closeButton}
      icons={{
        success: <RetroSonnerSuccessIcon />,
        info: <RetroIconInfo />,
        warning: <RetroIconAlert />,
        error: <RetroIconStop />,
        loading: <RetroSpinner size="lg" aria-label="Loading" />,
        // The close box is drawn entirely with CSS.
        close: <span aria-hidden />,
        ...icons,
      }}
      toastOptions={{
        ...toastOptions,
        unstyled: true,
        classNames: {
          ...base,
          ...toastOptions?.classNames,
          toast: cn(base?.toast, toastOptions?.classNames?.toast),
        },
      }}
      {...props}
    />
  )
}
RetroToaster.displayName = "RetroToaster"

export { RetroToaster, toast }
export type { RetroToasterProps }
