"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import {
  RetroIconAlert,
  RetroIconHappyMac,
  RetroIconHardDrive,
} from "@/registry/new-york/ui/retro-icons"
import { RetroListBox, RetroListBoxItem } from "@/registry/new-york/ui/retro-list-box"
import { RetroProgress } from "@/registry/new-york/ui/retro-progress"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type InstallerStep = "welcome" | "readme" | "license" | "destination" | "install" | "done"

interface InstallerDisk {
  id: string
  name: string
  /** Free space in MB. */
  availableMB: number
  /** Capacity in MB (shown as info only). */
  capacityMB?: number
}

type InstallerFinishAction = "quit" | "restart"

interface InstallerBlockProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RetroWindow>, "title" | "children"> {
  /** Product being installed. Defaults to "Mac OS 9.2.2". */
  productName?: string
  /** Quit or Restart on the final screen. */
  onFinish?: (action: InstallerFinishAction) => void
  /** Called with the chosen disk when installation starts. */
  onInstall?: (disk: InstallerDisk) => void
  /** Called when the license is declined. */
  onDisagree?: () => void
  /** Destination disks. Defaults to two sample volumes. */
  disks?: InstallerDisk[]
  /** Space the install needs, in MB. Defaults to 350. */
  requiredMB?: number
  /** Override the welcome text. */
  welcome?: React.ReactNode
  /** Override the Read Me text. */
  readMe?: React.ReactNode
  /** Override the license text. */
  license?: React.ReactNode
  /** Simulated install length in ms. Defaults to 6000. */
  installDuration?: number
  /** Initial step (handy for docs and tests). Defaults to "welcome". */
  defaultStep?: InstallerStep
  /** Window title. Defaults to "Install <productName>". */
  title?: string
}

/* ------------------------------------------------------------------ */
/*  Defaults                                                           */
/* ------------------------------------------------------------------ */

const STEPS: { id: InstallerStep; label: string }[] = [
  { id: "welcome", label: "Welcome" },
  { id: "readme", label: "Important Information" },
  { id: "license", label: "Software License" },
  { id: "destination", label: "Select Destination" },
  { id: "install", label: "Install Software" },
  { id: "done", label: "Finish Up" },
]

const DEFAULT_DISKS: InstallerDisk[] = [
  { id: "hd", name: "Macintosh HD", availableMB: 1228, capacityMB: 6144 },
  { id: "scratch", name: "Scratch", availableMB: 212, capacityMB: 2048 },
]

const INSTALL_PHASES = [
  "Preparing to install…",
  "System software",
  "Extensions",
  "Control Panels",
  "Fonts",
  "Apple Menu Items",
  "Updating disk driver",
  "Cleaning up…",
]

const TEXT = "font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.5] text-os9-black"

function formatMB(mb: number) {
  return mb >= 1024 ? `${(mb / 1024).toFixed(1).replace(/\.0$/, "")} GB` : `${mb} MB`
}

function defaultReadMe(product: string) {
  return (
    <>
      <p className="font-bold">Before You Install {product}</p>
      <p className="mt-2">
        Back up any important files before you install. The Installer updates
        your System Folder in place and keeps your documents, preferences and
        third-party extensions.
      </p>
      <p className="mt-2 font-bold">System Requirements</p>
      <ul className="mt-1 list-disc pl-4">
        <li>A PowerPC processor</li>
        <li>At least 64 MB of physical RAM, with virtual memory set to 40 MB</li>
        <li>About 350 MB of free disk space</li>
      </ul>
      <p className="mt-2 font-bold">Known Issues</p>
      <p className="mt-1">
        Some older extensions may not load. If your computer freezes at
        startup, hold down the Shift key to start up with extensions off,
        then remove the extension in question from the Extensions folder.
      </p>
      <p className="mt-2">
        For late-breaking news, see the &ldquo;About {product}&rdquo; document
        that is installed on your hard disk.
      </p>
    </>
  )
}

function defaultLicense(product: string) {
  return (
    <>
      <p className="font-bold">SOFTWARE LICENSE AGREEMENT FOR {product.toUpperCase()}</p>
      <p className="mt-2">
        PLEASE READ THIS SOFTWARE LICENSE AGREEMENT (&ldquo;LICENSE&rdquo;)
        CAREFULLY BEFORE USING THE SOFTWARE. BY USING THE SOFTWARE, YOU ARE
        AGREEING TO BE BOUND BY THE TERMS OF THIS LICENSE. IF YOU DO NOT AGREE
        TO THE TERMS OF THIS LICENSE, CLICK &ldquo;DISAGREE&rdquo;.
      </p>
      <p className="mt-2">
        1. General. The software and documentation accompanying this License,
        whether on disk, in read only memory, on any other media or in any
        other form, are licensed, not sold, to you for use only under the
        terms of this License.
      </p>
      <p className="mt-2">
        2. Permitted Uses and Restrictions. This License allows you to install
        and use one copy of the software on a single computer at a time. You
        may make one copy of the software in machine-readable form for backup
        purposes only.
      </p>
      <p className="mt-2">
        3. Termination. This License is effective until terminated. Your
        rights under this License will terminate automatically without notice
        if you fail to comply with any term of this License.
      </p>
      <p className="mt-2">
        4. Limited Warranty on Media. The media on which the software is
        recorded is warranted to be free from defects in materials and
        workmanship under normal use for a period of ninety (90) days from
        the date of original retail purchase.
      </p>
      <p className="mt-2">
        5. Disclaimer of Warranties. The software is provided &ldquo;AS
        IS&rdquo; and without warranty of any kind, express or implied.
      </p>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Step indicator                                                     */
/* ------------------------------------------------------------------ */

function StepList({ current }: { current: number }) {
  return (
    <ol
      aria-label="Installation steps"
      className="flex w-[150px] shrink-0 flex-col gap-[6px] border-r border-os9-gray-600 py-[4px] pr-[10px] shadow-[1px_0_0_var(--os9-white)] @max-[520px]:hidden"
    >
      {STEPS.map((s, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo"
        return (
          <li
            key={s.id}
            aria-current={state === "current" ? "step" : undefined}
            className={cn(
              "flex items-center gap-[6px] font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.3]",
              state === "current" && "font-bold text-os9-black",
              state === "done" && "text-os9-black",
              state === "todo" && "text-os9-gray-700"
            )}
          >
            <span aria-hidden="true" className="flex size-[10px] shrink-0 items-center justify-center">
              {state === "current" ? (
                <svg width="6" height="9" viewBox="0 0 6 9">
                  <path d="M0 0L6 4.5L0 9Z" fill="var(--os9-black)" />
                </svg>
              ) : (
                <span
                  className={cn(
                    "block size-[6px] border",
                    state === "done" ? "border-os9-black bg-os9-black" : "border-os9-gray-700"
                  )}
                />
              )}
            </span>
            {s.label}
          </li>
        )
      })}
    </ol>
  )
}

/* ------------------------------------------------------------------ */
/*  InstallerBlock                                                     */
/* ------------------------------------------------------------------ */

const InstallerBlock = React.forwardRef<HTMLDivElement, InstallerBlockProps>(
  function InstallerBlock(
    {
      productName = "Mac OS 9.2.2",
      onFinish,
      onInstall,
      onDisagree,
      disks = DEFAULT_DISKS,
      requiredMB = 350,
      welcome,
      readMe,
      license,
      installDuration = 6000,
      defaultStep = "welcome",
      title,
      className,
      contentClassName,
      onKeyDown,
      ...props
    },
    ref
  ) {
    const id = React.useId()
    const [step, setStep] = React.useState<InstallerStep>(defaultStep)
    const [agreed, setAgreed] = React.useState(false)
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [diskId, setDiskId] = React.useState<string | null>(
      () => disks.find((d) => d.availableMB >= requiredMB)?.id ?? null
    )
    const [installing, setInstalling] = React.useState(false)
    const [progress, setProgress] = React.useState(0)

    const index = STEPS.findIndex((s) => s.id === step)
    const disk = disks.find((d) => d.id === diskId) ?? null
    const diskOk = !!disk && disk.availableMB >= requiredMB

    /* Simulated install */
    const progressRef = React.useRef(0)
    React.useEffect(() => {
      if (!installing) return
      const tick = 100
      const inc = 100 / Math.max(1, installDuration / tick)
      const timer = setInterval(() => {
        const next = Math.min(100, progressRef.current + inc)
        progressRef.current = next
        setProgress(next)
        if (next >= 100) {
          clearInterval(timer)
          setInstalling(false)
          setStep("done")
        }
      }, tick)
      return () => clearInterval(timer)
    }, [installing, installDuration])

    const goBack = () => {
      if (index > 0 && !installing) setStep(STEPS[index - 1].id)
    }

    const startInstall = () => {
      if (!disk) return
      progressRef.current = 0
      setProgress(0)
      setInstalling(true)
      onInstall?.(disk)
    }

    const primary = () => {
      switch (step) {
        case "license":
          if (agreed) setStep("destination")
          else setAlertOpen(true)
          return
        case "destination":
          if (diskOk) setStep("install")
          return
        case "install":
          if (!installing) startInstall()
          return
        case "done":
          onFinish?.("restart")
          return
        default:
          setStep(STEPS[index + 1].id)
      }
    }

    const agree = () => {
      setAgreed(true)
      setAlertOpen(false)
      setStep("destination")
    }
    const disagree = () => {
      setAlertOpen(false)
      onDisagree?.()
    }

    const primaryLabel =
      step === "install" ? (installing ? "Installing…" : "Start") : step === "done" ? "Restart" : "Continue"
    const primaryDisabled =
      (step === "destination" && !diskOk) || (step === "install" && installing)

    const phase =
      INSTALL_PHASES[Math.min(INSTALL_PHASES.length - 1, Math.floor((progress / 100) * INSTALL_PHASES.length))]
    const secondsLeft = Math.ceil(((100 - progress) / 100) * (installDuration / 1000))

    let heading: string
    let body: React.ReactNode
    switch (step) {
      case "welcome":
        heading = `Welcome to the ${productName} Installer`
        body = (
          <div className="flex gap-4">
            <RetroIconHappyMac size="lg" className="shrink-0" />
            <div className={TEXT}>
              {welcome ?? (
                <>
                  <p>
                    This program will guide you through the steps necessary
                    to install {productName} on your computer.
                  </p>
                  <p className="mt-2">
                    Before you begin, quit all other applications and turn
                    off any virus-protection software.
                  </p>
                  <p className="mt-2">Click Continue to proceed.</p>
                </>
              )}
            </div>
          </div>
        )
        break
      case "readme":
        heading = "Important Information"
        body = (
          <div className={cn("os9-inset h-full overflow-y-auto p-[8px]", TEXT)} tabIndex={0}>
            {readMe ?? defaultReadMe(productName)}
          </div>
        )
        break
      case "license":
        heading = "Software License Agreement"
        body = (
          <div className="flex h-full flex-col gap-2">
            <p className={TEXT}>Please read the license agreement below.</p>
            <div
              className={cn("os9-inset min-h-0 flex-1 overflow-y-auto p-[8px]", TEXT)}
              tabIndex={0}
              aria-label="License agreement"
            >
              {license ?? defaultLicense(productName)}
            </div>
          </div>
        )
        break
      case "destination":
        heading = "Select Destination"
        body = (
          <div className="flex h-full flex-col gap-2">
            <p className={TEXT} id={`${id}-dest`}>
              Choose a disk on which to install {productName}.
            </p>
            <RetroListBox
              aria-labelledby={`${id}-dest`}
              value={diskId}
              onValueChange={setDiskId}
              className="min-h-[88px] flex-1"
            >
              {disks.map((d) => (
                <RetroListBoxItem
                  key={d.id}
                  value={d.id}
                  textValue={d.name}
                  disabled={d.availableMB < requiredMB}
                  className="h-[22px] gap-[6px]"
                >
                  <RetroIconHardDrive size="sm" />
                  <span className="min-w-0 flex-1 truncate">{d.name}</span>
                  <span className="shrink-0 tabular-nums">{formatMB(d.availableMB)} available</span>
                </RetroListBoxItem>
              ))}
            </RetroListBox>
            <p className={TEXT} aria-live="polite">
              {disk ? (
                diskOk ? (
                  <>
                    Installing requires about {formatMB(requiredMB)}.
                    &ldquo;{disk.name}&rdquo; has {formatMB(disk.availableMB)} available.
                  </>
                ) : (
                  <>&ldquo;{disk.name}&rdquo; does not have enough space. {formatMB(requiredMB)} is required.</>
                )
              ) : (
                "Select a destination disk."
              )}
            </p>
          </div>
        )
        break
      case "install":
        heading = "Install Software"
        body = (
          <div className={cn("flex flex-col gap-3", TEXT)}>
            {installing || progress > 0 ? (
              <>
                <p>
                  Installing {productName} on &ldquo;{disk?.name}&rdquo;.
                </p>
                <div className="flex flex-col gap-1" aria-live="polite">
                  <p className="truncate">Installing: {phase}</p>
                  <RetroProgress value={progress} aria-label="Installation progress" />
                  <p className="text-os9-gray-800">
                    About {secondsLeft} {secondsLeft === 1 ? "second" : "seconds"} remaining
                  </p>
                </div>
              </>
            ) : (
              <>
                <p>
                  Click Start to install {productName} on &ldquo;{disk?.name}&rdquo;.
                </p>
                <p>
                  Installing will take a few minutes. You can stop at any
                  time, but your system software may be left incomplete.
                </p>
              </>
            )}
          </div>
        )
        break
      case "done":
        heading = "Installation Successful"
        body = (
          <div className="flex gap-4">
            <RetroIconHappyMac size="lg" className="shrink-0" />
            <div className={TEXT}>
              <p>
                {`${productName} was installed successfully on “${disk?.name ?? "Macintosh HD"}”.`}
              </p>
              <p className="mt-2">
                You must restart your computer to use the newly installed
                software. Click Restart to restart now, or Quit to restart
                later.
              </p>
            </div>
          </div>
        )
        break
    }

    return (
      <RetroWindow
        ref={ref}
        title={title ?? `Install ${productName}`}
        role="dialog"
        aria-label={title ?? `Install ${productName}`}
        className={cn("@container w-full max-w-[620px]", className)}
        contentClassName={cn("relative flex h-[340px] flex-none gap-[12px] p-[12px] @max-[520px]:h-[400px]", contentClassName)}
        onKeyDown={(e) => {
          onKeyDown?.(e)
          if (e.defaultPrevented) return
          if (alertOpen) {
            if (e.key === "Escape") {
              e.preventDefault()
              disagree()
            }
            return
          }
          if (e.key !== "Enter") return
          const t = e.target as HTMLElement
          if (t.closest("button, [role=listbox]")) return
          if (primaryDisabled) return
          e.preventDefault()
          primary()
        }}
        {...props}
      >
        <StepList current={index} />

        <div className="flex min-w-0 flex-1 flex-col gap-3" inert={alertOpen || undefined}>
          <div>
            <p className="hidden font-[family-name:var(--os9-font-sans)] text-[9px] text-os9-gray-800 @max-[520px]:block">
              Step {index + 1} of {STEPS.length}
            </p>
            <h2 className="os9-heading text-[14px] text-os9-black">{heading}</h2>
          </div>

          <div className="min-h-0 flex-1">{body}</div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-os9-gray-600 pt-[6px] shadow-[inset_0_1px_0_var(--os9-white)]">
            {step === "done" ? (
              <RetroButton type="button" className="min-w-[80px]" onClick={() => onFinish?.("quit")}>
                Quit
              </RetroButton>
            ) : step === "install" && installing ? (
              <RetroButton
                type="button"
                className="min-w-[80px]"
                onClick={() => {
                  setInstalling(false)
                  progressRef.current = 0
                  setProgress(0)
                }}
              >
                Stop
              </RetroButton>
            ) : (
              <RetroButton type="button" className="min-w-[80px]" disabled={index === 0} onClick={goBack}>
                Go Back
              </RetroButton>
            )}
            <RetroButton
              type="button"
              isDefault
              className="min-w-[80px]"
              disabled={primaryDisabled}
              onClick={primary}
            >
              {primaryLabel}
            </RetroButton>
          </div>
        </div>

        {/* License alert */}
        {alertOpen && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-os9-gray-200/70 p-3">
            <div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={`${id}-alert`}
              className="w-full max-w-[380px] border border-os9-black bg-os9-gray-200 p-[3px] shadow-[var(--os9-shadow-window)]"
            >
              <div className="border border-os9-gray-600 shadow-[inset_1px_1px_0_var(--os9-white)]">
                <div className="flex gap-3 p-[12px]">
                  <RetroIconAlert className="shrink-0" />
                  <p id={`${id}-alert`} className="os9-heading text-[12px] leading-[1.35] text-os9-black">
                    To continue installing the software, you must agree to the
                    terms of the software license agreement.
                  </p>
                </div>
                <p className={cn(TEXT, "px-[12px] pb-2 pl-[56px]")}>
                  Click Agree to continue, or click Disagree to cancel the
                  installation.
                </p>
                <div className="flex justify-end gap-3 px-[12px] pb-[12px]">
                  <RetroButton type="button" className="min-w-[80px]" onClick={disagree}>
                    Disagree
                  </RetroButton>
                  <RetroButton type="button" isDefault autoFocus className="min-w-[80px]" onClick={agree}>
                    Agree
                  </RetroButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </RetroWindow>
    )
  }
)
InstallerBlock.displayName = "InstallerBlock"

export { InstallerBlock }
export type { InstallerBlockProps, InstallerDisk, InstallerFinishAction, InstallerStep }
