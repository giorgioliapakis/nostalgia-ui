import {
  RetroMenuBar,
  RetroMenuBarMenu,
  RetroMenuBarTrigger,
  RetroMenuBarContent,
  RetroMenuBarItem,
  RetroMenuBarSeparator,
} from "@/registry/new-york/ui/retro-menu-bar"

export default function MenuBarPreview() {
  return (
    <main className="min-h-screen p-8 space-y-10">
      <h1 className="font-[family-name:var(--font-heading)] text-[14px] tracking-[0.42px]">
        retro-menu-bar
      </h1>

      {/* ---- Full-width menu bar ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Default
        </h2>

        <RetroMenuBar className="w-full">
          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>File</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>New</RetroMenuBarItem>
              <RetroMenuBarItem>Open...</RetroMenuBarItem>
              <RetroMenuBarItem>Close</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Save</RetroMenuBarItem>
              <RetroMenuBarItem>Save As...</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Page Setup...</RetroMenuBarItem>
              <RetroMenuBarItem>Print...</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Quit</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>

          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>Edit</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>Undo</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Cut</RetroMenuBarItem>
              <RetroMenuBarItem>Copy</RetroMenuBarItem>
              <RetroMenuBarItem>Paste</RetroMenuBarItem>
              <RetroMenuBarItem>Clear</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Select All</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>

          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>View</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>as Icons</RetroMenuBarItem>
              <RetroMenuBarItem>as Buttons</RetroMenuBarItem>
              <RetroMenuBarItem>as List</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Clean Up</RetroMenuBarItem>
              <RetroMenuBarItem>Arrange</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem disabled>Reset Column Positions</RetroMenuBarItem>
              <RetroMenuBarItem disabled>View Options...</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>
        </RetroMenuBar>
      </section>

      {/* ---- Fixed-width menu bar ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Fixed width (480px)
        </h2>

        <RetroMenuBar className="w-[480px]">
          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>File</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>New Folder</RetroMenuBarItem>
              <RetroMenuBarItem>Open</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Get Info</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>

          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>Edit</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>Undo</RetroMenuBarItem>
              <RetroMenuBarSeparator />
              <RetroMenuBarItem>Cut</RetroMenuBarItem>
              <RetroMenuBarItem>Copy</RetroMenuBarItem>
              <RetroMenuBarItem>Paste</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>

          <RetroMenuBarMenu>
            <RetroMenuBarTrigger>View</RetroMenuBarTrigger>
            <RetroMenuBarContent>
              <RetroMenuBarItem>as Icons</RetroMenuBarItem>
              <RetroMenuBarItem>as List</RetroMenuBarItem>
            </RetroMenuBarContent>
          </RetroMenuBarMenu>
        </RetroMenuBar>
      </section>
    </main>
  )
}
