"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Archive,
  ArrowUpDown,
  Download,
  Eye,
  Grid2x2,
  HardDrive,
  LayoutList,
  MoreHorizontal,
  Pencil,
  ScanSearch,
  Search,
  SlidersHorizontal,
  Trash2,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Input } from "@/components/app-ui/input";
import { Card } from "@/components/app-ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/app-ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/app-ui/select";
import { Body as TableBody, Cell as TableCell, Container as TableContainer, Head as TableHead, Header as TableHeader, Root as TableRoot, Row as TableRow } from "@/components/app-ui/table";
import { DeviceGlyph } from "@/components/app/DeviceGlyph";
import { Pagination } from "@/components/app/Pagination";
import { PageSkeleton } from "@/components/app/PageSkeleton";
import { EmptyState } from "@/components/app/SectionHeading";
import { AssetDetails } from "@/components/app/AssetDetails";
import { RiskBadge, StatusBadge } from "@/components/platform/shared";
import { useApp } from "@/components/providers/AppProvider";
import { CountUp } from "@/components/app/CountUp";
import { cn } from "@/lib/utils";
import type { Asset } from "@/lib/mock/types";

const PAGE_SIZE = 10;

const TYPE_OPTIONS = ["All", "Laptop", "Desktop", "Server", "SSD", "HDD", "Phone", "Printer", "Networking Device"] as const;
const STATUS_OPTIONS = ["All", "In Fleet", "Pending Wipe", "Wiping", "Wiped", "Certified", "Recycled", "Retired"] as const;
const RISK_OPTIONS = ["All", "Critical", "High", "Medium", "Low"] as const;

type SortKey = "name" | "riskScore" | "purchaseYear" | "department";

export default function AssetsPage() {
  const { assets, logAudit } = useApp();
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState<string>("All");
  const [status, setStatus] = React.useState<string>("All");
  const [risk, setRisk] = React.useState<string>("All");
  const [sortKey, setSortKey] = React.useState<SortKey>("riskScore");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const [page, setPage] = React.useState(1);
  const [view, setView] = React.useState<"table" | "grid">("table");
  const [selected, setSelected] = React.useState<Asset | null>(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = React.useMemo(() => {
    let list = assets.filter((a) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.serial.toLowerCase().includes(q) ||
        a.brand.toLowerCase().includes(q) ||
        a.assignedTo.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q);
      const matchT = type === "All" || a.assetType === type;
      const matchS = status === "All" || a.status === status;
      const matchR = risk === "All" || a.riskLevel === risk;
      return matchQ && matchT && matchS && matchR;
    });
    return [...list].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "riskScore") cmp = a.riskScore - b.riskScore;
      else if (sortKey === "purchaseYear") cmp = a.purchaseYear - b.purchaseYear;
      else if (sortKey === "department") cmp = a.department.localeCompare(b.department);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [assets, query, type, status, risk, sortKey, sortDir]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir("desc");
    }
  };

  const openDetail = (a: Asset) => {
    setSelected(a);
    setDetailsOpen(true);
  };

  const counts = {
    total: assets.length,
    pending: assets.filter((a) => a.status === "Pending Wipe").length,
    certified: assets.filter((a) => a.status === "Certified").length,
    highRisk: assets.filter((a) => a.riskLevel === "Critical" || a.riskLevel === "High").length,
  };

  if (loading) return <PageSkeleton variant="table" />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Asset register"
        title="Asset Management"
        desc="Track every device from intake to secure disposal across the estate."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("ITAM sync started — assets refreshed")}>
              <ScanSearch className="h-4 w-4 text-primary-600" /> Scan
            </Button>
            <Button variant="outline" onClick={() => toast.success("Inventory exported (CSV)")}>
              <Download className="h-4 w-4 text-mist" /> Export
            </Button>
            <Button onClick={() => toast.success("Asset registration opened")}>
              <HardDrive className="h-4 w-4" /> Add asset
            </Button>
          </>
        }
      />

      {/* count strip */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Total assets", value: counts.total, tone: "#2563EB" },
          { label: "Pending wipe", value: counts.pending, tone: "#F59E0B" },
          { label: "Certified", value: counts.certified, tone: "#22C55E" },
          { label: "High / critical risk", value: counts.highRisk, tone: "#EF4444" },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.05, duration: 0.45 }}
            className="rounded-3xl border border-ink/6 bg-white p-4 shadow-card"
          >
            <p className="text-[12px] font-medium text-mist">{c.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight" style={{ color: c.tone }}>
              <CountUp value={c.value} />
            </p>
          </motion.div>
        ))}
      </div>

      {/* filters */}
      <Card className="p-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, serial, brand, owner…"
              className="pl-10"
            />
          </div>

          <Select value={type} onValueChange={(v) => { setType(v); setPage(1); }}>
            <SelectTrigger className="w-[150px]">
              <span className="flex items-center gap-1.5"><HardDrive className="h-3.5 w-3.5 text-mist" /> Type</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
            <SelectTrigger className="w-[150px]">
              <span className="flex items-center gap-1.5"><SlidersHorizontal className="h-3.5 w-3.5 text-mist" /> Status</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={risk} onValueChange={(v) => { setRisk(v); setPage(1); }}>
            <SelectTrigger className="w-[140px]">
              <span className="flex items-center gap-1.5"><SlidersHorizontal className="h-3.5 w-3.5 text-mist" /> Risk</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RISK_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-1 rounded-full border border-ink/10 p-0.5">
            <button
              onClick={() => setView("table")}
              className={cn("flex h-8 w-8 items-center justify-center rounded-full", view === "table" ? "bg-slate-900 text-white" : "text-mist hover:bg-slate-100")}
              aria-label="Table view"
            >
              <LayoutList className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("grid")}
              className={cn("flex h-8 w-8 items-center justify-center rounded-full", view === "grid" ? "bg-slate-900 text-white" : "text-mist hover:bg-slate-100")}
              aria-label="Grid view"
            >
              <Grid2x2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* data area */}
      <Card className="overflow-hidden p-0">
        {pageRows.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={<HardDrive className="h-6 w-6" />}
              title="No assets found"
              desc="Adjust your search or filters to find matching devices."
            />
          </div>
        ) : view === "table" ? (
          <TableContainer>
            <TableRoot>
              <TableHeader>
                <TableRow className="bg-cloud/60 hover:bg-cloud/60">
                  <TableHead className="w-[34%]">Asset</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("riskScore")}>
                    <span className="flex items-center gap-1">Risk <ArrowUpDown className={cn("h-3.5 w-3.5", sortKey === "riskScore" ? "text-primary-600" : "text-mist/40")} /></span>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("purchaseYear")}>
                    <span className="flex items-center gap-1">Status <ArrowUpDown className={cn("h-3.5 w-3.5", sortKey === "purchaseYear" ? "text-primary-600" : "text-mist/40")} /></span>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Storage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map((a) => (
                  <TableRow key={a.id} className="cursor-pointer" onClick={() => openDetail(a)}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <DeviceGlyph type={a.assetType} color={a.color} size="sm" beam={false} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">{a.name}</p>
                          <p className="font-mono text-[11px] text-mist">{a.serial}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-[13px] font-medium text-ink">{a.department}</p>
                      <p className="text-[11px] text-mist">{a.assignedTo}</p>
                    </TableCell>
                    <TableCell><RiskBadge level={a.riskLevel} score={a.riskScore} /></TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <p className="text-[13px] text-ink">{a.capacity}</p>
                      <p className="text-[11px] text-mist">{a.storageType}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="flex items-center justify-end gap-2">
                        <span className="hidden text-[11px] font-medium text-success-600 md:inline">~{a.carbonSaved} kg CO₂</span>
                        <div onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuItem onClick={() => openDetail(a)}><Eye /> View</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info(`Edit flow for ${a.name}`)}><Pencil /> Edit</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => { logAudit({ actor: "Priya Sharma", role: "IT Manager", action: "Transferred asset", target: a.serial, category: "asset", outcome: "success" }); toast.success("Transfer request sent"); }}>
                                <UserPlus /> Transfer
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { toast.success(`${a.name} retired from fleet`); }}>
                                <Archive /> Retire
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => toast.error("Delete requires dual approval")}>
                                <Trash2 /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableRoot>
          </TableContainer>
        ) : (
          <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
            {pageRows.map((a) => (
              <button
                key={a.id}
                onClick={() => openDetail(a)}
                className="group rounded-2xl border border-ink/6 bg-white p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <DeviceGlyph type={a.assetType} color={a.color} />
                  <StatusBadge status={a.status} />
                </div>
                <p className="mt-3 text-sm font-semibold text-ink group-hover:text-primary-700">{a.name}</p>
                <p className="font-mono text-[11px] text-mist">{a.serial}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] text-mist">{a.department} · {a.assignedTo}</p>
                    <p className="text-[11px] text-mist">{a.capacity} {a.storageType}</p>
                  </div>
                  <RiskBadge level={a.riskLevel} score={a.riskScore} />
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-ink/6 p-4">
          <Pagination page={safePage} pages={pages} onPage={setPage} total={filtered.length} />
        </div>
      </Card>

      <AssetDetails asset={selected} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  );
}