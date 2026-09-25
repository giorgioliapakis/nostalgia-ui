"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"

/* ------------------------------------------------------------------ */
/*  RetroFieldSet                                                      */
/* ------------------------------------------------------------------ */

const retroFieldSetVariants = cva(
  ["flex min-w-0 flex-col gap-[12px]", "text-os9-black"],
  {
    variants: {
      variant: {
        /** Plain grouping, no chrome. */
        default: "border-0 p-0 m-0",
        /**
         * Classic OS9 group box: an etched (gray + white) 1px frame with the
         * legend sitting on the top edge.
         */
        group: [
          "m-0 px-[10px] pb-[10px] pt-[6px]",
          "border border-os9-gray-700",
          "shadow-[1px_1px_0_var(--os9-white),inset_1px_1px_0_var(--os9-white)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type RetroFieldSetProps = React.ComponentProps<"fieldset"> &
  VariantProps<typeof retroFieldSetVariants>

const RetroFieldSet = React.forwardRef<HTMLFieldSetElement, RetroFieldSetProps>(
  function RetroFieldSet({ className, variant, ...props }, ref) {
    return (
      <fieldset
        ref={ref}
        data-slot="field-set"
        data-variant={variant ?? "default"}
        className={cn(
          retroFieldSetVariants({ variant }),
          "has-[>[data-slot=checkbox-group]]:gap-[6px] has-[>[data-slot=radio-group]]:gap-[6px]",
          "disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)
RetroFieldSet.displayName = "RetroFieldSet"

/* ------------------------------------------------------------------ */
/*  RetroFieldLegend                                                   */
/* ------------------------------------------------------------------ */

type RetroFieldLegendProps = React.ComponentProps<"legend"> & {
  variant?: "legend" | "label"
}

const RetroFieldLegend = React.forwardRef<
  HTMLLegendElement,
  RetroFieldLegendProps
>(function RetroFieldLegend({ className, variant = "legend", ...props }, ref) {
  return (
    <legend
      ref={ref}
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-[8px] p-0 text-os9-black",
        "font-[family-name:var(--os9-font-heading)] tracking-[0.42px] leading-[0.98]",
        "data-[variant=legend]:text-[12px] data-[variant=label]:text-[10px]",
        // Inside a group box the legend sits on the frame, knocked out of it.
        "[[data-variant=group]>&]:mb-0 [[data-variant=group]>&]:-ml-[4px] [[data-variant=group]>&]:bg-os9-gray-200 [[data-variant=group]>&]:px-[4px]",
        className
      )}
      {...props}
    />
  )
})
RetroFieldLegend.displayName = "RetroFieldLegend"

/* ------------------------------------------------------------------ */
/*  RetroFieldGroup                                                    */
/* ------------------------------------------------------------------ */

const RetroFieldGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroFieldGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-[14px]",
        "data-[slot=checkbox-group]:gap-[6px]",
        "[&>[data-slot=field-group]]:gap-[8px]",
        className
      )}
      {...props}
    />
  )
})
RetroFieldGroup.displayName = "RetroFieldGroup"

/* ------------------------------------------------------------------ */
/*  RetroField                                                         */
/* ------------------------------------------------------------------ */

const retroFieldVariants = cva(
  [
    "group/field flex w-full gap-[6px]",
    "text-os9-black",
    "data-[invalid=true]:text-[#cc0000]",
  ],
  {
    variants: {
      orientation: {
        vertical: ["flex-col", "[&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center gap-[8px]",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start",
          "has-[>[data-slot=field-content]]:[&>[role=checkbox]]:mt-[1px]",
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
          "@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

type RetroFieldProps = React.ComponentProps<"div"> &
  VariantProps<typeof retroFieldVariants>

const RetroField = React.forwardRef<HTMLDivElement, RetroFieldProps>(
  function RetroField({ className, orientation = "vertical", ...props }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="field"
        data-orientation={orientation}
        className={cn(retroFieldVariants({ orientation }), className)}
        {...props}
      />
    )
  }
)
RetroField.displayName = "RetroField"

/* ------------------------------------------------------------------ */
/*  RetroFieldContent                                                  */
/* ------------------------------------------------------------------ */

const RetroFieldContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroFieldContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="field-content"
      className={cn(
        "group/field-content flex min-w-0 flex-1 flex-col gap-[3px] leading-snug",
        className
      )}
      {...props}
    />
  )
})
RetroFieldContent.displayName = "RetroFieldContent"

/* ------------------------------------------------------------------ */
/*  RetroFieldLabel                                                    */
/* ------------------------------------------------------------------ */

const RetroFieldLabel = React.forwardRef<
  React.ComponentRef<typeof RetroLabel>,
  React.ComponentPropsWithoutRef<typeof RetroLabel>
>(function RetroFieldLabel({ className, ...props }, ref) {
  return (
    <RetroLabel
      ref={ref}
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit items-center gap-[6px] leading-snug",
        "group-data-[invalid=true]/field:text-[#cc0000]",
        "group-data-[disabled=true]/field:opacity-50",
        // A label wrapping a whole <RetroField> becomes a selectable option card.
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        "has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-os9-black",
        "has-[>[data-slot=field]]:bg-os9-gray-300",
        "has-[>[data-slot=field]]:shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
        "[&>*]:data-[slot=field]:p-[8px]",
        "has-[[data-state=checked]]:bg-os9-lavender!",
        className
      )}
      {...props}
    />
  )
})
RetroFieldLabel.displayName = "RetroFieldLabel"

/* ------------------------------------------------------------------ */
/*  RetroFieldTitle                                                    */
/* ------------------------------------------------------------------ */

const RetroFieldTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroFieldTitle({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-[6px]",
        "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
})
RetroFieldTitle.displayName = "RetroFieldTitle"

/* ------------------------------------------------------------------ */
/*  RetroFieldDescription                                              */
/* ------------------------------------------------------------------ */

const RetroFieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function RetroFieldDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="field-description"
      className={cn(
        "font-[family-name:var(--os9-font-sans)] text-[9px] leading-[1.4] text-os9-gray-700",
        "group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-[2px]",
        "[&>a]:underline [&>a]:underline-offset-2 [&>a:hover]:text-os9-azul",
        className
      )}
      {...props}
    />
  )
})
RetroFieldDescription.displayName = "RetroFieldDescription"

/* ------------------------------------------------------------------ */
/*  RetroFieldSeparator                                                */
/* ------------------------------------------------------------------ */

const RetroFieldSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function RetroFieldSeparator({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-[4px] flex h-[14px] items-center",
        "font-[family-name:var(--os9-font-sans)] text-[9px]",
        className
      )}
      {...props}
    >
      {/* 2px etched line: dark over light */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 border-t border-os9-gray-700 border-b border-b-os9-white"
      />
      {children && (
        <span
          data-slot="field-separator-content"
          className="relative mx-auto block bg-os9-gray-200 px-[6px] text-os9-gray-700"
        >
          {children}
        </span>
      )}
    </div>
  )
})
RetroFieldSeparator.displayName = "RetroFieldSeparator"

/* ------------------------------------------------------------------ */
/*  RetroFieldError                                                    */
/* ------------------------------------------------------------------ */

type RetroFieldErrorProps = React.ComponentProps<"div"> & {
  /** Accepts the shape produced by most validators: `{ message?: string }`. */
  errors?: Array<{ message?: string } | undefined>
}

const RetroFieldError = React.forwardRef<HTMLDivElement, RetroFieldErrorProps>(
  function RetroFieldError({ className, children, errors, ...props }, ref) {
    let content: React.ReactNode = children

    if (!content && errors?.length) {
      const messages = [
        ...new Set(errors.map((error) => error?.message).filter(Boolean)),
      ] as string[]

      if (messages.length === 1) {
        content = messages[0]
      } else if (messages.length > 1) {
        content = (
          <ul className="ml-[12px] flex list-disc flex-col gap-[2px]">
            {messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )
      }
    }

    if (!content) {
      return null
    }

    return (
      <div
        ref={ref}
        role="alert"
        data-slot="field-error"
        className={cn(
          "font-[family-name:var(--os9-font-sans)] text-[10px] font-bold text-[#cc0000]",
          className
        )}
        {...props}
      >
        {content}
      </div>
    )
  }
)
RetroFieldError.displayName = "RetroFieldError"

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  RetroField,
  RetroFieldLabel,
  RetroFieldDescription,
  RetroFieldError,
  RetroFieldGroup,
  RetroFieldLegend,
  RetroFieldSeparator,
  RetroFieldSet,
  RetroFieldContent,
  RetroFieldTitle,
  retroFieldVariants,
  retroFieldSetVariants,
}
