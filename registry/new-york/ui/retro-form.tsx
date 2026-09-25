"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { retroLabelVariants } from "@/registry/new-york/ui/retro-label"

const RetroForm = FormProvider

type RetroFormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const RetroFormFieldContext =
  React.createContext<RetroFormFieldContextValue | null>(null)

const RetroFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <RetroFormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </RetroFormFieldContext.Provider>
  )
}

const useRetroFormField = () => {
  const fieldContext = React.useContext(RetroFormFieldContext)
  const itemContext = React.useContext(RetroFormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useRetroFormField should be used within <RetroFormField>")
  }
  if (!itemContext) {
    throw new Error("useRetroFormField should be used within <RetroFormItem>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type RetroFormItemContextValue = {
  id: string
}

const RetroFormItemContext =
  React.createContext<RetroFormItemContextValue | null>(null)

const RetroFormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function RetroFormItem({ className, ...props }, ref) {
  const id = React.useId()

  return (
    <RetroFormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-1", className)} {...props} />
    </RetroFormItemContext.Provider>
  )
})
RetroFormItem.displayName = "RetroFormItem"

const RetroFormLabel = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(function RetroFormLabel({ className, ...props }, ref) {
  const { error, formItemId } = useRetroFormField()

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        retroLabelVariants(),
        error && "text-[#cc0000]",
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  )
})
RetroFormLabel.displayName = "RetroFormLabel"

const RetroFormControl = React.forwardRef<
  React.ComponentRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(function RetroFormControl({ ...props }, ref) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useRetroFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
RetroFormControl.displayName = "RetroFormControl"

const RetroFormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function RetroFormDescription({ className, ...props }, ref) {
  const { formDescriptionId } = useRetroFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(
        "font-[family-name:var(--os9-font-sans)] text-[9px] text-os9-gray-700",
        className
      )}
      {...props}
    />
  )
})
RetroFormDescription.displayName = "RetroFormDescription"

const RetroFormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function RetroFormMessage({ className, children, ...props }, ref) {
  const { error, formMessageId } = useRetroFormField()
  const body = error ? String(error.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        "font-[family-name:var(--os9-font-sans)] text-[10px] font-bold text-[#cc0000]",
        className
      )}
      {...props}
    >
      {body}
    </p>
  )
})
RetroFormMessage.displayName = "RetroFormMessage"

export {
  useRetroFormField,
  RetroForm,
  RetroFormItem,
  RetroFormLabel,
  RetroFormControl,
  RetroFormDescription,
  RetroFormMessage,
  RetroFormField,
}
