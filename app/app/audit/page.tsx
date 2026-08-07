"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  Fingerprint,
  Lock,
  ScrollText,
  Search,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Input } from "@/components/app-ui/input";
import { Card } from "@/components/app-ui/card";
import { Badge } from "@/components/app-ui/badge";
import { Avatar, AvatarFallback } from "@/components/app-ui/avatar";
import { Pagination } from "@/components/app/Pagination";
import { EmptyState } from "@/components/app/SectionHeading";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/app-ui/select";
import { useApp } from "@/components/providers/AppProvider";
import { fmtDateTime, initials, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AuditEntry } from "@/lib/mock/types";

const PAGE_SIZE = 8;
const CATEGORY_OPTIONS = ["All", "auth", "asset", "wipe", "certificate", "compliance", "system", "recycling"];
const OUTCOME_OPTIONS = ["All", "success", "warning", "error"];

const OUTCOME_META: Record<string, { cls: string; Icon: typeof CheckCircle2; label: string }> = {
  success: { cls: "bg-success-50 text-success-600 ring-success-100", Icon: CheckCircle2, label: "Success" },
  warning: { cls: "bg-amber-50 text-amber-600 ring-amber-100", Icon: ShieldAlert, label: "Warning" },
  error: { cls: "bg-rose-50 text-rose-600 ring-rose-100", Icon: XCircle, label: "Error" },
};

const CATEGORY_COLOR: Record<string, string> = {
  auth: "bg-primary-50 text-primary-700 ring-primary-100",
  asset: "bg-sky-50 text-sky-700 ring-sky-100",
  wipe: "bg-violet-50 text-violet-700 ring-violet-100",
  certificate: "bg-success-50 text-success-700 ring-success-100",
  compliance: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  system: "bg-slate-100 text-slate-600 ring-slate-200",
  recycling: "bg-amber-50 text-amber-700 ring-amber-100",
};

export default function AuditLogsPage() {
  const { auditLogs } = useApp();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [outcome, setOutcome] = React.useState("All");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    return auditLogs.filter((e) => {
      const q = query.toLowerCase();
      const matchQ = !q || e.actor.toLowerCase().includes(q) || e.action.toLowerCase().includes(q) || (e.target ?? "").toLowerCase().includes(q) || e.ip.toLowerCase().includes(q);
      const matchC = category === "All" || e.category === category;
      const matchO = outcome === "All" || e.outcome === outcome;
      return matchQ && matchC && matchO;
    });
  }, [auditLogs, query, category, outcome]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Immutable trail"
        title="Audit Logs"
        desc="Every action, wipe and signature is recorded immutably — tamper-evident and exportable."
        actions={
          <Button variant="outline" onClick={() => toast.success("Audit trail exported (PDF)")}>
            <Download className="h-4 w-4 text-mist" /> Export trail
          </Button>
        }
      />

      {/* integrity banner */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-success-200 bg-gradient-to-r from-success-50/70 to-white p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success-100 text-success-600 ring-1 ring-success-200">
              <Fingerprint className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Chain of custody intact</p>
              <p className="text-xs text-mist">Records signed with SHA-256 · last verified {timeAgo(new Date().toISOString())}</p>
            </div>
          </div>
          <Badge variant="success"><Lock className="h-3 w-3" /> Immutable</Badge>
        </div>
      </motion.div>

      {/* filters */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
          <Input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search actor, action, target, IP…" className="pl-10" />
        </div>
        <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1); }}>
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {CATEGORY_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o === "All" ? "All categories" : o}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={outcome} onValueChange={(v) => { setOutcome(v); setPage(1); }}>
          <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {OUTCOME_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o === "All" ? "All outcomes" : o}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* timeline */}
      {rows.length === 0 ? (
        <EmptyState icon={<ScrollText className="h-6 w-6" />} title="No audit records" desc="Try a different filter to find entries." />
      ) : (
        <div className="relative">
          <div className="absolute bottom-4 left-[23px] top-4 w-px bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100" />
          <div className="space-y-3">
            {rows.map((e, i) => {
              const meta = OUTCOME_META[e.outcome];
              const Icon = meta.Icon;
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.03 * i, duration: 0.35 }}
                  className="relative flex gap-4 pl-0"
                >
                  <span className={cn("relative z-10 mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-4 ring-white", meta.cls)}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <Card className="flex-1 p-4 transition-shadow hover:shadow-lift">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback style={{ background: "#E2E8F0", color: "#334155" }}>{e.role === "system" ? <Fingerprint className="h-4 w-4" /> : initials(e.actor)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-[13px] font-semibold text-ink">{e.actor} <span className="font-normal text-mist">· {e.role}</span></p>
                          <p className="text-[11px] text-mist">{fmtDateTime(e.timestamp)} · IP {e.ip}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold ring-1", CATEGORY_COLOR[e.category] ?? "bg-slate-100 text-slate-600")}>
                          {e.category}
                        </span>
                        <Badge variant={e.outcome === "success" ? "success" : e.outcome === "warning" ? "warning" : "danger"} className="px-2 py-0 text-[10px]">{meta.label}</Badge>
                      </div>
                    </div>
                    <p className="mt-2 text-[13px] text-ink">{e.action}</p>
                    {e.target ? (
                      <p className="mt-1 font-mono text-[11px] text-primary-600">→ {e.target}</p>
                    ) : null}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      <Pagination page={safePage} pages={pages} onPage={setPage} total={filtered.length} />
    </div>
  );
}