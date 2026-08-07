"use client";

import { cn } from "@/lib/utils";

export function AICore({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-44 w-44", className)} aria-hidden>
      {/* halo */}
      <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-3xl" />
      {/* pulsing rings */}
      <div className="absolute inset-0 animate-pulse-ring rounded-full border border-primary-400/40" />
      <div className="absolute inset-2 animate-pulse-ring rounded-full border border-primary-400/30" style={{ animationDelay: "0.6s" }} />
      {/* orbit rings */}
      <div className="absolute inset-0">
        <div className="core-orbit absolute inset-0 rounded-full border border-primary-300/30" style={{ animation: "spin 9s linear infinite" }}>
          <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary-400 shadow-[0_0_12px_2px_rgb(37_99_235/0.7)]" />
        </div>
        <div className="absolute inset-3 rounded-full border border-dashed border-primary-300/25" style={{ animation: "spin 16s linear infinite reverse" }}>
          <span className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-success-400 shadow-[0_0_10px_2px_rgb(34_197_94/0.7)]" />
        </div>
      </div>
      {/* core */}
      <div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #BFDBFE 0%, #3B82F6 35%, #1D4ED8 70%, #172554 100%)",
          boxShadow:
            "0 0 40px 8px rgb(37 99 235 / 0.45), inset 0 0 24px rgb(255 255 255 / 0.35)",
        }}
      >
        <div
          className="absolute inset-1 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgb(255 255 255 / 0.55) 0%, transparent 40%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl text-white/95" style={{ textShadow: "0 0 20px rgb(255 255 255 / 0.6)" }}>
            <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
              <circle cx="12" cy="12" r="3.4" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
