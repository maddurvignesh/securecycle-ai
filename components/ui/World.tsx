"use client";

import { cn } from "@/lib/utils";

export function Globe({
  className,
  animate = true,
  stars = false,
}: {
  className?: string;
  animate?: boolean;
  stars?: boolean;
}) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      {stars && (
        <div className="absolute -inset-8">
          <Stars />
        </div>
      )}
      <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_30px_60px_rgb(37_99_235/0.25)]">
        <defs>
          <radialGradient id="globe-base" cx="0.35" cy="0.3" r="0.95">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="45%" stopColor="#2563EB" />
            <stop offset="78%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </radialGradient>
          <linearGradient id="globe-land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
          <clipPath id="globe-clip">
            <circle cx="100" cy="100" r="92" />
          </clipPath>
        </defs>

        <circle cx="100" cy="100" r="92" fill="url(#globe-base)" />

        <g clipPath="url(#globe-clip)">
          {/* rotating meridians */}
          <g className={animate ? "animate-spin-slower" : ""} style={{ transformOrigin: "100px 100px" }}>
            {Array.from({ length: 7 }).map((_, i) => {
              const rx = 92 - i * 14;
              return (
                <ellipse
                  key={i}
                  cx="100"
                  cy="100"
                  rx={Math.max(2, rx)}
                  ry="92"
                  fill="none"
                  stroke="rgb(255 255 255 / 0.10)"
                  strokeWidth="1"
                />
              );
            })}
          </g>
          {/* latitude curves */}
          {[-46, -24, 0, 24, 46].map((y) => (
            <ellipse
              key={y}
              cx="100"
              cy={100 + y}
              rx={Math.sqrt(Math.max(0, 92 * 92 - y * y))}
              ry={14}
              fill="none"
              stroke="rgb(255 255 255 / 0.08)"
              strokeWidth="1"
            />
          ))}
          {/* stylized land */}
          <path
            d="M70 30c-14 10-22 26-18 42 3 12 12 20 10 32-2 14-14 20-16 34-2 12 6 22 8 30"
            fill="none"
            stroke="url(#globe-land)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M150 52c10 12 12 30 4 44-8 14-20 20-22 34-2 10 4 16 2 24"
            fill="none"
            stroke="url(#globe-land)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="96" cy="70" r="12" fill="rgb(74 222 128 / 0.35)" />
          <circle cx="136" cy="96" r="8" fill="rgb(74 222 128 / 0.3)" />
        </g>

        {/* sphere shading */}
        <circle cx="100" cy="100" r="92" fill="url(#globe-highlight)" opacity="0.9" />
        <defs>
          <radialGradient id="globe-highlight" cx="0.3" cy="0.22" r="1">
            <stop offset="0%" stopColor="rgb(255 255 255 / 0.28)" />
            <stop offset="42%" stopColor="rgb(255 255 255 / 0.04)" />
            <stop offset="72%" stopColor="rgb(15 23 42 / 0.12)" />
            <stop offset="100%" stopColor="rgb(15 23 42 / 0.34)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function Stars() {
  const cells = [
    [12, 20, 1.5], [24, 8, 1], [38, 30, 2], [52, 12, 1.2], [68, 26, 1],
    [80, 10, 1.8], [92, 34, 1.2], [8, 52, 1.2], [30, 58, 1], [50, 46, 2],
    [70, 54, 1], [88, 48, 1.6], [14, 78, 1], [40, 82, 1.6], [60, 76, 1.2],
    [82, 72, 1.4], [96, 90, 1],
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {cells.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#93C5FD" opacity={0.7} className="animate-pulse" style={{ animationDuration: `${2 + i * 0.3}s` }} />
      ))}
    </svg>
  );
}

export function RecyclingArrows({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="rc-arr" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#rc-arr)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 22a38 38 0 0 1 32 18.5" />
        <path d="M92 41.5 95 24 77 28" />
        <path d="M60 98a38 38 0 0 1-32-18.5" />
        <path d="M28 78.5 25 96l18-4" />
        <path d="M28 53a38 38 0 0 1 32-18.5" />
      </g>
      <circle cx="60" cy="60" r="11" fill="url(#rc-arr)" />
      <path d="M56 60l3 3 5-6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Truck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 150" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="truck-body" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#334155" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="truck-green" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#22C55E" />
          <stop offset="1" stopColor="#16A34A" />
        </linearGradient>
      </defs>
      <rect x="20" y="34" width="150" height="84" rx="10" fill="url(#truck-body)" />
      <rect x="20" y="28" width="150" height="18" rx="9" fill="#475569" />
      <circle cx="70" cy="128" r="20" fill="#0F172A" />
      <circle cx="70" cy="128" r="10" fill="#64748B" />
      <circle cx="118" cy="128" r="20" fill="#0F172A" />
      <circle cx="118" cy="128" r="10" fill="#64748B" />
      <path d="M60 128h20" stroke="#94A3B8" strokeWidth="3" />
      <path d="M108 128h20" stroke="#94A3B8" strokeWidth="3" />
      {/* recycling leaf on cab */}
      <path d="M200 60h74a14 14 0 0 1 14 14v24a14 14 0 0 1-14 14h-74l-16-26z" fill="url(#truck-green)" />
      <path d="M210 72l8 8-8 8M222 72l8 8-8 8" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M180 34v30M180 34l10 8M180 34l-10 8" stroke="#64748B" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* cargo — a wiped laptop box */}
      <rect x="34" y="46" width="34" height="34" rx="4" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="2" />
      <path d="M44 70l5-12 5 12M41 62h16" stroke="#2563EB" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Tree({ className, tall = false }: { className?: string; tall?: boolean }) {
  return (
    <svg viewBox="0 0 80 120" className={cn("h-full w-full", className)} aria-hidden>
      <line x1="40" y1="118" x2="40" y2="66" stroke="#94A3B8" strokeWidth="7" strokeLinecap="round" />
      <path
        d="M40 12C28 22 20 32 22 46c-10 4-14 12-12 22 2 12 12 16 20 14-4 10 2 16 10 16s14-6 10-16c8 2 18-2 20-14 2-10-2-18-12-22-2-14-10-24-18-34z"
        fill="url(#tree-grad)"
      />
      <defs>
        <linearGradient id="tree-grad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#4ADE80" />
          <stop offset="1" stopColor="#16A34A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
