export type RiskLevel = "Critical" | "High" | "Medium" | "Low";
export type AssetStatus =
  | "In Fleet"
  | "Pending Wipe"
  | "Wiping"
  | "Wiped"
  | "Certified"
  | "Recycled"
  | "Retired";

export type AssetType =
  | "Laptop"
  | "Desktop"
  | "Server"
  | "SSD"
  | "HDD"
  | "Phone"
  | "Printer"
  | "Networking Device";

export type StorageType = "NVMe SSD" | "SATA SSD" | "SAS" | "eMMC" | "HDD" | "uFlash";
export type Classification = "Confidential" | "Sensitive" | "Public" | "Internal";
export type Encryption = "Full Disk" | "Disabled" | "File-level" | "Hardware";

export interface User {
  id: string;
  name: string;
  role: "Admin" | "IT Manager" | "Auditor" | "Technician";
  email: string;
  department: string;
  company: string;
  title: string;
  avatarColor: string;
}

export interface WipeRecord {
  date: string;
  standard: string;
  verified: boolean;
  method: number; // integrity %
}

export interface Asset {
  id: string;
  name: string;
  assetType: AssetType;
  brand: string;
  model: string;
  serial: string;
  capacity: string;
  storageType: StorageType;
  assignedTo: string;
  department: string;
  image: string; // device glyph key
  riskLevel: RiskLevel;
  riskScore: number;
  status: AssetStatus;
  classification: Classification;
  encryptionStatus: Encryption;
  warranty: string;
  location: string;
  purchaseYear: number;
  lastWipe?: string;
  wipeHistory: WipeRecord[];
  carbonSaved: number;
  color: string;
}

export type CertificateStatus = "Active" | "Revoked" | "Expired" | "Verified";

export interface Certificate {
  id: string;
  asset: {
    id: string;
    name: string;
    serial: string;
    type: AssetType;
  };
  standard: string;
  date: string;
  technician: string;
  verified: boolean;
  status: CertificateStatus;
  integrity: number; // %
  zeroedGB: number;
  qr: string; // hex seed for QR
  signature: string;
  company: string;
}

export interface AuditEntry {
  id: string;
  actor: string;
  role: string;
  action: string;
  target?: string;
  category: "auth" | "asset" | "wipe" | "certificate" | "compliance" | "system" | "recycling";
  outcome: "success" | "warning" | "error";
  timestamp: string;
  ip: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  severity: "critical" | "alert" | "info" | "success";
  category: string;
  time: string;
  read: boolean;
}

export interface WipeStandard {
  id: string;
  name: string;
  fullName: string;
  desc: string;
  passes: string;
  recommended: boolean;
  timeframe: string;
  verified: boolean;
}

export interface Company {
  id: string;
  name: string;
  sector: string;
  hq: string;
  assets: number;
  compliance: number;
  tier: "Platinum" | "Gold" | "Silver";
}

export interface AuditFinding {
  id: string;
  title: string;
  status: "Open" | "Remediated" | "In Review";
  severity: RiskLevel;
  standard: string;
  owner: string;
  due: string;
}

export interface Metric {
  label: string;
  value: string;
  raw: number;
  delta: number;
  up: boolean;
  spark: number[];
}

export interface ComplianceFramework {
  id: string;
  name: string;
  fullName: string;
  score: number;
  status: "Compliant" | "At Risk" | "Non-compliant" | "Monitoring";
  controls: { total: number; passed: number; failed: number; pending: number };
  lastAudit: string;
  nextAudit: string;
  accent: "blue" | "green" | "violet" | "amber";
}

export interface ComplianceControl {
  id: string;
  control: string;
  framework: string;
  title: string;
  status: "Passed" | "Failed" | "Pending" | "Not Applicable";
  evidence: string;
  owner: string;
  updated: string;
}

export interface RecyclingBatch {
  id: string;
  name: string;
  devices: number;
  weightKg: number;
  stage: "Collected" | "Verified" | "Wiped" | "Refurbished" | "Recycled" | "Disposed";
  startDate: string;
  completionDate?: string;
  partner: string;
  carbonSaved: number;
  revenue: number;
}

export interface ReportTemplate {
  id: string;
  name: string;
  desc: string;
  category: "Compliance" | "Asset" | "Risk" | "Certificate" | "Audit" | "Recycling";
  icon: string;
  updated: string;
  pages: number;
  size: string;
}

export interface CopilotSuggestion {
  id: string;
  question: string;
  answer: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  category: string;
  tone: "blue" | "green" | "amber" | "rose" | "violet" | "sky";
}

export interface DeviceAgeBand {
  band: string;
  count: number;
  fill: string;
}

export interface ForecastPoint {
  month: string;
  actual: number;
  forecast: number;
}