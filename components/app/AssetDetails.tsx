"use client";

import * as React from "react";
import {
  Activity,
  BadgeCheck,
  Calendar,
  Database,
  HardDrive,
  KeyRound,
  MapPin,
  Package,
  QrCode,
  ShieldCheck,
  User,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTitle } from "@/components/app-ui/sheet";
import { Badge } from "@/components/app-ui/badge";
import { Button } from "@/components/app-ui/button";
import { Separator } from "@/components/app-ui/separator";
import { DeviceGlyph } from "@/components/app/DeviceGlyph";
import { QrVisual } from "@/components/app/QrVisual";
import { RiskBar } from "@/components/app/RiskGauge";
import { Timeline } from "@/components/app/Timeline";
import { RiskBadge, StatusBadge, AssetIcon } from "@/components/platform/shared";
import { useApp } from "@/components/providers/AppProvider";
import { fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Asset } from "@/lib/mock/types";

export function AssetDetails({ asset, open, onOpenChange }: { asset: Asset | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  const { completeWipe, logAudit } = useApp();

  if (!asset) return null;

  const specs = [
    { label: "Serial number", value: asset.serial, icon: QrCode },
    { label: "Storage", value: `${asset.capacity} · ${asset.storageType}`, icon: Database },
    { label: "Manufacturer", value: `${asset.brand} · ${asset.model}`, icon: Package },
    { label: "Assigned to", value: asset.assignedTo, icon: User },
    { label: "Department", value: asset.department, icon: Activity },
    { label: "Location", value: asset.location, icon: MapPin },
    { label: "Warranty", value: asset.warranty, icon: Wrench },
    { label: "Purchased", value: String(asset.purchaseYear), icon: Calendar },
  ];

  const statusColor = (v: string) =>
    v === "Full Disk" || v === "Hardware"
      ? "bg-success-50 text-success-700 ring-success-100"
      : v === "File-level"
      ? "bg-amber-50 text-amber-700 ring-amber-100"
      : "bg-rose-50 text-rose-700 ring-rose-100";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-xl">
        <SheetTitle className="sr-only">{asset.name}</SheetTitle>

        {/* header */}
        <div className="relative overflow-hidden border-b border-ink/6 p-6">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{ background: `radial-gradient(circle at 20% 0%, ${asset.color}, transparent 55%)` }}
          />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <DeviceGlyph type={asset.assetType} color={asset.color} size="lg" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold tracking-tight text-ink">{asset.name}</h2>
                  <StatusBadge status={asset.status} />
                </div>
                <p className="mt-1 font-mono text-xs text-mist">{asset.serial}</p>
                <div className="mt-2 flex items-center gap-2">
                  <RiskBadge level={asset.riskLevel} score={asset.riskScore} />
                  <Badge variant="outline" className="px-2 py-0 text-[10px]">{asset.classification}</Badge>
                </div>
              </div>
            </div>
            <div className="hidden h-16 w-16 rounded-2xl bg-ink p-1.5 text-white sm:block" title="Asset QR">
              <QrVisual seed={asset.serial} className="text-white" />
            </div>
          </div>
          <div className="relative mt-5">
            <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium">
              <span className="text-mist">AI Risk score</span>
              <span className={cn("font-semibold", asset.riskScore > 70 ? "text-rose-600" : asset.riskScore > 40 ? "text-amber-600" : "text-success-600")}>
                {asset.riskScore}/100
              </span>
            </div>
            <RiskBar score={asset.riskScore} tone={asset.riskScore > 70 ? "#EF4444" : asset.riskScore > 40 ? "#F59E0B" : "#22C55E"} />
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* specs */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <HardDrive className="h-4 w-4 text-primary-500" /> Specifications
            </h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {specs.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cloud text-mist">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-mist">{s.label}</p>
                      <p className="truncate text-[13px] font-medium text-ink">{s.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <Separator />

          {/* security */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <ShieldCheck className="h-4 w-4 text-success-500" /> Security posture
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-ink/6 p-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-mist">Encryption</p>
                <span className={cn("mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1", statusColor(asset.encryptionStatus))}>
                  <KeyRound className="h-3 w-3" /> {asset.encryptionStatus}
                </span>
              </div>
              <div className="rounded-2xl border border-ink/6 p-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-mist">Classification</p>
                <p className="mt-1.5 text-sm font-semibold text-ink">{asset.classification}</p>
                <p className="text-[11px] text-mist">Data mapping FY26</p>
              </div>
            </div>
          </section>

          {/* previous wipes */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <BadgeCheck className="h-4 w-4 text-primary-500" /> Wipe history
            </h3>
            {asset.wipeHistory.length === 0 ? (
              <p className="rounded-2xl bg-cloud px-4 py-3 text-[13px] text-mist">
                No previous wipes on record — device has not been sanitized yet.
              </p>
            ) : (
              <div className="space-y-2.5">
                {asset.wipeHistory.map((w, i) => (
                  <div key={i} className="flex items-center justify-between rounded-2xl border border-ink/6 p-3">
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{w.standard}</p>
                      <p className="text-[11px] text-mist">{fmtDate(w.date)} · integrity {w.method}%</p>
                    </div>
                    {w.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-[11px] font-semibold text-success-700">
                        <BadgeCheck className="h-3 w-3" /> Verified
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* lifecycle timeline */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <Activity className="h-4 w-4 text-violet-500" /> Lifecycle timeline
            </h3>
            <Timeline
              steps={[
                { id: "purchased", title: `Purchased · ${asset.purchaseYear}`, desc: `${asset.brand} ${asset.model} entered the fleet`, time: String(asset.purchaseYear), tone: "blue", icon: <Package className="h-4 w-4" /> },
                { id: "assigned", title: "Assigned to fleet", desc: `${asset.assignedTo} · ${asset.department}`, time: "Fleet", tone: "sky", icon: <User className="h-4 w-4" /> },
                ...(asset.lastWipe
                  ? [{ id: "wiped", title: "Sanitized", desc: asset.wipeHistory[0]?.standard ?? "Secure wipe", time: fmtDate(asset.lastWipe), tone: "green" as const, icon: <ShieldCheck className="h-4 w-4" /> }]
                  : [{ id: "pending", title: "Awaiting sanitization", desc: "Queued in wipe backlog", time: "Now", tone: "amber" as const, icon: <ShieldCheck className="h-4 w-4" /> }]),
              ]}
            />
          </section>
        </div>

        {/* footer actions */}
        <div className="sticky bottom-0 flex items-center justify-between gap-2 border-t border-ink/6 bg-white/90 p-4 backdrop-blur-xl">
          <Button
            variant="outline"
            onClick={() => {
              toast.info(`Edit flow opened for ${asset.name}`);
            }}
          >
            Edit
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                logAudit({ actor: "Priya Sharma", role: "IT Manager", action: "Transferred asset", target: asset.serial, category: "asset", outcome: "success" });
                toast.success("Transfer request sent");
              }}
            >
              Transfer
            </Button>
            <Button
              variant="success"
              onClick={() => {
                completeWipe(asset.id, { standard: "NIST 800-88 Rev.1", technician: "Priya Sharma", zeroedGB: 512 });
                toast.success("Wipe completed — certificate issued");
              }}
            >
              <ShieldCheck className="h-4 w-4" /> Wipe now
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function AssetCardVisual({ asset }: { asset: Asset }) {
  return <AssetIcon type={asset.assetType} color={asset.color} className="h-12 w-12" />;
}