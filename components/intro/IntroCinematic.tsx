"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { stopScroll, startScroll } from "@/lib/scroll";

const SHIELD = "M24 22l12 6v10c0 8.4-5.2 15.3-12 19-6.8-3.7-12-10.6-12-19V28l12-6z";

export function IntroCinematic({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const finishing = useRef(false);
  const reduced = useReducedMotion();

  const finish = () => {
    if (finishing.current || !rootRef.current) return;
    finishing.current = true;
    tlRef.current?.kill();
    gsap.to(rootRef.current, {
      opacity: 0,
      scale: 1.04,
      filter: "blur(10px)",
      duration: 0.55,
      ease: "power2.inOut",
      onComplete: () => {
        startScroll();
        onComplete();
      },
    });
  };

  useEffect(() => {
    if (reduced) {
      startScroll();
      onComplete();
      return;
    }
    stopScroll();

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(rootRef);
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.to(rootRef.current, {
            opacity: 0,
            scale: 1.035,
            filter: "blur(8px)",
            duration: 1.0,
            ease: "power2.inOut",
            onComplete: () => {
              startScroll();
              onComplete();
            },
          });
        },
      });
      tlRef.current = tl;

      /* ambient mesh */
      tl.fromTo(
        q(".orb-1"),
        { xPercent: -4, yPercent: 6, scale: 0.9, opacity: 0 },
        { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, duration: 2.4, ease: "power2.out" },
        0
      );
      tl.fromTo(
        q(".orb-2"),
        { xPercent: 5, yPercent: -5, scale: 0.85, opacity: 0 },
        { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, duration: 2.6, ease: "power2.out" },
        0.1
      );

      /* emblem */
      tl.fromTo(
        q(".em-pulse"),
        { scale: 0.6, opacity: 0 },
        { scale: 1.35, opacity: 1, duration: 1.2, ease: "power3.out" },
        0.1
      );
      tl.fromTo(
        q(".em-tile"),
        { scale: 0.7, opacity: 0, rotate: -6 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: "back.out(1.7)" },
        0.15
      );
      tl.fromTo(q(".em-ring"), { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.3);

      /* wordmark rises */
      tl.fromTo(
        q(".wm-1"),
        { y: 60, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0 },
        0.75
      );
      tl.fromTo(
        q(".wm-2"),
        { y: 66, opacity: 0, filter: "blur(12px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.05 },
        1.05
      );
      tl.fromTo(
        q(".wm-ai"),
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.8)" },
        1.85
      );

      /* tagline + bar */
      tl.fromTo(
        q(".wm-tag"),
        { y: 20, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
        2.0
      );
      tl.fromTo(q(".wm-bar"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 2.15);

      /* sheen sweep */
      tl.fromTo(
        q(".wm-sheen"),
        { xPercent: -130 },
        { xPercent: 130, duration: 1.1, ease: "power1.inOut" },
        2.6
      );

      /* final pulse */
      tl.fromTo(
        q(".em-pulse"),
        { scale: 1.35, opacity: 0.9 },
        { scale: 1.75, opacity: 0, duration: 1.1, ease: "power1.out" },
        3.0
      );
      tl.fromTo(q(".intro-holder"), { scale: 1 }, { scale: 1.015, duration: 1.6, ease: "sine.inOut" }, 3.0);

      /* progress hairline */
      tl.to(q(".intro-progress-fill"), { scaleX: 1, duration: 4.2, ease: "none" }, 0);
    }, rootRef);

    const onSkip = () => finish();
    window.addEventListener("wheel", onSkip, { passive: true });
    window.addEventListener("touchstart", onSkip, { passive: true });
    window.addEventListener("keydown", onSkip);

    return () => {
      ctx.revert();
      window.removeEventListener("wheel", onSkip);
      window.removeEventListener("touchstart", onSkip);
      window.removeEventListener("keydown", onSkip);
      startScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[60] overflow-hidden bg-[#F9FAFC]">
      {/* ambient mesh */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
      <div
        className="orb-1 pointer-events-none absolute -left-32 top-[-20%] h-[70vh] w-[70vh] rounded-full opacity-0"
        style={{
          background: "radial-gradient(circle at center, rgb(219 234 254 / 0.85), transparent 65%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="orb-2 pointer-events-none absolute bottom-[-25%] right-[-15%] h-[75vh] w-[75vh] rounded-full opacity-0"
        style={{
          background: "radial-gradient(circle at center, rgb(220 252 231 / 0.8), transparent 65%)",
          filter: "blur(34px)",
        }}
      />
      {/* dust */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-primary-400/35"
            style={{
              width: 2 + (i % 3) * 2,
              height: 2 + (i % 3) * 2,
              left: `${(i * 59) % 100}%`,
              top: `${(i * 41) % 100}%`,
              animation: `float-y ${5 + (i % 5)}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* center content */}
      <div className="intro-holder relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
        {/* emblem */}
        <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
          <div
            className="em-pulse absolute inset-0 rounded-[30px] opacity-0"
            style={{ boxShadow: "0 0 0 2px rgb(37 99 235 / 0.25), 0 0 70px 6px rgb(37 99 235 / 0.35)" }}
          />
          <div
            className="em-ring absolute inset-0 rounded-[30px] opacity-0"
            style={{
              background: "conic-gradient(from 0deg, #2563EB, #22C55E, #93C5FD, #2563EB)",
              animation: "spin 6s linear infinite",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: 2,
            }}
          />
          <div className="em-tile absolute inset-1.5 flex items-center justify-center rounded-[24px] bg-white shadow-lift opacity-0">
            <svg viewBox="0 0 100 100" className="h-14 w-14" fill="none">
              <defs>
                <linearGradient id="introGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#2563EB" />
                  <stop offset="1" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <path
                d="M36 58c0 7 5 12 9 14 4-2 9-7 9-14l-4-9 4-14-9-3-9 3 4 14z"
                fill="url(#introGrad)"
                stroke="rgb(255 255 255 / 0.5)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* wordmark */}
        <h1 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-0 text-6xl font-semibold leading-none tracking-tight text-ink sm:text-8xl">
          <span className="wm-1">Secure</span>
          <span className="wm-2 font-serif italic font-normal text-gradient-blue">Cycle</span>
          <span className="wm-ai mt-2 inline-flex h-min items-center rounded-full bg-gradient-to-br from-primary-600 to-primary-500 px-3 text-base font-bold uppercase tracking-widest text-white shadow-glow sm:text-xl">
            AI
          </span>
        </h1>

        <div className="wm-bar mt-8 h-px w-40 origin-left bg-gradient-to-r from-primary-500/0 via-primary-500/70 to-success-500/0" style={{ transform: "scaleX(0)" }} />

        <p className="wm-tag mt-6 text-sm font-medium uppercase tracking-[0.32em] text-mist sm:text-base">
          Certified secure wipe · Circular by design
        </p>

        {/* sheen sweep */}
        <div className="pointer-events-none relative mt-6 h-px w-[320px] overflow-hidden opacity-60 sm:w-[520px]">
          <div className="wm-sheen h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </div>

      {/* progress hairline */}
      <div className="pointer-events-none absolute left-0 top-0 z-30 h-[2px] w-full bg-ink/6">
        <div
          className="intro-progress-fill h-full w-full origin-left scale-x-0 bg-gradient-to-r from-primary-600 via-primary-400 to-success-500"
        />
      </div>

      {/* skip */}
      <button
        onClick={finish}
        className="absolute right-5 top-5 z-30 flex items-center gap-2 rounded-full border border-ink/8 bg-white/70 px-4 py-2 text-xs font-medium text-mist backdrop-blur-md transition-colors hover:border-primary-300 hover:text-primary-700 sm:right-8 sm:top-7"
      >
        Skip
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      {/* brand mark */}
      <div className="absolute left-5 top-5 z-30 flex items-center gap-2 sm:left-8 sm:top-7">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-500">
          <svg viewBox="0 0 48 48" className="h-4.5 w-4.5 text-white">
            <path d="M24 6 36 11v9.8c0 8-5.3 14.2-12 18-6.7-3.8-12-10-12-18V11z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-sm font-semibold tracking-tight text-ink">SecureCycle</span>
      </div>
    </div>
  );
}