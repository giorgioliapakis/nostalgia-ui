import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  RetroNativeSelect                                                  */
/*                                                                     */
/*  A real <select> dressed as an OS9 pop-up menu button: raised bevel */
/*  body with the double-arrow box on the right. The arrow box is a    */
/*  decorative sibling so the native control keeps full a11y/keyboard. */
/* ------------------------------------------------------------------ */

const retroNativeSelectVariants = cva(
  [
    "peer w-full min-w-0 appearance-none",
    "border border-os9-black bg-os9-gray-300 text-os9-black",
    "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
    "cursor-pointer select-none outline-none transition-none",
    "focus-visible:os9-focus-ring",
    "active:bg-os9-gray-800 active:text-os9-white",
    "active:shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-os9-gray-600 disabled:border-os9-gray-600",
    "aria-invalid:border-[#cc0000]",
  ],
  {
    variants: {
      size: {
        default: [
          "h-[20px] pl-2 pr-[26px]",
          "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        ],
        sm: [
          "h-[16px] pl-[6px] pr-[20px]",
          "font-[family-name:var(--os9-font-sans)] text-[10px] leading-none",
        ],
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type RetroNativeSelectProps = Omit<React.ComponentProps<"select">, "size"> &
  VariantProps<typeof retroNativeSelectVariants>

const RetroNativeSelect = React.forwardRef<
  HTMLSelectElement,
  RetroNativeSelectProps
>(function RetroNativeSelect({ className, size = "default", ...props }, ref) {
  const small = size === "sm"
  return (
    <div
      data-slot="native-select-wrapper"
      className={cn("group/native-select relative w-fit", className)}
    >
      <select
        ref={ref}
        data-slot="native-select"
        data-size={size}
        className={retroNativeSelectVariants({ size })}
        {...props}
      />
      {/* Arrow box: left divider + stacked up/down triangles */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center",
          "border-l border-os9-black text-os9-black",
          "peer-active:text-os9-white peer-disabled:border-os9-gray-600 peer-disabled:text-os9-gray-600",
          small ? "w-[16px]" : "w-[20px]"
        )}
      >
        <span className="flex flex-col items-center gap-[1px]">
          <svg
            width={small ? 6 : 8}
            height={small ? 3 : 4}
            viewBox="0 0 8 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 0L8 4H0L4 0Z" fill="currentColor" />
          </svg>
          <svg
            width={small ? 6 : 8}
            height={small ? 3 : 4}
            viewBox="0 0 8 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4L0 0H8L4 4Z" fill="currentColor" />
          </svg>
        </span>
      </span>
    </div>
  )
})
RetroNativeSelect.displayName = "RetroNativeSelect"

/* ------------------------------------------------------------------ */
/*  RetroNativeSelectOption / OptGroup                                 */
/* ------------------------------------------------------------------ */

const RetroNativeSelectOption = React.forwardRef<
  HTMLOptionElement,
  React.ComponentProps<"option">
>(function RetroNativeSelectOption({ className, ...props }, ref) {
  return (
    <option
      ref={ref}
      data-slot="native-select-option"
      className={cn("bg-os9-white text-os9-black", className)}
      {...props}
    />
  )
})
RetroNativeSelectOption.displayName = "RetroNativeSelectOption"

const RetroNativeSelectOptGroup = React.forwardRef<
  HTMLOptGroupElement,
  React.ComponentProps<"optgroup">
>(function RetroNativeSelectOptGroup({ className, ...props }, ref) {
  return (
    <optgroup
      ref={ref}
      data-slot="native-select-optgroup"
      className={cn("bg-os9-white text-os9-gray-700", className)}
      {...props}
    />
  )
})
RetroNativeSelectOptGroup.displayName = "RetroNativeSelectOptGroup"

export {
  RetroNativeSelect,
  RetroNativeSelectOption,
  RetroNativeSelectOptGroup,
  retroNativeSelectVariants,
}
