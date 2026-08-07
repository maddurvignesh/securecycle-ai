"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Award,
  BadgeCheck,
  BarChart3,
  Calendar,
  Download,
  Eye,
  FileText,
  FileSpreadsheet,
  FileStack,
  HardDrive,
  History,
  Plus,
  Recycle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Card } from "@/components/app-ui/card";
import { Badge } from "@/components/app-ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/app-ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/app-ui/select";
import { REPORT_TEMPLATES, REPORT_RECENT, REPORT_INSIGHTS } from "@/lib/mock/reports";
import { fmtDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ReportTemplate } from "@/lib/mock/types";

const ICONS: Record<string, typeof FileText> = {
  shield: ShieldCheck,
  harddrive: HardDrive,
  alert: AlertTriangle,
  cert: BadgeCheck,
  history: History,
  recycle: Recycle,
};

const CATEGORY_VARIANT: Record<string, "success" | "info" | "warning" | "violet" | "secondary" | "default"> = {
  Compliance: "success",
  Asset: "info",
  Risk: "warning",
  Certificate: "violet",
  Audit: "secondary",
  Recycling: "default",
};

export default function ReportsPage() {
  const [preview, setPreview] = React.useState<ReportTemplate | null>(null);
  const [genOpen, setGenOpen] = React.useState(false);
  const [genCategory, setGenCategory] = React.useState("Compliance");

  const generate = () => {
    toast.success(`${genCategory} report generated — ready for preview`);
    setGenOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Documentation & export"
        title="Reports"
        desc="Generate auditor-ready reports in PDF or Excel — one click from live data."
        actions={
          <Button onClick={() => setGenOpen(true)}>
            <Plus className="h-4 w-4" /> Generate report
          </Button>
        }
      />

      {/* insights */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {REPORT_INSIGHTS.map((r, i) => (
          <motion.div key={r.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="rounded-3xl border border-ink/6 bg-white p-4 shadow-card">
            <p className="text-[11px] font-medium uppercase tracking-wider text-mist">{r.label}</p>
            <p className={cn("mt-1 text-[15px] font-semibold", r.tone === "green" && "text-success-600", r.tone === "blue" && "text-primary-600", r.tone === "amber" && "text-amber-600")}>{r.value}</p>
          </motion.div>
        ))}
      </div>

      {/* templates */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">Report templates</h2>
          <span className="text-[11px] text-mist">{REPORT_TEMPLATES.length} available</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {REPORT_TEMPLATES.map((r, i) => {
            const Icon = ICONS[r.icon] ?? FileText;
            return (
              <motion.div key={r.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
                <Card className="group flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift">
                  <div className="flex items-start justify-between">
                    <span className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ring-ink/5",
                      r.category === "Compliance" && "bg-success-50 text-success-600",
                      r.category === "Asset" && "bg-primary-50 text-primary-600",
                      r.category === "Risk" && "bg-amber-50 text-amber-600",
                      r.category === "Certificate" && "bg-violet-50 text-violet-600",
                      r.category === "Audit" && "bg-sky-50 text-sky-600",
                      r.category === "Recycling" && "bg-emerald-50 text-emerald-600"
                    )}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <Badge variant={CATEGORY_VARIANT[r.category]}>{r.category}</Badge>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-ink group-hover:text-primary-700">{r.name}</p>
                  <p className="mt-1 flex-1 text-[12px] leading-relaxed text-mist">{r.desc}</p>
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-mist">
                    <span className="flex items-center gap-1"><FileStack className="h-3.5 w-3.5" /> {r.pages} pages</span>
                    <span className="flex items-center gap-1"><BarChart3 className="h-3.5 w-3.5" /> {r.size}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {r.updated}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-1.5">
                    <Button size="sm" variant="outline" onClick={() => setPreview(r)}><Eye className="h-3.5 w-3.5" /> Preview</Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success(`${r.name} exported as PDF`)}><Download className="h-3.5 w-3.5" /> PDF</Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success(`${r.name} exported as Excel`)}><FileSpreadsheet className="h-3.5 w-3.5" /> Excel</Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* recent exports */}
      <Card className="overflow-hidden p-0">
        <div className="p-5">
          <h3 className="text-sm font-semibold text-ink">Recent exports</h3>
          <p className="text-xs text-mist">Last generated documents from your workspace</p>
        </div>
        <div className="divide-y divide-slate-100">
          {REPORT_RECENT.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-cloud/40">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cloud text-primary-500">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13px] font-medium text-ink">{r.title}</p>
                  <p className="text-[11px] text-mist">Exported by {r.exportedBy} · {fmtDateTime(r.exportedAt)} · {r.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={CATEGORY_VARIANT[r.category] ?? "secondary"}>{r.category}</Badge>
                <Button size="sm" variant="ghost" onClick={() => toast.success("Re-downloaded " + r.title)}><Download className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* preview dialog */}
      <Dialog open={!!preview} onOpenChange={(v) => !v && setPreview(null)}>
        {preview && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{preview.name}</DialogTitle>
              <DialogDescription>{preview.desc}</DialogDescription>
            </DialogHeader>
            <div className="rounded-2xl border border-ink/8 bg-cloud/50 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-500 shadow-card">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{preview.name}.pdf</p>
                  <p className="text-[11px] text-mist">{preview.pages} pages · {preview.size} · Updated {preview.updated}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["Executive summary", "Overall posture & highlights"],
                  ["Sections", "KPI · detail · appendices"],
                  ["Charts", `${Math.min(6, preview.pages)} embedded visuals`],
                  ["Export", "PDF · Excel · CSV"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-white p-3 ring-1 ring-ink/6">
                    <p className="text-[11px] font-semibold text-ink">{k}</p>
                    <p className="text-[11px] text-mist">{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreview(null)}>Close</Button>
              <Button onClick={() => { toast.success(`${preview.name} downloaded (PDF)`); setPreview(null); }}>
                <Download className="h-4 w-4" /> Download PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* generate dialog */}
      <Dialog open={genOpen} onOpenChange={setGenOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate report</DialogTitle>
            <DialogDescription>Choose a report type — data is pulled live from your workspace.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-ink">Report type</p>
              <Select value={genCategory} onValueChange={setGenCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(CATEGORY_VARIANT).map((c) => <SelectItem key={c} value={c}>{c} report</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-primary-50/60 p-3 text-[12px] text-primary-700 ring-1 ring-primary-100">
              <Sparkles className="h-4 w-4 shrink-0" />
              AI will summarize findings, embed live charts and format the document for auditors.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGenOpen(false)}>Cancel</Button>
            <Button onClick={generate}><Award className="h-4 w-4" /> Generate now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}