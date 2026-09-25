import type { Metadata } from "next"
import { NostalgiaProvider } from "@/registry/new-york/ui/retro-theme-provider"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export const metadata: Metadata = {
  title: "Theme Provider",
  description:
    "A runtime override for the Mac OS 9 design tokens, for theming a subtree.",
}

export default function ThemeProviderPreview() {
  return (
    <ComponentDocLayout
      name="retro-theme-provider"
      title="NostalgiaProvider"
      description="A runtime override for the Mac OS 9 design tokens, for theming a subtree."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        NostalgiaProvider sets the OS9 design tokens as CSS custom properties on
        a wrapper element at runtime, so you can override or re-theme a subtree.
        It does not replace the base stylesheet: component classes like{" "}
        <code>bg-os9-gray-300</code> are Tailwind utilities that need the{" "}
        <code>@theme</code> mappings in your CSS. Install the base styles once
        with the <code>nostalgia-theme</code> registry item:
      </p>
      <div className="border border-os9-black bg-os9-white p-2 mb-6">
        <pre className="font-[family-name:var(--font-mono)] text-[10px] text-os9-black whitespace-pre-wrap">
          npx shadcn@latest add https://nostalgia-ui.com/r/nostalgia-theme.json
        </pre>
      </div>

      {/* Live demo */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Wrapped in NostalgiaProvider
        </h2>
        <NostalgiaProvider className="p-4 border border-os9-black">
          <p className="mb-2">
            This content is inside a NostalgiaProvider. All OS9 tokens are
            available via CSS custom properties.
          </p>
          <div className="flex gap-2">
            <RetroButton>OK</RetroButton>
            <RetroButton variant="primary">Primary</RetroButton>
          </div>
        </NostalgiaProvider>
      </section>

      {/* Usage explanation */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Usage</h2>
        <div className="border border-os9-black bg-os9-white p-4">
          <pre className="font-[family-name:var(--font-mono)] text-[10px] text-os9-black leading-[1.5] whitespace-pre-wrap">
{`import { NostalgiaProvider } from "@/registry/new-york/ui/retro-theme-provider"

export default function Layout({ children }) {
  return (
    <NostalgiaProvider theme="classic">
      {children}
    </NostalgiaProvider>
  )
}`}
          </pre>
        </div>
      </section>

      {/* Token reference */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Injected Tokens</h2>
        <div className="space-y-1 text-[9px] font-[family-name:var(--font-mono)]">
          <p>--os9-black: #262626</p>
          <p>--os9-white: #ffffff</p>
          <p>--os9-gray-200 through --os9-gray-800</p>
          <p>--os9-azul: #333399</p>
          <p>--os9-lavender: #ccccff</p>
          <p>--os9-focus: #6666cc</p>
          <p>--font-heading, --font-sans, --font-mono</p>
          <p>--os9-shadow-raised, --os9-shadow-pressed, --os9-shadow-inset, --os9-shadow-window</p>
        </div>
      </section>

      {/* Utility classes */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Injected Utility Classes
        </h2>
        <div className="space-y-1 text-[9px] font-[family-name:var(--font-mono)]">
          <p>.os9-raised &mdash; Raised bevel button/panel</p>
          <p>.os9-pressed &mdash; Pressed/active bevel</p>
          <p>.os9-inset &mdash; Inset content area</p>
          <p>.os9-window &mdash; Window container with drop shadow</p>
          <p>.os9-stripes &mdash; Title bar stripe pattern</p>
          <p>.os9-focus-ring &mdash; Focus ring outline</p>
          <p>.os9-heading &mdash; Heading typography</p>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Wrap any subtree with NostalgiaProvider to override OS9 tokens there.
        The base styles still come from the nostalgia-theme stylesheet.
        Currently only the &quot;classic&quot; theme is supported.
      </p>
    </ComponentDocLayout>
  )
}
