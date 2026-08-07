"use client";

import { Counter } from "@/components/ui/Counter";
import { mulberry32 } from "@/lib/utils";

const rand = mulberry32(2026);
const BARS = Array.from({ length: 16 }).map(() => 32 + rand() * 66);

const FEED = [
  { t: "Wiped", d: "SC-24D-88731", done: true },
  { t: "Verifying", d: "SC-24D-3211", done: false },
  { t: "Certified", d: "SC-24D-0988", done: true },
];

const METRICS = [
  { k: "Sanitized", v: 45231, s: "" },
  { k: "Certificates", v: 18450, s: "" },
  { k: "Recovery", v: 0, s: "%" },
];

export function ProductScreen() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0B1220 0%, #0E1728 50%, #12203A 100%)" }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle, rgb(56 189 248 / 0.25), transparent 70%)", filter: "blur(6px)" }} />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle, rgb(34 197 94 / 0.18), transparent 70%)", filter: "blur(6px)" }} />

      {/* metrics */}
      <div className="absolute inset-x-0 top-0 grid grid-cols-3 gap-px border-b border-white/5 bg-white/[0.02] p-2.5">
        {METRICS.map((m) => (
          <div key={m.k} className="text-center">
            <div className="font-mono text-[11px] font-bold leading-none text-white">
              <Counter value={m.v} duration={2.8} suffix={m.s} />
            </div>
            <div className="mt-0.5 text-[6.5px] uppercase tracking-[0.18em] text-white/45">{m.k}</div>
          </div>
        ))}
      </div>

      {/* chart */}
      <div className="absolute inset-x-0 top-[52px] px-3">
        <div className="flex items-center justify-between">
          <span className="text-[7px] font-semibold uppercase tracking-wider text-white/60">
            Fleet throughput · live
          </span>
          <span className="flex items-center gap-1 text-[6.5px] text-success-400">
            <span className="h-1 w-1 animate-pulse rounded-full bg-success-400" /> LIVE
          </span>
        </div>
        <div className="mt-1.5 flex h-14 items-end gap-[3px]">
          {BARS.map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-[2px] bg-gradient-to-t from-primary-600 via-primary-500 to-primary-300"
              style={{
                height: `${b}%`,
                opacity: 0.55 + (i % 3) * 0.15,
                animation: `float-y ${2 + (i % 4) * 0.6}s ease-in-out ${i * 0.08}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* scan card */}
      <div className="absolute inset-x-3 top-[150px] rounded-lg border border-white/8 bg-white/[0.04] p-2 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[7.5px] font-semibold text-white/85">
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-success-400" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Deep scan complete
          </span>
          <span className="font-mono text-[7px] text-primary-300">NIST 800-88</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="font-mono text-[7px] text-white/40">Sensitive found</span>
          <span className="font-mono text-[8px] font-bold text-white">184 files · 98%</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-primary-500 to-success-400" />
        </div>
      </div>

      {/* feed */}
      <div className="absolute inset-x-3 bottom-2 space-y-1">
        {FEED.map((row) => (
          <div key={row.d} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] px-2 py-1">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                {row.done ? (
                  <span className="relative h-1.5 w-1.5 rounded-full bg-success-400" />
                ) : (
                  <>
                    <span className="absolute h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-primary-400" />
                  </>
                )}
              </span>
              <span className="text-[7px] font-medium text-white/70">{row.t}</span>
            </div>
            <span className="font-mono text-[6.5px] text-white/40">{row.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}