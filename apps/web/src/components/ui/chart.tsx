import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "relative flex w-full aspect-video justify-center items-center text-xs antialiased",
          "p-4 rounded-lg bg-card border border-border/50 shadow-sm",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-axis-tick_text]:text-xs",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/30 [&_.recharts-cartesian-grid_line]:stroke-dasharray-2-2",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border/60 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-width-1",
          "[&_.recharts-dot[stroke='#fff']]:stroke-background [&_.recharts-dot[stroke='#fff']]:stroke-width-2",
          "[&_.recharts-layer]:outline-none [&_.recharts-layer]:focus-visible:outline-2 [&_.recharts-layer]:focus-visible:outline-ring",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border/30",
          "[&_.recharts-radial-bar-background-sector]:fill-muted/50",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted/20 [&_.recharts-rectangle.recharts-tooltip-cursor]:stroke-border/40",
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border/50 [&_.recharts-reference-line_[stroke='#ccc']]:stroke-dasharray-3-3",
          "[&_.recharts-sector[stroke='#fff']]:stroke-background [&_.recharts-sector[stroke='#fff']]:stroke-width-1",
          "[&_.recharts-sector]:outline-none [&_.recharts-sector]:focus-visible:outline-2 [&_.recharts-sector]:focus-visible:outline-ring",
          "[&_.recharts-surface]:outline-none",
          "[&_.recharts-active-dot]:r-3 [&_.recharts-active-dot]:stroke-width-2 [&_.recharts-active-dot]:stroke-background",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
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
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
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
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return <div className={cn("font-semibold text-sm text-foreground", labelClassName)}>{labelFormatter(value, payload)}</div>;
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-semibold text-sm text-foreground", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[10rem] max-w-[16rem] items-start gap-2 rounded-xl border border-border/60 bg-background/95 backdrop-blur-sm px-3 py-2.5 text-sm shadow-xl ring-1 ring-black/5",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-2">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full items-center justify-between gap-3 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn("shrink-0 rounded-sm border-[--color-border] bg-[--color-bg] shadow-sm", {
                              "h-3 w-3": indicator === "dot",
                              "w-1 h-4": indicator === "line",
                              "w-0 h-3 border-[2px] border-dashed bg-transparent": indicator === "dashed",
                            })}
                            style={
                              {
                                "--color-bg": indicatorColor,
                                "--color-border": indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div className="flex flex-col gap-0.5 min-w-0">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground text-xs truncate">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                    </div>
                    {item.value && (
                      <span className="font-mono font-semibold tabular-nums text-foreground text-sm shrink-0">
                        {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-6 flex-wrap",
        verticalAlign === "top" ? "pb-4" : "pt-4",
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn(
              "flex items-center gap-2 text-sm font-medium text-foreground",
              "[&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-muted-foreground"
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-3 w-3 shrink-0 rounded-sm shadow-sm border border-border/20"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            <span className="truncate">{itemConfig?.label}</span>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
