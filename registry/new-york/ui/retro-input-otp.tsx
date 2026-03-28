"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/lib/utils"

function RetroInputOTP(
  {
    className,
    containerClassName,
    ...props
  }: React.ComponentProps<typeof OTPInput>,
  ref: React.ForwardedRef<React.ComponentRef<typeof OTPInput>>
) {
  return (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

const ForwardedRetroInputOTP = React.forwardRef(RetroInputOTP)
ForwardedRetroInputOTP.displayName = "RetroInputOTP"

/* -------------------------------------------------------------------------- */

function RetroInputOTPGroup(
  {
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"div">,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

const ForwardedRetroInputOTPGroup = React.forwardRef(RetroInputOTPGroup)
ForwardedRetroInputOTPGroup.displayName = "RetroInputOTPGroup"

/* -------------------------------------------------------------------------- */

function RetroInputOTPSlot(
  {
    index,
    className,
    ...props
  }: { index: number } & React.ComponentPropsWithoutRef<"div">,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const slot = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-[40px] w-[32px] items-center justify-center",
        "border border-os9-black bg-os9-white text-os9-black",
        "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
        "font-[family-name:var(--font-sans)] text-[14px]",
        "transition-none",
        slot?.isActive &&
          "shadow-[0_0_0_2px_var(--os9-focus)]",
        className
      )}
      {...props}
    >
      {slot?.char}
      {slot?.hasFakeCaret && <RetroFakeCaret />}
    </div>
  )
}

const ForwardedRetroInputOTPSlot = React.forwardRef(RetroInputOTPSlot)
ForwardedRetroInputOTPSlot.displayName = "RetroInputOTPSlot"

/* -------------------------------------------------------------------------- */

function RetroInputOTPSeparator(
  { ...props }: React.ComponentPropsWithoutRef<"span">,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  return (
    <span
      ref={ref}
      role="separator"
      className="text-os9-gray-700 font-[family-name:var(--font-sans)] text-[14px] select-none"
      {...props}
    >
      &ndash;
    </span>
  )
}

const ForwardedRetroInputOTPSeparator = React.forwardRef(RetroInputOTPSeparator)
ForwardedRetroInputOTPSeparator.displayName = "RetroInputOTPSeparator"

/* -------------------------------------------------------------------------- */

/** Blinking caret rendered inside the active slot. */
function RetroFakeCaret() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="h-[20px] w-px animate-[os9-caret-blink_1s_step-end_infinite] bg-os9-black" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export {
  ForwardedRetroInputOTP as RetroInputOTP,
  ForwardedRetroInputOTPGroup as RetroInputOTPGroup,
  ForwardedRetroInputOTPSlot as RetroInputOTPSlot,
  ForwardedRetroInputOTPSeparator as RetroInputOTPSeparator,
}
