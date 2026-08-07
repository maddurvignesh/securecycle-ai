"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/app-ui/chart";
import { cn } from "@/lib/utils";

const AXIS_TICK = { fontSize: 11, fill: "#94A3B8" };

/* ------------------------- Donut / Pie ------------------------- */
export function DonutChart({
  data,
  config,
  center,
  height = 220,
  className,
}: {
  data: { name: string; value: number; fill?: string }[];
  config: Record<string, { label: string; color: string }>;
  center?: React.ReactNode;
  height?: number;
  className?: string;
}) {
return (
    <div className={cn("relative", className)} style={{ height }}>
      <ChartContainer config={config} height={height}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="86%"
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={d.fill ?? Object.values(config)[i % Object.values(config).length]?.color ?? "#2563EB"} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      {center ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {center}
        </div>
      ) : null}
    </div>
  );
}

/* --------------------------- Area trend --------------------------- */
export function TrendAreaChart({
  data,
  xKey,
  series,
  config,
  height = 240,
  className,
}: {
  data: any[];
  xKey: string;
  series: { key: string; color: string }[];
  config: Record<string, { label: string; color: string }>;
  height?: number;
  className?: string;
}) {
  return (
    <ChartContainer config={config} className={className} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 6, left: -16, bottom: 0 }}>
          <defs>
            {series.map((s) => (
              <linearGradient id={`grad-${s.key}`} key={s.key} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.28} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={AXIS_TICK} dy={6} />
          <YAxis tickLine={false} axisLine={false} tick={AXIS_TICK} />
          <Tooltip content={<ChartTooltipContent />} />
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={2.2}
              fill={`url(#grad-${s.key})`}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

/* --------------------------- Bars --------------------------- */
export function BarTrendChart({
  data,
  xKey,
  bars,
  config,
  height = 240,
  className,
  cellFills,
}: {
  data: any[];
  xKey: string;
  bars: { key: string; color: string }[];
  config: Record<string, { label: string; color: string }>;
  height?: number;
  className?: string;
  cellFills?: string[];
}) {
  return (
    <ChartContainer config={config} className={className} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 6, right: 6, left: -16, bottom: 0 }} barCategoryGap="28%">
          <CartesianGrid vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={AXIS_TICK} dy={6} />
          <YAxis tickLine={false} axisLine={false} tick={AXIS_TICK} />
          <Tooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(37,99,235,0.04)" }} />
          {bars.map((b) => (
            <Bar key={b.key} dataKey={b.key} radius={[6, 6, 0, 0]} maxBarSize={34}>
              {cellFills
                ? data.map((_, i) => <Cell key={i} fill={cellFills[i % cellFills.length]} />)
                : <Cell fill={b.color} />}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

/* --------------------------- Multi-line --------------------------- */
export function MultiLineChart({
  data,
  xKey,
  lines,
  config,
  height = 240,
  className,
}: {
  data: any[];
  xKey: string;
  lines: { key: string; color: string }[];
  config: Record<string, { label: string; color: string }>;
  height?: number;
  className?: string;
}) {
  return (
    <ChartContainer config={config} className={className} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 6, right: 6, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={AXIS_TICK} dy={6} />
          <YAxis tickLine={false} axisLine={false} tick={AXIS_TICK} />
          <Tooltip content={<ChartTooltipContent />} />
          {lines.map((l) => (
            <Line
              key={l.key}
              type="monotone"
              dataKey={l.key}
              stroke={l.color}
              strokeWidth={2.2}
              dot={false}
              strokeDasharray={l.key.startsWith("forecast") ? "5 4" : undefined}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

/* --------------------- Chart card with legend --------------------- */
export function ChartWithLegend({
  title,
  desc,
  legend,
  config,
  children,
  className,
}: {
  title: string;
  desc?: string;
  legend?: boolean;
  config: Record<string, { label: string; color: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {children}
      {legend ? (
        <ChartLegendContent payload={Object.entries(config).map(([k, v]) => ({ key: k, name: v.label, color: v.color, type: "line" }))} config={config} />
      ) : null}
    </div>
  );
}

export default DonutChart;
