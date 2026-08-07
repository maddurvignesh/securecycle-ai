import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn("h-9 w-9", className)}
    >
      <defs>
        <linearGradient id="lg-shield" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="0.55" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      <path
        d="M24 3.5 40.5 10v12.2c0 9.9-6.6 17.6-16.5 22.3C14.1 39.8 7.5 32.1 7.5 22.2V10L24 3.5Z"
        fill="url(#lg-shield)"
        fillOpacity="0.12"
        stroke="url(#lg-shield)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <g
        stroke="url(#lg-shield)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M30 18.5a8.2 8.2 0 1 0 1.9 8.2" />
        <path d="M31.6 13.8v4.6h-4.7" />
      </g>
      <circle cx="24" cy="24" r="2.4" fill="#2563EB" />
    </svg>
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label="SecureCycle AI — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <LogoMark className="transition-transform duration-500 group-hover:rotate-[18deg]" />
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-semibold tracking-tight text-ink">
          SecureCycle
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-primary-600">
          AI
        </span>
      </span>
    </a>
  );
}
