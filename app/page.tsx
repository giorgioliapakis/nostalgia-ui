"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { RetroWindow } from "@/registry/new-york/ui/retro-window"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import {
  RetroCard,
  RetroCardHeader,
  RetroCardTitle,
  RetroCardContent,
} from "@/registry/new-york/ui/retro-card"
import { RetroDesktopIcon } from "@/registry/new-york/ui/retro-desktop"
import { RetroIcon } from "@/registry/new-york/ui/retro-icons"
import { RetroCheckbox } from "@/registry/new-york/ui/retro-checkbox"
import {
  RetroRadioGroup,
  RetroRadioGroupItem,
} from "@/registry/new-york/ui/retro-radio"
import { RetroSwitch } from "@/registry/new-york/ui/retro-switch"
import { RetroSlider } from "@/registry/new-york/ui/retro-slider"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import { RetroProgress } from "@/registry/new-york/ui/retro-progress"
import {
  RetroTable,
  RetroTableHeader,
  RetroTableBody,
  RetroTableRow,
  RetroTableHead,
  RetroTableCell,
} from "@/registry/new-york/ui/retro-table"
import {
  RetroAlert,
  RetroAlertTitle,
  RetroAlertDescription,
} from "@/registry/new-york/ui/retro-alert"
import { RetroBadge } from "@/registry/new-york/ui/retro-badge"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import {
  RetroTabs,
  RetroTabsList,
  RetroTabsTrigger,
  RetroTabsContent,
} from "@/registry/new-york/ui/retro-tabs"
import {
  RetroDropdownMenu,
  RetroDropdownMenuTrigger,
  RetroDropdownMenuContent,
  RetroDropdownMenuItem,
  RetroDropdownMenuSeparator,
  RetroDropdownMenuCheckboxItem,
  RetroDropdownMenuShortcut,
} from "@/registry/new-york/ui/retro-dropdown-menu"
import {
  RetroSelect,
  RetroSelectTrigger,
  RetroSelectValue,
  RetroSelectContent,
  RetroSelectItem,
} from "@/registry/new-york/ui/retro-select"
import {
  RetroDialog,
  RetroDialogContent,
  RetroDialogHeader,
  RetroDialogTitle,
  RetroDialogDescription,
} from "@/registry/new-york/ui/retro-dialog"
import {
  RetroToastProvider,
  useRetroToast,
} from "@/registry/new-york/ui/retro-toast"
import { RetroSeparator } from "@/registry/new-york/ui/retro-separator"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type WindowId = "welcome" | "install" | "sampler"

type WinState = {
  visible: boolean
  x: number
  y: number
  z: number
  collapsed: boolean
}

const TITLE_BAR_H = 19

/* ------------------------------------------------------------------ */
/*  Initial window layout (based on viewport)                          */
/* ------------------------------------------------------------------ */

function initLayout(vw: number, vh: number): Record<WindowId, WinState> {
  const dh = vh - 20
  return {
    welcome: {
      visible: true,
      x: Math.round(Math.max(24, vw * 0.06)),
      y: Math.round(Math.max(24, dh * 0.06)),
      z: 3,
      collapsed: false,
    },
    install: {
      visible: true,
      x: Math.round(Math.max(32, vw * 0.04)),
      y: Math.round(Math.max(280, dh * 0.54)),
      z: 1,
      collapsed: false,
    },
    sampler: {
      visible: true,
      x: Math.round(Math.min(vw * 0.46, vw - 450)),
      y: Math.round(Math.max(40, dh * 0.08)),
      z: 2,
      collapsed: false,
    },
  }
}

/* ------------------------------------------------------------------ */
/*  Clock (client-only to avoid SSR mismatch)                          */
/* ------------------------------------------------------------------ */

function Clock() {
  const [time, setTime] = React.useState("")

  React.useEffect(() => {
    const fmt = () => {
      const now = new Date()
      const h = now.getHours() % 12 || 12
      const m = now.getMinutes().toString().padStart(2, "0")
      const ampm = now.getHours() >= 12 ? "PM" : "AM"
      return `${h}:${m} ${ampm}`
    }
    setTime(fmt())
    const iv = setInterval(() => setTime(fmt()), 60_000)
    return () => clearInterval(iv)
  }, [])

  if (!time) return null

  return (
    <span className="shrink-0 pl-[8px] font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98] text-os9-black">
      {time}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Sampler tabs (shared between desktop + mobile)                     */
/* ------------------------------------------------------------------ */

function SamplerTabs({
  demoProgress,
  toast,
}: {
  demoProgress: number
  toast: (opts: {
    title?: React.ReactNode
    description?: React.ReactNode
  }) => string
}) {
  return (
    <RetroTabs defaultValue="forms" size="sm">
      <RetroTabsList>
        <RetroTabsTrigger value="forms">Forms</RetroTabsTrigger>
        <RetroTabsTrigger value="data">Data</RetroTabsTrigger>
        <RetroTabsTrigger value="feedback">Feedback</RetroTabsTrigger>
      </RetroTabsList>

      <RetroTabsContent value="forms">
        <div className="flex flex-col gap-[10px]">
          <div>
            <RetroLabel htmlFor="demo-name" className="mb-[3px] block">
              Name
            </RetroLabel>
            <RetroInput id="demo-name" placeholder="Woz" size="sm" />
          </div>
          <div>
            <RetroLabel className="mb-[3px] block">Favorite OS</RetroLabel>
            <RetroSelect defaultValue="os9">
              <RetroSelectTrigger className="w-full">
                <RetroSelectValue />
              </RetroSelectTrigger>
              <RetroSelectContent>
                <RetroSelectItem value="os9">Mac OS 9</RetroSelectItem>
                <RetroSelectItem value="os8">Mac OS 8</RetroSelectItem>
                <RetroSelectItem value="system7">System 7</RetroSelectItem>
              </RetroSelectContent>
            </RetroSelect>
          </div>
          <RetroSeparator />
          <div className="flex items-center gap-[6px]">
            <RetroCheckbox id="demo-chk" defaultChecked />
            <RetroLabel htmlFor="demo-chk">Enable nostalgia mode</RetroLabel>
          </div>
          <RetroRadioGroup defaultValue="platinum">
            <div className="flex items-center gap-[6px]">
              <RetroRadioGroupItem value="platinum" id="rg-plat" />
              <RetroLabel htmlFor="rg-plat">Platinum theme</RetroLabel>
            </div>
            <div className="flex items-center gap-[6px]">
              <RetroRadioGroupItem value="graphite" id="rg-grap" />
              <RetroLabel htmlFor="rg-grap">Graphite theme</RetroLabel>
            </div>
          </RetroRadioGroup>
          <div className="flex items-center gap-[6px]">
            <RetroSwitch id="demo-sw" defaultChecked />
            <RetroLabel htmlFor="demo-sw">Appearance sounds</RetroLabel>
          </div>
          <div>
            <RetroLabel className="mb-[3px] block">Volume</RetroLabel>
            <RetroSlider defaultValue={[65]} max={100} />
          </div>
        </div>
      </RetroTabsContent>

      <RetroTabsContent value="data">
        <div className="flex flex-col gap-[10px]">
          <RetroTable>
            <RetroTableHeader>
              <RetroTableRow>
                <RetroTableHead>Component</RetroTableHead>
                <RetroTableHead>Type</RetroTableHead>
                <RetroTableHead>Status</RetroTableHead>
              </RetroTableRow>
            </RetroTableHeader>
            <RetroTableBody>
              <RetroTableRow>
                <RetroTableCell>Button</RetroTableCell>
                <RetroTableCell>Input</RetroTableCell>
                <RetroTableCell>
                  <RetroBadge variant="azul">Ready</RetroBadge>
                </RetroTableCell>
              </RetroTableRow>
              <RetroTableRow>
                <RetroTableCell>Dialog</RetroTableCell>
                <RetroTableCell>Overlay</RetroTableCell>
                <RetroTableCell>
                  <RetroBadge variant="azul">Ready</RetroBadge>
                </RetroTableCell>
              </RetroTableRow>
              <RetroTableRow>
                <RetroTableCell>Sidebar</RetroTableCell>
                <RetroTableCell>Layout</RetroTableCell>
                <RetroTableCell>
                  <RetroBadge variant="azul">Ready</RetroBadge>
                </RetroTableCell>
              </RetroTableRow>
            </RetroTableBody>
          </RetroTable>
          <RetroSeparator />
          <div>
            <RetroLabel className="mb-[3px] block">
              Loading... {demoProgress}%
            </RetroLabel>
            <RetroProgress value={demoProgress} />
          </div>
          <div className="flex flex-wrap gap-[6px]">
            <RetroBadge>59 Components</RetroBadge>
            <RetroBadge variant="azul">Tailwind v4</RetroBadge>
            <RetroBadge variant="accent">Radix UI</RetroBadge>
          </div>
        </div>
      </RetroTabsContent>

      <RetroTabsContent value="feedback">
        <div className="flex flex-col gap-[8px]">
          <RetroAlert>
            <RetroAlertTitle>Note</RetroAlertTitle>
            <RetroAlertDescription>
              This is a default system message.
            </RetroAlertDescription>
          </RetroAlert>
          <RetroAlert variant="warning">
            <RetroAlertTitle>Warning</RetroAlertTitle>
            <RetroAlertDescription>
              You are about to experience extreme nostalgia.
            </RetroAlertDescription>
          </RetroAlert>
          <RetroAlert variant="destructive">
            <RetroAlertTitle>Error</RetroAlertTitle>
            <RetroAlertDescription>
              Sorry, a system error occurred. (just kidding)
            </RetroAlertDescription>
          </RetroAlert>
          <RetroSeparator />
          <div className="flex flex-wrap gap-[8px]">
            <RetroButton
              variant="primary"
              onClick={() =>
                toast({
                  title: "Hello!",
                  description: "This is a toast notification.",
                })
              }
            >
              Show Toast
            </RetroButton>
            <RetroButton variant="default" disabled>
              Disabled
            </RetroButton>
            <RetroButton variant="secondary">Secondary</RetroButton>
          </div>
          <div className="grid grid-cols-6 gap-[6px] pt-[4px] place-items-center">
            <RetroIcon name="folder" />
            <RetroIcon name="document" />
            <RetroIcon name="hard-drive" />
            <RetroIcon name="floppy" />
            <RetroIcon name="application" />
            <RetroIcon name="trash" />
            <RetroIcon name="search" />
            <RetroIcon name="preferences" />
            <RetroIcon name="printer" />
            <RetroIcon name="network" />
            <RetroIcon name="alert" />
            <RetroIcon name="info" />
          </div>
        </div>
      </RetroTabsContent>
    </RetroTabs>
  )
}

/* ------------------------------------------------------------------ */
/*  Menu bar (shared between desktop + mobile)                         */
/* ------------------------------------------------------------------ */

const MENU_TRIGGER_CLS =
  "bg-transparent border-none cursor-default select-none px-[4px] py-0 outline-none font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98] text-os9-black data-[state=open]:bg-os9-azul data-[state=open]:text-os9-white"

/* ------------------------------------------------------------------ */
/*  DesktopInner (needs toast context)                                 */
/* ------------------------------------------------------------------ */

function DesktopInner() {
  const { toast } = useRetroToast()
  const router = useRouter()

  const [booted, setBooted] = React.useState(false)
  const [bootProgress, setBootProgress] = React.useState(0)
  const [isDesktop, setIsDesktop] = React.useState(false)
  const [wins, setWins] = React.useState<Record<WindowId, WinState>>(() =>
    initLayout(1200, 800)
  )
  const zRef = React.useRef(10)
  const [aboutOpen, setAboutOpen] = React.useState(false)
  const [demoProgress, setDemoProgress] = React.useState(0)

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    setIsDesktop(mq.matches)
    const onMQ = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", onMQ)
    setWins(initLayout(window.innerWidth, window.innerHeight))

    if (sessionStorage.getItem("nostalgia-booted")) {
      setBooted(true)
      setBootProgress(100)
    } else {
      const bv = setInterval(() => {
        setBootProgress((p) => {
          if (p >= 100) {
            clearInterval(bv)
            sessionStorage.setItem("nostalgia-booted", "1")
            setTimeout(() => setBooted(true), 250)
            return 100
          }
          return p + 5
        })
      }, 50)
    }

    const dp = setInterval(() => {
      setDemoProgress((p) => (p >= 100 ? 0 : p + 2))
    }, 120)

    return () => {
      mq.removeEventListener("change", onMQ)
      clearInterval(dp)
    }
  }, [])

  /* ---- window management ---- */

  const focus = React.useCallback((id: WindowId) => {
    const z = ++zRef.current
    setWins((p) => ({ ...p, [id]: { ...p[id], z, visible: true } }))
  }, [])

  const close = React.useCallback((id: WindowId) => {
    setWins((p) => ({ ...p, [id]: { ...p[id], visible: false } }))
  }, [])

  const toggle = React.useCallback((id: WindowId) => {
    setWins((p) => {
      if (p[id].visible) return { ...p, [id]: { ...p[id], visible: false } }
      const z = ++zRef.current
      return { ...p, [id]: { ...p[id], visible: true, z } }
    })
  }, [])

  const collapseWin = React.useCallback((id: WindowId) => {
    setWins((p) => ({
      ...p,
      [id]: { ...p[id], collapsed: !p[id].collapsed },
    }))
  }, [])

  const showAll = React.useCallback(() => {
    zRef.current = 10
    setWins(initLayout(window.innerWidth, window.innerHeight))
  }, [])

  const copyCmd = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        "npx shadcn@latest add https://nostalgia-ui.com/r/retro-button.json"
      )
      toast({
        title: "Copied!",
        description: "Install command copied to clipboard.",
      })
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy the command manually.",
      })
    }
  }, [toast])

  /* ---- drag ---- */

  const dragRef = React.useRef<{
    id: WindowId | null
    startX: number
    startY: number
    posX: number
    posY: number
  }>({ id: null, startX: 0, startY: 0, posX: 0, posY: 0 })

  const onPtrDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>, id: WindowId) => {
      focus(id)
      const rect = e.currentTarget.getBoundingClientRect()
      if (e.clientY - rect.top > TITLE_BAR_H) return
      if ((e.target as HTMLElement).closest("button")) return
      dragRef.current = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        posX: parseFloat(e.currentTarget.style.left) || 0,
        posY: parseFloat(e.currentTarget.style.top) || 0,
      }
      e.currentTarget.setPointerCapture(e.pointerId)
      e.preventDefault()
    },
    [focus]
  )

  const onPtrMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const d = dragRef.current
      if (!d.id) return
      setWins((p) => ({
        ...p,
        [d.id!]: {
          ...p[d.id!],
          x: d.posX + (e.clientX - d.startX),
          y: d.posY + (e.clientY - d.startY),
        },
      }))
    },
    []
  )

  const onPtrUp = React.useCallback(() => {
    dragRef.current.id = null
  }, [])

  const activeId = React.useMemo(() => {
    let maxZ = -1
    let id: WindowId = "welcome"
    for (const [k, v] of Object.entries(wins)) {
      if (v.visible && v.z > maxZ) {
        maxZ = v.z
        id = k as WindowId
      }
    }
    return id
  }, [wins])

  const renderWindow = (
    id: WindowId,
    width: number,
    children: React.ReactNode
  ) => {
    const w = wins[id]
    if (!w.visible) return null
    return (
      <div
        key={id}
        style={{
          position: "absolute",
          left: w.x,
          top: w.y,
          zIndex: w.z,
          width,
          touchAction: "none",
        }}
        onPointerDown={(e) => onPtrDown(e, id)}
        onPointerMove={onPtrMove}
        onPointerUp={onPtrUp}
      >
        {children}
      </div>
    )
  }

  /* ---- menu bar (rendered in both layouts) ---- */

  const menuBar = (
    <div
      className="flex h-[28px] shrink-0 items-center px-[8px] bg-os9-gray-300 border-b border-os9-black"
      style={{
        boxShadow:
          "inset 0 1px 0 var(--os9-white), inset 0 -1px 0 var(--os9-gray-700)",
      }}
    >
      <Link href="/" className="flex shrink-0 items-center pr-[8px]" aria-label="Home">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="1" y="1" width="12" height="9" rx="0" fill="currentColor" />
          <rect x="2.5" y="2.5" width="9" height="6" rx="0" fill="var(--os9-gray-200)" />
          <rect x="5" y="10.5" width="4" height="1.5" rx="0" fill="currentColor" />
          <rect x="3.5" y="12" width="7" height="1" rx="0" fill="currentColor" />
        </svg>
      </Link>
      <div className="flex flex-1 items-center gap-[2px]">
        <RetroDropdownMenu>
          <RetroDropdownMenuTrigger className={MENU_TRIGGER_CLS}>
            <span className="font-bold">File</span>
          </RetroDropdownMenuTrigger>
          <RetroDropdownMenuContent align="start" sideOffset={2}>
            <RetroDropdownMenuItem asChild>
              <Link href="/components">Browse Components</Link>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuItem asChild>
              <a href="https://github.com/giorgioliapakis/nostalgia-ui" target="_blank" rel="noopener noreferrer">GitHub</a>
            </RetroDropdownMenuItem>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuItem onClick={showAll}>Show All Windows</RetroDropdownMenuItem>
          </RetroDropdownMenuContent>
        </RetroDropdownMenu>
        <RetroDropdownMenu>
          <RetroDropdownMenuTrigger className={MENU_TRIGGER_CLS}>Edit</RetroDropdownMenuTrigger>
          <RetroDropdownMenuContent align="start" sideOffset={2}>
            <RetroDropdownMenuItem onClick={copyCmd}>
              Copy Install Command
              <RetroDropdownMenuShortcut>&#8984;C</RetroDropdownMenuShortcut>
            </RetroDropdownMenuItem>
          </RetroDropdownMenuContent>
        </RetroDropdownMenu>
        <RetroDropdownMenu>
          <RetroDropdownMenuTrigger className={MENU_TRIGGER_CLS}>View</RetroDropdownMenuTrigger>
          <RetroDropdownMenuContent align="start" sideOffset={2}>
            <RetroDropdownMenuCheckboxItem checked={wins.welcome.visible} onCheckedChange={() => toggle("welcome")}>Welcome</RetroDropdownMenuCheckboxItem>
            <RetroDropdownMenuCheckboxItem checked={wins.install.visible} onCheckedChange={() => toggle("install")}>Install</RetroDropdownMenuCheckboxItem>
            <RetroDropdownMenuCheckboxItem checked={wins.sampler.visible} onCheckedChange={() => toggle("sampler")}>Component Sampler</RetroDropdownMenuCheckboxItem>
            <RetroDropdownMenuSeparator />
            <RetroDropdownMenuItem onClick={showAll}>Reset Layout</RetroDropdownMenuItem>
          </RetroDropdownMenuContent>
        </RetroDropdownMenu>
        <RetroDropdownMenu>
          <RetroDropdownMenuTrigger className={MENU_TRIGGER_CLS}>Help</RetroDropdownMenuTrigger>
          <RetroDropdownMenuContent align="start" sideOffset={2}>
            <RetroDropdownMenuItem onClick={() => setAboutOpen(true)}>About nostalgia-ui</RetroDropdownMenuItem>
          </RetroDropdownMenuContent>
        </RetroDropdownMenu>
      </div>
      <Clock />
    </div>
  )

  /* ---- status bar (desktop footer) ---- */

  const statusBar = (
    <div
      className="flex h-[18px] shrink-0 items-center justify-between px-[8px] bg-os9-gray-300 border-t border-os9-black"
      style={{
        boxShadow:
          "inset 0 1px 0 var(--os9-white), inset 0 -1px 0 var(--os9-gray-700)",
      }}
    >
      <p className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black">
        59 components &middot; 0 images &middot; pure CSS
      </p>
      <div className="flex items-center gap-[8px]">
        <a
          href="https://github.com/giorgioliapakis/nostalgia-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black underline hover:text-os9-azul"
        >
          GitHub
        </a>
        <RetroSeparator orientation="vertical" className="h-[10px]" />
        <span className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black">
          by Giorgio Liapakis
        </span>
      </div>
    </div>
  )

  /* ================================================================== */
  /*  RENDER                                                            */
  /* ================================================================== */

  return (
    <>
      {/* Boot Screen */}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-os9-gray-200"
        style={{
          opacity: booted ? 0 : 1,
          pointerEvents: booted ? "none" : "auto",
          transition: "opacity 0.35s ease-out",
        }}
      >
        <RetroWindow title="nostalgia-ui" active className="w-[300px]">
          <div className="flex flex-col items-center gap-[12px] py-[8px]">
            <RetroIcon name="application" />
            <p className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] text-os9-black">
              Starting up...
            </p>
            <RetroProgress value={bootProgress} className="w-full" />
            <p className="font-[family-name:var(--font-sans)] text-[9px] text-os9-gray-700">
              Loading 59 components...
            </p>
          </div>
        </RetroWindow>
      </div>

      {/* Shell */}
      <div
        className={
          isDesktop
            ? "flex h-screen w-screen flex-col overflow-hidden bg-os9-gray-200"
            : "flex min-h-screen w-screen flex-col bg-os9-gray-200"
        }
      >
        {menuBar}

        {isDesktop ? (
          /* ========================================================== */
          /*  DESKTOP                                                    */
          /* ========================================================== */
          <>
            <div
              className="relative flex-1 overflow-hidden bg-os9-gray-200"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--os9-gray-400) 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            >
              {/* Desktop Icons */}
              <div className="absolute top-[16px] right-[16px] flex flex-col gap-[8px] items-end z-[1]">
                <RetroDesktopIcon icon={<RetroIcon name="folder" />} label="Components" onDoubleClick={() => router.push("/components")} />
                <RetroDesktopIcon icon={<RetroIcon name="document" />} label="README" onDoubleClick={() => setAboutOpen(true)} />
                <RetroDesktopIcon icon={<RetroIcon name="hard-drive" />} label="nostalgia-ui" onDoubleClick={() => focus("welcome")} />
                <RetroDesktopIcon icon={<RetroIcon name="application" />} label="Install" onDoubleClick={() => focus("install")} />
                <RetroDesktopIcon icon={<RetroIcon name="trash" />} label="Trash" onDoubleClick={() => toast({ title: "Trash", description: "The Trash is empty." })} />
              </div>

              {/* Welcome Window */}
              {renderWindow(
                "welcome",
                420,
                <RetroWindow title="Welcome to nostalgia-ui" active={activeId === "welcome"} onClose={() => close("welcome")} onCollapse={() => collapseWin("welcome")} className="w-full">
                  {!wins.welcome.collapsed && (
                    <div className="flex flex-col gap-[12px]">
                      <h1 className="font-[family-name:var(--font-heading)] text-[14px] tracking-[0.42px] text-os9-black">nostalgia-ui</h1>
                      <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-black">
                        59 Mac OS 9 components for React. Built with Tailwind CSS and Radix UI. Zero image assets. Install via the shadcn CLI.
                      </p>
                      <div
                        className="flex items-center gap-[6px] p-[6px] font-mono text-[10px] text-os9-black cursor-pointer hover:bg-os9-lavender"
                        style={{ backgroundColor: "var(--os9-white)", border: "1px solid var(--os9-black)", boxShadow: "var(--os9-shadow-inset)" }}
                        onClick={copyCmd}
                        title="Click to copy"
                      >
                        <span className="text-os9-gray-600 select-none">$ </span>
                        <span className="truncate select-all">npx shadcn@latest add https://nostalgia-ui.com/r/retro-button.json</span>
                      </div>
                      <div className="flex flex-wrap gap-[8px] pt-[4px]">
                        <RetroButton variant="primary" asChild><Link href="/components">Browse Components</Link></RetroButton>
                        <RetroButton variant="default" asChild><a href="https://github.com/giorgioliapakis/nostalgia-ui" target="_blank" rel="noopener noreferrer">GitHub</a></RetroButton>
                      </div>
                    </div>
                  )}
                </RetroWindow>
              )}

              {/* Install Window */}
              {renderWindow(
                "install",
                400,
                <RetroWindow title="Terminal" active={activeId === "install"} onClose={() => close("install")} onCollapse={() => collapseWin("install")} className="w-full">
                  {!wins.install.collapsed && (
                    <div className="flex flex-col gap-[8px]">
                      <div className="p-[8px] font-mono text-[10px] text-os9-black leading-[1.6]" style={{ backgroundColor: "var(--os9-white)", border: "1px solid var(--os9-black)", boxShadow: "var(--os9-shadow-inset)" }}>
                        <div><span className="text-os9-gray-600 select-none">$ </span>npx shadcn@latest add \</div>
                        <div className="pl-[14px]">https://nostalgia-ui.com/r/retro-button.json</div>
                        <div className="mt-[6px] text-os9-gray-600">&#10003; Done. Component installed successfully.</div>
                      </div>
                      <div className="flex items-center gap-[8px]">
                        <RetroButton variant="primary" onClick={copyCmd}>Copy Command</RetroButton>
                        <RetroButton variant="default" asChild><Link href="/components">All Components</Link></RetroButton>
                      </div>
                      <p className="font-[family-name:var(--font-sans)] text-[9px] text-os9-gray-700">Works with your existing shadcn setup. Any of 59 components&mdash;one command each.</p>
                    </div>
                  )}
                </RetroWindow>
              )}

              {/* Component Sampler Window */}
              {renderWindow(
                "sampler",
                420,
                <RetroWindow title="Component Sampler" active={activeId === "sampler"} onClose={() => close("sampler")} onCollapse={() => collapseWin("sampler")} className="w-full">
                  {!wins.sampler.collapsed && (
                    <SamplerTabs demoProgress={demoProgress} toast={toast} />
                  )}
                </RetroWindow>
              )}
            </div>

            {statusBar}
          </>
        ) : (
          /* ========================================================== */
          /*  MOBILE                                                     */
          /* ========================================================== */
          <div className="flex-1 overflow-y-auto">
            {/* Hero */}
            <section
              className="px-[20px] pt-[36px] pb-[28px] text-center"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--os9-gray-400) 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            >
              <div className="mx-auto max-w-[380px]">
                <h1 className="font-[family-name:var(--font-heading)] text-[22px] tracking-[0.42px] text-os9-black mb-[8px]">
                  nostalgia-ui
                </h1>
                <p className="font-[family-name:var(--font-sans)] text-[13px] leading-[1.5] text-os9-black mb-[16px]">
                  59 Mac&nbsp;OS&nbsp;9 components for React. Built with
                  Tailwind&nbsp;CSS and Radix&nbsp;UI. Zero image assets.
                </p>
                <div
                  className="p-[8px] mb-[16px] font-mono text-[11px] text-os9-black text-left cursor-pointer active:bg-os9-lavender"
                  style={{ backgroundColor: "var(--os9-white)", border: "1px solid var(--os9-black)", boxShadow: "var(--os9-shadow-inset)" }}
                  onClick={copyCmd}
                >
                  <div><span className="text-os9-gray-600 select-none">$ </span>npx shadcn@latest add \</div>
                  <div className="pl-[14px] break-all">https://nostalgia-ui.com/r/retro-button.json</div>
                  <div className="mt-[4px] text-os9-gray-600 text-[9px]">Tap to copy</div>
                </div>
                <div className="flex justify-center gap-[8px]">
                  <RetroButton variant="primary" asChild><Link href="/components">Browse Components</Link></RetroButton>
                  <RetroButton variant="default" asChild><a href="https://github.com/giorgioliapakis/nostalgia-ui" target="_blank" rel="noopener noreferrer">GitHub</a></RetroButton>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="px-[16px] py-[20px]">
              <div className="grid grid-cols-2 gap-[8px] mx-auto max-w-[400px]">
                <RetroCard>
                  <RetroCardHeader><RetroCardTitle>Pure CSS</RetroCardTitle></RetroCardHeader>
                  <RetroCardContent><p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.4] text-os9-black">Zero image assets. Every bevel and shadow is CSS.</p></RetroCardContent>
                </RetroCard>
                <RetroCard>
                  <RetroCardHeader><RetroCardTitle>shadcn CLI</RetroCardTitle></RetroCardHeader>
                  <RetroCardContent><p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.4] text-os9-black">Drop-in install. Same API, same Radix primitives.</p></RetroCardContent>
                </RetroCard>
                <RetroCard>
                  <RetroCardHeader><RetroCardTitle>59 Components</RetroCardTitle></RetroCardHeader>
                  <RetroCardContent><p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.4] text-os9-black">Buttons, dialogs, tables, charts, sidebars, and more.</p></RetroCardContent>
                </RetroCard>
                <RetroCard>
                  <RetroCardHeader><RetroCardTitle>Accessible</RetroCardTitle></RetroCardHeader>
                  <RetroCardContent><p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.4] text-os9-black">Built on Radix UI. Keyboard and screen reader ready.</p></RetroCardContent>
                </RetroCard>
              </div>
            </section>

            {/* Component Demo */}
            <section className="px-[16px] pb-[20px]">
              <RetroWindow title="Component Sampler" active className="w-full mx-auto max-w-[400px]">
                <SamplerTabs demoProgress={demoProgress} toast={toast} />
              </RetroWindow>
            </section>

            {/* Tech Stack */}
            <section className="px-[16px] pb-[20px] text-center">
              <div className="flex flex-wrap gap-[6px] justify-center">
                <RetroBadge>Next.js 16</RetroBadge>
                <RetroBadge>Tailwind v4</RetroBadge>
                <RetroBadge>Radix UI</RetroBadge>
                <RetroBadge>TypeScript</RetroBadge>
                <RetroBadge>CVA</RetroBadge>
              </div>
            </section>

            {/* Mobile Footer */}
            <footer className="border-t border-os9-black">
              <div className="px-[16px] py-[12px]" style={{ backgroundColor: "var(--os9-gray-300)", boxShadow: "inset 0 1px 0 var(--os9-white)" }}>
                <div className="flex items-center justify-between">
                  <p className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black">Built with nostalgia-ui</p>
                  <div className="flex items-center gap-[8px]">
                    <a href="https://github.com/giorgioliapakis/nostalgia-ui" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black underline">GitHub</a>
                    <RetroSeparator orientation="vertical" className="h-[10px]" />
                    <p className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black">Giorgio Liapakis</p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )}
      </div>

      {/* About Dialog */}
      <RetroDialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <RetroDialogContent className="max-w-[320px]">
          <RetroDialogHeader>
            <RetroDialogTitle>About nostalgia-ui</RetroDialogTitle>
          </RetroDialogHeader>
          <div className="p-[12px] flex flex-col items-center gap-[12px]">
            <RetroIcon name="application" />
            <div className="text-center">
              <p className="font-[family-name:var(--font-heading)] text-[14px] tracking-[0.42px] text-os9-black">nostalgia-ui</p>
              <RetroDialogDescription className="mt-[4px]">Version 1.0 &mdash; 59 Components</RetroDialogDescription>
            </div>
            <p className="font-[family-name:var(--font-sans)] text-[10px] leading-[1.5] text-os9-black text-center">
              Mac OS 9 UI components for React. Built with Tailwind CSS, Radix UI, and zero image assets. shadcn-compatible.
            </p>
            <div className="flex flex-wrap gap-[4px] justify-center">
              <RetroBadge>Next.js 16</RetroBadge>
              <RetroBadge>Tailwind v4</RetroBadge>
              <RetroBadge>Radix UI</RetroBadge>
              <RetroBadge>TypeScript</RetroBadge>
            </div>
            <p className="font-[family-name:var(--font-sans)] text-[9px] text-os9-gray-700">A project by Giorgio Liapakis</p>
            <RetroButton variant="primary" onClick={() => setAboutOpen(false)}>OK</RetroButton>
          </div>
        </RetroDialogContent>
      </RetroDialog>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Page Export                                                         */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <RetroToastProvider>
      <DesktopInner />
    </RetroToastProvider>
  )
}
