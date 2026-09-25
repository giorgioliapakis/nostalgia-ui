import type { Metadata } from "next"
import Link from "next/link"

import {
  RetroCard,
  RetroCardContent,
  RetroCardHeader,
  RetroCardTitle,
} from "@/registry/new-york/ui/retro-card"
import { BLOCKS } from "./_components/blocks-data"

export const metadata: Metadata = {
  title: "Blocks",
}

export default function BlocksIndex() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <div className="max-w-[900px] mb-6">
        <h1 className="os9-heading text-[18px] mb-2">Blocks</h1>
        <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-gray-700">
          Complete Mac OS 9 screens built from nostalgia-ui components. Each
          block installs with one command and pulls in the components it uses.
        </p>
      </div>
      <div className="grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BLOCKS.map((block) => (
          <Link key={block.slug} href={`/blocks/${block.slug}`} className="no-underline">
            <RetroCard className="h-full hover:bg-os9-lavender">
              <RetroCardHeader>
                <RetroCardTitle>{block.name}</RetroCardTitle>
              </RetroCardHeader>
              <RetroCardContent>
                <p className="text-[10px] text-os9-gray-800">{block.description}</p>
              </RetroCardContent>
            </RetroCard>
          </Link>
        ))}
      </div>
    </main>
  )
}
