"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const springX = useSpring(mx, { stiffness: 320, damping: 30, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 320, damping: 30, mass: 0.6 });

  const ringX = useSpring(mx, { stiffness: 160, damping: 24, mass: 0.8 });
  const ringY = useSpring(my, { stiffness: 160, damping: 24, mass: 0.8 });

  const isAppRoute = /^\/(app|login)/.test(pathname ?? "");

  useEffect(() => {
    if (reduced || isAppRoute || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setPressed(e.buttons > 0);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, mx, my, isAppRoute]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[100] hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          x: springX,
          y: springY,
          background:
            "radial-gradient(circle, rgb(37 99 235 / 0.10) 0%, rgb(56 189 248 / 0.05) 38%, transparent 68%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[101] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 md:block"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: pressed ? 0.7 : 1, opacity: pressed ? 0.6 : 1 }}
      />
    </>
  );
}
