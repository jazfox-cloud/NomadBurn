import type { AccommodationStyle, Destination } from "../data/cities";
import { cities } from "../data/cities";

export type IncomeTaxMode = "already_taxed" | "need_tax_reserve";
export type IncomeStability = "stable" | "variable" | "risky";

export type BurnInputs = {
  currentSavings: number;
  monthlyIncome: number;
  incomeTaxMode: IncomeTaxMode;
  taxReservePct: number;
  monthlyFixedCosts: number;
  destination: Destination;
  accommodationStyle: AccommodationStyle;
  coworkingFreqPerWeek: number;
  flightVisaBuffer: number;
  paymentLossPct: number;
  incomeStability: IncomeStability;
  timezoneGapHours: number;
};

export type BurnResult = {
  rent: number;
  coworkingCost: number;
  monthlyLivingCost: number;
  taxReserve: number;
  paymentLoss: number;
  monthlyNetIncome: number;
  monthlyNetCashflow: number;
  burnRate: number;
  runwayMonths: number;
  breakEvenIncome: number;
  deductionRate: number;
};

export function calculateBurn(inputs: BurnInputs): BurnResult {
  const city = cities[inputs.destination];
  const rent = {
    coliving: city.colivingRent,
    airbnb_solo: city.airbnbRent,
    hostel: city.hostelRent,
  }[inputs.accommodationStyle];

  const coworkingCost = city.coworkingCost * inputs.coworkingFreqPerWeek * 4.33;
  const monthlyLivingCost =
    city.baseLivingCost +
    rent +
    coworkingCost +
    inputs.monthlyFixedCosts +
    inputs.flightVisaBuffer;

  const taxReserve =
    inputs.incomeTaxMode === "need_tax_reserve"
      ? (inputs.monthlyIncome * inputs.taxReservePct) / 100
      : 0;
  const paymentLoss = (inputs.monthlyIncome * inputs.paymentLossPct) / 100;
  const monthlyNetIncome = inputs.monthlyIncome - taxReserve - paymentLoss;
  const monthlyNetCashflow = monthlyNetIncome - monthlyLivingCost;
  const burnRate = monthlyNetCashflow < 0 ? Math.abs(monthlyNetCashflow) : 0;
  const runwayMonths =
    monthlyNetCashflow >= 0 ? Infinity : inputs.currentSavings / Math.abs(monthlyNetCashflow);
  const rawDeductionRate =
    (inputs.incomeTaxMode === "need_tax_reserve" ? inputs.taxReservePct : 0) +
    inputs.paymentLossPct;
  const deductionRate = Math.min(Math.max(rawDeductionRate, 0), 90);
  const breakEvenIncome = monthlyLivingCost / (1 - deductionRate / 100);

  return {
    rent,
    coworkingCost,
    monthlyLivingCost,
    taxReserve,
    paymentLoss,
    monthlyNetIncome,
    monthlyNetCashflow,
    burnRate,
    runwayMonths,
    breakEvenIncome,
    deductionRate,
  };
}
