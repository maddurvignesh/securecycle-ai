"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<string, { label: string; color: string }>;

type Entry = {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  color?: string;
  type?: string;
};

type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within a ChartContainer");
  return ctx;
}

function ChartContainer({
  config,
  className,
  height = 260,
  children,
}: {
  config: ChartConfig;
  className?: string;
  height?: number;
  children?: React.ReactNode;
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-mist [&_.recharts-cartesian-axis-tick_text]:text-[11px] [&_.recharts-cartesian-grid_line]:stroke-slate-100 [&_.recharts-text.recharts-label]:fill-mist",
          className
        )}
        style={{ height }}
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}

const formatValue = (v: unknown): string => {
  if (typeof v === "number" && v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  if (typeof v === "number") return v.toLocaleString();
  return String(v ?? "");
};

type ContentProps = {
  active?: boolean;
  payload?: Entry[];
  label?: string | number;
  labelFormatter?: (v: unknown) => string;
  valueFormatter?: (v: unknown) => string;
  hideIndicator?: boolean;
  indicator?: "dot" | "tick";
};

function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
  indicator = "dot",
}: ContentProps) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;

  const heading =
    label != null ? (labelFormatter ? labelFormatter(label) : String(label)) : null;

  return (
    <div className="min-w-[160px] rounded-2xl border border-ink/6 bg-white px-3.5 py-3 shadow-lift">
      {heading != null ? (
        <div className="mb-1.5 text-xs font-semibold text-ink">{heading}</div>
      ) : null}
      <div className="flex flex-col gap-1.5">
        {payload.map((entry) => {
          const key = String(entry.dataKey);
          const cfg = config[key];
          const color = cfg?.color ?? entry.color ?? "#2563EB";
          return (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span
                className={
                  indicator === "dot"
                    ? "h-2 w-2 shrink-0 rounded-full"
                    : "h-2 w-0.5 shrink-0 rounded-full"
                }
                style={{ background: color }}
              />
              <span className="text-mist">{cfg?.label ?? entry.name}</span>
              <span className="ml-auto font-semibold text-ink">
                {valueFormatter ? valueFormatter(entry.value) : formatValue(entry.value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChartLegendPayloadTooltip({ payload, config }: { payload: ContentProps["payload"]; config: ChartConfig }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
      {payload?.map((entry) => {
        const key = String(entry.dataKey);
        const cfg = config[key];
        const color = cfg?.color ?? entry.color ?? "#2563EB";
        const label = cfg?.label ?? entry.name;
        if (entry.type === "none")
          return (
            <div key={key + "-z"} className="flex items-center gap-1.5 rounded-md border py-0.5 pl-2 pr-2 text-xs text-mist">
              {String(label ?? "")}
            </div>
          );
        return (
          <div key={key} className="flex items-center gap-1.5 text-xs text-mist">
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            {label}
          </div>
        );
      })}
    </div>
  );
}

function ChartLegendContent({ payload, config }: { payload?: ContentProps["payload"]; config: ChartConfig }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
      {payload?.map((entry) => {
        const key = String(entry.dataKey);
        const cfg = config[key];
        const color = cfg?.color ?? entry.color ?? "#94A3B8";
        const label = cfg?.label ?? entry.name;
        return (
          <div key={key} className="flex items-center gap-1.5 text-xs text-mist">
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            {label}
          </div>
        );
      })}
    </div>
  );
}

export { ChartContainer, ChartTooltipContent, ChartLegendContent };