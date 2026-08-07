"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  BellRing,
  BellOff,
  CheckCheck,
  Info,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Badge } from "@/components/app-ui/badge";
import { Card } from "@/components/app-ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/app-ui/tabs";
import { EmptyState } from "@/components/app/SectionHeading";
import { useApp } from "@/components/providers/AppProvider";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

const SEVERITY_META: Record<string, { icon: typeof Info; cls: string; label: string }> = {
  critical: { icon: AlertTriangle, cls: "bg-rose-50 text-rose-600 ring-rose-100", label: "Critical" },
  alert: { icon: ShieldCheck, cls: "bg-amber-50 text-amber-600 ring-amber-100", label: "Alert" },
  info: { icon: Info, cls: "bg-sky-50 text-sky-600 ring-sky-100", label: "Info" },
  success: { icon: BellRing, cls: "bg-success-50 text-success-600 ring-success-100", label: "Success" },
};

const badgeVariant: Record<string, "danger" | "warning" | "info" | "success"> = {
  critical: "danger",
  alert: "warning",
  info: "info",
  success: "success",
};

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, markRead, pushNotification } = useApp();
  const [filter, setFilter] = React.useState("all");

  const filtered = React.useMemo(() => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.severity === filter);
  }, [notifications, filter]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Alert center"
        title="Notifications"
        desc="Security, compliance and lifecycle alerts across your estate — nothing slips through."
        actions={
          <Button variant="outline" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4 text-success-600" /> Mark all read
          </Button>
        }
      />

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All {notifications.length > 0 && `(${notifications.length})`}</TabsTrigger>
          <TabsTrigger value="unread">Unread {unreadCount > 0 && `(${unreadCount})`}</TabsTrigger>
          <TabsTrigger value="critical"><AlertTriangle className="h-4 w-4" /> Critical</TabsTrigger>
          <TabsTrigger value="success"><BellRing className="h-4 w-4" /> Success</TabsTrigger>
        </TabsList>

        <TabsContent value={filter}>
          {filtered.length === 0 ? (
            <EmptyState
              icon={<BellOff className="h-6 w-6" />}
              title="All caught up"
              desc={filter === "unread" ? "You're all caught up — no unread notifications." : "No notifications in this category right now."}
              action={
                filter === "unread" ? (
                  <Button variant="outline" onClick={() => toast.info("You'll be notified when something happens")}>Dismiss</Button>
                ) : undefined
              }
            />
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {filtered.map((n, i) => {
                  const meta = SEVERITY_META[n.severity] ?? SEVERITY_META.info;
                  const Icon = meta.icon;
                  return (
                    <motion.div
                      key={n.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ delay: 0.02 * Math.min(i, 8), duration: 0.35 }}
                    >
                      <Card
                        onClick={() => markRead(n.id)}
                        className={cn("flex cursor-pointer items-start gap-4 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lift", !n.read && "ring-1 ring-primary-200")}
                      >
                        <span className={cn("mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1", meta.cls)}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold text-ink">{n.title}</p>
                            {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-500" />}
                          </div>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-mist">{n.body}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="outline" className="px-2 py-0 text-[10px]">{n.category}</Badge>
                            <Badge variant={badgeVariant[n.severity]} className="px-2 py-0 text-[10px] capitalize">{n.severity}</Badge>
                            <span className="text-[11px] text-mist/80">{timeAgo(n.time)}</span>
                          </div>
                        </div>
                        {n.severity === "critical" && <Sparkles className="h-4 w-4 shrink-0 text-primary-400" />}
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}