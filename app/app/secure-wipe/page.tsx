"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileSearch,
  Fingerprint,
  ListChecks,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Square,
  Trash2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Card } from "@/components/app-ui/card";
import { Badge } from "@/components/app-ui/badge";
import { Progress } from "@/components/app-ui/progress";
import { DeviceGlyph } from "@/components/app/DeviceGlyph";
import { RiskBadge, StatusBadge } from "@/components/platform/shared";
import { useApp } from "@/components/providers/AppProvider";
import { WIPE_STANDARDS } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import type { Asset, WipeStandard } from "@/lib/mock/types";

type Phase = "idle" | "scanning" | "analyzing" | "overwriting" | "verification" | "completed";

const PHASE_META: Record<Phase, { label: string; step: number; total: number }> = {
  idle: { label: "Ready", step: 0, total: 5 },
  scanning: { label: "Scanning sectors", step: 1, total: 5 },
  analyzing: { label: "AI analyzing data", step: 2, total: 5 },
  overwriting: { label: "Overwriting", step: 3, total: 5 },
  verification: { label: "Verifying", step: 4, total: 5 },
  completed: { label: "Completed", step: 5, total: 5 },
};

const PHASE_DURATION: Record<Phase, number> = {
  idle: 0,
  scanning: 2400,
  analyzing: 2800,
  overwriting: 4200,
  verification: 2400,
  completed: 0,
};

const PHASE_COLOR: Record<Phase, string> = {
  idle: "#94A3B8",
  scanning: "#38BDF8",
  analyzing: "#8B5CF6",
  overwriting: "#F59E0B",
  verification: "#22C55E",
  completed: "#22C55E",
};

const LOG_LINES: Record<Phase, string[]> = {
  idle: [],
  scanning: [
    "> Boot secure kernel 4.6.2 …",
    "> Mount read-only image (RO) …",
    "> Enum LBA map · 1,048,576 sectors …",
    "> Sector readback: 0 defects · 0 retries",
    "> Signature bloom filter loaded (300+ formats)",
  ],
  analyzing: [
    "> AI classifier · confidence 98.7%",
    "> Sensitive remnants: 184 files",
    "> Categories: payroll · hr · credentials · 3 more",
    "> Residual risk before purge: 0.63",
    "> Recommend NIST 800-88 Rev.1 Purge",
  ],
  overwriting: [
    "> Pass 1/3 · pattern 0x00 write … 100%",
    "> Pass 2/3 · pattern 0xFF write … 100%",
    "> Pass 3/3 · cryptographically seeded … 100%",
    "> TRIM confirm · NVMe dealloc complete",
    "> NAND remap cleared · wear-leveling tables reset",
  ],
  verification: [
    "> Sampling 2.4% of logical blocks …",
    "> Readback verify: 0 residual bytes",
    "> Hash digest: 3f9a…c112 ✓",
    "> Integrity score 99.8%",
    "> Sealing certificate signature …",
  ],
  completed: [
    "> Wipe verified · zero recoverable data",
    "> Certificate SC-26X-00008912 generated",
    "> Immutable record stored · chain-of-custody intact",
    "> Device ready for certification & resale",
  ],
};

export default function SecureWipePage() {
  const { assets, completeWipe, cancelWipe, pushNotification, logAudit } = useApp();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [standardId, setStandardId] = React.useState<string>("nist");
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [progress, setProgress] = React.useState(0);
  const [log, setLog] = React.useState<string[]>([]);
  const [ring, setRing] = React.useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const pendingAssets = assets.filter((a) => a.status === "Pending Wipe" || a.status === "Wiping" || a.status === "Wiped");
  const selected = assets.find((a) => a.id === selectedId) ?? null;
  const standard = WIPE_STANDARDS.find((s) => s.id === standardId) ?? WIPE_STANDARDS[0];

  const stop = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startWipe = () => {
    if (!selected) {
      toast.error("Select an asset to begin");
      return;
    }
    stop();
    setPhase("scanning");
    setLog([]);
    setProgress(0);
    setRing(0);
    logAudit({ actor: "Priya Sharma", role: "IT Manager", action: "Started secure wipe", target: selected.serial, category: "wipe", outcome: "success" });
  };

  const cancel = () => {
    stop();
    setPhase("idle");
    setProgress(0);
    setRing(0);
    setLog([]);
    if (selected) {
      cancelWipe(selected.id);
      toast.info("Wipe aborted — device returned to queue");
    }
  };

  const clearLogs = () => setLog([]);

  // progress simulation
  React.useEffect(() => {
    if (phase === "idle" || phase === "completed") return;
    const duration = PHASE_DURATION[phase];
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(t * 100));
      setRing(t * 100);
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        const next: Record<Phase, Phase> = {
          idle: "idle",
          scanning: "analyzing",
          analyzing: "overwriting",
          overwriting: "verification",
          verification: "completed",
          completed: "completed",
        };
        setPhase(next[phase]);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // stream logs
  React.useEffect(() => {
    if (phase === "idle") return;
    const lines = LOG_LINES[phase];
    if (!lines.length) return;
    let i = 0;
    const int = setInterval(() => {
      if (i < lines.length) {
        setLog((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(int);
      }
    }, 380);
    return () => clearInterval(int);
  }, [phase]);

  // completion side-effects
  React.useEffect(() => {
    if (phase !== "completed" || !selected) return;
    completeWipe(selected.id, { standard: standard.name, technician: "Priya Sharma", zeroedGB: 512 });
    toast.success("Wipe verified — certificate issued");
    pushNotification({
      title: `Wipe completed — ${selected.name}`,
      body: `Erasure verified under ${standard.name}. Certificate ready for download.`,
      severity: "success",
      category: "Secure Wipe",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const stepDone = (idx: number) => phase !== "idle" && PHASE_META[phase].step > idx;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sanitization console"
        title="Secure Wipe"
        desc="Cryptographically verified data destruction on enterprise standards. Nothing survives."
        actions={
          <Button variant="outline" onClick={clearLogs}>
            <RefreshCw className="h-4 w-4 text-mist" /> Reset console
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        {/* ------------------------- LEFT: setup ------------------------- */}
        <div className="space-y-6">
          {/* step 1 — asset */}
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">1</span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">Select asset</h3>
                  <p className="text-xs text-mist">Devices queued for sanitization</p>
                </div>
              </div>
              <Badge variant="warning">{pendingAssets.length} in queue</Badge>
            </div>

            <div className="max-h-[340px] space-y-2 overflow-y-auto pr-1">
              {pendingAssets.map((a) => {
                const active = a.id === selectedId;
                return (
                  <button
                    key={a.id}
                    onClick={() => {
                      setSelectedId(a.id);
                      setPhase("idle");
                      setLog([]);
                      setProgress(0);
                      setRing(0);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200",
                      active ? "border-primary-400 bg-primary-50/60 shadow-card" : "border-ink/6 bg-white hover:border-primary-200 hover:bg-cloud/50"
                    )}
                  >
                    <DeviceGlyph type={a.assetType} color={a.color} size="sm" beam={active} />
                    <div className="min-w-0 flex-1">
                      <p className={cn("truncate text-[13px] font-semibold", active ? "text-primary-700" : "text-ink")}>{a.name}</p>
                      <p className="font-mono text-[11px] text-mist">{a.serial} · {a.capacity}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <RiskBadge level={a.riskLevel} score={a.riskScore} />
                      <StatusBadge status={a.status} />
                    </div>
                    {active && <ChevronRight className="h-4 w-4 shrink-0 text-primary-500" />}
                  </button>
                );
              })}
              {pendingAssets.length === 0 && (
                <p className="rounded-2xl bg-cloud px-4 py-6 text-center text-sm text-mist">All devices sanitized. Great work!</p>
              )}
            </div>
          </Card>

          {/* step 2 — standard */}
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">2</span>
              <div>
                <h3 className="text-sm font-semibold text-ink">Choose standard</h3>
                <p className="text-xs text-mist">Select the sanitization methodology</p>
              </div>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {WIPE_STANDARDS.map((s) => {
                const active = s.id === standardId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setStandardId(s.id)}
                    className={cn(
                      "rounded-2xl border p-3.5 text-left transition-all duration-200",
                      active ? "border-success-500 bg-success-50/50 shadow-card" : "border-ink/6 hover:border-success-200"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn("text-[13px] font-semibold", active ? "text-success-700" : "text-ink")}>{s.name}</span>
                      {active && <CheckCircle2 className="h-4 w-4 text-success-500" />}
                    </div>
                    <p className="mt-1 text-[11px] leading-snug text-mist">{s.desc}</p>
                    <div className="mt-2 flex items-center gap-2 text-[10px] font-medium text-mist">
                      <Badge variant={s.recommended ? "success" : "secondary"} className="px-1.5 py-0">{s.passes}</Badge>
                      <span>{s.timeframe}</span>
                    </div>
                    {s.recommended && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary-600">
                        <Sparkles className="h-3 w-3" /> Recommended by AI
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* AI reasoning */}
            <div className="mt-4 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/70 to-primary-50/40 p-4">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-violet-700">
                <Sparkles className="h-4 w-4" /> AI recommendation
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-mist">
                {selected
                  ? `Based on ${selected.storageType}, "${selected.classification}" classification and encryption status "${selected.encryptionStatus}", the AI recommends ${standard.fullName}. Estimated time ${standard.timeframe} with integrity target ≥ 99%.`
                  : "Select a device to see a tailored recommendation from the risk engine."}
              </p>
            </div>
          </Card>

          {/* launch */}
          <Card className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1" onClick={startWipe} disabled={!selected || (phase !== "idle" && phase !== "completed")}>
                {phase === "idle" || phase === "completed" ? (
                  <>
                    <Play className="h-4 w-4" /> Start {standard.name} wipe
                  </>
                ) : (
                  <>
                    <Activity className="h-4 w-4 animate-pulse" /> Wiping in progress…
                  </>
                )}
              </Button>
              {phase !== "idle" && phase !== "completed" && (
                <Button size="lg" variant="destructive" onClick={cancel}>
                  <Square className="h-4 w-4" /> Abort
                </Button>
              )}
            </div>
            <p className="mt-3 text-center text-[11px] text-mist">
              Wipes are cryptographically seeded, verified sector-by-sector and logged immutably.
            </p>
          </Card>
        </div>

        {/* ------------------------- RIGHT: console ------------------------- */}
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-ink/6 px-5 py-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                {phase !== "idle" && phase !== "completed" && (
                  <span className="absolute h-full w-full animate-ping rounded-full bg-primary-400 opacity-60" />
                )}
                <span className={cn("relative h-2.5 w-2.5 rounded-full", phase === "completed" ? "bg-success-500" : phase === "idle" ? "bg-slate-300" : "bg-primary-500")} />
              </span>
              <p className="text-sm font-semibold text-ink">Wipe console</p>
            </div>
            <div className="flex items-center gap-1.5">
              {["bg-rose-400", "bg-amber-400", "bg-success-400"].map((c) => (
                <span key={c} className={cn("h-2.5 w-2.5 rounded-full opacity-80", c)} />
              ))}
            </div>
          </div>

          {/* device strip */}
          <div className="flex items-center gap-3 border-b border-ink/6 bg-cloud/50 px-5 py-3.5">
            {selected ? (
              <>
                <DeviceGlyph type={selected.assetType} color={selected.color} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">{selected.name}</p>
                  <p className="font-mono text-[11px] text-mist">{selected.serial} · {selected.capacity} {selected.storageType}</p>
                </div>
                <Badge variant="outline">{standard.name}</Badge>
              </>
            ) : (
              <p className="text-[13px] text-mist">No device selected — choose an asset on the left to begin.</p>
            )}
          </div>

          {/* phase stepper */}
          <div className="grid grid-cols-5 gap-1 px-5 pt-4">
            {(["scanning", "analyzing", "overwriting", "verification", "completed"] as Phase[]).map((p, i) => {
              const meta = PHASE_META[p];
              const done = stepDone(i);
              const isCurrent = PHASE_META[phase].step === i + 1;
              return (
                <div key={p} className="flex flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ring-2 transition-all",
                      done || phase === p ? "bg-success-500 text-white ring-success-200" : isCurrent ? "bg-primary-500 text-white ring-primary-200" : "bg-slate-100 text-mist ring-slate-100"
                    )}
                  >
                    {done || phase === p ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span className={cn("text-[9px] font-semibold uppercase tracking-wide", isCurrent || done ? "text-ink" : "text-mist/60")}>
                    {meta.label.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ring + status */}
          <div className="flex flex-col items-center px-5 py-6">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#EEF2F7" strokeWidth="9" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke={PHASE_COLOR[phase]}
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={`${(ring / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                  style={{ filter: `drop-shadow(0 0 8px ${PHASE_COLOR[phase]}55)`, transition: "stroke-dasharray 120ms linear" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {phase === "completed" ? (
                  <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-100 text-success-600">
                      <BadgeCheck className="h-8 w-8" />
                    </span>
                  </motion.div>
                ) : phase === "idle" ? (
                  <Fingerprint className="h-10 w-10 text-slate-300" />
                ) : (
                  <div className="text-center">
                    <p className="text-3xl font-semibold tracking-tight text-ink">{Math.round(ring)}%</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">{PHASE_META[phase].label}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 w-full">
              <Progress value={progress} className="h-2.5" indicatorClassName={phase === "verification" || phase === "completed" ? "bg-gradient-to-r from-success-500 to-success-400" : undefined} />
              <div className="mt-2 flex items-center justify-between text-[11px] text-mist">
                <span>{PHASE_META[phase].label}</span>
                <span>Phase {PHASE_META[phase].step}/{PHASE_META[phase].total}</span>
              </div>
            </div>
          </div>

          {/* logs */}
          <div className="mx-5 mb-5 overflow-hidden rounded-2xl border border-ink/8 bg-[#0B1220]">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                <TerminalIcon /> Live log
              </span>
              <span className="font-mono text-[10px] text-white/40">tty0 · secure shell</span>
            </div>
            <div className="h-48 space-y-1 overflow-y-auto px-4 py-3 font-mono text-[11px] leading-relaxed">
              {log.length === 0 && phase === "idle" ? (
                <p className="text-white/35">Awaiting wipe initialization…</p>
              ) : (
                log.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      i === log.length - 1 && phase !== "completed" ? "text-primary-300" : "text-white/60"
                    )}
                  >
                    {line}
                    {i === log.length - 1 && phase !== "completed" && phase !== "idle" && (
                      <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-primary-400 align-middle" />
                    )}
                  </motion.p>
                ))
              )}
              {phase === "completed" && (
                <div className="flex items-center gap-2 pt-1 text-success-400">
                  <BadgeCheck className="h-3.5 w-3.5" /> ERASURE VERIFIED — 0 RECOVERABLE BYTES
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  function TerminalIcon() {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    );
  }
}