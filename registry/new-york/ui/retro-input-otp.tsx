"use client"

/*
 * RetroInputOTP: a one-time code in OS 9 inset digit boxes.
 *
 * Crafted moment: none beyond OS 9's own blinking insertion point, drawn
 * in the active empty slot (a hard step blink, not a fade). Reduced motion
 * keeps the caret solid.
 *
 * Built on UI SDK's OTP Input: one real input under the slots handles
 * typing, paste, autofill (autocomplete="one-time-code"), undo and forms.
 */

import * as React from "react"
import {
  OTPInput as OTPInputPrimitive,
  OTPInputGroup as OTPInputGroupPrimitive,
  OTPInputSeparator as OTPInputSeparatorPrimitive,
  OTPInputSlot as OTPInputSlotPrimitive,
} from "@ui-sdk/react/otp-input"

import { cn } from "@/lib/utils"

type RetroInputOTPProps = Omit<
  React.ComponentProps<typeof OTPInputPrimitive>,
  "className" | "children"
> & {
  className?: string
  /** @deprecated kept for input-otp compatibility; merged into className */
  containerClassName?: string
  children?: React.ReactNode
}

function RetroInputOTP({ className, containerClassName, ...props }: RetroInputOTPProps) {
  return (
    <OTPInputPrimitive
      className={cn(
        "relative flex items-center gap-2 data-disabled:opacity-50 data-disabled:cursor-not-allowed",
        containerClassName,
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */

type RetroInputOTPGroupProps = Omit<
  React.ComponentProps<typeof OTPInputGroupPrimitive>,
  "className" | "children"
> & {
  className?: string
  children?: React.ReactNode
}

function RetroInputOTPGroup({ className, ...props }: RetroInputOTPGroupProps) {
  return <OTPInputGroupPrimitive className={cn("flex items-center gap-1", className)} {...props} />
}

/* -------------------------------------------------------------------------- */

type RetroInputOTPSlotProps = Omit<
  React.ComponentProps<typeof OTPInputSlotPrimitive>,
  "className" | "children"
> & {
  className?: string
}

function RetroInputOTPSlot({ className, ...props }: RetroInputOTPSlotProps) {
  return (
    <OTPInputSlotPrimitive
      className={cn(
        "group/slot relative flex h-[40px] w-[32px] items-center justify-center",
        "border border-os9-black bg-os9-white text-os9-black",
        "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        "font-[family-name:var(--os9-font-sans)] text-[14px]",
        "transition-none",
        "data-active:shadow-[0_0_0_2px_var(--os9-focus)]",
        className
      )}
      {...props}
    >
      {(state) => (
        <>
          {state.char}
          {state.hasFakeCaret && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="h-[20px] w-px animate-[os9-caret-blink_1s_step-end_infinite] bg-os9-black motion-reduce:animate-none" />
            </span>
          )}
        </>
      )}
    </OTPInputSlotPrimitive>
  )
}

/* -------------------------------------------------------------------------- */

type RetroInputOTPSeparatorProps = Omit<
  React.ComponentProps<typeof OTPInputSeparatorPrimitive>,
  "className" | "children"
> & {
  className?: string
}

function RetroInputOTPSeparator({ className, ...props }: RetroInputOTPSeparatorProps) {
  return (
    <OTPInputSeparatorPrimitive
      className={cn(
        "text-os9-gray-700 font-[family-name:var(--os9-font-sans)] text-[14px] select-none",
        className
      )}
      {...props}
    >
      &ndash;
    </OTPInputSeparatorPrimitive>
  )
}

/* -------------------------------------------------------------------------- */

export { RetroInputOTP, RetroInputOTPGroup, RetroInputOTPSlot, RetroInputOTPSeparator }
