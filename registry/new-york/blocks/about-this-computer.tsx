import * as React from "react"

import { cn } from "@/lib/utils"
import {
  RetroIconApplication,
  RetroIconFinder,
} from "@/registry/new-york/ui/retro-icons"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AboutThisComputerApp {
  name: string
  /** Memory partition allocated to the app, in MB. */
  memory: number
  /** Portion of the partition actually in use, in MB. Defaults to `memory`. */
  used?: number
  /** 16px icon. Defaults to the generic application diamond. */
  icon?: React.ReactNode
}

interface AboutThisComputerBlockProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RetroWindow>, "children" | "title"> {
  /** Mac OS version string. Defaults to "9.2.2". */
  version?: string
  /** Built-in memory in MB. Defaults to 256. */
  totalMemory?: number
  /** Virtual memory in MB, or `false` for "Off". Defaults to totalMemory + 1. */
  virtualMemory?: number | false
  /** Volume hosting the VM file. Defaults to "Macintosh HD". */
  virtualMemoryVolume?: string
  /** Largest unused block in MB. Defaults to totalMemory minus all partitions. */
  largestUnusedBlock?: number
  /** Running applications. */
  apps?: AboutThisComputerApp[]
  /** Window title. Defaults to "About This Computer". */
  title?: string
}

const DEFAULT_APPS: AboutThisComputerApp[] = [
  { name: "Mac OS", memory: 42.6, used: 38.1 },
  { name: "Finder", memory: 8, used: 3.4 },
  { name: "SimpleText", memory: 1, used: 0.4 },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatMB(mb: number) {
  const rounded = Math.round(mb * 10) / 10
  return `${rounded.toLocaleString("en-US", { maximumFractionDigits: 1 })} MB`
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-x-2">
      <dt className="font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] text-os9-black">
        {label}:
      </dt>
      <dd className="font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.5] text-os9-black">
        {value}
      </dd>
    </div>
  )
}

/** Horizontal memory bar: outline = partition, azul fill = used. */
function MemoryBar({
  memory,
  used,
  scale,
}: {
  memory: number
  used: number
  scale: number
}) {
  const partitionPct = scale > 0 ? Math.max(2, (memory / scale) * 100) : 0
  const usedPct = memory > 0 ? Math.min(100, Math.max(0, (used / memory) * 100)) : 0
  return (
    <div className="h-[12px] w-full" aria-hidden>
      <div
        className="relative h-full border border-os9-black bg-os9-gray-400 shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]"
        style={{ width: `${partitionPct}%` }}
      >
        <div
          className="absolute inset-y-0 left-0 bg-os9-azul shadow-[inset_0_1px_0_var(--os9-focus)]"
          style={{ width: `${usedPct}%` }}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  AboutThisComputerBlock                                             */
/* ------------------------------------------------------------------ */

const AboutThisComputerBlock = React.forwardRef<
  HTMLDivElement,
  AboutThisComputerBlockProps
>(function AboutThisComputerBlock(
  {
    version = "9.2.2",
    totalMemory = 256,
    virtualMemory,
    virtualMemoryVolume = "Macintosh HD",
    largestUnusedBlock,
    apps = DEFAULT_APPS,
    title = "About This Computer",
    className,
    ...props
  },
  ref
) {
  const allocated = apps.reduce((sum, a) => sum + a.memory, 0)
  const unused = largestUnusedBlock ?? Math.max(0, totalMemory - allocated)
  const vm = virtualMemory ?? totalMemory + 1
  const scale = Math.max(0, ...apps.map((a) => a.memory))

  return (
    <RetroWindow
      ref={ref}
      title={title}
      className={cn("w-full max-w-[520px]", className)}
      {...props}
    >
      {/* Summary */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-2 pb-3 pt-2">
        <div className="flex items-center gap-3">
          <RetroIconFinder size="xl" />
          <p className="os9-heading whitespace-nowrap text-[24px] text-os9-black">
            Mac OS {version.split(".")[0]}
          </p>
        </div>

        <dl className="flex min-w-0 flex-1 basis-[200px] flex-col gap-1">
          <InfoRow label="Version" value={`Mac OS ${version}`} />
          <InfoRow label="Built-in Memory" value={formatMB(totalMemory)} />
          <InfoRow
            label="Virtual Memory"
            value={
              vm === false
                ? "Off"
                : `${formatMB(vm)} used on ${virtualMemoryVolume}`
            }
          />
          <InfoRow label="Largest Unused Block" value={formatMB(unused)} />
        </dl>
      </div>

      {/* Separator */}
      <div className="h-[2px] border-t border-os9-gray-700 bg-os9-white" aria-hidden />

      {/* Per-application memory */}
      <table className="mt-2 w-full border-collapse">
        <caption className="sr-only">Memory used by open applications</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Application</th>
            <th scope="col">Memory</th>
            <th scope="col">Usage</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => {
            const used = app.used ?? app.memory
            return (
              <tr key={app.name}>
                <th
                  scope="row"
                  className="py-[3px] pl-2 pr-3 text-left align-middle font-normal"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="flex size-4 shrink-0 items-center justify-center">
                      {app.icon ?? <RetroIconApplication size="sm" />}
                    </span>
                    <span className="min-w-0 break-words font-[family-name:var(--os9-font-sans)] text-[10px] text-os9-black">
                      {app.name}
                    </span>
                  </span>
                </th>
                <td className="whitespace-nowrap py-[3px] pr-3 text-right align-middle font-[family-name:var(--os9-font-sans)] text-[10px] tabular-nums text-os9-black">
                  {formatMB(app.memory)}
                  <span className="sr-only">
                    {`, ${formatMB(used)} in use`}
                  </span>
                </td>
                <td className="w-[45%] py-[3px] pr-2 align-middle">
                  <MemoryBar memory={app.memory} used={used} scale={scale} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </RetroWindow>
  )
})
AboutThisComputerBlock.displayName = "AboutThisComputerBlock"

export { AboutThisComputerBlock }
export type { AboutThisComputerBlockProps, AboutThisComputerApp }
