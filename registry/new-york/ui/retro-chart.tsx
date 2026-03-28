"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import type { TooltipValueType } from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

const INITIAL_DIMENSION = { width: 320, height: 200 } as const
type TooltipNameType = number | string

// ─── ChartConfig type ────────────────────────────────────────────────

export type RetroChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

// ─── Chart context ───────────────────────────────────────────────────

type ChartContextProps = {
  config: RetroChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useRetroChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useRetroChart must be used within a <RetroChartContainer />")
  }

  return context
}

// ─── RetroChartContainer ─────────────────────────────────────────────

function RetroChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: React.ComponentProps<"div"> & {
  config: RetroChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
  initialDimension?: {
    width: number
    height: number
  }
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="retro-chart"
        data-chart={chartId}
        className={cn(
          /* OS9 container styling */
          "flex aspect-video justify-center",
          "border border-os9-black bg-os9-gray-200",
          "shadow-[inset_1px_1px_0_var(--os9-white),inset_-1px_-1px_0_var(--os9-gray-700)]",
          /* Recharts overrides — OS9 axis text: Geneva 9px, gray-700 */
          "font-[family-name:var(--font-sans)] text-[9px]",
          "[&_.recharts-cartesian-axis-tick_text]:fill-[var(--os9-gray-700)]",
          "[&_.recharts-cartesian-axis-tick_text]:font-[family-name:var(--font-sans)]",
          "[&_.recharts-cartesian-axis-tick_text]:text-[9px]",
          /* Grid lines: os9-gray-400 */
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[var(--os9-gray-400)]",
          "[&_.recharts-cartesian-grid_line]:stroke-[var(--os9-gray-400)]",
          /* Cursor & misc overrides */
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-[var(--os9-gray-600)]",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-hidden",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-[var(--os9-gray-400)]",
          "[&_.recharts-radial-bar-background-sector]:fill-[var(--os9-gray-300)]",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[var(--os9-gray-300)]",
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-[var(--os9-gray-400)]",
          "[&_.recharts-sector]:outline-hidden",
          "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <RetroChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer
          initialDimension={initialDimension}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

// ─── RetroChartStyle ─────────────────────────────────────────────────

const RetroChartStyle = ({
  id,
  config,
}: {
  id: string
  config: RetroChartConfig
}) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme ?? config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

// ─── RetroChartTooltip ───────────────────────────────────────────────

const RetroChartTooltip = RechartsPrimitive.Tooltip

// ─── RetroChartTooltipContent ────────────────────────────────────────

function RetroChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      TooltipNameType
    >,
    "accessibilityLayer"
  >) {
  const { config } = useRetroChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div
          className={cn(
            /* Charcoal heading style */
            "font-[family-name:var(--font-heading)] text-[10px] tracking-[0.42px] leading-[0.98] text-[var(--os9-black)]",
            labelClassName
          )}
        >
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return (
      <div
        className={cn(
          "font-[family-name:var(--font-heading)] text-[10px] tracking-[0.42px] leading-[0.98] text-[var(--os9-black)]",
          labelClassName
        )}
      >
        {value}
      </div>
    )
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        /* OS9 Balloon Help tooltip styling */
        "grid min-w-[8rem] items-start gap-1",
        "rounded-[6px] border border-[var(--os9-black)]",
        "bg-[#ffffcc]",
        "px-2 py-1.5",
        "font-[family-name:var(--font-sans)] text-[10px] text-[var(--os9-black)]",
        "shadow-[1px_1px_0_rgba(0,0,0,0.3)]",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color ?? item.payload?.fill ?? item.color

            return (
              <div
                key={index}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-[var(--os9-gray-700)]",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            /* OS9: square indicators, no border-radius */
                            "shrink-0 border border-[var(--os9-black)] bg-(--color-bg)",
                            {
                              "h-2 w-2": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-[var(--os9-gray-700)]">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span className="font-[family-name:var(--font-mono)] font-medium text-[var(--os9-black)] tabular-nums">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

// ─── RetroChartLegend ────────────────────────────────────────────────

const RetroChartLegend = RechartsPrimitive.Legend

// ─── RetroChartLegendContent ─────────────────────────────────────────

function RetroChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean
  nameKey?: string
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useRetroChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        /* OS9 legend: Geneva 10px, flex row, gap-3 */
        "flex items-center justify-center gap-3",
        "font-[family-name:var(--font-sans)] text-[10px] text-[var(--os9-black)]",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-[var(--os9-gray-700)]"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                /* OS9: 8x8 square indicators (not circles) */
                <div
                  className="h-2 w-2 shrink-0"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
    </div>
  )
}

// ─── Helper ──────────────────────────────────────────────────────────

function getPayloadConfigFromPayload(
  config: RetroChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

// ─── Exports ─────────────────────────────────────────────────────────

export {
  RetroChartContainer,
  RetroChartTooltip,
  RetroChartTooltipContent,
  RetroChartLegend,
  RetroChartLegendContent,
  RetroChartStyle,
}
