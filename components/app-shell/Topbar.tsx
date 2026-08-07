"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Bell,
  FileText,
  HardDrive,
  Menu,
  Plus,
  ScanSearch,
  Search,
  ShieldCheck,
  UserCircle2,
  LogOut,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/app-ui/button";
import { Avatar, AvatarFallback } from "@/components/app-ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/app-ui/dropdown-menu";
import { useApp } from "@/components/providers/AppProvider";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationsPanel } from "./NotificationsPanel";
import { initials } from "@/lib/format";

const TITLES: Record<string, string> = {
  "/app": "Dashboard",
  "/app/dashboard": "Dashboard",
  "/app/assets": "Asset Management",
  "/app/secure-wipe": "Secure Wipe",
  "/app/risk": "AI Risk Assessment",
  "/app/certificates": "Digital Certificates",
  "/app/compliance": "Compliance Center",
  "/app/analytics": "Analytics",
  "/app/reports": "Reports",
  "/app/audit": "Audit Logs",
  "/app/recycling": "Recycling & Circularity",
  "/app/notifications": "Notifications",
  "/app/copilot": "AI Copilot",
  "/app/profile": "Profile",
  "/app/settings": "Settings",
};

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, unreadCount, signOut } = useApp();
  const [notifOpen, setNotifOpen] = React.useState(false);

  const title = TITLES[pathname] ?? "Workspace";

  const openSearch = () => window.dispatchEvent(new Event("app-open-search"));

  const quickAction = (label: string, href?: string) => {
    toast.success(label + " — started");
    if (href) {
      setTimeout(() => router.push(href), 300);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink/6 bg-white/75 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold tracking-tight text-ink">{title}</p>
          <p className="hidden text-[11px] text-mist sm:block">
            {user.company} · {user.role}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* search */}
          <button
            onClick={openSearch}
            className="hidden h-9 w-56 items-center gap-2 rounded-full border border-ink/10 bg-cloud px-3.5 text-sm text-mist transition-colors hover:border-primary-300 md:flex"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="rounded-md border border-ink/10 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-mist">
              ⌘K
            </kbd>
          </button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={openSearch} aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>

          {/* quick actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden gap-1.5 sm:inline-flex">
                <Plus className="h-4 w-4" /> Quick Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => quickAction("New secure wipe", "/app/secure-wipe")}>
                <ShieldCheck className="text-success-500" /> New secure wipe
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => quickAction("Asset scan", "/app/assets")}>
                <ScanSearch className="text-primary-500" /> Scan for new assets
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => quickAction("Compliance report", "/app/reports")}>
                <FileText className="text-sky-500" /> Generate compliance report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => quickAction("Inventory import")}>
                <HardDrive className="text-amber-500" /> Import inventory
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          {/* notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-mist hover:bg-slate-100 hover:text-ink"
            onClick={() => setNotifOpen(true)}
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Button>

          {/* profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full p-0.5 transition-opacity hover:opacity-90">
                <Avatar className="h-8 w-8 ring-2 ring-white">
                  <AvatarFallback style={{ background: user.avatarColor }}>{initials(user.name)}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-ink">{user.name}</span>
                  <span className="text-xs font-normal text-mist">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/app/profile")}>
                <UserCircle2 /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/app/settings")}>
                <Settings /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-rose-600 focus:text-rose-600"
                onClick={() => {
                  signOut();
                  router.push("/login");
                }}
              >
                <LogOut /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <NotificationsPanel open={notifOpen} onOpenChange={setNotifOpen} />
    </header>
  );
}