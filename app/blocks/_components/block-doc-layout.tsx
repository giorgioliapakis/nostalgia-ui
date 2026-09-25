import Link from "next/link"

import { RetroSeparator } from "@/registry/new-york/ui/retro-separator"

interface BlockDocProps {
  /** Registry item name, e.g. "finder-window" */
  name: string
  title: string
  description: string
  /** Exported component name, e.g. "FinderWindowBlock" */
  exportName: string
  children: React.ReactNode
}

const CODE_BLOCK_CLS =
  "os9-inset p-2.5 font-mono text-[10px] text-os9-black leading-[1.6] overflow-x-auto"

export function BlockDocLayout({
  name,
  title,
  description,
  exportName,
  children,
}: BlockDocProps) {
  return (
    <main className="min-h-screen min-w-0 bg-os9-gray-200 p-4 sm:p-8">
      <div className="max-w-[720px] mb-6">
        <h1 className="os9-heading text-[18px] mb-2">{title}</h1>
        <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-gray-700">
          {description}
        </p>
      </div>

      <section className="max-w-[720px] mb-6">
        <h2 className="os9-heading text-[12px] mb-2">Installation</h2>
        <pre className={CODE_BLOCK_CLS}>
          npx shadcn@latest add &quot;https://nostalgia-ui.com/r/{name}.json&quot;
        </pre>
      </section>

      <section className="max-w-[720px] mb-6">
        <h2 className="os9-heading text-[12px] mb-2">Import</h2>
        <pre className={CODE_BLOCK_CLS}>
          {`import { ${exportName} } from "@/components/${name}"`}
        </pre>
      </section>

      <RetroSeparator className="max-w-[720px] mb-6" />

      {/* Preview: blocks get a wider, desktop-patterned stage */}
      <div
        className="relative w-full min-w-0 max-w-[1100px] overflow-x-auto overflow-y-hidden border border-os9-black p-3 sm:p-6"
        style={{
          backgroundColor: "var(--os9-gray-400)",
          backgroundImage:
            "radial-gradient(var(--os9-gray-600) 0.5px, transparent 0.5px)",
          backgroundSize: "4px 4px",
        }}
      >
        {children}
      </div>

      <RetroSeparator className="max-w-[720px] mt-8 mb-4" />
      <div className="max-w-[720px] flex items-center gap-4">
        <Link
          href={`https://github.com/giorgioliapakis/nostalgia-ui/blob/main/registry/new-york/blocks/${name}.tsx`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black underline hover:text-os9-azul"
        >
          View source
        </Link>
        <Link
          href="/blocks"
          className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black underline hover:text-os9-azul"
        >
          All blocks
        </Link>
      </div>
    </main>
  )
}
