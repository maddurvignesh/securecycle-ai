"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Download,
  Fingerprint,
  QrCode,
  ScrollText,
  Search,
  Share2,
  ShieldCheck,
  Verified,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Input } from "@/components/app-ui/input";
import { Card } from "@/components/app-ui/card";
import { Badge } from "@/components/app-ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/app-ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/app-ui/dialog";
import { QrVisual } from "@/components/app/QrVisual";
import { Pagination } from "@/components/app/Pagination";
import { EmptyState } from "@/components/app/SectionHeading";
import { useApp } from "@/components/providers/AppProvider";
import { fmtDate } from "@/lib/format";
import type { Certificate, CertificateStatus } from "@/lib/mock/types";

const PAGE_SIZE = 8;
const STATUS_OPTIONS = ["All", "Verified", "Active", "Revoked", "Expired"] as const;

const statusVariant: Record<CertificateStatus, "success" | "info" | "danger" | "secondary"> = {
  Verified: "success",
  Active: "info",
  Revoked: "danger",
  Expired: "secondary",
};

export default function CertificatesPage() {
  const { certifications: certs } = useApp();
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<string>("All");
  const [page, setPage] = React.useState(1);
  const [preview, setPreview] = React.useState<Certificate | null>(null);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = React.useMemo(() => {
    return certs.filter((c) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.asset.name.toLowerCase().includes(q) ||
        c.asset.serial.toLowerCase().includes(q) ||
        c.technician.toLowerCase().includes(q);
      const matchS = status === "All" || c.status === status;
      return matchQ && matchS;
    });
  }, [certs, query, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const verified = certs.filter((c) => c.status === "Verified").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Verified erasure records"
        title="Digital Certificates"
        desc="Tamper-proof certificates for every sanitized device — signed, sealed and instantly verifiable."
        actions={
          <Button onClick={() => toast.success("Certificate registry synced")}>
            <ScrollText className="h-4 w-4" /> Sync registry
          </Button>
        }
      />

      {/* stat strip */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Total issued", value: certs.length, tone: "#2563EB" },
          { label: "Verified", value: verified, tone: "#22C55E" },
          { label: "QR-scannable", value: "100%", tone: "#8B5CF6", join: true },
          { label: "Revoked / expired", value: certs.filter((c) => c.status === "Revoked" || c.status === "Expired").length, tone: "#EF4444" },
        ].map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }} className="rounded-3xl border border-ink/6 bg-white p-4 shadow-card">
            <p className="text-[12px] font-medium text-mist">{c.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight" style={{ color: c.tone }}>
              {c.join ? c.value : c.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* filters */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
          <Input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search by ID, asset, serial, technician…" className="pl-10" />
        </div>
        <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => toast.success("All certificates exported (PDF)")}>
          <Download className="h-4 w-4 text-mist" /> Export all
        </Button>
      </div>

      {/* gallery */}
      {rows.length === 0 ? (
        <EmptyState icon={<QrCode className="h-6 w-6" />} title="No certificates found" desc="Try adjusting your search or status filter." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {rows.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.4 }}
            >
              <Card className="group relative overflow-hidden p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.06] blur-2xl"
                  style={{ background: "#2563EB" }}
                />
                <div className="flex items-center justify-between">
                  <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink p-1 text-white">
                    <QrVisual seed={c.qr} className="text-white" />
                  </span>
                </div>

                <p className="mt-3 flex items-center gap-1.5 font-mono text-[12px] text-primary-700">
                  <Verified className="h-3.5 w-3.5" /> {c.id}
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-ink">{c.asset.name}</p>
                <p className="font-mono text-[11px] text-mist">{c.asset.serial} · {c.asset.type}</p>

                <div className="mt-3 flex items-center justify-between text-[11px] text-mist">
                  <span>{c.standard}</span>
                  <span>{fmtDate(c.date)}</span>
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[11px] text-mist">Tech · {c.technician}</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-success-600">
                    <BadgeCheck className="h-3 w-3" /> {c.integrity}%
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-1.5">
                  <Button size="sm" variant="outline" onClick={() => setPreview(c)}><QrCode className="h-3.5 w-3.5" /> Preview</Button>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`Certificate ${c.id} downloaded (PDF)`)}><Download className="h-3.5 w-3.5" /> PDF</Button>
                  <Button size="sm" variant="outline" onClick={() => { toast.info("Share link copied"); }}>
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Pagination page={safePage} pages={pages} onPage={setPage} total={filtered.length} />

      {/* preview modal */}
      <Dialog open={!!preview} onOpenChange={(v) => !v && setPreview(null)}>
        {preview && (
          <DialogContent className="max-w-xl p-0">
            <DialogHeader className="sr-only">
              <DialogTitle>Certificate {preview.id}</DialogTitle>
              <DialogDescription>Preview erasure certificate</DialogDescription>
            </DialogHeader>

            <div className="relative m-5 overflow-hidden rounded-3xl border border-ink/8 bg-gradient-to-br from-white via-primary-50/40 to-success-50/40 p-6">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-100/40 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-success-100/40 blur-2xl" />

              <div className="relative">
                {/* header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-success-500 text-white shadow-glow">
                      <Fingerprint className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold tracking-tight text-ink">SecureCycle AI</p>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-primary-600">Verification of erasure</p>
                    </div>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink p-1.5 text-white">
                    <QrVisual seed={preview.qr} className="text-white" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  {[
                    ["Certificate ID", preview.id],
                    ["Asset", preview.asset.name],
                    ["Serial number", preview.asset.serial],
                    ["Asset type", preview.asset.type],
                    ["Sanitization standard", preview.standard],
                    ["Integrity", `${preview.integrity}%`],
                    ["Zeroed capacity", `${preview.zeroedGB} GB`],
                    ["Technician", preview.technician],
                    ["Issued", fmtDate(preview.date)],
                    ["Status", preview.status],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-mist">{k}</p>
                      <p className="font-medium text-ink">{v}</p>
                    </div>
                  ))}
                </div>

                {/* signature + seal */}
                <div className="mt-6 flex items-end justify-between border-t border-ink/8 pt-4">
                  <div>
                    <p className="font-serif text-lg italic text-ink/70" style={{ fontFamily: "var(--font-instrument), serif" }}>
                      {preview.technician}
                    </p>
                    <p className="text-[10px] text-mist">Authorized technician signature</p>
                  </div>
                  <div className="text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-400/60 text-emerald-600">
                      <BadgeCheck className="h-7 w-7" />
                    </span>
                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-emerald-600">Verified seal</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-2.5 ring-1 ring-ink/6">
                  <span className="flex items-center gap-2 text-[11px] text-mist">
                    <QrCode className="h-3.5 w-3.5" /> Scan to verify on-chain
                  </span>
                  <span className="font-mono text-[10px] text-primary">sha-256 · {preview.signature}</span>
                </div>
              </div>
            </div>

            <DialogFooter className="px-5 pb-5">
              <Button variant="outline" onClick={() => toast.info("Share link copied")}><Share2 className="h-4 w-4" /> Share</Button>
              <Button variant="outline" onClick={() => toast.success("Certificate verified against registry ✓")}>
                <ShieldCheck className="h-4 w-4 text-success-600" /> Verify
              </Button>
              <Button onClick={() => toast.success(`Downloaded ${preview.id}.pdf`)}>
                <Download className="h-4 w-4" /> Download PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export type { CertificateStatus }; // re-export for consumers