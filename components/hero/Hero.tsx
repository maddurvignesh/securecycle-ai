"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { STAT_CARDS } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { Laptop3D } from "@/components/laptop/Laptop3D";
import { ProductScreen } from "./ProductScreen";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const zero = useMotionValue(0);
  const open = useMotionValue(1);

  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 140, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 140, damping: 20 });
  const glowX = useTransform(px, [0, 1], ["30%", "70%"]);
  const glowY = useTransform(py, [0, 1], ["30%", "70%"]);

  const onMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      onMouseMove={onMove}
      className="relative flex min-h-screen flex-col overflow-hidden px-6 pb-16 pt-36 lg:pt-40"
    >
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div
          className="absolute inset-x-0 -top-40 h-[560px]"
          style={{
            background: "radial-gradient(52% 100% at 50% 0%, rgb(219 234 254 / 0.85) 0%, rgb(255 255 255 / 0) 70%)",
          }}
        />
        <motion.div
          className="absolute right-[8%] top-[20%] h-[460px] w-[460px]"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgb(37 99 235 / 0.12), transparent 65%)`
            ),
          }}
        />
      </div>

      <div className="container-x relative z-10 grid flex-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---- editorial left ---- */}
        <motion.div variants={container} initial="hidden" animate={active ? "show" : "hidden"}>
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-50/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-500" />
              </span>
              SecureCycle AI · Live
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tighter text-ink"
          >
            Erase Data.
            <br />
            Restore <span className="font-serif italic font-normal text-gradient-blue">Trust.</span>
            <br />
            <span className="text-gradient-ink">Sustain Tomorrow.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-lg text-base leading-relaxed text-mist md:text-lg">
            AI-powered secure data wiping and certified IT asset recycling. Every drive is scanned,
            every byte dissolved, every device given a verified second life.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col items-start gap-4 sm:flex-row">
            <Button variant="primary" size="lg" as="a" href="/login">
              Launch Platform
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
            <Button variant="ghost" size="lg">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600/10 text-primary-600">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch Experience
            </Button>
          </motion.div>

          {/* trust badges */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            {["NIST 800-88", "ISO 27001", "GDPR Ready", "R2 Certified"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mist">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-success-500" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ---- floating product right ---- */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <div style={{ perspective: 1600 }}>
            <motion.div
              style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformStyle: "preserve-3d" }}
              animate={reduced ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="scale-[0.62] sm:scale-[0.8] lg:scale-100">
                <Laptop3D
                  open={open}
                  wipe={zero}
                  beam={zero}
                  rotateY={zero}
                  tilt={zero}
                  screen={<ProductScreen />}
                />
              </div>
            </motion.div>
          </div>

          {/* floating badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="absolute -left-2 top-6 sm:left-0"
          >
            <div className="glass flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lift">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success-50 ring-1 ring-success-200">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-success-600" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <div>
                <p className="font-mono text-sm font-bold leading-none text-ink">100%</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-wider text-mist">Verified</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="absolute -right-2 bottom-10 sm:right-0"
          >
            <div className="glass flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lift">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 ring-1 ring-primary-200">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v5c0 4.6-3 8.6-7 10-4-1.4-7-5.4-7-10V6zM9 12l2 2 4-4" />
                </svg>
              </span>
              <div>
                <p className="font-mono text-sm font-bold leading-none text-ink">18,450</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-wider text-mist">Certificates</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* stat strip */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={active ? "show" : "hidden"}
        className="container-x relative z-10 mt-14"
      >
        <div className="grid grid-cols-2 gap-3 rounded-3xl border border-ink/6 bg-white/70 p-4 shadow-card backdrop-blur-md sm:grid-cols-4 sm:gap-4 sm:p-6">
          {STAT_CARDS.map((s) => (
            <motion.div key={s.label} variants={item}>
              <TiltCard max={8} glare={false}>
                <div className="flex flex-col items-center text-center">
                  <span className="shimmer-text bg-[length:200%_auto] font-mono text-2xl font-bold tracking-tight md:text-[26px]">
                    {s.value}
                  </span>
                  <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-mist">
                    {s.label}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-mist"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">The Story</span>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/15 p-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-primary-500"
            animate={reduced ? {} : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.a>
    </section>
  );
}
