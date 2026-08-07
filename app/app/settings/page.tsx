"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Bot,
  CloudCog,
  Globe,
  KeyRound,
  Laptop,
  Lock,
  Monitor,
  Moon,
  Palette,
  Plus,
  ShieldCheck,
  Smartphone,
  Sun,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Card } from "@/components/app-ui/card";
import { Badge } from "@/components/app-ui/badge";
import { Input } from "@/components/app-ui/input";
import { Label } from "@/components/app-ui/label";
import { Switch } from "@/components/app-ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/app-ui/select";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/app-ui/tabs";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const API_KEYS = [
  { id: "k1", name: "Production — wipe API", key: "sk-live-••••••••••••••••9f2a", created: "2026-05-12", last: "2026-08-07", scope: "write" },
  { id: "k2", name: "Compliance webhook", key: "sk-live-••••••••••••••••41bd", created: "2026-03-03", last: "2026-07-30", scope: "read" },
  { id: "k3", name: "Sandbox — testing", key: "sk-test-••••••••••••••••7e10", created: "2026-01-20", last: "2026-08-02", scope: "read" },
];

const DEVICES = [
  { id: "d1", name: "MacBook Pro 14 · Bengaluru", type: "Mac", last: "Now", current: true },
  { id: "d2", name: "iPhone 15 · Field", type: "iOS", last: "2h ago", current: false },
  { id: "d3", name: "Chrome · Windows 11", type: "Browser", last: "Yesterday", current: false },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [tab, setTab] = React.useState("appearance");
  const [prefs, setPrefs] = React.useState({
    wipeNotifs: true,
    certNotifs: true,
    riskNotifs: true,
    digest: false,
    autoGenerate: true,
    sso: true,
    auditRetention: true,
  });

  const toggle = (k: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [k]: !p[k] }));
    toast.success("Preference updated");
  };

  const Row = ({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: () => void }) => (
    <div className="flex items-center justify-between gap-3 py-3.5">
      <div>
        <p className="text-[13px] font-medium text-ink">{label}</p>
        <p className="text-[11px] text-mist">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Workspace configuration" title="Settings" desc="Tailor appearance, notifications, security and integrations to your team." />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="appearance"><Palette className="h-4 w-4" /> Appearance</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="language"><Globe className="h-4 w-4" /> Language</TabsTrigger>
          <TabsTrigger value="security"><Lock className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="devices"><Laptop className="h-4 w-4" /> Devices</TabsTrigger>
          <TabsTrigger value="api"><KeyRound className="h-4 w-4" /> API</TabsTrigger>
        </TabsList>

        {/* appearance */}
        <TabsContent value="appearance" className="space-y-5">
          <Card className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-ink">Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "light", label: "Light", Icon: Sun },
                { id: "dark", label: "Dark", Icon: Moon },
                { id: "system", label: "System", Icon: Monitor },
              ].map((t) => {
                const Icon = t.Icon;
                const active = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all",
                      active ? "border-primary-400 bg-primary-50/60 shadow-card" : "border-ink/6 hover:border-primary-200"
                    )}
                  >
                    <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", active ? "bg-primary-600 text-white" : "bg-cloud text-mist")}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className={cn("text-sm font-medium", active ? "text-primary-700" : "text-ink")}>{t.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-cloud/60 p-3 text-[12px] text-mist">
              <CloudCog className="h-4 w-4 text-primary-500" /> Dark mode is applied across the entire workspace, including reports and dashboards.
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="mb-2 text-sm font-semibold text-ink">Workspace preferences</h3>
            <div className="divide-y divide-slate-100">
              <Row label="Compact density" desc="Show more rows in tables" checked={false} onChange={() => {}} />
              <Row label="Auto-open command palette" desc="Focus search on Ctrl+K in every page" checked={prefs.autoGenerate} onChange={() => toggle("autoGenerate")} />
              <Row label="Show live activity feed" desc="Real-time operations on the dashboard" checked={prefs.digest} onChange={() => toggle("digest")} />
            </div>
          </Card>
        </TabsContent>

        {/* notifications */}
        <TabsContent value="notifications">
          <Card className="p-5">
            <div className="divide-y divide-slate-100">
              <Row label="Wipe completions" desc="Notify when a secure wipe finishes and verifies" checked={prefs.wipeNotifs} onChange={() => toggle("wipeNotifs")} />
              <Row label="Certificate issuance" desc="Alert when a new certificate is ready" checked={prefs.certNotifs} onChange={() => toggle("certNotifs")} />
              <Row label="Risk detections" desc="Immediate alerts for critical & high-risk findings" checked={prefs.riskNotifs} onChange={() => toggle("riskNotifs")} />
              <Row label="Weekly digest" desc="Summary of compliance & operations each Monday" checked={prefs.digest} onChange={() => toggle("digest")} />
            </div>
          </Card>
        </TabsContent>

        {/* language */}
        <TabsContent value="language">
          <Card className="max-w-md p-5">
            <Label className="mb-2">Platform language</Label>
            <Select defaultValue="en">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (India)</SelectItem>
                <SelectItem value="en-us">English (US)</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-3 text-[11px] text-mist">Certificates and audit records always render in English for legal compliance.</p>
          </Card>
        </TabsContent>

        {/* security */}
        <TabsContent value="security" className="space-y-5">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-3 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-50 text-success-600">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Two-factor authentication</p>
                  <p className="text-[11px] text-mist">Authenticator app · last verified 3 days ago</p>
                </div>
              </div>
              <Badge variant="success">Enabled</Badge>
            </div>
            <div className="divide-y divide-slate-100">
              <Row label="Single sign-on (SSO)" desc="SAML 2.0 with your identity provider" checked={prefs.sso} onChange={() => toggle("sso")} />
              <Row label="Extended audit retention" desc="Keep audit logs for 90 days (policy default 30)" checked={prefs.auditRetention} onChange={() => toggle("auditRetention")} />
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" onClick={() => toast.success("Recovery codes regenerated")}>Regenerate recovery codes</Button>
              <Button variant="outline" onClick={() => toast.info("Password change form opened")}>Change password</Button>
            </div>
          </Card>
        </TabsContent>

        {/* devices */}
        <TabsContent value="devices">
          <Card className="divide-y divide-slate-100 p-0">
            {DEVICES.map((d) => (
              <div key={d.id} className="flex items-center justify-between gap-3 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cloud text-primary-500">
                    {d.type === "Mac" ? <Laptop className="h-4 w-4" /> : d.type === "iOS" ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                  </span>
                  <div>
                    <p className="text-[13px] font-medium text-ink">{d.name}</p>
                    <p className="text-[11px] text-mist">Last active {d.last}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {d.current && <Badge variant="success">Current session</Badge>}
                  <Button size="sm" variant="ghost" className="text-rose-500" onClick={() => toast.info(`${d.name} signed out`)}>
                    <Trash2 className="h-4 w-4" /> Revoke
                  </Button>
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>

        {/* API */}
        <TabsContent value="api" className="space-y-5">
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between p-5">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-ink"><KeyRound className="h-4 w-4 text-primary-500" /> API keys</h3>
                <p className="text-xs text-mist">Keys for programmatic wipe, certificate and compliance access.</p>
              </div>
              <Button size="sm" onClick={() => toast.success("New API key generated")}><Plus className="h-4 w-4" /> Create key</Button>
            </div>
            <div className="divide-y divide-slate-100">
              {API_KEYS.map((k) => (
                <div key={k.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="text-[13px] font-medium text-ink">{k.name}</p>
                    <p className="font-mono text-[11px] text-mist">{k.key}</p>
                    <p className="text-[10px] text-mist">Created {k.created} · Last used {k.last}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={k.scope === "write" ? "warning" : "secondary"} className="capitalize">{k.scope}</Badge>
                    <Button size="sm" variant="ghost" className="text-rose-500" onClick={() => toast.info(`${k.name} revoked`)}>
                      <Trash2 className="h-4 w-4" /> Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex items-center gap-3 rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50/60 to-white p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Copilot API access</p>
              <p className="text-xs text-mist">Rate limit 60 req/min · Enterprise tier · audit logging enabled</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}