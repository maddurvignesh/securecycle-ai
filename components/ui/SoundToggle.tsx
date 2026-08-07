"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function SoundToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      stopRef.current?.();
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  const start = () => {
    if (ctxRef.current) return;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.012;
    master.connect(ctx.destination);

    // airy low drone
    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.value = 55;
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = 82.4;
    const o3 = ctx.createOscillator();
    o3.type = "triangle";
    o3.frequency.value = 164.8;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    filter.Q.value = 0.8;

    const g1 = ctx.createGain();
    g1.gain.value = 0.5;
    const g2 = ctx.createGain();
    g2.gain.value = 0.35;
    const g3 = ctx.createGain();
    g3.gain.value = 0.12;

    o1.connect(g1).connect(filter).connect(master);
    o2.connect(g2).connect(filter).connect(master);
    o3.connect(g3).connect(filter).connect(master);
    [o1, o2, o3].forEach((o) => o.start());

    // slow swell
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.5;
    lfo.connect(lfoGain).connect(master.gain);
    lfo.start();

    stopRef.current = () => {
      [o1, o2, o3, lfo].forEach((o) => {
        try {
          o.stop();
        } catch { /* noop */ }
      });
    };
  };

  const toggle = async () => {
    if (!on) {
      await ctxRef.current?.resume().catch(() => {});
      start();
      setOn(true);
    } else {
      stopRef.current?.();
      stopRef.current = null;
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
      setOn(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
        on
          ? "border-primary/20 bg-primary-600/10 text-primary-600"
          : "border-ink/10 bg-white/70 text-mist hover:border-primary-300 hover:text-primary-600",
        className
      )}
    >
      {on ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5 6 9H2v6h4l5 4zM16 9l6 6M22 9l-6 6" />
        </svg>
      )}
      <span className={cn("absolute inset-0 rounded-full transition-opacity", on && "animate-pulse-ring border border-primary-400/40")} />
    </button>
  );
}