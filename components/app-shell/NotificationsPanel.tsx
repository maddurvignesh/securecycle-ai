"use client";

import * as React from "react";
import { AlertTriangle, BellRing, CheckCheck, Info, ShieldCheck } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/app-ui/sheet";
import { Button } from "@/components/app-ui/button";
import { Badge } from "@/components/app-ui/badge";
import { useApp } from "@/components/providers/AppProvider";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

const SEVERITY = {
  critical: { icon: AlertTriangle, cls: "bg-rose-50 text-rose-600 ring-rose-100", label: "Critical" },
  alert: { icon: ShieldCheck, cls: "bg-amber-50 text-amber-600 ring-amber-100", label: "Alert" },
  info: { icon: Info, cls: "bg-sky-50 text-sky-600 ring-sky-100", label: "Info" },
  success: { icon: BellRing, cls: "bg-success-50 text-success-600 ring-success-100", label: "Success" },
};

export function NotificationsPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { notifications, unreadCount, markAllRead, markRead } = useApp();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-l border-ink/6 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-ink/6 p-5">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-bold text-primary-600">
                    {unreadCount} new
                  </span>
                )}
              </SheetTitle>
              <SheetDescription className="mt-1">Security & lifecycle activity across your estate.</SheetDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={markAllRead} className="gap-1.5">
              <CheckCheck className="h-4 w-4" /> Mark all
            </Button>
          </div>
        </SheetHeader>

        <div className="divide-y divide-ink/6">
          {notifications.map((n) => {
            const meta = SEVERITY[n.severity] ?? SEVERITY.info;
            const Icon = meta.icon;
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  "flex w-full items-start gap-3.5 px-5 py-4 text-left transition-colors hover:bg-slate-50",
                  !n.read && "bg-primary-50/40"
                )}
              >
                <span className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1", meta.cls)}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-ink">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-500" />}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[13px] text-mist">{n.body}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Badge variant="outline" className="px-2 py-0 text-[10px]">{n.category}</Badge>
                    <span className="text-[11px] text-mist/80">{timeAgo(n.time)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}