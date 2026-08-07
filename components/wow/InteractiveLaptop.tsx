"use client";

import { useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Laptop3D } from "@/components/laptop/Laptop3D";
import { ErasureCertificate } from "@/components/ui/Certificate";
import { mulberry32 } from "@/lib/utils";
import { cn } from "@/lib/utils";

const rand = mulberry32(987654);

const FILE_STACK = [
  { name: "Passwords.kdbx", meta: "Critical", color: "#F43F5E" },
  { name: "HR Records", meta: "Confidential", color: "#2563EB" },
  { name: "Customers.db", meta: "Confidential", color: "#2563EB" },
  { name: "Payroll.xlsx", meta: "Sensitive", color: "#F59E0B" },
  { name: "Medical Records", meta: "Confidential", color: "#2563EB" },
  { name: "Invoices.pdf", meta: "Internal", color: "#64748B" },
];

type Phase = "closed" | "open" | "erasing" | "verified";

export function InteractiveLaptop() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("closed");
  const [inspect, setInspect] = useState(false);

  const open = useMotionValue(0);
  const wipe = useMotionValue(0);
  const beam = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const tilt = useMotionValue(0);

  const particles = useMemo(
    () =>
      Array.from({ length: 34 }).map((_, i) => ({
        x: (i % 2 === 0 ? 1 : -1) * (60 + rand() * 260),
        y: (i % 3 === 0 ? 1 : -1) * (40 + rand() * 240),
        r: 2 + rand() * 3,
        d: 0.9 + rand() * 1.1,
        c: ["#2563EB", "#22C55E", "#93C5FD", "#38BDF8"][i % 4],
      })),
    []
  );

  const openDevice = () => {
    setPhase("open");
    animate(open, 1, { duration: 1.2, ease: [0.22, 1, 0.36, 1] });
  };

  const erase = () => {
    if (phase !== "open") return;
    setPhase("erasing");
    animate(wipe, 1, {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => setPhase("verified"),
    });
  };

  const reset = () => {
    setPhase("closed");
    setInspect(false);
    animate(open, 0, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    animate(wipe, 0, { duration: 0.01 });
  };

  return (
    <section id="playground" className="relative overflow-hidden bg-cloud/60 py-28">
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-50/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
            Interactive Playground
          </span>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-ink sm:text-5xl md:text-6xl">
            Wipe it. <span className="font-serif italic font-normal text-gradient-blue">Right here.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-mist md:text-lg">
            Open the device, hover the drive, then press erase. This is the exact experience
            every asset goes through on the SecureCycle platform.
          </p>
        </div>

        {/* stage */}
        <div className="relative mx-auto mt-16 grid max-w-5xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* laptop side */}
          <div className="relative flex h-[380px] items-center justify-center sm:h-[440px]">
            <div className="scale-[0.68] sm:scale-90 lg:scale-100">
              <Laptop3D
                open={open}
                wipe={wipe}
                beam={beam}
                rotateY={rotateY}
                tilt={tilt}
                state={phase === "verified" ? "secure" : phase === "erasing" ? "wipe" : "data"}
              />
            </div>

            {/* particles during erase */}
            <div className="pointer-events-none absolute inset-0">
              {phase === "erasing" &&
                particles.map((p, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-[46%] rounded-full"
                    initial={{ x: 0, y: 0, scale: 0.4, opacity: 0 }}
                    animate={{ x: p.x, y: p.y, scale: 1.3, opacity: [0, 0.9, 0] }}
                    transition={{ duration: p.d, ease: "easeOut" }}
                    style={{ width: p.r * 2, height: p.r * 2, background: p.c, boxShadow: "0 0 12px 1px rgb(37 99 235 / 0.45)" }}
                  />
                ))}
            </div>

            {/* open hint */}
            {phase === "closed" && (
              <motion.div
                className="pointer-events-none absolute inset-0 flex items-end justify-center pb-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="rounded-full bg-white/80 px-4 py-1.5 text-xs font-medium text-mist shadow-soft backdrop-blur">
                  Press open to begin
                </span>
              </motion.div>
            )}
          </div>

          {/* control side */}
          <div className="flex flex-col gap-6">
            {/* SSD inspect card */}
            <div
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-ink/8 bg-white p-6 shadow-soft transition-all duration-500",
                phase === "open" || phase === "erasing" || phase === "verified"
                  ? "cursor-pointer"
                  : "opacity-60 grayscale"
              )}
              onMouseEnter={() => phase === "open" && setInspect(true)}
              onMouseLeave={() => setInspect(false)}
              onFocus={() => phase === "open" && setInspect(true)}
              onBlur={() => setInspect(false)}
              tabIndex={phase === "open" ? 0 : -1}
              role="button"
              aria-label="Inspect SSD drive"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2.5" />
                      <path d="M7 15h2M11 15h2M15 15h2M7 11h.01M11 11h.01M15 11h.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Internal SSD · 1 TB</p>
                    <p className="font-mono text-[10px] text-mist">AP-2048 · decommissioned</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors",
                    phase === "open"
                      ? "bg-primary-50 text-primary-700 ring-1 ring-primary-200"
                      : "bg-ink/5 text-mist"
                  )}
                >
                  {phase === "open" ? (inspect ? "Scanning…" : "Hover to inspect") : "Locked"}
                </span>
              </div>

              {/* transparent SSD reveal */}
              <div
                className={cn(
                  "mt-5 grid grid-cols-2 gap-2 transition-all duration-500 sm:grid-cols-3",
                  inspect && phase === "open"
                    ? "max-h-64 opacity-100"
                    : "pointer-events-none max-h-0 opacity-0"
                )}
                aria-hidden={!(inspect && phase === "open")}
              >
                {FILE_STACK.map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={false}
                    animate={{ opacity: inspect && phase === "open" ? 1 : 0, y: inspect && phase === "open" ? 0 : 8 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-center gap-2 rounded-xl border border-ink/6 bg-cloud px-2.5 py-2"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: f.color, boxShadow: `0 0 8px ${f.color}66` }}
                    />
                    <div className="min-w-0">
                      <p className="truncate font-mono text-[9px] font-medium text-ink">{f.name}</p>
                      <p className="text-[8px] uppercase tracking-wider text-mist">{f.meta}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* erasing overlay */}
              {phase === "erasing" && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-sm">
                  <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <svg viewBox="0 0 120 120" className="mx-auto h-20 w-20 -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(17 24 39 / 0.08)" strokeWidth="8" />
                      <motion.circle
                        cx="60" cy="60" r="50" fill="none" stroke="#22C55E" strokeWidth="8" strokeLinecap="round"
                        pathLength={1}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                    <p className="mt-3 font-mono text-sm font-semibold text-ink">Erasing secure sectors…</p>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-mist">NIST 800-88 · Pass 3 of 3</p>
                  </motion.div>
                </div>
              )}
            </div>

            {/* actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {phase === "closed" && (
                <button
                  onClick={openDevice}
                  className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-7 py-3.5 text-[15px] font-medium text-white shadow-glow transition-all duration-300 hover:shadow-[0_0_0_1px_rgb(37_99_235/0.15),0_20px_56px_-12px_rgb(37_99_235/0.5)] active:scale-[0.98]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3h12v18H6zM6 3l3 3v18" opacity="0" />
                    <path d="M9 11l6 6M15 11l-6 6" />
                  </svg>
                  Open Device
                </button>
              )}

              {phase === "open" && (
                <button
                  onClick={erase}
                  className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 to-rose-600 px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_12px_40px_-12px_rgb(244_63_94/0.6)] transition-all duration-300 hover:shadow-[0_20px_56px_-12px_rgb(244_63_94/0.7)] active:scale-[0.98]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
                  </svg>
                  Begin Secure Wipe
                  {!reduced && (
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  )}
                </button>
              )}

              {phase === "verified" && (
                <button
                  onClick={reset}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-7 py-3.5 text-[15px] font-medium text-ink shadow-soft transition-all duration-300 hover:border-primary-300 hover:text-primary-700 active:scale-[0.98]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
                  </svg>
                  Run Again
                </button>
              )}
            </div>

            {/* result card */}
            <div className="relative min-h-[0px]" aria-live="polite">
              {phase === "verified" && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="origin-top"
                >
                  <ErasureCertificate compact />
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-success-600">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Verified unrecoverable — certificate issued
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
