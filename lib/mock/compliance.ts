import type { ComplianceControl, ComplianceFramework } from "./types";

export const COMPLIANCE_FRAMEWORKS: ComplianceFramework[] = [
  {
    id: "nist",
    name: "NIST 800-88",
    fullName: "NIST SP 800-88 Rev.1 — Media Sanitization",
    score: 99,
    status: "Compliant",
    controls: { total: 42, passed: 40, failed: 0, pending: 2 },
    lastAudit: "2026-07-28",
    nextAudit: "2026-11-15",
    accent: "blue",
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    fullName: "ISO/IEC 27001:2022 — Information Security",
    score: 96,
    status: "Compliant",
    controls: { total: 93, passed: 88, failed: 1, pending: 4 },
    lastAudit: "2026-06-19",
    nextAudit: "2026-12-05",
    accent: "violet",
  },
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation Art. 32",
    score: 94,
    status: "Monitoring",
    controls: { total: 18, passed: 16, failed: 1, pending: 1 },
    lastAudit: "2026-07-02",
    nextAudit: "2026-10-20",
    accent: "green",
  },
  {
    id: "hipaa",
    name: "HIPAA",
    fullName: "Health Insurance Portability & Accountability Act",
    score: 91,
    status: "At Risk",
    controls: { total: 24, passed: 20, failed: 2, pending: 2 },
    lastAudit: "2026-05-30",
    nextAudit: "2026-09-24",
    accent: "amber",
  },
];

export const COMPLIANCE_CONTROLS: ComplianceControl[] = [
  { id: "cc-01", control: "NIST 800-88 §2.4", framework: "NIST 800-88", title: "Media sanitization decision process documented", status: "Passed", evidence: "SO-24-CDP-03", owner: "IT Operations", updated: "2026-08-02" },
  { id: "cc-02", control: "NIST 800-88 §2.5", framework: "NIST 800-88", title: "Clear / purge / destroy selection criteria", status: "Passed", evidence: "SO-24-SEL-11", owner: "Security", updated: "2026-08-01" },
  { id: "cc-03", control: "A.8.12", framework: "ISO 27001", title: "Data leakage prevention in place", status: "Passed", evidence: "DLP-TEST-JUL", owner: "Security", updated: "2026-07-29" },
  { id: "cc-04", control: "Art. 32.1a", framework: "GDPR", title: "Encryption of personal data at rest", status: "Failed", evidence: "GAP-ENC-09", owner: "IT Operations", updated: "2026-07-25" },
  { id: "cc-05", control: "A.8.10", framework: "ISO 27001", title: "Secure deletion of information on media", status: "Passed", evidence: "WIPE-LOG-0807", owner: "IT Operations", updated: "2026-08-07" },
  { id: "cc-06", control: "§164.310(d)", framework: "HIPAA", title: "Final disposition of hardware with ePHI", status: "Failed", evidence: "GAP-DISP-02", owner: "Compliance", updated: "2026-07-18" },
  { id: "cc-07", control: "NIST 800-88 §2.6", framework: "NIST 800-88", title: "Verification and documentation of sanitization", status: "Passed", evidence: "CERT-STREAM", owner: "Field Engineering", updated: "2026-08-06" },
  { id: "cc-08", control: "A.8.8", framework: "ISO 27001", title: "Removal of assets from use", status: "Pending", evidence: "PENDING", owner: "Asset Lifecycle", updated: "2026-08-07" },
  { id: "cc-09", control: "Art. 32.1b", framework: "GDPR", title: "Ongoing confidentiality of processing", status: "Passed", evidence: "SSO-OK-2026", owner: "Security", updated: "2026-07-30" },
  { id: "cc-10", control: "§164.308(a)(4)", framework: "HIPAA", title: "Workforce security clearances for device handlers", status: "Pending", evidence: "PENDING", owner: "HR", updated: "2026-08-01" },
];

export const COMPLIANCE_RECOMMENDATIONS = [
  {
    id: "rec-01",
    title: "Enable full-disk encryption on all retired media",
    impact: "High",
    effort: "Low",
    desc: "17 devices flagged with encryption disabled. Enable BitLocker/FileVault before wipe to guarantee logical block unreadability.",
    controls: "GDPR Art.32 · NIST 800-88",
  },
  {
    id: "rec-02",
    title: "Add signed disposal workflow for ePHI hardware",
    impact: "High",
    effort: "Medium",
    desc: "HIPAA §164.310(d) requires documented, witnessed disposition. Introduce a two-person sign-off at the destroy stage.",
    controls: "HIPAA §164.310(d)",
  },
  {
    id: "rec-03",
    title: "Shorten certificate issuance SLA to 4 hours",
    impact: "Medium",
    effort: "Low",
    desc: "Auditors found a 14h gap between wipe completion and certificate issuance. Automate certificate generation on verification.",
    controls: "ISO 27001 A.8.10",
  },
];

export const MISSING_CONTROLS = [
  { title: "Media sanitization decision process", framework: "NIST 800-88", missing: 1 },
  { title: "Cryptographic erasure on NVMe", framework: "NIST 800-88", missing: 2 },
  { title: "DLP coverage for outbound logs", framework: "ISO 27001", missing: 1 },
  { title: "Breach notification runbook", framework: "GDPR", missing: 1 },
  { title: "ePHI disposition witness log", framework: "HIPAA", missing: 2 },
];
