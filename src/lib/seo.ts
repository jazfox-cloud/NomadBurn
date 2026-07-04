import type { Destination } from "../data/cities";
import { cityLabel, citySlugs } from "../data/cities";
import { calculateBurn } from "./calculateBurn";

export const siteUrl = "https://nomadburn.com";

export function canonical(path: string): string {
  return `${siteUrl}${path}`;
}

export function money(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function monthlyCostFor(city: Destination): number {
  return calculateBurn({
    currentSavings: 12000,
    monthlyIncome: 0,
    incomeTaxMode: "already_taxed",
    taxReservePct: 0,
    monthlyFixedCosts: 100,
    destination: city,
    accommodationStyle: "coliving",
    coworkingFreqPerWeek: 3,
    flightVisaBuffer: 150,
    paymentLossPct: 0,
    incomeStability: "stable",
    timezoneGapHours: 6,
  }).monthlyLivingCost;
}

export function cityPath(city: Destination): string {
  return `/cities/${citySlugs[city]}/`;
}

export function cityMetaDescription(city: Destination): string {
  return `Estimate your digital nomad burn rate in ${cityLabel(city)}. Compare rough 2026 planning costs for coliving, Airbnb, hostel stays, coworking, and monthly runway.`;
}
