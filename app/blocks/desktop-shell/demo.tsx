"use client"

import { DesktopShellBlock } from "@/registry/new-york/blocks/desktop-shell"

export function DesktopShellDemo() {
  return (
    <div className="h-[560px] w-full border border-os9-black shadow-[2px_2px_0_var(--os9-black)]">
      <DesktopShellBlock title="Macintosh HD" />
    </div>
  )
}
