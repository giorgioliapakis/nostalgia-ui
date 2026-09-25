"use client"

import * as React from "react"

import {
  RetroAppSwitcher,
  type AppSwitcherApp,
} from "@/registry/new-york/ui/retro-app-switcher"
import {
  RetroDesktop,
  RetroDesktopArea,
  RetroDesktopMenuBar,
} from "@/registry/new-york/ui/retro-desktop"
import { ComponentDocLayout } from "../_components/component-doc-layout"

function FinderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="13" fill="#6666cc" stroke="#262626" />
      <rect x="8" y="2" width="6" height="12" fill="#ccccff" />
      <path d="M8 2V14" stroke="#262626" />
      <path d="M4.5 5V6.5M11 5V6.5M4 10.5Q8 13 12 10.5" fill="none" stroke="#262626" />
    </svg>
  )
}

function SimpleTextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 1.5H10.5L13.5 4.5V14.5H3.5Z" fill="#ffffff" stroke="#262626" />
      <path d="M5 6.5H12M5 8.5H12M5 10.5H10" stroke="#333399" />
    </svg>
  )
}

const initialApps: AppSwitcherApp[] = [
  { id: "finder", name: "Finder", icon: <FinderIcon /> },
  { id: "simpletext", name: "SimpleText", icon: <SimpleTextIcon /> },
  { id: "ie", name: "Internet Explorer" },
]

export default function AppSwitcherPreview() {
  const [apps, setApps] = React.useState(initialApps)
  const [active, setActive] = React.useState("finder")

  const setHidden = (pred: (a: AppSwitcherApp) => boolean, hidden: boolean) =>
    setApps((prev) => prev.map((a) => (pred(a) ? { ...a, hidden } : a)))

  return (
    <ComponentDocLayout
      name="retro-app-switcher"
      title="RetroAppSwitcher"
      description="The Mac OS 9 Application menu: shows the frontmost app at the right end of the menu bar with Hide, Hide Others, Show All and a running-apps list."
      usage={`
<RetroDesktopMenuBar>
  <span>File</span>
  <RetroAppSwitcher
    className="ml-auto"
    apps={apps}
    activeApp={active}
    onActiveAppChange={setActive}
    onHide={hide}
    onHideOthers={hideOthers}
    onShowAll={showAll}
  />
</RetroDesktopMenuBar>`}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">In the menu bar</h2>
        <p className="text-[10px] text-os9-gray-700 mb-3">
          Choose an app to bring it to the front. Hidden apps show a dimmed
          icon.
        </p>
        <div className="h-[200px] max-w-[560px] overflow-hidden border border-os9-black">
          <RetroDesktop className="!h-full !w-full">
            <RetroDesktopMenuBar showClock={false}>
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Special</span>
              <span>Help</span>
              <RetroAppSwitcher
                className="ml-auto -mr-[8px]"
                apps={apps}
                activeApp={active}
                onActiveAppChange={(id) => {
                  setActive(id)
                  setHidden((a) => a.id === id, false)
                }}
                onHide={(id) => {
                  const next = apps.find((a) => a.id !== id && !a.hidden)
                  setHidden((a) => a.id === id, true)
                  if (next) setActive(next.id)
                }}
                onHideOthers={(id) => setHidden((a) => a.id !== id, true)}
                onShowAll={() => setHidden(() => true, false)}
              />
            </RetroDesktopMenuBar>
            <RetroDesktopArea wallpaper="pattern">
              <p className="p-4 text-[10px] text-os9-gray-700">
                Frontmost: {apps.find((a) => a.id === active)?.name}
                <br />
                Hidden: {apps.filter((a) => a.hidden).map((a) => a.name).join(", ") || "none"}
              </p>
            </RetroDesktopArea>
          </RetroDesktop>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-2">Icon only</h2>
        <div className="inline-flex border border-os9-black bg-os9-gray-300">
          <RetroAppSwitcher apps={initialApps} showLabel={false} />
        </div>
      </section>
    </ComponentDocLayout>
  )
}
