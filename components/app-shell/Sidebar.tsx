"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Bot,
  FileText,
  HardDrive,
  LayoutDashboard,
  Recycle,
  ScrollText,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCircle,
  Waypoints,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";
import { LogoMark } from "@/components/ui/Logo";
import { Avatar, AvatarFallback } from "@/components/app-ui/avatar";
import { initials } from "@/lib/format";

const NAV_GROUPS = [
  {
    label: "Workspace",
    items: [
      { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/app/assets", label: "Assets", icon: HardDrive },
      { href: "/app/secure-wipe", label: "Secure Wipe", icon: ShieldCheck, accent: true },
      { href: "/app/risk", label: "Risk Assessment", icon: Sparkles },
    ],
  },
  {
    label: "Management",
    items: [
      { href: "/app/certificates", label: "Certificates", icon: ScrollText },
      { href: "/app/compliance", label: "Compliance", icon: Waypoints },
      { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/app/reports", label: "Reports", icon: FileText },
      { href: "/app/recycling", label: "Recycling", icon: Recycle },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/app/audit", label: "Audit Logs", icon: History },
      { href: "/app/notifications", label: "Notifications", icon: Bell },
      { href: "/app/copilot", label: "AI Copilot", icon: Bot },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/app/profile", label: "Profile", icon: UserCircle },
      { href: "/app/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { user, unreadCount } = useApp();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const nav = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 px-6">
        <Link href="/app/dashboard" onClick={onClose} className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight text-ink">SecureCycle</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-primary-600">Enterprise</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4 pt-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-mist/70">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200",
                      active
                        ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow"
                        : "text-mist hover:bg-white hover:text-ink hover:shadow-card"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110",
                        active ? "text-white" : "text-mist"
                      )}
                    />
                    <span>{item.label}</span>
                    {item.href === "/app/notifications" && unreadCount > 0 && (
                      <span
                        className={cn(
                          "ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                          active ? "bg-white/25 text-white" : "bg-rose-100 text-rose-600"
                        )}
                      >
                        {unreadCount}
                      </span>
                    )}
                    {item.accent && (
                      <span
                        className={cn(
                          "ml-auto h-1.5 w-1.5 rounded-full",
                          active ? "bg-white/80" : "bg-primary-500 animate-pulse"
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-ink/6 p-3">
        <Link
          href="/app/settings"
          onClick={onClose}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2 transition-colors",
            isActive("/app/settings") ? "bg-slate-100" : "hover:bg-slate-50"
          )}
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback style={{ background: user.avatarColor }}>{initials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{user.name}</p>
            <p className="truncate text-[11px] text-mist">{user.role} · {user.company}</p>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* desktop */}
      <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 border-r border-ink/6 bg-white/70 backdrop-blur-xl lg:block">
        {nav}
      </aside>
      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute left-0 top-0 h-full w-[290px] bg-white shadow-lift animate-in slide-in-from-left duration-300">
            {nav}
          </div>
        </div>
      )}
    </>
  );
}

export const TOP_BAR_ITEMS = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/notifications", label: "Notifications", icon: Bell },
  { href: "/app/profile", label: "Profile", icon: UserCircle },
  { href: "/app/settings", label: "Settings", icon: Settings },
];