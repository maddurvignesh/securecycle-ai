"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Semi-circular risk gauge rendered with SVG stroke-dash animation.
 */
export function RiskGauge({
  value,
  size = 170,
  label = "AI Risk Score",
  tone = "#2563EB",
  sub,
}: {
  value: number; // 0..100
  size?: number;
  label?: string;
  tone?: string;
  sub?: string;
}) {
  const reduced = useReducedMotion();
  const stroke = 12;
  const [angle, setAngle] = React.useState(reduced ? value : 0);

  React.useEffect(() => {
    if (reduced) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      setAngle(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduced]);

  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = Math.PI * r;
  const filled = (angle / 100) * circ;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EEF2F7" strokeWidth={stroke} />
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={tone}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circ - filled}`}
            style={{ filter: `drop-shadow(0 0 6px ${tone}66)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tracking-tight text-ink">{Math.round(value)}</span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-mist">
            {label}
          </span>
        </div>
      </div>
      {sub ? <p className="mt-2 text-xs font-medium text-mist">{sub}</p> : null}
    </div>
  );
}

export function RiskBar({ score, tone, className }: { score: number; tone?: string; className?: string }) {
  return (
    <div className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100", className)}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: tone ?? "#2563EB" }}
        initial={{ width: 0 }}
        whileInView={{ width: `${score}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}