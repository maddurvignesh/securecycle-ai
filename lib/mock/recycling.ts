import type { RecyclingBatch } from "./types";
import { CARBON_MONTHLY } from "./data";

export const RECYCLING_BATCHES: RecyclingBatch[] = [
  { id: "rb-01", name: "Coastal Bank — Branch Refresh", devices: 412, weightKg: 1890, stage: "Recycled", startDate: "2026-05-12", completionDate: "2026-07-30", partner: "GreenLoop E-Services", carbonSaved: 214, revenue: 132000 },
  { id: "rb-02", name: "MediCore — Phoenix Launcher", devices: 266, weightKg: 1130, stage: "Refurbished", startDate: "2026-06-20", completionDate: "2026-08-04", partner: "Revycle Solutions", carbonSaved: 138, revenue: 21400 },
  { id: "rb-03", name: "AeroFeed — Security Decommission", devices: 198, weightKg: 820, stage: "Wiped", startDate: "2026-07-15", partner: "SecureCycle In-house", carbonSaved: 96, revenue: 0 },
  { id: "rb-04", name: "Nordic Retail — Store Upgrade", devices: 344, weightKg: 1520, stage: "Collected", startDate: "2026-08-01", partner: "NorthRecycle", carbonSaved: 0, revenue: 0 },
  { id: "rb-05", name: "Finpeak Capital — Trading Floor", devices: 150, weightKg: 640, stage: "Verified", startDate: "2026-08-02", partner: "SecureCycle Labs", carbonSaved: 0, revenue: 0 },
  { id: "rb-06", name: "Institute of Data — Campus Migration", devices: 521, weightKg: 2240, stage: "Collected", startDate: "2026-07-25", partner: "GreenServe India", carbonSaved: 0, revenue: 0 },
  { id: "rb-07", name: "Finpeak — Legacy Servers", devices: 88, weightKg: 512, stage: "Disposed", startDate: "2026-06-01", completionDate: "2026-07-14", partner: "EcoShed", carbonSaved: 12, revenue: -1800 },
];

export const RECYCLING_PIPES = [
  { stage: "Collected", count: 2453 },
  { stage: "Verified", count: 2110 },
  { stage: "Wiped", count: 1856 },
  { stage: "Refurbished", count: 1402 },
  { stage: "Recycled", count: 960 },
  { stage: "Disposed", count: 38 },
];

export const RECYCLING_PARTNERS = [
  { name: "SecureCycle Labs", volume: 38, verified: 100, tier: "Platinum" },
  { name: "RecycleV Solutions", volume: 26, verified: 99, tier: "Gold" },
  { name: "NorthRecycle", volume: 18, verified: 98, tier: "Gold" },
  { name: "GreenLoop E-waste", volume: 12, verified: 97, tier: "Silver" },
  { name: "EcoShed", volume: 6, verified: 95, tier: "Silver" },
];

export { CARBON_MONTHLY };

export const MATERIALS_RECOVERED = [
  { name: "Steel & Aluminium", value: 1240, fill: "#94A3B8" },
  { name: "Plastics", value: 480, fill: "#F59E0B" },
  { name: "Copper", value: 210, fill: "#E07600" },
  { name: "Lithium & Batteries", value: 96, fill: "#22C55E" },
  { name: "Precious Metals", value: 12, fill: "#B45309" },
];