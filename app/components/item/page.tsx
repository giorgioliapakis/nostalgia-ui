import type { Metadata } from "next"
import {
  RetroItem,
  RetroItemActions,
  RetroItemContent,
  RetroItemDescription,
  RetroItemFooter,
  RetroItemGroup,
  RetroItemHeader,
  RetroItemMedia,
  RetroItemSeparator,
  RetroItemTitle,
} from "@/registry/new-york/ui/retro-item"
import {
  RetroIconApplication,
  RetroIconDocument,
  RetroIconFloppy,
  RetroIconFolder,
  RetroIconHardDrive,
  RetroIconPreferences,
} from "@/registry/new-york/ui/retro-icons"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroBadge } from "@/registry/new-york/ui/retro-badge"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "A flexible row for lists, settings and file browsers: media, title, description and actions, in default, outline and muted Mac OS 9 styles."

export const metadata: Metadata = {
  title: "Item",
  description: DESCRIPTION,
}

const USAGE = `
<RetroItem variant="outline">
  <RetroItemMedia><RetroIconHardDrive /></RetroItemMedia>
  <RetroItemContent>
    <RetroItemTitle>Macintosh HD</RetroItemTitle>
    <RetroItemDescription>4.2 GB available</RetroItemDescription>
  </RetroItemContent>
  <RetroItemActions>
    <RetroButton size="sm">Open</RetroButton>
  </RetroItemActions>
</RetroItem>
`

const FILES = [
  { name: "System Folder", kind: "folder", icon: RetroIconFolder, size: "212 MB" },
  { name: "SimpleText", kind: "application program", icon: RetroIconApplication, size: "528 K" },
  { name: "Read Me", kind: "SimpleText document", icon: RetroIconDocument, size: "12 K" },
]

export default function ItemPage() {
  return (
    <ComponentDocLayout
      name="retro-item"
      title="RetroItem"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Variants</h2>
        <div className="flex max-w-[420px] flex-col gap-4">
          <RetroItem>
            <RetroItemContent>
              <RetroItemTitle>Default</RetroItemTitle>
              <RetroItemDescription>
                Transparent row that blends into its container.
              </RetroItemDescription>
            </RetroItemContent>
            <RetroItemActions>
              <RetroButton size="sm">Action</RetroButton>
            </RetroItemActions>
          </RetroItem>
          <RetroItem variant="outline">
            <RetroItemContent>
              <RetroItemTitle>Outline</RetroItemTitle>
              <RetroItemDescription>
                Framed with a black border and a soft raised bevel.
              </RetroItemDescription>
            </RetroItemContent>
            <RetroItemActions>
              <RetroButton size="sm">Action</RetroButton>
            </RetroItemActions>
          </RetroItem>
          <RetroItem variant="muted">
            <RetroItemContent>
              <RetroItemTitle>Muted</RetroItemTitle>
              <RetroItemDescription>
                Platinum fill for secondary or grouped rows.
              </RetroItemDescription>
            </RetroItemContent>
            <RetroItemActions>
              <RetroButton size="sm">Action</RetroButton>
            </RetroItemActions>
          </RetroItem>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Media</h2>
        <div className="flex max-w-[420px] flex-col gap-4">
          <RetroItem variant="outline">
            <RetroItemMedia>
              <RetroIconHardDrive />
            </RetroItemMedia>
            <RetroItemContent>
              <RetroItemTitle>Macintosh HD</RetroItemTitle>
              <RetroItemDescription>4.2 GB available of 8 GB</RetroItemDescription>
            </RetroItemContent>
            <RetroItemActions>
              <RetroButton size="sm">Open</RetroButton>
            </RetroItemActions>
          </RetroItem>
          <RetroItem variant="outline" size="sm">
            <RetroItemMedia variant="icon">
              <RetroIconFloppy size="sm" />
            </RetroItemMedia>
            <RetroItemContent>
              <RetroItemTitle>Untitled Disk</RetroItemTitle>
            </RetroItemContent>
            <RetroItemActions>
              <RetroButton size="sm">Eject</RetroButton>
            </RetroItemActions>
          </RetroItem>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Group with Separators</h2>
        <div className="os9-inset max-w-[420px]">
          <RetroItemGroup>
            {FILES.map(({ name, kind, icon: Icon, size }, i) => (
              <div key={name} role="listitem">
                {i > 0 && <RetroItemSeparator />}
                <RetroItem size="sm" data-selected={i === 1 ? "true" : undefined}>
                  <RetroItemMedia>
                    <Icon size="sm" />
                  </RetroItemMedia>
                  <RetroItemContent>
                    <RetroItemTitle>{name}</RetroItemTitle>
                    <RetroItemDescription>{kind}</RetroItemDescription>
                  </RetroItemContent>
                  <RetroItemContent className="flex-none text-right">
                    <RetroItemDescription>{size}</RetroItemDescription>
                  </RetroItemContent>
                </RetroItem>
              </div>
            ))}
          </RetroItemGroup>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">As Link</h2>
        <div className="max-w-[420px]">
          <RetroItem variant="outline" asChild>
            <a href="#">
              <RetroItemMedia variant="icon">
                <RetroIconPreferences size="sm" />
              </RetroItemMedia>
              <RetroItemContent>
                <RetroItemTitle>Control Panels</RetroItemTitle>
                <RetroItemDescription>
                  Adjust Appearance, Memory, Monitors and Sound.
                </RetroItemDescription>
              </RetroItemContent>
              <RetroItemActions>
                <span aria-hidden className="font-[family-name:var(--font-heading)] text-[12px]">
                  ▸
                </span>
              </RetroItemActions>
            </a>
          </RetroItem>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Header and Footer</h2>
        <div className="max-w-[300px]">
          <RetroItem variant="outline">
            <RetroItemHeader>
              <RetroBadge variant="azul">Update</RetroBadge>
              <span className="text-[9px] text-os9-gray-700">Mac OS 9.2.2</span>
            </RetroItemHeader>
            <RetroItemContent>
              <RetroItemTitle>Software Update</RetroItemTitle>
              <RetroItemDescription>
                Improves stability and compatibility with Mac OS X Classic
                environment.
              </RetroItemDescription>
            </RetroItemContent>
            <RetroItemFooter>
              <span className="text-[9px] text-os9-gray-700">23 MB</span>
              <RetroButton size="sm" variant="primary">
                Install
              </RetroButton>
            </RetroItemFooter>
          </RetroItem>
        </div>
      </section>
    </ComponentDocLayout>
  )
}
