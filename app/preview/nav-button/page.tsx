import { RetroNavButton } from "@/registry/new-york/ui/retro-nav-button"

export default function NavButtonPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroNavButton Preview</h1>

      {/* Default state */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Default (all directions)</h2>
        <div className="flex items-center gap-4">
          <RetroNavButton direction="left" />
          <RetroNavButton direction="right" />
          <RetroNavButton direction="up" />
          <RetroNavButton direction="down" />
        </div>
      </section>

      {/* Active / pressed state */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Active (press and hold to see pressed bevel)
        </h2>
        <div className="flex items-center gap-4">
          <RetroNavButton direction="left" />
          <RetroNavButton direction="right" />
          <RetroNavButton direction="up" />
          <RetroNavButton direction="down" />
        </div>
      </section>

      {/* Disabled state */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <div className="flex items-center gap-4">
          <RetroNavButton direction="left" disabled />
          <RetroNavButton direction="right" disabled />
          <RetroNavButton direction="up" disabled />
          <RetroNavButton direction="down" disabled />
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Press and hold buttons to see the active/pressed bevel state.
      </p>
    </main>
  )
}
