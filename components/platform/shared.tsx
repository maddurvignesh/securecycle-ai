"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Laptop,
  Monitor,
  Server,
  HardDrive,
  Smartphone,
  Network,
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import type { AssetStatus, AssetType, RiskLevel } from "@/lib/mock/types";
import { Badge } from "@/components/app-ui/badge";
import { Card } from "@/components/app-ui/card";
import { cn } from "@/lib/utils";

/* ------------------------------ Asset icon ------------------------------ */
const ICONS: Record<AssetType, typeof Laptop> = {
  Laptop: Laptop,
  Desktop: Monitor,
  Server: Server,
  SSD: HardDrive,
  HDD: HardDrive,
  Phone: Smartphone,
  Printer: Network,
  "Networking Device": Cpu,
};

export function AssetIcon({
  type,
  color = "#2563EB",
  className,
}: {
  type: AssetType;
  color?: string;
  className?: string;
}) {
  const Icon = ICONS[type] ?? HardDrive;
  return (
    <span
      className={cn("flex items-center justify-center rounded-2xl ring-1", className)}
      style={{ backgroundColor: `${color}1a`, color, ["--tw-ring-color" as string]: `${color}33` }}
    >
      <Icon className="h-[55%] w-[55%]" strokeWidth={1.7} />
    </span>
  );
}

/* ------------------------------ Badges ------------------------------ */
const RISK_VARIANT: Record<RiskLevel, "danger" | "warning" | "info" | "success"> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "success",
};

export function RiskBadge({ level, score }: { level: RiskLevel; score?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Badge variant={RISK_VARIANT[level]}>{level}</Badge>
      {score != null && <span className="text-[11px] font-semibold text-mist">{score}</span>}
    </span>
  );
}

const STATUS_VARIANT: Record<AssetStatus, "default" | "success" | "warning" | "info" | "secondary" | "danger"> = {
  "In Fleet": "info",
  "Pending Wipe": "warning",
  Wiping: "default",
  Wiped: "secondary",
  Certified: "success",
  Recycled: "success",
  Retired: "danger",
};

export function StatusBadge({ status }: { status: AssetStatus }) {
  return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>;
}

export function SenseBadge({ tone, children }: { tone?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
        tone === "blue" && "bg-primary-50 text-primary-700",
        tone === "green" && "bg-success-50 text-success-700",
        tone === "amber" && "bg-amber-50 text-amber-700",
        tone === "rose" && "bg-rose-50 text-rose-700"
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------ Sparkline ------------------------------ */
export function Sparkline({
  data,
  stroke = "#2563EB",
  height = 40,
}: {
  data: number[];
  stroke?: string;
  height?: number;
}) {
  const reduced = useReducedMotion();
  const w = 100;
  const h = height;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return [x, y] as const;
  });
  const path = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-10 w-full" aria-hidden>
      <defs>
        <linearGradient id={`sp-${stroke.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={stroke} stopOpacity="0.22" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sp-${stroke.slice(1)})`} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={reduced ? "opacity-100" : "rounded"} />
    </svg>
  );
}

/* ------------------------------ Metric card ------------------------------ */
export function MetricCard({
  icon,
  label,
  value,
  delta,
  up,
  spark,
  tone = "#2563EB",
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: number;
  up: boolean;
  spark: number[];
  tone?: string;
  loading?: boolean;
}) {
  return (
    <Card className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.14]"
        style={{ background: tone }}
      />
      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-card"
          style={{ background: `linear-gradient(135deg, ${tone}, ${tone}cc)` }}
        >
          {icon}
        </div>
        <span className="flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-semibold">
          <span className={up ? "text-success-600" : "text-rose-500"}>
            {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          </span>
          <span className={up ? "text-ink" : "text-ink"}>{Math.abs(delta)}%</span>
        </span>
      </div>
      <div className="mt-4">
        <p className="text-[12px] font-medium text-mist">{label}</p>
        <div className="mt-1 flex items-end justify-between gap-2">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-200" />
          ) : (
            <p className="text-2xl font-semibold tracking-tight text-ink">{value}</p>
          )}
        </div>
      </div>
      <Sparkline data={spark} stroke={tone} />
    </Card>
  );
}

/* ------------------------------ Chart card ------------------------------ */
export function ChartCard({
  title,
  desc,
  action,
  className,
  children,
}: {
  title: string;
  desc?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-ink">{title}</h3>
          {desc ? <p className="mt-0.5 text-xs text-mist">{desc}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}

/* ------------------------------ Anim reveal ------------------------------ */
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}