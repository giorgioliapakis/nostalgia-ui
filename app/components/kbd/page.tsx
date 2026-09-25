import type { Metadata } from "next"
import {
  RETRO_KBD_KEYS as K,
  RetroKbd,
  RetroKbdGroup,
} from "@/registry/new-york/ui/retro-kbd"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "Keyboard keycaps with a small raised bevel and Charcoal lettering. Renders the classic Mac modifier glyphs (⌘ ⌥ ⇧ ⌃) for shortcuts in menus, tooltips and docs."

export const metadata: Metadata = {
  title: "Kbd",
  description: DESCRIPTION,
}

const USAGE = `
<RetroKbdGroup>
  <RetroKbd>{RETRO_KBD_KEYS.command}</RetroKbd>
  <RetroKbd>Q</RetroKbd>
</RetroKbdGroup>
`

const SHORTCUTS = [
  { label: "Quit", keys: [K.command, "Q"] },
  { label: "Close Window", keys: [K.command, "W"] },
  { label: "Get Info", keys: [K.command, "I"] },
  { label: "Empty Trash", keys: [K.command, K.shift, K.delete] },
  { label: "Force Quit", keys: [K.command, K.option, K.escape] },
  { label: "Restart", keys: [K.command, K.control, K.power] },
]

export default function KbdPage() {
  return (
    <ComponentDocLayout
      name="retro-kbd"
      title="RetroKbd"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Single Keys</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <RetroKbd>{K.command}</RetroKbd>
          <RetroKbd>{K.option}</RetroKbd>
          <RetroKbd>{K.shift}</RetroKbd>
          <RetroKbd>{K.control}</RetroKbd>
          <RetroKbd>{K.return}</RetroKbd>
          <RetroKbd>{K.delete}</RetroKbd>
          <RetroKbd>{K.escape}</RetroKbd>
          <RetroKbd>{K.tab}</RetroKbd>
          <RetroKbd>A</RetroKbd>
          <RetroKbd>Space</RetroKbd>
          <RetroKbd>F12</RetroKbd>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Groups</h2>
        <div className="flex items-center gap-6 flex-wrap">
          <RetroKbdGroup>
            <RetroKbd>{K.command}</RetroKbd>
            <RetroKbd>Q</RetroKbd>
          </RetroKbdGroup>
          <RetroKbdGroup>
            <RetroKbd>{K.command}</RetroKbd>
            <RetroKbd>{K.shift}</RetroKbd>
            <RetroKbd>3</RetroKbd>
          </RetroKbdGroup>
          <RetroKbdGroup>
            <RetroKbd>{K.control}</RetroKbd>
            <span>+</span>
            <RetroKbd>Click</RetroKbd>
          </RetroKbdGroup>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Sizes</h2>
        <div className="flex items-end gap-6">
          <RetroKbdGroup>
            <RetroKbd size="sm">{K.command}</RetroKbd>
            <RetroKbd size="sm">S</RetroKbd>
          </RetroKbdGroup>
          <RetroKbdGroup>
            <RetroKbd>{K.command}</RetroKbd>
            <RetroKbd>S</RetroKbd>
          </RetroKbdGroup>
          <RetroKbdGroup>
            <RetroKbd size="lg">{K.command}</RetroKbd>
            <RetroKbd size="lg">S</RetroKbd>
          </RetroKbdGroup>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Shortcut Table</h2>
        <div className="os9-window w-[280px] p-[8px]">
          <ul className="flex flex-col">
            {SHORTCUTS.map(({ label, keys }) => (
              <li
                key={label}
                className="flex h-[26px] items-center justify-between border-b border-os9-gray-400 last:border-b-0"
              >
                <span className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
                  {label}
                </span>
                <RetroKbdGroup>
                  {keys.map((key) => (
                    <RetroKbd key={key}>{key}</RetroKbd>
                  ))}
                </RetroKbdGroup>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Inline</h2>
        <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.8] max-w-[420px]">
          Press{" "}
          <RetroKbdGroup>
            <RetroKbd size="sm">{K.command}</RetroKbd>
            <RetroKbd size="sm">Q</RetroKbd>
          </RetroKbdGroup>{" "}
          to quit, or hold <RetroKbd size="sm">{K.option}</RetroKbd> while
          clicking the close box to close every Finder window.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">In a Button</h2>
        <RetroButton className="gap-2">
          Save
          <RetroKbdGroup>
            <RetroKbd size="sm">{K.command}</RetroKbd>
            <RetroKbd size="sm">S</RetroKbd>
          </RetroKbdGroup>
        </RetroButton>
      </section>
    </ComponentDocLayout>
  )
}
