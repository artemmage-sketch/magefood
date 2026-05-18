import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "site-overrides.json");

export interface SiteOverrides {
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  statsEnabled?: boolean;
  tools?: Record<string, Partial<{
    name: string;
    shortDesc: string;
    description: string;
    features: string[];
    available: boolean;
  }>>;
  pricing?: Record<string, Partial<{
    monthly: number | null;
    yearly: number | null;
    trialDays: number;
    customPricing: boolean;
  }>>;
  contactEmail?: string;
  contactTelegram?: string;
  announcementBanner?: string;
  announcementEnabled?: boolean;
}

export function getOverrides(): SiteOverrides {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    }
  } catch {}
  return {};
}

export function saveOverrides(overrides: SiteOverrides): void {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(overrides, null, 2));
}
