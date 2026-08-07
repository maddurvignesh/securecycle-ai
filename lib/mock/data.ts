import { mulberry32 } from "@/lib/utils";
import type {
  Asset,
  AuditEntry,
  Certificate,
  Company,
  Metric,
  Notification,
  User,
  WipeStandard,
  AuditFinding,
  AssetStatus,
  AssetType,
  RiskLevel,
  StorageType,
  Classification,
  Encryption,
} from "./types";

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */
export const USERS: User[] = [
  { id: "u1", name: "Aarav Mehta", role: "Admin", email: "aarav@securecycle.io", department: "Executive", company: "SecureCycle HQ", title: "Platform Administrator", avatarColor: "#2563EB" },
  { id: "u2", name: "Priya Sharma", role: "IT Manager", email: "priya.sharma@npemail.com", department: "IT Operations", company: "NPE Logistics", title: "Head of IT Asset Lifecycle", avatarColor: "#7C3AED" },
  { id: "u3", name: "Rohan Verma", role: "Auditor", email: "rohan@auditsecure.com", department: "Compliance", company: "AuditSecure", title: "Certified CISA Auditor", avatarColor: "#0EA5E9" },
  { id: "u4", name: "Sneha Iyer", role: "Technician", email: "sneha.iyer@npemail.com", department: "Field Engineering", company: "NPE Logistics", title: "Data Sanitization Engineer", avatarColor: "#22C55E" },
  { id: "u5", name: "Vikram Rao", role: "IT Manager", email: "vikram@banksecure.in", department: "IT & Security", company: "Coastal Bank", title: "Head of IT Security", avatarColor: "#F59E0B" },
  { id: "u6", name: "Meera Nair", role: "Technician", email: "meera.nair@medicore.in", department: "Field Support", company: "MediCore", title: "Field Technician", avatarColor: "#EC4899" },
  { id: "u7", name: "Kabir Singh", role: "Admin", email: "kabir@securecycle.io", department: "Platform", company: "SecureCycle HQ", title: "Ops Engineer", avatarColor: "#10B981" },
];

export const CURRENT_USER = USERS[1]; // Priya Sharma — IT Manager

/* ------------------------------------------------------------------ */
/* Companies                                                           */
/* ------------------------------------------------------------------ */
export const COMPANIES = [
  { id: "c1", name: "Coastal Bank", sector: "Banking", hq: "Mumbai, IN", assets: 4120, compliance: 94, tier: "Platinum" },
  { id: "c2", name: "MediCore Healthcare", sector: "Healthcare", hq: "Bengaluru, IN", assets: 2530, compliance: 98, tier: "Platinum" },
  { id: "c3", name: "AeroFeed", sector: "Defence", hq: "Hyderabad, IN", assets: 1880, compliance: 99, tier: "Platinum" },
  { id: "c4", name: "Finpeak Capital", sector: "Finance", hq: "Gurugram, IN", assets: 3120, compliance: 88, tier: "Gold" },
  { id: "c5", name: "Nordic Retail", sector: "Retail", hq: "Delhi, IN", assets: 5600, compliance: 84, tier: "Gold" },
  { id: "c6", name: "Institute of Data", sector: "Education", hq: "Pune, IN", assets: 9420, compliance: 81, tier: "Silver" },
] as const;

/* ------------------------------------------------------------------ */
/* Departments                                                         */
/* ------------------------------------------------------------------ */
export const DEPARTMENTS = [
  { key: "Finance", employees: 482, riskProfile: 74 },
  { key: "HR", employees: 210, riskProfile: 58 },
  { key: "Engineering", employees: 924, riskProfile: 82 },
  { key: "Sales", employees: 640, riskProfile: 51 },
  { key: "Legal", employees: 98, riskProfile: 66 },
  { key: "IT Operations", employees: 156, riskProfile: 78 },
  { key: "Research & Dev", employees: 330, riskProfile: 88 },
  { key: "Finance", employees: 245, riskProfile: 71 },
];

/* ------------------------------------------------------------------ */
/* Wipe standards                                                      */
/* ------------------------------------------------------------------ */
export const WIPE_STANDARDS: WipeStandard[] = [
  { id: "nist", name: "NIST 800-88 Rev.1", fullName: "NIST SP 800-88 Rev.1 Clear / Purge", desc: "Single overwrite of addressable locations. The de-facto enterprise standard for sanitized storage.", passes: "1–3 passes", recommended: true, timeframe: "~4 min / device", verified: true },
  { id: "dod", name: "DoD 5220.22-M", fullName: "DoD 5220.22-M (ECE)", desc: "Three-pass overwrite — zeros, ones, then random data with verification. Military-grade purge.", passes: "3 passes", recommended: false, timeframe: "~11 min / device", verified: true },
  { id: "gutmann", name: "Gutmann", fullName: "Gutmann 35-pass", desc: "35 overwriting patterns for maximum security on legacy hard drives. Overkill for modern SSDs.", passes: "35 passes", recommended: false, timeframe: "~48 min / device", verified: true },
  { id: "quick", name: "Quick Wipe", fullName: "Quick sanitization pass", desc: "Fast single overwrite of the full logical volume with pattern + CRC check. Balance of speed & safety.", passes: "1 Repass", recommended: false, timeframe: "~2 min / device", verified: true },
];

/* ------------------------------------------------------------------ */
/* Risk factors for AI assessment                                      */
/* ------------------------------------------------------------------ */
export const RISK_FACTORS = [
  { key: "Storage", weight: 30, blurb: "NVMe SSDs fragment logical data; wiped sectors require TRIM + overwrite confirmation." },
  { key: "Department", weight: 22, blurb: "Finance and Engineering departments process high volumes of confidential records." },
  { key: "Data Sensitivity", weight: 18, blurb: "Asset was tagged 'Confidential' in the last annual data-mapping exercise." },
  { key: "Encryption", weight: 14, blurb: "Full-disk encryption is not enabled — raw blocks may be recoverable." },
  { key: "Device Age", weight: 9, blurb: "Units older than 4 years may use spindles or older NAND with residual data." },
  { key: "Usage", weight: 7, blurb: "Above-average write activity increases probability of recoverable remnants." },
] as const;

/* ------------------------------------------------------------------ */
/* Assets                                                              */
/* ------------------------------------------------------------------ */
type AssetSeed = Omit<Asset, "id" | "riskScore" | "wipeHistory" | "carbonSaved">;

const seed: AssetSeed[] = [
  { name: "Finance EliteBook 840", assetType: "Laptop", brand: "HP", model: "EliteBook 840 G8", serial: "SC-2401-8842", capacity: "512 GB", storageType: "NVMe SSD", assignedTo: "R. Kulkarni", department: "Finance", image: "laptop", riskLevel: "Critical", status: "Pending Wipe", classification: "Confidential", encryptionStatus: "Disabled", warranty: "Expired", location: "Mumbai DC", purchaseYear: 2019, lastWipe: undefined, color: "#7C3AED" },
  { name: "Legal ThinkPad X1", assetType: "Laptop", brand: "Lenovo", model: "ThinkPad X1 Carbon", serial: "SC-2407-1120", capacity: "1 TB", storageType: "NVMe SSD", assignedTo: "S. Dutta", department: "Legal", image: "laptop", riskLevel: "High", status: "Pending Wipe", classification: "Confidential", encryptionStatus: "File-level", warranty: "In warranty", location: "Legal Floor", purchaseYear: 2023, lastWipe: undefined, color: "#2563EB" },
  { name: "Engineering Precision 7760", assetType: "Laptop", brand: "Dell", model: "Precision 7760", serial: "SC-2305-2280", capacity: "4 TB", storageType: "NVMe SSD", assignedTo: "Shaurya Bose", department: "Engineering", image: "laptop", riskLevel: "Critical", status: "Wiping", classification: "Confidential", encryptionStatus: "Full Disk", warranty: "In warranty", location: "Engineering Lab", purchaseYear: 2023, lastWipe: undefined, color: "#22C55E" },
  { name: "Executive MacBook Pro", assetType: "Laptop", brand: "Apple", model: "MacBook Pro 14 M2", serial: "SC-2411-4099", capacity: "1 TB", storageType: "NVMe SSD", assignedTo: "M. Dhawan", department: "Sales", image: "laptop", riskLevel: "Medium", status: "Certified", classification: "Internal", encryptionStatus: "Full Disk", warranty: "In warranty", location: "Sales Chair", purchaseYear: 2024, lastWipe: "2026-07-28", color: "#F59E0B" },
  { name: "Finance Dell T150", assetType: "Server", brand: "Dell", model: "PowerEdge T150", serial: "SC-1804-3301", capacity: "9 TB", storageType: "SAS", assignedTo: "Ops", department: "IT", image: "server", riskLevel: "High", status: "Pending Wipe", classification: "Internal", encryptionStatus: "Hardware", warranty: "Expired", location: "MUM-DC02", purchaseYear: 2018, lastWipe: undefined, color: "#0EA5E9" },
  { name: "HR 1000GB Barracuda", assetType: "HDD", brand: "Seagate", model: "Barracuda 1TB", serial: "SC-2212-4421", capacity: "1 TB", storageType: "HDD", assignedTo: "Unassigned", department: "HR", image: "hdd", riskLevel: "Medium", status: "Pending Wipe", classification: "Sensitive", encryptionStatus: "Disabled", warranty: "Expired", location: "HR Storage", purchaseYear: 2019, lastWipe: undefined, color: "#EC4899" },
  { name: "Field iPhone 14", assetType: "Phone", brand: "Apple", model: "iPhone 14", serial: "SC-2309-5567", capacity: "256 GB", storageType: "uFlash", assignedTo: "Field Agent 7", department: "Sales", image: "phone", riskLevel: "Medium", status: "Wiped", classification: "Internal", encryptionStatus: "Full Disk", warranty: "Expired", location: "Field Kit", purchaseYear: 2022, lastWipe: "2026-07-30", color: "#10B981" },
  { name: "Core SAN SSD", assetType: "SSD", brand: "Samsung", model: "870 EVO 2TB", serial: "SC-2301-7780", capacity: "2 TB", storageType: "SATA SSD", assignedTo: "Pool", department: "Engineering", image: "ssd", riskLevel: "Critical", status: "Pending Wipe", classification: "Confidential", encryptionStatus: "Disabled", warranty: "Expired", location: "GATE-A", purchaseYear: 2020, lastWipe: undefined, color: "#EF4444" },
];

/* ------------------------------------------------------------------ */
/* Generated fleet — realistic enterprise estate                        */
/* ------------------------------------------------------------------ */
type FleetTemplate = {
  types: [AssetType, number][];
  brands: [string, string[]][];
  capacities: string[];
  storage: StorageType[];
};

const FLEET: FleetTemplate[] = [
  {
    types: [["Laptop", 18], ["Desktop", 8]],
    brands: [
      ["HP", ["EliteBook 840 G8", "EliteBook 840 G10", "ProBook 450 G9", "ZBook Firefly 15"]],
      ["Dell", ["Latitude 5520", "Latitude 7440", "Precision 5560", "OptiPlex 7090", "OptiPlex 7010"]],
      ["Lenovo", ["ThinkPad X1 Carbon Gen 10", "ThinkPad T14 Gen 3", "ThinkCentre M90t"]],
      ["Apple", ["MacBook Pro 14 M2", "MacBook Air M2"]],
      ["Microsoft", ["Surface Laptop 5"]],
    ],
    capacities: ["256 GB", "512 GB", "1 TB", "2 TB"],
    storage: ["NVMe SSD", "NVMe SSD", "SATA SSD", "eMMC"],
  },
  {
    types: [["Server", 7]],
    brands: [
      ["Dell", ["PowerEdge R350", "PowerEdge R250", "PowerEdge T150"]],
      ["HPE", ["ProLiant DL360 Gen10", "ProLiant ML350 Gen10"]],
      ["Lenovo", ["ThinkSystem SR650"]],
    ],
    capacities: ["4 TB", "8 TB", "9 TB", "16 TB"],
    storage: ["SAS", "NVMe SSD", "SAS"],
  },
  {
    types: [["SSD", 6], ["HDD", 6]],
    brands: [
      ["Samsung", ["870 EVO", "980 PRO", "T7 Portable"]],
      ["WD", ["Black SN850", "Blue HDD", "Gold HDD"]],
      ["Seagate", ["Barracuda", "IronWolf", "SkyHawk"]],
      ["Crucial", ["MX500", "BX500"]],
      ["Toshiba", ["MG07ACA"]],
    ],
    capacities: ["256 GB", "512 GB", "1 TB", "2 TB", "4 TB", "8 TB"],
    storage: ["SATA SSD", "NVMe SSD", "HDD", "HDD"],
  },
  {
    types: [["Phone", 8]],
    brands: [
      ["Apple", ["iPhone 13", "iPhone 14", "iPhone 15"]],
      ["Samsung", ["Galaxy S22", "Galaxy S23", "Galaxy A54"]],
    ],
    capacities: ["128 GB", "256 GB", "512 GB"],
    storage: ["uFlash"],
  },
  {
    types: [["Printer", 4]],
    brands: [
      ["HP", ["LaserJet Pro M404", "LaserJet Enterprise MFP"]],
      ["Canon", ["imageRUNNER C3226"]],
      ["Brother", ["HL-L8360CDW"]],
    ],
    capacities: ["—"],
    storage: ["HDD"],
  },
  {
    types: [["Networking Device", 4]],
    brands: [
      ["Cisco", ["Catalyst 2960-X", "Catalyst 9300"]],
      ["Ubiquiti", ["UniFi Switch 24", "UniFi U6-LR"]],
    ],
    capacities: ["—"],
    storage: ["eMMC"],
  },
];

const DEPT_POOL = [
  { dept: "Finance", assignment: ["R. Kulkarni", "A. Shah", "P. Desai"] },
  { dept: "Engineering", assignment: ["Shaurya Bose", "T. Iyer", "N. Reddy", "A. Nair"] },
  { dept: "Sales", assignment: ["M. Dhawan", "Field Agent 7", "Field Agent 12"] },
  { dept: "Legal", assignment: ["S. Dutta", "K. Menon"] },
  { dept: "IT", assignment: ["Ops", "Ops", "Service Desk"] },
  { dept: "HR", assignment: ["L. Fernandes", "Unassigned"] },
  { dept: "Research & Dev", assignment: ["Dr. V. Rao", "J. Krishnan"] },
  { dept: "Operations", assignment: ["M. Thomas", "Unassigned"] },
];

const BRAND_COLOR: Record<string, string> = {
  HP: "#2563EB", Dell: "#0EA5E9", Lenovo: "#7C3AED", Apple: "#111827",
  Microsoft: "#F59E0B", Samsung: "#10B981", WD: "#0284C7", Seagate: "#EC4899",
  Crucial: "#22C55E", Toshiba: "#F97316", Cisco: "#0F766E", Ubiquiti: "#8B5CF6",
  Canon: "#B91C1C", Brother: "#4F46E5",
};

const STATUS_WEIGHTS: [AssetStatus, number][] = [
  ["In Fleet", 5], ["Pending Wipe", 3], ["Certified", 3], ["Wiped", 1],
  ["Wiping", 1], ["Recycled", 1], ["Retired", 1],
];

const RISK_WEIGHTS: [RiskLevel, number][] = [
  ["Low", 4], ["Medium", 3], ["High", 2], ["Critical", 1],
];

const LOCATIONS = ["Mumbai DC", "Bengaluru DC", "Hyderabad DC", "Delhi HQ", "Gurugram Office", "Chennai Lab", "Pune Campus"];

function pick<T>(rand: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function weightedPick<T>(rand: () => number, weights: [T, number][]): T {
  const total = weights.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [v, w] of weights) {
    r -= w;
    if (r <= 0) return v;
  }
  return weights[weights.length - 1][0];
}

function generateFleet(): Asset[] {
  const rand = mulberry32(9917);
  const assets: Asset[] = [];
  const serialPool = new Set<number>();
  let n = 0;

  for (const group of FLEET) {
    const type = weightedPick(rand, group.types as [AssetType, number][]);
    for (let k = 0; k < typeCount(group.types, type); k++) {
      const [brand, models] = pick(rand, group.brands);
      const model = pick(rand, models);
      const deptRow = pick(rand, DEPT_POOL);
      const serial = nextSerial(rand, serialPool);
      const status = weightedPick(rand, STATUS_WEIGHTS);
      const riskLevel = weightedPick(rand, RISK_WEIGHTS);
      const classification = riskLevel === "Low" ? "Internal" : riskLevel === "Medium" ? "Sensitive" : "Confidential";
      const encryptionStatus: Encryption = pick(rand, ["Full Disk", "Full Disk", "Disabled", "File-level", "Hardware"]);
      const purchaseYear = 2016 + Math.floor(rand() * 9);
      const warranty = purchaseYear <= 2020 ? "Expired" : "In warranty";
      const wiped = ["Certified", "Wiped", "Recycled"].includes(status);
      const lastWipe = wiped ? `2026-0${1 + Math.floor(rand() * 7)}-${1 + Math.floor(rand() * 27)}` : undefined;
      const capacity = pick(rand, group.capacities);
      const storageType = type === "HDD" ? "HDD" : type === "Phone" ? "uFlash" : pick(rand, group.storage);

      assets.push({
        id: `ast-${2000 + n}`,
        name: `${brand} ${model}`,
        assetType: type,
        brand,
        model,
        serial,
        capacity,
        storageType,
        assignedTo: pick(rand, deptRow.assignment),
        department: deptRow.dept,
        image: type.toLowerCase() === "phone" ? "phone" : type.toLowerCase() === "server" ? "server" : type.toLowerCase() === "ssd" ? "ssd" : type.toLowerCase() === "hdd" ? "hdd" : type.toLowerCase() === "laptop" ? "laptop" : type.toLowerCase() === "desktop" ? "desktop" : type.toLowerCase() === "printer" ? "printer" : "network",
        riskLevel,
        riskScore: scoreFor(riskLevel) - Math.floor(rand() * 8),
        status,
        classification,
        encryptionStatus,
        warranty,
        location: pick(rand, LOCATIONS),
        purchaseYear,
        lastWipe,
        wipeHistory: lastWipe
          ? [{ date: lastWipe, standard: pick(rand, ["NIST 800-88 Rev.1", "DoD 5220.22-M", "Quick Wipe"]), verified: true, method: 98 + Math.floor(rand() * 2) }]
          : [],
        carbonSaved: 6 + Math.floor(rand() * 60),
        color: BRAND_COLOR[brand] ?? "#2563EB",
      });
      n++;
    }
  }
  return assets;
}

function typeCount(types: [AssetType, number][], type: AssetType): number {
  return types.find(([t]) => t === type)?.[1] ?? 0;
}

function nextSerial(rand: () => number, pool: Set<number>): string {
  let v = Math.floor(rand() * 9000) + 1000;
  while (pool.has(v)) v = Math.floor(rand() * 9000) + 1000;
  pool.add(v);
  return `SC-24${Math.floor(rand() * 2)}${Math.floor(rand() * 9)}-${v}`;
}

export const ASSETS: Asset[] = [
  ...seed.map((s, i) => ({
    ...s,
    id: `ast-${1000 + i}`,
    riskScore: scoreFor(s.riskLevel),
    wipeHistory: s.lastWipe ? [{ date: s.lastWipe, standard: "NIST 800-88 Rev.1", verified: true, method: 99 }] : [],
    carbonSaved: 12 + (i * 7) % 40,
  })),
  ...generateFleet(),
];

function scoreFor(level: string): number {
  switch (level) {
    case "Critical": return 96;
    case "High": return 78;
    case "Medium": return 54;
    default: return 22;
  }
}

/* ------------------------------------------------------------------ */
/* Certificates                                                        */
/* ------------------------------------------------------------------ */
const CERT_TECHS = ["S. Iyer", "V. Rao", "M. Nair", "K. Singh", "P. Sharma"];
const CERT_STANDARDS = ["NIST 800-88 Rev.1", "DoD 5220.22-M", "Quick Wipe"];

export const CERTIFICATES: Certificate[] = Array.from({ length: 12 }).map((_, i) => {
  const d = new Date(2026, 6, 25 - i);
  const verified = i % 4 !== 3;
  const ser = `SC-26X-${String(1000 + i * 137).padStart(8, "0")}`;
  return {
    id: `cert-${1001 + i}`,
    asset: { id: `ast-${2000 + i}`, name: `Decommissioned Asset ${800 + i}`, serial: ser, type: i % 3 === 0 ? "Server" : i % 3 === 1 ? "Laptop" : "SSD" },
    standard: CERT_STANDARDS[i % 3],
    date: d.toISOString().slice(0, 10),
    technician: CERT_TECHS[i % CERT_TECHS.length],
    verified: verified,
    status: verified ? "Verified" : "Active",
    integrity: 97 + (i % 3),
    zeroedGB: [128, 256, 512, 1000, 2048][i % 5],
    qr: `QRTECH-${i * 31}`,
    signature: `sig_key_${i * 7}`,
    company: "Coastal Bank",
  };
});

/* ------------------------------------------------------------------ */
/* Notifications                                                       */
/* ------------------------------------------------------------------ */
export const NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "AI detected 3 critical devices", body: "Remaining SSD still holds recoverable confidential data. Review wipe queue.", severity: "critical", category: "Risk Assessment", time: "2026-08-07T15:40:00Z", read: false },
  { id: "n2", title: "Certificate ready", body: "Certificate for HP EliteBook 840 G8 (SC-2401-8842) has been generated.", severity: "success", category: "Certificate", time: "2026-08-07T14:12:00Z", read: false },
  { id: "n3", title: "Compliance check passed", body: "Coastal Bank achieved 99% on NIST 800-88 controls. Outstanding work.", severity: "success", category: "Compliance", time: "2026-08-07T11:02:00Z", read: false },
  { id: "n4", title: "Wipe completed — DoD 5220.22-M", body: "Field iPhone 14 wiped in 10m 38s. Verification flagged 2 unverified blocks.", severity: "info", category: "Secure Wipe", time: "2026-08-06T18:44:00Z", read: true },
  { id: "n5", title: "High-risk device flagged", body: "Precision 7760 holds 184 sensitive files with encryption disabled.", severity: "alert", category: "Risk Assessment", time: "2026-08-06T09:30:00Z", read: true },
  { id: "n6", title: "HIPAA control failed", body: "ePHI disposition witness log missing for 2 retired units.", severity: "alert", category: "Compliance", time: "2026-08-06T08:00:00Z", read: false },
  { id: "n7", title: "Recycling batch shipped", body: "MediCore — Phoenix Launcher shipped to Revycle Solutions (266 devices).", severity: "info", category: "Recycling", time: "2026-08-05T17:20:00Z", read: true },
  { id: "n8", title: "Fleet scan complete", body: "214 assets refreshed from ITAM. 3 serial mismatches flagged for review.", severity: "info", category: "Asset", time: "2026-08-05T09:55:00Z", read: true },
  { id: "n9", title: "Storage pool warning", body: "NVMe SSD SC-2301-7780 exceeds 85% write endurance threshold.", severity: "alert", category: "Asset", time: "2026-08-04T13:10:00Z", read: false },
  { id: "n10", title: "Bulk wipe scheduled", body: "18 devices queued for tonight 22:00 IST under NIST 800-88 Purge.", severity: "success", category: "Secure Wipe", time: "2026-08-04T10:40:00Z", read: true },
];

/* ------------------------------------------------------------------ */
/* Audit Logs                                                          */
/* ------------------------------------------------------------------ */
export const AUDIT_LOGS: AuditEntry[] = [
  { id: "aud-01", actor: "Priya Sharma", role: "IT Manager", action: "Started secure wipe", target: "SC-2309-5567", category: "wipe", outcome: "success", timestamp: "2026-08-07T15:40:12Z", ip: "10.4.22.11" },
  { id: "aud-02", actor: "Sneha Iyer", role: "Technician", action: "Logged into console", target: undefined, category: "auth", outcome: "success", timestamp: "2026-08-07T15:31:40Z", ip: "10.4.22.14" },
  { id: "aud-03", actor: "System", role: "system", action: "Generated certificate SC-202X-000044442", target: "certificate", category: "wipe", outcome: "success", timestamp: "2026-08-07T14:12:30Z", ip: "internal" },
  { id: "aud-04", actor: "Rohan Verma", role: "Auditor", action: "Exported audit report (PDF)", target: "report.pdf", category: "compliance", outcome: "success", timestamp: "2026-08-07T13:05:10Z", ip: "10.4.30.9" },
  { id: "aud-05", actor: "System", role: "system", action: "Signed tamper-evident seal for SC-233-7782", target: "seal", category: "recycling", outcome: "success", timestamp: "2026-08-06T21:20:44Z", ip: "internal" },
  { id: "aud-06", actor: "Priya Sharma", role: "IT Manager", action: "Aborted wipe — device reconnect", target: "Precision 7760", category: "wipe", outcome: "warning", timestamp: "2026-08-06T18:14:20Z", ip: "10.4.22.11" },
  { id: "aud-07", actor: "Sneha Iyer", role: "Technician", action: "Scanned asset with QR", target: "SC-2401-8842", category: "asset", outcome: "success", timestamp: "2026-08-06T17:02:08Z", ip: "10.4.22.14" },
  { id: "aud-08", actor: "System", role: "system", action: "AI risk model re-scored 2,453 assets", target: "fleet", category: "asset", outcome: "success", timestamp: "2026-08-06T11:40:00Z", ip: "internal" },
  { id: "aud-09", actor: "Vikram Rao", role: "IT Manager", action: "Approved bulk wipe batch", target: "BATCH-8812", category: "wipe", outcome: "success", timestamp: "2026-08-05T16:48:55Z", ip: "10.4.12.7" },
  { id: "aud-10", actor: "System", role: "system", action: "Recycling shipment verified", target: "rb-02", category: "recycling", outcome: "success", timestamp: "2026-08-05T09:11:32Z", ip: "internal" },
  { id: "aud-11", actor: "Meera Nair", role: "Technician", action: "Failed authentication attempt", target: "console", category: "auth", outcome: "error", timestamp: "2026-08-05T08:02:19Z", ip: "10.4.22.18" },
  { id: "aud-12", actor: "Rohan Verma", role: "Auditor", action: "Marked finding HIPAA-DISP-02 as open", target: "af-hipaa", category: "compliance", outcome: "success", timestamp: "2026-08-04T15:20:40Z", ip: "10.4.30.9" },
  { id: "aud-13", actor: "Priya Sharma", role: "IT Manager", action: "Updated wipe policy", target: "POLICY-WIPE-v4", category: "system", outcome: "success", timestamp: "2026-08-04T12:09:05Z", ip: "10.4.22.11" },
  { id: "aud-14", actor: "System", role: "system", action: "Scheduled nightly integrity sweep", target: "fleet", category: "system", outcome: "success", timestamp: "2026-08-04T02:00:00Z", ip: "internal" },
];

export const AUDIT_FINDINGS: AuditFinding[] = [
  { id: "af1", title: "Legacy HDD units still encryption-disabled", status: "Open", severity: "High", standard: "GDPR Art.32", owner: "IT Operations", due: "2026-08-21" },
  { id: "af2", title: "Wipe policy missing for retired phones", status: "In Review", severity: "Medium", standard: "ISO 27001 / A.8.10", owner: "Security", due: "2026-09-02" },
  { id: "af3", title: "Backup registry retention window increased to 90d", status: "Remediated", severity: "Low", standard: "Company Policy", owner: "IT Operations", due: "2026-08-01" },
];

/* ------------------------------------------------------------------ */
/* Metrics (dashboard)                                                 */
/* ------------------------------------------------------------------ */
export const METRICS: Record<string, Metric> = {
  assets: { label: "Total Assets", value: "2,453", raw: 2453, delta: 6.4, up: true, spark: [42, 52, 48, 61, 55, 63, 71] },
  pending: { label: "Pending Wipes", value: "84", raw: 84, delta: -12.0, up: false, spark: [12, 20, 18, 24, 16, 21, 14] },
  completed: { label: "Completed Wipes", value: "3,104", raw: 3104, delta: 18.2, up: true, spark: [18, 30, 42, 40, 55, 62, 74] },
  certificates: { label: "Certificates", value: "18,450", raw: 18450, delta: 8.9, up: true, spark: [40, 44, 52, 50, 58, 64, 70] },
  compliance: { label: "Compliance Score", value: "96.8%", raw: 96.8, delta: 1.2, up: true, spark: [92, 93, 94, 95, 96, 96, 97] },
  carbon: { label: "Carbon Saved", value: "342 t", raw: 342, delta: 12.4, up: true, spark: [220, 240, 260, 280, 300, 320, 342] },
  recycled: { label: "Devices Recycled", value: "8,210", raw: 8210, delta: 4.7, up: true, spark: [30, 36, 34, 42, 45, 50, 55] },
  highRisk: { label: "High Risk Devices", value: "17", raw: 17, delta: -6.0, up: false, spark: [40, 36, 32, 28, 22, 19, 17] },
};

/* Monthly wipe trend */
export const WIPE_MONTHLY = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  wiped: [210, 300, 260, 380, 340, 420, 480, 510, 460, 540, 590, 640][i],
  certified: [180, 270, 240, 350, 320, 400, 460, 490, 440, 520, 570, 620][i],
}));

export const ASSET_TYPES_DIST = [
  { name: "Laptops", value: 38, fill: "#2563EB" },
  { name: "Desktops", value: 22, fill: "#0EA5E9" },
  { name: "Servers", value: 14, fill: "#8B5CF6" },
  { name: "Storage", value: 12, fill: "#22C55E" },
  { name: "Phones", value: 9, fill: "#F59E0B" },
  { name: "Other", value: 5, fill: "#94A3B8" },
];

export const DEPT_DIST = [
  { name: "IT", value: 31, fill: "#2563EB" },
  { name: "Engineering", value: 26, fill: "#0EA5E9" },
  { name: "Finance", value: 18, fill: "#22C55E" },
  { name: "Sales", value: 15, fill: "#F59E0B" },
  { name: "HR", value: 10, fill: "#EC4899" },
];

export const CARBON_MONTHLY = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  saved: [22, 30, 26, 38, 34, 42, 48, 51, 46, 54, 59, 64][i],
}));

export const RISK_DIST = [
  { name: "Low", value: 41, fill: "#22C55E" },
  { name: "Medium", value: 33, fill: "#F59E0B" },
  { name: "High", value: 18, fill: "#EF4444" },
  { name: "Critical", value: 8, fill: "#B91C1C" },
];

export const RECYCLING_PIPES = [
  { stage: "Collected", count: 2453 },
  { stage: "Verified", count: 2110 },
  { stage: "Wiped", count: 1856 },
  { stage: "Refurbished", count: 1402 },
  { stage: "Recycled", count: 960 },
  { stage: "Disposed", count: 38 },
];