"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "success" | "dark";
  size?: "md" | "lg";
  magnetic?: boolean;
  as?: "a" | "button";
  href?: string;
};

const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow hover:shadow-[0_0_0_1px_rgb(37_99_235/0.15),0_20px_56px_-12px_rgb(37_99_235/0.5)]",
  success:
    "bg-gradient-to-r from-success-500 to-success-600 text-white shadow-glow-green hover:shadow-[0_0_0_1px_rgb(34_197_94/0.15),0_20px_56px_-12px_rgb(34_197_94/0.5)]",
  ghost:
    "glass text-ink hover:bg-white/90 hover:shadow-lift",
  dark: "bg-ink text-white shadow-[0_12px_40px_-12px_rgb(17_24_39/0.6)] hover:shadow-[0_20px_56px_-12px_rgb(17_24_39/0.7)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", as = "button", magnetic = true, children, ...props },
    ref
  ) {
    const Comp = as === "a" ? "a" : "button";
    const classes = cn(
      "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-all duration-300 active:scale-[0.98]",
      size === "lg" ? "h-14 px-8 text-[15px]" : "h-11 px-6 text-sm",
      styles[variant],
      className
    );

    const inner = (
      <Comp ref={ref as any} className={classes} {...(props as any)}>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </Comp>
    );

    if (magnetic) {
      return <Magnetic strength={0.3}>{inner}</Magnetic>;
    }
    return inner;
  }
);
