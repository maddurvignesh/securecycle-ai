"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Deterministic, decorative QR-style glyph rendered as SVG.
 * Seeded by `seed` so every certificate renders a stable pattern.
 */
export function QrVisual({
  seed,
  className,
  size = "auto",
}: {
  seed: string | number;
  className?: string;
  size?: string;
}) {
  const cells = React.useMemo(() => {
    let h = 1;
    const num = String(seed);
    for (let i = 0; i < num.length; i++) h = (h * 31 + num.charCodeAt(i)) >>> 0;
    const rand = () => {
      h = (h * 1664525 + 1013904223) >>> 0;
      return h / 4294967296;
    };
    const grid: boolean[][] = [];
    const dim = 21;
    for (let y = 0; y < dim; y++) {
      const row: boolean[] = [];
      for (let x = 0; x < dim; x++) row.push(rand() > 0.5);
      grid.push(row);
    }
    const finder = (cx: number, cy: number) => {
      for (let y = -1; y <= 7; y++) {
        for (let x = -1; x <= 7; x++) {
          const px = cx + x;
          const py = cy + y;
          if (px < 0 || py < 0 || px >= dim || py >= dim) continue;
          const onFinder = Math.max(Math.abs(x), Math.abs(y)) <= 6;
          const onCore = Math.max(Math.abs(x), Math.abs(y)) <= 2;
          grid[py][px] = onFinder && !onCore;
        }
      }
    };
    finder(3, 3);
    finder(dim - 4, 3);
    finder(3, dim - 4);
    return { grid, dim };
  }, [seed]);

  return (
    <svg
      viewBox={`0 0 ${cells.dim} ${cells.dim}`}
      aria-hidden
      shapeRendering="crispEdges"
      className={cn("h-full w-full", className)}
      style={{ width: size !== "auto" ? size : undefined }}
    >
      {cells.grid.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x + 0.12}
              y={y + 0.12}
              width={0.76}
              height={0.76}
              rx={0.16}
              fill="currentColor"
            />
          ) : null
        )
      )}
    </svg>
  );
}