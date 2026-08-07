"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Coins,
  Factory,
  Leaf,
  Recycle,
  RefreshCcw,
  Ship,
  Sparkles,
  Trash2,
  Truck,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Card } from "@/components/app-ui/card";
import { Badge } from "@/components/app-ui/badge";
import { ChartCard, FadeUp } from "@/components/platform/shared";
import { DonutChart, BarTrendChart } from "@/components/app/Charts";
import { CountUp } from "@/components/app/CountUp";
import { RECYCLING_PIPES, RECYCLING_BATCHES, RECYCLING_PARTNERS, MATERIALS_RECOVERED } from "@/lib/mock/recycling";
import { cn } from "@/lib/utils";

function ScanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}

const STAGE_META: Record<string, { icon: React.ComponentType<{ className?: string }>; cls: string; label: string }> = {
  Collected: { icon: Boxes, cls: "bg-sky-50 text-sky-600 ring-sky-100", label: "Collected" },
  Verified: { icon: ScanIcon, cls: "bg-primary-50 text-primary-600 ring-primary-100", label: "Verified" },
  Wiped: { icon: Wrench, cls: "bg-violet-50 text-violet-600 ring-violet-100", label: "Wiped" },
  Refurbished: { icon: RefreshCcw, cls: "bg-emerald-50 text-emerald-600 ring-emerald-100", label: "Refurbished" },
  Recycled: { icon: Recycle, cls: "bg-success-50 text-success-600 ring-success-100", label: "Recycled" },
  Disposed: { icon: Trash2, cls: "bg-rose-50 text-rose-600 ring-rose-100", label: "Disposed" },
};

const batchVariant: Record<string, "info" | "default" | "success" | "violet" | "secondary" | "warning" | "danger"> = {
  Collected: "info",
  Verified: "default",
  Wiped: "violet",
  Refurbished: "warning",
  Recycled: "success",
  Disposed: "secondary",
};

export default function RecyclingPage() {
  const totalCollected = RECYCLING_PIPES[0].count;
  const totalCarbon = 342;
  const totalRevenue = RECYCLING_BATCHES.reduce((s, b) => s + b.revenue, 0);
  const landfill = RECYCLING_PIPES[RECYCLING_PIPES.length - 1].count;
  const diversion = Math.round(((totalCollected - landfill) / totalCollected) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Circular economy"
        title="Recycling & Circularity"
        desc="Every kilogram tracked from intake to second life — zero to landfill, full carbon accounting."
        actions={
          <Button onClick={() => toast.success("New collection batch created")}>
            <Truck className="h-4 w-4" /> Schedule collection
          </Button>
        }
      />

      {/* headline */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Devices collected", value: totalCollected, suffix: "", tone: "#0EA5E9", Icon: Boxes },
          { label: "CO₂e avoided", value: totalCarbon, suffix: " t", tone: "#22C55E", Icon: Leaf },
          { label: "Circular revenue", value: totalRevenue, suffix: " ₹", tone: "#F59E0B", Icon: Coins },
          { label: "Landfill diversion", value: diversion, suffix: "%", tone: "#8B5CF6", Icon: Factory },
        ].map((k, i) => {
          const Icon = k.Icon;
          return (
            <motion.div key={k.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="rounded-3xl border border-ink/6 bg-white p-4 shadow-card">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl ring-1 ring-ink/5" style={{ background: `${k.tone}18`, color: k.tone }}>
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-[12px] font-medium text-mist">{k.label}</p>
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-tight" style={{ color: k.tone }}>
                <CountUp value={k.value} suffix={k.suffix} />
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* lifecycle pipeline */}
      <FadeUp>
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-ink">Lifecycle pipeline</h3>
              <p className="text-xs text-mist">Device flow through the circular loop</p>
            </div>
            <Badge variant="success"><Sparkles className="h-3 w-3" /> 96.2% diverted</Badge>
          </div>
          <div className="grid gap-2 md:grid-cols-6">
            {RECYCLING_PIPES.map((p, i) => {
              const meta = STAGE_META[p.stage];
              const Icon = meta.icon;
              const isLast = i === RECYCLING_PIPES.length - 1;
              return (
                <div key={p.stage} className="relative">
                  <div className={cn("flex flex-col items-center rounded-2xl border p-3.5 text-center transition-all hover:-translate-y-0.5 hover:shadow-card", isLast ? "border-rose-100 bg-rose-50/40" : "border-ink/6 bg-white")}>
                    <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl ring-1", meta.cls)}>
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-ink"><CountUp value={p.count} /></p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-mist">{p.stage}</p>
                    <p className="mt-0.5 text-[10px] text-mist/70">{Math.round((p.count / totalCollected) * 100)}% of intake</p>
                  </div>
                  {!isLast && (
                    <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                      <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </FadeUp>

      {/* charts row */}
      <div className="grid gap-5 lg:grid-cols-2">
        <FadeUp>
          <ChartCard title="Carbon saved by route" desc="CO₂e avoided per recovery method" className="h-full">
            <DonutChart
              data={[
                { name: "Reuse", value: 46, fill: "#22C55E" },
                { name: "Recycling", value: 28, fill: "#2563EB" },
                { name: "Material recovery", value: 19, fill: "#0EA5E9" },
                { name: "Disposal", value: 7, fill: "#94A3B8" },
              ]}
              config={{}}
              height={170}
              center={<div className="text-center"><p className="text-xl font-semibold text-ink">342t</p><p className="text-[9px] font-semibold uppercase tracking-widest text-mist">CO₂e</p></div>}
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                { name: "Reuse", value: 46, fill: "#22C55E" },
                { name: "Recycling", value: 28, fill: "#2563EB" },
                { name: "Material recovery", value: 19, fill: "#0EA5E9" },
                { name: "Disposal", value: 7, fill: "#94A3B8" },
              ].map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs text-mist">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.fill }} />
                  <span className="flex-1">{d.name}</span>
                  <span className="font-semibold text-ink">{d.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </FadeUp>
        <FadeUp delay={0.06}>
          <ChartCard title="Materials recovered" desc="Kilograms by material stream" className="h-full">
            <BarTrendChart
              data={MATERIALS_RECOVERED}
              xKey="name"
              bars={[{ key: "value", color: "#2563EB" }]}
              config={{ value: { label: "kg", color: "#2563EB" } }}
              cellFills={MATERIALS_RECOVERED.map((m) => m.fill)}
              height={220}
            />
          </ChartCard>
        </FadeUp>
      </div>

      {/* partners + batches */}
      <div className="grid gap-5 lg:grid-cols-3">
        <FadeUp className="lg:col-span-1">
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <Ship className="h-4 w-4 text-primary-500" />
              <h3 className="text-sm font-semibold text-ink">Recovery partners</h3>
            </div>
            <div className="space-y-3">
              {RECYCLING_PARTNERS.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cloud text-primary-500">
                    <Factory className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-ink">{p.name}</p>
                    <p className="text-[11px] text-mist">{p.volume}% of volume · {p.verified}% verified</p>
                  </div>
                  <Badge variant={p.tier === "Platinum" ? "success" : p.tier === "Gold" ? "warning" : "secondary"}>{p.tier}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </FadeUp>

        <FadeUp delay={0.06} className="lg:col-span-2">
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between p-5">
              <div>
                <h3 className="text-sm font-semibold text-ink">Collection batches</h3>
                <p className="text-xs text-mist">In-flight and completed circular operations</p>
              </div>
              <Badge variant="outline">{RECYCLING_BATCHES.length} batches</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cloud/60">
                  <tr>
                    {["Batch", "Devices", "Weight", "Stage", "Partner", "Revenue"].map((h) => (
                      <th key={h} className="h-10 px-5 text-left text-xs font-semibold uppercase tracking-wider text-mist">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECYCLING_BATCHES.map((b) => (
                    <tr key={b.id} className="transition-colors hover:bg-cloud/40">
                      <td className="px-5 py-3.5">
                        <p className="text-[13px] font-medium text-ink">{b.name}</p>
                        <p className="font-mono text-[11px] text-mist">{b.id}</p>
                      </td>
                      <td className="px-5 py-3.5 text-mist"><CountUp value={b.devices} /></td>
                      <td className="px-5 py-3.5 text-mist">{b.weightKg} kg</td>
                      <td className="px-5 py-3.5"><Badge variant={batchVariant[b.stage]}>{b.stage}</Badge></td>
                      <td className="px-5 py-3.5 text-[13px] text-mist">{b.partner}</td>
                      <td className="px-5 py-3.5 font-medium text-ink">{b.revenue > 0 ? `₹${b.revenue.toLocaleString("en-IN")}` : b.revenue < 0 ? "—" : "Pending"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </FadeUp>
      </div>
    </div>
  );
}