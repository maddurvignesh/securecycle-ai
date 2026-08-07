"use client";

import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Globe, RecyclingArrows } from "@/components/ui/World";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-32">
      {/* deep space backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 90% at 50% 110%, rgb(30 58 138 / 0.08) 0%, transparent 55%), radial-gradient(50% 50% at 85% 10%, rgb(34 197 94 / 0.07) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 dot-pattern opacity-40" />
      </div>

      <div className="container-x relative flex flex-col items-center text-center">
        <Reveal>
          <div className="relative h-48 w-48 sm:h-60 sm:w-60">
            <div className="absolute -inset-10 opacity-60">
              <Globe stars animate={!reduced} />
            </div>
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 opacity-90">
              <div className="h-full w-full animate-spin-slow">
                <RecyclingArrows className="h-full w-full" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tighter text-ink sm:text-5xl md:text-6xl">
            Ready to give every device a
            <span className="font-serif italic font-normal text-gradient-blue"> secure goodbye?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            Join the enterprises that wipe data, restore trust and sustain tomorrow — with one
            platform that verifies every single byte.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg" as="a" href="/login">
              Launch Platform
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
            <Button variant="ghost" size="lg">
              Book a pilot
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.24em] text-mist">
            Smart India Hackathon 2026 · Built for a safer digital India
          </p>
        </Reveal>
      </div>
    </section>
  );
}
