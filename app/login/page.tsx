"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { LogoMark } from "@/components/ui/Logo";
import { Button } from "@/components/app-ui/button";
import { Input } from "@/components/app-ui/input";
import { Label } from "@/components/app-ui/label";
import { Checkbox } from "@/components/app-ui/checkbox";
import { useApp } from "@/components/providers/AppProvider";
import { cn } from "@/lib/utils";

const ROLES = [
  { id: "Admin", desc: "Full platform control" },
  { id: "IT Manager", desc: "Assets, wipes & teams" },
  { id: "Auditor", desc: "Read-only compliance view" },
  { id: "Technician", desc: "Execute wipes in field" },
] as const;

const schema = z.object({
  email: z.string().email("Enter a valid work email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useApp();
  const [role, setRole] = React.useState<(typeof ROLES)[number]["id"]>("IT Manager");
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "demo@securecycle.ai", password: "securecycle", remember: true },
  });

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    signIn(role);
    toast.success(`Signed in as ${role}`);
    setTimeout(() => {
      router.push("/app/dashboard");
      setLoading(false);
    }, 700);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFC] px-5 py-10">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgb(219 234 254 / 0.9), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-32 h-[620px] w-[620px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgb(220 252 231 / 0.85), transparent 65%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1020px] overflow-hidden rounded-[32px] border border-ink/6 bg-white/85 shadow-lift backdrop-blur-xl"
      >
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          {/* left — brand panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#10203F] to-[#123B84] p-10 text-white lg:flex">
            <div className="pointer-events-none absolute inset-0 dot-pattern opacity-20" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-success-500/20 blur-3xl" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
                <LogoMark className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight">SecureCycle AI</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-blue-300">Enterprise</p>
              </div>
            </div>

            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-blue-100 ring-1 ring-white/15">
                <Sparkles className="h-3.5 w-3.5" /> NIST 800-88 · ISO 27001 · GDPR ready
              </div>
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight">
                Erase data.
                <br />
                Restore <span className="font-serif italic text-blue-200">trust.</span>
                <br />
                Sustain <span className="font-serif italic text-emerald-300">tomorrow.</span>
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-blue-100/70">
                The enterprise platform for verified secure data wiping and circular IT asset recycling — audited end-to-end.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { v: "18,450", k: "Certificates" },
                  { v: "3,104", k: "Wipes" },
                  { v: "96.8%", k: "Compliance" },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl bg-white/5 p-3.5 ring-1 ring-white/10 backdrop-blur">
                    <p className="text-xl font-semibold">{s.v}</p>
                    <p className="text-[11px] text-blue-200/70">{s.k}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="relative text-xs text-blue-200/50">© 2026 SecureCycle AI · Smart India Hackathon</p>
          </div>

          {/* right — form */}
          <div className="p-8 sm:p-12">
            <div className="mb-8 flex items-center gap-2.5 lg:hidden">
              <LogoMark className="h-8 w-8" />
              <div className="leading-none">
                <p className="text-sm font-semibold text-ink">SecureCycle AI</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-primary-600">Enterprise</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Welcome back</h2>
              <p className="mt-1 text-sm text-mist">Sign in to your SecureCycle workspace.</p>
            </div>

            {/* role selection */}
            <div className="mt-6">
              <Label className="mb-2">Sign in as</Label>
              <div className="grid grid-cols-2 gap-2.5">
                {ROLES.map((r) => {
                  const active = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={cn(
                        "rounded-2xl border p-3 text-left transition-all duration-200",
                        active
                          ? "border-primary-500 bg-primary-50/60 shadow-card"
                          : "border-ink/8 hover:border-primary-200"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full", active ? "bg-primary-500" : "bg-slate-300")} />
                        <span className={cn("text-sm font-semibold", active ? "text-primary-700" : "text-ink")}>
                          {r.id}
                        </span>
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-mist">{r.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Work email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
                  <Input id="email" type="email" placeholder="you@company.com" className="pl-10" {...register("email")} />
                </div>
                {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs font-medium text-primary-600 hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
                  <Input
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mist hover:text-ink"
                    aria-label="Toggle password visibility"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-rose-500">{errors.password.message}</p>}
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="remember" {...register("remember")} />
                <label htmlFor="remember" className="text-sm text-mist">
                  Remember me for 30 days
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" /> Sign in to workspace
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-mist">
              <ShieldCheck className="h-3.5 w-3.5 text-success-500" />
              SOC 2 Type II · Encrypted session · Zero-log retention
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}