import { RetroButton } from "@/registry/new-york/ui/retro-button"

export default function ButtonPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroButton Preview</h1>

      {/* Default variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Default Variant</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroButton>Default</RetroButton>
          <RetroButton size="sm">Small</RetroButton>
          <RetroButton size="lg">Large</RetroButton>
          <RetroButton disabled>Disabled</RetroButton>
        </div>
      </section>

      {/* Primary variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Primary Variant</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroButton variant="primary">Primary</RetroButton>
          <RetroButton variant="primary" size="sm">Small</RetroButton>
          <RetroButton variant="primary" size="lg">Large</RetroButton>
          <RetroButton variant="primary" disabled>Disabled</RetroButton>
        </div>
      </section>

      {/* Secondary variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Secondary Variant</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroButton variant="secondary">Secondary</RetroButton>
          <RetroButton variant="secondary" size="sm">Small</RetroButton>
          <RetroButton variant="secondary" size="lg">Large</RetroButton>
          <RetroButton variant="secondary" disabled>Disabled</RetroButton>
        </div>
      </section>

      {/* Interactive test */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Interactive (click/press to see active state)
        </h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroButton>Click Me</RetroButton>
          <RetroButton variant="primary">OK</RetroButton>
          <RetroButton variant="secondary">Tab 02</RetroButton>
        </div>
      </section>

      {/* All sizes comparison */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Size Comparison</h2>
        <div className="flex items-end gap-4 flex-wrap">
          <RetroButton size="sm">Small</RetroButton>
          <RetroButton size="default">Default</RetroButton>
          <RetroButton size="lg">Large</RetroButton>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Press and hold buttons to see the active/pressed bevel state.
      </p>
    </main>
  )
}
