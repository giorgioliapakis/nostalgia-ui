"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  RetroForm,
  RetroFormField,
  RetroFormItem,
  RetroFormLabel,
  RetroFormControl,
  RetroFormDescription,
  RetroFormMessage,
} from "@/registry/new-york/ui/retro-form"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function FormPreview() {
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const [submitted, setSubmitted] = React.useState(false)

  function onSubmit(data: ContactFormValues) {
    // Simple client-side validation for the demo
    const result = contactSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormValues
        form.setError(field, { message: issue.message })
      })
      return
    }
    setSubmitted(true)
  }

  return (
    <ComponentDocLayout
      name="retro-form"
      title="RetroForm"
      description="Form components with Mac OS 9 styled labels, descriptions, and validation error messages."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        Form components built on react-hook-form with Zod validation. Provides
        accessible labels, descriptions, and error messages in OS9 styling.
      </p>

      {/* Contact form */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Contact Form</h2>
        <div className="w-[320px]">
          <RetroForm {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <RetroFormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <RetroFormItem>
                    <RetroFormLabel>Name</RetroFormLabel>
                    <RetroFormControl>
                      <RetroInput placeholder="Enter your name" {...field} />
                    </RetroFormControl>
                    <RetroFormDescription>
                      Your full name as it appears on your Apple ID.
                    </RetroFormDescription>
                    <RetroFormMessage />
                  </RetroFormItem>
                )}
              />

              <RetroFormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <RetroFormItem>
                    <RetroFormLabel>Email</RetroFormLabel>
                    <RetroFormControl>
                      <RetroInput
                        type="email"
                        placeholder="user@mac.com"
                        {...field}
                      />
                    </RetroFormControl>
                    <RetroFormDescription>
                      We will send confirmation to this address.
                    </RetroFormDescription>
                    <RetroFormMessage />
                  </RetroFormItem>
                )}
              />

              <RetroButton type="submit">Submit</RetroButton>
            </form>
          </RetroForm>
          {submitted && (
            <p className="text-os9-azul text-[10px] font-bold mt-4">
              Form submitted successfully!
            </p>
          )}
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Try submitting with empty fields to see validation errors. Error
        messages appear in red below each field.
      </p>
    </ComponentDocLayout>
  )
}
