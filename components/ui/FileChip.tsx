"use client";

import { cn } from "@/lib/utils";

const META_STYLES: Record<string, string> = {
  Confidential: "bg-primary-50 text-primary-700 ring-primary-200",
  Sensitive: "bg-amber-50 text-amber-700 ring-amber-200",
  Internal: "bg-slate-100 text-slate-600 ring-slate-200",
  Critical: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function FileChip({
  name,
  meta,
  className,
}: {
  name: string;
  meta: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-[150px] select-none overflow-hidden rounded-xl border border-ink/8 bg-white/85 p-3 shadow-soft backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M9 13h6M9 17h4" />
          </svg>
        </div>
        <span className="truncate font-mono text-[10px] font-medium text-ink">{name}</span>
      </div>
      <span
        className={cn(
          "mt-2.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ring-1",
          META_STYLES[meta] ?? META_STYLES.Internal
        )}
      >
        {meta}
      </span>
    </div>
  );
}
