"use client";

import { useMemo } from "react";
import { IMPACT_STATS } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { mulberry32 } from "@/lib/utils";

const rand = mulberry32(4242);

export function ImpactStats() {
  const floats = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: (i * 73) % 100,
        top: (i * 41) % 100,
        size: 10 + (i % 4) * 8,
        delay: i * 0.7,
        dur: 6 + (i % 5) * 2,
      })),
    []
  );

  return (
    <section id="impact" className="relative overflow-hidden py-28">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 dot-pattern opacity-50" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 20% 20%, rgb(219 234 254 / 0.7) 0%, transparent 60%), radial-gradient(50% 60% at 90% 80%, rgb(220 252 231 / 0.6) 0%, transparent 60%)",
          }}
        />
        {/* floating numbers */}
        {floats.map((f, i) => (
          <span
            key={i}
            aria-hidden
            className="pointer-events-none absolute select-none font-mono font-bold text-ink/5"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              fontSize: f.size,
              animation: `float-y ${f.dur}s ease-in-out ${f.delay}s infinite`,
            }}
          >
            {["98", "0", "245", "100", "63", "7", "18k"][i % 7]}
          </span>
        ))}
      </div>

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/15 bg-success-50/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-success-700">
            Live Impact
          </span>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-ink sm:text-5xl md:text-6xl">
            Measured in devices.
            <br />
            <span className="font-serif italic font-normal text-gradient-blue">Not promises.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {IMPACT_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="h-full">
              <div className="group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-ink/8 bg-white/80 px-4 py-10 text-center shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(80% 60% at 50% 0%, rgb(219 234 254 / 0.5) 0%, transparent 70%)",
                    }}
                  />
                </div>
                <span className="relative font-mono text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                </span>
                <span className="relative mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-mist">
                  {s.label}
                </span>
                {s.note && (
                  <span className="relative mt-1 text-[10px] uppercase tracking-widest text-success-600">
                    {s.note}
                  </span>
                )}
                {/* spark dot */}
                <span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-success-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* ticker */}
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-[0.2em] text-mist">
            {["NIST 800-88", "DoD 5220.22-M", "ISO 27001", "GDPR Ready", "R2 Certified", "e-Stewards"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary-400" />
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
