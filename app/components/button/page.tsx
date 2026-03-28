import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function ButtonPage() {
  return (
    <ComponentDocLayout
      name="retro-button"
      title="RetroButton"
      description="A Mac OS 9 styled button with raised bevel effect, active/pressed state, and disabled styling."
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Default Variant</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroButton>Default</RetroButton>
          <RetroButton size="sm">Small</RetroButton>
          <RetroButton size="lg">Large</RetroButton>
          <RetroButton disabled>Disabled</RetroButton>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Primary Variant</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroButton variant="primary">Primary</RetroButton>
          <RetroButton variant="primary" size="sm">Small</RetroButton>
          <RetroButton variant="primary" size="lg">Large</RetroButton>
          <RetroButton variant="primary" disabled>Disabled</RetroButton>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Secondary Variant</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroButton variant="secondary">Secondary</RetroButton>
          <RetroButton variant="secondary" size="sm">Small</RetroButton>
          <RetroButton variant="secondary" size="lg">Large</RetroButton>
          <RetroButton variant="secondary" disabled>Disabled</RetroButton>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Size Comparison</h2>
        <div className="flex items-end gap-4 flex-wrap">
          <RetroButton size="sm">Small</RetroButton>
          <RetroButton size="default">Default</RetroButton>
          <RetroButton size="lg">Large</RetroButton>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px]">
        Press and hold buttons to see the active/pressed bevel state.
      </p>
    </ComponentDocLayout>
  )
}
