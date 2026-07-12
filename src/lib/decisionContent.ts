import type { AccommodationStyle, Destination } from "../data/cities";
import { cities, citySlugs } from "../data/cities";
import { calculateBurn, type BurnInputs } from "./calculateBurn";

export const DATA_UPDATED_AT = "2026-07-12";
export const DATA_UPDATED_LABEL = "July 12, 2026";

export type Lifestyle = "budget" | "comfortable" | "premium";

export const lifestyleAccommodation: Record<Lifestyle, AccommodationStyle> = {
  budget: "hostel",
  comfortable: "coliving",
  premium: "airbnb_solo",
};

export type CostBreakdown = {
  rent: number;
  utilities: number;
  coworking: number;
  food: number;
  transport: number;
  mobileInternet: number;
  insurance: number;
  visaRecurring: number;
  entertainment: number;
  total: number;
};

const rounded = (value: number) => Math.round(value / 10) * 10;

/**
 * An editorial allocation of the existing city baseline, not a live quote.
 * The non-rent categories always add back to baseLivingCost; this preserves the
 * calculator's established total instead of introducing a second cost model.
 */
export function costBreakdown(city: Destination, lifestyle: Lifestyle): CostBreakdown {
  const data = cities[city];
  const accommodation = lifestyleAccommodation[lifestyle];
  const rent = { hostel: data.hostelRent, coliving: data.colivingRent, airbnb_solo: data.airbnbRent }[
    accommodation
  ];
  const coworkingVisits = lifestyle === "budget" ? 1 : lifestyle === "comfortable" ? 3 : 5;
  const coworking = rounded(data.coworkingCost * coworkingVisits * 4.33);
  const multipliers = lifestyle === "budget" ? 0.86 : lifestyle === "premium" ? 1.28 : 1;
  const base = data.baseLivingCost * multipliers;
  const utilities = rounded(base * 0.13);
  const food = rounded(base * 0.38);
  const transport = rounded(base * 0.12);
  const mobileInternet = rounded(base * 0.06);
  const insurance = rounded(base * 0.14);
  const visaRecurring = rounded(base * 0.07);
  const entertainment = Math.max(0, rounded(base - utilities - food - transport - mobileInternet - insurance - visaRecurring));
  return {
    rent,
    utilities,
    coworking,
    food,
    transport,
    mobileInternet,
    insurance,
    visaRecurring,
    entertainment,
    total: rent + utilities + coworking + food + transport + mobileInternet + insurance + visaRecurring + entertainment,
  };
}

export function scenarioInputs(
  city: Destination,
  savings: number,
  income: number,
  lifestyle: Lifestyle = "comfortable",
): BurnInputs {
  return {
    currentSavings: savings,
    monthlyIncome: income,
    incomeTaxMode: "already_taxed",
    taxReservePct: 0,
    monthlyFixedCosts: 100,
    destination: city,
    accommodationStyle: lifestyleAccommodation[lifestyle],
    coworkingFreqPerWeek: lifestyle === "budget" ? 1 : lifestyle === "premium" ? 5 : 3,
    includeLocalCostVariability: false,
    localSimDataSwing: 0,
    coworkingDayPassSwing: 0,
    flightVisaBuffer: 150,
    paymentLossPct: 3,
    incomeStability: income > 0 ? "stable" : "risky",
    timezoneGapHours: 6,
  };
}

export function decisionResult(city: Destination, savings: number, income: number, lifestyle: Lifestyle = "comfortable") {
  return calculateBurn(scenarioInputs(city, savings, income, lifestyle));
}

export function calculatorUrl(city: Destination, savings = 20000, income = 1500, lifestyle: Lifestyle = "comfortable") {
  const params = new URLSearchParams({
    city: citySlugs[city],
    savings: String(savings),
    monthlyIncome: String(income),
    lifestyle,
    currency: "USD",
  });
  return `/?${params.toString()}#burn-form`;
}

export const decisionSources = [
  { label: "Numbeo cost-of-living benchmarks", href: "https://www.numbeo.com/cost-of-living/" },
  { label: "Nomad List city benchmarks", href: "https://nomadlist.com/" },
  { label: "Airbnb monthly listings", href: "https://www.airbnb.com/" },
  { label: "Hostelworld accommodation", href: "https://www.hostelworld.com/" },
  { label: "Coworker workspace references", href: "https://www.coworker.com/" },
];
