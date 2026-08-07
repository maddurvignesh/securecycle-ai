import type { ActivityItem, CopilotSuggestion } from "./types";

export const COPILOT_SUGGESTIONS: CopilotSuggestion[] = [
  {
    id: "cs-01",
    question: "Which devices need wiping?",
    answer:
      "You have 84 devices pending wipe, led by 6 critical-risk units (3 laptops, 2 SSDs, 1 server). The highest priority is the HP EliteBook 840 G8 (SC-2401-8842) — confidential finance data, encryption disabled. Recommended standard: NIST 800-88 Rev.1 Purge.",
  },
  {
    id: "cs-02",
    question: "Show critical assets",
    answer:
      "17 assets are currently high or critical risk. Top contributors: Engineering (34%), Finance (26%). 6 of them are SSDs with encryption disabled — these carry the highest recovery probability. I recommend queuing them for NIST Purge within 48 hours.",
  },
  {
    id: "cs-03",
    question: "Generate compliance report",
    answer:
      "Generating Quarterly Compliance Report… Overall score is 96.8% across 4 frameworks. NIST 800-88 is fully compliant (99%). HIPAA needs attention: 2 failed controls on ePHI disposition. The report is ready in Reports → Compliance.",
  },
  {
    id: "cs-04",
    question: "Why is this asset high risk?",
    answer:
      "The Dell Precision 7760 (SC-2305-2280) scores 96/100. It holds 184 sensitive files flagged as Confidential, encryption is disabled, and it is an NVMe SSD — fragmented logical data that requires TRIM + overwrite confirmation. Age and heavy usage increase recovery probability to 63%.",
  },
  {
    id: "cs-05",
    question: "Explain NIST 800-88",
    answer:
      "NIST SP 800-88 Rev.1 defines three sanitization levels: Clear (basic overwrite), Purge (resistant to advanced forensics), and Destroy (physical). For modern SSDs, Purge via cryptographic erase or full overwrite is required. SecureCycle verifies each pass and issues an auditable certificate.",
  },
  {
    id: "cs-06",
    question: "Carbon impact of recycling?",
    answer:
      "Your circular program saved 342 tonnes CO₂e this year — equivalent to 76,000 trees or 78 round-trip Delhi–Mumbai flights. Device reuse accounts for 46% of savings. Recycling 1 laptop avoids ~190 kg CO₂e vs landfill.",
  },
  {
    id: "cs-07",
    question: "Schedule bulk wipe",
    answer:
      "You can schedule a bulk wipe for up to 50 devices per batch. Recommended window: tonight 22:00–06:00 IST to avoid network contention. Estimated duration for 84 devices at NIST Purge: ~5h 40m.",
  },
  {
    id: "cs-08",
    question: "Audit readiness score",
    answer:
      "Audit readiness is 94/100. Everything is logged immutably and certificates are signed. Two gaps: HIPAA ePHI disposition witness log and 1 missing ISO 27001 control evidence. Resolve before the November external audit.",
  },
];

export const ACTIVITY_FEED: ActivityItem[] = [
  { id: "act-01", title: "Wipe completed — DoD 5220.22-M", desc: "Field iPhone 14 verified in 10m 38s · 2 blocks flagged & re-zeroed", time: "2026-08-07T15:42:00Z", category: "Secure Wipe", tone: "green" },
  { id: "act-02", title: "AI risk scan finished", desc: "3 new critical devices detected across Finance & Engineering", time: "2026-08-07T15:38:00Z", category: "Risk Assessment", tone: "rose" },
  { id: "act-03", title: "Certificate SC-26X-000044442 issued", desc: "Signed and sealed for decommissioned server", time: "2026-08-07T14:12:00Z", category: "Certificate", tone: "blue" },
  { id: "act-04", title: "Compliance check passed", desc: "Coastal Bank achieved 99% on NIST 800-88 controls", time: "2026-08-07T11:02:00Z", category: "Compliance", tone: "green" },
  { id: "act-05", title: "Bulk import completed", desc: "214 assets synced from ITAM via CSV", time: "2026-08-07T09:48:00Z", category: "Asset", tone: "sky" },
  { id: "act-06", title: "High-risk device flagged", desc: "Precision 7760 holds 184 sensitive files with encryption disabled", time: "2026-08-06T09:30:00Z", category: "Risk Assessment", tone: "amber" },
  { id: "act-07", title: "Recycling batch shipped", desc: "MediCore — Phoenix Launcher to Revycle Solutions", time: "2026-08-06T08:15:00Z", category: "Recycling", tone: "violet" },
  { id: "act-08", title: "Auditor signed review", desc: "Rohan Verma exported the Q3 risk exposure analysis", time: "2026-08-06T16:40:00Z", category: "Audit", tone: "blue" },
];
