"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAPTERS } from "@/lib/data";
import { ChapterVisual } from "./ChapterVisual";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Chapters() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const segDur = 1;
      const cross = 0.38;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(q(".chapter-rail-fill"), { scaleY: 1, duration: CHAPTERS.length, ease: "none" }, 0);

      CHAPTERS.forEach((_, i) => {
        const t = i * segDur;
        const el = q(`.chap-${i}`);

        // entrance
        tl.to(el, { autoAlpha: 1, duration: cross, ease: "power1.inOut" }, t);
        tl.fromTo(
          q(`.chap-${i} .chap-body`),
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: cross, ease: "power2.out" },
          t
        );
        // hold, then exit
        tl.to(el, { autoAlpha: 0, duration: cross, ease: "power1.inOut" }, t + segDur - cross);
        tl.to(
          q(`.chap-${i} .chap-body`),
          { y: -44, opacity: 0, duration: cross, ease: "power2.in" },
          t + segDur - cross
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative"
      style={{ height: `${100 + CHAPTERS.length * 70}vh` }}
      aria-label="The story"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* ambient */}
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 80% 20%, rgb(219 234 254 / 0.5) 0%, transparent 60%)",
          }}
        />

        {/* rail */}
        <div className="absolute left-5 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3 md:left-10">
          <div className="relative h-52 w-px bg-ink/10">
            <div className="chapter-rail-fill absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-gradient-to-b from-primary-600 to-success-500" />
          </div>
          {CHAPTERS.map((c, i) => (
            <span
              key={c.index}
              className={cn(
                "absolute h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-colors duration-300",
                i === 0 ? "bg-primary-600" : "bg-ink/25"
              )}
              style={{ top: `${(i / (CHAPTERS.length - 1)) * 100}%`, left: 0 }}
              aria-hidden
            />
          ))}
        </div>

        {/* chapters */}
        <div className="relative z-10 mx-auto grid h-full max-w-[1200px] items-center gap-6 px-6 md:px-10 lg:grid-cols-2">
          <div className="relative order-2 h-[200px] sm:h-[300px] lg:order-1 lg:h-[440px]">
            {CHAPTERS.map((c, i) => (
              <div key={c.index} className={cn("chap absolute inset-0", `chap-${i}`)} style={{ opacity: i === 0 ? 1 : 0 }}>
                <div className="flex h-full items-center justify-center">
                  <ChapterVisual index={i} />
                </div>
              </div>
            ))}
          </div>

          <div className="relative order-1 h-[360px] sm:h-[400px] lg:order-2 lg:h-[440px]">
            {CHAPTERS.map((c, i) => (
              <div key={c.index} className={cn("chap absolute inset-0", `chap-${i}`)} style={{ opacity: i === 0 ? 1 : 0 }}>
                <div className="chap-body flex h-full flex-col justify-center lg:items-start">
                  <span
                    className={cn(
                      "font-mono text-sm font-semibold uppercase tracking-[0.3em]",
                      c.accentColor === "green" ? "text-success-600" : "text-primary-600"
                    )}
                  >
                    {c.index} · {c.eyebrow}
                  </span>
                  <h3 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tighter text-ink sm:text-5xl lg:text-6xl">
                    {c.title}{" "}
                    <span
                      className={cn(
                        "font-serif italic font-normal",
                        c.accentColor === "green" ? "text-success-500" : c.accentColor === "blue" ? "text-gradient-blue" : "text-gradient-ink"
                      )}
                    >
                      {c.accent}
                    </span>
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-mist md:text-lg">
                    {c.body}
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <span className="font-mono text-4xl font-bold tracking-tight text-ink">
                      {c.stat.value}
                    </span>
                    <span className="max-w-[160px] text-xs font-medium leading-snug uppercase tracking-wider text-mist">
                      {c.stat.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* giant background index */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {CHAPTERS.map((c, i) => (
            <span
              key={c.index}
              className={cn(
                "chap absolute bottom-[-4vw] right-[2vw] select-none font-mono font-bold leading-none text-ink/4",
                `chap-${i}`
              )}
              style={{ fontSize: "clamp(12rem, 26vw, 26rem)", opacity: i === 0 ? 1 : 0 }}
            >
              {c.index}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
