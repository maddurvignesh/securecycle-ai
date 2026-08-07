"use client";

import { useEffect, useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type Laptop3DProps = {
  /** 0 = closed, 1 = open */
  open: MotionValue<number>;
  /** 0..1 wipe progress (screen switches to wipe state when > 0) */
  wipe: MotionValue<number>;
  /** > 0 shows scanning beam sweep */
  beam: MotionValue<number>;
  /** degrees, idle rotateY swing */
  rotateY: MotionValue<number>;
  /** 0..1 tips the whole machine back (scene 6) */
  tilt: MotionValue<number>;
  /** screen state override */
  state?: "data" | "wipe" | "secure";
  /** optional custom screen content (replaces default screen states) */
  screen?: React.ReactNode;
  /** runtime percent override triggered by wipe MV (smart default) */
  showWipePct?: boolean;
  className?: string;
};

const KEY_ROWS = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.55],
  [1.6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.55],
  [1.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4, 1.4],
  [2.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4, 1.4],
  [2.9, 1, 1, 1, 1, 1, 1, 1, 1, 1.6, 1, 1.4],
  [3.6, 1, 1, 1, 1, 1, 1, 1, 1, 1.9, 1.4],
];

export function Laptop3D({
  open,
  wipe,
  beam,
  rotateY,
  tilt,
  state = "data",
  screen,
  className,
}: Laptop3DProps) {
  const lidRotate = useTransform(open, (v) => -88 + 88 * v);
  const beamX = useTransform(beam, (v) => `${-120 + 240 * v}%`);
  const wipePct = useTransform(wipe, (v) => Math.round(v * 100));
  const tiltVal = useTransform(tilt, (v) => v * 26);

  return (
    <div
      className={cn("relative", className)}
      style={{ perspective: 1800, perspectiveOrigin: "50% 38%" }}
      aria-hidden
    >
      {/* ground shadow */}
      <div
        className="absolute left-1/2 top-1/2 h-[150px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(17 24 39 / 0.16) 0%, rgb(17 24 39 / 0.05) 45%, transparent 72%)",
          filter: "blur(6px)",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[400px] w-[560px]"
        style={{
          x: "-50%",
          y: "-50%",
          rotateX: tiltVal,
          rotateY,
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
        }}
      >
        {/* ---- LID ---- */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[340px]"
          style={{
            rotateX: lidRotate,
            transformOrigin: "50% 100%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* lid back */}
          <div
            className="absolute inset-0 rounded-[26px]"
            style={{
              transform: "translateZ(-14px)",
              backfaceVisibility: "hidden",
              background:
                "linear-gradient(160deg, #e8edf3 0%, #d3dae3 45%, #c3ccd8 100%)",
              boxShadow: "inset 0 2px 3px rgb(255 255 255 / 0.9), 0 30px 60px -30px rgb(17 24 39 / 0.35)",
            }}
          />
          {/* lid edge highlight */}
          <div
            className="absolute inset-0 rounded-[26px]"
            style={{
              transform: "translateZ(-7px)",
              border: "1px solid rgb(255 255 255 / 0.5)",
            }}
          />
          {/* screen */}
          <div
            className="absolute inset-x-3 top-3 bottom-10 overflow-hidden rounded-[18px]"
            style={{
              transform: "translateZ(6px)",
              background:
                "linear-gradient(180deg, #0a1122 0%, #0d1526 55%, #101a2f 100%)",
              boxShadow:
                "inset 0 0 0 1px rgb(255 255 255 / 0.06), inset 0 0 60px rgb(37 99 235 / 0.18)",
            }}
          >
            {screen ? (
              <div className="absolute inset-0">{screen}</div>
            ) : (
              <ScreenContent wipePct={wipePct} wipe={wipe} beam={beam} state={state} />
            )}
          </div>
          {/* camera notch */}
          <div
            className="absolute left-1/2 top-5 h-[6px] w-[6px] -translate-x-1/2 rounded-full"
            style={{
              transform: "translateZ(8px) translateX(-50%)",
              background: "#0b1220",
              boxShadow: "inset 0 0 2px rgb(37 99 235 / 0.7)",
            }}
          />
          {/* chin */}
          <div
            className="absolute inset-x-3 bottom-3 h-7 rounded-[10px]"
            style={{
              transform: "translateZ(5px)",
              background: "linear-gradient(180deg, #141c2e, #0d1526)",
              border: "1px solid rgb(255 255 255 / 0.05)",
            }}
          />
        </motion.div>

        {/* ---- DECK top face (keyboard) ---- */}
        <div
          className="absolute left-0 top-0 h-[320px] w-[560px]"
          style={{
            transform: "translateY(2px) rotateX(-90deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-[20px]"
            style={{
              background:
                "linear-gradient(180deg, #e9edf4 0%, #dfe5ee 40%, #d7dee9 100%)",
              boxShadow: "inset 0 0 0 1px rgb(17 24 39 / 0.06)",
            }}
          >
            <Keyboard />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 0.5) 18%, rgb(17 24 39 / 0.04) 60%, rgb(17 24 39 / 0.10) 100%)",
              }}
            />
            {/* AI wipe badge on deck */}
            <motion.div
              className="absolute right-5 top-5 rounded-lg px-2 py-1 font-mono text-[9px] font-semibold tracking-widest"
              style={{ opacity: wipe }}
            >
              <span className="text-success-600">SECURE</span>
              <span className="text-success-700/70"> · WIPE COMPLETE</span>
            </motion.div>
          </div>
        </div>

        {/* ---- DECK front face ---- */}
        <div
          className="absolute left-0 top-0 h-[34px] w-[560px] rounded-b-[16px]"
          style={{
            transform: "translateZ(150px) translateY(19px)",
            background:
              "linear-gradient(180deg, #d4dbe6 0%, #b9c2d0 60%, #a9b2c2 100%)",
            boxShadow: "inset 0 -6px 12px rgb(17 24 39 / 0.08)",
          }}
        />
        {/* deck side skirts (left + right) */}
        <div
          className="absolute left-0 top-0 h-[320px] w-[34px]"
          style={{
            transform: "translateX(-16px) translateY(2px) rotateY(-90deg)",
            transformOrigin: "100% 50%",
            background: "linear-gradient(180deg, #cdd5e0, #b6bfcd)",
          }}
        />
      </motion.div>
    </div>
  );
}

function Keyboard() {
  const gap = 8;
  const rowH = 26;
  const pad = 22;
  const startY = 34;
  const keyH = 20;
  const totalRow = 110;
  const cols = 12;
  const unit = (560 - pad * 2 - gap * (cols - 1)) / cols;

  return (
    <div className="absolute inset-x-0" style={{ height: totalRow + startY }}>
      {KEY_ROWS.map((row, r) => {
        let x = pad;
        return (
          <div
            key={r}
            className="absolute flex"
            style={{ top: startY + r * (rowH + 6), gap }}
          >
            {row.map((w, i) => {
              const kw = Math.round(unit * w + gap * (w - 1));
              const el = (
                <div
                  key={i}
                  style={{
                    width: kw,
                    height: keyH,
                    background: "linear-gradient(180deg, #ffffff 0%, #e9edf4 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgb(255 255 255 / 0.9), 0 1px 0 rgb(17 24 39 / 0.08), 0 2px 3px -1px rgb(17 24 39 / 0.12)",
                  }}
                  className="rounded-[5px]"
                />
              );
              x += kw + gap;
              return el;
            })}
          </div>
        );
      })}
      {/* trackpad */}
      <div
        className="absolute rounded-[10px]"
        style={{
          left: "50%",
          bottom: -8,
          width: 180,
          height: 64,
          transform: "translateX(-50%)",
          background: "linear-gradient(180deg, #d3dae5, #c7d0dd)",
          boxShadow: "inset 0 1px 2px rgb(17 24 39 / 0.12)",
          border: "1px solid rgb(17 24 39 / 0.05)",
        }}
      />
      {/* style keys */}
    </div>
  );
}

function ScreenContent({
  wipePct,
  wipe,
  beam,
  state,
}: {
  wipePct: MotionValue<number>;
  wipe: MotionValue<number>;
  beam: MotionValue<number>;
  state: "data" | "wipe" | "secure";
}) {
  const wipeOpacity = useTransform(wipe, (v) => (v > 0 ? 1 : 0));
  const beamOpacity = useTransform(beam, (v) => (v > 0 ? 1 : 0));
  const beamX = useTransform(beam, (v) => `${-120 + 240 * v}%`);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    return wipe.on("change", (v) => {
      if (pctRef.current) pctRef.current.textContent = String(Math.round(v * 100));
    });
  }, [wipe]);

  return (
    <div className="absolute inset-0">
      {/* faint data lines */}
      <div className="absolute inset-0 p-5">
        <div className="grid h-full grid-cols-3 gap-3">
          {["HR Records", "Payroll.xlsx", "Passwords", "Customers.db", "Invoices.pdf", "Contracts"].map((f, i) => (
            <div
              key={f}
              className="flex flex-col justify-end rounded-lg border border-white/8 bg-white/[0.03] p-2"
              style={{ opacity: 0.9 - i * 0.08 }}
            >
              <span className="h-1.5 w-8 rounded-full bg-primary-400/60" />
              <span className="mt-1.5 font-mono text-[7px] text-white/45">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scan beam */}
      <motion.div className="absolute left-0 right-0 top-0 bottom-0" style={{ opacity: beamOpacity }}>
        <motion.div
          className="absolute inset-y-0 w-[32%]"
          style={{
            x: beamX,
            background:
              "linear-gradient(90deg, transparent, rgb(37 99 235 / 0.16) 45%, rgb(56 189 248 / 0.35) 50%, rgb(37 99 235 / 0.16) 55%, transparent)",
          }}
        >
          <div
            className="absolute inset-y-0 left-1/2 w-px bg-primary-300/70"
            style={{ boxShadow: "0 0 18px 2px rgb(59 130 246 / 0.6)" }}
          />
        </motion.div>
      </motion.div>

      {/* wipe state */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a1122]/70 backdrop-blur-[2px]"
        style={{ opacity: wipeOpacity }}
      >
        <svg viewBox="0 0 120 120" className="h-24 w-24">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="7" />
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#22C55E"
            strokeWidth="7"
            strokeLinecap="round"
            pathLength={1}
            style={{
              rotate: -90,
              strokeDasharray: 1,
              strokeDashoffset: useTransform(wipePct, (p) => 1 - p / 100),
            }}
          />
        </svg>
        <motion.span
          className="mt-3 font-mono text-lg font-semibold tracking-tight text-white"
          style={{ fontSize: 18 }}
        >
          <span ref={pctRef}>0</span>%
        </motion.span>
        <span className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/50">
          {state === "secure" ? "Recovered · 0%" : "Wiping · NIST 800-88"}
        </span>
      </motion.div>

      {/* secure state */}
      {state === "secure" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-success-500/15 to-transparent">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-500/15 ring-1 ring-success-400/40">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-success-500" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-success-400">
            Verified Secure
          </span>
        </div>
      )}
    </div>
  );
}
