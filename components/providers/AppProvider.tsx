"use client";

import * as React from "react";
import {
  ASSETS,
  AUDIT_LOGS,
  CERTIFICATES,
  CURRENT_USER,
  NOTIFICATIONS,
  USERS,
} from "@/lib/mock/data";
import type { Asset, AuditEntry, Certificate, Notification, User } from "@/lib/mock/types";

type AuthContext = {
  user: User;
  signIn: (role: User["role"]) => void;
  signOut: () => void;
  role: User["role"];
};

type Store = AuthContext & {
  assets: Asset[];
  certifications: Certificate[];
  notifications: Notification[];
  auditLogs: AuditEntry[];
  unreadCount: number;
  completeWipe: (assetId: string, opts: { standard: string; technician: string; zeroedGB: number }) => Asset | undefined;
  cancelWipe: (assetId: string) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  pushNotification: (n: Omit<Notification, "id" | "time" | "read">) => void;
  logAudit: (e: Omit<AuditEntry, "id" | "timestamp" | "ip">) => void;
  resetAssets: () => void;
};

const AppContext = React.createContext<Store | null>(null);

export function useApp(): Store {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

const uid = () => `id-${Date.now()}-${Math.floor(Math.random() * 1e4)}`;
const nowIso = () => new Date().toISOString();

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User>(CURRENT_USER);
  const [assets, setAssets] = React.useState<Asset[]>(() => JSON.parse(JSON.stringify(ASSETS)));
  const [certs, setCerts] = React.useState<Certificate[]>(() => JSON.parse(JSON.stringify(CERTIFICATES)));
  const [notifications, setNotifications] = React.useState<Notification[]>(NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = React.useState<AuditEntry[]>(AUDIT_LOGS);

  // a gentle live touch — a certificate becomes ready shortly after login
  React.useEffect(() => {
    const t = setTimeout(() => {
      setNotifications((n) => [
        {
          id: uid(),
          title: "1 certificate ready to download",
          body: "Your verified erasure certificate for the latest wiped device is available.",
          severity: "success",
          category: "Certificate",
          time: nowIso(),
          read: false,
        },
        ...n,
      ]);
    }, 14000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const signIn = (role: User["role"]) => {
    const match = USERS.find((u) => u.role === role) ?? CURRENT_USER;
    setUser(match);
    setTimeout(() => {
      pushNotification({
        title: `Welcome back, ${match.name.split(" ")[0]}`,
        body: "You are signed in as " + match.role + ". Workspace is healthy.",
        severity: "success",
        category: "System",
      });
    }, 1600);
  };

  const signOut = () => {
    setUser(CURRENT_USER);
  };

  const pushNotification: Store["pushNotification"] = (n) => {
    setNotifications((prev) => [
      { ...n, id: uid(), time: nowIso(), read: false },
      ...prev,
    ]);
  };

  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const logAudit: Store["logAudit"] = (e) =>
    setAuditLogs((prev) => [{ ...e, id: uid(), timestamp: nowIso(), ip: "10.4.22.11" }, ...prev]);

  const completeWipe: Store["completeWipe"] = (assetId, opts) => {
    const target = assets.find((a) => a.id === assetId) ?? null;
    if (!target) return undefined;
    const updated: Asset = {
      ...target,
      status: "Certified",
      lastWipe: nowIso().slice(0, 10),
      wipeHistory: [
        { date: nowIso().slice(0, 10), standard: opts.standard, verified: true, method: 99 },
        ...target.wipeHistory,
      ],
    };
    setAssets((prev) => prev.map((a) => (a.id === assetId ? updated : a)));
    setCerts((prev) => [
      {
        id: `cert-${uid()}`,
        asset: { id: target.id, name: target.name, serial: target.serial, type: target.assetType },
        standard: opts.standard,
        date: nowIso().slice(0, 10),
        technician: user.name,
        verified: true,
        status: "Verified",
        integrity: 99,
        zeroedGB: opts.zeroedGB,
        qr: `QR-${Math.round(Math.random() * 1e6)}`,
        signature: `sig_${uid()}`,
        company: user.company,
      },
      ...prev,
    ]);
    pushNotification({
      title: "Certified — " + target.name,
      body: `Erasure verified (${opts.standard}). Certificate generated and signed.`,
      severity: "success",
      category: "Certificate",
    });
    logAudit({
      actor: user.name,
      role: user.role,
      action: "Completed secure wipe",
      target: target.serial,
      category: "wipe",
      outcome: "success",
    });
    return updated;
  };

  const cancelWipe = (assetId: string) =>
    setAssets((prev) => prev.map((a) => (a.id === assetId ? { ...a, status: "Pending Wipe" } : a)));

  const resetAssets = () =>
    setAssets(() => {
      const next = JSON.parse(JSON.stringify(ASSETS)) as Asset[];
      if (next[0]) next[0].status = "Pending Wipe";
      return next;
    });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        role: user.role,
        signIn,
        signOut,
        assets,
        certifications: certs,
        notifications,
        auditLogs,
        unreadCount,
        completeWipe,
        cancelWipe,
        markRead,
        markAllRead,
        pushNotification,
        logAudit,
        resetAssets,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}