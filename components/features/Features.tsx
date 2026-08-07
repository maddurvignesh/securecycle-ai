"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FEATURES, type Feature } from "@/lib/data";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/ui/TiltCard";

export function Features() {
  return (
    <section id="features" className="relative">
      {FEATURES.map((f, i) => (
        <FeatureCinema key={f.title} f={f} i={i} />
      ))}
    </section>
  );
}

function FeatureCinema({ f, i }: { f: Feature; i: number }) {
  const reduced = useReducedMotion();
  const flip = i % 2 === 1;

  return (
    <div className="relative px-0 py-16 sm:py-20" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className={cn("container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16", flip && "lg:[direction:rtl]")}>
        {/* visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-140px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="[direction:ltr]"
        >
          <TiltCard max={6} className="relative">
            <FeatureVisual f={f} reduced={reduced} />
          </TiltCard>
        </motion.div>

        {/* copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-140px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="[direction:ltr]"
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-2xl ring-1",
                f.accent === "green" ? "bg-success-50 text-success-600 ring-success-100" : "bg-primary-50 text-primary-600 ring-primary-100"
              )}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <FeatureIcon t={f.icon} />
              </svg>
            </span>
            <span className={cn("font-mono text-sm font-semibold", f.accent === "green" ? "text-success-500/70" : "text-primary-500/70")}>
              {String(i + 1).padStart(2, "0")} / {FEATURES.length}
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-ink sm:text-5xl md:text-6xl">
            {f.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-mist md:text-lg">{f.description}</p>

          <ul className="mt-7 space-y-3">
            {f.points.map((p, pi) => (
              <li key={p} className="flex items-center gap-3 text-[15px] font-medium text-ink/80">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1",
                    f.accent === "green" ? "bg-success-50 text-success-600 ring-success-100" : "bg-primary-50 text-primary-600 ring-primary-100"
                  )}
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureIcon({ t }: { t: string }) {
  switch (t) {
    case "shield": return <><path d="M12 3l7 3v5c0 4.6-3 8.6-7 10-4-1.4-7-5.4-7-10V6zM9 12l2 2 4-4" /></>;
    case "scan": return <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="2.6" /></>;
    case "certificate": return <><path d="M12 2l2.4 1.8 3 .2 1 2.8 2.5 1.7-.9 2.9.9 2.9-2.5 1.7-1 2.8-3 .2L12 22l-2.4-1.8-3-.2-1-2.8-2.5-1.7.9-2.9-.9-2.9 2.5-1.7 1-2.8 3-.2z" /><path d="M9 12l2 2 4-4" /></>;
    case "route": return <><circle cx="6" cy="19" r="2.5" /><circle cx="18" cy="5" r="2.5" /><path d="M6 16.5C6 10 9 8 12 8s6-1 6-5" /></>;
    case "recycle": return <><path d="M7 19H4.7a1.9 1.9 0 0 1-1.6-2.9L9 5L6.6 1M4.6 22h8l-2.4-4M17 5l2.4 4L23 4.2"/><path d="M12 5a2.8 2.8 0 0 1 2.4 1.3L18 11" /></>;
    default: return <><path d="M4 17a8 8 0 1 1 16 0M12 17l3.5-3.5M3 21h18" /></>;
  }
}

function FeatureVisual({ f, reduced }: { f: Feature; reduced: boolean | null }) {
  switch (f.icon) {
    case "shield":
      return (
        <Panel>
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="h-52 w-52 drop-shadow-[0_20px_40px_rgb(37_99_235/0.25)]">
              <circle cx="100" cy="100" r="92" fill="none" stroke="rgb(17 24 39 / 0.06)" strokeWidth="3" />
              <path d="M100 32l52 20v46c0 34-20 58-52 72-32-14-52-38-52-72V52z" fill="rgb(37 99 235 / 0.06)" stroke="#2563EB" strokeWidth="5" strokeLinejoin="round" className={reduced ? "" : "anim-draw-check"} transform="translate(100 100) scale(0.92) translate(-100 -100)" />
              <path d="M132 82l-40 46-16-18" fill="none" stroke="#22C55E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className={reduced ? "" : "anim-draw-check"} />
            </svg>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {["NIST 800-88", "DoD 5220.22-M", "Guttmann"].map((s) => (
              <span key={s} className="rounded-full border border-ink/8 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-mist">{s}</span>
            ))}
          </div>
        </Panel>
      );
    case "scan":
      return (
        <Panel>
          <div className="relative flex items-center justify-center">
            <div className="relative h-44 w-44">
              <div className="absolute inset-0 rounded-full border border-primary-200" />
              <div className="absolute inset-5 rounded-full border border-primary-200/70" />
              <div className="absolute inset-11 rounded-full border border-primary-200/40" />
              <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, rgb(37 99 235 / 0.3), transparent 30%)", animation: "spin 3.4s linear infinite" }} />
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600" />
            </div>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-2xl border border-ink/8 bg-white px-4 py-3 text-center shadow-soft">
              <p className="font-mono text-2xl font-bold text-ink">98%</p>
              <p className="text-[9px] uppercase tracking-widest text-mist">precision</p>
            </div>
          </div>
        </Panel>
      );
    case "certificate":
      return (
        <Panel>
          <div className="relative mx-auto w-64 rounded-2xl border border-ink/10 bg-white p-5 shadow-lift">
            <div className="absolute inset-1.5 rounded-xl border border-[#D97706]/25" />
            <div className="relative text-center">
              <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-ink/60">Certificate of Erasure</span>
              <span className="mt-1 block font-serif text-lg text-ink">Verified Secure</span>
              <div className="mx-auto mt-3 h-16 w-16 animate-spin-slow">
                <svg viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#D97706" strokeWidth="3" />
                  <path d="M60 44l4 8 9 1.2-6.5 6.5 1.5 9-8-4.3-8 4.3 1.5-9-6.5-6.5 9-1.2z" fill="#D97706" />
                </svg>
              </div>
              <p className="mt-2 font-mono text-[9px] text-primary-600">ID SC-24D-88731 · 06 AUG 2026</p>
            </div>
          </div>
        </Panel>
      );
    case "route":
      return (
        <Panel>
          <div className="relative overflow-hidden rounded-2xl border border-ink/6 bg-cloud/60 p-5">
            {[0, 1, 2].map((row) => (
              <div key={row} className="mt-2 flex items-center gap-3 first:mt-0">
                {[...Array(5)].map((_, c) => (
                  <div key={c} className="flex flex-1 items-center gap-1.5">
                    <span className="h-4 w-4 rounded-md border border-ink/10 bg-white" />
                    <span className="h-px flex-1 bg-ink/10" />
                  </div>
                ))}
              </div>
            ))}
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-primary-600">Intake → Wipe → Verify → Resell</div>
          </div>
        </Panel>
      );
    case "recycle":
      return (
        <Panel>
          <div className="relative flex items-center justify-center gap-6">
            <div className="h-40 w-40">
              <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow">
                <g fill="none" stroke="url(#rv)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M100 34a66 66 0 0 1 55 32M155 66l4-30-31 7M100 166a66 66 0 0 1-55-32M45 134l-4 30 31-7M45 100a66 66 0 0 1 55-32" />
                </g>
                <circle cx="100" cy="100" r="18" fill="url(#rv)" />
                <defs><linearGradient id="rv" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#2563EB" /><stop offset="1" stopColor="#22C55E" /></linearGradient></defs>
              </svg>
            </div>
            <div className="rounded-2xl border border-ink/8 bg-white px-4 py-2 text-center shadow-soft">
              <span className="font-mono text-xl font-bold text-success-600">245T</span>
              <p className="text-[8px] uppercase tracking-widest text-mist">CO₂ saved</p>
            </div>
          </div>
        </Panel>
      );
    default:
      return (
        <Panel>
          <div className="mx-auto w-72 rounded-2xl border border-ink/8 bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-mist">Wipe analytics · live</span>
              <span className="flex items-center gap-1 text-[8px] text-success-500"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success-400" />LIVE</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[["4,521", "Devices"], ["98%", "Wipes"], ["18450", "Certs"]].map(([v, k]) => (
                <div key={k} className="rounded-xl bg-cloud p-2.5">
                  <p className="font-mono text-sm font-bold text-ink">{v}</p>
                  <p className="text-[8px] uppercase tracking-wider text-mist">{k}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex h-12 items-end gap-1.5">
              {[40, 66, 50, 82, 58, 92, 70].map((b, bi) => (
                <div key={bi} className="flex-1 rounded-sm bg-gradient-to-t from-primary-600 to-primary-400" style={{ height: `${b}%` }} />
              ))}
            </div>
          </div>
        </Panel>
      );
  }
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[320px] w-full max-w-md items-center justify-center overflow-hidden rounded-[28px] border border-ink/6 bg-white/80 p-8 shadow-card backdrop-blur-md",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 60% at 50% 0%, rgb(219 234 254 / 0.5) 0%, transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}