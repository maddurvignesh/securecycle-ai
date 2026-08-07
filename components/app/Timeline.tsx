"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TimelineStep = {
  id: string;
  title: string;
  desc?: string;
  time?: string;
  tone?: "blue" | "green" | "amber" | "rose" | "violet" | "sky";
  icon?: React.ReactNode;
  active?: boolean;
};

const TONE_BG: Record<string, string> = {
  blue: "bg-primary-100 text-primary-600 ring-primary-200",
  green: "bg-success-100 text-success-600 ring-success-200",
  amber: "bg-amber-100 text-amber-600 ring-amber-200",
  rose: "bg-rose-100 text-rose-600 ring-rose-200",
  violet: "bg-violet-100 text-violet-600 ring-violet-200",
  sky: "bg-sky-100 text-sky-600 ring-sky-200",
};

export function Timeline({
  steps,
  className,
}: {
  steps: TimelineStep[];
  className?: string;
}) {
  return (
    <ol className={cn("relative", className)}>
      {steps.map((s, i) => {
        const isLast = i === steps.length - 1;
        return (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-4 pb-6"
          >
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[15px] top-9 h-[calc(100%-2.25rem)] w-px",
                  s.active ? "bg-gradient-to-b from-primary-200 to-slate-100" : "bg-slate-100"
                )}
              />
            )}
            <span
              className={cn(
                "relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-2",
                TONE_BG[s.tone ?? "blue"],
                s.active && "ring-primary-200"
              )}
            >
              {s.icon ?? (
                <span className={cn("h-2 w-2 rounded-full", s.active ? "bg-current" : "bg-current/70")} />
              )}
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-ink">{s.title}</p>
                {s.time ? <span className="shrink-0 text-[11px] text-mist">{s.time}</span> : null}
              </div>
              {s.desc ? <p className="mt-0.5 text-[13px] leading-snug text-mist">{s.desc}</p> : null}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}