"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  Clock,
  FileSearch,
  Gauge,
  ListChecks,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Card } from "@/components/app-ui/card";
import { Badge } from "@/components/app-ui/badge";
import { Progress } from "@/components/app-ui/progress";
import { CountUp } from "@/components/app/CountUp";
import { EmptyState } from "@/components/app/SectionHeading";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/app-ui/tabs";
import { COMPLIANCE_FRAMEWORKS, COMPLIANCE_CONTROLS, COMPLIANCE_RECOMMENDATIONS, MISSING_CONTROLS } from "@/lib/mock/compliance";
import { cn } from "@/lib/utils";
import type { ComplianceFramework } from "@/lib/mock/types";

const accentMap: Record<string, { chip: string; text: string; bar: string }> = {
  blue: { chip: "bg-primary-50 text-primary-700", text: "text-primary-600", bar: "from-primary-600 to-primary-400" },
  green: { chip: "bg-success-50 text-success-700", text: "text-success-600", bar: "from-success-600 to-success-400" },
  violet: { chip: "bg-violet-50 text-violet-700", text: "text-violet-600", bar: "from-violet-600 to-violet-400" },
  amber: { chip: "bg-amber-50 text-amber-700", text: "text-amber-600", bar: "from-amber-500 to-amber-400" },
};

const statusVariant: Record<string, "success" | "warning" | "danger" | "info"> = {
  "Compliant": "success",
  "Monitoring": "info",
  "At Risk": "warning",
  "Non-compliant": "danger",
};

export default function CompliancePage() {
  const [tab, setTab] = React.useState("overview");
  const overall = Math.round(COMPLIANCE_FRAMEWORKS.reduce((s, f) => s + f.score, 0) / COMPLIANCE_FRAMEWORKS.length);
  const totalControls = COMPLIANCE_FRAMEWORKS.reduce((s, f) => s + f.controls.total, 0);
  const passedControls = COMPLIANCE_FRAMEWORKS.reduce((s, f) => s + f.controls.passed, 0);
  const failedControls = COMPLIANCE_FRAMEWORKS.reduce((s, f) => s + f.controls.failed, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Governance & assurance"
        title="Compliance Center"
        desc="Real-time posture across NIST, ISO 27001, GDPR and HIPAA — with auditable evidence for every control."
        actions={
          <Button variant="outline" onClick={() => toast.success("Compliance scan queued")}>
            <FileSearch className="h-4 w-4 text-primary-600" /> Run assessment
          </Button>
        }
      />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="overview"><Gauge className="h-4 w-4" /> Overview</TabsTrigger>
          <TabsTrigger value="controls"><ListChecks className="h-4 w-4" /> Controls</TabsTrigger>
          <TabsTrigger value="gaps"><AlertTriangle className="h-4 w-4" /> Gaps & recommendations</TabsTrigger>
        </TabsList>

        {/* ---------- overview ---------- */}
        <TabsContent value="overview" className="space-y-6">
          {/* score banner */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="relative overflow-hidden p-6">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-success-100/50 blur-3xl" />
              <div className="flex flex-wrap items-center gap-8">
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full" style={{ background: `conic-gradient(#22C55E ${overall * 3.6}deg, #EEF2F7 0deg)` }}>
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                      <span className="text-3xl font-semibold tracking-tight text-ink"><CountUp value={overall} decimals={1} suffix="%" /></span>
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-mist">Score</span>
                    </div>
                  </div>
                </div>
                <div className="min-w-[220px] flex-1">
                  <h2 className="text-lg font-semibold tracking-tight text-ink">Overall compliance posture</h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-mist">
                    {passedControls} of {totalControls} controls passing across {COMPLIANCE_FRAMEWORKS.length} frameworks.
                    {failedControls > 0 ? ` ${failedControls} failed controls need remediation.` : " No failed controls — exceptional."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="success"><CheckCircle2 className="h-3 w-3" /> {passedControls} passed</Badge>
                    <Badge variant="danger"><XCircle className="h-3 w-3" /> {failedControls} failed</Badge>
                    <Badge variant="secondary"><Clock className="h-3 w-3" /> {totalControls - passedControls - failedControls} pending</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="flex items-center gap-1.5 text-[11px] text-mist"><CalendarClock className="h-3.5 w-3.5" /> Next external audit</p>
                  <p className="mt-1 text-lg font-semibold text-ink">November 2026</p>
                  <p className="text-[11px] text-mist">Certified · SOC 2 Type II</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* framework cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {COMPLIANCE_FRAMEWORKS.map((f, i) => (
              <FrameworkCard key={f.id} f={f} index={i} />
            ))}
          </div>
        </TabsContent>

        {/* ---------- controls ---------- */}
        <TabsContent value="controls">
          <Card className="overflow-hidden p-0">
            {COMPLIANCE_CONTROLS.length === 0 ? (
              <div className="p-6"><EmptyState icon={<ListChecks className="h-6 w-6" />} title="No controls" desc="No controls match the current view." /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-cloud/60">
                    <tr>
                      {["Control", "Framework", "Status", "Evidence", "Owner", "Updated"].map((h) => (
                        <th key={h} className="h-11 px-4 text-left text-xs font-semibold uppercase tracking-wider text-mist">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {COMPLIANCE_CONTROLS.map((c) => (
                      <tr key={c.id} className="transition-colors hover:bg-cloud/50">
                        <td className="px-4 py-3.5">
                          <p className="font-mono text-[11px] text-primary-600">{c.control}</p>
                          <p className="text-[13px] font-medium text-ink">{c.title}</p>
                        </td>
                        <td className="px-4 py-3.5"><Badge variant="outline">{c.framework}</Badge></td>
                        <td className="px-4 py-3.5">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1",
                            c.status === "Passed" && "bg-success-50 text-success-700 ring-success-100",
                            c.status === "Failed" && "bg-rose-50 text-rose-700 ring-rose-100",
                            c.status === "Pending" && "bg-amber-50 text-amber-700 ring-amber-100",
                            c.status === "Not Applicable" && "bg-slate-50 text-slate-600 ring-slate-200"
                          )}>
                            {c.status === "Passed" ? <CheckCircle2 className="h-3 w-3" /> : c.status === "Failed" ? <XCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                            {c.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[12px] text-mist">{c.evidence}</td>
                        <td className="px-4 py-3.5 text-[13px] text-ink">{c.owner}</td>
                        <td className="px-4 py-3.5 text-[13px] text-mist">{c.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* ---------- gaps & recommendations ---------- */}
        <TabsContent value="gaps" className="space-y-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink">Recommendations</h3>
              <div className="space-y-3">
                {COMPLIANCE_RECOMMENDATIONS.map((r, i) => (
                  <motion.div key={r.id} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={cn("flex h-8 w-8 items-center justify-center rounded-xl", r.impact === "High" ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-500")}>
                            <AlertTriangle className="h-4 w-4" />
                          </span>
                          <p className="text-[13px] font-semibold text-ink">{r.title}</p>
                        </div>
                        <div className="flex gap-1.5">
                          <Badge variant={r.impact === "High" ? "danger" : "warning"}>Impact {r.impact}</Badge>
                          <Badge variant="secondary">Effort {r.effort}</Badge>
                        </div>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-mist">{r.desc}</p>
                      <p className="mt-2 font-mono text-[11px] text-primary-600">{r.controls}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink">Missing controls</h3>
              <Card className="divide-y divide-slate-100 p-0">
                {MISSING_CONTROLS.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[13px] font-medium text-ink">{m.title}</p>
                      <p className="text-[11px] text-mist">{m.framework} · {m.missing} control{m.missing > 1 ? "s" : ""} to implement</p>
                    </div>
                    <Badge variant="danger">{m.missing}</Badge>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FrameworkCard({ f, index }: { f: ComplianceFramework; index: number }) {
  const accent = accentMap[f.accent] ?? accentMap.blue;
  const passPct = Math.round((f.controls.passed / f.controls.total) * 100);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * index }}>
      <Card className="p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className={cn("flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ring-ink/5", accent.chip)}>
              <BadgeCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{f.name}</p>
              <p className="max-w-[240px] text-[11px] leading-snug text-mist">{f.fullName}</p>
            </div>
          </div>
          <span className="text-right">
            <p className={cn("text-2xl font-semibold tracking-tight", accent.text)}>{f.score}%</p>
            <Badge variant={statusVariant[f.status]}>{f.status}</Badge>
          </span>
        </div>

        <Progress value={f.score} className="mt-4 h-2" indicatorClassName={cn("bg-gradient-to-r", accent.bar)} />

        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          {[
            { label: "Total", v: f.controls.total, cls: "text-ink" },
            { label: "Passed", v: f.controls.passed, cls: "text-success-600" },
            { label: "Failed", v: f.controls.failed, cls: "text-rose-500" },
            { label: "Pending", v: f.controls.pending, cls: "text-amber-500" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-cloud/60 py-2">
              <p className={cn("text-base font-semibold", s.cls)}>{s.v}</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-mist">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-ink/6 pt-3 text-[11px] text-mist">
          <span>Last audit · {f.lastAudit}</span>
          <span className="flex items-center gap-1"><CalendarClock className="h-3 w-3" /> Next · {f.nextAudit}</span>
        </div>
      </Card>
    </motion.div>
  );
}