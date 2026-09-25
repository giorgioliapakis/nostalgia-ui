"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroCheckbox } from "@/registry/new-york/ui/retro-checkbox"
import { RetroGroupBox } from "@/registry/new-york/ui/retro-group-box"
import {
  RetroIconApplication,
  RetroIconDocument,
  RetroIconFolder,
} from "@/registry/new-york/ui/retro-icons"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import { RetroNumberField } from "@/registry/new-york/ui/retro-little-arrows"
import {
  RetroSelect,
  RetroSelectContent,
  RetroSelectItem,
  RetroSelectSeparator,
  RetroSelectTrigger,
  RetroSelectValue,
} from "@/registry/new-york/ui/retro-select"
import { RetroSeparator } from "@/registry/new-york/ui/retro-separator"
import { RetroTextarea } from "@/registry/new-york/ui/retro-textarea"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type GetInfoPane = "general" | "sharing" | "memory"

type GetInfoLabel =
  | "none"
  | "essential"
  | "hot"
  | "in-progress"
  | "cool"
  | "personal"
  | "project-1"
  | "project-2"

type GetInfoPrivilege = "read-write" | "read-only" | "write-only" | "none"

interface GetInfoItem {
  name: string
  /** Kind line, e.g. "application program". */
  kind: string
  /** Picks the default icon. Defaults to "document". */
  type?: "document" | "application" | "folder"
  /** Custom 32px icon. */
  icon?: React.ReactNode
  /** Pre-formatted size, e.g. "668K on disk (681,229 bytes)". */
  size?: string
  /** Enclosing folder path, e.g. "Macintosh HD: Applications:". */
  where?: string
  /** Pre-formatted dates (pass strings to keep SSR and client identical). */
  created?: string
  modified?: string
  version?: string
  label?: GetInfoLabel
  comments?: string
  locked?: boolean
  /** Documents only. */
  stationery?: boolean
  /** Applications only: enables the Memory pane (values in K). */
  memory?: { suggested: number; minimum: number; preferred: number }
  sharing?: {
    shared: boolean
    owner: string
    everyone: GetInfoPrivilege
  }
}

interface GetInfoBlockProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RetroWindow>,
    "title" | "children" | "onChange"
  > {
  item: GetInfoItem
  /** Initially shown pane. Defaults to "general". */
  defaultPane?: GetInfoPane
  /** Fired with the edited item after every change. */
  onChange?: (item: GetInfoItem) => void
  /** Window title. Defaults to "<name> Info". */
  title?: string
  /** Users offered in the Sharing pane Owner pop-up. */
  users?: string[]
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

/** Finder label colours are user data, so they carry their own values. */
const LABELS: { id: GetInfoLabel; name: string; color?: string }[] = [
  { id: "none", name: "None" },
  { id: "essential", name: "Essential", color: "#ff6600" },
  { id: "hot", name: "Hot", color: "#dd0000" },
  { id: "in-progress", name: "In Progress", color: "#ff0099" },
  { id: "cool", name: "Cool", color: "#00aaff" },
  { id: "personal", name: "Personal", color: "#0000cc" },
  { id: "project-1", name: "Project 1", color: "#009900" },
  { id: "project-2", name: "Project 2", color: "#663300" },
]

const PRIVILEGES: { id: GetInfoPrivilege; name: string }[] = [
  { id: "read-write", name: "Read & Write" },
  { id: "read-only", name: "Read only" },
  { id: "write-only", name: "Write only (Drop Box)" },
  { id: "none", name: "None" },
]

const TEXT = "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] text-os9-black"

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

function InfoRow({
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
  const cls = "pt-[1px] text-right font-[family-name:var(--os9-font-sans)] text-[10px] font-bold text-os9-black"
  return (
    <>
      <dt className={cls}>
        {htmlFor || labelId ? (
          <RetroLabel htmlFor={htmlFor} id={labelId} className="font-bold">
            {label}
          </RetroLabel>
        ) : (
          label
        )}
      </dt>
      <dd className={cn(TEXT, "min-w-0 break-words")}>{children}</dd>
    </>
  )
}

function Swatch({ color }: { color?: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-[10px] shrink-0 border border-os9-black"
      style={{ background: color ?? "var(--os9-white)" }}
    />
  )
}

function defaultIcon(type: GetInfoItem["type"]) {
  if (type === "application") return <RetroIconApplication />
  if (type === "folder") return <RetroIconFolder />
  return <RetroIconDocument />
}

/* ------------------------------------------------------------------ */
/*  GetInfoBlock                                                       */
/* ------------------------------------------------------------------ */

const GetInfoBlock = React.forwardRef<HTMLDivElement, GetInfoBlockProps>(
  function GetInfoBlock(
    {
      item: itemProp,
      defaultPane = "general",
      onChange,
      title,
      users = ["Owner", "Guest", "Kids"],
      className,
      contentClassName,
      ...props
    },
    ref
  ) {
    const id = React.useId()
    const [item, setItem] = React.useState<GetInfoItem>(itemProp)
    const [prevItemProp, setPrevItemProp] = React.useState(itemProp)
    if (prevItemProp !== itemProp) {
      setPrevItemProp(itemProp)
      setItem(itemProp)
    }

    const hasMemory = !!item.memory
    const [pane, setPane] = React.useState<GetInfoPane>(
      defaultPane === "memory" && !itemProp.memory ? "general" : defaultPane
    )

    const update = (patch: Partial<GetInfoItem>) => {
      const next = { ...item, ...patch }
      setItem(next)
      onChange?.(next)
    }

    const sharing = item.sharing ?? { shared: false, owner: users[0] ?? "Owner", everyone: "read-only" as const }
    const isApp = item.type === "application"
    const locked = !!item.locked

    return (
      <RetroWindow
        ref={ref}
        title={title ?? `${itemProp.name} Info`}
        className={cn("w-full max-w-[340px]", className)}
        contentClassName={cn("flex flex-col gap-[10px] p-[12px]", contentClassName)}
        {...props}
      >
        {/* Icon + name */}
        <div className="flex items-center gap-3">
          <span className="flex size-[36px] shrink-0 items-center justify-center">
            {item.icon ?? defaultIcon(item.type)}
          </span>
          <RetroInput
            aria-label="Name"
            value={item.name}
            readOnly={locked}
            onChange={(e) => update({ name: e.target.value })}
            className="min-w-0 flex-1"
          />
        </div>

        {/* Show pop-up */}
        <div className="flex items-center gap-2">
          <RetroLabel size="lg" id={`${id}-show`} className="shrink-0">
            Show:
          </RetroLabel>
          <RetroSelect value={pane} onValueChange={(v) => setPane(v as GetInfoPane)}>
            <RetroSelectTrigger aria-labelledby={`${id}-show`} className="min-w-0 flex-1">
              <RetroSelectValue />
            </RetroSelectTrigger>
            <RetroSelectContent>
              <RetroSelectItem value="general">General Information</RetroSelectItem>
              <RetroSelectItem value="sharing">Sharing</RetroSelectItem>
              <RetroSelectItem value="memory" disabled={!hasMemory}>
                Memory
              </RetroSelectItem>
            </RetroSelectContent>
          </RetroSelect>
        </div>

        <RetroSeparator />

        {/* ---------------- General ---------------- */}
        {pane === "general" && (
          <>
            <dl className="grid grid-cols-[76px_minmax(0,1fr)] items-baseline gap-x-2 gap-y-[6px]">
              <InfoRow label="Kind:">{item.kind}</InfoRow>
              {item.size && <InfoRow label="Size:">{item.size}</InfoRow>}
              {item.where && <InfoRow label="Where:">{item.where}</InfoRow>}
              {item.created && <InfoRow label="Created:">{item.created}</InfoRow>}
              {item.modified && <InfoRow label="Modified:">{item.modified}</InfoRow>}
              {item.version && <InfoRow label="Version:">{item.version}</InfoRow>}
              <InfoRow label="Label:" labelId={`${id}-label`}>
                <RetroSelect
                  value={item.label ?? "none"}
                  onValueChange={(v) => update({ label: v as GetInfoLabel })}
                >
                  <RetroSelectTrigger aria-labelledby={`${id}-label`} className="w-[150px] max-w-full">
                    <RetroSelectValue />
                  </RetroSelectTrigger>
                  <RetroSelectContent>
                    {LABELS.map((l, i) => (
                      <React.Fragment key={l.id}>
                        <RetroSelectItem value={l.id}>
                          <span className="flex items-center gap-[6px]">
                            <Swatch color={l.color} />
                            {l.name}
                          </span>
                        </RetroSelectItem>
                        {i === 0 && <RetroSelectSeparator />}
                      </React.Fragment>
                    ))}
                  </RetroSelectContent>
                </RetroSelect>
              </InfoRow>
            </dl>

            <div className="flex flex-col gap-1">
              <RetroLabel htmlFor={`${id}-comments`} className="font-bold">
                Comments:
              </RetroLabel>
              <RetroTextarea
                id={`${id}-comments`}
                size="sm"
                value={item.comments ?? ""}
                onChange={(e) => update({ comments: e.target.value })}
                className="min-h-[64px] resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <RetroCheckbox
                  id={`${id}-locked`}
                  checked={locked}
                  onCheckedChange={(c) => update({ locked: c === true })}
                />
                <RetroLabel htmlFor={`${id}-locked`}>Locked</RetroLabel>
              </div>
              {!isApp && item.type !== "folder" && (
                <div className="flex items-center gap-2">
                  <RetroCheckbox
                    id={`${id}-stationery`}
                    checked={!!item.stationery}
                    onCheckedChange={(c) => update({ stationery: c === true })}
                  />
                  <RetroLabel htmlFor={`${id}-stationery`}>Stationery Pad</RetroLabel>
                </div>
              )}
            </div>
          </>
        )}

        {/* ---------------- Sharing ---------------- */}
        {pane === "sharing" && (
          <>
            <dl className="grid grid-cols-[76px_minmax(0,1fr)] items-baseline gap-x-2 gap-y-[6px]">
              <InfoRow label="Kind:">{item.kind}</InfoRow>
              {item.where && <InfoRow label="Where:">{item.where}</InfoRow>}
            </dl>
            <div className="flex items-center gap-2">
              <RetroCheckbox
                id={`${id}-shared`}
                checked={sharing.shared}
                onCheckedChange={(c) => update({ sharing: { ...sharing, shared: c === true } })}
              />
              <RetroLabel htmlFor={`${id}-shared`}>Share this item and its contents</RetroLabel>
            </div>
            <RetroGroupBox
              title="Privilege"
              contentClassName={cn("flex flex-col gap-2", !sharing.shared && "opacity-50")}
              aria-disabled={!sharing.shared || undefined}
            >
              <div className="grid grid-cols-[76px_minmax(0,1fr)] items-center gap-x-2 gap-y-2">
                <RetroLabel id={`${id}-owner`} className="text-right font-bold">
                  Owner:
                </RetroLabel>
                <RetroSelect
                  value={sharing.owner}
                  disabled={!sharing.shared}
                  onValueChange={(v) => update({ sharing: { ...sharing, owner: v } })}
                >
                  <RetroSelectTrigger aria-labelledby={`${id}-owner`} className="h-[20px]">
                    <RetroSelectValue />
                  </RetroSelectTrigger>
                  <RetroSelectContent>
                    {users.map((u) => (
                      <RetroSelectItem key={u} value={u}>
                        {u}
                      </RetroSelectItem>
                    ))}
                  </RetroSelectContent>
                </RetroSelect>
                <RetroLabel id={`${id}-everyone`} className="text-right font-bold">
                  Everyone:
                </RetroLabel>
                <RetroSelect
                  value={sharing.everyone}
                  disabled={!sharing.shared}
                  onValueChange={(v) =>
                    update({ sharing: { ...sharing, everyone: v as GetInfoPrivilege } })
                  }
                >
                  <RetroSelectTrigger aria-labelledby={`${id}-everyone`} className="h-[20px]">
                    <RetroSelectValue />
                  </RetroSelectTrigger>
                  <RetroSelectContent>
                    {PRIVILEGES.map((p) => (
                      <RetroSelectItem key={p.id} value={p.id}>
                        {p.name}
                      </RetroSelectItem>
                    ))}
                  </RetroSelectContent>
                </RetroSelect>
              </div>
            </RetroGroupBox>
          </>
        )}

        {/* ---------------- Memory ---------------- */}
        {pane === "memory" && item.memory && (
          <>
            <dl className="grid grid-cols-[76px_minmax(0,1fr)] items-baseline gap-x-2 gap-y-[6px]">
              <InfoRow label="Kind:">{item.kind}</InfoRow>
            </dl>
            <RetroGroupBox title="Memory Requirements" contentClassName="flex flex-col gap-2">
              <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-2 gap-y-2">
                <span className={cn(TEXT, "text-right")}>Suggested Size:</span>
                <span className={cn(TEXT, "w-[60px] pr-[18px] text-right tabular-nums")}>
                  {item.memory.suggested.toLocaleString("en-US")}
                </span>
                <span className={TEXT}>K</span>

                <RetroLabel htmlFor={`${id}-min`} className="text-right">
                  Minimum Size:
                </RetroLabel>
                <RetroNumberField
                  id={`${id}-min`}
                  size="sm"
                  min={128}
                  max={item.memory.preferred}
                  step={128}
                  disabled={locked}
                  value={item.memory.minimum}
                  onValueChange={(v) => update({ memory: { ...item.memory!, minimum: v } })}
                  inputClassName="w-[60px] text-right"
                />
                <span className={TEXT}>K</span>

                <RetroLabel htmlFor={`${id}-pref`} className="text-right">
                  Preferred Size:
                </RetroLabel>
                <RetroNumberField
                  id={`${id}-pref`}
                  size="sm"
                  min={item.memory.minimum}
                  max={999_999}
                  step={128}
                  disabled={locked}
                  value={item.memory.preferred}
                  onValueChange={(v) => update({ memory: { ...item.memory!, preferred: v } })}
                  inputClassName="w-[60px] text-right"
                />
                <span className={TEXT}>K</span>
              </div>
            </RetroGroupBox>
            <p className={cn(TEXT, "text-os9-gray-800")}>
              Note: This program may require more memory if virtual memory is
              turned off in the Memory control panel.
            </p>
          </>
        )}
      </RetroWindow>
    )
  }
)
GetInfoBlock.displayName = "GetInfoBlock"

export { GetInfoBlock }
export type { GetInfoBlockProps, GetInfoItem, GetInfoLabel, GetInfoPane, GetInfoPrivilege }
