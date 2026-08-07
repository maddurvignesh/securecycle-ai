import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        success: {
          DEFAULT: "#22C55E",
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
        ink: {
          DEFAULT: "#111827",
          900: "#0F172A",
          800: "#1F2937",
          700: "#374151",
          600: "#4B5563",
        },
        mist: "#64748B",
        paper: "#FFFFFF",
        cloud: "#F8FAFC",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument)", "Instrument Serif", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
        tight: "-0.015em",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgb(17 24 39 / 0.05), 0 12px 32px -12px rgb(17 24 39 / 0.10)",
        lift: "0 4px 12px -4px rgb(17 24 39 / 0.06), 0 32px 64px -24px rgb(17 24 39 / 0.18)",
        glow: "0 0 0 1px rgb(37 99 235 / 0.10), 0 12px 40px -8px rgb(37 99 235 / 0.35)",
        "glow-green": "0 0 0 1px rgb(34 197 94 / 0.10), 0 12px 40px -8px rgb(34 197 94 / 0.35)",
        card: "0 1px 2px rgb(17 24 39 / 0.04), 0 8px 24px -8px rgb(17 24 39 / 0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "spin-slow": "spin 14s linear infinite",
        "spin-slower": "spin 40s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        shimmer: "shimmer 2.6s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        "beam-sweep": "beam-sweep 3.2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "beam-sweep": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
