import {
  RetroCard,
  RetroCardHeader,
  RetroCardTitle,
  RetroCardDescription,
  RetroCardContent,
  RetroCardFooter,
} from "@/registry/new-york/ui/retro-card"
import { RetroButton } from "@/registry/new-york/ui/retro-button"

export default function CardPreview() {
  return (
    <main className="min-h-screen p-8 space-y-10">
      <h1 className="font-[family-name:var(--font-heading)] text-[14px] tracking-[0.42px]">
        retro-card
      </h1>

      {/* ---- Full card with all subcomponents ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Full card
        </h2>

        <RetroCard className="w-[320px]">
          <RetroCardHeader>
            <RetroCardTitle>System Preferences</RetroCardTitle>
            <RetroCardDescription>
              Configure your Macintosh settings and control panels.
            </RetroCardDescription>
          </RetroCardHeader>
          <RetroCardContent>
            <p className="text-[11px] font-[family-name:var(--font-sans)]">
              Memory: 128 MB RAM installed. Virtual Memory is currently turned
              on, using &quot;Macintosh HD&quot; as the backing store.
            </p>
          </RetroCardContent>
          <RetroCardFooter>
            <RetroButton variant="primary" size="sm">
              Save
            </RetroButton>
            <RetroButton size="sm">Cancel</RetroButton>
          </RetroCardFooter>
        </RetroCard>
      </section>

      {/* ---- Content-only card ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Content only
        </h2>

        <RetroCard className="w-[320px]">
          <RetroCardContent>
            <p className="text-[11px] font-[family-name:var(--font-sans)]">
              A simple card with content only &mdash; no header or footer.
              Useful for plain informational panels.
            </p>
          </RetroCardContent>
        </RetroCard>
      </section>

      {/* ---- Header + Content (no footer) ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Header + Content
        </h2>

        <RetroCard className="w-[320px]">
          <RetroCardHeader>
            <RetroCardTitle>About This Macintosh</RetroCardTitle>
            <RetroCardDescription>
              Hardware and system information.
            </RetroCardDescription>
          </RetroCardHeader>
          <RetroCardContent>
            <ul className="text-[11px] font-[family-name:var(--font-sans)] space-y-1">
              <li>Mac OS 9.2.2</li>
              <li>Built-in Memory: 128 MB</li>
              <li>Largest Unused Block: 86.4 MB</li>
            </ul>
          </RetroCardContent>
        </RetroCard>
      </section>

      {/* ---- Side-by-side cards ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Side by side
        </h2>

        <div className="flex gap-4">
          <RetroCard className="w-[220px]">
            <RetroCardHeader>
              <RetroCardTitle>Sherlock</RetroCardTitle>
            </RetroCardHeader>
            <RetroCardContent>
              <p className="text-[11px] font-[family-name:var(--font-sans)]">
                Search the Internet and your hard disks.
              </p>
            </RetroCardContent>
            <RetroCardFooter>
              <RetroButton size="sm">Search</RetroButton>
            </RetroCardFooter>
          </RetroCard>

          <RetroCard className="w-[220px]">
            <RetroCardHeader>
              <RetroCardTitle>SimpleText</RetroCardTitle>
            </RetroCardHeader>
            <RetroCardContent>
              <p className="text-[11px] font-[family-name:var(--font-sans)]">
                Read and edit plain text documents.
              </p>
            </RetroCardContent>
            <RetroCardFooter>
              <RetroButton size="sm">Open</RetroButton>
            </RetroCardFooter>
          </RetroCard>
        </div>
      </section>
    </main>
  )
}
