import { RetroBadge } from "@/registry/new-york/ui/retro-badge"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function BadgePreview() {
  return (
    <ComponentDocLayout
      name="retro-badge"
      title="RetroBadge"
      description="A small status label with Mac OS 9 raised bevel in default, accent, and azul variants."
    >
      {/* Default variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Default Variant</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroBadge>Default</RetroBadge>
          <RetroBadge>Label</RetroBadge>
          <RetroBadge>System 7</RetroBadge>
        </div>
      </section>

      {/* Accent variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Accent Variant</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroBadge variant="accent">Accent</RetroBadge>
          <RetroBadge variant="accent">New</RetroBadge>
          <RetroBadge variant="accent">Extension</RetroBadge>
        </div>
      </section>

      {/* Azul variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Azul Variant</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroBadge variant="azul">Azul</RetroBadge>
          <RetroBadge variant="azul">Active</RetroBadge>
          <RetroBadge variant="azul">v9.0</RetroBadge>
        </div>
      </section>

      {/* All variants comparison */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">All Variants</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <RetroBadge>Default</RetroBadge>
          <RetroBadge variant="accent">Accent</RetroBadge>
          <RetroBadge variant="azul">Azul</RetroBadge>
        </div>
      </section>
    </ComponentDocLayout>
  )
}
