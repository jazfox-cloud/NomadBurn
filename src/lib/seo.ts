import type { Destination } from "../data/cities";
import { citySlugs } from "../data/cities";
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
    includeLocalCostVariability: false,
    localSimDataSwing: 0,
    coworkingDayPassSwing: 0,
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
  const descriptions: Record<Destination, string> = {
    "Chiang Mai":
      "Plan a Chiang Mai nomad budget with rough 2026 rent, coworking, burn-rate, and savings-runway estimates for a lower-cost Thailand base.",
    "Bali Canggu":
      "Pressure-test a Bali Canggu nomad budget with rough 2026 housing, coworking, burn-rate, and runway estimates before lifestyle costs stack up.",
    Lisbon:
      "Model a Lisbon nomad budget with rough 2026 rent, living-cost, burn-rate, and runway estimates for a higher-cost European base.",
    Tbilisi:
      "Explore a Tbilisi nomad budget with rough 2026 housing, coworking, burn-rate, and runway estimates for a flexible Caucasus base.",
    Budapest:
      "Compare a Budapest nomad budget using rough 2026 rent, coworking, monthly burn, and savings-runway estimates for Central Europe.",
    Prague:
      "Estimate a Prague nomad budget with rough 2026 housing, living-cost, burn-rate, and runway assumptions for a Central European stay.",
    Warsaw:
      "Build a Warsaw nomad budget from rough 2026 rent, coworking, monthly burn, and savings-runway estimates for a Poland base.",
    Belgrade:
      "Test a Belgrade nomad budget with rough 2026 housing, coworking, burn-rate, and runway estimates for a lower-cost Balkan base.",
    Sofia:
      "Plan a Sofia nomad budget using rough 2026 rent, living-cost, burn-rate, and savings-runway estimates for a Bulgaria base.",
    Bucharest:
      "Model a Bucharest nomad budget with rough 2026 housing, coworking, monthly burn, and runway estimates for a Romania base.",
    Medellin:
      "Pressure-test a Medellin nomad budget with rough 2026 rent, coworking, burn-rate, and runway estimates for a Colombia stay.",
    "Mexico City":
      "Estimate a Mexico City nomad budget with rough 2026 housing, living-cost, burn-rate, and runway assumptions for a US-timezone base.",
    "Ho Chi Minh City":
      "Plan a Ho Chi Minh City nomad budget with rough 2026 rent, coworking, monthly burn, and runway estimates for a Vietnam base.",
    Bangkok:
      "Compare a Bangkok nomad budget using rough 2026 housing, coworking, burn-rate, and savings-runway estimates for a Thailand stay.",
    "Kuala Lumpur":
      "Model a Kuala Lumpur nomad budget with rough 2026 rent, coworking, monthly burn, and runway estimates for a Malaysia base.",
    "Da Nang":
      "Test a Da Nang nomad budget with rough 2026 housing, coworking, burn-rate, and runway estimates for a lower-cost Vietnam base.",
    "Buenos Aires":
      "Plan a Buenos Aires nomad budget with rough 2026 rent, living-cost, burn-rate, and runway estimates for Americas-timezone work.",
  };

  return descriptions[city];
}
