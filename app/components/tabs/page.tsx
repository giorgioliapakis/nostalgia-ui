import {
  RetroTabs,
  RetroTabsList,
  RetroTabsTrigger,
  RetroTabsContent,
} from "@/registry/new-york/ui/retro-tabs"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function TabsPreview() {
  return (
    <ComponentDocLayout
      name="retro-tabs"
      title="RetroTabs"
      description="A tabbed interface with Mac OS 9 folder tab styling in large and small sizes."
    >
      {/* ---- Large tabs (default) ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Large
        </h2>

        <RetroTabs defaultValue="general" className="w-[480px]">
          <RetroTabsList>
            <RetroTabsTrigger value="general">General</RetroTabsTrigger>
            <RetroTabsTrigger value="sharing">File Sharing</RetroTabsTrigger>
            <RetroTabsTrigger value="memory">Memory</RetroTabsTrigger>
          </RetroTabsList>

          <RetroTabsContent value="general">
            <p className="text-[12px] font-[family-name:var(--font-sans)]">
              This Mac is set up for use by one user. To change how your Mac
              identifies itself on the network, open Network preferences.
            </p>
          </RetroTabsContent>

          <RetroTabsContent value="sharing">
            <p className="text-[12px] font-[family-name:var(--font-sans)]">
              File Sharing is off. Click Start to allow other users to access
              shared folders on this computer.
            </p>
          </RetroTabsContent>

          <RetroTabsContent value="memory">
            <p className="text-[12px] font-[family-name:var(--font-sans)]">
              Built-in Memory: 128 MB. Virtual Memory is on, using the disk
              &quot;Macintosh HD&quot;.
            </p>
          </RetroTabsContent>
        </RetroTabs>
      </section>

      {/* ---- Small tabs ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Small
        </h2>

        <RetroTabs defaultValue="files" size="sm" className="w-[400px]">
          <RetroTabsList>
            <RetroTabsTrigger value="files">Files</RetroTabsTrigger>
            <RetroTabsTrigger value="apps">Applications</RetroTabsTrigger>
            <RetroTabsTrigger value="prefs">Preferences</RetroTabsTrigger>
          </RetroTabsList>

          <RetroTabsContent value="files">
            <p className="text-[10px] font-[family-name:var(--font-sans)]">
              3 items, 1.2 GB available
            </p>
          </RetroTabsContent>

          <RetroTabsContent value="apps">
            <p className="text-[10px] font-[family-name:var(--font-sans)]">
              SimpleText, Sherlock, Stickies, Calculator
            </p>
          </RetroTabsContent>

          <RetroTabsContent value="prefs">
            <p className="text-[10px] font-[family-name:var(--font-sans)]">
              Appearance, Date &amp; Time, Sound, Monitors
            </p>
          </RetroTabsContent>
        </RetroTabs>
      </section>

      {/* ---- Many tabs (overflow test) ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Many tabs
        </h2>

        <RetroTabs defaultValue="tab-1" className="w-[480px]">
          <RetroTabsList>
            <RetroTabsTrigger value="tab-1">Tab 01</RetroTabsTrigger>
            <RetroTabsTrigger value="tab-2">Tab 02</RetroTabsTrigger>
            <RetroTabsTrigger value="tab-3">Tab 03</RetroTabsTrigger>
            <RetroTabsTrigger value="tab-4">Tab 04</RetroTabsTrigger>
            <RetroTabsTrigger value="tab-5">Tab 05</RetroTabsTrigger>
            <RetroTabsTrigger value="tab-6">Tab 06</RetroTabsTrigger>
          </RetroTabsList>

          <RetroTabsContent value="tab-1">
            <p className="text-[12px] font-[family-name:var(--font-sans)]">
              Content for Tab 01.
            </p>
          </RetroTabsContent>
          <RetroTabsContent value="tab-2">
            <p className="text-[12px] font-[family-name:var(--font-sans)]">
              Content for Tab 02.
            </p>
          </RetroTabsContent>
          <RetroTabsContent value="tab-3">
            <p className="text-[12px] font-[family-name:var(--font-sans)]">
              Content for Tab 03.
            </p>
          </RetroTabsContent>
          <RetroTabsContent value="tab-4">
            <p className="text-[12px] font-[family-name:var(--font-sans)]">
              Content for Tab 04.
            </p>
          </RetroTabsContent>
          <RetroTabsContent value="tab-5">
            <p className="text-[12px] font-[family-name:var(--font-sans)]">
              Content for Tab 05.
            </p>
          </RetroTabsContent>
          <RetroTabsContent value="tab-6">
            <p className="text-[12px] font-[family-name:var(--font-sans)]">
              Content for Tab 06.
            </p>
          </RetroTabsContent>
        </RetroTabs>
      </section>
    </ComponentDocLayout>
  )
}
