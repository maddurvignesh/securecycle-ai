import type { DeviceAgeBand, ForecastPoint } from "./types";

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

export const STORAGE_DIST = [
  { name: "NVMe SSD", value: 44, fill: "#2563EB" },
  { name: "SATA SSD", value: 18, fill: "#0EA5E9" },
  { name: "SAS", value: 12, fill: "#8B5CF6" },
  { name: "HDD", value: 15, fill: "#22C55E" },
  { name: "uFlash", value: 11, fill: "#F59E0B" },
];

export const RISK_DIST = [
  { name: "Low", value: 41, fill: "#22C55E" },
  { name: "Medium", value: 33, fill: "#F59E0B" },
  { name: "High", value: 18, fill: "#EF4444" },
  { name: "Critical", value: 8, fill: "#B91C1C" },
];

export const WIPE_BY_STANDARD = [
  { name: "NIST 800-88", value: 68, fill: "#2563EB" },
  { name: "DoD 5220.22-M", value: 21, fill: "#8B5CF6" },
  { name: "Quick Wipe", value: 8, fill: "#22C55E" },
  { name: "Gutmann", value: 3, fill: "#94A3B8" },
];

export const COMPLIANCE_TREND = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  score: [92, 93, 92.5, 94, 94.6, 95.1, 95.4, 96.2, 96, 96.5, 96.8, 97.1][i],
  target: 96,
}));

export const DEVICE_AGE_BANDS: DeviceAgeBand[] = [
  { band: "< 1 yr", count: 420, fill: "#2563EB" },
  { band: "1–2 yrs", count: 640, fill: "#0EA5E9" },
  { band: "2–4 yrs", count: 1180, fill: "#8B5CF6" },
  { band: "4–6 yrs", count: 720, fill: "#F59E0B" },
  { band: "> 6 yrs", count: 310, fill: "#EF4444" },
];

export const WIPE_FORECAST: ForecastPoint[] = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  actual: [210, 300, 260, 380, 340, 420, 480, 510, 460, 540, 590, 640][i],
  forecast: i < 8 ? 0 : [480, 560, 640, 710][i - 8],
}));

export const CARBON_BY_STAGE = [
  { name: "Reuse", value: 46, fill: "#22C55E" },
  { name: "Recycling", value: 28, fill: "#2563EB" },
  { name: "Material recovery", value: 19, fill: "#0EA5E9" },
  { name: "Disposal", value: 7, fill: "#94A3B8" },
];

export const DAILY_WIPES = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  wiped: 8 + Math.floor(Math.abs(Math.sin(i * 0.7)) * 22) + (i % 5 === 0 ? 9 : 0),
  certified: 6 + Math.floor(Math.abs(Math.sin(i * 0.65)) * 20) + (i % 5 === 0 ? 8 : 0),
}));

export const RISK_BY_DEPARTMENT = [
  { name: "Engineering", score: 82 },
  { name: "Finance", score: 74 },
  { name: "IT", score: 78 },
  { name: "Legal", score: 66 },
  { name: "R&D", score: 88 },
  { name: "Sales", score: 51 },
  { name: "HR", score: 58 },
  { name: "Operations", score: 47 },
];

export const QUARTERLY_PERFORMANCE = [
  { quarter: "Q1 '25", wipes: 780, recycled: 410, carbon: 64 },
  { quarter: "Q2 '25", wipes: 990, recycled: 560, carbon: 81 },
  { quarter: "Q3 '25", wipes: 1120, recycled: 640, carbon: 94 },
  { quarter: "Q4 '25", wipes: 1340, recycled: 820, carbon: 110 },
  { quarter: "Q1 '26", wipes: 1470, recycled: 930, carbon: 126 },
];
