"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/app-ui/button";

export function Pagination({
  page,
  pages,
  onPage,
  total,
  className,
}: {
  page: number;
  pages: number;
  onPage: (p: number) => void;
  total: number;
  className?: string;
}) {
  if (pages <= 1) return null;

  const nums = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <p className="text-[13px] text-mist">
        Showing{" "}
        <span className="font-semibold text-ink">
          {pages > 1 ? `${(page - 1) * 10 + 1}–${Math.min(page * 10, total)}` : `1–${total}`}
        </span>{" "}
        of <span className="font-semibold text-ink">{total}</span>
      </p>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {nums.map((n) => (
          <button
            key={n}
            onClick={() => onPage(n)}
            className={cn(
              "h-8 min-w-8 rounded-lg px-2 text-sm font-medium transition-colors",
              n === page
                ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow"
                : "text-mist hover:bg-slate-100 hover:text-ink"
            )}
            aria-current={n === page ? "page" : undefined}
          >
            {n}
          </button>
        ))}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg"
          disabled={page >= pages}
          onClick={() => onPage(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}