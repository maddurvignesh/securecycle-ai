"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Bell,
  Clock,
  Compass,
  Globe,
  KeyRound,
  Mail,
  MapPin,
  Medal,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Card } from "@/components/app-ui/card";
import { Badge } from "@/components/app-ui/badge";
import { Avatar, AvatarFallback } from "@/components/app-ui/avatar";
import { Switch } from "@/components/app-ui/switch";
import { Timeline } from "@/components/app/Timeline";
import { useApp } from "@/components/providers/AppProvider";
import { initials, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

const ACHIEVEMENTS = [
  { title: "1,000 wipes verified", desc: "Sanitized 1,000+ devices with zero recovery", Icon: Trophy, tone: "amber" },
  { title: "Compliance champion", desc: "Maintained 96%+ score for 6 months", Icon: BadgeCheck, tone: "green" },
  { title: "Circular pioneer", desc: "Diverted 200+ tonnes from landfill", Icon: Globe, tone: "blue" },
  { title: "Risk detective", desc: "Flagged 50 high-risk assets proactively", Icon: Target, tone: "violet" },
];

const TONES: Record<string, string> = {
  amber: "bg-amber-50 text-amber-600 ring-amber-100",
  green: "bg-success-50 text-success-600 ring-success-100",
  blue: "bg-primary-50 text-primary-600 ring-primary-100",
  violet: "bg-violet-50 text-violet-600 ring-violet-100",
};

export default function ProfilePage() {
  const { user, auditLogs } = useApp();
  const [notifyEmail, setNotifyEmail] = React.useState(true);
  const [notifySms, setNotifySms] = React.useState(false);
  const [publicProfile, setPublicProfile] = React.useState(true);

  const myActivity = auditLogs.filter((l) => l.actor === user.name).slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Your account" title="Profile" desc="Manage your identity, activity and preferences." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* identity */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <Card className="relative overflow-hidden p-6 text-center">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 opacity-90" />
            <div className="pointer-events-none absolute right-4 top-4">
              <Sparkles className="h-5 w-5 text-white/70" />
            </div>
            <div className="relative">
              <Avatar className="mx-auto h-20 w-20 ring-4 ring-white">
                <AvatarFallback className="text-2xl" style={{ background: user.avatarColor }}>{initials(user.name)}</AvatarFallback>
              </Avatar>
              <p className="mt-3 text-lg font-semibold tracking-tight text-ink">{user.name}</p>
              <p className="text-sm text-mist">{user.title}</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <Badge variant="default">{user.role}</Badge>
                <Badge variant="outline">{user.company}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-left">
                {[
                  { icon: Mail, label: "Email", value: user.email },
                  { icon: MapPin, label: "Based in", value: "Bengaluru, IN" },
                  { icon: Compass, label: "Timezone", value: "IST (UTC+5:30)" },
                  { icon: KeyRound, label: "2FA", value: "Enabled" },
                ].map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.label} className="rounded-xl bg-cloud/60 p-2.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-mist">
                        <Icon className="h-3 w-3" /> {r.label}
                      </p>
                      <p className="truncate text-[12px] font-medium text-ink">{r.value}</p>
                    </div>
                  );
                })}
              </div>
              <Button className="mt-4 w-full" onClick={() => toast.success("Profile updated")}>Edit profile</Button>
            </div>
          </Card>

          {/* preferences */}
          <Card className="p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
              <Bell className="h-4 w-4 text-primary-500" /> Preferences
            </h3>
            <div className="space-y-4">
              {[
                { label: "Email notifications", desc: "Wipe completions, certificates, alerts", value: notifyEmail, set: setNotifyEmail },
                { label: "SMS for critical alerts", desc: "Only severity critical", value: notifySms, set: setNotifySms },
                { label: "Public verified profile", desc: "Show certificates on your profile", value: publicProfile, set: setPublicProfile },
              ].map((p) => (
                <div key={p.label} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-medium text-ink">{p.label}</p>
                    <p className="text-[11px] text-mist">{p.desc}</p>
                  </div>
                  <Switch checked={p.value} onCheckedChange={p.set} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* activity + achievements */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="space-y-5 lg:col-span-2">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Clock className="h-4 w-4 text-primary-500" /> Recent activity
                </h3>
                <p className="text-xs text-mist">Actions you've performed across the platform</p>
              </div>
              <Badge variant="outline">{myActivity.length} events</Badge>
            </div>
            <Timeline
              steps={(myActivity.length ? myActivity : []).map((a) => ({
                id: a.id,
                title: a.action,
                desc: `${a.action}${a.target ? ` → ${a.target}` : ""}`,
                time: timeAgo(a.timestamp),
                tone: "blue" as const,
                icon: <BadgeCheck className="h-4 w-4" />,
              }))}
            />
          </Card>

          <Card className="p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
              <Award className="h-4 w-4 text-amber-500" /> Achievements
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {ACHIEVEMENTS.map((a, i) => {
                const Icon = a.Icon;
                return (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-start gap-3 rounded-2xl border border-ink/6 p-3.5"
                  >
                    <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1", TONES[a.tone])}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{a.title}</p>
                      <p className="text-[11px] leading-snug text-mist">{a.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-ink/6 bg-gradient-to-r from-success-50/60 to-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success-100 text-success-600">
                <Medal className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Verified operator badge</p>
                <p className="text-xs text-mist">Certified for NIST 800-88 & DoD 5220.22-M operations · Renews Mar 2027</p>
              </div>
            </div>
            <Button variant="success" size="sm" onClick={() => toast.success("Badge refreshed")}>
              <ShieldCheck className="h-4 w-4" /> View badge
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}