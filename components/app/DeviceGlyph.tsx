"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AssetIcon } from "@/components/platform/shared";
import { cn } from "@/lib/utils";
import type { AssetType } from "@/lib/mock/types";

/**
 * Premium device "photograph" — a gradient stage with the device glyph,
 * a scanning beam and a soft reflection. Used in tables, drawers and wipes.
 */
export function DeviceGlyph({
  type,
  color = "#2563EB",
  className,
  size = "md",
  beam = true,
}: {
  type: AssetType;
  color?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  beam?: boolean;
}) {
  const dims = {
    sm: "h-10 w-10 rounded-xl",
    md: "h-14 w-14 rounded-2xl",
    lg: "h-24 w-24 rounded-3xl",
  }[size];

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn("relative flex shrink-0 items-center justify-center overflow-hidden ring-1", dims, className)}
      style={{
        background: `linear-gradient(150deg, ${color}22 0%, ${color}0d 55%, #ffffff 100%)`,
        ["--tw-ring-color" as string]: `${color}2e`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-3 -top-4 h-10 w-10 rounded-full blur-xl"
        style={{ background: `${color}55` }}
      />
      {beam && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden rounded-[inherit]">
          <div
            className="absolute h-full w-8 animate-beam-sweep opacity-40"
            style={{ background: `linear-gradient(90deg, transparent, ${color}66, transparent)` }}
          />
        </div>
      )}
      <AssetIcon type={type} color={color} className="relative h-[72%] w-[72%] rounded-[inherit] bg-transparent ring-0" />
      <div
        className="pointer-events-none absolute inset-x-1.5 bottom-1 h-1.5 rounded-full opacity-40 blur-[3px]"
        style={{ background: `${color}aa` }}
      />
    </motion.div>
  );
}