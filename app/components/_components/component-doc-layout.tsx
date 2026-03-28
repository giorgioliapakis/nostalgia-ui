import Link from "next/link"

import { RetroSeparator } from "@/registry/new-york/ui/retro-separator"

interface ComponentDocProps {
  name: string
  title: string
  description: string
  children: React.ReactNode
}

export function ComponentDocLayout({
  name,
  title,
  description,
  children,
}: ComponentDocProps) {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      {/* Header */}
      <div className="max-w-[720px] mb-6">
        <h1 className="os9-heading text-[18px] mb-2">{title}</h1>
        <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-gray-700">
          {description}
        </p>
      </div>

      {/* Install */}
      <section className="max-w-[720px] mb-6">
        <h2 className="os9-heading text-[12px] mb-2">Installation</h2>
        <pre
          className="p-2.5 font-mono text-[10px] text-os9-black leading-[1.6] overflow-x-auto"
          style={{
            backgroundColor: "var(--os9-white)",
            border: "1px solid var(--os9-black)",
            boxShadow: "var(--os9-shadow-inset)",
          }}
        >
          npx shadcn@latest add &quot;https://nostalgia-ui.vercel.app/r/{name}.json&quot;
        </pre>
      </section>

      {/* Import */}
      <section className="max-w-[720px] mb-6">
        <h2 className="os9-heading text-[12px] mb-2">Import</h2>
        <pre
          className="p-2.5 font-mono text-[10px] text-os9-black leading-[1.6] overflow-x-auto"
          style={{
            backgroundColor: "var(--os9-white)",
            border: "1px solid var(--os9-black)",
            boxShadow: "var(--os9-shadow-inset)",
          }}
        >
          {`import { ${title} } from "@/components/ui/${name}"`}
        </pre>
      </section>

      <RetroSeparator className="max-w-[720px] mb-6" />

      {/* Demo content */}
      <div className="max-w-[720px]">{children}</div>

      {/* Footer link */}
      <RetroSeparator className="max-w-[720px] mt-8 mb-4" />
      <div className="max-w-[720px] flex items-center gap-4">
        <Link
          href={`https://github.com/giorgioliapakis/nostalgia-ui/blob/main/registry/new-york/ui/${name}.tsx`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black underline hover:text-os9-azul"
        >
          View source
        </Link>
        <Link
          href="/components"
          className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black underline hover:text-os9-azul"
        >
          Back to overview
        </Link>
      </div>
    </main>
  )
}
