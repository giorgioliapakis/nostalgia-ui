import { RetroText } from "@/registry/new-york/ui/retro-typography"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const variants = [
  {
    name: "editorial",
    description: "Apple Garamond, 24px — for hero text and large display",
  },
  {
    name: "headline",
    description: "Charcoal, 12px, tracked — for section headings and titles",
  },
  {
    name: "smallHeadline",
    description: "Charcoal, 10px, tracked — for smaller headings and labels",
  },
  {
    name: "body",
    description: "Geneva, 10px — default body text",
  },
  {
    name: "bodySmall",
    description: "Geneva, 9px — fine print and secondary text",
  },
  {
    name: "bodyBold",
    description: "Geneva, 9px, bold — emphasized body text",
  },
  {
    name: "bodySlanted",
    description: "Geneva, 9px, italic — quotes and special emphasis",
  },
  {
    name: "mono",
    description: "Monaco, 10px — code, file paths, and technical content",
  },
] as const

export default function TypographyPreview() {
  return (
    <ComponentDocLayout
      name="retro-typography"
      title="RetroText"
      description="Typography component with 8 variants matching the Mac OS 9 type system."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        Typography component with 8 variants matching the Mac OS 9 type system.
        Uses Charcoal for headings, Geneva for body, Monaco for monospace, and
        Apple Garamond for editorial/display text.
      </p>

      {/* All variants */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-6">All Variants</h2>
        <div className="space-y-6">
          {variants.map(({ name, description }) => (
            <div
              key={name}
              className="border-b border-os9-gray-400 pb-4"
            >
              <p className="text-os9-gray-700 text-[9px] font-bold mb-1">
                {name}
              </p>
              <RetroText
                variant={name}
                className="mb-1"
              >
                The quick brown fox jumps over the lazy dog.
              </RetroText>
              <p className="text-os9-gray-600 text-[9px]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practical usage */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Practical Usage</h2>
        <div className="border border-os9-black bg-os9-white p-4 w-[400px]">
          <RetroText variant="editorial" className="mb-2">
            Welcome to Mac OS 9
          </RetroText>
          <RetroText variant="headline" className="mb-2">
            About This Macintosh
          </RetroText>
          <RetroText variant="body" className="mb-2">
            Built-in Memory: 256 MB. Virtual Memory is on. Largest Unused
            Block: 180 MB.
          </RetroText>
          <RetroText variant="bodySmall" className="mb-1">
            System version 9.2.2
          </RetroText>
          <RetroText variant="mono">
            /System Folder/System
          </RetroText>
        </div>
      </section>

      {/* Custom element */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Custom Elements</h2>
        <div className="space-y-2">
          <RetroText as="h3" variant="headline">
            Rendered as h3
          </RetroText>
          <RetroText as="span" variant="body">
            Rendered as span
          </RetroText>
          <RetroText as="code" variant="mono">
            Rendered as code element
          </RetroText>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Use the `as` prop to change the rendered HTML element. The variant prop
        controls the visual style independently of the semantic element.
      </p>
    </ComponentDocLayout>
  )
}
