import Link from "next/link"

import { RetroSeparator } from "@/registry/new-york/ui/retro-separator"

interface ComponentDocProps {
  name: string
  title: string
  description: string
  /** Optional usage snippet, rendered as a code block after Import. */
  usage?: string
  children: React.ReactNode
}

const CODE_BLOCK_CLS =
  "p-2.5 font-mono text-[10px] text-os9-black leading-[1.6] overflow-x-auto"

const CODE_BLOCK_STYLE: React.CSSProperties = {
  backgroundColor: "var(--os9-white)",
  border: "1px solid var(--os9-black)",
  boxShadow: "var(--os9-shadow-inset)",
}

export function ComponentDocLayout({
  name,
  title,
  description,
  usage,
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
        <pre className={CODE_BLOCK_CLS} style={CODE_BLOCK_STYLE}>
          npx shadcn@latest add &quot;https://nostalgia-ui.com/r/{name}.json&quot;
        </pre>
        <p className="mt-2 font-[family-name:var(--font-sans)] text-[10px] leading-[1.5] text-os9-gray-700">
          <span className="font-bold text-os9-black">Setup:</span> installing
          any component also installs{" "}
          <code className="font-mono">nostalgia-theme</code> (the{" "}
          <code className="font-mono">--os9-*</code> tokens and{" "}
          <code className="font-mono">os9-*</code> utilities) via{" "}
          <code className="font-mono">registryDependencies</code>. To add the
          theme on its own:{" "}
          <code className="font-mono break-all">
            npx shadcn@latest add https://nostalgia-ui.com/r/nostalgia-theme.json
          </code>
        </p>
      </section>

      {/* Import */}
      <section className="max-w-[720px] mb-6">
        <h2 className="os9-heading text-[12px] mb-2">Import</h2>
        <pre className={CODE_BLOCK_CLS} style={CODE_BLOCK_STYLE}>
          {`import { ${title} } from "@/components/ui/${name}"`}
        </pre>
      </section>

      {/* Usage (optional) */}
      {usage ? (
        <section className="max-w-[720px] mb-6">
          <h2 className="os9-heading text-[12px] mb-2">Usage</h2>
          <pre className={CODE_BLOCK_CLS} style={CODE_BLOCK_STYLE}>
            {usage.trim()}
          </pre>
        </section>
      ) : null}

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
