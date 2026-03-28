"use client"

import {
  RetroInputOTP,
  RetroInputOTPGroup,
  RetroInputOTPSlot,
  RetroInputOTPSeparator,
} from "@/registry/new-york/ui/retro-input-otp"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function InputOTPPreview() {
  return (
    <ComponentDocLayout
      name="retro-input-otp"
      title="RetroInputOTP"
      description="A one-time password input with Mac OS 9 beveled digit slots and blinking caret."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A one-time password input with OS9 styling. Each digit appears in a
        beveled input slot with a blinking caret. Built on input-otp.
      </p>

      {/* 6-digit OTP with separator */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          6-Digit Code (3 + 3)
        </h2>
        <RetroInputOTP maxLength={6}>
          <RetroInputOTPGroup>
            <RetroInputOTPSlot index={0} />
            <RetroInputOTPSlot index={1} />
            <RetroInputOTPSlot index={2} />
          </RetroInputOTPGroup>
          <RetroInputOTPSeparator />
          <RetroInputOTPGroup>
            <RetroInputOTPSlot index={3} />
            <RetroInputOTPSlot index={4} />
            <RetroInputOTPSlot index={5} />
          </RetroInputOTPGroup>
        </RetroInputOTP>
      </section>

      {/* 4-digit PIN */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">4-Digit PIN</h2>
        <RetroInputOTP maxLength={4}>
          <RetroInputOTPGroup>
            <RetroInputOTPSlot index={0} />
            <RetroInputOTPSlot index={1} />
            <RetroInputOTPSlot index={2} />
            <RetroInputOTPSlot index={3} />
          </RetroInputOTPGroup>
        </RetroInputOTP>
      </section>

      {/* Single group of 6 */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          6 Digits (Single Group)
        </h2>
        <RetroInputOTP maxLength={6}>
          <RetroInputOTPGroup>
            <RetroInputOTPSlot index={0} />
            <RetroInputOTPSlot index={1} />
            <RetroInputOTPSlot index={2} />
            <RetroInputOTPSlot index={3} />
            <RetroInputOTPSlot index={4} />
            <RetroInputOTPSlot index={5} />
          </RetroInputOTPGroup>
        </RetroInputOTP>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click to focus, then type digits. The active slot shows a blinking
        caret. Use Backspace to delete. The separator provides a visual break
        between groups.
      </p>
    </ComponentDocLayout>
  )
}
