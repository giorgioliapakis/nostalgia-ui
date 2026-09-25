"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroCheckbox } from "@/registry/new-york/ui/retro-checkbox"
import { RetroGroupBox } from "@/registry/new-york/ui/retro-group-box"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import { RetroNumberField } from "@/registry/new-york/ui/retro-little-arrows"
import { RetroListBox, RetroListBoxItem } from "@/registry/new-york/ui/retro-list-box"
import { RetroRadioGroup, RetroRadioGroupItem } from "@/registry/new-york/ui/retro-radio"
import {
  RetroSelect,
  RetroSelectContent,
  RetroSelectItem,
  RetroSelectTrigger,
  RetroSelectValue,
} from "@/registry/new-york/ui/retro-select"
import { RetroSlider } from "@/registry/new-york/ui/retro-slider"
import {
  RetroTabs,
  RetroTabsContent,
  RetroTabsList,
  RetroTabsTrigger,
} from "@/registry/new-york/ui/retro-tabs"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type ControlPanelTab = "themes" | "appearance" | "fonts" | "desktop" | "sound" | "options"

const TABS: { value: ControlPanelTab; label: string }[] = [
  { value: "themes", label: "Themes" },
  { value: "appearance", label: "Appearance" },
  { value: "fonts", label: "Fonts" },
  { value: "desktop", label: "Desktop" },
  { value: "sound", label: "Sound" },
  { value: "options", label: "Options" },
]

/** Highlight colours are user content, so they carry their own values. */
const HIGHLIGHT_COLORS = [
  { id: "lavender", name: "Lavender", color: "var(--os9-lavender)" },
  { id: "blue", name: "Blue", color: "#99ccff" },
  { id: "gold", name: "Gold", color: "#ffcc66" },
  { id: "graphite", name: "Graphite", color: "var(--os9-gray-400)" },
  { id: "green", name: "Green", color: "#99ee99" },
  { id: "purple", name: "Purple", color: "#cc99ff" },
  { id: "red", name: "Red", color: "#ff9999" },
  { id: "silver", name: "Silver", color: "var(--os9-gray-300)" },
] as const

const DESKTOP_PATTERNS = [
  {
    id: "mac-os-default",
    name: "Mac OS Default",
    style: {
      backgroundColor: "var(--os9-gray-400)",
      backgroundImage: "radial-gradient(var(--os9-gray-700) 0.8px, transparent 0.8px)",
      backgroundSize: "4px 4px",
    },
  },
  {
    id: "azul-dots",
    name: "Azul Dots",
    style: {
      backgroundColor: "var(--os9-azul)",
      backgroundImage: "radial-gradient(var(--os9-focus) 1px, transparent 1px)",
      backgroundSize: "6px 6px",
    },
  },
  {
    id: "lavender-stripes",
    name: "Lavender Stripes",
    style: {
      backgroundColor: "var(--os9-lavender)",
      backgroundImage:
        "repeating-linear-gradient(90deg, transparent 0 3px, var(--os9-white) 3px 4px)",
    },
  },
  {
    id: "platinum-grid",
    name: "Platinum Grid",
    style: {
      backgroundColor: "var(--os9-gray-300)",
      backgroundImage:
        "linear-gradient(var(--os9-gray-500) 1px, transparent 1px), linear-gradient(90deg, var(--os9-gray-500) 1px, transparent 1px)",
      backgroundSize: "8px 8px",
    },
  },
  {
    id: "checkerboard",
    name: "Checkerboard",
    style: {
      backgroundColor: "var(--os9-gray-200)",
      backgroundImage:
        "conic-gradient(var(--os9-gray-600) 25%, transparent 0 50%, var(--os9-gray-600) 0 75%, transparent 0)",
      backgroundSize: "4px 4px",
    },
  },
  {
    id: "solid-gray",
    name: "Solid Gray",
    style: { backgroundColor: "var(--os9-gray-600)" },
  },
] as const satisfies readonly { id: string; name: string; style: React.CSSProperties }[]

const THEMES = [
  { id: "mac-os-default", name: "Mac OS Default", highlight: "lavender", pattern: "mac-os-default" },
  { id: "hicontrast", name: "Mac OS HiContrast", highlight: "silver", pattern: "solid-gray" },
  { id: "drawing-board", name: "Drawing Board", highlight: "gold", pattern: "platinum-grid" },
  { id: "gizmo", name: "Gizmo", highlight: "purple", pattern: "azul-dots" },
  { id: "sensible", name: "Sensible", highlight: "green", pattern: "lavender-stripes" },
  { id: "cafe", name: "Cafe", highlight: "red", pattern: "checkerboard" },
] as const

const LARGE_FONTS = ["Charcoal", "Chicago", "Gadget", "Sand", "Techno", "Textile"]
const SMALL_FONTS = ["Geneva", "Helvetica", "Monaco"]

/* ------------------------------------------------------------------ */
/*  Settings                                                           */
/* ------------------------------------------------------------------ */

interface ControlPanelSettings {
  theme: string
  appearance: string
  highlightColor: string
  variation: string
  largeFont: string
  smallFont: string
  viewsFont: string
  viewsFontSize: number
  smoothFonts: boolean
  smoothFontsMinSize: number
  desktopPattern: string
  soundTrack: string
  sounds: { menus: boolean; windows: boolean; controls: boolean; finder: boolean }
  volume: number
  smartScrolling: boolean
  collapseOnDoubleClick: boolean
  scrollArrows: "together" | "both"
  menuBlinks: number
}

const DEFAULT_SETTINGS: ControlPanelSettings = {
  theme: "mac-os-default",
  appearance: "platinum",
  highlightColor: "lavender",
  variation: "blue",
  largeFont: "Charcoal",
  smallFont: "Geneva",
  viewsFont: "Geneva",
  viewsFontSize: 10,
  smoothFonts: true,
  smoothFontsMinSize: 12,
  desktopPattern: "mac-os-default",
  soundTrack: "platinum",
  sounds: { menus: true, windows: true, controls: true, finder: false },
  volume: 60,
  smartScrolling: true,
  collapseOnDoubleClick: true,
  scrollArrows: "together",
  menuBlinks: 1,
}

interface ControlPanelBlockProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RetroWindow>,
    "title" | "children" | "onChange" | "defaultValue"
  > {
  /** Initially selected tab. Defaults to "themes". */
  defaultTab?: ControlPanelTab
  /** Initial settings (merged over the Mac OS defaults). */
  defaultSettings?: Partial<ControlPanelSettings>
  /** Fired with the full settings object after every change. */
  onChange?: (settings: ControlPanelSettings) => void
  /** Window title. Defaults to "Appearance". */
  title?: string
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

const TEXT = "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] text-os9-black"

/** Label column + control column; stacks on narrow widths. */
function Row({
  label,
  htmlFor,
  labelId,
  children,
}: {
  label: string
  htmlFor?: string
  labelId?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[140px_minmax(0,1fr)] items-center gap-x-2 max-[480px]:grid-cols-1 max-[480px]:gap-y-1">
      <RetroLabel
        size="lg"
        htmlFor={htmlFor}
        id={labelId}
        className="text-right max-[480px]:text-left"
      >
        {label}
      </RetroLabel>
      <div className="flex min-w-0 items-center gap-2">{children}</div>
    </div>
  )
}

function PopUp({
  value,
  onValueChange,
  labelledBy,
  className,
  children,
}: {
  value: string
  onValueChange: (value: string) => void
  labelledBy: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <RetroSelect value={value} onValueChange={onValueChange}>
      <RetroSelectTrigger aria-labelledby={labelledBy} className={cn("w-[200px] max-w-full", className)}>
        <RetroSelectValue />
      </RetroSelectTrigger>
      <RetroSelectContent>{children}</RetroSelectContent>
    </RetroSelect>
  )
}

function CheckRow({
  id,
  checked,
  onCheckedChange,
  children,
}: {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      <RetroCheckbox id={id} checked={checked} onCheckedChange={(c) => onCheckedChange(c === true)} />
      <RetroLabel htmlFor={id} className="text-[10px]">
        {children}
      </RetroLabel>
    </div>
  )
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-[10px] shrink-0 border border-os9-black align-[-1px]"
      style={{ background: color }}
    />
  )
}

function patternStyle(id: string): React.CSSProperties {
  return (DESKTOP_PATTERNS.find((p) => p.id === id) ?? DESKTOP_PATTERNS[0]).style
}

function highlightValue(id: string) {
  return (HIGHLIGHT_COLORS.find((c) => c.id === id) ?? HIGHLIGHT_COLORS[0]).color
}

/** Tiny desktop-with-window preview used by theme tiles. */
function ThemePreview({ pattern, highlight }: { pattern: string; highlight: string }) {
  return (
    <span
      aria-hidden="true"
      className="relative block h-[48px] w-[72px] border border-os9-black"
      style={patternStyle(pattern)}
    >
      <span className="absolute inset-x-0 top-0 h-[5px] border-b border-os9-black bg-os9-gray-300" />
      <span className="absolute left-[10px] top-[12px] h-[28px] w-[44px] border border-os9-black bg-os9-white shadow-[1px_1px_0_var(--os9-black)]">
        <span className="os9-stripes block h-[5px] border-b border-os9-black" />
        <span className="mx-[4px] mt-[4px] block h-[4px]" style={{ background: highlightValue(highlight) }} />
        <span className="mx-[4px] mt-[3px] block h-px bg-os9-gray-600" />
        <span className="mx-[4px] mt-[3px] block h-px w-[20px] bg-os9-gray-600" />
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  ControlPanelBlock                                                  */
/* ------------------------------------------------------------------ */

const ControlPanelBlock = React.forwardRef<HTMLDivElement, ControlPanelBlockProps>(
  function ControlPanelBlock(
    {
      defaultTab = "themes",
      defaultSettings,
      onChange,
      title = "Appearance",
      className,
      contentClassName,
      ...props
    },
    ref
  ) {
    const id = React.useId()
    const [tab, setTab] = React.useState<ControlPanelTab>(defaultTab)
    const [settings, setSettings] = React.useState<ControlPanelSettings>(() => ({
      ...DEFAULT_SETTINGS,
      ...defaultSettings,
    }))

    const update = (patch: Partial<ControlPanelSettings>) => {
      const next = { ...settings, ...patch }
      setSettings(next)
      onChange?.(next)
    }
    const s = settings

    return (
      <RetroWindow
        ref={ref}
        title={title}
        className={cn("w-full max-w-[560px]", className)}
        contentClassName={cn("p-[12px] max-[480px]:p-[6px]", contentClassName)}
        {...props}
      >
        <RetroTabs value={tab} onValueChange={(v) => setTab(v as ControlPanelTab)}>
          <RetroTabsList className="overflow-x-auto overflow-y-hidden pt-[3px] [scrollbar-width:none]">
            {TABS.map((t) => (
              <RetroTabsTrigger key={t.value} value={t.value} className="shrink-0 max-[480px]:px-[8px]">
                {t.label}
              </RetroTabsTrigger>
            ))}
          </RetroTabsList>

          {/* ---------------- Themes ---------------- */}
          <RetroTabsContent value="themes" className="flex min-h-[300px] flex-col gap-3">
            <p className={TEXT}>
              Click a theme to change the appearance of your computer. A theme
              sets the highlight colour, desktop pattern, fonts and sounds.
            </p>
            <RetroListBox
              aria-label="Themes"
              value={s.theme}
              onValueChange={(v) => {
                const theme = THEMES.find((t) => t.id === v)
                if (!theme) return
                update({ theme: theme.id, highlightColor: theme.highlight, desktopPattern: theme.pattern })
              }}
              className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-[6px] overflow-y-auto p-[6px] max-h-[220px]"
            >
              {THEMES.map((t) => (
                <RetroListBoxItem
                  key={t.id}
                  value={t.id}
                  textValue={t.name}
                  className="group/theme h-auto flex-col gap-[4px] whitespace-normal bg-transparent p-[4px] data-[selected]:bg-transparent data-[selected]:text-os9-black"
                >
                  <span className="p-[2px] group-data-[selected]/theme:bg-os9-azul">
                    <ThemePreview pattern={t.pattern} highlight={t.highlight} />
                  </span>
                  <span className="px-[2px] text-center leading-[1.3] group-data-[selected]/theme:bg-os9-azul group-data-[selected]/theme:text-os9-white">
                    {t.name}
                  </span>
                </RetroListBoxItem>
              ))}
            </RetroListBox>
          </RetroTabsContent>

          {/* ---------------- Appearance ---------------- */}
          <RetroTabsContent value="appearance" className="flex min-h-[300px] flex-col gap-3">
            <RetroGroupBox title="Appearance" contentClassName="flex flex-col gap-2">
              <Row label="Appearance:" labelId={`${id}-appearance`}>
                <PopUp value={s.appearance} onValueChange={(v) => update({ appearance: v })} labelledBy={`${id}-appearance`}>
                  <RetroSelectItem value="platinum">Apple Platinum</RetroSelectItem>
                </PopUp>
              </Row>
            </RetroGroupBox>

            <RetroGroupBox title="Colors" contentClassName="flex flex-col gap-2">
              <Row label="Highlight Color:" labelId={`${id}-highlight`}>
                <RetroSelect value={s.highlightColor} onValueChange={(v) => update({ highlightColor: v })}>
                  <RetroSelectTrigger aria-labelledby={`${id}-highlight`} className="w-[200px] max-w-full">
                    <RetroSelectValue />
                  </RetroSelectTrigger>
                  <RetroSelectContent>
                    {HIGHLIGHT_COLORS.map((c) => (
                      <RetroSelectItem key={c.id} value={c.id}>
                        <span className="flex items-center gap-[6px]">
                          <Swatch color={c.color} />
                          {c.name}
                        </span>
                      </RetroSelectItem>
                    ))}
                  </RetroSelectContent>
                </RetroSelect>
              </Row>
              <Row label="Variation:" labelId={`${id}-variation`}>
                <PopUp value={s.variation} onValueChange={(v) => update({ variation: v })} labelledBy={`${id}-variation`}>
                  <RetroSelectItem value="blue">Blue</RetroSelectItem>
                  <RetroSelectItem value="graphite">Graphite</RetroSelectItem>
                </PopUp>
              </Row>
              <Row label="Sample:">
                <p className={cn(TEXT, "truncate")}>
                  Some{" "}
                  <span className="px-[1px]" style={{ background: highlightValue(s.highlightColor) }}>
                    selected text
                  </span>{" "}
                  in a document.
                </p>
              </Row>
            </RetroGroupBox>
          </RetroTabsContent>

          {/* ---------------- Fonts ---------------- */}
          <RetroTabsContent value="fonts" className="flex min-h-[300px] flex-col gap-3">
            <RetroGroupBox title="System Fonts" contentClassName="flex flex-col gap-2">
              <Row label="Large System Font:" labelId={`${id}-large`}>
                <PopUp value={s.largeFont} onValueChange={(v) => update({ largeFont: v })} labelledBy={`${id}-large`}>
                  {LARGE_FONTS.map((f) => (
                    <RetroSelectItem key={f} value={f}>{f}</RetroSelectItem>
                  ))}
                </PopUp>
              </Row>
              <Row label="Small System Font:" labelId={`${id}-small`}>
                <PopUp value={s.smallFont} onValueChange={(v) => update({ smallFont: v })} labelledBy={`${id}-small`}>
                  {SMALL_FONTS.map((f) => (
                    <RetroSelectItem key={f} value={f}>{f}</RetroSelectItem>
                  ))}
                </PopUp>
              </Row>
              <Row label="Views Font:" labelId={`${id}-views`}>
                <PopUp
                  value={s.viewsFont}
                  onValueChange={(v) => update({ viewsFont: v })}
                  labelledBy={`${id}-views`}
                  className="w-[130px]"
                >
                  {SMALL_FONTS.map((f) => (
                    <RetroSelectItem key={f} value={f}>{f}</RetroSelectItem>
                  ))}
                </PopUp>
                <RetroLabel htmlFor={`${id}-views-size`} className="shrink-0">Size:</RetroLabel>
                <RetroNumberField
                  id={`${id}-views-size`}
                  size="sm"
                  min={9}
                  max={24}
                  value={s.viewsFontSize}
                  onValueChange={(v) => update({ viewsFontSize: v })}
                  inputClassName="w-[36px]"
                />
              </Row>
            </RetroGroupBox>

            <RetroGroupBox
              title={
                <CheckRow
                  id={`${id}-smooth`}
                  checked={s.smoothFonts}
                  onCheckedChange={(c) => update({ smoothFonts: c })}
                >
                  <span className="font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px]">
                    Smooth all fonts on screen
                  </span>
                </CheckRow>
              }
              contentClassName="flex flex-col gap-2"
            >
              <div className={cn("flex flex-wrap items-center gap-2", !s.smoothFonts && "opacity-50")}>
                <RetroLabel htmlFor={`${id}-smooth-size`}>Smooth fonts at sizes</RetroLabel>
                <RetroNumberField
                  id={`${id}-smooth-size`}
                  size="sm"
                  min={9}
                  max={24}
                  disabled={!s.smoothFonts}
                  value={s.smoothFontsMinSize}
                  onValueChange={(v) => update({ smoothFontsMinSize: v })}
                  inputClassName="w-[36px]"
                />
                <span className={TEXT}>and above</span>
              </div>
            </RetroGroupBox>
          </RetroTabsContent>

          {/* ---------------- Desktop ---------------- */}
          <RetroTabsContent value="desktop" className="flex min-h-[300px] flex-wrap gap-4">
            <div className="flex flex-col items-center gap-2">
              {/* Monitor preview */}
              <div className="border border-os9-black bg-os9-gray-300 p-[6px] pb-[14px] shadow-[var(--os9-shadow-raised)]">
                <div
                  aria-label="Desktop preview"
                  role="img"
                  className="h-[96px] w-[128px] border border-os9-black"
                  style={patternStyle(s.desktopPattern)}
                />
              </div>
              <p className={cn(TEXT, "text-center")}>
                {DESKTOP_PATTERNS.find((p) => p.id === s.desktopPattern)?.name}
              </p>
            </div>
            <div className="flex min-w-[180px] flex-1 flex-col gap-2">
              <RetroLabel size="lg" id={`${id}-patterns`}>Patterns</RetroLabel>
              <RetroListBox
                aria-labelledby={`${id}-patterns`}
                value={s.desktopPattern}
                onValueChange={(v) => v && update({ desktopPattern: v })}
                className="h-[140px]"
              >
                {DESKTOP_PATTERNS.map((p) => (
                  <RetroListBoxItem key={p.id} value={p.id}>
                    <span aria-hidden="true" className="size-[10px] shrink-0 border border-os9-black" style={p.style} />
                    {p.name}
                  </RetroListBoxItem>
                ))}
              </RetroListBox>
              <div className="flex flex-wrap gap-2">
                <RetroButton size="sm" type="button" disabled>Place Picture…</RetroButton>
                <RetroButton size="sm" type="button" disabled>Remove Picture</RetroButton>
              </div>
            </div>
          </RetroTabsContent>

          {/* ---------------- Sound ---------------- */}
          <RetroTabsContent value="sound" className="flex min-h-[300px] flex-col gap-3">
            <Row label="Sound track:" labelId={`${id}-track`}>
              <PopUp value={s.soundTrack} onValueChange={(v) => update({ soundTrack: v })} labelledBy={`${id}-track`}>
                <RetroSelectItem value="platinum">Platinum Sounds</RetroSelectItem>
                <RetroSelectItem value="none">None</RetroSelectItem>
              </PopUp>
            </Row>
            <RetroGroupBox title="Play sounds for:" contentClassName="grid grid-cols-2 gap-2 max-[420px]:grid-cols-1">
              {(
                [
                  ["menus", "Menus"],
                  ["windows", "Windows"],
                  ["controls", "Controls"],
                  ["finder", "Finder"],
                ] as const
              ).map(([key, label]) => (
                <CheckRow
                  key={key}
                  id={`${id}-sound-${key}`}
                  checked={s.sounds[key] && s.soundTrack !== "none"}
                  onCheckedChange={(c) => update({ sounds: { ...s.sounds, [key]: c } })}
                >
                  {label}
                </CheckRow>
              ))}
            </RetroGroupBox>
            <RetroGroupBox title="Volume" contentClassName="flex items-center gap-3">
              <span className={TEXT} aria-hidden="true">Quiet</span>
              <RetroSlider
                aria-label="Volume"
                min={0}
                max={100}
                step={1}
                value={[s.volume]}
                onValueChange={([v]) => update({ volume: v })}
                className="flex-1"
              />
              <span className={TEXT} aria-hidden="true">Loud</span>
            </RetroGroupBox>
          </RetroTabsContent>

          {/* ---------------- Options ---------------- */}
          <RetroTabsContent value="options" className="flex min-h-[300px] flex-col gap-3">
            <RetroGroupBox title="Scrolling" contentClassName="flex flex-col gap-2">
              <CheckRow
                id={`${id}-smart`}
                checked={s.smartScrolling}
                onCheckedChange={(c) => update({ smartScrolling: c })}
              >
                Smart Scrolling (proportional scroll boxes)
              </CheckRow>
              <p className={cn(TEXT, "mt-1")} id={`${id}-arrows`}>Scroll arrows:</p>
              <RetroRadioGroup
                aria-labelledby={`${id}-arrows`}
                value={s.scrollArrows}
                onValueChange={(v) => update({ scrollArrows: v as ControlPanelSettings["scrollArrows"] })}
                className="gap-1.5 pl-3"
              >
                <div className="flex items-center gap-2">
                  <RetroRadioGroupItem id={`${id}-arrows-together`} value="together" />
                  <RetroLabel htmlFor={`${id}-arrows-together`}>Together</RetroLabel>
                </div>
                <div className="flex items-center gap-2">
                  <RetroRadioGroupItem id={`${id}-arrows-both`} value="both" />
                  <RetroLabel htmlFor={`${id}-arrows-both`}>At top and bottom</RetroLabel>
                </div>
              </RetroRadioGroup>
            </RetroGroupBox>
            <RetroGroupBox title="Windows & Menus" contentClassName="flex flex-col gap-2">
              <CheckRow
                id={`${id}-collapse`}
                checked={s.collapseOnDoubleClick}
                onCheckedChange={(c) => update({ collapseOnDoubleClick: c })}
              >
                Double-click title bar to collapse windows
              </CheckRow>
              <div className="flex items-center gap-2">
                <RetroLabel htmlFor={`${id}-blinks`}>Menu blinking:</RetroLabel>
                <RetroNumberField
                  id={`${id}-blinks`}
                  size="sm"
                  min={0}
                  max={3}
                  value={s.menuBlinks}
                  onValueChange={(v) => update({ menuBlinks: v })}
                  formatValue={(v) => (v === 0 ? "Off" : String(v))}
                  inputClassName="w-[36px]"
                />
                <span className={TEXT}>{s.menuBlinks === 1 ? "time" : "times"}</span>
              </div>
            </RetroGroupBox>
          </RetroTabsContent>
        </RetroTabs>
      </RetroWindow>
    )
  }
)
ControlPanelBlock.displayName = "ControlPanelBlock"

export { ControlPanelBlock, DEFAULT_SETTINGS as CONTROL_PANEL_DEFAULT_SETTINGS }
export type { ControlPanelBlockProps, ControlPanelSettings, ControlPanelTab }
