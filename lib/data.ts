export const NAV_LINKS = [
  { label: "Home", href: "#experience" },
  { label: "Technology", href: "#story" },
  { label: "Features", href: "#features" },
  { label: "Platform", href: "#playground" },
  { label: "Roadmap", href: "#impact" },
  { label: "Contact", href: "#contact" },
] as const;

export const STAT_CARDS = [
  { value: "100%", label: "Verified" },
  { value: "18,450", label: "Certificates" },
  { value: "245", label: "Carbon Saved · Tons" },
  { value: "45,231", label: "Devices Sanitized" },
] as const;

export type Chapter = {
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  stat: { value: string; label: string };
  accentColor: "blue" | "green" | "ink";
};

export const CHAPTERS: Chapter[] = [
  {
    index: "01",
    eyebrow: "The Problem",
    title: "Every retired device is a",
    accent: "forgotten risk.",
    body: "When an IT asset leaves the building, its data doesn't. HR records, payroll, passwords and patient files live on long after the device dies — one mistake from becoming a headline.",
    stat: { value: "63%", label: "of breaches trace to retired hardware" },
    accentColor: "ink",
  },
  {
    index: "02",
    eyebrow: "AI Detection",
    title: "AI sees the sensitive data",
    accent: "before anyone can.",
    body: "SecureCycle's AI engine scans every drive, surface and sector. It reads 300+ file signatures and finds sensitive material — even deleted, hidden or encrypted remnants — with 98% precision.",
    stat: { value: "98%", label: "detection precision across 300+ formats" },
    accentColor: "blue",
  },
  {
    index: "03",
    eyebrow: "Secure Wiping",
    title: "Data, dissolved down to the",
    accent: "last electron.",
    body: "Wipes run to NIST 800-88, DoD 5220.22-M and Guttmann standards. Each pass is cryptographically seeded, verified, and every sector is confirmed unrecoverable.",
    stat: { value: "7", label: "industry standards supported natively" },
    accentColor: "blue",
  },
  {
    index: "04",
    eyebrow: "Verification",
    title: "Trust is measured, not",
    accent: "assumed.",
    body: "Post-wipe sampling proves zero recoverable bytes. A cryptographic hash of the erased drive is stored on-chain, so the result can never be silently reversed or disputed.",
    stat: { value: "0%", label: "recoverable data after every verified wipe" },
    accentColor: "green",
  },
  {
    index: "05",
    eyebrow: "Certificate",
    title: "One document. Total",
    accent: "accountability.",
    body: "Every device leaves with a tamper-proof certificate: golden seal, digital signature and a scannable QR that resolves to an immutable verification record — for auditors, buyers and regulators.",
    stat: { value: "100%", label: "devices shipped with an audit-ready certificate" },
    accentColor: "green",
  },
  {
    index: "06",
    eyebrow: "Circular Economy",
    title: "From e-waste back to",
    accent: "second life.",
    body: "Certified-wiped devices re-enter the market as verified refurbished. The rest is dismantled responsibly — each kilogram of e-waste tracked to a measurable carbon footprint saved.",
    stat: { value: "245T", label: "carbon saved by our circular loop" },
    accentColor: "green",
  },
  {
    index: "07",
    eyebrow: "Enterprise Dashboard",
    title: "One command center for",
    accent: "every asset on earth.",
    body: "Track the full lifecycle — intake, detection, wipe, verification, certificate and resale — in a real-time dashboard built for IT teams, auditors and sustainability officers.",
    stat: { value: "100%", label: "lifecycle visibility in a single pane" },
    accentColor: "blue",
  },
];

export type Feature = {
  icon: string;
  title: string;
  description: string;
  points: string[];
  accent: "blue" | "green";
  size: "wide" | "tall" | "square";
};

export const FEATURES: Feature[] = [
  {
    icon: "shield",
    title: "Secure Wiping",
    description:
      "Multi-pass cryptographic wipes that dissolve data at the sector level — leaving nothing to find, ever.",
    points: ["NIST 800-88 & DoD compliant", "Verified sector-by-sector", "Zero-recovery guarantee"],
    accent: "blue",
    size: "wide",
  },
  {
    icon: "scan",
    title: "AI Risk Assessment",
    description:
      "An AI engine reads every drive before wiping and scores the risk it carries — in seconds, not days.",
    points: ["98% detection precision", "300+ file signatures", "Confidentiality scoring"],
    accent: "blue",
    size: "tall",
  },
  {
    icon: "certificate",
    title: "Certificates",
    description:
      "Tamper-proof digital certificates with golden seals, signatures and blockchain-verified QR codes.",
    points: ["Immutable on-chain record", "Auditor-ready PDF", "Instant verification"],
    accent: "green",
    size: "square",
  },
  {
    icon: "route",
    title: "Asset Lifecycle",
    description:
      "Intake, wipe, verify, resell. One pipeline tracks every asset from arrival to certified second life.",
    points: ["QR-tracked from intake", "Fleet & batch operations", "Full chain of custody"],
    accent: "blue",
    size: "square",
  },
  {
    icon: "recycle",
    title: "Recycling",
    description:
      "What can't be reused is dismantled responsibly — every gram of e-waste accounted for.",
    points: ["Zero-to-landfill target", "Material recovery logs", "Carbon offset tracking"],
    accent: "green",
    size: "tall",
  },
  {
    icon: "gauge",
    title: "Analytics",
    description:
      "Live dashboards that turn wipe operations into compliance proof and sustainability numbers.",
    points: ["Real-time fleet health", "Compliance reporting", "ESG-ready export"],
    accent: "green",
    size: "wide",
  },
];

export type ImpactStat = {
  value: number;
  suffix: string;
  label: string;
  prefix: string;
  note?: string;
};

export const IMPACT_STATS: ImpactStat[] = [
  {
    value: 45231,
    suffix: "",
    label: "Devices Sanitized",
    prefix: "",
  },
  {
    value: 18450,
    suffix: "",
    label: "Certificates Issued",
    prefix: "",
  },
  {
    value: 245,
    suffix: "T",
    label: "Carbon Saved",
    prefix: "",
  },
  {
    value: 0,
    suffix: "%",
    label: "Data Recovery",
    prefix: "",
    note: "after wipe",
  },
] as const;

export const FILES = [
  { name: "HR Records", meta: "Confidential", ext: "hr", top: "8%", left: "12%" },
  { name: "Payroll.xlsx", meta: "Sensitive", ext: "payroll", top: "22%", left: "68%" },
  { name: "Passwords.kdbx", meta: "Critical", ext: "pass", top: "38%", left: "14%" },
  { name: "Customers.db", meta: "Confidential", ext: "db", top: "52%", left: "70%" },
  { name: "Invoices.pdf", meta: "Internal", ext: "inv", top: "66%", left: "18%" },
  { name: "Contracts 2024", meta: "Sensitive", ext: "con", top: "80%", left: "60%" },
  { name: "Medical Records", meta: "Confidential", ext: "med", top: "12%", left: "38%" },
] as const;
