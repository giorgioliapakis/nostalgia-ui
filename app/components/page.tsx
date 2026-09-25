import type { Metadata } from "next"
import Link from "next/link"

import { RetroWindow } from "@/registry/new-york/ui/retro-window"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import {
  RetroCard,
  RetroCardHeader,
  RetroCardTitle,
  RetroCardContent,
} from "@/registry/new-york/ui/retro-card"
import { RetroBadge } from "@/registry/new-york/ui/retro-badge"
import { RetroSeparator } from "@/registry/new-york/ui/retro-separator"

import { NAV_GROUPS, TOTAL_COMPONENTS } from "./_components/nav-data"

export const metadata: Metadata = {
  title: "Components",
  description:
    "Mac OS 9 styled React components built with Radix UI and Tailwind CSS v4. Install any component with the shadcn CLI.",
  alternates: { canonical: "/components" },
}

/* ------------------------------------------------------------------ */
/*  Overview page                                                      */
/* ------------------------------------------------------------------ */

export default function ComponentsOverview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      {/* Hero */}
      <RetroWindow title="Components" active className="max-w-[640px] mb-8">
        <div className="flex flex-col gap-3">
          <h1 className="os9-heading text-[16px]">nostalgia-ui Components</h1>
          <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-black">
            {TOTAL_COMPONENTS} Mac OS 9 styled components built with Radix UI and Tailwind CSS.
            Each component is a drop-in replacement installable via the shadcn
            CLI. Zero image assets — every bevel, stripe, and shadow is pure
            CSS.
          </p>
        </div>
      </RetroWindow>

      {/* Install */}
      <section className="max-w-[640px] mb-8">
        <h2 className="os9-heading text-[13px] mb-3">Installation</h2>
        <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-black mb-3">
          Install any component with a single command:
        </p>
        <pre
          className="p-3 font-mono text-[11px] text-os9-black leading-[1.6] mb-3 overflow-x-auto"
          style={{
            backgroundColor: "var(--os9-white)",
            border: "1px solid var(--os9-black)",
            boxShadow: "var(--os9-shadow-inset)",
          }}
        >
          npx shadcn@latest add &quot;https://nostalgia-ui.com/r/retro-button.json&quot;
        </pre>
        <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-black mb-3">
          Installing any component also installs{" "}
          <code className="font-mono">nostalgia-theme</code> (the{" "}
          <code className="font-mono">--os9-*</code> tokens and{" "}
          <code className="font-mono">os9-*</code> utilities) via{" "}
          <code className="font-mono">registryDependencies</code>. To add just
          the theme on its own:
        </p>
        <pre
          className="p-3 font-mono text-[11px] text-os9-black leading-[1.6] overflow-x-auto"
          style={{
            backgroundColor: "var(--os9-white)",
            border: "1px solid var(--os9-black)",
            boxShadow: "var(--os9-shadow-inset)",
          }}
        >
          npx shadcn@latest add &quot;https://nostalgia-ui.com/r/nostalgia-theme.json&quot;
        </pre>
      </section>

      {/* Usage */}
      <section className="max-w-[640px] mb-8">
        <h2 className="os9-heading text-[13px] mb-3">Usage</h2>
        <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-black mb-3">
          Import and use components just like shadcn/ui — same API patterns,
          same <code className="font-mono">className</code> prop, same
          composability:
        </p>
        <pre
          className="p-3 font-mono text-[10px] text-os9-black leading-[1.6] overflow-x-auto"
          style={{
            backgroundColor: "var(--os9-white)",
            border: "1px solid var(--os9-black)",
            boxShadow: "var(--os9-shadow-inset)",
          }}
        >
{`import { RetroButton } from "@/components/ui/retro-button"
import { RetroWindow } from "@/components/ui/retro-window"

export function MyApp() {
  return (
    <RetroWindow title="Hello" active>
      <RetroButton variant="primary">Click me</RetroButton>
    </RetroWindow>
  )
}`}
        </pre>
      </section>

      <RetroSeparator className="max-w-[640px] mb-8" />

      {/* Component categories */}
      <section className="max-w-[640px] mb-8">
        <h2 className="os9-heading text-[13px] mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {NAV_GROUPS.map((group) => (
            <RetroCard key={group.label}>
              <RetroCardHeader>
                <RetroCardTitle>
                  {group.label}
                  <RetroBadge className="ml-2">{group.items.length}</RetroBadge>
                </RetroCardTitle>
              </RetroCardHeader>
              <RetroCardContent>
                <ul className="flex flex-col gap-[3px]">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/components/${item.slug}`}
                        className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black underline hover:text-os9-azul"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </RetroCardContent>
            </RetroCard>
          ))}
        </div>
      </section>

      {/* Browse all */}
      <section className="max-w-[640px]">
        <RetroButton variant="primary" asChild>
          <Link href="/components/all">View all {TOTAL_COMPONENTS} components on one page</Link>
        </RetroButton>
      </section>
    </main>
  )
}
