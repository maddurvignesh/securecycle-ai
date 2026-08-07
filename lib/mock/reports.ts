import type { ReportTemplate } from "./types";

export const REPORT_TEMPLATES: ReportTemplate[] = [
  { id: "rep-01", name: "Quarterly Compliance Report", desc: "Framework scores, control gaps and remediation progress across NIST, ISO, GDPR and HIPAA.", category: "Compliance", icon: "shield", updated: "2026-08-05", pages: 18, size: "2.4 MB" },
  { id: "rep-02", name: "Asset Inventory Snapshot", desc: "Full fleet inventory with risk, status, warranty and storage distribution.", category: "Asset", icon: "harddrive", updated: "2026-08-07", pages: 42, size: "5.1 MB" },
  { id: "rep-03", name: "Risk Exposure Analysis", desc: "AI-driven risk scoring by department, storage type and data classification.", category: "Risk", icon: "alert", updated: "2026-08-06", pages: 12, size: "1.8 MB" },
  { id: "rep-04", name: "Certificate Register", desc: "Every issued erasure certificate with QR, signature and verification status.", category: "Certificate", icon: "cert", updated: "2026-08-07", pages: 64, size: "8.9 MB" },
  { id: "rep-05", name: "Audit Trail Export", desc: "Immutable audit log export for internal and external auditors.", category: "Audit", icon: "history", updated: "2026-08-04", pages: 96, size: "12.3 MB" },
  { id: "rep-06", name: "Circular Economy Report", desc: "Recycling volume, carbon saved, material recovery and partner performance.", category: "Recycling", icon: "recycle", updated: "2026-08-03", pages: 14, size: "2.1 MB" },
];

export const REPORT_RECENT = [
  { id: "rep-2026-08-07", title: "Certificate Register — Aug 2026", category: "Certificate", exportedBy: "Priya Sharma", exportedAt: "2026-08-07T09:12:00Z", size: "8.9 MB" },
  { id: "rep-2026-08-06", title: "Risk Exposure Analysis — Q3", category: "Risk", exportedBy: "Rohan Verma", exportedAt: "2026-08-06T16:40:00Z", size: "1.8 MB" },
  { id: "rep-2026-08-05", title: "Quarterly Compliance Report — Q2", category: "Compliance", exportedBy: "Priya Sharma", exportedAt: "2026-08-05T11:22:00Z", size: "2.4 MB" },
  { id: "rep-2026-08-03", title: "Circular Economy Report — July", category: "Recycling", exportedBy: "Sneha Iyer", exportedAt: "2026-08-03T14:05:00Z", size: "2.1 MB" },
];

export const REPORT_INSIGHTS = [
  { label: "Best month", value: "July · 640 wipes", tone: "green" },
  { label: "Fastest standard", value: "NIST 800-88 · 4.2 min", tone: "blue" },
  { label: "Top risk", value: "Encryption disabled", tone: "amber" },
  { label: "Certificates this week", value: "+312", tone: "green" },
];
