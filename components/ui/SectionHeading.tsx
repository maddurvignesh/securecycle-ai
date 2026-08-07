"use client";

import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "relative z-10",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal y={16}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-50/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08} y={24}>
        <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-ink sm:text-5xl md:text-6xl">
          {title}{" "}
          {accent && (
            <span className="font-serif italic font-normal text-gradient-blue">
              {accent}
            </span>
          )}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16} y={20}>
          <p className={cn("mt-6 text-base leading-relaxed text-mist md:text-lg", align === "center" && "mx-auto max-w-xl")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
