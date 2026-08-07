"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CalendarRange, Download, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Badge } from "@/components/app-ui/badge";
import { Card } from "@/components/app-ui/card";
import { ChartCard, FadeUp } from "@/components/platform/shared";
import { DonutChart, TrendAreaChart, BarTrendChart, MultiLineChart } from "@/components/app/Charts";
import { PageSkeleton } from "@/components/app/PageSkeleton";
import {
  ASSET_TYPES_DIST,
  DEPT_DIST,
  STORAGE_DIST,
  RISK_DIST,
  COMPLIANCE_TREND,
  DEVICE_AGE_BANDS,
  WIPE_FORECAST,
  CARBON_BY_STAGE,
  DAILY_WIPES,
  QUARTERLY_PERFORMANCE,
  WIPE_BY_STANDARD,
} from "@/lib/mock/analytics";
import { CARBON_MONTHLY, WIPE_MONTHLY } from "@/lib/mock/data";
import { CountUp } from "@/components/app/CountUp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/app-ui/select";

const rangeOptions = ["Last 30 days", "Last quarter", "Last 12 months", "Year to date"];

export default function AnalyticsPage() {
  const [loading, setLoading] = React.useState(true);
  const [range, setRange] = React.useState("Last 12 months");

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <PageSkeleton />;

  const wipeConfig = { wiped: { label: "Wiped", color: "#2563EB" }, certified: { label: "Certified", color: "#22C55E" } };
  const carbonConfig = { saved: { label: "CO₂e saved (t)", color: "#22C55E" } };
  const complianceConfig = { score: { label: "Score %", color: "#0EA5E9" }, target: { label: "Target", color: "#CBD5E1" } };
  const forecastConfig = { actual: { label: "Actual", color: "#2563EB" }, forecast: { label: "Forecast", color: "#8B5CF6" } };
  const dailyConfig = { wiped: { label: "Wiped", color: "#2563EB" }, certified: { label: "Certified", color: "#22C55E" } };
  const deptConfig = { value: { label: "Share %", color: "#2563EB" } };
  const storageConfig = { value: { label: "Share %", color: "#0EA5E9" } };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Executive intelligence"
        title="Analytics"
        desc="Deep insight into fleet, risk, compliance and circular economy performance."
        actions={
          <>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-[170px]">
                <CalendarRange className="h-3.5 w-3.5 text-mist" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rangeOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => toast.success("Analytics exported (XLSX)")}>
              <Download className="h-4 w-4 text-mist" /> Export
            </Button>
          </>
        }
      />

      {/* headline KPIs */}
      <FadeUp>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Devices sanitized", value: 45231, suffix: "", tone: "#2563EB" },
            { label: "Certificates issued", value: 18450, suffix: "", tone: "#8B5CF6" },
            { label: "CO₂e saved", value: 342, suffix: " t", tone: "#22C55E" },
            { label: "Avg wipe time", value: 4.6, suffix: " min", tone: "#F59E0B", decimals: 1 },
          ].map((k, i) => (
            <motion.div key={k.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }} className="rounded-3xl border border-ink/6 bg-white p-4 shadow-card">
              <p className="text-[12px] font-medium text-mist">{k.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight" style={{ color: k.tone }}>
                <CountUp value={k.value} suffix={k.suffix} decimals={k.decimals ?? 0} />
              </p>
            </motion.div>
          ))}
        </div>
      </FadeUp>

      {/* row 1 */}
      <div className="grid gap-5 lg:grid-cols-3">
        <FadeUp delay={0.06} className="lg:col-span-2">
          <ChartCard title="Fleet throughput" desc="Wiped vs certified per month" action={<Badge variant="success"><TrendingUp className="h-3 w-3" /> +18% YoY</Badge>} className="h-full">
            <TrendAreaChart data={WIPE_MONTHLY} xKey="month" series={[{ key: "wiped", color: "#2563EB" }, { key: "certified", color: "#22C55E" }]} config={wipeConfig} height={260} />
          </ChartCard>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ChartCard title="Storage types" desc="Capacity media distribution" className="h-full">
            <DonutChart data={STORAGE_DIST} config={storageConfig} height={160} center={<div className="text-center"><p className="text-xl font-semibold text-ink">44%</p><p className="text-[9px] font-semibold uppercase tracking-widest text-mist">NVMe</p></div>} />
            <div className="mt-2 grid grid-cols-2 gap-2">
              {STORAGE_DIST.map((d) => (
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

      {/* row 2 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <FadeUp delay={0.05}>
          <ChartCard title="Compliance trajectory" desc="Score vs target · trailing 12 months" className="h-full">
            <MultiLineChart data={COMPLIANCE_TREND} xKey="month" lines={[{ key: "score", color: "#0EA5E9" }, { key: "target", color: "#CBD5E1" }]} config={complianceConfig} height={220} />
          </ChartCard>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ChartCard title="Carbon saved" desc="Monthly CO₂e avoided (tonnes)" className="h-full">
            <TrendAreaChart data={CARBON_MONTHLY} xKey="month" series={[{ key: "saved", color: "#22C55E" }]} config={carbonConfig} height={220} />
          </ChartCard>
        </FadeUp>
      </div>

      {/* row 3 */}
      <div className="grid gap-5 lg:grid-cols-3">
        <FadeUp delay={0.04}>
          <ChartCard title="Department distribution" desc="Asset concentration">
            <BarTrendChart data={DEPT_DIST} xKey="name" bars={[{ key: "value", color: "#2563EB" }]} config={deptConfig} height={200} />
          </ChartCard>
        </FadeUp>
        <FadeUp delay={0.08}>
          <ChartCard title="Device age bands" desc="Fleet age profile">
            <BarTrendChart
              data={DEVICE_AGE_BANDS}
              xKey="band"
              bars={[{ key: "count", color: "#2563EB" }]}
              config={{ count: { label: "Devices", color: "#2563EB" } }}
              cellFills={DEVICE_AGE_BANDS.map((b) => b.fill)}
              height={200}
            />
          </ChartCard>
        </FadeUp>
        <FadeUp delay={0.12}>
          <ChartCard title="Risk distribution" desc="Estate risk posture">
            <DonutChart data={RISK_DIST} config={{}} height={140} center={<div className="text-center"><p className="text-xl font-semibold text-ink">2.4k</p><p className="text-[9px] font-semibold uppercase tracking-widest text-mist">assets</p></div>} />
            <div className="mt-2 grid grid-cols-2 gap-2">
              {RISK_DIST.map((d) => (
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

      {/* row 4 — forecast & daily */}
      <div className="grid gap-5 lg:grid-cols-2">
        <FadeUp delay={0.05}>
          <ChartCard title="Wipe forecast" desc="Actual vs projected throughput" action={<Badge variant="info">AI projection</Badge>} className="h-full">
            <MultiLineChart data={WIPE_FORECAST} xKey="month" lines={[{ key: "actual", color: "#2563EB" }, { key: "forecast", color: "#8B5CF6" }]} config={forecastConfig} height={220} />
          </ChartCard>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ChartCard title="Daily operations" desc="Last 30 days" className="h-full">
            <BarTrendChart data={DAILY_WIPES} xKey="day" bars={[{ key: "wiped", color: "#2563EB" }, { key: "certified", color: "#22C55E" }]} config={dailyConfig} height={220} />
          </ChartCard>
        </FadeUp>
      </div>

      {/* quarterly table */}
      <FadeUp>
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between p-5">
            <div>
              <h3 className="text-sm font-semibold text-ink">Quarterly performance</h3>
              <p className="text-xs text-mist">Wipes, recycling and carbon by quarter</p>
            </div>
            <Badge variant="success">+23% QoQ</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cloud/60">
                <tr>
                  {["Quarter", "Wipes", "Recycled", "CO₂e saved (t)"].map((h) => (
                    <th key={h} className="h-10 px-5 text-left text-xs font-semibold uppercase tracking-wider text-mist">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {QUARTERLY_PERFORMANCE.map((q) => (
                  <tr key={q.quarter} className="transition-colors hover:bg-cloud/40">
                    <td className="px-5 py-3 font-semibold text-ink">{q.quarter}</td>
                    <td className="px-5 py-3 text-mist"><CountUp value={q.wipes} /></td>
                    <td className="px-5 py-3 text-mist"><CountUp value={q.recycled} /></td>
                    <td className="px-5 py-3 font-medium text-success-600">{q.carbon} t</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeUp>
    </div>
  );
}