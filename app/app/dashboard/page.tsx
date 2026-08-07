"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  Cpu,
  Droplets,
  FileCheck2,
  Gauge,
  HardDrive,
  Recycle,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { MetricCard, ChartCard, FadeUp } from "@/components/platform/shared";
import { Badge } from "@/components/app-ui/badge";
import { Button } from "@/components/app-ui/button";
import { Card } from "@/components/app-ui/card";
import { PageSkeleton } from "@/components/app/PageSkeleton";
import { DonutChart, TrendAreaChart, BarTrendChart, MultiLineChart } from "@/components/app/Charts";
import { Timeline } from "@/components/app/Timeline";
import { useApp } from "@/components/providers/AppProvider";
import { METRICS, WIPE_MONTHLY } from "@/lib/mock/data";
import { ASSET_TYPES_DIST, DEPT_DIST, RISK_DIST, COMPLIANCE_TREND, WIPE_BY_STANDARD } from "@/lib/mock/analytics";
import { ACTIVITY_FEED } from "@/lib/mock/copilot";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

const METRIC_ICONS: Record<string, React.ReactNode> = {
  assets: <HardDrive className="h-5 w-5" />,
  pending: <ShieldAlert className="h-5 w-5" />,
  completed: <CheckCircle2 className="h-5 w-5" />,
  certificates: <BadgeCheck className="h-5 w-5" />,
  compliance: <Gauge className="h-5 w-5" />,
  carbon: <Droplets className="h-5 w-5" />,
  recycled: <Recycle className="h-5 w-5" />,
  highRisk: <ShieldAlert className="h-5 w-5" />,
};

const METRIC_TONES: Record<string, string> = {
  assets: "#2563EB",
  pending: "#F59E0B",
  completed: "#22C55E",
  certificates: "#8B5CF6",
  compliance: "#0EA5E9",
  carbon: "#22C55E",
  recycled: "#10B981",
  highRisk: "#EF4444",
};

const TASKS = [
  { title: "Queue 6 critical devices for NIST purge", meta: "Due today · 18:00", tone: "rose", icon: ShieldAlert },
  { title: "Review HIPAA disposition findings", meta: "Due tomorrow · 12:00", tone: "amber", icon: AlertTriangle },
  { title: "Issue certificates for batch #8812", meta: "Due Fri · 09:00", tone: "blue", icon: BadgeCheck },
  { title: "Approve recycling shipment to Revycle", meta: "Due Fri · 16:00", tone: "violet", icon: Recycle },
];

export default function DashboardPage() {
  const { user, assets, certifications, notifications } = useApp();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 750);
    return () => clearTimeout(t);
  }, []);

  const dateStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const pendingWipes = assets.filter((a) => a.status === "Pending Wipe" || a.status === "Wiping");
  const highRisk = assets.filter((a) => a.riskLevel === "Critical" || a.riskLevel === "High");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const metricConfig = {
    assets: { label: "Total Assets", color: "#2563EB" },
    pending: { label: "Pending Wipes", color: "#F59E0B" },
    completed: { label: "Completed", color: "#22C55E" },
    certified: { label: "Certified", color: "#8B5CF6" },
  };
  const carbonConfig = { saved: { label: "CO₂e saved (t)", color: "#22C55E" } };
  const complianceConfig = { score: { label: "Score %", color: "#0EA5E9" }, target: { label: "Target", color: "#94A3B8" } };

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Command center"
        title={`${greeting}, ${user.name.split(" ")[0]}`}
        desc={dateStr}
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("Fleet sync started")}>
              <Cpu className="h-4 w-4 text-primary-600" /> Sync fleet
            </Button>
            <Button asChild>
              <Link href="/app/secure-wipe">
                <ShieldCheck className="h-4 w-4" /> Start secure wipe
              </Link>
            </Button>
          </>
        }
      />

      {/* metric cards */}
      <FadeUp delay={0.05}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(METRICS)
            .filter(([k]) => ["assets", "pending", "completed", "compliance", "carbon", "recycled", "certificates", "highRisk"].includes(k))
            .map(([key, m], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <MetricCard
                  icon={METRIC_ICONS[key]}
                  label={m.label}
                  value={m.value}
                  delta={m.delta}
                  up={m.up}
                  spark={m.spark}
                  tone={METRIC_TONES[key]}
                />
              </motion.div>
            ))}
        </div>
      </FadeUp>

      {/* main charts */}
      <div className="grid gap-5 lg:grid-cols-3">
        <FadeUp delay={0.1} className="lg:col-span-2">
          <ChartCard
            title="Monthly wipes vs certified"
            desc="Fleet throughput · last 12 months"
            action={
              <div className="flex items-center gap-2 text-[11px] font-medium text-mist">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary-600" /> Wiped</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success-500" /> Certified</span>
              </div>
            }
            className="h-full"
          >
            <TrendAreaChart
              data={WIPE_MONTHLY}
              xKey="month"
              series={[{ key: "wiped", color: "#2563EB" }, { key: "certified", color: "#22C55E" }]}
              config={metricConfig}
              height={280}
            />
          </ChartCard>
        </FadeUp>

        <FadeUp delay={0.15}>
          <ChartCard
            title="Asset types"
            desc="Fleet composition"
            action={<span className="text-[11px] font-semibold text-primary-600">2,453 devices</span>}
            className="h-full"
          >
            <DonutChart
              data={ASSET_TYPES_DIST}
              config={{}}
              height={180}
              center={
                <div className="text-center">
                  <p className="text-2xl font-semibold tracking-tight text-ink">2.4k</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-mist">Assets</p>
                </div>
              }
            />
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {ASSET_TYPES_DIST.slice(0, 6).map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs text-mist">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.fill }} />
                  <span className="flex-1">{d.name}</span>
                  <span className="font-semibold text-ink">{d.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </FadeUp>
      </div>

      {/* secondary charts */}
      <div className="grid gap-5 lg:grid-cols-2">
        <FadeUp delay={0.1}>
          <ChartCard
            title="Compliance trend"
            desc="Weighted score across frameworks"
            action={<Badge variant="success">96.8% · On track</Badge>}
          >
            <MultiLineChart
              data={COMPLIANCE_TREND}
              xKey="month"
              lines={[{ key: "score", color: "#0EA5E9" }, { key: "target", color: "#CBD5E1" }]}
              config={complianceConfig}
              height={220}
            />
          </ChartCard>
        </FadeUp>
        <FadeUp delay={0.16}>
          <ChartCard
            title="Wipes by standard"
            desc="Distribution of sanitization methods"
            action={<span className="text-[11px] font-semibold text-success-600">NIST dominant</span>}
          >
            <BarTrendChart
              data={WIPE_BY_STANDARD}
              xKey="name"
              bars={[{ key: "value", color: "#2563EB" }]}
              config={{ value: { label: "Share %", color: "#2563EB" } }}
              cellFills={WIPE_BY_STANDARD.map((s) => s.fill)}
              height={220}
            />
          </ChartCard>
        </FadeUp>
      </div>

      {/* activity / tasks / ai insights */}
      <div className="grid gap-5 lg:grid-cols-3">
        <FadeUp delay={0.08} className="lg:col-span-2">
          <Card className="h-full p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-ink">Activity timeline</h3>
                <p className="mt-0.5 text-xs text-mist">Live operations across your estate</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/app/audit">
                  View audit log <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <Timeline
              steps={ACTIVITY_FEED.slice(0, 6).map((a) => ({
                id: a.id,
                title: a.title,
                desc: a.desc,
                time: timeAgo(a.time),
                tone: a.tone,
                icon: (
                  a.tone === "green" ? <CheckCircle2 className="h-4 w-4" /> :
                  a.tone === "rose" ? <ShieldAlert className="h-4 w-4" /> :
                  a.tone === "amber" ? <AlertTriangle className="h-4 w-4" /> :
                  <Sparkles className="h-4 w-4" />
                ),
              }))}
            />
          </Card>
        </FadeUp>

        <div className="space-y-5">
          <FadeUp delay={0.12}>
            <Card className="overflow-hidden">
              <div className="flex items-center gap-2.5 border-b border-ink/6 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 text-white shadow-glow">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">AI Insights</p>
                  <p className="text-[11px] text-mist">Real-time intelligence</p>
                </div>
              </div>
              <div className="space-y-3 p-4">
                {[
                  { tone: "rose", title: `${highRisk.length} high-risk devices`, body: "6 SSDs with encryption disabled need immediate purging." },
                  { tone: "green", title: "Compliance at 96.8%", body: "HIPAA disposition gap is the only blocker to 98%+." },
                  { tone: "blue", title: `${pendingWipes.length} devices awaiting wipe`, body: "Recommended: run NIST purge tonight 22:00 IST." },
                ].map((ins) => (
                  <div key={ins.title} className="flex items-start gap-3 rounded-2xl bg-cloud/60 p-3">
                    <span className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1",
                      ins.tone === "rose" && "bg-rose-50 text-rose-500 ring-rose-100",
                      ins.tone === "green" && "bg-success-50 text-success-600 ring-success-100",
                      ins.tone === "blue" && "bg-primary-50 text-primary-500 ring-primary-100"
                    )}>
                      {ins.tone === "rose" ? <AlertTriangle className="h-3.5 w-3.5" /> : ins.tone === "green" ? <TrendingUp className="h-3.5 w-3.5" /> : <Target className="h-3.5 w-3.5" />}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{ins.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-mist">{ins.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeUp>

          <FadeUp delay={0.18}>
            <Card className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink">Upcoming tasks</h3>
                <CalendarClock className="h-4 w-4 text-mist" />
              </div>
              <div className="space-y-2">
                {TASKS.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.title}
                      onClick={() => toast.success(`${t.title} — opened`)}
                      className="group flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-cloud"
                    >
                      <span className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1",
                        t.tone === "rose" && "bg-rose-50 text-rose-500 ring-rose-100",
                        t.tone === "amber" && "bg-amber-50 text-amber-500 ring-amber-100",
                        t.tone === "blue" && "bg-primary-50 text-primary-500 ring-primary-100",
                        t.tone === "violet" && "bg-violet-50 text-violet-500 ring-violet-100"
                      )}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-ink group-hover:text-primary-700">{t.title}</span>
                        <span className="block text-[11px] text-mist">{t.meta}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </FadeUp>
        </div>
      </div>

      {/* footer strip */}
      <FadeUp delay={0.15}>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-ink/6 bg-gradient-to-r from-primary-50/60 via-white to-success-50/60 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-success-500 text-white shadow-glow">
              <FileCheck2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{certifications.length} certificates active this cycle</p>
              <p className="text-xs text-mist">
                {notifications.filter((n) => !n.read).length} unread notifications · All wipes verified cryptographically
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {["assets", "certificates", "reports", "audit"].map((p) => (
              <Button key={p} variant="ghost" size="sm" className="capitalize" asChild>
                <Link href={`/app/${p === "assets" ? "assets" : p}`}>{p === "reports" ? "Reports" : p}</Link>
              </Button>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}