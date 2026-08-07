"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Clock,
  Cpu,
  Database,
  Fingerprint,
  Lock,
  Network,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Card } from "@/components/app-ui/card";
import { Badge } from "@/components/app-ui/badge";
import { Progress } from "@/components/app-ui/progress";
import { DeviceGlyph } from "@/components/app/DeviceGlyph";
import { RiskGauge } from "@/components/app/RiskGauge";
import { DonutChart } from "@/components/app/Charts";
import { useApp } from "@/components/providers/AppProvider";
import { RISK_FACTORS } from "@/lib/mock/data";
import { RISK_DIST } from "@/lib/mock/analytics";
import { cn } from "@/lib/utils";
import type { Asset, RiskLevel } from "@/lib/mock/types";

const TOPIC: Record<RiskLevel, { text: string; badge: "danger" | "warning" | "info" | "success" }> = {
  Critical: { text: "#EF4444", badge: "danger" },
  High: { text: "#F59E0B", badge: "warning" },
  Medium: { text: "#0EA5E9", badge: "info" },
  Low: { text: "#22C55E", badge: "success" },
};

const FACTOR_ICON: Record<string, typeof Cpu> = {
  Storage: Cpu,
  Department: User,
  "Data Sensitivity": Lock,
  Encryption: Fingerprint,
  "Device Age": Clock,
  Usage: TrendingUp,
};

const TONE = {
  Critical: { text: "#EF4444", bg: "bg-rose-50", ring: "ring-rose-100", badge: "danger" as const },
  High: { text: "#F59E0B", bg: "bg-amber-50", ring: "ring-amber-100", badge: "warning" as const },
  Medium: { text: "#0EA5E9", bg: "bg-sky-50", ring: "ring-sky-100", badge: "info" as const },
  Low: { text: "#22C55E", bg: "bg-success-50", ring: "ring-success-100", badge: "success" as const },
};

function reasoningFor(a: Asset): { reason: string; confidence: number; priority: "Immediate" | "High" | "Low"; }[] {
  const rows = [];
  if (a.storageType.includes("NVMe")) rows.push({ reason: `NVMe SSD (${a.storageType}) fragments logical data — TRIM + overwrite confirmation required.`, confidence: 98, priority: "Immediate" as const });
  if (["Finance", "Engineering", "Legal"].includes(a.department)) rows.push({ reason: `${a.department} dept processes high volumes of confidential records.`, confidence: 94, priority: "High" as const });
  if (a.classification === "Confidential") rows.push({ reason: `Tagged Confidential® in FY26 data-mapping — highest sensitivity tier.`, confidence: 96, priority: "Immediate" as const });
  if (a.encryptionStatus === "Disabled" || a.encryptionStatus === "File-level") rows.push({ reason: `${a.encryptionStatus === "Disabled" ? "No" : "Incomplete"} disk encryption — raw blocks may be recoverable.`, confidence: 90, priority: "Immediate" as const });
  if (new Date().getFullYear() - a.purchaseYear >= 4) rows.push({ reason: `In service ${new Date().getFullYear() - a.purchaseYear} years — older NAND may hold residual charge.`, confidence: 81, priority: "High" as const });
  rows.push({ reason: `Higher-than-average write activity raises recovery probability on logical volumes.`, confidence: 76, priority: "Low" as const });
  return rows.slice(0, 3);
}

export default function RiskPage() {
  const router = useRouter();
  const { assets } = useApp();

  const atRisk = assets
    .filter((a) => a.riskLevel === "Critical" || a.riskLevel === "High")
    .sort((a, b) => b.riskScore - a.riskScore);

  const [selectedId, setSelectedId] = React.useState(atRisk[0]?.id ?? null);
  const selected = assets.find((a) => a.id === selectedId) ?? atRisk[0];
  const reasoning = selected ? reasoningFor(selected) : [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI risk engine"
        title="Risk Assessment"
        desc="Machine learning scores every device and surfaces what to wipe first — with confidence and reasoning."
        actions={
          <Button variant="outline" onClick={() => router.push("/app/secure-wipe")}>
            <ShieldAlert className="h-4 w-4 text-amber-500" /> Wipe flagged devices
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* summary / AI panel */}
        <div className="space-y-6 lg:col-span-1">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="flex flex-col items-center p-6">
              <RiskGauge value={atRisk.length ? Math.round(atRisk.reduce((s, a) => s + a.riskScore, 0) / atRisk.length) : 18} size={180} tone="#EF4444" label="Estate risk" sub={`${atRisk.length} devices elevated`} />
              <div className="mt-4 flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
                <AlertTriangle className="h-3.5 w-3.5" /> 6 critical · {atRisk.length - 6} high risk
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <Card className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary-500" />
                <h3 className="text-sm font-semibold text-ink">AI analysis</h3>
              </div>
              <p className="text-[13px] leading-relaxed text-mist">
                The risk engine weights <span className="font-semibold text-ink">storage type (30%)</span> and{" "}
                <span className="font-semibold text-ink">department (22%)</span> most heavily. 63% of elevated risk traces
                to encryption-disabled media holding confidential data.
              </p>
              <div className="mt-4 space-y-3">
                {RISK_FACTORS.map((f, i) => {
                  const Icon = FACTOR_ICON[f.key] ?? Cpu;
                  return (
                    <div key={f.key}>
                      <div className="mb-1 flex items-center gap-2 text-[12px]">
                        <Icon className="h-3.5 w-3.5 text-primary-500" />
                        <span className="font-medium text-ink">{f.key}</span>
                        <span className="ml-auto font-semibold text-mist">{f.weight}%</span>
                      </div>
                      <Progress value={f.weight} className="h-1.5" />
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
            <Card className="p-5">
              <h3 className="mb-2 text-sm font-semibold text-ink">Risk distribution</h3>
              <DonutChart
                data={RISK_DIST}
                config={{}}
                height={150}
                center={
                  <div className="text-center">
                    <p className="text-xl font-semibold text-ink">2.4k</p>
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-mist">assets</p>
                  </div>
                }
              />
              <div className="mt-2 grid grid-cols-2 gap-2">
                {RISK_DIST.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs text-mist">
                    <span className="h-2 w-2 rounded-full" style={{ background: d.fill }} />
                    <span className="flex-1">{d.name}</span>
                    <span className="font-semibold text-ink">{d.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* risk cards */}
        <div className="space-y-5 lg:col-span-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-ink">Elevated risk devices</h2>
            <Badge variant="danger">{atRisk.length}</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {atRisk.map((a, i) => {
              const active = a.id === selectedId;
              const meta = TOPIC[a.riskLevel];
              const r = reasoningFor(a);
              return (
                <motion.button
                  key={a.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45 }}
                  onClick={() => setSelectedId(a.id)}
                  className={cn(
                    "rounded-3xl border bg-white p-4 text-left transition-all duration-200",
                    active ? "border-ink/20 shadow-lift" : "border-ink/6 hover:border-amber-200"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <DeviceGlyph type={a.assetType} color={a.color} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{a.name}</p>
                      <p className="font-mono text-[11px] text-mist">{a.serial}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <Badge variant={meta.badge}>{a.riskLevel}</Badge>
                        <span className="text-[11px] font-semibold text-mist">Score {a.riskScore}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-mist">Confidence</p>
                      <p className="text-sm font-bold text-ink">{r[0]?.confidence ?? "—"}%</p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    {r.map((reason, j) => (
                      <div key={j} className="flex items-start gap-2 text-[12px] leading-snug text-mist">
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
                        <span>{reason.reason}</span>
                      </div>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* detailed panel */}
          {selected && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/6 p-5">
                  <div className="flex items-center gap-3">
                    <DeviceGlyph type={selected.assetType} color={selected.color} />
                    <div>
                      <p className="text-sm font-semibold text-ink">{selected.name}</p>
                      <p className="font-mono text-xs text-mist">{selected.serial}</p>
                    </div>
                  </div>
                  <Button onClick={() => router.push("/app/secure-wipe")}>
                    <ArrowRight className="h-4 w-4" /> Queue for wipe
                  </Button>
                </div>

                <div className="grid gap-px bg-ink/5 sm:grid-cols-3">
                  {[
                    { label: "Risk level", value: selected.riskLevel, tone: TOPIC[selected.riskLevel].text },
                    { label: "Risk score", value: `${selected.riskScore}/100`, tone: TOPIC[selected.riskLevel].text },
                    { label: "Est. recovery probability", value: `${Math.min(94, selected.riskScore * 0.62).toFixed(0)}%`, tone: "#EF4444" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-mist">{s.label}</p>
                      <p className="mt-1 text-lg font-semibold" style={{ color: s.tone }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
                    <Bot className="h-4 w-4 text-violet-500" /> Recommended action
                  </h4>
                  <div className="space-y-3">
                    {reasoning.map((r, j) => (
                      <div key={j} className="flex items-center justify-between gap-3 rounded-2xl bg-cloud/60 p-3.5">
                        <div className="min-w-0">
                          <Badge variant={r.priority === "Immediate" ? "danger" : r.priority === "High" ? "warning" : "secondary"} className="mb-1.5">{r.priority}</Badge>
                          <p className="text-[13px] leading-snug text-ink">{r.reason}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-mist ring-1 ring-ink/6">
                          {r.confidence}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}