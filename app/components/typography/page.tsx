import type { Metadata } from "next"
import {
  RetroBlockquote,
  RetroH1,
  RetroH2,
  RetroH3,
  RetroH4,
  RetroInlineCode,
  RetroLarge,
  RetroLead,
  RetroList,
  RetroMuted,
  RetroP,
  RetroSmall,
  RetroText,
} from "@/registry/new-york/ui/retro-typography"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export const metadata: Metadata = {
  title: "Typography",
  description:
    "Mac OS 9 typography: a polymorphic RetroText with 8 variants plus shadcn-style semantic elements (headings, paragraphs, lists, blockquotes, inline code).",
}

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

function RetroSeparatorRule() {
  return (
    <div
      aria-hidden
      className="mb-8 h-[2px] border-t border-os9-gray-700 border-b border-b-os9-white"
    />
  )
}

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

      <RetroSeparatorRule />

      {/* Semantic elements */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Semantic Elements</h2>
        <p className="text-os9-gray-700 text-[10px] mb-4">
          Drop-in equivalents of the shadcn typography styles, each rendering
          its own semantic element with the OS9 type scale.
        </p>
        <div className="space-y-4">
          {[
            ["RetroH1", <RetroH1 key="h1">Mac OS 9</RetroH1>],
            ["RetroH2", <RetroH2 key="h2">The Best Internet Software Ever</RetroH2>],
            ["RetroH3", <RetroH3 key="h3">Sherlock 2</RetroH3>],
            ["RetroH4", <RetroH4 key="h4">Multiple Users</RetroH4>],
            [
              "RetroLead",
              <RetroLead key="lead">
                Nine powerful new features that make your Mac your personal
                Internet assistant.
              </RetroLead>,
            ],
            ["RetroLarge", <RetroLarge key="large">Are you sure?</RetroLarge>],
            ["RetroSmall", <RetroSmall key="small">Version 9.2.2</RetroSmall>],
            [
              "RetroMuted",
              <RetroMuted key="muted">Last modified: Tue, Dec 4, 2001</RetroMuted>,
            ],
          ].map(([name, node]) => (
            <div
              key={name as string}
              className="border-b border-os9-gray-400 pb-4"
            >
              <p className="text-os9-gray-700 text-[9px] font-bold mb-2">
                {name}
              </p>
              {node}
            </div>
          ))}
        </div>
      </section>

      {/* Prose */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Prose</h2>
        <article className="border border-os9-black bg-os9-white p-6 max-w-[520px]">
          <RetroH1>Read Me First</RetroH1>
          <RetroLead className="mt-2">
            Welcome to Mac OS 9. This document covers late-breaking news about
            your system software.
          </RetroLead>
          <RetroH2 className="mt-6">Installing</RetroH2>
          <RetroP>
            Before installing, run <RetroInlineCode>Disk First Aid</RetroInlineCode>{" "}
            on your startup disk and turn off any third-party extensions with
            the <RetroInlineCode>Shift</RetroInlineCode> key held down.
          </RetroP>
          <RetroBlockquote>
            &ldquo;The best Mac OS ever.&rdquo; &mdash; the box it came in
          </RetroBlockquote>
          <RetroH3 className="mt-6">Requirements</RetroH3>
          <RetroList>
            <li>A Macintosh computer with a PowerPC processor</li>
            <li>At least 40 MB of physical RAM</li>
            <li>Approximately 200 MB of free disk space</li>
          </RetroList>
          <RetroH4 className="mt-4">Install order</RetroH4>
          <RetroList ordered>
            <li>Start up from the Mac OS 9 CD</li>
            <li>Open Mac OS Install</li>
            <li>Follow the on-screen instructions</li>
          </RetroList>
          <RetroMuted className="mt-4">
            © 1983–2001 Apple Computer, Inc. All rights reserved.
          </RetroMuted>
        </article>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Use the `as` prop to change the rendered HTML element. The variant prop
        controls the visual style independently of the semantic element.
      </p>
    </ComponentDocLayout>
  )
}
