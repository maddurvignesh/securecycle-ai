"use client";

import { mulberry32 } from "@/lib/utils";
import { cn } from "@/lib/utils";

function QRCode({ seed, size = 88 }: { seed: number; size?: number }) {
  const n = 21;
  const rand = mulberry32(seed);
  const cells: boolean[][] = [];
  for (let r = 0; r < n; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < n; c++) row.push(rand() > 0.52);
    cells.push(row);
  }
  const finder = (r: number, c: number) => {
    for (let dr = -1; dr <= 7; dr++)
      for (let dc = -1; dc <= 7; dc++)
        if (r === r + dr && c === c + dc) return false;
    return false;
  };
  void finder;
  const unit = size / (n + 2);
  const isFinder = (r: number, c: number) => {
    const inTL = r <= 6 && c <= 6;
    const inTR = r <= 6 && c >= n - 7;
    const inBL = r >= n - 7 && c <= 6;
    return inTL || inTR || inBL;
  };
  const finderCell = (r: number, c: number) => {
    if (!isFinder(r, c)) return null;
    const baseR = r <= 6 ? 0 : r >= n - 7 ? n - 7 : 0;
    const baseC = c <= 6 ? 0 : c >= n - 7 ? n - 7 : 0;
    const dr = r - baseR;
    const dc = c - baseC;
    const ring = dr === 0 || dr === 6 || dc === 0 || dc === 6;
    const core = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
    return ring || core;
  };
  const vh = (r: number, c: number) => {
    if (isFinder(r, c)) return finderCell(r, c) ? "#1F2937" : "#FFFFFF";
    const sep = (dr: number, dc: number) =>
      (r + dr >= 0 && c + dc >= 0 && r + dr < n && c + dc < n && isFinder(r + dr, c + dc));
    if (sep(-1, -1) || sep(-1, 0) || sep(-1, 1) || sep(0, -1) || sep(0, 1) || sep(1, -1) || sep(1, 0) || sep(1, 1)) {
      return "#FFFFFF";
    }
    return cells[r][c] ? "#1F2937" : "#FFFFFF";
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <rect width={size} height={size} rx={10} fill="#FFFFFF" />
      {cells.map((row, r) =>
        row.map((_, c) => {
          const v = vh(r, c);
          if (v === "#FFFFFF") return null;
          return (
            <rect
              key={`${r}-${c}`}
              x={(c + 1) * unit + 0.4}
              y={(r + 1) * unit + 0.4}
              width={unit - 0.8}
              height={unit - 0.8}
              rx={0.8}
              fill={v}
            />
          );
        })
      )}
    </svg>
  );
}

function GoldSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="seal-grad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F59E0B" />
          <stop offset="0.5" stopColor="#D97706" />
          <stop offset="1" stopColor="#92400E" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="none" stroke="url(#seal-grad)" strokeWidth="2.5" />
      <g stroke="url(#seal-grad)" strokeWidth="2">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r1 = 46;
          const r2 = i % 2 === 0 ? 54 : 50;
          return (
            <line
              key={i}
              x1={60 + Math.cos(a) * r1}
              y1={60 + Math.sin(a) * r1}
              x2={60 + Math.cos(a) * r2}
              y2={60 + Math.sin(a) * r2}
            />
          );
        })}
      </g>
      <circle cx="60" cy="60" r="40" fill="rgb(245 158 11 / 0.08)" stroke="url(#seal-grad)" strokeWidth="2" />
      <circle cx="60" cy="60" r="24" fill="none" stroke="url(#seal-grad)" strokeWidth="1.6" strokeDasharray="2 3" />
      <path d="M60 40l4.6 9.3 10.3 1.5-7.4 7.3 1.7 10.2L60 63l-9.2 4.8 1.7-10.2-7.4-7.3 10.3-1.5z" fill="url(#seal-grad)" />
      <text x="60" y="86" textAnchor="middle" fontSize="8" fill="#92400E" fontFamily="monospace" fontWeight="700" letterSpacing="2">
        SECURE
      </text>
    </svg>
  );
}

export function ErasureCertificate({
  className,
  serial = "SC-24D-88731",
  compact = false,
}: {
  className?: string;
  serial?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative select-none overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lift",
        className
      )}
    >
      {/* hairline + gold frame */}
      <div className="absolute inset-2 rounded-xl border border-[#D97706]/30" />
      {/* watermark */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent 0 14px, #2563EB 14px 16px)",
        }}
      />
      <div className={cn("relative flex h-full flex-col p-5 sm:p-7", compact && "p-4 sm:p-5")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-ink/70">
              SecureCycle AI
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-success-600 ring-1 ring-success-200">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success-500" />
            </span>
            Verification Passed
          </span>
        </div>

        <div className={cn("mt-4 flex flex-1 flex-col items-center justify-center text-center", compact && "mt-3")}>
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#D97706]">
            Certified · Data Erasure
          </p>
          <h3 className={cn("mt-2 font-serif text-2xl text-ink sm:text-3xl", compact && "text-xl")}>
            Certificate of Erasure
          </h3>
          <p className="mt-2 max-w-[300px] text-[11px] leading-relaxed text-mist">
            This device has been securely wiped and independently verified as data-unrecoverable.
          </p>
        </div>

        <div className={cn("grid grid-cols-1 items-end gap-4", compact ? "mt-2 sm:grid-cols-2" : "mt-4 sm:grid-cols-2")}>
          <div className="space-y-1 text-left">
            {[
              ["Device", "MacBook Pro 14\""],
              ["Serial", serial],
              ["Method", "NIST 800-88 Purge · 3-pass"],
              ["Date", "06 Aug 2026"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-dashed border-ink/10 pb-1 text-[10px]">
                <span className="uppercase tracking-wider text-mist">{k}</span>
                <span className="font-medium text-ink">{v}</span>
              </div>
            ))}
          </div>

          <div className="flex items-end justify-end gap-4">
            <div className="text-right">
              <svg viewBox="0 0 120 46" className="h-9 w-24 opacity-80">
                <path
                  d="M8 34c14-2 20-20 34-16 12 4 14 10 26 6s20-14 34-12"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p className="mt-1 text-[9px] text-mist">Digital Signature · SHA-256</p>
              <p className="text-[9px] text-primary-600">verify.securecycle.ai/{serial}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="rounded-lg border border-ink/10 p-1">
                <QRCode seed={serial.split("").reduce((a, c) => a + c.charCodeAt(0), 7)} size={compact ? 62 : 78} />
              </div>
              <span className="text-[8px] uppercase tracking-widest text-mist">Scan to verify</span>
            </div>
          </div>
        </div>

        {/* gold seal */}
        <div className={cn("absolute -bottom-2 -left-2 h-20 w-20 opacity-90", compact && "h-16 w-16")}>
          <GoldSeal />
        </div>
      </div>
    </div>
  );
}
